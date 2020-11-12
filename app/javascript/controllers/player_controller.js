import ApplicationController from './application_controller'

/* This is the custom StimulusReflex controller for the Example Reflex.
 * Learn more at: https://docs.stimulusreflex.com
 */
let isPlaying

let currentSong

let song

let songPosition

let nextSong

let totalTime

let currentTime


export default class extends ApplicationController {
  static targets = ["playButton"]

  initSong(event) {
    if (!song) {
      song = new Audio();
    }
    song.src = event.srcElement.dataset.src;
    currentSong = event.srcElement.dataset.id;
    songPosition = event.srcElement.dataset.position;
    this.playPauseSong(event);
    totalTime = 0;
    currentTime = 0;
    range = document.getElementById(`range-${songPosition}`);
  }

  play(event) {
    event.preventDefault();
    console.log("isplaying")
    console.log(event.srcElement.dataset.position);
    if (event.srcElement.dataset.id == currentSong) {
      this.playPauseSong(event);
    } else {
      if (song) {
        this.switchSong(event);
        console.log("switched song");
      }
      this.initSong(event);
    }
  }

  playPauseSong(event) {
    if (!isPlaying) {
      song.play();
      isPlaying = true;
      console.log(song);
      totalTime = song.duration;
      console.log(range);
    } else {
      song.pause();
      isPlaying = false;
      console.log("paused");
    }
    song.addEventListener('ended',function(){
      isPlaying = false;
      console.log("song finished");
      event.srcElement.innerHTML = "play"
      range.value = 0;
      let positionInteger = parseInt(songPosition);
      let nextSongPosition = positionInteger + 1
      let nextSong = document.getElementById(`position-${nextSongPosition}`);
      if (!nextSong === null) {
        nextSong.click();
      } else {
        document.getElementById("position-1").click();
      }
    })
    song.addEventListener('timeupdate',function(){
      range.value = song.currentTime;
    })
    range.addEventListener('change',function(){
      song.currentTime = range.value;
    })
    this.changeText(event)
  }

  changeText(event) {
    if (isPlaying) {
      event.srcElement.innerHTML = "pause";
    } else {
      event.srcElement.innerHTML = "play";
    }
  }

  switchSong(event) {
    event.srcElement.innerHTML = "play"
    song.pause();
    isPlaying = false;
  }


}
