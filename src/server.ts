const express = require('express');

require('dotenv').config();

const app = express();
const router = express.Router();
import bodyParser from 'body-parser';

const apiCals = require('./routes/apiCals');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router.get('/', (req: any, res:any) => {
    console.log(res.json()); 
});

app.use('/call', apiCals);

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

