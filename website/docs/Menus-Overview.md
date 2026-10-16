# Menus Overview

This document provides a visual representation of the JedEye menu structure.

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
        Calibration(Calibration)
        DevSet(Device Settings)
        System(System)
        
        Settings --> SurveyMode
        Settings --> Calibration
        Settings --> DevSet
        Settings --> System
    end
    
    %% Calibration Submenu
    subgraph CalibrationMenu [Calibration]
        direction TB
        CalCompass(Calibrate Compass)
        CalIMU(Calibrate IMU)
        
        Calibration --> CalCompass
        Calibration --> CalIMU
        
        CalCompass --> CalCompFast(Calibrate)
        CalCompass --> StabFactor(Stabilization Factor)
        
        CalIMU --> NextPos(Next Position)
        CalIMU --> SaveCalIMU(Save Calibration)
    end
    
    %% Device Settings Submenu
    subgraph DeviceSettingsMenu [Device Settings]
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
        OTAUpdate(OTA Update)
        ResetSet(Reset Settings)
        ResetMem(Reset Memory)
        RadioFW(Radio FW Update)
        WiFiStorage(WiFi Storage)
        
        System --> SysInfo
        System --> Update
        System --> OTAUpdate
        System --> ResetSet
        System --> ResetMem
        System --> RadioFW
        System --> WiFiStorage
    end

    
    %% Tools Submenu
    subgraph ToolsMenu [Tools]
        direction TB
        TestMode(Test Mode)
        Magneto(Magneto)

        Tools --> TestMode
        Tools --> Magneto
    end
```

