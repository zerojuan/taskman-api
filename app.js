var deployd = require("deployd");

var dpd_options = {};

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 8080;

if(env == 'development'){
    dpd_options = {
        port: port,
        env: 'development'
    };
}else{
    dpd_options = {
        port: port,
        db: {
            host: process.env.MONGO_HOST,
            port: process.env.MONGO_PORT,
            name: 'taskman-db',
            credentials: {
                username: process.env.MONGO_USER,
                password: process.env.MONGO_PASS
            }
        }
    }
}

var server = deployd(dpd_options);

server.listen();

server.on('listening', function(){
   console.log(env + " Server is listening at: " + port);
});

server.on('error', function(err){
    console.error(err);
    process.nextTick(function(){
        process.exit();
    });
});