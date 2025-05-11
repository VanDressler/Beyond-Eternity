/*:
 * @target MZ
 * @plugindesc Lock or unlock the camera position to prevent following the player (via Plugin Command). @author £ukasz
 *
 * @command LockCamera
 * @text Lock Camera
 * @desc Locks the camera to its current position (stops following the player).
 *
 * @command UnlockCamera
 * @text Unlock Camera
 * @desc Unlocks the camera so it follows the player as usual.
 */

(() => {
    let cameraLocked = false;

    // Plugin Commands
    PluginManager.registerCommand("LockCamera", "LockCamera", () => {
        cameraLocked = true;
    });

    PluginManager.registerCommand("LockCamera", "UnlockCamera", () => {
        cameraLocked = false;
    });

    // Override camera scroll behavior based on lock state
    const _Game_Player_updateScroll = Game_Player.prototype.updateScroll;
    Game_Player.prototype.updateScroll = function (lastScrolledX, lastScrolledY) {
        if (!cameraLocked) {
            _Game_Player_updateScroll.call(this, lastScrolledX, lastScrolledY);
        }
    };
})();
