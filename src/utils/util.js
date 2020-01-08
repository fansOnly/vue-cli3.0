/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {array<object>} cache
 * @return {*}
 */
const deepCopy = (obj, cache = []) => {
	if (obj === null || typeof obj !== 'object') {
		return obj
	}

	const hit = cache.filter(c => c.original === obj)[0];
	if (hit) {
		return hit.copy
	}

	const copy = Array.isArray(obj) ? [] : {}
	cache.push({
		original: obj,
		copy
	})

	Object.keys(obj).forEach(key => {
		copy[key] = deepCopy(obj[key], cache)
	})

	return copy
};

/**
* 时间转换时间戳
* @param  {string} time '2019-08-01 12:12:12'
* @return {number}
*/
const date2Timestamp = date => {
	if (typeof date !== 'string') {
		date = date + '';
	}
	return new Date(date).getTime();
};

/**
* 获取url参数
* @param {string}
* @return {obejct}
*/
const getUrlParams = (url, name) => {
	const pattern = /(\w+)=(\w+)/ig;
	let params = {};
	url.replace(pattern, function (a, b, c) {
		params[b] = c;
	});
	return name in params ? params[name] : params;
};

/**
* 返回一个新数组，数组中的元素为指定属性的值
* @param  {array} arr
* @param  {string} key
* @return {array}
*/
const pluck = (arr, key) => {
	if (typeof arr !== 'object' || arr.length === 0) {
		return []
	}
	if (!key) {
		return arr
	}
	return arr.map(a => a[key])
};

/**
 * 返回指定范围内的一个整数
 * @param  {number} min
 * @param  {number} max
 * @return {string}
 */
const rand = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
};

/**
* 生成字符串组合
* @param  {number} size
* @return {string}
*/
const randString = size => {
	let result = ''
	let allChar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

	size = size || 1

	while (size--) {
		result += allChar.charAt(rand(0, allChar.length - 1))
	}

	return result
};

/**
* 格式化数字 1234,4568,9.00
* @param  {number} num
* @param  {string}
* @return {string}
*/
const parseTomoney = (num, str = ',') => {
	num = parseFloat(num.toString().replace(/(\d+)(\.\d{2})(\d+)/g, '$1$2'));
	let [integer, decimal] = String.prototype.split.call(num, '.');
	integer = integer.replace(/\d(?=(\d{3})+$)/g, `$&${str}`);
	return integer + (decimal ?  '.' + decimal : '');
};

/**
 * JS 拷贝实现
 * @param {string} text
 * @param {function}
 */
const copy = (text, callback) => {
	var textarea = document.createElement('textarea');
	textarea.id = 'copyBoard';
	textarea.value = text;
	textarea.style.opacity = 0;
	document.body.appendChild(textarea);
	textarea.select();
	try {
		document.execCommand('copy');
		console.log('复制成功', text);
	} catch (err) {
		console.log('复制失败:', err);
	}
	document.body.removeChild(textarea);
	typeof callback === 'function' && callback();
}

/**
 * JS 下载实现
 * @param {string} url
 */
const download = (url, filename) => {
	var downlink = document.createElement('a');
	downlink.setAttribute('href', url);
	downlink.setAttribute('download', filename);

	var clickEvent = new MouseEvent('click');
	downlink.dispatchEvent(clickEvent);
}

export {
	deepCopy,
	date2Timestamp,
	getUrlParams,
	pluck,
	randString,
	parseTomoney,
	copy,
	download,
}
