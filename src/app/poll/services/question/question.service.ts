import { Injectable, OnDestroy } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import {
  BehaviorSubject,
  Subject,
  catchError,
  combineLatest,
  from,
  map,
  of,
  takeUntil,
  tap,
} from "rxjs";
import { User } from "src/app/auth/models/user";
import { UserService } from "src/app/auth/services/user/user.service";
import * as db from "../../../db/_DATA.js";
import { QuestionWithAuthor } from "../../models/author-question.js";
import { Question } from "../../models/question.js";

type QuestionsData = { [questionId: string]: Question };

export interface PollState {
  isLoading: boolean;
  selectedQuestion: Question | null;
  allQuestions: Question[];
  error: string | null;
}

@Injectable({
  providedIn: "root",
})
export class QuestionService implements OnDestroy {
  private _pollState: PollState = {
    isLoading: false,
    selectedQuestion: null,
    allQuestions: [],
    error: null,
  };

  private _pollStateSubject = new BehaviorSubject<PollState>({
    ...this._pollState,
  });

  get isLoading$() {
    return this._pollStateSubject.pipe(map((state) => state.isLoading));
  }

  get selectedQuestion$() {
    return this._pollStateSubject.pipe(map((state) => state.selectedQuestion));
  }

  get isSelectedQuestionAnswered$() {
    return combineLatest([
      this.selectedQuestion$,
      this.userService.currentUser$,
    ]).pipe(
      map(([question, user]) => {
        if (question && user) return user.answers[question.id] !== undefined;
        return false;
      })
    );
  }

  get selectedQuestionWithAuthor$() {
    return combineLatest([
      this.selectedQuestion$,
      this.userService.allUsers$,
    ]).pipe(
      map(([question, users]) => {
        if (question) {
          const _authorUser = users.find(
            (user) => user.id === question.author
          ) as User;
          const _authorQuestion: QuestionWithAuthor = {
            author: _authorUser,
            question,
          };
          return _authorQuestion;
        } else return null;
      })
    );
  }

  get allQuestions$() {
    return this._pollStateSubject.pipe(map((state) => state.allQuestions));
  }

  get answeredQuestionsWithAuthors$() {
    return combineLatest([
      this.userService.currentUser$,
      this.userService.allUsers$,
      this.allQuestions$,
    ]).pipe(map(this._getQuestionWithAuthors(true)));
  }

  get unAnsweredQuestionsWithAuthors$() {
    return combineLatest([
      this.userService.currentUser$,
      this.userService.allUsers$,
      this.allQuestions$,
    ]).pipe(map(this._getQuestionWithAuthors(false)));
  }

  get error$() {
    return this._pollStateSubject.pipe(map((state) => state.error));
  }

  private _destroySubscriptions = new Subject();

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loadQuestions();
  }

  selectQuestion(id: string) {
    this._upadatePollState({ isLoading: true });
    from<Promise<QuestionsData>>(db._getQuestions())
      .pipe(
        map((questions) => questions[id]),
        tap((question) => {
          if (!question) throw Error("Question not Found");
        }),
        tap((question) =>
          this._upadatePollState({
            selectedQuestion: question,
            isLoading: false,
            error: null,
          })
        ),
        catchError((err) => {
          this._upadatePollState({
            isLoading: false,
            selectedQuestion: null,
            error: err.message,
          });
          this.snackBar.open(`Error loading selected question!`);
          return of();
        })
      )
      .pipe(takeUntil(this._destroySubscriptions))
      .subscribe();
  }

  loadQuestions = () => {
    this._upadatePollState({ isLoading: true });
    from<Promise<QuestionsData>>(db._getQuestions())
      .pipe(
        map((questions) => {
          let _questions: Question[] = [];
          for (let id in questions) _questions.push(questions[id]);
          return _questions;
        }),
        tap((questinos) =>
          this._upadatePollState({
            allQuestions: questinos,
            isLoading: false,
            error: null,
          })
        ),
        catchError((err) => {
          this._upadatePollState({ isLoading: false, error: err.message });
          this.snackBar.open(`Error loading questions data!`);
          return of();
        })
      )
      .pipe(takeUntil(this._destroySubscriptions))
      .subscribe();
  };

  createNewQuestion(
    optionOneText: string,
    optionTwoText: string,
    authorId: string
  ) {
    this._upadatePollState({ isLoading: true });
    return from<Promise<Question>>(
      db._saveQuestion({ optionOneText, optionTwoText, author: authorId })
    )
      .pipe(
        tap(() => {
          this._updateDataHandler("Question added successfully");
          this.router.navigate(["/home"]);
        }),
        catchError((err) => {
          this._upadatePollState({ isLoading: false, error: err.message });
          this.snackBar.open(err.message);
          return of();
        })
      )
      .pipe(takeUntil(this._destroySubscriptions))
      .subscribe();
  }

  saveQuestionAnswer(
    authedUserId: string,
    questionId: string,
    answer: "optionOne" | "optionTwo"
  ) {
    this._upadatePollState({ isLoading: true });
    return from<Promise<void>>(
      db._saveQuestionAnswer({
        authedUser: authedUserId,
        qid: questionId,
        answer,
      })
    )
      .pipe(
        tap((_) => {
          this._updateDataHandler("Your answer saved Successfully");
        }),
        catchError((err) => {
          this._upadatePollState({ isLoading: false, error: err.message });
          this.snackBar.open(err.message);
          return of();
        })
      )
      .pipe(takeUntil(this._destroySubscriptions))
      .subscribe();
  }

  private _updateDataHandler = (snackMessage: string) => {
    this._upadatePollState({ isLoading: false, error: null });
    this.loadQuestions();
    this.userService.loadUsers();
    this.snackBar.open(snackMessage);
  };

  private _getQuestionWithAuthors = (isAnswered: boolean) => {
    return ([user, users, questions]: [User | null, User[], Question[]]) => {
      if (user) {
        const _questions = questions
          .filter((question) => {
            return (user.answers[question.id] !== undefined) === isAnswered;
          })
          .sort(
            (questionOne, questionTwo) =>
              questionTwo.timestamp - questionOne.timestamp
          );

        return _questions.map((question) => {
          const _authorUser = users.find(
            (_user) => _user.id === question.author
          ) as User;
          const _authorQuestion: QuestionWithAuthor = {
            author: _authorUser,
            question: question,
          };
          return _authorQuestion;
        });
      }
      return [];
    };
  };

  private _upadatePollState = (newState: Partial<PollState>) => {
    this._pollState = {
      ...this._pollState,
      isLoading:
        newState.isLoading === undefined
          ? this._pollState.isLoading
          : newState.isLoading,
      selectedQuestion:
        newState.selectedQuestion === undefined
          ? this._pollState.selectedQuestion
          : newState.selectedQuestion,
      allQuestions:
        newState.allQuestions === undefined
          ? this._pollState.allQuestions
          : newState.allQuestions,
      error:
        newState.error === undefined ? this._pollState.error : newState.error,
    };
    this._pollStateSubject.next({ ...this._pollState });
  };

  ngOnDestroy(): void {
    this._destroySubscriptions.complete();
  }
}
