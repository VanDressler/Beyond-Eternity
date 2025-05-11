/*~struct~ImageEntry:
 *
 * @param name
 * @text Image Name
 * @desc Filename (without extension)
 * @type string
 * 
 * @param censored
 * @text Is Censored
 * @desc If true, show "_censored" version when premium switch is OFF
 * @type boolean
 * @default true
 */

/*~struct~Category:
 *
 * @param Key
 * @text Internal Key
 * @type string
 * 
 * @param Text
 * @text Display Name
 * @type string
 * 
 * @param Icon
 * @text Icon Index
 * @type number
 * @default 0
 * 
 * @param images
 * @text Images
 * @type struct<ImageEntry>[]
 * @default []
 */

/*:
 * @target MZ
 * @plugindesc CG Gallery with locked thumbnails and fullscreen toggle [v3.3] — Censorship per image, Q/E & pad to switch, fullscreen support @author Code
 *
 * @param PremiumSwitchId
 * @text PREMIUM Switch ID
 * @desc Switch ID used to disable censorship (load uncensored images)
 * @type switch
 * @default 1
 *
 * @param Categories
 * @text Categories
 * @type struct<Category>[]
 * @default []
 *
 /*:
 * @command UnlockImage
 * @text Unlock Image
 * @desc Unlocks an image in the gallery.
 *
 * @arg key
 * @text Category Key
 * @type select
 * @option Characters
 * @option Cutscenes
 * @default Characters
 *
 * @arg name
 * @text Image Name
 * @type select
 * @option 1
 * @option 2
 * @option 3
 * @default 1
 */


 (() => {
    const pluginName = document.currentScript.src.match(/([^\/]+)\.js$/)[1];
    const params = PluginManager.parameters(pluginName);
    const PREMIUM_SWITCH_ID = Number(params["PremiumSwitchId"] || 1);
    const rawCategories = JSON.parse(params["Categories"] || "[]");

    const categories = rawCategories.map(cat => {
        const parsed = JSON.parse(cat);
        const rawImages = JSON.parse(parsed.images || "[]");
        parsed.images = rawImages.map(img => JSON.parse(img));
        return parsed;
    });

    function getImageName(entry) {
        const isPremium = $gameSwitches.value(PREMIUM_SWITCH_ID);
        const isCensored = String(entry.censored) === "true";
        return (!isPremium && isCensored) ? `${entry.name}_censored` : entry.name;
    }

    window.CGGallery = {
        unlockImage(name) {
            $gameSystem._cgUnlocked = $gameSystem._cgUnlocked || [];
            if (!$gameSystem._cgUnlocked.includes(name)) {
                $gameSystem._cgUnlocked.push(name);
            }
        },
        isUnlocked(name) {
            $gameSystem._cgUnlocked = $gameSystem._cgUnlocked || [];
            return $gameSystem._cgUnlocked.includes(name);
        },
        allUnlocked() {
            $gameSystem._cgUnlocked = $gameSystem._cgUnlocked || [];
            return $gameSystem._cgUnlocked;
        }
    };

    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        _Window_MenuCommand_addOriginalCommands.call(this);
        this.addCommand("Gallery", "openGallery");
    };

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler("openGallery", this.commandGallery.bind(this));
    };

    Scene_Menu.prototype.commandGallery = function () {
        SceneManager.push(Scene_CGGallery);
    };

    class Scene_CGGallery extends Scene_MenuBase {
        create() {
            super.create();
            const data = Scene_CGGallery.restoreData || {};
            Scene_CGGallery.restoreData = null;

            this._categoryIndex = data.categoryIndex ?? 0;
            this._thumbIndex = data.thumbnailIndex ?? 0;
            this._unlockedImages = CGGallery.allUnlocked();

            this.createCategoryWindow();
            this.createThumbnailWindow();

            if (data.restoreThumbs) {
                this._categoryWindow.deactivate();
                this._thumbWindow.refresh();
                this._thumbWindow.select(this._thumbIndex);
                this._thumbWindow.activate();
            } else {
                this._categoryWindow.activate();
                this._categoryWindow.select(this._categoryIndex);
            }
            this.createCounterWindow();
            this.updateCounterWindow();

        }

        createCategoryWindow() {
            const width = 260;
            const height = Graphics.boxHeight - 35;
            const x = Graphics.boxWidth - width;
            const rect = new Rectangle(x, 0, width, height);
            this._categoryWindow = new Window_Selectable(rect);
            this._categoryWindow.maxCols = () => 1;
            this._categoryWindow.maxItems = () => categories.length;
            this._categoryWindow.itemHeight = () => 40;
            this._categoryWindow.drawItem = index => {
                const rect = this._categoryWindow.itemRect(index);
                const cat = categories[index];
                this._categoryWindow.drawText(cat.Text, rect.x + 4, rect.y, rect.width - 8, 'left');
            };
            this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
            this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
            this.addWindow(this._categoryWindow);
            this._categoryWindow.refresh();
        }

        createThumbnailWindow() {
            const rect = new Rectangle(0, 0, Graphics.boxWidth - 260, Graphics.boxHeight - 35);
            this._thumbWindow = new Window_Selectable(rect);
            this._thumbWindow.maxCols = () => 5;
            this._thumbWindow.itemHeight = () => 100;
            this._thumbWindow.spacing = () => 8;
            this._thumbWindow.maxItems = () => this.currentImages().length;
            this._thumbWindow.drawItem = index => {
                const entry = this.currentImages()[index];
                const unlocked = this._unlockedImages.includes(entry.name);
                const bitmap = ImageManager.loadPicture(unlocked ? getImageName(entry) : "cg_locked");

                bitmap.addLoadListener(() => {
                    const rect = this._thumbWindow.itemRect(index);
                    const scale = Math.min(96 / bitmap.width, 96 / bitmap.height, 1);
                    const w = bitmap.width * scale;
                    const h = bitmap.height * scale;
                    const cx = rect.x + (rect.width - w) / 2;
                    const cy = rect.y + (rect.height - h) / 2;
                    this._thumbWindow.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
                    this._thumbWindow.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, cx, cy, w, h);
                });
            };

            this._thumbWindow.setHandler("ok", this.onThumbnailOk.bind(this));
            this._thumbWindow.setHandler("cancel", this.onThumbnailCancel.bind(this));
            this.addWindow(this._thumbWindow);
        }

        createCounterWindow() {
            const width = 260;
            const height = 60;
            const x = Graphics.boxWidth - width;
            const y = Graphics.boxHeight - height - 35;
            const rect = new Rectangle(x, y, width, height);
            this._counterWindow = new Window_Base(rect);
            this._counterWindow.opacity = 255;
            this.addWindow(this._counterWindow);
        }


        onCategoryOk() {
            this._categoryIndex = this._categoryWindow.index();
            this._thumbWindow.refresh();
            this.updateCounterWindow();

            this._thumbWindow.select(0);
            this._categoryWindow.deactivate();
            this._thumbWindow.activate();
        }

        onThumbnailOk() {
            const index = this._thumbWindow.index();
            const entry = this.currentImages()[index];
            const unlocked = this._unlockedImages.includes(entry.name);
            if (!unlocked) {
                SoundManager.playBuzzer();
                this._thumbWindow.activate();
                return;
            }
            Scene_CGViewer.prepare(entry, this._categoryIndex, index);
            SceneManager.push(Scene_CGViewer);
        }

        onThumbnailCancel() {
            this._thumbWindow.deactivate();
            this.updateCounterWindow();

            this._thumbWindow.deselect();
            this._categoryWindow.activate();
        }

        updateCounterWindow() {
            const images = this.currentImages();
            const unlocked = images.filter(img => this._unlockedImages.includes(img.name)).length;
            const percent = images.length > 0 ? Math.floor((unlocked / images.length) * 100) : 0;
            const text = `${unlocked}/${images.length} (${percent}%)`;

            this._counterWindow.contents.clear();
            this._counterWindow.drawText(text, 0, 0, this._counterWindow.contentsWidth(), 'center');
        }


        currentImages() {
            return categories[this._categoryIndex]?.images || [];
        }
    }

    class Scene_CGViewer extends Scene_MenuBase {
        static prepare(entry, categoryIndex, thumbnailIndex) {
            this._preparedEntry = entry;
            this._categoryIndex = categoryIndex;
            this._thumbnailIndex = thumbnailIndex;
        }

        create() {
            super.create();
            this._entry = Scene_CGViewer._preparedEntry;
            this._offsetX = 0;
            this._offsetY = 0;
            this._fullscreen = false;
            this._justOpened = true;
            this._justOpenedWait = 10;

            this.createBottomBar();
            this.createImage();

            Input.keyMapper["81"] = "pageup";   // Q
            Input.keyMapper["69"] = "pagedown"; // E
        }


        switchImage(direction) {
            const images = categories[Scene_CGViewer._categoryIndex].images;
            let index = Scene_CGViewer._thumbnailIndex;

            for (; ;) {
                index += direction;
                if (index < 0 || index >= images.length) {
                    SoundManager.playBuzzer();
                    return;
                }

                const entry = images[index];
                if (CGGallery.isUnlocked(entry.name)) {
                    Scene_CGViewer._thumbnailIndex = index;
                    this._entry = entry;
                    this._bitmap = ImageManager.loadPicture(getImageName(this._entry));
                    this._bitmap.addLoadListener(() => this.drawImage());
                    SoundManager.playCursor();
                    return;
                }
            }
        }


        createImage() {
            this._sprite = new Sprite();
            this.addChild(this._sprite);
            this._bitmap = ImageManager.loadPicture(getImageName(this._entry));
            this._bitmap.addLoadListener(() => this.drawImage());
        }

        drawImage() {
            const maxW = this._fullscreen ? Graphics.width : Graphics.boxWidth;
            const maxH = this._fullscreen ? Graphics.height : Graphics.boxHeight - 60;
            const scale = Math.min(maxW / this._bitmap.width, maxH / this._bitmap.height, 1);
            this._sprite.bitmap = this._bitmap;
            this._sprite.scale.x = scale;
            this._sprite.scale.y = scale;
            this._sprite.x = (Graphics.width - this._bitmap.width * scale) / 2;
            this._sprite.y = (Graphics.height - this._bitmap.height * scale - (this._fullscreen ? 0 : 60)) / 2;
        }

        toggleFullscreen() {
            this._fullscreen = !this._fullscreen;
            this._bottomBar.visible = !this._fullscreen;
            this.drawImage();
        }

        createBottomBar() {
            const height = 60;
            const rect = new Rectangle(0, Graphics.boxHeight - height, Graphics.boxWidth, height);
            this._bottomBar = new Window_Base(rect);
            this._bottomBar.opacity = 255;
            this._bottomBar.drawText("Q/E/LB/RB: Switch", 0, 0, rect.width, 'center');
            this.addWindow(this._bottomBar);
        }

        update() {
            super.update();

            if (this._justOpened) {
                this._justOpenedWait--;
                if (this._justOpenedWait <= 0) this._justOpened = false;
            } else if (Input.isTriggered("ok") || TouchInput.isTriggered()) {
                this.toggleFullscreen();
            }

            if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
                Scene_CGGallery.restoreData = {
                    categoryIndex: Scene_CGViewer._categoryIndex,
                    thumbnailIndex: Scene_CGViewer._thumbnailIndex,
                    restoreThumbs: true
                };
                SceneManager.pop();
            }

            if (Input.isTriggered("pageup") || Input.isTriggered("leftTrigger")) {
                this.switchImage(-1);
            }
            if (Input.isTriggered("pagedown") || Input.isTriggered("rightTrigger")) {
                this.switchImage(1);
            }
        }
    }

    PluginManager.registerCommand(pluginName, "UnlockImage", args => {
        const key = args.key;
        const name = args.name;
        const cat = categories.find(c => c.Key === key);
        if (cat && cat.images.some(i => i.name === name)) {
            CGGallery.unlockImage(name);
        } else {
            console.warn(`[CGGallery] Image "${name}" not found in category "${key}"`);
        }
    });
})();
