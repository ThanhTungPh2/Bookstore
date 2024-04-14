// Trong tệp './Model/Users.js'
export class Users {

    // checkLogin
    static b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
    
    static checkLoggedCookie() {
        var cookies = document.cookie.split(';');

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.indexOf("logged=") === 0) {
                return JSON.parse(this.b64DecodeUnicode(cookie.substring(7)));
            }
        }
        return false;
    }
}
