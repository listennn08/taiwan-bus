const convertDic: { [key: string]: string } = {
  '/':  '%sls%'
}
export const replaceToURI = (s: string) => {
  return Object.keys(convertDic).reduce((acc, key) => acc.replace(key, convertDic[key]), s)
}

export const replaceFromURI = (s: string) => {
  return Object.entries(convertDic).reduce((acc, [key, value]) => acc.replace(value, key), s)
}

export const timeConverter = (t: number) => t ? Math.floor(t / 60) : 0