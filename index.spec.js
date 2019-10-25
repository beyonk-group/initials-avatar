'use strict'

const { createAvatar } = require('.')
const { join } = require('path')
const { mkdtempSync, createWriteStream, readFileSync } = require('fs')
const { tmpdir } = require('os')
const crypto = require('crypto')
const { expect } = require('@hapi/code')

describe('#createAvatar()', () => {
  let outputFile

  beforeEach(async () => {
    const dir = mkdtempSync(join(tmpdir(), 'byia-'))
    outputFile = join(dir, 'image.jpg')
    const output = createWriteStream(outputFile)
    await createAvatar({ firstName: 'Antony', lastName: 'MacKenzie-Jones' }, output, { background: '#ff0c7e' })
  })

  it('writes correct image', () => {
    const data = readFileSync(outputFile, { encoding: 'base64' })
    const hash = crypto
      .createHash('md5')
      .update(data)
      .digest('hex')

    expect(hash).to.equal('dcd5bed4310b6e099700122aa9cb5112')
  })
})