/*:
 * @target MZ
 * @plugindesc Displays the current map name in the main menu bottom-left corner — by Łukasz + ChatGPT
 * @author Łukasz & ChatGPT
 *
 * @help MapNameInMenu.js
 *
 * This plugin displays the current map name in the main menu
 * (at the bottom left corner). It is visually styled to match the
 * default VisuStella menu appearance.
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