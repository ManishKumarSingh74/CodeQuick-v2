const { createClient } = require('redis');


// const redisClient = createClient({
//     username: 'default',
//     password: 'tSj6g9OkCli2tCBh281zOcIi8GEHqr72',
//     socket: {
//         host: 'redis-18729.crce179.ap-south-1-1.ec2.cloud.redislabs.com',
//         port: 18729
//     }
// });

const redisClient = createClient({
    username: 'default',
    password: '8xu7BZMNqWZXIVnVGPLQuldqlAItInwL',
    socket: {
        host: 'redis-17311.crce276.ap-south-1-3.ec2.cloud.redislabs.com',
        port: 17311
    }
});



redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});

module.exports = redisClient
