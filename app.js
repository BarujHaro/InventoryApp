const express = require("express"); 
const app = express();    
const path = require("node:path");     
const itemsRouter = require("./src/routes/itemsRoutes");    
const categoriesRouter = require("./src/routes/categoryRoutes");


app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");  
app.set('views', path.join(__dirname, 'src', 'views'));

// RUTAS
app.use('/category', categoriesRouter);
app.use('/', itemsRouter);

// 404 (SIEMPRE AL FINAL)
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Error',
    status: 404,
    message: 'Page not found',
    details: `The route "${req.originalUrl}" does not exist`
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {   
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});