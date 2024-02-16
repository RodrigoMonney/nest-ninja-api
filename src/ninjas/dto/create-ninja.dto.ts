import { IsInt, IsString, IsIn, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @IsInt()
  id: number;

  @IsString()
  @MinLength(3)
  name: string;

  @IsIn(['stars', 'nunchuks', 'katana'], { message: 'Use the correct weapon.' })
  weapon: 'stars' | 'nunchucks' | 'katana';
}
