'use strict'

const createAvatar = require('.')
const { join } = require('path')
const { mkdtempSync, createWriteStream } = require('fs')
const { tmpdir } = require('os')

describe('#createAvatar()', () => {
  beforeEach(async () => {
    const dir = mkdtempSync(join(tmpdir(), 'byia-'))
    const output = createWriteStream(join(dir, 'image.jpg'))
    await createAvatar({ firstName: 'Antony', lastName: 'MacKenzie-Jones' }, output)
  })

  it('writes correct image', () => {
    console.log('hi')
  })
})