# Calibrating the compass

**_This is by far the most important calibration of the JedEye._**

> To have a precise and correct calibration it is CRUCIAL to be far away from any magnetic or electromagnetic disturbance.
	
From the main menu select

**OPTIONS > SETTINGS > SENSORS > COMPASS > CALIBRATE**

_From firmware v2.9.5_ **CALIBRATE** is the only calibration, the fast one. Before it starts, the screen says how to
move: **TURN AROUND WHILE NODDING AND ROLLING ABOUT 45 DEG**. Turn the JedEye slowly through a full turn while nodding
it up and down and rolling it from side to side, about 45° each way.

_Up to firmware v2.9.4_ the menu offers **CALIBRATE** _or_ **CALIBRATE FAST**. Rotate the JedEye slowly (as in one full
rotation per 4s) and randomly on all of its 3 axes. If you are not using the _fast calibration_ mode, the device will
expect measures uniformly distributed in the 3D sphere around it. That can take some time and practice to get done.



> The screens below are from firmware v2.9.4 and earlier. Firmware v2.9.5 shows the calibration's coverage instead:
> see [Coverage and grade](#coverage).

The display will show a red progress bar indicating the advance or the calibration process.


![screencap1702386279.png](/img/screencap1702386279.png)

Once the calibration gets close to completion it will turn green and you’ll have more information displayed on the screen

![screencap1702386404.png](/img/screencap1702386404.png)

The relevant information is the amount after ERR% which indicates how close the calibration brought the compass to the theoretical model (uniform magnetic field in any orientation). This value should be around  1%. 

GEOF is the approximation of the magnetic field at that location. The compass of the JedEye is not calibrated to give precise absolute magnetic measurements, nevertheless that gives you an indication of the strength of the magnetic field at your location and should be close to the theorical value ([NCEI Geomagnetic Calculators](https://www.ngdc.noaa.gov/geomag/calculators/magcalc.shtml?useFullSite=true))

## Coverage and grade (firmware v2.9.5) {#coverage}

A calibration is only as good as the range of orientations it saw: turning the JedEye flat on the spot can fit the
readings closely and still be wrong by tens of degrees. From firmware v2.9.5 the screen shows a **COVERAGE** figure
and the bar under it (a count of readings until the first fit):

- **Red**: not enough yet. **SAVE CAL.** is refused, and the screen shows **LOW COVERAGE** for a few seconds: keep
  moving the JedEye through new orientations.
- **Yellow**, from 50%: the calibration can be saved.
- **Green**, from 90%: an excellent coverage.

The screen shows the best calibration found so far, which is the one **SAVE CAL.** stores, so the figure does not
drop while you reach for the button.

After **SAVE CAL.** the result stays on screen until you press **Select**: **CALIBRATED** and a grade, then the
coverage, **ERR %**, **GEOF** and **HI-OFF** figures.

| Grade | When |
|---|---|
| **EXCELLENT** | coverage of 90% or more |
| **GOOD** | coverage of 70% or more |
| **FAIR** | anything less, or an ERR % above 2 |

Redo a **FAIR** calibration, away from any magnetic disturbance.

**CANCEL** leaves the calibration without saving it. From firmware v2.9.5 the JedEye goes back to its previous
calibration; earlier firmware ran without any calibration until the next start-up.

> After a firmware update it is generally recommended to redo a calibration of the compass but it is important to turn the device completely off before doing the calibration or you'll get incoherent measurements


> I can’t insist enough on the fact that there’s NO WAY to get a precise survey without a precise and correct calibration of the compass.
> The average calibration time is 1min in fast mode and up to 10min in standard calibration (firmware v2.9.4 and earlier). If the calibration is not finished after 10min, turn JedEye off and on again and restart the calibration. 




