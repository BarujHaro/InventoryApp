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
      error: null,
    });
  }catch(error){
    console.error(error);
    res.status(500).send('Error obtaining form to create category');
  }
};

exports.categoryCreatePost = async (req, res) => {
    const {name} = req.body;
    const errors = validateCategory(name);

  try{


    if(!errors.isEmpty()){
      await Category.create(name);
      //res.redirect('categories');
      res.redirect('/category');
    }


  }catch(error){
    console.error(error);
    res.status(500).render('categoryForm', {
      title: 'Create new category',
      category: null,
      formAction: '/category/create',
      error: errors,
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
      error: null,
    });
  }catch(error){
    console.error(error);
    res.status(500).send('Error obtaining form to edit category');
  }


};

exports.CategoryUpdatePost = async (req, res) => {
  const {name} = req.body;
  const categoryId = req.params.id;
  const errors = validateCategory(name);
  const categorySelected =  Category.findById(categoryId);
  try{
    if(!errors.isEmpty()){

      await Category.update(categoryId, name);
      res.redirect('/category');
    }
  }catch(error){
    console.error(error);
    res.status(500).render('categoryForm', {
      title: 'Edit Category',
      category: categorySelected,
      formAction: `/category/edit/${categoryId}`,
      error: errors,
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