/*:
 * @target MZ
 * @plugindesc [v1.1] Dynamiczne przybli¿anie mapy wraz z postaciami. Autor: Van Dressler
 * @author Van Dressler
 * 
 * @help
 * Plugin umo¿liwia przybli¿anie i oddalanie widoku mapy.
 * Dzia³a tylko na mapê — nie wp³ywa na menu, HUD, ani Show Picture.
 * 
 * Komendy pluginu:
 * - Ustaw przybli¿enie: przybli¿a lub oddala mapê do wybranej wartoœci.
 * 
 * U¿ycie skryptowe (alternatywnie):
 * MapZoom.setZoom(2);     // przybli¿enie 2x
 * MapZoom.setZoom(1);     // normalny widok
 * MapZoom.setZoom(0.5);   // oddalenie
 * 
 * @command SetZoom
 * @text Ustaw przybli¿enie mapy
 * @desc Ustawia poziom przybli¿enia kamery (1 = normalnie, 2 = 2x zoom, itp.)
 * 
 * @arg scale
 * @text Skala przybli¿enia
 * @type number
 * @decimals 2
 * @min 0.1
 * @default 1.00
 */


(() => {
    let zoomScale = 1.0;

    const _Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
    Scene_Map.prototype.createSpriteset = function () {
        _Scene_Map_createSpriteset.call(this);
        this.applyZoom();
    };

    Scene_Map.prototype.applyZoom = function () {
        if (this._spriteset) {
            this._spriteset.scale.x = zoomScale;
            this._spriteset.scale.y = zoomScale;
            this.centerZoomOnPlayer();
        }
    };

    Scene_Map.prototype.centerZoomOnPlayer = function () {
        if (!this._spriteset) return;

        const centerX = Graphics.width / 2;
        const centerY = Graphics.height / 2;
        const playerX = $gamePlayer.screenX();
        const playerY = $gamePlayer.screenY();

        const offsetX = (playerX - centerX) * (zoomScale);
        const offsetY = (playerY - centerY) * (zoomScale);

        this._spriteset.x = -offsetX + (centerX * (1 - zoomScale));
        this._spriteset.y = -offsetY + (centerY * (1 - zoomScale));
    };


    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _Scene_Map_update.call(this);
        this.centerZoomOnPlayer();
    };

    window.MapZoom = {
        setZoom(scale) {
            zoomScale = scale;
            if (SceneManager._scene instanceof Scene_Map) {
                SceneManager._scene.applyZoom();
            }
        },
        getZoom() {
            return zoomScale;
        }
    };

    PluginManager.registerCommand("MapZoom", "SetZoom", args => {
        const scale = parseFloat(args.scale);
        if (!isNaN(scale)) {
            MapZoom.setZoom(scale);
        }
    });

})();
