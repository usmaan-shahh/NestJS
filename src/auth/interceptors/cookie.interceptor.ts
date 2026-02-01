import { Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { cookieOptions } from '../config/cookieOptions';

@Injectable()
export class CookieInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const response = context.switchToHttp().getResponse();

    return next.handle().pipe( tap((data) => {
        
      //Set Refresh Token as HTTP Only Cookie
      if (data?.refresh_token) response.cookie('refresh_token', data.refresh_token, cookieOptions);

      delete data.refresh_token;

      //Clear Cookie on Logout
      if (data?.logout) response.clearCookie('refresh_token');
      
    }))

  }
}
