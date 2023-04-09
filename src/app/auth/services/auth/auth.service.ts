import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { BehaviorSubject, from, map, of, switchMap, throwError } from "rxjs";
import * as db from "../../../db/_DATA.js";
import { User } from "../../models/user.js";
import { UserService } from "../user/user.service";

type UsersData = { [userId: string]: User };

export interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _authState: AuthState = {
    isLoading: false,
    isLoggedIn: false,
    error: null,
  };

  private _authStateSubject = new BehaviorSubject<AuthState>({
    ...this._authState,
  });

  get isLoading$() {
    return this._authStateSubject.pipe(map((state) => state.isLoading));
  }

  get isLoggedIn$() {
    return this._authStateSubject.pipe(map((state) => state.isLoggedIn));
  }

  get error$() {
    return this._authStateSubject.pipe(map((state) => state.error));
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(userId: string) {
    return this.userService.getUserById(userId).pipe(
      switchMap((user) => {
        if (!user) return throwError(() => new Error("User not Found!"));
        else return of(user);
      })
    );
  }

  _login(userId: string) {
    return this.userService.getUserById(userId).pipe(
      switchMap((user) => {
        if (!user) return throwError(() => new Error("User not Found!"));
        else return of(user);
      })
    );
  }

  signUp(firstName: string, lastName: string, avatarUrl: string) {
    return this.userService.createNewUser(firstName, lastName, avatarUrl);
  }

  _signUp(firstName: string, lastName: string, avatarUrl: string) {
    return this.userService.createNewUser(firstName, lastName, avatarUrl);
  }

  logout() {}

  getUserById(id: string) {
    return from<Promise<UsersData>>(db._getUsers()).pipe(
      map((users) => users[id])
    );
  }

  getAllUsers() {
    return from<Promise<UsersData>>(db._getUsers()).pipe(
      map((users) => {
        let _users: User[] = [];
        for (let id in users) _users.push(users[id]);
        return _users;
      })
    );
  }

  getUpdatedUserPollData = () => {
    return this.getAllUsers();
  };

  private _upadateAuthState(newState: Partial<AuthState>) {
    this._authState = {
      ...this._authState,
      isLoggedIn:
        newState.isLoggedIn === undefined
          ? this._authState.isLoggedIn
          : newState.isLoggedIn,
      isLoading:
        newState.isLoading === undefined
          ? this._authState.isLoading
          : newState.isLoading,
      error:
        newState.error === undefined ? this._authState.error : newState.error,
    };
    this._authStateSubject.next({ ...this._authState });
  }
}
