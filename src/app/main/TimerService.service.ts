import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private intervalId: any;

  startTimer(value: any, callback: () => void) {
    if (value == 0 || value == null) return;
    let houres = 24 / value;
    let milliseconds = (houres * 60 * 60) * 1000;
    console.log("milliseconds", milliseconds);

    // Clear any existing interval to avoid multiple timers running simultaneously
    this.stopTimer();

    // Execute the callback immediately
    callback();

    // Start a new interval that repeats every hour (3600000 milliseconds)
    this.intervalId = setInterval(() => {
      callback();
    }, milliseconds);
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
