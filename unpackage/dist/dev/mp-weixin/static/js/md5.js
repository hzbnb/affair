/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
let i,j,k,m,n
/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */
/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s) {
	return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}

function b64_md5(s) {
	return binl2b64(core_md5(str2binl(s), s.length * chrsz));
}

function str_md5(s) {
	return binl2str(core_md5(str2binl(s), s.length * chrsz));
}

function hex_hmac_md5(key, data) {
	return binl2hex(core_hmac_md5(key, data));
}

function b64_hmac_md5(key, data) {
	return binl2b64(core_hmac_md5(key, data));
}

function str_hmac_md5(key, data) {
	return binl2str(core_hmac_md5(key, data));
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test() {
	return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len) {
	/* append padding */
	x[len >> 5] |= 0x80 << len % 32;
	x[(((len + 64) >>> 9) << 4) + 14] = len;

	var a = 1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d = 271733878;

	for (var i = 0; i < x.length; i += 16) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;

		a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
		d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
		c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
		b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
		a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
		d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
		c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
		b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
		a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
		d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
		c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
		b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
		a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
		d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
		c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
		b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

		a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
		d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
		c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
		b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
		a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
		d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
		c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
		b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
		a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
		d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
		c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
		b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
		a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
		d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
		c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
		b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

		a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
		d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
		c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
		b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
		a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
		d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
		c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
		b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
		a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
		d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
		c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
		b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
		a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
		d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
		c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
		b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

		a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
		d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
		c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
		b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
		a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
		d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
		c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
		b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
		a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
		d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
		c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
		b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
		a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
		d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
		c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
		b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

		a = safe_add(a, olda);
		b = safe_add(b, oldb);
		c = safe_add(c, oldc);
		d = safe_add(d, oldd);
	}
	return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
	return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
	return md5_cmn((b & c) | (~b & d), a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
	return md5_cmn((b & d) | (c & ~d), a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
	return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
	return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data) {
	var bkey = str2binl(key);
	if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

	var ipad = Array(16),
		opad = Array(16);
	for (var i = 0; i < 16; i++) {
		ipad[i] = bkey[i] ^ 0x36363636;
		opad[i] = bkey[i] ^ 0x5c5c5c5c;
	}

	var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
	return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
	var lsw = (x & 0xffff) + (y & 0xffff);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xffff);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
	return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str) {
	var bin = Array();
	var mask = (1 << chrsz) - 1;
	for (var i = 0; i < str.length * chrsz; i += chrsz)
		bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
	return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin) {
	var str = "";
	var mask = (1 << chrsz) - 1;
	for (var i = 0; i < bin.length * 32; i += chrsz)
		str += String.fromCharCode((bin[i >> 5] >>> i % 32) & mask);
	return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray) {
	var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	var str = "";
	for (var i = 0; i < binarray.length * 4; i++) {
		str +=
			hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xf) +
			hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xf);
	}
	return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray) {
	var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var str = "";
	for (var i = 0; i < binarray.length * 4; i += 3) {
		var triplet =
			(((binarray[i >> 2] >> (8 * (i % 4))) & 0xff) << 16) |
			(((binarray[(i + 1) >> 2] >> (8 * ((i + 1) % 4))) & 0xff) << 8) |
			((binarray[(i + 2) >> 2] >> (8 * ((i + 2) % 4))) & 0xff);
		for (var j = 0; j < 4; j++) {
			if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
			else str += tab.charAt((triplet >> (6 * (3 - j))) & 0x3f);
		}
	}
	return str;
}

/**
function des_encode(data, key){
	if (typeof key == "undefined" || key == null || key.length == 0) { key = _deskey; }
	var result = strEnc(data, key, null, null);
	return result ;
}

function des_decode(data, key) {
	if (typeof key == "undefined" || key == null || key.length == 0) { key = _deskey; }
	return strDec(data, key, null, null);
}
*/

/**
 * DES加密
 * encrypt the string to string made up of hex
 * return the encrypted string
 */
