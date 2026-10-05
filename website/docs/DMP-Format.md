# DMP File Format

**Format version 7 — specification for third-party software**

This page describes the content of `.dmp` files produced by the JedEye cave
surveying instrument, so that survey applications can import them. It is
self-contained: no access to the device or its firmware is required.

A DMP file is the JedEye's lossless export format. It contains every survey
*section* recorded since the device memory was last erased — each section a
sequence of fixed-size *shot* records, and, for shots where the surveyor
recorded a room scan, a *volume block* holding the Lidar point cloud. Files are
obtained from the device's [WiFi download page](WIFI-Data-transfer.md), which
names them `JEDEYEYYMMDDHHMMSS.dmp` (two digits per date/time component, date of
the download), or saved by Ariane's Line after downloading the device over USB.

---

## 1. File encoding

A DMP file is plain ASCII text: a single line of decimal integers separated by
semicolons `;`, with a trailing `;` after the last value and no line breaks.

Each value represents **one byte** of an underlying binary stream, rendered as
a **signed** 8-bit integer (−128…127). To recover the unsigned byte:

```
byte = value < 0 ? value + 256 : value        // i.e. value & 0xFF
```

16-bit fields span two consecutive byte values. **Shot and header fields are
big-endian; volume-point fields are little-endian** (§5):

```
big-endian:     u16 = (byte[0] << 8) | byte[1]
little-endian:  u16 = byte[0] | (byte[1] << 8)
s16 = u16 reinterpreted as two's-complement signed
```

Example: `4;-46;` → bytes `4, 210` → big-endian `(4 << 8) | 210` = **1234**.
`40;35;` in a volume point → bytes `40, 35` → little-endian `40 | (35 << 8)` =
**9000**.

Parsers should tolerate surrounding whitespace and a missing trailing
semicolon. All structure descriptions below refer to the decoded byte stream;
offsets are in bytes.

## 2. Overall structure

```
DMP     := Section*
Section := SectionHeader (ShotRecord VolumeBlock?)* EOCRecord
```

There is no file-level header or trailer. Sections appear in recording order. A
section is normally closed by an end-of-cave (EOC) record; a section
interrupted by power loss may lack it (see §7). A volume block, when present,
always directly follows the shot record it belongs to; the EOC record never has
one.

## 3. Section header (16 bytes)

| Offset | Size | Field | Value / meaning |
|--------|------|-------|-----------------|
| 0 | 1 | Format version | `7` |
| 1 | 3 | Signature | `68, 89, 101` |
| 4 | 1 | Firmware major | Version of the firmware that recorded the section |
| 5 | 1 | Firmware minor | |
| 6 | 1 | Firmware revision | |
| 7 | 1 | Year | Two-digit year; add 2000 (e.g. `26` = 2026) |
| 8 | 1 | Month | 1–12 |
| 9 | 1 | Day | 1–31 |
| 10 | 1 | Hour | 0–23 (time the section was started) |
| 11 | 1 | Minute | 0–59 |
| 12 | 3 | Section name | 3 ASCII characters from `A`–`Z`, `0`–`9` |
| 15 | 1 | Direction | `0` = IN survey, `1` = OUT survey |

The 4-byte sequence `7, 68, 89, 101` is the **section signature** — the only
synchronization point in the stream. Parsers locate sections by scanning for it
(see §7).

## 4. Shot record (35 bytes)

One record per survey shot (one leg between two stations). All 16-bit fields
are big-endian; signedness as listed.

| Offset | Size | Field | Type | Unit / meaning |
|--------|------|-------|------|----------------|
| 0 | 3 | Start code | — | `57, 67, 77` |
| 3 | 1 | Shot type | u8 | `0` = CSA, `1` = CSB, `2` = STD, `3` = EOC (see §6) |
| 4 | 2 | headingIn | u16 | Compass heading, 1/10 degree (0–3599) |
| 6 | 2 | headingOut | u16 | Always equal to headingIn (see §6) |
| 8 | 2 | length | u16 | Lidar-measured shot length, cm |
| 10 | 2 | depthIn | s16 | Vertical position at the start of the shot, cm (see §6) |
| 12 | 2 | depthOut | s16 | Vertical position at the end of the shot, cm |
| 14 | 2 | pitchIn | s16 | Vertical angle, 1/10 degree (−1799…+1799) |
| 16 | 2 | pitchOut | s16 | Always equal to pitchIn |
| 18 | 2 | left | u16 | Always 0 (the JedEye records no LRUD; see §5) |
| 20 | 2 | right | u16 | Always 0 |
| 22 | 2 | up | u16 | Always 0 |
| 24 | 2 | down | u16 | Always 0 |
| 26 | 2 | temperature | s16 | Temperature, 1/10 °C |
| 28 | 1 | hour | u8 | Time of day the shot was taken |
| 29 | 1 | minute | u8 | |
| 30 | 1 | second | u8 | |
| 31 | 1 | marker | u8 | Always 0 (reserved) |
| 32 | 3 | End code | — | `95, 25, 35` |

