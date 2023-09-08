const express = require("express");
const exphandlebars = require("express-handlebars");
const allRoutes = require("./controllers");
const session = require("express-session");
require('dotenv').config();


// server using port to process enviornment
const app = express();
const PORT = process.env.PORT || 3001;

// model structures accessed for Login, upload, comment
const { Login, Upload, Comment } = require("./models");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sess = {
  secret: process.env.DB_SESSION_SECRET,
  cookie: {
// session timer set using cookies
    maxAge: 0.5 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

app.use(express.static('public'));
// server proccessing use for handlebars/routes
const handlebars = exphandlebars.create({});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use("/", allRoutes);
// app listening to port
sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
  });
});