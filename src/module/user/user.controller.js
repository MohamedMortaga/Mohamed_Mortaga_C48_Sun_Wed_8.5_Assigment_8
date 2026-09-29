import { Router } from "express";
import { profile } from "./user.service.js";
import { successResponse } from "../../common/response/success.response.js";

const userRouter = Router();

// GET /user/profile?id=<userId>  (no auth tokens yet -> logged-in user's id via query)
userRouter.get("/profile", async (req, res) => {
  const result = await profile(req.query.id);

  successResponse({ res, data: result });
});

export default userRouter;
