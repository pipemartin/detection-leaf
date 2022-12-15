const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const {database} = require('./keys');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});


// initialization
const app = express();
require('./lib/passport');
app.use(express.static(__dirname + '/public'));

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs',exphbs.engine({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')

//Middlewares
app.use(session({
    secret: 'leaf',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads')
}).single('image'));

// global Variables
app.use((req,res,next)=>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//Routes

app.use('/',require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/leaf', require('./routes/leaf'));
app.use('/detection', require('./routes/detection'));

// Public
app.use(express.static(path.join(__dirname, 'public')))

//Starting the server
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get);
});