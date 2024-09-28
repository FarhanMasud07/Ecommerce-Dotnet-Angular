import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Address, User } from '../shared/models/user';
import { map, of, ReplaySubject, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignalrService } from '../core/services/signalr.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private signalRService: SignalrService
  ) { }

  loadCurrentUser(token: string | null) {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(this.baseUrl + 'account', { headers }).pipe(
      map((user) => {
        if (!user) return null;
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
        return user;
      })
    );
  }

  login(values: any) {
    return this.http.post<User>(`${this.baseUrl}account/login`, values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      }),
      tap(() => this.signalRService.createHubConnection())
    );
  }

  register(values: any) {
    return this.http
      .post<User>(`${this.baseUrl} + account/register`, values)
      .pipe(
        map((user) => {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        })
      );
  }

  logout() {
    this.signalRService.stopHubConnection();
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigate(['/']);
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(
      `${this.baseUrl}account/emailExists?email=${email}`
    );
  }

  getUserAddress() {
    return this.http.get<Address>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: Address) {
    return this.http.put(this.baseUrl + 'account/address', address);
  }
}