function strEnc(data, firstKey, secondKey, thirdKey) {
	var leng = data.length;
	var encData = "";
	var firstKeyBt,
		secondKeyBt,
		thirdKeyBt,
		firstLength,
		secondLength,
		thirdLength;
	if (firstKey != null && firstKey != "") {
		firstKeyBt = getKeyBytes(firstKey);
		firstLength = firstKeyBt.length;
	}
	if (secondKey != null && secondKey != "") {
		secondKeyBt = getKeyBytes(secondKey);
		secondLength = secondKeyBt.length;
	}
	if (thirdKey != null && thirdKey != "") {
		thirdKeyBt = getKeyBytes(thirdKey);
		thirdLength = thirdKeyBt.length;
	}
	if (leng > 0) {
		if (leng < 4) {
			var bt = strToBt(data);
			var encByte;
			if (
				firstKey != null &&
				firstKey != "" &&
				secondKey != null &&
				secondKey != "" &&
				thirdKey != null &&
				thirdKey != ""
			) {
				var tempBt;
				var x, y, z;
				tempBt = bt;
				for (x = 0; x < firstLength; x++) {
					tempBt = enc(tempBt, firstKeyBt[x]);
				}
				for (y = 0; y < secondLength; y++) {
					tempBt = enc(tempBt, secondKeyBt[y]);
				}
				for (z = 0; z < thirdLength; z++) {
					tempBt = enc(tempBt, thirdKeyBt[z]);
				}
				encByte = tempBt;
			} else {
				if (
					firstKey != null &&
					firstKey != "" &&
					secondKey != null &&
					secondKey != ""
				) {
					var tempBt;
					var x, y;
					tempBt = bt;
					for (x = 0; x < firstLength; x++) {
						tempBt = enc(tempBt, firstKeyBt[x]);
					}
					for (y = 0; y < secondLength; y++) {
						tempBt = enc(tempBt, secondKeyBt[y]);
					}
					encByte = tempBt;
				} else {
					if (firstKey != null && firstKey != "") {
						var tempBt;
						var x = 0;
						tempBt = bt;
						for (x = 0; x < firstLength; x++) {
							tempBt = enc(tempBt, firstKeyBt[x]);
						}
						encByte = tempBt;
					}
				}
			}
			encData = bt64ToHex(encByte);
		} else {
			var iterator = parseInt(leng / 4);
			var remainder = leng % 4;
			var i = 0;
			for (i = 0; i < iterator; i++) {
				var tempData = data.substring(i * 4 + 0, i * 4 + 4);
				var tempByte = strToBt(tempData);
				var encByte;
				if (
					firstKey != null &&
					firstKey != "" &&
					secondKey != null &&
					secondKey != "" &&
					thirdKey != null &&
					thirdKey != ""
				) {
					var tempBt;
					var x, y, z;
					tempBt = tempByte;
					for (x = 0; x < firstLength; x++) {
						tempBt = enc(tempBt, firstKeyBt[x]);
					}
					for (y = 0; y < secondLength; y++) {
						tempBt = enc(tempBt, secondKeyBt[y]);
					}
					for (z = 0; z < thirdLength; z++) {
						tempBt = enc(tempBt, thirdKeyBt[z]);
					}
					encByte = tempBt;
				} else {
					if (
						firstKey != null &&
						firstKey != "" &&
						secondKey != null &&
						secondKey != ""
					) {
						var tempBt;
						var x, y;
						tempBt = tempByte;
						for (x = 0; x < firstLength; x++) {
							tempBt = enc(tempBt, firstKeyBt[x]);
						}
						for (y = 0; y < secondLength; y++) {
							tempBt = enc(tempBt, secondKeyBt[y]);
						}
						encByte = tempBt;
					} else {
						if (firstKey != null && firstKey != "") {
							var tempBt;
							var x;
							tempBt = tempByte;
							for (x = 0; x < firstLength; x++) {
								tempBt = enc(tempBt, firstKeyBt[x]);
							}
							encByte = tempBt;
						}
					}
				}
				encData += bt64ToHex(encByte);
			}
			if (remainder > 0) {
				var remainderData = data.substring(iterator * 4 + 0, leng);
				var tempByte = strToBt(remainderData);
				var encByte;
				if (
					firstKey != null &&
					firstKey != "" &&
					secondKey != null &&
					secondKey != "" &&
					thirdKey != null &&
					thirdKey != ""
				) {
					var tempBt;
					var x, y, z;
					tempBt = tempByte;
					for (x = 0; x < firstLength; x++) {
						tempBt = enc(tempBt, firstKeyBt[x]);
					}
					for (y = 0; y < secondLength; y++) {
						tempBt = enc(tempBt, secondKeyBt[y]);
					}
					for (z = 0; z < thirdLength; z++) {
						tempBt = enc(tempBt, thirdKeyBt[z]);
					}
					encByte = tempBt;
				} else {
					if (
						firstKey != null &&
						firstKey != "" &&
						secondKey != null &&
						secondKey != ""
					) {
						var tempBt;
						var x, y;
						tempBt = tempByte;
						for (x = 0; x < firstLength; x++) {
							tempBt = enc(tempBt, firstKeyBt[x]);
						}
						for (y = 0; y < secondLength; y++) {
							tempBt = enc(tempBt, secondKeyBt[y]);
						}
						encByte = tempBt;
					} else {
						if (firstKey != null && firstKey != "") {
							var tempBt;
							var x;
							tempBt = tempByte;
							for (x = 0; x < firstLength; x++) {
								tempBt = enc(tempBt, firstKeyBt[x]);
							}
							encByte = tempBt;
						}
					}
				}
				encData += bt64ToHex(encByte);
			}
		}
	}
	return encData;
}

