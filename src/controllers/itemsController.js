const Item = require('../models/item');
const Category = require('../models/category');
const { validationResult, matchedData } = require("express-validator");
const validateBook = require('./validators/bookValidator');


exports.booksListGet = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.render('index', {
      title: 'List of books',
      items
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error obtaining books');
  }
};

exports.oneBook = async (req, res) => {
  const bookId = req.params.id;
    if (isNaN(bookId)) {
    return res.status(400).send('ID invalid');
  }
  
  try {
    const item = await Item.findOne(bookId);
    
    if (!item) {
      return res.status(404).render('error', {
        title: 'Error',
        message: 'Book not found'
      });
    }
    
    res.render('singleBook', {
      title: 'Book details',
      item: item
    });
    
  } catch (error) {
    console.error('Book not loaded:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Book not loaded'
    });
  }
};


exports.bookCreateGet = async (req, res) => {
  try{
  const categories = await Category.findAll();
  res.render("bookCreate", {
      title: "Create book",
      categories: categories,
      errors: [],
      formData: {}
  });
    } catch (error) {
    console.error(error);
    res.status(500).send('Error loading form');
  }
};


exports.bookCreatePost =  [
  validateBook,
  async (req, res) => {
 
    const errors = validationResult(req);
    const categories = await Category.findAll();
 
    if (!errors.isEmpty()) {
      return res.status(400).render("bookCreate", {
        title: "Create book",
        categories: categories,
        errors: errors.array(),
        formData: req.body
      });
    }

    try{
      const bookData = matchedData(req);
      const newBook = await Item.create({
        title: bookData.title,
        author: bookData.author,
        year: bookData.year,
        isbn: bookData.isbn || null,
        category_id: bookData.category_id,
        description: bookData.description || '',
      });
      res.redirect(`/${newBook.id}`);
    }catch(error){
      console.error('Error creating book:', error);
      res.status(500).render("bookCreate", {
        title: "Create book",
        categories: categories,
        errors: [{ msg: 'Error saving book. Try again.' }],
        formData: req.body
      }); 
    }
    


  }

];


exports.booksUpdateGet = async (req, res) => {
  const bookId = req.params.id;
  const book = await Item.findOne(bookId);
  const categories = await Category.findAll();
  res.render("updateBook", {
    title: "Update book",
    book: book,
    categories: categories,
  });
};

exports.booksUpdatePost = [
  validateBook,
  async (req, res) => {
    const book = await Item.findOne(req.params.id);
    const errors = validationResult(req);
    const categories = await Category.findAll();
    if (!errors.isEmpty()) {
      return res.status(400).render("updateBook", {
        title: "Update book",
        book: book,
        categories: categories,
        errors: errors.array(),
      });
    }
    const {title, author, year, isbn, category_id, description} = matchedData(req);
    await Item.update(req.params.id, {title, author, year, isbn, category_id, description});
    res.redirect(`/${book.id}`);
  }
];

exports.booksDeletePost = async (req, res) => {
  try{
    await Item.delete(req.params.id);
    res.redirect("/");
  }catch(errors){
    console.log(errors);
    res.status(500).send('Error deleting item');
  }
  
};

exports.itemsSearchGet = async (req, res) => {
  try {
    const searchQuery = req.query.q || '';

    const results = await Item.search(searchQuery);

    res.render("search", {
      title: "Search Results",
      items: results,
      searchQuery,
      resultsCount: results.length
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching items");
  }
};