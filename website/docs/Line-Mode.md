# Line Mode

## Starting a survey
From the main menu select **SURVEY**
The screen will display options similar to:

![screencap_2025-12-29_15-47-31.png](/img/screencap_2025-12-29_15-47-31.png)

In this menu you can choose the name of the section you are surveying.

![screencap_2025-12-29_15-48-19.png](/img/screencap_2025-12-29_15-48-19.png)

In our example the section is called AB1. You can navigate from one letter to the other moving the slider _DOWN_
and change the current letter by moving the slider _UP_. Once done select OK.

The menu will give you the choice of the direction you are surveying, IN or OUT.

![screencap_2025-12-29_15-48-33.png](/img/screencap_2025-12-29_15-48-33.png)

- **IN** means you are going from already surveyed shots to new ones 
- **OUT** means you are coming from new shots going towards already known ones.


## Surveying a shot

To survey a shot:
- position yourself with the JedEye at the beginning of the shot
- position the reflective target on the end of the shot

Select **TARGET**

![screencap_2025-12-29_15-49-07.png](/img/screencap_2025-12-29_15-49-07.png)

At that moment the laser will turn on and the distance (D)  will be displayed as well as the pitch angle (P) and the heading (H)

![screencap_2025-12-29_15-49-22_mod.png](/img/screencap_2025-12-29_15-49-22_mod.png)

A laser icon will be blinking at the rythme at which the laser obtains new distance reading. This gives valuable information 
on the quality of the reading being obtained.

A that moment, if the laser beam if pointed at the target, you can select MEASURE, the display will show a _RED_ square: 

![screencap_2025-12-29_15-49-29.png](/img/screencap_2025-12-29_15-49-29.png)


**_The device is waiting to be stabilized to measure the azimuth._**

Once the measure is done you get back to the menu with TARGET and a WHITE SQUARE, the shot number will have been increased by 1.

### When the laser cannot measure {#lidar-messages}

_From firmware v2.9.5_ the laser measures in its accurate mode: on a dark or distant target a reading can take a
moment longer, and the laser icon blinks more slowly. While there is no distance, the screen shows `-.--`.

If you select **MEASURE** while there is no distance, the JedEye stores nothing. It shows why for a moment, then goes
back to aiming: aim again, or change the target.

| Message | What it means |
|---|---|
| **NO DISTANCE** | No reading yet, or nothing came back from the target |
| **WEAK SIGNAL** | The return is too weak: a dark target, or a dirty or scratched laser window |
| **STRONG SIGNAL** | The return is too strong: a too reflective target |
| **TOO BRIGHT** | Too much ambient light |
| **OUT OF RANGE** | The target is too close or too far |
| **UNSTABLE** | The return was unstable: hold the JedEye still |
| **BAD READING** | The reading was invalid: measure again |
| **TOO COLD**, **TOO HOT** | The laser module is below -20 °C or above +60 °C |
| **LOW VOLTAGE** | The laser module's supply is too low: charge the battery |
| **LIDAR FAULT**, **LIDAR CMD ERR**, **LIDAR ERROR** | A fault in the laser module: note the message and contact support |

Earlier firmware kept the last distance on the screen when a reading failed, and stored it with the next shot.

**Repeat the operation …**

Once you reached the last shot of your section select **END**

This will save the section. You are back to the main menu ready to survey the next section !


