const { createClient } = require('redis');

// const redisClient = createClient({
//     username: 'default',
//     password: 'Aa0v3iH7ocmf5Ilq8EOTfFYTl1jTh8NX',
//     socket: {
//         host: 'redis-19600.crce206.ap-south-1-1.ec2.cloud.redislabs.com',
//         port: 19600
//     }
// });


const redisClient = createClient({
    username: 'default',
    password: 'tSj6g9OkCli2tCBh281zOcIi8GEHqr72',
    socket: {
        host: 'redis-18729.crce179.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 18729
    }
});



redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});

module.exports = redisClient