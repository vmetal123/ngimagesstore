import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MustMatch } from 'src/app/validation/must-match.validator';
import { User } from '../models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },  {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  get firstName() {
    return this.registerForm.get('firstName')
  }

  get lastName() {
    return this.registerForm.get('lastName')
  }

  get userName() {
    return this.registerForm.get('userName')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  createUser(form: FormGroup) {
    const {firstName, lastName, userName, email, password} = form.value;

    const user: User = {
      firstName,
      lastName,
      userName,
      email,
      password
    }

    this.accountService.createUser(user).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  return() {
    this.location.back();
  }
}
