import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize, identity, Observable } from 'rxjs';
import { BusyService } from '../services/busy.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.includes('emailExists') ||
      (req.method === 'POST' && req.url.includes('orders')) ||
      req.method === 'DELETE'
    ) {
      return next.handle(req);
    }
    this.busyService.busy();
    return next.handle(req).pipe(
      environment.production ? identity : delay(500),
      finalize(() => this.busyService.idle())
    );
  }
}
