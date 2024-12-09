import { Injectable } from '@angular/core';
import { TimelineRestService } from './timeline-rest.service';
import { map, Subject, takeUntil } from 'rxjs';
import { IStream, IStreamResponse } from '../../models/stream.interface';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  /**
   * Subject to notify the timeline component that the session has been updated
   * This will trigger the timeline component to fetch the updated data
   */
  private sessionUpdatedSource: Subject<void> = new Subject<void>();
  sessionUpdated$ = this.sessionUpdatedSource.asObservable();

  totalSteams: number = 0;
  totalDuration: string = '0';
  effectiveDuration: string = '0';
  activeStreams: number = 0;
  overlappingStreams: string = '0';

  constructor(
    private timelineRestService: TimelineRestService
  ) { }

  saveStreamSession(data: IStream) {
    return this.timelineRestService.saveStreamSession(data);
  }

  getStreamSessions(date: string) {
    return this.timelineRestService.getStreamSessions(date)
    .pipe(map((timelineData: IStreamResponse) => {

      this.totalSteams = timelineData.streams.length;
      this.totalDuration = timelineData.totalDuration;
      this.effectiveDuration = timelineData.effectiveDuration;
      this.overlappingStreams = timelineData.overlappingStreams;
      this.activeStreams = timelineData.streams.filter(stream => {
        const streamStartDate = new Date(`${stream.startDate}T${stream.startTime}`);
        const streamEndDate = new Date(`${stream.endDate}T${stream.endTime}`);
        return streamStartDate <= new Date() && streamEndDate >= new Date();
      }).length;

      return timelineData.streams;
    }));
  }

  notifySessionUpdated() {
    this.sessionUpdatedSource.next();
  }
}
