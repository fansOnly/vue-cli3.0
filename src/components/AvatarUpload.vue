<template>
    <a-modal :visible="visiable" title="修改头像" :width="800" destroyOnClose :maskClosable="false" :footer="null" @cancel="() => {$emit('cancel')}">
        <div class="wrap">
            <div class="cropperBox">
                <vueCropper
                    ref="cropper"
                    :img="img"
                    :outputSize="outputSize"
                    :outputType="outputType"
                    :autoCropWidth="autoCropWidth"
                    :autoCropHeight="autoCropHeight"
                    :info="true"
                    :full="full"
                    :canMove="canMove"
                    :canScale="canScale"
                    :canMoveBox="canMoveBox"
                    :original="original"
                    :autoCrop="autoCrop"
                    :fixed="fixed"
                    :high="high"
                    :fixedNumber="fixedNumber"
                    :centerBox="centerBox"
                    :infoTrue="infoTrue"
                    :fixedBox="fixedBox"
                    :mode="mode"
                    @realTime="realTime"
                />
                <div class="optionBox">
                    <a-upload
                        name="file"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :showUploadList="false"
                        @change="upload"
                    >
                        <a-button icon="upload">选择图片</a-button>
                    </a-upload>
                    <a-button icon="plus" @click="zoomBig"></a-button>
                    <a-button icon="minus" @click="zoomSmall"></a-button>
                    <a-button icon="redo" @click="rotateForward"></a-button>
                    <a-button icon="undo" @click="rotateReverse"></a-button>
                </div>
            </div>
            <div class="previewBox">
                <div class="previewImg"><img :src="previewImg" :style="previewStyle"></div>
                <a-button class="saveBtn" type="primary" @click="saveAvatar">保存</a-button>
            </div>
        </div>
    </a-modal>
</template>

<script>
import Vue from 'vue'
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

export default {
    name: "AvatarUpload",
    props: {
        visiable: {
            type: Boolean,
            default: function() {
                return false;
            }
        },
    },
    data () {
        return {
            img: '', // 原始图片
            previewImg: '', // 预览图片
            previewStyle: '',  // 预览样式
            outputSize: 0.8,  // 裁剪生成图片的质量  	0.1 - 1
            outputType: 'jpg',  // 裁剪生成图片的格式  jpeg || png || webp
            full: true,  // 是否输出原图比例的截图
            autoCropWidth: 180, // 默认生成截图框宽度
            autoCropHeight: 180, // 默认生成截图框高度
            canScale: false,   // 图片是否允许滚轮缩放
            canMove: true,   // 上传图片是否可以移动
            canMoveBox: true,   // 截图框能否拖动
            original: true,   // 上传图片按照原始比例渲染
            autoCrop: true,   // 是否默认生成截图框
            high: true,   // 是否按照设备的dpr 输出等比例图片
            fixed: true,   // 	是否开启截图框宽高固定比例
            fixedNumber: [1, 1],   // 截图框的宽高比例  [宽度, 高度]
            centerBox: false,   // 	截图框是否被限制在图片里面
            infoTrue: false,   // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            fixedBox: true,   // 固定截图框大小 不允许改变
            mode: 'contain',   // 图片默认渲染方式  contain , cover, 100px, 100% auto
        }
    },
    mounted() {
    },
    methods: {
        realTime(data) {
            // console.log('裁剪结果', data);
            this.previewImg = data.url;
            this.previewStyle = data.img;
        },
        saveAvatar() {
            this.$refs.cropper.getCropData(data => {
                // console.log('获取截图的base64 数据', data);
                this.img = '';
                this.previewImg = '';
                this.previewStyle = '';
                this.$emit('cropperDone', data);
            })
        },
        upload({ file }) {
            if (file.status == 'done') {
                this.img = file.response.url;
                this.previewImg = file.response.url;
            }
        },
        zoomBig() {
            if (!this.img) return;
            this.$refs.cropper.changeScale(2);
        },
        zoomSmall() {
            if (!this.img) return;
            this.$refs.cropper.changeScale(-2);
        },
        rotateForward() {
            if (!this.img) return;
            this.$refs.cropper.rotateRight();
        },
        rotateReverse() {
            if (!this.img) return;
            this.$refs.cropper.rotateLeft();
        },
    }
};
</script>
<style scoped>
.wrap {
    height: 350px;
    display: flex;
    justify-content: space-between;
}
.cropperBox {
    width: 50%;
    height: 300px;
}
.optionBox {
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.optionBox .ant-btn {
    margin-right: 15px;
}
.previewBox {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.previewImg {
    width: 180px;
    height: 180px;
    margin: 60px auto;
	border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 0 4px #ccc;
}
.previewImg img {
    max-width: none;
}
.saveBtn {
    margin: 0 auto;
}
</style>
