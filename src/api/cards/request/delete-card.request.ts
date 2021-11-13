import { IsCreditCard } from "class-validator";
import { BaseRequest } from "../../common/base.request";

export class DeleteCardRequest extends BaseRequest {
  @IsCreditCard()
  number: string;
}
