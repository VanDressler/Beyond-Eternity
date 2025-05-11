/*:
 * @target MZ
 * @plugindesc System ulepszania broni i pancerzy z dynamicznymi wymaganiami, kosztami i wzrostem statystyk (+1 do +99). Wersja 1.0
 * @author Code
 *
 * @command OpenUpgradeScene
 * @text Otwórz scenę ulepszania
 * @desc Otwiera okno wyboru broni/pancerza i ulepszania ich na podstawie notetagów.
 */

(() => {
    const pluginName = "UpgradeSystem";

    PluginManager.registerCommand(pluginName, "OpenUpgradeScene", () => {
        SceneManager.push(Scene_Upgrade);
    });

    class Scene_Upgrade extends Scene_MenuBase {
        create() {
            super.create();
            this.createHelpWindow();
            this.createItemWindow();
            this.createConfirmWindow();
        }

        createHelpWindow() {
            this._helpWindow = new Window_Help(2);
            this._helpWindow.setText("Wybierz przedmiot do ulepszenia:");
            this.addWindow(this._helpWindow);
        }

        createItemWindow() {
            const wy = this._helpWindow.height;
            this._itemWindow = new Window_UpgradeItemList(0, wy);
            this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
            this._itemWindow.setHandler("cancel", this.popScene.bind(this));
            this.addWindow(this._itemWindow);
        }

        createConfirmWindow() {
            const wy = this._itemWindow.y + this._itemWindow.height;
            this._confirmWindow = new Window_UpgradeConfirm(0, wy);
            this._confirmWindow.setHandler("ok", this.onUpgradeOk.bind(this));
            this._confirmWindow.setHandler("cancel", this.onUpgradeCancel.bind(this));
            this._confirmWindow.hide();
            this.addWindow(this._confirmWindow);
        }

        onItemOk() {
            const item = this._itemWindow.item();
            this._confirmWindow.setItem(item);
            this._confirmWindow.show();
            this._confirmWindow.activate();
        }

        onUpgradeOk() {
            const item = this._itemWindow.item();
            const level = item.meta.upgradeLevel ? Number(item.meta.upgradeLevel) : 0;
            const upgradeData = UpgradeSystem.parseUpgradeData(item);
            const newLevel = Math.min(level + 1, 99);

            const cost = upgradeData.gold * newLevel;
            const itemId = UpgradeSystem.requiredItemIdForLevel(upgradeData.itemLevels, newLevel);

            if ($gameParty.gold() < cost || !$gameParty.hasItem($dataItems[itemId])) {
                SoundManager.playBuzzer();
                this._confirmWindow.activate();
                return;
            }

            $gameParty.loseGold(cost);
            $gameParty.loseItem($dataItems[itemId], 1);

            item.meta.upgradeLevel = newLevel;
            item.name = item.name.replace(/\s?\+\d+$/, "") + " +" + newLevel;

            if (item.params) {
                item.params[2] += upgradeData.atk; // ATK
                item.params[3] += upgradeData.def; // DEF
            }

            SoundManager.playEquip();
            this._confirmWindow.hide();
            this._itemWindow.refresh();
            this._itemWindow.activate();
        }

        onUpgradeCancel() {
            this._confirmWindow.hide();
            this._itemWindow.activate();
        }
    }

    class Window_UpgradeItemList extends Window_Selectable {
        constructor(x, y) {
            const height = Graphics.boxHeight / 2;
            super(new Rectangle(x, y, Graphics.boxWidth, height));
            this.refresh();
        }

        maxItems() {
            return this._data ? this._data.length : 0;
        }

        item() {
            return this._data[this.index()];
        }

        drawItem(index) {
            const item = this._data[index];
            if (item) {
                const rect = this.itemLineRect(index);
                this.drawText(item.name, rect.x, rect.y, rect.width);
            }
        }

        refresh() {
            this._data = $gameParty.weapons().concat($gameParty.armors());
            this.createContents();
            this.drawAllItems();
        }
    }

    class Window_UpgradeConfirm extends Window_Base {
        constructor(x, y) {
            const height = Graphics.boxHeight - y;
            super(new Rectangle(x, y, Graphics.boxWidth, height));
            this._item = null;
        }

        setItem(item) {
            this._item = item;
            this.refresh();
        }

        refresh() {
            this.contents.clear();
            if (!this._item) return;

            const level = this._item.meta.upgradeLevel ? Number(this._item.meta.upgradeLevel) : 0;
            const newLevel = Math.min(level + 1, 99);
            const data = UpgradeSystem.parseUpgradeData(this._item);
            const itemId = UpgradeSystem.requiredItemIdForLevel(data.itemLevels, newLevel);
            const itemName = $dataItems[itemId] ? $dataItems[itemId].name : "Brak";

            this.drawText("Poziom: +" + level + " → +" + newLevel, 0, 0);
            this.drawText("Koszt: " + (data.gold * newLevel) + "G", 0, 40);
            this.drawText("Wymagany przedmiot: " + itemName, 0, 80);
            this.drawText("Statystyki +" + data.atk + " ATK, +" + data.def + " DEF", 0, 120);

            this.drawText("OK: Ulepsz | Anuluj: Powrót", 0, 160);
        }
    }

    const UpgradeSystem = {
        parseUpgradeData(item) {
            const note = item.note;
            const gold = Number(note.match(/<gold>(\d+)<\/gold>/)?.[1]) || 0;
            const atk = Number(note.match(/<atk>(\d+)<\/atk>/)?.[1]) || 0;
            const def = Number(note.match(/<def>(\d+)<\/def>/)?.[1]) || 0;

            const itemLevels = [];
            const itemLevelRegex = /<level item="(\d+)" level="(\d+)"\/>/g;
            let match;
            while ((match = itemLevelRegex.exec(note))) {
                itemLevels.push({ item: Number(match[1]), level: Number(match[2]) });
            }

            return { gold, atk, def, itemLevels };
        },

        requiredItemIdForLevel(itemLevels, level) {
            let result = null;
            for (const entry of itemLevels) {
                if (level >= entry.level) {
                    result = entry.item;
                }
            }
            return result;
        }
    };
})();
