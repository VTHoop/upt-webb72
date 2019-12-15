import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-field-status',
  templateUrl: './field-status.component.html',
  styleUrls: ['./field-status.component.scss']
})
export class FieldStatusComponent implements OnInit {
  @Input() status: FormControl;

  constructor() {}

  ngOnInit() {}

  fieldStatus(): string {
    if (this.status.dirty && this.status.touched && this.status.invalid) {
      return 'invalid';
    }
    if (this.status.dirty && this.status.touched && this.status.valid) {
      return 'valid';
    }
    return '';
  }
}
