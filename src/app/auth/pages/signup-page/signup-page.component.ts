import { Component } from "@angular/core";
import { combineLatest, map } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.css"],
})
export class SignupPageComponent {
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
