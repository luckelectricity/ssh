先运行`npm i`
然后执行
```
node ./index.js -w password
// password 是服务器密码 具体参考命令
node ./index.js -h
```

上传文件

```
node ./index.js ssh -w password
```
除了密码是必填以外,其余的也是可配置的
```
  -V, --version              output the version number

  -o, --host <hostname>      hostname [58.87.85.94]  (default: "58.87.85.94")

  -u, --username <name>      服务器username [root] (default: "root")

  -w, --password <password>  服务器的密码

  -p, --path <projectPath>   projectPath [../dist] (default: "../dist")

  -s, --sshPath <sshPath>    sshPath [/home/test] (default: "/home/test")

  -h, --help                 output usage information
```
具体参考上表、


----------------
----------------


# 另一种运行方式

运行
`chmod -x upload`

赋予upload自制行的方式
然后就可以把所有的`node ./index.js`变成`./upload`执行

例如上传 则可以这样运行

```
./upload ssh -w password
```

=======

结合webpack打包的办法还在找,主要是传参的问题不知道如何解决,现在只能先打包然后运行这个脚本去上传,其实还有一种方法,就是给服务器条件ssh,然后git pull 下来代码,运行打包命令去服务器上打包,也是很棒的思路.
