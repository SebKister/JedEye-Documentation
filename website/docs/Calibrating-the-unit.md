# Calibration

The calibrations are crucial for ensuring accurate survey data. They live in the **SENSORS** menu:
navigate to **OPTIONS > SETTINGS > SENSORS**.

## Compass Calibration
**COMPASS** calibrates the magnetometer to compensate for hard and soft iron distortions.
- **CALIBRATE**: _from firmware v2.9.6_ the only compass calibration, the fast one. Turn the JedEye slowly through a
  full turn while nodding and rolling it; the screen shows how much of the calibration's coverage you have reached, and
  grades the result when you save it. See [Calibrating the compass](./Calibrating-the-compass).
- **STAB. FACT**: the stabilization factor. Adjusts the stability required before taking a reading. Higher values provide more accuracy but will require a more stabilized device before taking the measurement.

> _Up to firmware v2.9.4_ the menu offers two compass calibrations: **CALIBRATE**, the standard routine, and
> **CALIBRATE FAST**, a quicker, less comprehensive calibration for field checks.

> **Tip**: Calibrate your compass whenever you change geographical locations significantly or modify the device's mounting configuration.

## IMU Calibration
**IMU** calibrates the Accelerometer. See [Calibrating the IMU](./Calibrating-the-IMU).
- **NEXT**: Move through the required static positions to calibrate the accelerometer. After the last position it
  reads **VALIDATE**, then **CALCULATE**.
- **SAVE**: Saves the calculated calibration constants to non-volatile memory.
- **CANCEL**: Leaves without saving. _From firmware v2.9.6_ the JedEye keeps its previous IMU calibration.
