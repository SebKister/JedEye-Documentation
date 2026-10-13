# Device Settings

The **Device Settings** menu allows you to configure the physical behavior of the JedEye.
Navigate to **OPTIONS > SETTINGS > DEVICE** to access these options.

## OLED Contrast
Adjusts the brightness of the OLED display.
- Value ranges from 0 to 15.
- Use **Select** to increment the brightness. Cycling past the maximum resets to the minimum.

## Auto Sleep
- Configures the automatic sleep mode. When activated the device will go into sleep mode after each shot has been surveyed.

## Unit Choice
Selects the unit of measurement for distance.
- Options: **Metric (m)** or **Imperial (ft)**.


## Repeat Measure
Toggles the repeat measurement feature.
- **ON**: The device will measure twice each shot, if the shot diverge too much a new reading has to be taken (**HIGHLY RECOMMENDED**).
- **OFF**: One single measurement is taken.

## SafeON
Toggles the safe power-on feature.
- **ON**: The device requires a confirmation sequence to power on (long press UP than short down), preventing accidental activation in transport.
- **OFF**: The device powers on immediately after long press UP.

## BLE
_From firmware v2.9.0._ Toggles Bluetooth in the [Distance Meter](./Distance-Meter).
- **ON** (default): the JedEye advertises over Bluetooth in the distance meter and streams each shot to a connected
  phone (e.g. TopoDroid).
- **OFF**: the Bluetooth radio stays idle, which saves battery when you only read distances on the device.

## DIST.SAVER
_From firmware v2.9.0._ The distance meter's battery saver.
- **ON**: the laser stays off between shots: press **AIM** to light it and aim, then **MEASURE** to take the reading.
- **OFF** (default): the laser stays on while the distance meter is open, and one **MEASURE** press takes the
  reading.

