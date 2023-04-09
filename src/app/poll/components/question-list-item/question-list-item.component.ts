import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import * as AuthSelectors from "src/app/auth/state/selectors/auth.selectors";
import { AuthorQuestion } from "../../models/author-question";

@Component({
  selector: "app-question-list-item",
  templateUrl: "./question-list-item.component.html",
  styleUrls: ["./question-list-item.component.css"],
})
export class QuestionListItemComponent {
  @Input("question") authorQuestion!: AuthorQuestion;
  user$ = this.store.select(AuthSelectors.selectUser);

  constructor(private store: Store) {}
}
