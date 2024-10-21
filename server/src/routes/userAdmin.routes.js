import { Router } from "express";
import { register, login, logOut, verifyTokenAdmin} from '../controllers/auth.controller.js'
import { validateSchema } from '../middlewares/validator.midldeware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'
const routerAdmin = Router();

routerAdmin.post("/registerAdmin",validateSchema(registerSchema), register);
routerAdmin.post("/loginAdmin", validateSchema(loginSchema) , login);
routerAdmin.post("/logOutAdmin", logOut);
routerAdmin.get("/verifyTokenAdmin", verifyTokenAdmin);


export default routerAdmin;
