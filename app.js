const express = require("express"); 
const app = express();    
const path = require("node:path");     
const itemsRouter = require("./src/routes/itemsRoutes");    
const categoriesRouter = require("./src/routes/categoryRoutes");
 
app.set("view engine", "ejs");  
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.urlencoded({ extended: true })); 
//app.use("/", usersRouter);  
app.use('/category', categoriesRouter);
app.use('/', itemsRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {   
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});