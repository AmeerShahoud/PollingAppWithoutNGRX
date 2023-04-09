import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { User } from "src/app/auth/models/user";
import * as AuthSelectors from "src/app/auth/state/selectors/auth.selectors";
import * as PollActions from "../../state/actions/poll.actions";

@Component({
  selector: "app-create-new-question",
  templateUrl: "./create-new-question.component.html",
  styleUrls: ["./create-new-question.component.scss"],
})
export class CreateNewQuestionComponent implements OnInit, OnDestroy {
  user!: User | null;

  questionForm = this.fb.nonNullable.group({
    optionOne: ["", [Validators.required]],
    optionTwo: ["", [Validators.required]],
  });

  private destroySubscriptions = new Subject();

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.store
      .select(AuthSelectors.selectUser)
      .pipe(takeUntil(this.destroySubscriptions))
      .subscribe((user) => (this.user = user));
  }

  onSubmit() {
    if (this.questionForm.invalid) {
      this.questionForm.markAsTouched();
      return;
    }

    this.store.dispatch(
      PollActions.addQuestion({
        authorId: this.user!.id,
        optionOneText: this.questionForm.value.optionOne!,
        optionTwoText: this.questionForm.value.optionTwo!,
      })
    );
  }

  ngOnDestroy(): void {
    this.destroySubscriptions.complete();
  }
}
