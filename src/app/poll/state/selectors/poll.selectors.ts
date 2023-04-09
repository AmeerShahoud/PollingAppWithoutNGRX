import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "src/app/auth/models/user";
import * as AuthSelectors from "src/app/auth/state/selectors/auth.selectors";
import { AuthorQuestion } from "../../models/author-question";
import { Question } from "../../models/question";
import { UserScore } from "../../models/user-score";
import { PollState, pollFeatureKey } from "../reducers/poll.reducer";

export const selectPollFeature =
  createFeatureSelector<PollState>(pollFeatureKey);

export const selectIsLoading = createSelector(
  selectPollFeature,
  (pollState) => pollState.isLoading
);
export const selectError = createSelector(
  selectPollFeature,
  (pollState) => pollState.error
);

const _selectSelectedQuestion = createSelector(
  selectPollFeature,
  (pollState) => pollState.selectedQuestion
);

const _selectAllQuestions = createSelector(
  selectPollFeature,
  (pollState) => pollState.allQuestions
);

export const selectAnsweredQuestions = createSelector(
  AuthSelectors.selectUser,
  AuthSelectors.selectAllUsers,
  _selectAllQuestions,
  _getauthorQuestions(true)
);

export const selectUnAnsweredQuestions = createSelector(
  AuthSelectors.selectUser,
  AuthSelectors.selectAllUsers,
  _selectAllQuestions,
  _getauthorQuestions(false)
);

export const selectSelectedAuthorQuestion = createSelector(
  _selectSelectedQuestion,
  AuthSelectors.selectAllUsers,
  (question, users) => {
    if (question) {
      // console.log(question);
      const _authorUser = users.find(
        (user) => user.id === question.author
      ) as User;
      const _authorQuestion: AuthorQuestion = { author: _authorUser, question };
      return _authorQuestion;
    } else return null;
  }
);

export const selectIsSelectedQuestionAnswered = createSelector(
  _selectSelectedQuestion,
  AuthSelectors.selectUser,
  (question, user) => {
    if (question && user) return user.answers[question.id] !== undefined;
    return false;
  }
);

export const selectUsersScores = createSelector(
  AuthSelectors.selectAllUsers,
  (users) => {
    return users
      .map((user) => {
        const _totalQuestions = user.questions.length;
        let _totalAnswers = 0;
        for (let i in user.answers) _totalAnswers++;
        return {
          userId: user.id,
          userName: user.name,
          avatarUrl: user.avatarURL,
          totalCreatedQuestions: _totalQuestions,
          totalAnsweredQuestions: _totalAnswers,
          totalScore: _totalAnswers + _totalQuestions,
        } as UserScore;
      })
      .sort((scoreOne, scoreTwo) => scoreTwo.totalScore - scoreOne.totalScore);
  }
);

function _getauthorQuestions(isAnswered: boolean) {
  return (user: User | null, users: User[], questions: Question[]) => {
    // console.log(questions);
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
        const _authorQuestion: AuthorQuestion = {
          author: _authorUser,
          question: question,
        };
        return _authorQuestion;
      });
    }
    return [];
  };
}
