import { Injectable, OnDestroy } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Subject, catchError, map, mergeMap, of, takeUntil, tap } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import * as AuthActions from "../actions/auth.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AuthEffects implements OnDestroy {
  private returnUrl!: string;

  private destroySubscriptions = new Subject();

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroySubscriptions))
      .subscribe((queryParams) => {
        this.returnUrl = queryParams["returnUrl"] || "/home";
      });
  }

  loginEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ userId }) =>
        this.authService.login(userId).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          tap((action) => {
            this.snackBar.open(`Weclome back! ${action.user.name}`);
            this.router.navigate([this.returnUrl]);
          }),
          catchError((err) => {
            this.snackBar.open(`Error! Please try to login again.`);
            return of(AuthActions.loginFailure({ error: err.message }));
          })
        )
      )
    )
  );

  signUpEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap(({ firstName, lastName, avatarUrl }) =>
        this.authService.signUp(firstName, lastName, avatarUrl).pipe(
          map((user) => AuthActions.signUpSuccess({ user })),
          tap((action) => {
            this.snackBar.open(`Weclome to Polling! ${action.user.name}`);
            this.router.navigate([this.returnUrl]);
          }),
          catchError((err) => {
            this.snackBar.open(
              `Error! Creating new account failed, please try again.`
            );
            return of(AuthActions.signUpFailure({ error: err.message }));
          })
        )
      )
    )
  );

  logoutEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.snackBar.open("Logged out successfully!");
        this.router.navigate(["/login"]);
      }),
      map(AuthActions.logoutSuccess)
    )
  );

  getUsersEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getAllUsers, AuthActions.signUpSuccess),
      mergeMap(() =>
        this.authService.getAllUsers().pipe(
          map((users) => AuthActions.getAllUsersSuccess({ users })),
          catchError((err) => {
            this.snackBar.open(`Error loading users data!`);
            return of(AuthActions.getAllUsersFailure({ error: err.message }));
          })
        )
      )
    )
  );

  getUpdatedUserPollDataEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUpdatedUsersPollData),
      mergeMap(() =>
        this.authService.getUpdatedUserPollData().pipe(
          map((updatedUsersData) =>
            AuthActions.getUpdatedUsersPollDataSuccess({ updatedUsersData })
          ),
          catchError((err) => {
            this.snackBar.open(err.message);
            return of(
              AuthActions.getUpdatedUsersPollDataFailure({ error: err.message })
            );
          })
        )
      )
    )
  );

  ngOnDestroy(): void {
    this.destroySubscriptions.complete();
  }
}
