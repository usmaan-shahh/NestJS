import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';


export class RegisterReguestDto {

  @IsEmail({}, { message: 'Invalid Email Format' }) 
  email: string;

  @IsNotEmpty() @MinLength(6) @MaxLength(20) 
  password: string;
  
}


export class RegisterResponseDto {

  message: string;

}








/*Client send's JSON

 request.body = {
                  "email": "hello@gmail.com",
                  "password": "hello"
                }

  @Body() body: RegisterDto

  NestJS runs internally: body = plainToInstance(RegisterDto, request.body);

  body = RegisterDto {
                  email: 'hello@gmail.com',
                  password: 'hello',
                    };

  body instanceof RegisterDto  // true

  A DTO(Data Transfer Object) class defines the structure, and validation rules of incoming data and ValidationPipe enforces them before the controller runs 
  
*/