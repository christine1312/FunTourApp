import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  imgfile="assets/tourists.jpg";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/folder/MyPlan'])
  }

  signup() {
    console.log("sign up")
  }

  loginGoogle() {
    console.log("login google")
  }

  loginFacebook() {
    console.log("login facebook")
  }

}
