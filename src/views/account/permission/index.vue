<template>
	<div>
		<BreadCrumbComponent />
		<div class="container">
            <!-- 内容展示区域 -->
            <a-row :gutter="12">
                <a-col :span="11">
                    <a-directory-tree
                        :treeData="treeData"
                        defaultExpandAll
                        @select="selectTreeNode"
                    >
                    </a-directory-tree>
                </a-col>
                <a-col :span="11" :offset="2">
                    <div class="node-tips">这里是权限文字说明区域这里是权限文字说明区域这里是权限文字说明区域这里是权限文字说明区域这里是权限文字说明区域这里是权限文字说明区域这里是权限文字说明区域这里是权限文字说明区域这里是权限文字说明区域这里是权限文字说明区域这里是权限文字说明区域这里是权限文字说明区域这里是权限文字说明区域这里是权限文字说明区域...</div>
                </a-col>
            </a-row>
		</div>
	</div>
</template>

<script>
    import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';

    import { getPermissionTree } from '@/api/account';

    export default {
        name: 'Permission',
        components: {
            BreadCrumbComponent,
        },
        data () {
            return {
                permissionList: [],
                treeData: [],
            }
        },
        created () {
            this.getPermissionTreeFn();
        },
        methods: {
            selectTreeNode (selectedKeys, e) {
                console.log('selectTreeNode', selectedKeys, e)
            },
            async getPermissionTreeFn () {
                const data = await getPermissionTree();
                if (data.code == '200') {
                    this.treeData = data.data;
                }
            }
        }
    }
</script>
<style scoped>
    .node-tips {
        padding-top: 5px;
        line-height: 28px;
    }
</style>