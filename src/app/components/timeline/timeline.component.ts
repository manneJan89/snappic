import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimelineService } from '../../services/timeline.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IStream } from '../../../models/stream.interface';

interface IStreamSegment {
  left: string;
  width: string;
  top: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit, OnDestroy {

  private _destroy$ = new Subject<void>();

  streamingSessions: IStream[] = [];

  /** CREATE THE TIME HEADINGS FOR THE TIMELINE DISPLAY
   * The timeline will be divided into 24 hours
   * Heading will be displayed for each hour (00:00, 01:00, 02:00, ..., 23:00)
   */
  headings = Array.from({ length: 24 }, (_, i) => i);

  heightOfTimelineItem: number = 50;

  currentDate: Date = new Date();
  currentTimePosition: number = 0; // Position of the time indicator (percentage)
  
  // Timer to update the current time position
  private timer: any;

  // Random colors for the timeline items
  randomColors: string[] = [
    "#f542a7",
    "#42f5e9",
    "#f54242",
    "#f57c42",
    "#42a7f5",
    "#a142f5",
    "#42f58d",
    "#f5e942",
    "#7cf542",
    "#324fe8"
  ];

  constructor(
    public timelineService: TimelineService
  ) {
  }

  ngOnInit(): void {

    /**
     * When the component is initialized, get all the streaming sessions
     * Subscribe to the sessionUpdated$ observable to get notified when a new session is added
     * this will then fetch the updated list of streaming sessions from the server
    */

    this.getAllStreamingSessions();

    this.timelineService.sessionUpdated$
    .pipe(takeUntil(this._destroy$))
    .subscribe(() => {
      this.getAllStreamingSessions();
    });
  }

  ngOnDestroy(): void {

    /**
     * When the component is destroyed, unsubscribe from all subscriptions
     * Clear the timer that updates the current time position
    */

    this._destroy$.next();
    this._destroy$.complete();

    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getAllStreamingSessions() {
    this.timelineService.getStreamSessions(new Date().toISOString().split('T')[0])
    .pipe(takeUntil(this._destroy$))
    .subscribe(response => {
      this.streamingSessions = response;
      this.updateCurrentTimePosition();
      this.timer = setInterval(() => this.updateCurrentTimePosition(), 60000);
    })
  }

  getSegmentStyles(item: any, index: number): IStreamSegment[] {
    const segments: IStreamSegment[] = [];
    const startPercentage = this.timeToPercentage(item.startTime);
    const endPercentage = this.timeToPercentage(item.endTime);

    // gap between timeline segments
    const gap = 20;
  
    /**
     * Create the styling for a segment that will be displayed on the timeline
     */
    segments.push({
      left: `${startPercentage}%`,
      width: `${endPercentage - startPercentage}%`,
      top: `${(index * this.heightOfTimelineItem) + (gap * (index + 1))}px`,
      backgroundColor: this.randomColors[index]
    });
    return segments;
  }

  /**
   * This function will convert a time string (HH:MM) to a percentage value
   */
  timeToPercentage(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    return (totalMinutes / (24 * 60)) * 100; // Convert to percentage
  }

  /**
   * This function will update the current time indicator position on the timeline 
  */
  private updateCurrentTimePosition() {
    const hours = this.currentDate.getHours();
    const minutes = this.currentDate.getMinutes();
    
    this.currentTimePosition = this.timeToPercentage(`${hours}:${minutes}`);
  }

}
