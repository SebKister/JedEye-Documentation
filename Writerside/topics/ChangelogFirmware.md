# Change Log Firmware


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




