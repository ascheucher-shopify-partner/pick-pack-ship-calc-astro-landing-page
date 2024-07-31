# Astro Landing Page for PickPackShipCalc App

## Sales Copy Shoutout

### Pain

* HEADLINE: Is my shop profitable today???
* Have you ever had a streak of net negative days without recognizing it?
* Tired of not being able to have your daily numbers available without manual effort?
* Wasting time every day manually calculating your picking, packing, and shipping costs for every order?
* Are you throwing away money, by not identifying low and top-performing products due to missing order costs in your daily numbers?

### Dream

* Zero effort, complete daily numbers without breaking the bank
* Every order's cost down to the penny or cent?
* Fully automated, even on the lower Shopify plans with limited analytics options!
* Your daily Shopify business numbers, are just one click away, no matter where you are!

### Solution

* Copy and adopt our template for Make.com to get every Shopify order data into your own Google Sheet for nearly free of charge
* PickPackShipCalc lets you claculate - you guessed it - picking, packing, and shipping costs for every order based on:
  * lookup tables for costs, based on the number of line items
  * free formulas based on product/variant tags
  * more yet-to-be-found ways
* 

## TODOs

### Public Static Content

* favicon
* social OG image (just a screenshot of the above the fold? or more feature/solution oriented?)
* social description in index.astro
* OG tags in index.astro

### Page

* remove GitHub corner
* Image of Shopify Bag with a $, an € sign, and a pulsating question mark. SVG?

### $€? Animation Component

The [link for the font selection](https://fonts.google.com/?preview.text=%2B$%20-$%20%2B%E2%82%AC%20-%20%E2%82%AC%20%3F%3F%3F&query=rubik)

The [Claude 3.5 Sonnet chat](https://claude.ai/chat/8db04dd4-478a-40fe-a2be-3e780ef02d86)

### Starfield Animation to Parcelfield Animation

The [Claude 3.5 Sonet [chat](https://claude.ai/chat/8afbe93c-e028-4a71-b7c9-7ece4e3bdfd2) getting inspiration.



### Image preparation

#### Rotate the Excel Sheet

[Photoshop YT tutorial](https://www.youtube.com/watch?v=8yVo3HGcJ2I)

Or play a bit more with this image magick command [IM docs](https://imagemagick.org/Usage/distorts/#perspective):

```bash
magick red-green-excel-sheet.png \
  -alpha set -background none \
  -virtual-pixel transparent \
  -distort Perspective \
  '0,0,250,250  0,1000,150,750  1000,0,1000,0  1000,1000,850,1000' \  
  -trim +repage \
  red-green-excel-sheet-rotated-magick.png
```

#### Create Pixel Art

##### DallE2 Prompt

A small brown parcel with shipping labels on it, open copy space, centered, transparent background, pixel art, illustration.

##### Post Processing

###### Remove Background

In Photoshop with the Properties (above layers) -> remove background.

Save as DallE2Parcel.psd
Export as DallE2Parcel.png

###### Create Different Size Images for the Animation

```bash
cd external_assets/Parcels/Pixel Art/ParcelPixelArt2
../create_different_sizes.sh 02_ParcelPixelArt2.png
mv 02_ParcelPixelArt2.png 02_ParcelPixelArt2_3.png

cd ../../../.. # project root dir
mv external_assets/Parcels/Pixel\ Art/ParcelPixelArt2/02_ParcelPixelArt2_* src/assets/parcelfield
```

#### Create the Low Poly Parcels

##### DallE2 Prompt

A brown parcel with labels on it, transparent background.


##### Post Processing

###### Remove Background

In Photoshop with the Properties (above layers) -> remove background.

Save as DallE2Parcel.psd
Export as DallE2Parcel.png

###### Reduce Colors

Step 1: Reduce colors to 16 and convert to PNG

```bash
magick DallE2Parcel.png \
  -colorspace RGB \
  +dither \
  -colors 32 \
  -depth 8 \
  DallE2Parcel-reduced-colors.png
```

###### Convert to SVG

Step 2: Convert the reduced color PNG to PNM format

`magick reduced_colors.png reduced_colors.pnm`

Step 3: Use potrace to convert PNM to SVG

`potrace reduced_colors.pnm -s -o output.svg`

install it with `brew install potrace`

## Hosting

Subdomain: apps.saasquadrat.com/pick-n-pack-n-shipping-calc
Host on S3 Bucket

Add a register for updates email collection field.

## Template

<picture><source media="(prefers-color-scheme: dark)" srcset="https://astro.build/assets/press/astro-icon-light.png"><source media="(prefers-color-scheme: light)" srcset="https://astro.build/assets/press/astro-icon-dark.png"><img align="right" valign="center" height="79" width="63" src="https://astro.build/assets/press/astro-icon-dark.png" alt="Astro logo" /></picture>

> An Astro + Tailwind CSS example/template for landing pages.

<div align="center">

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/small.svg)](https://astro.build)

</div>

![Screenshots of Astro Landing Page](screenshots.jpg)

## Features

- 💨 Tailwind CSS for styling
- 🎨 Themeable
  - CSS variables are defined in `src/styles/theme.css` and mapped to Tailwind classes (`tailwind.config.cjs`)
- 🌙 Dark mode
- 📱 Responsive (layout, images, typography)
- ♿ Accessible (as measured by https://web.dev/measure/)
- 🔎 SEO-enabled (as measured by https://web.dev/measure/)
- 🔗 Open Graph tags for social media sharing
- 💅 [Prettier](https://prettier.io/) setup for both [Astro](https://github.com/withastro/prettier-plugin-astro) and [Tailwind](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

## Commands

| Command                 | Action                                            |
| :---------------------- | :------------------------------------------------ |
| `pnpm install`          | Install dependencies                              |
| `pnpm run dev`          | Start local dev server at `localhost:4321`        |
| `pnpm run build`        | Build your production site to `./dist/`           |
| `pnpm run preview`      | Preview your build locally, before deploying      |
| `pnpm run astro ...`    | Run CLI commands like `astro add`, `astro check`  |
| `pnpm run astro --help` | Get help using the Astro CLI                      |
| `pnpm run format`       | Format code with [Prettier](https://prettier.io/) |
| `pnpm run clean`        | Remove `node_modules` and build output            |

## Credits

- astronaut image
  - source: https://github.com/withastro/astro-og-image; note: this repo is not available anymore
- moon image
  - source: https://unsplash.com/@nasa
- other than that, a lot of material (showcase data, copy) was taken from official Astro sources, in particular https://astro.build/blog/introducing-astro/ and https://github.com/withastro/astro.build
