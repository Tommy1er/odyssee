# Asset provenance

voyager.glb — NASA / Visualization Technology Applications and Development (VTAD), official Voyager 3D model.
Source: https://science.nasa.gov/resource/voyager-3d-model/
File: https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/v/Voyager.glb
Used as an educational spacecraft representation; NASA does not endorse this application. Inspection lighting and display scale are illustrative.

blackbody-lut.json — derived by Planck-spectrum integration against CIE 1931 2-degree colour matching functions, DOI 10.25039/CIE.DS.xvudnb9b. Original CIE dataset and this derived table: CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/
Changes: temperatures 100–1,000,000 K sampled logarithmically; CIE XYZ integrated at 1 nm; converted to normalized linear sRGB plus natural logarithm of Y. Negative display channels clipped. Not calibrated instrument photometry.
Source: https://cie.co.at/datatable/cie-1931-colour-matching-functions-2-degree-observer
Rebuild: python scripts/build-spectrum.py

The Milky Way, nebula density fields, cluster member populations and multi-band colours are parametric reconstructions authored for this simulator, not downloaded observational image maps. See ../science.html.

## Planetary maps — October 2026
Earth (8K day/clouds, 2K night), Mercury, Venus atmosphere, Mars, Jupiter, Saturn, Uranus, Neptune and Moon: Solar System Scope / INOVE, CC BY 4.0. https://www.solarsystemscope.com/textures/ — https://creativecommons.org/licenses/by/4.0/ . NASA-derived imagery with publisher colour adjustments and gap filling; these maps are not simultaneous photographs. Original files renamed for use in the simulator, unmodified. Sources and asset hashes: textures/sources.json.

Moon map restored 5 October 2026 from the [Wikimedia Commons mirror](https://commons.wikimedia.org/wiki/File:Solarsystemscope_texture_2k_moon.jpg) of Solar System Scope’s original 2K map (CC BY 4.0). Complete JPEG, renamed only; pixels unchanged.
