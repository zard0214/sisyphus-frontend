import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    auth: {
      username: 'sisyphus-client-uac',
      password: 'sisyphusClientSecret'
    },
    params: {
      username: data.username,
      password: data.password,
      imageCode: data.captchaCode
    }
  })
}

export function getImage() {
  return request({
    url: '/auth/code/image',
    method: 'post'
  })
}

export function getInfo(tenantId) {
  return request({
    url: '/auth/user/loginInfo/' + tenantId,
    method: 'post'
  })
}

export function logout(token) {
  return request({
    url: '/auth/user/logout',
    method: 'post',
    params: {
      accessToken: token
    }
  })
}

export function refreshToken(data) {
  return request({
    url: '/auth/user/refreshToken',
    method: 'post',
    auth: {
      username: 'sisyphus-client-uac',
      password: 'sisyphusClientSecret'
    },
    params: {
      refreshToken: data.refreshToken,
      accessToken: data.token
    }
  })
}

