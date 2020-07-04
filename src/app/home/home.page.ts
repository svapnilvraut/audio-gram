import { Component, ViewChild } from '@angular/core';
import { Howl } from 'howler';
import { IonRange } from '@ionic/angular';

export interface ITrack {
    title: string;
    subTitle: string;
    path: string;
}
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    playlist: ITrack[] = [
        {
            title: 'Track 1',
            subTitle: 'Soothing Track',
            path: './assets/audio/bensound-happyrock.mp3',
        },
        {
            title: 'Track 2',
            subTitle: 'Motivational Track',
            path: './assets/audio/bensound-jazzyfrenchy.mp3',
        },
        {
            title: 'Track 3',
            subTitle: 'Trance Track',
            path: './assets/audio/bensound-littleidea.mp3',
        },
        {
            title: 'Track 4',
            subTitle: 'Devosional Track',
            path: './assets/audio/bensound-memories.mp3',
        },
    ];

    activeTrack: ITrack = null;
    isPlaying = false;
    player: Howl = null;
    progress = 0;

    @ViewChild('range') range: IonRange;

    start(track: ITrack) {
        if (this.player) {
            this.player.stop();
        }
        this.player = new Howl({
            src: [track.path],
            onplay: () => {
                this.isPlaying = true;
                this.activeTrack = track;
                this.updateProgress();
            },
        });
        this.player.play();
    }

    togglePlay(pause) {
        this.isPlaying = !pause;
        if (pause) {
            this.player.pause();
        } else {
            if (!this.activeTrack) {
                this.activeTrack = this.playlist[0];
                this.start(this.activeTrack);
            } else {
                this.player.play();
            }
        }
    }

    seek() {
        const newValue = +this.range.value;
        const duration = this.player.duration();
        this.player.seek(duration * (newValue / 100));
    }
    nextTrack() {
        const index = this.playlist.indexOf(this.activeTrack);
        if (index < this.playlist.length - 1) {
            this.start(this.playlist[index + 1]);
        } else {
            this.start(this.playlist[this.playlist.length - 1]);
        }
    }
    prevTrack() {
        const index = this.playlist.indexOf(this.activeTrack);
        if (index > 0) {
            this.start(this.playlist[index - 1]);
        } else {
            this.start(this.playlist[0]);
        }
    }
    updateProgress() {
        const seek = +this.player.seek();
        this.progress = (seek / this.player.duration()) * 100;
        setTimeout(() => {
            this.updateProgress();
        }, 100);
    }

    constructor() {}
}
