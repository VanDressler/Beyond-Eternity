/*:
 * @target MZ
 * @plugindesc [Custom FIX] Ustawia portrety postaci w menu VisuStella z automatyczną konwersją numerów na tekst (np. 44 -> "44"). @Łukasz
 * @author Łukasz
 *
 * @param Custom Portraits
 * @type struct<PortraitMap>[]
 * @desc Lista przypisań: aktor => plik portretu (img/pictures/)
 * @default []
 *
 * @help
 * Ten plugin ustawia niestandardowe portrety w menu VisuStella.
 * Działa również, gdy pliki portretów mają numery jako nazwy (np. 44.png).
 */

/*~struct~PortraitMap:
 * @param Actor ID
 * @type actor
 * @desc Wybierz aktora z bazy danych.
 *
 * @param Portrait Filename
 * @type file
 * @dir img/pictures
 * @desc Wybierz obraz portretu z folderu img/pictures
 */

(() => {
    const params = PluginManager.parameters("CustomPortraits_VisuStellaFixed");
    const portraitList = JSON.parse(params["Custom Portraits"] || "[]");
  
    const portraitMap = {};
    for (const entry of portraitList) {
      const data = JSON.parse(entry);
      const actorId = Number(data["Actor ID"]);
      const rawFilename = data["Portrait Filename"];
      const file = String(rawFilename); // Konwersja liczb na string!
      if (!isNaN(actorId) && file) {
        portraitMap[actorId] = file;
      }
    }
  
    const _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function () {
      _Scene_Menu_create.call(this);
  
      $gameParty.members().forEach(actor => {
        const id = actor.actorId();
        const portrait = portraitMap[id];
        if (portrait) {
          actor.setMenuImage(portrait);
        }
      });
    };
  })();
  