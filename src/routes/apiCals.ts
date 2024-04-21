import express, { Request, Response } from "express";
import axios from "axios";
const router = express.Router();


router.get("/api/", (request: Request, response: Response) => {
  console.log(request.body);
  
  axios.get(process.env.URL + "json/last/" + request.body.convert).then((res: any) => {
    
    if (!res.data) response.status(300).render('error');
    
    response.status(200).render('result', {dados: res.data});
  })
});

module.exports = router;
