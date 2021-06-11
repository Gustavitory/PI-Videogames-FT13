const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const gameRoutes= require('./videogames');
const categoryRoutes= require('./categories');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', gameRoutes);
// router.use('videogames/:id',lafuncion)
router.use('/genres', categoryRoutes);


module.exports = router;
