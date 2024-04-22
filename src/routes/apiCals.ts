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

router.get("api/days:", (request: Request, response: Response) => {
	try {
			const params = request.body.data;
			axios.get(process.env.URL + "json/daily:" + parmas.moeda + "/:" + params.dias).then(async (res: any) => {
				if(!res.data) throw new Exception(response.getError());
				
				response.status(200).send(res.data);
		})
	}
	catch($e)
	{
		response.status(300).send($e.getError());
	}

})

module.exports = router;
