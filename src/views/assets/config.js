import Tools from '@/utils/Tools'
import { pagination } from '@/utils/configSetting'

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
			dataIndex: 'createTime',
            sorter: (a, b) => Tools.date2Timestamp(a.createTime) - Tools.date2Timestamp(b.createTime),
            width: '200px',
		},
		{
			title: '状态',
			dataIndex: 'state',
			scopedSlots: { customRender: 'stateSlot' },
			width: '100px',
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
	actionList: ['删除'],
	allowAdd: false,
	withModal: false,
}