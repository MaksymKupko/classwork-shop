import { UserEntity } from "./user.entity";

export class SellerEntity extends UserEntity {
  constructor(data: Partial<SellerEntity>) {
    super(data);
  }
}
