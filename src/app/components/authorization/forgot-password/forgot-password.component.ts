import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  pwdResetForm: FormGroup;

  errorMessage: string;
  successMessage: string;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.auth
      .resetPasswordEmail(this.pwdResetForm.get('email').value)
      .then(res => (this.successMessage = res))
      .catch(err => (this.errorMessage = err));
  }

  createForm() {
    this.pwdResetForm = this.fb.group({
      email: new FormControl('', { validators: [Validators.required, Validators.email] })
    });
  }
}
