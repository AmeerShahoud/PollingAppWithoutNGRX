import { Component, Input, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "src/app/auth/models/user";
import { QuestionWithAuthor } from "../../models/author-question";
import { QuestionService } from "../../services/question/question.service";

@Component({
  selector: "app-question-vote",
  templateUrl: "./question-vote.component.html",
  styleUrls: ["./question-vote.component.css"],
})
export class QuestionVoteComponent implements OnInit {
  @Input("question") authorQuestion!: QuestionWithAuthor;
  @Input("user") user!: User | null;
  answer = new FormControl("", [Validators.required]);

  constructor(
    private questionService: QuestionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSave() {
    if (this.answer.invalid) {
      this.snackBar.open("Choose an answer to continue.");
      return;
    }
    if (this.user && this.authorQuestion.question) {
      this.questionService.saveQuestionAnswer(
        this.user.id,
        this.authorQuestion.question.id,
        this.answer.value as "optionOne" | "optionTwo"
      );
    }
  }
}
