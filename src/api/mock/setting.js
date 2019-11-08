import Mock from 'mockjs';
import { getUrlParams } from '@/utils/util';

/**
 * 获取系统基本设置
 */
const getSiteInfo = () => {
    const success = true;
    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? {
            'base_info': {
                'name': 'wtf for vue',
                'phone': /^1[3456789]\d{9}$/,
                'email': '@email',
                'copyright': /^Copyright ©️ 2019 [\u4e00-\u9fa5]{10,15}$/,
                'content': '@cparagraph(1,3)',
            },
            'advance_info': {},
            'seo_info': {
                'seo_title': '@ctitle',
                'seo_keyword': '@cparagraph(1)',
                'seo_description': '@cparagraph(3)',
            },
            'hotwords_info': ['热销', '新品'],
        } : {}
    })
}

Mock.mock(/\/siteinfo\/index/, /get|post/i, getSiteInfo);

/**
 * 更新系统基本设置
 */
const updateSiteInfo = () => {
    const success = true;
    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/siteinfo\/update/, /get|post/i, updateSiteInfo);

/**
 * 获取系统资源列表
 * @param {Number} page 
 * @param {Number} pageSize 
 * @param {Number} state 
 */
const getAssetsList = config => {
    const params = getUrlParams(config.url);
    const { page, pageSize, state } = params;
    const randomLen = 68;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1'];
    let _data = [];
    if (states.indexOf(state) != '-1' || typeof state === 'undefined' || state == '') {
        for (let i = 0; i < len; i++) {
            _data.push(
                Mock.mock({
                    'id': '@id',
                    'object_id': '@id',
                    'name': '@string(1,10)',
                    'path': '@image(100x100)',
                    'file': '@image(100x100)',
                    'type': function () {
                        const types = ['image/png', 'image/jpg', 'image/gif', 'video/mp4', 'audio/mp3', 'file/zip', 'file/txt', 'file/rar', 'file/doc'];
                        const random = Math.floor(Math.random() * types.length);
                        return types[random];
                    },
                    'create_time': '@datetime',
                    'state': function () {
                        const random = Math.floor(Math.random() * states.length);
                        return states[typeof state !== 'undefined' && state != '' ? states.indexOf(state) : random];
                    },
                })
            )
        }
    }

    let _total = 0;
    _total = states.indexOf(state) != '-1' ? Math.floor(Math.random() * randomLen) : randomLen;

    return Mock.mock({
        'code': '200',
        'msg': 'sucesss',
        'data': _data,
        'total': _total,
        'current': page || 1,
        'pageSize': pageSize || 10,
    })
}

Mock.mock(/\/assets\/index/, /get|post/i, getAssetsList);

/**
 * 删除系统资源文件
 * @param {Array} ids 
 */
const deleteAssets = config => {
    const params = JSON.parse(config.body);
    const { ids } = params;
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/assets\/delete/, /get|post/i, deleteAssets);