/*
 * DES解密
 * decrypt the encrypted string to the original string
 * return  the original string
 */
function strDec(data, firstKey, secondKey, thirdKey) {
	var leng = data.length;
	var decStr = "";
	var firstKeyBt,
		secondKeyBt,
		thirdKeyBt,
		firstLength,
		secondLength,
		thirdLength;
	if (firstKey != null && firstKey != "") {
		firstKeyBt = getKeyBytes(firstKey);
		firstLength = firstKeyBt.length;
	}
	if (secondKey != null && secondKey != "") {
		secondKeyBt = getKeyBytes(secondKey);
		secondLength = secondKeyBt.length;
	}
	if (thirdKey != null && thirdKey != "") {
		thirdKeyBt = getKeyBytes(thirdKey);
		thirdLength = thirdKeyBt.length;
	}
	var iterator = parseInt(leng / 16);
	var i = 0;
	for (i = 0; i < iterator; i++) {
		var tempData = data.substring(i * 16 + 0, i * 16 + 16);
		var strByte = hexToBt64(tempData);
		var intByte = new Array(64);
		var j = 0;
		for (j = 0; j < 64; j++) {
			intByte[j] = parseInt(strByte.substring(j, j + 1));
		}
		var decByte;
		if (
			firstKey != null &&
			firstKey != "" &&
			secondKey != null &&
			secondKey != "" &&
			thirdKey != null &&
			thirdKey != ""
		) {
			var tempBt;
			var x, y, z;
			tempBt = intByte;
			for (x = thirdLength - 1; x >= 0; x--) {
				tempBt = dec(tempBt, thirdKeyBt[x]);
			}
			for (y = secondLength - 1; y >= 0; y--) {
				tempBt = dec(tempBt, secondKeyBt[y]);
			}
			for (z = firstLength - 1; z >= 0; z--) {
				tempBt = dec(tempBt, firstKeyBt[z]);
			}
			decByte = tempBt;
		} else {
			if (
				firstKey != null &&
				firstKey != "" &&
				secondKey != null &&
				secondKey != ""
			) {
				var tempBt;
				var x, y, z;
				tempBt = intByte;
				for (x = secondLength - 1; x >= 0; x--) {
					tempBt = dec(tempBt, secondKeyBt[x]);
				}
				for (y = firstLength - 1; y >= 0; y--) {
					tempBt = dec(tempBt, firstKeyBt[y]);
				}
				decByte = tempBt;
			} else {
				if (firstKey != null && firstKey != "") {
					var tempBt;
					var x, y, z;
					tempBt = intByte;
					for (x = firstLength - 1; x >= 0; x--) {
						tempBt = dec(tempBt, firstKeyBt[x]);
					}
					decByte = tempBt;
				}
			}
		}
		decStr += byteToString(decByte);
	}
	return decStr;
}
/*
 * chang the string into the bit array
 *
 * return bit array(it's length % 64 = 0)
 */
function getKeyBytes(key) {
	var keyBytes = new Array();
	var leng = key.length;
	var iterator = parseInt(leng / 4);
	var remainder = leng % 4;
	var i = 0;
	for (i = 0; i < iterator; i++) {
		keyBytes[i] = strToBt(key.substring(i * 4 + 0, i * 4 + 4));
	}
	if (remainder > 0) {
		keyBytes[i] = strToBt(key.substring(i * 4 + 0, leng));
	}
	return keyBytes;
}

/*
 * chang the string(it's length <= 4) into the bit array
 *
 * return bit array(it's length = 64)
 */
function strToBt(str) {
	var leng = str.length;
	var bt = new Array(64);
	if (leng < 4) {
		var i = 0,
			j = 0,
			p = 0,
			q = 0;
		for (i = 0; i < leng; i++) {
			var k = str.charCodeAt(i);
			for (j = 0; j < 16; j++) {
				var pow = 1,
					m = 0;
				for (m = 15; m > j; m--) {
					pow *= 2;
				}
				bt[16 * i + j] = parseInt(k / pow) % 2;
			}
		}
		for (p = leng; p < 4; p++) {
			var k = 0;
			for (q = 0; q < 16; q++) {
				var pow = 1,
					m = 0;
				for (m = 15; m > q; m--) {
					pow *= 2;
				}
				bt[16 * p + q] = parseInt(k / pow) % 2;
			}
		}
	} else {
		for (i = 0; i < 4; i++) {
			var k = str.charCodeAt(i);
			for (j = 0; j < 16; j++) {
				var pow = 1;
				for (m = 15; m > j; m--) {
					pow *= 2;
				}
				bt[16 * i + j] = parseInt(k / pow) % 2;
			}
		}
	}
	return bt;
}

