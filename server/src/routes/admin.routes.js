import { Router } from "express";
import {
  adminToken,
  getQuestions,
  createQuestion,
  UpdateQuestion,
  deleteQuestion,
} from "../controllers/admin.controller.js";
import {authRequiredAdmin} from '../middlewares/validateTokens.js'
const routerAdmin = Router();

routerAdmin.post("/adminToken", adminToken);

routerAdmin.get("/questions", getQuestions);
routerAdmin.post("/question",authRequiredAdmin,  createQuestion);
routerAdmin.delete("/question/:id",authRequiredAdmin, deleteQuestion);
routerAdmin.put("/question/:id",authRequiredAdmin, UpdateQuestion);

export default routerAdmin;
