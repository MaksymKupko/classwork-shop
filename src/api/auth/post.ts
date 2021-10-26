import { Request, Response } from "express";
import { pick } from "lodash";
import { UserEntity } from "../../db/entities/user.entity";

export const registration = async (req: Request, res: Response) => {
  await UserEntity.insert(pick(req.body, "login", "password", "role"));
  return res.status(201).send();
};

export const login = async (req: Request, res: Response) => {
  const { login, password } = pick(req.body, "password", "login");
  const user = await UserEntity.findOne({ login });

  if (!user || user.password !== password) {
    res.status(400).send("I dont know you bro");
  }

  res.send("Loged in sucsufficient");
};
