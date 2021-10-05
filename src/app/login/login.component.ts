import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  constructor( fb: FormBuilder) {
    this.form = fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onNoClick(): void {
    // this.dialogRef.close();
  }
}
