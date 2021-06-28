import Cookies from 'js-cookie'

const TokenKey = 'Authorization:'

const DeviceId = 'DeviceId'

const ContentType = 'application/x-www-form-urlencoded'

export function getTenantId() {
  return 1
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setDeviceId(token) {
  return Cookies.set(DeviceId, token === '' ? Date.now() : token)
}

export function getDeviceId() {
  if (Cookies.get(DeviceId) === undefined) {
    setDeviceId(Date.now())
  }
  return Cookies.get(DeviceId)
}

export function setContentType(contentType) {
  return Cookies.set(ContentType) === contentType
}
export function getContentType() {
  return Cookies.get(ContentType) === undefined ? 'application/x-www-form-urlencoded' : Cookies.get(ContentType)
}

