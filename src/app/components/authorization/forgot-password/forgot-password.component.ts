import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  pwdResetForm: FormGroup;

  errorMessage: string;
  successMessage: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {

  }

  createForm() {
    this.pwdResetForm = this.fb.group({
      email: new FormControl('', { validators: [Validators.required, Validators.email] })
    });
  }
}
