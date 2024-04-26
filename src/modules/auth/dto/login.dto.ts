import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    type: 'string',
    name: 'username',
    required: true,
    minimum: 1,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: 'string',
    name: 'password',
    required: true,
    minimum: 1,
  })
  @IsNotEmpty()
  password: string;
}