Angles are stored in tenths of a degree (`1234` = 123.4°), distances and
vertical positions in centimeters, temperature in tenths of a degree Celsius.

## 5. Volume block (room-scan point cloud)

When the surveyor scanned the passage at a station, the point cloud follows the
shot's end code as a **volume block**:

| Offset | Size | Field | Type | Meaning |
|--------|------|-------|------|---------|
| 0 | 3 | Volume code | — | `32, 33, 34` |
| 3 | 2 | Byte length | u16 **big-endian** | Length of the point data; always a multiple of 6 |
| 5 | 6·N | Points | — | N = length/6 points |

Each 6-byte point, **little-endian**:

| Offset | Size | Field | Type | Unit |
|--------|------|-------|------|------|
| 0 | 2 | yaw | u16 LE | Compass bearing of the point, 1/100 degree (0–35999) |
| 2 | 2 | pitch | s16 LE | Vertical angle of the point, 1/100 degree |
| 4 | 2 | distance | u16 LE | Lidar distance, cm |

Points are polar rays from the station where the scan was taken: the station
the shot was **measured from** (its starting station — the surveyor shoots the
shot forward, scans the room, then moves on). A block holds at most 2000 points
(12000 bytes). There is
no end code — the block ends where the byte length says. The mixed byte order
is deliberate: shot fields are big-endian, point fields little-endian.

Passage cross-sections (the role LRUD plays in other instruments) are derived
from these point clouds; the LRUD fields in the shot record itself are always
zero.

## 6. Shot types and field semantics

| Value | Name | Meaning |
|-------|------|---------|
| 0 | `CSA` | Legacy type; not produced by the JedEye |
| 1 | `CSB` | Legacy type; not produced by the JedEye |
| 2 | `STD` | Standard measured shot — the only data-carrying type |
| 3 | `EOC` | End-of-cave: terminates the section |

Importers must accept all four values, and should treat any type byte greater
than 3 as `EOC`. A section is closed by a full 35-byte record of type `EOC`
whose data fields are **all zero**; it carries no measurement data, should not
be imported as a shot, and is never followed by a volume block.

JedEye-specific semantics:

- **The device measures each shot once**, so `headingIn` = `headingOut` and
  `pitchIn` = `pitchOut` in every record. Use either.
- **Depth is a derived vertical coordinate**, not a sensor reading: positive
  downward, in cm, starting at 0 at each section's first station. Each shot's
  `depthOut` equals `depthIn − length·sin(pitch)` (rounded toward zero), and
  the next shot's `depthIn` continues from it. Stations above the section start
  have negative depth. Importers that compute elevation from length and pitch
  themselves can ignore these fields.
- **LRUD and marker are always 0** (see §5 for passage geometry).

## 7. Parsing rules

1. **Locate a section**: scan the byte stream for the signature
   `7, 68, 89, 101`. Bytes before a signature are garbage (e.g. remnants of an
   interrupted recording) and must be skipped.
2. **Read the header**: consume the 12 remaining header bytes (firmware
   version, date, name, direction) immediately after the signature.
3. **Read records**: each must begin with `57, 67, 77` and end with
   `95, 25, 35`. On any mismatch, abandon the current section and resume
   signature scanning at the byte after the last valid position.
4. **After each record**, check whether the next three bytes are `32, 33, 34`:
   if so, read the big-endian byte length and consume that many point bytes —
   the block belongs to the shot just read. A robust importer skips any
   unexpected volume block the same way (code + length + payload).
5. **End of section**: a record of type `3` (EOC) closes the section. A section
   may also end implicitly at end-of-file (unclosed section) or at a validation
   failure; shots already read remain valid.
6. **Empty sections** (a header followed immediately by an EOC record) may
   occur and can be ignored.
