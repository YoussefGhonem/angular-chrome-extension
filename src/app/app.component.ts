import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { TimerService } from './main/TimerService.service';
import { StorageService } from './main/StorageService.service';

const updateBackgroundColor = (color: string) => document.body.style.backgroundColor = color;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  /**
   *
   */
  constructor(
    private timerService: TimerService,
    private storageService: StorageService,
    private _formBuilder: UntypedFormBuilder,

  ) {


  }
  ngOnInit(): void {
    this.initForm()
    this.validation()
    this.subscribeForm()
  }

  subscribeForm() {
    this.form.valueChanges.subscribe(x => {
      this.setForm()
    });
  }


  private initForm(): void {
    this.form = this._formBuilder.group(
      {
        isRemembered: new FormControl(false),
        numberOfRemembered: new FormControl(null)
      }
    );
  }

  validation() {
    let numberOfRemembered = this.storageService.getData('numberOfRemembered');
    let isRemembered = this.storageService.getData('isRemembered');

    if (isRemembered)
      this.form.controls['isRemembered']?.patchValue(Boolean(isRemembered));

    if (numberOfRemembered)
      this.form.controls['numberOfRemembered']?.patchValue(Boolean(numberOfRemembered));

  }

  playNotificationSound() {
    let audio = new Audio();
    audio.src = "../assets/notification-sound.mp3";
    audio.load();
    audio.play();
    chrome.extension.getBackgroundPage();

  }

  setForm() {
    console.log("isRemembered");

    let isChecked = document?.getElementById("switchValue") as HTMLInputElement;

    let numberOfRemembered = this.storageService.getData('numberOfRemembered');
    this.storageService.saveData('isRemembered', this.form.controls['isRemembered'].value?.toString());

    if (numberOfRemembered != this.form.controls['numberOfRemembered']?.toString())
      this.storageService.saveData('numberOfRemembered', this.form.controls['numberOfRemembered']?.value?.toString());

    this.setTimer(this.form.controls['numberOfRemembered']?.value);
    if (this.form.controls['numberOfRemembered']?.value == 0 || isChecked.checked == false)
      this.timerService.stopTimer();

    console.log("isRemembered", isChecked.checked);
    console.log("numberOfRemembered", this.storageService.getData('numberOfRemembered'));
  }

  setTimer(numberOfRemembered: any) {
    this.timerService.startTimer(numberOfRemembered, () => {
      // Code to be executed every hour
      this.playNotificationSound()
    });
  }

  ngOnDestroy() {
    // Stop the timer when the component is destroyed
    this.timerService.stopTimer();
  }
}
