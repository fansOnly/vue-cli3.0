<template>
    <!-- <el-color-picker
        v-model="theme"
        :predefine="[
            '#409EFF',
            '#1890ff',
            '#304156',
            '#212121',
            '#11a983',
            '#13c2c2',
            '#6959CD',
            '#f5222d'
        ]"
        class="theme-picker"
        popper-class="theme-picker-dropdown"
    /> -->
    <div class="color-picker-board" @click="colorPicker">
        <a-button class="color-picker color1" data-color="#409EFF">#409EFF</a-button>
        <a-button class="color-picker color2" data-color="#f5222d">#f5222d</a-button>
        <a-button class="color-picker color3" data-color="#304156">#304156</a-button>
        <a-button class="color-picker color4" data-color="#212121">#212121</a-button>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('settings')

const ORIGINAL_THEME = "#409EFF"; // default color

export default {
    data() {
        return {
            chalk: "", // content of theme-chalk css
            theme: ""
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
            if (typeof val !== "string") return;
            const themeCluster = this.getThemeCluster(val.replace("#", ""));
            const originalCluster = this.getThemeCluster(oldVal.replace("#", ""));
            console.log(themeCluster, originalCluster);
            const getHandler = (variable, id) => {
                return () => {
                    const originalCluster = this.getThemeCluster(
                        ORIGINAL_THEME.replace("#", "")
                    );
                    const newStyle = this.updateStyle(
                        this[variable],
                        originalCluster,
                        themeCluster
                    );
                    let styleTag = document.getElementById(id);
                    if (!styleTag) {
                        styleTag = document.createElement("style");
                        styleTag.setAttribute("id", id);
                        document.head.appendChild(styleTag);
                    }
                    styleTag.innerText = newStyle;
                };
            };
            // if (!this.chalk) {
            //     const url = `https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css`;
            //     await this.getCSSString(url, "chalk");
            // }
            const chalkHandler = getHandler("chalk", "chalk-style");
            chalkHandler();
            const styles = [].slice
                .call(document.querySelectorAll("style"))
                .filter(style => {
                    const text = style.innerText;
                    return (
                        new RegExp(oldVal, "i").test(text) &&
                        !/Chalk Variables/.test(text)
                    );
                });
            styles.forEach(style => {
                const { innerText } = style;
                if (typeof innerText !== "string") return;
                style.innerText = this.updateStyle(
                    innerText,
                    originalCluster,
                    themeCluster
                );
            });
            this.$emit("change", val);
        }
    },
    methods: {
        colorPicker(e) {
            console.log('e', e.target.dataset.color);
            this.theme = e.target.dataset.color;
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
                        this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/,"");
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
        }
    }
};
</script>

<style scoped>
.color-picker-board {
    position: fixed;
    right: 5px;
    top: 20%;
    z-index: 99999;
}
.color-picker {
    width: 20px;
    height: 20px;
    font-size: 0;
}
.color1 {
    background: #409EFF;
}
.color2 {
    background: #f5222d;
}
.color3 {
    background: #304156;
}
.color4 {
    background: #212121;
}
</style>
