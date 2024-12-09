import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IStream, IStreamResponse } from '../../models/stream.interface';

@Injectable({
  providedIn: 'root'
})
export class TimelineRestService {

  private apiUrl: string = `http://localhost:8000/api/stream`;

  constructor(
    private _http: HttpClient
  ) { }

  saveStreamSession(data: IStream): Observable<IStream> {
    return this._http.post<IStream>(this.apiUrl, data);
  }

  getStreamSessions(date: string): Observable<IStreamResponse> {
    return this._http.get<IStreamResponse>(`${this.apiUrl}/${date}`);
  }

}
