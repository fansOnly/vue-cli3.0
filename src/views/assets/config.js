import { date2Timestamp } from '@/utils/util'
import { pagination, filters, ASSETS_STATUS, BADGE_STATUS } from '@/utils/configSetting'

export default {
    columns: [
        {
			title: '资源ID',
            dataIndex: 'id',
            width: '200px'
        },
        {
			title: '关联ID',
			dataIndex: 'object_id',
			width: '200px'
		},
		{
			title: '资源名称',
			dataIndex: 'name',
        },
        // {
		// 	title: '资源路径',
		// 	dataIndex: 'path',
        // },
        {
			title: '资源文件',
            dataIndex: 'file',
			scopedSlots: {customRender: 'fileSlot'},
        },
        {
			title: '资源类型',
            dataIndex: 'type',
			width: '120px'
        },
        {
			title: '创建时间',
			dataIndex: 'create_time',
            sorter: (a, b) => date2Timestamp(a.create_time) - date2Timestamp(b.create_time),
            width: '200px',
		},
		{
			title: '状态',
			dataIndex: 'state',
			scopedSlots: { customRender: 'stateSlot' },
			width: '110px',
		},
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionSlot' },
			width: '70px'
		}
	],
	pagination: {
		...pagination
	},
	filters: {
		...filters,
		STATUS: ASSETS_STATUS,
		hasID: false,
		hasTitle: false,
		hasObjectId: true,
		hasName: true,
	},
	ASSETS_STATUS,
	BADGE_STATUS,
	actionList: ['删除'],
	allowAdd: false,
	withModal: false,
}