import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as AuthSelectors from "../../state/selectors/auth.selectors";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent {
  isLoading$ = this.store.select(AuthSelectors.selectIsLoading);

  constructor(private store: Store) {}
}
