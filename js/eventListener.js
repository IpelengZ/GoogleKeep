App.prototype.addEventListeners = function () {
  document.body.addEventListener(
    "click",
    (event) => {
      this.handleFormClick(event);

      const archiveButton =
        event.target.closest(".archive");

      if (archiveButton) {
        const $selectedNote =
          event.target.closest(".note");

        if ($selectedNote) {
          event.stopPropagation();

          this.archiveNote(
            $selectedNote.id
          );
        }
      }
    }
  );

  this.$form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      this.saveActiveForm();
    }
  );

  document
    .querySelector("#close-form-btn")
    .addEventListener(
      "click",
      (event) => {
        event.stopPropagation();

        this.saveActiveForm();
      }
    );

  document
    .querySelector("#menu-btn")
    .addEventListener(
      "click",
      (event) => {
        event.stopPropagation();

        document.body.classList.toggle(
          "sidebar-expanded"
        );
      }
    );

  document
    .querySelectorAll(".sidebar-item")
    .forEach((item) => {
      item.addEventListener(
        "click",
        (event) => {
          event.stopPropagation();

          document
            .querySelectorAll(
              ".sidebar-item"
            )
            .forEach(
              (sidebarItem) => {
                sidebarItem.classList.remove(
                  "active-item"
                );

                const icon =
                  sidebarItem.querySelector(
                    ".material-symbols-outlined"
                  );

                if (icon) {
                  icon.classList.remove(
                    "active"
                  );
                }
              }
            );

          item.classList.add(
            "active-item"
          );

          const icon =
            item.querySelector(
              ".material-symbols-outlined"
            );

          if (icon) {
            icon.classList.add("active");
          }

          if (
            item ===
            document.querySelector(
              ".sidebar-item"
            )
          ) {
            this.displayNotes();
          }
        }
      );
    });
};