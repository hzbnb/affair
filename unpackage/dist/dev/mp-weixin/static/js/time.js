function nor_date(e){
	let date = new Date(e);
	let y = date.getMonth()+1;
	let r = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
	let res = `${y}/${r}`
	return res
}


module.exports = {
	nor_date
}