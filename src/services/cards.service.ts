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

export type TGetCard = Omit<TCard, "type" | "balance">;

export class CardsService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({ baseURL: EnvConfig.CARDS_SERVICE_URL });
  }

  public async getCard(card: TGetCard): Promise<TCard> {
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
      console.log(error);
      throw new Error("Card not found or wrong details");
    }
  }

  public getCardType(cardNumber: string) {
    const cardType = cardTypeLib(cardNumber);
    return cardType[0].type.toUpperCase();
  }
}

export default CardsService;
