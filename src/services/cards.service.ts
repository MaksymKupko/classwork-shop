import axios, { AxiosInstance } from "axios";
import cardTypeLib from "credit-card-type";
import { EnvConfig } from "../config";
import { CardTypeEnum } from "../enums/card-type.enum";
import { TCardReturn, TCardTransactionParams, TCardTransactionResponse } from "../tools/types";

export class CardsService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({ baseURL: EnvConfig.CARDS_SERVICE_URL });
  }

  public async getCard(cardParams: TCardTransactionParams): Promise<TCardReturn> {
    try {
      const response = await this.api.get<TCardTransactionResponse>("/balance", {
        params: cardParams,
      });
      const balance = response.data.balance;
      const type = this.getCardType(cardParams.number);

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
      throw new Error("Something went wrong during deposit to card");
    }
  }

  private getCardType(cardNumber: string): CardTypeEnum {
    const cardType = cardTypeLib(cardNumber);
    return cardType[0].type.toUpperCase() as CardTypeEnum;
  }
}

export default CardsService;
