//=============================================================================
// VisuStella MZ - Multi-Layer HP Gauge
// VisuMZ_4_MultiLayerHpGauge.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_MultiLayerHpGauge = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MultiLayerHpGauge = VisuMZ.MultiLayerHpGauge || {};
VisuMZ.MultiLayerHpGauge.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.05] [MultiLayerHpGauge]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Multi-Layer_HP_Gauge_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Want to give certain enemies some more significance than others? Like giving
 * them a giant Multi-Layer HP Gauge spread across the top of the screen in a
 * super imposing type of fashion? This plugin will do just that! Multi-Layer
 * HP Gauges can contain upwards of 10 layers while displaying all of their
 * states in a spread out fashion. Your players will know this enemy is a boss
 * that means business.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Designate which database enemies will have their HP Gauges put on display
 *   at the top of the screen to indicate their importance.
 * * These HP gauges can have multiple layers of health bars to make for a
 *   better representation of how tanky they are.
 * * Control the colors associated with each HP Gauge layer to allow for better
 *   distinctions on how close the player is to defeating the enemy.
 * * Up to a total of 10 different HP Gauge Layers can be used with different
 *   color settings for each layer.
 * * Adds states to be displayed in wide form in order to display more than
 *   the current style of rotating states.
 * * Lots of extra features with other VisuStella plugins if they are installed
 *   together with this plugin.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Battle Log Position Shift
 * 
 * The Battle Log is usually displayed at the top of the screen. This plugin
 * will shift the Battle Log down by a specified amount depending on the number
 * of Multi-Layer HP Gauges are displayed on screen at a time. You can adjust
 * the amount the shift occurs. If you want to disable this, change the shift
 * amount to 0.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_3_StateTooltips
 *
 * If VisuStella MZ's State Tooltips plugin is installed, players can also view
 * state tooltips when hovering the mouse over the respective Multi-Layer HP
 * Gauge sheets.
 *
 * ---
 *
 * VisuMZ_3_VisualGaugeStyles
 *
 * If VisuStella MZ's Visual Gauge Styles plugin is installed, you can apply
 * gauge styles to the Multi-Layer HP Gauges for this plugin.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * To reduce redundancy, there are options to remove the HP Gauges if an enemy
 * already has a dedicated Multi-Layer HP Gauge shown at the top of the screen.
 * Likewise, the same is done for state icons.
 * 
 * If you don't want these UI elements removed, you can disable this change by
 * altering the respective Plugin Parameters.
 * 
 * ---
 * 
 * VisuMZ's Battle Systems
 * 
 * Since the position of the Multi-Layer HP Gauge will most likely overlap with
 * any turn order or action count UI elements at the top of the screen, this
 * plugin provides the option to offset them via how many Multi-Layer HP Gauge
 * rows are present.
 * 
 * ---
 * 
 * VisuMZ_4_BreakShields
 * 
 * As Break Shields can be displayed in part with the state icons, the reduced
 * redundancy Plugin Parameters allow the UI elements to be removed as to not
 * clutter upt he screen too much.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Enemy-Related Notetags ===
 * 
 * ---
 *
 * <Show Multi-Layer HP Gauge>
 * <Hide Multi-Layer HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Determines if the enemy will have the Multi-Layer HP Gauge visible or not
 *   and bypasses the default setting found in the Plugin Parameters.
 * - Keep in mind that using any of the other notetags found below will also
 *   prompt the Multi-Layer HP Gauge to 'Show'. This makes the 'Show' notetag a
 *   bit redundant but it is there for those who want extra clarity in their
 *   note boxes.
 *
 * ---
 *
 * <Multi-Layer HP Gauge Persist>
 * <Multi-Layer HP Gauge Temporal>
 *
 * - Used for: Enemy Notetags
 * - Determines if the Multi-Layer HP Gauge is persistant or temporal and will
 *   bypass the default settings found in the Plugin Parameters.
 * - When 'Persist' is used, the Multi-Layer HP Gauge will stay visible even
 *   after the enemy tied to it has died in combat.
 * - When 'Temporal' is used, the Multi-Layer HP Gauge will vanish after the
 *   enemy tied to it has died in combat, although it will reappear if it is
 *   revived later.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 *
 * ---
 *
 * <Multi-Layer HP Gauge Layers: x>
 *
 * - Used for: Enemy Notetags
 * - Sets the total number of layers used for the enemy as 'x' layers.
 * - Replace 'x' with a number representing a number between 1 and 10 as the
 *   total number of layers used.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 *
 * ---
 *
 * <Multi-Layer HP Gauge Face: filename, index>
 * <Multi-Layer HP Gauge Graphic: filename, index>
 * <Multi-Layer HP Gauge Face Graphic: filename, index>
 *
 * - Used for: Enemy Notetags
 * - Changes the graphic used by the enemy to this face graphic.
 * - Replace 'filename' with the name of the image file to pick from the game
 *   project's /img/faces/ folder.
 *   - Filenames are case sensitive.
 *   - Leave out the filename extension from the notetag.
 * - Replace 'index' with a number representing the face graphic cell used.
 *   - Index values start at 0.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 *
 * ---
 *
 * <Multi-Layer HP Gauge BgColor: color1>
 * <Multi-Layer HP Gauge BG Color: color1>
 * <Multi-Layer HP Gauge Background Color: color1>
 * 
 * <Multi-Layer HP Gauge BgColor: color1, color2>
 * <Multi-Layer HP Gauge BG Color: color1, color2>
 * <Multi-Layer HP Gauge Background Color: color1, color2>
 *
 * - Used for: Enemy Notetags
 * - Adjusts the background color(s) used for the enemy graphic.
 * - Replace 'color1' and/or 'color2' with either a number from 0 to 31
 *   representing the text color or in the format of '#rrggbb' to custom pick a
 *   hex color.
 * - If two colors are used, a vertical gradient will form.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 * 
 * EXAMPLES:
 * 
 *   <Multi-Layer HP Gauge BgColor: 2>
 *   <Multi-Layer HP Gauge BgColor: #ff0000>
 *   <Multi-Layer HP Gauge BgColor: 2, 18>
 *   <Multi-Layer HP Gauge BgColor: #ff0000, #000000>
 *
 * ---
 *
 * <Multi-Layer HP Gauge Border Color: color>
 *
 * - Used for: Enemy Notetags
 * - Adjusts the border color used for the enemy graphic.
 * - Replace 'color' with either a number from 0 to 31 representing the text
 *   color or in the format of '#rrggbb' to custom pick a hex color.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 * 
 * EXAMPLES:
 * 
 *   <Multi-Layer HP Gauge Border Color: 2>
 *   <Multi-Layer HP Gauge Border Color: #ff0000>
 *
 * ---
 *
 * <Multi-Layer HP Gauge Border Size: x>
 * <Multi-Layer HP Gauge Border Thick: x>
 * <Multi-Layer HP Gauge Border Thickness: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the thickness of the color section of the border.
 * - Replace 'x' with a number representing how thick the color section of the
 *   border is in pixels.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Adjust the general settings for the Multi-Layer HP Gauge.
 *
 * ---
 *
 * Screen
 * 
 *   Max Width:
 *   - What is the max screen area that is taken up by Multi-Layer HP Gauges?
 * 
 *   Gauges Per Row:
 *   - How many gauges are displayed per row?
 *   - When the quantity exceeds this number, start a new row.
 * 
 *   Row Spacing:
 *   - How many pixels are used inbetween rows to space out the stacked
 *     Multi-Layer HP Gauges?
 * 
 *   Mid-Battle Fade Speed:
 *   - How fast should the gauges fade out mid-battle?
 *   - Lower numbers are slower. Higher numbers are faster.
 * 
 *   End Battle Fade Speed:
 *   - How fast should the gauges fade out on ending battle?
 *   - Lower numbers are slower. Higher numbers are faster.
 *
 * ---
 *
 * Properties
 * 
 *   Buffer X:
 *   - What is the minimum pixel distance between individual parts?
 * 
 *   Enable State Tooltips:
 *   - Enables state tooltips when hovered over?
 *   - Requires VisuMZ_3_StateTooltips!
 * 
 *   Graphic Size:
 *   - What is the standard pixel size for the enemy graphic?
 *   - This value is also used to adjust individual part positions.
 * 
 *   Reposition for Help?:
 *   - Reposition the gauges when the Help Window is open?
 * 
 *     Reposition Y:
 *     - How many pixels to offset the gauge reposition?
 *     - Negative: up. Positive: down.
 * 
 *   Update Frequency:
 *   - How many frames of wait should there be before updating the individual
 *     Multi-Layer HP Gauges?
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - How many pixels to offset the whole gauge's X?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - How many pixels to offset the whole gauge's Y?
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Battle Log
 * 
 *   Reposition Window?:
 *   - Repositions the battle log window to make room for the
 *     Multi-Layer HP Gauge?
 * 
 *   Per Row Offset Y:
 *   - Offset Battle Log's Y by this amount per row?
 *   - Negative: up. Positive: down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * These are the default values used for this plugin. These settings can be
 * individually changed via notetags.
 *
 * ---
 *
 * General
 * 
 *   Show Gauge?:
 *   - Show Multi-Layer HP Gauges for each enemy by default?
 * 
 *   Persistant Gauges?:
 *   - Are Multi-Layer HP Gauges persistant by default?
 *   - Persistant means they remain after the enemy dies.
 * 
 *   Default Layers:
 *   - How many layers are used by default when an enemy has a
 *     Multi-Layer HP Gauge in effect?
 *
 * ---
 *
 * Graphic
 * 
 *   Background Color 1:
 *   Background Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Border Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Border Thickness:
 *   - What is the thickness of the colored band for the enemy
 *     graphic's border?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Graphic Settings
 * ============================================================================
 *
 * Adjust the settings for the Enemy Graphic part of the Multi-Layer HP Gauge.
 *
 * ---
 *
 * General
 * 
 *   Show Enemy Graphic?:
 *   - Show the "Graphic" part of the Multi-Layer HP Gauge?
 *   - This displays the enemy graphic.
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the graphic?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Adjust the settings for the HP Gauge part of the Multi-Layer HP Gauge.
 *
 * ---
 *
 * General
 * 
 *   Show Gauge?:
 *   - Show the "Gauge" part of the Multi-Layer HP Gauge?
 *   - I mean, why wouldn't you?
 *   - That's why you got this plugin.
 * 
 *   Gauge Height:
 *   - What is the height of the gauge in pixels?
 *   - Minimum: 1. Maximum: 32.
 * 
 *   Style Name:
 *   - Select the gauge style to use for the gauge.
 *   - Requires VisuMZ_3_VisualGaugeStyles!
 *
 * ---
 *
 * Vocabulary
 * 
 *   Value Format:
 *   - Text format used for the gauge value text.
 *   - %1 - Current Value, %2 - Max Value, %3 - Percentage
 * 
 *   Decimal Places:
 *   - How many decimal places should the percent digits go if they're used
 *     for the value?
 * 
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - How many pixels to offset the gauge part's X?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - How many pixels to offset the gauge part's Y?
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Layer Color Settings
 * ============================================================================
 *
 * Adjust what colors are used for each gauge layer.
 * 
 * Layer 1 uses default HP Gauge Colors.
 *
 * ---
 *
 * Layer 2-10 Sets
 * 
 *   Color 1:
 *   Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: States Settings
 * ============================================================================
 *
 * Adjust the settings for the states part of the Multi-Layer HP Gauge.
 *
 * ---
 *
 * General
 * 
 *   Show States?:
 *   - Show the "States" part of the Multi-Layer HP Gauge?
 *   - If off, hides all states, buffs, and Break Shields.
 * 
 *   Show Break Shields?:
 *   - Add Break Shields to the list of visible objects?
 *   - Requires VisuMZ_4_BreakShields!
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - How many pixels to offset the states part's X?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - How many pixels to offset the states part's Y?
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Compatibility Settings
 * ============================================================================
 *
 * Adjust compatibility settings with other plugins.
 *
 * ---
 *
 * Battler-Related > Reduced Redundancy
 * 
 *   Break Shields:
 *   - Removes enemy battler Break Shields if redundant.
 *   - Requires VisuMZ_4_BreakShields!
 * 
 *   HP Gauge:
 *   - Removes enemy battler HP Gauges if redundant.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   State Icons:
 *   - Removes enemy battler state icons if redundant.
 *
 * ---
 *
 * Battle Data Offset > Battle Systems
 * 
 *   Each Row Offset Y:
 *   - Offset Y position by this for each row.
 *   - Negative: up. Positive: down.
 * 
 *   Closed Help Offset Y:
 *   - Offset Y position when help window is closed.
 *   - Negative: up. Positive: down.
 * 
 *   Open Help Offset Y:
 *   - Offset Y position when help window is open.
 *   - Negative: up. Positive: down.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Arisu
 * * Olivia
 * * Irina
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.05: October 17, 2024
 * * Compatibility Update!
 * ** Added better compatibility with In-Battle Status feature for Battle Core
 *    as to not cover up the window.
 * 
 * Version 1.04: September 14, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.03: July 13, 2023
 * * Bug Fixes!
 * ** Fixed an incompatibility with Visual State Effects that would prevent the
 *    state overlays on enemies from appearing. Fix made by Irina.
 * 
 * Version 1.02: May 18, 2023
 * * Bug Fixes!
 * ** When an enemy transforms into another with a Multi-Layer HP Gauge, it
 *    will be updated and shown. Fix made by Olivia.
 * 
 * Version 1.01: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash if the VisuMZ Core Engine wasn't
 *    installed. Fix made by Olivia.
 * 
 * Version 1.00 Official Release Date: April 7, 2023
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MultiLayerHpGauge
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc Adjust the general settings for the Multi-Layer HP Gauge.
 * @default {"Screen":"","maxWidth:num":"816","perRow:num":"4","rowSpacing:num":"4","endBattleFadeSpeed:num":"24","Properties":"","bufferX:num":"4","stateTooltipsEnable:eval":"true","faceSize:num":"64","midFadeSpeed:num":"16","repositionForHelp:eval":"true","repositionHelpY:num":"+108","checkFrequency:num":"20","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Window_BattleLog":"","repositionBattleLog:eval":"true","battleLogPerRowOffsetY:num":"+64"}
 *
 * @param Defaults:struct
 * @text Default Settings
 * @type struct<Defaults>
 * @desc These are the default values used for this plugin.
 * These settings can be individually changed via notetags.
 * @default {"General":"","showDefault:eval":"false","persist:eval":"true","defaultLayers:num":"1","Graphic":"","bgColor1:str":"19","bgColor2:str":"18","borderColor:str":"2","borderthickness:num":"2"}
 * 
 * @param Parts
 * @text Multi-Layer HP Gauge Parts
 * 
 * @param Graphic:struct
 * @text Enemy Graphic Settings
 * @parent Parts
 * @type struct<Graphic>
 * @desc Adjust the settings for the Enemy Graphic part of the
 * Multi-Layer HP Gauge.
 * @default {"show:eval":"true","drawLetter:eval":"true","letterFontName:str":"","letterFontSize:num":"16"}
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Parts
 * @type struct<Gauge>
 * @desc Adjust the settings for the HP Gauge part of the
 * Multi-Layer HP Gauge.
 * @default {"General":"","show:eval":"true","gaugeHeight:num":"24","styleName:str":"Lean","Vocab":"","valueFmt:str":"%3%","valuePercentDigits:num":"2","Offset":"","offsetX:num":"+0","offsetY:num":"+4"}
 *
 * @param LayerColors:struct
 * @text Layer Color Settings
 * @parent Gauge:struct
 * @type struct<LayerColors>
 * @desc Adjust what colors are used for each gauge layer.
 * Layer 1 uses default HP Gauge Colors.
 * @default {"Layer2":"","layer2_color1:str":"#fff200","layer2_color2:str":"#fff799","Layer3":"","layer3_color1:str":"#39b54a","layer3_color2:str":"#7cc576","Layer4":"","layer4_color1:str":"#00a99d","layer4_color2:str":"#7accc8","Layer5":"","layer5_color1:str":"#00aeef","layer5_color2:str":"#6dcff6","Layer6":"","layer6_color1:str":"#0054a6","layer6_color2:str":"#8393ca","Layer7":"","layer7_color1:str":"#2e3192","layer7_color2:str":"#605ca8","Layer8":"","layer8_color1:str":"#662d91","layer8_color2:str":"#a186be","Layer9":"","layer9_color1:str":"#f06eaa","layer9_color2:str":"#ffdeec","Layer10":"","layer10_color1:str":"#ed1c24","layer10_color2:str":"#f26c4f"}
 *
 * @param States:struct
 * @text States Settings
 * @parent Parts
 * @type struct<States>
 * @desc Adjust the settings for the states part of the
 * Multi-Layer HP Gauge.
 * @default {"General":"","show:eval":"true","breakShields:eval":"true","Offset":"","offsetX:num":"+0","offsetY:num":"+28"}
 *
 * @param Compatibility:struct
 * @text Compatibility Settings
 * @type struct<Compatibility>
 * @desc Adjust compatibility settings with other plugins.
 * @default {"Battler":"","ReduceRed":"","reduceRedundantBreakShield:eval":"true","reduceRedundantHpGauge:eval":"true","reduceRedundantStateIcon:eval":"true","GaugeOffset":"","BattleSysAtb":"","atbEachRowOffsetY:num":"+64","atbNormalOffsetY:num":"+24","atbHelpOffsetY:num":"+12","BattleSysBtb":"","btbEachRowOffsetY:num":"+64","btbNormalOffsetY:num":"+0","btbHelpOffsetY:num":"+12","BattleSysCtb":"","ctbEachRowOffsetY:num":"+64","ctbNormalOffsetY:num":"+0","ctbHelpOffsetY:num":"+12","BattleSysEtb":"","etbEachRowOffsetY:num":"+64","etbNormalOffsetY:num":"+0","etbHelpOffsetY:num":"-56","BattleSysFtb":"","ftbEachRowOffsetY:num":"+64","ftbNormalOffsetY:num":"+0","ftbHelpOffsetY:num":"-56","BattleSysOtb":"","otbEachRowOffsetY:num":"+64","otbNormalOffsetY:num":"-6","otbHelpOffsetY:num":"-12","BattleSysPtb":"","ptbEachRowOffsetY:num":"+64","ptbNormalOffsetY:num":"+0","ptbHelpOffsetY:num":"-56","BattleSysStb":"","stbEachRowOffsetY:num":"+64","stbNormalOffsetY:num":"+0","stbHelpOffsetY:num":"+12"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Screen
 *
 * @param maxWidth:num
 * @text Max Width
 * @parent Screen
 * @min 1
 * @desc What is the max screen area that is taken up by Multi-Layer HP Gauges?
 * @default 816
 *
 * @param perRow:num
 * @text Gauges Per Row
 * @parent Screen
 * @min 1
 * @desc How many gauges are displayed per row?
 * When the quantity exceeds this number, start a new row.
 * @default 4
 *
 * @param rowSpacing:num
 * @text Row Spacing
 * @parent Screen
 * @min 0
 * @desc How many pixels are used inbetween rows to space out
 * the stacked Multi-Layer HP Gauges?
 * @default 4
 *
 * @param midFadeSpeed:num
 * @text Mid-Battle Fade Speed
 * @parent Screen
 * @min 1
 * @desc How fast should the gauges fade out mid-battle?
 * Lower numbers are slower. Higher numbers are faster.
 * @default 16
 *
 * @param endBattleFadeSpeed:num
 * @text End Battle Fade Speed
 * @parent Screen
 * @min 1
 * @desc How fast should the gauges fade out on ending battle?
 * Lower numbers are slower. Higher numbers are faster.
 * @default 24
 *
 * @param Properties
 *
 * @param bufferX:num
 * @text Buffer X
 * @parent Properties
 * @min 0
 * @desc What is the minimum pixel distance between individual parts?
 * @default 4
 *
 * @param stateTooltipsEnable:eval
 * @text Enable State Tooltips
 * @parent Properties
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables state tooltips when hovered over?
 * Requires VisuMZ_3_StateTooltips!
 * @default true
 *
 * @param faceSize:num
 * @text Graphic Size
 * @parent Properties
 * @min 1
 * @desc What is the standard pixel size for the enemy graphic?
 * This value is also used to adjust individual part positions.
 * @default 64
 *
 * @param repositionForHelp:eval
 * @text Reposition for Help?
 * @parent Properties
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc Reposition the gauges when the Help Window is open?
 * @default true
 *
 * @param repositionHelpY:num
 * @text Reposition Y
 * @parent repositionForHelp:eval
 * @desc How many pixels to offset the gauge reposition?
 * Negative: up. Positive: down.
 * @default +108
 *
 * @param checkFrequency:num
 * @text Update Frequency
 * @parent Properties
 * @min 1
 * @desc How many frames of wait should there be before updating
 * the individual Multi-Layer HP Gauges?
 * @default 20
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc How many pixels to offset the whole gauge's X?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc How many pixels to offset the whole gauge's Y?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Window_BattleLog
 * @text Battle Log
 *
 * @param repositionBattleLog:eval
 * @text Reposition Window?
 * @parent Window_BattleLog
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Repositions the battle log window to make room for
 * the Multi-Layer HP Gauge?
 * @default true
 *
 * @param battleLogPerRowOffsetY:num
 * @text Per Row Offset Y
 * @parent Window_BattleLog
 * @desc Offset Battle Log's Y by this amount per row?
 * Negative: up. Positive: down.
 * @default +64
 *
 */
/* ----------------------------------------------------------------------------
 * Defaults Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Defaults:
 * 
 * @param General
 *
 * @param showDefault:eval
 * @text Show Gauge?
 * @parent General
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show Multi-Layer HP Gauges for each enemy by default?
 * @default false
 *
 * @param persist:eval
 * @text Persistant Gauges?
 * @parent General
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Are Multi-Layer HP Gauges persistant by default?
 * Persistant means they remain after the enemy dies.
 * @default true
 *
 * @param defaultLayers:num
 * @text Default Layers
 * @parent General
 * @type number
 * @min 1
 * @max 10
 * @desc How many layers are used by default when an enemy has
 * a Multi-Layer HP Gauge in effect?
 * @default 1
 * 
 * @param Graphic
 *
 * @param bgColor1:str
 * @text Background Color 1
 * @parent Graphic
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param bgColor2:str
 * @text Background Color 2
 * @parent Graphic
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param borderColor:str
 * @text Border Color
 * @parent Graphic
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param borderthickness:num
 * @text Border Thickness
 * @parent Graphic
 * @type number
 * @min 1
 * @desc What is the thickness of the colored band for the enemy
 * graphic's border?
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Graphic Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Graphic:
 *
 * @param show:eval
 * @text Show Enemy Graphic?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the "Graphic" part of the Multi-Layer HP Gauge?
 * This displays the enemy graphic.
 * @default true
 *
 * @param drawLetter:eval
 * @text Show Enemy Letter?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the graphic?
 * @default true
 *
 * @param letterFontName:str
 * @text Font Name
 * @parent drawLetter:eval
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param letterFontSize:num
 * @text Font Size
 * @parent drawLetter:eval
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Gauge?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the "Gauge" part of the Multi-Layer HP Gauge?
 * I mean, why wouldn't you? That's why you got this plugin.
 * @default true
 *
 * @param gaugeHeight:num
 * @text Gauge Height
 * @parent General
 * @type number
 * @min 1
 * @max 32
 * @desc What is the height of the gauge in pixels?
 * Minimum: 1. Maximum: 32.
 * @default 24
 * 
 * @param styleName:str
 * @text Style Name
 * @parent General
 * @type select
 * @option -
 * @option Normal
 * @option -
 * @option Arrow
 * @option Dipper
 * @option Flag
 * @option Growth
 * @option Lean
 * @option Quad
 * @option Stagger
 * @option Trapezoid
 * @option -
 * @option HalfStep
 * @option ThirdStep
 * @option FourthStep
 * @option FifthStep
 * @option SixthStep
 * @option EighthStep
 * @option TenthStep
 * @option -
 * @option HalfSection
 * @option ThirdSection
 * @option FourthSection
 * @option FifthSection
 * @option SixthSection
 * @option EighthSection
 * @option TenthSection
 * @option -
 * @option SegmentBy10
 * @option SegmentBy20
 * @option SegmentBy25
 * @option SegmentBy50
 * @option SegmentBy100
 * @option SegmentBy200
 * @option SegmentBy250
 * @option SegmentBy500
 * @option SegmentBy1000
 * @option -
 * @desc Select the gauge style to use for the gauge.
 * Requires VisuMZ_3_VisualGaugeStyles!
 * @default Lean
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param valueFmt:str
 * @text Value Format
 * @parent Vocab
 * @desc Text format used for the gauge value text.
 * %1 - Current Value, %2 - Max Value, %3 - Percentage
 * @default %3%
 *
 * @param valuePercentDigits:num
 * @text Decimal Places
 * @parent Vocab
 * @type number
 * @desc How many decimal places should the percent digits
 * go if they're used for the value?
 * @default 2
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc How many pixels to offset the gauge part's X?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc How many pixels to offset the gauge part's Y?
 * Negative: up. Positive: down.
 * @default +4
 *
 */
/* ----------------------------------------------------------------------------
 * States Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param show:eval
 * @text Show States?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the "States" part of the Multi-Layer HP Gauge?
 * If off, hides all states, buffs, and Break Shields.
 * @default true
 *
 * @param breakShields:eval
 * @text Show Break Shields?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add Break Shields to the list of visible objects?
 * Requires VisuMZ_4_BreakShields!
 * @default true
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc How many pixels to offset the states part's X?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc How many pixels to offset the states part's Y?
 * Negative: up. Positive: down.
 * @default +28
 *
 */
/* ----------------------------------------------------------------------------
 * Layer Colors Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LayerColors:
 *
 * @param Layer2
 * @text Layer 2 Set
 *
 * @param layer2_color1:str
 * @text Color 1
 * @parent Layer2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #fff200
 *
 * @param layer2_color2:str
 * @text Color 2
 * @parent Layer2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #fff799
 *
 * @param Layer3
 * @text Layer 3 Set
 *
 * @param layer3_color1:str
 * @text Color 1
 * @parent Layer3
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #39b54a
 *
 * @param layer3_color2:str
 * @text Color 2
 * @parent Layer3
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #7cc576
 *
 * @param Layer4
 * @text Layer 4 Set
 *
 * @param layer4_color1:str
 * @text Color 1
 * @parent Layer4
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #00a99d
 *
 * @param layer4_color2:str
 * @text Color 2
 * @parent Layer4
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #7accc8
 *
 * @param Layer5
 * @text Layer 5 Set
 *
 * @param layer5_color1:str
 * @text Color 1
 * @parent Layer5
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #00aeef
 *
 * @param layer5_color2:str
 * @text Color 2
 * @parent Layer5
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #6dcff6
 *
 * @param Layer6
 * @text Layer 6 Set
 *
 * @param layer6_color1:str
 * @text Color 1
 * @parent Layer6
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #0054a6
 *
 * @param layer6_color2:str
 * @text Color 2
 * @parent Layer6
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #8393ca
 *
 * @param Layer7
 * @text Layer 7 Set
 *
 * @param layer7_color1:str
 * @text Color 1
 * @parent Layer7
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2e3192
 *
 * @param layer7_color2:str
 * @text Color 2
 * @parent Layer7
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #605ca8
 *
 * @param Layer8
 * @text Layer 8 Set
 *
 * @param layer8_color1:str
 * @text Color 1
 * @parent Layer8
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #662d91
 *
 * @param layer8_color2:str
 * @text Color 2
 * @parent Layer8
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #a186be
 *
 * @param Layer9
 * @text Layer 9 Set
 *
 * @param layer9_color1:str
 * @text Color 1
 * @parent Layer9
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f06eaa
 *
 * @param layer9_color2:str
 * @text Color 2
 * @parent Layer9
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffdeec
 *
 * @param Layer10
 * @text Layer 10 Set
 *
 * @param layer10_color1:str
 * @text Color 1
 * @parent Layer10
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ed1c24
 *
 * @param layer10_color2:str
 * @text Color 2
 * @parent Layer10
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f26c4f
 *
 */
/* ----------------------------------------------------------------------------
 * Compatibility Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Compatibility:
 *
 * @param Battler
 * @text Battler-Related
 * 
 * @param ReduceRed
 * @text Reduced Redundancy
 * @parent Battler
 *
 * @param reduceRedundantBreakShield:eval
 * @text Break Shields
 * @parent ReduceRed
 * @type boolean
 * @on Reduce
 * @off Keep
 * @desc Removes enemy battler Break Shields if redundant.
 * Requires VisuMZ_4_BreakShields!
 * @default true
 *
 * @param reduceRedundantHpGauge:eval
 * @text HP Gauge
 * @parent ReduceRed
 * @type boolean
 * @on Reduce
 * @off Keep
 * @desc Removes enemy battler HP Gauges if redundant.
 * Requires VisuMZ_1_BattleCore!
 * @default true
 *
 * @param reduceRedundantStateIcon:eval
 * @text State Icons
 * @parent ReduceRed
 * @type boolean
 * @on Reduce
 * @off Keep
 * @desc Removes enemy battler state icons if redundant.
 * @default true
 * 
 * @param BattleDataOffset
 * @text Battle Data Offset
 *
 * @param BattleSysAtb
 * @text Battle System - ATB
 * @parent BattleDataOffset
 *
 * @param atbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysAtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param atbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysAtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +24
 *
 * @param atbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysAtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default +12
 *
 * @param BattleSysBtb
 * @text Battle System - BTB
 * @parent GaugeOffset
 *
 * @param btbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysBtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param btbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysBtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param btbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysBtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default +12
 *
 * @param BattleSysCtb
 * @text Battle System - CTB
 * @parent GaugeOffset
 *
 * @param ctbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysCtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param ctbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysCtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param ctbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysCtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default +12
 *
 * @param BattleSysEtb
 * @text Battle System - ETB
 * @parent GaugeOffset
 *
 * @param etbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysEtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param etbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysEtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param etbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysEtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default -56
 *
 * @param BattleSysFtb
 * @text Battle System - FTB
 * @parent GaugeOffset
 *
 * @param ftbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysFtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param ftbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysFtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param ftbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysFtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default -56
 *
 * @param BattleSysOtb
 * @text Battle System - OTB
 * @parent GaugeOffset
 *
 * @param otbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysOtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param otbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysOtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param otbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysOtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default -12
 *
 * @param BattleSysPtb
 * @text Battle System - PTB
 * @parent GaugeOffset
 *
 * @param ptbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysPtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param ptbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysPtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param ptbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysPtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default -56
 *
 * @param BattleSysStb
 * @text Battle System - STB
 * @parent GaugeOffset
 *
 * @param stbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysStb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param stbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysStb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param stbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysStb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default +12
 *
 */
//=============================================================================

const _0x134d3c=_0x588f;(function(_0x4bc696,_0x32c12a){const _0x4aaa92=_0x588f,_0x66adea=_0x4bc696();while(!![]){try{const _0x54ff5d=-parseInt(_0x4aaa92(0x35e))/0x1*(parseInt(_0x4aaa92(0x279))/0x2)+parseInt(_0x4aaa92(0x264))/0x3+parseInt(_0x4aaa92(0x2eb))/0x4+parseInt(_0x4aaa92(0x2f6))/0x5+parseInt(_0x4aaa92(0x376))/0x6*(parseInt(_0x4aaa92(0x2a4))/0x7)+parseInt(_0x4aaa92(0x244))/0x8*(-parseInt(_0x4aaa92(0x27e))/0x9)+parseInt(_0x4aaa92(0x1fc))/0xa;if(_0x54ff5d===_0x32c12a)break;else _0x66adea['push'](_0x66adea['shift']());}catch(_0x5cd2d4){_0x66adea['push'](_0x66adea['shift']());}}}(_0x5355,0xbba9d));function _0x588f(_0x1463ee,_0x5de6c6){const _0x5355cc=_0x5355();return _0x588f=function(_0x588fc4,_0x585b1b){_0x588fc4=_0x588fc4-0x1ac;let _0x35f203=_0x5355cc[_0x588fc4];return _0x35f203;},_0x588f(_0x1463ee,_0x5de6c6);}var label='MultiLayerHpGauge',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x134d3c(0x324)](function(_0x23144f){const _0x143b1c=_0x134d3c;return _0x23144f[_0x143b1c(0x25e)]&&_0x23144f['description'][_0x143b1c(0x20a)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x134d3c(0x355)]||{},VisuMZ['ConvertParams']=function(_0x5d0f50,_0x62a194){const _0x5bedbc=_0x134d3c;for(const _0x14dff5 in _0x62a194){if(_0x14dff5[_0x5bedbc(0x321)](/(.*):(.*)/i)){const _0x2a7c7a=String(RegExp['$1']),_0x3dd3fa=String(RegExp['$2'])[_0x5bedbc(0x313)]()[_0x5bedbc(0x2cb)]();let _0x37f17a,_0x92086d,_0x17dfe8;switch(_0x3dd3fa){case'NUM':_0x37f17a=_0x62a194[_0x14dff5]!==''?Number(_0x62a194[_0x14dff5]):0x0;break;case'ARRAYNUM':_0x92086d=_0x62a194[_0x14dff5]!==''?JSON[_0x5bedbc(0x1cc)](_0x62a194[_0x14dff5]):[],_0x37f17a=_0x92086d[_0x5bedbc(0x2b2)](_0x2e7f6b=>Number(_0x2e7f6b));break;case _0x5bedbc(0x290):_0x37f17a=_0x62a194[_0x14dff5]!==''?eval(_0x62a194[_0x14dff5]):null;break;case _0x5bedbc(0x36f):_0x92086d=_0x62a194[_0x14dff5]!==''?JSON[_0x5bedbc(0x1cc)](_0x62a194[_0x14dff5]):[],_0x37f17a=_0x92086d[_0x5bedbc(0x2b2)](_0x3ea7df=>eval(_0x3ea7df));break;case _0x5bedbc(0x33f):_0x37f17a=_0x62a194[_0x14dff5]!==''?JSON[_0x5bedbc(0x1cc)](_0x62a194[_0x14dff5]):'';break;case _0x5bedbc(0x365):_0x92086d=_0x62a194[_0x14dff5]!==''?JSON[_0x5bedbc(0x1cc)](_0x62a194[_0x14dff5]):[],_0x37f17a=_0x92086d[_0x5bedbc(0x2b2)](_0x4fb0cf=>JSON[_0x5bedbc(0x1cc)](_0x4fb0cf));break;case _0x5bedbc(0x26a):_0x37f17a=_0x62a194[_0x14dff5]!==''?new Function(JSON[_0x5bedbc(0x1cc)](_0x62a194[_0x14dff5])):new Function('return\x200');break;case _0x5bedbc(0x1ea):_0x92086d=_0x62a194[_0x14dff5]!==''?JSON[_0x5bedbc(0x1cc)](_0x62a194[_0x14dff5]):[],_0x37f17a=_0x92086d[_0x5bedbc(0x2b2)](_0x288afa=>new Function(JSON[_0x5bedbc(0x1cc)](_0x288afa)));break;case _0x5bedbc(0x2c1):_0x37f17a=_0x62a194[_0x14dff5]!==''?String(_0x62a194[_0x14dff5]):'';break;case _0x5bedbc(0x209):_0x92086d=_0x62a194[_0x14dff5]!==''?JSON[_0x5bedbc(0x1cc)](_0x62a194[_0x14dff5]):[],_0x37f17a=_0x92086d['map'](_0x5eabd4=>String(_0x5eabd4));break;case _0x5bedbc(0x1d5):_0x17dfe8=_0x62a194[_0x14dff5]!==''?JSON[_0x5bedbc(0x1cc)](_0x62a194[_0x14dff5]):{},_0x37f17a=VisuMZ[_0x5bedbc(0x327)]({},_0x17dfe8);break;case _0x5bedbc(0x1f8):_0x92086d=_0x62a194[_0x14dff5]!==''?JSON[_0x5bedbc(0x1cc)](_0x62a194[_0x14dff5]):[],_0x37f17a=_0x92086d[_0x5bedbc(0x2b2)](_0x21b727=>VisuMZ[_0x5bedbc(0x327)]({},JSON[_0x5bedbc(0x1cc)](_0x21b727)));break;default:continue;}_0x5d0f50[_0x2a7c7a]=_0x37f17a;}}return _0x5d0f50;},(_0x988e45=>{const _0x4ebfd8=_0x134d3c,_0x3e9191=_0x988e45[_0x4ebfd8(0x20b)];for(const _0x3cbe56 of dependencies){if(!Imported[_0x3cbe56]){alert(_0x4ebfd8(0x2c7)[_0x4ebfd8(0x37a)](_0x3e9191,_0x3cbe56)),SceneManager[_0x4ebfd8(0x35a)]();break;}}const _0x12d1c3=_0x988e45[_0x4ebfd8(0x296)];if(_0x12d1c3[_0x4ebfd8(0x321)](/\[Version[ ](.*?)\]/i)){const _0x1ce16d=Number(RegExp['$1']);_0x1ce16d!==VisuMZ[label][_0x4ebfd8(0x335)]&&(alert(_0x4ebfd8(0x20f)[_0x4ebfd8(0x37a)](_0x3e9191,_0x1ce16d)),SceneManager['exit']());}if(_0x12d1c3[_0x4ebfd8(0x321)](/\[Tier[ ](\d+)\]/i)){const _0x271fd8=Number(RegExp['$1']);_0x271fd8<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x4ebfd8(0x37a)](_0x3e9191,_0x271fd8,tier)),SceneManager[_0x4ebfd8(0x35a)]()):tier=Math[_0x4ebfd8(0x371)](_0x271fd8,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x4ebfd8(0x355)],_0x988e45[_0x4ebfd8(0x263)]);})(pluginData),VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x33d)]={'showMultiLayerGauge':/<SHOW MULTI(?:|-| )LAYER (?:HP |)GAUGE>/i,'hideMultiLayerGauge':/<HIDE MULTI(?:|-| )LAYER (?:HP |)GAUGE>/i,'persistMultiLayerGauge':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE (?:PERSIST|PERSISTANT)>/i,'temporalMultiLayerGauge':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE (?:TEMP|TEMPORAL|TEMPORARY)>/i,'layers':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE LAYERS:[ ](\d+)>/i,'faceGraphic':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE (?:FACE|GRAPHIC|FACE GRAPHIC):[ ](.*),[ ]*(\d+)>/i,'bgColor':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE (?:BG|BG |BACKGROUND )COLOR:[ ](.*)>/i,'borderColor':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE BORDER COLOR:[ ](.*)>/i,'borderThick':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE BORDER (?:THICK|THICKNESS|SIZE):[ ](\d+)>/i},ImageManager[_0x134d3c(0x2ea)]=ImageManager[_0x134d3c(0x2ea)]||0x9,ImageManager[_0x134d3c(0x249)]=ImageManager[_0x134d3c(0x249)]||0x6,TextManager[_0x134d3c(0x357)]={'valueFmt':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x30b)][_0x134d3c(0x2a9)]??'%3%','valuePercentDigits':VisuMZ[_0x134d3c(0x229)]['Settings'][_0x134d3c(0x30b)][_0x134d3c(0x2e5)]??0x2},ColorManager[_0x134d3c(0x357)]={'color1':{'layer2':VisuMZ[_0x134d3c(0x229)]['Settings']['LayerColors'][_0x134d3c(0x1d4)]??_0x134d3c(0x21c),'layer3':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x214)][_0x134d3c(0x319)]??_0x134d3c(0x1f3),'layer4':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x214)][_0x134d3c(0x1d6)]??'#00a99d','layer5':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)]['LayerColors']['layer5_color1']??_0x134d3c(0x2ab),'layer6':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x214)][_0x134d3c(0x2b7)]??_0x134d3c(0x222),'layer7':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x214)][_0x134d3c(0x250)]??'#2e3192','layer8':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x214)]['layer8_color1']??_0x134d3c(0x1ca),'layer9':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x214)][_0x134d3c(0x1b1)]??'#f06eaa','layer10':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)]['LayerColors'][_0x134d3c(0x1c3)]??_0x134d3c(0x1dd)},'color2':{'layer2':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x214)][_0x134d3c(0x1e3)]??'#fff799','layer3':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x214)][_0x134d3c(0x333)]??_0x134d3c(0x369),'layer4':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x214)][_0x134d3c(0x2de)]??_0x134d3c(0x336),'layer5':VisuMZ[_0x134d3c(0x229)]['Settings']['LayerColors'][_0x134d3c(0x334)]??_0x134d3c(0x265),'layer6':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x214)][_0x134d3c(0x1fa)]??_0x134d3c(0x34b),'layer7':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x214)][_0x134d3c(0x34c)]??_0x134d3c(0x286),'layer8':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x214)][_0x134d3c(0x330)]??_0x134d3c(0x22e),'layer9':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x214)][_0x134d3c(0x1d3)]??_0x134d3c(0x347),'layer10':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x214)][_0x134d3c(0x311)]??_0x134d3c(0x1e9)}},ColorManager[_0x134d3c(0x2c2)]=function(_0x5ba6dd){const _0x533ae2=_0x134d3c;return _0x5ba6dd=String(_0x5ba6dd),_0x5ba6dd['match'](/#(.*)/i)?_0x533ae2(0x338)[_0x533ae2(0x37a)](String(RegExp['$1'])):this[_0x533ae2(0x346)](Number(_0x5ba6dd));},ColorManager[_0x134d3c(0x2ac)]=function(_0x42bfed){const _0x37d60c=_0x134d3c;if(_0x42bfed<0x1)return this[_0x37d60c(0x21e)]();else{if(_0x42bfed===0x1)return this[_0x37d60c(0x28d)]();else{const _0x49081b='layer%1'[_0x37d60c(0x37a)](_0x42bfed['clamp'](0x2,0xa)),_0x380cfc=ColorManager[_0x37d60c(0x357)][_0x37d60c(0x2fe)][_0x49081b];return this[_0x37d60c(0x2c2)](_0x380cfc);}}},ColorManager[_0x134d3c(0x361)]=function(_0x42e2dc){const _0x52663e=_0x134d3c;if(_0x42e2dc<0x1)return this[_0x52663e(0x21e)]();else{if(_0x42e2dc===0x1)return this[_0x52663e(0x2b8)]();else{const _0x359bd8='layer%1'[_0x52663e(0x37a)](_0x42e2dc[_0x52663e(0x219)](0x2,0xa)),_0x3a3c7c=ColorManager['MULTI_LAYER_HP_GAUGE'][_0x52663e(0x21a)][_0x359bd8];return this['getColor'](_0x3a3c7c);}}},VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x373)]=BattleManager[_0x134d3c(0x2a7)],BattleManager[_0x134d3c(0x2a7)]=function(){const _0x241b74=_0x134d3c;VisuMZ['MultiLayerHpGauge'][_0x241b74(0x373)][_0x241b74(0x1bb)](this),!$gameTroop['isAllDead']()&&$gameTroop['clearMultiLayerHpGaugeMembers']();},VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x281)]=Game_BattlerBase[_0x134d3c(0x1fb)]['revive'],Game_BattlerBase[_0x134d3c(0x1fb)][_0x134d3c(0x2e8)]=function(){const _0x4d16c2=_0x134d3c;VisuMZ['MultiLayerHpGauge'][_0x4d16c2(0x281)][_0x4d16c2(0x1bb)](this);if(this['isEnemy']())$gameTroop['clearMultiLayerHpGaugeMembers']();},VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x20d)]=Game_BattlerBase[_0x134d3c(0x1fb)][_0x134d3c(0x22b)],Game_BattlerBase['prototype'][_0x134d3c(0x22b)]=function(){const _0x18925a=_0x134d3c;VisuMZ['MultiLayerHpGauge']['Game_BattlerBase_appear'][_0x18925a(0x1bb)](this);if(this['isEnemy']())$gameTroop['clearMultiLayerHpGaugeMembers']();},Game_Enemy[_0x134d3c(0x357)]={'showDefault':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2b5)][_0x134d3c(0x1fe)]??![],'persist':VisuMZ[_0x134d3c(0x229)]['Settings'][_0x134d3c(0x2b5)][_0x134d3c(0x1d1)]??!![],'defaultLayers':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2b5)][_0x134d3c(0x283)]??0x1,'bgColor1':VisuMZ[_0x134d3c(0x229)]['Settings'][_0x134d3c(0x2b5)]['bgColor1']??0x13,'bgColor2':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2b5)][_0x134d3c(0x243)]??0x12,'borderColor':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)]['Defaults']['borderColor']??0x2,'borderthickness':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x2b5)][_0x134d3c(0x1d2)]??0x2},Game_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x29a)]=function(){const _0x6bb3ff=_0x134d3c;if(!this[_0x6bb3ff(0x274)]())return![];return this[_0x6bb3ff(0x23f)]()&&this[_0x6bb3ff(0x2be)]()&&this[_0x6bb3ff(0x2aa)]();},Game_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x2aa)]=function(){const _0x4ff74c=_0x134d3c;if(this['_canShowMultiLayerHpGauge']!==undefined)return this[_0x4ff74c(0x353)];this[_0x4ff74c(0x353)]=Game_Enemy[_0x4ff74c(0x357)][_0x4ff74c(0x1fe)];const _0x5a4341=VisuMZ[_0x4ff74c(0x229)][_0x4ff74c(0x33d)],_0x13d0e9=this[_0x4ff74c(0x274)]()[_0x4ff74c(0x237)]||'';if(_0x13d0e9[_0x4ff74c(0x321)](_0x5a4341[_0x4ff74c(0x35c)]))this[_0x4ff74c(0x353)]=!![];else{if(_0x13d0e9['match'](_0x5a4341[_0x4ff74c(0x293)]))this['_canShowMultiLayerHpGauge']=!![];else{if(_0x13d0e9[_0x4ff74c(0x321)](_0x5a4341['temporalMultiLayerGauge']))this[_0x4ff74c(0x353)]=!![];else{if(_0x13d0e9[_0x4ff74c(0x321)](_0x5a4341[_0x4ff74c(0x317)]))this['_canShowMultiLayerHpGauge']=!![];else{if(_0x13d0e9[_0x4ff74c(0x321)](_0x5a4341[_0x4ff74c(0x2a5)]))this[_0x4ff74c(0x353)]=!![];else{if(_0x13d0e9[_0x4ff74c(0x321)](_0x5a4341[_0x4ff74c(0x1d9)]))this['_canShowMultiLayerHpGauge']=!![];else{if(_0x13d0e9[_0x4ff74c(0x321)](_0x5a4341[_0x4ff74c(0x2ee)]))this['_canShowMultiLayerHpGauge']=!![];else{if(_0x13d0e9[_0x4ff74c(0x321)](_0x5a4341['layers']))this[_0x4ff74c(0x353)]=!![];else _0x13d0e9[_0x4ff74c(0x321)](_0x5a4341[_0x4ff74c(0x29d)])&&(this[_0x4ff74c(0x353)]=![]);}}}}}}}return this[_0x4ff74c(0x353)];},VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x254)]=Game_Enemy[_0x134d3c(0x1fb)]['transform'],Game_Enemy[_0x134d3c(0x1fb)]['transform']=function(_0x2349f0){const _0x5f3dec=_0x134d3c;VisuMZ[_0x5f3dec(0x229)][_0x5f3dec(0x254)][_0x5f3dec(0x1bb)](this,_0x2349f0),this[_0x5f3dec(0x353)]=undefined,this[_0x5f3dec(0x2aa)](),$gameTroop[_0x5f3dec(0x2ff)]();},Game_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x2be)]=function(){const _0x4c6f40=_0x134d3c;return this['isMultiLayerGaugeLifeStatePersistant']()?!![]:!this[_0x4c6f40(0x2e6)]();},Game_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x2f8)]=function(){const _0x97115a=_0x134d3c,_0x446f48=VisuMZ[_0x97115a(0x229)]['RegExp'],_0x422611=this[_0x97115a(0x274)]()[_0x97115a(0x237)]||'';if(_0x422611[_0x97115a(0x321)](_0x446f48[_0x97115a(0x293)]))return!![];else{if(_0x422611[_0x97115a(0x321)](_0x446f48[_0x97115a(0x2c5)]))return![];}return Game_Enemy[_0x97115a(0x357)][_0x97115a(0x1d1)];},Game_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x366)]=function(){const _0x3cf781=_0x134d3c;if(this['_multiLayerHpGaugeBgColorData']!==undefined)return this['_multiLayerHpGaugeBgColorData'];this['_multiLayerHpGaugeBgColorData']={'bgColor1':Game_Enemy['MULTI_LAYER_HP_GAUGE'][_0x3cf781(0x24a)],'bgColor2':Game_Enemy[_0x3cf781(0x357)][_0x3cf781(0x243)]};const _0x3a813a=VisuMZ[_0x3cf781(0x229)][_0x3cf781(0x33d)],_0x4ff4b3=this[_0x3cf781(0x274)]()[_0x3cf781(0x237)]||'';if(_0x4ff4b3['match'](_0x3a813a['bgColor'])){const _0xdaadd0=String(RegExp['$1'])[_0x3cf781(0x2d5)](',')[_0x3cf781(0x2b2)](_0x4a9200=>_0x4a9200[_0x3cf781(0x2cb)]());this[_0x3cf781(0x231)]['bgColor1']=_0xdaadd0[0x0],this[_0x3cf781(0x231)]['bgColor2']=_0xdaadd0[0x1]||_0xdaadd0[0x0];}return this[_0x3cf781(0x231)];},Game_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x328)]=function(){const _0x3a912f=_0x134d3c;this[_0x3a912f(0x231)]=undefined,this[_0x3a912f(0x366)]();},Game_Enemy['prototype']['getMultiLayerHpGaugeBgColor1']=function(){const _0xc3dc3=_0x134d3c;return this['getMultiLayerHpGaugeBgColorData']()[_0xc3dc3(0x24a)];},Game_Enemy[_0x134d3c(0x1fb)]['getMultiLayerHpGaugeBgColor2']=function(){const _0x3b7c15=_0x134d3c;return this[_0x3b7c15(0x366)]()[_0x3b7c15(0x243)];},Game_Enemy['prototype'][_0x134d3c(0x2c3)]=function(){const _0x31e113=_0x134d3c;if(this[_0x31e113(0x31c)]!==undefined)return this[_0x31e113(0x31c)];this[_0x31e113(0x31c)]={'color':Game_Enemy[_0x31e113(0x357)][_0x31e113(0x1d9)],'thick':Game_Enemy[_0x31e113(0x357)][_0x31e113(0x1d2)]};const _0x20bc34=VisuMZ[_0x31e113(0x229)]['RegExp'],_0x320ac9=this[_0x31e113(0x274)]()[_0x31e113(0x237)]||'';return _0x320ac9[_0x31e113(0x321)](_0x20bc34[_0x31e113(0x1d9)])&&(this[_0x31e113(0x31c)][_0x31e113(0x2d8)]=String(RegExp['$1'])[_0x31e113(0x2cb)]()),_0x320ac9[_0x31e113(0x321)](_0x20bc34[_0x31e113(0x2ee)])&&(this['_multiLayerHpGaugeBorderData'][_0x31e113(0x32c)]=Math['max'](Number(RegExp['$1']),0x1)),this[_0x31e113(0x31c)];},Game_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x328)]=function(){const _0x215213=_0x134d3c;this[_0x215213(0x31c)]=undefined,this['getMultiLayerHpGaugeBorderData']();},Game_Enemy['prototype']['getMultiLayerHpGaugeBorderColor']=function(){const _0x47843a=_0x134d3c;return this[_0x47843a(0x2c3)]()['color'];},Game_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x277)]=function(){return this['getMultiLayerHpGaugeBorderData']()['thick'];},Game_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x312)]=function(){const _0x4384e7=_0x134d3c;if(this[_0x4384e7(0x322)]()!=='')return _0x4384e7(0x2bf);else{if(Imported['VisuMZ_1_BattleCore']&&this[_0x4384e7(0x1e2)]())return _0x4384e7(0x23e);else return $gameSystem['isSideView']()?_0x4384e7(0x1ad):'enemy';}},Game_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x2ef)]=function(){const _0x414765=_0x134d3c;if(this[_0x414765(0x34d)]!==undefined)return this['_multiLayerHpGaugeFaceGraphicData'];this['_multiLayerHpGaugeFaceGraphicData']={'name':'','index':0x0};const _0x3b126e=VisuMZ[_0x414765(0x229)]['RegExp'],_0x49a094=this[_0x414765(0x274)]()['note']||'';return _0x49a094[_0x414765(0x321)](_0x3b126e['faceGraphic'])&&(this['_multiLayerHpGaugeFaceGraphicData']={'name':String(RegExp['$1'])[_0x414765(0x2cb)](),'index':Math[_0x414765(0x371)](Number(RegExp['$2']),0x0)}),this[_0x414765(0x34d)];},Game_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x1c7)]=function(){const _0x2cd3dc=_0x134d3c;this['_multiLayerHpGaugeFaceGraphicData']=undefined,this[_0x2cd3dc(0x2ef)]();},Game_Enemy[_0x134d3c(0x1fb)]['getMultiLayerHpGaugeFaceName']=function(){const _0x89834e=_0x134d3c;return this['getMultiLayerHpGaugeFaceGraphicData']()[_0x89834e(0x20b)];},Game_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x259)]=function(){const _0x4f2925=_0x134d3c;return this[_0x4f2925(0x2ef)]()[_0x4f2925(0x2e2)];},Game_Enemy['prototype'][_0x134d3c(0x2c4)]=function(){const _0x5e2649=_0x134d3c;if(this['_multiLayerHpGaugeTotalLayers']!==undefined)return this[_0x5e2649(0x2cc)];this[_0x5e2649(0x2cc)]=Game_Enemy[_0x5e2649(0x357)][_0x5e2649(0x283)];const _0x5e86e2=VisuMZ[_0x5e2649(0x229)][_0x5e2649(0x33d)],_0x2ea0b7=this[_0x5e2649(0x274)]()[_0x5e2649(0x237)]||'';return _0x2ea0b7[_0x5e2649(0x321)](_0x5e86e2[_0x5e2649(0x202)])&&(this['_multiLayerHpGaugeTotalLayers']=Number(RegExp['$1'])['clamp'](0x1,0xa)),this[_0x5e2649(0x2cc)];},Game_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x1c2)]=function(){const _0x3bedc7=_0x134d3c,_0x48c2c3=this[_0x3bedc7(0x2c4)]();if(_0x48c2c3<=0x1)return 0x1;const _0x239d3d=this['mhp']/_0x48c2c3;let _0x5cffa9=this['hp']/_0x239d3d;return _0x5cffa9%0x1===0x0?_0x5cffa9+=0x1:_0x5cffa9=Math[_0x3bedc7(0x30d)](_0x5cffa9),_0x5cffa9;},VisuMZ[_0x134d3c(0x229)]['Game_Troop_setup']=Game_Troop[_0x134d3c(0x1fb)][_0x134d3c(0x308)],Game_Troop[_0x134d3c(0x1fb)][_0x134d3c(0x308)]=function(_0x5e4929){const _0x9b5a00=_0x134d3c;VisuMZ[_0x9b5a00(0x229)]['Game_Troop_setup'][_0x9b5a00(0x1bb)](this,_0x5e4929),this[_0x9b5a00(0x2ff)]();},Game_Troop[_0x134d3c(0x1fb)][_0x134d3c(0x23b)]=function(){const _0x12c4d8=_0x134d3c;if(this[_0x12c4d8(0x2d1)]!==undefined)return this[_0x12c4d8(0x2d1)];return this[_0x12c4d8(0x2d1)]=this['members']()[_0x12c4d8(0x324)](_0x50fbd0=>_0x50fbd0&&_0x50fbd0[_0x12c4d8(0x29a)]()),this[_0x12c4d8(0x2d1)];},Game_Troop[_0x134d3c(0x1fb)][_0x134d3c(0x2ff)]=function(){const _0x2460c4=_0x134d3c;this[_0x2460c4(0x2d1)]=undefined,this[_0x2460c4(0x23b)]();},Game_Troop[_0x134d3c(0x1fb)][_0x134d3c(0x1cf)]=function(){const _0x3d939b=_0x134d3c;return this[_0x3d939b(0x23b)]()[_0x3d939b(0x2fa)];},Game_Troop[_0x134d3c(0x1fb)][_0x134d3c(0x221)]=function(){const _0x3aa0a5=_0x134d3c;return Math[_0x3aa0a5(0x371)](this[_0x3aa0a5(0x1cf)](),0x1);},Game_Troop[_0x134d3c(0x1fb)][_0x134d3c(0x2d6)]=function(){const _0x322507=_0x134d3c,_0x56f927=this[_0x322507(0x1cf)](),_0x5ca60a=Scene_Battle[_0x322507(0x357)][_0x322507(0x2b0)];return Math[_0x322507(0x30d)](_0x56f927/_0x5ca60a);},Scene_Battle[_0x134d3c(0x357)]={'maxWidth':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2c9)][_0x134d3c(0x1fd)]??0x330,'perRow':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2c9)][_0x134d3c(0x2b0)]??0x4,'rowSpacing':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2c9)][_0x134d3c(0x2e4)]??0x4,'fadeSpeed':VisuMZ[_0x134d3c(0x229)]['Settings'][_0x134d3c(0x2c9)][_0x134d3c(0x23c)]??0x18},VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x349)]=Scene_Battle[_0x134d3c(0x1fb)]['createAllWindows'],Scene_Battle[_0x134d3c(0x1fb)][_0x134d3c(0x33c)]=function(){const _0x27174a=_0x134d3c;this['createMultiLayerHpGauges'](),VisuMZ[_0x27174a(0x229)][_0x27174a(0x349)][_0x27174a(0x1bb)](this);},Scene_Battle[_0x134d3c(0x1fb)][_0x134d3c(0x248)]=function(){const _0x528f99=_0x134d3c;this[_0x528f99(0x32e)](),this[_0x528f99(0x2af)]();},Scene_Battle[_0x134d3c(0x1fb)][_0x134d3c(0x32e)]=function(){const _0x15a807=_0x134d3c;this[_0x15a807(0x25b)]=new Sprite(),this[_0x15a807(0x228)](this[_0x15a807(0x25b)]);const _0x95568e=Scene_Battle['MULTI_LAYER_HP_GAUGE'][_0x15a807(0x1fd)],_0x4331ee=Math[_0x15a807(0x200)]((Graphics[_0x15a807(0x30e)]-_0x95568e)/0x2);this[_0x15a807(0x25b)]['x']=_0x4331ee;},Scene_Battle[_0x134d3c(0x1fb)][_0x134d3c(0x2af)]=function(){const _0x28a2e8=_0x134d3c,_0xb051ee=$gameTroop[_0x28a2e8(0x1b0)]();for(const _0x4430ec of _0xb051ee){if(!_0x4430ec)continue;this[_0x28a2e8(0x1eb)](_0x4430ec);}},Scene_Battle[_0x134d3c(0x1fb)][_0x134d3c(0x1eb)]=function(_0x29c336){const _0x39583d=new Sprite_MultiLayerHpContainer(_0x29c336);this['_multiLayerHpGaugeContainer']['addChild'](_0x39583d);},VisuMZ[_0x134d3c(0x229)]['Scene_Battle_update']=Scene_Battle[_0x134d3c(0x1fb)][_0x134d3c(0x28f)],Scene_Battle['prototype'][_0x134d3c(0x28f)]=function(){const _0x5305af=_0x134d3c;VisuMZ['MultiLayerHpGauge'][_0x5305af(0x1c5)][_0x5305af(0x1bb)](this),this[_0x5305af(0x345)]();},Scene_Battle['prototype'][_0x134d3c(0x345)]=function(){const _0x1c7215=_0x134d3c;this[_0x1c7215(0x284)](),this[_0x1c7215(0x27a)]();},Scene_Battle[_0x134d3c(0x1fb)][_0x134d3c(0x284)]=function(){const _0x285132=_0x134d3c;(BattleManager[_0x285132(0x2b9)]===_0x285132(0x251)||BattleManager[_0x285132(0x2a3)])&&this['_multiLayerHpGaugeContainer']&&(this[_0x285132(0x25b)][_0x285132(0x344)]-=Scene_Battle['MULTI_LAYER_HP_GAUGE']['fadeSpeed']);},Scene_Battle[_0x134d3c(0x1fb)][_0x134d3c(0x27a)]=function(){const _0x116cfd=_0x134d3c,_0xb88666=this[_0x116cfd(0x25b)][_0x116cfd(0x238)][_0x116cfd(0x324)](_0x298e71=>_0x298e71[_0x116cfd(0x31d)]&&_0x298e71[_0x116cfd(0x344)]<=0x0);for(const _0x471b24 of _0xb88666){this['_multiLayerHpGaugeContainer'][_0x116cfd(0x342)](_0x471b24),_0x471b24[_0x116cfd(0x2dd)]();}},VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x33e)]=Scene_Battle['prototype'][_0x134d3c(0x211)],Scene_Battle[_0x134d3c(0x1fb)][_0x134d3c(0x211)]=function(){const _0x19ba62=_0x134d3c;VisuMZ[_0x19ba62(0x229)][_0x19ba62(0x33e)][_0x19ba62(0x1bb)](this);if(this[_0x19ba62(0x246)])this[_0x19ba62(0x246)][_0x19ba62(0x258)]();};function Sprite_MultiLayerHpContainer(){const _0x471d5a=_0x134d3c;this[_0x471d5a(0x36b)](...arguments);}Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)]=Object[_0x134d3c(0x29e)](Sprite_Clickable['prototype']),Sprite_MultiLayerHpContainer['prototype'][_0x134d3c(0x36a)]=Sprite_MultiLayerHpContainer,Sprite_MultiLayerHpContainer[_0x134d3c(0x36d)]={'bufferX':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)]['General']['bufferX']??0x4,'checkFrequency':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x2c9)]['checkFrequency']??0x14,'faceSize':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x2c9)][_0x134d3c(0x1c1)]??0x40,'fadeSpeed':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2c9)][_0x134d3c(0x32f)]??0x10,'repositionForHelp':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x2c9)]['repositionForHelp']??!![],'repositionHelpY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2c9)][_0x134d3c(0x252)]??0x6c,'stateTooltipsEnable':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x2c9)][_0x134d3c(0x34f)]??!![],'offset':{'x':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x2c9)][_0x134d3c(0x1bd)]??0x0,'y':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2c9)][_0x134d3c(0x303)]??0x0}},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x36b)]=function(_0x2f3c92){const _0x1e81fb=_0x134d3c;this[_0x1e81fb(0x22d)]=_0x2f3c92,Sprite_Clickable[_0x1e81fb(0x1fb)][_0x1e81fb(0x36b)]['call'](this),this[_0x1e81fb(0x344)]=0x0,this[_0x1e81fb(0x304)](),this[_0x1e81fb(0x28b)](),this[_0x1e81fb(0x1f0)](),this[_0x1e81fb(0x273)]();},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x304)]=function(){const _0x3e4bf7=_0x134d3c;if(!Sprite_MultiLayerHpFace[_0x3e4bf7(0x36d)]['show'])return;const _0x1f200f=new Sprite_MultiLayerHpFace(this[_0x3e4bf7(0x22d)]);this['addChild'](_0x1f200f),this[_0x3e4bf7(0x1af)]=_0x1f200f;},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x1c1)]=function(){const _0x5dfdf8=_0x134d3c;return Sprite_MultiLayerHpFace[_0x5dfdf8(0x36d)][_0x5dfdf8(0x1c4)]?Sprite_MultiLayerHpContainer['SETTINGS'][_0x5dfdf8(0x1c1)]:0x0;},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x28b)]=function(){const _0xf8ebc2=_0x134d3c;if(!Sprite_MultiLayerHpGauge['SETTINGS']['show'])return;const _0xf09f3c=new Sprite_MultiLayerHpGauge(this[_0xf8ebc2(0x22d)]);this['addChild'](_0xf09f3c),this['_gaugeSprite']=_0xf09f3c;const _0x1293dc=this[_0xf8ebc2(0x1c1)](),_0x208be0=Sprite_MultiLayerHpContainer[_0xf8ebc2(0x36d)]['bufferX'],_0x516882=Sprite_MultiLayerHpGauge[_0xf8ebc2(0x36d)][_0xf8ebc2(0x305)];_0xf09f3c['x']=_0x1293dc,_0xf09f3c['x']+=_0x208be0,_0xf09f3c['x']+=_0x516882['x'],_0xf09f3c['y']=0x0,_0xf09f3c['y']+=_0x516882['y'],_0xf09f3c[_0xf8ebc2(0x308)](this['_battler'],'hp'),this['updateGaugeWidth']();},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x2f5)]=function(){const _0x2bd42a=_0x134d3c,_0x10ec3a=this['faceSize'](),_0x47db07=Sprite_MultiLayerHpContainer['SETTINGS']['bufferX'],_0x340a59=Scene_Battle[_0x2bd42a(0x357)][_0x2bd42a(0x1fd)],_0x5f08fb=Math[_0x2bd42a(0x27d)]($gameTroop['totalVisibleMultiLayerHpGaugeCount'](),Scene_Battle[_0x2bd42a(0x357)]['perRow']);return Math[_0x2bd42a(0x30d)](_0x340a59/_0x5f08fb)-_0x47db07*0x2-_0x10ec3a;},Sprite_MultiLayerHpContainer['prototype'][_0x134d3c(0x1b4)]=function(){const _0x49ac44=_0x134d3c;if(!this['_gaugeSprite'])return;const _0x4ef5be=this[_0x49ac44(0x2f5)]();this[_0x49ac44(0x1c6)]['setWidth'](_0x4ef5be);},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x1f0)]=function(){const _0x1b0820=_0x134d3c;if(!Sprite_MultiLayerHpStates[_0x1b0820(0x36d)]['show'])return;const _0x5e1dd8=new Sprite_MultiLayerHpStates(this[_0x1b0820(0x22d)]);this[_0x1b0820(0x233)](_0x5e1dd8),this['_statesSprite']=_0x5e1dd8;const _0x147b50=this[_0x1b0820(0x1c1)](),_0x780587=Sprite_MultiLayerHpContainer[_0x1b0820(0x36d)][_0x1b0820(0x225)],_0x47e355=Sprite_MultiLayerHpStates[_0x1b0820(0x36d)][_0x1b0820(0x305)];_0x5e1dd8['x']=_0x147b50,_0x5e1dd8['x']+=_0x780587,_0x5e1dd8['x']+=_0x47e355['x'],_0x5e1dd8['y']=0x0,_0x5e1dd8['y']+=_0x47e355['y'],this[_0x1b0820(0x1bc)]();},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x1bc)]=function(){const _0x4b1a53=_0x134d3c;if(!this[_0x4b1a53(0x33b)])return;const _0x2868ec=this[_0x4b1a53(0x2f5)]();this['_statesSprite'][_0x4b1a53(0x27f)](_0x2868ec);},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x273)]=function(){const _0x11f927=_0x134d3c;this[_0x11f927(0x298)]!==$gameTroop[_0x11f927(0x221)]()&&(this[_0x11f927(0x285)](),this[_0x11f927(0x230)]()),this[_0x11f927(0x275)]!==$gameTroop[_0x11f927(0x23b)]()[_0x11f927(0x1e7)](this[_0x11f927(0x22d)])&&(this[_0x11f927(0x1f2)](),this[_0x11f927(0x1b2)]()),this[_0x11f927(0x236)]=!![];},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)]['setTotalGauges']=function(){const _0x410e4d=_0x134d3c;this[_0x410e4d(0x298)]=$gameTroop[_0x410e4d(0x221)]();},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)]['calcWidth']=function(){const _0x51cd3b=_0x134d3c,_0x15ed70=Scene_Battle[_0x51cd3b(0x357)]['maxWidth'],_0x5174c7=Math[_0x51cd3b(0x27d)](this[_0x51cd3b(0x298)],Scene_Battle[_0x51cd3b(0x357)][_0x51cd3b(0x2b0)]);return Math[_0x51cd3b(0x200)](_0x15ed70/_0x5174c7);},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x230)]=function(){const _0x281e39=_0x134d3c,_0xe6468c=this[_0x281e39(0x329)]();this['_lastWidth']=_0xe6468c;const _0x1742a6=Sprite_MultiLayerHpContainer[_0x281e39(0x36d)][_0x281e39(0x1c1)];this[_0x281e39(0x348)]?(this[_0x281e39(0x348)]['clear'](),this[_0x281e39(0x348)][_0x281e39(0x300)](_0xe6468c,_0x1742a6),this['width']=_0xe6468c,this[_0x281e39(0x337)]=_0x1742a6,this[_0x281e39(0x1b4)](),this['updateStatesWidth']()):this[_0x281e39(0x348)]=new Bitmap(_0xe6468c,_0x1742a6),this[_0x281e39(0x275)]=undefined;},Sprite_MultiLayerHpContainer['prototype'][_0x134d3c(0x1f2)]=function(){const _0x24ef83=_0x134d3c;this[_0x24ef83(0x275)]=$gameTroop['visibleMultiLayerHpGaugeMembers']()[_0x24ef83(0x1e7)](this[_0x24ef83(0x22d)]);},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x28f)]=function(){const _0x591c6e=_0x134d3c;Sprite_Clickable[_0x591c6e(0x1fb)][_0x591c6e(0x28f)][_0x591c6e(0x1bb)](this);if(!this[_0x591c6e(0x22d)])return;Graphics[_0x591c6e(0x351)]%Sprite_MultiLayerHpContainer[_0x591c6e(0x36d)][_0x591c6e(0x35d)]===0x0&&this[_0x591c6e(0x1c0)](),this[_0x591c6e(0x1e1)](),this[_0x591c6e(0x215)](),this['updateSelectionEffect']();},Sprite_MultiLayerHpContainer['prototype'][_0x134d3c(0x2e1)]=function(){const _0x5368e8=_0x134d3c;if(this[_0x5368e8(0x275)]<0x0)return Graphics['width']*0xa;const _0x29b8fc=Scene_Battle[_0x5368e8(0x357)][_0x5368e8(0x1fd)],_0x17538d=Math[_0x5368e8(0x27d)](this['_lastTotalVisibleGauges'],Scene_Battle[_0x5368e8(0x357)][_0x5368e8(0x2b0)]),_0x3aa247=Math['ceil'](_0x29b8fc/_0x17538d),_0x58683e=this[_0x5368e8(0x275)]%Scene_Battle[_0x5368e8(0x357)]['perRow'];let _0x3ac3ca=_0x3aa247*_0x58683e;return _0x3ac3ca+=Sprite_MultiLayerHpContainer[_0x5368e8(0x36d)][_0x5368e8(0x305)]['x'],_0x3ac3ca;},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x1b2)]=function(){const _0x5875a8=_0x134d3c;if(this['_hold'])return;if(this[_0x5875a8(0x275)]===undefined)return;if(this[_0x5875a8(0x275)]<0x0)return this['x']=Graphics[_0x5875a8(0x26c)]*0xa;const _0x3e3e45=this[_0x5875a8(0x2e1)]();this[_0x5875a8(0x1e0)]=_0x3e3e45,this['x']=_0x3e3e45;},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x2bc)]=function(){const _0x3ec5e2=_0x134d3c;if(this[_0x3ec5e2(0x275)]<0x0)return Graphics['height']*0xa;const _0x2d5f31=Sprite_MultiLayerHpContainer['SETTINGS'],_0x486631=Math[_0x3ec5e2(0x200)](this[_0x3ec5e2(0x275)]/Scene_Battle['MULTI_LAYER_HP_GAUGE']['perRow']);let _0x4e755d=_0x486631*(0x4+_0x2d5f31[_0x3ec5e2(0x1c1)]);return _0x4e755d+=Sprite_MultiLayerHpContainer['SETTINGS']['offset']['y'],_0x4e755d;},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x1e1)]=function(){const _0x62c4e7=_0x134d3c;if(this[_0x62c4e7(0x31d)])return;if(this[_0x62c4e7(0x275)]===undefined)return;if(this[_0x62c4e7(0x275)]<0x0)return this['y']=Graphics[_0x62c4e7(0x337)]*0xa;const _0x300d76=Sprite_MultiLayerHpContainer[_0x62c4e7(0x36d)];let _0x193e3c=this[_0x62c4e7(0x2bc)]();this[_0x62c4e7(0x358)]=_0x193e3c;const _0x3d43a2=SceneManager['_scene'][_0x62c4e7(0x2a0)];_0x3d43a2&&_0x3d43a2[_0x62c4e7(0x26b)]&&_0x300d76['repositionForHelp']&&(_0x193e3c+=_0x300d76[_0x62c4e7(0x252)]);const _0x38e6d7=SceneManager['_scene']['_helpWindow'];_0x38e6d7&&_0x38e6d7[_0x62c4e7(0x289)]>0x0&&_0x38e6d7[_0x62c4e7(0x26b)]&&(_0x193e3c+=Graphics[_0x62c4e7(0x337)]*0xa),this['y']=_0x193e3c;},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x215)]=function(){const _0x5e3dea=_0x134d3c,_0x282703=Sprite_MultiLayerHpContainer[_0x5e3dea(0x36d)][_0x5e3dea(0x2b1)];this[_0x5e3dea(0x344)]+=this['_hold']?-_0x282703:_0x282703;},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)]['updateSelectionEffect']=function(){const _0x275e5b=_0x134d3c;if(!this['_battler'])return;const _0x25c5f9=SceneManager[_0x275e5b(0x2e9)][_0x275e5b(0x26e)];if(!_0x25c5f9)return;const _0x5f5db0=_0x25c5f9[_0x275e5b(0x267)](this[_0x275e5b(0x22d)]);if(!_0x5f5db0)return;const _0x3a5317=_0x5f5db0[_0x275e5b(0x318)]();if(!_0x3a5317)return;this[_0x275e5b(0x379)](_0x3a5317['_blendColor']);},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x1c0)]=function(){const _0x39c53c=_0x134d3c;if(!this[_0x39c53c(0x236)])return;if(this[_0x39c53c(0x298)]!==$gameTroop[_0x39c53c(0x221)]()){this[_0x39c53c(0x285)]();if(this['_lastWidth']!==this[_0x39c53c(0x329)]())return this[_0x39c53c(0x1b5)]();}if(this[_0x39c53c(0x275)]!==$gameTroop['visibleMultiLayerHpGaugeMembers']()[_0x39c53c(0x1e7)](this['_battler'])){this[_0x39c53c(0x1f2)]();if(this[_0x39c53c(0x1e0)]!==this[_0x39c53c(0x2e1)]()||this[_0x39c53c(0x358)]!==this[_0x39c53c(0x2bc)]())return this['processReplacement']();}},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x1b5)]=function(){const _0x3ddf9b=_0x134d3c;this[_0x3ddf9b(0x31d)]=!![];for(const _0x5f8b4e of this['children']){if(_0x5f8b4e)_0x5f8b4e['_hold']=!![];}const _0x21c4d0=SceneManager[_0x3ddf9b(0x2e9)];if(_0x21c4d0)_0x21c4d0['addMultiLayerHpGaugeSprite'](this[_0x3ddf9b(0x22d)]);},Sprite_MultiLayerHpContainer[_0x134d3c(0x1fb)][_0x134d3c(0x280)]=function(){const _0xb02407=_0x134d3c;if(this[_0xb02407(0x31d)])return null;if(!Sprite_MultiLayerHpContainer['SETTINGS'][_0xb02407(0x34f)])return null;return this[_0xb02407(0x22d)];};function Sprite_MultiLayerHpFace(){const _0x1e6012=_0x134d3c;this[_0x1e6012(0x36b)](...arguments);}Sprite_MultiLayerHpFace['prototype']=Object['create'](Sprite['prototype']),Sprite_MultiLayerHpFace[_0x134d3c(0x1fb)][_0x134d3c(0x36a)]=Sprite_MultiLayerHpFace,Sprite_MultiLayerHpFace[_0x134d3c(0x36d)]={'show':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)]['Graphic'][_0x134d3c(0x1c4)]??!![],'drawLetter':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)]['Graphic']['drawLetter']??!![],'letterFontName':VisuMZ['MultiLayerHpGauge']['Settings']['Graphic']['letterFontName']??'','letterFontSize':VisuMZ[_0x134d3c(0x229)]['Settings'][_0x134d3c(0x206)][_0x134d3c(0x1f5)]??0x10},Sprite_MultiLayerHpFace[_0x134d3c(0x1fb)][_0x134d3c(0x36b)]=function(_0x423f19){const _0x38d9a4=_0x134d3c;this[_0x38d9a4(0x22d)]=_0x423f19,Sprite[_0x38d9a4(0x1fb)]['initialize'][_0x38d9a4(0x1bb)](this),this['createBgSprite'](),this[_0x38d9a4(0x29b)](),this[_0x38d9a4(0x21d)](),this[_0x38d9a4(0x2c0)]();},Sprite_MultiLayerHpFace[_0x134d3c(0x1fb)][_0x134d3c(0x1db)]=function(){const _0x2655c2=_0x134d3c,_0x5b2b30=Sprite_MultiLayerHpContainer[_0x2655c2(0x36d)]['faceSize'];this[_0x2655c2(0x325)]=new Sprite(),this[_0x2655c2(0x233)](this[_0x2655c2(0x325)]),this[_0x2655c2(0x325)][_0x2655c2(0x348)]=new Bitmap(_0x5b2b30,_0x5b2b30),this[_0x2655c2(0x216)]();},Sprite_MultiLayerHpFace['prototype'][_0x134d3c(0x29b)]=function(){const _0x238c28=_0x134d3c,_0x189f03=Sprite_MultiLayerHpContainer[_0x238c28(0x36d)][_0x238c28(0x1c1)];this[_0x238c28(0x32d)]=new Sprite(),this[_0x238c28(0x233)](this[_0x238c28(0x32d)]),this[_0x238c28(0x32d)][_0x238c28(0x348)]=new Bitmap(_0x189f03,_0x189f03),this[_0x238c28(0x1c9)]();},Sprite_MultiLayerHpFace[_0x134d3c(0x1fb)][_0x134d3c(0x21d)]=function(){const _0xb26f51=_0x134d3c,_0x5f5c25=Sprite_MultiLayerHpContainer[_0xb26f51(0x36d)]['faceSize'];this['_borderSprite']=new Sprite(),this[_0xb26f51(0x233)](this[_0xb26f51(0x31e)]),this[_0xb26f51(0x31e)]['bitmap']=new Bitmap(_0x5f5c25,_0x5f5c25),this[_0xb26f51(0x1e4)]();},Sprite_MultiLayerHpFace[_0x134d3c(0x1fb)]['createLetterSprite']=function(){const _0x4bcf2a=_0x134d3c;if(!Sprite_MultiLayerHpFace[_0x4bcf2a(0x36d)][_0x4bcf2a(0x287)])return;const _0x406721=Sprite_MultiLayerHpContainer[_0x4bcf2a(0x36d)][_0x4bcf2a(0x1c1)];this[_0x4bcf2a(0x1cd)]=new Sprite(),this[_0x4bcf2a(0x233)](this[_0x4bcf2a(0x1cd)]),this[_0x4bcf2a(0x1cd)][_0x4bcf2a(0x348)]=new Bitmap(_0x406721,_0x406721),this[_0x4bcf2a(0x32a)]();},Sprite_MultiLayerHpFace[_0x134d3c(0x1fb)]['drawBgSprite']=function(){const _0xfe8190=_0x134d3c,_0x143c24=this[_0xfe8190(0x325)][_0xfe8190(0x348)],_0x22cd79=ColorManager[_0xfe8190(0x2c2)](this[_0xfe8190(0x22d)][_0xfe8190(0x2c6)]()),_0x4c249b=ColorManager['getColor'](this['_battler'][_0xfe8190(0x208)]()),_0x1fad4a=Sprite_MultiLayerHpContainer[_0xfe8190(0x36d)][_0xfe8190(0x1c1)];_0x143c24[_0xfe8190(0x288)](),_0x143c24[_0xfe8190(0x1ba)](0x0,0x0,_0x1fad4a,_0x1fad4a,_0x22cd79,_0x4c249b,!![]),_0x143c24['strokeRect'](0x0,0x0,_0x1fad4a,_0x1fad4a,_0x22cd79);},Sprite_MultiLayerHpFace[_0x134d3c(0x1fb)][_0x134d3c(0x1e4)]=function(){const _0x1a9f71=_0x134d3c,_0x446197=this[_0x1a9f71(0x31e)][_0x1a9f71(0x348)],_0xf40fd9='#000000',_0x205cc5=ColorManager[_0x1a9f71(0x2c2)](this[_0x1a9f71(0x22d)]['getMultiLayerHpGaugeBorderColor']()),_0x4c24dd=this[_0x1a9f71(0x22d)][_0x1a9f71(0x277)](),_0x5f41cb=Sprite_MultiLayerHpContainer[_0x1a9f71(0x36d)][_0x1a9f71(0x1c1)];let _0xe977a1=0x0;_0x446197['clear'](),_0x446197[_0x1a9f71(0x241)](_0xe977a1,_0xe977a1,_0x5f41cb-_0xe977a1*0x2,_0x5f41cb-_0xe977a1*0x2,_0xf40fd9),_0xe977a1+=0x1,_0x446197[_0x1a9f71(0x241)](_0xe977a1,_0xe977a1,_0x5f41cb-_0xe977a1*0x2,_0x5f41cb-_0xe977a1*0x2,_0x205cc5),_0xe977a1+=_0x4c24dd,_0x446197['fillRect'](_0xe977a1,_0xe977a1,_0x5f41cb-_0xe977a1*0x2,_0x5f41cb-_0xe977a1*0x2,_0xf40fd9),_0xe977a1+=0x1,_0x446197[_0x1a9f71(0x28a)](_0xe977a1,_0xe977a1,_0x5f41cb-_0xe977a1*0x2,_0x5f41cb-_0xe977a1*0x2);},Sprite_MultiLayerHpFace[_0x134d3c(0x1fb)]['drawLetterSprite']=function(){const _0x2845f5=_0x134d3c;if(!this[_0x2845f5(0x1cd)])return;const _0x4fd4b8=this[_0x2845f5(0x1cd)][_0x2845f5(0x348)],_0x2d7fde=this[_0x2845f5(0x2d3)];if(!_0x2d7fde)return;const _0x231653=Sprite_MultiLayerHpFace['SETTINGS'],_0x198fdf=Sprite_MultiLayerHpContainer[_0x2845f5(0x36d)][_0x2845f5(0x1c1)];_0x4fd4b8[_0x2845f5(0x288)]();if(!this[_0x2845f5(0x2ae)])return;_0x4fd4b8['fontFace']=_0x231653['letterFontName']||$gameSystem['mainFontFace'](),_0x4fd4b8[_0x2845f5(0x1ac)]=_0x231653[_0x2845f5(0x1f5)]||0x10,_0x4fd4b8[_0x2845f5(0x2f3)](_0x2d7fde['trim'](),0x0,_0x198fdf/0x2,_0x198fdf*0x7/0x8,_0x198fdf/0x2,_0x2845f5(0x1ff));},Sprite_MultiLayerHpFace['prototype'][_0x134d3c(0x1c9)]=function(){const _0x358876=_0x134d3c;this['_graphicType']=this['_battler']['getMultiLayerHpGaugeGraphicType']();let _0x458071;switch(this[_0x358876(0x2f2)]){case'face':this[_0x358876(0x213)]=this[_0x358876(0x22d)]['getMultiLayerHpGaugeFaceName'](),this[_0x358876(0x2f9)]=this[_0x358876(0x22d)][_0x358876(0x259)](),_0x458071=ImageManager[_0x358876(0x276)](this[_0x358876(0x213)]),_0x458071[_0x358876(0x378)](this[_0x358876(0x1e6)][_0x358876(0x247)](this,_0x458071));break;case'svactor':this[_0x358876(0x299)]=this[_0x358876(0x22d)][_0x358876(0x20e)](),_0x458071=ImageManager['loadSvActor'](this[_0x358876(0x299)]),_0x458071[_0x358876(0x378)](this['changeSvActorGraphic']['bind'](this,_0x458071));break;case _0x358876(0x1ad):this[_0x358876(0x301)]=this[_0x358876(0x22d)]['battlerName'](),_0x458071=ImageManager['loadSvEnemy'](this[_0x358876(0x301)]),_0x458071[_0x358876(0x378)](this[_0x358876(0x295)][_0x358876(0x247)](this,_0x458071));break;case _0x358876(0x274):this[_0x358876(0x301)]=this[_0x358876(0x22d)][_0x358876(0x232)](),_0x458071=ImageManager[_0x358876(0x2ce)](this[_0x358876(0x301)]),_0x458071[_0x358876(0x378)](this[_0x358876(0x295)][_0x358876(0x247)](this,_0x458071));break;}},Sprite_MultiLayerHpFace[_0x134d3c(0x1fb)][_0x134d3c(0x1e6)]=function(_0x5a6d40){const _0x50d8a1=_0x134d3c,_0x464eea=this[_0x50d8a1(0x32d)][_0x50d8a1(0x348)],_0x406cd7=this[_0x50d8a1(0x22d)][_0x50d8a1(0x259)]()||0x0,_0xdc7adc=Sprite_MultiLayerHpContainer['SETTINGS']['faceSize'],_0x1ad5f7=_0xdc7adc,_0x1e33fc=_0xdc7adc,_0x8fc21e=ImageManager[_0x50d8a1(0x1b9)],_0x52e1fb=ImageManager['faceHeight'],_0x4a05b5=_0xdc7adc/Math[_0x50d8a1(0x371)](_0x8fc21e,_0x52e1fb),_0x57bc51=ImageManager[_0x50d8a1(0x1b9)],_0x39b2a6=ImageManager[_0x50d8a1(0x1f4)],_0x2ec9cf=_0x406cd7%0x4*_0x8fc21e+(_0x8fc21e-_0x57bc51)/0x2,_0x568dba=Math[_0x50d8a1(0x200)](_0x406cd7/0x4)*_0x52e1fb+(_0x52e1fb-_0x39b2a6)/0x2,_0x2f7dc7=(_0x1ad5f7-_0x8fc21e*_0x4a05b5)/0x2,_0x3a3e54=(_0x1e33fc-_0x52e1fb*_0x4a05b5)/0x2;_0x464eea['clear'](),_0x464eea['blt'](_0x5a6d40,_0x2ec9cf,_0x568dba,_0x57bc51,_0x39b2a6,_0x2f7dc7,_0x3a3e54,_0xdc7adc,_0xdc7adc);},Sprite_MultiLayerHpFace[_0x134d3c(0x1fb)][_0x134d3c(0x323)]=function(_0x385660){const _0x521570=_0x134d3c,_0x5df419=this[_0x521570(0x32d)]['bitmap'],_0x21f2ed=Sprite_MultiLayerHpContainer['SETTINGS'][_0x521570(0x1c1)],_0x382fc6=_0x21f2ed,_0x127da5=_0x21f2ed,_0x4a6237=this[_0x521570(0x299)]['match'](/\$/i),_0x45dc45=_0x4a6237?0x1:ImageManager[_0x521570(0x2ea)],_0x22007f=_0x4a6237?0x1:ImageManager[_0x521570(0x249)],_0x38ac7d=_0x385660[_0x521570(0x26c)]/_0x45dc45,_0x508422=_0x385660[_0x521570(0x337)]/_0x22007f,_0x7f45ed=Math[_0x521570(0x27d)](0x1,_0x21f2ed/_0x38ac7d,_0x21f2ed/_0x508422),_0x4a88b3=_0x38ac7d*_0x7f45ed,_0x4a197a=_0x508422*_0x7f45ed,_0x1b5828=Math[_0x521570(0x24b)]((_0x382fc6-_0x4a88b3)/0x2),_0x157101=Math['round']((_0x127da5-_0x4a197a)/0x2);_0x5df419[_0x521570(0x288)](),_0x5df419[_0x521570(0x2e3)](_0x385660,0x0,0x0,_0x38ac7d,_0x508422,_0x1b5828,_0x157101,_0x4a88b3,_0x4a197a);},Sprite_MultiLayerHpFace[_0x134d3c(0x1fb)][_0x134d3c(0x295)]=function(_0x551604){const _0x4a56a7=_0x134d3c,_0x16a5c2=this['_graphicSprite'][_0x4a56a7(0x348)],_0xe15562=Sprite_MultiLayerHpContainer['SETTINGS'][_0x4a56a7(0x1c1)],_0x268e6e=_0xe15562,_0x345ddb=_0xe15562,_0x1a9318=Math['min'](0x1,_0xe15562/_0x551604['width'],_0xe15562/_0x551604[_0x4a56a7(0x337)]),_0x523223=_0x551604[_0x4a56a7(0x26c)]*_0x1a9318,_0x150320=_0x551604['height']*_0x1a9318,_0x5abf2b=Math[_0x4a56a7(0x24b)]((_0x268e6e-_0x523223)/0x2),_0x1c06e3=Math[_0x4a56a7(0x24b)]((_0x345ddb-_0x150320)/0x2);_0x16a5c2[_0x4a56a7(0x288)](),_0x16a5c2[_0x4a56a7(0x2e3)](_0x551604,0x0,0x0,_0x551604[_0x4a56a7(0x26c)],_0x551604[_0x4a56a7(0x337)],_0x5abf2b,_0x1c06e3,_0x523223,_0x150320);},Sprite_MultiLayerHpFace['prototype'][_0x134d3c(0x28f)]=function(){const _0x308103=_0x134d3c;Sprite[_0x308103(0x1fb)]['update'][_0x308103(0x1bb)](this);if(!this[_0x308103(0x22d)])return;if(!this['_battler']['showMultiLayerHpGauge']())return;if(this[_0x308103(0x31d)])return;this[_0x308103(0x226)](),this[_0x308103(0x32b)](),this[_0x308103(0x32a)]();},Sprite_MultiLayerHpFace['prototype'][_0x134d3c(0x226)]=function(){const _0x163b55=_0x134d3c;if(!this[_0x163b55(0x22d)])return;if(!this[_0x163b55(0x32d)])return;if(this[_0x163b55(0x2f2)]!==this[_0x163b55(0x22d)]['getMultiLayerHpGaugeGraphicType']())return this[_0x163b55(0x1c9)]();switch(this['_graphicType']){case _0x163b55(0x2bf):this[_0x163b55(0x213)]!==this[_0x163b55(0x22d)][_0x163b55(0x322)]()&&this[_0x163b55(0x1c9)]();this[_0x163b55(0x2f9)]!==this['_battler'][_0x163b55(0x259)]()&&this[_0x163b55(0x1c9)]();break;case _0x163b55(0x23e):this[_0x163b55(0x299)]!==this[_0x163b55(0x22d)][_0x163b55(0x20e)]()&&this[_0x163b55(0x1c9)]();break;case _0x163b55(0x1ad):case'enemy':this[_0x163b55(0x301)]!==this['_battler']['battlerName']()&&this[_0x163b55(0x1c9)]();break;}},Sprite_MultiLayerHpFace[_0x134d3c(0x1fb)][_0x134d3c(0x32b)]=function(){const _0x3c20b4=_0x134d3c;if(!this[_0x3c20b4(0x22d)])return;if(!this[_0x3c20b4(0x32d)])return;if(this[_0x3c20b4(0x302)]===this[_0x3c20b4(0x22d)][_0x3c20b4(0x24f)]())return;this[_0x3c20b4(0x302)]=this[_0x3c20b4(0x22d)][_0x3c20b4(0x24f)](),Imported[_0x3c20b4(0x1f6)]&&this[_0x3c20b4(0x22d)]['hasSvBattler']()&&(this[_0x3c20b4(0x302)]=0x0),this[_0x3c20b4(0x32d)][_0x3c20b4(0x2ec)](this[_0x3c20b4(0x302)]);},Sprite_MultiLayerHpFace['prototype']['updateLetterSprite']=function(){const _0x545426=_0x134d3c;if(!this[_0x545426(0x22d)])return;if(!this[_0x545426(0x1cd)])return;if(this['_lastLetter']===this[_0x545426(0x22d)]['_letter']&&this[_0x545426(0x2ae)]===this[_0x545426(0x22d)]['_plural'])return;this['_lastLetter']=this['_battler'][_0x545426(0x1ce)],this[_0x545426(0x2ae)]=this[_0x545426(0x22d)][_0x545426(0x1da)],this['drawLetterSprite']();};function Sprite_MultiLayerHpGauge(){const _0x13e0d1=_0x134d3c;this[_0x13e0d1(0x36b)](...arguments);}Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)]=Object['create'](Sprite_Gauge[_0x134d3c(0x1fb)]),Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)]['constructor']=Sprite_MultiLayerHpGauge,Sprite_MultiLayerHpGauge['SETTINGS']={'show':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)]['Gauge'][_0x134d3c(0x1c4)]??!![],'bitmapHeight':0x20,'gaugeHeight':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x30b)][_0x134d3c(0x261)]??0x18,'styleName':VisuMZ['MultiLayerHpGauge']['Settings'][_0x134d3c(0x30b)][_0x134d3c(0x1ae)]??_0x134d3c(0x352),'offset':{'x':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x30b)]['offsetX']??0x0,'y':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x30b)][_0x134d3c(0x303)]??0x4}},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)]['initialize']=function(){const _0x287817=_0x134d3c;Sprite_Gauge[_0x287817(0x1fb)][_0x287817(0x36b)]['call'](this);},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)][_0x134d3c(0x27f)]=function(_0x27695b){const _0x4702d6=_0x134d3c;this[_0x4702d6(0x2d4)]=_0x27695b,this['createBitmap'](),this[_0x4702d6(0x22d)]&&(this[_0x4702d6(0x339)]=-0x1,this[_0x4702d6(0x294)]=-0x1,this[_0x4702d6(0x1f9)]());},Sprite_MultiLayerHpGauge['prototype']['createBitmap']=function(){const _0x362f26=_0x134d3c,_0x3fae83=this[_0x362f26(0x372)](),_0x59eb99=this['bitmapHeight']();this[_0x362f26(0x348)]?(this['bitmap']['resize'](_0x3fae83,_0x59eb99),this['width']=_0x3fae83,this['height']=_0x59eb99):this['bitmap']=new Bitmap(_0x3fae83,_0x59eb99);},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)]['bitmapHeight']=function(){const _0x4b7221=_0x134d3c;return Sprite_MultiLayerHpGauge[_0x4b7221(0x36d)]['bitmapHeight'];},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)][_0x134d3c(0x261)]=function(){const _0x10e452=_0x134d3c;return Sprite_MultiLayerHpGauge[_0x10e452(0x36d)][_0x10e452(0x261)];},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)]['bitmapWidth']=function(){const _0x178764=_0x134d3c;return this[_0x178764(0x2d4)]||0x80;},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)][_0x134d3c(0x1e5)]=function(){const _0x1c8aa9=_0x134d3c;let _0x4d714e=this[_0x1c8aa9(0x2db)]();return Imported[_0x1c8aa9(0x278)]&&this[_0x1c8aa9(0x1ed)]()&&(_0x4d714e=VisuMZ['GroupDigits'](_0x4d714e)),_0x4d714e;},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)]['gaugeX']=function(){return 0x0;},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)][_0x134d3c(0x255)]=function(){const _0x523400=_0x134d3c;return this[_0x523400(0x22d)]?this[_0x523400(0x22d)]['name']():TextManager[_0x523400(0x207)];},Sprite_MultiLayerHpGauge['prototype'][_0x134d3c(0x1b8)]=function(){return 0x0;},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)][_0x134d3c(0x370)]=function(){const _0x1c4232=_0x134d3c;return ColorManager[_0x1c4232(0x2a8)]();},Sprite_MultiLayerHpGauge['prototype'][_0x134d3c(0x2fb)]=function(){const _0xf574cf=_0x134d3c;return this[_0xf574cf(0x268)]();},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)][_0x134d3c(0x332)]=function(){const _0x34fe5b=_0x134d3c;return this[_0x34fe5b(0x2ad)]();},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)][_0x134d3c(0x1f9)]=function(){const _0x376cfa=_0x134d3c;if(!this[_0x376cfa(0x22d)])return;if(!this[_0x376cfa(0x22d)][_0x376cfa(0x29a)]())return;if(this[_0x376cfa(0x31d)])return;Sprite_Gauge['prototype'][_0x376cfa(0x1f9)]['call'](this);},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)][_0x134d3c(0x2fc)]=function(){const _0x258ba4=_0x134d3c;this[_0x258ba4(0x2ba)](),this['drawValue'](),this['drawLabel'](),Imported[_0x258ba4(0x21b)]&&VisuMZ['VisualGaugeStyles'][_0x258ba4(0x368)]();},Sprite_MultiLayerHpGauge['prototype'][_0x134d3c(0x1b7)]=function(){const _0x614394=_0x134d3c,_0x1c4501=this[_0x614394(0x2db)](),_0x15b2d9=this[_0x614394(0x210)](),_0x4c11a5=TextManager[_0x614394(0x357)][_0x614394(0x2a9)],_0x170cf7=TextManager[_0x614394(0x357)][_0x614394(0x2e5)],_0x3edfd7=(_0x1c4501/_0x15b2d9*0x64)[_0x614394(0x2c8)](_0x170cf7),_0x467c8c=Imported[_0x614394(0x278)]&&this['useDigitGrouping'](),_0x4f0c9d=_0x467c8c?VisuMZ[_0x614394(0x367)](_0x1c4501):_0x1c4501,_0xfc7ce5=_0x467c8c?VisuMZ[_0x614394(0x367)](_0x15b2d9):_0x15b2d9,_0x39f509=_0x4c11a5[_0x614394(0x37a)](_0x4f0c9d,_0xfc7ce5,_0x3edfd7),_0x5d7e94=this[_0x614394(0x372)](),_0x282edf=this[_0x614394(0x2dc)]?this[_0x614394(0x2dc)]():this[_0x614394(0x1f1)](),_0x58f756=_0x5d7e94-0x2,_0xb3abc5=_0x282edf;this[_0x614394(0x2ed)](),this[_0x614394(0x348)]['textColor']=ColorManager[_0x614394(0x2a8)](),this[_0x614394(0x348)][_0x614394(0x2f3)](_0x39f509,0x0,0x0,_0x58f756,_0xb3abc5,'right'),this[_0x614394(0x2f0)]=this[_0x614394(0x348)][_0x614394(0x29f)](_0x39f509),Imported[_0x614394(0x21b)]&&VisuMZ[_0x614394(0x27b)][_0x614394(0x368)]();},Sprite_MultiLayerHpGauge['prototype'][_0x134d3c(0x24c)]=function(){const _0x20aa2e=_0x134d3c,_0x45b7e8=this[_0x20aa2e(0x255)](),_0x1d5b02=this['bitmap'][_0x20aa2e(0x29f)](_0x45b7e8);if(_0x1d5b02+this['_textWidth']+0x28>this['bitmap']['width'])return;const _0x26054e=this[_0x20aa2e(0x372)](),_0x45873d=this['textHeight']?this[_0x20aa2e(0x2dc)]():this['bitmapHeight'](),_0x90de5f=0x4,_0x31914e=0x0,_0x3b8810=_0x26054e,_0x2b611c=_0x45873d;this[_0x20aa2e(0x2ca)](),this['bitmap'][_0x20aa2e(0x315)]=0xff,this[_0x20aa2e(0x348)][_0x20aa2e(0x2f3)](_0x45b7e8,_0x90de5f,_0x31914e,_0x3b8810,_0x2b611c,_0x20aa2e(0x269)),Imported[_0x20aa2e(0x21b)]&&VisuMZ[_0x20aa2e(0x27b)][_0x20aa2e(0x368)]();},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)][_0x134d3c(0x2ba)]=function(){const _0x5786b6=_0x134d3c,_0x1052c0=this[_0x5786b6(0x22d)][_0x5786b6(0x1c2)](),_0x3896d3=this[_0x5786b6(0x372)](),_0x171bdb=this['textHeight']?this[_0x5786b6(0x2dc)]():this[_0x5786b6(0x1f1)](),_0x31f5de=this['gaugeHeight'](),_0x1bfde5=0x0,_0x185cec=_0x171bdb-_0x31f5de,_0x3df9ca=_0x3896d3-_0x1bfde5,_0x23ac77=_0x31f5de;this['bitmap'][_0x5786b6(0x288)](),this[_0x5786b6(0x2e7)](_0x1052c0,_0x1bfde5,_0x185cec,_0x3df9ca,_0x23ac77);},Sprite_MultiLayerHpGauge['prototype'][_0x134d3c(0x1d8)]=function(){const _0x2b24ad=_0x134d3c,_0x40748d=this[_0x2b24ad(0x22d)]['getMultiLayerHpGaugeTotalLayers']();if(_0x40748d<=0x1)return this[_0x2b24ad(0x22d)]['hpRate']();const _0xd295b6=this[_0x2b24ad(0x22d)][_0x2b24ad(0x25c)]/_0x40748d,_0x535757=Math[_0x2b24ad(0x200)](this[_0x2b24ad(0x22d)]['hp']/_0xd295b6),_0x29c3fb=this[_0x2b24ad(0x22d)]['hp']-_0xd295b6*_0x535757;return _0x29c3fb/_0xd295b6;},Sprite_MultiLayerHpGauge['prototype']['drawFullGauge']=function(_0x485ae9,_0x1a5d93,_0xf3adce,_0x34d186,_0x2299b9){const _0x1994d1=_0x134d3c;if(Imported['VisuMZ_3_VisualGaugeStyles']){this['drawFullVisualStyleGauge'](_0x485ae9,_0x1a5d93,_0xf3adce,_0x34d186,_0x2299b9);return;}const _0x4d5afb=this[_0x1994d1(0x21e)]();this[_0x1994d1(0x348)][_0x1994d1(0x241)](_0x1a5d93,_0xf3adce,_0x34d186,_0x2299b9,_0x4d5afb),_0x1a5d93+=0x1,_0xf3adce+=0x1,_0x34d186-=0x2,_0x2299b9-=0x2;const _0x6634c6=this[_0x1994d1(0x1d8)]();if(_0x485ae9>0x1&&_0x6634c6<0x1){const _0x47152b=ColorManager[_0x1994d1(0x2ac)](_0x485ae9-0x1),_0x52b3a0=ColorManager[_0x1994d1(0x361)](_0x485ae9-0x1);this['bitmap'][_0x1994d1(0x1ba)](_0x1a5d93,_0xf3adce,_0x34d186,_0x2299b9,_0x47152b,_0x52b3a0);}const _0x1a45ed=Math['floor'](_0x34d186*_0x6634c6);_0x485ae9>0x1&&this['bitmap'][_0x1994d1(0x241)](_0x1a5d93,_0xf3adce,_0x1a45ed+0x1,_0x2299b9,_0x4d5afb);const _0xf96eb7=ColorManager[_0x1994d1(0x2ac)](_0x485ae9),_0x2c994a=ColorManager[_0x1994d1(0x361)](_0x485ae9);this['bitmap'][_0x1994d1(0x1ba)](_0x1a5d93,_0xf3adce,_0x1a45ed,_0x2299b9,_0xf96eb7,_0x2c994a);},Sprite_MultiLayerHpGauge['prototype'][_0x134d3c(0x354)]=function(){const _0x591970=_0x134d3c,_0x14e60e=this[_0x591970(0x22d)][_0x591970(0x2c4)]();return this[_0x591970(0x22d)][_0x591970(0x25c)]/Math[_0x591970(0x371)](0x1,_0x14e60e);},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)][_0x134d3c(0x340)]=function(_0x58b864,_0x5a52f2,_0x2c2629,_0x33dbfd,_0x4ec65f){const _0x26bd1f=_0x134d3c,_0x15d9a4=this[_0x26bd1f(0x1ae)]();VisuMZ[_0x26bd1f(0x27b)][_0x26bd1f(0x23d)]=this[_0x26bd1f(0x354)]();const _0x3bb185=VisuMZ['VisualGaugeStyles'][_0x26bd1f(0x359)](_0x15d9a4,_0x5a52f2,_0x2c2629,_0x33dbfd,_0x4ec65f,0x1,!![]),_0x2ce87b=this['gaugeBackColor']();this['bitmap'][_0x26bd1f(0x341)](_0x3bb185,_0x2ce87b);const _0x2548a6=this[_0x26bd1f(0x1d8)]();if(_0x58b864>0x1&&_0x2548a6<0x1){const _0x3edb66=ColorManager[_0x26bd1f(0x2ac)](_0x58b864-0x1),_0x184e15=ColorManager[_0x26bd1f(0x361)](_0x58b864-0x1),_0x2d1558=VisuMZ['VisualGaugeStyles'][_0x26bd1f(0x359)](_0x15d9a4,_0x5a52f2,_0x2c2629,_0x33dbfd,_0x4ec65f,0x1,![]),_0x4e2c61=this[_0x26bd1f(0x348)][_0x26bd1f(0x30f)][_0x26bd1f(0x1de)](_0x5a52f2,_0x2c2629,_0x5a52f2+_0x33dbfd,_0x2c2629);this[_0x26bd1f(0x348)][_0x26bd1f(0x260)](_0x2d1558,_0x3edb66,_0x184e15,_0x4e2c61);}const _0x3c24a9=ColorManager['getMultiLayerHpGaugeColor1'](_0x58b864),_0x2f747b=ColorManager[_0x26bd1f(0x361)](_0x58b864),_0x420856=this['bitmap'][_0x26bd1f(0x30f)]['createLinearGradient'](_0x5a52f2,_0x2c2629,_0x5a52f2+_0x33dbfd,_0x2c2629),_0xe18b6c=VisuMZ['VisualGaugeStyles'][_0x26bd1f(0x359)](_0x15d9a4,_0x5a52f2,_0x2c2629,_0x33dbfd,_0x4ec65f,_0x2548a6,![]);this[_0x26bd1f(0x348)][_0x26bd1f(0x260)](_0xe18b6c,_0x3c24a9,_0x2f747b,_0x420856,_0x2ce87b);},Sprite_MultiLayerHpGauge[_0x134d3c(0x1fb)][_0x134d3c(0x2b4)]=function(){const _0x523ab2=_0x134d3c;return Sprite_MultiLayerHpGauge['SETTINGS'][_0x523ab2(0x1ae)];};function Sprite_MultiLayerHpStates(){this['initialize'](...arguments);}Sprite_MultiLayerHpStates[_0x134d3c(0x1fb)]=Object[_0x134d3c(0x29e)](Sprite[_0x134d3c(0x1fb)]),Sprite_MultiLayerHpStates['prototype'][_0x134d3c(0x36a)]=Sprite_MultiLayerHpStates,Sprite_MultiLayerHpStates['SETTINGS']={'show':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x234)]['show']??!![],'breakShields':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x234)][_0x134d3c(0x2d0)]??!![],'offset':{'x':VisuMZ[_0x134d3c(0x229)]['Settings'][_0x134d3c(0x234)][_0x134d3c(0x1bd)]??0x0,'y':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x234)][_0x134d3c(0x303)]??0x1c}},Sprite_MultiLayerHpStates[_0x134d3c(0x1fb)][_0x134d3c(0x36b)]=function(_0x10b48c){const _0xf9c150=_0x134d3c;this[_0xf9c150(0x22d)]=_0x10b48c,Sprite[_0xf9c150(0x1fb)]['initialize'][_0xf9c150(0x1bb)](this),this['createDrawWindow'](),this['createBitmap'](),this['_battler'][_0xf9c150(0x270)]();},Sprite_MultiLayerHpStates['prototype'][_0x134d3c(0x33a)]=function(){const _0x4350fe=_0x134d3c,_0x2dac28={'x':0x0,'y':0x0,'width':Graphics['width'],'height':SceneManager['_scene'][_0x4350fe(0x262)](0x1,![])};this[_0x4350fe(0x257)]=new Window_MultiLayerHpGaugeStatusBase(_0x2dac28);},Sprite_MultiLayerHpStates[_0x134d3c(0x1fb)][_0x134d3c(0x2d7)]=function(){const _0x3dc2c6=_0x134d3c,_0x19c616=Graphics[_0x3dc2c6(0x26c)],_0x19a77a=ImageManager[_0x3dc2c6(0x22a)];this[_0x3dc2c6(0x348)]=new Bitmap(_0x19c616,_0x19a77a);},Sprite_MultiLayerHpStates[_0x134d3c(0x1fb)][_0x134d3c(0x27f)]=function(_0x3b4b8a){const _0x177ac2=_0x134d3c;this[_0x177ac2(0x1df)](0x0,0x0,_0x3b4b8a,ImageManager['iconHeight']),this[_0x177ac2(0x26c)]=_0x3b4b8a,this['_frameWidth']=_0x3b4b8a;},Sprite_MultiLayerHpStates[_0x134d3c(0x1fb)][_0x134d3c(0x28f)]=function(){const _0x3b2ca0=_0x134d3c;Sprite[_0x3b2ca0(0x1fb)]['update'][_0x3b2ca0(0x1bb)](this);if(!this[_0x3b2ca0(0x22d)])return;if(!this[_0x3b2ca0(0x22d)][_0x3b2ca0(0x29a)]())return;if(this[_0x3b2ca0(0x31d)])return;this[_0x3b2ca0(0x2f7)](),this[_0x3b2ca0(0x242)]();},Sprite_MultiLayerHpStates[_0x134d3c(0x1fb)][_0x134d3c(0x2f7)]=function(){const _0x588310=_0x134d3c;this[_0x588310(0x22d)]['_requestMultiLayerHpGaugeStateUpdate']&&(this['_battler'][_0x588310(0x31a)]=undefined,this[_0x588310(0x2cf)]());},Sprite_MultiLayerHpStates[_0x134d3c(0x1fb)][_0x134d3c(0x242)]=function(){const _0x2b2439=_0x134d3c;if(!this[_0x2b2439(0x31f)])return;const _0x36b2d7=Game_Battler[_0x2b2439(0x326)];if(_0x36b2d7<=0x0)return;this['_battler'][_0x2b2439(0x272)](_0x36b2d7)?this[_0x2b2439(0x31f)][_0x2b2439(0x344)]=0x0:this[_0x2b2439(0x31f)][_0x2b2439(0x344)]=0xff;},Game_BattlerBase[_0x134d3c(0x1fb)][_0x134d3c(0x270)]=function(){},Game_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x270)]=function(){const _0x4811bf=_0x134d3c;this[_0x4811bf(0x29a)]()&&(this[_0x4811bf(0x31a)]=!![]);},VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x29c)]=Game_BattlerBase['prototype'][_0x134d3c(0x297)],Game_BattlerBase['prototype'][_0x134d3c(0x297)]=function(){const _0x5674d7=_0x134d3c;VisuMZ[_0x5674d7(0x229)][_0x5674d7(0x29c)][_0x5674d7(0x1bb)](this),this['requestMultiLayerHpGaugeStateUpdate']();},VisuMZ[_0x134d3c(0x229)]['Game_Battler_onBattleStart']=Game_Battler[_0x134d3c(0x1fb)][_0x134d3c(0x2a1)],Game_Battler['prototype'][_0x134d3c(0x2a1)]=function(_0x155041){const _0x5d1ccf=_0x134d3c;VisuMZ[_0x5d1ccf(0x229)][_0x5d1ccf(0x320)][_0x5d1ccf(0x1bb)](this,_0x155041),this['requestMultiLayerHpGaugeStateUpdate']();},VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x363)]=Game_Battler[_0x134d3c(0x1fb)]['addState'],Game_Battler['prototype'][_0x134d3c(0x1e8)]=function(_0x14dd38){const _0x3a389b=_0x134d3c;VisuMZ['MultiLayerHpGauge'][_0x3a389b(0x363)][_0x3a389b(0x1bb)](this,_0x14dd38),this['requestMultiLayerHpGaugeStateUpdate']();},VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x245)]=Game_Battler[_0x134d3c(0x1fb)][_0x134d3c(0x205)],Game_Battler[_0x134d3c(0x1fb)][_0x134d3c(0x205)]=function(_0x221dbf){const _0x2d7d43=_0x134d3c;VisuMZ[_0x2d7d43(0x229)]['Game_Battler_removeState'][_0x2d7d43(0x1bb)](this,_0x221dbf),this[_0x2d7d43(0x270)]();},VisuMZ[_0x134d3c(0x229)]['Game_BattlerBase_clearStates']=Game_BattlerBase[_0x134d3c(0x1fb)][_0x134d3c(0x26d)],Game_BattlerBase['prototype'][_0x134d3c(0x26d)]=function(){const _0x45f21d=_0x134d3c;VisuMZ[_0x45f21d(0x229)][_0x45f21d(0x30c)][_0x45f21d(0x1bb)](this),this[_0x45f21d(0x270)]();},VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x362)]=Game_Battler[_0x134d3c(0x1fb)]['onTurnEnd'],Game_Battler[_0x134d3c(0x1fb)]['onTurnEnd']=function(){const _0x5e5c64=_0x134d3c;VisuMZ['MultiLayerHpGauge'][_0x5e5c64(0x362)]['call'](this),this[_0x5e5c64(0x270)]();},Sprite_MultiLayerHpStates['prototype'][_0x134d3c(0x2cf)]=function(){const _0x16f3bb=_0x134d3c;this[_0x16f3bb(0x1f7)](),this['drawStateIcons'](),this[_0x16f3bb(0x24d)](),this[_0x16f3bb(0x356)]();},Sprite_MultiLayerHpStates['prototype'][_0x134d3c(0x1f7)]=function(){const _0x20ab7d=_0x134d3c;this[_0x20ab7d(0x348)]['clear'](),this[_0x20ab7d(0x257)][_0x20ab7d(0x35b)][_0x20ab7d(0x288)]();},Sprite_MultiLayerHpStates[_0x134d3c(0x1fb)][_0x134d3c(0x1b6)]=function(){const _0x3a634e=_0x134d3c,_0x1b2db2=this[_0x3a634e(0x257)][_0x3a634e(0x28e)];this[_0x3a634e(0x257)]['drawActorIcons'](this[_0x3a634e(0x22d)],0x0,0x0,_0x1b2db2);},Sprite_MultiLayerHpStates['prototype'][_0x134d3c(0x24d)]=function(){const _0x1f87da=_0x134d3c;if(!this[_0x1f87da(0x22d)])return;if(!Imported[_0x1f87da(0x314)])return;if(!Game_Battler['BREAK_SHIELDS_ENEMIES'])return;if(!Sprite_MultiLayerHpStates['SETTINGS']['breakShields'])return;if(this['_breakShieldSprite'])return;this['_breakShieldSprite']=new Sprite_BreakShieldIcon(),this['addChild'](this[_0x1f87da(0x31f)]),this['_breakShieldSprite'][_0x1f87da(0x308)](this['_battler'],![]),this[_0x1f87da(0x31f)][_0x1f87da(0x30a)](ImageManager[_0x1f87da(0x309)]/0x2,ImageManager[_0x1f87da(0x22a)]/0x2+0x2),this[_0x1f87da(0x31f)][_0x1f87da(0x1c4)]();},Sprite_MultiLayerHpStates['prototype'][_0x134d3c(0x356)]=function(){const _0x1bc4ec=_0x134d3c;this[_0x1bc4ec(0x348)]=this[_0x1bc4ec(0x257)]['contents'];if(this[_0x1bc4ec(0x2fd)]){const _0x8398dd=Math[_0x1bc4ec(0x200)](this[_0x1bc4ec(0x2fd)]/ImageManager[_0x1bc4ec(0x309)])*ImageManager[_0x1bc4ec(0x309)];this[_0x1bc4ec(0x1df)](0x0,0x0,_0x8398dd,this[_0x1bc4ec(0x348)][_0x1bc4ec(0x337)]);}},Window_BattleLog[_0x134d3c(0x357)]={'reposition':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2c9)][_0x134d3c(0x235)]??!![],'perRowOffsetY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2c9)]['battleLogPerRowOffsetY']??0x40},Window_BattleLog[_0x134d3c(0x1fb)][_0x134d3c(0x258)]=function(){const _0xd1966d=_0x134d3c;this[_0xd1966d(0x2b3)]=this['y'];},VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x36e)]=Window_BattleLog[_0x134d3c(0x1fb)][_0x134d3c(0x28f)],Window_BattleLog['prototype'][_0x134d3c(0x28f)]=function(){const _0x7511ad=_0x134d3c;VisuMZ['MultiLayerHpGauge'][_0x7511ad(0x36e)][_0x7511ad(0x1bb)](this),this['updateMultiLyerHpGaugePositionY']();},Window_BattleLog['prototype'][_0x134d3c(0x253)]=function(){const _0x431f75=_0x134d3c;if(!Window_BattleLog[_0x431f75(0x357)]['reposition'])return;if(this[_0x431f75(0x2b3)]===undefined)return;let _0x3fabde=this[_0x431f75(0x2b3)];const _0x3c9577=$gameTroop[_0x431f75(0x2d6)]();_0x3c9577>0x0&&(_0x3fabde+=Window_BattleLog['MULTI_LAYER_HP_GAUGE'][_0x431f75(0x331)]*_0x3c9577),this['y']=_0x3fabde;};function Window_MultiLayerHpGaugeStatusBase(){const _0x3ca00b=_0x134d3c;this[_0x3ca00b(0x36b)](...arguments);}Window_MultiLayerHpGaugeStatusBase['prototype']=Object[_0x134d3c(0x29e)](Window_StatusBase[_0x134d3c(0x1fb)]),Window_MultiLayerHpGaugeStatusBase[_0x134d3c(0x1fb)][_0x134d3c(0x36a)]=Window_MultiLayerHpGaugeStatusBase,Window_MultiLayerHpGaugeStatusBase[_0x134d3c(0x1fb)][_0x134d3c(0x36b)]=function(_0x26800e){const _0x40324=_0x134d3c;Window_StatusBase[_0x40324(0x1fb)][_0x40324(0x36b)][_0x40324(0x1bb)](this,_0x26800e);},Window_MultiLayerHpGaugeStatusBase[_0x134d3c(0x1fb)]['itemHeight']=function(){const _0x380059=_0x134d3c;return Window_Scrollable[_0x380059(0x1fb)][_0x380059(0x343)]['call'](this);},Window_MultiLayerHpGaugeStatusBase['prototype'][_0x134d3c(0x240)]=function(_0x44643e){const _0x187642=_0x134d3c;if(!Sprite_MultiLayerHpStates[_0x187642(0x36d)][_0x187642(0x2d0)])return![];if(!Game_Battler['BREAK_SHIELDS_ENEMIES'])return![];const _0x29029b=Game_Battler[_0x187642(0x326)];if(_0x44643e[_0x187642(0x272)](_0x29029b)&&$dataStates[_0x29029b][_0x187642(0x2b6)]>0x0)return![];if(_0x44643e['isDead']()&&$dataStates[_0x44643e['deathStateId']()][_0x187642(0x2b6)]>0x0)return![];return!![];},Window_MultiLayerHpGaugeStatusBase[_0x134d3c(0x1fb)][_0x134d3c(0x203)]=function(_0xe02033,_0x18d475,_0x5cc9f2){},VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x2da)]={'battler':{'reduceRedundancy':{'hpGauge':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)][_0x134d3c(0x34e)]??!![],'stateIcon':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)][_0x134d3c(0x35f)]??!![],'breakShields':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)][_0x134d3c(0x218)]??!![]}},'atb':{'eachRowOffsetY':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x2da)][_0x134d3c(0x36c)]??+0x40,'normalOffsetY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)][_0x134d3c(0x1d0)]??+0x18,'helpOffsetY':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x2da)]['atbHelpOffsetY']??+0xc},'btb':{'eachRowOffsetY':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x2da)][_0x134d3c(0x25a)]??+0x40,'normalOffsetY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)]['btbNormalOffsetY']??+0x0,'helpOffsetY':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)]['Compatibility'][_0x134d3c(0x22f)]??+0xc},'ctb':{'eachRowOffsetY':VisuMZ[_0x134d3c(0x229)]['Settings'][_0x134d3c(0x2da)]['ctbEachRowOffsetY']??+0x40,'normalOffsetY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)][_0x134d3c(0x271)]??+0x0,'helpOffsetY':VisuMZ[_0x134d3c(0x229)]['Settings']['Compatibility'][_0x134d3c(0x2cd)]??+0xc},'etb':{'eachRowOffsetY':VisuMZ['MultiLayerHpGauge']['Settings'][_0x134d3c(0x2da)][_0x134d3c(0x1ef)]??+0x40,'normalOffsetY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)]['Compatibility'][_0x134d3c(0x224)]??+0x0,'helpOffsetY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)][_0x134d3c(0x307)]??-0x38},'ftb':{'eachRowOffsetY':VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x355)][_0x134d3c(0x2da)][_0x134d3c(0x201)]??+0x40,'normalOffsetY':VisuMZ['MultiLayerHpGauge']['Settings'][_0x134d3c(0x2da)]['ftbNormalOffsetY']??+0x0,'helpOffsetY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)]['ftbHelpOffsetY']??-0x38},'otb':{'eachRowOffsetY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)][_0x134d3c(0x2bd)]??+0x40,'normalOffsetY':VisuMZ[_0x134d3c(0x229)]['Settings']['Compatibility']['otbNormalOffsetY']??-0x6,'helpOffsetY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)][_0x134d3c(0x20c)]??-0xc},'ptb':{'eachRowOffsetY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)][_0x134d3c(0x1d7)]??+0x40,'normalOffsetY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)][_0x134d3c(0x256)]??+0x0,'helpOffsetY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)]['ptbHelpOffsetY']??-0x38},'stb':{'eachRowOffsetY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)]['stbEachRowOffsetY']??+0x40,'normalOffsetY':VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x355)][_0x134d3c(0x2da)][_0x134d3c(0x25f)]??+0x0,'helpOffsetY':VisuMZ[_0x134d3c(0x229)]['Settings'][_0x134d3c(0x2da)][_0x134d3c(0x223)]??+0xc}},VisuMZ[_0x134d3c(0x229)]['Sprite_Battler_isVisualHpGaugeDisplayed']=Sprite_Battler[_0x134d3c(0x1fb)][_0x134d3c(0x1ec)],Sprite_Battler[_0x134d3c(0x1fb)][_0x134d3c(0x1ec)]=function(){const _0x4d0a64=_0x134d3c;if(this[_0x4d0a64(0x22d)]&&this[_0x4d0a64(0x22d)][_0x4d0a64(0x2a2)]()){const _0x1563c5=VisuMZ[_0x4d0a64(0x229)]['Compatibility'][_0x4d0a64(0x2f4)]['reduceRedundancy'];if(this[_0x4d0a64(0x22d)][_0x4d0a64(0x29a)]()&&_0x1563c5[_0x4d0a64(0x2bb)]&&Sprite_MultiLayerHpGauge['SETTINGS']['show'])return![];}return VisuMZ[_0x4d0a64(0x229)][_0x4d0a64(0x22c)][_0x4d0a64(0x1bb)](this);},VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x316)]=Sprite_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x227)],Sprite_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x227)]=function(){const _0xb834c4=_0x134d3c;VisuMZ[_0xb834c4(0x229)][_0xb834c4(0x316)][_0xb834c4(0x1bb)](this),this[_0xb834c4(0x22d)]&&this[_0xb834c4(0x375)]&&(this['shouldHideMultiLayerStatesIcon']()&&(this[_0xb834c4(0x375)]['y']=Graphics['height']*0xa));},Sprite_Enemy[_0x134d3c(0x1fb)][_0x134d3c(0x1be)]=function(){const _0x4c5461=_0x134d3c;if(this[_0x4c5461(0x22d)]&&!this[_0x4c5461(0x22d)][_0x4c5461(0x29a)]())return![];const _0x23c18e=VisuMZ[_0x4c5461(0x229)][_0x4c5461(0x2da)][_0x4c5461(0x2f4)][_0x4c5461(0x25d)];if(_0x23c18e[_0x4c5461(0x27c)]&&Sprite_MultiLayerHpStates[_0x4c5461(0x36d)]['show'])return!![];return![];},VisuMZ[_0x134d3c(0x229)]['Sprite_Battler_updateVisualStateEffectsOverlay']=Sprite_Battler['prototype'][_0x134d3c(0x239)],Sprite_Battler[_0x134d3c(0x1fb)]['updateVisualStateEffectsOverlay']=function(){const _0x5e530c=_0x134d3c;VisuMZ[_0x5e530c(0x229)][_0x5e530c(0x374)]['call'](this);if(this[_0x5e530c(0x22d)]&&this['_battler']['isEnemy']()&&this[_0x5e530c(0x1bf)]){const _0x54566e=VisuMZ[_0x5e530c(0x360)][_0x5e530c(0x355)][_0x5e530c(0x2c9)],_0x52ebb6=this[_0x5e530c(0x1bf)];_0x52ebb6[_0x5e530c(0x26b)]=_0x54566e['EnemyOverlay'],this[_0x5e530c(0x2e0)]&&(this['_svBattlerSprite'][_0x5e530c(0x1bf)][_0x5e530c(0x26b)]=![]),!this[_0x5e530c(0x22d)][_0x5e530c(0x1e2)]()&&(_0x52ebb6['y']=-this['height']+_0x52ebb6[_0x5e530c(0x337)]-ImageManager[_0x5e530c(0x22a)]);}};Imported[_0x134d3c(0x26f)]&&(VisuMZ[_0x134d3c(0x229)]['Sprite_FieldGaugeATB_updatePosition']=Sprite_FieldGaugeATB[_0x134d3c(0x1fb)][_0x134d3c(0x220)],Sprite_FieldGaugeATB['prototype'][_0x134d3c(0x220)]=function(){const _0x26b42b=_0x134d3c;VisuMZ[_0x26b42b(0x229)][_0x26b42b(0x1ee)][_0x26b42b(0x1bb)](this);if(Sprite_FieldGaugeATB[_0x26b42b(0x355)][_0x26b42b(0x306)]!=='top')return;const _0x2558fd=$gameTroop[_0x26b42b(0x2d6)]();if(_0x2558fd<=0x0)return;const _0x12f45c=VisuMZ[_0x26b42b(0x229)][_0x26b42b(0x2da)][_0x26b42b(0x1cb)],_0x219bbc=_0x12f45c[_0x26b42b(0x28c)];let _0x837816=_0x219bbc*_0x2558fd;const _0x55f30a=SceneManager[_0x26b42b(0x2e9)]['_helpWindow'];_0x55f30a&&_0x55f30a[_0x26b42b(0x26b)]&&Sprite_FieldGaugeATB['Settings']['RepositionTopForHelp']?_0x837816+=_0x12f45c[_0x26b42b(0x2f1)]:_0x837816+=_0x12f45c[_0x26b42b(0x282)],this['y']+=_0x837816;});;Imported[_0x134d3c(0x1b3)]&&(VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x1c8)]=Window_BTB_TurnOrder[_0x134d3c(0x1fb)][_0x134d3c(0x220)],Window_BTB_TurnOrder[_0x134d3c(0x1fb)]['updatePosition']=function(){const _0x2b10b0=_0x134d3c;VisuMZ[_0x2b10b0(0x229)][_0x2b10b0(0x1c8)][_0x2b10b0(0x1bb)](this);if(Window_BTB_TurnOrder[_0x2b10b0(0x355)][_0x2b10b0(0x306)]!=='top')return;const _0x1f5fb2=$gameTroop['totalVisibleMultiLayerHpGaugeRows']();if(_0x1f5fb2<=0x0)return;const _0x4af6b6=VisuMZ[_0x2b10b0(0x229)][_0x2b10b0(0x2da)][_0x2b10b0(0x34a)],_0x4d1f1e=_0x4af6b6[_0x2b10b0(0x28c)];let _0x5a108c=_0x4d1f1e*_0x1f5fb2;const _0x5ecc20=SceneManager[_0x2b10b0(0x2e9)][_0x2b10b0(0x2a0)];_0x5ecc20&&_0x5ecc20['visible']&&Window_BTB_TurnOrder['Settings'][_0x2b10b0(0x292)]?_0x5a108c+=_0x4af6b6[_0x2b10b0(0x2f1)]:_0x5a108c+=_0x4af6b6[_0x2b10b0(0x282)],this['y']+=_0x5a108c;});;function _0x5355(){const _0x1e8927=['labelOutlineColor','redraw','_frameWidth','color1','clearMultiLayerHpGaugeMembers','resize','_graphicEnemy','_graphicHue','offsetY','createBattlerGraphicSprite','offset','DisplayPosition','etbHelpOffsetY','setup','iconWidth','move','Gauge','Game_BattlerBase_clearStates','ceil','boxWidth','_context','ctb','layer10_color2','getMultiLayerHpGaugeGraphicType','toUpperCase','VisuMZ_4_BreakShields','paintOpacity','Sprite_Enemy_updateStateSprite','faceGraphic','mainSprite','layer3_color1','_requestMultiLayerHpGaugeStateUpdate','top','_multiLayerHpGaugeBorderData','_hold','_borderSprite','_breakShieldSprite','Game_Battler_onBattleStart','match','getMultiLayerHpGaugeFaceName','changeSvActorGraphic','filter','_bgSprite','BREAK_SHIELDS_STUN_STATE','ConvertParams','updateMultiLayerHpGaugeBorderData','calcWidth','updateLetterSprite','updateGraphicHue','thick','_graphicSprite','createMultiLayerHpGaugeContainer','midFadeSpeed','layer8_color2','perRowOffsetY','labelOutlineWidth','layer3_color2','layer5_color2','version','#7accc8','height','#%1','_targetValue','createDrawWindow','_statesSprite','createAllWindows','RegExp','Scene_Battle_createDisplayObjects','JSON','drawFullVisualStyleGauge','drawVisualStyleGaugeBack','removeChild','itemHeight','opacity','updateMultiLayerHpGaugeContainer','textColor','#ffdeec','bitmap','Scene_Battle_createAllWindows','btb','#8393ca','layer7_color2','_multiLayerHpGaugeFaceGraphicData','reduceRedundantHpGauge','stateTooltipsEnable','VisuMZ_2_BattleSystemPTB','frameCount','quad','_canShowMultiLayerHpGauge','maxHpSegmentAmount','Settings','applyNewBitmap','MULTI_LAYER_HP_GAUGE','_lastPositionY','GetPolygonStyle','exit','contents','showMultiLayerGauge','checkFrequency','5gjwTJk','reduceRedundantStateIcon','VisualStateEffects','getMultiLayerHpGaugeColor2','Game_Battler_onTurnEnd','Game_Battler_addState','Window_STB_TurnOrder_updatePosition','ARRAYJSON','getMultiLayerHpGaugeBgColorData','GroupDigits','ClearTextOffset','#7cc576','constructor','initialize','atbEachRowOffsetY','SETTINGS','Window_BattleLog_update','ARRAYEVAL','labelColor','max','bitmapWidth','BattleManager_endAction','Sprite_Battler_updateVisualStateEffectsOverlay','_stateIconSprite','245298nXFTGY','VisuMZ_2_BattleSystemETB','addLoadListener','setBlendColor','format','fontSize','svenemy','styleName','_graphicsSprite','members','layer9_color1','updatePositionX','VisuMZ_2_BattleSystemBTB','updateGaugeWidth','processReplacement','drawStateIcons','drawValue','labelY','faceWidth','gradientFillRect','call','updateStatesWidth','offsetX','shouldHideMultiLayerStatesIcon','_stateSprite','checkNeedReplacement','faceSize','currentMultiLayerHpGaugeLayer','layer10_color1','show','Scene_Battle_update','_gaugeSprite','updateMultiLayerHpGaugeFaceGraphicData','Window_BTB_TurnOrder_updatePosition','prepareGraphic','#662d91','atb','parse','_letterSprite','_letter','totalVisibleMultiLayerHpGauges','atbNormalOffsetY','persist','borderthickness','layer9_color2','layer2_color1','STRUCT','layer4_color1','ptbEachRowOffsetY','gaugeRate','borderColor','_plural','createBgSprite','etb','#ed1c24','createLinearGradient','setFrame','_lastPositionX','updatePositionY','hasSvBattler','layer2_color2','drawBorderSprite','currentDisplayedValue','changeFaceGraphic','indexOf','addState','#f26c4f','ARRAYFUNC','addMultiLayerHpGaugeSprite','isVisualHpGaugeDisplayed','useDigitGrouping','Sprite_FieldGaugeATB_updatePosition','etbEachRowOffsetY','createBattlerGaugeStates','bitmapHeight','setIndexData','#39b54a','faceHeight','letterFontSize','VisuMZ_1_BattleCore','clearBitmaps','ARRAYSTRUCT','updateBitmap','layer6_color2','prototype','2941080AdfysZ','maxWidth','showDefault','right','floor','ftbEachRowOffsetY','layers','placeBreakShieldIcon','VisuMZ_2_BattleSystemOTB','removeState','Graphic','hpA','getMultiLayerHpGaugeBgColor2','ARRAYSTR','includes','name','otbHelpOffsetY','Game_BattlerBase_appear','svBattlerName','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','currentMaxValue','createDisplayObjects','Window_OTB_TurnOrder_updatePosition','_graphicFaceName','LayerColors','updateOpacity','drawBgSprite','ftb','reduceRedundantBreakShield','clamp','color2','VisuMZ_3_VisualGaugeStyles','#fff200','createBorderSprite','gaugeBackColor','ptb','updatePosition','totalVisibleMultiLayerHpGaugeCount','#0054a6','stbHelpOffsetY','etbNormalOffsetY','bufferX','updateGraphic','updateStateSprite','addWindow','MultiLayerHpGauge','iconHeight','appear','Sprite_Battler_isVisualHpGaugeDisplayed','_battler','#a186be','btbHelpOffsetY','setBitmapSize','_multiLayerHpGaugeBgColorData','battlerName','addChild','States','repositionBattleLog','_finishChecks','note','children','updateVisualStateEffectsOverlay','Window_CTB_TurnOrder_updatePosition','visibleMultiLayerHpGaugeMembers','endBattleFadeSpeed','_maxValueSegment','svactor','isAppeared','shouldDisplayBreakShields','fillRect','updateBreakShieldIcon','bgColor2','3107864dzsCuY','Game_Battler_removeState','_logWindow','bind','createMultiLayerHpGauges','svActorVertCells','bgColor1','round','drawLabel','addBreakShieldIcon','Window_ETB_TurnOrder_updatePosition','battlerHue','layer7_color1','battleEnd','repositionHelpY','updateMultiLyerHpGaugePositionY','Game_Enemy_transform','label','ptbNormalOffsetY','_dummyWindow','registerMultiLayerHpGaugePositionY','getMultiLayerHpGaugeFaceIndex','btbEachRowOffsetY','_multiLayerHpGaugeContainer','mhp','reduceRedundancy','status','stbNormalOffsetY','drawVisualStyleGaugeFront','gaugeHeight','calcWindowHeight','parameters','3509076UtipsJ','#6dcff6','BottomPosition','findTargetSprite','valueOutlineColor','left','FUNC','visible','width','clearStates','_spriteset','VisuMZ_2_BattleSystemATB','requestMultiLayerHpGaugeStateUpdate','ctbNormalOffsetY','isStateAffected','finishChecks','enemy','_lastIndex','loadFace','getMultiLayerHpGaugeBorderThickness','VisuMZ_0_CoreEngine','556470XrUylw','updateMultiLayerHpGaugeContainerRemoval','VisualGaugeStyles','stateIcon','min','9raIWwD','setWidth','getStateTooltipBattler','Game_BattlerBase_revive','normalOffsetY','defaultLayers','updateMultiLayerHpGaugeContainerEndBattle','setTotalGauges','#605ca8','drawLetter','clear','openness','clearRect','createBattlerGaugeSprite','eachRowOffsetY','hpGaugeColor1','innerWidth','update','EVAL','stb','RepositionTopForHelp','persistMultiLayerGauge','_targetMaxValue','changeEnemyGraphic','description','updateStateTurns','_lastTotalVisibleGauges','_graphicSv','showMultiLayerHpGauge','createGraphicSprite','Game_BattlerBase_updateStateTurns','hideMultiLayerGauge','create','measureTextWidth','_helpWindow','onBattleStart','isEnemy','_victoryPhase','35GkgaNC','bgColor','Window_PTB_TurnOrder_updatePosition','endAction','normalColor','valueFmt','canShowMultiLayerHpGauge','#00aeef','getMultiLayerHpGaugeColor1','valueOutlineWidth','_lastPlural','createMultiLayerHpGaugeSprites','perRow','fadeSpeed','map','_multiLayerHpGaugePositionY','getStyleName','Defaults','iconIndex','layer6_color1','hpGaugeColor2','_phase','drawGauge','hpGauge','calcPositionY','otbEachRowOffsetY','meetsMultiLayerGaugeLifeState','face','createLetterSprite','STR','getColor','getMultiLayerHpGaugeBorderData','getMultiLayerHpGaugeTotalLayers','temporalMultiLayerGauge','getMultiLayerHpGaugeBgColor1','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','toFixed','General','setupLabelFont','trim','_multiLayerHpGaugeTotalLayers','ctbHelpOffsetY','loadEnemy','refresh','breakShields','_cache_visibleMultiLayerHpGaugeMembers','VisuMZ_2_BattleSystemCTB','_lastLetter','_bitmapWidth','split','totalVisibleMultiLayerHpGaugeRows','createBitmap','color','VisuMZ_2_BattleSystemFTB','Compatibility','currentValue','textHeight','destroy','layer4_color2','Window_FTB_TurnOrder_updatePosition','_svBattlerSprite','calcPositionX','index','blt','rowSpacing','valuePercentDigits','isDead','drawFullGauge','revive','_scene','svActorHorzCells','3401544viHsuX','setHue','setupValueFont','borderThick','getMultiLayerHpGaugeFaceGraphicData','_textWidth','helpOffsetY','_graphicType','drawText','battler','calcBitmapWidth','148630cxIhWw','checkUpdateRequests','isMultiLayerGaugeLifeStatePersistant','_graphicFaceIndex','length'];_0x5355=function(){return _0x1e8927;};return _0x5355();}Imported[_0x134d3c(0x2d2)]&&(VisuMZ[_0x134d3c(0x229)][_0x134d3c(0x23a)]=Window_CTB_TurnOrder[_0x134d3c(0x1fb)][_0x134d3c(0x220)],Window_CTB_TurnOrder[_0x134d3c(0x1fb)]['updatePosition']=function(){const _0x1b9707=_0x134d3c;VisuMZ[_0x1b9707(0x229)][_0x1b9707(0x23a)]['call'](this);if(Window_CTB_TurnOrder['Settings'][_0x1b9707(0x306)]!=='top')return;const _0x2ef791=$gameTroop['totalVisibleMultiLayerHpGaugeRows']();if(_0x2ef791<=0x0)return;const _0x2d5428=VisuMZ[_0x1b9707(0x229)][_0x1b9707(0x2da)][_0x1b9707(0x310)],_0x9dffb5=_0x2d5428[_0x1b9707(0x28c)];let _0x225e2e=_0x9dffb5*_0x2ef791;const _0x451b62=SceneManager['_scene'][_0x1b9707(0x2a0)];_0x451b62&&_0x451b62['visible']&&Window_CTB_TurnOrder[_0x1b9707(0x355)][_0x1b9707(0x292)]?_0x225e2e+=_0x2d5428[_0x1b9707(0x2f1)]:_0x225e2e+=_0x2d5428[_0x1b9707(0x282)],this['y']+=_0x225e2e;});;Imported[_0x134d3c(0x377)]&&(VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x24e)]=Window_ETB_ActionCount[_0x134d3c(0x1fb)][_0x134d3c(0x220)],Window_ETB_ActionCount[_0x134d3c(0x1fb)]['updatePosition']=function(){const _0x4bf457=_0x134d3c;VisuMZ['MultiLayerHpGauge']['Window_ETB_TurnOrder_updatePosition'][_0x4bf457(0x1bb)](this);if(Window_ETB_ActionCount[_0x4bf457(0x355)][_0x4bf457(0x266)])return;const _0x568b6c=$gameTroop[_0x4bf457(0x2d6)]();if(_0x568b6c<=0x0)return;const _0x1f613d=VisuMZ[_0x4bf457(0x229)][_0x4bf457(0x2da)][_0x4bf457(0x1dc)],_0x1e5b53=_0x1f613d[_0x4bf457(0x28c)];let _0x16ca4e=_0x1e5b53*_0x568b6c;const _0x2e56a0=SceneManager['_scene'][_0x4bf457(0x2a0)];_0x2e56a0&&_0x2e56a0[_0x4bf457(0x26b)]&&Window_ETB_ActionCount['Settings'][_0x4bf457(0x292)]?_0x16ca4e+=_0x1f613d[_0x4bf457(0x2f1)]:_0x16ca4e+=_0x1f613d[_0x4bf457(0x282)],this['y']+=_0x16ca4e;});;Imported[_0x134d3c(0x2d9)]&&(VisuMZ['MultiLayerHpGauge'][_0x134d3c(0x2df)]=Window_FTB_ActionCount[_0x134d3c(0x1fb)][_0x134d3c(0x220)],Window_FTB_ActionCount[_0x134d3c(0x1fb)][_0x134d3c(0x220)]=function(){const _0x14bb04=_0x134d3c;VisuMZ[_0x14bb04(0x229)]['Window_FTB_TurnOrder_updatePosition']['call'](this);if(Window_FTB_ActionCount[_0x14bb04(0x355)][_0x14bb04(0x266)])return;const _0x5acd0a=$gameTroop[_0x14bb04(0x2d6)]();if(_0x5acd0a<=0x0)return;const _0x4df808=VisuMZ[_0x14bb04(0x229)][_0x14bb04(0x2da)][_0x14bb04(0x217)],_0x2b8b70=_0x4df808[_0x14bb04(0x28c)];let _0x491df4=_0x2b8b70*_0x5acd0a;const _0x565831=SceneManager[_0x14bb04(0x2e9)][_0x14bb04(0x2a0)];_0x565831&&_0x565831[_0x14bb04(0x26b)]&&Window_FTB_ActionCount[_0x14bb04(0x355)][_0x14bb04(0x292)]?_0x491df4+=_0x4df808[_0x14bb04(0x2f1)]:_0x491df4+=_0x4df808[_0x14bb04(0x282)],this['y']+=_0x491df4;});;Imported[_0x134d3c(0x204)]&&(VisuMZ[_0x134d3c(0x229)]['Window_OTB_TurnOrder_updatePosition']=Window_OTB_TurnOrder['prototype'][_0x134d3c(0x220)],Window_OTB_TurnOrder[_0x134d3c(0x1fb)][_0x134d3c(0x220)]=function(){const _0x28ec1a=_0x134d3c;VisuMZ[_0x28ec1a(0x229)][_0x28ec1a(0x212)][_0x28ec1a(0x1bb)](this);if(Window_OTB_TurnOrder[_0x28ec1a(0x355)][_0x28ec1a(0x306)]!==_0x28ec1a(0x31b))return;const _0x39eec4=$gameTroop[_0x28ec1a(0x2d6)]();if(_0x39eec4<=0x0)return;const _0x274873=VisuMZ[_0x28ec1a(0x229)][_0x28ec1a(0x2da)]['otb'],_0x1c0d87=_0x274873['eachRowOffsetY'];let _0x143b37=_0x1c0d87*_0x39eec4;const _0x46258b=SceneManager[_0x28ec1a(0x2e9)]['_helpWindow'];_0x46258b&&_0x46258b[_0x28ec1a(0x26b)]&&Window_OTB_TurnOrder[_0x28ec1a(0x355)][_0x28ec1a(0x292)]?_0x143b37+=_0x274873[_0x28ec1a(0x2f1)]:_0x143b37+=_0x274873['normalOffsetY'],this['y']+=_0x143b37;});;Imported[_0x134d3c(0x350)]&&(VisuMZ[_0x134d3c(0x229)]['Window_PTB_TurnOrder_updatePosition']=Window_PTB_ActionCount[_0x134d3c(0x1fb)][_0x134d3c(0x220)],Window_PTB_ActionCount['prototype']['updatePosition']=function(){const _0x40ae12=_0x134d3c;VisuMZ[_0x40ae12(0x229)][_0x40ae12(0x2a6)][_0x40ae12(0x1bb)](this);if(Window_PTB_ActionCount[_0x40ae12(0x355)][_0x40ae12(0x266)])return;const _0x497b16=$gameTroop[_0x40ae12(0x2d6)]();if(_0x497b16<=0x0)return;const _0x2ddc61=VisuMZ[_0x40ae12(0x229)][_0x40ae12(0x2da)][_0x40ae12(0x21f)],_0x2f3806=_0x2ddc61[_0x40ae12(0x28c)];let _0x12aead=_0x2f3806*_0x497b16;const _0xa5197e=SceneManager[_0x40ae12(0x2e9)][_0x40ae12(0x2a0)];_0xa5197e&&_0xa5197e[_0x40ae12(0x26b)]&&Window_PTB_ActionCount[_0x40ae12(0x355)][_0x40ae12(0x292)]?_0x12aead+=_0x2ddc61[_0x40ae12(0x2f1)]:_0x12aead+=_0x2ddc61[_0x40ae12(0x282)],this['y']+=_0x12aead;});;Imported['VisuMZ_2_BattleSystemSTB']&&(VisuMZ[_0x134d3c(0x229)]['Window_STB_TurnOrder_updatePosition']=Window_STB_TurnOrder['prototype']['updatePosition'],Window_STB_TurnOrder['prototype']['updatePosition']=function(){const _0x148a3b=_0x134d3c;VisuMZ[_0x148a3b(0x229)][_0x148a3b(0x364)][_0x148a3b(0x1bb)](this);if(Window_STB_TurnOrder[_0x148a3b(0x355)][_0x148a3b(0x306)]!==_0x148a3b(0x31b))return;const _0x3e4428=$gameTroop[_0x148a3b(0x2d6)]();if(_0x3e4428<=0x0)return;const _0x28e370=VisuMZ[_0x148a3b(0x229)][_0x148a3b(0x2da)][_0x148a3b(0x291)],_0x2671fb=_0x28e370['eachRowOffsetY'];let _0x5cd252=_0x2671fb*_0x3e4428;const _0x20bcad=SceneManager[_0x148a3b(0x2e9)][_0x148a3b(0x2a0)];_0x20bcad&&_0x20bcad[_0x148a3b(0x26b)]&&Window_STB_TurnOrder[_0x148a3b(0x355)][_0x148a3b(0x292)]?_0x5cd252+=_0x28e370['helpOffsetY']:_0x5cd252+=_0x28e370[_0x148a3b(0x282)],this['y']+=_0x5cd252;});;