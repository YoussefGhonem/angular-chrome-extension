

chrome.runtime.onInstalled.addListener(() => {
  let numberOfRemembered = chrome.storage.sync.get("numberOfRemembered");
  setTimer(Number(numberOfRemembered))
});



function playAudio() {
  // const audioUrl = chrome.runtime.getURL('/src/assets/notification-sound.mp3');
  // // Send a message to the background script with the audio URL
  // chrome.runtime.sendMessage({ audioUrl });
  // // Listen for messages from the content script
  // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //   // Play the audio file using the URL passed in the message
  //   const audio = new Audio(message.audioUrl);
  //   audio.play();
  // });

  document.write('<audio id="player" src="/src/assets/notification-sound.mp3" >');
  let c = document.getElementById('player') as HTMLAudioElement;
  c.play()
  // let audio = new Audio();
  // audio.src = "";
  // audio.load();
  // audio.play();
}

function setTimer(numberOfRemembered: any) {
  startTimer(numberOfRemembered, () => {
    // Code to be executed every hour
    playAudio()
  });
}

let intervalId: any;

function startTimer(value: any, callback: () => void) {
  if (value == 0 || value == null) return;
  let houres = 24 / value;
  let milliseconds = (houres * 60 * 60) * 1000;
  console.log("milliseconds", milliseconds);

  // Clear any existing interval to avoid multiple timers running simultaneously
  stopTimer();

  // Execute the callback immediately
  callback();

  // Start a new interval that repeats every hour (3600000 milliseconds)
  intervalId = setInterval(() => {
    callback();
  }, milliseconds);
}

function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}