var type = require('tiny-typeof')
var eq = require('fast-deep-equal')
var has = {}.hasOwnProperty

module.exports = satisfies

function satisfies (rules, obj) {
  var yes = true, no = false
  var keys = Object.keys(rules)
  var l = keys.length

  return obj ? valid(obj) : valid

  function valid (obj) {
    var i = 0, k, rv, rvt, ov
    while (i < l && (k = keys[i++])) {
      if ((rv = rules[k]) !== void 0 && !has.call(obj, k)) return no
      ov = obj[k]
      if ((rvt = type(rv)) === 'function') { if (!rv(ov)) return no; break }
      if (rvt === 'regexp') { if (!rv.test(ov)) return no; break }
      if (rvt === 'array' && type(ov) === 'array') rv.sort(), ov.sort()
      if (!eq(rv, ov)) return no
    }
    return yes
  }
}
