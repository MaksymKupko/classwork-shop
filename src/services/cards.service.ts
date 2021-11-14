import axios, { AxiosInstance } from "axios";
import cardTypeLib from "credit-card-type";
import { EnvConfig } from "../config";

export type TCard = {
  number: string;
  cvv: number;
  expired: string;
  balance: number;
  type: string;
};

export type TCardParams = Omit<TCard, "type" | "balance">;

export class CardsService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({ baseURL: EnvConfig.CARDS_SERVICE_URL });
  }

  public async getCard(card: TCardParams): Promise<TCard> {
    try {
      const response = await this.api.get<Pick<TCard, "balance">>("/balance", {
        params: card,
      });
      const balance = response.data.balance;
      const type = this.getCardType(card.number);

      return {
        ...card,
        balance,
        type,
      };
    } catch (error) {
      throw new Error("Card not found on Antosha swagger or wrong details");
    }
  }

  public async withdrawFromCard(card: TCardParams, sum: number): Promise<boolean> {
    try {
      await this.api.patch<Pick<TCard, "balance">>("/withdraw", { sum }, { params: card });
      return true;
    } catch (error) {
      throw error;
    }
  }

  public getCardType(cardNumber: string) {
    const cardType = cardTypeLib(cardNumber);
    return cardType[0].type.toUpperCase();
  }
}

export default CardsService;
