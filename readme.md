# rework-plugin-unmq

> The rework plugin removes @media queries on CSS processing with predefined viewport


## Install

```bash
$ npm install --save rework-plugin-unmq
```

## Usage

```js
const rework = require('rework');
const plugin = require('rework-plugin-unmq');

rework(css).use(plugin({
  type: 'screen',
  width: 1024,
  height: 768,
  resolution: '1dppx',
  color: 3
})).toString()
```

## License

MIT © [Andriy Rakhnin](https://github.com/rakhnin)
