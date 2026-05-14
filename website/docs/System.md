# System

The **System** menu provides information about the device and maintenance options.
Navigate to **OPTIONS > SETTINGS > SYSTEM**.

## Info
Displays system information, including:
- Firmware version
- Hardware revision
- Battery status
- Free memory

## Update
This option puts the device into a mode ready for firmware updates.
> Refer to the [Firmware Upgrade](Firmware-Upgrade.md) section for detailed instructions.

## Radio FW Update
Reflashes the radio module's firmware (`nina-fw`). The JedEye carries its own copy of `nina-fw` and writes it onto the radio over an internal serial link — no PC required.

Selecting **RADIO FW UPDATE** opens a confirmation submenu with **Confirm** and **Back**. Pick **Back** to abort without touching anything. Pick **Confirm** to start the update:

- The screen shows the radio's current firmware version on top and the bundled target version underneath, followed by a live progress percentage that climbs to 100% as the flash runs.
- Total time is a few minutes.
- When the flash succeeds, the device shows *Done. Restarting JedEye…* for two seconds and reboots automatically; the JedEye comes back up with the new radio firmware loaded.
- If the in-device flash cannot run (failure, or the firmware was built without the bundled blob), the device drops into the legacy **USB-to-radio passthrough mode** so you can complete the update from a PC.

> Available on firmware **v2.4 and newer**. In firmware v2.3 the same entry lived under [Tools](./Tools); in older firmware the radio firmware can only be updated from a PC. See [Updating the NINA firmware](./Updating-the-NINA-firmware) for the full procedure and troubleshooting.

## Reset Settings
Resets all user-configurable settings to their factory defaults.
> **Warning**: This will erase your custom configurations (calibration data may be preserved depending on implementation).

## Reset Memory
Clears the internal survey memory.
> **Warning**: This action is irreversible. Ensure all important survey data has been offloaded before proceeding.

---
## Maintenance Tips
- Do not let the battery drain completely. Charge it once per month even if not in use.
- Rinse JedEye with fresh water after each use.
- Ensure the optical ports for the Lidar are clean and free of scratches.

