const {Router}=require('express');
const router=Router();
const {getVideoGames,searchVideoGamesforid,addVideoGame,getMyGames}= require('../controllers/videogames')

router.get('/', getVideoGames);
router.get('/myGames',getMyGames);
router.post('/add', addVideoGame);
router.get('/:id', searchVideoGamesforid);
// https://api.rawg.io/api/games?search={game}

module.exports=router;