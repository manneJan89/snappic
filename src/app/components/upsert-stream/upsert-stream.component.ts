import { animate, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { TimelineService } from '../../services/timeline.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upsert-stream',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './upsert-stream.component.html',
  styleUrl: './upsert-stream.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class UpsertStreamComponent implements OnDestroy{

  private _destroy$: Subject<void> = new Subject<void>();

  @Input() show: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  upsertStreamFormGroup: FormGroup;
  formSubmitted: boolean = false;
  loading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _timelineService: TimelineService,
    private _toastr: ToastrService
  ) {

    this.upsertStreamFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required],
    },
    { validators: noPastDateTimeValidator })

  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  saveStream() {
    this.formSubmitted = true;
    this.loading = true;

    if (this.upsertStreamFormGroup.invalid) {
      return
    }

    this._timelineService.saveStreamSession(this.upsertStreamFormGroup.value)
    .pipe(takeUntil(this._destroy$))
    .subscribe(() => {
      this.loading = false;
      this._toastr.success('Stream saved successfully');

      this._timelineService.notifySessionUpdated();
      this.closeModal.emit();
    })
  }

}

/**
 *  Custom validator to check if the selected date and time is in the past
*/ 
export function noPastDateTimeValidator(control: AbstractControl): ValidationErrors | null {
  const date = control.get('startDate')?.value || control.get('endDate')?.value;
  const time = control.get('startTime')?.value || control.get('endTime')?.value;

  if (date) {
    const selectedDate = new Date(date);
    const now = new Date();

    // If the date is in the past
    if (selectedDate.setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0)) {
      return { pastDateTime: true }; // Date is in the past
    }

    // If the date is today, check the time
    if (selectedDate.setHours(0, 0, 0, 0) === now.setHours(0, 0, 0, 0) && time) {
      const [hours, minutes] = time.split(':').map(Number);
      const selectedTime = new Date(selectedDate).setHours(hours, minutes, 0, 0);

      if (selectedTime < now.getTime()) {
        return { pastDateTime: true }; // Time is in the past
      }
    }
  }

  return null; // Valid
}