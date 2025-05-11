/*:
 * @target MZ
 * @plugindesc Dodaje globaln� warstw� PopupLayer widoczn� we wszystkich scenach. U�yj addGlobalPopup().
 * @author Code
 */

(() => {
    // Utw�rz globaln� warstw� (je�li jeszcze nie istnieje)
    if (!window.PopupLayer) {
        window.PopupLayer = new Sprite();
        window.PopupLayer.z = 9999;
    }

    // Globalna funkcja do dodawania popup�w
    window.addGlobalPopup = function (popup) {
        if (window.PopupLayer?.parent) {
            window.PopupLayer.addChild(popup);
        } else {
            // Poczekaj a� PopupLayer zostanie dodany do sceny
            setTimeout(() => window.addGlobalPopup(popup), 100);
        }
    };

    const _Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer;
    Scene_Base.prototype.createWindowLayer = function () {
        _Scene_Base_createWindowLayer.call(this);

        if (!window.PopupLayer) return;

        // Je�li PopupLayer ma starego rodzica � usu� go
        if (window.PopupLayer.parent) {
            window.PopupLayer.parent.removeChild(window.PopupLayer);
        }

        // Dodaj do aktualnej sceny
        if (this._windowLayer?.parent) {
            this._windowLayer.parent.addChild(window.PopupLayer);
        }
    };
})();
