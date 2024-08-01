'use strict'

const { createAvatar } = require('.')
const { join } = require('path')
const { mkdtempSync, createWriteStream, readFileSync } = require('fs')
const { tmpdir } = require('os')
const crypto = require('crypto')
const { expect } = require('@hapi/code')

describe('#createAvatar()', () => {
  function createOutput () {
    const dir = mkdtempSync(join(tmpdir(), 'byia-'))
    const outputFile = join(dir, 'image.jpg')
    return {
      outputFile,
      outputStream: createWriteStream(outputFile)
    }
  }

  it('writes correct image', async () => {
    const { outputFile, outputStream } = createOutput()
    await createAvatar({ firstName: 'Antony', lastName: 'MacKenzie-Jones' }, outputStream, { background: '#ff0c7e' })
    const data = readFileSync(outputFile, { encoding: 'base64' })
    const hash = crypto
      .createHash('md5')
      .update(data)
      .digest('hex')

    expect(hash).to.equal('dcd5bed4310b6e099700122aa9cb5112')
  })

  it('with missing name', async () => {
    const { outputStream } = createOutput()
    await expect(
      createAvatar({}, outputStream, { background: '#ff0c7e' })
    ).not.to.reject()
  })

  it('with empty name', async () => {
    const { outputStream } = createOutput()
    await expect(
      createAvatar({ firstName: '', lastName: '' }, outputStream, { background: '#ff0c7e' })
    ).not.to.reject()
  })
})