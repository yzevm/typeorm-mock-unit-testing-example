export const images = [
  {
    id: 1,
    url: 'http://1',
    archived: false
  },
  {
    id: 2,
    url: 'http://2',
    archived: false
  }
]

export const post = {
  id: 1,
  title: 'just a title',
  archived: false
}

// @todo tslint check
export const helpers = {
  omit: (targetObj: object, arr: string[]) => Object.entries(targetObj)
    .filter(([key]) => !arr.includes(key))
    .reduce((targetObj, [key, val]) => Object.assign(targetObj, { [key]: val }), {})
}
