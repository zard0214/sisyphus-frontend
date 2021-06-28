import request from '@/utils/request'

export function fetchUserListWithPage(query) {
  return request({
    url: '/uac/user/fetchUserListWithPage',
    method: 'post',
    data: query
  })
}
