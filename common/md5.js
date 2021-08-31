/*
 * @Author: crlang
 * @Date: 2021-05-18 11:09:18
 * @Description: wxashop md5类函数封装
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2021-08-11 10:37:36
 */
var MD5 = /** @class */ (function () {
    function MD5() {
    }
    MD5.hash = function (string) {
        return MD5.hex(MD5.md51(string));
    };
    MD5.md5cycle = function (x, k) {
        var a = x[0];
        var b = x[1];
        var c = x[2];
        var d = x[3];
        a = MD5.ff(a, b, c, d, k[0], 7, -680876936);
        d = MD5.ff(d, a, b, c, k[1], 12, -389564586);
        c = MD5.ff(c, d, a, b, k[2], 17, 606105819);
        b = MD5.ff(b, c, d, a, k[3], 22, -1044525330);
        a = MD5.ff(a, b, c, d, k[4], 7, -176418897);
        d = MD5.ff(d, a, b, c, k[5], 12, 1200080426);
        c = MD5.ff(c, d, a, b, k[6], 17, -1473231341);
        b = MD5.ff(b, c, d, a, k[7], 22, -45705983);
        a = MD5.ff(a, b, c, d, k[8], 7, 1770035416);
        d = MD5.ff(d, a, b, c, k[9], 12, -1958414417);
        c = MD5.ff(c, d, a, b, k[10], 17, -42063);
        b = MD5.ff(b, c, d, a, k[11], 22, -1990404162);
        a = MD5.ff(a, b, c, d, k[12], 7, 1804603682);
        d = MD5.ff(d, a, b, c, k[13], 12, -40341101);
        c = MD5.ff(c, d, a, b, k[14], 17, -1502002290);
        b = MD5.ff(b, c, d, a, k[15], 22, 1236535329);
        a = MD5.gg(a, b, c, d, k[1], 5, -165796510);
        d = MD5.gg(d, a, b, c, k[6], 9, -1069501632);
        c = MD5.gg(c, d, a, b, k[11], 14, 643717713);
        b = MD5.gg(b, c, d, a, k[0], 20, -373897302);
        a = MD5.gg(a, b, c, d, k[5], 5, -701558691);
        d = MD5.gg(d, a, b, c, k[10], 9, 38016083);
        c = MD5.gg(c, d, a, b, k[15], 14, -660478335);
        b = MD5.gg(b, c, d, a, k[4], 20, -405537848);
        a = MD5.gg(a, b, c, d, k[9], 5, 568446438);
        d = MD5.gg(d, a, b, c, k[14], 9, -1019803690);
        c = MD5.gg(c, d, a, b, k[3], 14, -187363961);
        b = MD5.gg(b, c, d, a, k[8], 20, 1163531501);
        a = MD5.gg(a, b, c, d, k[13], 5, -1444681467);
        d = MD5.gg(d, a, b, c, k[2], 9, -51403784);
        c = MD5.gg(c, d, a, b, k[7], 14, 1735328473);
        b = MD5.gg(b, c, d, a, k[12], 20, -1926607734);
        a = MD5.hh(a, b, c, d, k[5], 4, -378558);
        d = MD5.hh(d, a, b, c, k[8], 11, -2022574463);
        c = MD5.hh(c, d, a, b, k[11], 16, 1839030562);
        b = MD5.hh(b, c, d, a, k[14], 23, -35309556);
        a = MD5.hh(a, b, c, d, k[1], 4, -1530992060);
        d = MD5.hh(d, a, b, c, k[4], 11, 1272893353);
        c = MD5.hh(c, d, a, b, k[7], 16, -155497632);
        b = MD5.hh(b, c, d, a, k[10], 23, -1094730640);
        a = MD5.hh(a, b, c, d, k[13], 4, 681279174);
        d = MD5.hh(d, a, b, c, k[0], 11, -358537222);
        c = MD5.hh(c, d, a, b, k[3], 16, -722521979);
        b = MD5.hh(b, c, d, a, k[6], 23, 76029189);
        a = MD5.hh(a, b, c, d, k[9], 4, -640364487);
        d = MD5.hh(d, a, b, c, k[12], 11, -421815835);
        c = MD5.hh(c, d, a, b, k[15], 16, 530742520);
        b = MD5.hh(b, c, d, a, k[2], 23, -995338651);
        a = MD5.ii(a, b, c, d, k[0], 6, -198630844);
        d = MD5.ii(d, a, b, c, k[7], 10, 1126891415);
        c = MD5.ii(c, d, a, b, k[14], 15, -1416354905);
        b = MD5.ii(b, c, d, a, k[5], 21, -57434055);
        a = MD5.ii(a, b, c, d, k[12], 6, 1700485571);
        d = MD5.ii(d, a, b, c, k[3], 10, -1894986606);
        c = MD5.ii(c, d, a, b, k[10], 15, -1051523);
        b = MD5.ii(b, c, d, a, k[1], 21, -2054922799);
        a = MD5.ii(a, b, c, d, k[8], 6, 1873313359);
        d = MD5.ii(d, a, b, c, k[15], 10, -30611744);
        c = MD5.ii(c, d, a, b, k[6], 15, -1560198380);
        b = MD5.ii(b, c, d, a, k[13], 21, 1309151649);
        a = MD5.ii(a, b, c, d, k[4], 6, -145523070);
        d = MD5.ii(d, a, b, c, k[11], 10, -1120210379);
        c = MD5.ii(c, d, a, b, k[2], 15, 718787259);
        b = MD5.ii(b, c, d, a, k[9], 21, -343485551);
        x[0] = a + x[0] & 0xFFFFFFFF;
        x[1] = b + x[1] & 0xFFFFFFFF;
        x[2] = c + x[2] & 0xFFFFFFFF;
        x[3] = d + x[3] & 0xFFFFFFFF;
    };
    MD5.cmn = function (q, a, b, x, s, t) {
        a = (a + q & 0xFFFFFFFF) + (x + t & 0xFFFFFFFF) & 0xFFFFFFFF;
        return ((a << s) | (a >>> 32 - s)) + b & 0xFFFFFFFF;
    };
    MD5.ff = function (a, b, c, d, x, s, t) {
        return MD5.cmn((b & c) | (~b & d), a, b, x, s, t);
    };
    MD5.gg = function (a, b, c, d, x, s, t) {
        return MD5.cmn((b & d) | (c & ~d), a, b, x, s, t);
    };
    MD5.hh = function (a, b, c, d, x, s, t) {
        return MD5.cmn(b ^ c ^ d, a, b, x, s, t);
    };
    MD5.ii = function (a, b, c, d, x, s, t) {
        return MD5.cmn(c ^ (b | ~d), a, b, x, s, t);
    };
    MD5.md51 = function (s) {
        var n = s.length;
        var state = [1732584193, -271733879, -1732584194, 271733878];
        var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var o = 0;
        var i = 64;
        for (i; i <= n; i += 64) {
            MD5.md5cycle(state, MD5.md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        i = 0;
        o = s.length;
        for (i; i < o; i++) {
            tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
        }
        tail[i >> 2] |= 0x80 << (i % 4 << 3);
        if (i > 55) {
            MD5.md5cycle(state, tail);
            for (i = 0; i < 16; i++) {
                tail[i] = 0;
            }
        }
        tail[14] = n * 8;
        MD5.md5cycle(state, tail);
        return state;
    };
    MD5.md5blk = function (s) {
        var md5blks = [];
        var i = 0;
        for (i; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    };
    MD5.rhex = function (n) {
        var s = '';
        s += MD5.hexArray[(n >> 4) & 0x0F] + MD5.hexArray[(n >> 0) & 0x0F];
        s += MD5.hexArray[(n >> 12) & 0x0F] + MD5.hexArray[(n >> 8) & 0x0F];
        s += MD5.hexArray[(n >> 20) & 0x0F] + MD5.hexArray[(n >> 16) & 0x0F];
        s += MD5.hexArray[(n >> 28) & 0x0F] + MD5.hexArray[(n >> 24) & 0x0F];
        return s;
    };
    MD5.hex = function (x) {
        var length = x.length;
        var i = 0;
        for (i; i < length; i++) {
            x[i] = MD5.rhex(x[i]);
        }
        return x.join('');
    };
    MD5.hexArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    return MD5;
}());
export default MD5;
