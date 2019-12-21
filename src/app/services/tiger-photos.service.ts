import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class TigerPhotosService {
  constructor(private afStorage: AngularFireStorage) {}

  getTigerPhoto(pilot: string) {
    return this.afStorage.ref(`/tiger_photos/${pilot}.jpg`).getDownloadURL();
  }
}
