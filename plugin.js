'use strict'

let cssMediaQuery = require('css-mediaquery')
let css = require('css')

/**
 * Preprocess options
 * @param  {Object} options
 * @return {Object}
 */
function filterOptions (options) {
  options = Object.assign({}, {
    type: 'screen',
    width: 1024,
    height: 768,
    resolution: '1dppx',
    color: 3
  }, options)
  if (!('device-width' in options)) {
    options['device-width'] = options.width
  }
  if (!('device-height' in options)) {
    options['device-height'] = options.height
  }
  if (!('aspect-ratio' in options)) {
    options['aspect-ratio'] = parseFloat(options['device-width']) / parseFloat(options['device-height']) || 1
  }
  if (!('orientation' in options)) {
    options.orientation = options['aspect-ratio'] >= 1 ? 'landscape' : 'portrait'
  }
  return options
}

/**
 * Run plugin
 *
 * @param {Object}    style
 * @param {Object}    options
 * @param {Function}  next     callback
 * @api private
 * @return null
 */

function run (stylesheet, options) {
  options = filterOptions(options)

  let res = []

  function process (rules, options) {
    rules = rules || []
    rules.map(function (rule) {
      if (rule.type === 'media') {
        if (cssMediaQuery.match(rule.media, options)) {
          res.concat(process(rule.rules, options))
        }
      } else if (rule.rules) {
        res.concat(process(rule.rules, options))
      } else {
        res.push(rule)
      }
    })
  }

  process(stylesheet.rules, options)

  stylesheet.rules = res

  if (options.isFixPosition) {
    stylesheet = css.parse(css.stringify({
      type: 'stylesheet',
      stylesheet: stylesheet
    })).stylesheet
  }
}

/**
 * Module exports
 */
module.exports = function (options) {
  return function (style) {
    run(style, options)
  }
}
