
/**
 * 表单布局配置
 */
export const FORM_LAYOUT = {
    formItemLayout: {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 2 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    },
    btnFormItemLayout: {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 2,
            },
        },
    },
};

/**
 * 页码布局配置
 */
export const PAGINATION = {
    page: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '30', '40', '50'],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条信息`,
}

/**
 * 数据默认筛选条件配置
 */
export const FILTER_ITEMS = {
    filterID: true,
    filterTtile: true,
    filterCreateTime: true,
    filterState: true,
    filterAdmin: false,
    filterPhone: false,
    filterName: false,
}

/**
 * 全局状态管理
 */
// 管理员状态管理 account
export const ACCOUNT_STATUS = ['禁用', '正常'];
// 管理员分类状态管理 accountclass
export const ACCOUNT_CLASS_STATUS = ['禁用', '正常'];

// 资源状态管理 assets
export const ASSETS_STATUS = ['文件缺失', '正常'];

// 幻灯片状态管理  info
export const BANNER_STATUS = ['禁用', '正常'];
// 幻灯片分类状态管理  info
export const BANNER_CLASS_STATUS = ['禁用', '正常'];

// 用户状态管理 member
export const MEMBER_STATUS = ['已冻结', '待审核', '已审核'];

// 文章状态管理  info
export const INFO_STATUS = ['已下架', '待审核', '已审核', '已置顶'];

// 留言状态管理  info
export const MESSAGE_STATUS = ['未查看', '已查看', '已回复', '已置顶'];

export const BADGE_STATUS = state => {
    return ['default', 'processing', 'success', 'error', 'warinng'][state]
}