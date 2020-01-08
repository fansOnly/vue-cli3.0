<template>
	<div>
		<!-- <BreadCrumbComponent showBack /> -->
		<div class="container">
			<a-form :form="form" @submit="handleSubmit">
				<a-row>
					<a-col :span="16">
						<a-form-item class='hidden'>
							<a-input v-decorator="['adminid',{initialValue: detail.adminid || 1}]" />
						</a-form-item>
						<a-form-item label="序号" v-bind="formItemLayout">
							<a-input-number v-decorator="['sortnum',{initialValue: detail.sortnum}]" :step="10" :min="10" placeholder="请输入序号" />
						</a-form-item>
						<a-form-item v-bind="formItemLayout">
							<span slot="label">
								<a-tooltip title="this is a tooltip.">标题<a-icon type="info-circle" class="label-tip" /></a-tooltip>
							</span>
							<a-input v-decorator="['title',{rules: [{required: true, message: '请输入标题！',}],initialValue: detail.title}]" placeholder="请输入标题" />
						</a-form-item>
						<a-form-item v-bind="formItemLayout" label="栏目分类" hasFeedback>
							<a-tree-select
								style="width: 100%"
								v-decorator="['parent_id', {rules: [{required: true, type: 'array', message: '请选择栏目分类'}], initialValue: detail.parent_id}]"
								:dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
								placeholder='请选择栏目分类'
								multiple
								treeCheckable
								allowClear
								treeDefaultExpandAll
								treeDataSimpleMode
								:treeData="infoClassTree"
								:showCheckedStrategy="SHOW_PARENT"
							/>
						</a-form-item>
						<a-form-item label="发布时间" v-bind="formItemLayout">
							<a-date-picker
								v-decorator="['create_time', {rules: [{ type: 'object', required: true, message: '请选择发布时间' }],initialValue: detail.create_time}]"
								show-time
								format="YYYY-MM-DD HH:mm:ss"
								placeholder="请选择发布时间"
								readonly
								style="width:100%"
							/>
						</a-form-item>
						<a-form-item label="简介" v-bind="formItemLayout" class="form-label_top">
							<a-textarea v-decorator="['intro',{initialValue: detail.intro}]" placeholder="请输入简介" :autosize="{ minRows: 2, maxRows: 4 }" />
						</a-form-item>
						<a-form-item label="内容" v-bind="formItemLayout" class="form-label_top">
							<a-textarea v-decorator="['content',{initialValue: detail.content}]" placeholder="请输入内容" :rows="8" />
						</a-form-item>
						<a-form-item v-bind="formItemLayout" label="附件">
							<a-upload
								v-decorator="['file', {getValueFromEvent: fileUploadSingle,}]"
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								list-type="text"
								accept=".rar, .zip, .txt, .ppt, .xlc, .doc, .docx, .xml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
								:fileList="detail.file"
							>
								<a-button>
									<a-icon type="upload" />点击上传
								</a-button>
								<span class="label-tip">只能上传zip,rar,doc,xls,ppt,txt</span>
							</a-upload>
						</a-form-item>
						<a-form-item v-bind="formItemLayout" label="相册" extra="只能上传jpg,png,gif" class="form-label_top">
							<a-upload
								v-decorator="['photos',]"
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								listType="picture-card"
								accept=".png, .jpg, .gif, .jpeg, .svg, .ico"
								multiple
								:fileList="detail.photos"
								@preview="handlePhotoPreview"
								@change="handlePhotoChange"
							>
								<div v-if="detail.photos && detail.photos.length < maxLength">
									<a-icon type="plus" />
									<div class="ant-upload-text">上传</div>
								</div>
							</a-upload>
						</a-form-item>
						<a-form-item :wrapper-col="{ offset: 3 }" style="text-align:left;">
							<a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">发布</a-button>
							<a-button html-type="button" style="margin-left:10px;">保存</a-button>
						</a-form-item>
					</a-col>
					<a-col :span="6" :offset="2">
						<a-form-item v-bind="formItemLayout" label="缩略图" class="ant-form-item_style2">
							<a-upload
								v-decorator="['thumbnail',]"
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								listType="picture-card"
								accept=".png, .jpg, .gif, .jpeg, .svg, .ico"
								:fileList="detail.thumbnail"
								@preview="handlePhotoPreview"
								@change="handleThumbnailChange"
							>
								<div v-if="detail.thumbnail && detail.thumbnail.length == 0">
									<a-icon type="plus" />
									<div class="ant-upload-text">上传</div>
								</div>
							</a-upload>
							<!-- <a-upload-dragger
								v-decorator="['thumbnail', {getValueFromEvent: thumbnailUploadSingle,}]"
								name="thumbnail"
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								accept=".png, .jpg, .gif, .jpeg, .svg, .ico"
								:disabled="thumbnail.length > 0"
								:fileList="thumbnail"
							>
							<p class="ant-upload-drag-icon" style="margin-bottom:0;">
								<a-icon type="inbox" />
							</p>
							<p class="ant-upload-text" style="margin-bottom:0;">点击或拖拽上传</p>
							<p class="ant-upload-hint">只能上传jpg,png,gif</p>
							</a-upload-dragger> -->
						</a-form-item>
						<a-form-item v-bind="formItemLayout" label="标签" hasFeedback class="ant-form-item_style2">
							<a-select
								v-decorator="['tags', {initialValue: detail.tags}]"
								mode="multiple"
								allowClear
								placeholder="请选择商品标签"
							>
								<a-select-option value="new">新品</a-select-option>
								<a-select-option value="hot">热销</a-select-option>
								<a-select-option value="sale">折扣</a-select-option>
							</a-select>
						</a-form-item>
						<a-form-item v-bind="formItemLayout" label="状态" hasFeedback class="ant-form-item_style2">
							<a-select
								v-decorator="['state',{rules: [{ required: true, message: '请设置状态', }],initialValue: '1'},]"
								allowClear
								placeholder="请设置状态"
							>
								<a-select-option value="1">待审核</a-select-option>
								<a-select-option value="2">已审核</a-select-option>
								<a-select-option value="3">已置顶</a-select-option>
								<a-select-option value="0">已下架</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
			<a-modal :visible="photoPreviewVisible" :footer="null" @cancel="handlePhotopreviewCancel">
				<img alt="" style="width: 100%" :src="previewPhoto" />
			</a-modal>
		</div>
	</div>
