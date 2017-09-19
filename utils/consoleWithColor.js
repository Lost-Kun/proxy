module.exports = {
    log(msg){
        console.log('\x1B[32m%s\x1b[0m', `[${new Date().toLocaleString()}] [info] `, msg);
    },
    error(msg){
        console.log('\x1B[31m%s\x1b[0m', `[${new Date().toLocaleString()}] [error] `, msg);
    }
}