7. After a record or volume block, the next byte is `57` (another record), `7`
   (next section signature), or `32` (volume block) — the first byte
   disambiguates.

## 8. Worked example

Two sections: an IN section `JD1` with two shots — the first carrying a 4-point
volume block — then an OUT section `JD2` with one shot. A machine-readable copy
of this example is available for download —
[dmp_file_format_sample.dmp](pathname:///dmp/dmp_file_format_sample.dmp) — a
useful first test case for an importer.
Annotated (line breaks and comments added for readability — a real file is a
single unbroken line):

```
7;68;89;101;          section 1 signature (version 7)
2;9;3;                firmware 2.9.3
26;8;25;16;5;         2026-08-25 16:05
74;68;49;             name "JD1" (ASCII)
0;                    direction IN

57;67;77;             shot 1 start code
2;                    type STD
4;-46;                headingIn  = 1234 → 123.4°
4;-46;                headingOut (always equals headingIn)
2;108;                length     =  620 → 6.20 m
0;0;                  depthIn    =    0 (first shot of the section)
0;54;                 depthOut   =   54 → 0.54 m below the section start
-1;-50;               pitchIn    =  -50 → -5.0°
-1;-50;               pitchOut   (always equals pitchIn)
0;0;0;0;0;0;0;0;      left/right/up/down (always 0)
0;-74;                temperature = 182 → 18.2 °C
16;6;12;              shot time 16:06:12
0;                    marker (always 0)
95;25;35;             shot end code

32;33;34;             volume block for shot 1
0;24;                 byte length = 24 (big-endian) → 4 points
0;0;0;0;-6;0;         point 1: yaw 0.00°, pitch 0.00°, dist 250 cm (little-endian)
40;35;-24;3;44;1;     point 2: yaw 9000 → 90.00°, pitch 1000 → 10.00°, dist 300 cm
80;70;12;-2;24;1;     point 3: yaw 180.00°, pitch -500 → -5.00°, dist 280 cm
120;105;-108;17;-106;0; point 4: yaw 270.00°, pitch 45.00°, dist 150 cm

57;67;77;             shot 2 start code
2;                    type STD
8;52;                 headingIn  = 2100 → 210.0°
8;52;                 headingOut
1;-62;                length     =  450 → 4.50 m
0;54;                 depthIn    =   54 (continues shot 1's depthOut)
-1;-8;                depthOut   =   -8 → 8 cm above the section start
0;80;                 pitchIn    =  +80 → +8.0°
0;80;                 pitchOut
0;0;0;0;0;0;0;0;      left/right/up/down
0;-75;                temperature = 181 → 18.1 °C
16;11;47;             shot time 16:11:47
0;                    marker
95;25;35;             shot end code

57;67;77;             shot start code
3;                    type EOC (closes section 1)
0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;
95;25;35;             shot end code

7;68;89;101;          section 2 signature (version 7)
2;9;3;                firmware 2.9.3
26;8;25;16;40;        2026-08-25 16:40
74;68;50;             name "JD2" (ASCII)
1;                    direction OUT

57;67;77;             shot 1 start code
2;                    type STD
1;44;                 headingIn  =  300 → 30.0°
1;44;                 headingOut
3;32;                 length     =  800 → 8.00 m
0;0;                  depthIn    =    0 (depth resets each section)
0;34;                 depthOut   =   34 → 0.34 m below the section start
-1;-25;               pitchIn    =  -25 → -2.5°
-1;-25;               pitchOut
0;0;0;0;0;0;0;0;      left/right/up/down
0;-76;                temperature = 180 → 18.0 °C
16;41;22;             shot time 16:41:22
0;                    marker
95;25;35;             shot end code

57;67;77;             shot start code
3;                    type EOC (closes section 2)
0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;
95;25;35;             shot end code
```

## 9. Other format versions

This specification covers format version 7, the version produced by current
JedEye devices. Files from older firmware used lower version numbers with
different layouts and are not covered here.

The MNemo — the JedEye's underwater sibling instrument — produces **version 5**
files: same 35-byte shot record, but a 13-byte section header (no firmware
version bytes), no volume blocks, measured (not derived) depth, and LRUD/marker
fields in actual use. A parser distinguishes the two by the signature's version
byte (`7` vs `5`); see the
[MNemo DMP File Format specification](https://manuals.arianesline.com/mnemo/docs/DMP-Format)
for that format.
