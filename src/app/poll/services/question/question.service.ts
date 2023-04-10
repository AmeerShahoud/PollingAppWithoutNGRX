import { Injectable, OnInit } from "@angular/core";
import { from, map, of, switchMap, throwError } from "rxjs";
import * as db from "../../../db/_DATA.js";
import { Question } from "../../models/question.js";

type QuestionsData = { [questionId: string]: Question };

@Injectable({
  providedIn: "root",
})
export class QuestionService implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log("hello from question service");
    this.loadQuestions();
  }

  getQuestionById(id: string) {
    return from<Promise<QuestionsData>>(db._getQuestions()).pipe(
      map((questions) => questions[id]),
      switchMap((question) => {
        if (!question)
          return throwError(() => new Error("Question not Found!"));
        else return of(question);
      })
    );
  }

  getAllQuestions() {
    return from<Promise<QuestionsData>>(db._getQuestions()).pipe(
      map((questions) => {
        let _questions: Question[] = [];
        for (let id in questions) _questions.push(questions[id]);
        return _questions;
      })
    );
  }

  loadQuestions() {
    return from<Promise<QuestionsData>>(db._getQuestions()).pipe(
      map((questions) => {
        let _questions: Question[] = [];
        for (let id in questions) _questions.push(questions[id]);
        return _questions;
      })
    );
  }

  createNewQuestion(
    optionOneText: string,
    optionTwoText: string,
    authorId: string
  ) {
    return from<Promise<Question>>(
      db._saveQuestion({ optionOneText, optionTwoText, author: authorId })
    );
  }

  saveQuestionAnswer(
    authedUserId: string,
    questionId: string,
    answer: "optionOne" | "optionTwo"
  ) {
    return from<Promise<void>>(
      db._saveQuestionAnswer({
        authedUser: authedUserId,
        qid: questionId,
        answer,
      })
    );
  }
}
