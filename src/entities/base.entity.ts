export abstract class BaseEntity {
  public id: number;

  constructor(data: Partial<BaseEntity>) {
    this.id = data?.id;
  }
}
