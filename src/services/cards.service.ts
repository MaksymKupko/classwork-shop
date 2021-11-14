import axios, { AxiosInstance } from "axios";
import cardTypeLib from "credit-card-type";
import { EnvConfig } from "../config";
import { CardEntity } from "../db/entities/card.entity";
import { CardTypeEnum } from "../enums/card-type.enum";

export type TCardTransactionParams = Pick<CardEntity, "number" | "cvv" | "expired">;
export type TCardTransactionResponse = { balance: number };
export type TCardReturn = TCardTransactionParams & TCardTransactionResponse & { type: string };
export class CardsService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({ baseURL: EnvConfig.CARDS_SERVICE_URL });
  }

  public async getCard(cardParams: TCardTransactionParams): Promise<TCardReturn> {
    try {
      const response = await this.api.get<TCardTransactionResponse>("/balance", {
        params: cardParams,
      });
      const balance = response.data.balance;
      const type = this.getCardType(cardParams.number) as CardTypeEnum;

      return {
        ...cardParams,
        balance,
        type,
      };
    } catch (error) {
      throw new Error("Card not found on Antosha swagger or wrong details");
    }
  }

  public async withdrawFromCard(cardParams: TCardTransactionParams, sum: number): Promise<boolean> {
    try {
      await this.api.patch<TCardTransactionResponse>("/withdraw", { sum }, { params: cardParams });
      return true;
    } catch (error) {
      throw new Error("Something went wrong during withdrawal from card.");
    }
  }

  public async depositToCard(cardNumber: string, sum: number): Promise<boolean> {
    try {
      await this.api.patch<TCardTransactionResponse>("/deposit", { sum }, { params: { number: cardNumber } });
      return true;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong during deposit to card");
    }
  }

  public getCardType(cardNumber: string) {
    const cardType = cardTypeLib(cardNumber);
    return cardType[0].type.toUpperCase();
  }
}

export default CardsService;
