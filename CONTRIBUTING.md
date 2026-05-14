# Contributing to the JedEye user manual

Thank you for helping improve the JedEye user manual! This repository
contains the source of the user-facing documentation published at
<https://sebkister.github.io/JedEye-Documentation/>. Corrections,
clarifications, translations, screenshots, additional examples — all
welcome.

## How to contribute

- **Spotted a typo, an inaccuracy, or a missing detail?** Open a pull
  request against `master`, or open an issue describing what's wrong
  and where.
- **Want to add or restructure a section?** Open an issue first to
  discuss the change, so we can agree on the scope before you write.
- The content lives under `website/docs/`. Each page is a Markdown
  (`.md`) file consumed by Docusaurus.

If you want to preview your changes locally:

```sh
cd website
npm install
npm run start
```

## Style

Match the surrounding pages — short headings, simple sentences, and
italics for on-device menu items (e.g. *Distance Meter*, *BT Scan*).
Use relative links between docs (`./Other-Page`) so the navigation
keeps working in both the local preview and the published site.

## Licensing of your contribution

The content of this repository is licensed under the [Creative Commons
Attribution 4.0 International License](./LICENSE) (CC BY 4.0). By
opening a pull request, you agree that your contribution is licensed
under the same CC BY 4.0 license as the rest of the manual. You retain
copyright of your contribution; CC BY 4.0 simply grants the right to
include, redistribute, and adapt it with attribution.

Note that this license applies only to the documentation in this
repository. The JedEye firmware and hardware design are **not** open
source and are not covered by it.
