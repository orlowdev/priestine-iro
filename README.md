# @priestine/iro

[![pipeline](https://gitlab.com/priestine/iro/badges/master/pipeline.svg)](https://gitlab.com/priestine/iro) [![codecov](https://codecov.io/gl/priestine/iro/branch/master/graph/badge.svg)](https://codecov.io/gl/priestine/iro) [![licence: MIT](https://img.shields.io/npm/l/@priestine/iro.svg)](https://gitlab.com/priestine/iro) [![docs: typedoc](https://img.shields.io/badge/docs-typedoc-blue.svg)](https://priestine.gitlab.io/iro) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![versioning: semantics](https://img.shields.io/badge/versioning-semantics-912e5c.svg)](https://gitlab.com/priestine/semantics) [![npm](https://img.shields.io/npm/dt/@priestine/iro.svg)](https://www.npmjs.com/package/@priestine/iro) [![npm](https://img.shields.io/npm/v/@priestine/iro.svg)](https://www.npmjs.com/package/@priestine/iro)

### **色**

Iro brings colors to console output.

Dependency-free. Works in Node.js and browsers (Google Chrome and Mozilla Firefox 31+).

## Installation

```bash
yarn add @priestine/iro
```

or

```bash
npm install --save @priestine/iro
```

## Usage

```typescript
import { Iro } from '@priestine/iro';

Iro.log(Iro.green('Hello'), Iro.space(), Iro.red('world'));
```
