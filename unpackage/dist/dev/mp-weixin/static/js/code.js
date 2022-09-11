const { hex_md5, base64encode, strEnc, utf16to8 } = require("./md5");

function charType(num) {
  if (num >= 48 && num <= 57) {
    return 8;
  }
  if (num >= 97 && num <= 122) {
    return 4;
  }
  if (num >= 65 && num <= 90) {
    return 2;
  }
  return 1;
}

function isPasswordPolicy(username, password) {
  if (password == "" || password == null || username == password) {
    return "0";
  }
  let passwordlen = password.length;
  if (passwordlen < 6) {
    return "0";
  }
  return "1";
}
function des_encode(data , deskey) {
  return strEnc(data, deskey, null, null);
}
function b64_encode(data) {
  return base64encode(utf16to8(data));
}


function code(obj){
	let {sessionid,deskey,nowtime,username,password,randnumber} = obj
	var result = 0;
	for (var i = 0, len = password.length; i < len; ++i) {
	  result |= charType(password.charCodeAt(i));
	}
	var inuserzh = "0";
	if (password.toLowerCase().trim().indexOf(username.toLowerCase().trim()) > -1) {
	  inuserzh = "1";
	}
	let txt_mm_expression = result;
	let txt_mm_length = password.length;
	let txt_mm_userzh = inuserzh;
	let passwordPolicy = isPasswordPolicy(username, password);
	
	password = hex_md5(hex_md5(password) + hex_md5(randnumber.toLowerCase()));
	username = base64encode(username + ";;" + sessionid);
	let p_username = "_u" + randnumber;
	let p_password = "_p" + randnumber;
	var params =
	  p_username +
	  "=" +
	  username +
	  "&" +
	  p_password +
	  "=" +
	  password +
	  "&randnumber=" +
	  randnumber +
	  "&isPasswordPolicy=" +
	  passwordPolicy +
	  "&txt_mm_expression=" +
	  txt_mm_expression +
	  "&txt_mm_length=" +
	  txt_mm_length +
	  "&txt_mm_userzh=" +
	  txt_mm_userzh;
	var timestamp = nowtime;
	var _params = b64_encode(des_encode(params, deskey));
	var token = hex_md5(hex_md5(params) + hex_md5(timestamp));
	_params = "params=" + _params + "&token=" + token + "&timestamp=" + timestamp;
	return _params
}
module.exports = {code}


