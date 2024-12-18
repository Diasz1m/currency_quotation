import express, { Request, Response } from "express";
import axios from "axios";
const router = express.Router();


router.post("/api", (request: Request, response: Response) => {
  
  axios.get(process.env.URL + "json/last/" + request.body).then((res: any) => {
    console.log(res);
	
    if (!res.data) response.status(300).render('error');
    
    response.status(200).render('result', {dados: res.data});
  })
	
});

router.get("api/days:", (request: Request, response: Response) => {
	try {
			const params = request.body.data;
			axios.get(process.env.URL + "json/daily:" + params.moeda + "/:" + params.dias).then(async (res: any) => {
				if (!res.data) response.status(300).render('error');
				
				response.status(200).send(res.data);
		})
	}
	catch($e: any)
	{
		response.status(300).render('error');
	}

});


module.exports = router;
