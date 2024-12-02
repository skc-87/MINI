import { Router } from "express";
import { generateQuestion } from "../utils/genAI/gemini.js";


const router = Router();



// generate
router.route("/generate-prompt").post(generateQuestion);



export default router;