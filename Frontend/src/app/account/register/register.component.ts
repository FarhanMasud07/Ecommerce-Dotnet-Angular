import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import {
  catchError,
  debounceTime,
  finalize,
  map,
  of,
  switchMap,
  take,
} from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { complexPassword } from '../../shared/constant-values/form-constant';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, NgFor, SharedModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  errors: string[] | null = null;

  registerForm: FormGroup | any;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      displayName: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.validateEmailNotTaken()],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(complexPassword)],
      ],
    });
  }
  validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.accountService.checkEmailExists(control.value).pipe(
            map((result) => (result ? { emailExists: true } : null)),
            finalize(() => control.markAsTouched()),
            catchError((error) =>
              of(error.message ? { errorMessage: true } : null)
            )
          );
        })
      );
    };
  }
  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/shop'),
      error: (error) => (this.errors = error.errors),
    });
  }
}
