# Firmware Update

There are two ways to update the JedEye firmware:

- **Over WiFi (no cable)** — the easiest way, on firmware **v2.6 and newer**: **OPTIONS > SETTINGS > SYSTEM > OTA UPDATE**. The JedEye downloads and installs the latest firmware itself. See [OTA Update](./System#ota-update).
- **Over USB (drag-and-drop)** — the classic method, and the fallback if the device has no WiFi access, described below.

## Update over USB

- Download the [latest firmware](https://github.com/Ariane-s-Line/JedEye-Release/releases/latest) on Github ( It’s a file with a .UF2 extension)
- Connect the device via the USB cable to your computer and go to:

**OPTIONS > SETTINGS > SYSTEM > UPDATE**

The device will turn off until the update is finished.

> The device should appear in your file explorer as a USB Memory stick would.

- Copy the firmware file you downloaded there. That should trigger a reboot of the JedEye and install the new firmware.
- After updating the firmware, disconnect from the computer and turn off the JedEye. 
> The next time you turn the JedEye ON, the new firmware will be fully functional.

