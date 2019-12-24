import dayjs from 'dayjs'
import { PAGINATION, FILTER_ITEMS, BANNER_STATUS, BADGE_STATUS } from '@/config/setting'

export default {
    columns: [
		{
			title: '幻灯片ID',
            dataIndex: 'id',
            width: '200px'
		},
		{
			title: '序号',
			dataIndex: 'sortnum',
			sorter: (a, b) => Number(a.sortnum) - Number(b.sortnum),
			width: '80px'
		},
		{
			title: '幻灯片名称',
			dataIndex: 'title',
        },
        {
			title: '幻灯片链接',
			dataIndex: 'url',
        },
        {
			title: '幻灯片图片',
            dataIndex: 'image',
            scopedSlots: {customRender: 'imageSlot'}
        },
        {
			title: '创建时间',
			dataIndex: 'create_time',
			sorter: (a, b) => dayjs(a.create_time).unix() - dayjs(b.create_time).unix(),
            width: '200px',
		},
		{
			title: '状态',
			dataIndex: 'state',
			scopedSlots: { customRender: 'stateSlot' },
			width: '80px',
		},
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionSlot' },
			width: '140px'
		}
	],
	pagination: {
		...PAGINATION
	},
	filters: {
		...FILTER_ITEMS,
		STATUS: BANNER_STATUS,
	},
	excelConfig: {
		showExportBtn: false,
		excelFields: {
			'ID': 'id',
			'幻灯片名称': 'title',
			'幻灯片链接': 'url',
			'幻灯片图片': 'image',
		},
		excelName: '导出-'+ dayjs().format('YYYY-MM-DD HH:mm:ss')
	},
	BANNER_STATUS,
	BADGE_STATUS,
	actionList: ['编辑','删除'],
	allowAdd: true,
	withModal: true,
}