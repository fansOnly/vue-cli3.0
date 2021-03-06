import Mock from 'mockjs';
import { getUrlParams } from '@/utils/util';

/**
 * 获取文章分类列表
 */
const getInfoClassList = () => {
    const success = true;
    let _data = [
        {
            'id': '1',
            'admin_id': '@id',
            'sortnum': 10,
            'parent_id': '0',
            'path': '0-1',
            'name': '一级分类A',
            'thumbnail': '@image(100x100)',
            'create_time': '@datetime',
            'url': '@url',
            'content': '@cparagraph(1)',
            'children': [{
                'id': '3',
                'admin_id': '@id',
                'sortnum': 30,
                'parent_id': '1',
                'path': '0-1-3',
                'name': '二级分类A-1',
                'thumbnail': '@image(100x100)',
                'create_time': '@datetime',
                'url': '@url',
                'content': '@cparagraph(1)',
                'children': [{
                    'id': '5',
                    'admin_id': '@id',
                    'sortnum': 50,
                    'parent_id': '3',
                    'path': '0-1-3-5',
                    'name': '三级分类A-1-1',
                    'thumbnail': '@image(100x100)',
                    'create_time': '@datetime',
                    'url': '@url',
                    'content': '@cparagraph(1)',
                },]
            },]
        }, {
            'id': '2',
            'admin_id': '@id',
            'sortnum': 20,
            'parent_id': '0',
            'path': '0-2',
            'name': '一级分类B',
            'thumbnail': '@image(100x100)',
            'create_time': '@datetime',
            'url': '@url',
            'content': '@cparagraph(1)',
            'children': [{
                'id': '4',
                'admin_id': '@id',
                'sortnum': 40,
                'parent_id': '2',
                'path': '0-2-4',
                'name': '二级分类B-1',
                'thumbnail': '@image(100x100)',
                'create_time': '@datetime',
                'url': '@url',
                'content': '@cparagraph(1)',
            }, {
                'id': '7',
                'admin_id': '@id',
                'sortnum': 40,
                'parent_id': '2',
                'path': '0-2-7',
                'name': '二级分类B-2',
                'thumbnail': '@image(100x100)',
                'create_time': '@datetime',
                'url': '@url',
                'content': '@cparagraph(1)',
            },]
        }, {
            'id': '6',
            'admin_id': '@id',
            'sortnum': 60,
            'parent_id': '0',
            'path': '0-6',
            'name': '一级分类C',
            'thumbnail': '@image(100x100)',
            'create_time': '@datetime',
            'url': '@url',
            'content': '@cparagraph(1)',
        },
    ];

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : 'error',
        'data': success ? _data : [],
    })
}

Mock.mock(/\/info\/class\/index/, /get|post/i, getInfoClassList);

/**
 * 获取文章分类详情
 * @param {String} id 
 */
const getInfoClassDetail = config => {
    const params = getUrlParams(config.url);
    const { id } = params;
    const success = id;

    let _data = {
        'id': '@id',
        'sortnum': 10,
        'admin_id': 1,
        'parent_id': '0',
        'path': '0-1',
        'name': '@ctitle',
        'content': '@cparagraph(1)',
        'create_time': '@datetime',
        'url': '@url',
        'thumbnail': [{
            'uid': '@id',
            'url': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'name': '@ctitle',
            'type': 'image/png',
            'size': 18888,
            'status': 'done',
            'width': 200,
            'height': 200
        }],
    };

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : {}
    })
}

Mock.mock(/\/info\/class\/detail/, /get|post/i, getInfoClassDetail);

/**
 * 新增文章分类
 * @param {String} title 
 * @param {String} adminid 
 * @param {*} others 
 */
const addInfoClass = config => {
    const { title, adminid } = JSON.parse(config.body);
    const success = title && adminid;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/info\/class\/add/, /get|post/i, addInfoClass);

/**
 * 更新文章分类
 * @param {String} id 
 * @param {String} title 
 * @param {String} adminid 
 * @param {*} others 
 */
const updateInfoClass = config => {
    const { id, title, adminid } = JSON.parse(config.body);
    const success = id && title && adminid;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/info\/class\/update/, /get|post/i, updateInfoClass);

/**
 * 删除文章分类
 * @param {Array} ids 
 */
const deleteInfoClass = config => {
    const params = JSON.parse(config.body);
    const { ids } = params;
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/info\/class\/delete/, /get|post/i, deleteInfoClass);

/**
 * 获取文章分类树
 */
