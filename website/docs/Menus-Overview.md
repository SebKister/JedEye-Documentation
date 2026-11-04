# Menus Overview

This document provides a visual representation of the JedEye menu structure, with each menu's entries in the order
the JedEye shows them. On the screen a setting shows its current value next to its name, such as **UNIT (m)** or
**WIFI START (OFF)**. **OTA Update** is on firmware v2.6 and newer, **WiFi Storage** on firmware v2.9.6 and newer.

## Main Menu Structure

```mermaid
graph LR
    Main(Main Menu)
    Survey(Survey)
    Options(Options)
    Exit(Exit)

    Main --> Survey
    Main --> Options
    Main --> Exit

    %% Survey Submenu
    subgraph SurveyMenu [Survey]
        direction TB
        NewSurvey(New Survey)
        DistMeter(Distance Meter)

        Survey --> NewSurvey
        Survey --> DistMeter
    end

    %% Options Submenu
    subgraph OptionsMenu [Options]
        direction TB
        WiFi(WiFi)
        Settings(Settings)
        History(History)
        Tools(Tools)

        Options --> WiFi
        Options --> Settings
        Options --> History
        Options --> Tools
    end

    %% WiFi Submenu
    subgraph WiFiMenu [WiFi]
        direction TB
        WAP(WiFi AP On/Off)
        WStart(WiFi At Start)
        WOn(WiFi On/Off)
        
        WiFi --> WAP
        WiFi --> WStart
        WiFi --> WOn
    end
    
    %% Settings Submenu
    subgraph SettingsMenu [Settings]
        direction TB
        SurveyMode(Survey Mode)
        Calibration(Sensors)
        DevSet(Device)
        System(System)
        
        Settings --> SurveyMode
        Settings --> Calibration
        Settings --> DevSet
        Settings --> System
    end
    
    %% Sensors (calibration) Submenu
    subgraph CalibrationMenu [Sensors]
        direction TB
        CalCompass(Compass)
        CalIMU(IMU)
        
        Calibration --> CalCompass
        Calibration --> CalIMU
        
        CalCompass --> CalCompFast(Calibrate)
        CalCompass --> StabFactor(Stabilization Factor)
        
        CalIMU --> NextPos(Next)
        CalIMU --> SaveCalIMU(Save)
        CalIMU --> CancelCalIMU(Cancel)
    end
    
    %% Device Settings Submenu
    subgraph DeviceSettingsMenu [Device]
        direction TB
        Contrast(OLED Contrast)
        AutoSleep(Auto Sleep)
        Unit(Unit Choice)
        RepMeas(Repeat Measure)
        SafeON(Safe ON)
        BLE(BLE On/Off)
        DistSaver(Dist. Saver)
        
        DevSet --> Contrast
        DevSet --> AutoSleep
        DevSet --> Unit
        DevSet --> RepMeas
        DevSet --> SafeON
        DevSet --> BLE
        DevSet --> DistSaver

    end
    
    %% System Submenu
    subgraph SystemMenu [System]
        direction TB
        SysInfo(Info)
        Update(Update)
        RadioFW(Radio FW Update)
        OTAUpdate(OTA Update)
        WiFiStorage(WiFi Storage)
        ResetSet("Default (Reset Settings)")
        ResetMem("Memory (Reset Memory)")
        
        System --> SysInfo
        System --> Update
        System --> RadioFW
        System --> OTAUpdate
        System --> WiFiStorage
        System --> ResetSet
        System --> ResetMem
    end

    
    %% Tools Submenu
    subgraph ToolsMenu [Tools]
        direction TB
        TestMode(Test)
        Magneto(Magneto)

        Tools --> TestMode
        Tools --> Magneto
    end
```

