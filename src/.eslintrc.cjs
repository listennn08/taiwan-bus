/* eslint-env node */
const fs = require('fs')

const pattern =
  /(?:interface|type) (\w+) ?(?: extends \w+(?:<\w+(?:, ?\w+)?>)? ?)? ?=? ?\{/
const globals = fs
  .readFileSync('./src/types.d.ts')
  .toString()
  .split('\n')
  .reduce((obj, el) => {
    let key
    if (pattern.test(el)) {
      key = el.replace(pattern, '$1')
    }

    if (key) obj[key] = true
    return obj
  }, {})

module.exports = {
  extends: ['../.eslintrc.cjs'],
  globals,
}
