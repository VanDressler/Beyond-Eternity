/*:
 * @target MZ
 * @plugindesc [v1.4] Toggle Fullscreen via text on Title Screen (bottom-left) + block back keys in browser.
 * @author ChatGPT
 */

(() => {
  let _fullscreenSprite = null;

  function createFullscreenText() {
    const sprite = new Sprite(new Bitmap(200, 48));
    sprite.bitmap.fontSize = 20;
    sprite.bitmap.textColor = "#ffffff";
    sprite.bitmap.drawText("Toggle Fullscreen", 0, 0, 200, 70, "left");

    sprite.x = 20; // ← lewy margines
    sprite.y = Graphics.height - 60; // ↓ dolny margines

    sprite._customHitbox = new Rectangle(sprite.x, sprite.y, 200, 48);
    _fullscreenSprite = sprite;
    return sprite;
  }

  const _Scene_Title_start = Scene_Title.prototype.start;
  Scene_Title.prototype.start = function () {
    _Scene_Title_start.call(this);
    this._fullscreenToggle = createFullscreenText();
    this.addChild(this._fullscreenToggle);
  };

  const _Scene_Title_update = Scene_Title.prototype.update;
  Scene_Title.prototype.update = function () {
    _Scene_Title_update.call(this);

    if (TouchInput.isTriggered()) {
      const x = TouchInput.x;
      const y = TouchInput.y;
      if (_fullscreenSprite && _fullscreenSprite._customHitbox.contains(x, y)) {
        if (!document.fullscreenElement) {
          const canvas = document.getElementsByTagName("canvas")[0];
          canvas.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      }
    }
  };

  // Blokowanie Backspace i Escape w przeglądarce
  window.addEventListener("keydown", function (e) {
    const tag = document.activeElement.tagName.toLowerCase();
    if (
      (e.key === "Backspace" && tag !== "input" && tag !== "textarea") ||
      e.key === "Escape"
    ) {
      e.preventDefault();
    }
  });
})();
