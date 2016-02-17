var fs = require('fs')
var proc = require('child_process')

glob_counter = 1
String.prototype.contains = function(it) {
  return this.indexOf(it) != -1
}


function getImage(content) {
  if (content != undefined && content != '' && content != null) {
    var m, rex = /<img[^>]+src="(http:[^">]+\.jpg)"/g
    while (m = rex.exec(content)) {
      var picurl = m[1]
      if (picurl.contains('media.tumblr.com')) {
        proc.execSync('proxychains4 wget -nc ' + picurl + ' -P ' + './images')
      }
    }
  }
}

function getVideo(content) {
  if (content != undefined && content != '' && content != null) {
    var m, rex = /<iframe[^>]+src='(http[^">]+\/)'/g
    count = 0
    while (m = rex.exec(content)) {
      if (m[1] != null && m[1] != undefined && m[1] != '' && m[1].contains('/video/')) {
        var f_videolink = m[1]
        var vids = 'tmp/video' + count
        count += 1
        proc.execSync('proxychains4 wget ' + f_videolink + ' -O ' + vids)
        var html = fs.readFileSync(vids, 'utf-8')
        reg = /<source[^>]+src="(http[^">]+)"/
        res = reg.exec(html)
        if (res[1] != null && res[1] != undefined && res[1] != '') {
          var v_link = res[1]
          var videotitle = './videos/tumblr_' + glob_counter + '.mp4'
          glob_counter += 1
          proc.execSync('proxychains4 wget -nc ' + v_link + ' -O ' + videotitle)
        }
        fs.unlinkSync(vids)
      }
    }
  }
}

oriurl = 'http://princesst-ara.tumblr.com/page/'

for (var i = 0; i < 5; i++) {
  var url = oriurl + new String(i + 1)
  var saveFileName = 'tmp/content' + i
  proc.execSync('proxychains4 wget ' + url + ' -O ' + saveFileName)
  var content = fs.readFileSync(saveFileName, 'utf-8')
  console.log(url + ' content get ')
  getImage(content)
  getVideo(content)
  fs.unlinkSync(saveFileName)
}
