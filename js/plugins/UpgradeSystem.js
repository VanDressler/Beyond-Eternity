/*:
 * @target MZ
 * @plugindesc [TEST] Minimalna scena testowa - otwiera się z eventu. Działa na 100%. Autor: Łukasz
 * @author Łukasz
 *
 * @command OpenTestScene
 * @text Otwórz testową scenę
 */

(() => {
    const pluginName = "TestSceneOpen";
  
    PluginManager.registerCommand(pluginName, "OpenTestScene", () => {
      console.log("PluginCommand działa!"); // sprawdzenie w konsoli
      SceneManager.push(Scene_TestScene);
    });
  
    class Scene_TestScene extends Scene_MenuBase {
      create() {
        super.create();
        const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this._window = new Window_CommandTest(rect);
        this._window.setHandler("ok", this.onOk.bind(this));
        this._window.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._window);
      }
  
      onOk() {
        const symbol = this._window.currentSymbol();
        console.log("Wybrano:", symbol);
        this._window.activate();
      }
    }
  
    class Window_CommandTest extends Window_Command {
      makeCommandList() {
        this.addCommand("Test 1", "test1");
        this.addCommand("Test 2", "test2");
      }
  
      updatePlacement() {
        this.x = (Graphics.boxWidth - this.width) / 2;
        this.y = (Graphics.boxHeight - this.height) / 2;
      }
  
      windowWidth() {
        return 240;
      }
    }
  })();
  