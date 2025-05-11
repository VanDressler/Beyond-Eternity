/*:
 * @target MZ
 * @plugindesc Adds Import/Export Save buttons to the title screen (Slot 0 only). v1.1
 * @author GPT
 */

(() => {
    const saveSlotId = 0; // SLOT 0 = Save01
  
    // Dodajemy nowe opcje do menu tytułowego
    const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function () {
      _Window_TitleCommand_makeCommandList.call(this);
      this.addCommand("Import Save", "importSave");
      this.addCommand("Export Save", "exportSave");
    };
  
    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function () {
      _Scene_Title_createCommandWindow.call(this);
      this._commandWindow.setHandler("importSave", this.commandImportSave.bind(this));
      this._commandWindow.setHandler("exportSave", this.commandExportSave.bind(this));
    };
  
    // Eksport zapisu
    Scene_Title.prototype.commandExportSave = async function () {
      try {
        const data = await StorageManager.loadObject(saveSlotId);
        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: "application/json" });
  
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "SaveSlot1.json";
        a.click();
        URL.revokeObjectURL(a.href);
  
        alert("Save exported successfully!");
      } catch (error) {
        alert("No save file found in Slot 0 (Save01).");
      }
  
      this._commandWindow.activate();
    };
  
    // Import zapisu
    Scene_Title.prototype.commandImportSave = function () {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
  
      input.addEventListener("change", async () => {
        const file = input.files[0];
        if (!file) return;
  
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const json = JSON.parse(reader.result);
            await StorageManager.saveObject(saveSlotId, json);
            alert("Save imported successfully!");
          } catch (err) {
            alert("Failed to import save file.");
          }
        };
        reader.readAsText(file);
      });
  
      input.click();
      this._commandWindow.activate();
    };
  })();
  