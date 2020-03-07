import request from '@/axios/request'

export function login(data) {
    return request({
        url: '/api/login',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export function logout(token) {
    // eslint-disable-next-line no-debugger
    debugger
    return request({
        url: '/api/logout',
        method: 'post',
        params: { 'token': token },
    })
}
