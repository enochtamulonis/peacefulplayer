import ApplicationController from './application_controller'
import Sortable from "sortablejs"
/* This is the custom StimulusReflex controller for the Drag Reflex.
 * Learn more at: https://docs.stimulusreflex.com
 */
export default class extends ApplicationController {

  initialize() {
    this.sortable = Sortable.create(this.element)
  }

  sort(event) {
    let element = document.getElementById("songs-list")
    let song_elements = document.getElementsByClassName("song")
    let song_position = event.newIndex
    let songs = Array.from(song_elements).map((song, song_position) => {
      return { id: song.dataset.songId, position: (song_position + 1) }
    })
    element.dataset.songs = JSON.stringify(songs)
    this.stimulate("DragReflex#sort")
  }

}
