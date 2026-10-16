# Calibrating the IMU (Accelerometer)

In the menu navigate to : 

**OPTIONS > SETTINGS > SENSORS > IMU**

The calibration is done by moving the device through 12 different positions, 
the order in which it is done is not important nor the exact positioning,
the important thing is that the device stays perfectly stable 
during IMU measurement on each of those 12 positions.

You can use the 6 flat sides of the devices and rest the device at +/-45 degrees on 6 of its edges.


Once stabilized on a positioning move the slider upwards. You'll see a blue bar counting down.
During that count down various IMU readings are taken for calibration.
A _red progress bar_ will more forward until all 12 position are covered.

![alt text](../static/img/screencap_2026-01-02_14-39-47.png)

At the end, in the menu, select _**Validate**_, than _**Calculate**_.
This will display the result of the calibration, you can ignore the values displayed in the next screens and finish with **_Save_** the calibration.

To leave without saving, select **CANCEL**. _From firmware v2.9.5_ the JedEye then keeps its previous IMU
calibration; earlier firmware ran without one until the next start-up.

> _From firmware v2.9.1_ the inclination reads the full ±90° using this calibration. After updating from an
> earlier version, run the IMU calibration once: until you do, the inclination stops at about 88°, as before.
