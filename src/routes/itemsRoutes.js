const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const itemsRouter = Router();
 

//1. PRIMERO rutas ESPECÍFICAS (sin parámetros)
itemsRouter.get('/search', itemsController.itemsSearchGet);
itemsRouter.get('/bookCreate', itemsController.bookCreateGet);
itemsRouter.post('/bookCreate', itemsController.bookCreatePost);

//2. DESPUÉS rutas con PARÁMETROS

itemsRouter.get("/update/:id", itemsController.booksUpdateGet);
itemsRouter.post("/update/:id", itemsController.booksUpdatePost);
itemsRouter.post("/delete/:id", itemsController.booksDeletePost);
itemsRouter.get('/book/:id', itemsController.oneBook);
//3. AL FINAL la ruta general
itemsRouter.get('/', itemsController.booksListGet);


module.exports = itemsRouter;