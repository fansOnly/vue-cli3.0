<template>
    <div class="color-alpha-slider">
        <div ref="alphaBar" class="color-alpha-slider-bar"></div>
        <div ref="alphaThumb" class="color-slider-thumb" :style="{left: alphaSlideX + 'px'}"></div>
    </div>
</template>
<script>
import draggable from './draggable'

export default {
    name: 'alpha-slider',
    props: {
        color: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            alphaSlideX: 100,  // 透明条的位置
        }
    },
    computed: {
        hueVal() {
            return this.color.get('hue')
        },
    },
    watch: {
        hueVal() {
            this.update();
        }
    },
    mounted() {
        const { alphaBar, alphaThumb } = this.$refs;

        const dragConfig = {
            drag: event => {
                this.onDragginf(event);
            },
            end: event => {
                this.onDragginf(event);
            }
        }
        draggable(alphaBar, dragConfig);
        draggable(alphaThumb, dragConfig);
        this.update();
    },
    methods: {
        getThumbLeft() {
            const { alphaBar, alphaThumb } = this.$refs;
            let hue = this.color.get('hue');
            if (hue == 0) {
                hue = -alphaThumb.offsetWidth / 2;
            }
            return Math.round(hue * (alphaBar.offsetWidth - alphaThumb.offsetWidth / 2) / 360);
        },
        update() {
            // this.alphaSlideX = this.getThumbLeft();
        }
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
.color-hue-slider, .color-alpha-slider {
    position: relative;
    width: 100%;
    height: 10px;
    padding: 0 2px;
    border-radius: 3px;
}
.color-hue-slider {
    background: red;
}
.color-alpha-slider {
    background: #333;
}
.color-hue-slider-bar, .color-alpha-slider-bar {
    position: relative;
    height: 100%;
    width: 100%;
}
.color-hue-slider-bar {
    background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);
}
.color-alpha-slider-bar {
    background: #333;
}
.color-slider-thumb {
    box-sizing:border-box;
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