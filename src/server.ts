const express = require('express');

require('dotenv').config();

const app = express();
import bodyParser from 'body-parser';

const apiCals = require('./routes/apiCals');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'src/views');


app.get('/view', (req: Request, res: any) => {
//  console.log(app.get('views'));
  
  res.render('index');
})

app.use('/call', apiCals);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

