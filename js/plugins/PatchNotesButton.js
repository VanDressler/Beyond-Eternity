/*:
 * @target MZ
 * @plugindesc Adds a "Patch Notes" button to the title screen that shows version changelog info in pages. [v1.1]
 * @author ChatGPT
 *
 * @help
 * Adds a Patch Notes button at the bottom center of the title screen.
 * Clicking it opens a window with version information or changelog.
 * Navigate between pages using LEFT and RIGHT arrows.
 */

(() => {
  const patchNotesPages = [
      `== Aktualizacja 0.006 ==
- Dodano przycisk na ekranie głównym pokazującym najnowsze szczegóły aktualizacji
- Dodano opcję włączania i wyłączania pełnego ekranu na ekranie tytułowym
- Dodano filtr CRT na całą grę
- Ukończono pozostałe dwie ukryte mapy
- Dodano dwóch ukrytych bossów
- Dodano ostatnią cutscenkę (przed zakończeniem epizodu)
- Dodano Limit Break'i dla klas - Fighter, Priest, Sorcerer oraz Hunter
- Dodano system Galerii (po odblokowaniu danej scenki, będzie ona dostępna do ponownego
  obejrzenia w menu). Dodatkowo, będą dostępne inne sceny do odblokowania podczas grania
  (na chwilę obecną zablokowane w menu).`,

      `== Aktualizacja 0.005 ==
- Dodano nowych przeciwników
- Dodano aktualną wersję gry na ekranie głównym
- Zmieniono Special na Skill oraz dodano sekcję Limit Break
- Ukończono rangę III wraz z przeciwnikami oraz końcowym bossem
- Dodano system Quest (na chwilę obecną zablokowane w menu)`,

  ];

  class Window_PatchNotes extends Window_Base {
      initialize(rect) {
          super.initialize(rect);
          this._pageIndex = 0;
          this.refresh();
      }

      refresh() {
          this.contents.clear();
          const text = patchNotesPages[this._pageIndex] || "No patch notes.";
          const lines = text.split("\n");
          let y = 0;
          for (const line of lines) {
              this.drawText(line, 0, y, this.innerWidth, "left");
              y += this.lineHeight();
          }
      }

      nextPage() {
          if (this._pageIndex < patchNotesPages.length - 1) {
              this._pageIndex++;
              this.refresh();
          }
      }

      prevPage() {
          if (this._pageIndex > 0) {
              this._pageIndex--;
              this.refresh();
          }
      }
  }

  const _Scene_Title_start = Scene_Title.prototype.start;
  Scene_Title.prototype.start = function () {
      _Scene_Title_start.call(this);
      this.createPatchNotesButton();
  };

  Scene_Title.prototype.createPatchNotesButton = function () {
      const sprite = new Sprite(new Bitmap(300, 40));
      sprite.bitmap.fontSize = 20;
      sprite.bitmap.textColor = "#ffffff";
      sprite.bitmap.drawText("Patch Notes", 0, 0, 300, 30, "center");

      sprite.x = (Graphics.width - 300) / 2;
      sprite.y = Graphics.height - 40;

      sprite._customHitbox = new Rectangle(sprite.x, sprite.y, 300, 40);
      this._patchNotesSprite = sprite;
      this.addChild(sprite);
  };

  const _Scene_Title_update = Scene_Title.prototype.update;
  Scene_Title.prototype.update = function () {
      _Scene_Title_update.call(this);

      if (TouchInput.isTriggered() && this._patchNotesSprite) {
          const x = TouchInput.x;
          const y = TouchInput.y;
          if (this._patchNotesSprite._customHitbox.contains(x, y)) {
              this.showPatchNotesWindow();
          }
      }

      if (this._patchNotesWindow) {
          if (Input.isTriggered("right")) {
              this._patchNotesWindow.nextPage();
          } else if (Input.isTriggered("left")) {
              this._patchNotesWindow.prevPage();
          } else if (Input.isTriggered("cancel")) {
              this.closePatchNotesWindow();
          }
      }
  };

  Scene_Title.prototype.showPatchNotesWindow = function () {
      if (this._patchNotesWindow) return;

      const width = Graphics.width - 80;
      const height = Graphics.height - 100;
      const rect = new Rectangle(40, 40, width, height);
      this._patchNotesWindow = new Window_PatchNotes(rect);
      this.addChild(this._patchNotesWindow);

      if (this._commandWindow) this._commandWindow.deactivate();
  };

  Scene_Title.prototype.closePatchNotesWindow = function () {
      if (!this._patchNotesWindow) return;
      this.removeChild(this._patchNotesWindow);
      this._patchNotesWindow = null;

      if (this._commandWindow) this._commandWindow.activate();
  };
})();
