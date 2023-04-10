import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AuthRoutingModule } from "./auth-routing.module";
import { SignupPageComponent } from "./pages/signup-page/signup-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    SignupPageComponent,
    LoginPageComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MaterialModule,
    SharedModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
