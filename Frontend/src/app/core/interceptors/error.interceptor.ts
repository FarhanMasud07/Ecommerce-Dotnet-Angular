import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { StatusCode } from '../../shared/constant-values/status-constant';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastService: ToastrService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            case StatusCode.BadRequest:
              this.handleBadRequest(error);
              break;
            case StatusCode.UnAuthorized:
              this.handleUnAuthorization(error);
              break;
            case StatusCode.NotFound:
              this.handleNotFound(error);
              break;
            case StatusCode.InternalServerError:
              this.handleInternalServerError(error);
              break;
            default:
              break;
          }
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
  handleBadRequest(error: HttpErrorResponse) {
    if (error.error.errors) throw error.error;
    else this.toastService.error(error.error.message, error.status.toString());
  }
  handleUnAuthorization(error: HttpErrorResponse) {
    this.toastService.error(error.error.message, error.status.toString());
  }
  handleNotFound(error: HttpErrorResponse) {
    this.router.navigateByUrl('/not-found');
  }
  handleInternalServerError(error: HttpErrorResponse) {
    const navigationExtras: NavigationExtras = {
      state: { error: error.error },
    };
    this.router.navigateByUrl('/server-error', navigationExtras);
  }
}
