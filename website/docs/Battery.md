# Battery

- The JedEye contains a 2S - 450 mAh sealed lipo battery.
- The JedEye should be charged with a dedicated 5V USB charger. It requires no more than 150mA charging current.
If no charger is available, the USB port of your computer can be used.
- The red LED indicates that the charge is in progress. It will turn off when the charge is complete.
- The blue LED indicates that an adequate power supply is connected.


It is recommended to have the JedEye turned OFF before connecting for a charge.

> Note that if the device is ON and connected to a charger, it will not turn off when you select EXIT in the main menu but simply go into Energy Saver mode ( Blinking Battery icon on the screen )

## Battery level

The JedEye shows the battery level on the info screen, as a **percentage** or a
**voltage** (switch with the `usebatterypercent` / `usebatteryvoltage` CLI
commands). When the pack gets low you'll see a **low-battery warning at about
10%**, and at about **5%** the device powers itself off automatically so an
in-progress survey is saved and closed cleanly before the battery's own
protection cuts power. That automatic power-off can be turned on/off from the
**Battery** section of the web Settings page (or the `setlowbatteryshutdown` CLI
command); the warning is unaffected.

### Making the gauge match your device (optional)

Two one-time steps make the reading accurate for your own unit. Connect over USB
for both.

1. **Calibrate the voltage** — corrects small electrical differences between
   units. Measure the pack with a multimeter and run `calibratebattery 8.23`
   (whatever your meter reads). It's saved per device and survives a settings
   reset.

2. **Build the battery curve** — teaches the device your pack's discharge shape
   so the **percentage** is accurate from full to empty. Do the voltage
   calibration *first*, then:
   - Charge the JedEye fully.
   - Run `batterylog start`.
   - When the screen says **"Disconnect the USB cable"**, unplug it.
   - Leave the device running on battery (it shows a white screen) until it
     switches itself off when empty.
   - Power it back on — your battery curve is now in use.

   View the stored curve with `batterylog dump`, clear it with `batterylog
   reset`, or plot it on a computer with the `battery_table_plot.py` helper
   script. The curve survives a settings reset.

If you skip these, the JedEye still works fine using a sensible built-in curve.




