import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpFormGroup!: FormGroup

  constructor(private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.signUpFormGroup = this.fb.group({
      name: ["", [Validators.required]],
      username: ["", [Validators.required, Validators.min(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
  }

  onSubmit() {
    if (this.signUpFormGroup.invalid) {
      console.log("Invalid form");
      return
    }
    this.userService.create(this.signUpFormGroup.value).subscribe({
      next: (user) => {
        console.log(user);
      },
      error: (err) => {
        console.log("Error", err);
        
      }
    })
    console.log("Form value here!", this.signUpFormGroup.value);
  }
}
