# Distance Meter

The **Distance Meter** is a tool that allows you to use the JedEye's sensors (Lidar and IMU) to measure distance, azimuth, and pitch in real-time without recording the data as a shot in a survey.

## Access
Navigate to **OPTIONS > TOOLS > DISTANCE METER** in the main menu.

## Interface
When active, the screen displays the real-time readings from the sensors:
- **Distance**: Distance to the target in the selected unit.
- **Azimuth**: Magnetic heading (compass bearing).
- **Pitch**: Vertical angle (inclination).

In the menu you can choose:
- **MEASURE**: Capture the current readings and broadcasts it on Bluetooth
- **EXIT**: Return to the **Tools** menu.

## Usage

### taking a Measurement
1. Aim the device at the target.
2. Ensure the **MEASURE** option is selected (use the **Next** button to toggle if needed).
3. Press the **Select** button.
   - The screen will flash white briefly to confirm the action.
   - The "Saved" values on the screen will update to the captured readings.
   - The captured values (Distance, Azimuth, Pitch) are broadcasted via Bluetooth Low Energy (BLE) to any connected device.

### Exiting
1. Press the **Next** button to select **EXIT**.
2. Press the **Select** button to leave the Distance Meter mode.

## Bluetooth Broadcasting
While in Distance Meter mode, the device continuously broadcasts the last captured measurement data. This feature is useful for survey apps or external displays that can consume the real-time or captured data stream. Wifi will be turned off in that phase.



