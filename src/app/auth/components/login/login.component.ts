import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { User } from "../../models/user";
import { AuthService } from "../../services/auth/auth.service";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  users!: User[];
  private destroySubscriptions = new Subject();

  selectedUser = new FormControl("", [Validators.required]);

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.allUsers$
      .pipe(takeUntil(this.destroySubscriptions))
      .subscribe((users) => {
        this.users = users;
        if (!users.length) this.selectedUser.disable();
        else this.selectedUser.enable();
      });
  }

  onLogin() {
    if (this.selectedUser.invalid) {
      this.selectedUser.markAsTouched();
      return;
    }

    this.authService.login(this.selectedUser.value ?? "");
  }

  ngOnDestroy(): void {
    this.destroySubscriptions.complete();
  }
}
