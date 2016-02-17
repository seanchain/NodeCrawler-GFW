var proc = require('child_process')
var fs = require('fs')
user = 'jessica.syj'
url = 'https://www.instagram.com/' + user
rex = /"display_src":"(https:[^">]+\.jpg)/g
rex1 = /e,"id":"([^">]+)"/g

function getNewURL(html) {
	var count = 0
	var newurl = 'https://www.instagram.com/' + user + '/?max_id='
	while(n = rex1.exec(html)) {
		count ++
		if (count == 24) {
			newurl = newurl + n[1]
		}
	}
	url = newurl
}

function retrievePictures(i) {
	saveFileName = 'tmp/content' + i
	proc.execSync('proxychains4 wget ' + url + ' -O ' + saveFileName)
	var html = fs.readFileSync(saveFileName, 'utf-8')
	while (m = rex.exec(html)) {
		proc.execSync('proxychains4 wget -nc ' + m[1] + ' -P ' + './images')
	}
	fs.unlinkSync(saveFileName)
	getNewURL(html)
}

for (var i = 0; i < 2; i ++) {
	retrievePictures(i)
}
