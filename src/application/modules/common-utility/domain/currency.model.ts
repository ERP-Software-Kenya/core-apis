import { AutoMap } from '@automapper/classes';

export class Currency {
  @AutoMap() public code: string;
  @AutoMap() public name: string;
  @AutoMap() public symbol?: string;
  @AutoMap() public symbolNative?: string;
  @AutoMap() public decimalDigits: number;
  @AutoMap() public rounding: number;
  @AutoMap() public namePlural?: string;
}
