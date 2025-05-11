/*:
 * @target MZ
 * @plugindesc [v1.1] Plugin mapy świata z opisem lokacji i wyborem poziomu trudności. Autor: Łukasz
 * @author Łukasz
 *
 * @command ShowWorldMapInfo
 * @text Pokaż okno lokacji
 * @desc Wyświetla okno z informacją o lokacji i wyborem poziomu trudności.
 *
 * @arg LocationName
 * @text Nazwa lokacji
 * @type string
 *
 * @arg Description
 * @text Opis lokacji
 * @type multiline_string
 *
 * @arg SuggestedLevel
 * @text Sugerowany poziom
 * @type number
 * @min 1
 *
 * @arg ImageName
 * @text Obraz lokacji
 * @type file
 * @dir img/pictures
 *
 * @arg DifficultyOptions
 * @text Poziomy trudności
 * @desc Lista poziomów trudności i ich przypisanych przełączników
 * @type struct<DifficultyOption>[]
 * @default ["{\"Name\":\"Easy\",\"SwitchId\":\"1\"}","{\"Name\":\"Normal\",\"SwitchId\":\"2\"}","{\"Name\":\"Hard\",\"SwitchId\":\"3\"}"]
 */

/*~struct~DifficultyOption:
 * @param Name
 * @text Nazwa poziomu
 * @type string
 *
 * @param SwitchId
 * @text Przełącznik
 * @desc Switch, który zostanie włączony po wybraniu tej trudności
 * @type switch
 *
 * @param EnabledIfSwitch
 * @text Włączony jeśli Switch
 * @desc Switch, który musi być aktywny, aby poziom był dostępny
 * @type switch
 * @default 0
 */







(() => {
  const pluginName = "WorldMapInfo";

  PluginManager.registerCommand(pluginName, "ShowWorldMapInfo", args => {
    const name = args.LocationName || "Unknown";
    const desc = args.Description || "";
    const level = Number(args.SuggestedLevel || 1);
    const image = args.ImageName || "";

    const raw = JSON.parse(args.DifficultyOptions || "[]");
    const options = Array.isArray(raw)
  ? raw.map(opt => {
      const parsed = typeof opt === "string" ? JSON.parse(opt) : opt;
      return {
        Name: parsed.Name || "???",
        SwitchId: Number(parsed.SwitchId || 0),
        EnabledIfSwitch: Number(parsed.EnabledIfSwitch || 0)
      };
    })
  : [];




    Scene_WorldMapInfo.prepare(name, desc, level, image, options);

    SceneManager.push(Scene_WorldMapInfo);
  });

  class Scene_WorldMapInfo extends Scene_MenuBase {
    static prepare(name, desc, level, image, options) {
      this._info = { name, desc, level, image, options };
    }
    

    initialize() {
      super.initialize();
      this._info = Scene_WorldMapInfo._info;
    }

    create() {
      super.create();
      this.createInfoWindow();
      this.createDifficultyTitleWindow();
      this.createDifficultyWindow();
      if (this._info.image) this.createPicture();
    }

    createInfoWindow() {
      const rect = new Rectangle(Graphics.boxWidth / 2, 20, Graphics.boxWidth / 2 - 40, 300);
      this._infoWindow = new Window_LocationInfo(rect, this._info);
      this.addWindow(this._infoWindow);
    }

    createDifficultyTitleWindow() {
      const rect = new Rectangle(Graphics.boxWidth / 2, 340, Graphics.boxWidth / 2 - 40, this.calcWindowHeight(1, true));
      this._difficultyTitleWindow = new Window_Base(rect);
      this._difficultyTitleWindow.opacity = 0;
      this._difficultyTitleWindow.backOpacity = 0;
      if (this._difficultyTitleWindow.setFrameVisible) {
        this._difficultyTitleWindow.setFrameVisible(false);
      }
      this._difficultyTitleWindow.drawText("Choose difficulty", 0, -6, this._difficultyTitleWindow.contents.width, "center");
      this.addWindow(this._difficultyTitleWindow);
    }

    createDifficultyWindow() {
      const rect = new Rectangle(Graphics.boxWidth / 2, 380, Graphics.boxWidth / 2 - 40, 135);
      this._difficultyWindow = new Window_DifficultySelect(rect, this._info.options);

      this._difficultyWindow.setHandler("ok", this.onDifficultyOk.bind(this));
      this._difficultyWindow.setHandler("cancel", this.popScene.bind(this));
      this.addWindow(this._difficultyWindow);
      this._difficultyWindow.activate();
    }

    createPicture() {
      const sprite = new Sprite(ImageManager.loadPicture(this._info.image));
      sprite.x = 0;
      sprite.y = 0;
      this.addChild(sprite);
    }

    onDifficultyOk() {
      const index = this._difficultyWindow.index();
      const switchId = this._info.options[index].SwitchId;

      if (switchId) {
        $gameSwitches.setValue(switchId, true);
      }
      console.log("Wybrano poziom trudności: " + this._info.options[index].Name);

      this.popScene();
    }
  }

  class Window_LocationInfo extends Window_Base {
    constructor(rect, info) {
      super(rect);
      this._info = info;
      this.refresh();
    }

    refresh() {
      const { name, desc, level } = this._info;
      this.contents.clear();
      this.drawText("Location: " + name, 0, 0, this.contents.width);
      this.drawText("Suggested Level: " + level, 0, 24, this.contents.width);
      this.drawWrappedText(desc, 0, 48, this.contents.width);
    }

    drawWrappedText(text, x, y, maxWidth) {
      const words = text.split(" ");
      let line = "";
      let lineCount = 0;
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        if (this.textWidth(testLine) > maxWidth && i > 0) {
          this.drawText(line.trim(), x, y + lineCount * 24, maxWidth);
          line = words[i] + " ";
          lineCount++;
        } else {
          line = testLine;
        }
      }
      this.drawText(line.trim(), x, y + lineCount * 24, maxWidth);
    }
  }

  class Window_DifficultySelect extends Window_Selectable {
    constructor(rect, options) {
      super(rect);
      this._options = options;
      this.refresh();
      this.select(this.firstEnabledIndex());
    }
  
    maxItems() {
      return this._options.length;
    }
  
    maxCols() {
      return 1;
    }
  
    itemHeight() {
      return this.lineHeight();
    }
  
    isEnabled(index) {
      const switchId = Number(this._options[index].EnabledIfSwitch || 0);
      return switchId === 0 || $gameSwitches.value(switchId);
    }
    
  
    drawItem(index) {
      const rect = this.itemRect(index);
      const text = this._options[index].Name || "???";
      const enabled = this.isEnabled(index);
  
      const prefix = (index === this.index()) ? "▶ " : "   ";
      const color = enabled ? ColorManager.normalColor() : ColorManager.textColor(8);
      this.changeTextColor(color);

      this.drawText(prefix + text, rect.x, rect.y, rect.width, "left");
      this.resetTextColor();
    }
  
    processOk() {
      if (this.isEnabled(this.index())) {
        super.processOk();
      } else {
        SoundManager.playBuzzer();
      }
    }
  
    getSelectedDifficulty() {
      return this._options[this.index()].Name;
    }
  
    firstEnabledIndex() {
      for (let i = 0; i < this._options.length; i++) {
        if (this.isEnabled(i)) return i;
      }
      return 0;
    }
  }
  
})();

