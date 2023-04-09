import { Component, Input } from "@angular/core";
import { Question } from "../../models/question";

@Component({
  selector: "app-answer-statistics",
  templateUrl: "./answer-statistics.component.html",
  styleUrls: ["./answer-statistics.component.scss"],
})
export class AnswerStatisticsComponent {
  @Input("question") question!: Question;
  @Input("answer") answer!: "optionOne" | "optionTwo";
  @Input("isUserAnswer") isUserAnswer!: boolean;

  get optionText() {
    return this.question[this.answer].text;
  }

  get optionTotalVotes() {
    return this.question[this.answer].votes.length;
  }

  get totalVotes() {
    return (
      this.question.optionOne.votes.length +
      this.question.optionTwo.votes.length
    );
  }

  get optionPerecentage() {
    return (this.optionTotalVotes / this.totalVotes) * 100;
  }
}