</template>
<script>
	import moment from 'moment'

	import { getInfoDetail, addInfo, updateInfo, getInfoClassTree } from '@/api/info'

	import { TreeSelect } from 'ant-design-vue'
	const SHOW_PARENT = TreeSelect.SHOW_PARENT

	function hasErrors(fieldsError) {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}

	export default {
		name: 'listEditPage',
		data() {
			return {
				id: 0,
				detail: {},
				formItemLayout: {
					labelCol: {
						sm: { span: 4 }
					},
					wrapperCol: {
						sm: { span: 20 }
					}
				},
				hasErrors,
				maxLength: 9,
				photoPreviewVisible: false,
				previewPhoto: '',
				infoClassTree: [],
				SHOW_PARENT,
			};
		},
		beforeCreate() {
			this.form = this.$form.createForm(this);
		},
		mounted() {
			this.id = this.$route.params.id;
			if (this.id) {
				this.getInfoDetailFn();
			} else {
				// 设置默认值
				// this.form.setFieldsValue({
				// 	sortnum: 20,
				// 	create_time: moment(),
				// });
				this.detail = {
					sortnum: 20,
					create_time: moment(),
					file: [],
					photos: [],
					thumbnail: [],
				}
				// this.$nextTick(() => {
				//   // To disabled submit button at the beginning.
				//   this.form.validateFields();
				// });
			}
            this.getInfoClassTreeFn();
		},
		methods: {
			fileUploadSingle(e) {
				// console.log('fileUpload:', e);
				if (e.fileList.length > 1) {
					e.fileList.shift();
				}
				this.detail.file = e.fileList;
			},
			handlePhotopreviewCancel() {
				this.photoPreviewVisible = false;
			},
			handlePhotoPreview(file) {
				this.previewPhoto = file.url || file.thumbUrl;
				this.photoPreviewVisible = true;
			},
			handlePhotoChange({ fileList }) {
				if (fileList.length > this.maxLength) {
					fileList.splice(8);
				}
				this.detail.photos = fileList;
			},
			handleThumbnailChange ({ fileList }) {
				this.detail.thumbnail = fileList;
			},
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, fieldsValue) => {
					if (!err) {
						const values = {
							...fieldsValue,
							classid: fieldsValue['parent_id'].slice(),
							tags: fieldsValue['tags'].slice(),
							file: this.detail.file && this.detail.file.slice(),
							photos: this.detail.photos && this.detail.photos.slice(),
							thumbnail: this.detail.thumbnail && this.detail.thumbnail.slice(),
                            create_time:
                                fieldsValue['create_time'] &&
								fieldsValue['create_time'].format('YYYY-MM-DD hh:mm:ss'),
						};
						delete values.parent_id;
						console.log('Received values of form: ', values);
						if (this.id) {
							this.updateInfoFn(values);
						} else {
							this.addInfoFn(values);
						}
					}
				});
			},
			// api
			async getInfoDetailFn () {
				const params = {id: this.id}
				const data = await getInfoDetail(params);
				if (data.code == '200') {
					this.detail = {...data.data, create_time: moment(data.data.create_time, 'YYYY-MM-DD hh:mm:ss')};
				}
			},
			async updateInfoFn (params) {
				params = {id: this.id, ...params}
				const data = await updateInfo(params);
				if (data.code == '200') {
					this.$message.success(data.msg, 1, () => {
						this.$router.replace({name: 'infoEdit', params:{id: Math.floor(Math.random() * 99999999)}});
					})
				}
			},
			async addInfoFn (params) {
				// params = {classid: 1, ...params}
				const data = await addInfo(params);
				if (data.code == '200') {
					this.$message.success(data.msg, 1, () => {
						this.$router.replace({name: 'infoEdit', params:{id: parseInt(Math.random() * 9999999)}});
					})
				}
			},
            async getInfoClassTreeFn () {
                const data = await getInfoClassTree();
				this.infoClassTree = data.data;
				this.infoClassTree.shift();
            },
		}
	};
</script>