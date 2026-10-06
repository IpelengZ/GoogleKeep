class App {
  constructor() {
    this.notes = this.loadNotes();

    this.$activeForm = document.querySelector(".active-form");
    this.$inactiveForm = document.querySelector(".inactive-form");
    this.$noteTitle = document.querySelector("#note-title");
    this.$noteText = document.querySelector("#note-text");
    this.$notesBoard = document.querySelector(".notes");
    this.$form = document.querySelector("#form");

    this.addEventListeners();
    this.render();
  }

  loadNotes() {
    const stored =
      JSON.parse(localStorage.getItem("notes")) || [];

    return stored.map(
      (note) =>
        new Note(
          note.id,
          note.title,
          note.text,
          note.archived
        )
    );
  }

  createId() {
    return (
      "n" +
      Date.now() +
      Math.floor(Math.random() * 10000)
    );
  }

  handleFormClick(event) {
    const isActiveFormClickedOn =
      this.$activeForm.contains(event.target);

    const isInactiveFormClickedOn =
      this.$inactiveForm.contains(event.target);

    if (isInactiveFormClickedOn) {
      this.openActiveForm();
    } else if (!isActiveFormClickedOn) {
      this.saveActiveForm();
    }
  }

  openActiveForm() {
    this.$inactiveForm.style.display = "none";

    this.$activeForm.style.display = "block";

    this.$noteText.focus();
  }

  closeActiveForm() {
    this.$inactiveForm.style.display = "flex";

    this.$activeForm.style.display = "none";

    this.$noteTitle.value = "";
    this.$noteText.value = "";
  }

  saveActiveForm() {
    if (
      this.$activeForm.style.display !== "block"
    ) {
      return;
    }

    const title = this.$noteTitle.value;
    const text = this.$noteText.value;

    if (
      title.trim() !== "" ||
      text.trim() !== ""
    ) {
      this.addNote(title, text);
    }

    this.closeActiveForm();
  }

  addNote(title, text) {
    const newNote = new Note(
      this.createId(),
      title,
      text,
      false
    );

    this.notes = [
      newNote,
      ...this.notes,
    ];

    this.render();
  }

  archiveNote(id) {
    this.notes = this.notes.map(
      (note) => {
        if (note.id === id) {
          note.archived = !note.archived;
        }

        return note;
      }
    );

    this.render();
  }

  saveNotes() {
    localStorage.setItem(
      "notes",
      JSON.stringify(this.notes)
    );
  }

  render() {
    this.saveNotes();
    this.displayNotes();
  }

  displayNotes() {
    const visibleNotes =
      this.notes.filter(
        (note) => !note.archived
      );

    this.$notesBoard.innerHTML =
      visibleNotes
        .map(
          (note) => `
            <div class="note" id="${note.id}">

              <span class="material-symbols-outlined check-circle">
                check_circle
              </span>

              <div class="title">
                ${note.title}
              </div>

              <div class="text">
                ${note.text}
              </div>

              <div class="note-footer">

                <div class="tooltip archive">

                  <span class="material-symbols-outlined hover small-icon">
                    archive
                  </span>

                  <span class="tooltip-text">
                    Archive
                  </span>

                </div>

              </div>

            </div>
          `
        )
        .join("");
  }
}