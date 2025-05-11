/*:
 * @target MZ
 * @plugindesc Adds an "Achievements" option to the main menu that opens CGMZ_Scene_Achievements. [v1.1]
 * @author Van Dressler
 *
 * @help
 * Requires CGMZ_Core and CGMZ_Achievements plugins.
 * Adds "Achievements" to the main menu, and opens the scene when selected.
 */

(() => {
    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        _Window_MenuCommand_addOriginalCommands.call(this);
        this.addCommand("Achievements", 'cgmz_achievements', true);
    };

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler('cgmz_achievements', () => {
            if (typeof CGMZ_Scene_Achievements === "function") {
                SceneManager.push(CGMZ_Scene_Achievements);
            } else {
                console.warn("CGMZ_Scene_Achievements not found. Is CGMZ_Achievements.js loaded?");
            }
        });
    };
})();