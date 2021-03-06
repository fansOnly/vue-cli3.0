import { get, post, useMock } from '@/utils/http'

useMock && require('@/api/mock/banner.js')

// 获取幻灯片分类列表
export const getBannerClassList = params => get('/banner/class/index', params)
// 获取幻灯片分类详情
export const getBannerClassDetail = params => get('/banner/class/detail', params)
// 修改幻灯片分类提交
export const addBannerClass = params => post('/banner/class/add', params)
// 新增幻灯片分类提交
export const updateBannerClass = params => post('/banner/class/update', params)
// 删除幻灯片分类
export const deleteBannerClass = params => post('/banner/class/delete', params)

// 获取幻灯片
export const getBannerList = params => get('/banner/index', params)
// 获取幻灯片详情
export const getBannerDetail = params => get('/banner/detail', params)
// 修改幻灯片提交
export const addBanner = params => post('/banner/add', params)
// 新增幻灯片提交
export const updateBanner = params => post('/banner/update', params)
// 删除幻灯片
export const deleteBanner = params => post('/banner/delete', params)