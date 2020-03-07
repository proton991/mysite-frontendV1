import request from '@/axios/request'

export function getnCoVData() {
    return request({
        url: '/api/nCoVData',
        method: 'get',
    })
}
