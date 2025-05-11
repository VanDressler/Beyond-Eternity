/*:
 * @target MZ
 * @plugindesc Displays the current map name in the main menu without a window frame — just clean text in the bottom-left. @Łukasz & ChatGPT
 * @author Łukasz & ChatGPT
 *
 * @help MapNameInMenu.js
 *
 * This plugin displays the current map name in the main menu (Scene_Menu),
 * in the bottom-left corner, with no background or border — just text.
 */

(() => {
  const alias_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function () {
    alias_create.call(this);
    this.createMapNameWindow();
  };

  Scene_Menu.prototype.createMapNameWindow = function () {
    const rect = this.mapNameWindowRect();
    this._mapNameWindow = new Window_MapName(rect);
    this._mapNameWindow.opacity = 0; // No background
    this._mapNameWindow.contentsOpacity = 255;
    this._mapNameWindow.frameVisible = false; // Just in case
    this.addWindow(this._mapNameWindow);
  };

  Scene_Menu.prototype.mapNameWindowRect = function () {
    const ww = 300;
    const wh = 48;
    const wx = 0;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
  };

  function Window_MapName() {
    this.initialize(...arguments);
  }

  Window_MapName.prototype = Object.create(Window_Base.prototype);
  Window_MapName.prototype.constructor = Window_MapName;

  Window_MapName.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this.frameVisible = false;
    this.refresh();
  };

  Window_MapName.prototype.refresh = function () {
    this.contents.clear();
    const mapName = $dataMap.displayName || $dataMapInfos[$gameMap.mapId()].name || "Unknown Map";
    this.drawText(mapName, 0, 0, this.contents.width, 'left');
  };

  Window_MapName.prototype.update = function () {
    Window_Base.prototype.update.call(this);
  };
})();