<p align="center">
  <img width="186" height="90" src="https://user-images.githubusercontent.com/218949/44782765-377e7c80-ab80-11e8-9dd8-fce0e37c235b.png" alt="Beyonk" />
</p>

![image](https://user-images.githubusercontent.com/218949/67595311-40f07e00-f75e-11e9-96bf-ffe9842ee869.jpg)

# Initials Avatar

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

Generates image based avatars from initials, in node.

Uses a random background colour and a contrasting foreground colour.

Uses pure javascript, no native dependencies.

## Install

```sh
$ npm install --save @beyonk/initials-avatar
```

## Usage

Add the plugin to your loadtest configuration:

```js
const { createWriteStream } = require('fs')
const { createAvatar } = require('@beyonk/initials-avatar')

const output = createWriteStream('/some/output/file.jpg')
await createAvatar({ firstName: 'Antony', lastName: 'MacKenzie-Jones' }, output)
```

### Config

#### Changing avatar size

You can change the default avatar size from 128px

```js
await createAvatar({ firstName: 'Antony', lastName: 'MacKenzie-Jones' }, output, { size: 512 })
```

#### Forcing avatar background-colour

You can choose the background colour (and the foreground will contrast automatically)

```js
await createAvatar({ firstName: 'Antony', lastName: 'MacKenzie-Jones' }, output, { background: '#ff0c7e' })
```
