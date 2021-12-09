import { IsString, MaxLength, MinLength } from "class-validator";
import { BaseRequest } from "../../common/base.request";

export const MIN_MESSAGE_LENGTH = 1;
export const MAX_MESSAGE_LENGTH = 120;

export class PostMessageRequest extends BaseRequest {
  @IsString()
  @MinLength(MIN_MESSAGE_LENGTH)
  @MaxLength(MAX_MESSAGE_LENGTH)
  data: string;
}
