import { UserEntity } from "../../src/db/entities/user.entity";
import { Base } from "../../src/db/entities/base.entity";
declare global {
  namespace Express {
    interface Request {
      user: UserEntity;
      entity: any;
    }
  }
}
