# Updating the NINA firmware

The JedEye's Bluetooth and WiFi are handled by a small co-processor (a u-blox **NINA-W102** module) that runs its own firmware, independent of the JedEye application firmware. Devices shipped with JedEye firmware **up to and including v2.2.x** carry NINA firmware **1.5.0**. JedEye firmware **v2.3 and newer** uses host libraries that need NINA firmware **3.0.1 or newer** — the old NINA firmware silently breaks Bluetooth (and may break WiFi).

## Do I need to do this?

You need this update **only** if you have just upgraded the JedEye application firmware to v2.3 or newer and you notice any of:

- The **Bluetooth icon never appears** in the [Distance Meter](./Distance-Meter) screen.
- **TopoDroid** (or any other BLE scanner) cannot find the JedEye device.
- WiFi may keep working — only Bluetooth silently fails.

If you have not upgraded the JedEye firmware yet, or you are happy on v2.2.x, **leave the NINA firmware alone**.

## What it does (and what to expect)

The update procedure flashes NINA firmware 3.0.1 onto the radio module. There are several paths, from easiest to most involved. On firmware **v2.4 and newer** the recommended path is **Option D** — the JedEye does the whole flash by itself, with no PC required.

## Option D — In-device self-update (recommended, JedEye v2.4+)

Available on JedEye application firmware **v2.4 and newer**. The JedEye carries its own copy of `nina-fw` and writes it directly onto the radio over an internal serial link. No PC, no host-side tools, no re-flashing of the application firmware afterwards.

1. On the JedEye, go to **OPTIONS > SETTINGS > SYSTEM > RADIO FW UPDATE**.
2. A confirmation submenu opens. Pick **Confirm** to start (pick **Back** to abort).
3. The screen shows the radio's running firmware version on top (`Current: 1.5.0`) and the bundled target underneath (`Target: 3.0.1`), with a percent counter that climbs to 100% as the flash runs. Total time is a few minutes.
4. When it finishes, the screen shows *Done. Restarting JedEye…* for two seconds and the device reboots itself. The JedEye comes back up with the new radio firmware loaded.

If the in-device flash cannot run — typically because the JedEye firmware was built without the bundled `nina-fw` blob (offline build, opt-out) — the action falls through automatically to the legacy **passthrough mode** (Option A below), so an Arduino-IDE or `arduino-fwuploader` flash from a PC still works as a fallback.

> If you want to verify which `nina-fw` version a build is shipping, look for `NINA_FW_VERSION` in `scripts/fetch_nina_fw.py` in the JedEye firmware source tree. The bundled blob adds about 1.3 MB to the firmware image.

## Option A — Radio FW Update passthrough (JedEye v2.3, or v2.4+ fallback)

On JedEye application firmware **v2.3**, the *Radio FW Update* menu entry opens a USB-to-radio passthrough mode that lets a PC-side tool drive the radio's bootloader. The JedEye application firmware on the RP2040 stays intact through the update — power-cycle when the PC tool reports success and you are back to normal operation. On v2.4+ this is also the automatic fallback when no `nina-fw` blob was bundled into the JedEye firmware.

1. On the JedEye, go to **OPTIONS > TOOLS > RADIO FW UPDATE** (v2.3) or **OPTIONS > SETTINGS > SYSTEM > RADIO FW UPDATE → Confirm** (v2.4+, falls through to passthrough automatically when no blob is bundled). The screen switches to a "RADIO FW UPDATE — Run update tool on your PC — Power-cycle to exit" view. The device is now bridging USB ↔ the NINA radio.
2. From your PC, run one of the host-side update tools. Whichever you use, the JedEye application firmware is **not** touched — the host tool drives the radio module's reset / GPIO0 lines through the bridge.

   **Arduino IDE 2.x** — select board *Arduino Nano RP2040 Connect*, select the JedEye's COM port, then **Tools → Firmware Updater** → pick `3.0.1` → *Install*.

   **`arduino-fwuploader` CLI** (no IDE needed):

   ```sh
   arduino-fwuploader firmware flash \
       --fqbn arduino:mbed_nano:nanorp2040connect \
       --address COM4 \
       --module NINA@3.0.1
   ```

   Replace `COM4` with your actual port (macOS/Linux: `/dev/cu.usbmodem*` or `/dev/ttyACM*`).

   **Windows PowerShell convenience wrapper** (ships with the JedEye firmware repository):

   ```powershell
   .\scripts\update_nina_firmware.ps1
   ```

