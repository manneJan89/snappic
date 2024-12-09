import { Component } from '@angular/core';
import { TimelineComponent } from "./components/timeline/timeline.component";
import { UpsertStreamComponent } from "./components/upsert-stream/upsert-stream.component";
import { CommonModule, Time } from '@angular/common';
import { ButtonComponent } from "./components/button/button.component";
import { TimelineService } from './services/timeline.service';
import { CardComponent } from "./components/card/card.component";

interface IStreamData {
  heading: string;
  value: string | number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TimelineComponent,
    UpsertStreamComponent,
    ButtonComponent,
    CardComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'snappic';

  addingStream: boolean = false;

  currentDate: Date = new Date();
  monthsOfTheYear = [{name: 'January', value: 1}, {name: 'February', value: 2}, {name: 'March', value: 3}, {name: 'April', value: 4}, {name: 'May', value: 5}, {name: 'June', value: 6}, {name: 'July', value: 7}, {name: 'August', value: 8}, {name: 'September', value: 9}, {name: 'October', value: 10}, {name: 'November', value: 11}, {name: 'December', value: 12}];

  get streamData(): IStreamData[] {
    return [
      { heading: 'Total Streams', value: this.timelineService.totalSteams },
      { heading: 'Active Streams', value: this.timelineService.activeStreams },
      { heading: 'Total Duration', value: this.timelineService.totalDuration },
      { heading: 'Effective Duration', value: this.timelineService.effectiveDuration },
      { heading: 'Overlapping Streams', value: this.timelineService.overlappingStreams },
    ]
  }

  constructor(
    public timelineService: TimelineService
  ) {}

}
