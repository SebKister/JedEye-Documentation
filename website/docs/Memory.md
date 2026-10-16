# Memory Management

JedEye can save around 5000 shots.
You can see the amount of memory used on the bottom bar in the main menu.

You can erase the memory by going to:
**OPTIONS > SETTINGS > SYSTEM > MEMORY**

> We recommend downloading the data from the JedEye after each survey session, backing up the data as DMP and erasing the data from the device in order to start next session with an empty memory.
> 

A DMP you have backed up can be turned into a spreadsheet at any time — drop it on
[converter.arianesline.com](https://converter.arianesline.com).

## Messages {#messages}

_From firmware v2.9.5:_

- **MEMORY FULL**: the memory cannot hold another shot. The shot is not recorded, and the survey stays open so that
  you can still **FINISH** it: room for that is always kept. Starting a survey is refused the same way when the
  memory could not hold its first shot. Download your data and erase the memory to free it.
- **MEMORY ERROR**: the JedEye could not read or write its memory, so it refuses to go on rather than risk the
  surveys already stored. The main menu's memory gauge shows **M:?%** while the memory cannot be read. Restart the
  JedEye; if the message comes back, download your surveys.
- **SURVEY RECOVERED**: shown at start-up when the JedEye lost power, or restarted, in the middle of a survey. The
  survey is closed at its last recorded shot, and everything recorded before is kept. Waking from sleep resumes the
  survey instead.
- A CSV download that met a memory read failure ends with the line **EEPROM READ FAILED - export incomplete**, so an
  incomplete file is never mistaken for a complete one.
