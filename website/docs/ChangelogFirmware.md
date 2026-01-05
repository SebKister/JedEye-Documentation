# Change Log Firmware


## v2.2.0 ##

### New Features
- **Compass Export**: Added support for exporting survey data in Compass (`.dat`) format.
- **Improved Data Transfer**:
    - **Per-Section Downloads**: Surveys are now downloaded individually via the history list (THE, SVX, DAT) to ensure better data organization and prevent large file handling issues.

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





