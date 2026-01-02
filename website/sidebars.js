/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'Starter',
    'ChangelogFirmware',
    'Device-Description',
    'Switching-Mnemo-ON',
    'Menu-Navigation',
    'Menus-Overview',
    'Main-Menu',
    'Menu-Tree',
    {
      type: 'category',
      label: 'Calibrating the Unit',
      link: { type: 'doc', id: 'Calibrating-the-unit' },
      items: [
        'Setting-the-Unit-System',
        'Calibrating-the-IMU',
        'Calibrating-the-compass',
      ],
    },
    {
      type: 'category',
      label: 'Survey Mode',
      link: { type: 'doc', id: 'Survey-Mode' },
      items: [
        'Survey-Flow',
        'Line-Mode',
        'Volume',
        'Interference-Marker',
        'Surveying-The-big-picture',
      ],
    },
    'Survey-History',
    'Memory',
    'Device-Settings',
    'Battery',
    {
      type: 'category',
      label: 'Tools',
      link: { type: 'doc', id: 'Tools' },
      items: [
        'Distance-Meter',
      ],
    },
    'WIFI-Data-transfer',
    'Firmware-Upgrade',
    'System',
    'Tips-And-Tricks',
  ],
};

export default sidebars;
