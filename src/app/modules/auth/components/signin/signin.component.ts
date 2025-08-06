import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/http/http.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth/auth.service';

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
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly authservice: AuthService
  ) {
    this.signInForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    })
  }

  ngOnInit(): void {  }

  async onSubmit() {
    try {
      console.log(this.signInForm.value);
      (await this.authservice.login(this.signInForm.value)).subscribe(
        {
          next: (res) => {
            const response = res as { token: string };
            console.log(response);

            console.log(response.token);
            localStorage.setItem("journalUserToken", response.token)
            this.router.navigate(['/my-entries']);
          }, error: (err) => {
            console.log("ERROR", err);

          }
        })


    } catch (error) {

    }
    // this.userService.login(this.signInForm.value).subscribe({
    //   next: (user) => {
    //     // Assuming the user object contains a token
    //     console.log("User logged in successfully", user);

    //   },
    //   error: (err) => {
    //     console.error("Login failed", err);
    //   }
    // })
  }

  signInFormControl: FormControl = new FormControl();

}