/*
 * chang the bit(it's length = 4) into the hex
 *
 * return hex
 */
function bt4ToHex(binary) {
	var hex;
	switch (binary) {
		case "0000":
			hex = "0";
			break;
		case "0001":
			hex = "1";
			break;
		case "0010":
			hex = "2";
			break;
		case "0011":
			hex = "3";
			break;
		case "0100":
			hex = "4";
			break;
		case "0101":
			hex = "5";
			break;
		case "0110":
			hex = "6";
			break;
		case "0111":
			hex = "7";
			break;
		case "1000":
			hex = "8";
			break;
		case "1001":
			hex = "9";
			break;
		case "1010":
			hex = "A";
			break;
		case "1011":
			hex = "B";
			break;
		case "1100":
			hex = "C";
			break;
		case "1101":
			hex = "D";
			break;
		case "1110":
			hex = "E";
			break;
		case "1111":
			hex = "F";
			break;
	}
	return hex;
}

/*
 * chang the hex into the bit(it's length = 4)
 *
 * return the bit(it's length = 4)
 */
function hexToBt4(hex) {
	var binary;
	switch (hex) {
		case "0":
			binary = "0000";
			break;
		case "1":
			binary = "0001";
			break;
		case "2":
			binary = "0010";
			break;
		case "3":
			binary = "0011";
			break;
		case "4":
			binary = "0100";
			break;
		case "5":
			binary = "0101";
			break;
		case "6":
			binary = "0110";
			break;
		case "7":
			binary = "0111";
			break;
		case "8":
			binary = "1000";
			break;
		case "9":
			binary = "1001";
			break;
		case "A":
			binary = "1010";
			break;
		case "B":
			binary = "1011";
			break;
		case "C":
			binary = "1100";
			break;
		case "D":
			binary = "1101";
			break;
		case "E":
			binary = "1110";
			break;
		case "F":
			binary = "1111";
			break;
	}
	return binary;
}

/*
 * chang the bit(it's length = 64) into the string
 *
 * return string
 */
function byteToString(byteData) {
	var str = "";
	for (i = 0; i < 4; i++) {
		var count = 0;
		for (j = 0; j < 16; j++) {
			var pow = 1;
			for (m = 15; m > j; m--) {
				pow *= 2;
			}
			count += byteData[16 * i + j] * pow;
		}
		if (count != 0) {
			str += String.fromCharCode(count);
		}
	}
	return str;
}

function bt64ToHex(byteData) {
	var hex = "";
	for (i = 0; i < 16; i++) {
		var bt = "";
		for (j = 0; j < 4; j++) {
			bt += byteData[i * 4 + j];
		}
		hex += bt4ToHex(bt);
	}
	return hex;
}

function hexToBt64(hex) {
	var binary = "";
	for (i = 0; i < 16; i++) {
		binary += hexToBt4(hex.substring(i, i + 1));
	}
	return binary;
}

/*
 * the 64 bit des core arithmetic
 */

function enc(dataByte, keyByte) {
	var keys = generateKeys(keyByte);
	var ipByte = initPermute(dataByte);
	var ipLeft = new Array(32);
	var ipRight = new Array(32);
	var tempLeft = new Array(32);
	var i = 0,
		j = 0,
		k = 0,
		m = 0,
		n = 0;
	for (k = 0; k < 32; k++) {
		ipLeft[k] = ipByte[k];
		ipRight[k] = ipByte[32 + k];
	}
	for (i = 0; i < 16; i++) {
		for (j = 0; j < 32; j++) {
			tempLeft[j] = ipLeft[j];
			ipLeft[j] = ipRight[j];
		}
		var key = new Array(48);
		for (m = 0; m < 48; m++) {
			key[m] = keys[i][m];
		}
		var tempRight = xor(
			pPermute(sBoxPermute(xor(expandPermute(ipRight), key))),
			tempLeft
		);
		for (n = 0; n < 32; n++) {
			ipRight[n] = tempRight[n];
		}
	}

	var finalData = new Array(64);
	for (i = 0; i < 32; i++) {
		finalData[i] = ipRight[i];
		finalData[32 + i] = ipLeft[i];
	}
	return finallyPermute(finalData);
}

