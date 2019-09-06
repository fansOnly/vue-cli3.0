import Tools from '@/utils/Tools'
import { pagination, filters, BANNER_STATUS, BADGE_STATUS } from '@/utils/configSetting'

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
            sorter: (a, b) => Tools.date2Timestamp(a.create_time) - Tools.date2Timestamp(b.create_time),
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
			width: '135px'
		}
	],
	pagination: {
		...pagination
	},
	filters: {
		...filters,
		STATUS: BANNER_STATUS,
	},
	BANNER_STATUS,
	BADGE_STATUS,
	actionList: ['编辑','删除'],
	allowAdd: true,
	withModal: true,
}