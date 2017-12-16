var assert = require('assert')
var satisfies = require('./')
var test

test = satisfies({ string: '0xDEADBEEF' })
assert.equal(test({ string: '0xDEAFBEEF' }), false)
assert.equal(test({ string: '0xDEADBEEF' }), true)

test = satisfies({ name: /^[A-Z]/ })
assert.equal(test({}), false)
assert.equal(test({ name: 'michael' }), false)
assert.equal(test({ name: 'Michael' }), true)

test = satisfies({ age: function (v) { return v >= 18 } })
assert.equal(test({ age: 7 }), false)
assert.equal(test({ age: 20 }), true)

test = satisfies({ interests: ['pogs', 'beyblades'] })
assert.equal(test({ interests: null }), false)
assert.equal(test({ interests: ['beyblades', 'pogs'] }), true)

test = satisfies({ hobart: { state: 'TAS', country: 'Australia' } })
assert.equal(test({ hobart: {} }), false)
assert.equal(test({ hobart: { country: 'Australia', state: 'TAS' } }), true)

test = satisfies({ undef: void 0 })
assert.equal(test({ undef: null }), false)
assert.equal(test({ undef: void 0 }), true)
assert.equal(test({}), true)
