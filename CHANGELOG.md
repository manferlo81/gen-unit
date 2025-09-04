# gen-unit changelog

## Version History

### [0.2.1](https://github.com/manferlo81/gen-unit/compare/v0.2.0...v0.2.1) (2025-09-04)


### Features

* **format:** `round` option as boolean ([#1223](https://github.com/manferlo81/gen-unit/issues/1223)) ([af73347](https://github.com/manferlo81/gen-unit/commit/af73347d0eff66930b0abb960b53f9dac67180d1))
* Throw on unknown options ([#1120](https://github.com/manferlo81/gen-unit/issues/1120)) ([786b86b](https://github.com/manferlo81/gen-unit/commit/786b86b85d1f7ef39de105ea8d16ed5ba5c177df))


### Bug Fixes

* Update types for better intellisense ([#1224](https://github.com/manferlo81/gen-unit/issues/1224)) ([28add53](https://github.com/manferlo81/gen-unit/commit/28add5383dcb4ff9e7ebd696e88d14792ef8c50f))

## [0.2.0](https://github.com/manferlo81/gen-unit/compare/v0.1.0...v0.2.0) (2024-10-07)


### ⚠ BREAKING CHANGES

* **format:** format will throw if a string is passed as number of decimals

### Features

* Deprecate find sub-option in favor of items sub-option ([03265ed](https://github.com/manferlo81/gen-unit/commit/03265ed79989dde37088fdda3225f047f2ee7dd5))
* **format:** Convert non-finite values to string ([4ec5140](https://github.com/manferlo81/gen-unit/commit/4ec514033a207c8860e0b5ab3c140b9c3e85535d))
* **format:** Interpret find function returning nullish as unity ([9b8f7e1](https://github.com/manferlo81/gen-unit/commit/9b8f7e1c451b2f33c4b01a891ce7a646901ae8a9))
* **format:** output format number of spaces ([0c373a2](https://github.com/manferlo81/gen-unit/commit/0c373a20021ef01381d650c4323d1af84cfd2631))
* **format:** throw on duplicated exponents ([d1a1aa2](https://github.com/manferlo81/gen-unit/commit/d1a1aa23f9b7d54f7bac23e0a94d8d1dbd869d7a))
* **parse:** Advanced output format options ([ce52a8a](https://github.com/manferlo81/gen-unit/commit/ce52a8aae1bc4935a4f2b2765688d92991717c5e))
* **parse:** Allow match function to return nullish ([da9f499](https://github.com/manferlo81/gen-unit/commit/da9f4999221b7666e0f9e7ddc79f5d4fdb552eaf))
* **parse:** throw on duplicated prefix ([abedd37](https://github.com/manferlo81/gen-unit/commit/abedd376cc40d8f48b8846db91142cac93afeafb))


### Bug Fixes

* **format:** Allow nullish for output format space ([00654c2](https://github.com/manferlo81/gen-unit/commit/00654c25fb86dd9f5084ecf45504a1bdcade666c))
* **format:** Don't accept string as number of decimals ([3196632](https://github.com/manferlo81/gen-unit/commit/31966321dffc7d406d104e0b15d8b72707a6c3d2))
* Throw correct type of error ([77fafee](https://github.com/manferlo81/gen-unit/commit/77fafeeca060e8af72718504c00a0173b931d3be))

## [0.1.0](https://github.com/manferlo81/gen-unit/compare/v0.0.6...v0.1.0) (2024-07-12)

### ⚠ BREAKING CHANGES

* **parse:** find receives the prefix & unit separately instead of whole-unit
* Types renamed
* **types:** Some types have been renamed
* **format:** "dec" option has been removed in favor of "round" option
* **format:** "fixed" option has been removed in favor of "round" option
* **format:** "table" option has been removed
* **parse:** "find" function can't return object
* **parse:** table option removed

### Features

* Allow parse with MICRO sign (\u00b5) ([759e82b](https://github.com/manferlo81/gen-unit/commit/759e82b164865a44fa75f122bd60babbda017743))
* createParser throws if find option results in an invalid multiplier ([752a31e](https://github.com/manferlo81/gen-unit/commit/752a31e7ea9416e96a25939465037f0d7c1b4344))
* **parse:** Added "match" option ([955b6a2](https://github.com/manferlo81/gen-unit/commit/955b6a2a9bab6f1e04ad15df583f3350e65fb1da))
* Support units atto, peta & exa for parse & format ([99d3b59](https://github.com/manferlo81/gen-unit/commit/99d3b59dd0c63db7611330e9db0a031460ec1c02))

### Bug Fixes

* Fix typo on thrown error ([1270c00](https://github.com/manferlo81/gen-unit/commit/1270c0019f34d52fc6ffd8f2cc84411433daeab3))
* **format:** Show kilo as lower case k ([7f47012](https://github.com/manferlo81/gen-unit/commit/7f47012c3281d782152df2f07fdbe9023269f77d))
* **format:** Throw on invalid "output" option ([b487559](https://github.com/manferlo81/gen-unit/commit/b487559e83c387f9a9d199a2e7c59f92668b5582))
* More meaningful errors ([493fd17](https://github.com/manferlo81/gen-unit/commit/493fd17d518c8084ff03b2a30df33115d6949a7e))
* **parse:** Can parse numeric string containing floating period (ie: 1.e2) ([f0be98b](https://github.com/manferlo81/gen-unit/commit/f0be98b8f7c2a5dae0393c7a08370e92cea8b4d9))
* **parse:** Case insensitive capture RegExp ([f5cd737](https://github.com/manferlo81/gen-unit/commit/f5cd737fb6847d54f142b7a2a2df06c082ecb7db))
* **parse:** Don't parse empty string to 0 & make sure unit is valid on 0 value ([20414c5](https://github.com/manferlo81/gen-unit/commit/20414c5a3c213e64899190c45b10e0f12039b35a))
* **types:** Export common types ([1b528d1](https://github.com/manferlo81/gen-unit/commit/1b528d1c71e27f27e71f75d4c0bda268cafbd3ba))

* **format:** Remove deprecated "dec" & "fixed" options ([5cb34b9](https://github.com/manferlo81/gen-unit/commit/5cb34b9ed5d0f9c30a4596e768274e0d6ee95a8c))
* **format:** Remove table option ([6a93a9f](https://github.com/manferlo81/gen-unit/commit/6a93a9f36edebc3b854166bac4b2cb1ffc7ba8ea))
* **parse:** No longer support "find" function returning object ([fca327c](https://github.com/manferlo81/gen-unit/commit/fca327c829e4ce1ab0240ffffd5cf0a8d65a987f))
* **parse:** Remove deprecated table option ([825b6d1](https://github.com/manferlo81/gen-unit/commit/825b6d1b08c34bfb6236fbf7d0cbd36b14637dc9))
* **parse:** Rewrite find unit function ([04743f6](https://github.com/manferlo81/gen-unit/commit/04743f635b0dacbb0bfba3e3897b5f57a633deb1))
* Rename types ([f90d90d](https://github.com/manferlo81/gen-unit/commit/f90d90d1924e87bdcc964be52c88cd2f38827095))
* **types:** Rename types ([04b451c](https://github.com/manferlo81/gen-unit/commit/04b451c65e89daa3cdf026d719f097fb30678210))

### [0.0.6](https://github.com/manferlo81/gen-unit/compare/v0.0.5...v0.0.6) (2020-05-08)

### Features

* **format:** Option "find" as number ([2fb3ab7](https://github.com/manferlo81/gen-unit/commit/2fb3ab7db02a21edba4cfc6666b0ea4e9f9bd624))
* **format:** output option can return a number ([7cf1806](https://github.com/manferlo81/gen-unit/commit/7cf18065ec4ae22909fa7fbde223f038e8cebbe1))
* **parse:** "find" option & return 0 ([d4ce7c5](https://github.com/manferlo81/gen-unit/commit/d4ce7c587441a7d21f544baf6dbdf55d82183947))
* **parse:** Find Multiplier can return an object ([1c284f1](https://github.com/manferlo81/gen-unit/commit/1c284f196d172583c154ebde3b7f28c88bbbf69f))
* Advanced "find" options ([e8f1fc6](https://github.com/manferlo81/gen-unit/commit/e8f1fc6454e7b636903927e3d9798c0fea524d8d))

### Bug Fixes

* **parse:** Return NaN on empty string & Infinity ([a6dd26b](https://github.com/manferlo81/gen-unit/commit/a6dd26bf064328ff4bd1b48b56ebfc06651ce3e5))

### [0.0.5](https://github.com/manferlo81/gen-unit/compare/v0.0.4...v0.0.5) (2020-02-24)

### Bug Fixes

* **parse:** accept positive exponential ([daada22](https://github.com/manferlo81/gen-unit/commit/daada2215b7b06c7de519e7b9651b7a39da9e215))

### [0.0.4](https://github.com/manferlo81/gen-unit/compare/v0.0.3...v0.0.4) (2020-02-16)

### Bug Fixes

* **format:** format negative number ([89b6c59](https://github.com/manferlo81/gen-unit/commit/89b6c59efe6c08e7926b684e2f05cce2bf4d155e))

### [0.0.3](https://github.com/manferlo81/gen-unit/compare/v0.0.2...v0.0.3) (2020-02-15)

### Features

* **format:**  defaults to 2 decimal places ([de6a1b9](https://github.com/manferlo81/gen-unit/commit/de6a1b9c82909d19a3a78e86a90e009c3a33b101))
* **format:** dynamic unit option ([f1ff231](https://github.com/manferlo81/gen-unit/commit/f1ff231ff045fa917f17a15619a0f9a3197d492b))
* **format:** find options as array ([05d6648](https://github.com/manferlo81/gen-unit/commit/05d6648eb817ff51ee60ee8c6e50df03b6c719c1))
* exposed single use format & parse ([d665f6a](https://github.com/manferlo81/gen-unit/commit/d665f6a0f126060578e550bac954aa0c3e803026))
* **format:** implemented basic "find" option ([fefc9fb](https://github.com/manferlo81/gen-unit/commit/fefc9fb4dbdbb9dec97de9764ea3104cfaa599f3))
* **format:** implemented basic "output" option ([de3098b](https://github.com/manferlo81/gen-unit/commit/de3098b546fb7fb869df7d204a4092cc74488114))
* **format:** round option as a number ([1fde529](https://github.com/manferlo81/gen-unit/commit/1fde5297dfe65e1e577219de9dc94151cb4dbe70))
* throw if "dec" option < 0 ([c88890b](https://github.com/manferlo81/gen-unit/commit/c88890bcc62fadb2ed734a3b6264c3af7a59a8a9))
* **options:** "dec" option accepts numeric string ([e169e4c](https://github.com/manferlo81/gen-unit/commit/e169e4c61929d9f8baf54b9c786d850b133b9320)), closes [#14](https://github.com/manferlo81/gen-unit/issues/14)
* **parse:** support exponential numeric string ([06536ae](https://github.com/manferlo81/gen-unit/commit/06536aeb6d0a1fcd10379b2629142c910b123911))
* **parser:** return NaN instead of null ([b8bb18c](https://github.com/manferlo81/gen-unit/commit/b8bb18cf919e5ec4f6aba2c48a582a4d8988651c))

### Bug Fixes

* extra space when no unit (format) [#13](https://github.com/manferlo81/gen-unit/issues/13) ([b317a2d](https://github.com/manferlo81/gen-unit/commit/b317a2d74df5c50ca158d596885aa5ec5884774e))
* log base 10 of 1000 equals 3 ([efca04c](https://github.com/manferlo81/gen-unit/commit/efca04c3c75f07a892c2c3b5b126ba672b05598f))

### [0.0.2](https://github.com/manferlo81/gen-unit/compare/v0.0.1...v0.0.2) (2019-10-25)

### Documentation

* very basic documentation ([0771191](https://github.com/manferlo81/gen-unit/commit/077119188767ad2d9ee0d1458519f2bb1bae7a88))

### 0.0.1 (2019-10-25)

### Features

* **format:** negative support & micro prefix ([f68d4c4](https://github.com/manferlo81/gen-unit/commit/f68d4c49e51a5b1d308007ce10fb79ef65da8eda))
* **parse:** lowercase kilo & negative support ([b649711](https://github.com/manferlo81/gen-unit/commit/b6497110fe2d9c5b7584e4f00a56d7efbca092a8))
