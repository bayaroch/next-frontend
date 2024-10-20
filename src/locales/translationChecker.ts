/* eslint-disable no-console */
import enKeys from './en/common'
import mnKeys from './mn/common'

function extractKeys(obj: any, parentKey = '') {
  let keys: any = []
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      keys = keys.concat(extractKeys(obj[key], `${parentKey}${key}.`))
    } else {
      keys.push(`${parentKey}${key}`)
    }
  }
  return keys
}

const enKeyArray = extractKeys(enKeys)
const mnKeyArray = extractKeys(mnKeys)

const missingInMongolian = enKeyArray.filter(
  (key: any) => !mnKeyArray.includes(key)
)

if (missingInMongolian.length > 0) {
  console.log('Missing keys in Mongolian:', missingInMongolian)
  throw 'exit'
}
