const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const validateCategory = require('../controllers/validators/categoryValidator');

const categoryRouter = Router();

 
categoryRouter.get('/create', categoryController.categoryCreateGet);
categoryRouter.post('/create', validateCategory, categoryController.categoryCreatePost);
categoryRouter.get('/edit/:id', categoryController.CategoryUpdateGet);
categoryRouter.post('/edit/:id', validateCategory, categoryController.CategoryUpdatePost);
categoryRouter.post("/:id/delete", categoryController.CategoryDelete);
categoryRouter.get('/', categoryController.categoryListGet);




module.exports = categoryRouter;