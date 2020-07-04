import { Component, OnInit, Input } from '@angular/core';
import { ITrack } from 'src/app/home/home.page';

@Component({
    selector: 'app-track-card',
    templateUrl: './track-card.component.html',
    styleUrls: ['./track-card.component.scss'],
})
export class TrackCardComponent implements OnInit {
    @Input()
    track: ITrack;

    @Input()
    color: string;

    constructor() {}

    ngOnInit() {}
}
