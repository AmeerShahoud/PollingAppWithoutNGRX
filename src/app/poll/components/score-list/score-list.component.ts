import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as PollSelectors from "../../state/selectors/poll.selectors";

@Component({
  selector: "app-score-list",
  templateUrl: "./score-list.component.html",
  styleUrls: ["./score-list.component.scss"],
})
export class ScoreListComponent {
  scoreList$ = this.store.select(PollSelectors.selectUsersScores);
  constructor(private store: Store) {}
}
