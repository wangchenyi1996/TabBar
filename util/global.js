// 获取上个页面实例
const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

/* 常用正则 */
let regExps = {
	email: /^[0-9a-zA-Z_]+@[0-9a-zA-Z_]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+$/, //邮箱
	mobile: /^(?:1\d{2})-?\d{5}(\d{3}|\*{3})$/, //手机号码
	qq: /^[1-9][0-9]{4,9}$/, //QQ
	befitName: /^[a-z0-9A-Z\u4e00-\u9fa5]+$/, //合适的用户名，中文,字母,数字
	befitPwd: /^[a-z0-9A-Z_]+$/, //合适的密码，字母,数字,下划线
	allNumber: /^[0-9]+.?[0-9]$/, //全部为数字
	englishName: /^[a-zA-Z]+.?[a-zA-Z]+$/ // 英文字母 中间可以加点 例如 David.dandel
}

/* Loading加载框 */
let showLoading = (title = '加载中') => {
	uni.showLoading({
		title,
		mask: true
	});
}

// 消息提示
const msg = (title = '', duration = 1500, mask = false, icon = 'none', position = 'center') => {
	uni.showToast({
		title,
		icon,
		duration,
		mask,
		position
	});
}

// 验证用户是否登录
const checkToken = () => {
	//  用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面
	let pages = getCurrentPages();
	// console.log('当前页面路径', pages[pages.length - 1].route);
	let preRoute = '/' + pages[pages.length - 1].route

	if (!uni.getStorageSync('user_token')) {
		uni.showToast({
			title: '请先进行登录',
			icon: "none",
			success() {
				setTimeout(() => {
					uni.navigateTo({
						// url: '/pages/user/login/login'
						url: `/pages/user/login/login?url=${preRoute}`
					})
				}, 1000)
			}
		})
		return false;
	}
	return true;
}

// 获取 tabbar 导航路由
export const tabbarList = [
	{
		"pagePath": "/pages/index/home/home",
		"text": "首页"
	},
	{
		"pagePath": "/pages/lendMoney/lendMoney",
		"text": "借款"
	},
	{
		"pagePath": "/pages/otc/otc",
		"text": "OTC"
	},
	{
		"pagePath": "/pages/wealth/wealth",
		"text": "财富"
	},
	{
		"pagePath": "/pages/happ/happ",
		"text": "HAPP"
	}
]

// 跳转封装 加权限
const navigate = (options, type = "navigateTo") => {
	// 是否登录验证
	if (!checkToken()) {
		return;
	}
	switch (type) {
		case "navigateTo":
			uni.navigateTo(options);
			break;
		case "redirectTo":
			uni.redirectTo(options);
			break;
		case "reLaunch":
			uni.reLaunch(options);
			break;
		case "switchTab":
			uni.switchTab(options);
			break;
	}
}

/* 保留任意位小数
 * num：值
 * decimal：保留几位小数
 */
const formatDecimal = (num, decimal) => {
	num = num.toString()
	let index = num.indexOf('.')
	if (index !== -1) {
		num = num.substring(0, decimal + index + 1)
	} else {
		num = num.substring(0)
	}
	return parseFloat(num).toFixed(decimal)
}

export default {
	regExps,
	showLoading,
	msg,
	prePage,
	checkToken,
	navigate,
	formatDecimal,
	tabbarList
}
