const uploaddir = require("./main.js");
const path = require("path");
// const password = process.argv[2];
const program = require("commander");
const pkg = require("./package.json");

program
  .version(pkg.version)
  .description(pkg.description)
  .usage("[options] <command> [...]")
  .option("-o, --host <hostname>", "hostname [58.87.85.94]", "58.87.85.94")
  .option("-u, --username <name>", "服务器username [root]", "root")
  .option("-w, --password <password>", "服务器的密码")
  .option("-p, --path <projectPath>", "projectPath [../dist]", "../dist")
  .option("-s, --sshPath <sshPath>", "sshPath [/home/test]", "/home/test");

// if (!password) {
//   throw Error("请输入服务器密码");
// }
program
  .command("ssh")
  .description("上传dist到服务器")
  .action(() => {
    console.log(program.password, program.username, program.host, program.path, program.sshPath);
    if (program.password) {
      const server = {
        host: program.host, // ftp服务器ip地址
        username: program.username, // 你的登录用户名
        password: program.password // 你的密码
      };
      //打包好工程的路径
      const localDir = path.resolve(__dirname, program.path);
      //远程服务器的地址
      const user = program.sshPath;
      uploaddir(server, localDir, user);
    } else {
      throw Error("请输入服务器密码");
    }
  });
// const server = {
//   host: program.host, // ftp服务器ip地址
//   username: program.username, // 你的登录用户名
//   password: program.password // 你的密码
// };
// //打包好工程的路径
// const localDir = path.resolve(__dirname, program.path);
// //远程服务器的地址
// const user = program.sshPath;
// uploaddir(server, localDir, user);

program.parse(process.argv);

if (!program.args.filter(arg => typeof arg === "object").length) {
  program.help();
}
