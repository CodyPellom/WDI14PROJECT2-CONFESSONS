require('dotenv').config()
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()



mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection


db.on('open', () => {
  console.log('connected to MongoDB')

})

db.on('error', (err) => {
  console.log(err)
})
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
const dbConfig = require('./config/database.config.js');


mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
   
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database. ");
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

const index = require('./controllers/index')
const confessionController = require('./controllers/confessionController')
const userController = require('./controllers/userController')



app.use('/', index)
app.use('/confessions', confessionController)
app.use('/confessions/:confessionId/user', userController)

 app.post('/confessions/new', (req, res, next)=>{
 res.render("confessions/new")
})





app.get('/confessions/new', (req, res, next)=>{
  res.render("confessions/new")
})


app.post('/submission', (req, res) => {
  res.render('submission');
});


app.get('/submission', (req, res) => {
  res.render('submission');
})






 
// catch 404 and forward to error handler
//app.use(function(req, res, next) {
  //const err = new Error('Not Found')
  //err.status = 404
 // next(err)
//})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app


app.put('/confessions/index/:id', function(req, res){
  Submission.findByIdAndUpdate(req.params.id, req.body, function(err, response){
     if(err) res.json({message: "Error in updating person with id " + req.params.id});
     res.json(response);
  });
});