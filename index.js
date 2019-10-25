'use strict'

const PureImage = require('pureimage')
const Chromatism = require('chromatism')
const { join } = require('path')
const { measureText } = require('pureimage/src/text')

const fontName = 'cabin-bold'
const Font = PureImage.registerFont(join(__dirname, 'font', 'cabin-bold.ttf'), fontName)

module.exports = async function createAvatar ({ firstName, lastName }, stream, options = {}) {
  const size = options.size || 128
  const background = options.background || '#'+Math.floor(Math.random()*16777215).toString(16)
  const { hex: foreground } = Chromatism.contrastRatio(background)

  const img = PureImage.make(size, size)
  const ctx = img.getContext('2d')
  ctx.fillStyle = background
  ctx.fillRect(0, 0, size, size)

  return new Promise(resolve => {
    Font.load(() => {
      const fontSize = size / 2
      ctx.font = `${fontSize}pt '${fontName}'`
      ctx.fillStyle = foreground
      const t = `${firstName[0]}${lastName[0]}`
      const { width } = measureText(ctx, t)
      ctx.fillText(t, (size / 2) - width / 2, size / 1.4)

      resolve(PureImage.encodeJPEGToStream(img, stream))
    })
  })
}
