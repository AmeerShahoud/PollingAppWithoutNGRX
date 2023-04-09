import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as AuthSelectors from "../../state/selectors/auth.selectors";

@Component({
  selector: "app-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.css"],
})
export class SignupPageComponent {
  isLoading$ = this.store.select(AuthSelectors.selectIsLoading);

  constructor(private store: Store) {}
}
