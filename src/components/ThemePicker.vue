<template>
    <div>
        <div class="color-picker-board" @click="colorPicker">
            <a-tooltip v-for="item in themes" :key="item.id" placement="top" :title="item.title">
                <span
                    class="color-picker"
                    :class="{ cur: theme == item.color }"
                    :data-color="item.color"
                    :style="`background: ${item.color};`"
                    ><a-icon type="check"
                /></span>
            </a-tooltip>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('settings')

const themes = [
    {id: 1, title: '薄暮', color: '#f5222d'},
    {id: 2, title: '火山', color: '#fa541c'},
    {id: 3, title: '日暮', color: '#faad14'},
    {id: 4, title: '明青', color: '#13c2c2'},
    {id: 5, title: '极光绿', color: '#52c41a'},
    {id: 6, title: '拂晓蓝(默认)', color: '#1890ff'},
    {id: 7, title: '极客蓝', color: '#2f54eb'},
    {id: 8, title: '酱紫', color: '#722ed1'},
];

const version = require("ant-design-vue/package.json").version; // version
const ORIGINAL_THEME = "#1890ff"; // default color

export default {
    data() {
        return {
            themes,
            chalk: "",
            theme: "",
        };
    },
    computed: {
        ...mapState({theme_: 'theme'}),
        defaultTheme() {
            return this.theme_;
        }
    },
    watch: {
        defaultTheme: {
            handler: function(val, oldVal) {
                this.theme = val;
            },
            immediate: true
        },
        theme: {
            handler: async function(val, oldValx) {
                const oldVal = this.chalk ? oldValx : ORIGINAL_THEME
                if (typeof val !== "string") return;
                const themeCluster = this.getThemeCluster(val.replace("#", ""));
                const originalCluster = this.getThemeCluster(
                    oldVal.replace("#", "")
                );
                // console.log(themeCluster, originalCluster);
                const getHandler = (variable, id) => {
                    return () => {
                        this.chalk = this.updateStyle(
                            this[variable],
                            originalCluster,
                            themeCluster
                        );
                        let styleTag = document.getElementById(id);
                        if (!styleTag) {
                            styleTag = document.createElement("style");
                            styleTag.setAttribute("type", "text/css");
                            styleTag.setAttribute("id", id);
                            document.head.appendChild(styleTag);
                        }
                        styleTag.innerText = this.chalk;
                    };
                };
                if (!this.chalk) {
                    const url = `https://unpkg.com/ant-design-vue@${version}/dist/antd.min.css`;
                    await this.getCSSString(url, "chalk");
                }
                // console.log('this.chalk', oldValx, val, this.chalk)
                const chalkHandler = getHandler("chalk", "chalk-style");
                chalkHandler();
                // const styles = [].slice
                //     .call(document.querySelectorAll("style"))
                //     .filter(style => {
                //         const text = style.innerText;
                //         return (
                //             new RegExp(oldVal, "i").test(text) &&
                //             !/Chalk Variables/.test(text)
                //         );
                //     });
                // console.log("styles", styles);
                // styles.forEach(style => {
                //     const { innerText } = style;
                //     if (typeof innerText !== "string") return;
                //     style.innerText = this.updateStyle(
                //         innerText,
                //         originalCluster,
                //         themeCluster
                //     );
                // });
                // this.$emit('change', val);
            },
            immediate: true
        }
    },
    methods: {
        colorPicker(e) {
            const themeColor = e.target.dataset.color;
            if (!themeColor) return;
            this.theme = themeColor;
            localStorage.setItem('theme', themeColor);
            this.changeSetting(themeColor);
        },
        updateStyle(style, oldCluster, newCluster) {
            let newStyle = style;
            oldCluster.forEach((color, index) => {
                newStyle = newStyle.replace(
                    new RegExp(color, "ig"),
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
                        this[variable] = xhr.responseText.replace(
                            /@font-face{[^}]+}/,
                            ""
                        );
                        resolve();
                    }
                };
                xhr.open("GET", url);
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
                    return [red, green, blue].join(",");
                } else {
                    red += Math.round(tint * (255 - red));
                    green += Math.round(tint * (255 - green));
                    blue += Math.round(tint * (255 - blue));

                    red = red.toString(16);
                    green = green.toString(16);
                    blue = blue.toString(16);

                    return `#${red}${green}${blue}`;
                }
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
        },
        ...mapActions(['changeSetting'])
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
