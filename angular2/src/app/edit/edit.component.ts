import { PlaylistService } from './../playlist.service';
import { Song } from './../playlist.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @Input() playEdit: any = [];

  playlistForm!: FormGroup;
  get songsControls() {
    return (this.playlistForm.get('songs') as FormArray).controls;
  }
  editMode: boolean = false;

  name: string = '';
  description: string = '';
  songs: Song[] = [];
  id: number = 0;

  constructor(private playservis: PlaylistService) {}

  ngOnInit(): void {
    this.editMode = this.playEdit.editMode == null;
    this.name = this.playEdit.name;
    this.description = this.playEdit.description;
    this.songs = this.playEdit.songs;
    this.id = this.playservis.id;

    this.initForm();
  }

  private initForm() {
    let playlistName = '';
    let playlistDescription = '';
    let playlistSongs = new FormArray([]);

    if (this.editMode) {
      playlistName = this.name;
      playlistDescription = this.description;
      if (this.songs) {
        for (let song of this.songs) {
          playlistSongs.push(
            new FormGroup({
              title: new FormControl(song.title, Validators.required),
              artist: new FormControl(song.artist, Validators.required),
              duration: new FormControl(song.duration, [
                Validators.required,
                Validators.pattern(/^[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    // nama tiap input yg dipanggil di form
    this.playlistForm = new FormGroup({
      name: new FormControl(playlistName, Validators.required),
      description: new FormControl(playlistDescription, Validators.required),
      songs: playlistSongs,
    });
  }

  onSave() {
    let data = this.playlistForm.value;
    let totalsong = data.songs.length;
    let totaldurasi = 0;
    for (let song of data.songs) {
      totaldurasi += song.duration;
    }
    data.totalDuration = totaldurasi;
    data.totalSongs = totalsong;

    if (this.editMode) {
      this.playservis.updatePlaylist(this.id, data);
    } else {
      this.playservis.addPlaylist(data);
      (<FormArray>this.playlistForm.get('songs')).clear();
      this.playlistForm.reset();
    }
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Success!',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  onAddSong() {
    (<FormArray>this.playlistForm.get('songs')).push(
      new FormGroup({
        title: new FormControl(null, Validators.required),
        artist: new FormControl(null, Validators.required),
        duration: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteSong(index: number) {
    (<FormArray>this.playlistForm.get('songs')).removeAt(index);
  }

  clickClose() {
    this.editMode = false;
    (<FormArray>this.playlistForm.get('songs')).clear();
    this.playlistForm.reset();
  }
}
