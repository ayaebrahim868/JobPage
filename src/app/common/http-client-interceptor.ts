import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { baseURL } from "./routes-config";
import { throwError, map, catchError } from "rxjs";
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const HttpClientInterceptor = (): HttpInterceptorFn => {
  return (req, next) => {
    const router = inject(Router);
    if (req.url.indexOf(baseURL) !== -1) {
      req = req.clone({ setHeaders: {
        'Content-Type': 'application/json',
        'AppName': 'toDo'
        },
    });
      console.log('do something here', req);
    }

    return next(req).pipe(map((event: any)=> {
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error.message);

      router.navigate(['./error-page'], { state: { errorMsg:error.message } });
      return  throwError(() => new Error('error'))
    }),
    );

  }
}
