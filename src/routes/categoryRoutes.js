const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const categoryRouter = Router();

 
categoryRouter.get('/create', categoryController.categoryCreateGet);
categoryRouter.post('/create', categoryController.categoryCreatePost);
categoryRouter.get('/edit/:id', categoryController.CategoryUpdateGet);
categoryRouter.post('/edit/:id', categoryController.CategoryUpdatePost);
categoryRouter.post("/:id/delete", categoryController.CategoryDelete);
categoryRouter.get('/', categoryController.categoryListGet);




module.exports = categoryRouter;