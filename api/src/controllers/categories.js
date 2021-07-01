const {Genres}= require('../db');
const axios= require('axios');
const {API_KEY}=process.env

async function getAllGenres(req,res,next) {
    let result = await Genres.findAll({limit: 19});
    res.json(result);
}




module.exports={
    getAllGenres
}