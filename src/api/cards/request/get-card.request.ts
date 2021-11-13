import { IsCreditCard } from "class-validator";
import { BaseRequest } from "../../common/base.request";

export class GetCardRequest extends BaseRequest {
  @IsCreditCard()
  number: string;
}
