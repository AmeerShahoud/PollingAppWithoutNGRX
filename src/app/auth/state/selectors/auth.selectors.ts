import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeatureKey } from "../reducers/auth.reducer";

export const selectAuthFeature =
  createFeatureSelector<AuthState>(authFeatureKey);

export const selectUser = createSelector(
  selectAuthFeature,
  (authState) => authState.user
);

export const selectAllUsers = createSelector(
  selectAuthFeature,
  (authState) => authState.allUsers
);

export const selectIsLoggedIn = createSelector(
  selectAuthFeature,
  (authState) => authState.isLoggedIn
);

export const selectIsLoading = createSelector(
  selectAuthFeature,
  (authState) => authState.isLoading
);

export const selectError = createSelector(
  selectAuthFeature,
  (authState) => authState.error
);
