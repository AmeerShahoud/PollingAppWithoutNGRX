import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subject, from, map, takeUntil, tap } from "rxjs";
import { User } from "../../models/user";
import * as db from "../../../db/_DATA.js";
import { UserScore } from "src/app/poll/models/user-score";

type UsersData = { [userId: string]: User };

export interface UserState {
  isLoading: boolean;
  currentUser: User | null;
  allUsers: User[];
  error: string | null;
}

@Injectable({
  providedIn: "root",
})
export class UserService implements OnDestroy {
  private _userState: UserState = {
    isLoading: false,
    currentUser: null,
    allUsers: [],
    error: null,
  };

  private _userStateSubject = new BehaviorSubject<UserState>({
    ...this._userState,
  });

  get isLoading$() {
    return this._userStateSubject.pipe(map((state) => state.isLoading));
  }

  get currentUser$() {
    return this._userStateSubject.pipe(map((state) => state.currentUser));
  }

  get allUsers$() {
    return this._userStateSubject.pipe(map((state) => state.allUsers));
  }

  get usersScores$() {
    return this.allUsers$.pipe(
      map((users) =>
        users
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
          .sort(
            (scoreOne, scoreTwo) => scoreTwo.totalScore - scoreOne.totalScore
          )
      )
    );
  }

  get error$() {
    return this._userStateSubject.pipe(map((state) => state.error));
  }

  private _destroySubscriptions = new Subject();

  constructor() {
    // const _user = localStorage.getItem("user");
    // if (_user) {
    //   this._upadateUserState({ currentUser: JSON.parse(_user) as User });
    // }
  }

  getUserById(id: string) {
    this._upadateUserState({ isLoading: true });
    return from<Promise<UsersData>>(db._getUsers()).pipe(
      map((users) => users[id]),
      tap((_) => this._upadateUserState({ isLoading: false }))
    );
  }

  loadUsers = () => {
    this._upadateUserState({ isLoading: true });
    from<Promise<UsersData>>(db._getUsers())
      .pipe(
        map((users) => {
          let _users: User[] = [];
          for (let id in users) _users.push(users[id]);
          return _users;
        }),
        tap((users) =>
          this._upadateUserState({
            isLoading: false,
            error: null,
            currentUser:
              users.find(
                (user) => user.id === this._userState.currentUser?.id
              ) ?? null,
            allUsers: users,
          })
        )
      )
      .pipe(takeUntil(this._destroySubscriptions))
      .subscribe();
  };

  setCurrentUser(user: User | null) {
    this._upadateUserState({ currentUser: user });
  }

  createNewUser(firstName: string, lastName: string, avatarUrl: string) {
    const { id: _userId, userData: _userData } = this._formatUserData(
      firstName,
      lastName,
      avatarUrl
    );
    return from<Promise<UsersData>>(db._addUser(_userData)).pipe(
      map((userData) => userData[_userId])
    );
  }

  private _upadateUserState = (newState: Partial<UserState>) => {
    this._userState = {
      ...this._userState,
      currentUser:
        newState.currentUser === undefined
          ? this._userState.currentUser
          : newState.currentUser,
      allUsers:
        newState.allUsers === undefined
          ? this._userState.allUsers
          : newState.allUsers,
      isLoading:
        newState.isLoading === undefined
          ? this._userState.isLoading
          : newState.isLoading,
      error:
        newState.error === undefined ? this._userState.error : newState.error,
    };
    this._userStateSubject.next({ ...this._userState });
  };

  private _formatUserData(
    firstName: string,
    lastName: string,
    avatarUrl: string
  ) {
    let _userId =
      (firstName + lastName).toLowerCase() +
      "-" +
      Math.random().toString(36).substring(2, 6);
    let _user: UsersData = {
      [_userId]: {
        id: _userId,
        name: `${firstName} ${lastName}`,
        avatarURL: avatarUrl,
        questions: [],
        answers: {},
      },
    };

    return { id: _userId, userData: _user };
  }

  ngOnDestroy(): void {
    this._destroySubscriptions.complete();
  }
}
