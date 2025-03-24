import express from "express";
import { googleOAuth } from "../controllers/googleOAuth.js"; // Make sure path matches

const googleRouter = express.Router();

googleRouter.post("/google-auth", googleOAuth);

export default googleRouter;
