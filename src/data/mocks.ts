import { UserRoleEnum } from "../enums/user-role.enum";
import { writeFile, promises } from "fs";

export const ITEMS = [
  {
    id: 1,
    sellerId: 2,
    title: "Incredible Frozen Chicken",
    price: 29,
    quantity: 34,
  },
  {
    id: 2,
    sellerId: 2,
    title: "Awesome Cotton Cheese",
    price: 28,
    quantity: 9,
  },
  {
    id: 3,
    sellerId: 3,
    title: "Licensed Fresh Bacon",
    price: 25,
    quantity: 37,
  },
  {
    id: 4,
    title: "Tasty Frozen Shoes",
    price: 45,
    quantity: 9,
    sellerId: 4,
  },
  {
    id: 5,
    title: "Handmade Plastic Chips",
    price: 146,
    quantity: 5,
    sellerId: 4,
  },
  {
    id: 6,
    title: "Unbranded Wooden Soap",
    price: 201,
    quantity: 10,
    sellerId: 5,
  },
  {
    id: 7,
    title: "Fantastic Metal Chips",
    price: 494,
    quantity: 13,
    sellerId: 3,
  },
  {
    id: 8,
    title: "Generic Metal Ball",
    price: 138,
    quantity: 13,
  },
  {
    id: 9,
    title: "Handmade Concrete Shirt",
    price: 482,
    quantity: 48,
    sellerId: 6,
  },
  {
    id: 10,
    title: "Refined Concrete Keyboard",
    price: 163,
    quantity: 45,
    sellerId: 12,
  },
  {
    id: 11,
    title: "Practical Steel Chips",
    price: 225,
    quantity: 30,
    sellerId: 12,
  },
  {
    id: 12,
    title: "Generic Cotton Chips",
    price: 436,
    quantity: 10,
    sellerId: 10,
  },
  {
    id: 13,
    title: "Incredible Wooden Shoes",
    price: 464,
    quantity: 39,
    sellerId: 14,
  },
  {
    id: 14,
    title: "Fantastic Plastic Towels",
    price: 179,
    quantity: 5,
    sellerId: 16,
  },
  {
    id: 15,
    title: "Refined Rubber Mouse",
    price: 468,
    quantity: 45,
    sellerId: 10,
  },
  {
    id: 16,
    title: "Practical Rubber Computer",
    price: 347,
    quantity: 30,
    sellerId: 12,
  },
  {
    id: 17,
    title: "Ergonomic Soft Bike",
    price: 205,
    quantity: 7,
    sellerId: 12,
  },
  {
    id: 18,
    title: "Awesome Rubber Ball",
    price: 257,
    quantity: 31,
    sellerId: 21,
  },
  {
    id: 19,
    title: "Sleek Metal Shirt",
    price: 236,
    quantity: 10,
    sellerId: 18,
  },
  {
    id: 20,
    title: "Intelligent Plastic Chair",
    price: 198,
    quantity: 29,
    sellerId: 17,
  },
];

export const USERS = [
  {
    id: 1,
    role: UserRoleEnum.CUSTOMER,
    login: "Omari69@gmail.com",
    password: "aN9sAXrasYwJ6SW",
    balance: 39.84,
  },
  {
    id: 2,
    role: UserRoleEnum.SELLER,
    login: "Carroll74@hotmail.com",
    password: "h3oSRY48lMdZz55",
    balance: 27.06,
  },
  {
    id: 3,
    login: "Milford.Douglas66@hotmail.com",
    password: "svBmkAhdOZSSho_",
    balance: 87.13,
  },
  {
    id: 4,
    role: UserRoleEnum.SELLER,
    login: "Cassidy.Lesch25@yahoo.com",
    password: "YSWeo428zoSfTH1",
    balance: 52.75,
  },
  {
    id: 5,
    login: "Maryjane_Raynor@gmail.com",
    password: "5sVrqhgqagM5VQ3",
    balance: 79.47,
  },
  {
    id: 6,
    login: "Drake_Kihn91@gmail.com",
    password: "oJDNXiG8mi_QOfk",
    balance: 44.27,
  },
  {
    id: 7,
    login: "Demarco.MacGyver87@hotmail.com",
    password: "aldWi3SaiquEMs8",
    balance: 30.88,
  },
  {
    id: 8,
    login: "Doug_Strosin19@yahoo.com",
    password: "G2H78EzipedEwGb",
    balance: 68.44,
  },
  {
    id: 9,
    login: "Fredy17@yahoo.com",
    password: "HhNfXXluakvDQwl",
    balance: 92.72,
  },
  {
    id: 10,
    login: "Janick0@yahoo.com",
    password: "JR7JVvitnsSiWBN",
    balance: 27.72,
  },
  {
    id: 11,
    login: "Tina_Stokes@hotmail.com",
    password: "bwwZMjhcXWyAh4j",
    balance: 29.01,
  },
  {
    id: 12,
    login: "Elmer_Zboncak22@yahoo.com",
    password: "1sH79712JYHnbai",
    balance: 66.65,
  },
  {
    id: 13,
    login: "Lauryn.Treutel7@hotmail.com",
    password: "hUwLXnYlveoljGd",
    balance: 80.5,
  },
  {
    id: 14,
    login: "Haley72@yahoo.com",
    password: "eFgS6a_rzdYxsuA",
    balance: 84.98,
  },
  {
    id: 15,
    login: "Ulices.Kirlin77@yahoo.com",
    password: "8BSIT9qn5SBxVMH",
    balance: 27.41,
  },
  {
    id: 16,
    login: "Lori24@gmail.com",
    password: "W7sDFJSmZehCJOr",
    balance: 12.81,
  },
  {
    id: 17,
    login: "Yvette.Marquardt61@gmail.com",
    password: "pfJV5wRQp0GXDwr",
    balance: 10.39,
  },
  {
    id: 18,
    login: "Fleta24@gmail.com",
    password: "rYF7vlrGf1X78lC",
    balance: 65.89,
  },
  {
    id: 19,
    login: "Ines14@gmail.com",
    password: "jzhIzwppIRAQJE6",
    balance: 12.35,
  },
  {
    id: 20,
    login: "Sandra.Wyman38@yahoo.com",
    password: "kwRauR8VDtHJZYH",
    balance: 97.01,
  },
];

export const PURCHASES = [];

export const read = async () => {
  const items = await promises.readFile("./items.json", "utf8");
  const users = await promises.readFile("./users.json", "utf8");

  ITEMS.length = 0;
  USERS.length = 0;

  ITEMS.push(...JSON.parse(items));
  USERS.push(...JSON.parse(users));
};
export const save = () => {
  writeFile("./users.json", JSON.stringify(USERS, null, 8), () => {});
  writeFile("./items.json", JSON.stringify(ITEMS, null, 8), () => {});
};
