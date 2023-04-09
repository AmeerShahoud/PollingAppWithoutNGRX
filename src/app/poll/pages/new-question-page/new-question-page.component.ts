import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as PollSelectors from "../../state/selectors/poll.selectors";

@Component({
  selector: "app-new-question-page",
  templateUrl: "./new-question-page.component.html",
  styleUrls: ["./new-question-page.component.scss"],
})
export class NewQuestionPageComponent {
  isLoading$ = this.store.select(PollSelectors.selectIsLoading);

  constructor(private store: Store) {}
}
