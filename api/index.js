//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const {conn,Videogame,Genres} = require('./src/db.js');
const {default:axios}=require('axios');
const { response } = require('express');
const {API_KEY}=process.env;
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001');
    axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then((genres)=>genres.data&&genres.data.results.forEach(g=>{
      Genres.create({
        name:g.name.charAt(0).toUpperCase()+g.name.slice(1)
      }).catch((err)=>res.status(500,{msg:err}))
    }))
     // eslint-disable-line no-console
  });
});
