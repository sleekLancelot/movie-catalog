import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsNumber()
  public rating: number;

  @IsNotEmpty()
  @IsString()
  public director: string;

  @IsNotEmpty()
  @IsNumber()
  public year: number;

  @IsNotEmpty()
  @IsArray()
  public genre: string[];
}
