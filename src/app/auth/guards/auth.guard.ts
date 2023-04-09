import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { map } from "rxjs";
import { Store } from "@ngrx/store";
import * as AuthSelectors from "../state/selectors/auth.selectors";

export const authGuard = (
  route: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(AuthSelectors.selectIsLoggedIn).pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) return true;
      else {
        router.navigate(["/login"], {
          queryParams: { returnUrl: routerState.url },
        });
        return false;
      }
    })
  );
};

export const isLoggedGuard = (
  route: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(AuthSelectors.selectIsLoggedIn).pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) return true;
      else {
        router.navigate([routerState.url]);
        return false;
      }
    })
  );
};
