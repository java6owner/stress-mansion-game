# 3D Stress Mansion

A first-person Three.js + Vite stress relief game set in a destructible two-story mansion.

## Features

- Break furniture, glass, and props.
- Buy and equip weapons from the in-game shop.
- First-person weapon models and swing animations.
- Throwable special weapons: salt, poop, and Narangd Cider.
- Doors open with animation.
- Grab and throw objects.
- Two-story mansion, bedrooms, bathroom, kitchen, living room, yard, pool, and BBQ area.
- Cheat chat command: press `T`, type `createmod`, then press Enter.

## Run

Easy Windows start:

Double-click `start-game.cmd`, then open the local URL shown in the command window.

Manual start:

```bash
npm install
npm run dev
```

If PowerShell blocks `npm.ps1`, use:

```bash
npm.cmd install
npm.cmd run dev
```

## Controls

- `WASD`: move
- `Shift`: run
- Mouse move: look around
- Left click: attack / throw selected throwable weapon
- Right click: grab / throw objects
- `E`: open or close doors
- `B` or `Tab`: release or request mouse lock for shop use
- `T`: open cheat chat
- `1-7`: buy or equip weapons

## Build

```bash
npm run build
```
