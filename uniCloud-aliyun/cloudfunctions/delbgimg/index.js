'use strict';
exports.main = async (event, context) => {
	let result = await uniCloud.deleteFile({
		fileList: [
			event.bgimg // 阿里云fileID是url形式，例：https://xxx.com/xxx.png
		],
	});
	return result
};
