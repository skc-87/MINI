import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiResponse } from '../ApiResponse.js';
import { ApiError } from '../ApiError.js';

dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



// generate 
const generateQuestion = async (req, res) => {
    try {
        const prompt  = "Generate a mcq on the heritage and culture of india." ;
        const check = "Don't add starts and all. Also generate 10 such question and add them in an array add explanation in breif"
        const format = "The format should be  " + {
            "question": "",
            "options": [
                "a)",
                "b)",
                "c)",
                "d)"
            ],
            "correct": "correct option ",
            "explation": "give explanation in breif"
        };

        const result = await model.generateContent(prompt + check + format);
        console.log("Gen AI Res -> ", result.response.text());

        if (!result) {
            throw new ApiError(400, {}, "Error in generating question")
        }

        return res.status(200).json(
            new ApiResponse(200, result, "Question generated successfully")
        )

    } catch (error) {
        console.log("Error in gemini -> ", error);

        const statusCode = error.statuscode || 500; // Use the status code from ApiError or default to 500
        const message = error?.errors || "Internal Server Error"; // Get the error message

        return res.status(statusCode).json({
            statuscode: statusCode,
            data: null,
            success: false,
            message: message, // Include the message in the response
            errors: error || [], // Include specific errors if any
        });
    }
}




export { generateQuestion }






// const prompt = "generate a mcq on india gate and give its correct answer also make sure that the questions should not repeat";

// const generate = async () => {
//     try {
//         const result = await model.generateContent(prompt);
//         console.log(result.response.text());
//     } catch (error) {
//         console.log("Error -> ", error);
//     }
// }

// generate(); 
