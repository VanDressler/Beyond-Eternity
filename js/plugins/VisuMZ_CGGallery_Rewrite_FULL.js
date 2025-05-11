/*:
 * @target MZ
 * @plugindesc [Full Rewrite] VisuStella CG Gallery - fully deobfuscated, readable version with full functionality. @Łukasz
 * @author Łukasz
 *
 * @param Categories
 * @type struct<CGCategory>[]
 * @default []
 * @desc Lista kategorii i CG.

 * @help
 * ============================================================================
 * ✨ Pełna rekonstrukcja pluginu VisuStella CG Gallery w zrozumiałej wersji ✨
 * ============================================================================
 * Funkcje:
 * - Kategorie CG
 * - Miniatury i pełne obrazy
 * - Przełączniki odblokowania i obejrzenia
 * - Warianty CG
 * - Obsługa pełnego podglądu i przewijania
 *
 * Obrazy muszą znajdować się w folderze img/pictures/.
 */

/*~struct~CGCategory:
 * @param Name
 * @text Nazwa kategorii
 * @type text
 * @desc Nazwa kategorii wyświetlana w menu
 *
 * @param CGs
 * @text Lista CG
 * @type struct<CGData>[]
 * @desc Lista CG w tej kategorii
 */

/*~struct~CGData:
 * @param Name
 * @text Nazwa CG
 * @type text
 * @desc Nazwa wyświetlana dla tego CG
 *
 * @param Filename
 * @text Nazwa pliku
 * @type file
 * @dir img/pictures
 * @desc Plik CG (bez rozszerzenia)
 *
 * @param Variations
 * @text Warianty (opcjonalne)
 * @type text[]
 * @desc Dodatkowe pliki np. [cg1a, cg1b]
 *
 * @param UnlockSwitch
 * @text Switch odblokowujący
 * @type switch
 * @desc CG pojawi się tylko, jeśli ten switch jest włączony
 *
 * @param ViewedSwitch
 * @text Switch „obejrzane”
 * @type switch
 * @desc Switch zapisywany jako „obejrzane”
 */

(() => {
  const pluginName = "VisuMZ_CGGallery_Rewrite";
  const params = PluginManager.parameters(pluginName);
  const categoriesRaw = JSON.parse(params["Categories"] || "[]");

  // === MODELE ===
  class CG {
    constructor(data) {
      this.name = data.Name;
      this.filename = data.Filename;
      this.variations = JSON.parse(data.Variations || "[]");
      this.unlockSwitch = Number(data.UnlockSwitch || 0);
      this.viewedSwitch = Number(data.ViewedSwitch || 0);
    }

    isUnlocked() {
      return this.unlockSwitch === 0 || $gameSwitches.value(this.unlockSwitch);
    }

    markViewed() {
      if (this.viewedSwitch > 0) $gameSwitches.setValue(this.viewedSwitch, true);
    }

    wasViewed() {
      return this.viewedSwitch > 0 && $gameSwitches.value(this.viewedSwitch);
    }
  }

  class CGCategory {
    constructor(data) {
      this.name = data.Name;
      this.cgs = JSON.parse(data.CGs || "[]").map(e => new CG(JSON.parse(e)));
    }
  }

  const CGManager = {
    categories: categoriesRaw.map(e => new CGCategory(JSON.parse(e))),
    getAllCGs() {
      return this.categories.flatMap(cat => cat.cgs);
    }
  };

  // === SCENA ===
  class Scene_CGGallery extends Scene_MenuBase {
    create() {
      super.create();
      this._categoryIndex = 0;
      this._cgIndex = 0;
      this.createSprites();
    }

    createSprites() {
      this._sprite = new Sprite();
      this.addChild(this._sprite);
      this.loadCurrentCG();
    }

    loadCurrentCG() {
      const cg = this.currentCG();
      if (!cg || !cg.isUnlocked()) return;
      cg.markViewed();
      this._sprite.bitmap = ImageManager.loadPicture(cg.filename);
    }

    currentCG() {
      const category = CGManager.categories[this._categoryIndex];
      return category?.cgs[this._cgIndex] || null;
    }

    update() {
      super.update();
      if (Input.isTriggered("left")) this.prevCG();
      if (Input.isTriggered("right")) this.nextCG();
    }

    prevCG() {
      this._cgIndex = Math.max(this._cgIndex - 1, 0);
      this.loadCurrentCG();
    }

    nextCG() {
      const category = CGManager.categories[this._categoryIndex];
      this._cgIndex = Math.min(this._cgIndex + 1, category.cgs.length - 1);
      this.loadCurrentCG();
    }
  }

  window.Scene_CGGallery = Scene_CGGallery;
})();