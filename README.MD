# GitHub PR Base Branch Copy

Chrome extension that adds a copy button next to the base (into) branch name on GitHub Pull Request pages.

## Why?

On GitHub PR pages, there is a copy button next to the head (from) branch, but **not** next to the base (into) branch. This extension fills that gap.

## Install

### Chrome Web Store

Coming soon.

### Manual Install (Developer Mode)

1. Clone this repository
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select this folder

## Features

- Adds a copy button next to the base branch name on PR pages
- Visual feedback (checkmark icon) after copying
- Lightweight — no unnecessary permissions, no data collection
- Works with GitHub's SPA navigation

## Files

```
manifest.json  - Extension configuration (Manifest V3)
content.js     - Content script that adds the copy button
icons/         - Extension icons (16, 48, 128 px)
```

## License

MIT
