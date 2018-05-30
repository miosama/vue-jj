export const setStore = (key, val) => {
  if (!key) return
  window.localStorage.setItem(key, JSON.stringify(val))
}

export const getStore = key => {
  if (!key) return
  return JSON.parse(window.localStorage.getItem(key))
}

export const removeStore = key => {
  if (!key) return
  window.localStorage.removeItem(key)
}
