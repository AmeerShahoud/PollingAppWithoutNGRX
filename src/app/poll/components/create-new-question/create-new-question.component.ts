import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { User } from "src/app/auth/models/user";
import { UserService } from "src/app/auth/services/user/user.service";
import { QuestionService } from "../../services/question/question.service";

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

  constructor(
    private userService: UserService,
    private questionService: QuestionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.currentUser$
      .pipe(takeUntil(this.destroySubscriptions))
      .subscribe((user) => (this.user = user));
  }

  onSubmit() {
    if (this.questionForm.invalid) {
      this.questionForm.markAsTouched();
      return;
    }

    this.questionService.createNewQuestion(
      this.questionForm.value.optionOne!,
      this.questionForm.value.optionTwo!,
      this.user!.id
    );
  }

  ngOnDestroy(): void {
    this.destroySubscriptions.complete();
  }
}