const getInfoClassTree = () => {
    const success = true;
    let _data = [{
        'id': '-1',
        'pId': '0',
        'value': '0',
        'label': '作为一级分类',
    }, {
        'id': '1',
        'pId': '0',
        'value': '1',
        'label': '一级分类A',
    }, {
        'id': '3',
        'pId': '1',
        'value': '3',
        'label': '二级分类A-1',
    }, {
        'id': '5',
        'pId': '3',
        'value': '5',
        'label': '三级分类A-1-1',
    }, {
        'id': '2',
        'pId': '0',
        'value': '2',
        'label': '一级分类B',
    }, {
        'id': '4',
        'pId': '2',
        'value': '4',
        'label': '二级分类B-1',
    }, {
        'id': '7',
        'pId': '2',
        'value': '7',
        'label': '二级分类B-2',
    }, {
        'id': '6',
        'pId': '0',
        'value': '6',
        'label': '一级分类C',
    },];

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : []
    })
}

Mock.mock(/\/info\/class\/tree/, /get|post/i, getInfoClassTree);


/**
 * 获取文章列表
 */
const getInfoList = config => {
    const params = getUrlParams(config.url);
    const { page, pageSize, state, delete_time } = params;
    const randomLen = 170;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1', '2', '3'];
    let _data = [];
    if (states.indexOf(state) != '-1' || typeof state === 'undefined' || state == '') {
        for (let i = 0; i < len; i++) {
            _data.push(
                Mock.mock({
                    'id': '@id',
                    'admin_id': '@id',
                    'sortnum': pageSize * (pageSize * (Number(page) - 1) + i + 1),
                    'classid': page,
                    'title': '@ctitle',
                    'thumbnail': '@image(100x100)',
                    'create_time': '@datetime',
                    'delete_time': function () {
                        return delete_time == 0 ? 0 : Mock.mock('@datetime');
                    },
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

Mock.mock(/\/info\/index/, /get|post/i, getInfoList);

/**
 * 获取文章详情
 * @param {String} id 
 */
const getInfoDetail = config => {
    const params = getUrlParams(config.url);
    const { id } = params;
    const success = id;

    let _data = {
        'id': '1',
        'parent_id': function () {
            const arr = ['1', '2', '3', '4', '5', '6', '7'];
            const random = Math.floor(Math.random() * arr.length);
            let _res = [];
            arr.map((item, index) => {
                if (index <= random) {
                    _res.push(item)
                }
            })
            return _res;
        },
        'sortnum': 10,
        'title': '@ctitle',
        'intro': '@cparagraph(1)',
        'content': '@cparagraph(3)',
        'create_time': '@datetime',
        'delete_time': 0,
        'url': '@url',
        'thumbnail': [{
            'uid': '@id',
            'url': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'name': '@ctitle',
            'type': 'image/png',
            'size': 18888,
            'status': 'done',
            'width': 200,
            'height': 200
        }],
        'file': [{
            'uid': '@id',
            'url': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'name': '@ctitle',
            'type': 'file/txt',
            'size': 18888,
            'status': 'done',
            'width': 200,
            'height': 200
        }],
        'photos': [{
            'uid': '@id',
            'url': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'name': '@ctitle',
            'type': 'image/png',
            'size': 18888,
            'status': 'done',
            'width': 200,
            'height': 200
        },
        {
            'uid': '@id',
            'url': '@image(100x100)',
            'name': '@ctitle',
            'type': 'image/png',
            'size': 18888,
            'status': 'done',
            'width': 200,
            'height': 200
        }
        ],
        'tags': function () {
            const arr = ['new', 'hot', 'sale'];
            const random = Math.floor(Math.random() * arr.length);
            let _data = [];
            for (var i = 0; i < arr.length; i++) {
                if (i <= random) {
                    _data.push(arr[i]);
                }
            }
            return _data;
        },
        'state': 1,
    };

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : {}
    })
}

Mock.mock(/\/info\/detail/, /get|post/i, getInfoDetail);

/**
 * 新增文章
 * @param {String} title 
 * @param {String} adminid 
 * @param {String} classid 
 * @param {*} others 
 */
const addInfo = config => {
    const { title, adminid, classid } = JSON.parse(config.body);
    const success = title && adminid && classid;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/info\/add/, /get|post/i, addInfo);

/**
 * 更新文章
 * @param {String} id 
 * @param {String} title 
 * @param {String} adminid 
 * @param {String} classid 
 * @param {*} others 
 */
const updateInfo = config => {
    const { id, title, adminid, classid } = JSON.parse(config.body);
    const success = id && title && adminid && classid;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/info\/update/, /get|post/i, updateInfo);

/**
 * 删除文章
 * @param {Array} ids 
 */
const deleteInfo = config => {
    const params = JSON.parse(config.body);
    const { ids } = params;
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/info\/delete/, /get|post/i, deleteInfo);

/**
 * 还原文章
 * @param {Array} ids 
 */
const restoreInfo = config => {
    const params = JSON.parse(config.body);
    const { ids } = params;
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/info\/restore/, /get|post/i, restoreInfo);

/**
 * 彻底清除文章
 * @param {Array} ids 
 */
const clearInfo = config => {
    const params = JSON.parse(config.body);
    const { ids } = params;
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/info\/clear/, /get|post/i, clearInfo);