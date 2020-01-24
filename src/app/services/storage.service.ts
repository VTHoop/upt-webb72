import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UsersService } from './users.service';
import { UserId } from '../models/user.model';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private afStorage: AngularFireStorage, private users: UsersService, private auth: AuthService) {}

  getTigerPhoto(pilot: string) {
    return this.afStorage.ref(`/tiger_photos/${pilot}.jpg`).getDownloadURL();
  }

  getCurrentProfilePhoto(path: string): Observable<string> {
    return this.afStorage.ref(`/${path}`).getDownloadURL();
  }

  uploadCurrentProfilePhoto(file: File, path: string, user: UserId) {
    const ref = this.afStorage.ref(path);
    const task = ref.put(file);

    // const percentage = task.percentageChanges();
    // const snapshot = task.snapshotChanges();
    // snapshot.subscribe(s => console.log(s.state));
    // snapshot.pipe(
    //   finalize(() => {
    //     console.log('im going to update');
    //
    //   })
    // );
    return task.then(() => {
      this.users.updateUserData(user.id, { profilePhotoLocation: path });
      this.auth.updateUser({ ...user, profilePhotoLocation: path });
      return 'Photo Updated Succesfully';
    });
  }
}
