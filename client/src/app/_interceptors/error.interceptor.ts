import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            //bad request
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key])
                  }
                }

                throw modalStateErrors.flat();
              } else{
                this.toastr.error(error.error, error.status.toString());
              }
              break;


              //unauthorized
              case 401:
              this.toastr.error(error.error, error.statusText);
              break;


              //not found
              case 404:
              this.router.navigateByUrl('/not-found');
              break;


              //server error
              case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}}  // passing error to the component
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

              default:
              this.toastr.error('Something unexpected occured');
              console.log(error);
              break;
          }
        }

        throw error;
      })
    )

  }
}
