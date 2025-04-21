/*:
 * @target MZ
 * @plugindesc Displays the game version on the title screen in the bottom-right corner.
 * @author Van Dressler
 *
 * @param Version
 * @text Game Version
 * @desc Set the current version number of the game.
 * @default v1.0.0
 *
 * @help
 * This plugin displays the game version on the title screen.
 * It appears in the bottom-right corner of the screen.
 */

(() => {
    const parameters = PluginManager.parameters("TitleVersionDisplay");
    const gameVersion = parameters["Version"] || "v0.006";
  
    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function () {
      _Scene_Title_create.call(this);
      this.drawVersionText();
    };
  
    Scene_Title.prototype.drawVersionText = function () {
      const style = new PIXI.TextStyle({
        fontFamily: "GameFont",
        fontSize: 20,
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 3
      });
  
      const versionText = new PIXI.Text(gameVersion, style);
      versionText.x = Graphics.width - versionText.width - 12;
      versionText.y = Graphics.height - versionText.height - 12;
  
      this.addChild(versionText);
    };
  })();
  