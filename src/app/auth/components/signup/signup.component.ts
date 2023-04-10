import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subject, takeUntil } from "rxjs";
import { AvatarAlbumComponent } from "src/app/shared/components/avatar-album/avatar-album.component";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnDestroy {
  avatarUrl?: string;
  private destroySubscriptions = new Subject();

  signUpForm = this.fb.nonNullable.group({
    firstName: ["", [Validators.required, Validators.pattern(/[a-zA-z]+/g)]],
    lastName: ["", [Validators.required, Validators.pattern(/[a-zA-z]+/g)]],
  });

  get firstName() {
    return this.signUpForm.controls.firstName;
  }

  get lastName() {
    return this.signUpForm.controls.lastName;
  }

  constructor(
    private authServcie: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  openAvatarDialog() {
    this.dialog
      .open<AvatarAlbumComponent, any, string>(AvatarAlbumComponent, {
        width: "80%",
      })
      .afterClosed()
      .pipe(takeUntil(this.destroySubscriptions))
      .subscribe((url) => {
        this.avatarUrl = url || this.avatarUrl;
      });
  }

  onSignUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAsTouched();
      return;
    }
    this.authServcie.signUp(
      this.firstName.value,
      this.lastName.value,
      this.avatarUrl ?? ""
    );
  }

  ngOnDestroy(): void {
    this.destroySubscriptions.complete();
  }
}
