const customJSON = require('../src/parse')

const { describe, expect, it } = global

describe('Replace string value', () => {
  it('returns the expected JSON object', () => {
    const jsonString = '{"mykey": "myvalue"}'
    const parsedJSON = customJSON.parse(jsonString, (key, originalValue, stringValue, jsonObject, parentKeys) => { if (typeof originalValue === 'string') { return 'Hello World!' } else { return originalValue } })
    expect(parsedJSON).toEqual({ mykey: 'Hello World!' })
  })
})

describe('Replace false boolean value', () => {
  it('returns the expected JSON object', () => {
    const jsonString = '{"mykey": false}'
    const parsedJSON = customJSON.parse(jsonString, (key, originalValue, stringValue, jsonObject, parentKeys) => { if (typeof originalValue === 'boolean') { return true } else { return originalValue } })
    expect(parsedJSON).toEqual({ mykey: true })
  })
})

describe('Replace true boolean value', () => {
  it('returns the expected JSON object', () => {
    const jsonString = '{"mykey": true}'
    const newValue = false
    const parsedJSON = customJSON.parse(jsonString, (key, originalValue, stringValue, jsonObject, parentKeys) => { if (typeof originalValue === 'boolean') { return newValue } else { return originalValue } })
    expect(parsedJSON).toEqual({ mykey: newValue })
  })
})

describe('Replace numeric value', () => {
  it('returns the expected JSON object', () => {
    const jsonString = '{"mykey": 100}'
    const parsedJSON = customJSON.parse(jsonString, (key, originalValue, stringValue, jsonObject, parentKeys) => { if (typeof originalValue === 'number') { return 222 } else { return originalValue } })
    expect(parsedJSON).toEqual({ mykey: 222 })
  })
})

describe('Replace negative numeric value by positive value', () => {
  it('returns the expected JSON object', () => {
    const jsonString = '{"mykey": -100}'
    const newValue = 2
    const parsedJSON = customJSON.parse(jsonString, (key, originalValue, stringValue, jsonObject, parentKeys) => { if (typeof originalValue === 'number') { return newValue } else { return originalValue } })
    expect(parsedJSON).toEqual({ mykey: newValue })
  })
})

describe('Replace negative numeric value by negative value', () => {
  it('returns the expected JSON object', () => {
    const jsonString = '{"mykey": -1}'
    const newValue = -22
    const parsedJSON = customJSON.parse(jsonString, (key, originalValue, stringValue, jsonObject, parentKeys) => { if (typeof originalValue === 'number') { return newValue } else { return originalValue } })
    expect(parsedJSON).toEqual({ mykey: newValue })
  })
})

describe('Replace string value by null', () => {
  it('returns the expected JSON object', () => {
    const jsonString = '{"mykey": "myvalue"}'
    const newValue = null
    const parsedJSON = customJSON.parse(jsonString, (key, originalValue, stringValue, jsonObject, parentKeys) => { if (typeof originalValue === 'string') { return newValue } else { return originalValue } })
    expect(parsedJSON).toEqual({ mykey: newValue })
  })
})

describe('Replace string value by null', () => {
  it('returns the expected JSON object', () => {
    const jsonString = '{"mykey": "myvalue"}'
    const newValue = null
    const parsedJSON = customJSON.parse(jsonString, (key, originalValue, stringValue, jsonObject, parentKeys) => { if (typeof originalValue === 'string') { return newValue } else { return originalValue } })
    expect(parsedJSON).toEqual({ mykey: newValue })
  })
})

describe('Replace null value by String', () => {
  it('returns the expected JSON object', () => {
    const jsonString = '{"mykey": null}'
    const newValue = 'myvalue'
    const parsedJSON = customJSON.parse(jsonString, (key, originalValue, stringValue, jsonObject, parentKeys) => { if (originalValue === null) { return newValue } else { return originalValue } })
    expect(parsedJSON).toEqual({ mykey: newValue })
  })
})

describe('Replace array of string values', () => {
  it('returns the expected JSON object', () => {
    const jsonString = '{"mykey": ["first", "second"]}'
    const newValue = 'newValue'
    const parsedJSON = customJSON.parse(jsonString, (key, originalValue, stringValue, jsonObject, parentKeys) => { if (typeof originalValue === 'string') { return newValue } else { return originalValue } })
    expect(parsedJSON).toEqual({ mykey: [newValue, newValue] })
  })
})

describe('Replace an object by a new object', () => {
  it('returns the expected JSON object', () => {
    const jsonString = '{"mykey": "myvalue"}'
    const newValue = { newKey: 'newValue' }
    const parsedJSON = customJSON.parse(jsonString, (key, originalValue, stringValue, jsonObject, parentKeys) => { if (typeof originalValue === 'object') { return newValue } else { return originalValue } })
    expect(parsedJSON).toEqual(newValue)
  })
})

describe('Replace an object and its contained value', () => {
  it('returns the expected JSON object', () => {
    const jsonString = '{"mykey": "myvalue"}'
    const newStringValue = 'myvalue'
    const newObjectValue = { newKey: 'newValue' }
    const parsedJSON = customJSON.parse(jsonString, (key, originalValue, stringValue, jsonObject, parentKeys) => { if (typeof originalValue === 'object') { return newObjectValue } else if (typeof originalValue === 'string') { return newStringValue } else { return originalValue } })
    expect(parsedJSON).toEqual(newObjectValue)
  })
})

describe('Replace string value with escaped quotationsmarks', () => {
  it('returns the expected JSON object', () => {
    const jsonString = '{"mykey": "my\\"value\\""}'
    const newValue = 'newValue'
    const parsedJSON = customJSON.parse(jsonString, (key, originalValue, stringValue, jsonObject, parentKeys) => { if (typeof originalValue === 'string') { return newValue } else { return originalValue } })
    expect(parsedJSON).toEqual({ mykey: newValue })
  })
})

describe('Replace string value of property "mykey" if parent is "parentKey"', () => {
  it('returns the expected JSON object', () => {
    const jsonString = '{"mykey": "myvalue", "parentKey": {"mykey": "myvalue"} }'
    const newValue = 'newValue'
    const parsedJSON = customJSON.parse(jsonString, (key, originalValue, stringValue, jsonObject, parentKeys) => { if (typeof originalValue === 'string' && parentKeys.toString() === 'parentKey,mykey') { return newValue } else { return originalValue } })
    expect(parsedJSON).toEqual({ mykey: 'myvalue', parentKey: { mykey: newValue } })
  })
})
