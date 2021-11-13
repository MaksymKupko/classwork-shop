import { IsCreditCard, Matches } from "class-validator";
import { IsCVV } from "../../../validators/cvv.validator";
import { BaseRequest } from "../../common/base.request";

export class PostCardRequest extends BaseRequest {
  @IsCreditCard()
  number: string;

  @IsCVV()
  cvv: number;

  @Matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)
  expired: string;
}
