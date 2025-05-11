/*:
 * @target MZ
 * @plugindesc Encyklopedia z kategoriami i wpisami jako drzewko. v1.3 by Łukasz
 * @author Łukasz
 *
 * @param EncyclopediaCommandName
 * @text Nazwa w menu głównym
 * @desc Jak ma się nazywać opcja w menu głównym?
 * @default Encyklopedia
 *
 * @param MenuEnabled
 * @text Włączone w menu głównym
 * @type boolean
 * @default true
 * @desc Czy opcja Encyklopedia ma być aktywna? Jeśli false, będzie wyszarzona i nieaktywna.
 *
 * @param Categories
 * @text Kategorie i wpisy
 * @type struct<Category>[]
 * @desc Lista kategorii i przypisanych do nich wpisów
 * @default []
 *
 * @command Odblokuj wpis
 * @text Odblokuj wpis
 * @desc Odblokowuje konkretny wpis w encyklopedii.
 * @arg Kategoria
 * @type string
 * @arg ID wpisu
 * @type string
 *
 * @command Zmień wpis
 * @text Zmień wpis
 * @desc Zmienia tytuł i opis wpisu w encyklopedii.
 * @arg Kategoria
 * @type string
 * @arg ID wpisu
 * @type string
 * @arg Nowy tytuł
 * @type string
 * @arg Nowy opis
 * @type multiline_string
 */

/*~struct~Category:
 * @param name
 * @text Nazwa kategorii
 * @default Nowa Kategoria
 * @param entries
 * @type struct<Entry>[]
 * @default []
 */

/*~struct~Entry:
 * @param id
 * @default wpis_01
 * @param title
 * @default Tytuł Wpisu
 * @param description
 * @type multiline_string
 * @default Szczegóły wpisu...
 * @param image
 * @type file
 * @dir img/wiki
 * @default
 */

