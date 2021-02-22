import { Playlist } from './playlist.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  public playlistChanged = new Subject<Playlist[]>();
  public id: number = 0;
  playlists: Playlist[] = [
    {
      name: 'Pop Punk',
      totalDuration: 5,
      totalSongs: 2,
      description: 'make your day more excited with the melodic pop punk',
      songs: [
        {
          title: 'All The Small Things',
          artist: 'BLINK 182',
          duration: 3,
        },
        {
          title: 'Holiday',
          artist: 'GreenDay',
          duration: 2,
        },
      ],
    },
    {
      name: 'Anime Hits',
      totalDuration: 13,
      totalSongs: 3,
      description: 'Listen to your favorite Anime songs, all in one playlist.',
      songs: [
        {
          title: 'Renai Circulation',
          artist: 'Kana Hanazawa',
          duration: 4,
        },
        {
          title: 'Platinum Disco',
          artist: 'Tsukihi Phoenix',
          duration: 4,
        },
        {
          title: 'Silhouette',
          artist: 'KANA-BOON',
          duration: 5,
        },
      ],
    },
  ];

  constructor() {}

  getPlaylist() {
    return this.playlists.slice();
  }

  getPlaylistById(id: number) {
    this.id = id;
    return this.playlists[id];
  }

  addPlaylist(pl: Playlist) {
    this.playlists.push(pl);
    this.playlistChanged.next(this.playlists.slice());
  }

  updatePlaylist(index: number, playnew: Playlist) {
    this.playlists[index] = playnew;
    this.playlistChanged.next(this.playlists.slice());
  }
}
