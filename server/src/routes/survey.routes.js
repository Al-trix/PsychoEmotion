import { Router } from "express";
import { authRequired } from "../middlewares/validateTokens.js";
import {
  surveyResponsePost,
  surveyResponseGet,
  surveyResponseLogout,
  analysisSurvey,
  createTokenCookie,
  validateToken
} from "../controllers/survey.controller.js";
const router = Router();

router.post("/surveyResponse", authRequired, surveyResponsePost);
router.post("/surveyResponseGet", surveyResponseGet);
router.get("/surveyResponseLogout",authRequired, surveyResponseLogout);
router.get("/createTokenCookie", createTokenCookie);
router.get("/validateTokenAnalysis",authRequired, validateToken);
router.get("/analysisSurvey",authRequired, analysisSurvey);

export default router;
