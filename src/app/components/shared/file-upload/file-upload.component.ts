import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserId } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnDestroy {
  currentUser: UserId;
  currentUserSubscription: Subscription;
  openSubscriptions: Subscription[] = [];

  // task: AngularFireUploadTask;
  // percentage: Observable<number>;

  // snapshot: Observable<firebase.storage.UploadTaskSnapshot>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(private auth: AuthService, private storage: StorageService) {}

  ngOnInit() {
    this.openSubscriptions.push(
      this.auth.currentUser.subscribe(user => {
        this.currentUser = user;
      })
    );
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // TODO:  Add case where there is no current user
    const path = `profile/current/${new Date().getTime()}_${file.name}`;
    this.storage.uploadCurrentProfilePhoto(file, path, this.currentUser);
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  ngOnDestroy() {
    this.openSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
