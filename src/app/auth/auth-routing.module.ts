import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { SignupPageComponent } from "./pages/signup-page/signup-page.component";
import { isLoggedGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent,
    canActivate: [isLoggedGuard],
  },
  {
    path: "sign-up",
    component: SignupPageComponent,
    canActivate: [isLoggedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
