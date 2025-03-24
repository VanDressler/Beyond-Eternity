//=============================================================================
// VisuStella MZ - Visual State Effects
// VisuMZ_3_VisualStateEffect.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VisualStateEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualStateEffects = VisuMZ.VisualStateEffects || {};
VisuMZ.VisualStateEffects.version = 1.24;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.24] [VisualStateEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_State_Effects_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * States, buffs, and debuffs are amongst one of the most important aspects of
 * the battle system. Therefore, relaying proper information to the player is
 * extremely important. RPG Maker MZ does relay information to the player about
 * the various states and effects, but it is far from perfect. This plugin
 * allows you to add more detail and visual effects regarding states to relay
 * proper data.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Choose to display State Overlays and State Icons over actors and enemies.
 * * Create text popups for Buffs, Debuffs, and States along with full control
 *   over their color, flash, and flash duration.
 * * Play animations upon receiving or removing Buffs, Debuffs, and States.
 * * States can have repeating animations.
 * * States can change the tone of a sprite.
 * * States can freeze a sprite in place.
 * * States can adjust the opacity of a battler to make them semi-transparent.
 * * Hovering effects that can be visibly applied to trait objects.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_0_CoreEngine
 * - VisuMZ_1_BattleCore
 * - VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
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
 * State Motion Index and State Overlay Index
 * 
 * - The original RPG Maker MZ functions have been overwritten because they
 * only display the motions and overlays of the highest priority state even if
 * it does not have any motions while lower priority states with motions and
 * overlays will be hidden.
 * 
 * - The changed code will now take the highest priority state motion index (or
 * a custom one defined by a notetag) and the highest priority state overlay
 * index to show those instead.
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
 * === State-Related Notetags ===
 * 
 * The following notetags are made for states.
 * 
 * ---
 * 
 * <Hide State Popup>
 *
 * - Used for: State Notetags
 * - Don't display any of the popups for this state.
 * 
 * ---
 * 
 * <State Popup>
 *  text color: c
 *  flash color: r, g, b, a
 *  flash duration: d
 * </State Popup>
 *
 * - Used for: State Notetags
 * - Changes the settings of the state popup from the defaults declared by the
 *   Plugin Parameters. Each of the settings are optional. If the lines do not
 *   appear in the notetag, then the default values from the Plugin Parameters
 *   will be used instead.
 * - Replace 'c' #rrggbb for custom colors or insert a regular number for text
 *   colors from the Window Skin.
 * - Replace 'r', 'g', 'b', 'a' with number values ranging from 0 to 255 for
 *   'red', 'green', 'blue', and 'alpha' to determine the flash color.
 * - Replace 'd' with a number representing the amount of frames you want the
 *   flash duration to last for.
 * 
 * Examples:
 * 
 * <State Popup>
 *  text color: 3
 * </State Popup>
 * 
 * <State Popup>
 *  text color: #abcdef
 *  flash color: 255, 255, 0, 160
 * </State Popup>
 * 
 * <State Popup>
 *  flash color: 0, 255, 255, 160
 *  flash duration: 90
 * </State Popup>
 * 
 * <State Popup>
 *  flash duration: 777
 * </State Popup>
 * 
 * ---
 * 
 * <Add Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play when the state is applied.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play when the state is added.
 * - This does not work for states without icons nor the death state.
 * 
 * ---
 * 
 * <Erase Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play when the state is removed.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play when the state is removed.
 * - This does not work for states without icons nor the death state.
 * 
 * ---
 * 
 * <Repeat Animation: x>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determines the battle animation to play in intervals when the battler is
 *   affected by it.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play on repeat while the battler is affected by the state.
 * - The battler will cycle through the various repeating state animations
 *   available through states.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * - WARNING: Abusing Repeat Animations can jeopardize game performance.
 * 
 * ---
 * 
 * <Repeat Animation Cycle: x>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determines the cycle/duration of this specific state's repeating animation
 *   if you do not wish to use the plugin parameter's default setting.
 * - Replace 'x' with the number of frames you wish to play this animation for
 *   before moving onto the next animation.
 * - WARNING: Lower numbers can jeopardize game performance.
 * 
 * ---
 * 
 * <Custom Overlay: filename>
 * 
 * - Used for: State Notetags
 * - For those who don't want to use the img/system/ folder's "States" image
 *   file and want something custom, this notetag will do exactly that.
 * - Custom state overlays will follow similar dimensions to the original
 *   States image:
 *   - Pixel Width: 768
 *   - Pixel Height: 96
 *   - Total Frames: 8
 *   - If you want to use different sizes, we recommend you look into Effekseer
 *     custom animations with the <Repeat Animation: x> notetag instead.
 * - Replace 'filename' with the filename of the image you want to use as
 *   a state overlay found in the game project's img/system/ folder.
 *   - Do not include the file extension.
 * 
 * ---
 * 
 * <State Motion: Walk>
 * <State Motion: Wait>
 * <State Motion: Chant>
 * <State Motion: Guard>
 * <State Motion: Damage>
 * <State Motion: Evade>
 * <State Motion: Thrust>
 * <State Motion: Swing>
 * <State Motion: Missile>
 * <State Motion: Skill>
 * <State Motion: Spell>
 * <State Motion: Item>
 * <State Motion: Escape>
 * <State Motion: Victory>
 * <State Motion: Dying>
 * <State Motion: Abnormal>
 * <State Motion: Sleep>
 * <State Motion: Dead>
 *
 * - Used for: State Notetags
 * - Lets you determine what kind of state motion to play when the battler is
 *   affected by the state.
 * - The battler will only play the highest priority state motion.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <State Motion Lock>
 * 
 * - Used for: State Notetags
 * - If an actor or animated sideview enemy is affected by a state that has
 *   this notetag, their animation will be locked in place while this state
 *   is in effect.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <State Tone: red, green, blue, gray>
 *
 * - Used for: State Notetags
 * - Tints the battler with a tone determined by the state.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * - If a battler has multiple states with tones, then the state with the
 *   highest priority value is applied to the battler.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <Visual Opacity: x>
 * <Visual Opacity: x%>
 * 
 * - Used for: State Notetags
 * - When a battler is affected by this state, change the opacity of their main
 *   battler sprite to 'x' or 'x%'.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * - This does NOT affect UI elements like the HP Gauges, State Icons, or their
 *   positioning markers such as the battler's shadow as this is only to used
 *   to represent a change in their opacity through a state.
 * - To change the whole battler's opacity including everything from the UI
 *   elements, State Icons, etc., use the Action Sequence Plugin Command to
 *   visually alter the whole opacity level instead.
 * - The Visual Opacity level will compound with the opacity level adjusted by
 *   the Action Sequence Plugin Command. Keep this in mind when using both of
 *   them together.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <Visual Rainbow: +x>
 * <Visual Rainbow: -x>
 * 
 * - Used for: State Notetags
 * - When a battler is affected by this state, the battler has a colorful
 *   rainbow shifting effect.
 * - Replace 'x' with a number representing how fast the colors shift for the
 *   battler. Higher numbers are faster. Lower numbers are slower.
 * - This does NOT affect UI elements like the HP Gauges, State Icons, or their
 *   positioning markers such as the battler's shadow as this is only to used
 *   to represent a change in their opacity through a state.
 * - The Visual Rainbow shift will be stacked on top of any battlers/enemies
 *   that already have a hue change.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 *
 * === Hover-Related Notetags ===
 * 
 * ---
 * 
 * <Visual Hover Effect>
 *  Base: x
 *  Speed: y
 *  Rate: z
 *  Death: case
 * </Visual Hover Effect>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Creates a hover effect when tied to a trait object.
 * - The 'base' value determines the minimum height above the ground for the
 *   hover effect. Replace 'x' with a number representing the pixel height.
 * - The 'speed' value determines the flat adjustment towards the wobbling
 *   change. Replace 'y' with a number representing the speed. Lower values
 *   move faster while higher values move slower.
 * - The 'rate' determines the fluctuation rate when the hover effect bobbles
 *   up and down. Replace 'z' with a number representing the fluctuation rate.
 * - The 'death' scenario lets you decide if you want the hovering battler to
 *   remain hovering if they're dead or fall down to the floor. Replace 'case'
 *   with 'Hover' or 'Floor'.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * Example:
 * 
 * <Visual Hover Effect>
 *  Base: 100
 *  Speed: 20
 *  Rate: 5.0
 *  Death: floor
 * </Visual Hover Effect>
 * 
 * ---
 *
 * === Breathing-Related Notetags ===
 * 
 * The following notetags are purely EXPERIMENTAL. There is a high likelihood
 * of unintended graphical glitches when using them. Use them at your own risk.
 * 
 * ---
 * 
 * <Visual Breathing Effect>
 *  Speed: x
 *  Speed X: x
 *  Speed Y: x
 *  
 *  Rate: x.y
 *  Rate X: x.y
 *  Rate Y: x.y
 * 
 *  HP Link: On
 *  HP Link: Off
 * </Visual Breathing Effect>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Creates a hover effect when tied to a trait object.
 * - The 'speed' value determines how long each cycle is.
 *   - When using 'Speed', this will apply to both 'Speed X' and 'Speed Y'
 *   - 'Speed X' refers to the horizontal breathing cycle
 *   - 'Speed Y' refers to the vertical breathing cycle
 *   - If not declared, both will default to a value of '10'
 * - The 'rate' value determines how exaggerated the breathing distortion looks
 *   for the affected target.
 *   - When using 'Rate', this will apply to both 'Rate X' and 'Rate Y
 *   - 'Rate X' refers to horizontal breathing distortion effect
 *   - 'Rate Y' refers to vertical breathing distortion effect
 *   - If not declared, 'Rate X' will default to 0.000 and 'Rate Y' to 0.020.
 * - HP Link refers to the breathing speed relative to the target's HP rate
 *   where the lower the rate, the slower the speed becomes.
 *   - 'On' means it's enabled.
 *   - 'Off' means it's disabled.
 *   - If not declared, this will default to 'OFF'
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * Examples:
 * 
 * <Visual Breathing Effect>
 *  Speed: 10
 *  Rate Y: 0.050
 *  HP Link: On
 * </Visual Breathing Effect>
 * 
 * <Visual Breathing Effect>
 *  Speed X: 15
 *  Speed Y: 10
 *  Rate X: 0.01
 *  Rate Y: 0.050
 * </Visual Breathing Effect>
 * 
 * ---
 * 
 * <No Breathing>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Removes any breathing effects for the affected target.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Visual State Effects.
 *
 * ---
 *
 * Actors
 * 
 *   Show State Overlay?:
 *   - Show state overlays over an actor's head?
 * 
 *   Show State Icons?:
 *   - Show state icons over an actor's head?
 *
 * ---
 *
 * Enemies
 * 
 *   Show State Overlay?:
 *   - Show state overlays over an enemy's head?
 * 
 *   Show State Icons?:
 *   - Show state icons over an enemy's head?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Buff/Debuff Settings Settings
 * ============================================================================
 *
 * Buff/Debuff settings for Visual State Effects.
 *
 * ---
 *
 * Popups
 * 
 *   Show Popups?:
 *   - Show Buff/Debuff Popups when applied?
 * 
 *     Buff Format:
 *     - How do you want the buff text to appear?
 *     - %1 - Parameter Name
 * 
 *       Text Color:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *       Flash Color:
 *       - Adjust the popup's flash color.
 *       - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the flash effect?
 * 
 *     Debuff Format:
 *     - How do you want the debuff text to appear?
 *     - %1 - Parameter Name
 * 
 *       Text Color:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *       Flash Color:
 *       - Adjust the popup's flash color.
 *       - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * Animations
 * 
 *   Show Animations?:
 *   - Show Buff/Debuff Animations when applied?
 * 
 *     Mirror Animations?:
 *     - Mirror animations for buffs/debuffs?
 * 
 *     Mute Animations?:
 *     - Mute animations for buffs/debuffs?
 * 
 * ---
 * 
 * Buff Animations
 * 
 *   MaxHP Buff:
 *   MaxMP Buff:
 *   ATK Buff:
 *   DEF Buff:
 *   MAT Buff:
 *   MDF Buff:
 *   AGI Buff:
 *   LUK Buff:
 *   - Animation played when applying specific Buffs.
 * 
 * Debuff Animations
 * 
 *   MaxHP Debuff:
 *   MaxMP Debuff:
 *   ATK Debuff:
 *   DEF Debuff:
 *   MAT Debuff:
 *   MDF Debuff:
 *   AGI Debuff:
 *   LUK Debuff:
 *   - Animation played when applying specific Debuff.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: State Settings
 * ============================================================================
 *
 * Default State settings for Visual State Effects.
 *
 * ---
 *
 * Popups
 * 
 *   Show Popups?:
 *   - Show States Popups when applied and removed?
 * 
 *     Allow Duplicates?:
 *     - Allow duplicate state popups to appear with the same graphical frame?
 * 
 *     Battle End Popups?:
 *     - Show State Popup removal on battle end for battle state removal?
 * 
 *     Add State Format:
 *     - How do you want added states to appear?
 *     - %1 - State Name
 * 
 *     Erase State Format:
 *     - How do you want erased states to appear?
 *     - %1 - State Name
 * 
 *     Default Text Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *       Match Turn Count?:
 *       - Match turn count color by default?
 * 
 *     Flash Color:
 *     - Adjust the popup's default flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the default flash effect?
 *
 * ---
 *
 * State Animations
 * 
 *   Add/Erase Animations
 * 
 *     Mirror Animations?:
 *     - Mirror animations for states?
 * 
 *     Mute Animations?:
 *     - Mute animations for states?
 * 
 *   Repeating Animations
 * 
 *     Cycle Time:
 *     - The amount of frames to wait before each animation cycle.
 *     - WARNING: Lower numbers can jeopardize game performance.
 * 
 *     Mirror Animations?:
 *     - Mirror repeating animations for states by default?
 * 
 *     Mute Animations?:
 *     - Mute repeating animations for states by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Response Popup Settings
 * ============================================================================
 *
 * Popup settings for response-type state effects. These include counterattack,
 * magic reflection, and substitute.
 *
 * ---
 *
 * Counter Popup
 * 
 * Reflect Popup
 * 
 * Substitute Popup
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Icon Index:
 *   - What icon is used for this popup?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.24: March 20, 2025
 * * Bug Fixes!
 * ** Fixed a crash that would occur upon state removal regarding hovering.
 *    Fix made by Irina. 
 * 
 * Version 1.23: December 19, 2024
 * * Documentation Update!
 * ** Updated targets <Repeat Animation: x> and <Repeat Animation Cycle: x>.
 * * Feature Update!
 * ** Expanded database targets for notetags: <Repeat Animation: x> and
 *    <Repeat Animation Cycle: x>.
 * *** From State Notetags only to Actor, Class, Skill, Weapon, Armor, Enemy,
 *     State Notetags
 * 
 * Version 1.22: October 17, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Response Popup Settings
 * **** Popup settings for response-type state effects (ie Counter, Reflect,
 *      Substitute).
 * **** See help file for more information.
 * 
 * Version 1.21: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > State Settings > Battle End Popups?
 * **** Show State Popup removal on battle end for battle state removal?
 * 
 * Version 1.20: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > State Settings > State Popups > Allow Duplicates?
 * **** Allow duplicate state popups to appear with the same graphical frame?
 * 
 * Version 1.19: March 16, 2023
 * * Compatibility Update!
 * ** Plugin is now updated for the recent changes made with the
 *    VisuMZ_2_DragonbonesUnion plugin.
 * 
 * Version 1.18: October 13, 2022
 * * Compatibility Update!
 * ** Plugin should be more compatible with VisuMZ_2_DragonbonesUnion.
 * 
 * Version 1.17: September 29, 2022
 * * Bug Fixes!
 * ** Filename has been shortened from VisuMZ_3_VisualStateEffects.js to
 *    VisuMZ_3_VisualStateEffect.js due to deployment reasons. For some mobile
 *    devices, keeping the name as long as VisuMZ_3_VisualStateEffects.js
 *    causes problems, but VisuMZ_3_VisualStateEffect.js is fine. Take note of
 *    this while you are updating.
 * 
 * Version 1.16: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New state notetag added by Irina: <Custom Overlay: filename>
 * *** For those who don't want to use the img/system/ folder's "States" image
 *     file and want something custom, this notetag will do exactly that.
 * *** Custom state overlays will follow similar dimensions to the original
 *     States image: Pixel Width of 768, Pixel Height of 96, Total Frames of 8.
 * *** If you want to use different sizes, we recommend you look into Effekseer
 *     custom animations with the <Repeat Animation: x> notetag instead.
 * 
 * Version 1.15: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: July 2, 2021
 * * Feature Updates!
 * ** When a battler's sprite opacity is zero, repeating animations are hidden
 *    along with them. Update made by Arisu.
 * 
 * Version 1.13: June 18, 2021
 * * Bug Fixes!
 * ** Repeating animations no longer play on invisible enemies or dead enemies
 *    through passive state effects. Fix made by Arisu.
 * 
 * Version 1.12: June 11, 2021
 * * Documentation Update!
 * ** Added warnings for the following notetags by Irina:
 * *** <Repeat Animation: x>
 * *** <State Motion: x>
 * *** <State Motion Lock>
 * *** <Visual Opacity: x>
 * *** <Visual Rainbow: +/-x>
 * *** <Visual Hover Effect>
 * *** <Visual Breathing Effect>
 * **** NOTE: Using this with Passive State Conditions will make this effect
 *      update at the next battler refresh cycle. This is due to the effect
 *      being cached in order to prevent lag and overloading the engine.
 * 
 * Version 1.11: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina:
 * *** <Visual Breathing Effect>
 * *** <No Breathing>
 * **** Enables/disables breathing effects for your actors and/or enemies.
 *      Refer to the documentation for more details on how to set it up.
 * **** These are EXPERIMENTAL notetags. This means that these effects have the
 *      possibility of creating graphical glitches when used. Use at your own
 *      risk as these are not perfected features.
 * 
 * Version 1.10: January 1, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Yanfly.
 * *** <Visual Rainbow: +x> and <Visual Rainbow: -x>
 * 
 * Version 1.09: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Yanfly.
 * *** <Visual Opacity: x> and <Visual Opacity: x%>
 * 
 * Version 1.08: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Requires updated Core Engine. Fix made by Yanfly.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** <State Motion: x> now works for sideview enemies. Keep in mind the state
 *    motion does not apply to the active battler during the Input phase. Fix
 *    made by Yanfly.
 * 
 * Version 1.06: November 8, 2020
 * * Bug Fixes!
 * ** <Add Animation: x> and <Erase Animation: x> notetags now work properly.
 *    Fix by Arisu.
 * 
 * Version 1.05: November 1, 2020
 * * Feature Update!
 * ** Upon dying, state removal popups are no longer shown to prevent massive
 *    clutter of the screen. Update by Irina.
 * 
 * Version 1.04: October 25, 2020
 * * Bug Fixes!
 * ** Zooming in should no longer display faint outlines around state sprites.
 *    Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility with the Battle Core's new <Battler Sprite Grounded>
 *    notetag. Added by Irina.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Motion Locked Battlers at the start of battle no longer show their entire
 *    sprite sheet. Fix made by Arisu.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update
 * ** Added compatibility with Battle Core's newest update for the new
 *    distortion effects.
 * 
 * Version 1.01: September 6, 2020
 * * Compatibility Update
 * ** Added compatibility with Battle Core's newest update for the
 *    <Battle UI Offset: +x, +y> notetags. Update made by Yanfly.
 *
 * Version 1.00: September 2, 2020
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
 * @param VisualStateEffects
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
 * @desc General settings for Visual State Effects.
 * @default {"Actors":"","ActorOverlay:eval":"true","ActorStateIcon:eval":"true","Enemies":"","EnemyOverlay:eval":"true","EnemyStateIcon:eval":"true"}
 *
 * @param BuffDebuff:struct
 * @text Buff/Debuff Settings
 * @type struct<BuffDebuff>
 * @desc Buff/Debuff settings for Visual State Effects.
 * @default {"ShowPopups:eval":"true","BuffPopupFmt:str":"%1▲","BuffTextColor:str":"24","BuffFlashColor:eval":"[0, 255, 0, 160]","BuffFlashDuration:num":"60","DebuffPopupFmt:str":"%1▼","DebuffTextColor:str":"27","DebuffFlashColor:eval":"[255, 0, 0, 160]","DebuffFlashDuration:num":"60","ShowAnimations:eval":"true","AnimationMirror:eval":"false","AnimationMute:eval":"false","BuffAnimations":"","Buff0Animation:num":"52","Buff1Animation:num":"53","Buff2Animation:num":"52","Buff3Animation:num":"52","Buff4Animation:num":"53","Buff5Animation:num":"53","Buff6Animation:num":"51","Buff7Animation:num":"51","DebuffAnimations":"","Debuff0Animation:num":"55","Debuff1Animation:num":"56","Debuff2Animation:num":"55","Debuff3Animation:num":"55","Debuff4Animation:num":"56","Debuff5Animation:num":"56","Debuff6Animation:num":"54","Debuff7Animation:num":"54"}
 *
 * @param State:struct
 * @text State Defaults
 * @type struct<State>
 * @desc Default State settings for Visual State Effects.
 * @default {"ShowPopups:eval":"true","AddPopupFmt:str":"+%1","ErasePopupFmt:str":"-%1","TextColor:str":"0","MatchTurnCountColor:eval":"true","FlashColor:eval":"[0, 0, 0, 0]","FlashDuration:num":"60","StateAnimations":"","AddEraseAnimations":"","AnimationMirror:eval":"false","AnimationMute:eval":"false","RepeatingAnimations":"","CycleTime:num":"300","RepeatMirror:eval":"false","RepeatMute:eval":"true"}
 *
 * @param CounterPopup:struct
 * @text Response Popup Settings
 * @parent State:struct
 * @type struct<CounterPopup>
 * @desc Popup settings for response-type state effects.
 * @default {"Counter":"","CounterPopupText:str":"COUNTER!","CounterIcon:num":"0","CounterTextColor:str":"0","CounterTextColorID:num":"0","CounterFlashColor:eval":"[255, 255, 255, 160]","CounterFlashDuration:num":"60","Reflect":"","ReflectPopupText:str":"REFLECT!","ReflectIcon:num":"0","ReflectTextColor:str":"0","ReflectTextColorID:num":"0","ReflectFlashColor:eval":"[255, 255, 255, 160]","ReflectFlashDuration:num":"60","Sub":"","SubPopupText:str":"COVER!","SubIcon:num":"0","SubTextColor:str":"0","SubTextColorID:num":"0","SubFlashColor:eval":"[255, 255, 255, 160]","SubFlashDuration:num":"60"}
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
 * @param Actors
 *
 * @param ActorOverlay:eval
 * @text Show State Overlay?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state overlays over an actor's head?
 * @default true
 *
 * @param ActorStateIcon:eval
 * @text Show State Icons?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state icons over an actor's head?
 * @default true
 *
 * @param Enemies
 *
 * @param EnemyOverlay:eval
 * @text Show State Overlay?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state overlays over an enemy's head?
 * @default true
 *
 * @param EnemyStateIcon:eval
 * @text Show State Icons?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state icons over an enemy's head?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BuffDebuff:
 *
 * @param ShowPopups:eval
 * @text Show Popups?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Buff/Debuff Popups when applied?
 * @default true
 *
 * @param BuffPopupFmt:str
 * @text Buff Format
 * @parent ShowPopups:eval
 * @desc How do you want the buff text to appear?
 * %1 - Parameter Name
 * @default %1▲
 *
 * @param BuffTextColor:str
 * @text Text Color
 * @parent BuffPopupFmt:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param BuffFlashColor:eval
 * @text Flash Color
 * @parent BuffPopupFmt:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param BuffFlashDuration:num
 * @text Flash Duration
 * @parent BuffPopupFmt:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param DebuffPopupFmt:str
 * @text Debuff Format
 * @parent ShowPopups:eval
 * @desc How do you want the debuff text to appear?
 * %1 - Parameter Name
 * @default %1▼
 *
 * @param DebuffTextColor:str
 * @text Text Color
 * @parent DebuffPopupFmt:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param DebuffFlashColor:eval
 * @text Flash Color
 * @parent DebuffPopupFmt:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DebuffFlashDuration:num
 * @text Flash Duration
 * @parent DebuffPopupFmt:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Buff/Debuff Animations when applied?
 * @default true
 *
 * @param AnimationMirror:eval
 * @text Mirror Animations?
 * @parent ShowAnimations:eval
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations for buffs/debuffs?
 * @default false
 *
 * @param AnimationMute:eval
 * @text Mute Animations?
 * @parent ShowAnimations:eval
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute animations for buffs/debuffs?
 * @default false
 * 
 * @param BuffAnimations
 * @text Buff Animations
 * @parent ShowAnimations:eval
 *
 * @param Buff0Animation:num
 * @text MaxHP Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MaxHP Buffs.
 * @default 52
 *
 * @param Buff1Animation:num
 * @text MaxMP Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MaxMP Buffs.
 * @default 53
 *
 * @param Buff2Animation:num
 * @text ATK Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying ATK Buffs.
 * @default 52
 *
 * @param Buff3Animation:num
 * @text DEF Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying DEF Buffs.
 * @default 52
 *
 * @param Buff4Animation:num
 * @text MAT Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MAT Buffs.
 * @default 53
 *
 * @param Buff5Animation:num
 * @text MDF Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MDF Buffs.
 * @default 53
 *
 * @param Buff6Animation:num
 * @text AGI Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying AGI Buffs.
 * @default 51
 *
 * @param Buff7Animation:num
 * @text LUK Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying LUK Buffs.
 * @default 51
 * 
 * @param DebuffAnimations
 * @text Debuff Animations
 * @parent ShowAnimations:eval
 *
 * @param Debuff0Animation:num
 * @text MaxHP Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MaxHP Debuffs.
 * @default 55
 *
 * @param Debuff1Animation:num
 * @text MaxMP Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MaxMP Debuffs.
 * @default 56
 *
 * @param Debuff2Animation:num
 * @text ATK Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying ATK Debuffs.
 * @default 55
 *
 * @param Debuff3Animation:num
 * @text DEF Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying DEF Debuffs.
 * @default 55
 *
 * @param Debuff4Animation:num
 * @text MAT Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MAT Debuffs.
 * @default 56
 *
 * @param Debuff5Animation:num
 * @text MDF Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MDF Debuffs.
 * @default 56
 *
 * @param Debuff6Animation:num
 * @text AGI Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying AGI Debuffs.
 * @default 54
 *
 * @param Debuff7Animation:num
 * @text LUK Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying LUK Debuffs.
 * @default 54
 *
 */
/* ----------------------------------------------------------------------------
 * State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~State:
 *
 * @param ShowPopups:eval
 * @text Show Popups?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show States Popups when applied and removed?
 * @default true
 *
 * @param AllowDupes:eval
 * @text Allow Duplicates?
 * @parent ShowPopups:eval
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow duplicate state popups to appear with the same graphical frame?
 * @default false
 *
 * @param BattleEndPopup:eval
 * @text Battle End Popups?
 * @parent ShowPopups:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show State Popup removal on battle end for battle state removal?
 * @default true
 *
 * @param AddPopupFmt:str
 * @text Add State Format
 * @parent ShowPopups:eval
 * @desc How do you want added states to appear?
 * %1 - State Name
 * @default +%1
 *
 * @param ErasePopupFmt:str
 * @text Erase State Format
 * @parent ShowPopups:eval
 * @desc How do you want erased states to appear?
 * %1 - State Name
 * @default -%1
 *
 * @param TextColor:str
 * @text Default Text Color
 * @parent ShowPopups:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param MatchTurnCountColor:eval
 * @text Match Turn Count?
 * @parent TextColor:str
 * @type boolean
 * @on Match
 * @off Don't
 * @desc Match turn count color by default?
 * @default true
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent ShowPopups:eval
 * @desc Adjust the popup's default flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type number
 * @desc What is the frame duration of the default flash effect?
 * @default 60
 * 
 * @param StateAnimations
 * @text State Animations
 * 
 * @param AddEraseAnimations
 * @text Add/Erase Animations
 * @parent StateAnimations
 *
 * @param AnimationMirror:eval
 * @text Mirror Animations?
 * @parent AddEraseAnimations
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations for states?
 * @default false
 *
 * @param AnimationMute:eval
 * @text Mute Animations?
 * @parent AddEraseAnimations
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute animations for states?
 * @default false
 * 
 * @param RepeatingAnimations
 * @text Repeating Animations
 * @parent StateAnimations
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent RepeatingAnimations
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 300
 *
 * @param RepeatMirror:eval
 * @text Mirror Animations?
 * @parent RepeatingAnimations
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror repeating animations for states by default?
 * @default false
 *
 * @param RepeatMute:eval
 * @text Mute Animations?
 * @parent RepeatingAnimations
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute repeating animations for states by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Counter Popups Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CounterPopup:
 *
 * @param Counter
 * @text Counter Popup
 *
 * @param CounterPopupText:str
 * @text Text
 * @parent Counter
 * @desc Text displayed upon the effect activating.
 * @default COUNTER!
 *
 * @param CounterIcon:num
 * @text Icon Index
 * @parent Counter
 * @desc What icon is used for this popup?
 * @default 0
 *
 * @param CounterTextColor:str
 * @text Text Color
 * @parent Counter
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param CounterFlashColor:eval
 * @text Flash Color
 * @parent Counter
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param CounterFlashDuration:num
 * @text Flash Duration
 * @parent Counter
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Reflect
 * @text Reflect Popup
 *
 * @param ReflectPopupText:str
 * @text Text
 * @parent Reflect
 * @desc Text displayed upon the effect activating.
 * @default REFLECT!
 *
 * @param ReflectIcon:num
 * @text Icon Index
 * @parent Reflect
 * @desc What icon is used for this popup?
 * @default 0
 *
 * @param ReflectTextColor:str
 * @text Text Color
 * @parent Reflect
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ReflectFlashColor:eval
 * @text Flash Color
 * @parent Reflect
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param ReflectFlashDuration:num
 * @text Flash Duration
 * @parent Reflect
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Sub
 * @text Substitute Popup
 *
 * @param SubPopupText:str
 * @text Text
 * @parent Sub
 * @desc Text displayed upon the effect activating.
 * @default COVER!
 *
 * @param SubIcon:num
 * @text Icon Index
 * @parent Sub
 * @desc What icon is used for this popup?
 * @default 0
 *
 * @param SubTextColor:str
 * @text Text Color
 * @parent Sub
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param SubFlashColor:eval
 * @text Flash Color
 * @parent Sub
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param SubFlashDuration:num
 * @text Flash Duration
 * @parent Sub
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
//=============================================================================

const _0x45d17c=_0x2645;function _0x4963(){const _0x5a3a93=['MatchTurnCountColor','1559620jVjpZs','flashColor','Sprite_StateOverlay_updateFrame','Sprite_Battler_mainSpriteScaleY','ARRAYSTRUCT','length','idle','loadBitmap','createStateIconSprite','displayReflection','update','1389145RmygQi','%1PopupText','_visualStateAnimationIndex','description','1216818FDNIdL','requestFauxAnimation','checkCacheKey','setupStateAnimation','Sprite_Battler_updateDragonbonesTimeScale','_dragonbones','setBattler','_hoverRand','noBreathing','12liTbTT','applyBreathingScaleX','min','hoverHeight','isDead','width','isAppeared','clamp','ARRAYSTR','_dragonbonesSpriteContainer','_stateMotionLocked','562128keBdfp','General','States','setupBuffDebuffPopup','BattleEndPopup','_stateSprite','Sprite_Actor_setBattler','3392136omjPUu','onAddState','hpLinked','ActorStateIcon','Sprite_Enemy_createStateIconSprite','ARRAYEVAL','isSceneBattle','createVisualBreathingData','parse','Sprite_Battler_mainSpriteScaleX','ConvertParams','height','speedY','Sprite_Actor_updateFrame','addLoadListener','increaseBuff','customizeStatePopup','%1TextColor','visualRepeatingStateAnimation','%1FlashColor','JSON','format','_frame','_stateIconSprite','stateMotionIndex','addChild','rate','_breathingRand','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Window_BattleLog_displaySubstitute','state-%1-%2-%3','Sprite_Enemy_update','Sprite_Battler_playDragonbonesMotion','setupTextPopup','breathing','AllowDupes','FUNC','ICON_DEBUFF_START','visualRepeatingStateAniCycle','_cache','constructor','mainSpriteScaleX','hoverData','status','ActorOverlay','%1%2Animation','setupIconTextPopup','updateFrame','hpRate','floor','updateOpacity','BuffDebuff','_bitmapName','scale','call','extraPositionY','getStateOverlayIndex','visible','battleUIOffsetY','_die_bypass_visualStateEffects','breathingData','getVisualRepeatingStateAnimation','isBattlerGrounded','setupVisualStateEffect','match','AnimationMirror','onLoadDefaultOverlayBitmap','hover','createVisualStateTone','Sprite_Actor_refreshMotion','Game_BattlerBase_initMembers','param','round','createVisualHoveringData','isActor','decreaseBuff','_distortionSprite','Game_Battler_onRemoveState','setupVisualBuffDebuffEffect','VisuMZ_2_DragonbonesUnion','name','VisuMZ_1_BattleCore','Game_Battler_removeBattleStates','%1PopupFmt','displaySubstitute','ARRAYFUNC','animation','25170dEwAIi','traitObjects','prototype','random','Buff','initVisualStateEffects','visualStateToneTargetSprite','_overlayIndex','Window_BattleLog_displayReflection','overlay','cos','ShowPopups','_loadingCustomOverlay','playDragonbonesMotion','motion','CounterPopup','Sprite_Enemy_setBattler','speedX','_visualStateAnimationRepeatDuration','filter','initMembers','VisualStateEffects','Sprite_StateOverlay_loadBitmap','string','getStateMotionLock','startMotion','updateDragonbonesTimeScale','%1FlashDuration','flashDuration','states','removeBattleStates','refresh','frameCount','stateColor','visualStateTone','isActing','AnimationMute','onLoadCustomOverlayBitmap','initVisualHoverEffect','visualStateRainbow','updateVisualStateEffects','_battler','bind','getVisualStateTone','onRemoveState','trim','Game_BattlerBase_die','createVisualBattlerOpacity','Sprite_Battler_initMembers','speed','6Jvciwl','VisuMZ_0_CoreEngine','Erase','parameters','Game_BattlerBase_increaseBuff','randomInt','note','timeScale','applyBreathingCalculations','FlashColor','updateCustomOverlayFrame','CycleTime','max','smooth','isStateAffected','VisuMZ_1_SkillsStatesCore','toUpperCase','battleUIOffsetX','isInputting','createVisualRepeatingStateAnimationCycle','Window_BattleLog_displayCounter','some','rateX','displayCounter','IconSet','_mainSprite','map','stateMotionLock','applyBreathingScaleY','setColorTone','getVisualRepeatingStateAnimationCycle','textColor','opacity','_customStateMotion','isSpriteVisible','setHue','Sprite_SvEnemy','toLowerCase','createVisualStateRainbow','Sprite_Actor_update','Settings','Reflect','_actor','238988OIjTaK','setup','updateDistortionOpacity','_show_battleRemovalStates','die','concat','State','_hoverMinimum','FlashDuration','iconIndex','createVisualRepeatingStateAnimation','STR','createStateSprite','bitmap','refreshMotion','updateVisualStateEffectsOverlay','updateVisualStateEffectsIcons','updateVisualStateRainbow','Game_Battler_onAddState','STRUCT','exit','%1CounterIcon','_noDoublePopups','visualBattlerOpacity','base','Debuff','ShowAnimations','return\x200','battler','SetupResponsePopup','passiveStateObjects','Sprite_SvEnemy_refreshMotion','updateVisualStateTone','setupVisualStateEffectsPopup','includes','isRepeatingVisualStateAnimationShown','loadSystem','Sprite_Battler_updateOpacity','Game_BattlerBase_refresh','Sub','EnemyOverlay','split','deathStateId','Sprite_Battler_extraPositionY','push','ICON_BUFF_START','updateRepeatingVisualStateAnimation','EnemyStateIcon','NUM','Game_BattlerBase_decreaseBuff','RepeatMute','deathHover'];_0x4963=function(){return _0x5a3a93;};return _0x4963();}function _0x2645(_0x3794c0,_0x1cbd65){const _0x4963f3=_0x4963();return _0x2645=function(_0x2645b2,_0x5292bb){_0x2645b2=_0x2645b2-0x1c4;let _0x43c788=_0x4963f3[_0x2645b2];return _0x43c788;},_0x2645(_0x3794c0,_0x1cbd65);}(function(_0x3b5a2d,_0x1d5699){const _0x3e553b=_0x2645,_0x352d95=_0x3b5a2d();while(!![]){try{const _0x5e0f6c=parseInt(_0x3e553b(0x28d))/0x1+parseInt(_0x3e553b(0x1d7))/0x2*(-parseInt(_0x3e553b(0x2bf))/0x3)+parseInt(_0x3e553b(0x20c))/0x4+-parseInt(_0x3e553b(0x217))/0x5+-parseInt(_0x3e553b(0x224))/0x6*(-parseInt(_0x3e553b(0x22f))/0x7)+parseInt(_0x3e553b(0x236))/0x8+-parseInt(_0x3e553b(0x21b))/0x9;if(_0x5e0f6c===_0x1d5699)break;else _0x352d95['push'](_0x352d95['shift']());}catch(_0x127ae3){_0x352d95['push'](_0x352d95['shift']());}}}(_0x4963,0x54e21));var label='VisualStateEffects',tier=tier||0x0,dependencies=[_0x45d17c(0x2c0),_0x45d17c(0x287),_0x45d17c(0x2ce)],pluginData=$plugins[_0x45d17c(0x2a0)](function(_0x556661){const _0x2462f9=_0x45d17c;return _0x556661[_0x2462f9(0x261)]&&_0x556661[_0x2462f9(0x21a)][_0x2462f9(0x1f9)]('['+label+']');})[0x0];VisuMZ[label][_0x45d17c(0x1d4)]=VisuMZ[label][_0x45d17c(0x1d4)]||{},VisuMZ[_0x45d17c(0x240)]=function(_0x1f4503,_0x3a4cec){const _0x46e397=_0x45d17c;for(const _0x524ed3 in _0x3a4cec){if(_0x524ed3[_0x46e397(0x276)](/(.*):(.*)/i)){const _0x95f04c=String(RegExp['$1']),_0x4a8058=String(RegExp['$2'])[_0x46e397(0x2cf)]()['trim']();let _0x172faf,_0x5b4224,_0x3de9ff;switch(_0x4a8058){case _0x46e397(0x207):_0x172faf=_0x3a4cec[_0x524ed3]!==''?Number(_0x3a4cec[_0x524ed3]):0x0;break;case'ARRAYNUM':_0x5b4224=_0x3a4cec[_0x524ed3]!==''?JSON[_0x46e397(0x23e)](_0x3a4cec[_0x524ed3]):[],_0x172faf=_0x5b4224[_0x46e397(0x1c6)](_0xe0bb0c=>Number(_0xe0bb0c));break;case'EVAL':_0x172faf=_0x3a4cec[_0x524ed3]!==''?eval(_0x3a4cec[_0x524ed3]):null;break;case _0x46e397(0x23b):_0x5b4224=_0x3a4cec[_0x524ed3]!==''?JSON['parse'](_0x3a4cec[_0x524ed3]):[],_0x172faf=_0x5b4224[_0x46e397(0x1c6)](_0x121b56=>eval(_0x121b56));break;case _0x46e397(0x24a):_0x172faf=_0x3a4cec[_0x524ed3]!==''?JSON[_0x46e397(0x23e)](_0x3a4cec[_0x524ed3]):'';break;case'ARRAYJSON':_0x5b4224=_0x3a4cec[_0x524ed3]!==''?JSON[_0x46e397(0x23e)](_0x3a4cec[_0x524ed3]):[],_0x172faf=_0x5b4224['map'](_0x414448=>JSON[_0x46e397(0x23e)](_0x414448));break;case _0x46e397(0x25a):_0x172faf=_0x3a4cec[_0x524ed3]!==''?new Function(JSON[_0x46e397(0x23e)](_0x3a4cec[_0x524ed3])):new Function(_0x46e397(0x1f2));break;case _0x46e397(0x28b):_0x5b4224=_0x3a4cec[_0x524ed3]!==''?JSON[_0x46e397(0x23e)](_0x3a4cec[_0x524ed3]):[],_0x172faf=_0x5b4224[_0x46e397(0x1c6)](_0x1c761f=>new Function(JSON[_0x46e397(0x23e)](_0x1c761f)));break;case _0x46e397(0x1e2):_0x172faf=_0x3a4cec[_0x524ed3]!==''?String(_0x3a4cec[_0x524ed3]):'';break;case _0x46e397(0x22c):_0x5b4224=_0x3a4cec[_0x524ed3]!==''?JSON[_0x46e397(0x23e)](_0x3a4cec[_0x524ed3]):[],_0x172faf=_0x5b4224[_0x46e397(0x1c6)](_0x19aedc=>String(_0x19aedc));break;case _0x46e397(0x1ea):_0x3de9ff=_0x3a4cec[_0x524ed3]!==''?JSON[_0x46e397(0x23e)](_0x3a4cec[_0x524ed3]):{},_0x172faf=VisuMZ[_0x46e397(0x240)]({},_0x3de9ff);break;case _0x46e397(0x210):_0x5b4224=_0x3a4cec[_0x524ed3]!==''?JSON[_0x46e397(0x23e)](_0x3a4cec[_0x524ed3]):[],_0x172faf=_0x5b4224[_0x46e397(0x1c6)](_0x307230=>VisuMZ[_0x46e397(0x240)]({},JSON[_0x46e397(0x23e)](_0x307230)));break;default:continue;}_0x1f4503[_0x95f04c]=_0x172faf;}}return _0x1f4503;},(_0x46d839=>{const _0xfb26a6=_0x45d17c,_0x389a80=_0x46d839[_0xfb26a6(0x286)];for(const _0x21e87c of dependencies){if(!Imported[_0x21e87c]){alert(_0xfb26a6(0x252)[_0xfb26a6(0x24b)](_0x389a80,_0x21e87c)),SceneManager['exit']();break;}}const _0x24d5cd=_0x46d839[_0xfb26a6(0x21a)];if(_0x24d5cd[_0xfb26a6(0x276)](/\[Version[ ](.*?)\]/i)){const _0x454f7d=Number(RegExp['$1']);_0x454f7d!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0xfb26a6(0x24b)](_0x389a80,_0x454f7d)),SceneManager[_0xfb26a6(0x1eb)]());}if(_0x24d5cd[_0xfb26a6(0x276)](/\[Tier[ ](\d+)\]/i)){const _0xcd1ab0=Number(RegExp['$1']);_0xcd1ab0<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0xfb26a6(0x24b)](_0x389a80,_0xcd1ab0,tier)),SceneManager[_0xfb26a6(0x1eb)]()):tier=Math['max'](_0xcd1ab0,tier);}VisuMZ[_0xfb26a6(0x240)](VisuMZ[label]['Settings'],_0x46d839[_0xfb26a6(0x2c2)]);})(pluginData),VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x27c)]=Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x2a1)],Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x2a1)]=function(){const _0x124229=_0x45d17c;this[_0x124229(0x25d)]={},VisuMZ['VisualStateEffects'][_0x124229(0x27c)][_0x124229(0x26c)](this);},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x1fd)]=Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x2ac)],Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x2ac)]=function(){const _0x3145f4=_0x45d17c;this[_0x3145f4(0x25d)]={},VisuMZ[_0x3145f4(0x2a2)][_0x3145f4(0x1fd)][_0x3145f4(0x26c)](this);},Game_BattlerBase[_0x45d17c(0x28f)]['checkCacheKey']=function(_0x25eb16){const _0x3ff04d=_0x45d17c;return this[_0x3ff04d(0x25d)]=this[_0x3ff04d(0x25d)]||{},this[_0x3ff04d(0x25d)][_0x25eb16]!==undefined;},VisuMZ[_0x45d17c(0x2a2)]['Game_BattlerBase_increaseBuff']=Game_BattlerBase[_0x45d17c(0x28f)]['increaseBuff'],Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x245)]=function(_0x9e35cd){const _0x3df3e2=_0x45d17c;VisuMZ[_0x3df3e2(0x2a2)][_0x3df3e2(0x2c3)][_0x3df3e2(0x26c)](this,_0x9e35cd),this['setupVisualBuffDebuffEffect'](_0x9e35cd,!![]);},VisuMZ['VisualStateEffects']['Game_BattlerBase_decreaseBuff']=Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x281)],Game_BattlerBase[_0x45d17c(0x28f)]['decreaseBuff']=function(_0x492850){const _0x3f48ab=_0x45d17c;VisuMZ[_0x3f48ab(0x2a2)][_0x3f48ab(0x208)][_0x3f48ab(0x26c)](this,_0x492850),this[_0x3f48ab(0x284)](_0x492850,![]);},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x284)]=function(_0x2bc759,_0x122a5f){const _0x43ff78=_0x45d17c;if(!SceneManager['isSceneBattle']())return;if(!this[_0x43ff78(0x1f3)]())return;const _0x4c279c=VisuMZ[_0x43ff78(0x2a2)][_0x43ff78(0x1d4)]['BuffDebuff'],_0x582d3d=_0x122a5f?_0x43ff78(0x291):'Debuff';_0x4c279c[_0x43ff78(0x298)]&&this[_0x43ff78(0x1f3)]()[_0x43ff78(0x232)](_0x2bc759,_0x122a5f);if(_0x4c279c[_0x43ff78(0x1f1)]){const _0x5be03a=[this],_0x53d36d=_0x4c279c[_0x43ff78(0x263)[_0x43ff78(0x24b)](_0x582d3d,_0x2bc759)]||0x0,_0xdf58c7=_0x4c279c['AnimationMirror'],_0x21fa6a=_0x4c279c['AnimationMute'];$gameTemp[_0x43ff78(0x21c)](_0x5be03a,_0x53d36d,_0xdf58c7,_0x21fa6a);}},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x275)]=function(_0x7f6693,_0x1e7d81){const _0x581d28=_0x45d17c;if(!SceneManager[_0x581d28(0x23c)]())return;if(_0x7f6693===this[_0x581d28(0x201)]())return;if(_0x1e7d81&&!this[_0x581d28(0x2cd)](_0x7f6693))return;if(!_0x1e7d81&&this[_0x581d28(0x2cd)](_0x7f6693))return;if(!this[_0x581d28(0x1f3)]())return;const _0x4585eb=VisuMZ[_0x581d28(0x2a2)][_0x581d28(0x1d4)][_0x581d28(0x1dd)],_0x18a235=$dataStates[_0x7f6693];if(!_0x18a235)return;_0x4585eb['ShowPopups']&&!_0x18a235[_0x581d28(0x2c5)][_0x581d28(0x276)](/<HIDE STATE POPUP>/i)&&this['battler']()[_0x581d28(0x1f8)](_0x7f6693,_0x1e7d81),VisuMZ['VisualStateEffects'][_0x581d28(0x21e)](this,_0x18a235,_0x1e7d81);},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x21e)]=function(_0x11dd3f,_0x597979,_0x2433f7){const _0x55c882=_0x45d17c,_0x51380f=VisuMZ[_0x55c882(0x2a2)][_0x55c882(0x1d4)][_0x55c882(0x1dd)],_0x329c06=_0x51380f[_0x55c882(0x277)],_0x680b1f=_0x51380f[_0x55c882(0x2b1)],_0x49e5cb=_0x597979[_0x55c882(0x2c5)];if(_0x2433f7&&_0x49e5cb[_0x55c882(0x276)](/(?:ADD|APPLY) ANIMATION:[ ](\d+)/i)){const _0x17353b=Number(RegExp['$1']);$gameTemp[_0x55c882(0x21c)]([_0x11dd3f],_0x17353b,_0x329c06,_0x680b1f);}if(!_0x2433f7&&_0x49e5cb[_0x55c882(0x276)](/(?:ERASE|REMOVE) ANIMATION:[ ](\d+)/i)){const _0x190fdf=Number(RegExp['$1']);$gameTemp[_0x55c882(0x21c)]([_0x11dd3f],_0x190fdf,_0x329c06,_0x680b1f);}},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x273)]=function(){const _0x479c0f=_0x45d17c,_0x489d11=_0x479c0f(0x248);if(this[_0x479c0f(0x21d)](_0x489d11))return this[_0x479c0f(0x25d)][_0x489d11];return this[_0x479c0f(0x25d)][_0x489d11]=this[_0x479c0f(0x1e1)](),this[_0x479c0f(0x25d)][_0x489d11];},Game_BattlerBase[_0x45d17c(0x28f)]['createVisualRepeatingStateAnimation']=function(){const _0x658bd3=_0x45d17c;let _0x282038=[];const _0x1fb735=this[_0x658bd3(0x1f5)]?this[_0x658bd3(0x1f5)]()[_0x658bd3(0x1dc)](this['states']()):this[_0x658bd3(0x28e)]();for(const _0x4c52b5 of _0x1fb735){if(!_0x4c52b5)continue;_0x4c52b5[_0x658bd3(0x2c5)][_0x658bd3(0x276)](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION:[ ](\d+)>/i)&&_0x282038[_0x658bd3(0x203)](Number(RegExp['$1'])||0x0);}return _0x282038;},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x1ca)]=function(){const _0x299dfb=_0x45d17c,_0x3c593c=_0x299dfb(0x25c);if(this[_0x299dfb(0x21d)](_0x3c593c))return this['_cache'][_0x3c593c];return this[_0x299dfb(0x25d)][_0x3c593c]=this[_0x299dfb(0x2d2)](),this[_0x299dfb(0x25d)][_0x3c593c];},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x2d2)]=function(){const _0x57e645=_0x45d17c;let _0x2da460=[];const _0x11e1bc=this['passiveStateObjects']?this['passiveStateObjects']()[_0x57e645(0x1dc)](this[_0x57e645(0x2aa)]()):this[_0x57e645(0x28e)]();for(const _0x1644da of _0x11e1bc){if(!_0x1644da)continue;_0x1644da[_0x57e645(0x2c5)][_0x57e645(0x276)](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION:[ ](\d+)>/i)&&(_0x1644da[_0x57e645(0x2c5)][_0x57e645(0x276)](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION CYCLE:[ ](\d+)>/i)?_0x2da460[_0x57e645(0x203)](Number(RegExp['$1'])||0x0):_0x2da460[_0x57e645(0x203)](VisuMZ[_0x57e645(0x2a2)]['Settings'][_0x57e645(0x1dd)][_0x57e645(0x2ca)]));}return _0x2da460;},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x24e)]=function(){const _0x42e2c=_0x45d17c,_0x5ee6f4=_0x42e2c(0x24e);if(this[_0x42e2c(0x21d)](_0x5ee6f4))return this[_0x42e2c(0x25d)][_0x5ee6f4];return this['_cache'][_0x5ee6f4]=this['getStateMotionIndex'](),this[_0x42e2c(0x25d)][_0x5ee6f4];},Game_BattlerBase['prototype']['getStateMotionIndex']=function(){const _0x43032c=_0x45d17c,_0x379e74=this[_0x43032c(0x2aa)]();for(const _0x3a91e8 of _0x379e74){if(!_0x3a91e8)continue;if(_0x3a91e8['note'][_0x43032c(0x276)](/<STATE MOTION:[ ](.*)>/i))return this['_customStateMotion']=String(RegExp['$1'])[_0x43032c(0x1d1)]()[_0x43032c(0x2ba)](),0x4;else{if(_0x3a91e8[_0x43032c(0x29b)]!==0x0)return _0x3a91e8[_0x43032c(0x29b)];}}return 0x0;},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x1c7)]=function(){const _0x23a11f=_0x45d17c,_0x53bda2=_0x23a11f(0x1c7);if(this[_0x23a11f(0x21d)](_0x53bda2))return this['_cache'][_0x53bda2];return this[_0x23a11f(0x25d)][_0x53bda2]=this[_0x23a11f(0x2a5)](),this['_cache'][_0x53bda2];},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x2a5)]=function(){const _0x1d8390=_0x45d17c,_0x1cb8a1=this[_0x1d8390(0x2aa)]();for(const _0x3ad3cf of _0x1cb8a1){if(!_0x3ad3cf)continue;if(_0x3ad3cf['note'][_0x1d8390(0x276)](/<STATE MOTION (?:LOCK|LOCKED)>/i))return!![];}return![];},Game_BattlerBase[_0x45d17c(0x28f)]['stateOverlayIndex']=function(){const _0x147ffb=_0x45d17c,_0x369354='stateOverlayIndex';if(this['checkCacheKey'](_0x369354))return this['_cache'][_0x369354];return this[_0x147ffb(0x25d)][_0x369354]=this[_0x147ffb(0x26e)](),this[_0x147ffb(0x25d)][_0x369354];},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x26e)]=function(){const _0x3d69b0=_0x45d17c,_0x36d485=this[_0x3d69b0(0x2aa)]();for(const _0x938c0e of _0x36d485){if(!_0x938c0e)continue;if(_0x938c0e[_0x3d69b0(0x2c5)]['match'](/<CUSTOM OVERLAY:[ ](.*)>/i))return String(RegExp['$1']);if(_0x938c0e[_0x3d69b0(0x296)]!==0x0)return _0x938c0e[_0x3d69b0(0x296)];}return 0x0;},Game_BattlerBase[_0x45d17c(0x28f)]['getVisualStateTone']=function(){const _0x2b9796=_0x45d17c,_0x6e9be5=_0x2b9796(0x2af);if(this[_0x2b9796(0x21d)](_0x6e9be5))return this[_0x2b9796(0x25d)][_0x6e9be5];return this[_0x2b9796(0x25d)][_0x6e9be5]=this[_0x2b9796(0x27a)](),this[_0x2b9796(0x25d)][_0x6e9be5];},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x27a)]=function(){const _0x3b23c6=_0x45d17c;for(const _0x3721cf of this[_0x3b23c6(0x2aa)]()){if(!_0x3721cf)continue;if(_0x3721cf[_0x3b23c6(0x2c5)][_0x3b23c6(0x276)](/<STATE TONE:[ ](.*)>/i)){let _0x396416=String(RegExp['$1'])[_0x3b23c6(0x2ba)]()[_0x3b23c6(0x200)](',')[_0x3b23c6(0x1c6)](_0x5390a1=>Number(_0x5390a1)||0x0);while(_0x396416['length']<0x4)_0x396416[_0x3b23c6(0x203)](0x0);return _0x396416[0x0]=_0x396416[0x0]['clamp'](-0xff,0xff),_0x396416[0x1]=_0x396416[0x1][_0x3b23c6(0x22b)](-0xff,0xff),_0x396416[0x2]=_0x396416[0x2][_0x3b23c6(0x22b)](-0xff,0xff),_0x396416[0x3]=_0x396416[0x3][_0x3b23c6(0x22b)](0x0,0xff),_0x396416;}}return[0x0,0x0,0x0,0x0];},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x260)]=function(){const _0x56c090=_0x45d17c,_0x3e915b='hoverData';if(this[_0x56c090(0x21d)](_0x3e915b))return this[_0x56c090(0x25d)][_0x3e915b];return this['_cache'][_0x3e915b]=this['createVisualHoveringData'](),this[_0x56c090(0x25d)][_0x3e915b];},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x27f)]=function(){const _0x1f1199=_0x45d17c,_0x38d00b=/<VISUAL (?:HOVER|FLOAT) EFFECT>\s*([\s\S]*)\s*<\/VISUAL (?:HOVER|FLOAT) EFFECT>/i,_0xc44303={'hover':![],'base':0x64,'speed':0x14,'rate':0x5,'deathHover':![]};for(const _0x26d3b8 of this[_0x1f1199(0x28e)]()){if(!_0x26d3b8)continue;if(_0x26d3b8[_0x1f1199(0x2c5)][_0x1f1199(0x276)](_0x38d00b)){_0xc44303['hover']=!![];const _0x5a8970=String(RegExp['$1']);_0x5a8970[_0x1f1199(0x276)](/BASE:[ ](.*)/i)&&(_0xc44303['base']=Number(RegExp['$1'])||0x0);_0x5a8970[_0x1f1199(0x276)](/SPEED:[ ](.*)/i)&&(_0xc44303[_0x1f1199(0x2be)]=Number(RegExp['$1'])||0x0);_0x5a8970[_0x1f1199(0x276)](/RATE:[ ](.*)/i)&&(_0xc44303['rate']=Number(RegExp['$1'])||0x0);if(_0x5a8970[_0x1f1199(0x276)](/DEATH: HOVER/i))_0xc44303[_0x1f1199(0x20a)]=!![];else _0x5a8970['match'](/DEATH: FLOOR/i)&&(_0xc44303[_0x1f1199(0x20a)]=![]);break;}}return _0xc44303;},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x223)]=function(){const _0x233afd=_0x45d17c,_0x87327d=_0x233afd(0x223);if(this[_0x233afd(0x21d)](_0x87327d))return this[_0x233afd(0x25d)][_0x87327d];const _0x4a1f6b=this[_0x233afd(0x28e)]();return this[_0x233afd(0x25d)][_0x87327d]=_0x4a1f6b[_0x233afd(0x2d4)](_0x2f72f0=>_0x2f72f0&&_0x2f72f0['note'][_0x233afd(0x276)](/<NO (?:BREATH|BREATHING)>/i)),this['_cache'][_0x87327d];},Game_BattlerBase[_0x45d17c(0x28f)]['breathingData']=function(){const _0x4166e7=_0x45d17c,_0xb8dfbc=_0x4166e7(0x272);if(this['checkCacheKey'](_0xb8dfbc))return this[_0x4166e7(0x25d)][_0xb8dfbc];return this[_0x4166e7(0x25d)][_0xb8dfbc]=this['createVisualBreathingData'](),this['_cache'][_0xb8dfbc];},Game_BattlerBase['prototype'][_0x45d17c(0x23d)]=function(){const _0x4d05b2=_0x45d17c,_0x2d7719=/<VISUAL (?:BREATH|BREATHING) EFFECT>\s*([\s\S]*)\s*<\/VISUAL (?:BREATH|BREATHING) EFFECT>/i,_0xf01109={'breathing':![],'speedX':0xa,'speedY':0xa,'rateX':0x0,'rateY':0.02,'hpLinked':![]};for(const _0x2b93e1 of this[_0x4d05b2(0x28e)]()){if(!_0x2b93e1)continue;if(_0x2b93e1[_0x4d05b2(0x2c5)][_0x4d05b2(0x276)](_0x2d7719)){_0xf01109['breathing']=!![];const _0x468522=String(RegExp['$1']);_0x468522[_0x4d05b2(0x276)](/SPEED:[ ](.*)/i)&&(_0xf01109['speedX']=Number(RegExp['$1'])||0x0,_0xf01109[_0x4d05b2(0x242)]=Number(RegExp['$1'])||0x0);_0x468522[_0x4d05b2(0x276)](/(?:SPEEDX|SPEED X):[ ](.*)/i)&&(_0xf01109[_0x4d05b2(0x29e)]=Number(RegExp['$1'])||0x0);_0x468522['match'](/(?:SPEEDY|SPEED Y):[ ](.*)/i)&&(_0xf01109[_0x4d05b2(0x242)]=Number(RegExp['$1'])||0x0);_0x468522[_0x4d05b2(0x276)](/RATE:[ ](.*)/i)&&(_0xf01109['rateX']=Number(RegExp['$1'])||0x0,_0xf01109['rateY']=Number(RegExp['$1'])||0x0);_0x468522[_0x4d05b2(0x276)](/(?:RATEX|RATE X):[ ](.*)/i)&&(_0xf01109['rateX']=Number(RegExp['$1'])||0x0);_0x468522[_0x4d05b2(0x276)](/(?:RATEY|RATE Y):[ ](.*)/i)&&(_0xf01109['rateY']=Number(RegExp['$1'])||0x0);if(_0x468522[_0x4d05b2(0x276)](/(?:HPLINK|HP LINK|HPLINKED|HP LINKED): ON/i))_0xf01109[_0x4d05b2(0x238)]=!![];else _0x468522[_0x4d05b2(0x276)](/(?:HPLINK|HP LINK|HPLINKED|HP LINKED): OFF/i)&&(_0xf01109[_0x4d05b2(0x238)]=![]);break;}}return _0xf01109;},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x1e9)]=Game_Battler[_0x45d17c(0x28f)]['onAddState'],Game_Battler['prototype'][_0x45d17c(0x237)]=function(_0x54b740){const _0x5dfc05=_0x45d17c;VisuMZ[_0x5dfc05(0x2a2)][_0x5dfc05(0x1e9)]['call'](this,_0x54b740),this['setupVisualStateEffect'](_0x54b740,!![]);},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x2bb)]=Game_BattlerBase['prototype'][_0x45d17c(0x1db)],Game_BattlerBase['prototype'][_0x45d17c(0x1db)]=function(){const _0x2f7116=_0x45d17c;this['_die_bypass_visualStateEffects']=!![],VisuMZ[_0x2f7116(0x2a2)][_0x2f7116(0x2bb)][_0x2f7116(0x26c)](this),this[_0x2f7116(0x271)]=undefined;},VisuMZ['VisualStateEffects'][_0x45d17c(0x283)]=Game_Battler['prototype']['onRemoveState'],Game_Battler['prototype'][_0x45d17c(0x2b9)]=function(_0xf715d1){const _0x5614bf=_0x45d17c;!this[_0x5614bf(0x271)]&&this['_show_battleRemovalStates']!==![]&&this[_0x5614bf(0x275)](_0xf715d1,![]),VisuMZ[_0x5614bf(0x2a2)][_0x5614bf(0x283)][_0x5614bf(0x26c)](this,_0xf715d1);},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x288)]=Game_Battler[_0x45d17c(0x28f)][_0x45d17c(0x2ab)],Game_Battler['prototype']['removeBattleStates']=function(){const _0xa6d0bc=_0x45d17c;this[_0xa6d0bc(0x1da)]=VisuMZ[_0xa6d0bc(0x2a2)][_0xa6d0bc(0x1d4)][_0xa6d0bc(0x1dd)][_0xa6d0bc(0x233)]??!![],VisuMZ[_0xa6d0bc(0x2a2)][_0xa6d0bc(0x288)][_0xa6d0bc(0x26c)](this),this[_0xa6d0bc(0x1da)]=undefined;},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x2bd)]=Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x2a1)],Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x2a1)]=function(){const _0x3990c8=_0x45d17c;VisuMZ[_0x3990c8(0x2a2)]['Sprite_Battler_initMembers'][_0x3990c8(0x26c)](this),this[_0x3990c8(0x292)](),this[_0x3990c8(0x2b3)]();},Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x292)]=function(){const _0x25f691=_0x45d17c;this[_0x25f691(0x29f)]=0x0,this[_0x25f691(0x219)]=0x0;},Sprite_Battler['prototype'][_0x45d17c(0x232)]=function(_0x4d5d1f,_0x1c9d3a){const _0x45e461=_0x45d17c,_0x1d129c=VisuMZ[_0x45e461(0x2a2)][_0x45e461(0x1d4)][_0x45e461(0x269)],_0x14596e=_0x1c9d3a?'Buff':_0x45e461(0x1f0),_0x422c71=_0x1c9d3a?Game_BattlerBase[_0x45e461(0x204)]:Game_BattlerBase[_0x45e461(0x25b)],_0x4baee4=_0x422c71+_0x4d5d1f,_0x249451=TextManager[_0x45e461(0x27d)](_0x4d5d1f),_0x1d5816=_0x1d129c[_0x45e461(0x289)[_0x45e461(0x24b)](_0x14596e)];if(_0x1d5816[_0x45e461(0x211)]<=0x0)return;let _0x1fde33=_0x1d5816['format'](_0x249451);const _0x2dff9f={'textColor':_0x1d129c[_0x45e461(0x247)[_0x45e461(0x24b)](_0x14596e)]||0x0,'flashColor':_0x1d129c[_0x45e461(0x249)[_0x45e461(0x24b)](_0x14596e)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x1d129c['%1FlashDuration'[_0x45e461(0x24b)](_0x14596e)]||0x0},_0x3e88dd=ImageManager[_0x45e461(0x1fb)](_0x45e461(0x1c4));_0x3e88dd[_0x45e461(0x244)](this[_0x45e461(0x264)][_0x45e461(0x2b7)](this,_0x4baee4,_0x1fde33,_0x2dff9f));},Sprite_Battler['prototype'][_0x45d17c(0x1f8)]=function(_0x45c5ec,_0xd30a95){const _0x5bbde3=_0x45d17c,_0x1d7a15=VisuMZ[_0x5bbde3(0x2a2)]['Settings'][_0x5bbde3(0x1dd)],_0x387ad8=$dataStates[_0x45c5ec];if(!_0x387ad8)return;const _0x129116=_0xd30a95?'Add':_0x5bbde3(0x2c1);this[_0x5bbde3(0x1ed)]=this[_0x5bbde3(0x1ed)]||{};if(!VisuMZ[_0x5bbde3(0x2a2)][_0x5bbde3(0x1d4)]['State'][_0x5bbde3(0x259)]){const _0x2b80fc=_0x5bbde3(0x254)[_0x5bbde3(0x24b)](_0x45c5ec,_0x129116,Graphics[_0x5bbde3(0x2ad)]);if(this[_0x5bbde3(0x1ed)][_0x2b80fc])return;this[_0x5bbde3(0x1ed)][_0x2b80fc]=!![];}const _0x594522=_0x387ad8[_0x5bbde3(0x1e0)];if(_0x594522<=0x0)return;const _0x19af81=_0x1d7a15['%1PopupFmt'['format'](_0x129116)];if(_0x19af81['length']<=0x0)return;let _0x69f94f=_0x19af81[_0x5bbde3(0x24b)](_0x387ad8[_0x5bbde3(0x286)]);const _0x169d86={'textColor':_0x1d7a15['TextColor']||0x0,'flashColor':_0x1d7a15[_0x5bbde3(0x2c8)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x1d7a15[_0x5bbde3(0x1df)]||0x0};_0x1d7a15[_0x5bbde3(0x20b)]&&(_0x169d86[_0x5bbde3(0x1cb)]=ColorManager[_0x5bbde3(0x2ae)](_0x387ad8));VisuMZ[_0x5bbde3(0x2a2)][_0x5bbde3(0x246)](_0x387ad8,_0x169d86);const _0x4e2582=ImageManager[_0x5bbde3(0x1fb)](_0x5bbde3(0x1c4));_0x4e2582[_0x5bbde3(0x244)](this[_0x5bbde3(0x264)][_0x5bbde3(0x2b7)](this,_0x594522,_0x69f94f,_0x169d86));},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x246)]=function(_0x245494,_0x516fc1){const _0x36f89d=_0x45d17c,_0x369b9c=_0x245494[_0x36f89d(0x2c5)];if(_0x369b9c['match'](/<STATE POPUP>\s*([\s\S]*)\s*<\/STATE POPUP>/i)){const _0x343ceb=String(RegExp['$1'])['trim']()[_0x36f89d(0x200)](/[\r\n]+/);for(const _0x518063 of _0x343ceb){_0x518063['match'](/(?:TEXT COLOR|TEXTCOLOR):[ ](.*)/i)&&(_0x516fc1[_0x36f89d(0x1cb)]=String(RegExp['$1'])[_0x36f89d(0x2ba)]());if(_0x518063[_0x36f89d(0x276)](/(?:FLASH COLOR|FLASHCOLOR):[ ](.*)/i)){_0x516fc1[_0x36f89d(0x20d)]=String(RegExp['$1'])['trim']()[_0x36f89d(0x200)](',')[_0x36f89d(0x1c6)](_0x1cbc9b=>Number(_0x1cbc9b));while(_0x516fc1['flashColor']['length']<=0x4){_0x516fc1[_0x36f89d(0x20d)][_0x36f89d(0x203)](0x0);};_0x516fc1[_0x36f89d(0x2a9)]=_0x516fc1[_0x36f89d(0x2a9)]||0x1;}_0x518063[_0x36f89d(0x276)](/(?:FLASH DURATION|FLASHDURATION):[ ](\d+)/i)&&(_0x516fc1[_0x36f89d(0x2a9)]=Number(RegExp['$1']));}}},Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x205)]=function(){const _0x3d0296=_0x45d17c;if(!this['isRepeatingVisualStateAnimationShown']())return;if(this[_0x3d0296(0x29f)]>0x0){this['_visualStateAnimationRepeatDuration']--;return;}const _0xabf176=this['_battler']['getVisualRepeatingStateAnimation'](),_0x117fce=this[_0x3d0296(0x2b6)]['getVisualRepeatingStateAnimationCycle']();if(_0xabf176[_0x3d0296(0x211)]<=0x0)return;this[_0x3d0296(0x219)]>=_0xabf176[_0x3d0296(0x211)]&&(this[_0x3d0296(0x219)]=0x0);const _0x39cb75=_0xabf176[this[_0x3d0296(0x219)]],_0x44655b=VisuMZ['VisualStateEffects']['Settings'][_0x3d0296(0x1dd)],_0x2e15d2=[this[_0x3d0296(0x2b6)]],_0x46acad=_0x44655b['RepeatMirror'],_0x1681ea=_0x44655b[_0x3d0296(0x209)];$gameTemp[_0x3d0296(0x21c)](_0x2e15d2,_0x39cb75,_0x46acad,_0x1681ea);const _0x5a3b92=_0x117fce[this[_0x3d0296(0x219)]]||_0x44655b[_0x3d0296(0x2ca)];this[_0x3d0296(0x29f)]=_0x5a3b92,this['_visualStateAnimationIndex']++;},Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x1fa)]=function(){const _0x20c35c=_0x45d17c;if(!this['_battler'])return![];if(!this['_battler'][_0x20c35c(0x1ce)]())return![];if(!this['_battler'][_0x20c35c(0x22a)]())return![];if(!this['_battler']['isAlive']())return![];if(this[_0x20c35c(0x25e)][_0x20c35c(0x286)]===_0x20c35c(0x1d0))return![];if(this[_0x20c35c(0x1cc)]<=0x0)return![];return!![];},Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x2b5)]=function(){const _0x15c0d5=_0x45d17c;this[_0x15c0d5(0x24d)]&&this[_0x15c0d5(0x1e7)](),this[_0x15c0d5(0x234)]&&this[_0x15c0d5(0x1e6)](),this[_0x15c0d5(0x205)](),this[_0x15c0d5(0x1f7)](),this['updateVisualStateRainbow']();},Sprite_Battler['prototype']['updateVisualStateEffectsIcons']=function(){const _0x355185=_0x45d17c;if(!this[_0x355185(0x2b6)])return;const _0x8ac944=VisuMZ['VisualStateEffects'][_0x355185(0x1d4)][_0x355185(0x230)],_0xefd35c=this[_0x355185(0x24d)];_0xefd35c[_0x355185(0x26f)]=this[_0x355185(0x2b6)]['isActor']()?_0x8ac944[_0x355185(0x239)]:_0x8ac944[_0x355185(0x206)],this['_battler']['isActor']()&&(_0xefd35c['x']=0x0,this[_0x355185(0x2b6)]['battleUIOffsetX']&&(_0xefd35c['x']+=this[_0x355185(0x2b6)][_0x355185(0x2d0)]()),_0xefd35c['y']=-Math[_0x355185(0x27e)]((this[_0x355185(0x241)]+0x28)*0.9),_0xefd35c['y']<0x14-this['y']&&(_0xefd35c['y']=0x14-this['y']),this[_0x355185(0x2b6)][_0x355185(0x270)]&&(_0xefd35c['y']+=this['_battler'][_0x355185(0x270)]()-0x4));},Sprite_Battler['prototype'][_0x45d17c(0x1e6)]=function(){const _0xb6fd01=_0x45d17c;if(!this[_0xb6fd01(0x2b6)])return;const _0x35657d=VisuMZ['VisualStateEffects'][_0xb6fd01(0x1d4)][_0xb6fd01(0x230)],_0x32443f=this[_0xb6fd01(0x234)];_0x32443f[_0xb6fd01(0x26f)]=this[_0xb6fd01(0x2b6)][_0xb6fd01(0x280)]()?_0x35657d[_0xb6fd01(0x262)]:_0x35657d[_0xb6fd01(0x1ff)];this['_svBattlerSprite']&&(this['_svBattlerSprite'][_0xb6fd01(0x234)][_0xb6fd01(0x26f)]=![]);this[_0xb6fd01(0x2b6)]['isEnemy']()&&!this[_0xb6fd01(0x2b6)]['hasSvBattler']()&&(this[_0xb6fd01(0x24d)]?_0x32443f['y']=this[_0xb6fd01(0x24d)]['y']+_0x32443f[_0xb6fd01(0x241)]:_0x32443f['y']=-this[_0xb6fd01(0x241)]+_0x32443f[_0xb6fd01(0x241)]);;},Sprite_Battler['prototype'][_0x45d17c(0x1f7)]=function(){const _0x403d4e=_0x45d17c;if(!this[_0x403d4e(0x2b6)])return;const _0x4ca1b5=this[_0x403d4e(0x293)](),_0x2c0995=this['_battler'][_0x403d4e(0x2b8)]();_0x4ca1b5&&_0x4ca1b5[_0x403d4e(0x1c9)](_0x2c0995),this['_dragonbonesSpriteContainer']&&this[_0x403d4e(0x22d)][_0x403d4e(0x1c9)](_0x2c0995);},Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x293)]=function(){const _0x5ebf27=_0x45d17c;return this[_0x5ebf27(0x1c5)]||this;},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x21f)]=Sprite_Battler['prototype'][_0x45d17c(0x2a7)],Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x2a7)]=function(){const _0x4f6acf=_0x45d17c;if(!this[_0x4f6acf(0x220)])return;this[_0x4f6acf(0x2b6)][_0x4f6acf(0x1c7)]()?this[_0x4f6acf(0x220)][_0x4f6acf(0x28c)][_0x4f6acf(0x2c6)]=0x0:VisuMZ['VisualStateEffects']['Sprite_Battler_updateDragonbonesTimeScale']['call'](this);},Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x2b3)]=function(){const _0x3dda01=_0x45d17c;this[_0x3dda01(0x1de)]=-0x1;},VisuMZ['VisualStateEffects'][_0x45d17c(0x202)]=Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x26d)],Sprite_Battler[_0x45d17c(0x28f)]['extraPositionY']=function(){const _0x270fe1=_0x45d17c;let _0x291735=VisuMZ['VisualStateEffects']['Sprite_Battler_extraPositionY'][_0x270fe1(0x26c)](this);return _0x291735-=Math[_0x270fe1(0x267)](this[_0x270fe1(0x227)]()),_0x291735;},Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x227)]=function(){const _0x2f4f54=_0x45d17c;if(this[_0x2f4f54(0x25e)]===Sprite_SvEnemy)return 0x0;if(!this[_0x2f4f54(0x2b6)])return 0x0;if(this[_0x2f4f54(0x2b6)][_0x2f4f54(0x274)]&&this['_battler'][_0x2f4f54(0x274)]())return 0x0;const _0x4f898e=this[_0x2f4f54(0x2b6)][_0x2f4f54(0x260)]();if(!_0x4f898e)return;let _0x5593a5=0x0;this[_0x2f4f54(0x222)]=this[_0x2f4f54(0x222)]||Math[_0x2f4f54(0x267)](Math[_0x2f4f54(0x290)]()*0x2710);const _0x5ec454=Graphics[_0x2f4f54(0x2ad)]+this['_hoverRand'],_0x5c6c19=_0x4f898e[_0x2f4f54(0x2be)],_0x466614=_0x4f898e[_0x2f4f54(0x250)];let _0x53bccc=_0x4f898e[_0x2f4f54(0x279)];if(_0x53bccc&&this[_0x2f4f54(0x2b6)][_0x2f4f54(0x228)]())_0x53bccc=_0x4f898e['deathHover'];if(_0x53bccc){_0x5593a5+=Math[_0x2f4f54(0x297)](_0x5ec454/(_0x5c6c19||0x1))*_0x466614,_0x5593a5+=_0x4f898e[_0x2f4f54(0x1ef)];if(this[_0x2f4f54(0x1de)]<0x0)this['_hoverMinimum']=_0x5593a5;const _0x527844=this[_0x2f4f54(0x1de)]+_0x5c6c19/Math[_0x2f4f54(0x2cb)](0x1,_0x466614**1.5);this[_0x2f4f54(0x1de)]=Math[_0x2f4f54(0x226)](_0x527844,_0x5593a5);}else{const _0x5c6001=this[_0x2f4f54(0x1de)]-_0x5c6c19/Math[_0x2f4f54(0x2cb)](0x1,_0x466614/0x2);this[_0x2f4f54(0x1de)]=Math['max'](_0x5c6001,0x0);}return Math[_0x2f4f54(0x2cb)](0x0,this[_0x2f4f54(0x1de)]);},VisuMZ['VisualStateEffects'][_0x45d17c(0x1fc)]=Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x268)],Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x268)]=function(){const _0x5558dc=_0x45d17c;VisuMZ[_0x5558dc(0x2a2)][_0x5558dc(0x1fc)][_0x5558dc(0x26c)](this),this['updateDistortionOpacity']();},Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x1d9)]=function(){const _0xb39bf7=_0x45d17c;if(!this['_distortionSprite'])return;if(!this[_0xb39bf7(0x2b6)])return;if(this[_0xb39bf7(0x25e)]===Sprite_SvEnemy)return;const _0x7d57f6=this[_0xb39bf7(0x2b6)]['visualBattlerOpacity']();if(this[_0xb39bf7(0x282)][_0xb39bf7(0x1cc)]!==_0x7d57f6){const _0x141e8a=0x8;this['_distortionSprite'][_0xb39bf7(0x1cc)]>_0x7d57f6?this['_distortionSprite'][_0xb39bf7(0x1cc)]=Math[_0xb39bf7(0x2cb)](this[_0xb39bf7(0x282)]['opacity']-_0x141e8a,_0x7d57f6):this[_0xb39bf7(0x282)]['opacity']=Math[_0xb39bf7(0x226)](this[_0xb39bf7(0x282)]['opacity']+_0x141e8a,_0x7d57f6);}},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x1ee)]=function(){const _0x36cbcf=_0x45d17c,_0x397af2=_0x36cbcf(0x1ee);if(this['checkCacheKey'](_0x397af2))return this[_0x36cbcf(0x25d)][_0x397af2];return this[_0x36cbcf(0x25d)][_0x397af2]=this['createVisualBattlerOpacity'](),this[_0x36cbcf(0x25d)][_0x397af2];},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x2bc)]=function(){const _0x21eb86=_0x45d17c;for(const _0x1f4011 of this[_0x21eb86(0x2aa)]()){if(!_0x1f4011)continue;if(_0x1f4011['note'][_0x21eb86(0x276)](/<VISUAL OPACITY:[ ](\d+)([%％])>/i)){const _0x78db31=Number(RegExp['$1'])*0.01;return Math[_0x21eb86(0x27e)](_0x78db31*0xff)[_0x21eb86(0x22b)](0x0,0xff);}if(_0x1f4011[_0x21eb86(0x2c5)]['match'](/<VISUAL OPACITY:[ ](\d+)>/i))return Number(RegExp['$1'])['clamp'](0x0,0xff);}return 0xff;},Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x1e8)]=function(){const _0x580e40=_0x45d17c;if(!this[_0x580e40(0x2b6)])return;const _0x147f8f=this['_battler'][_0x580e40(0x2b4)]();if(_0x147f8f===0x0&&this[_0x580e40(0x282)]['_hue']!==0x0)this[_0x580e40(0x282)][_0x580e40(0x1cf)](0x0);else{let _0xe8f60d=this[_0x580e40(0x282)]['_hue']+_0x147f8f;_0xe8f60d%=0x168,this[_0x580e40(0x282)]['setHue'](_0xe8f60d);}},Game_BattlerBase[_0x45d17c(0x28f)][_0x45d17c(0x2b4)]=function(){const _0x10a33a=_0x45d17c,_0x53bded='visualStateRainbow';if(this[_0x10a33a(0x21d)](_0x53bded))return this[_0x10a33a(0x25d)][_0x53bded];return this[_0x10a33a(0x25d)][_0x53bded]=this[_0x10a33a(0x1d2)](),this[_0x10a33a(0x25d)][_0x53bded];},Game_BattlerBase['prototype'][_0x45d17c(0x1d2)]=function(){const _0x9fb087=_0x45d17c;for(const _0x171d1a of this['states']()){if(!_0x171d1a)continue;if(_0x171d1a[_0x9fb087(0x2c5)][_0x9fb087(0x276)](/<VISUAL RAINBOW:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},VisuMZ['VisualStateEffects']['Sprite_Battler_mainSpriteScaleX']=Sprite_Battler[_0x45d17c(0x28f)]['mainSpriteScaleX'],Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x25f)]=function(){const _0x4d8fd3=_0x45d17c;let _0x16728d=VisuMZ['VisualStateEffects'][_0x4d8fd3(0x23f)][_0x4d8fd3(0x26c)](this);return _0x16728d+=this[_0x4d8fd3(0x225)](),_0x16728d;},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x20f)]=Sprite_Battler['prototype']['mainSpriteScaleY'],Sprite_Battler[_0x45d17c(0x28f)]['mainSpriteScaleY']=function(){const _0x1e4c59=_0x45d17c;let _0x59c8ed=VisuMZ['VisualStateEffects']['Sprite_Battler_mainSpriteScaleY'][_0x1e4c59(0x26c)](this);return _0x59c8ed+=this[_0x1e4c59(0x1c8)](),_0x59c8ed;},Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x225)]=function(){const _0x2067dd=_0x45d17c;if(!this['_battler'])return 0x0;if(this['_battler'][_0x2067dd(0x223)]())return 0x0;const _0x4497a0=this['_battler'][_0x2067dd(0x272)]();if(!_0x4497a0)return 0x0;if(!_0x4497a0['breathing'])return 0x0;let _0xb8392c=this['applyBreathingCalculations'](_0x4497a0,_0x4497a0[_0x2067dd(0x29e)],_0x4497a0[_0x2067dd(0x2d5)]);const _0x1290e6=this[_0x2067dd(0x282)][_0x2067dd(0x26b)]['x']>0x0?0x1:-0x1;return _0xb8392c*_0x1290e6;},Sprite_Battler[_0x45d17c(0x28f)]['applyBreathingScaleY']=function(){const _0x812f93=_0x45d17c;if(!this['_battler'])return 0x0;if(this['_battler'][_0x812f93(0x223)]())return 0x0;const _0xf96fc6=this['_battler'][_0x812f93(0x272)]();if(!_0xf96fc6)return 0x0;if(!_0xf96fc6[_0x812f93(0x258)])return 0x0;let _0x592270=this[_0x812f93(0x2c7)](_0xf96fc6,_0xf96fc6[_0x812f93(0x242)],_0xf96fc6['rateY']);return _0x592270;},Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x2c7)]=function(_0x1812fb,_0x4ac7fc,_0x2cbbf5){const _0x9e01e0=_0x45d17c;this[_0x9e01e0(0x251)]=this[_0x9e01e0(0x251)]??Math[_0x9e01e0(0x2c4)](0x2710);let _0x351498=Graphics['frameCount']+this['_breathingRand'];return _0x1812fb[_0x9e01e0(0x238)]&&(_0x4ac7fc/=this[_0x9e01e0(0x2b6)][_0x9e01e0(0x266)]()),Math[_0x9e01e0(0x297)](_0x351498/_0x4ac7fc)*_0x2cbbf5;},VisuMZ[_0x45d17c(0x2a2)]['Sprite_Actor_createStateSprite']=Sprite_Actor['prototype'][_0x45d17c(0x1e3)],Sprite_Actor[_0x45d17c(0x28f)]['createStateSprite']=function(){const _0x52b476=_0x45d17c;VisuMZ[_0x52b476(0x2a2)]['Sprite_Actor_createStateSprite'][_0x52b476(0x26c)](this),this[_0x52b476(0x214)]();},Sprite_Actor['prototype'][_0x45d17c(0x214)]=function(){const _0x441c96=_0x45d17c;if(this[_0x441c96(0x25e)]!==Sprite_Actor)return;this[_0x441c96(0x24d)]=new Sprite_StateIcon(),this[_0x441c96(0x24f)](this[_0x441c96(0x24d)]),this[_0x441c96(0x24d)][_0x441c96(0x1e4)][_0x441c96(0x2cc)]=![];},VisuMZ['VisualStateEffects'][_0x45d17c(0x27b)]=Sprite_Actor[_0x45d17c(0x28f)][_0x45d17c(0x1e5)],Sprite_Actor[_0x45d17c(0x28f)][_0x45d17c(0x1e5)]=function(){const _0x1c07d1=_0x45d17c,_0x5f4ce7=this[_0x1c07d1(0x1d6)];if(!_0x5f4ce7)return;const _0x1d6cba=_0x5f4ce7[_0x1c07d1(0x24e)]();if(_0x1d6cba>=0x4){if(!_0x5f4ce7[_0x1c07d1(0x2d1)]()&&!_0x5f4ce7['isActing']())return this[_0x1c07d1(0x2a6)](_0x5f4ce7[_0x1c07d1(0x1cd)]);}VisuMZ[_0x1c07d1(0x2a2)][_0x1c07d1(0x27b)][_0x1c07d1(0x26c)](this);},VisuMZ['VisualStateEffects']['Sprite_SvEnemy_refreshMotion']=Sprite_SvEnemy[_0x45d17c(0x28f)]['refreshMotion'],Sprite_SvEnemy[_0x45d17c(0x28f)][_0x45d17c(0x1e5)]=function(){const _0x35cea4=_0x45d17c,_0x36d3bb=this[_0x35cea4(0x1d6)];if(!_0x36d3bb)return;if(Imported[_0x35cea4(0x285)]&&_0x36d3bb['hasDragonbonesBattler']())return;const _0x5841a7=_0x36d3bb[_0x35cea4(0x24e)]();if(_0x5841a7>=0x4){if(!_0x36d3bb[_0x35cea4(0x2d1)]()&&!_0x36d3bb[_0x35cea4(0x2b0)]())return this[_0x35cea4(0x2a6)](_0x36d3bb[_0x35cea4(0x1cd)]);}VisuMZ['VisualStateEffects'][_0x35cea4(0x1f6)][_0x35cea4(0x26c)](this);},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x256)]=Sprite_Battler['prototype'][_0x45d17c(0x29a)],Sprite_Battler[_0x45d17c(0x28f)][_0x45d17c(0x29a)]=function(_0x3ca403){const _0x4bfc53=_0x45d17c;if(this[_0x4bfc53(0x220)]&&_0x3ca403===_0x4bfc53(0x212)){const _0x471c8e=this['_battler'][_0x4bfc53(0x24e)]();_0x471c8e>=0x4&&(_0x3ca403=this[_0x4bfc53(0x2b6)]['_customStateMotion']||_0x3ca403);}VisuMZ[_0x4bfc53(0x2a2)]['Sprite_Battler_playDragonbonesMotion'][_0x4bfc53(0x26c)](this,_0x3ca403);},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x235)]=Sprite_Actor['prototype'][_0x45d17c(0x221)],Sprite_Actor[_0x45d17c(0x28f)][_0x45d17c(0x221)]=function(_0x1263c5){const _0x207f94=_0x45d17c;VisuMZ[_0x207f94(0x2a2)][_0x207f94(0x235)][_0x207f94(0x26c)](this,_0x1263c5);if(this[_0x207f94(0x24d)])this[_0x207f94(0x24d)][_0x207f94(0x1d8)](_0x1263c5);},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x1d3)]=Sprite_Actor[_0x45d17c(0x28f)][_0x45d17c(0x216)],Sprite_Actor[_0x45d17c(0x28f)]['update']=function(){const _0x8397a9=_0x45d17c;VisuMZ[_0x8397a9(0x2a2)][_0x8397a9(0x1d3)]['call'](this),this[_0x8397a9(0x2b5)]();},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x243)]=Sprite_Actor[_0x45d17c(0x28f)][_0x45d17c(0x265)],Sprite_Actor[_0x45d17c(0x28f)][_0x45d17c(0x265)]=function(){const _0x2b841f=_0x45d17c;if(this[_0x2b841f(0x2b6)][_0x2b841f(0x1c7)]()&&this['_mainSprite']&&this[_0x2b841f(0x1c5)]['bitmap']){if(this[_0x2b841f(0x22e)])return;this['_stateMotionLocked']=this['_mainSprite'][_0x2b841f(0x24c)][_0x2b841f(0x229)]>0x0;}else this[_0x2b841f(0x22e)]=![];VisuMZ['VisualStateEffects']['Sprite_Actor_updateFrame'][_0x2b841f(0x26c)](this);},VisuMZ[_0x45d17c(0x2a2)]['Sprite_Enemy_createStateIconSprite']=Sprite_Enemy[_0x45d17c(0x28f)]['createStateIconSprite'],Sprite_Enemy[_0x45d17c(0x28f)][_0x45d17c(0x214)]=function(){const _0x1d3d11=_0x45d17c;this[_0x1d3d11(0x1e3)](),VisuMZ[_0x1d3d11(0x2a2)][_0x1d3d11(0x23a)][_0x1d3d11(0x26c)](this);},Sprite_Enemy[_0x45d17c(0x28f)][_0x45d17c(0x1e3)]=function(){const _0x24ed53=_0x45d17c;this[_0x24ed53(0x234)]=new Sprite_StateOverlay(),this[_0x24ed53(0x24f)](this['_stateSprite']);},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x29d)]=Sprite_Enemy[_0x45d17c(0x28f)][_0x45d17c(0x221)],Sprite_Enemy['prototype'][_0x45d17c(0x221)]=function(_0xcbb07c){const _0x500f52=_0x45d17c;VisuMZ[_0x500f52(0x2a2)]['Sprite_Enemy_setBattler'][_0x500f52(0x26c)](this,_0xcbb07c);if(this['_stateSprite'])this[_0x500f52(0x234)][_0x500f52(0x1d8)](_0xcbb07c);},VisuMZ['VisualStateEffects'][_0x45d17c(0x255)]=Sprite_Enemy[_0x45d17c(0x28f)]['update'],Sprite_Enemy[_0x45d17c(0x28f)][_0x45d17c(0x216)]=function(){const _0x2e5d57=_0x45d17c;VisuMZ[_0x2e5d57(0x2a2)][_0x2e5d57(0x255)]['call'](this),this['updateVisualStateEffects']();},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x2a3)]=Sprite_StateOverlay[_0x45d17c(0x28f)][_0x45d17c(0x213)],Sprite_StateOverlay[_0x45d17c(0x28f)]['loadBitmap']=function(){const _0x125b8c=_0x45d17c;VisuMZ[_0x125b8c(0x2a2)][_0x125b8c(0x2a3)][_0x125b8c(0x26c)](this),this[_0x125b8c(0x26a)]=_0x125b8c(0x231);},VisuMZ['VisualStateEffects'][_0x45d17c(0x20e)]=Sprite_StateOverlay[_0x45d17c(0x28f)]['updateFrame'],Sprite_StateOverlay[_0x45d17c(0x28f)]['updateFrame']=function(){const _0x5219a5=_0x45d17c;if(typeof this[_0x5219a5(0x294)]===_0x5219a5(0x2a4))return this[_0x5219a5(0x2c9)]();else{if(this[_0x5219a5(0x26a)]!=='States'){this[_0x5219a5(0x299)]=!![];const _0x523084=ImageManager['loadSystem'](_0x5219a5(0x231));_0x523084[_0x5219a5(0x244)](this['onLoadDefaultOverlayBitmap']['bind'](this,_0x523084));}else this[_0x5219a5(0x26a)]===_0x5219a5(0x231)&&VisuMZ[_0x5219a5(0x2a2)]['Sprite_StateOverlay_updateFrame']['call'](this);}},Sprite_StateOverlay[_0x45d17c(0x28f)][_0x45d17c(0x278)]=function(_0x4e8a2c){const _0x3208da=_0x45d17c;this[_0x3208da(0x1e4)]=_0x4e8a2c,this[_0x3208da(0x299)]=![],this[_0x3208da(0x26a)]=_0x3208da(0x231),VisuMZ[_0x3208da(0x2a2)]['Sprite_StateOverlay_updateFrame'][_0x3208da(0x26c)](this);},Sprite_StateOverlay['prototype']['updateCustomOverlayFrame']=function(){const _0x100072=_0x45d17c;if(!this[_0x100072(0x299)]&&this[_0x100072(0x26a)]!==this[_0x100072(0x294)]){this[_0x100072(0x299)]=!![];const _0x79257a=ImageManager[_0x100072(0x1fb)](this['_overlayIndex']);_0x79257a[_0x100072(0x244)](this['onLoadCustomOverlayBitmap'][_0x100072(0x2b7)](this,_0x79257a));}if(this[_0x100072(0x26a)]===this[_0x100072(0x294)]){const _0x2006dd=0x60,_0x446da7=0x60,_0x2ddb8a=this['_pattern']*_0x2006dd,_0x333e03=0x0;this['setFrame'](_0x2ddb8a,_0x333e03,_0x2006dd,_0x446da7);}},Sprite_StateOverlay['prototype'][_0x45d17c(0x2b2)]=function(_0x4dd615){const _0x49fba9=_0x45d17c;this[_0x49fba9(0x1e4)]=_0x4dd615,this['_loadingCustomOverlay']=![],this[_0x49fba9(0x26a)]=this[_0x49fba9(0x294)],this['updateCustomOverlayFrame']();},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x2d3)]=Window_BattleLog[_0x45d17c(0x28f)][_0x45d17c(0x2d6)],Window_BattleLog[_0x45d17c(0x28f)][_0x45d17c(0x2d6)]=function(_0x34923e){const _0x30f8ea=_0x45d17c;VisuMZ[_0x30f8ea(0x2a2)][_0x30f8ea(0x2d3)][_0x30f8ea(0x26c)](this,_0x34923e);if(_0x34923e&&_0x34923e[_0x30f8ea(0x1f3)]())_0x34923e[_0x30f8ea(0x1f3)]()['SetupResponsePopup'](_0x34923e,'Counter');},VisuMZ[_0x45d17c(0x2a2)]['Window_BattleLog_displayReflection']=Window_BattleLog[_0x45d17c(0x28f)][_0x45d17c(0x215)],Window_BattleLog[_0x45d17c(0x28f)]['displayReflection']=function(_0x4267eb){const _0x18ed1e=_0x45d17c;VisuMZ[_0x18ed1e(0x2a2)][_0x18ed1e(0x295)][_0x18ed1e(0x26c)](this,_0x4267eb);if(_0x4267eb&&_0x4267eb[_0x18ed1e(0x1f3)]())_0x4267eb[_0x18ed1e(0x1f3)]()['SetupResponsePopup'](_0x4267eb,_0x18ed1e(0x1d5));},VisuMZ[_0x45d17c(0x2a2)][_0x45d17c(0x253)]=Window_BattleLog[_0x45d17c(0x28f)][_0x45d17c(0x28a)],Window_BattleLog[_0x45d17c(0x28f)][_0x45d17c(0x28a)]=function(_0xeab459,_0x483a81){const _0x47e515=_0x45d17c;VisuMZ[_0x47e515(0x2a2)]['Window_BattleLog_displaySubstitute'][_0x47e515(0x26c)](this,_0xeab459,_0x483a81);if(_0x483a81&&_0x483a81[_0x47e515(0x1f3)]())_0x483a81[_0x47e515(0x1f3)]()[_0x47e515(0x1f4)](_0x483a81,_0x47e515(0x1fe));},Sprite_Battler['prototype']['SetupResponsePopup']=function(_0x2c4bcd,_0xcac886){const _0x16b604=_0x45d17c;if(!_0x2c4bcd)return;const _0x5c2bbe=VisuMZ[_0x16b604(0x2a2)][_0x16b604(0x1d4)][_0x16b604(0x29c)]||{},_0x33c217=_0x16b604(0x218)['format'](_0xcac886),_0x5705ca=_0x16b604(0x1ec)['format'](_0xcac886),_0x2449d7={'textColor':_0x5c2bbe[_0x16b604(0x247)['format'](_0xcac886)]||0x0,'flashColor':_0x5c2bbe[_0x16b604(0x249)['format'](_0xcac886)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x5c2bbe[_0x16b604(0x2a8)[_0x16b604(0x24b)](_0xcac886)]||0x0},_0x58df9f=_0x5c2bbe[_0x33c217]||'';if(_0x58df9f['length']<=0x0)return;const _0x10b4df=_0x5c2bbe[_0x5705ca]||0x0,_0x468f60=ImageManager[_0x16b604(0x1fb)](_0x16b604(0x1c4));_0x10b4df>0x0?_0x468f60[_0x16b604(0x244)](this[_0x16b604(0x264)]['bind'](this,_0x10b4df,_0x58df9f,_0x2449d7)):_0x468f60[_0x16b604(0x244)](this[_0x16b604(0x257)]['bind'](this,_0x58df9f,_0x2449d7));};