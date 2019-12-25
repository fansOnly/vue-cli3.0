<template>
    <div>
        <div class="color-picker-board" @click="colorPicker">
            <a-tooltip placement="top" title="薄暮">
                <span class="color-picker" :class="{'cur': theme == '#f5222d'}" data-color="#f5222d" style="background:#f5222d;"><a-icon type='check' /></span>
            </a-tooltip>
            <a-tooltip placement="top" title="火山">
                <span class="color-picker" :class="{'cur': theme == '#fa541c'}" data-color="#fa541c" style="background:#fa541c;"><a-icon type='check' /></span>
            </a-tooltip>
            <a-tooltip placement="top" title="日暮">
                <span class="color-picker" :class="{'cur': theme == '#faad14'}" data-color="#faad14" style="background:#faad14;"><a-icon type='check' /></span>
            </a-tooltip>
            <a-tooltip placement="top" title="明青">
                <span class="color-picker" :class="{'cur': theme == '#13c2c2'}" data-color="#13c2c2" style="background:#13c2c2;"><a-icon type='check' /></span>
            </a-tooltip>
            <a-tooltip placement="top" title="极光绿">
                <span class="color-picker" :class="{'cur': theme == '#52c41a'}" data-color="#52c41a" style="background:#52c41a;"><a-icon type='check' /></span>
            </a-tooltip>
            <a-tooltip placement="top" title="拂晓蓝(默认)">
                <span class="color-picker" :class="{'cur': theme == '#1890ff'}" data-color="#1890ff" style="background:#1890ff;"><a-icon type='check' /></span>
            </a-tooltip>
            <a-tooltip placement="top" title="极客蓝">
                <span class="color-picker" :class="{'cur': theme == '#2f54eb'}" data-color="#2f54eb" style="background:#2f54eb;"><a-icon type='check' /></span>
            </a-tooltip>
            <a-tooltip placement="top" title="酱紫">
                <span class="color-picker" :class="{'cur': theme == '#722ed1'}" data-color="#722ed1" style="background:#722ed1;"><a-icon type='check' /></span>
            </a-tooltip>
        </div>
    </div>
</template>

<script>
// import { createNamespacedHelpers } from 'vuex'
// const { mapGetters } = createNamespacedHelpers('settings')

const ORIGINAL_THEME = '#1890ff'; // default color

export default {
    data() {
        return {
            chalk: '', // content of theme-chalk css
            theme: '#1890ff',
        };
    },
    computed: {
        // ...mapGetters['theme'],
        defaultTheme() {
            return this.$store.state.settings.theme;
        }
    },
    watch: {
        defaultTheme: {
            handler: function(val, oldVal) {
                this.theme = val;
            },
            immediate: true
        },
        async theme(val) {
            const oldVal = this.chalk ? this.theme : ORIGINAL_THEME;
            if (typeof val !== 'string') return;
            const themeCluster = this.getThemeCluster(val.replace('#', ''));
            const originalCluster = this.getThemeCluster(oldVal.replace('#', ''));
            console.log(themeCluster, originalCluster);
            return
            const getHandler = (variable, id) => {
                return () => {
                    const originalCluster = this.getThemeCluster(
                        ORIGINAL_THEME.replace('#', '')
                    );
                    const newStyle = this.updateStyle(
                        this[variable],
                        originalCluster,
                        themeCluster
                    );
                    let styleTag = document.getElementById(id);
                    if (!styleTag) {
                        styleTag = document.createElement('style');
                        styleTag.setAttribute('id', id);
                        document.head.appendChild(styleTag);
                    }
                    styleTag.innerText = newStyle;
                };
            };
            // if (!this.chalk) {
            //     const url = `https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css`;
            //     await this.getCSSString(url, 'chalk);
            // }
            const chalkHandler = getHandler('chalk', 'chalk-style');
            chalkHandler();
            const styles = [].slice
                .call(document.querySelectorAll('style'))
                .filter(style => {
                    const text = style.innerText;
                    return (
                        new RegExp(oldVal, 'i').test(text) &&
                        !/Chalk Variables/.test(text)
                    );
                });
            styles.forEach(style => {
                const { innerText } = style;
                if (typeof innerText !== 'string') return;
                style.innerText = this.updateStyle(
                    innerText,
                    originalCluster,
                    themeCluster
                );
            });
            this.$emit('change', val);
        }
    },
    methods: {
        colorPicker(e) {
            console.log('e', e);
            this.theme = e.target.dataset.color;
        },
        updateStyle(style, oldCluster, newCluster) {
            let newStyle = style;
            oldCluster.forEach((color, index) => {
                newStyle = newStyle.replace(
                    new RegExp(color, 'ig'),
                    newCluster[index]
                );
            });
            return newStyle;
        },
        getCSSString(url, variable) {
            return new Promise(resolve => {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '');
                        resolve();
                    }
                };
                xhr.open('GET', url);
                xhr.send();
            });
        },
        getThemeCluster(theme) {
            const tintColor = (color, tint) => {
                let red = parseInt(color.slice(0, 2), 16);
                let green = parseInt(color.slice(2, 4), 16);
                let blue = parseInt(color.slice(4, 6), 16);
                if (tint === 0) {
                    // when primary color is in its rgb space
                    return [red, green, blue].join(',');
                }
                red += Math.round(tint * (255 - red));
                green += Math.round(tint * (255 - green));
                blue += Math.round(tint * (255 - blue));
                red = red.toString(16);
                green = green.toString(16);
                blue = blue.toString(16);
                return `#${red}${green}${blue}`;
            };
            const shadeColor = (color, shade) => {
                let red = parseInt(color.slice(0, 2), 16);
                let green = parseInt(color.slice(2, 4), 16);
                let blue = parseInt(color.slice(4, 6), 16);
                red = Math.round((1 - shade) * red);
                green = Math.round((1 - shade) * green);
                blue = Math.round((1 - shade) * blue);
                red = red.toString(16);
                green = green.toString(16);
                blue = blue.toString(16);
                return `#${red}${green}${blue}`;
            };
            const clusters = [theme];
            for (let i = 0; i <= 9; i++) {
                clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
            }
            clusters.push(shadeColor(theme, 0.1));
            return clusters;
        }
    }
};
</script>

<style scoped>
.color-picker-board {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.color-picker {
    display: block;
    width: 20px;
    height: 20px;
    font-size: 0;
    margin: 0 5px 5px 0;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;
    line-height: 20px;
}
.color-picker.cur {
    color: #fff;
    font-size: 15px;
}
</style>
