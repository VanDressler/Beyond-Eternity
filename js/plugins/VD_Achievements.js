/*:
 * @target MZ
 * @plugindesc 🎖️ Advanced Achievement System with in-menu display, PS5-style popups, rewards and progress tracking. Compatible with VisuStella.
 * @author Code
 *
 * @command EarnAchievement
 * @text Earn Achievement
 * @desc Unlocks a specific achievement using its ID.
 *
 * @arg achievementId
 * @text Achievement ID
 * @desc The ID of the achievement to be unlocked.
 * @type combo
 *
 * @param Achievements
 * @type struct<Achievement>[] 
 * @desc List of available achievements in the game.
 * @default []
 *
 * @param ProgressiveAchievements
 * @type struct<ProgressAchievement>[]
 * @desc Achievements with numeric progress tracking.
 * @default []
 *
 * @param PopupPosition
 * @type select
 * @text Popup Position
 * @default BottomRight
 * @option TopLeft
 * @option TopCenter
 * @option TopRight
 * @option BottomLeft
 * @option BottomCenter
 * @option BottomRight
 *
 * @param PopupWidth
 * @type number
 * @default 520
 *
 * @param PopupHeight
 * @type number
 * @default 120
 *
 * @param IconTextPadding
 * @type number
 * @default 16
 *
 * @param TitleFontSize
 * @type number
 * @default 22
 *
 * @param DescFontSize
 * @type number
 * @default 16
 *
 * @param TitleOffsetY
 * @type number
 * @default 10
 *
 * @param DescOffsetY
 * @type number
 * @default 28
 *
 * @param PopupSE
 * @type struct<Sound>
 * @default {"name":"Item3","volume":"90","pitch":"100","pan":"0"}
 * 
 * @param RewardPopupPosition
 * @type select
 * @text Reward Popup Position
 * @default BottomLeft
 * @option TopLeft
 * @option TopCenter
 * @option TopRight
 * @option BottomLeft
 * @option BottomCenter
 * @option BottomRight
 * 
 * @param RewardPopupDelay
 * @type number
 * @text Reward Popup Delay (ms)
 * @default 3000
 * @min 0
 *
 * @help
 * =============================================================
 * 🏆 Achievement Plugin by Code
 * =============================================================
 * 
 * 🔹 Add achievements with title, icon, description and rewards.
 * 🔹 Show PS5-style popups when unlocking achievements.
 * 🔹 Track progress-based achievements (e.g. 100 kills).
 * 🔹 Compatible with VisuStella. No CGMZ Core required.
 * 🔹 Includes rewards: Gold, EXP, Items, Weapons, Armor.
 * 🔹 Group achievements by categories with filtering.
 * 🔹 Show total unlocked and progress bars.
 * 
 * -------------------------------------------------------------
 * 🔧 How to Unlock Achievements
 * -------------------------------------------------------------
 * 
 * • Call in event:
 *     $gameSystem.earnAchievement("ACH_ID")
 *
 * • Use plugin command: "Earn Achievement"
 *
 * -------------------------------------------------------------
 * 🎨 Icon Setup
 * -------------------------------------------------------------
 * - Use full-color icon for unlocked.
 * - Use grayscale icon (lockedIconImage) for hidden/locked.
 *
 * -------------------------------------------------------------
 * 💬 Secret Achievements
 * -------------------------------------------------------------
 * - If marked as secret, will display "???" until unlocked.
 *
 */

/*~struct~Achievement:
 * @param id
 * @desc Unique identifier for the achievement.
 *
 * @param name
 * @desc Achievement title.
 *
 * @param description
 * @desc Description shown in menu/popup.
 *
 * @param iconImage
 * @type file
 * @dir img/pictures
 * @desc Image icon when unlocked.
 *
 * @param lockedIconImage
 * @type file
 * @dir img/pictures
 * @desc Image icon when locked (grayscale or hidden).
 *
 * @param goldReward
 * @type number
 * @min 0
 * @default 0
 * @desc Gold reward when earned.
 *
 * @param itemReward
 * @type item
 * @desc Item given when earned.
 *
 * @param weaponReward
 * @type weapon
 * @desc Weapon given when earned.
 *
 * @param armorReward
 * @type armor
 * @desc Armor given when earned.
 *
 * @param expReward
 * @type number
 * @min 0
 * @default 0
 * @desc EXP given to party leader.
 *
 * @param category
 * @type string
 * @desc Achievement category (for filtering).
 *
 * @param secret
 * @type boolean
 * @text Secret Achievement
 * @desc Hidden title/desc until unlocked?
 * @default false
 */

