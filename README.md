# JedEye user manual

Source of the JedEye user-facing documentation, published at
<https://sebkister.github.io/JedEye-Documentation/>.

JedEye is an Arduino-based handheld instrument for cave and underwater
surveying. The published site is the complete user manual — getting
started, switching the device on, navigating the menus, calibrating
the unit, surveying, exporting data, the tooling (Distance Meter,
TopoDroid integration, …), firmware upgrades, and troubleshooting.

## Repository layout

- `website/` — the [Docusaurus](https://docusaurus.io/) site that
  builds the published manual.
  - `website/docs/` — one Markdown file per manual page.
  - `website/sidebars.js` — left-hand navigation order and grouping.
  - `website/static/` — images, logos and other static assets served
    as-is.
- `CONTRIBUTING.md` — how to submit corrections, translations or new
  sections.
- `LICENSE` — content licence (see below).

## Previewing locally

```sh
cd website
npm install
npm run start
```

Once the dev server is up, the site is available at
<http://localhost:3000/JedEye-Documentation/>. Edits to files under
`website/docs/` hot-reload in the browser.

To produce the static build that is published to GitHub Pages:

```sh
cd website
npm run build
```

## Contributing

Typo fixes, clarifications, additional examples, translations, and
screenshots are all welcome. See [CONTRIBUTING.md](CONTRIBUTING.md)
for the workflow and a short style note.

## Licence

Manual content is licensed under the
[Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
licence — see [LICENSE](LICENSE) for the full text. You are free to
share and adapt the material, as long as you give appropriate credit.
