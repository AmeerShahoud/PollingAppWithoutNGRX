import { Component } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth/auth.service";
import { UserService } from "src/app/auth/services/user/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  user$ = this.userService.currentUser$;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  onLogout() {
    this.authService.logout();
  }
}
