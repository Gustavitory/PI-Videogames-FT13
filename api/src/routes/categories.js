const {Router}=require('express');
const router=Router();
const{getAllGenres}=require ('../controllers/categories')

router.get('/', getAllGenres);


module.exports=router;