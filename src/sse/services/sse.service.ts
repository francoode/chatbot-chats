import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class SseService {
  private subject: Subject<any> = new Subject<any>();

  sendSseData = (data: unknown) => {
    this.subject.next(data);
  };

  getSseObservable() {
    return this.subject.asObservable();
  }
}
