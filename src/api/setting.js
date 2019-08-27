import { get } from '@/utils/http'

// 获取系统基本设置



// ***********************************系统资源相关API**********************************************
// 获取系统资源列表
export const getAssetsList = params => get('/assets/index', params)
// 删除系统资源
export const deleteAssets = params => get('/assets/delete', params)