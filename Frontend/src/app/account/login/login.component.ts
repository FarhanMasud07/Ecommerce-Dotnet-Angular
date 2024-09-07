import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  returnUrl: string;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
  }

  onSubmit() {
    this.accountService.login(this.loginForm.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
    });
  }
}
