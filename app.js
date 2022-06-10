const express    = require('express');
const exphbs     = require('express-handlebars');
const app        = express();
const path       = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser');
const job        = require('./models/Job');
const Sequelize  = require('sequelize'); 
const Op         = Sequelize.Op; 

const PORT = 80;


app.listen(process.env.PORT || PORT, function(){
    console.log(`o express ta rodando na porta ${PORT}`);
});
//body parser
app.use(bodyParser.urlencoded({extended: false}));

// handle bars
app.set('views', path.join(__dirname, 'views'));
//express handlebars mudou e tem que ser dessa forma!!!!!!!!!!!!!
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//static folders
app.use(express.static(path.join(__dirname, 'public')))

//db connection
db
  .authenticate()
  .then(() => {
    console.log("Conectou ao banco com sucesso");
  })
  .catch(err => {
    console.log("Ocorreu um erro ao conectar", err);
  });

//routes
app.get('/', (req, res) =>{

  let search = req.query.job;
  let query = '%'+search+'%';

  if(!search){
    job.findAll({order:[
      ['createdAt', 'DESC']
    ]})
    .then(jobs =>{
      res.render('index', {
        jobs
      });
    })
    .catch(err =>console.log(err));
  }else{
    job.findAll({
      where: {title: {[Op.like]: query}},
      order:[
      ['createdAt', 'DESC']
    ]})
    .then(jobs =>{
      res.render('index', {
        jobs, search
      });
    })
    .catch(err =>console.log(err));
  }
});

//jobs routes 
app.use('/jobs', require('./routes/jobs'));
