# Change Log Firmware


## v2.4.2 ##

### New Features
- **Scan-to-connect QR codes**: turning on the WiFi access point now shows QR codes on the screen so you no longer have to type the network name, password or IP address. Scan the first QR to join the JedEye network; once your phone connects the screen switches to a second QR (and prints `http://192.168.4.1` below it) that opens the web interface. The QR clears automatically once the page loads. See [Wireless Data Transfer](./WIFI-Data-transfer#scan-to-connect-qr-codes).
- **Automatic web-page open (captive portal)**: on most phones the JedEye web page now opens by itself the moment you join the access point — the same "Sign in to network" prompt you get on public WiFi. Newer Android phones that only check connectivity over HTTPS won't trigger this automatically; on those, the open-page QR (or typing the address) always works. This required a small update to the radio module firmware, so this release includes a one-time radio firmware update — see *Improvements* below.
- **QR code on your local WiFi too**: when the JedEye connects to your own local network (Station Mode) it now shows a QR code with its web address, so you can scan to open the page from any device on the same network without looking up the IP. See [Wireless Data Transfer](./WIFI-Data-transfer#connecting-to-a-local-wifi-network).

### Improvements
- **Updated radio firmware**: v2.4.2 ships a patched radio module firmware so the access point hands connecting devices a DNS server (needed for the automatic page-open above). After flashing v2.4.2, run **OPTIONS > SETTINGS > SYSTEM > RADIO FW UPDATE** once to update the radio module. See [Updating the NINA firmware](./Updating-the-NINA-firmware).

### Bug Fixes
- **Web requests from some clients were dropped**: requests from clients that close their connection immediately after sending (common with phone connectivity checks) could be ignored by the web server. The server now reads the full request in these cases.

### Documentation
- [Wireless Data Transfer](./WIFI-Data-transfer) updated with the scan-to-connect QR flow and the automatic page-open behaviour.


## v2.4.1 ##

### New Features
- **3D Web View**: the embedded webserver now offers an interactive 3D view of each survey, reached from a new **3D** button on the 2D `View` page. The view renders the survey path with depth colouring (blue = deepest, red = highest), the full per-shot lidar point cloud, an auto-scaling ground grid (centimetres or metres depending on the survey extent), and a compass-rose E/N/U axes widget. Left-drag rotates, right-drag dollies the camera, scroll wheel or pinch zooms, and clicking a station re-centres the orbit. Like the rest of the JedEye web interface, it works over Access Point mode with no internet access — there are no external dependencies. See [Wireless Data Transfer](./WIFI-Data-transfer).
- **Lidar outline on 2D map**: the existing 2D survey view now also draws the per-shot lidar outline (previously the data was collected but not rendered on the web view).

### Improvements
- **Redesigned web interface**: a new dark theme with self-hosted fonts (Inter and JetBrains Mono) bundled into the firmware — no Google Fonts or external CDN, so the UI renders correctly in Access Point mode where there is no internet route. The landing page has a clearer header with the device name and serial, an action grid for the download options, and a two-line survey list. The [JedEye Settings](./WIFI-Data-transfer#jedeye-settings-webpage) page has a card layout, segmented controls for date format / stabilization preset / sensitivity preset, and a cleaner WiFi network list with a green-dot SSID prefix.
- **New favicon**: the browser tab now shows the JedEye logo instead of the previous MNemo icon.
- **Settings page copy** refined: the descriptions for stabilization, slider button, confirm-measure, switch-on safety and auto-sleep have been rewritten to make their actual effect clearer.
- **Web UI accessibility**: the active option in each segmented control is now correctly announced as the current selection by screen readers, and is no longer (incorrectly) focusable as a link.

### Bug Fixes
- **Volumetric data dropped on save (v2.4.0 regression)**: on v2.4.0 the per-shot lidar volume could appear to save successfully on the device — progress bar to 100 %, no error reported — but the bytes would not actually land on the radio module's flash, so the volume block was missing from the data dump. The race that caused this was hidden when the device was tethered to USB, so the failure most often appeared on the field. v2.4.1 holds the CPU across the chunked transfer to the radio and the volume is now reliably written. **If you ran v2.4.0 in the field, upgrade to v2.4.1 before relying on the lidar point cloud in any of those surveys.**
- **2D web map mirrored vertically**: the 2D survey view sent by the webserver was flipped on the Y axis (north pointing down). Fixed.
- **Stylesheet silently truncated**: the page stylesheet was being cut off at the radio's transmit buffer, so most of the page rendered with default browser styling. The CSS is now streamed in small chunks like the favicon and the other static assets, with a cache header so a return visit doesn't re-fetch it.
- **Long survey list truncation**: the survey list on the landing page could truncate a row's markup once the meta sub-line was added. The internal buffer has been enlarged.
- **Sensitivity preset chips** (Low / Mid / High / Ultra-High) on the Settings page were returning *Not Found* instead of changing the threshold. Fixed.
- **HTML escaping**: the device name and serial are now HTML-escaped in the page header, so a special character in a custom device name (set via the CLI `setname` command) can no longer break the page.
- **EEPROM write reduction**: opening the Settings page no longer rewrites the entire settings block to EEPROM. The settings are now written only when a setting actually changes, preserving EEPROM lifetime over long use.
- **HTTP routing**: routes can no longer shadow each other as prefixes. Out-of-range `id` parameters on the survey views now return a 400 instead of reading past the end of the survey list.

### Documentation
- [Wireless Data Transfer](./WIFI-Data-transfer) updated to describe the redesigned web UI and the new 3D survey view.


## v2.4.0 ##

### New Features
- **In-device radio firmware update**: the JedEye now carries its own copy of the radio module firmware (`nina-fw`) and can reflash the module itself. No PC, no Arduino IDE, no `arduino-fwuploader`. The new flow lives at **OPTIONS > SETTINGS > SYSTEM > RADIO FW UPDATE** and is gated by a *Confirm / Back* submenu so it cannot fire on a stray click. While the flash runs, the screen shows the current and target radio firmware versions and a progress percentage; when it succeeds the JedEye automatically reboots into the new firmware. See [Updating the NINA firmware](./Updating-the-NINA-firmware).

### Improvements
- **Menu reorganisation**: *Radio FW Update* moved from **OPTIONS > TOOLS** to **OPTIONS > SETTINGS > SYSTEM**, alongside the other firmware-management entries (Update, Reset Settings, Reset Memory). The old Tools location now carries a pointer to the new spot.
- **Automatic passthrough fallback**: builds that do not embed the radio firmware blob (offline builds, explicit opt-out) still expose *Radio FW Update*. Picking *Confirm* drops into the v2.3 USB-to-radio passthrough mode automatically so a PC tool can complete the update.
- **Robustness during a flash**: the in-device flasher disables button input, button-repeat handling and the serial CLI for the duration of the operation, and uses framework-level yield primitives rather than the cooperative task scheduler, so no other task can fire mid-flash and corrupt the radio session. The receive-side timeout is also wrap-safe around the 49.7-day uptime rollover.

### Documentation
- [Updating the NINA firmware](./Updating-the-NINA-firmware) reorganised: the new in-device path is **Option D** and is recommended; the v2.3 passthrough is **Option A**; the host-side Arduino IDE and `arduino-fwuploader` paths remain available as Options B and C.
- [System](./System) and [Tools](./Tools) updated to reflect the menu move; the [Menu Tree](./Menu-Tree) diagram shows *Radio FW Update* under *System*.


## v2.3.0 ##

### New Features
- **TopoDroid integration**: the [Distance Meter](./Distance-Meter) now exposes a Bluetooth Low Energy protocol that [TopoDroid](https://github.com/marcocorvi/topodroid) discovers and connects to as a first-class device. Each shot you capture on the JedEye streams directly into the survey's shot list, and TopoDroid can also trigger a measurement remotely (handy when the device is mounted on a tripod). The advertised name is `JedEye_<serial>` and the wire format is the SAP6 17-byte shot frame on JedEye-specific 128-bit GATT UUIDs.
- **Radio FW Update tool**: a new entry in **OPTIONS > TOOLS** puts the JedEye into a USB-to-radio passthrough mode so the radio module's firmware can be updated from a host PC without overwriting the JedEye application firmware. See [Updating the NINA firmware](./Updating-the-NINA-firmware).

### Requirements
- This release requires **NINA radio firmware 3.0.1 or newer**. Devices shipped with v2.2.x or earlier carry NINA firmware 1.5.0 and must be updated once before the new BLE protocol works. The Distance Meter's Bluetooth icon will not appear if the NINA firmware is out of date.

### Improvements
- **BLE robustness**: all BLE writes are now serialised through a single deferred point in the cooperative scheduler, eliminating a class of freezes caused by re-entering the radio's HCI queue from event handlers or deep menu callstacks.
- **Library bumps**: `ArduinoBLE` 1.3.6 → 2.0.2 and `WiFiNINA` 1.9.1 → 2.0.1, in line with the new NINA firmware family.

### Documentation
- New page: [Updating the NINA firmware](./Updating-the-NINA-firmware), covering the in-device *Radio FW Update* path, the Arduino IDE Firmware Updater, the `arduino-fwuploader` CLI, and the Windows PowerShell convenience wrapper.
- The [Distance Meter](./Distance-Meter) page has been rewritten to describe the new BLE service, TopoDroid pairing, and the protocol details for third-party apps.


## v2.2.0 ##

### New Features
- **Compass Export**: Added support for exporting survey data in Compass (`.dat`) format.
- **Improved Data Transfer**:
    - **Per-Section Downloads**: Surveys are now downloaded individually via the history list (THE, SVX, DAT) to ensure better data organization and prevent large file handling issues.
- **WiFi Network Management**:
    - Added ability to manage local WiFi networks directly from the JedEye Settings webpage.
    - Users can now View, Add, and Remove stored WiFi networks for Station Mode connections.

### Improvements
- **Documentation**: Updated user manual to reflect new export options.
- **Web Interface**: Refined download options on the main page.


## v2.1.0 ##

## Overview
This release introduces significant enhancements to connectivity and tooling, including Bluetooth Low Energy (BLE) broadcasting, an improved Distance Meter, and a new Data Dump format (V7) that embeds firmware versioning. Additionally, documentation has been expanded with a new user manual submodule.

## New Features

### Bluetooth Low Energy (BLE) Support
- **Broadcasting**: The device now broadcasts key metrics such as distance, pitch, and heading via BLE.
- **UI Integration**: Added a Bluetooth icon to the GUI to interpret connection status.
- **Performance**: Optimized task scheduling for BLE operations to ensure minimal impact on main loop performance.

### Distance Meter & Calibration
- **Distance Measurement**: New dedicated tool for measuring distance with "Measure" and "Exit" functionality.
- **IMU Calibration**: Added new display screens for IMU calibration results, showing `fV`, `finvW`, and `fR0` matrices directly on the device.

### Data Management
- **File Format V7**: The data dump (`.dmp`) format has been updated to Version 7.
- **Firmware Versioning**: The dump header now includes Major, Minor, and Revision numbers, ensuring better compatibility tracking between device data and analysis tools.


## Improvements

### Documentation
- **User Manual**: Integrated a comprehensive user manual as a git submodule.
- **Visuals**: Enhanced menu tree visualizations and updated coding rules/architectural conventions.

### Core System
- **Yield Delay**: Adjusted `yieldDelay` timing for better system responsiveness.
- **Refactoring**: Cleaned up various code paths, including parameter ordering fixes and removal of obsolete static analysis configurations.

## Bug Fixes
- Fixed parameter ordering in broadcast updates.
- Resolved trailing whitespace issues in source files.
- Corrected documentation references and submodule pointers.


## v2.0.3 ##

### New Features
- **WiFi Enhancements**:
    - Added "WiFi at Start" functionality to automatically enable WiFi on boot.
    - Enhanced Web Interface with new WiFi controls and CSS styling for a better user experience.
    - Added "Auto Sleep" and "Repeat Measure" configuration options to the web interface.
- **Volume Survey**:
    - Introduced **Pause/Resume** functionality for volume surveys, allowing greater flexibility during data collection.

### Improvements & Refactoring
- **User Interface**:
    - **Menu Reorganization**: Reorganized the menu structure for better navigation. "Extra" is now "Tools", and new "Device Settings" and "System" submenus have been added.
    - **Visuals**: Implemented anti-aliased line drawing for smoother graphics on the OLED display.
    - **Depth Coloring**: Added depth-based coloring support (minZ/maxZ) to the map visualization.
- **System Stability**:
    - **Memory Optimization**: Extensive refactoring of string handling to improve memory safety and prevent fragmentation.
    - **Menu System**: Converted internal menu structure to use linked lists (child/sibling pointers), improving scalability and reducing memory usage.
    - **Cleanup**: Removed unused images, deprecated settings (Screen Orientation), and legacy drivers (BNO08X) to streamline the codebase.
- **EEPROM**: Improved EEPROM address management and replaced blocking delays with `yieldDelay` for better system responsiveness.

### Bug Fixes
- **Data Saving**: Fixed an issue where the `volumeMeasurementFrequency` setting was not being saved.
- **Volume Survey**: Resolved a bug in `saveVolume` that occurred when the volume survey was empty.
- **LIDAR**: Fixed the reading blink indicator condition and reset logic in `stopLidar`.

## v2.0.1 ##

### 🌟 New Features & Improvements
- **3D Map Upgrades**: The 3D map now features clearer directional labels (**N**, **E**, **UP**) and improved visuals for better orientation.
- **Confirm Measure**: A new "Confirm Measure" option has been added to the menu, giving you more control before saving a shot.
- **Distance Meter Mode**: The "Depth Gauge" has been renamed to "**Distance Meter**" to better reflect its versatility.
- **Improved Targeting**: The targeting workflow has been refined, distinguishing clearly between the targeting phase and the measurement phase.
- **ScreenSaver**: Introduced a new **ScreenSaver** mode to save battery while keeping the device ready.
- **Auto-Sleep**: Added an **Auto-Sleep** feature to automatically power down the device after inactivity.
- **Safe Power-On**: Added a confirmation step when turning on the device to prevent accidental activation.

### 🐛 Bug Fixes
- **False Interference Fix**: Resolved an issue where the device would incorrectly warn about "Magnetic Interference" immediately after waking up.
- **Sleep/Wake Reliability**: Fixed several issues to ensure the device wakes up and restores your session correctly.
- **Battery & Consistency**: Fixed various minor bugs to improve overall system stability and battery reading accuracy.

### 🗑️ Removed Features
- **Icon Mode**: The "Icon Mode" display option has been removed to streamline the interface.

## v1.1.0 ##

- This is the first public release of the firmware for the Jed'Eye.





