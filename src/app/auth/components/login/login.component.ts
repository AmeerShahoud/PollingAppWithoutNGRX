import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { User } from "../../models/user";
import * as AuthSelectors from "../../state/selectors/auth.selectors";
import { FormControl, Validators } from "@angular/forms";
import * as AuthActions from "../../state/actions/auth.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  users!: User[];
  private destroySubscriptions = new Subject();

  selectedUser = new FormControl("", [Validators.required]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(AuthSelectors.selectAllUsers)
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

    this.store.dispatch(
      AuthActions.login({ userId: this.selectedUser.value ?? "" })
    );
  }

  ngOnDestroy(): void {
    this.destroySubscriptions.complete();
  }
}
