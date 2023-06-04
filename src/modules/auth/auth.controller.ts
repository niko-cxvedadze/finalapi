import { Request, Response } from "express";

import { signIn, signUp } from "./auth.service";

class AuthController {
  async signUp(req: Request, res: Response) {
    try {
      const user = await signUp(req.body);

      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken } = await signIn({ email, password });

      res.json({ accessToken });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new AuthController();
