import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { states, ranks } from 'src/app/models/user.model';
import { ValidUser } from 'src/app/models/valid-user.model';
import { ValidUsersService } from 'src/app/services/valid-users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-pre-users',
  templateUrl: './add-pre-users.component.html',
  styleUrls: ['./add-pre-users.component.scss']
})
export class AddPreUsersComponent implements OnInit {
  newUserForm: FormGroup;
  objectKeys = Object.keys;
  states;
  ranks;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private validUsersService: ValidUsersService) {}

  ngOnInit() {
    this.states = states;
    this.ranks = ranks;
    this.createForm();
  }
  createForm() {
    this.newUserForm = this.fb.group({
      email: new FormControl(null, { validators: [Validators.required] }),
      firstName: new FormControl(null, { validators: [Validators.required] }),
      hometownCity: new FormControl(null, { validators: [Validators.required] }),
      hometownState: new FormControl(null, { validators: [Validators.required] }),
      lastName: new FormControl(null, { validators: [Validators.required] }),
      middleInitial: new FormControl(null, { validators: [Validators.required] }),
      nickname: new FormControl(null, { validators: [Validators.required] }),
      pin: new FormControl(null, { validators: [Validators.required] }),
      rank: new FormControl(null, { validators: [Validators.required] }),
      school: new FormControl(null, { validators: [Validators.required] }),
      section: new FormControl(null, { validators: [Validators.required] })
    });
  }
  onSubmit(value: any) {
    const newUser: ValidUser = {
      firstName: value.firstName,
      middleInitial: value.middleInitial,
      lastName: value.lastName,
      nickname: value.nickname,
      email: value.email,
      hometownCity: value.hometownCity,
      hometownState: value.hometownState,
      rank: value.rank,
      school: value.school,
      section: value.section,
      pin: value.pin,
      registered: false
    };
    this.validUsersService.createUser(newUser).then(() => {
      this.newUserForm.reset();
      this.toastr.success('Pre-User Created');
    });
  }
}
