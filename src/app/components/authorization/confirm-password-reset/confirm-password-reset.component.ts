import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.scss']
})
export class ConfirmPasswordResetComponent implements OnInit {
  pwdResetConfirmForm: FormGroup;
  successMessage: string;
  errorMessage: string;

  code: string;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.code = this.route.snapshot.queryParams['oobCode'];
    this.createForm();
  }

  createForm() {
    this.pwdResetConfirmForm = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    this.auth
      .confirmPasswordReset(this.code, this.pwdResetConfirmForm.get('password').value)
      .then((res: string) => {
        this.toastr.success(res);
        this.router.navigate(['/login']);
      })
      .catch(err => (this.errorMessage = err));
  }
}
