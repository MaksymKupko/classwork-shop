import { ValueTransformer } from "typeorm";

export class ColumnNumericTransformer implements ValueTransformer {
  defaultValue: number;

  constructor(defaultValue: number) {
    this.defaultValue = defaultValue;
  }
  to(data?: number | null): number {
    if (data !== undefined && data !== null) {
      return data;
    }
    return this.defaultValue;
  }

  from(data?: string | null): number | null {
    if (data !== undefined && data !== null) {
      const res = parseFloat(data);
      if (isNaN(res)) {
        return null;
      } else {
        return res;
      }
    }
    return null;
  }
}
