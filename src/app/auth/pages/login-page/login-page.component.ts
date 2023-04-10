import { Component } from "@angular/core";
import { combineLatest, map } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent {
  isLoading$ = combineLatest([
    this.authService.isLoading$,
    this.userService.isLoading$,
  ]).pipe(
    map((isLoading) => {
      return isLoading[0] || isLoading[1];
    })
  );

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}
}
