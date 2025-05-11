/*:
 * @target MZ
 * @plugindesc Shows censored CGs in the gallery unless a specific switch (PREMIUM) is ON. Integrates with VisuStella CG Gallery. @Łukasz
 * @author Łukasz & ChatGPT
 *
 * @param PremiumSwitchId
 * @text Premium Switch ID
 * @type switch
 * @desc The switch ID used to check if censorship should be disabled.
 * @default 20
 *
 * @help
 * ============================================================================
 * Description
 * ============================================================================
 * This plugin replaces CG images with censored versions (same name + _CENSORED)
 * unless the specified "PREMIUM" switch is ON.
 * 
 * For example, if your CG filename is "cg_001", the plugin will attempt to load
 * "cg_001_CENSORED" instead — unless the PREMIUM switch is ON.
 *
 * ============================================================================
 * Setup
 * ============================================================================
 * 1. Set the Premium Switch ID in the plugin parameters (e.g., switch #20).
 * 2. In the VisuStella CG Gallery plugin manager entries, use the regular image
 *    filenames like "cg_001", "cg_scene1", etc.
 * 3. For each of these images, create a corresponding censored version with the
 *    same name + "_CENSORED" suffix (e.g., "cg_001_CENSORED").
 * 4. Place all images in the img/pictures/ folder.
 */

(() => {
  const parameters = PluginManager.parameters("CensorshipForCGGallery");
  const premiumSwitchId = Number(parameters["PremiumSwitchId"] || 20);

  const _Scene_CG_Gallery_prototype_loadCGImage = Scene_CG_Gallery.prototype.loadCGImage;
  Scene_CG_Gallery.prototype.loadCGImage = function(filename) {
    const censored = !$gameSwitches.value(premiumSwitchId);
    const baseName = censored ? filename + "_CENSORED" : filename;
    _Scene_CG_Gallery_prototype_loadCGImage.call(this, baseName);
  };
})();