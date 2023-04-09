import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-avatar-album",
  templateUrl: "./avatar-album.component.html",
  styleUrls: ["./avatar-album.component.css"],
})
export class AvatarAlbumComponent {
  avatarUrls: string[] = [];

  constructor(private dialogRef: MatDialogRef<AvatarAlbumComponent>) {
    for (let i = 1; i <= 24; i++)
      this.avatarUrls.push(`assets/avatars/${i}.png`);
  }

  onPickAvatar(avatarUrl: string) {
    this.dialogRef.close(avatarUrl);
  }
}
