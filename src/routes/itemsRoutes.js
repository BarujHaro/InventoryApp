const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const itemsRouter = Router();


//1. PRIMERO rutas ESPECÍFICAS (sin parámetros)
itemsRouter.get('/search', itemsController.itemsSearchGet);
itemsRouter.get('/bookCreate', itemsController.bookCreateGet);
itemsRouter.post('/bookCreate', itemsController.bookCreatePost);

//2. DESPUÉS rutas con PARÁMETROS

itemsRouter.get("/:id/update", itemsController.booksUpdateGet);
itemsRouter.post("/:id/update", itemsController.booksUpdatePost);
itemsRouter.post("/:id/delete", itemsController.booksDeletePost);
itemsRouter.get('/:id', itemsController.oneBook);
//3. AL FINAL la ruta general
itemsRouter.get('/', itemsController.booksListGet);


module.exports = itemsRouter;