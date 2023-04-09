import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { User } from "src/app/auth/models/user";
import { AuthorQuestion } from "../../models/author-question";
import * as PollActions from "../../state/actions/poll.actions";

@Component({
  selector: "app-question-vote",
  templateUrl: "./question-vote.component.html",
  styleUrls: ["./question-vote.component.css"],
})
export class QuestionVoteComponent implements OnInit {
  @Input("question") authorQuestion!: AuthorQuestion;
  @Input("user") user!: User | null;
  answer = new FormControl("", [Validators.required]);

  constructor(private store: Store, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  onSave() {
    if (this.answer.invalid) {
      this.snackBar.open("Choose an answer to continue.");
      return;
    }
    if (this.user && this.authorQuestion.question) {
      this.store.dispatch(
        PollActions.saveQuestionAnswer({
          authedUserId: this.user.id,
          questionId: this.authorQuestion.question.id,
          answer: this.answer.value as "optionOne" | "optionTwo",
        })
      );
    }
  }
}
