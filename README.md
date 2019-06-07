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

On a machine with GNU findutils and `cpio`:

    find -type f -not -name "*.ts" -and -not -path "./.git/*" -and -not -path "./node-modules/*" -and -not -name '*.map' | cpio -pdamv ../glaucoma-risk-calc-engine-dist

Alternatively a simple:

    cp -r {test,*.js*,*.md} ../glaucoma-risk-calculator-engine-dist

## License

Licensed under either of

- Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE) or <https://www.apache.org/licenses/LICENSE-2.0>)
- MIT license ([LICENSE-MIT](LICENSE-MIT) or <https://opensource.org/licenses/MIT>)

at your option.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in the work by you, as defined in the Apache-2.0 license, shall be
dual licensed as above, without any additional terms or conditions.