function dec(dataByte, keyByte) {
	var keys = generateKeys(keyByte);
	var ipByte = initPermute(dataByte);
	var ipLeft = new Array(32);
	var ipRight = new Array(32);
	var tempLeft = new Array(32);
	var i = 0,
		j = 0,
		k = 0,
		m = 0,
		n = 0;
	for (k = 0; k < 32; k++) {
		ipLeft[k] = ipByte[k];
		ipRight[k] = ipByte[32 + k];
	}
	for (i = 15; i >= 0; i--) {
		for (j = 0; j < 32; j++) {
			tempLeft[j] = ipLeft[j];
			ipLeft[j] = ipRight[j];
		}
		var key = new Array(48);
		for (m = 0; m < 48; m++) {
			key[m] = keys[i][m];
		}

		var tempRight = xor(
			pPermute(sBoxPermute(xor(expandPermute(ipRight), key))),
			tempLeft
		);
		for (n = 0; n < 32; n++) {
			ipRight[n] = tempRight[n];
		}
	}

	var finalData = new Array(64);
	for (i = 0; i < 32; i++) {
		finalData[i] = ipRight[i];
		finalData[32 + i] = ipLeft[i];
	}
	return finallyPermute(finalData);
}

function initPermute(originalData) {
	let i,m,n,j,k
	var ipByte = new Array(64);
	for (i = 0, m = 1, n = 0; i < 4; i++, m += 2, n += 2) {
		for (j = 7, k = 0; j >= 0; j--, k++) {
			ipByte[i * 8 + k] = originalData[j * 8 + m];
			ipByte[i * 8 + k + 32] = originalData[j * 8 + n];
		}
	}
	return ipByte;
}

function expandPermute(rightData) {
	var epByte = new Array(48);
	for (i = 0; i < 8; i++) {
		if (i == 0) {
			epByte[i * 6 + 0] = rightData[31];
		} else {
			epByte[i * 6 + 0] = rightData[i * 4 - 1];
		}
		epByte[i * 6 + 1] = rightData[i * 4 + 0];
		epByte[i * 6 + 2] = rightData[i * 4 + 1];
		epByte[i * 6 + 3] = rightData[i * 4 + 2];
		epByte[i * 6 + 4] = rightData[i * 4 + 3];
		if (i == 7) {
			epByte[i * 6 + 5] = rightData[0];
		} else {
			epByte[i * 6 + 5] = rightData[i * 4 + 4];
		}
	}
	return epByte;
}

function xor(byteOne, byteTwo) {
	var xorByte = new Array(byteOne.length);
	for (i = 0; i < byteOne.length; i++) {
		xorByte[i] = byteOne[i] ^ byteTwo[i];
	}
	return xorByte;
}

