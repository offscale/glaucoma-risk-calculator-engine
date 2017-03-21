Glaucoma risk calculator compute engine
=======================================

## Install prerequisites

  0. node & npm (tested with node v7.5 and npm v4.2)
  2. `cd` to directory you've cloned this repo into
  4. Run: `npm install`

## Compile+run app

    tsc

Then

    node index.js

## Generate dist repo

On a mchine with GNU findutils and `cpio`:

    find -type f -not -name "*.ts" -and -not -path "./.git/*" -and -not -path "./node-modules/*" -and -not -name '*.map' | cpio -pdamv ../glaucoma-risk-calc-engine-dist