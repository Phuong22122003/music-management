import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toastSuccess: Subject<{
    message: string;
    summary: string;
  }> = new Subject();
  toastError: Subject<{
    message: string;
    summary: string;
  }> = new Subject();
}
