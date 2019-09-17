const DEBUG = false;
let GITHUB_APPID = '';
let BASE_URL = '';
if (DEBUG) {
    GITHUB_APPID = "faf744205623aab0ff00";
    BASE_URL= 'http://localhost:10086'
} else {
    GITHUB_APPID = "e55a48b68553ec2b350c";
    BASE_URL= 'http://bookmark-backend.freaks.group'
}

export {
    DEBUG,
    GITHUB_APPID,
    BASE_URL
}