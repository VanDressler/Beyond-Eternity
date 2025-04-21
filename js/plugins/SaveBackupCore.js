// SaveBackupCore.js
(() => {
    window.exportSaveFile = function (slotId = 1) {
      const savefileId = slotId;
      const saveData = StorageManager.loadObject(savefileId).then(obj => {
        const json = JSON.stringify(obj);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Save${slotId}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert("Save file exported!");
      }).catch(() => {
        alert("No save file found in that slot.");
      });
    };
  
    window.importSaveFile = function (slotId = 1) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
  
        const reader = new FileReader();
        reader.onload = event => {
          const contents = event.target.result;
          try {
            const obj = JSON.parse(contents);
            StorageManager.saveObject(slotId, obj).then(() => {
              alert("Save file imported!");
            });
          } catch (e) {
            alert("Invalid file format.");
          }
        };
        reader.readAsText(file);
      };
      input.click();
    };
  })();
  