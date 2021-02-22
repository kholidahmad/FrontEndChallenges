import { Playlist, Song } from './playlist.model';
import { Subscription } from 'rxjs';
import { PlaylistService } from './playlist.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'playlist';
  playlist: Playlist[] = [];
  playEdit: any = [];
  editMode: boolean = false;
  modalTilte: string = '';
  subscription!: Subscription;

  constructor(private playServis: PlaylistService) {}

  ngOnInit() {
    this.subscription = this.playServis.playlistChanged.subscribe(
      (data: Playlist[]) => {
        this.playlist = data;
        // console.log(data);
      }
    );

    this.playlist = this.playServis.getPlaylist();
  }

  clickAdd() {
    this.playEdit = { editMode: false };
    this.editMode = true;
    this.modalTilte = 'Create New Playlist';
  }

  clickEdit(id: number) {
    this.playEdit = this.playServis.getPlaylistById(id);
    this.editMode = true;
    this.modalTilte = 'Edit Playlist';
    // console.log(this.playEdit);
  }

  clickDelete(id: number) {
    this.playlist.splice(id, 1);
    this.playServis.playlistChanged.next(this.playlist.slice());
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Deleted!',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  clickClose() {
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