(() => {
    const parameters = PluginManager.parameters("VD_Encyclopedia");
    const commandName = parameters["EncyclopediaCommandName"] || "Encyklopedia";
    const rawCategories = JSON.parse(parameters["Categories"] || "[]");

    const Encyclopedia = {
        _categories: [],
        _unlocked: {},

        init() {
            this._categories = rawCategories.map(catRaw => {
                const cat = JSON.parse(catRaw);
                const entries = JSON.parse(cat.entries || "[]").map(entryRaw => JSON.parse(entryRaw));
                return {
                    name: cat.name,
                    entries: entries
                };
            });
        },

        unlockEntry(categoryName, entryId) {
            const key = `${categoryName}::${entryId}`;
            console.log("🔓 Odblokowano wpis:", key); // Dodaj to
            this._unlocked[key] = true;
        },

        isUnlocked(categoryName, entryId) {
            const key = `${categoryName}::${entryId}`;
            return !!this._unlocked[key];
        },

        getCategories() {
            return this._categories;
        }
    };

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        Encyclopedia.init();
        _Scene_Boot_start.call(this);
    };

    PluginManager.registerCommand("VD_Encyclopedia", "Odblokuj wpis", args => {
        Encyclopedia.unlockEntry(args["Kategoria"], args["ID wpisu"]);
    });

    PluginManager.registerCommand("VD_Encyclopedia", "Zmień wpis", args => {
        const category = Encyclopedia.getCategories().find(cat => cat.name === args["Kategoria"]);
        if (category) {
            const entry = category.entries.find(e => e.id === args["ID wpisu"]);
            if (entry) {
                entry.title = args["Nowy tytuł"];
                entry.description = args["Nowy opis"];
            }
        }
    });

    class Scene_Encyclopedia extends Scene_MenuBase {
        create() {
            super.create();
            this.createTreeWindow();
        }

        createTreeWindow() {
            const marginBottom = 44; // zostaw miejsce na dolną belkę
            const marginRight = 0; // mały margines z prawej
            const treeWidth = 300; // mniejsza szerokość okna kategorii
            const height = Graphics.height - marginBottom;
            
            const treeRect = new Rectangle(0, 0, treeWidth, height);
            this._treeWindow = new Window_EncyTree(treeRect);
            this._treeWindow.setHandler("ok", this._treeWindow.processOk.bind(this._treeWindow));
            this._treeWindow.setHandler("entryOk", this.onEntryOk.bind(this));
            this._treeWindow.setHandler("cancel", this.popScene.bind(this));
            this._treeWindow.setHandler("move", this.onCursorMove.bind(this));
            this.addWindow(this._treeWindow);
        
            const previewX = treeWidth;
            const previewWidth = Graphics.width - 590;

            const previewRect = new Rectangle(
                previewX,
             0,
                previewWidth,
                height
            );

            this._previewWindow = new Window_EncyPreview(previewRect);
            this.addWindow(this._previewWindow);
        
            this._treeWindow.activate();
            this._treeWindow.select(0);
            this.onCursorMove();
        }
        
        
        onCursorMove() {
            const entry = this._treeWindow.currentEntry();
            this._previewWindow.setEntry(entry);
        }
        
        

        onEntryOk() {

        }
    }

    

    class Window_EncyTree extends Window_Selectable {
        initialize(rect) {
            super.initialize(rect);
            this._data = [];
            this._expandedCategories = {};
            this.refresh();
        }

        refresh() {
            this._data = [];
            Encyclopedia.getCategories().forEach(cat => {
                this._data.push({ type: 'category', name: cat.name });
                if (this._expandedCategories[cat.name]) {
                    cat.entries.forEach(entry => {
                        const key = `${cat.name}::${entry.id}`;
                        const isUnlocked = Encyclopedia.isUnlocked(cat.name, entry.id);
                        console.log("🔍 Sprawdzam:", key, "=>", isUnlocked); // dodaj
                        if (isUnlocked) {
                            this._data.push({ type: 'entry', category: cat.name, entry: entry });
                        }
                    });
                }
            });
            this.refreshContents();
        }
        

        refreshContents() {
            this.createContents();
            this.drawAllItems();
        }

        maxItems() {
            return this._data.length;
        }

        drawItem(index) {
            const item = this._data[index];
            const rect = this.itemRect(index);
            this.resetTextColor();
            if (item.type === 'category') {
                const isOpen = this._expandedCategories[item.name];
                this.drawText((isOpen ? "▼ " : "▶ ") + item.name, rect.x, rect.y, rect.width);
            } else if (item.type === 'entry') {
                this.drawText("   " + item.entry.title, rect.x, rect.y, rect.width);
            }
        }

        processOk() {
            const item = this._data[this.index()];
            if (item.type === 'category') {
                this._expandedCategories[item.name] = !this._expandedCategories[item.name];
                this.refresh();
                this.select(0);
            } else if (item.type === 'entry') {
                this.callHandler("entryOk");
            }
        }

        currentEntry() {
            const index = this.index();
            if (index < 0 || index >= this._data.length) return null;
            const item = this._data[index];
            return item && item.type === 'entry' ? item.entry : null;
        }
        

        select(index) {
            super.select(index);
            this.callHandler("move"); // ← uruchamia aktualizację podglądu
        }
        
    }

    

    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        _Window_MenuCommand_addOriginalCommands.call(this);
        const enabled = PluginManager.parameters("VD_Encyclopedia")["MenuEnabled"] === "true";
        this.addCommand(commandName, "encyclopedia", enabled);
    };

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler("encyclopedia", this.commandEncyclopedia.bind(this));
    };

    Scene_Menu.prototype.commandEncyclopedia = function () {
        SceneManager.push(Scene_Encyclopedia);
    };

    class Window_EncyPreview extends Window_Base {
        constructor(rect) {
            super(rect);
            this._entry = null;
            this._imageSprite = new Sprite();
            this.addChildToBack(this._imageSprite); // <- umieść grafikę ZA tekstem
        }
    
        setEntry(entry) {
            this._entry = entry;
            this.refresh();
        }
    
        refresh() {
            this.contents.clear();
    
            // Czyścimy grafikę z poprzedniego wpisu
            this._imageSprite.bitmap = null;
    
            if (this._entry) {
                // Tekst
                this.drawTextEx(this._entry.title, 0, 0);
                const textY = this.lineHeight() + 10;
                this.drawTextEx(this._entry.description, 0, textY);
    
                // Obraz (jeśli istnieje)
                if (this._entry.image) {
                    const bitmap = ImageManager.loadBitmap('img/wiki/', this._entry.image);
                    this._imageSprite.bitmap = bitmap;
                
                    bitmap.addLoadListener(() => {
                        const availableWidth = this.innerWidth;
                        const availableHeight = this.innerHeight;
                        const scaleX = availableWidth / bitmap.width;
                        const scaleY = availableHeight / bitmap.height;
                        const scale = Math.min(scaleX, scaleY); // zachowaj proporcje
                
                        this._imageSprite.scale.x = scale;
                        this._imageSprite.scale.y = scale;
                
                        this._imageSprite.x = (availableWidth - bitmap.width * scale) / 2 + 11;
                        this._imageSprite.y = (availableHeight - bitmap.height * scale) + 16;
                    });
                }
                
            } else {
                this.drawText("Wybierz wpis...", 0, 0, this.contents.width);
            }
        }
    }
    
    
})();
