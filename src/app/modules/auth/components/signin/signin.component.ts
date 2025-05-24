import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/http/http.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm!: FormGroup;
  errorMessage = "";
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.signInForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.signInForm.value);
    this.userService.login(this.signInForm.value).subscribe({
      next: (user) => {
        console.log("User logged in successfully", user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error("Login failed", err);
      }
    })
  }

  signInFormControl: FormControl = new FormControl();

}
