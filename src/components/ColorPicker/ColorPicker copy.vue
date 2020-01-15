<template>
    <div class="color-picker-wrap">
        <!-- 取色板 -->
        <div class="color-svpanel" :style="{'background-color': sliderColor}">
            <div class="color-svpanel-white"></div>
            <div class="color-svpanel-black"></div>
            <div class="color-svpanel-cursor" :style="{left: cursorX + 'px', top: cursorY + 'px'}"><div></div></div>
        </div>
        <div class="color-slider-box">
            <div class="color-show" :style="{'background-color': HEX}"></div>
            <div class="color-slider">
                <!-- 色块滑动条 -->
                <div class="color-hue-slider">
                    <div ref="hueBar" class="color-hue-slider-bar"></div>
                    <div ref="hueThumb" class="color-slider-thumb" :style="{left: hueSliderX + 'px'}"></div>
                </div>
                <!-- 透明滑动条 -->
                <div class="color-opacity-slider">
                    <div ref="alphaBar" class="color-opacity-slider-bar"></div>
                    <div ref="alphaThumb" class="color-slider-thumb" :style="{left: opaSliderX + 'px'}"></div>
                </div>
            </div>
        </div>
        <div class="color-value-box">
            <div>{{HEX}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ColorPicker',
    props: {
        color: {
            type: String,
            default: function() {
                return '#000000';
            }
        }
    },
    data() {
        return {
            commonColors: [],  // 常用颜色
            sliderColor: 'rgb(0, 255, 213)',   // 色块条的色值
            hueSliderX: 40,  // 色块条的位置
            hueStartX: 40, // 记录初始滑块位置
            opaSliderX: 100,  // 透明条的位置
            cursorX: 40,  // 取色块的位置
            cursorY: 50,  // 取色块的位置
            startX: 0,  // 开始X位置
            currentX: 0,  // 当前X位置
            HEX: '', // 当前颜色  hex
            RGBA: '', // 当前颜色  rgba
            HLSA: '', // 当前颜色  hlsa,
            isHueClick: false, // 是否点击滑块
            isHueDragging: false,  // 是否拖动滑块
        }
    },
    computed: {
        pickerColor() {
            return this.color
        },
    },
    watch: {
        pickerColor: {
            handler: function(val) {
                console.log('pickerColor', val);
                this.HEX = val;
            },
            immediate: true
        }
    },
    mounted() {
        const { hueBar, hueThumb } = this.$refs;
        hueThumb.addEventListener('mousedown', this.onHueClick)
        // this.colorReact = this.colorSlideBar.getBoundingClientRect();
    },
    methods: {
        onHueClick(event) {
            event.preventDefault();
            this.onDragStart(event);
            window.addEventListener('mousemove', this.onDragging);
            window.addEventListener('mouseup', this.onDragEnd);
        },
        onDragStart(event) {
            this.isHueDragging = true;
            this.isHueClick = true;
            this.startX = event.clientX;
            this.hueStartX = this.hueSliderX;
        },
        onDragging(event) {
            if (this.isHueDragging) {
                this.isHueClick = false;
                let diff = 0;  // 移动距离
                this.currentX = event.clientX;
                diff = this.currentX - this.startX;
                this.setPosition('hueSliderX', 'hueStartX', diff);
            }
        },
        onDragEnd() {
            var _this = this;
            if (this.isHueDragging) {
                /*
                * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
                * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
                */
                setTimeout(function () {
                    _this.isHueDragging = false;
                    if (!_this.isHueClick) {
                        _this.setPosition('hueSliderX', this.currentX - this.startX);
                    }
                }, 0);
                window.removeEventListener('mousemove', this.onDragging);
                window.removeEventListener('mouseup', this.onDragEnd);
            }
        },
        setPosition(newVal, oldVal, diff) {
            const { hueBar } = this.$refs;
            if (diff === null || isNaN(diff)) return;
            if (diff + this[oldVal] < 0) {
                this[newVal] = -5;
            } else if (diff > hueBar.offsetWidth - this[oldVal]) {
                this[newVal] = hueBar.offsetWidth - 5;
            } else {
                this[newVal] = this[oldVal] + diff;
            }
        },
    },
}
</script>
<style scoped>
.color-picker-wrap {
    position: relative;
    width: 350px;
    padding: 5px;
    border-radius: 3px;
    overflow: hidden;
}
.color-svpanel {
    position: relative;
    width: 100%;
    height: 250px;
}
.color-svpanel-white {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(90deg,#fff,hsla(0,0%,100%,0));
}
.color-svpanel-black {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(0deg,#000,transparent);
}
.color-svpanel-cursor {
    position: absolute;
}
.color-svpanel-cursor>div {
    width: 4px;
    height: 4px;
    box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);
    border-radius: 50%;
    transform: translate(-2px,-2px);
    cursor: pointer;
}
.color-slider-box {
    margin-top: 15px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.color-show {
    width: 60px;
    height: 30px;
}
.color-slider {
    width: calc(100% - 80px);
    height: 30px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.color-hue-slider, .color-opacity-slider {
    position: relative;
    width: 100%;
    height: 10px;
    padding: 0 2px;
    border-radius: 3px;
}
.color-hue-slider {
    background: red;
}
.color-opacity-slider {
    background: #333;
}
.color-hue-slider-bar, .color-opacity-slider-bar {
    position: relative;
    height: 100%;
    width: 100%;
}
.color-hue-slider-bar {
    background: linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red);
}
.color-opacity-slider-bar {
    background: #333;
}
.color-slider-thumb {
    position: absolute;
    cursor: pointer;
    left: 0;
    top: -2px;
    width: 14px;
    height: 14px;
    border-radius: 100%;
    background: #fff;
    border: 1px solid #f0f0f0;
    box-shadow: 0 0 2px rgba(0,0,0,.6);
    z-index: 1;
}
.color-value-box {
    margin-top: 15px;
}
</style>