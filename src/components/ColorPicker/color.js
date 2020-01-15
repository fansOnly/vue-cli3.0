const parseHex = hex => {
    if (hex.length === 4) {
        return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
    }
    return hex;
}

// HEX 转 RGB 颜色
const hex2rgb = hex => {
    hex = this.parseHex(hex)
    let rgb = []
    for (let i = 1; i < 7; i += 2) {
        rgb.push(parseInt('0x' + hex.slice(i, i + 2)))
    }
    return rgb
}

export default class Color {
    constructor(options) {
        this._hue = 0;  // 色相
        this._saturation = 100;  // 饱和度
        this._value = 100;  // 明度
        this._alpha = 100;  // 透明度

        // 当前色值
        this.value = '';
        this.format = 'hex'; // hex rgba hsla

        options = options || {}

        for(let option in options) {
            if (options.hasOwnProperty(option)) {
                this[option] = options[option]
            }
        }
    }

    set(prop, val) {
        // 传入对象
        if (arguments.length == 1 && typeof prop == 'object') {
            for (let p in prop) {
                if (prop.hasOwnProperty(p)) {
                    this.set(p, prop[p])
                }
            }
            return;
        }
        this['_' + prop] = val;
    }

    get(prop) {
        return this['_' + prop];
    }
}