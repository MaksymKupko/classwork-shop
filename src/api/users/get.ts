import { Request, Response } from "express";
import { USERS } from "../../data/mocks";

export const getUsers = async (req: Request, res: Response) => {
  const response = req.query.role ? USERS.filter(user => user.role === req.query.role) : USERS;

  return response;
};
