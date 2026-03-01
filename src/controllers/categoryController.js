const Category = require('../models/category');
const { validationResult, matchedData } = require("express-validator");
const validateCategory = require('./validators/categoryValidator');


exports.categoryListGet = async (req, res) => {
  try {
    const categories = await Category.findAll();

    
    res.render('categories', {
      title: 'List of categories',
      categories: categories
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error obtaining categories');
  }
};

exports.categoryCreateGet = async (req, res) => {
  try{
    res.render('categoryForm', {
      title: 'Create new category',
      category: null,
      formAction: '/category/create',
      errors: null,
    });
  }catch(error){
    console.error(error);
    res.status(500).send('Error obtaining form to create category');
  }
};

exports.categoryCreatePost = async (req, res) => {
  const errors = validationResult(req);

  try{
    
    if(!errors.isEmpty()){
      
      return res.status(400).render('categoryForm', {
        title: 'Create new category',
        category: req.body,  
        formAction: '/category/create',
        errors: errors.array(),  
      });
    }

    const { name } = req.body;
    await Category.create(name);
    res.redirect('/category');

  }catch(error){
    console.error(error);
    res.status(500).render('categoryForm', {
      title: 'Create new category',
      category: null,
      formAction: '/category/create',
      errors: errors,
    });
  }
};

exports.CategoryUpdateGet = async (req, res) => {
  try{
    const categoryId = req.params.id;
    const categorySelected =  Category.findById(categoryId);
    res.render('categoryForm', {
      title: 'Edit Category',
      category: categorySelected,
      formAction: `/category/edit/${categoryId}`,
      errors: null,
    });
  }catch(error){
    console.error(error);
    res.status(500).send('Error obtaining form to edit category');
  }


};

exports.CategoryUpdatePost = async (req, res) => {
  const categoryId = req.params.id;
  const errors = validationResult(req);
  const categorySelected =  Category.findById(categoryId);
  try{
    const {name} = req.body;
    if(!errors.isEmpty()){
      res.status(500).render('categoryForm', {
        title: 'Edit Category',
        category: categorySelected,
        formAction: `/category/edit/${categoryId}`,
        errors: errors,
      });
    }

      await Category.update(categoryId, name);
      res.redirect('/category');

  }catch(error){
    console.error(error);
    res.status(500).render('categoryForm', {
      title: 'Edit Category',
      category: categorySelected,
      formAction: `/category/edit/${categoryId}`,
      errors: errors,
    });
  }
};

exports.CategoryDelete = async (req, res) => {

  try{
    const categoryId = req.params.id;
    await Category.delete(categoryId);
    res.redirect('/category');
  }catch(error){
    console.error(error);
    res.status(500).send('Error deleting category');
  }
};