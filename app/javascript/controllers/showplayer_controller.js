import { Controller } from "stimulus"

let audio

let isInitialized

let currentSong

let currentRange

let currentBtn

let isPlaying

let currentTimeElement


export default class extends Controller {
  static targets = ["song", "playButton", "audioRange", "songTimeCurrent", "songTimeTotal"]

  connect() {
    if (currentSong && isInitialized) {
      if (currentSong.dataset.id == this.songTarget.dataset.id && !audio.paused) {
        let position = currentSong.dataset.position;
        isPlaying = false;
        this.playButtonTargets.forEach((btn) => {
          if (btn.parentNode.dataset.position == position) {
            currentBtn = btn.parentNode;
          }
        })
        this.audioRangeTargets.forEach((range) => {
          if (range.id == position) {
            currentRange = range;
            currentRange.value = audio.currentTime;
            currentRange.max = audio.duration;
          }
        })
        audio.pause();
        this.toggleAudio(position);
      } else {
        if (!audio.paused) {
          audio.pause();
        }
        isInitialized = false;
        isPlaying = false;
      }
    }
  }

  initialize() {
    if (!currentSong) {
      isPlaying = false;
      isInitialized = false;
      audio = new Audio();
    }
  }

  play(event) {
    let clickedBtn = event.srcElement.parentNode;
    let clickedBtnPosition = clickedBtn.dataset.position;
    if (isInitialized) {
      this.playButtonTargets.forEach((btn) => {
        if (btn.parentNode.dataset.position == clickedBtnPosition) {
          currentBtn = btn.parentNode;
        }
      })
      if (currentBtn.dataset.position != currentRange.id) {
        audio.pause();
        currentRange.value = 0;
        isInitialized = false;
        isPlaying = false;
      }
    }
    this.toggleAudio(clickedBtnPosition);
  }

  toggleAudio(position) {
    let songPositionNext = 1;
    if (!isInitialized) {
      isInitialized = true;
      let parsedPosition = parseInt(position);
      this.songTargets.forEach((song) => {
        if (song.dataset.position == position) {
          currentSong = song;
          audio.src = currentSong.dataset.src;
        }
        if (song.dataset.position == parsedPosition + 1) {
          songPositionNext = song.dataset.position;
        }
      })
      this.playButtonTargets.forEach((btn) => {
        if (btn.parentNode.dataset.position == position) {
          currentBtn = btn.parentNode;
        }
      })
      this.audioRangeTargets.forEach((range) => {
        if (range.id == position) {
          currentRange = range;
          audio.onloadedmetadata = function() {
            currentRange.max = audio.duration;
            currentRange.value = audio.currentTime;
          }
        }
      })
      this.songTimeCurrentTargets.forEach((el) => {
        if (el.id == position) {
          currentTimeElement = el;
          el.classList.toggle("text-blue-600");
        }
      })
    }

    this.toggleButton(position);
    if (!isPlaying) {
      audio.play();
      isPlaying = true;
    } else {
      audio.pause();
      isPlaying = false;
    }

    let self = this;
    audio.addEventListener('ended',function(){
      currentBtn.children[0].classList.toggle("fa-play");
      currentBtn.children[0].classList.toggle("fa-pause");
      currentRange.value = 0;
      isPlaying = false;
      isInitialized = false;
      if (songPositionNext != "") {
        let nextSong = songPositionNext;
        self.toggleAudio(nextSong)
        songPositionNext = "";
      }
    })
    audio.addEventListener('timeupdate',function(){
      currentRange.value = audio.currentTime;
      currentTimeElement.innerHTML = audio.currentTime;
    })
    currentRange.addEventListener('change',function(){
      currentRange.currentTime = audio.currentTime;
    })
  }

  toggleButton(position) {
    this.songTargets.forEach((song) => {
      if (song.dataset.position == position) {
        currentBtn.children[0].classList.toggle("fa-play");
        currentBtn.children[0].classList.toggle("fa-pause");
      } else {
        let playBtnDiv = song.children[0];
        let playBtn = playBtnDiv.children[0];
        let icon = playBtn.children[0];
        if (icon.classList.contains("fa-pause")) {
          icon.classList.toggle("fa-pause");
          icon.classList.toggle("fa-play");
        }
      }
    })
  }
}
