import { get, post } from '@/utils/http'

// 获取会员列表
export const getMemberList = params => get('/member/index', params)
// 获取会员详情
export const getMemberDetail = params => get('/member/detail', params)
// 修改会员提交
export const addMember = params => post('/member/add', params)
// 新增会员提交
export const updateMember = params => post('/member/update', params)
// 删除会员提交
export const deleteMember = params => post('/member/delete', params)