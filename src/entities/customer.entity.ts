import { UserEntity } from "./user.entity";

export class CustomerEntity extends UserEntity {
  public cartId: string;

  constructor(data: Partial<CustomerEntity>) {
    super(data);
  }
}
