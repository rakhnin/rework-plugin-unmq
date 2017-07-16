/* eslint-env mocha */

const expect = require('chai').expect
const rework = require('rework')
const plugin = require('../')

const path = require('path')
const readFileSync = require('fs').readFileSync
const normalizeNewline = require('normalize-newline')
const fixturePath = path.join.bind(null, __dirname, 'fixtures')

function loadFixture (str, encoding) {
  encoding = encoding || 'utf8'
  return normalizeNewline(readFileSync(fixturePath(str), encoding)).trim()
}

describe('process @media', function () {
  it('should process simple @media rule with default', function () {
    let souldCSS = rework(loadFixture('simple/input.css')).use(plugin()).toString()
    expect(souldCSS).to.be.a('string')
    expect(souldCSS).to.equal(loadFixture('simple/should1.css'))
  })
  it('should process simple @media rule custom options', function () {
    let souldCSS = rework(loadFixture('simple/input.css')).use(plugin({
      width: '75px',
      height: '150px',
      resolution: '2dppx',
      isFixPosition: true
    })).toString()
    expect(souldCSS).to.be.a('string')
    expect(souldCSS).to.equal(loadFixture('simple/should2.css'))
  })
})
