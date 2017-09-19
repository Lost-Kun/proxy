const config = require('./config/config');

const cluster = require('cluster');

const numCPUs = require('os').cpus().length;

const myConsole = require('./utils/consoleWithColor');

function forkWorker(){
    cluster.setupMaster({
        exec:'./utils/worker.js',
        slient:true
    });
    let wk = cluster.fork();

    wk.on('message',(msg) => {
        myConsole.log(msg);
    })
}

  // 衍生工作进程
for (let i = 0; i < numCPUs; i++) {
    forkWorker();
}

cluster.on('exit', function (worker, code, signal) {
    myConsole.error(`工作进程${worker.id}已退出！`);
    forkWorker();
});

myConsole.log(`代理服务器启动：http://localhost:${config.localPort}`);