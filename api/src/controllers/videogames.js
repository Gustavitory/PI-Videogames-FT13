const {Videogame,Genres}= require('../db');
const axios= require('axios');
const { response } = require('express');
const {API_KEY}=process.env;
const {Op}= require('sequelize')
const {v4:uuidv4}= require ('uuid');

async function getVideoGames(req,res,next) {
    if(req.query.search){
        try{
            let dbc= await Videogame.findAll({where:{name:{[Op.like]:`%${req.query.search}%`}},include: [{model:Genres}]})
            let respuesta= await axios(`https://api.rawg.io/api/games?search=${req.query.search}&key=${API_KEY}`)
            if(dbc.length===0&&respuesta.data.results.length===0) return res.send('Game not found :(')
            dbc=[...dbc,...respuesta.data.results]
            if(dbc.length>15) dbc=dbc.slice(0,15)
            return res.json(dbc);
        }catch{(err=>next(err))}
    }
    
    //aqui abajo ya esta funcionando como lo requiero-------v----v-------v-------v------v-----v-------------v---v--v--v
    try {
        let result = await Videogame.findAll({ include: [{model:Genres}]});
        console.log(result)
        let response1 = await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)
        let response2 = await axios(`${response1.data.next}`)
        let response3 = await axios(`${response2.data.next}`)
        let response4 = await axios(`${response3.data.next}`)
        let response5 = await axios(`${response4.data.next}`)
        result=[...result, ...response1.data.results,...response2.data.results,...response3.data.results,
            ...response4.data.results,...response5.data.results]
        // result=result.slice(0,100);
        let result2=[];
        for(let i=0;i<result.length;i++){
            const {id,name,background_image,genres}=result[i];
            result2.push({id,name,background_image,categories:genres})
        }   
        res.json(result2);
    //   return res.redirect('/videogames'); 
    }catch{(err=>next(err))}
    
}

async function searchVideoGamesforid(req,res,next){
    try{
        let db= await Videogame.findByPk(req.params.id)
        if(db)res.json(db);
        if(req.params.id>615000) res.send('Eror: Game not found :(')
        let respuesta= await axios(`https://api.rawg.io/api/games/${req.params.id}?key=${API_KEY}`)
            res.json({
            background_image:respuesta.data.background_image,
            name:respuesta.data.name,
            description:respuesta.data.description_raw,
            genres:respuesta.data.genres,
            released:respuesta.data.released,
            rating:respuesta.data.rating
        })
     
    }catch{(err=>next.error(err))}
}
// var id=700000;
// const idAsign=()=>{
//     id++;
//     return id;
// }
function* genid(){
    let id=700000;
    while(true){
        yield ++id
    }
}
const idAsign=genid();

async function addVideoGame(req, res, next) {
    const id = idAsign.next().value;
    const background_image='https://media.giphy.com/media/KluRpaqe0ZyyFRfDzi/giphy.gif'
    const game = {...req.body, id,background_image};
    let string='';
    for(let i=0;i<game.platforms.length;i++){
        if (i===game.platforms.length-1){
            string=string+Object.keys(game.platforms[i]) +'.';
        }else string=string+Object.keys(game.platforms[i])+', ';
    }
    game.platforms=string;
    if(!req.body.name) {
        return res.send({      
            message: 'tenes que llenar los datos',
        });
    }
    try {
        const createdGame = await Videogame.create(game);
        for(let i=0;i<game.genres.length;i++){
            await createdGame.addGenres(parseInt(game.genres[i]),{through:'game_gen'})
        } 
        const result = await Videogame.findOne({
            where: {
                name: req.body.name
            },
            include: Genres
        });
        return res.send(result);
    } catch(error) {
        next(error);
    }

}

async function getMyGames(req,res){
    try{
        let dbc= await Videogame.findAll({ include: [{model:Genres}]});
        res.json(dbc);
    }catch {(err=> next.error(err))}
}

// added.setGenres(req.body.genres, {throw:'game_gen'})


module.exports={
    getVideoGames,
    searchVideoGamesforid,
    addVideoGame,
    getMyGames
}
// GET /videogames:
// Obtener un listado de los primeras 15 videojuegos
// Debe devolver solo los datos necesarios para la ruta principal
// [ ] GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado
// [ ] GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados
// [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
// [ ] POST /videogame:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos