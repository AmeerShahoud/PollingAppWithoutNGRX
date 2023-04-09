import { Component, Input } from "@angular/core";
import { UserScore } from "../../models/user-score";
import { Store } from "@ngrx/store";
import * as AuthSelectors from "src/app/auth/state/selectors/auth.selectors";

@Component({
  selector: "app-score-list-item",
  templateUrl: "./score-list-item.component.html",
  styleUrls: ["./score-list-item.component.scss"],
})
export class ScoreListItemComponent {
  @Input("userScore") userScore!: UserScore;
  @Input("ranking") ranking!: number | null;

  user$ = this.store.select(AuthSelectors.selectUser);

  constructor(private store: Store) {}
}