function sBoxPermute(expandByte) {
	var sBoxByte = new Array(32);
	var binary = "";
	var s1 = [
		[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
		[0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
		[4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
		[15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
	];

	/* Table - s2 */
	var s2 = [
		[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
		[3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
		[0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
		[13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
	];

	/* Table - s3 */
	var s3 = [
		[10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
		[13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
		[13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
		[1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
	];
	/* Table - s4 */
	var s4 = [
		[7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
		[13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
		[10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
		[3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
	];

	/* Table - s5 */
	var s5 = [
		[2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
		[14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
		[4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
		[11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
	];

	/* Table - s6 */
	var s6 = [
		[12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
		[10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
		[9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
		[4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
	];

	/* Table - s7 */
	var s7 = [
		[4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
		[13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
		[1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
		[6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
	];

	/* Table - s8 */
	var s8 = [
		[13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
		[1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
		[7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
		[2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
	];

	for (m = 0; m < 8; m++) {
		var i = 0,
			j = 0;
		i = expandByte[m * 6 + 0] * 2 + expandByte[m * 6 + 5];
		j =
			expandByte[m * 6 + 1] * 2 * 2 * 2 +
			expandByte[m * 6 + 2] * 2 * 2 +
			expandByte[m * 6 + 3] * 2 +
			expandByte[m * 6 + 4];
		switch (m) {
			case 0:
				binary = getBoxBinary(s1[i][j]);
				break;
			case 1:
				binary = getBoxBinary(s2[i][j]);
				break;
			case 2:
				binary = getBoxBinary(s3[i][j]);
				break;
			case 3:
				binary = getBoxBinary(s4[i][j]);
				break;
			case 4:
				binary = getBoxBinary(s5[i][j]);
				break;
			case 5:
				binary = getBoxBinary(s6[i][j]);
				break;
			case 6:
				binary = getBoxBinary(s7[i][j]);
				break;
			case 7:
				binary = getBoxBinary(s8[i][j]);
				break;
		}
		sBoxByte[m * 4 + 0] = parseInt(binary.substring(0, 1));
		sBoxByte[m * 4 + 1] = parseInt(binary.substring(1, 2));
		sBoxByte[m * 4 + 2] = parseInt(binary.substring(2, 3));
		sBoxByte[m * 4 + 3] = parseInt(binary.substring(3, 4));
	}
	return sBoxByte;
}

function pPermute(sBoxByte) {
	var pBoxPermute = new Array(32);
	pBoxPermute[0] = sBoxByte[15];
	pBoxPermute[1] = sBoxByte[6];
	pBoxPermute[2] = sBoxByte[19];
	pBoxPermute[3] = sBoxByte[20];
	pBoxPermute[4] = sBoxByte[28];
	pBoxPermute[5] = sBoxByte[11];
	pBoxPermute[6] = sBoxByte[27];
	pBoxPermute[7] = sBoxByte[16];
	pBoxPermute[8] = sBoxByte[0];
	pBoxPermute[9] = sBoxByte[14];
	pBoxPermute[10] = sBoxByte[22];
	pBoxPermute[11] = sBoxByte[25];
	pBoxPermute[12] = sBoxByte[4];
	pBoxPermute[13] = sBoxByte[17];
	pBoxPermute[14] = sBoxByte[30];
	pBoxPermute[15] = sBoxByte[9];
	pBoxPermute[16] = sBoxByte[1];
	pBoxPermute[17] = sBoxByte[7];
	pBoxPermute[18] = sBoxByte[23];
	pBoxPermute[19] = sBoxByte[13];
	pBoxPermute[20] = sBoxByte[31];
	pBoxPermute[21] = sBoxByte[26];
	pBoxPermute[22] = sBoxByte[2];
	pBoxPermute[23] = sBoxByte[8];
	pBoxPermute[24] = sBoxByte[18];
	pBoxPermute[25] = sBoxByte[12];
	pBoxPermute[26] = sBoxByte[29];
	pBoxPermute[27] = sBoxByte[5];
	pBoxPermute[28] = sBoxByte[21];
	pBoxPermute[29] = sBoxByte[10];
	pBoxPermute[30] = sBoxByte[3];
	pBoxPermute[31] = sBoxByte[24];
	return pBoxPermute;
}

function finallyPermute(endByte) {
	var fpByte = new Array(64);
	fpByte[0] = endByte[39];
	fpByte[1] = endByte[7];
	fpByte[2] = endByte[47];
	fpByte[3] = endByte[15];
	fpByte[4] = endByte[55];
	fpByte[5] = endByte[23];
	fpByte[6] = endByte[63];
	fpByte[7] = endByte[31];
	fpByte[8] = endByte[38];
	fpByte[9] = endByte[6];
	fpByte[10] = endByte[46];
	fpByte[11] = endByte[14];
	fpByte[12] = endByte[54];
	fpByte[13] = endByte[22];
	fpByte[14] = endByte[62];
	fpByte[15] = endByte[30];
	fpByte[16] = endByte[37];
	fpByte[17] = endByte[5];
	fpByte[18] = endByte[45];
	fpByte[19] = endByte[13];
	fpByte[20] = endByte[53];
	fpByte[21] = endByte[21];
	fpByte[22] = endByte[61];
	fpByte[23] = endByte[29];
	fpByte[24] = endByte[36];
	fpByte[25] = endByte[4];
	fpByte[26] = endByte[44];
	fpByte[27] = endByte[12];
	fpByte[28] = endByte[52];
	fpByte[29] = endByte[20];
	fpByte[30] = endByte[60];
	fpByte[31] = endByte[28];
	fpByte[32] = endByte[35];
	fpByte[33] = endByte[3];
	fpByte[34] = endByte[43];
	fpByte[35] = endByte[11];
	fpByte[36] = endByte[51];
	fpByte[37] = endByte[19];
	fpByte[38] = endByte[59];
	fpByte[39] = endByte[27];
	fpByte[40] = endByte[34];
	fpByte[41] = endByte[2];
	fpByte[42] = endByte[42];
	fpByte[43] = endByte[10];
	fpByte[44] = endByte[50];
	fpByte[45] = endByte[18];
	fpByte[46] = endByte[58];
	fpByte[47] = endByte[26];
	fpByte[48] = endByte[33];
	fpByte[49] = endByte[1];
	fpByte[50] = endByte[41];
	fpByte[51] = endByte[9];
	fpByte[52] = endByte[49];
	fpByte[53] = endByte[17];
	fpByte[54] = endByte[57];
	fpByte[55] = endByte[25];
	fpByte[56] = endByte[32];
	fpByte[57] = endByte[0];
	fpByte[58] = endByte[40];
	fpByte[59] = endByte[8];
	fpByte[60] = endByte[48];
	fpByte[61] = endByte[16];
	fpByte[62] = endByte[56];
	fpByte[63] = endByte[24];
	return fpByte;
}

function getBoxBinary(i) {
	var binary = "";
	switch (i) {
		case 0:
			binary = "0000";
			break;
		case 1:
			binary = "0001";
			break;
		case 2:
			binary = "0010";
			break;
		case 3:
			binary = "0011";
			break;
		case 4:
			binary = "0100";
			break;
		case 5:
			binary = "0101";
			break;
		case 6:
			binary = "0110";
			break;
		case 7:
			binary = "0111";
			break;
		case 8:
			binary = "1000";
			break;
		case 9:
			binary = "1001";
			break;
		case 10:
			binary = "1010";
			break;
		case 11:
			binary = "1011";
			break;
		case 12:
			binary = "1100";
			break;
		case 13:
			binary = "1101";
			break;
		case 14:
			binary = "1110";
			break;
		case 15:
			binary = "1111";
			break;
	}
	return binary;
}
/*
 * generate 16 keys for xor
 *
 */
function generateKeys(keyByte) {
	var key = new Array(56);
	var keys = new Array();
	let j,k,m
	keys[0] = new Array();
	keys[1] = new Array();
	keys[2] = new Array();
	keys[3] = new Array();
	keys[4] = new Array();
	keys[5] = new Array();
	keys[6] = new Array();
	keys[7] = new Array();
	keys[8] = new Array();
	keys[9] = new Array();
	keys[10] = new Array();
	keys[11] = new Array();
	keys[12] = new Array();
	keys[13] = new Array();
	keys[14] = new Array();
	keys[15] = new Array();
	var loop = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
	for (i = 0; i < 7; i++) {
		for ( j = 0, k = 7; j < 8; j++, k--) {
			key[i * 8 + j] = keyByte[8 * k + i];
		}
	}
	var i = 0;
	for (i = 0; i < 16; i++) {
		var tempLeft = 0;
		var tempRight = 0;
		for (j = 0; j < loop[i]; j++) {
			tempLeft = key[0];
			tempRight = key[28];
			for (k = 0; k < 27; k++) {
				key[k] = key[k + 1];
				key[28 + k] = key[29 + k];
			}
			key[27] = tempLeft;
			key[55] = tempRight;
		}
		var tempKey = new Array(48);
		tempKey[0] = key[13];
		tempKey[1] = key[16];
		tempKey[2] = key[10];
		tempKey[3] = key[23];
		tempKey[4] = key[0];
		tempKey[5] = key[4];
		tempKey[6] = key[2];
		tempKey[7] = key[27];
		tempKey[8] = key[14];
		tempKey[9] = key[5];
		tempKey[10] = key[20];
		tempKey[11] = key[9];
		tempKey[12] = key[22];
		tempKey[13] = key[18];
		tempKey[14] = key[11];
		tempKey[15] = key[3];
		tempKey[16] = key[25];
		tempKey[17] = key[7];
		tempKey[18] = key[15];
		tempKey[19] = key[6];
		tempKey[20] = key[26];
		tempKey[21] = key[19];
		tempKey[22] = key[12];
		tempKey[23] = key[1];
		tempKey[24] = key[40];
		tempKey[25] = key[51];
		tempKey[26] = key[30];
		tempKey[27] = key[36];
		tempKey[28] = key[46];
		tempKey[29] = key[54];
		tempKey[30] = key[29];
		tempKey[31] = key[39];
		tempKey[32] = key[50];
		tempKey[33] = key[44];
		tempKey[34] = key[32];
		tempKey[35] = key[47];
		tempKey[36] = key[43];
		tempKey[37] = key[48];
		tempKey[38] = key[38];
		tempKey[39] = key[55];
		tempKey[40] = key[33];
		tempKey[41] = key[52];
		tempKey[42] = key[45];
		tempKey[43] = key[41];
		tempKey[44] = key[49];
		tempKey[45] = key[35];
		tempKey[46] = key[28];
		tempKey[47] = key[31];
		switch (i) {
			case 0:
				for (m = 0; m < 48; m++) {
					keys[0][m] = tempKey[m];
				}
				break;
			case 1:
				for (m = 0; m < 48; m++) {
					keys[1][m] = tempKey[m];
				}
				break;
			case 2:
				for (m = 0; m < 48; m++) {
					keys[2][m] = tempKey[m];
				}
				break;
			case 3:
				for (m = 0; m < 48; m++) {
					keys[3][m] = tempKey[m];
				}
				break;
			case 4:
				for (m = 0; m < 48; m++) {
					keys[4][m] = tempKey[m];
				}
				break;
			case 5:
				for (m = 0; m < 48; m++) {
					keys[5][m] = tempKey[m];
				}
				break;
			case 6:
				for (m = 0; m < 48; m++) {
					keys[6][m] = tempKey[m];
				}
				break;
			case 7:
				for (m = 0; m < 48; m++) {
					keys[7][m] = tempKey[m];
				}
				break;
			case 8:
				for (m = 0; m < 48; m++) {
					keys[8][m] = tempKey[m];
				}
				break;
			case 9:
				for (m = 0; m < 48; m++) {
					keys[9][m] = tempKey[m];
				}
				break;
			case 10:
				for (m = 0; m < 48; m++) {
					keys[10][m] = tempKey[m];
				}
				break;
			case 11:
				for (m = 0; m < 48; m++) {
					keys[11][m] = tempKey[m];
				}
				break;
			case 12:
				for (m = 0; m < 48; m++) {
					keys[12][m] = tempKey[m];
				}
				break;
			case 13:
				for (m = 0; m < 48; m++) {
					keys[13][m] = tempKey[m];
				}
				break;
			case 14:
				for (m = 0; m < 48; m++) {
					keys[14][m] = tempKey[m];
				}
				break;
			case 15:
				for (m = 0; m < 48; m++) {
					keys[15][m] = tempKey[m];
				}
				break;
		}
	}
	return keys;
}

function utf16to8(str) {
	var out, i, len, c;

	out = "";
	len = str.length;
	for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if (c >= 0x0001 && c <= 0x007f) {
			out += str.charAt(i);
		} else if (c > 0x07ff) {
			out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
		} else {
			out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
		}
	}
	return out;
}

function utf8to16(str) {
	var out, i, len, c;
	var char2, char3;

	out = "";
	len = str.length;
	i = 0;
	while (i < len) {
		c = str.charCodeAt(i++);
		switch (c >> 4) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				// 0xxxxxxx
				out += str.charAt(i - 1);
				break;
			case 12:
			case 13:
				// 110x xxxx   10xx xxxx
				char2 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
				break;
			case 14:
				// 1110 xxxx  10xx xxxx  10xx xxxx
				char2 = str.charCodeAt(i++);
				char3 = str.charCodeAt(i++);
				out += String.fromCharCode(
					((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
				);
				break;
		}
	}

	return out;
}

var base64EncodeChars =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	62,
	-1,
	-1,
	-1,
	63,
	52,
	53,
	54,
	55,
	56,
	57,
	58,
	59,
	60,
	61,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	20,
	21,
	22,
	23,
	24,
	25,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	26,
	27,
	28,
	29,
	30,
	31,
	32,
	33,
	34,
	35,
	36,
	37,
	38,
	39,
	40,
	41,
	42,
	43,
	44,
	45,
	46,
	47,
	48,
	49,
	50,
	51,
	-1,
	-1,
	-1,
	-1,
	-1
);

function base64encode(str) {
	var out, i, len;
	var c1, c2, c3;

	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt((c1 & 0x3) << 4);
			out += "==";
			break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
			out += base64EncodeChars.charAt((c2 & 0xf) << 2);
			out += "=";
			break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
		out += base64EncodeChars.charAt(c3 & 0x3f);
	}
	return out;
}

function base64decode(str) {
	var c1, c2, c3, c4;
	var i, len, out;

	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		/* c1 */
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c1 == -1);
		if (c1 == -1) break;

		/* c2 */
		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c2 == -1);
		if (c2 == -1) break;

		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

		/* c3 */
		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if (c3 == 61) return out;
			c3 = base64DecodeChars[c3];
		} while (i < len && c3 == -1);
		if (c3 == -1) break;

		out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));

		/* c4 */
		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if (c4 == 61) return out;
			c4 = base64DecodeChars[c4];
		} while (i < len && c4 == -1);
		if (c4 == -1) break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
	return out;
}
//js_base64 encode
function str_encode(str) {
	return base64encode(utf16to8(str));
}
//js_base64 decode
function str_decode(str) {
	return utf8to16(base64decode(str));
}

module.exports = {
	hex_md5,
	base64encode,
	strEnc,
	utf16to8
};
