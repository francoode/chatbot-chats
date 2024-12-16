import { Controller, Get, Inject, MessageEvent, Sse } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { SseService } from '../services/sse.service';

@Controller('sse')
export class SseController {

    @Inject() appService: SseService;
    
    @Sse('events')
    getSse(): Observable<MessageEvent> {
      return this.appService.getSseObservable().pipe(
        map((data) => {
          return {
            data: JSON.stringify(data),
          };
        }),
      );
    }
}