/*~struct~ProgressAchievement:
 * @param type
 * @type string
 * @desc Progress type (e.g. "enemyKills", "stepsTaken")
 *
 * @param goal
 * @type number
 * @desc Required number to complete the achievement.
 *
 * @param achievementId
 * @type string
 * @desc Achievement ID to unlock when progress is reached.
 */

/*~struct~Sound:
 * @param name
 * @type file
 * @dir audio/se/
 * @desc Sound Effect file.
 * 
 * @param volume
 * @type number
 * @default 90
 * 
 * @param pitch
 * @type number
 * @default 100
 * 
 * @param pan
 * @type number
 * @default 0
 */


(() => {
    const pluginName = "Achiv";
    const parameters = PluginManager.parameters(pluginName);

    const popupPosition = String(parameters["PopupPosition"] || "BottomRight");
    const rewardPopupPosition = String(parameters["RewardPopupPosition"] || "BottomLeft");
    const rewardPopupDelay = Number(parameters["RewardPopupDelay"] || 3000);
    const popupWidth = Number(parameters["PopupWidth"] || 520);
    const popupHeight = Number(parameters["PopupHeight"] || 120);
    const iconTextPadding = Number(parameters["IconTextPadding"] || 16);
    const titleFontSize = Number(parameters["TitleFontSize"] || 22);
    const descFontSize = Number(parameters["DescFontSize"] || 16);
    const titleOffsetY = Number(parameters["TitleOffsetY"] || 10);
    const descOffsetY = Number(parameters["DescOffsetY"] || 28);

    const popupSE = JSON.parse(parameters["PopupSE"] || "{}");
    const seData = {
        name: popupSE.name || "",
        volume: Number(popupSE.volume || 90),
        pitch: Number(popupSE.pitch || 100),
        pan: Number(popupSE.pan || 0),
    };

    const rawList = JSON.parse(parameters["Achievements"] || "[]");
    const Achievements = rawList.map(str => {
        try {
            const obj = JSON.parse(str);
            return {
                id: obj.id?.trim() || "",
                name: obj.name?.trim() || "",
                description: obj.description?.trim() || "",
                iconImage: obj.iconImage?.trim() || "",
                lockedIconImage: obj.lockedIconImage?.trim() || "", // << DODAJ
                goldReward: Number(obj.goldReward || 0),
                itemReward: obj.itemReward ? Number(obj.itemReward) : null,
                weaponReward: obj.weaponReward ? Number(obj.weaponReward) : null,
                armorReward: obj.armorReward ? Number(obj.armorReward) : null,
                expReward: Number(obj.expReward || 0),
                secret: obj.secret === "true",
                category: obj.category?.trim() || "General"
            };
            
            

        } catch (e) {
            console.warn("Nieprawidłowy wpis w osiągnięciach:", str);
            return null;
        }
    }).filter(Boolean);

    const rawProgressList = JSON.parse(parameters["ProgressiveAchievements"] || "[]");
    const ProgressiveAchievements = rawProgressList.map(str => {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.warn("Nieprawidłowy wpis w progresywnych osiągnięciach:", str);
        return null;
    }
    }).filter(Boolean);


    

    PluginManager.registerCommand(pluginName, "EarnAchievement", args => {
        const id = args.achievementId;
        if (id) $gameSystem.earnAchievement(id);
    });

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _Game_System_initialize.call(this);
        this._earnedAchievements = [];
        this._achievementProgress = {}; // << NOWE!
    };

    Game_System.prototype.earnAchievement = function (id) {
        if (!this._earnedAchievements.includes(id)) {
            this._earnedAchievements.push(id);
            const data = Achievements.find(a => a.id === id);
            if (data) {
                // 🎁 Nagrody
                if (data.goldReward > 0) $gameParty.gainGold(data.goldReward);
                if (data.itemReward) $gameParty.gainItem($dataItems[data.itemReward], 1);
                if (data.weaponReward) $gameParty.gainItem($dataWeapons[data.weaponReward], 1);
                if (data.armorReward) $gameParty.gainItem($dataArmors[data.armorReward], 1);
                if (data.expReward > 0) $gameParty.leader()?.gainExp(data.expReward);

                // 🔔 Efekt dźwiękowy
                if (seData.name) AudioManager.playSe(seData);

                // 🏆 Popup osiągnięcia
                try {
                    const popup = new Window_AchievementPopup(data.name, data.iconImage, data.description);
                    setTimeout(() => addGlobalPopup(popup), 0);
                } catch (e) {
                    console.warn("❌ Błąd popupu osiągnięcia:", e);
                }

                // 💰 Popup nagrody (jeśli jest złoto)
                if (data.goldReward > 0) {
                    setTimeout(() => {
                        try {
                            const rewardPopup = new Window_RewardPopup(data.name, `+${data.goldReward} złota`);
                            setTimeout(() => addGlobalPopup(rewardPopup), 0);
                        } catch (e) {
                            console.warn("❌ Błąd popupu nagrody:", e);
                        }
                    }, rewardPopupDelay);
                }

                console.log(`🏆 Zdobyto osiągnięcie: ${data.name}`);
            }
        }
    };




    Game_System.prototype.hasAchievement = function (id) {
        return this._earnedAchievements.includes(id);
    };

    Game_System.prototype.getAchievements = function () {
        return Achievements;
    };

    Game_System.prototype.updateAchievementProgress = function (type, amount) {
        this._achievementProgress = this._achievementProgress || {};
        this._achievementProgress[type] = (this._achievementProgress[type] || 0) + amount;
    };
    

    Game_System.prototype.updateAchievementProgress = function(type, value) {
        if (!this._achievementProgress[type]) {
            this._achievementProgress[type] = 0;
        }
        this._achievementProgress[type] += value;
    
        ProgressiveAchievements.forEach(entry => {
            if (entry.type === type) {
                if (this._achievementProgress[type] >= Number(entry.goal)) {
                    this.earnAchievement(entry.achievementId);
                }
            }
        });
    };
    
    Game_System.prototype.getAchievementProgress = function(type) {
        return this._achievementProgress[type] || 0;
    };
    

    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        _Window_MenuCommand_addOriginalCommands.call(this);
        this.addCommand("Achievements", "achievements");
    };

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler("achievements", () => {
            SceneManager.push(Scene_Achievements);
        });
    };

    class Scene_Achievements extends Scene_MenuBase {
        create() {
            super.create();
        
            const padding = 12;
            const rewardHeight = 220;
            const counterHeight = 55;
            const categoryWidth = 200;
        
            const listRect = new Rectangle(0, 0, Graphics.boxWidth - categoryWidth, Graphics.boxHeight - rewardHeight - counterHeight - padding);
            const categoryRect = new Rectangle(Graphics.boxWidth - categoryWidth, 0, categoryWidth, listRect.height);
            const rewardRect = new Rectangle(0, listRect.height + padding - 30, Graphics.boxWidth, rewardHeight);
            const counterRect = new Rectangle(0, rewardRect.y + rewardHeight, Graphics.boxWidth, counterHeight);
        
            this._categoryWindow = new Window_CategoryList(categoryRect, selected => {
                this._achievementWindow.setCategory(selected);
                this._categoryWindow.deactivate();
                this._categoryWindow.select(-1); // 👈 NIE zaznaczaj żadnej opcji (cursor off)
                this._achievementWindow.activate();
                this._achievementWindow.select(0); // 👈 Domyślnie wybierz pierwszy achievement
            });
        
            this._categoryWindow.setHandler("cancel", () => {
                this._categoryWindow.deactivate();
                this._categoryWindow.select(-1);
                this.popScene();
            });
        
            this._achievementWindow = new Window_AchievementList(listRect);
            this._rewardWindow = new Window_AchievementReward(rewardRect);
            this._counterWindow = new Window_AchievementCounter(counterRect);
        
            this._achievementWindow.setHandler("cancel", () => {
                this._achievementWindow.deactivate();
                this._achievementWindow.select(-1); // 👈 Wyłącz wybór po anulowaniu
                this._categoryWindow.activate();
                this._categoryWindow.select(0); // 👈 Powrót do kategorii z kursorem
            });
        
            this._achievementWindow.setRewardWindow(this._rewardWindow);
        
            this.addWindow(this._categoryWindow);
            this.addWindow(this._achievementWindow);
            this.addWindow(this._rewardWindow);
            this.addWindow(this._counterWindow);
        
            this._achievementWindow.deactivate();
            this._achievementWindow.select(-1); // 👈 brak kursora
            this._categoryWindow.activate();
            this._categoryWindow.select(0);
        }
        
        


    }

    class Window_AchievementList extends Window_Selectable {
        initialize(rect) {
            super.initialize(rect);
            this._allAchievements = $gameSystem.getAchievements() || [];
            this._currentCategory = "General";
            this._data = this.filteredAchievements();
            this.select(0);
            this.activate();
        }
    
        maxItems() {
            return this._data.length;
        }
    
        itemHeight() {
            return 80;
        }
    
        drawItem(index) {
            const achievement = this._data[index];
            if (!achievement) return;
    
            const rect = this.itemRectWithPadding(index);
            const earned = $gameSystem.hasAchievement(achievement.id);
            const iconSize = 48;
            const iconX = rect.x + 20;
            const iconY = rect.y + (rect.height - iconSize) / 2;
    
            const textX = iconX + iconSize + 12;
            const textW = rect.width - textX - 8;
            const textY = rect.y + (rect.height - 40) / 2;
    
            const name = earned || !achievement.secret ? achievement.name : "???";
            const icon = earned ? achievement.iconImage : achievement.lockedIconImage || achievement.iconImage;

    
            if (this.index() === index) {
                this.contentsBack.fillRect(rect.x, rect.y, rect.width, rect.height, 'rgba(255,255,255,0.1)');
            }
    
            if (icon) {
                const bitmap = ImageManager.loadPicture(icon);
                bitmap.addLoadListener(() => {
                    this.contents.blt(bitmap, 0, 0, iconSize, iconSize, iconX, iconY);
                });
            }
    
            this.contents.paintOpacity = 255;
            this.changeTextColor(earned ? "#ffffff" : "#666666");
            this.contents.fontSize = 20;
            this.drawText(name, textX, textY, textW, "left");
            this.resetTextColor();
        }
    
        refresh() {
            this.contents.clear();
            this.contentsBack.clear();
            this._data = this.filteredAchievements();
            this.drawAllItems();
        }
    
        setRewardWindow(rewardWindow) {
            this._rewardWindow = rewardWindow;
            this.refreshRewardWindow();
        }
    
        refreshRewardWindow() {
            const index = this.index();
            if (index < 0 || index >= this._data.length) return;
            const achievement = this._data[index];
            if (this._rewardWindow) {
                this._rewardWindow.setAchievement(achievement);
            }
        }
    
        select(index) {
            super.select(index);
            this.refreshRewardWindow();
        }
    
        setCategory(category) {
            this._currentCategory = category;
            this.refresh();
            this.select(0); // po zmianie kategorii automatycznie wybierz pierwszy element
        }
    
        filteredAchievements() {
            return this._allAchievements.filter(a => a.category === this._currentCategory);
        }
    }
    

    class Window_AchievementReward extends Window_Base {
    constructor(rect) {
        super(rect);
        this._achievement = null;
    }

    setAchievement(achievement) {
        if (this._achievement !== achievement) {
            this._achievement = achievement;
            this.refresh();
        }
    }

    refresh() {
        this.contents.clear();
        if (!this._achievement) return;
    
        const earned = $gameSystem.hasAchievement(this._achievement.id);
        const name = earned || !this._achievement.secret ? this._achievement.name : "???";
        const desc = earned || !this._achievement.secret ? this._achievement.description : "?????";
    
        const gold = this._achievement.goldReward || 0;
        const item = this._achievement.itemReward ? $dataItems[this._achievement.itemReward] : null;
        const weapon = this._achievement.weaponReward ? $dataWeapons[this._achievement.weaponReward] : null;
        const armor = this._achievement.armorReward ? $dataArmors[this._achievement.armorReward] : null;
        const exp = this._achievement.expReward || 0;
    
        this.changeTextColor(earned ? "#ffffff" : "#666666");
    
        let y = 0;
        this.contents.fontSize = 25;
        this.drawText(`🏆 ${name}`, 0, y, this.contents.width, "left");
        y += 32;
    
        this.contents.fontSize = 20;
        this.drawText(desc, 50, y, this.contents.width, "left");
        y += 32;
    
        this.contents.fontSize = 16;
        this.drawText("Reward:", 25, y, this.contents.width, "left");
        y += 24;
    
        if (gold > 0) {
            this.drawText(`💰 ${gold} gold`, 50, y, this.contents.width, "left");
            y += 24;
        }
        if (item) {
            this.drawText(`🎁 ${item.name}`, 50, y, this.contents.width, "left");
            y += 24;
        }
        if (weapon) {
            this.drawText(`🗡️ ${weapon.name}`, 50, y, this.contents.width, "left");
            y += 24;
        }
        if (armor) {
            this.drawText(`🛡️ ${armor.name}`, 50, y, this.contents.width, "left");
            y += 24;
        }
        if (exp > 0) {
            this.drawText(`⭐ ${exp} Exp`, 50, y, this.contents.width, "left");
            y += 24;
        }

        // <<<< Pasek progresu dla progresywnych osiągnięć >>>>
        const progressData = ProgressiveAchievements.find(p => p.achievementId === this._achievement.id);
        if (progressData) {
            const type = progressData.type;
            const goal = Number(progressData.goal);
            const current = $gameSystem.getAchievementProgress(type);

            y = this.contents.height - 35; // <<<<<< PRZESUŃ pasek na dół
            const rate = Math.min(current / goal, 1.0);
            const gaugeColor1 = ColorManager.hpGaugeColor1();
            const gaugeColor2 = ColorManager.hpGaugeColor2();

            const gaugeWidth = this.contents.width * 0.6; // krótszy pasek
            const gaugeX = (this.contents.width - gaugeWidth) / 2;
            const gaugeY = y + 12; // przesunięcie, aby licznik na środku paska

            this.drawThickGauge(gaugeX, gaugeY, gaugeWidth, rate, gaugeColor1, gaugeColor2);

            // Licznik na środku paska
            this.contents.fontSize = 20;
            this.changeTextColor("#ffffff");
            this.drawText(`${current} / ${goal}`, 0, gaugeY - 7, this.contents.width, "center");
            this.resetTextColor();
        }
    }

    drawThickGauge(x, y, width, rate, color1, color2) {
        const height = 18; // trochę grubszy pasek
        const fillW = Math.floor(width * rate);

        this.contents.fillRect(x, y, width, height, "#222222"); // tło
        const gradient = this.contents.context.createLinearGradient(x, y, x + width, y);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);

        this.contents.context.fillStyle = gradient;
        this.contents.context.fillRect(x, y, fillW, height);
    }
}

    
        

        





    
    class Window_AchievementCounter extends Window_Base {
        constructor(rect) {
            super(rect);
            this.refresh();
        }

        refresh() {
            this.contents.clear();

            const total = $gameSystem.getAchievements().length;
            const unlocked = $gameSystem._earnedAchievements.length;
            const text = `Achievements: ${unlocked} / ${total} unlocked`;

            this.contents.fontSize = 18;
            this.changeTextColor("#ffffff");
            this.drawText(text, 0, 0, this.contents.width, "center");
            this.resetTextColor();
        }
    }







    class Window_AchievementPopup extends Window_Selectable {
        constructor(title, iconImage, description = "") {
            const width = Math.min(popupWidth, Graphics.boxWidth - 40);
            const height = popupHeight;
            const pos = Window_AchievementPopup.calcPosition(width, height);
            super(new Rectangle(pos.x, pos.y, width, height));

            this._title = title;
            this._description = description;
            this._iconImage = iconImage;
            this._iconBitmap = iconImage ? ImageManager.loadPicture(iconImage) : null;
            this._duration = 300;
            this.opacity = 0;
            this.backOpacity = 180;
            this.open();
        }

        static calcPosition(width, height) {
            const pad = 20;
            const xRight = Graphics.boxWidth - width - pad;
            const yBottom = Graphics.boxHeight - height - pad;
            const xCenter = (Graphics.boxWidth - width) / 2;
            const yTop = pad;

            switch (popupPosition) {
                case "TopLeft": return { x: pad, y: yTop };
                case "TopCenter": return { x: xCenter + 150, y: yTop };
                case "TopRight": return { x: xRight, y: yTop };
                case "BottomLeft": return { x: pad, y: yBottom };
                case "BottomCenter": return { x: xCenter, y: yBottom };
                default: return { x: xRight, y: yBottom };
            }
        }

        update() {
            super.update();
            this._duration--;
            this.opacity = Math.min(255, this.opacity + 15);
            if (this._duration <= 0) {
                this.close();
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            }
        }

        open() {
            super.open();
            this.refresh();
        }

        refresh() {
            this.contents.clear();

            const iconSize = 64;
            const iconX = 0;
            const iconY = (this.contentsHeight() - iconSize) / 2;
            const textX = iconX + iconSize + iconTextPadding;
            const textW = this.contents.width - textX - 16;

            if (this._iconBitmap && this._iconBitmap.isReady()) {
                this.contents.blt(this._iconBitmap, -10, 0, iconSize, iconSize, iconX, iconY - 15);
            } else {
                this._iconBitmap?.addLoadListener(() => this.refresh());
            }

            this.contents.fontSize = titleFontSize;
            this.drawText(this._title, textX, titleOffsetY, textW, "left");

            if (this._description) {
                this.contents.fontSize = descFontSize;
                this.drawText(this._description, textX, descOffsetY, textW, "left");
            }
        }
    }

    class Window_RewardPopup extends Window_Base {
        constructor(title, rewardText) {
            const width = 500;
            const height = 100;
            const pos = Window_RewardPopup.calcPosition(width, height);
            super(new Rectangle(pos.x, pos.y, width, height));

            this._title = title;
            this._rewardText = rewardText;
            this._duration = 250;
            this.opacity = 0;
            this.backOpacity = 180;

            this.open();
        }

        static calcPosition(width, height) {
            const pad = 20;
            const xRight = Graphics.boxWidth - width - pad;
            const yBottom = Graphics.boxHeight - height - pad;
            const xCenter = (Graphics.boxWidth - width) / 2;
            const yTop = pad;

            switch (rewardPopupPosition) {
                case "TopLeft": return { x: pad, y: yTop };
                case "TopCenter": return { x: xCenter, y: yTop };
                case "TopRight": return { x: xRight, y: yTop };
                case "BottomLeft": return { x: pad, y: yBottom };
                case "BottomCenter": return { x: xCenter + 150, y: yBottom + 40 };
                case "BottomRight":
                default: return { x: xRight, y: yBottom };
            }
        }

        update() {
            super.update();
            this._duration--;
            this.opacity = Math.min(255, this.opacity + 15);
            if (this._duration <= 0) {
                this.close();
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            }
        }

        open() {
            super.open();
            this.refresh();
        }

        refresh() {
            this.contents.clear();

            // Górny tytuł: "Reward"
            this.contents.fontSize = 20;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText("Reward", 0, 0, this.contents.width, "center");

            // Dolny tekst: np. "+100 złota"
            this.contents.fontSize = 16;
            this.changeTextColor(ColorManager.normalColor());
            this.drawText(this._rewardText, 0, 40, this.contents.width, "center");
        }
    }

    class Window_CategoryList extends Window_Command {
        constructor(rect, callback) {
            super(rect);
            this._callback = callback;
            this.select(0);
        }

        makeCommandList() {
            const categories = this.getUniqueCategories();
            for (const cat of categories) {
                this.addCommand(cat, cat);
            }
        }

        getUniqueCategories() {
            const all = $gameSystem.getAchievements();
            const set = new Set();
            for (const a of all) {
                if (a.category) set.add(a.category);
            }
            return [...set];
        }

        currentCategory() {
            return this.currentSymbol();
        }

        processOk() {
            if (this._callback) {
                SoundManager.playOk(); // tylko dźwięk "ok", brak buzzera
                this._callback(this.currentCategory());
            }
            this.updateInputData();
            this.deactivate();
        }
        
    }




})();
