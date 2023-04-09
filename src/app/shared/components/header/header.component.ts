import { Component, OnInit } from "@angular/core";
import * as AuthSelectors from "../../../auth/state/selectors/auth.selectors";
import * as AuthActions from "../../../auth/state/actions/auth.actions";
import { Store } from "@ngrx/store";
import { User } from "src/app/auth/models/user";
import { Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.user$ = this.store.select(AuthSelectors.selectUser);
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
