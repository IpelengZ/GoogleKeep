class Note {
  constructor(id, title, text, archived) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.archived = archived || false;
  }
}