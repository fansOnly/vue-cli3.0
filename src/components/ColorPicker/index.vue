<template>
    <div class="color-picker-wrap">
        <!-- 取色板 -->
        <!-- <div class="color-svpanel" :style="{backgroundColor: hueColor}">
            <div class="color-svpanel-white"></div>
            <div class="color-svpanel-black"></div>
            <div ref="colorCursor" class="color-svpanel-cursor" :style="{left: cursorX + 'px', top: cursorY + 'px'}"><div></div></div>
        </div> -->
        <sv-panel :color="color"></sv-panel>
        <div class="color-slider-box">
            <div class="color-show" :style="{'background-color': color.value}"></div>
            <div class="color-slider">
                <!-- 色块滑动条 -->
                <hue-slider :color="color"></hue-slider>
                <!-- <div class="color-hue-slider">
                    <div ref="hueBar" class="color-hue-slider-bar"></div>
                    <div ref="hueThumb" class="color-slider-thumb" :style="{left: hueSliderX + 'px'}"></div>
                </div> -->
                <!-- 透明滑动条 -->
                <alpha-slider :color="color"></alpha-slider>
                <!-- <div class="color-opacity-slider">
                    <div ref="alphaBar" class="color-opacity-slider-bar"></div>
                    <div ref="alphaThumb" class="color-slider-thumb" :style="{left: alphaSlideX + 'px'}"></div>
                </div> -->
            </div>
        </div>
        <div class="color-value-box">
            <div>{{color.value}}</div>
        </div>
    </div>
</template>
<script>
import Color from './color'
import SvPanel from './sv-panel.vue'
import HueSlider from './hue-slider.vue'
import AlphaSlider from './alpha-slider.vue'

export default {
    name: 'ColorPicker',
    components: {
        SvPanel,
        HueSlider,
        AlphaSlider
    },
    props: {
        value: {
            type: String,
            default: function() {
                return '#000000';
            }
        }
    },
    data() {
        const color = new Color();
        return {
            color,
            commonColors: [],  // 常用颜色
            alphaSlideX: 100,  // 透明条的位置
            // HEX: '', // 当前颜色  hex
            // RGBA: '', // 当前颜色  rgba
            // HLSA: '', // 当前颜色  hlsa,
        }
    },
    computed: {
        currentColor() {
            return this.value
        },
        hueVal() {
            return this.color.get('hue')
        }
    },
    watch: {
        currentColor: {
            handler: function(val) {
                console.log('currentColor', val);
                this.color.value = val;
            },
            immediate: true
        },
        hueVal() {
        }
    },
    mounted() {
    },
    methods: {
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
.color-value-box {
    margin-top: 15px;
}
</style>