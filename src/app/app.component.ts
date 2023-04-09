import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as AuthActions from "./auth/state/actions/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "polling-app";

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.getAllUsers());
  }
}
