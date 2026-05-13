# Tools

The **Tools** menu provides access to various diagnostic and utility functions.
Navigate to **OPTIONS > TOOLS** to access these features.

## Distance Meter
This tool activates the Lidar and IMU sensors to continuously measure distance and orientation.
- Press **Select** to toggle the laser pointer on/off.
- Press **Next** to exit.

## Test Mode
This mode runs a diagnostic test on all sensors (IMU, Compass, Lidar, etc.) and displays the raw values. It is useful for verifying that all hardware components are functioning correctly.

## Magneto
The Magneto tool is used to analyze magnetic interference.
> The earth magnetic fields goes from 25uT to 65uT depending on your location.

By moving the JedEye closer or further from your equipment (lights, diving gear), you can observe the fluctuation in the magnetic field reading. Large fluctuations indicate significant magnetic interference which may affect compass accuracy.

## Radio FW Update
This tool puts the JedEye into a **USB-to-radio passthrough** mode so the radio module's own firmware (`nina-fw`) can be flashed from a PC. The JedEye application firmware on the RP2040 stays intact — power-cycle when the update is done and you are back to normal operation.

You need this only once, when migrating an older JedEye (firmware ≤ v2.2.x, shipped with NINA radio firmware 1.5.0) to v2.3+ — the new BLE protocol used for TopoDroid integration requires NINA firmware 3.0.1 or newer.

While the tool is active, the OLED shows a "RADIO FW UPDATE" screen indicating the device is bridging USB and the radio module. Do not unplug or power-cycle the device until the host-side update tool reports success.

For the full step-by-step procedure (host-side tools, troubleshooting, verification), see [Updating the NINA firmware](./Updating-the-NINA-firmware).

