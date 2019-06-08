// const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const product = require('./routes/api/product.route'); // Imports routes for the products
const article = require('./routes/api/article.route');
const entry = require('./routes/api/entry.route');
const app = express();

// Set up mongoose connection
// const mongoose = require('mongoose');
// let dev_db_url = 'mongodb://root:root2019@ds133187.mlab.com:33187/reactdiary';
// const mongoDB = process.env.MONGODB_URI || dev_db_url;
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.connect('mongodb://root:root2019@ds133187.mlab.com:33187/reactdiary',  { useNewUrlParser: true });
mongoose.set('debug', true);

mongoose.Promise = global.Promise;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use('/products', product);
// app.use('/articles', article);

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'MyDiary', cookie: {maxAge: 60000}, resave:false, saveUninitialized: false}));
app.use(require('./routes'));
app.use('/articles', article);
app.use('/entries', entry );

// const isProduction = process.env.NODE_ENV === 'production';

// if(!isProduction){
//     app.use(errorHandler);
// }

let port = 8000;
const server = app.listen(8000, () => console.log('Server started on http://localhost:8000'));

// const path = require('path');
// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const cors = require('cors');
// const errorHandler = require('errorhandler');
// const mongoose = require('mongoose');


// const article = require('./routes/api/article.route'); //import routes for the articles
// const app = express();

// mongoose.connect('mongodb://root:root2019@ds133187.mlab.com:33187/reactdiary',  { useNewUrlParser: true });
// mongoose.set('debug', true);

// mongoose.Promise = global.Promise;

// app.use(cors());
// app.use(require('morgan')('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({secret: 'MyDiary', cookie: {maxAge: 60000}, resave:false, saveUninitialized: false}));
// app.use('/articles', article);

// const isProduction = process.env.NODE_ENV === 'production';

// if(!isProduction){
//     app.use(errorHandler);
// }

// // // let dev_db_url = 'mongodb://root:root2019@ds133187.mlab.com:33187/reactdiary';
// // // const mongoDB = process.env.MONGODB_URI || dev_db_url;
// // // mongoose.connect(mongoDB);
// // // mongoose.Promise = global.Promise;
// // // const db = mongoose.connection;
// // // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// // // mongoose.connect('mongodb://localhost/react-diary');


// // // Add Models
// // require('./models/Entry');
// // require('./models/Articles');
// // // Add Routes

// // app.use(require('./routes'));

// // if(!isProduction){
// //     app.use((err, req, res) => {
// //         res.status(err.status || 500);

// //         res.json({
// //             errors: {
// //                 message: err.message,
// //                 error: err,
// //             },
// //         });
// //     });
// // }

// // app.use((err, req, res) => {
// //     res.status(err.status || 500);

// //     res.json({
// //         errors: {
// //             message: err.message,
// //             error: {},
// //         },
// //     });
// // });

// const server = app.listen(8000, () => console.log('Server started on http://localhost:8000'));