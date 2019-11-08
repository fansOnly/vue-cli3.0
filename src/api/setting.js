import { get, post, useMock } from '@/utils/http'

useMock && require('@/api/mock/setting.js')

// 获取系统基本设置
export const getSiteInfo = () => get('/siteinfo/index')
export const updateSiteInfo = params => post('/siteinfo/update', params)

// ***********************************系统资源相关API**********************************************
// 获取系统资源列表
export const getAssetsList = params => get('/assets/index', params)
// 删除系统资源
export const deleteAssets = params => post('/assets/delete', params)


// ***********************************echart相关数据**********************************************