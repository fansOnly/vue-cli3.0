/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
const deepCopy = (obj, cache = []) => {
	// just return if obj is immutable value
	if (obj === null || typeof obj !== 'object') {
		return obj
	}

	// if obj is hit, it is in circular structure
	const hit = find(cache, c => c.original === obj)
	if (hit) {
		return hit.copy
	}

	const copy = Array.isArray(obj) ? [] : {}
	// put the copy into cache at first
	// because we want to refer it in recursive deepCopy
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
* @param  {String} time '2019-08-01 12:12:12'
* @return {Number}
*/
const date2Timestamp = date => {
	if (typeof date !== 'string') {
		date = date + '';
	}
	return new Date(date).getTime();
};

/**
* 获取url参数
* @param {String}
* @return {Obejct}
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
* @param  {Array} arr
* @param  {String} key
* @return {Array}
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
 * @param  {Number} min
 * @param  {Number} max
 * @return {String}
 */
const rand = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
};

/**
* 生成字符串组合
* @param  {Number} size
* @return {String}
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
* 格式化数字 1234,4568,9
* @param  {Number} num
* @param  {String} str
* @return {String}
*/
const parseTomoney = (num, str = ',') => {
	num = parseFloat(num.toString().replace(/(\d+)(\.\d{2})(\d+)/g, '$1$2'));
	let [integer, decimal] = String.prototype.split.call(num, '.');
	integer = integer.replace(/\d(?=(\d{3})+$)/g, `$&${str}`);
	return integer + (decimal ?  '.' + decimal : '');
};

export {
	deepCopy,
	date2Timestamp,
	getUrlParams,
	pluck,
	randString,
	parseTomoney,
}
