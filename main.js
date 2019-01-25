const Client = require("ssh2").Client;
const moment = require("moment");
// const path = require("path");
const sshFun = require("./ssh");

var uploadDir = function(server, localDir, user) {
  var conn = new Client();
  conn
    .on("ready", function() {
      console.log("Client :: ready");
      //创建备份好的文件名
      let filesName = moment(new Date()).format("YYYY-M-D-HH:mm:ss");
      console.log(filesName);
      conn.exec(
        `mkdir ${user}/${filesName} && mv ${user}/static ${user}/${filesName} && mv ${user}/index.html ${user}/${filesName}`,
        function(err, stream) {
          if (err) throw err;
          stream
            .on("close", function(code, signal) {
              console.log(
                "Stream :: close :: code: " + code + ", signal: " + signal
              );
              conn.end();
              sshFun.UploadDir(server, localDir, user, () => {
                console.log("文件夹上传成功");
                process.exit();
              });
            })
            .on("data", function(data) {
              console.log("STDOUT: " + data);
            })
            .stderr.on("data", function(data) {
              console.log("STDERR: " + data);
            });
        }
      );
    })
    .connect(server);
};
// uploadDir(server, localDir, user);
module.exports = uploadDir;
