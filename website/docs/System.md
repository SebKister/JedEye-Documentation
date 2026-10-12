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

## OTA Update
Updates the JedEye firmware **over WiFi**, without a computer or cable.

Selecting **OTA UPDATE**:
- Turns WiFi on and connects to a saved network if it isn't already connected (and turns it back off afterwards if there was nothing to install).
- Checks the release server for a newer version. If one is available it shows the version and waits for you to pick **Confirm** to install, or **Back** to cancel.
- Downloads the new firmware, shows a live progress percentage, then reboots into it. If the radio module also needs a newer firmware, it is updated over the air in the same step (see [Updating the NINA firmware](./Updating-the-NINA-firmware)).

You can also let the JedEye prompt you automatically: when WiFi connects and a newer firmware is published, it offers to install it right there. _From firmware v2.9.5_ it asks on the first connection after the JedEye starts, rather than each time WiFi is switched on.

> Requires a WiFi network the JedEye can join, with internet access to reach the release server — see [Wireless Data Transfer](./WIFI-Data-transfer) for connecting to a local network. If the download can't complete, the running firmware is left untouched — nothing changes until a full, valid update has been received. The USB drag-and-drop method under **Update** above remains available as a fallback.
>
> Available on firmware **v2.6 and newer**.

> **Updating on battery (v2.6.2+):** from v2.6.2 an OTA update installs safely while running on battery, not only on USB power. To switch this on you must **install v2.6.2 once over USB** — a wireless update can't replace the part responsible — after which all future OTA updates work on battery. See [Firmware Update](./Firmware-Upgrade).

> **From firmware v2.9.5:**
> - The update does not start on a low battery: the screen shows **Battery too low. Charge and retry.** The radio
>   flash alone takes minutes, and a power cut during it can leave the radio without a working firmware.
> - If the radio module does not answer, the screen shows **Radio not answering** and **WiFi unavailable.** (see
>   [Updating the NINA firmware](./Updating-the-NINA-firmware#troubleshooting)).
> - The radio's new firmware is read back and checked before the update is called done. If the radio's part fails,
>   the screen shows **Radio update FAILED**, where it stopped, and either **Radio unchanged** (the radio keeps its
>   previous firmware: try again later) or **WiFi may not work** (the flash stopped part way: reflash the radio from a
>   PC, see [Updating the NINA firmware](./Updating-the-NINA-firmware)). A JedEye firmware downloaded in the same
>   update still installs (**App ready.**).

## Radio FW Update
Reflashes the radio module's firmware (`nina-fw`). The JedEye carries its own copy of `nina-fw` and writes it onto the radio over an internal serial link — no PC required.

Selecting **RADIO FW UPDATE** opens a confirmation submenu with **Confirm** and **Back**. Pick **Back** to abort without touching anything. Pick **Confirm** to start the update:

- The screen shows the radio's current firmware version on top and the bundled target version underneath, followed by a live progress percentage that climbs to 100% as the flash runs.
- Total time is a few minutes.
- When the flash succeeds, the device shows *Done. Restarting JedEye…* for two seconds and reboots automatically; the JedEye comes back up with the new radio firmware loaded.
- _From firmware v2.9.5_ the flash is read back and checked before it is called done. If a step fails, the screen
  says where it stopped (for example **Write: no reply** or **Verify: mismatch**) with **Flash failed.**
- If the in-device flash cannot run (failure, or the firmware was built without the bundled blob), the device drops into the legacy **USB-to-radio passthrough mode** so you can complete the update from a PC.

> Available on firmware **v2.4 and newer**. In firmware v2.3 the same entry lived under [Tools](./Tools); in older firmware the radio firmware can only be updated from a PC. See [Updating the NINA firmware](./Updating-the-NINA-firmware) for the full procedure and troubleshooting.

## WiFi Storage
_From firmware v2.9.5._ Checks that the radio module can still save files. Its storage holds the saved WiFi
networks and the room scans of every survey, so a storage that no longer saves loses new room scans and network
changes.

Selecting **WIFI STORAGE > CHECK** writes a small test file and reads it back:
- **Storage OK**: the storage works, and it is left untouched.
- **Radio not answering**: the radio module did not respond (see
  [Updating the NINA firmware](./Updating-the-NINA-firmware#troubleshooting)).
- If the storage no longer saves, the screen shows **Not saving. Repair erases ALL room scans + WiFi**, then the
  **Erase store ?** menu, with the cursor on **BACK**.

**ERASE ALL SCANS** erases the storage so that the radio formats a clean one. **It deletes the room scans of every
survey on the JedEye, and the saved WiFi networks.** Download your surveys first; the shots themselves stay in the
JedEye's own memory. It ends with one of:
- **Repaired**, **Room scans erased.**, **Add networks again**: the storage saves again. Add your WiFi networks
  again from the [settings page](./WIFI-Data-transfer#wifi-network-management).
- **Still failing** or **Erase failed**: the storage still does not save.
- **Radio not supported**: the radio's firmware is too old for the repair. Update it first
  ([Updating the NINA firmware](./Updating-the-NINA-firmware)).
- **Finish survey first**: the repair is refused while a survey is open.

Over USB, the serial command `checkwifistorage` runs the same check, and `repairwifistorage confirm` the repair.

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

