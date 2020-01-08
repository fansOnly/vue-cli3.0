<template>
    <a-modal :visible="visiable" title="预览二维码" :width="400" destroyOnClose :maskClosable="false" :footer="null" @cancel="() => {$emit('cancel')}">
        <div id="qrcodeBox"></div>
        <div class="optbtns">
            <a-button style="margin-right:10px;" @click="downloadImg">下载</a-button>
            <a-button @click="copyLink">复制链接</a-button>
        </div>
    </a-modal>
</template>

<script>
import QRCode from "qrcode";

import { copy, download } from '@/utils/util';

export default {
    name: "Qrcode",
    props: {
        visiable: {
            type: Boolean,
            default: function() {
                return false;
            }
        },
        url: {
            type: String,
            default: function() {
                return location.href;
            }
        }
    },
    mounted() {
        this.$watch('visiable', () => {
            this.visiable && this.createQrcode();
        })
    },
    methods: {
        createQrcode() {
            this.$nextTick(function () {
                QRCode.toCanvas( this.url, { errorCorrectionLevel: "H" }, function(err,canvas) {
                    if (err) throw err;

                    var container = document.getElementById("qrcodeBox");
                    container.appendChild(canvas);
                })
            })
        },
        downloadImg() {
            QRCode.toDataURL(this.url, function (err, url) {
                if (err) throw err;
                download(url, 'qrcode.png');
            })
        },
        copyLink() {
            copy(this.url, () => {
                this.$message.success('复制成功，请在浏览器访问预览');
            });
        }
    }
};
</script>
<style scoped>
#qrcodeBox {
    text-align: center;
}
.optbtns {
    margin: 10px 0;
    text-align: center;
}
</style>
