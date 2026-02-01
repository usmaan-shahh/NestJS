import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// ExecutionContext is a Wrapper around the Current Request Lifecycle. In our case, it gives access to the Express request object.

export const Cookie = createParamDecorator(

  (data: string | undefined, ctx: ExecutionContext) => {

    const request = ctx.switchToHttp().getRequest();

    if (data) return request.cookies?.[data];
    
    else return request.cookies;
    
  }

);


// @Cookie(), Here data === undefined, so it returns all cookies.
// request.cookies === undefined, Only If cookie-parser middleware is not used in the application.
