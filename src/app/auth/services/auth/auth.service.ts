import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import {
  BehaviorSubject,
  Subject,
  catchError,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
  throwError,
} from "rxjs";
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
export class AuthService implements OnDestroy {
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

  private returnUrl!: string;
  private _destroySubscriptions = new Subject();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    // const _user = localStorage.getItem("user");
    // if (_user) {
    //   this._upadateAuthState({ isLoggedIn: true });
    // }

    this.route.queryParams
      .pipe(takeUntil(this._destroySubscriptions))
      .subscribe((queryParams) => {
        this.returnUrl = queryParams["returnUrl"] || "/home";
      });
  }

  login(userId: string) {
    this._upadateAuthState({ isLoading: true });
    return this.userService
      .getUserById(userId)
      .pipe(
        switchMap((user) => {
          if (!user)
            return throwError(
              () => new Error("Error! Please try to login again.")
            );
          else return of(user);
        }),
        tap(this._authHandler(`Weclome back! `)),
        catchError(this._errorHandler)
      )
      .pipe(takeUntil(this._destroySubscriptions))
      .subscribe();
  }

  signUp(firstName: string, lastName: string, avatarUrl: string) {
    this._upadateAuthState({ isLoading: true });
    return this.userService
      .createNewUser(firstName, lastName, avatarUrl)
      .pipe(
        switchMap((user) => {
          if (!user)
            return throwError(
              () =>
                new Error(
                  "Error! Creating new account failed, please try again."
                )
            );
          else return of(user);
        }),
        tap(this._authHandler(`Weclome to Polling! `)),
        tap((_) => this.userService.loadUsers()),
        catchError(this._errorHandler)
      )
      .pipe(takeUntil(this._destroySubscriptions))
      .subscribe();
  }

  logout() {
    // localStorage.removeItem("user");
    this.userService.setCurrentUser(null);
    this.snackBar.open("Logged out successfully!");
    this.router.navigate(["/login"]);
    this._upadateAuthState({ isLoggedIn: false });
  }

  private _authHandler = (snackPrefixText: string) => {
    return (user: User) => {
      // localStorage.setItem("user", JSON.stringify(user));
      this.userService.setCurrentUser(user);
      this.snackBar.open(snackPrefixText + user.name);
      this.router.navigate([this.returnUrl]);
      this._upadateAuthState({
        isLoggedIn: true,
        isLoading: false,
        error: null,
      });
    };
  };

  private _errorHandler = (err: Error) => {
    localStorage.removeItem("user");
    this.userService.setCurrentUser(null);
    this.snackBar.open(err.message);
    this._upadateAuthState({
      isLoggedIn: false,
      isLoading: false,
      error: err.message,
    });
    return of();
  };

  private _upadateAuthState = (newState: Partial<AuthState>) => {
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
  };

  ngOnDestroy(): void {
    this._destroySubscriptions.complete();
  }
}
