import request from '@/axios/request'
// import qs from 'qs'
export function postArticle(article) {
    return request({
        url: '/api/postArticle',
        method: 'post',
        data: article,
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export function getArticles() {
    return request({
        url: '/api/articles',
        method: 'get',
    })
}

export function getArticleById(id) {
    return request({
        url: '/api/articles/'+id,
        method: 'get',
    })
}
export function editArticle(id, article) {
    return request({
        url: '/api/edit/article/'+id,
        method: 'post',
        data: article,
        params: {'id': id},
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export function deleteArticle(id) {
    return request({
        url: '/api/delete/article/'+id,
        method: 'post',
    })
}
// export function incrViews(id) {
//     return request({
//         url: 'api/incrArticleViews'+id,
//         method: 'post'
//     })
// }

export function getArticlePage(page, size) {
    return request({
        url: '/api/articleList',
        method: 'get',
        params: {
            'page': page,
            'size': size
        }
    })
}

export function getArticleCategory() {
    return request({
        url: '/api/articleCategory/get',
        method: 'get'
    })
}

export function filterByCtg(id, page, size, property) {
    return request({
        url: '/api/articleListByCtg',
        method: 'get',
        params: {
            'categoryId': id,
            'page': page,
            'size': size,
            'sort': property
        }
    })
}

export function newCtg(name) {
    return request({
        url: '/api/articleCategory/new',
        method: 'post',
        params: {
            'name': name
        }
    })
}

export function editCtg(id, name) {
    return request({
        url: '/api/articleCategory/edit',
        method: 'post',
        params: {
            'id': id,
            'category': name
        }
    })
}

export function deleteCtg(id) {
    return request({
        url: '/api/articleCategory/delete',
        method: 'post',
        params: {
            'id': id,
        }
    })
}

export function filterArticle(filter, page, size) {
    return request({
        url: '/api/filterArticles',
        method: 'post',
        data: filter,
        params: {
            'page': page,
            'size': size,
        },
        headers: {
            'Content-Type': 'application/json',
        }
    })
}