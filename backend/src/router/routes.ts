const controllers = require("../controllers/controllers");
import express from "express";

const routes = express();



routes.get('/ride/:user_id/:driver_id?', controllers.travelHistory);
routes.post('/ride/estimate', controllers.searchDriver)
routes.patch('/ride/confirm', controllers.confirmTravel);


export default routes;