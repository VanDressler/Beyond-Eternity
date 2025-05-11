/*:
 * @target MZ
 * @plugindesc Adds censorship to VisuStella CG Gallery unless a switch is ON. Shows '_CENSORED' images and a 'Premium Required' label. @Łukasz
 * @author Łukasz & ChatGPT
 *
 * @param PremiumSwitchId
 * @text Premium Switch ID
 * @type switch
 * @desc Switch ID that enables full CGs if ON.
 * @default 20
 */

(() => {
  const params = PluginManager.parameters("CGGallery_Censorship");
  const premiumSwitch = Number(params["PremiumSwitchId"] || 20);

  const applyCensorship = () => {
    if (typeof Game_CG === "undefined" || typeof Scene_CG_Gallery === "undefined") {
      setTimeout(applyCensorship, 100);
      return;
    }

    // Podmieniamy pełne obrazki
    const _getImageFilename = Game_CG.prototype.getImageFilename;
    Game_CG.prototype.getImageFilename = function () {
      const name = _getImageFilename.call(this);
      if (!$gameSwitches.value(premiumSwitch)) {
        return name + "_CENSORED";
      }
      return name;
    };

    // Podmieniamy wariacje
    const _getVariationFilenames = Game_CG.prototype.getVariationFilenames;
    Game_CG.prototype.getVariationFilenames = function () {
      const names = _getVariationFilenames.call(this);
      if (!$gameSwitches.value(premiumSwitch)) {
        return names.map(n => n + "_CENSORED");
      }
      return names;
    };

    // Dodajemy napis informacyjny
    const _drawImageLabel = Scene_CG_Gallery.prototype.drawImageLabel;
    Scene_CG_Gallery.prototype.drawImageLabel = function () {
      _drawImageLabel.call(this);

      if (!$gameSwitches.value(premiumSwitch)) {
        const rect = this.imageLabelRect();
        const text = "Premium Required";
        this._imageSprite.bitmap.fontSize = 24;
        this._imageSprite.bitmap.textColor = "#ff4444";
        this._imageSprite.bitmap.drawText(text, rect.x, rect.y + rect.height - 36, rect.width, 36, "center");
      }
    };
  };

  applyCensorship();
})();
