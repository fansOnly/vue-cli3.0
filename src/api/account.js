import { get, post, useMock } from '@/utils/http'

useMock && require('@/api/mock/account.js')

// 获取管理员列表
export const getAccountList = params => get('/account/index', params)
// 获取管理员详情
export const getAccountDetail = params => get('/account/detail', params)
// 新增管理员提交
export const addAccount = params => post('/account/add', params)
// 修改管理员提交
export const updateAccount = params => post('/account/update', params)
// 删除管理员
export const deleteAccount = params => post('/account/delete', params)


// 获取管理员分类列表
export const getAccountClassList = params => get('/account/class/index', params)
// 获取管理员分类详情
export const getAccountClassDetail = params => get('/account/class/detail', params)
// 新增管理员分类提交
export const addAccountClass = params => post('/account/class/add', params)
// 修改管理员分类提交
export const updateAccountClass = params => post('/account/class/update', params)
// 删除管理员分类
export const deleteAccountClass = params => post('/account/class/delete', params)


// 获取全部可配置权限列表
export const getPermissionList = () => get('/account/permission/index')
// 获取全部可配置权限节点树
export const getPermissionTree = () => get('/account/permission/tree')
// 获取权限详情
export const getPermissionDetail = params => get('/account/permission/detail', params)
// 更新权限详情
export const updatePermissionDetail = params => post('/account/permission/update', params)