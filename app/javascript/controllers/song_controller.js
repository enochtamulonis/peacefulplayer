import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["newForm", "toggleButton", "nameField"]

  connect() {
  }

  toggleForm(event) {
    event.preventDefault();
    this.newFormTarget.classList.toggle('hidden');
    this.toggleButtonTarget.classList.toggle('hidden');
  }

  readFile(event) {
    let audioFile = event.srcElement.files[0];
    this.nameFieldTarget.value = audioFile.name.slice(0, -4);
  }
}
