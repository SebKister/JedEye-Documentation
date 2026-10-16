# Tools

The **Tools** menu provides access to various diagnostic and utility functions.
Navigate to **OPTIONS > TOOLS** to access these features.

## Distance Meter
Moved in firmware **v2.9.2** to **SURVEY > DISTANCE METER**, next to **NEW SURVEY**: see
[Distance Meter](./Distance-Meter).

## Test Mode
This mode runs a diagnostic test on all sensors (IMU, Compass, Lidar, etc.) and displays the raw values. It is useful for verifying that all hardware components are functioning correctly.

The top line shows the distance and the laser's signal quality, such as `1.23m:Q47`: the lower the **Q**, the
stronger the laser's return. _From firmware v2.9.5_, while there is no distance it shows why instead
([the messages](./Line-Mode#lidar-messages)).

### Comparing the laser of two JedEyes {#lidarinfo}

_From firmware v2.9.5_, over USB, the serial command `lidarinfo` reads the laser module's own information: its
status, hardware and software versions, serial number, supply voltage and offset. Run it from a menu, with the
laser off. It also prints the measurements since start-up, their mean signal quality, and the failed measurements.

To compare two JedEyes, put each in **TEST MODE** aimed at the same wall from the same spot for 30 seconds, then
run `lidarinfo` on each. A higher mean signal quality, or more failed measurements, means a weaker return: check
the laser window first, for dirt and scratches.

## Magneto
The Magneto tool is used to analyze magnetic interference.
> The earth magnetic fields goes from 25uT to 65uT depending on your location.

By moving the JedEye closer or further from your equipment (lights, diving gear), you can observe the fluctuation in the magnetic field reading. Large fluctuations indicate significant magnetic interference which may affect compass accuracy.

> **Radio FW Update** moved in firmware **v2.4** from this menu to **OPTIONS > SETTINGS > SYSTEM > RADIO FW UPDATE**, alongside the other firmware-management entries. See the [System](./System) page for the current location and [Updating the NINA firmware](./Updating-the-NINA-firmware) for the procedure.

