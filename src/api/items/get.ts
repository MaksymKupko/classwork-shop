import { Request, Response } from "express";
import { ITEMS, USERS } from "../../data/mocks";

export const getItem = async (req: Request, res: Response) => {
  res.send(ITEMS);
};
export const getItemById = async (req: Request, res: Response) => {
  const id = +req.params.id;
  const item = ITEMS.find(item => (item.id = id));
  return item ? res.send(item) : res.status(404).send("Item not found!");
};
export const getSellerByItemId = async (req: Request, res: Response) => {
  const id = +req.params.id;
  const seller = USERS.find(seller => seller.id === id);
  return seller ? res.send(seller) : res.status(404).send("Seller not found!");
};
