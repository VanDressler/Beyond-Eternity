/*:
 * @target MZ
 * @plugindesc 🔄 Dynamiczne cenzurowanie obrazków w CG Gallery zależne od switcha Premium.
 * @author Code
 *
 * @param PremiumSwitchId
 * @type switch
 * @desc Switch odpowiedzialny za Premium (ON = pełne, OFF = cenzura)
 *
 * @param ImagePairs
 * @type struct<ImageMap>[]
 * @desc Lista par obrazków (pełna / ocenzurowana)
 * @default []
 */

/*~struct~ImageMap:
 * @param original
 * @type file
 * @dir img/pictures
 * @desc Nazwa pełnego obrazka (np. 28)
 *
 * @param censored
 * @type file
 * @dir img/pictures
 * @desc Nazwa ocenzurowanego obrazka (np. 28_censored)
 */

(() => {
    const pluginName = "PremiumGallery";
    const params = PluginManager.parameters(pluginName);
    const premiumSwitch = Number(params["PremiumSwitchId"] || 0);
    const rawPairs = JSON.parse(params["ImagePairs"] || "[]");
  
    const imageMap = {};
    rawPairs.forEach((pairStr) => {
      const pair = JSON.parse(pairStr);
      imageMap[pair.original] = {
        full: pair.original,
        censored: pair.censored,
      };
    });
  
    const resolveImage = (filename) => {
      const pair = imageMap[filename];
      const isPremium = $gameSwitches.value(premiumSwitch);
      if (pair) {
        const chosen = isPremium ? pair.full : pair.censored;
        console.log(`[CENSOR] ${filename} -> ${chosen} | Premium: ${isPremium}`);
        return chosen;
      }
      return filename;
    };
  
    // Override VisuStella Gallery image loader
    if (VisuMZ && VisuMZ.CGGallery && VisuMZ.CGGallery.getImageBitmap) {
      const _original = VisuMZ.CGGallery.getImageBitmap;
      VisuMZ.CGGallery.getImageBitmap = function (fileName) {
        const resolved = resolveImage(fileName);
        return _original.call(this, resolved);
      };
    }
  
    // Override Show Picture for in-game events
    const _showPicture = Game_Screen.prototype.showPicture;
    Game_Screen.prototype.showPicture = function (
      pictureId,
      name,
      origin,
      x,
      y,
      scaleX,
      scaleY,
      opacity,
      blendMode
    ) {
      const resolved = resolveImage(name);
      _showPicture.call(this, pictureId, resolved, origin, x, y, scaleX, scaleY, opacity, blendMode);
    };
  })();
  