import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { QuestionWithAuthor } from "../../models/author-question";
import { QuestionService } from "../../services/question/question.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit, OnDestroy {
  answeredQuestionsWithAuthors!: QuestionWithAuthor[];
  unAnsweredQuestionsWithAuthors!: QuestionWithAuthor[];
  isLoading$ = this.questionService.isLoading$;

  private destroySubscribtions = new Subject();

  get answeredQuestionsCount() {
    return `Answered Questions - (${this.answeredQuestionsWithAuthors.length})`;
  }

  get unAnsweredQuestionsCount() {
    return `Unanswered Questions - (${this.unAnsweredQuestionsWithAuthors.length})`;
  }

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.answeredQuestionsWithAuthors$
      .pipe(takeUntil(this.destroySubscribtions))
      .subscribe((questions) => {
        this.answeredQuestionsWithAuthors = questions;
      });
    this.questionService.unAnsweredQuestionsWithAuthors$
      .pipe(takeUntil(this.destroySubscribtions))
      .subscribe((questions) => {
        this.unAnsweredQuestionsWithAuthors = questions;
      });
  }

  ngOnDestroy(): void {
    this.destroySubscribtions.complete();
  }
}
