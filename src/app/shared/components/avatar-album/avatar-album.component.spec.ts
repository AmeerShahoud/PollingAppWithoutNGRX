import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarAlbumComponent } from './avatar-album.component';

describe('AvatarAlbumComponent', () => {
  let component: AvatarAlbumComponent;
  let fixture: ComponentFixture<AvatarAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarAlbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
