import { Router, Request } from "express";

export const contractsRouter = Router();

const analysis = [];

interface UserRequest extends Request {
  user_id: number;
  contract: string;
  api_key: string;
}

contractsRouter.post("/analyze", (req: UserRequest, res) => {
  /**
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/UserRequest" }
    }
     */
  console.log("User Request: ", req.body);

  //Implement model
  let action = {
    user_id: req.body.user_id,
    analysis: { confidence: 80.4, predicted_class: "Reentrancy" },
  };

  analysis.push(action);
  res.status(200).json({ confidence: 80.4, predicted_class: "Reentrancy" });
});

contractsRouter.get("/getUserAnalysis/:user_id", (req, res) => {
  const user = analysis.find((u) => u.user_id === req.params.user_id);
  if (!user) res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
});

contractsRouter.get("/getUsersAnalysis", (req, res) => {
  res.status(200).json(analysis);
});