3. When the tool reports success, **power-cycle the JedEye** (unplug USB, wait a couple of seconds, plug back in). The device boots straight into normal operation, with the Bluetooth icon back in the Distance Meter.

That is it — no re-flashing of the JedEye application firmware is needed.

## Option B — Arduino IDE Firmware Updater (no menu item)

Use this if you are still on JedEye application firmware **older than v2.3** (no Radio FW Update menu item yet). The procedure works, but it temporarily replaces the JedEye application firmware on the RP2040 with a passthrough sketch, so you will need to **re-flash the JedEye application firmware afterwards**.

1. Install **Arduino IDE 2.x** from [https://www.arduino.cc/en/software](https://www.arduino.cc/en/software) if you do not have it.
2. In the Arduino IDE *Boards Manager*, install **"Arduino Mbed OS Nano Boards"** (one-time).
3. Connect the JedEye via USB.
4. **Tools → Board → Arduino Mbed OS Nano Boards → Arduino Nano RP2040 Connect**.
5. **Tools → Port** → select the JedEye's COM port (Windows: e.g. `COM4`; Linux: `/dev/ttyACM0`; macOS: `/dev/cu.usbmodem*`).
6. **Tools → Firmware Updater**. The dialog opens and reads back the current NINA firmware version (likely `1.5.0`).
7. Select **3.0.1** (or the newest version offered) and click **Install**. Wait for the success message — about 1–2 minutes. Do not unplug.
8. **Re-flash the JedEye application firmware** (see [Firmware Update](./Firmware-Upgrade)).
9. **Unplug the USB and plug it back in** to power-cycle the device.

The Bluetooth icon should now appear in the Distance Meter.

## Option C — `arduino-fwuploader` CLI (no menu item)

Same constraint as Option B: temporarily replaces the JedEye application firmware on the RP2040, then you re-flash it. Use this on JedEye firmware older than v2.3 if you do not want the Arduino IDE.

### One-time setup

1. Download the latest `arduino-fwuploader` for your OS from [https://arduino.github.io/arduino-fwuploader/](https://arduino.github.io/arduino-fwuploader/).
2. Extract and place the executable on your PATH (e.g. `C:\Tools\` on Windows added to PATH; `/usr/local/bin/` on macOS / Linux).

### Update

Find the COM port for your JedEye:

- **Windows**: Device Manager → Ports (COM & LPT). Typically `COM4`.
- **macOS**: `ls /dev/cu.usbmodem*`
- **Linux**: `ls /dev/ttyACM*`

Run:

```sh
arduino-fwuploader firmware flash \
    --fqbn arduino:mbed_nano:nanorp2040connect \
    --address COM4 \
    --module NINA@3.0.1
```

(Replace `COM4` with your actual port.)

Then re-flash the JedEye application firmware (see [Firmware Update](./Firmware-Upgrade)) and power-cycle.

### Windows convenience wrapper

`scripts/update_nina_firmware.ps1` (in the JedEye firmware repository) wraps the above and auto-detects the COM port. From a PowerShell prompt at the repo root:

```powershell
.\scripts\update_nina_firmware.ps1
```

## Troubleshooting

- **"Failed to detect an Arduino board"** — Another program is holding the COM port (PlatformIO Serial Monitor, Arduino IDE Serial Monitor, a BLE test client). Close it and retry.
- **"Timeout waiting for the chip to respond"** — Usually a flaky USB cable or hub. Use a direct USB port on the PC and a known-good cable.
- **Update finished but TopoDroid still can't see the device** — Power-cycle the JedEye (unplug USB, wait a few seconds, replug). The NINA needs a cold boot after the firmware flash; a soft reset is not always enough.
- **WiFi works but Bluetooth doesn't** — This is the signature symptom of a host library / NINA firmware mismatch. Confirm the JedEye is running v2.3+ firmware (which pins the matching host libraries) and that the NINA firmware update finished without errors.

## Verifying

The quickest verification:

1. Switch the JedEye to **Distance Meter**. The Bluetooth icon should now appear in the bottom-right corner.
2. Open TopoDroid → **Device** screen → **BT Scan**. You should see `JedEye_<your-serial>` in the list.

If you have the Arduino IDE installed, **Tools → Firmware Updater** also reads back the current NINA version on a connected board — it should now show `3.0.1` (or newer).
