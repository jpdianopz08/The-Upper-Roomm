# The Upper Room · Hub Tracker

Front desk tracker for The Upper Room coworking space and coffee hub, Quezon City:
seats and the big table, café orders, memberships, conference room bookings,
office tenants, payments, and the 10× revenue goal.

## Files

| Path | What it is |
|---|---|
| `index.html` | The app (single file) |
| `sw.js` | Offline support: the app opens and works with no internet after the first visit |
| `manifest.webmanifest` | Lets staff install it to their phone or tablet home screen |
| `assets/favicon.ico`, `assets/favicon.svg`, `assets/favicon-32.png` | Browser tab icon |
| `assets/apple-touch-icon.png` | iPhone / iPad home screen icon |
| `assets/icon-192.png`, `assets/icon-512.png` | Android / Chrome app icons |
| `assets/icon-maskable-512.png` | Android adaptive icon (safe-zone padded) |
| `assets/og-image.png` | Link preview image (Messenger, Facebook, Viber) |
| `assets/logo-*.svg` | Vector logos: primary, horizontal, wordmark, mark — each in color, reverse (for dark backgrounds) and black |

All logo SVGs have the text converted to outlines, so they open correctly in
Illustrator, Canva or Figma without installing any fonts.

## Data

Records are currently saved in the browser of the device that records them.
Use one main device and download a backup from **Setup → Backup** daily.

## Updating the app

When you upload a new `index.html`, also open `sw.js` and change `upper-room-v1`
to `upper-room-v2` (then v3, and so on). Tablets pick up the new version the next
time they open the app while online.
