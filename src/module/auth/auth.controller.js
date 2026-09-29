import { Router } from "express";
import { login, signup } from "./auth.service.js";
import { successResponse } from "../../common/response/success.response.js";

const authRouter = Router();

// POST /auth/signup
authRouter.post("/signup", async (req, res) => {
  const result = await signup(req.body);

  successResponse({ res, message: "created", data: result, status: 201 });
});

// POST /auth/login
authRouter.post("/login", async (req, res) => {
  const result = await login(req.body);

  successResponse({ res, data: result });
});

export default authRouter;
