import Tools from '@/utils/Tools'
import { pagination, filters } from '@/utils/configSetting';

export default {
    columns: [
        {
			title: 'ID',
			dataIndex: 'id',
			width: '120px'
		},
        {
			title: '序号',
			dataIndex: 'sortnum',
			sorter: (a, b) => a.sortnum - b.sortnum,
			width: '80px'
		},
		{
			title: '标题',
			dataIndex: 'title',
			scopedSlots: { customRender: 'titlex' },
		},
		{
			title: '发布时间',
			dataIndex: 'create_time',
			width: '200px',
			sorter: (a, b) => Tools.date2Timestamp(a.create_time) - Tools.date2Timestamp(b.create_time)
		},
		{
			title: '状态',
			dataIndex: 'state',
			scopedSlots: { customRender: 'statex' },
			width: '100px',
		},
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionx' },
			width: '120px'
		}
	],
	pagination: {
		...pagination
	},
	filters: {
		...filters
	},
	actionList: ['编辑','删除'],
}