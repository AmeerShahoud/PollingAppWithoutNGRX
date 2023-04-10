import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

export const authGuard = (
  route: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
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
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) return true;
      else {
        router.navigate([routerState.url]);
        return false;
      }
    })
  );
};
