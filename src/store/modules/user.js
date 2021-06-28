import { login, logout, getImage, refreshToken, getInfo } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { fetchUserListWithPage } from '@/api/user'
import router, { resetRouter } from '@/router'

const state = {
  tenantId: '1',
  token: getToken(),
  expires_in: 0,
  jti: '',
  loginName: '',
  refresh_token: '',
  scope: '',
  timestamp: '',
  token_type: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_EXPIRES: (state, expires_in) => {
    state.expires_in = expires_in
  },
  SET_JTI: (state, jti) => {
    state.jti = jti
  },
  SET_LOGINNAME: (state, loginName) => {
    state.loginName = loginName
  },
  SET_REFRESH_TOKEN: (state, refresh_token) => {
    state.refresh_token = refresh_token
  },
  SET_SCOPE: (state, scope) => {
    state.scope = scope
  },
  SET_TIMESTAMP: (state, timestamp) => {
    state.timestamp = timestamp
  },
  SET_TOKEN_TYPE: (state, token_type) => {
    state.token_type = token_type
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, captchaCode } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, captchaCode: captchaCode }).then(response => {
        const { access_token, expires_in, jti, loginName, userName, refresh_token, scope, timestamp, token_type } = response
        commit('SET_TOKEN', access_token)
        commit('SET_EXPIRES', expires_in)
        commit('SET_JTI', jti)
        commit('SET_LOGINNAME', loginName)
        commit('SET_USERNAME', userName)
        commit('SET_REFRESH_TOKEN', refresh_token)
        commit('SET_SCOPE', scope)
        commit('SET_TIMESTAMP', timestamp)
        commit('SET_TOKEN_TYPE', token_type)
        setToken(access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo(state.tenantId).then(response => {
        console.log('getInfo', response)
        if (!response) {
          reject('Verification failed, please Login again.')
        }
        const { loginAuthDTO } = response
        const { loginName, userId, userName, email, phone, avatar } = loginAuthDTO
        const { authRoles } = response
        const roles = []
        authRoles.forEach((element) => {
          roles.push(element.roleCode)
        })
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        console.log('roles', roles)
        response['roles'] = roles
        commit('SET_ROLES', roles)
        commit('SET_AVATAR', avatar)
        commit('SET_LOGINNAME', loginName)
        commit('SET_USERID', userId)
        commit('SET_EMAIL', email)
        commit('SET_PHONE', phone)
        commit('SET_USERNAME', userName)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchLogList({ commit }, query) {
    return new Promise((resolve, reject) => {
      fetchLogList(query).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  fetchUserListWithPage({ commit }, query) {
    return new Promise((resolve, reject) => {
      fetchUserListWithPage(query).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get getImage
  getImage() {
    return new Promise((resolve, reject) => {
      getImage().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      console.log('state.token' + state.token)
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      refreshToken({ refresh_token: state.refresh_token, token: state.token }).then(response => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    // const token = role + '-token'
    //
    // commit('SET_TOKEN', token)
    // setToken(token)

    const { roles } = await dispatch('getInfo')
    resetRouter()
    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
