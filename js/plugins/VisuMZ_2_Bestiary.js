//=============================================================================
// VisuStella MZ - Bestiary
// VisuMZ_2_Bestiary.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_Bestiary = true;

var VisuMZ = VisuMZ || {};
VisuMZ.Bestiary = VisuMZ.Bestiary || {};
VisuMZ.Bestiary.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.06] [Bestiary]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Bestiary_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds a new scene accessible through (but not limited to) the
 * Main Menu, the Bestiary. The Bestiary is a monster book/encyclopedia that
 * will update as the player plays the game. When an enemy is defeated, the
 * player can view that enemy through the Bestiary to see the enemy's stats,
 * elemental resistances and weaknesses, skills, rewards, and more.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Access the Bestiary through the Main Menu or through Plugin Commands.
 * * Enemies will automatically populate the Bestiary as they are seen in
 *   battle and defeated.
 * * The player can access the full information of an enemy after defeating it.
 * * Full information found in the bestiary includes the basic stats, elemental
 *   weaknesses and resistances, skills, rewards (EXP, Gold, Drops, etc.), and
 *   any added Lore.
 * * If the VisuStella MZ Elements and Status Menu Core is added, Traits are
 *   also added to the Bestiary.
 * * The VisuStella MZ Enemy Levels plugin gives functionality to view enemy
 *   stats at different levels.
 * * The VisuStella MZ Extra Enemy Drops will show any and all additional drops
 *   including conditional drops.
 * * The VisuStella MZ Class Change Core and Skill Learn System will show any
 *   AP, CP, JP, and SP rewards, too.
 * * Selected skills found in the Bestiary will have a help window appear that
 *   will also list what the skill does.
 * * The game dev can add in custom lore to an enemy's entry through notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * VisuMZ_1_ElementStatusCore
 * 
 * When this plugin is used together with VisuStella MZ's Elements and Status
 * Menu Core plugin, the "Traits" data page becomes available. It lets the
 * player adjust the trait properties for the enemy being viewed so that the
 * player can view the changes when different traits are applied.
 * 
 * Any elements listed in the Elements & Status Menu Core's Plugin Parameters
 * list for "Status Menu Settings" and "Excluded Elements" will also be
 * excluded in the Bestiary.
 * 
 * ---
 *
 * VisuMZ_3_EnemyLevels
 *
 * When used together in the same project as VisuStella MZ's Enemy Levels
 * plugin, new commands will appear under the "Basic" parameters window,
 * allowing the player to adjust the level of the currently viewed enemy in
 * order to see their parameters across different levels.
 *
 * ---
 *
 * VisuMZ_4_ExtraEnemyDrops
 *
 * When used together in the same project as VisuStella MZ's Extra Enemy Drops
 * plugin, extended drops will be listed as well as conditional drops (although
 * the conditional drops will not display how they are acquired).
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
 * VisuMZ_0_CoreEngine
 * 
 * When used together in the same project as VisuStella MZ's Core Engine, this
 * plugin will display the Extended Parameters dictated by the Core Engine. The
 * icons assigned by the Core Engine will also be utilized, too.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * When used together in the same project as VisuStella MZ's Battle Core, the
 * notetags <Display Icon: x> and <Display Text: string> will be used on top of
 * displayed enemy skills to portray their displayed appearances.
 * 
 * ---
 * 
 * VisuMZ_1_ElementStatusCore
 * 
 * When used together in the same project as VisuStella MZ's Elements and
 * Status Menu Core, any excluded elements found in that plugin's Plugin
 * Parameters will also be used here to exclude certain elements, too.
 * 
 * ---
 * 
 * VisuMZ_2_ClassChangeSystem
 * 
 * When used together in the same project as VisuStella MZ's Class Change
 * System plugin, the CP and JP gains from enemies can be displayed under the
 * "Rewards" page as long as the rewards are intended to be shown in the
 * victory reward gains.
 * 
 * ---
 * 
 * VisuMZ_2_SkillLearnSystem
 * 
 * When used together in the same project as VisuStella MZ's Skill Learn System
 * plugin, the AP and SP gains from enemies can be displayed under the"Rewards"
 * page as long as the rewards are intended to be shown in the victory reward
 * gains.
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
 * === Bestiary-Related Notetags ===
 * 
 * ---
 *
 * <Bestiary Category: x>
 * <Bestiary Categories: x, x, x>
 *
 * - Used for: Enemy Notetags
 * - Displays this enemy in the Bestiary category(ies) 'x'.
 * - Replace 'x' with the ID Key of the category or categories found in the
 *   Plugin Parameters.
 * - If this notetag is not used, use the default category determined by the
 *   Plugin Parameters.
 *
 * ---
 * 
 * <Hide in Bestiary>
 * 
 * - Used for: Enemy Notetags
 * - Prevents this enemy from being listed in the Bestiary.
 * 
 * ---
 * 
 * <Bestiary Custom Picture: filename>
 * 
 * - Used for: Enemy Notetags
 * - Makes this enemy display a custom picture in the Bestiary instead of the
 *   battler graphic used in-game.
 * - Replace 'filename' with the name of the image file to pick from the game
 *   project's /img/pictures/ folder.
 *   - Filenames are case sensitive.
 *   - Leave out the filename extension from the notetag.
 * 
 * ---
 * 
 * <Bestiary Battleback 1: filename>
 * <Bestiary Battleback 2: filename>
 * 
 * - Used for: Enemy Notetags
 * - Makes this enemy display a custom battleback background in the Bestiary
 *   instead of the default graphic determined by the Plugin Parameters.
 * - Replace 'filename' with the name of the image file to pick from the game
 *   project's /img/battlebacks1/ and /img/battlebacks2/ folders.
 *   - Filenames are case sensitive.
 *   - Leave out the filename extension from the notetag.
 * - If these notetags are not used, use the default settings found in the
 *   Plugin Parameters instead.
 * 
 * ---
 *
 * <Bestiary Lore>
 *  text
 *  text
 *  text
 * </Bestiary Lore>
 *
 * - Used for: Enemy Notetags
 * - Inserts the written 'text' as the enemy's lore in the Bestiary.
 * - Replace 'text' with whatever you want as the enemy's lore.
 * - If this notetag is not used, then the text displayed will be the default
 *   settings found in the Plugin Parameters.
 * 
 * ---
 * 
 * <Hide Skill in Bestiary>
 * 
 * - Used for: Skill Notetags
 * - Prevents this skill from being listed in the Bestiary.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Bestiary Plugin Commands ===
 * 
 * ---
 * 
 * Bestiary: Reveal Enemies
 * - Reveals bestiary information for target enemies without needing to defeat
 *   them.
 * - Must not be forcefully hidden.
 * 
 *   Enemy ID(s):
 *   - Reveals Bestiary information for target enemies.
 *   - Must not be forcefully hidden.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 *
 * Debug: Full Bestiary?
 * - For playtest only! Allows you to fully view Bestiary.
 * - Resets when the game client is closed.
 *
 *   Reveal?:
 *   - Fully reveals Bestiary for playtesting.
 *   - Resets when the game client is closed.
 *
 * ---
 * 
 * === Scene Plugin Commands ===
 * 
 * ---
 *
 * Scene: Open Bestiary
 * - Opens the Bestiary scene.
 * - Cannot be used in battle.
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: Enable Bestiary in Menu?
 * - Enables/disables Bestiary menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Bestiary menu inside the main menu.
 *
 * ---
 *
 * System: Show Bestiary in Menu?
 * - Shows/hides Bestiary menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Bestiary menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Categories List Settings
 * ============================================================================
 *
 * List of categories that are used for the bestiary.
 * 
 * By default, categories are hidden away until one enemy in that category has
 * been seen (not necessarily defeated). Once seen, the category is visible for
 * the player to browser through. This is to prevent spoilers based on the
 * category name (in case the game developer decides to name categories based
 * on regions for example).
 * 
 * The "Default Category", however, will always be visible to the player
 * regardless of whether or not an enemy has been seen inside of it. Therefore,
 * it's best to use the "Default Category" as a category for commonly seen
 * enemies in the game.
 *
 * ---
 *
 * Category
 * 
 *   ID Key:
 *   - This category's identification key.
 *   - Categories require unique keys for the plugin to differentiate them.
 *   - Used with <Bestiary Category: x> notetag.
 * 
 *   Title:
 *   - This category's title.
 *   - You may use text codes.
 *
 * ---
 *
 * Plugin Parameters
 * 
 *   Default Category:
 *   - Default enemy category when no notetag is used.
 * 
 *   Show All Categories?:
 *   - Show all categories or reveal them as more enemies are defeated?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Set up the main menu defaults.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'Bestiary' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Bestiary' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Bestiary' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Bestiary.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These settings let you adjust the text displayed for this plugin.
 *
 * ---
 *
 * Button Assist Window
 * 
 *   Collapse:
 *   - Text used to collapse a category.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Expand:
 *   - Text used to expand a category.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Scroll Fast:
 *   - Text used to scroll enemy lore quickly.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Scroll Slow:
 *   - Text used to scroll enemy lore slowly.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Switch Enemy:
 *   - Text used to switch an enemy.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   View:
 *   - Text used to view an enemy.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 * ---
 * 
 * Main Windows > List Window
 * 
 *   Category (Closed):
 *   Category (Opened):
 *   - Text format used for closed/open categories.
 *   - %1 - Category Name, %2 - Percent Complete
 * 
 *     Decimal Places:
 *     - Decimal places for completion percentages.
 * 
 *   Mask Character:
 *   - Text character used to mask unknown enemy names.
 *
 * ---
 * 
 * Main Windows > Name Window
 * 
 *   Category Text:
 *   - Text used when selecting an enemy.
 * 
 * ---
 * 
 * Main Windows > Sub Window
 * 
 *   Completion Rate:
 *   - Text used to announce completion rate.
 *   - %1 - Percentage, %2 - Defeated, %3 - Total
 * 
 *     Decimal Places:
 *     - Decimal places for completion percentage.
 * 
 *   Defeated:
 *   - Text used to announce defeated monsters.
 *   - %1 - Defeated Number
 * 
 *   Encountered:
 *   - Text used to announce encountered monsters.
 *   - %1 - Encountered Number
 *
 * ---
 *
 * Data Windows > Category Window
 * 
 *   Basic Text:
 *   Elements Text:
 *   Skills Text:
 *   Rewards Text:
 *   Traits Text:
 *   Lore Text:
 *   - Text used for this command.
 * 
 *     Icon:
 *     - Icon used for this command.
 * 
 * ---
 * 
 * Data Windows > Basic Window
 * 
 *   Level Up To Max:
 *   Level Up By One:
 *   Level Down By One:
 *   Level Down To Min:
 *   - Text used for leveling.
 *   - Text codes allowed.
 *   - Requires VisuMZ_3_EnemyLevels!
 *   - %1 - Level Name
 * 
 * ---
 * 
 * Data Windows > Elements Window
 * 
 *   Weak to Element:
 *   Neutral to Element:
 *   Resistant to Element:
 *   Immune to Element:
 *   Absorbs Element:
 *   - Text used with this elemental affinity.
 *   - Text codes allowed.
 * 
 * ---
 * 
 * Data Windows > Rewards Window
 * 
 *   Drop Rate 100%:
 *   Drop Rate >= 50%:
 *   Drop Rate >= 20%:
 *   Drop Rate >= 10%:
 *   Drop Rate < 10%:
 *   Conditional Rate:
 *   - Text used for this kind of drop rate.
 *   - Text codes allowed.
 * 
 * ---
 * 
 * Data Windows > Traits Window
 * 
 *   Category (Closed):
 *   Category (Opened):
 *   - Text format used for closed/open categories.
 *   - Text codes allowed.
 *   - %1 - Category Name
 * 
 *   Help Description:
 *   - Help description used for trait categories.
 *   - Text codes allowed.
 * 
 *   Null Help:
 *   - Help description used for no traits.
 *   - Text codes allowed.
 *
 * ---
 *
 * Data Windows > Lore Window
 * 
 *   Default Lore:
 *   - Text when no lore is found.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * These settings let you adjust the windows displayed for this plugin.
 *
 * ---
 *
 * Help Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Scale Window:
 *   - Scale the help window to fit with the enemy preview window?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 * ---
 * 
 * Main Windows > Image Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Blur Strength:
 *   - What is the blur strength used for unknown enemies?
 * 
 *   Default Battleback 1:
 *   Default Battleback 2:
 *   - Default battleback 1 image used for enemies without
 *     <Bestiary Battleback 1: filename> and <Bestiary Battleback 2: filename>
 *     notetags.
 * 
 *   Padding:
 *   - What is the padding value used for this window?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 * ---
 * 
 * Main Windows > List Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Delay MS:
 *   - How many milliseconds (MS) to delay the preview update?
 *   - This is to prevent lag spikes.
 * 
 *   Mask Unknown Enemies:
 *   - Apply a character mask to unknown enemies?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 * ---
 * 
 * Main Windows > Name Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 * ---
 * 
 * Main Windows > Sub Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 * ---
 * 
 * Data Windows
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for all data windows.
 * 
 * ---
 * 
 * Data Windows > Category Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Category Order:
 *   - What order do you want the commands to appear in?
 * 
 *   Style:
 *   - How do you wish to draw commands for this window?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Data Windows > Basic Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Show Level Change:
 *   - Show level change commands?
 *   - Requires VisuMZ_3_EnemyLevels!
 * 
 * ---
 * 
 * Data Windows > Elements Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 * ---
 * 
 * Data Windows > Skills Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Show Aspects:
 *   - Show enemy aspect description if available?
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Show Passives:
 *   - Show enemy passives if available?
 *   - Only applies to passives added to enemy's notebox.
 *   - Requires VisuMZ_1_BattleCore + VisuMZ_1_SkillsStatesCore!
 * 
 * ---
 * 
 * Data Windows > Rewards Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Rewards Order:
 *   - What order do you want the rewards to appear in?
 * 
 *   Reward EXP Icon:
 *   - Icon used for EXP reward.
 * 
 *   Reward Gold Icon:
 *   - Icon used for Gold reward.
 * 
 * ---
 * 
 * Data Windows > Traits Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Show All Traits:
 *   - Show all traits? Including unused ones?
 *   - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * Data Windows > Lore Window
 * 
 *   Auto Word Wrap?:
 *   - Automatically enable word wrap?
 *   - Requires VisuMZ_1_MessageCore!
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Font Size:
 *   - Font size used for Lore Window.
 * 
 *   Scrolling > Slow:
 * 
 *     Scroll Speed:
 *     - What speed will Up/Down scroll the window at?
 *     - Lower is slower. Higher is faster.
 * 
 *     Sound Frequency:
 *     - How frequent will Up/Down scrolling make sounds?
 *     - Lower is quicker. Higher is later.
 * 
 *   Scrolling > Fast:
 * 
 *     Scroll Speed:
 *     - What speed will Up/Down scroll the window at?
 *     - Lower is slower. Higher is faster.
 * 
 *     Sound Frequency:
 *     - How frequent will Up/Down scrolling make sounds?
 *     - Lower is quicker. Higher is later.
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
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.06: September 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Parameters > Window Settings > Skills Window > Show Aspects
 * *** Parameters > Window Settings > Skills Window > Show Passives
 * **** Show enemy aspect/passives if available?
 * **** Requires VisuMZ_1_BattleCore/VisuMZ_1_SkillsStatesCore!
 * 
 * Version 1.05: February 15, 2024
 * * Bug Fixes!
 * ** Fixed a problem where enemies weren't showing up at all in the bestiary.
 *    Fix made by Olivia.
 * 
 * Version 1.04: January 18, 2024
 * * Bug Fixes!
 * ** Fixed a problem with the <Bestiary Custom Picture: filename> notetag
 *    causing a crash. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Olivia:
 * *** Bestiary: Reveal Enemies
 * **** Reveals bestiary information for target enemies without needing to
 *      defeat them. Must not be forcefully hidden.
 * ** New Plugin Parameter added by Olivia:
 * *** Categories > Show All Categories?
 * **** Show all categories or reveal them as more enemies are defeated?
 * 
 * Version 1.03: December 14, 2023
 * * Documentation Update!
 * ** Added clarity to the "Extra Features" section:
 * *** VisuMZ_1_ElementStatusCore
 * **** Any elements listed in the Elements & Status Menu Core's Plugin
 *      Parameters list for "Status Menu Settings" and "Excluded Elements" will
 *      also be excluded in the Bestiary.
 * 
 * Version 1.02: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented the vocabulary for "Lower Level" from
 *    reflecting the changes found in the Plugin Parameters. Fix by Olivia.
 * 
 * Version 1.01: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that allowed players to scroll to unrevealed enemies. Fix
 *    made by Irina.
 * 
 * Version 1.00 Official Release Date: April 3, 2023
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BestiaryRevealEnemies
 * @text Bestiary: Reveal Enemies
 * @desc Reveals bestiary information for target enemies without
 * needing to defeat them. Must not be forcefully hidden.
 *
 * @arg EnemyIDs:arraynum
 * @text Enemy ID(s)
 * @type enemy[]
 * @desc Reveals Bestiary information for target enemies.
 * Must not be forcefully hidden.
 * @default ["1","2","3","4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugFullBestiary
 * @text Debug: Full Bestiary?
 * @desc For playtest only! Allows you to fully view Bestiary.
 * Resets when the game client is closed.
 *
 * @arg Reveal:eval
 * @text Reveal?
 * @type boolean
 * @on Reveal
 * @off Normal
 * @desc Fully reveals Bestiary for playtesting.
 * Resets when the game client is closed.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Scene
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SceneOpenBestiary
 * @text Scene: Open Bestiary
 * @desc Opens the Bestiary scene.
 * Cannot be used in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableBestiaryMenu
 * @text System: Enable Bestiary in Menu?
 * @desc Enables/disables Bestiary menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Bestiary menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowBestiaryMenu
 * @text System: Show Bestiary in Menu?
 * @desc Shows/hides Bestiary menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Bestiary menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Bestiary
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Categories:arraystruct
 * @text Enemy Categories List
 * @type struct<Category>[]
 * @desc List of categories that are used for the bestiary.
 * @default ["{\"Key:str\":\"Common\",\"Title:str\":\"\\\\C[6]Common Monsters\"}","{\"Key:str\":\"Elite\",\"Title:str\":\"\\\\C[4]Elite Monsters\"}","{\"Key:str\":\"MiniBoss\",\"Title:str\":\"\\\\C[5]Mini-Bosses\"}","{\"Key:str\":\"Boss\",\"Title:str\":\"\\\\C[2]Bosses\"}"]
 *
 * @param DefaultCategory:str
 * @text Default Category
 * @parent Categories:arraystruct
 * @desc Default enemy category when no notetag is used.
 * @default Common
 *
 * @param ShowAllCategories:eval
 * @text Show All Categories?
 * @parent Categories:arraystruct
 * @type boolean
 * @on Show All
 * @off Reveal
 * @desc Show all categories or reveal them as more enemies are defeated?
 * @default false
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Bestiary.
 * @default {"Name:str":"Bestiary","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Bestiary.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"ButtonAssist":"","buttonAssist_Collapse:str":"Collapse","buttonAssist_Expand:str":"Expand","buttonAssist_FastScroll:str":"Fast Scroll","buttonAssist_SlowScroll:str":"Scroll","buttonAssist_Switch:str":"Switch Monster","buttonAssist_View:str":"View","MainWindows":"","CategoryWindow":"","CategoryWindow_ClosedCategory:str":"+ %1 (%2%)","CategoryWindow_OpenCategory:str":"- %1 (%2%)","CategoryPercentFixedDigits:num":"2","CategoryWindow_MaskChar:str":"?","NameWindow":"","NameWindow_CategoryText:str":"Please select a monster to view.","SubWindow":"","SubWindow_Completion:str":"Bestiary Completion Rate: %1% (%2/%3 Monsters)","SubWindowCompleteFixedDigits:num":"2","SubWindow_Defeated:str":"Defeated: %1","SubWindow_Encountered:str":"Encountered: %1","DataWindows":"","DataCategoryWindow":"","BasicText:str":"Base","BasicIcon:str":"84","ElementsText:str":"Elements","ElementsIcon:str":"64","SkillsText:str":"Skills","SkillsIcon:str":"79","RewardsText:str":"Rewards","RewardsIcon:str":"87","TraitsText:str":"Properties","TraitsIcon:str":"83","LoreText:str":"Lore","LoreIcon:str":"80","BasicWindow":"","BasicWindow_LevelUpToMax:str":"\\I[73]Raise %1 Up to Maximum","BasicWindow_LevelUpByOne:str":"\\I[73]Raise %1 Up","BasicWindow_LevelDownByOne:str":"\\I[74]Lower %1 Down","BasicWindow_LevelDownToMin:str":"\\I[74]Lower %1 Down to Minimum","ElementsWindow":"","ElementsWindow_Weak:str":"\\C[24]Weak","ElementsWindow_Neutral:str":"\\C[0]Normal","ElementsWindow_Resist:str":"\\C[25]Resist","ElementsWindow_Immune:str":"\\C[7]Immune","ElementsWindow_Absorb:str":"\\C[27]Absorb","RewardsWindow":"","RewardsWindow_Chance100:str":"\\C[24]Guaranteed","RewardsWindow_Chance50:str":"\\C[21]Common","RewardsWindow_Chance20:str":"\\C[4]Uncommon","RewardsWindow_Chance10:str":"\\C[5]Rare","RewardsWindow_Chance0:str":"\\C[27]Super Rare","RewardsWindow_Conditional:str":"\\C[17]Conditional","TraitsWindow":"","TraitsWindow_ClosedCategory:str":"+ \\C[16]%1","TraitsWindow_OpenCategory:str":"- \\C[16]%1","TraitsWindow_CategoryHelpDesc:json":"\"This is the property type.\"","TraitsWindow_NullHelpDesc:json":"\"This monster has no special properties.\"","LoreWindow":"","LoreWindow_Default:json":"\"Little is known about this monster.\""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you adjust the windows displayed for this plugin.
 * @default {"HelpWindow":"","HelpWindow_BgType:num":"0","HelpWindow_ScaleRatio:eval":"true","HelpWindow_RectJS:func":"\"const imgRect = this.imageWindowRect();\\nconst ratio = this.helpWindowRatio();\\n\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(2, false);\\nconst wx = imgRect.x;\\nconst wy = imgRect.y + (this.isBottomHelpMode() ? (imgRect.height - (wh * ratio)) : 0);\\nreturn new Rectangle(wx, wy, ww, wh);\"","MainWindows":"","ImageWindow":"","ImageWindow_BgType:num":"0","ImageWindow_BlurStrength:num":"8","ImageWindow_Battleback1:str":"Grassland","ImageWindow_Battleback2:str":"Grassland","ImageWindow_Padding:num":"4","ImageWindow_RectJS:func":"\"const ww = Graphics.boxWidth - Math.ceil(Graphics.boxWidth * 4/10);\\nconst wh = this.mainAreaHeight() - (this.calcWindowHeight(1, false) * 2);\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","ListWindow":"","ListWindow_BgType:num":"0","ListWindowDelayMS:num":"240","ListWindow_MaskUnknown:eval":"true","ListWindow_RectJS:func":"\"const ww = Math.ceil(Graphics.boxWidth * 4/10);\\nconst wh = this.mainAreaHeight() - (this.calcWindowHeight(1, false) * 2);\\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","NameWindow":"","NameWindow_BgType:num":"0","NameWindow_RectJS:func":"\"const ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(1, false);\\nconst wx = 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","SubWindow":"","SubWindow_BgType:num":"0","SubWindow_RectJS:func":"\"const ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(1, false);\\nconst wx = 0;\\nconst wy = this.mainAreaBottom() - wh;\\nreturn new Rectangle(wx, wy, ww, wh);\"","DataWindows":"","DataWindow_RectJS:func":"\"const ww = this.listWindowRect().width;\\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true) - (this.calcWindowHeight(1, false) * 2);\\nconst wx = this.listWindowRect().x;\\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, false) + this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\"","CategoryWindow":"","CategoryWindow_BgType:num":"0","CategoryWindow_CommandOrder:arraystr":"[\"basic\",\"elements\",\"skills\",\"rewards\",\"traits\",\"lore\"]","CategoryWindow_Style:str":"auto","DataCategoriesWindow_RectJS:func":"\"const ww = this.listWindowRect().width;\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = this.listWindowRect().x;\\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","BasicWindow":"","BasicWindow_BgType:num":"0","BasicWindow_ShowLevelChange:eval":"true","ElementsWindow":"","ElementsWindow_BgType:num":"0","SkillsWindow":"","SkillsWindow_BgType:num":"0","RewardsWindow":"","RewardsWindow_BgType:num":"0","RewardsWindow_RewardsOrder:arraystr":"[\"exp\",\"ap\",\"cp\",\"jp\",\"sp\",\"gold\",\"items\"]","EXP_Icon:num":"87","Gold_Icon:num":"314","TraitsWindow":"","TraitsWindow_BgType:num":"0","TraitsWindow_ShowAllTraits:eval":"false","LoreWindow":"","LoreWindow_AutoWordWrap:eval":"false","LoreWindow_BgType:num":"0","LoreWindow_FontSize:num":"22","Scrolling":"","Slow":"","SlowScrollSpeed:num":"8","SlowSoundFreq:num":"8","Fast":"","FastScrollSpeed:num":"32","FastSoundFreq:num":"4"}
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
 * Category List Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Key:str
 * @text ID Key
 * @desc This category's identification key. Categories require
 * unique keys for the plugin to differentiate them.
 * @default (Needs Key)
 *
 * @param Title:str
 * @text Title
 * @desc This category's title.
 * You may use text codes.
 * @default Untitled
 * 
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Bestiary' option in the Main Menu.
 * @default Bestiary
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Bestiary' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Bestiary' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @require 1
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @require 1
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssist_Collapse:str
 * @text Collapse
 * @parent ButtonAssist
 * @desc Text used to collapse a category.
 * Requires VisuMZ_0_CoreEngine!
 * @default Collapse
 *
 * @param buttonAssist_Expand:str
 * @text Expand
 * @parent ButtonAssist
 * @desc Text used to expand a category.
 * Requires VisuMZ_0_CoreEngine!
 * @default Expand
 *
 * @param buttonAssist_FastScroll:str
 * @text Scroll Fast
 * @parent ButtonAssist
 * @desc Text used to scroll enemy lore quickly.
 * Requires VisuMZ_0_CoreEngine!
 * @default Fast Scroll
 *
 * @param buttonAssist_SlowScroll:str
 * @text Scroll Slow
 * @parent ButtonAssist
 * @desc Text used to scroll enemy lore slowly.
 * Requires VisuMZ_0_CoreEngine!
 * @default Scroll
 *
 * @param buttonAssist_Switch:str
 * @text Switch Enemy
 * @parent ButtonAssist
 * @desc Text used to switch an enemy.
 * Requires VisuMZ_0_CoreEngine!
 * @default Switch Monster
 *
 * @param buttonAssist_View:str
 * @text View
 * @parent ButtonAssist
 * @desc Text used to view an enemy.
 * Requires VisuMZ_0_CoreEngine!
 * @default View
 *
 * @param MainWindows
 * @text Main Windows
 *
 * @param CategoryWindow
 * @text List Window
 * @parent MainWindows
 *
 * @param CategoryWindow_ClosedCategory:str
 * @text Category (Closed)
 * @parent CategoryWindow
 * @desc Text format used for closed categories.
 * %1 - Category Name, %2 - Percent Complete
 * @default + %1 (%2%)
 *
 * @param CategoryWindow_OpenCategory:str
 * @text Category (Opened)
 * @parent CategoryWindow
 * @desc Text format used for opened categories.
 * %1 - Category Name, %2 - Percent Complete
 * @default - %1 (%2%)
 *
 * @param CategoryPercentFixedDigits:num
 * @text Decimal Places
 * @parent CategoryWindow_OpenCategory:str
 * @type number
 * @desc Decimal places for completion percentages.
 * @default 2
 *
 * @param CategoryWindow_MaskChar:str
 * @text Mask Character
 * @parent CategoryWindow
 * @desc Text character used to mask unknown enemy names.
 * @default ?
 *
 * @param NameWindow
 * @text Name Window
 * @parent MainWindows
 *
 * @param NameWindow_CategoryText:str
 * @text Category Text
 * @parent NameWindow
 * @desc Text used when selecting an enemy.
 * @default Please select a monster to view.
 *
 * @param SubWindow
 * @text Sub Window
 * @parent MainWindows
 *
 * @param SubWindow_Completion:str
 * @text Completion Rate
 * @parent SubWindow
 * @desc Text used to announce completion rate.
 * %1 - Percentage, %2 - Defeated, %3 - Total
 * @default Bestiary Completion Rate: %1% (%2/%3 Monsters)
 *
 * @param SubWindowCompleteFixedDigits:num
 * @text Decimal Places
 * @parent SubWindow_Completion:str
 * @type number
 * @desc Decimal places for completion percentage.
 * @default 2
 *
 * @param SubWindow_Defeated:str
 * @text Defeated
 * @parent SubWindow
 * @desc Text used to announce defeated monsters.
 * %1 - Defeated Number
 * @default Defeated: %1
 *
 * @param SubWindow_Encountered:str
 * @text Encountered
 * @parent SubWindow
 * @desc Text used to announce encountered monsters.
 * %1 - Encountered Number
 * @default Encountered: %1
 *
 * @param DataWindows
 * @text Data Windows
 *
 * @param DataCategoryWindow
 * @text Category Window
 * @parent DataWindows
 *
 * @param BasicText:str
 * @text Basic Text
 * @parent DataCategoryWindow
 * @desc Text used for this command.
 * @default Base
 *
 * @param BasicIcon:str
 * @text Icon
 * @parent BasicText:str
 * @desc Icon used for this command.
 * @default 84
 *
 * @param ElementsText:str
 * @text Elements Text
 * @parent DataCategoryWindow
 * @desc Text used for this command.
 * @default Elements
 *
 * @param ElementsIcon:str
 * @text Icon
 * @parent ElementsText:str
 * @desc Icon used for this command.
 * @default 64
 *
 * @param SkillsText:str
 * @text Skills Text
 * @parent DataCategoryWindow
 * @desc Text used for this command.
 * @default Skills
 *
 * @param SkillsIcon:str
 * @text Icon
 * @parent SkillsText:str
 * @desc Icon used for this command.
 * @default 79
 *
 * @param RewardsText:str
 * @text Rewards Text
 * @parent DataCategoryWindow
 * @desc Text used for this command.
 * @default Rewards
 *
 * @param RewardsIcon:str
 * @text Icon
 * @parent RewardsText:str
 * @desc Icon used for this command.
 * @default 87
 *
 * @param TraitsText:str
 * @text Traits Text
 * @parent DataCategoryWindow
 * @desc Text used for this command.
 * @default Properties
 *
 * @param TraitsIcon:str
 * @text Icon
 * @parent TraitsText:str
 * @desc Icon used for this command.
 * @default 83
 *
 * @param LoreText:str
 * @text Lore Text
 * @parent DataCategoryWindow
 * @desc Text used for this command.
 * @default Lore
 *
 * @param LoreIcon:str
 * @text Icon
 * @parent LoreText:str
 * @desc Icon used for this command.
 * @default 80
 *
 * @param BasicWindow
 * @text Basic Window
 * @parent DataWindows
 *
 * @param BasicWindow_LevelUpToMax:str
 * @text Level Up To Max
 * @parent BasicWindow
 * @desc Text used for leveling to max. Text codes allowed.
 * Requires VisuMZ_3_EnemyLevels! %1 - Level Name
 * @default \I[73]Raise %1 Up to Maximum
 *
 * @param BasicWindow_LevelUpByOne:str
 * @text Level Up By One
 * @parent BasicWindow
 * @desc Text used for leveling by one. Text codes allowed.
 * Requires VisuMZ_3_EnemyLevels! %1 - Level Name
 * @default \I[73]Raise %1 Up
 *
 * @param BasicWindow_LevelDownByOne:str
 * @text Level Down By One
 * @parent BasicWindow
 * @desc Text used for deleveling by one. Text codes allowed.
 * Requires VisuMZ_3_EnemyLevels! %1 - Level Name
 * @default \I[74]Lower %1 Down
 *
 * @param BasicWindow_LevelDownToMin:str
 * @text Level Down To Min
 * @parent BasicWindow
 * @desc Text used for deleveling to min. Text codes allowed.
 * Requires VisuMZ_3_EnemyLevels! %1 - Level Name
 * @default \I[74]Lower %1 Down to Minimum
 *
 * @param ElementsWindow
 * @text Elements Window
 * @parent DataWindows
 *
 * @param ElementsWindow_Weak:str
 * @text Weak to Element
 * @parent ElementsWindow
 * @desc Text used when weak to element.
 * Text codes allowed.
 * @default \C[24]Weak
 *
 * @param ElementsWindow_Neutral:str
 * @text Neutral to Element
 * @parent ElementsWindow
 * @desc Text used when neutral to element.
 * Text codes allowed.
 * @default \C[0]Normal
 *
 * @param ElementsWindow_Resist:str
 * @text Resistant to Element
 * @parent ElementsWindow
 * @desc Text used when resistant to element.
 * Text codes allowed.
 * @default \C[25]Resist
 *
 * @param ElementsWindow_Immune:str
 * @text Immune to Element
 * @parent ElementsWindow
 * @desc Text used when immune to element.
 * Text codes allowed.
 * @default \C[7]Immune
 *
 * @param ElementsWindow_Absorb:str
 * @text Absorbs Element
 * @parent ElementsWindow
 * @desc Text used when absorbs element.
 * Text codes allowed.
 * @default \C[27]Absorb
 *
 * @param RewardsWindow
 * @text Rewards Window
 * @parent DataWindows
 *
 * @param RewardsWindow_Chance100:str
 * @text Drop Rate 100%
 * @parent RewardsWindow
 * @desc Text used for 100% drop rates.
 * Text codes allowed.
 * @default \C[24]Guaranteed
 *
 * @param RewardsWindow_Chance50:str
 * @text Drop Rate >= 50%
 * @parent RewardsWindow
 * @desc Text used for greater than 50% drop rates.
 * Text codes allowed.
 * @default \C[21]Common
 *
 * @param RewardsWindow_Chance20:str
 * @text Drop Rate >= 20%
 * @parent RewardsWindow
 * @desc Text used for greater than 20% drop rates.
 * Text codes allowed.
 * @default \C[4]Uncommon
 *
 * @param RewardsWindow_Chance10:str
 * @text Drop Rate >= 10%
 * @parent RewardsWindow
 * @desc Text used for greater than 10% drop rates.
 * Text codes allowed.
 * @default \C[5]Rare
 *
 * @param RewardsWindow_Chance0:str
 * @text Drop Rate < 10%
 * @parent RewardsWindow
 * @desc Text used for less than 10% drop rates.
 * Text codes allowed.
 * @default \C[27]Super Rare
 *
 * @param RewardsWindow_Conditional:str
 * @text Conditional Rate
 * @parent RewardsWindow
 * @desc Text used for conditional drop rates.
 * Requires VisuMZ_4_ExtraEnemyDrops! Text codes allowed.
 * @default \C[17]Conditional
 *
 * @param TraitsWindow
 * @text Traits Window
 * @parent DataWindows
 *
 * @param TraitsWindow_ClosedCategory:str
 * @text Category (Closed)
 * @parent TraitsWindow
 * @desc Text format used for closed categories.
 * Text codes allowed. %1 - Category Name
 * @default + \C[16]%1
 *
 * @param TraitsWindow_OpenCategory:str
 * @text Category (Opened)
 * @parent TraitsWindow
 * @desc Text format used for opened categories.
 * Text codes allowed. %1 - Category Name
 * @default - \C[16]%1
 *
 * @param TraitsWindow_CategoryHelpDesc:json
 * @text Help Description
 * @parent TraitsWindow_OpenCategory:str
 * @type note
 * @desc Help description used for trait categories.
 * Text codes allowed.
 * @default "This is the property type."
 *
 * @param TraitsWindow_NullHelpDesc:json
 * @text Null Help
 * @parent TraitsWindow
 * @type note
 * @desc Help description used for no traits.
 * Text codes allowed.
 * @default "This monster has no special properties."
 *
 * @param LoreWindow
 * @text Lore Window
 * @parent DataWindows
 *
 * @param LoreWindow_Default:json
 * @text Default Lore
 * @parent LoreWindow
 * @type note
 * @desc Text when no lore is found.
 * Text codes allowed.
 * @default "Little is known about this monster."
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpWindow_BgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpWindow_ScaleRatio:eval
 * @text Scale Window
 * @parent HelpWindow
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Scale the help window to fit with the enemy preview window?
 * @default true
 *
 * @param HelpWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(2, false);\nconst wx = this.imageWindowRect().x;\nconst wy = this.imageWindowRect().y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param MainWindows
 * @text Main Windows
 *
 * @param ImageWindow
 * @text Image Window
 * @parent MainWindows
 *
 * @param ImageWindow_BgType:num
 * @text Background Type
 * @parent ImageWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ImageWindow_BlurStrength:num
 * @text Blur Strength
 * @parent ImageWindow
 * @type number
 * @desc What is the blur strength used for unknown enemies?
 * @default 8
 *
 * @param ImageWindow_Battleback1:str
 * @text Default Battleback 1
 * @parent ImageWindow
 * @type file
 * @dir img/battlebacks1/
 * @require 1
 * @desc Default battleback 1 image used for enemies
 * without <Bestiary Battleback 1: filename> notetag.
 * @default Grassland
 *
 * @param ImageWindow_Battleback2:str
 * @text Default Battleback 2
 * @parent ImageWindow
 * @type file
 * @dir img/battlebacks2/
 * @require 1
 * @desc Default battleback 2 image used for enemies
 * without <Bestiary Battleback 2: filename> notetag.
 * @default Grassland
 *
 * @param ImageWindow_Padding:num
 * @text Padding
 * @parent ImageWindow
 * @type number
 * @desc What is the padding value used for this window?
 * @default 4
 *
 * @param ImageWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent ImageWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - Math.ceil(Graphics.boxWidth * 4/10);\nconst wh = this.mainAreaHeight() - (this.calcWindowHeight(1, false) * 2);\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ListWindow
 * @text List Window
 * @parent MainWindows
 *
 * @param ListWindow_BgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListWindowDelayMS:num
 * @text Delay MS
 * @parent ListWindow
 * @type number
 * @min 1
 * @max 999
 * @desc How many milliseconds (MS) to delay the preview update?
 * This is to prevent lag spikes.
 * @default 240
 *
 * @param ListWindow_MaskUnknown:eval
 * @text Mask Unknown Enemies
 * @parent ListWindow
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Apply a character mask to unknown enemies?
 * @default true
 *
 * @param ListWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.ceil(Graphics.boxWidth * 4/10);\nconst wh = this.mainAreaHeight() - (this.calcWindowHeight(1, false) * 2);\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param NameWindow
 * @text Name Window
 * @parent MainWindows
 *
 * @param NameWindow_BgType:num
 * @text Background Type
 * @parent NameWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NameWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent NameWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(1, false);\nconst wx = 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SubWindow
 * @text Sub Window
 * @parent MainWindows
 *
 * @param SubWindow_BgType:num
 * @text Background Type
 * @parent SubWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SubWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent SubWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(1, false);\nconst wx = 0;\nconst wy = this.mainAreaBottom() - wh;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param DataWindows
 * @text Data Window
 *
 * @param DataWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent DataWindows
 * @type note
 * @desc Code used to determine the dimensions for all data windows.
 * @default "const ww = this.listWindowRect().width;\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true) - (this.calcWindowHeight(1, false) * 2);\nconst wx = 0;\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, false) + this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CategoryWindow
 * @text Category Window
 * @parent DataWindows
 *
 * @param CategoryWindow_BgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryWindow_CommandOrder:arraystr
 * @text Command Order
 * @parent CategoryWindow
 * @type select[]
 * @option Basic - Basic parameter data
 * @value basic
 * @option Elements - Elemental resistances and weaknesses
 * @value elements
 * @option Skills - Usable skills in-battle
 * @value skills
 * @option Rewards - EXP, Gold, Drop Items
 * @value rewards
 * @option Traits - For VisuMZ_1_ElementStatusCore.js
 * @value traits
 * @option Lore - Background Information
 * @value lore
 * @desc What order do you want the commands to appear in?
 * @default ["basic","elements","skills","rewards","traits","lore"]
 *
 * @param CategoryWindow_Style:str
 * @text Style
 * @parent CategoryWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands for this window?
 * @default auto
 *
 * @param DataCategoriesWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.listWindowRect().width;\nconst wh = this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param BasicWindow
 * @text Basic Window
 * @parent DataWindows
 *
 * @param BasicWindow_BgType:num
 * @text Background Type
 * @parent BasicWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BasicWindow_ShowLevelChange:eval
 * @text Show Level Change
 * @parent BasicWindow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show level change commands?
 * Requires VisuMZ_3_EnemyLevels!
 * @default true
 *
 * @param ElementsWindow
 * @text Elements Window
 * @parent DataWindows
 *
 * @param ElementsWindow_BgType:num
 * @text Background Type
 * @parent ElementsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillsWindow
 * @text Skills Window
 * @parent DataWindows
 *
 * @param SkillsWindow_BgType:num
 * @text Background Type
 * @parent SkillsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillsWindow_ShowAspects:eval
 * @text Show Aspects
 * @parent SkillsWindow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show enemy aspect description if available?
 * Requires VisuMZ_1_BattleCore!
 * @default true
 *
 * @param SkillsWindow_ShowPassives:eval
 * @text Show Passives
 * @parent SkillsWindow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show enemy passives if available?
 * Requires VisuMZ_1_BattleCore + VisuMZ_1_SkillsStatesCore!
 * @default true
 *
 * @param RewardsWindow
 * @text Rewards Window
 * @parent DataWindows
 *
 * @param RewardsWindow_BgType:num
 * @text Background Type
 * @parent RewardsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param RewardsWindow_RewardsOrder:arraystr
 * @text Rewards Order
 * @parent RewardsWindow
 * @type select[]
 * @option EXP - Experience Points
 * @value exp
 * @option Gold - Gold Currency
 * @value gold
 * @option Drop Items - Enemy Drop Items
 * @value items
 * @option AP - For VisuMZ_2_SkillLearnSystem.js
 * @value ap
 * @option CP - For VisuMZ_2_ClassChangeSystem.js
 * @value cp
 * @option JP - For VisuMZ_2_ClassChangeSystem.js
 * @value jp
 * @option SP - For VisuMZ_2_SkillLearnSystem.js
 * @value sp
 * @desc What order do you want the rewards to appear in?
 * @default ["exp","ap","cp","jp","sp","gold","items"]
 *
 * @param EXP_Icon:num
 * @text Reward EXP Icon
 * @parent RewardsWindow
 * @desc Icon used for EXP reward.
 * @default 87
 *
 * @param Gold_Icon:num
 * @text Reward Gold Icon
 * @parent RewardsWindow
 * @desc Icon used for Gold reward.
 * @default 314
 *
 * @param TraitsWindow
 * @text Traits Window
 * @parent DataWindows
 *
 * @param TraitsWindow_BgType:num
 * @text Background Type
 * @parent TraitsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param TraitsWindow_ShowAllTraits:eval
 * @text Show All Traits
 * @parent TraitsWindow
 * @type boolean
 * @on Include Unused
 * @off Show Only Used
 * @desc Show all traits? Including unused ones?
 * Requires VisuMZ_1_ElementStatusCore!
 * @default false
 *
 * @param LoreWindow
 * @text Lore Window
 * @parent DataWindows
 *
 * @param LoreWindow_AutoWordWrap:eval
 * @text Auto Word Wrap?
 * @parent LoreWindow
 * @type boolean
 * @on Word Wrap
 * @off Normal
 * @desc Automatically enable word wrap?
 * Requires VisuMZ_1_MessageCore!
 * @default false
 *
 * @param LoreWindow_BgType:num
 * @text Background Type
 * @parent LoreWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param LoreWindow_FontSize:num
 * @text Font Size
 * @parent LoreWindow
 * @desc Font size used for Lore Window.
 * @default 22
 *
 * @param Scrolling
 * @parent LoreWindow
 *
 * @param Slow
 * @parent Scrolling
 *
 * @param SlowScrollSpeed:num
 * @text Scroll Speed
 * @parent Slow
 * @type number
 * @min 1
 * @desc What speed will Up/Down scroll the window at?
 * Lower is slower. Higher is faster.
 * @default 8
 *
 * @param SlowSoundFreq:num
 * @text Sound Frequency
 * @parent Slow
 * @type number
 * @min 1
 * @desc How frequent will Up/Down scrolling make sounds?
 * Lower is quicker. Higher is later.
 * @default 8
 *
 * @param Fast
 * @parent Scrolling
 *
 * @param FastScrollSpeed:num
 * @text Scroll Speed
 * @parent Fast
 * @type number
 * @min 1
 * @desc What speed will PageUp/PageDn scroll the window at?
 * Lower is slower. Higher is faster.
 * @default 32
 *
 * @param FastSoundFreq:num
 * @text Sound Frequency
 * @parent Fast
 * @type number
 * @min 1
 * @desc How frequent will PageUp/PageDn scrolling make sounds?
 * Lower is quicker. Higher is later.
 * @default 4
 *
 */
//=============================================================================

const _0x3a3887=_0xc564;(function(_0x1485df,_0x1548c2){const _0x4e8409=_0xc564,_0x3ff00a=_0x1485df();while(!![]){try{const _0x44101d=parseInt(_0x4e8409(0x14d))/0x1*(parseInt(_0x4e8409(0x21b))/0x2)+-parseInt(_0x4e8409(0x3bc))/0x3*(parseInt(_0x4e8409(0x22b))/0x4)+parseInt(_0x4e8409(0x2f8))/0x5*(parseInt(_0x4e8409(0x2e2))/0x6)+parseInt(_0x4e8409(0x176))/0x7+parseInt(_0x4e8409(0x377))/0x8+parseInt(_0x4e8409(0x263))/0x9*(-parseInt(_0x4e8409(0x2c2))/0xa)+parseInt(_0x4e8409(0x324))/0xb*(-parseInt(_0x4e8409(0x251))/0xc);if(_0x44101d===_0x1548c2)break;else _0x3ff00a['push'](_0x3ff00a['shift']());}catch(_0x457ce5){_0x3ff00a['push'](_0x3ff00a['shift']());}}}(_0xab9d,0x3cffa));var label=_0x3a3887(0x2c6),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3a3887(0x2b5)](function(_0x2648ec){const _0x2a6bb6=_0x3a3887;return _0x2648ec['status']&&_0x2648ec['description'][_0x2a6bb6(0x1f8)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x3a3887(0x3d6)]||{},VisuMZ['ConvertParams']=function(_0x3404d0,_0x377f14){const _0x5da723=_0x3a3887;for(const _0x2d94e7 in _0x377f14){if(_0x2d94e7[_0x5da723(0x303)](/(.*):(.*)/i)){const _0x5169c4=String(RegExp['$1']),_0x1c99ec=String(RegExp['$2'])['toUpperCase']()[_0x5da723(0x167)]();let _0x2dbbb2,_0x50e886,_0x448a53;switch(_0x1c99ec){case _0x5da723(0x242):_0x2dbbb2=_0x377f14[_0x2d94e7]!==''?Number(_0x377f14[_0x2d94e7]):0x0;break;case _0x5da723(0x17b):_0x50e886=_0x377f14[_0x2d94e7]!==''?JSON[_0x5da723(0x275)](_0x377f14[_0x2d94e7]):[],_0x2dbbb2=_0x50e886['map'](_0x13be42=>Number(_0x13be42));break;case _0x5da723(0x38a):_0x2dbbb2=_0x377f14[_0x2d94e7]!==''?eval(_0x377f14[_0x2d94e7]):null;break;case _0x5da723(0x27f):_0x50e886=_0x377f14[_0x2d94e7]!==''?JSON[_0x5da723(0x275)](_0x377f14[_0x2d94e7]):[],_0x2dbbb2=_0x50e886[_0x5da723(0x13f)](_0x3fbfa5=>eval(_0x3fbfa5));break;case _0x5da723(0x183):_0x2dbbb2=_0x377f14[_0x2d94e7]!==''?JSON[_0x5da723(0x275)](_0x377f14[_0x2d94e7]):'';break;case'ARRAYJSON':_0x50e886=_0x377f14[_0x2d94e7]!==''?JSON['parse'](_0x377f14[_0x2d94e7]):[],_0x2dbbb2=_0x50e886['map'](_0x35a609=>JSON[_0x5da723(0x275)](_0x35a609));break;case _0x5da723(0x360):_0x2dbbb2=_0x377f14[_0x2d94e7]!==''?new Function(JSON[_0x5da723(0x275)](_0x377f14[_0x2d94e7])):new Function('return\x200');break;case _0x5da723(0x157):_0x50e886=_0x377f14[_0x2d94e7]!==''?JSON[_0x5da723(0x275)](_0x377f14[_0x2d94e7]):[],_0x2dbbb2=_0x50e886['map'](_0xea2121=>new Function(JSON[_0x5da723(0x275)](_0xea2121)));break;case'STR':_0x2dbbb2=_0x377f14[_0x2d94e7]!==''?String(_0x377f14[_0x2d94e7]):'';break;case _0x5da723(0x160):_0x50e886=_0x377f14[_0x2d94e7]!==''?JSON[_0x5da723(0x275)](_0x377f14[_0x2d94e7]):[],_0x2dbbb2=_0x50e886[_0x5da723(0x13f)](_0x557837=>String(_0x557837));break;case _0x5da723(0x132):_0x448a53=_0x377f14[_0x2d94e7]!==''?JSON['parse'](_0x377f14[_0x2d94e7]):{},_0x2dbbb2=VisuMZ[_0x5da723(0x34b)]({},_0x448a53);break;case _0x5da723(0x159):_0x50e886=_0x377f14[_0x2d94e7]!==''?JSON[_0x5da723(0x275)](_0x377f14[_0x2d94e7]):[],_0x2dbbb2=_0x50e886[_0x5da723(0x13f)](_0x15b120=>VisuMZ[_0x5da723(0x34b)]({},JSON['parse'](_0x15b120)));break;default:continue;}_0x3404d0[_0x5169c4]=_0x2dbbb2;}}return _0x3404d0;},(_0x4eb2b1=>{const _0x1b1f73=_0x3a3887,_0x1b75a5=_0x4eb2b1[_0x1b1f73(0x386)];for(const _0x306823 of dependencies){if(!Imported[_0x306823]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x1b1f73(0x1f5)](_0x1b75a5,_0x306823)),SceneManager[_0x1b1f73(0x3df)]();break;}}const _0x30d3a4=_0x4eb2b1[_0x1b1f73(0x200)];if(_0x30d3a4[_0x1b1f73(0x303)](/\[Version[ ](.*?)\]/i)){const _0x3cfb59=Number(RegExp['$1']);_0x3cfb59!==VisuMZ[label][_0x1b1f73(0x1c8)]&&(alert(_0x1b1f73(0x31b)[_0x1b1f73(0x1f5)](_0x1b75a5,_0x3cfb59)),SceneManager['exit']());}if(_0x30d3a4[_0x1b1f73(0x303)](/\[Tier[ ](\d+)\]/i)){const _0x577f62=Number(RegExp['$1']);_0x577f62<tier?(alert(_0x1b1f73(0x278)['format'](_0x1b75a5,_0x577f62,tier)),SceneManager[_0x1b1f73(0x3df)]()):tier=Math['max'](_0x577f62,tier);}VisuMZ[_0x1b1f73(0x34b)](VisuMZ[label][_0x1b1f73(0x3d6)],_0x4eb2b1[_0x1b1f73(0x308)]);})(pluginData),PluginManager[_0x3a3887(0x2a6)](pluginData['name'],_0x3a3887(0x225),_0x44b2a4=>{const _0x100717=_0x3a3887;if(!$gameTemp['isPlaytest']())return;VisuMZ[_0x100717(0x34b)](_0x44b2a4,_0x44b2a4);const _0x56e3f0=_0x44b2a4[_0x100717(0x2dc)]||[];for(const _0x89dd70 of _0x56e3f0){$gameSystem[_0x100717(0x156)](_0x89dd70);}}),PluginManager[_0x3a3887(0x2a6)](pluginData[_0x3a3887(0x386)],_0x3a3887(0x333),_0x537795=>{const _0x102e12=_0x3a3887;if(!$gameTemp['isPlaytest']())return;VisuMZ['ConvertParams'](_0x537795,_0x537795),$gameTemp[_0x102e12(0x3d2)](_0x537795[_0x102e12(0x3a1)]);}),PluginManager[_0x3a3887(0x2a6)](pluginData[_0x3a3887(0x386)],_0x3a3887(0x2c5),_0x519430=>{const _0x1b8423=_0x3a3887;if($gameParty['inBattle']())return;if(SceneManager[_0x1b8423(0x335)]())return;SceneManager['push'](Scene_Bestiary);}),PluginManager[_0x3a3887(0x2a6)](pluginData['name'],_0x3a3887(0x237),_0x5221d2=>{const _0x4e4d5f=_0x3a3887;VisuMZ[_0x4e4d5f(0x34b)](_0x5221d2,_0x5221d2),$gameSystem[_0x4e4d5f(0x2d9)](_0x5221d2['Enable']);}),PluginManager[_0x3a3887(0x2a6)](pluginData[_0x3a3887(0x386)],'SystemShowBestiaryMenu',_0x101969=>{const _0x3297b3=_0x3a3887;VisuMZ[_0x3297b3(0x34b)](_0x101969,_0x101969),$gameSystem[_0x3297b3(0x3c5)](_0x101969[_0x3297b3(0x206)]);}),VisuMZ['Bestiary'][_0x3a3887(0x1be)]={'category':/<BESTIARY (?:CATEGORY|CATEGORIES):[ ](.*)>/i,'hideInBestiary':/<HIDE IN BESTIARY>/i,'customPicture':/<BESTIARY CUSTOM (?:IMAGE|PICTURE):[ ](.*)>/i,'battleback1':/<BESTIARY (?:BATTLEBACK|BACKGROUND) 1:[ ](.*)>/i,'battleback2':/<BESTIARY (?:BATTLEBACK|BACKGROUND) 2:[ ](.*)>/i,'lore':/<(?:BESTIARY |)LORE>\s*([\s\S]*)\s*<\/(?:BESTIARY |)LORE>/i,'hideSkill':/<HIDE SKILL IN BESTIARY>/i},VisuMZ[_0x3a3887(0x2c6)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x3a3887(0x3f8)][_0x3a3887(0x235)],Scene_Boot[_0x3a3887(0x3f8)]['onDatabaseLoaded']=function(){const _0x396eee=_0x3a3887;VisuMZ['Bestiary'][_0x396eee(0x2b2)]['call'](this),this[_0x396eee(0x321)]();},Scene_Boot['prototype'][_0x3a3887(0x321)]=function(){const _0x285497=_0x3a3887;this[_0x285497(0x385)]();},Scene_Boot[_0x3a3887(0x3f8)][_0x3a3887(0x385)]=function(){const _0x53239b=_0x3a3887;VisuMZ['Bestiary'][_0x53239b(0x33a)]=[],VisuMZ[_0x53239b(0x2c6)][_0x53239b(0x190)]={};const _0x36b406=VisuMZ[_0x53239b(0x2c6)][_0x53239b(0x3d6)][_0x53239b(0x246)];for(const _0x3dfd31 of _0x36b406){const _0x357707=(_0x3dfd31[_0x53239b(0x13c)]||'')[_0x53239b(0x1a7)]()[_0x53239b(0x167)]();if(_0x357707==='')continue;if(_0x357707==='(needs\x20key)')continue;VisuMZ[_0x53239b(0x2c6)][_0x53239b(0x33a)][_0x53239b(0x39d)](_0x357707),VisuMZ[_0x53239b(0x2c6)][_0x53239b(0x190)][_0x357707]=_0x3dfd31;}},VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x26b)]=Math[_0x3a3887(0x33b)],Math[_0x3a3887(0x33b)]=function(){const _0x393e23=_0x3a3887;if(this['_noRandom'])return 0.5;return VisuMZ['Bestiary'][_0x393e23(0x26b)][_0x393e23(0x329)](this,arguments);},DataManager[_0x3a3887(0x12b)]=function(_0x153f70){const _0x49b345=_0x3a3887;if(!_0x153f70)return[];const _0x1e93cd=_0x153f70['id'];this['_enemyBestiaryCategories']=this['_enemyBestiaryCategories']||{};if(this[_0x49b345(0x371)][_0x1e93cd]!==undefined)return this[_0x49b345(0x371)][_0x1e93cd];this[_0x49b345(0x371)][_0x1e93cd]=[];const _0x3764c2=VisuMZ['Bestiary'][_0x49b345(0x1be)],_0x138892=_0x153f70[_0x49b345(0x256)]||'';return _0x138892[_0x49b345(0x303)](_0x3764c2['category'])&&(this[_0x49b345(0x371)][_0x1e93cd]=RegExp['$1'][_0x49b345(0x350)](',')[_0x49b345(0x13f)](_0x46878f=>_0x46878f['toLowerCase']()['trim']())),this['_enemyBestiaryCategories'][_0x1e93cd][_0x49b345(0x33e)]<=0x0&&(this['_enemyBestiaryCategories'][_0x1e93cd]=[Game_Enemy[_0x49b345(0x271)][_0x49b345(0x13d)][_0x49b345(0x1a7)]()[_0x49b345(0x167)]()]),this['_enemyBestiaryCategories'][_0x1e93cd];},DataManager[_0x3a3887(0x2d3)]=function(_0x3a24c2){const _0x47c5c3=_0x3a3887;if(!_0x3a24c2)return![];if(_0x3a24c2['name']['trim']()==='')return![];if(_0x3a24c2[_0x47c5c3(0x386)][_0x47c5c3(0x1f8)]('-----'))return![];const _0x4cef6e=_0x3a24c2['id'];this['_showEnemyInBestiary']=this[_0x47c5c3(0x261)]||{};if(this[_0x47c5c3(0x261)][_0x4cef6e]!==undefined)return this[_0x47c5c3(0x261)][_0x4cef6e];let _0x49417d=!![];const _0x3edcae=VisuMZ[_0x47c5c3(0x2c6)][_0x47c5c3(0x1be)],_0x8a3055=_0x3a24c2['note']||'';if(_0x8a3055[_0x47c5c3(0x303)](_0x3edcae['hideInBestiary']))_0x49417d=![];else _0x8a3055[_0x47c5c3(0x303)](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)&&(_0x49417d=![]);return this[_0x47c5c3(0x261)][_0x4cef6e]=_0x49417d,this[_0x47c5c3(0x261)][_0x4cef6e];},DataManager[_0x3a3887(0x2f9)]=function(_0x3588e3){const _0x347629=_0x3a3887,_0xe4d46=this[_0x347629(0x36f)](_0x3588e3);return _0xe4d46[_0x347629(0x13f)](_0x474977=>$dataEnemies[_0x474977])[_0x347629(0x341)](undefined)[_0x347629(0x341)](null);},DataManager[_0x3a3887(0x36f)]=function(_0x16ebf9){const _0x4c96ec=_0x3a3887;this[_0x4c96ec(0x3b1)]=this['_categoryEnemyIDs']||{};if(this[_0x4c96ec(0x3b1)][_0x16ebf9]!==undefined)return this[_0x4c96ec(0x3b1)][_0x16ebf9];for(const _0x45922b of VisuMZ[_0x4c96ec(0x2c6)][_0x4c96ec(0x33a)]){this[_0x4c96ec(0x3b1)][_0x45922b]=[];}for(const _0x174adb of $dataEnemies){if(!_0x174adb)continue;if(!this['showEnemyInBestiary'](_0x174adb))continue;const _0xd3a506=this[_0x4c96ec(0x12b)](_0x174adb);for(const _0x5028c8 of _0xd3a506){this['_categoryEnemyIDs'][_0x5028c8]=this['_categoryEnemyIDs'][_0x5028c8]||[],this[_0x4c96ec(0x3b1)][_0x5028c8]['push'](_0x174adb['id']);}}for(const _0x59d2c1 in this[_0x4c96ec(0x3b1)]){this[_0x4c96ec(0x3b1)][_0x59d2c1]['sort']((_0x1f9608,_0x814a3e)=>_0x1f9608-_0x814a3e);}return this[_0x4c96ec(0x3b1)][_0x16ebf9];},DataManager[_0x3a3887(0x187)]=function(){const _0x352759=_0x3a3887;if(this[_0x352759(0x135)]!==undefined)return this['_bestiaryTotalEnemies'];let _0x52aba1=[];for(const _0x5194ee of VisuMZ[_0x352759(0x2c6)][_0x352759(0x33a)]){const _0x565b92=this[_0x352759(0x36f)](_0x5194ee);_0x52aba1=_0x52aba1[_0x352759(0x185)](_0x565b92);}return this[_0x352759(0x135)]=_0x52aba1[_0x352759(0x2b5)]((_0x310856,_0x3bb79a,_0x5e4288)=>_0x5e4288[_0x352759(0x279)](_0x310856)===_0x3bb79a)['length'],this[_0x352759(0x135)];},ImageManager[_0x3a3887(0x227)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x3a3887(0x1a9)]=ImageManager[_0x3a3887(0x1a9)]||0x6,ImageManager['bestiaryEnemyBattleback1']=function(_0x49b833){const _0x4c600f=_0x3a3887,_0x180e78=this[_0x4c600f(0x236)](_0x49b833)[0x0];return _0x180e78===''?new Bitmap(0x1,0x1):this[_0x4c600f(0x1fc)](_0x180e78);},ImageManager[_0x3a3887(0x38c)]=function(_0x5a2ffa){const _0x462705=_0x3a3887,_0x31b586=this[_0x462705(0x236)](_0x5a2ffa)[0x1];return _0x31b586===''?new Bitmap(0x1,0x1):this[_0x462705(0x1fa)](_0x31b586);},ImageManager[_0x3a3887(0x236)]=function(_0x582e6a){const _0x4ba6ec=_0x3a3887,_0x1d278d=$dataEnemies[_0x582e6a];if(!_0x1d278d)return['',''];this['_bestiaryEnemyBattlebackData']=this[_0x4ba6ec(0x3c7)]||{};if(this[_0x4ba6ec(0x3c7)][_0x582e6a]!==undefined)return this[_0x4ba6ec(0x3c7)][_0x582e6a];this[_0x4ba6ec(0x3c7)][_0x582e6a]=['',''];const _0x5c2b95=VisuMZ['Bestiary'][_0x4ba6ec(0x1be)],_0x707cea=_0x1d278d['note']||'';return _0x707cea[_0x4ba6ec(0x303)](_0x5c2b95[_0x4ba6ec(0x1f6)])&&(this['_bestiaryEnemyBattlebackData'][_0x582e6a][0x0]=String(RegExp['$1'])[_0x4ba6ec(0x167)]()),_0x707cea[_0x4ba6ec(0x303)](_0x5c2b95[_0x4ba6ec(0x39b)])&&(this[_0x4ba6ec(0x3c7)][_0x582e6a][0x1]=String(RegExp['$1'])[_0x4ba6ec(0x167)]()),this[_0x4ba6ec(0x3c7)][_0x582e6a][0x0]===''&&this['_bestiaryEnemyBattlebackData'][_0x582e6a][0x1]===''&&(this[_0x4ba6ec(0x3c7)][_0x582e6a]=[Window_BestiaryEnemyImage[_0x4ba6ec(0x18d)]['defaultBattleback1'],Window_BestiaryEnemyImage[_0x4ba6ec(0x18d)]['defaultBattleback2']]),this[_0x4ba6ec(0x3c7)][_0x582e6a];},ImageManager['bestiaryEnemyCustomImageFilename']=function(_0x11bc3b){const _0x13a3b2=_0x3a3887,_0x1b0bcf=$dataEnemies[_0x11bc3b];if(!_0x1b0bcf)return'';this[_0x13a3b2(0x2fb)]=this[_0x13a3b2(0x2fb)]||{};if(this['_bestiaryEnemyCustomImageFilename'][_0x11bc3b]!==undefined)return this[_0x13a3b2(0x2fb)][_0x11bc3b];this[_0x13a3b2(0x2fb)][_0x11bc3b]='';const _0x41e582=VisuMZ[_0x13a3b2(0x2c6)][_0x13a3b2(0x1be)],_0x272b0c=_0x1b0bcf[_0x13a3b2(0x256)]||'';return _0x272b0c[_0x13a3b2(0x303)](_0x41e582[_0x13a3b2(0x2f2)])&&(this[_0x13a3b2(0x2fb)][_0x11bc3b]=String(RegExp['$1'])[_0x13a3b2(0x167)]()),this[_0x13a3b2(0x2fb)][_0x11bc3b];},TextManager[_0x3a3887(0x1aa)]=VisuMZ['Bestiary']['Settings']['MainMenu'][_0x3a3887(0x34e)],TextManager[_0x3a3887(0x2c6)]={'buttonAssist':{'view':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x201)]??'View','expand':VisuMZ[_0x3a3887(0x2c6)]['Settings'][_0x3a3887(0x30d)][_0x3a3887(0x2f1)]??'Expand','collapse':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x179)]??_0x3a3887(0x204),'switch':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)]['buttonAssist_Switch']??_0x3a3887(0x214),'fastScrollLore':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Vocab'][_0x3a3887(0x226)]??'Fast\x20Scroll','slowScrollLore':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Vocab']['buttonAssist_SlowScroll']??_0x3a3887(0x14c)},'categoryWindow':{'maskChar':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)]['CategoryWindow_MaskChar']??'?','openCategoriesFmt':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x2a7)]??_0x3a3887(0x381),'closedCategoriesFmt':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x3f7)]??_0x3a3887(0x310),'fixedPercentage':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x28c)]??0x2},'nameWindow':{'category':VisuMZ['Bestiary'][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x284)]??_0x3a3887(0x2fa)},'subWindow':{'defeatedFmt':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Vocab'][_0x3a3887(0x383)]??_0x3a3887(0x1c5),'seenFmt':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Vocab'][_0x3a3887(0x26f)]??_0x3a3887(0x2d7),'completionFmt':VisuMZ['Bestiary'][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x273)]??_0x3a3887(0x19b),'fixedPercentage':VisuMZ['Bestiary'][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x161)]??0x2},'basicWindow':{'levelUpToMax':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x2aa)]??_0x3a3887(0x2e4),'levelUp':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x215)]??_0x3a3887(0x2f4),'levelDown':VisuMZ['Bestiary']['Settings'][_0x3a3887(0x30d)]['BasicWindow_LevelDownByOne']??_0x3a3887(0x211),'levelDownToMin':VisuMZ['Bestiary']['Settings']['Vocab'][_0x3a3887(0x2df)]??_0x3a3887(0x1e2)},'elementsWindow':{'weak':VisuMZ[_0x3a3887(0x2c6)]['Settings'][_0x3a3887(0x30d)][_0x3a3887(0x3f3)]??_0x3a3887(0x2a4),'neutral':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x29c)]??'\x5cC[0]Normal','resist':VisuMZ['Bestiary'][_0x3a3887(0x3d6)]['Vocab']['ElementsWindow_Resist']??_0x3a3887(0x3de),'immune':VisuMZ['Bestiary'][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x1e4)]??_0x3a3887(0x3c2),'absorb':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Vocab']['ElementsWindow_Absorb']??'\x5cC[27]Absorb'},'rewardsWindow':{'chance100':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x198)]??_0x3a3887(0x1ae),'chance50':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x3d4)]??'\x5cC[21]Common','chance20':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x186)]??'\x5cC[4]Uncommon','chance10':VisuMZ['Bestiary']['Settings']['Vocab'][_0x3a3887(0x238)]??_0x3a3887(0x148),'chance0':VisuMZ[_0x3a3887(0x2c6)]['Settings'][_0x3a3887(0x30d)]['RewardsWindow_Chance0']??_0x3a3887(0x2a0),'conditional':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Vocab']['RewardsWindow_Conditional']??_0x3a3887(0x172)},'traitsWindow':{'openCategoriesFmt':VisuMZ[_0x3a3887(0x2c6)]['Settings'][_0x3a3887(0x30d)][_0x3a3887(0x29e)]??_0x3a3887(0x2e3),'closedCategoriesFmt':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x326)]??_0x3a3887(0x25d),'traitHelp':VisuMZ['Bestiary'][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x27e)]??_0x3a3887(0x208),'nullHelp':VisuMZ[_0x3a3887(0x2c6)]['Settings']['Vocab'][_0x3a3887(0x2b7)]??'This\x20monster\x20has\x20no\x20special\x20properties.'},'loreWindow':{'defaultLoreFmt':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Vocab'][_0x3a3887(0x3ec)]??_0x3a3887(0x396)}},TextManager[_0x3a3887(0x12d)]=function(_0xa27f98){const _0x37f15b=_0x3a3887;if(!_0xa27f98)return'';const _0x4ba3cd=_0xa27f98['enemy']()['id'];this[_0x37f15b(0x346)]=this['_getBestiaryLore']||{};if(this[_0x37f15b(0x346)][_0x4ba3cd]!==undefined)return this['_getBestiaryLore'][_0x4ba3cd];this[_0x37f15b(0x346)][_0x4ba3cd]=TextManager[_0x37f15b(0x2c6)][_0x37f15b(0x253)][_0x37f15b(0x30f)]['format'](_0xa27f98[_0x37f15b(0x285)]());const _0x4be4da=VisuMZ[_0x37f15b(0x2c6)][_0x37f15b(0x1be)],_0x283e98=_0xa27f98[_0x37f15b(0x241)]()['note']||'';return _0x283e98['match'](_0x4be4da['lore'])&&(this[_0x37f15b(0x346)][_0x4ba3cd]=String(RegExp['$1'])[_0x37f15b(0x167)]()),this[_0x37f15b(0x346)][_0x4ba3cd];},ColorManager[_0x3a3887(0x17d)]=function(_0x151820){const _0x46e7f5=_0x3a3887;return _0x151820=String(_0x151820),_0x151820[_0x46e7f5(0x303)](/#(.*)/i)?_0x46e7f5(0x358)[_0x46e7f5(0x1f5)](String(RegExp['$1'])):this[_0x46e7f5(0x1a0)](Number(_0x151820));},SceneManager[_0x3a3887(0x335)]=function(){const _0x199fd0=_0x3a3887;return this['_scene']&&this[_0x199fd0(0x3fa)][_0x199fd0(0x345)]===Scene_Battle;},Game_Temp['prototype']['canDebugViewBestiary']=function(){const _0x2cce0b=_0x3a3887;return this[_0x2cce0b(0x362)]()&&this[_0x2cce0b(0x34f)];},Game_Temp[_0x3a3887(0x3f8)]['setDebugViewBestiary']=function(_0x277201){const _0x427ae1=_0x3a3887;this[_0x427ae1(0x34f)]=_0x277201;},VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x398)]=Game_System[_0x3a3887(0x3f8)][_0x3a3887(0x3b6)],Game_System[_0x3a3887(0x3f8)][_0x3a3887(0x3b6)]=function(){const _0x1e7187=_0x3a3887;VisuMZ[_0x1e7187(0x2c6)][_0x1e7187(0x398)][_0x1e7187(0x363)](this),this[_0x1e7187(0x34c)](),this['initBestiarySettings'](),this[_0x1e7187(0x337)]();},Game_System[_0x3a3887(0x3f8)]['initBestiaryMainMenu']=function(){const _0x3aafd9=_0x3a3887;this[_0x3aafd9(0x395)]={'shown':VisuMZ[_0x3aafd9(0x2c6)][_0x3aafd9(0x3d6)][_0x3aafd9(0x1e8)]['ShowMainMenu'],'enabled':VisuMZ[_0x3aafd9(0x2c6)]['Settings'][_0x3aafd9(0x1e8)][_0x3aafd9(0x1e3)]};},Game_System['prototype'][_0x3a3887(0x384)]=function(){const _0x1bd601=_0x3a3887;if(this['_Bestiary_MainMenu']===undefined)this['initBestiaryMainMenu']();return this[_0x1bd601(0x395)][_0x1bd601(0x255)];},Game_System[_0x3a3887(0x3f8)][_0x3a3887(0x3c5)]=function(_0x234c85){const _0x58b045=_0x3a3887;if(this['_Bestiary_MainMenu']===undefined)this[_0x58b045(0x34c)]();this['_Bestiary_MainMenu'][_0x58b045(0x255)]=_0x234c85;},Game_System[_0x3a3887(0x3f8)][_0x3a3887(0x24c)]=function(){const _0x3175b1=_0x3a3887;if(this['_Bestiary_MainMenu']===undefined)this[_0x3175b1(0x34c)]();return this['_Bestiary_MainMenu'][_0x3175b1(0x378)];},Game_System[_0x3a3887(0x3f8)]['setMainMenuBestiaryEnabled']=function(_0x400783){const _0x314692=_0x3a3887;if(this[_0x314692(0x395)]===undefined)this[_0x314692(0x34c)]();this[_0x314692(0x395)][_0x314692(0x378)]=_0x400783;},Game_System[_0x3a3887(0x3f8)][_0x3a3887(0x2bd)]=function(_0x14caca){const _0x5c6057=_0x3a3887;return Imported['VisuMZ_1_BattleCore']?this[_0x5c6057(0x15b)]()[_0x5c6057(0x1f8)](_0x14caca):this[_0x5c6057(0x29a)](_0x14caca)>0x0;},Game_System['prototype'][_0x3a3887(0x292)]=function(){const _0x4c4fbc=_0x3a3887;this[_0x4c4fbc(0x2de)]=this['_timesEnemyDefeated']||{},this['_timesEnemySeen']=this[_0x4c4fbc(0x1ef)]||{};},Game_System['prototype'][_0x3a3887(0x29a)]=function(_0x3c8067){const _0x15f2ad=_0x3a3887;if(this[_0x15f2ad(0x2de)]===undefined)this[_0x15f2ad(0x292)]();return this[_0x15f2ad(0x2de)][_0x3c8067]=this[_0x15f2ad(0x2de)][_0x3c8067]||0x0,this[_0x15f2ad(0x2de)][_0x3c8067];},Game_System['prototype']['addTimesEnemyDefeated']=function(_0x67ac02,_0x392af2){const _0x35d315=_0x3a3887;if(this[_0x35d315(0x2de)]===undefined)this['initBestiarySettings']();this['_timesEnemyDefeated'][_0x67ac02]=this[_0x35d315(0x2de)][_0x67ac02]||0x0,this[_0x35d315(0x2de)][_0x67ac02]+=_0x392af2||0x1;},Game_System[_0x3a3887(0x3f8)][_0x3a3887(0x3be)]=function(){const _0x2811b1=_0x3a3887;let _0xb64385=0x0;for(const _0x592f17 of $dataEnemies){if(!_0x592f17)continue;DataManager[_0x2811b1(0x2d3)](_0x592f17)&&(this[_0x2811b1(0x151)](_0x592f17['id'])&&_0xb64385++);}return _0xb64385;},Game_System['prototype'][_0x3a3887(0x151)]=function(_0x27e114){const _0xad953f=_0x3a3887;if(this[_0xad953f(0x29a)](_0x27e114)>0x0)return!![];if(this[_0xad953f(0x3ac)](_0x27e114))return!![];return![];},VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x22c)]=Game_BattlerBase[_0x3a3887(0x3f8)][_0x3a3887(0x1db)],Game_BattlerBase[_0x3a3887(0x3f8)][_0x3a3887(0x1db)]=function(_0x2c2ef7){const _0x452e66=_0x3a3887,_0x46e050=this[_0x452e66(0x155)]();VisuMZ['Bestiary'][_0x452e66(0x22c)]['call'](this,_0x2c2ef7),this[_0x452e66(0x296)]()&&_0x46e050&&this[_0x452e66(0x1b8)]()&&$gameSystem[_0x452e66(0x1d4)](this['enemyId'](),0x1);},Game_System[_0x3a3887(0x3f8)]['timesEnemySeen']=function(_0x46a227){const _0x2e0a5c=_0x3a3887;if(this[_0x2e0a5c(0x2de)]===undefined)this[_0x2e0a5c(0x292)]();return this[_0x2e0a5c(0x2de)][_0x46a227]=this[_0x2e0a5c(0x2de)][_0x46a227]||0x0,this['_timesEnemyDefeated'][_0x46a227];},Game_System['prototype'][_0x3a3887(0x228)]=function(_0x5c3b54,_0x2ca18a){const _0x40166b=_0x3a3887;if(this[_0x40166b(0x1ef)]===undefined)this['initBestiarySettings']();this[_0x40166b(0x1ef)][_0x5c3b54]=this[_0x40166b(0x1ef)][_0x5c3b54]||0x0,this[_0x40166b(0x1ef)][_0x5c3b54]+=_0x2ca18a||0x1;},VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x2a8)]=BattleManager[_0x3a3887(0x1e5)],BattleManager[_0x3a3887(0x1e5)]=function(_0x7273b7,_0x28eb68,_0x2f28d6){const _0x400493=_0x3a3887;VisuMZ[_0x400493(0x2c6)][_0x400493(0x2a8)]['call'](this,_0x7273b7,_0x28eb68,_0x2f28d6);for(const _0x255098 of $gameTroop[_0x400493(0x136)]()){$gameSystem['addTimesEnemySeen'](_0x255098[_0x400493(0x1a6)](),0x1);}},Game_System[_0x3a3887(0x3f8)]['initBestiaryReveals']=function(){const _0x74cada=_0x3a3887;this['_bestiaryReveal']=this[_0x74cada(0x1d2)]||{};},Game_System[_0x3a3887(0x3f8)][_0x3a3887(0x156)]=function(_0x1ef7db){const _0x45d988=_0x3a3887;if(this[_0x45d988(0x1d2)]===undefined)this[_0x45d988(0x337)]();this[_0x45d988(0x1d2)][_0x1ef7db]=!![];},Game_System[_0x3a3887(0x3f8)][_0x3a3887(0x3ac)]=function(_0x1bacd6){const _0x19fa00=_0x3a3887;if(this[_0x19fa00(0x1d2)]===undefined)this[_0x19fa00(0x337)]();return this[_0x19fa00(0x1d2)][_0x1bacd6];},VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x30a)]=Game_BattlerBase[_0x3a3887(0x3f8)][_0x3a3887(0x392)],Game_BattlerBase['prototype']['refresh']=function(){const _0x44b5fb=_0x3a3887;this['_cache']={},this[_0x44b5fb(0x20a)]=this[_0x44b5fb(0x20a)][_0x44b5fb(0x38d)](0x0,this['maxTp']()),VisuMZ[_0x44b5fb(0x2c6)][_0x44b5fb(0x30a)][_0x44b5fb(0x363)](this);},Game_Enemy[_0x3a3887(0x271)]={'defaultCategory':VisuMZ[_0x3a3887(0x2c6)]['Settings'][_0x3a3887(0x23f)]??_0x3a3887(0x3ad)},Game_Enemy[_0x3a3887(0x3f8)][_0x3a3887(0x209)]=function(){const _0x4d82e9=_0x3a3887,_0x110fed=[];for(const _0x21e192 of this[_0x4d82e9(0x241)]()['actions']){const _0x580282=$dataSkills[_0x21e192[_0x4d82e9(0x3da)]];if(_0x580282&&!_0x110fed[_0x4d82e9(0x1f8)](_0x580282))_0x110fed['push'](_0x580282);}return _0x110fed;},VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x30b)]=function(_0xd2b0c5,_0xe3bb68){const _0x494832=_0x3a3887;let _0x2f4e5c=[];const _0x2c7856=_0xe3bb68[_0x494832(0x241)]()[_0x494832(0x256)]||'';this[_0x494832(0x2d1)](_0x2f4e5c,_0xd2b0c5,_0x2c7856),this[_0x494832(0x1d0)](_0x2f4e5c,_0xd2b0c5,_0x2c7856),this[_0x494832(0x3ce)](_0x2f4e5c,_0xd2b0c5,_0x2c7856);if(_0x2f4e5c[_0x494832(0x33e)]<=0x0){const _0x4d6807=DataManager[_0x494832(0x3f9)](_0xd2b0c5);if(_0x4d6807['RandomizeEnemy']){_0x4d6807[_0x494832(0x26a)][_0x494832(0x294)]&&_0x2f4e5c[_0x494832(0x39d)](_0x4d6807[_0x494832(0x26a)][_0x494832(0x34e)]);for(const _0x1c0a5e in _0x4d6807[_0x494832(0x1f7)]){_0x2f4e5c[_0x494832(0x39d)](_0x4d6807[_0x494832(0x1f7)][_0x1c0a5e][_0x494832(0x34e)]);}return _0x2f4e5c[_0x494832(0x13f)](_0x5875af=>String(_0x5875af)[_0x494832(0x37e)]()['trim']());}}return _0x2f4e5c[_0x494832(0x13f)](_0x21a230=>String(_0x21a230)[_0x494832(0x37e)]()[_0x494832(0x167)]());},VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x2d1)]=function(_0x410f3f,_0x933b77,_0x4f6bcf){const _0xe3901a=_0x3a3887,_0x5b87d3={'ELEMENT':_0xe3901a(0x3b3),'SUBELEMENT':_0xe3901a(0x1c2),'GENDER':_0xe3901a(0x3a5),'RACE':_0xe3901a(0x2d5),'NATURE':_0xe3901a(0x31c),'ALIGNMENT':'Alignment','BLESSING':_0xe3901a(0x18e),'CURSE':_0xe3901a(0x339),'ZODIAC':_0xe3901a(0x217),'VARIANT':_0xe3901a(0x3e6)};if(_0x4f6bcf[_0xe3901a(0x303)](/<TRAIT SETS>\s*([\s\S]*)\s*<\/TRAIT SETS>/i)){const _0x433297=String(RegExp['$1'])[_0xe3901a(0x350)](/[\r\n]+/);for(const _0x368760 of _0x433297){if(_0x368760[_0xe3901a(0x303)](/(.*):[ ](.*)/i)){const _0x7359d4=String(RegExp['$1'])[_0xe3901a(0x37e)]()[_0xe3901a(0x167)](),_0x5662cb=String(RegExp['$2'])[_0xe3901a(0x350)](','),_0x33d83f=_0x5b87d3[_0x7359d4];_0x33d83f&&_0x33d83f===_0x933b77&&(_0x410f3f=_0x410f3f[_0xe3901a(0x185)](_0x5662cb));}}}},VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x1d0)]=function(_0x44b5fa,_0x19513d,_0x2f3514){const _0x1f8796=_0x3a3887,_0x2159ad={'Element':/<ELEMENT:[ ](.*)>/i,'SubElement':/<SUBELEMENT:[ ](.*)>/i,'Gender':/<GENDER:[ ](.*)>/i,'Race':/<RACE:[ ](.*)>/i,'Nature':/<NATURE:[ ](.*)>/i,'Alignment':/<ALIGNMENT:[ ](.*)>/i,'Blessing':/<BLESSING:[ ](.*)>/i,'Curse':/<CURSE:[ ](.*)>/i,'Zodiac':/<ZODIAC:[ ](.*)>/i,'Variant':/<VARIANT:[ ](.*)>/i},_0x40f21a=_0x2159ad[_0x19513d];if(!_0x40f21a)return;if(_0x2f3514[_0x1f8796(0x303)](/<ELEMENT:[ ](.*)\/(.*)>/i)){if(_0x19513d===_0x1f8796(0x3b3))_0x44b5fa[_0x1f8796(0x39d)](String(RegExp['$1'])[_0x1f8796(0x167)]());if(_0x19513d==='SubElement')_0x44b5fa[_0x1f8796(0x39d)](String(RegExp['$2'])['trim']());}else{if(_0x2f3514[_0x1f8796(0x303)](_0x40f21a)){const _0x4ec269=String(RegExp['$2'])[_0x1f8796(0x350)](',');_0x44b5fa=_0x44b5fa[_0x1f8796(0x185)](_0x4ec269);}}},VisuMZ[_0x3a3887(0x2c6)]['PossibleRandomSingularTraitsFromNotetags']=function(_0x385ff7,_0x17b8c8,_0x19e3b3){const _0x3e6fdc=_0x3a3887,_0x227fca={'Element':/<RANDOM ELEMENT>\s*([\s\S]*)\s*<\/RANDOM ELEMENT>/i,'SubElement':/<RANDOM SUBELEMENT>\s*([\s\S]*)\s*<\/RANDOM SUBELEMENT>/i,'Gender':/<RANDOM GENDER>\s*([\s\S]*)\s*<\/RANDOM GENDER>/i,'Race':/<RANDOM RACE>\s*([\s\S]*)\s*<\/RANDOM RACE>/i,'Nature':/<RANDOM NATURE>\s*([\s\S]*)\s*<\/RANDOM NATURE>/i,'Alignment':/<RANDOM ALIGNMENT>\s*([\s\S]*)\s*<\/RANDOM ALIGNMENT>/i,'Blessing':/<RANDOM BLESSING>\s*([\s\S]*)\s*<\/RANDOM BLESSING>/i,'Curse':/<RANDOM CURSE>\s*([\s\S]*)\s*<\/RANDOM CURSE>/i,'Zodiac':/<RANDOM ZODIAC>\s*([\s\S]*)\s*<\/RANDOM ZODIAC>/i,'Variant':/<RANDOM VARIANT>\s*([\s\S]*)\s*<\/RANDOM VARIANT>/i},_0x4d56ca=_0x227fca[_0x17b8c8];if(!_0x4d56ca)return;if(_0x19e3b3['match'](_0x4d56ca)){const _0x44941c=String(RegExp['$1'])[_0x3e6fdc(0x350)](/[\r\n]+/)[_0x3e6fdc(0x341)]('');for(const _0x26919b of _0x44941c){_0x26919b[_0x3e6fdc(0x303)](/(.*):[ ](.*)/i)&&_0x385ff7['push'](RegExp['$1'][_0x3e6fdc(0x167)]());}}},VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x17a)]=Scene_Menu[_0x3a3887(0x3f8)][_0x3a3887(0x298)],Scene_Menu[_0x3a3887(0x3f8)][_0x3a3887(0x298)]=function(){const _0x3ecbc4=_0x3a3887;VisuMZ[_0x3ecbc4(0x2c6)][_0x3ecbc4(0x17a)][_0x3ecbc4(0x363)](this);const _0xc93ad4=this['_commandWindow'];_0xc93ad4[_0x3ecbc4(0x282)](_0x3ecbc4(0x21e),this[_0x3ecbc4(0x33c)][_0x3ecbc4(0x1a3)](this));},Scene_Menu[_0x3a3887(0x3f8)][_0x3a3887(0x33c)]=function(){const _0x5aa593=_0x3a3887;SceneManager[_0x5aa593(0x39d)](Scene_Bestiary);};function Scene_Bestiary(){const _0x5dd002=_0x3a3887;this[_0x5dd002(0x3b6)](...arguments);}Scene_Bestiary['prototype']=Object[_0x3a3887(0x25f)](Scene_MenuBase['prototype']),Scene_Bestiary['prototype'][_0x3a3887(0x345)]=Scene_Bestiary,Scene_Bestiary['SETTINGS']={'helpWindow_BgType':VisuMZ[_0x3a3887(0x2c6)]['Settings'][_0x3a3887(0x1dd)][_0x3a3887(0x257)]??0x0,'scaleHelpWindow':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Window'][_0x3a3887(0x3cd)]??!![]},Scene_Bestiary[_0x3a3887(0x3f8)]['initialize']=function(){const _0x22bed0=_0x3a3887;Scene_MenuBase['prototype'][_0x22bed0(0x3b6)][_0x22bed0(0x363)](this);},Scene_Bestiary['prototype'][_0x3a3887(0x3c4)]=function(){return 0x0;},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x21d)]=function(){return!![];},Scene_Bestiary['prototype'][_0x3a3887(0x1ec)]=function(){const _0x358a12=_0x3a3887;Scene_MenuBase[_0x358a12(0x3f8)][_0x358a12(0x1ec)][_0x358a12(0x363)](this),this[_0x358a12(0x15c)][_0x358a12(0x39f)](this[_0x358a12(0x133)][_0x358a12(0x1a3)](this)),this['_pagedownButton'][_0x358a12(0x39f)](this['nextEnemy']['bind'](this));},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x28d)]=function(){const _0x27e57f=_0x3a3887;return this[_0x27e57f(0x13b)]&&this[_0x27e57f(0x13b)][_0x27e57f(0x19f)];},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x25f)]=function(){const _0x4c1cf2=_0x3a3887;Scene_MenuBase[_0x4c1cf2(0x3f8)]['create']['call'](this),this[_0x4c1cf2(0x173)](),this[_0x4c1cf2(0x3e1)](),this[_0x4c1cf2(0x193)]();},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x287)]=function(){const _0x2e4ebd=_0x3a3887;if(ConfigManager[_0x2e4ebd(0x150)]!==undefined){if(ConfigManager[_0x2e4ebd(0x150)])return ConfigManager[_0x2e4ebd(0x1ab)];}return Scene_MenuBase[_0x2e4ebd(0x3f8)][_0x2e4ebd(0x287)][_0x2e4ebd(0x363)](this);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x139)]=function(){const _0x139d83=_0x3a3887;if(ConfigManager[_0x139d83(0x150)]!==undefined){if(ConfigManager[_0x139d83(0x150)])return ConfigManager[_0x139d83(0x348)];}return Scene_MenuBase[_0x139d83(0x3f8)][_0x139d83(0x139)]['call'](this);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x173)]=function(){const _0x6fdc6=_0x3a3887;this[_0x6fdc6(0x1ea)]=new Game_Enemy(0x1,0x0,0x0);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x241)]=function(){const _0x35da6a=_0x3a3887;return this[_0x35da6a(0x1ea)];},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x27c)]=function(_0x3777ea){const _0x3b1b13=_0x3a3887;Math[_0x3b1b13(0x38e)]=!![],this[_0x3b1b13(0x241)]()[_0x3b1b13(0x1e5)](_0x3777ea,0x0,0x0),Math[_0x3b1b13(0x38e)]=![];},Scene_Bestiary['prototype']['createAllWindows']=function(){const _0x5b3aff=_0x3a3887;this['createNameWindow'](),this[_0x5b3aff(0x168)](),this[_0x5b3aff(0x174)](),this['createImageWindow'](),this[_0x5b3aff(0x349)](),this[_0x5b3aff(0x35c)](),this[_0x5b3aff(0x1b4)](),this[_0x5b3aff(0x26e)](),this['createSkillsDataWindow'](),this[_0x5b3aff(0x19e)](),this[_0x5b3aff(0x233)](),this['createLoreDataWindow']();},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x35c)]=function(){const _0x4f2b66=_0x3a3887;Scene_MenuBase[_0x4f2b66(0x3f8)][_0x4f2b66(0x35c)]['call'](this);if(Scene_Bestiary['SETTINGS'][_0x4f2b66(0x12e)]){const _0x30722c=this['helpWindowRatio']();this['_helpWindow'][_0x4f2b66(0x19d)]['x']=this[_0x4f2b66(0x272)][_0x4f2b66(0x19d)]['y']=_0x30722c;}this[_0x4f2b66(0x272)][_0x4f2b66(0x2f7)](Scene_Bestiary[_0x4f2b66(0x18d)][_0x4f2b66(0x3f1)]),this[_0x4f2b66(0x272)]['hide']();},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x2bf)]=function(){const _0x37bc27=_0x3a3887;if(!Scene_Bestiary['SETTINGS'][_0x37bc27(0x12e)])return 0x1;return this[_0x37bc27(0x1c3)]()['width']/Graphics[_0x37bc27(0x375)];},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x2a2)]=function(){const _0x199337=_0x3a3887;if(VisuMZ[_0x199337(0x2c6)][_0x199337(0x3d6)][_0x199337(0x1dd)][_0x199337(0x2b6)])return VisuMZ[_0x199337(0x2c6)][_0x199337(0x3d6)][_0x199337(0x1dd)][_0x199337(0x2b6)][_0x199337(0x363)](this);const _0x2fee6e=this[_0x199337(0x1c3)](),_0x478083=this[_0x199337(0x2bf)](),_0x388d2f=Graphics[_0x199337(0x375)],_0x1a3c8a=this[_0x199337(0x16d)](0x2,![]),_0x1f48f2=_0x2fee6e['x'],_0x3ed92e=_0x2fee6e['y']+(this[_0x199337(0x287)]()?_0x2fee6e['height']-_0x1a3c8a*_0x478083:0x0);return new Rectangle(_0x1f48f2,_0x3ed92e,_0x388d2f,_0x1a3c8a);},Scene_Bestiary[_0x3a3887(0x3f8)]['createNameWindow']=function(){const _0x5ee306=_0x3a3887,_0x47c26b=this[_0x5ee306(0x3c6)](),_0x158dad=new Window_BestiaryName(_0x47c26b);_0x158dad[_0x5ee306(0x317)](),this[_0x5ee306(0x1d7)](_0x158dad),this[_0x5ee306(0x146)]=_0x158dad,_0x158dad[_0x5ee306(0x2f7)](Window_BestiaryName['SETTINGS'][_0x5ee306(0x154)]);},Scene_Bestiary[_0x3a3887(0x3f8)]['nameWindowRect']=function(){const _0x29c68d=_0x3a3887;if(VisuMZ[_0x29c68d(0x2c6)]['Settings'][_0x29c68d(0x1dd)][_0x29c68d(0x3d3)])return VisuMZ[_0x29c68d(0x2c6)][_0x29c68d(0x3d6)][_0x29c68d(0x1dd)][_0x29c68d(0x3d3)][_0x29c68d(0x363)](this);const _0x4bf91d=Graphics[_0x29c68d(0x375)],_0x1ce669=this[_0x29c68d(0x16d)](0x1,![]),_0x4de4f6=0x0,_0x3f6a34=this[_0x29c68d(0x24d)]();return new Rectangle(_0x4de4f6,_0x3f6a34,_0x4bf91d,_0x1ce669);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x168)]=function(){const _0x57554a=_0x3a3887,_0x57f142=this[_0x57554a(0x144)](),_0x4250e0=new Window_BestiarySub(_0x57f142);this[_0x57554a(0x1d7)](_0x4250e0),this['_subWindow']=_0x4250e0,_0x4250e0[_0x57554a(0x2f7)](Window_BestiarySub[_0x57554a(0x18d)]['bgType']);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x144)]=function(){const _0x41f874=_0x3a3887;if(VisuMZ[_0x41f874(0x2c6)]['Settings'][_0x41f874(0x1dd)][_0x41f874(0x389)])return VisuMZ['Bestiary']['Settings'][_0x41f874(0x1dd)][_0x41f874(0x389)][_0x41f874(0x363)](this);const _0x2e9a49=Graphics[_0x41f874(0x375)],_0x1a86a9=this[_0x41f874(0x16d)](0x1,![]),_0x42e886=0x0,_0x5a3281=this[_0x41f874(0x373)]()-_0x1a86a9;return new Rectangle(_0x42e886,_0x5a3281,_0x2e9a49,_0x1a86a9);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x174)]=function(){const _0x5a1d92=_0x3a3887,_0x381df1=this[_0x5a1d92(0x2cb)](),_0x3dcc0d=new Window_BestiaryEnemyList(_0x381df1);_0x3dcc0d[_0x5a1d92(0x23a)](this[_0x5a1d92(0x29d)]),_0x3dcc0d[_0x5a1d92(0x282)](_0x5a1d92(0x3a6),this[_0x5a1d92(0x290)]['bind'](this)),_0x3dcc0d[_0x5a1d92(0x282)]('enemy',this['viewEnemy'][_0x5a1d92(0x1a3)](this)),_0x3dcc0d[_0x5a1d92(0x282)](_0x5a1d92(0x15a),this[_0x5a1d92(0x344)][_0x5a1d92(0x1a3)](this)),this[_0x5a1d92(0x1d7)](_0x3dcc0d),this[_0x5a1d92(0x33d)]=_0x3dcc0d,_0x3dcc0d[_0x5a1d92(0x2f7)](Window_BestiaryEnemyList[_0x5a1d92(0x18d)][_0x5a1d92(0x154)]);},Scene_Bestiary[_0x3a3887(0x3f8)]['listWindowRect']=function(){const _0x8f438a=_0x3a3887;if(VisuMZ['Bestiary'][_0x8f438a(0x3d6)]['Window'][_0x8f438a(0x170)])return VisuMZ[_0x8f438a(0x2c6)][_0x8f438a(0x3d6)]['Window']['ListWindow_RectJS'][_0x8f438a(0x363)](this);const _0xbdb5bb=Math['ceil'](Graphics[_0x8f438a(0x375)]*0x4/0xa),_0x4f2521=this['mainAreaHeight']()-this[_0x8f438a(0x16d)](0x1,![])*0x2,_0x1481c3=this[_0x8f438a(0x139)]()?Graphics['boxWidth']-_0xbdb5bb:0x0,_0xdfb4c2=this[_0x8f438a(0x24d)]()+this[_0x8f438a(0x16d)](0x1,![]);return new Rectangle(_0x1481c3,_0xdfb4c2,_0xbdb5bb,_0x4f2521);},Scene_Bestiary['prototype'][_0x3a3887(0x2af)]=function(){const _0x5cd09f=_0x3a3887,_0x19cedb=this[_0x5cd09f(0x1c3)](),_0x286659=new Window_BestiaryEnemyImage(_0x19cedb);this[_0x5cd09f(0x33d)]['setImageWindow'](_0x286659),this[_0x5cd09f(0x1d7)](_0x286659),this['_imageWindow']=_0x286659,_0x286659['setBackgroundType'](Window_BestiaryEnemyImage['SETTINGS']['bgType']);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x1c3)]=function(){const _0xb92956=_0x3a3887;if(VisuMZ['Bestiary'][_0xb92956(0x3d6)][_0xb92956(0x1dd)][_0xb92956(0x2be)])return VisuMZ[_0xb92956(0x2c6)][_0xb92956(0x3d6)][_0xb92956(0x1dd)][_0xb92956(0x2be)][_0xb92956(0x363)](this);const _0x454649=Graphics['boxWidth']-Math[_0xb92956(0x32e)](Graphics['boxWidth']*0x4/0xa),_0x44b171=this[_0xb92956(0x3dc)]()-this[_0xb92956(0x16d)](0x1,![])*0x2,_0x58203d=this['isRightInputMode']()?0x0:Graphics['boxWidth']-_0x454649,_0x478046=this[_0xb92956(0x24d)]()+this['calcWindowHeight'](0x1,![]);return new Rectangle(_0x58203d,_0x478046,_0x454649,_0x44b171);},Scene_Bestiary['prototype'][_0x3a3887(0x349)]=function(){const _0x2c0a23=_0x3a3887,_0xfbfe85=this['dataCategoriesWindowRect'](),_0x159a30=new Window_BestiaryDataCategories(_0xfbfe85);_0x159a30[_0x2c0a23(0x282)]('basic',this[_0x2c0a23(0x2b8)][_0x2c0a23(0x1a3)](this)),_0x159a30['setHandler'](_0x2c0a23(0x35d),this[_0x2c0a23(0x2b8)][_0x2c0a23(0x1a3)](this)),_0x159a30[_0x2c0a23(0x282)](_0x2c0a23(0x209),this[_0x2c0a23(0x2b8)][_0x2c0a23(0x1a3)](this)),_0x159a30[_0x2c0a23(0x282)](_0x2c0a23(0x1b3),this[_0x2c0a23(0x2b8)]['bind'](this)),_0x159a30[_0x2c0a23(0x282)](_0x2c0a23(0x390),this[_0x2c0a23(0x2b8)]['bind'](this)),_0x159a30['setHandler'](_0x2c0a23(0x3f2),this[_0x2c0a23(0x2b8)][_0x2c0a23(0x1a3)](this)),_0x159a30['setHandler']('pageup',this[_0x2c0a23(0x133)][_0x2c0a23(0x1a3)](this)),_0x159a30[_0x2c0a23(0x282)]('pagedown',this[_0x2c0a23(0x16a)][_0x2c0a23(0x1a3)](this)),_0x159a30[_0x2c0a23(0x282)](_0x2c0a23(0x15a),this['onDataCategoriesCancel'][_0x2c0a23(0x1a3)](this)),this[_0x2c0a23(0x1d7)](_0x159a30),this[_0x2c0a23(0x13b)]=_0x159a30,_0x159a30[_0x2c0a23(0x2f7)](Window_BestiaryDataCategories[_0x2c0a23(0x18d)][_0x2c0a23(0x154)]);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x16f)]=function(){const _0x312d62=_0x3a3887;if(VisuMZ[_0x312d62(0x2c6)][_0x312d62(0x3d6)][_0x312d62(0x1dd)][_0x312d62(0x304)])return VisuMZ[_0x312d62(0x2c6)][_0x312d62(0x3d6)][_0x312d62(0x1dd)][_0x312d62(0x304)][_0x312d62(0x363)](this);const _0x4ddbb7=this[_0x312d62(0x2cb)]()[_0x312d62(0x28f)],_0x1d265c=this[_0x312d62(0x16d)](0x1,!![]),_0x4f4949=this[_0x312d62(0x2cb)]()['x'],_0x3bf921=this['mainAreaTop']()+this[_0x312d62(0x16d)](0x1,![]);return new Rectangle(_0x4f4949,_0x3bf921,_0x4ddbb7,_0x1d265c);},Scene_Bestiary[_0x3a3887(0x3f8)]['dataWindowRect']=function(){const _0x1fcdc3=_0x3a3887;if(VisuMZ[_0x1fcdc3(0x2c6)][_0x1fcdc3(0x3d6)][_0x1fcdc3(0x1dd)][_0x1fcdc3(0x21c)])return VisuMZ[_0x1fcdc3(0x2c6)][_0x1fcdc3(0x3d6)][_0x1fcdc3(0x1dd)][_0x1fcdc3(0x21c)]['call'](this);const _0x15d3e8=this['listWindowRect']()['width'],_0x32f755=this[_0x1fcdc3(0x3dc)]()-this[_0x1fcdc3(0x16d)](0x1,!![])-this[_0x1fcdc3(0x16d)](0x1,![])*0x2,_0x3ac534=this[_0x1fcdc3(0x2cb)]()['x'],_0x296df1=this[_0x1fcdc3(0x24d)]()+this[_0x1fcdc3(0x16d)](0x1,![])+this[_0x1fcdc3(0x16d)](0x1,!![]);return new Rectangle(_0x3ac534,_0x296df1,_0x15d3e8,_0x32f755);},Scene_Bestiary['prototype'][_0x3a3887(0x1b4)]=function(){const _0x30a374=_0x3a3887,_0x4d64b2=this[_0x30a374(0x32c)](),_0x543aed=new Window_BestiaryBasic(_0x4d64b2);this[_0x30a374(0x13b)][_0x30a374(0x1fb)](_0x543aed,'basic'),_0x543aed['setHandler'](_0x30a374(0x1b6),this[_0x30a374(0x12a)][_0x30a374(0x1a3)](this,'max')),_0x543aed[_0x30a374(0x282)](_0x30a374(0x166),this[_0x30a374(0x12a)]['bind'](this,'up')),_0x543aed['setHandler'](_0x30a374(0x1bc),this[_0x30a374(0x12a)][_0x30a374(0x1a3)](this,_0x30a374(0x34a))),_0x543aed[_0x30a374(0x282)](_0x30a374(0x23b),this[_0x30a374(0x12a)][_0x30a374(0x1a3)](this,_0x30a374(0x316))),_0x543aed[_0x30a374(0x282)](_0x30a374(0x15a),this[_0x30a374(0x141)][_0x30a374(0x1a3)](this)),this['addWindow'](_0x543aed),this[_0x30a374(0x1d6)]=_0x543aed,_0x543aed[_0x30a374(0x2f7)](Window_BestiaryBasic[_0x30a374(0x18d)]['bgType']);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x26e)]=function(){const _0x2d1e81=_0x3a3887,_0x9af1c3=this[_0x2d1e81(0x32c)](),_0xef6aab=new Window_BestiaryElements(_0x9af1c3);this[_0x2d1e81(0x13b)]['setSymbolWindow'](_0xef6aab,_0x2d1e81(0x35d)),_0xef6aab[_0x2d1e81(0x282)]('cancel',this[_0x2d1e81(0x141)][_0x2d1e81(0x1a3)](this)),this[_0x2d1e81(0x1d7)](_0xef6aab),this['_elementsDataWindow']=_0xef6aab,_0xef6aab[_0x2d1e81(0x2f7)](Window_BestiaryElements[_0x2d1e81(0x18d)][_0x2d1e81(0x154)]);},Scene_Bestiary[_0x3a3887(0x3f8)]['createSkillsDataWindow']=function(){const _0x35c172=_0x3a3887,_0x1fe6b9=this[_0x35c172(0x32c)](),_0x5e341b=new Window_BestiarySkills(_0x1fe6b9);_0x5e341b[_0x35c172(0x3e2)](this[_0x35c172(0x272)]),this[_0x35c172(0x13b)]['setSymbolWindow'](_0x5e341b,_0x35c172(0x209)),_0x5e341b['setHandler']('cancel',this[_0x35c172(0x141)][_0x35c172(0x1a3)](this)),this[_0x35c172(0x1d7)](_0x5e341b),this[_0x35c172(0x2ef)]=_0x5e341b,_0x5e341b[_0x35c172(0x2f7)](Window_BestiarySkills['SETTINGS']['bgType']);},Scene_Bestiary['prototype'][_0x3a3887(0x19e)]=function(){const _0xa83a1=_0x3a3887,_0x2e5ce3=this[_0xa83a1(0x32c)](),_0x3b1c95=new Window_BestiaryRewards(_0x2e5ce3);this[_0xa83a1(0x13b)][_0xa83a1(0x1fb)](_0x3b1c95,_0xa83a1(0x1b3)),_0x3b1c95[_0xa83a1(0x282)](_0xa83a1(0x15a),this[_0xa83a1(0x141)][_0xa83a1(0x1a3)](this)),this[_0xa83a1(0x1d7)](_0x3b1c95),this['_rewardsDataWindow']=_0x3b1c95,_0x3b1c95[_0xa83a1(0x2f7)](Window_BestiaryRewards[_0xa83a1(0x18d)]['bgType']);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x233)]=function(){const _0xdf1baa=_0x3a3887;if(!Imported[_0xdf1baa(0x3c3)])return;const _0x3fc9eb=this[_0xdf1baa(0x32c)](),_0x307e2c=new Window_BestiaryTraits(_0x3fc9eb);_0x307e2c[_0xdf1baa(0x3e2)](this[_0xdf1baa(0x272)]),this[_0xdf1baa(0x13b)][_0xdf1baa(0x1fb)](_0x307e2c,_0xdf1baa(0x390)),_0x307e2c['setHandler'](_0xdf1baa(0x3a6),this[_0xdf1baa(0x1f3)]['bind'](this)),_0x307e2c['setHandler'](_0xdf1baa(0x3fc),this[_0xdf1baa(0x29b)][_0xdf1baa(0x1a3)](this)),_0x307e2c[_0xdf1baa(0x282)]('cancel',this[_0xdf1baa(0x141)][_0xdf1baa(0x1a3)](this)),this[_0xdf1baa(0x1d7)](_0x307e2c),this[_0xdf1baa(0x16c)]=_0x307e2c,_0x307e2c[_0xdf1baa(0x2f7)](Window_BestiaryTraits['SETTINGS'][_0xdf1baa(0x154)]);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x2ed)]=function(){const _0x13bf51=_0x3a3887,_0x35f6ad=this[_0x13bf51(0x32c)](),_0x340f28=new Window_BestiaryLore(_0x35f6ad);this['_dataCategoriesWindow'][_0x13bf51(0x1fb)](_0x340f28,_0x13bf51(0x3f2)),_0x340f28[_0x13bf51(0x282)](_0x13bf51(0x15a),this[_0x13bf51(0x141)][_0x13bf51(0x1a3)](this)),this[_0x13bf51(0x1d7)](_0x340f28),this[_0x13bf51(0x367)]=_0x340f28,_0x340f28['setBackgroundType'](Window_BestiaryLore[_0x13bf51(0x18d)][_0x13bf51(0x154)]);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x290)]=function(){const _0x36ddb1=_0x3a3887;this[_0x36ddb1(0x33d)][_0x36ddb1(0x1c4)](),this[_0x36ddb1(0x33d)][_0x36ddb1(0x2c4)]();},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x266)]=function(){const _0x157c87=_0x3a3887;this[_0x157c87(0x33d)]['callUpdateImage'](this[_0x157c87(0x33d)]['index']()),this['_listWindow'][_0x157c87(0x3db)](),this['_dataCategoriesWindow'][_0x157c87(0x394)](),this['_dataCategoriesWindow'][_0x157c87(0x2c4)]();const _0xe24870=this[_0x157c87(0x33d)][_0x157c87(0x16e)](),_0x4f2735=this['enemy']();this[_0x157c87(0x146)][_0x157c87(0x260)](_0x4f2735),this[_0x157c87(0x29d)][_0x157c87(0x3e7)](_0xe24870);},Scene_Bestiary['prototype'][_0x3a3887(0x2b8)]=function(){const _0x2abf82=_0x3a3887;this[_0x2abf82(0x13b)][_0x2abf82(0x357)]();},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x16a)]=function(){const _0x2bf944=_0x3a3887;let _0x3aa7f6=this[_0x2bf944(0x33d)][_0x2bf944(0x1f9)]();const _0x1cf909=this[_0x2bf944(0x33d)][_0x2bf944(0x16e)]();for(;;){_0x3aa7f6>=this['_listWindow'][_0x2bf944(0x307)]()-0x1?_0x3aa7f6=0x0:_0x3aa7f6+=0x1;if(this[_0x2bf944(0x33d)][_0x2bf944(0x2c7)](_0x3aa7f6)&&this['_listWindow']['commandSymbol'](_0x3aa7f6)==='enemy'){this[_0x2bf944(0x33d)][_0x2bf944(0x3a7)](_0x3aa7f6),this[_0x2bf944(0x27c)](this[_0x2bf944(0x33d)][_0x2bf944(0x16e)]()),this[_0x2bf944(0x33d)][_0x2bf944(0x32d)](this[_0x2bf944(0x33d)][_0x2bf944(0x1f9)]());break;}}SoundManager[_0x2bf944(0x391)]();if(_0x1cf909!==this[_0x2bf944(0x33d)][_0x2bf944(0x16e)]())this[_0x2bf944(0x163)]();this[_0x2bf944(0x13b)][_0x2bf944(0x2c4)]();},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x133)]=function(){const _0x36c9c8=_0x3a3887;let _0x3204a5=this['_listWindow'][_0x36c9c8(0x1f9)]();const _0x409993=this['_listWindow'][_0x36c9c8(0x16e)]();for(;;){_0x3204a5<=0x0?_0x3204a5=this['_listWindow'][_0x36c9c8(0x307)]()-0x1:_0x3204a5-=0x1;if(this[_0x36c9c8(0x33d)][_0x36c9c8(0x2c7)](_0x3204a5)&&this[_0x36c9c8(0x33d)][_0x36c9c8(0x2b9)](_0x3204a5)===_0x36c9c8(0x241)){this[_0x36c9c8(0x33d)][_0x36c9c8(0x3a7)](_0x3204a5),this[_0x36c9c8(0x27c)](this['_listWindow'][_0x36c9c8(0x16e)]()),this[_0x36c9c8(0x33d)]['callUpdateImage'](this[_0x36c9c8(0x33d)][_0x36c9c8(0x1f9)]());break;}}SoundManager[_0x36c9c8(0x391)]();if(_0x409993!==this[_0x36c9c8(0x33d)]['currentExt']())this[_0x36c9c8(0x163)]();this[_0x36c9c8(0x13b)][_0x36c9c8(0x2c4)]();},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x163)]=function(){const _0x5b93b1=_0x3a3887;this[_0x5b93b1(0x146)][_0x5b93b1(0x260)](this[_0x5b93b1(0x241)]()),this['_subWindow']['setEnemy'](this[_0x5b93b1(0x241)]());},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x39a)]=function(){const _0x5f514a=_0x3a3887;this[_0x5f514a(0x13b)][_0x5f514a(0x3db)](),this[_0x5f514a(0x33d)][_0x5f514a(0x394)](),this['_listWindow'][_0x5f514a(0x2c4)](),this[_0x5f514a(0x146)][_0x5f514a(0x317)](),this[_0x5f514a(0x29d)]['setEnemy'](0x0);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x141)]=function(){const _0x515eff=_0x3a3887;this[_0x515eff(0x13b)]['activate'](),this[_0x515eff(0x13b)][_0x515eff(0x3aa)](),this[_0x515eff(0x272)][_0x515eff(0x3db)]();},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x12a)]=function(_0x58fd11){const _0x38ae60=_0x3a3887;if(_0x58fd11==='max')this['enemy']()[_0x38ae60(0x2ff)](this[_0x38ae60(0x241)]()[_0x38ae60(0x3a9)]());else{if(_0x58fd11==='up')this[_0x38ae60(0x241)]()[_0x38ae60(0x372)](0x1);else{if(_0x58fd11===_0x38ae60(0x34a))this[_0x38ae60(0x241)]()[_0x38ae60(0x372)](-0x1);else _0x58fd11==='min'&&this[_0x38ae60(0x241)]()[_0x38ae60(0x2ff)](this['enemy']()[_0x38ae60(0x19a)]());}}this[_0x38ae60(0x146)][_0x38ae60(0x260)](this[_0x38ae60(0x241)]()),this[_0x38ae60(0x1d6)][_0x38ae60(0x392)](),this['_basicDataWindow'][_0x38ae60(0x2c4)]();},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x1f3)]=function(){const _0x4e0068=_0x3a3887;this[_0x4e0068(0x16c)][_0x4e0068(0x1c4)](),this['_traitsDataWindow']['activate']();},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x29b)]=function(){const _0x1fcdf1=_0x3a3887,_0x364243=this[_0x1fcdf1(0x16c)][_0x1fcdf1(0x16e)]();this['enemy']()['setTraitSet'](_0x364243[0x0],_0x364243[0x1]),this[_0x1fcdf1(0x163)](),this[_0x1fcdf1(0x241)]()[_0x1fcdf1(0x338)](),this['_imageWindow'][_0x1fcdf1(0x392)](),this[_0x1fcdf1(0x16c)]['refresh'](),this['_traitsDataWindow'][_0x1fcdf1(0x2c4)]();},Scene_Bestiary[_0x3a3887(0x3f8)]['buttonAssistKey1']=function(){const _0x19abed=_0x3a3887;return Scene_MenuBase[_0x19abed(0x3f8)][_0x19abed(0x3e4)]['call'](this);},Scene_Bestiary['prototype']['buttonAssistKey2']=function(){const _0x571e24=_0x3a3887;return Scene_MenuBase[_0x571e24(0x3f8)][_0x571e24(0x3eb)]['call'](this);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x35b)]=function(){const _0x48605a=_0x3a3887;if(this[_0x48605a(0x367)]&&this['_loreDataWindow'][_0x48605a(0x19f)])return TextManager['getInputMultiButtonStrings']('up','down');return Scene_MenuBase['prototype'][_0x48605a(0x35b)][_0x48605a(0x363)](this);},Scene_Bestiary['prototype'][_0x3a3887(0x153)]=function(){const _0x2d3b86=_0x3a3887;return Scene_MenuBase[_0x2d3b86(0x3f8)]['buttonAssistKey4'][_0x2d3b86(0x363)](this);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x2ca)]=function(){const _0x208154=_0x3a3887;return Scene_MenuBase['prototype'][_0x208154(0x2ca)][_0x208154(0x363)](this);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x129)]=function(){const _0xd4db20=_0x3a3887;if(this[_0xd4db20(0x15c)]&&this[_0xd4db20(0x15c)][_0xd4db20(0x336)]){if(this[_0xd4db20(0x13b)]&&this[_0xd4db20(0x13b)]['active'])return TextManager[_0xd4db20(0x2c6)]['buttonAssist'][_0xd4db20(0x25c)];}else{if(this[_0xd4db20(0x367)]&&this['_loreDataWindow'][_0xd4db20(0x19f)])return TextManager[_0xd4db20(0x2c6)][_0xd4db20(0x177)][_0xd4db20(0x2f6)];}return Scene_MenuBase['prototype'][_0xd4db20(0x129)][_0xd4db20(0x363)](this);},Scene_Bestiary['prototype'][_0x3a3887(0x1f1)]=function(){const _0x45edfc=_0x3a3887;return Scene_MenuBase[_0x45edfc(0x3f8)][_0x45edfc(0x1f1)][_0x45edfc(0x363)](this);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x3a3)]=function(){const _0x4e00f0=_0x3a3887;if(this[_0x4e00f0(0x367)]&&this[_0x4e00f0(0x367)][_0x4e00f0(0x19f)])return TextManager[_0x4e00f0(0x2c6)][_0x4e00f0(0x177)][_0x4e00f0(0x3fb)];return Scene_MenuBase[_0x4e00f0(0x3f8)][_0x4e00f0(0x3a3)]['call'](this);},Scene_Bestiary['prototype']['buttonAssistText4']=function(){const _0x2810c7=_0x3a3887;if(this['_listWindow']&&this['_listWindow']['active']){const _0x21c6ee=this['_listWindow']['currentSymbol']();if(_0x21c6ee===_0x2810c7(0x241))return TextManager[_0x2810c7(0x2c6)][_0x2810c7(0x177)]['view'];else{if(_0x21c6ee===_0x2810c7(0x3a6)){const _0x2dcc10=this[_0x2810c7(0x33d)][_0x2810c7(0x16e)]();return this[_0x2810c7(0x33d)][_0x2810c7(0x347)](_0x2dcc10)?TextManager[_0x2810c7(0x2c6)][_0x2810c7(0x177)][_0x2810c7(0x2a5)]:TextManager['Bestiary']['buttonAssist'][_0x2810c7(0x2da)];}}}else{if(this[_0x2810c7(0x1d6)]&&this[_0x2810c7(0x1d6)][_0x2810c7(0x19f)]){const _0x871f68=this['_basicDataWindow']['currentSymbol']();if(_0x871f68!=='param')return Scene_MenuBase['prototype'][_0x2810c7(0x229)][_0x2810c7(0x363)](this);}}return'';},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x2b0)]=function(){const _0x215e1b=_0x3a3887;return Scene_MenuBase[_0x215e1b(0x3f8)][_0x215e1b(0x2b0)][_0x215e1b(0x363)](this);},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x1eb)]=function(){const _0x4e7717=_0x3a3887;Scene_MenuBase[_0x4e7717(0x3f8)][_0x4e7717(0x1eb)][_0x4e7717(0x363)](this),this['setBackgroundOpacity'](this[_0x4e7717(0x2bb)]()),this[_0x4e7717(0x20c)]();},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x2bb)]=function(){const _0x5c5c52=_0x3a3887;return VisuMZ[_0x5c5c52(0x2c6)]['Settings']['BgSettings'][_0x5c5c52(0x20f)];},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x20c)]=function(){const _0xa7eff7=_0x3a3887,_0x266163=VisuMZ['Bestiary']['Settings'][_0xa7eff7(0x21a)];_0x266163&&(_0x266163[_0xa7eff7(0x1da)]!==''||_0x266163[_0xa7eff7(0x1b7)]!=='')&&(this[_0xa7eff7(0x1e6)]=new Sprite(ImageManager[_0xa7eff7(0x382)](_0x266163[_0xa7eff7(0x1da)])),this[_0xa7eff7(0x300)]=new Sprite(ImageManager[_0xa7eff7(0x1c9)](_0x266163[_0xa7eff7(0x1b7)])),this[_0xa7eff7(0x18c)](this[_0xa7eff7(0x1e6)]),this[_0xa7eff7(0x18c)](this[_0xa7eff7(0x300)]),this['_backSprite1'][_0xa7eff7(0x1fd)]['addLoadListener'](this['adjustSprite']['bind'](this,this[_0xa7eff7(0x1e6)])),this[_0xa7eff7(0x300)][_0xa7eff7(0x1fd)][_0xa7eff7(0x3dd)](this[_0xa7eff7(0x2a1)][_0xa7eff7(0x1a3)](this,this[_0xa7eff7(0x300)])));},Scene_Bestiary[_0x3a3887(0x3f8)][_0x3a3887(0x2a1)]=function(_0x403a9d){const _0x127c01=_0x3a3887;this[_0x127c01(0x2b1)](_0x403a9d),this['centerSprite'](_0x403a9d);},VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3b5)]=Window_MenuCommand['prototype'][_0x3a3887(0x2d4)],Window_MenuCommand[_0x3a3887(0x3f8)][_0x3a3887(0x2d4)]=function(){const _0x31207f=_0x3a3887;VisuMZ[_0x31207f(0x2c6)]['Window_MenuCommand_addOriginalCommands'][_0x31207f(0x363)](this),this[_0x31207f(0x393)]();},Window_MenuCommand[_0x3a3887(0x3f8)][_0x3a3887(0x393)]=function(){const _0x34dcb4=_0x3a3887;if(!this[_0x34dcb4(0x24b)]())return;if(!this['isBestiaryCommandVisible']())return;const _0xf57785=TextManager[_0x34dcb4(0x1aa)],_0x523e70=this['isBestiaryCommandEnabled']();this['addCommand'](_0xf57785,_0x34dcb4(0x21e),_0x523e70);},Window_MenuCommand[_0x3a3887(0x3f8)][_0x3a3887(0x24b)]=function(){const _0x2b2f41=_0x3a3887;return Imported[_0x2b2f41(0x3ab)]?![]:!![];},Window_MenuCommand[_0x3a3887(0x3f8)][_0x3a3887(0x22e)]=function(){const _0x1987c9=_0x3a3887;return $gameSystem[_0x1987c9(0x384)]();},Window_MenuCommand[_0x3a3887(0x3f8)][_0x3a3887(0x3ee)]=function(){const _0x3e55ed=_0x3a3887;return $gameSystem[_0x3e55ed(0x24c)]();};function Window_BestiaryName(){const _0x273be9=_0x3a3887;this[_0x273be9(0x3b6)](...arguments);}Window_BestiaryName['prototype']=Object[_0x3a3887(0x25f)](Window_Base[_0x3a3887(0x3f8)]),Window_BestiaryName[_0x3a3887(0x3f8)]['constructor']=Window_BestiaryName,Window_BestiaryName[_0x3a3887(0x18d)]={'bgType':VisuMZ['Bestiary'][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)][_0x3a3887(0x330)]??0x0},Window_BestiaryName['prototype'][_0x3a3887(0x3b6)]=function(_0xd546c9){const _0x10daf3=_0x3a3887;Window_Base[_0x10daf3(0x3f8)][_0x10daf3(0x3b6)][_0x10daf3(0x363)](this,_0xd546c9),this[_0x10daf3(0x28b)]='';},Window_BestiaryName[_0x3a3887(0x3f8)][_0x3a3887(0x36c)]=function(_0x3a9594){const _0x10fceb=_0x3a3887;this[_0x10fceb(0x28b)]!==_0x3a9594&&(this[_0x10fceb(0x28b)]=_0x3a9594,this[_0x10fceb(0x392)]());},Window_BestiaryName[_0x3a3887(0x3f8)][_0x3a3887(0x260)]=function(_0x213011){const _0x578be8=_0x3a3887;this[_0x578be8(0x36c)](_0x213011[_0x578be8(0x386)]());},Window_BestiaryName[_0x3a3887(0x3f8)][_0x3a3887(0x317)]=function(){const _0x4dfb63=_0x3a3887;this['setText'](TextManager['Bestiary'][_0x4dfb63(0x35a)][_0x4dfb63(0x3a6)]);},Window_BestiaryName[_0x3a3887(0x3f8)][_0x3a3887(0x343)]=function(){return![];},Window_BestiaryName[_0x3a3887(0x3f8)][_0x3a3887(0x392)]=function(){const _0x18e2e1=_0x3a3887;this[_0x18e2e1(0x399)][_0x18e2e1(0x355)]();if(this[_0x18e2e1(0x28b)]==='')return;const _0x216915=this[_0x18e2e1(0x313)](),_0x28142e=this[_0x18e2e1(0x26d)](this['_text'])['width'],_0x45b59c=_0x216915['x']+Math['floor']((_0x216915[_0x18e2e1(0x28f)]-_0x28142e)/0x2);this[_0x18e2e1(0x301)](this[_0x18e2e1(0x28b)],_0x45b59c,_0x216915['y'],_0x216915[_0x18e2e1(0x28f)]);};function Window_BestiarySub(){const _0x3415a6=_0x3a3887;this[_0x3415a6(0x3b6)](...arguments);}Window_BestiarySub['prototype']=Object[_0x3a3887(0x25f)](Window_Base[_0x3a3887(0x3f8)]),Window_BestiarySub['prototype']['constructor']=Window_BestiarySub,Window_BestiarySub[_0x3a3887(0x18d)]={'bgType':VisuMZ['Bestiary'][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)][_0x3a3887(0x267)]??0x0},Window_BestiarySub[_0x3a3887(0x3f8)][_0x3a3887(0x3b6)]=function(_0x5ea071){const _0x356d29=_0x3a3887;Window_Base['prototype'][_0x356d29(0x3b6)][_0x356d29(0x363)](this,_0x5ea071),this['_enemyID']=null,this['refresh']();},Window_BestiarySub[_0x3a3887(0x3f8)][_0x3a3887(0x3e7)]=function(_0xafa590){const _0x1da6a0=_0x3a3887;this[_0x1da6a0(0x1bb)]!==_0xafa590&&(this['_enemyID']=_0xafa590,this[_0x1da6a0(0x392)]());},Window_BestiarySub['prototype'][_0x3a3887(0x343)]=function(){return![];},Window_BestiarySub['prototype']['refresh']=function(){const _0x50e53b=_0x3a3887;this[_0x50e53b(0x399)][_0x50e53b(0x355)](),this[_0x50e53b(0x1bb)]?this[_0x50e53b(0x36d)]():this['drawBestiaryCompletionRate']();},Window_BestiarySub[_0x3a3887(0x3f8)][_0x3a3887(0x36d)]=function(){const _0x3b9386=_0x3a3887,_0x5e1936=TextManager[_0x3b9386(0x2c6)][_0x3b9386(0x380)],_0x1a274b=this['itemPadding']()*0x10,_0x485ba8=this['innerWidth']-_0x1a274b*0x2,_0x20f08c=_0x5e1936[_0x3b9386(0x291)],_0x9ad439=$gameSystem['timesEnemySeen'](this[_0x3b9386(0x1bb)]),_0x7fa40a=_0x20f08c['format'](_0x9ad439);this['drawText'](_0x7fa40a,_0x1a274b,0x0,_0x485ba8,_0x3b9386(0x1fe));const _0x514fb7=_0x5e1936[_0x3b9386(0x27a)],_0x43fcaa=$gameSystem['timesEnemyDefeated'](this[_0x3b9386(0x1bb)]),_0x4625e9=_0x514fb7[_0x3b9386(0x1f5)](_0x43fcaa);this[_0x3b9386(0x194)](_0x4625e9,_0x1a274b,0x0,_0x485ba8,_0x3b9386(0x180));},Window_BestiarySub['prototype'][_0x3a3887(0x262)]=function(){const _0x3a7cf2=_0x3a3887,_0xfa013=TextManager[_0x3a7cf2(0x2c6)][_0x3a7cf2(0x380)],_0x1f737a=this[_0x3a7cf2(0x15d)]()*0x10,_0x437f65=this[_0x3a7cf2(0x2f0)]-_0x1f737a*0x2,_0x17d83b=_0xfa013[_0x3a7cf2(0x23d)],_0x2618f5=DataManager['bestiaryTotalEnemies'](),_0x15af82=$gameSystem['totalDefeatedEnemies'](),_0x561868=(_0x15af82/_0x2618f5*0x64)[_0x3a7cf2(0x2ac)](_0xfa013['fixedPercentage']),_0x1e8514=_0x17d83b[_0x3a7cf2(0x1f5)](_0x561868,_0x15af82,_0x2618f5);this[_0x3a7cf2(0x194)](_0x1e8514,_0x1f737a,0x0,_0x437f65,_0x3a7cf2(0x365));};function Window_BestiaryEnemyList(){const _0x57e620=_0x3a3887;this[_0x57e620(0x3b6)](...arguments);}Window_BestiaryEnemyList[_0x3a3887(0x3f8)]=Object['create'](Window_Command['prototype']),Window_BestiaryEnemyList['prototype'][_0x3a3887(0x345)]=Window_BestiaryEnemyList,Window_BestiaryEnemyList[_0x3a3887(0x18d)]={'bgType':VisuMZ['Bestiary'][_0x3a3887(0x3d6)]['Window'][_0x3a3887(0x3bf)]??0x0,'delayMs':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)][_0x3a3887(0x178)]??0xf0,'maskUndefeatedEnemyNames':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Window'][_0x3a3887(0x3a0)]??!![],'showAllCategories':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x3bb)]??![]},Window_BestiaryEnemyList[_0x3a3887(0x3f8)][_0x3a3887(0x3b6)]=function(_0x525368){const _0x1b5f19=_0x3a3887;this['initCategoryStatus'](),Window_Command[_0x1b5f19(0x3f8)][_0x1b5f19(0x3b6)][_0x1b5f19(0x363)](this,_0x525368);},Window_BestiaryEnemyList[_0x3a3887(0x3f8)]['initCategoryStatus']=function(){const _0x9a8f01=_0x3a3887;this['_categoryStatus']={};const _0x3d59a4=VisuMZ[_0x9a8f01(0x2c6)][_0x9a8f01(0x33a)];for(const _0x54e82d of _0x3d59a4){if(!this['includeCategory'](_0x54e82d))continue;this[_0x9a8f01(0x366)][_0x54e82d['toLowerCase']()[_0x9a8f01(0x167)]()]=!![];}},Window_BestiaryEnemyList['prototype'][_0x3a3887(0x343)]=function(){return![];},Window_BestiaryEnemyList[_0x3a3887(0x3f8)][_0x3a3887(0x29f)]=function(){const _0x1bbf1c=_0x3a3887,_0x1a911d=VisuMZ[_0x1bbf1c(0x2c6)][_0x1bbf1c(0x33a)];for(const _0x5ed7d2 of _0x1a911d){if(!this[_0x1bbf1c(0x22a)](_0x5ed7d2))continue;this[_0x1bbf1c(0x162)](_0x5ed7d2);}},Window_BestiaryEnemyList[_0x3a3887(0x3f8)][_0x3a3887(0x22a)]=function(_0x4c9171){const _0x4099f3=_0x3a3887;if(Window_BestiaryEnemyList[_0x4099f3(0x18d)]['showAllCategories'])return!![];_0x4c9171=_0x4c9171['toLowerCase']()[_0x4099f3(0x167)]();const _0x1abc6e=DataManager[_0x4099f3(0x2f9)](_0x4c9171);if(_0x1abc6e['length']<=0x0)return![];if($gameTemp[_0x4099f3(0x3cf)]())return!![];if(Game_Enemy[_0x4099f3(0x271)]['defaultCategory'][_0x4099f3(0x1a7)]()===_0x4c9171)return!![];return _0x1abc6e[_0x4099f3(0x28e)](_0x59d657=>$gameSystem[_0x4099f3(0x32b)](_0x59d657['id']));},Game_System[_0x3a3887(0x3f8)][_0x3a3887(0x32b)]=function(_0x48d692){const _0x284088=_0x3a3887;if(this[_0x284088(0x1c1)](_0x48d692)>0x0)return!![];if(this[_0x284088(0x3ac)](_0x48d692))return!![];return![];},Window_BestiaryEnemyList['prototype'][_0x3a3887(0x347)]=function(_0x2e39b3){const _0x2cc0f2=_0x3a3887;return _0x2e39b3=_0x2e39b3[_0x2cc0f2(0x1a7)]()[_0x2cc0f2(0x167)](),this[_0x2cc0f2(0x366)][_0x2e39b3];},Window_BestiaryEnemyList[_0x3a3887(0x3f8)][_0x3a3887(0x162)]=function(_0x3d05e5){const _0x1a2222=_0x3a3887;_0x3d05e5=_0x3d05e5[_0x1a2222(0x1a7)]()[_0x1a2222(0x167)]();const _0x197f55=VisuMZ[_0x1a2222(0x2c6)][_0x1a2222(0x190)][_0x3d05e5];if(!_0x197f55)return;const _0x29f7fd=this[_0x1a2222(0x347)](_0x3d05e5)?TextManager[_0x1a2222(0x2c6)][_0x1a2222(0x17c)][_0x1a2222(0x1af)]:TextManager['Bestiary'][_0x1a2222(0x17c)]['closedCategoriesFmt'],_0x60f362=DataManager[_0x1a2222(0x2f9)](_0x3d05e5),_0x3f2434=_0x60f362[_0x1a2222(0x33e)],_0x170e49=_0x60f362[_0x1a2222(0x2b5)](_0x185c87=>$gameSystem['isEnemyDefeated'](_0x185c87['id']))['length'],_0x5713ca=(_0x170e49/_0x3f2434*0x64)['clamp'](0x0,0x64)['toFixed'](TextManager['Bestiary']['categoryWindow'][_0x1a2222(0x2d0)]),_0x53cd27=_0x29f7fd[_0x1a2222(0x1f5)](_0x197f55[_0x1a2222(0x27d)],_0x5713ca);this[_0x1a2222(0x35e)](_0x53cd27,_0x1a2222(0x3a6),!![],_0x3d05e5),this[_0x1a2222(0x164)](_0x3d05e5);},Window_BestiaryEnemyList[_0x3a3887(0x3f8)][_0x3a3887(0x1c4)]=function(){const _0x57351d=_0x3a3887,_0x53b30e=this[_0x57351d(0x3b9)]();this[_0x57351d(0x366)][_0x53b30e]=!this[_0x57351d(0x366)][_0x53b30e],this[_0x57351d(0x392)]();},Window_BestiaryEnemyList[_0x3a3887(0x3f8)][_0x3a3887(0x3b9)]=function(){const _0x57e343=_0x3a3887;return this[_0x57e343(0x3fd)]()===_0x57e343(0x3a6)?this[_0x57e343(0x16e)]():null;},Window_BestiaryEnemyList[_0x3a3887(0x3f8)]['makeEnemyList']=function(_0x43488b){const _0x582eeb=_0x3a3887;if(!this[_0x582eeb(0x347)](_0x43488b))return;const _0x1378f6=DataManager[_0x582eeb(0x2f9)](_0x43488b);for(const _0x208784 of _0x1378f6){if(!this['includeEnemy'](_0x208784))continue;this[_0x582eeb(0x15e)](_0x208784);}},Window_BestiaryEnemyList[_0x3a3887(0x3f8)]['includeEnemy']=function(_0xb14a47){const _0x3c0039=_0x3a3887;if(_0xb14a47){if($gameSystem[_0x3c0039(0x3ac)](_0xb14a47['id']))return!![];}return _0xb14a47&&DataManager[_0x3c0039(0x2d3)](_0xb14a47);},Window_BestiaryEnemyList[_0x3a3887(0x3f8)][_0x3a3887(0x1e9)]=function(_0x54b8e0){const _0xb2b2a4=_0x3a3887;if($gameTemp[_0xb2b2a4(0x3cf)]())return!![];if($gameSystem['isEnemyRevealedByBestiary'](_0x54b8e0['id']))return!![];return $gameSystem[_0xb2b2a4(0x2bd)](_0x54b8e0['id']);},Window_BestiaryEnemyList[_0x3a3887(0x3f8)][_0x3a3887(0x15e)]=function(_0x3999e1){const _0x8e220e=_0x3a3887;let _0x3e604d=_0x3999e1[_0x8e220e(0x386)];this[_0x8e220e(0x2ce)](_0x3999e1)&&(_0x3e604d=Array(_0x3999e1['name']['length']+0x1)['join'](TextManager[_0x8e220e(0x2c6)]['categoryWindow'][_0x8e220e(0x18b)])),this[_0x8e220e(0x35e)]('\x20\x20'+_0x3e604d,'enemy',this['isEnabledEnemy'](_0x3999e1),_0x3999e1['id']);},Window_BestiaryEnemyList[_0x3a3887(0x3f8)]['isEnemyNameMasked']=function(_0x19d99e){const _0x1f3ce3=_0x3a3887;if($gameTemp['canDebugViewBestiary']())return![];if($gameSystem[_0x1f3ce3(0x2bd)](_0x19d99e['id']))return![];if($gameSystem[_0x1f3ce3(0x1c1)](_0x19d99e['id'])>0x0)return![];if($gameSystem[_0x1f3ce3(0x3ac)](_0x19d99e['id']))return![];return Window_BestiaryEnemyList[_0x1f3ce3(0x18d)][_0x1f3ce3(0x342)];},Window_BestiaryEnemyList[_0x3a3887(0x3f8)]['itemTextAlign']=function(){const _0x49318f=_0x3a3887;return _0x49318f(0x1fe);},Window_BestiaryEnemyList['prototype']['drawItem']=function(_0x321f3e){const _0x5e7480=_0x3a3887,_0x5ad0e0=this[_0x5e7480(0x38b)](_0x321f3e),_0x2542c8=this['commandName'](_0x321f3e),_0x4965c3=this['textSizeEx'](_0x2542c8)[_0x5e7480(0x28f)];this[_0x5e7480(0x2cf)](this[_0x5e7480(0x2c7)](_0x321f3e));const _0x5e2264=this[_0x5e7480(0x319)]();if(_0x5e2264===_0x5e7480(0x180))this[_0x5e7480(0x301)](_0x2542c8,_0x5ad0e0['x']+_0x5ad0e0[_0x5e7480(0x28f)]-_0x4965c3,_0x5ad0e0['y'],_0x4965c3);else{if(_0x5e2264===_0x5e7480(0x365)){const _0x3398bd=_0x5ad0e0['x']+Math[_0x5e7480(0x3c8)]((_0x5ad0e0[_0x5e7480(0x28f)]-_0x4965c3)/0x2);this[_0x5e7480(0x301)](_0x2542c8,_0x3398bd,_0x5ad0e0['y'],_0x4965c3);}else this[_0x5e7480(0x301)](_0x2542c8,_0x5ad0e0['x'],_0x5ad0e0['y'],_0x4965c3);}},Window_BestiaryEnemyList[_0x3a3887(0x3f8)]['setImageWindow']=function(_0x1b3c44){const _0x250a3c=_0x3a3887;this[_0x250a3c(0x3c9)]=_0x1b3c44,this[_0x250a3c(0x259)]();},Window_BestiaryEnemyList[_0x3a3887(0x3f8)][_0x3a3887(0x23a)]=function(_0x5159b0){const _0x3bcaa8=_0x3a3887;this[_0x3bcaa8(0x29d)]=_0x5159b0,this[_0x3bcaa8(0x259)]();},Window_BestiaryEnemyList[_0x3a3887(0x3f8)][_0x3a3887(0x259)]=function(){const _0x2cb413=_0x3a3887;Window_Command['prototype'][_0x2cb413(0x259)]['call'](this);const _0x1b72dc=this[_0x2cb413(0x1f9)](),_0x3428ed=Window_BestiaryEnemyList[_0x2cb413(0x18d)][_0x2cb413(0x30e)];this[_0x2cb413(0x3c9)]&&setTimeout(this[_0x2cb413(0x32d)][_0x2cb413(0x1a3)](this,_0x1b72dc),_0x3428ed),this[_0x2cb413(0x29d)]&&setTimeout(this[_0x2cb413(0x334)][_0x2cb413(0x1a3)](this,_0x1b72dc),_0x3428ed);},Window_BestiaryEnemyList[_0x3a3887(0x3f8)]['callUpdateImage']=function(_0x2c071f){const _0x34bbec=_0x3a3887;if(_0x2c071f!==this[_0x34bbec(0x1f9)]())return;if(this[_0x34bbec(0x181)]===_0x2c071f)return;this[_0x34bbec(0x181)]=_0x2c071f;const _0x1ef076=this[_0x34bbec(0x3fd)]();_0x1ef076==='enemy'?this['_imageWindow'][_0x34bbec(0x1d9)](this['currentExt']()):this[_0x34bbec(0x3c9)][_0x34bbec(0x1d9)](0x0);},Window_BestiaryEnemyList[_0x3a3887(0x3f8)][_0x3a3887(0x334)]=function(_0x5265d5){const _0x3d3ee1=_0x3a3887;if(_0x5265d5!==this[_0x3d3ee1(0x1f9)]())return;const _0x1473d9=this['currentSymbol']();_0x1473d9==='enemy'?this[_0x3d3ee1(0x29d)][_0x3d3ee1(0x3e7)](this['currentExt']()):this[_0x3d3ee1(0x29d)][_0x3d3ee1(0x3e7)](0x0);};function Window_BestiaryEnemyImage(){const _0x1d8d92=_0x3a3887;this[_0x1d8d92(0x3b6)](...arguments);}Window_BestiaryEnemyImage[_0x3a3887(0x3f8)]=Object['create'](Window_Base[_0x3a3887(0x3f8)]),Window_BestiaryEnemyImage[_0x3a3887(0x3f8)][_0x3a3887(0x345)]=Window_BestiaryEnemyImage,Window_BestiaryEnemyImage['SETTINGS']={'bgType':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Window'][_0x3a3887(0x2e7)]??0x0,'blurFilterStrength':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)]['ImageWindow_BlurStrength']??0x8,'defaultBattleback1':VisuMZ['Bestiary'][_0x3a3887(0x3d6)]['Window']['ImageWindow_Battleback1']??'Grassland','defaultBattleback2':VisuMZ['Bestiary'][_0x3a3887(0x3d6)]['Window'][_0x3a3887(0x3a4)]??_0x3a3887(0x37f),'padding':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)][_0x3a3887(0x1ba)]??0x4},Window_BestiaryEnemyImage['prototype'][_0x3a3887(0x3b6)]=function(_0x1b008d){const _0x1abfff=_0x3a3887;Window_Base[_0x1abfff(0x3f8)][_0x1abfff(0x3b6)]['call'](this,_0x1b008d),this['createBattlebackSprites'](),this[_0x1abfff(0x234)](),this['createDragonbonesSprite'](),this[_0x1abfff(0x1dc)]();},Window_BestiaryEnemyImage[_0x3a3887(0x3f8)]['updatePadding']=function(){const _0x55b5bc=_0x3a3887;this[_0x55b5bc(0x264)]=Window_BestiaryEnemyImage[_0x55b5bc(0x18d)]['padding'];},Window_BestiaryEnemyImage[_0x3a3887(0x3f8)][_0x3a3887(0x140)]=function(){const _0x2acbbc=_0x3a3887;this['_battlebackSprite1']=new Sprite(),this['_battlebackSprite2']=new Sprite(),this['addInnerChild'](this[_0x2acbbc(0x2ee)]),this[_0x2acbbc(0x3bd)](this[_0x2acbbc(0x16b)]),this[_0x2acbbc(0x2ee)][_0x2acbbc(0x1a2)]['x']=this[_0x2acbbc(0x2ee)][_0x2acbbc(0x1a2)]['y']=0.5,this[_0x2acbbc(0x16b)]['anchor']['x']=this[_0x2acbbc(0x16b)][_0x2acbbc(0x1a2)]['y']=0.5;},Window_BestiaryEnemyImage[_0x3a3887(0x3f8)][_0x3a3887(0x234)]=function(){const _0x502098=_0x3a3887;this['_enemySprite']=new Sprite(),this[_0x502098(0x3bd)](this['_enemySprite']),this['_enemySprite'][_0x502098(0x1a2)]['x']=this[_0x502098(0x1ce)][_0x502098(0x1a2)]['y']=0.5;},Window_BestiaryEnemyImage[_0x3a3887(0x3f8)][_0x3a3887(0x376)]=function(){const _0x3a75ea=_0x3a3887;if(!Imported[_0x3a75ea(0x387)])return;this[_0x3a75ea(0x218)]=null,this[_0x3a75ea(0x2a3)]=new Sprite(),this[_0x3a75ea(0x3bd)](this['_dragonbonesSpriteContainer']);},Window_BestiaryEnemyImage[_0x3a3887(0x3f8)]['createFilters']=function(){const _0x124126=_0x3a3887,_0x18901b=Window_BestiaryEnemyImage[_0x124126(0x18d)][_0x124126(0x3e9)];this['_blurFilter']=new PIXI[(_0x124126(0x1de))]['BlurFilter'](_0x18901b),this[_0x124126(0x1ce)][_0x124126(0x1de)]=[this[_0x124126(0x184)]],this['_dragonbonesSpriteContainer']&&(this[_0x124126(0x2a3)][_0x124126(0x1de)]=[this['_blurFilter']]);},Window_BestiaryEnemyImage[_0x3a3887(0x3f8)][_0x3a3887(0x1d9)]=function(_0x1b91ab){const _0x4dfb91=_0x3a3887;if(!SceneManager[_0x4dfb91(0x3fa)][_0x4dfb91(0x27c)])return;if(this['_enemyID']!==_0x1b91ab){if(_0x1b91ab>0x0)SceneManager['_scene']['updateEnemyID'](_0x1b91ab);this[_0x4dfb91(0x1bb)]=_0x1b91ab,this[_0x4dfb91(0x392)]();}},Window_BestiaryEnemyImage['prototype']['refresh']=function(){const _0x3cb6c3=_0x3a3887;this[_0x3cb6c3(0x22d)]();if(this['_enemyID']<=0x0)return;this['updateBattlebackImages'](),this[_0x3cb6c3(0x142)]();},Window_BestiaryEnemyImage['prototype'][_0x3a3887(0x22d)]=function(){const _0x27922d=_0x3a3887;this[_0x27922d(0x1ce)]['visible']=this[_0x27922d(0x1bb)]>0x0,this['_battlebackSprite1'][_0x27922d(0x336)]=this[_0x27922d(0x1bb)]>0x0,this['_battlebackSprite2']['visible']=this[_0x27922d(0x1bb)]>0x0,this[_0x27922d(0x1ce)]['x']=Math[_0x27922d(0x39c)](this[_0x27922d(0x2f0)]/0x2),this[_0x27922d(0x1ce)]['y']=Math[_0x27922d(0x39c)](this[_0x27922d(0x286)]/0x2),this[_0x27922d(0x1ce)]['scale']['x']=Math[_0x27922d(0x25e)](this[_0x27922d(0x1ce)][_0x27922d(0x19d)]['x']),this[_0x27922d(0x2ee)]['x']=this['_battlebackSprite2']['x']=Math[_0x27922d(0x39c)](this[_0x27922d(0x2f0)]/0x2),this[_0x27922d(0x2ee)]['y']=this[_0x27922d(0x16b)]['y']=Math[_0x27922d(0x39c)](this['innerHeight']/0x2);},Window_BestiaryEnemyImage[_0x3a3887(0x3f8)][_0x3a3887(0x23e)]=function(){const _0x4e5f58=_0x3a3887;this['_battlebackSprite1'][_0x4e5f58(0x1fd)]=ImageManager[_0x4e5f58(0x31d)](this['_enemyID']),this[_0x4e5f58(0x16b)][_0x4e5f58(0x1fd)]=ImageManager[_0x4e5f58(0x38c)](this['_enemyID']);},Window_BestiaryEnemyImage[_0x3a3887(0x3f8)]['updateEnemyImage']=function(){const _0xf29863=_0x3a3887,_0x49da67=SceneManager[_0xf29863(0x3fa)][_0xf29863(0x241)](),_0x398513=_0x49da67[_0xf29863(0x2a9)]();this[_0xf29863(0x37b)]();if(ImageManager[_0xf29863(0x297)](this[_0xf29863(0x1bb)])!==''){const _0x5b8e7a=ImageManager[_0xf29863(0x297)](this[_0xf29863(0x1bb)]),_0x52b3de=ImageManager[_0xf29863(0x3f5)](_0x5b8e7a);_0x52b3de['addLoadListener'](this[_0xf29863(0x147)][_0xf29863(0x1a3)](this,_0x52b3de,0x0));}else{if(this[_0xf29863(0x1f0)]()){const _0x273ab5=new Bitmap(0x1,0x1);this[_0xf29863(0x2c9)](),this[_0xf29863(0x147)](_0x273ab5,0x0);}else{if(this[_0xf29863(0x131)]()){const _0xb8f753=this['_svBattlerName'],_0x4a39a8=ImageManager['loadSvActor'](_0xb8f753);_0x4a39a8[_0xf29863(0x3dd)](this[_0xf29863(0x323)][_0xf29863(0x1a3)](this,_0xb8f753,_0x4a39a8,0x0));}else{if($gameSystem['isSideView']()){const _0x46bf8f=ImageManager['loadSvEnemy'](_0x49da67['battlerName']());_0x46bf8f[_0xf29863(0x3dd)](this[_0xf29863(0x147)][_0xf29863(0x1a3)](this,_0x46bf8f,_0x398513));}else{const _0x3b8027=ImageManager[_0xf29863(0x1b9)](_0x49da67[_0xf29863(0x352)]());_0x3b8027[_0xf29863(0x3dd)](this[_0xf29863(0x147)][_0xf29863(0x1a3)](this,_0x3b8027,_0x398513));}}}}},Window_BestiaryEnemyImage['prototype'][_0x3a3887(0x1f0)]=function(){const _0xe299fd=_0x3a3887;if(!Imported['VisuMZ_2_DragonbonesUnion'])return![];const _0x29d353=SceneManager[_0xe299fd(0x3fa)]['enemy']();return _0x29d353[_0xe299fd(0x240)]()[_0xe299fd(0x1ca)]!==''?(this[_0xe299fd(0x23c)]=_0x29d353[_0xe299fd(0x240)](),!![]):![];},Window_BestiaryEnemyImage[_0x3a3887(0x3f8)]['hasAnimatedSvActorBattler']=function(){const _0x16b644=_0x3a3887;if(!Imported[_0x16b644(0x3ae)])return![];const _0x2e0d88=SceneManager[_0x16b644(0x3fa)][_0x16b644(0x241)]();return _0x2e0d88[_0x16b644(0x243)]()?(this[_0x16b644(0x224)]=_0x2e0d88[_0x16b644(0x1cc)]()['name'],!![]):![];},Window_BestiaryEnemyImage['prototype']['processFullEnemyImage']=function(_0x557105,_0x4aaa71){const _0xa0c1cd=_0x3a3887;this[_0xa0c1cd(0x1ce)][_0xa0c1cd(0x1fd)]=_0x557105,this[_0xa0c1cd(0x1ce)][_0xa0c1cd(0x239)](_0x4aaa71),this[_0xa0c1cd(0x1ce)]['setFrame'](0x0,0x0,_0x557105[_0xa0c1cd(0x28f)],_0x557105[_0xa0c1cd(0x327)]),this[_0xa0c1cd(0x293)](),this['_enemySprite']['update']();},Window_BestiaryEnemyImage['prototype'][_0x3a3887(0x323)]=function(_0x291ea2,_0x2cdaed,_0x2ec126){const _0x1d605b=_0x3a3887;this['_enemySprite'][_0x1d605b(0x1fd)]=_0x2cdaed,this['_enemySprite'][_0x1d605b(0x239)](_0x2ec126);const _0x4ed167=Math['floor'](_0x2cdaed[_0x1d605b(0x28f)]/ImageManager[_0x1d605b(0x227)]),_0x17a587=Math['floor'](_0x2cdaed[_0x1d605b(0x327)]/ImageManager[_0x1d605b(0x1a9)]);this[_0x1d605b(0x1ce)][_0x1d605b(0x21f)](0x0,0x0,_0x4ed167,_0x17a587),this['_enemySprite'][_0x1d605b(0x19d)]['x']*=-0x1,this[_0x1d605b(0x293)](),this[_0x1d605b(0x1ce)][_0x1d605b(0x222)]();},Window_BestiaryEnemyImage[_0x3a3887(0x3f8)][_0x3a3887(0x2c9)]=function(){const _0xe9eef4=_0x3a3887;this[_0xe9eef4(0x37b)]();const _0x1e2c96=this[_0xe9eef4(0x23c)];this[_0xe9eef4(0x230)]=_0x1e2c96[_0xe9eef4(0x1ca)],armatureName=_0x1e2c96[_0xe9eef4(0x1ca)],DragonbonesManager[_0xe9eef4(0x1e1)](armatureName,this['onLoadDragonbones']['bind'](this));const _0x5e37c1=this[_0xe9eef4(0x2a3)];_0x5e37c1&&(_0x5e37c1['x']=Math[_0xe9eef4(0x39c)](this[_0xe9eef4(0x2f0)]/0x2),_0x5e37c1['y']=Math['round'](this[_0xe9eef4(0x286)]/0x2),_0x5e37c1['y']+=Math['round'](_0x1e2c96[_0xe9eef4(0x327)]/0x2));},Window_BestiaryEnemyImage['prototype'][_0x3a3887(0x37b)]=function(){const _0x1f7c0b=_0x3a3887;this['_dragonbones']&&(this[_0x1f7c0b(0x2a3)]&&this[_0x1f7c0b(0x2a3)][_0x1f7c0b(0x356)](this[_0x1f7c0b(0x218)]),this['removeChild'](this[_0x1f7c0b(0x218)]),this['_dragonbones'][_0x1f7c0b(0x22f)](),delete this['_dragonbones'],delete this[_0x1f7c0b(0x230)]);},Window_BestiaryEnemyImage[_0x3a3887(0x3f8)][_0x3a3887(0x2ab)]=function(){const _0x1ea87a=_0x3a3887,_0x5e6972=this[_0x1ea87a(0x23c)];this[_0x1ea87a(0x218)]=DragonbonesManager['createArmature'](_0x5e6972[_0x1ea87a(0x1ca)]),!this['_dragonbonesSpriteContainer']&&(this['_dragonbonesSpriteContainer']=new Sprite(),this['_dragonbonesSpriteContainer'][_0x1ea87a(0x1de)]=[this['_blurFilter']]),this['_dragonbonesSpriteContainer'][_0x1ea87a(0x18c)](this[_0x1ea87a(0x218)]),this[_0x1ea87a(0x2d8)](),this[_0x1ea87a(0x218)]['x']=_0x5e6972[_0x1ea87a(0x359)],this[_0x1ea87a(0x218)]['y']=_0x5e6972[_0x1ea87a(0x1a5)],this[_0x1ea87a(0x218)][_0x1ea87a(0x19d)]['x']=_0x5e6972[_0x1ea87a(0x1cf)],this[_0x1ea87a(0x218)]['scale']['y']=_0x5e6972['scaleY'];},Window_BestiaryEnemyImage[_0x3a3887(0x3f8)]['playDragonbonesIdleAnimation']=function(){const _0x1e13e=_0x3a3887,_0x52e9a1='wait',_0x245e1f=this[_0x1e13e(0x218)][_0x1e13e(0x1cb)];_0x245e1f[_0x1e13e(0x1df)][_0x52e9a1]&&_0x245e1f[_0x1e13e(0x175)](_0x52e9a1);},Window_BestiaryEnemyImage[_0x3a3887(0x3f8)][_0x3a3887(0x293)]=function(){const _0x267256=_0x3a3887;this[_0x267256(0x276)]()?(this[_0x267256(0x184)][_0x267256(0x378)]=![],this[_0x267256(0x1ce)][_0x267256(0x231)]([0x0,0x0,0x0,0x0]),this[_0x267256(0x2a3)]&&this[_0x267256(0x2a3)][_0x267256(0x231)]([0x0,0x0,0x0,0x0])):(this[_0x267256(0x184)][_0x267256(0x378)]=!![],this[_0x267256(0x1ce)][_0x267256(0x231)]([-0xff,-0xff,-0xff,0x0]),this[_0x267256(0x2a3)]&&this[_0x267256(0x2a3)][_0x267256(0x231)]([-0xff,-0xff,-0xff,0x0]));},Window_BestiaryEnemyImage[_0x3a3887(0x3f8)][_0x3a3887(0x276)]=function(){const _0x304ad5=_0x3a3887;if($gameTemp['canDebugViewBestiary']())return!![];if($gameSystem[_0x304ad5(0x2bd)](this[_0x304ad5(0x1bb)]))return!![];if($gameSystem[_0x304ad5(0x1c1)](this['_enemyID'])>0x0)return!![];if($gameSystem[_0x304ad5(0x3ac)](this[_0x304ad5(0x1bb)]))return!![];return![];};function Window_BestiaryDataCategories(){const _0x511ada=_0x3a3887;this[_0x511ada(0x3b6)](...arguments);}Window_BestiaryDataCategories[_0x3a3887(0x3f8)]=Object[_0x3a3887(0x25f)](Window_HorzCommand[_0x3a3887(0x3f8)]),Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x345)]=Window_BestiaryDataCategories,Window_BestiaryDataCategories['SETTINGS']={'bgType':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)][_0x3a3887(0x24e)]??0x0,'commandStyle':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)][_0x3a3887(0x27b)]??'auto','commandOrder':VisuMZ['Bestiary'][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)][_0x3a3887(0x3d7)]??[_0x3a3887(0x3d1),_0x3a3887(0x35d),_0x3a3887(0x209),_0x3a3887(0x1b3),_0x3a3887(0x390),_0x3a3887(0x3f2)],'commands':{'basic':{'show':!![],'text':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x2c1)]??'Base','icon':VisuMZ['Bestiary']['Settings']['Vocab'][_0x3a3887(0x3e8)]??0x54},'elements':{'show':!![],'text':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x3d9)]??_0x3a3887(0x1bf),'icon':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x143)]??0x40},'skills':{'show':!![],'text':VisuMZ[_0x3a3887(0x2c6)]['Settings'][_0x3a3887(0x30d)]['SkillsText']??_0x3a3887(0x1a1),'icon':VisuMZ[_0x3a3887(0x2c6)]['Settings'][_0x3a3887(0x30d)][_0x3a3887(0x2f3)]??0x4f},'rewards':{'show':!![],'text':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x3ca)]??_0x3a3887(0x312),'icon':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x332)]??0x57},'traits':{'show':!![],'text':VisuMZ[_0x3a3887(0x2c6)]['Settings'][_0x3a3887(0x30d)][_0x3a3887(0x1a4)]??_0x3a3887(0x1bd),'icon':VisuMZ['Bestiary'][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x2cc)]??0x53},'lore':{'show':!![],'text':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Vocab'][_0x3a3887(0x20b)]??_0x3a3887(0x305),'icon':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x30d)][_0x3a3887(0x1d1)]??0x50}}},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x3b6)]=function(_0x1f0ecc){const _0x3e858e=_0x3a3887;Window_HorzCommand[_0x3e858e(0x3f8)][_0x3e858e(0x3b6)][_0x3e858e(0x363)](this,_0x1f0ecc),this['createCommandNameWindow'](_0x1f0ecc),this['deactivate'](),this[_0x3e858e(0x3db)]();},Window_BestiaryDataCategories[_0x3a3887(0x3f8)]['maxCols']=function(){const _0x301a91=_0x3a3887;return this[_0x301a91(0x2b4)]?this[_0x301a91(0x2b4)][_0x301a91(0x33e)]:0x1;},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x259)]=function(){const _0xb394f5=_0x3a3887;Window_HorzCommand['prototype']['callUpdateHelp'][_0xb394f5(0x363)](this),this[_0xb394f5(0x210)]&&this['updateCommandNameWindow'](),this['active']&&this[_0xb394f5(0x2fe)]&&this['callUpdateSymbolWindow']();},Window_BestiaryDataCategories['prototype'][_0x3a3887(0x394)]=function(){const _0x175007=_0x3a3887;Window_HorzCommand[_0x175007(0x3f8)]['show'][_0x175007(0x363)](this),this[_0x175007(0x259)]();},Window_BestiaryDataCategories[_0x3a3887(0x3f8)]['hide']=function(){const _0x30e022=_0x3a3887;Window_HorzCommand[_0x30e022(0x3f8)][_0x30e022(0x3db)][_0x30e022(0x363)](this),this[_0x30e022(0x192)]();},Window_BestiaryDataCategories['prototype']['isUseModernControls']=function(){return![];},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x1fb)]=function(_0xc0bf8,_0xb443b6){const _0x4ec37b=_0x3a3887;this['_symbolWindows']=this[_0x4ec37b(0x2fe)]||{},this['_symbolWindows'][_0xb443b6]=_0xc0bf8,this[_0x4ec37b(0x259)]();},Window_BestiaryDataCategories['prototype'][_0x3a3887(0x3b4)]=function(){const _0x3e8ccf=_0x3a3887;this[_0x3e8ccf(0x2fe)]=this[_0x3e8ccf(0x2fe)]||{};for(const _0x426f67 in this[_0x3e8ccf(0x2fe)]){_0x426f67===this['currentSymbol']()?(this[_0x3e8ccf(0x2fe)][_0x426f67][_0x3e8ccf(0x394)](),this[_0x3e8ccf(0x2fe)][_0x426f67][_0x3e8ccf(0x392)](),this[_0x3e8ccf(0x2fe)][_0x426f67][_0x3e8ccf(0x30c)]()):this[_0x3e8ccf(0x2fe)][_0x426f67][_0x3e8ccf(0x3db)]();}},Window_BestiaryDataCategories[_0x3a3887(0x3f8)]['hideAllSymbolWindows']=function(){const _0x106ec0=_0x3a3887;this[_0x106ec0(0x2fe)]=this[_0x106ec0(0x2fe)]||{};for(const _0x49695f in this[_0x106ec0(0x2fe)]){this[_0x106ec0(0x2fe)][_0x49695f][_0x106ec0(0x3db)]();}},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x357)]=function(){const _0x3ba2ac=_0x3a3887,_0x2963b1=this[_0x3ba2ac(0x3fd)]();this['_symbolWindows'][_0x2963b1]?this['_symbolWindows'][_0x2963b1][_0x3ba2ac(0x19c)]?this['_symbolWindows'][_0x2963b1][_0x3ba2ac(0x19c)]():this[_0x3ba2ac(0x2fe)][_0x2963b1][_0x3ba2ac(0x2c4)]():this[_0x3ba2ac(0x2c4)]();},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x3aa)]=function(){const _0x4a8cce=_0x3a3887,_0x5bd658=this[_0x4a8cce(0x3fd)]();this['_symbolWindows'][_0x5bd658]?(this[_0x4a8cce(0x2fe)][_0x5bd658][_0x4a8cce(0x30c)](),this[_0x4a8cce(0x2fe)][_0x5bd658][_0x4a8cce(0x169)](0x0),this['_symbolWindows'][_0x5bd658]['deselect'](),this[_0x4a8cce(0x2fe)][_0x5bd658]['scrollTo'](0x0,0x0)):this[_0x4a8cce(0x2c4)]();},Window_BestiaryDataCategories[_0x3a3887(0x3f8)]['createCommandNameWindow']=function(_0x49497f){const _0x39f280=_0x3a3887,_0xeacfc6=new Rectangle(0x0,0x0,_0x49497f['width'],_0x49497f[_0x39f280(0x327)]);this['_commandNameWindow']=new Window_Base(_0xeacfc6),this[_0x39f280(0x210)][_0x39f280(0x32f)]=0x0,this[_0x39f280(0x18c)](this[_0x39f280(0x210)]),this['updateCommandNameWindow']();},Window_BestiaryDataCategories[_0x3a3887(0x3f8)]['updateCommandNameWindow']=function(){const _0x1172b3=_0x3a3887,_0x5d9a66=this[_0x1172b3(0x210)];_0x5d9a66[_0x1172b3(0x399)]['clear']();const _0x13d545=this[_0x1172b3(0x1c6)](this[_0x1172b3(0x1f9)]());if(_0x13d545===_0x1172b3(0x3af)){const _0xac1b5=this['itemLineRect'](this[_0x1172b3(0x1f9)]());let _0x2d3560=this[_0x1172b3(0x13a)](this[_0x1172b3(0x1f9)]());_0x2d3560=_0x2d3560[_0x1172b3(0x3ed)](/\\I\[(\d+)\]/gi,''),_0x5d9a66[_0x1172b3(0x171)](),this[_0x1172b3(0x2ad)](_0x2d3560,_0xac1b5),this[_0x1172b3(0x280)](_0x2d3560,_0xac1b5),this['commandNameWindowCenter'](_0x2d3560,_0xac1b5);}},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x2ad)]=function(_0x5a0afb,_0x18b49c){},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x280)]=function(_0x53a431,_0xb19e0d){const _0x239a87=_0x3a3887,_0x28eb40=this[_0x239a87(0x210)];_0x28eb40[_0x239a87(0x194)](_0x53a431,0x0,_0xb19e0d['y'],_0x28eb40[_0x239a87(0x2f0)],_0x239a87(0x365));},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x314)]=function(_0x56be44,_0x505c42){const _0x5e7330=_0x3a3887,_0x3889ca=this[_0x5e7330(0x210)],_0x1d74e3=$gameSystem['windowPadding'](),_0x56e8a9=_0x505c42['x']+Math[_0x5e7330(0x3c8)](_0x505c42['width']/0x2)+_0x1d74e3;_0x3889ca['x']=_0x3889ca[_0x5e7330(0x28f)]/-0x2+_0x56e8a9,_0x3889ca['y']=Math['floor'](_0x505c42[_0x5e7330(0x327)]/0x2);},Window_BestiaryDataCategories['prototype']['makeCommandList']=function(){const _0x1ce989=_0x3a3887;for(const _0x5778dc of Window_BestiaryDataCategories[_0x1ce989(0x18d)][_0x1ce989(0x2e1)]){this[_0x1ce989(0x3b7)](_0x5778dc);}},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x3b7)]=function(_0x587dcc){const _0x344c0c=_0x3a3887,_0x1d5470=Window_BestiaryDataCategories[_0x344c0c(0x18d)][_0x344c0c(0x3ba)][_0x587dcc];if(!this[_0x344c0c(0x31a)](_0x1d5470))return;const _0x86b6e4=_0x587dcc,_0x230215=Number(_0x1d5470[_0x344c0c(0x3af)]);let _0x1bc156=_0x1d5470[_0x344c0c(0x361)];_0x230215>0x0&&this[_0x344c0c(0x36b)]()!==_0x344c0c(0x361)&&(_0x1bc156=_0x344c0c(0x302)[_0x344c0c(0x1f5)](_0x230215,_0x1bc156));const _0xe15f93=this[_0x344c0c(0x2e9)](_0x1d5470);this['addCommand'](_0x1bc156,_0x86b6e4,_0xe15f93);},Window_BestiaryDataCategories[_0x3a3887(0x3f8)]['isCustomCommandVisible']=function(_0xf544a7){const _0x5e8ddb=_0x3a3887;if(_0xf544a7===Window_BestiaryDataCategories[_0x5e8ddb(0x18d)]['commands'][_0x5e8ddb(0x390)]){if(!Imported[_0x5e8ddb(0x3c3)])return![];}return _0xf544a7['show'];},Window_BestiaryDataCategories['prototype']['isCustomCommandEnabled']=function(_0x13bbf5){return!![];},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x319)]=function(){return'center';},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x2f5)]=function(_0x3f282f){const _0x247076=_0x3a3887,_0x200794=this['commandStyleCheck'](_0x3f282f);if(_0x200794==='iconText')this['drawItemStyleIconText'](_0x3f282f);else _0x200794==='icon'?this[_0x247076(0x24f)](_0x3f282f):Window_Command[_0x247076(0x3f8)][_0x247076(0x2f5)][_0x247076(0x363)](this,_0x3f282f);},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x36b)]=function(){const _0xa37486=_0x3a3887;return Window_BestiaryDataCategories[_0xa37486(0x18d)][_0xa37486(0x36b)];},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x1c6)]=function(_0x493ced){const _0x549e36=_0x3a3887;if(_0x493ced<0x0)return'text';const _0x220cf0=this['commandStyle']();if(_0x220cf0!==_0x549e36(0x207))return _0x220cf0;else{if(this[_0x549e36(0x307)]()>0x0){const _0x36ceae=this[_0x549e36(0x13a)](_0x493ced);if(_0x36ceae[_0x549e36(0x303)](/\\I\[(\d+)\]/i)){const _0x2ee95e=this['itemLineRect'](_0x493ced),_0x1a74dd=this['textSizeEx'](_0x36ceae)['width'];return _0x1a74dd<=_0x2ee95e[_0x549e36(0x28f)]?_0x549e36(0x220):_0x549e36(0x3af);}}}return _0x549e36(0x361);},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x250)]=function(_0x374940){const _0x3a5e31=_0x3a3887,_0x1c7f2d=this['itemLineRect'](_0x374940),_0x3db54d=this[_0x3a5e31(0x13a)](_0x374940),_0x1e80cb=this[_0x3a5e31(0x26d)](_0x3db54d)[_0x3a5e31(0x28f)];this['changePaintOpacity'](this[_0x3a5e31(0x2c7)](_0x374940));const _0x21efaa=this[_0x3a5e31(0x319)]();if(_0x21efaa===_0x3a5e31(0x180))this['drawTextEx'](_0x3db54d,_0x1c7f2d['x']+_0x1c7f2d[_0x3a5e31(0x28f)]-_0x1e80cb,_0x1c7f2d['y'],_0x1e80cb);else{if(_0x21efaa===_0x3a5e31(0x365)){const _0x33ccc3=_0x1c7f2d['x']+Math['floor']((_0x1c7f2d['width']-_0x1e80cb)/0x2);this[_0x3a5e31(0x301)](_0x3db54d,_0x33ccc3,_0x1c7f2d['y'],_0x1e80cb);}else this[_0x3a5e31(0x301)](_0x3db54d,_0x1c7f2d['x'],_0x1c7f2d['y'],_0x1e80cb);}},Window_BestiaryDataCategories[_0x3a3887(0x3f8)][_0x3a3887(0x24f)]=function(_0x205874){const _0x39f816=_0x3a3887;this[_0x39f816(0x13a)](_0x205874)[_0x39f816(0x303)](/\\I\[(\d+)\]/i);const _0x3cb7a6=Number(RegExp['$1'])||0x0,_0x5d7b89=this[_0x39f816(0x38b)](_0x205874),_0xc40a8b=_0x5d7b89['x']+Math[_0x39f816(0x3c8)]((_0x5d7b89[_0x39f816(0x28f)]-ImageManager[_0x39f816(0x20d)])/0x2),_0x4e1016=_0x5d7b89['y']+(_0x5d7b89[_0x39f816(0x327)]-ImageManager[_0x39f816(0x2bc)])/0x2;this[_0x39f816(0x17e)](_0x3cb7a6,_0xc40a8b,_0x4e1016);};function Window_BestiaryBasic(){this['initialize'](...arguments);}Window_BestiaryBasic[_0x3a3887(0x3f8)]=Object['create'](Window_Command[_0x3a3887(0x3f8)]),Window_BestiaryBasic['prototype'][_0x3a3887(0x345)]=Window_BestiaryBasic,Window_BestiaryBasic[_0x3a3887(0x18d)]={'bgType':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Window'][_0x3a3887(0x2fd)]??0x0,'showLevelChange':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)]['BasicWindow_ShowLevelChange']??!![]},Window_BestiaryBasic['prototype'][_0x3a3887(0x3b6)]=function(_0x16d7bd){const _0x54cb7=_0x3a3887;Window_Command['prototype'][_0x54cb7(0x3b6)]['call'](this,_0x16d7bd),this[_0x54cb7(0x30c)](),this['deselect'](),this[_0x54cb7(0x3db)]();},Window_BestiaryBasic['prototype'][_0x3a3887(0x19c)]=function(){const _0x151659=_0x3a3887;this[_0x151659(0x2c4)](),this[_0x151659(0x169)](0x0),this[_0x151659(0x299)](0x0,0x0);},Window_BestiaryBasic['prototype'][_0x3a3887(0x34d)]=function(){const _0xb00694=_0x3a3887;if(this[_0xb00694(0x3fd)]()!==_0xb00694(0x311))Window_Command[_0xb00694(0x3f8)][_0xb00694(0x34d)]['call'](this);},Window_BestiaryBasic[_0x3a3887(0x3f8)][_0x3a3887(0x29f)]=function(){const _0x4145f2=_0x3a3887;for(const _0x38fd20 of this[_0x4145f2(0x31e)]()){this['addCommand'](_0x38fd20,'param',!![],_0x38fd20);}this[_0x4145f2(0x1ff)]()&&this[_0x4145f2(0x283)]();},Window_BestiaryBasic[_0x3a3887(0x3f8)]['baseParams']=function(){const _0x5d70ba=_0x3a3887;return Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0x5d70ba(0x2eb)][_0x5d70ba(0x3d6)][_0x5d70ba(0x2ea)][_0x5d70ba(0x32a)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_BestiaryBasic[_0x3a3887(0x3f8)][_0x3a3887(0x1ff)]=function(){const _0x16842f=_0x3a3887;return Imported[_0x16842f(0x26c)]&&Window_BestiaryBasic['SETTINGS'][_0x16842f(0x2cd)];},Window_BestiaryBasic[_0x3a3887(0x3f8)][_0x3a3887(0x283)]=function(){const _0x27526b=_0x3a3887,_0x235939=TextManager[_0x27526b(0x2c6)][_0x27526b(0x158)],_0x111aa5=SceneManager[_0x27526b(0x3fa)][_0x27526b(0x241)]();{const _0x4cc78c=_0x235939[_0x27526b(0x3b0)],_0x1f531f=_0x4cc78c[_0x27526b(0x1f5)](TextManager[_0x27526b(0x2ec)]),_0x13f73d=_0x111aa5[_0x27526b(0x2ec)]<_0x111aa5[_0x27526b(0x3a9)]();this[_0x27526b(0x35e)](_0x1f531f,'levelMax',_0x13f73d);}{const _0x29c302=_0x235939[_0x27526b(0x166)],_0x3cd9b3=_0x29c302[_0x27526b(0x1f5)](TextManager[_0x27526b(0x2ec)]),_0x128c1b=_0x111aa5[_0x27526b(0x2ec)]<_0x111aa5[_0x27526b(0x3a9)]();this[_0x27526b(0x35e)](_0x3cd9b3,'levelUp',_0x128c1b);}{const _0x87c375=_0x235939[_0x27526b(0x1bc)],_0x58e180=_0x87c375[_0x27526b(0x1f5)](TextManager[_0x27526b(0x2ec)]),_0x40cc0c=_0x111aa5[_0x27526b(0x2ec)]>_0x111aa5[_0x27526b(0x19a)]();this['addCommand'](_0x58e180,_0x27526b(0x1bc),_0x40cc0c);}{const _0x911dcd=_0x235939['levelDownToMin'],_0x43c91e=_0x911dcd[_0x27526b(0x1f5)](TextManager['level']),_0x108d48=_0x111aa5['level']>_0x111aa5['minLevel']();this[_0x27526b(0x35e)](_0x43c91e,'levelMin',_0x108d48);}},Window_BestiaryBasic[_0x3a3887(0x3f8)][_0x3a3887(0x2f5)]=function(_0x3e8230){const _0xa671dc=_0x3a3887,_0x5166e7=this[_0xa671dc(0x2b9)](_0x3e8230);_0x5166e7===_0xa671dc(0x311)?this[_0xa671dc(0x245)](_0x3e8230):this[_0xa671dc(0x2d2)](_0x3e8230);},Window_BestiaryBasic[_0x3a3887(0x3f8)][_0x3a3887(0x325)]=function(){const _0x539f4a=_0x3a3887;return Imported[_0x539f4a(0x12f)]&&VisuMZ[_0x539f4a(0x2eb)][_0x539f4a(0x3d6)]['Param'][_0x539f4a(0x351)];},Window_BestiaryBasic[_0x3a3887(0x3f8)][_0x3a3887(0x245)]=function(_0x3fde98){const _0x251955=_0x3a3887,_0x243d17=this[_0x251955(0x38b)](_0x3fde98),_0x50dc2c=String(this[_0x251955(0x13a)](_0x3fde98))[_0x251955(0x37e)]()[_0x251955(0x167)](),_0x676a97=SceneManager[_0x251955(0x3fa)][_0x251955(0x241)]();if(!_0x676a97)return;this[_0x251955(0x171)](),this['changePaintOpacity'](!![]),this[_0x251955(0x1d3)](ColorManager[_0x251955(0x25a)]());if(Imported[_0x251955(0x12f)]){if(this['shouldDrawIcons']()){const _0x742c12=VisuMZ[_0x251955(0x165)](_0x50dc2c);this['drawIcon'](_0x742c12,_0x243d17['x']+0x2,_0x243d17['y']+0x2),_0x243d17['x']+=ImageManager[_0x251955(0x20d)]+0x4,_0x243d17[_0x251955(0x28f)]-=ImageManager[_0x251955(0x20d)]+0x4;}const _0x3b17aa=TextManager[_0x251955(0x311)](_0x50dc2c);this[_0x251955(0x194)](_0x3b17aa,_0x243d17['x'],_0x243d17['y'],_0x243d17[_0x251955(0x28f)],_0x251955(0x1fe));}else{const _0x1d8378=TextManager['param'](Number(_0x50dc2c));this[_0x251955(0x194)](_0x1d8378,_0x243d17['x'],_0x243d17['y'],_0x243d17[_0x251955(0x28f)],_0x251955(0x1fe));}this[_0x251955(0x171)](),this[_0x251955(0x1d3)](ColorManager[_0x251955(0x25a)]());if(Imported['VisuMZ_0_CoreEngine']){const _0x262126=_0x676a97[_0x251955(0x149)](_0x50dc2c,!![]);this['drawText'](_0x262126,_0x243d17['x'],_0x243d17['y'],_0x243d17[_0x251955(0x28f)],_0x251955(0x180));}else{const _0x31b37c=_0x676a97[_0x251955(0x311)](Number(_0x50dc2c));this[_0x251955(0x194)](_0x31b37c,_0x243d17['x'],_0x243d17['y'],_0x243d17[_0x251955(0x28f)],'right');}},Window_BestiaryBasic['prototype'][_0x3a3887(0x319)]=function(){const _0x1f5c71=_0x3a3887;return _0x1f5c71(0x1fe);},Window_BestiaryBasic['prototype'][_0x3a3887(0x2d2)]=function(_0x5ddb35){const _0x2f0ec5=_0x3a3887,_0x396b42=this['itemLineRect'](_0x5ddb35),_0x82c337=this[_0x2f0ec5(0x13a)](_0x5ddb35),_0x5740ef=this[_0x2f0ec5(0x26d)](_0x82c337)['width'];this[_0x2f0ec5(0x2cf)](this['isCommandEnabled'](_0x5ddb35));const _0x3f5738=this[_0x2f0ec5(0x319)]();if(_0x3f5738===_0x2f0ec5(0x180))this[_0x2f0ec5(0x301)](_0x82c337,_0x396b42['x']+_0x396b42['width']-_0x5740ef,_0x396b42['y'],_0x5740ef);else{if(_0x3f5738===_0x2f0ec5(0x365)){const _0x192f2c=_0x396b42['x']+Math[_0x2f0ec5(0x3c8)]((_0x396b42[_0x2f0ec5(0x28f)]-_0x5740ef)/0x2);this[_0x2f0ec5(0x301)](_0x82c337,_0x192f2c,_0x396b42['y'],_0x5740ef);}else this[_0x2f0ec5(0x301)](_0x82c337,_0x396b42['x'],_0x396b42['y'],_0x5740ef);}};function Window_BestiaryElements(){this['initialize'](...arguments);}Window_BestiaryElements['prototype']=Object[_0x3a3887(0x25f)](Window_Command['prototype']),Window_BestiaryElements['prototype'][_0x3a3887(0x345)]=Window_BestiaryElements,Window_BestiaryElements[_0x3a3887(0x18d)]={'bgType':VisuMZ['Bestiary'][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)]['ElementsWindow_BgType']??0x0},Window_BestiaryElements[_0x3a3887(0x3f8)][_0x3a3887(0x3b6)]=function(_0x26112c){const _0x3db7d0=_0x3a3887;Window_Command[_0x3db7d0(0x3f8)][_0x3db7d0(0x3b6)][_0x3db7d0(0x363)](this,_0x26112c),this[_0x3db7d0(0x30c)](),this[_0x3db7d0(0x340)](),this[_0x3db7d0(0x3db)]();},Window_BestiaryElements[_0x3a3887(0x3f8)][_0x3a3887(0x19c)]=function(){const _0x129b47=_0x3a3887;this[_0x129b47(0x2c4)](),this[_0x129b47(0x169)](0x0),this[_0x129b47(0x299)](0x0,0x0);},Window_BestiaryElements[_0x3a3887(0x3f8)][_0x3a3887(0x34d)]=function(){},Window_BestiaryElements[_0x3a3887(0x3f8)][_0x3a3887(0x29f)]=function(){const _0x3a3b16=_0x3a3887;for(let _0x362e94=0x1;_0x362e94<$dataSystem[_0x3a3b16(0x35d)][_0x3a3b16(0x33e)];_0x362e94++){if(this[_0x3a3b16(0x281)](_0x362e94))continue;const _0x439b95=$dataSystem[_0x3a3b16(0x35d)][_0x362e94];this[_0x3a3b16(0x35e)](_0x439b95,_0x3a3b16(0x35d),!![],_0x362e94);}},Window_BestiaryElements[_0x3a3887(0x3f8)][_0x3a3887(0x281)]=function(_0x29e933){const _0x25a585=_0x3a3887;if(_0x29e933<=0x0)return!![];if(Imported[_0x25a585(0x3c3)]){if(VisuMZ['ElementStatusCore'][_0x25a585(0x3d6)][_0x25a585(0x2e8)][_0x25a585(0x270)][_0x25a585(0x1f8)](_0x29e933))return!![];}return![];},Window_BestiaryElements[_0x3a3887(0x3f8)]['drawItem']=function(_0x4f8bcf){const _0x1d6906=_0x3a3887,_0x826e7d=this[_0x1d6906(0x38b)](_0x4f8bcf),_0x3f4b19=this[_0x1d6906(0x13a)](_0x4f8bcf),_0x4c166f=this['_list'][_0x4f8bcf]['ext'];this[_0x1d6906(0x171)](),this[_0x1d6906(0x2cf)](this['isCommandEnabled'](_0x4f8bcf)),this[_0x1d6906(0x301)](_0x3f4b19,_0x826e7d['x'],_0x826e7d['y'],_0x826e7d['width']);const _0x44c8ba=SceneManager[_0x1d6906(0x3fa)][_0x1d6906(0x241)](),_0x1367a4=_0x44c8ba[_0x1d6906(0x1b1)](_0x4c166f),_0x53b1da=TextManager[_0x1d6906(0x2c6)][_0x1d6906(0x3e3)];let _0x328b0d=_0x53b1da[_0x1d6906(0x244)];if(Imported['VisuMZ_1_ElementStatusCore']&&_0x44c8ba[_0x1d6906(0x37d)]()[_0x1d6906(0x1f8)](_0x4c166f))_0x328b0d=_0x53b1da[_0x1d6906(0x3e0)];else{if(_0x1367a4>1.05)_0x328b0d=_0x53b1da['weak'];else{if(_0x1367a4<=0x0)_0x328b0d=_0x53b1da[_0x1d6906(0x3d8)];else _0x1367a4<0.95&&(_0x328b0d=_0x53b1da['resist']);}}const _0x526a52=_0x826e7d['x']+_0x826e7d['width']-this[_0x1d6906(0x26d)](_0x328b0d)[_0x1d6906(0x28f)];this['drawTextEx'](_0x328b0d,_0x526a52,_0x826e7d['y'],_0x826e7d[_0x1d6906(0x28f)]);};function _0xab9d(){const _0x2d337e=['categoryEnemies','Please\x20select\x20a\x20monster\x20to\x20view.','_bestiaryEnemyCustomImageFilename','TraitsWindow_ShowAllTraits','BasicWindow_BgType','_symbolWindows','setLevel','_backSprite2','drawTextEx','\x5cI[%1]%2','match','DataCategoriesWindow_RectJS','Lore','upArrowVisible','maxItems','parameters','chance10','Game_BattlerBase_refresh','PossibleEnemyTraits','deactivate','Vocab','delayMs','defaultLoreFmt','+\x20%1\x20(%2%)','param','Rewards','baseTextRect','commandNameWindowCenter','addItemDropCommand','min','setNoEnemyText','initCategoryStatus','itemTextAlign','isCustomCommandVisible','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Nature','bestiaryEnemyBattleback1','baseParams','slowSoundFrequency','addEnemyConditionalDrops','process_VisuMZ_Bestiary','getAspectData','processSvActorImage','231473qymMYC','shouldDrawIcons','TraitsWindow_ClosedCategory','height','slowScrollSpeed','apply','ExtDisplayedParams','isEnemyIncludedInBestiary','dataWindowRect','callUpdateImage','ceil','opacity','NameWindow_BgType','isTriggered','RewardsIcon','DebugFullBestiary','callUpdateSubWindow','isSceneBattle','visible','initBestiaryReveals','createSpecialBattlers','Curse','CategoryOrder','random','commandBestiary','_listWindow','length','VisuMZ_4_ExtraEnemyDrops','deselect','remove','maskUndefeatedEnemyNames','isAutoColorAffected','popScene','constructor','_getBestiaryLore','isCategoryOpen','uiButtonPosition','createDataCategoriesWindow','down','ConvertParams','initBestiaryMainMenu','playOkSound','Name','_debugViewBestiary','split','DrawIcons','battlerName','addCpCommand','fontSize','clear','removeChild','activateSymbolWindow','#%1','offsetX','nameWindow','buttonAssistKey3','createHelpWindow','elements','addCommand','JobPoints','FUNC','text','isPlaytest','call','VisuMZ_1_MessageCore','center','_categoryStatus','_loreDataWindow','processCursorMove','chance0','GetItemObj','commandStyle','setText','drawEncounterData','getDatabase','categoryEnemyIDs','addItemsCommand','_enemyBestiaryCategories','gainLevel','mainAreaBottom','addJpCommand','boxWidth','createDragonbonesSprite','3130304GOAAZx','enabled','getTraitSet','drawItemAspect','disposeDragonbones','VisuMZ_2_ClassChangeSystem','getAbsorbedElements','toUpperCase','Grassland','subWindow','-\x20%1\x20(%2%)','loadTitle1','SubWindow_Defeated','isMainMenuBestiaryVisible','process_VisuMZ_Bestiary_Categories','name','VisuMZ_2_DragonbonesUnion','getPassiveStatesFromObj','SubWindow_RectJS','EVAL','itemLineRect','bestiaryEnemyBattleback2','clamp','_noRandom','addGoldCommand','traits','playCursor','refresh','addBestiaryCommand','show','_Bestiary_MainMenu','Little\x20is\x20known\x20about\x20this\x20monster.','FastScrollSpeed','Game_System_initialize','contents','onDataCategoriesCancel','battleback2','round','push','expIcon','setClickHandler','ListWindow_MaskUnknown','Reveal','drawItemSkill','buttonAssistText3','ImageWindow_Battleback2','Gender','category','smoothSelect','drawMessageText','maxLevel','deactivateSymbolWindow','VisuMZ_1_MainMenuCore','isEnemyRevealedByBestiary','Common','VisuMZ_1_BattleCore','icon','levelUpToMax','_categoryEnemyIDs','hideSkill','Element','callUpdateSymbolWindow','Window_MenuCommand_addOriginalCommands','initialize','addCustomCommand','Description','currentCategory','commands','ShowAllCategories','26694gKxAGv','addInnerChild','totalDefeatedEnemies','ListWindow_BgType','classPoints','updateArrows','\x5cC[7]Immune','VisuMZ_1_ElementStatusCore','helpAreaHeight','setMainMenuBestiaryVisible','nameWindowRect','_bestiaryEnemyBattlebackData','floor','_imageWindow','RewardsText','addApCommand','weapons','HelpWindow_ScaleRatio','PossibleRandomSingularTraitsFromNotetags','canDebugViewBestiary','setItem','basic','setDebugViewBestiary','NameWindow_RectJS','RewardsWindow_Chance50','origin','Settings','CategoryWindow_CommandOrder','immune','ElementsText','skillId','hide','mainAreaHeight','addLoadListener','\x5cC[25]Resist','exit','absorb','createAllWindows','setHelpWindow','elementsWindow','buttonAssistKey1','processFastScroll','Variant','setEnemy','BasicIcon','blurFilterStrength','rewardsWindow','buttonAssistKey2','LoreWindow_Default','replace','isBestiaryCommandEnabled','AbilityPoints','addItemToGroup','helpWindow_BgType','lore','ElementsWindow_Weak','makeEmptyGroups','loadPicture','processEnemyLore','CategoryWindow_ClosedCategory','prototype','traitSetType','_scene','slowScrollLore','trait','currentSymbol','buttonAssistText1','onBasicDataLevelChange','enemyBestiaryCategories','getTraitSetKeys','getBestiaryLore','scaleHelpWindow','VisuMZ_0_CoreEngine','-----','hasAnimatedSvActorBattler','STRUCT','prevEnemy','max','_bestiaryTotalEnemies','members','aspect','chance50','isRightInputMode','commandName','_dataCategoriesWindow','Key','defaultCategory','jobPointsAbbr','map','createBattlebackSprites','onSymbolWindowCancel','updateEnemyImage','ElementsIcon','subWindowRect','jobPointsIcon','_nameWindow','processFullEnemyImage','\x5cC[5]Rare','paramValueByName','skill','_visualDrops','Scroll','1rdvjMI','addExpCommand','ClassChangeSystem','uiMenuStyle','isCountTowardsBestiaryDefeated','expA','buttonAssistKey4','bgType','isAlive','bestiaryRevealEnemy','ARRAYFUNC','basicWindow','ARRAYSTRUCT','cancel','getDefeatedEnemies','_pageupButton','itemPadding','addEnemy','isPressed','ARRAYSTR','SubWindowCompleteFixedDigits','addCategory','updateEnemy','makeEnemyList','GetParamIcon','levelUp','trim','createSubWindow','forceSelect','nextEnemy','_battlebackSprite2','_traitsDataWindow','calcWindowHeight','currentExt','dataCategoriesWindowRect','ListWindow_RectJS','resetFontSettings','\x5cC[17]Conditional','createEnemy','createListWindow','play','2544864QrvPFL','buttonAssist','ListWindowDelayMS','buttonAssist_Collapse','Scene_Menu_createCommandWindow','ARRAYNUM','categoryWindow','getColor','drawIcon','pageup','right','_lastIndex','ExtraEnemyDrops','JSON','_blurFilter','concat','RewardsWindow_Chance20','bestiaryTotalEnemies','Display','ClassPoints','nullHelp','maskChar','addChild','SETTINGS','Blessing','contentsHeight','CategoryData','chance20','hideAllSymbolWindows','updatePageButtons','drawText','addEnemySkills','\x5cI[%1]\x5cC[%3]%2','drawItemState','RewardsWindow_Chance100','ShowVictory','minLevel','Bestiary\x20Completion\x20Rate:\x20%1%\x20(%2/%3\x20Monsters)','becomeActive','scale','createRewardsDataWindow','active','textColor','Skills','anchor','bind','TraitsText','offsetY','enemyId','toLowerCase','closedCategoriesFmt','svActorVertCells','BestiaryMenuCommand','uiHelpPosition','exp','abilityPointsAbbr','\x5cC[24]Guaranteed','openCategoriesFmt','smoothScrollBy','elementRate','GetDropRateText','rewards','createBasicDataWindow','frameCount','levelMax','BgFilename2','isDead','loadEnemy','ImageWindow_Padding','_enemyID','levelDown','Properties','RegExp','Elements','armors','timesEnemySeen','SubElement','imageWindowRect','openCloseCurrentCategory','Defeated:\x20%1','commandStyleCheck','scrollToBottom','version','loadTitle2','battler','animation','svBattlerData','Label','_enemySprite','scaleX','PossibleSingularTraitsFromNotetags','LoreIcon','_bestiaryReveal','changeTextColor','addTimesEnemyDefeated','updateHelp','_basicDataWindow','addWindow','showAspect','setEnemyID','BgFilename1','addNewState','createFilters','Window','filters','animations','playCursorSound','loadArmature','\x5cI[74]Lower\x20%1\x20Down\x20to\x20Minimum','EnableMainMenu','ElementsWindow_Immune','setup','_backSprite1','items','MainMenu','isEnabledEnemy','_enemy','createBackground','createPageButtons','RewardsWindow_BgType','addSortedEnemyDrops','_timesEnemySeen','hasDragonbonesBattler','buttonAssistText2','home','toggleTraitsCategory','calculateTextHeight','format','battleback1','List','includes','index','loadBattleback2','setSymbolWindow','loadBattleback1','bitmap','left','canAddLevelChange','description','buttonAssist_View','isSkillHidden','gold','Collapse','classPointsAbbr','Show','auto','This\x20is\x20the\x20property\x20type.','skills','_tp','LoreText','createCustomBackgroundImages','iconWidth','VisuMZ_2_SkillLearnSystem','SnapshotOpacity','_commandNameWindow','\x5cI[74]Lower\x20%1\x20Down','includesTrait','downArrowVisible','Switch\x20Monster','BasicWindow_LevelUpByOne','Gold_Icon','Zodiac','_dragonbones','skillPointsAbbr','BgSettings','709678PnToYj','DataWindow_RectJS','needsPageButtons','bestiary','setFrame','iconText','\x5cI[%1]\x5cHEXCOLOR<%3>%2','update','state','_svBattlerName','BestiaryRevealEnemies','buttonAssist_FastScroll','svActorHorzCells','addTimesEnemySeen','buttonAssistText4','includeCategory','32mgEdmQ','Game_BattlerBase_addNewState','updateSpriteVisibility','isBestiaryCommandVisible','dispose','_dragonbonesName','setColorTone','conditional','createTraitsDataWindow','createEnemySprite','onDatabaseLoaded','bestiaryEnemyBattlebackData','SystemEnableBestiaryMenu','RewardsWindow_Chance10','setHue','setSubWindow','levelMin','_dragonbonesBattlerData','completionFmt','updateBattlebackImages','DefaultCategory','dragonbonesData','enemy','NUM','hasSvBattler','neutral','drawParamItem','Categories','LoreWindow_BgType','_enemyDrops','displayAllTraitTypes','RewardsWindow_RewardsOrder','addBestiaryCommandAutomatically','isMainMenuBestiaryEnabled','mainAreaTop','CategoryWindow_BgType','drawItemStyleIcon','drawItemStyleIconText','324dkfvfs','addEnemyDatabaseDrops','loreWindow','chance100','shown','note','HelpWindow_BgType','makeTraitList','callUpdateHelp','normalColor','getSkillName','switch','+\x20\x5cC[16]%1','abs','create','setEnemyName','_showEnemyInBestiary','drawBestiaryCompletionRate','36PdzBlx','padding','SkillsWindow_ShowAspects','viewEnemy','SubWindow_BgType','setScrollAccel','traitsWindow','Default','Math_random','VisuMZ_3_EnemyLevels','textSizeEx','createElementsDataWindow','SubWindow_Encountered','ExcludeElements','BESTIARY','_helpWindow','SubWindow_Completion','SlowScrollSpeed','parse','isEnemyFullyVisible','updateOrigin','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','indexOf','defeatedFmt','CategoryWindow_Style','updateEnemyID','Title','TraitsWindow_CategoryHelpDesc','ARRAYEVAL','commandNameWindowDrawText','isElementIDExcluded','setHandler','addLevelChangeCommands','NameWindow_CategoryText','originalName','innerHeight','isBottomHelpMode','playOk','SkillLearnSystem','iconIndex','_text','CategoryPercentFixedDigits','arePageButtonsEnabled','some','width','toggleEnemyCategory','seenFmt','initBestiarySettings','updateFilters','RandomValid','ext','isEnemy','bestiaryEnemyCustomImageFilename','createCommandWindow','scrollTo','timesEnemyDefeated','changeEnemyTrait','ElementsWindow_Neutral','_subWindow','TraitsWindow_OpenCategory','makeCommandList','\x5cC[27]Super\x20Rare','adjustSprite','helpWindowRect','_dragonbonesSpriteContainer','\x5cC[24]Weak','collapse','registerCommand','CategoryWindow_OpenCategory','BattleManager_setup','battlerHue','BasicWindow_LevelUpToMax','onLoadDragonbones','toFixed','commandNameWindowDrawBackground','_allTextHeight','createImageWindow','buttonAssistText5','scaleSprite','Scene_Boot_onDatabaseLoaded','makeTraitCommand','_list','filter','HelpWindow_RectJS','TraitsWindow_NullHelpDesc','onDataCategoriesOpen','commandSymbol','sort','getBackgroundOpacity','iconHeight','isEnemyDefeated','ImageWindow_RectJS','helpWindowRatio','traitSet','BasicText','1068710AkdkHB','SkillsWindow_BgType','activate','SceneOpenBestiary','Bestiary','isCommandEnabled','isWeapon','processDragonbones','buttonAssistKey5','listWindowRect','TraitsIcon','showLevelChange','isEnemyNameMasked','changePaintOpacity','fixedPercentage','PossibleMassTraitsFromNotetags','drawRegularItem','showEnemyInBestiary','addOriginalCommands','Race','addSpCommand','Encountered:\x20%1','playDragonbonesIdleAnimation','setMainMenuBestiaryEnabled','expand','processSlowScroll','EnemyIDs','abilityPoints','_timesEnemyDefeated','BasicWindow_LevelDownToMin','dataId','commandOrder','3450mStlgb','-\x20\x5cC[16]%1','\x5cI[73]Raise\x20%1\x20Up\x20to\x20Maximum','denominator','LoreWindow_AutoWordWrap','ImageWindow_BgType','StatusMenu','isCustomCommandEnabled','Param','CoreEngine','level','createLoreDataWindow','_battlebackSprite1','_skillsDataWindow','innerWidth','buttonAssist_Expand','customPicture','SkillsIcon','\x5cI[73]Raise\x20%1\x20Up','drawItem','fastScrollLore','setBackgroundType','1800GNoFzl'];_0xab9d=function(){return _0x2d337e;};return _0xab9d();}function Window_BestiarySkills(){const _0x2918be=_0x3a3887;this[_0x2918be(0x3b6)](...arguments);}Window_BestiarySkills[_0x3a3887(0x3f8)]=Object['create'](Window_Command[_0x3a3887(0x3f8)]),Window_BestiarySkills[_0x3a3887(0x3f8)][_0x3a3887(0x345)]=Window_BestiarySkills,Window_BestiarySkills['SETTINGS']={'bgType':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)][_0x3a3887(0x2c3)]??0x0,'showAspect':VisuMZ[_0x3a3887(0x2c6)]['Settings'][_0x3a3887(0x1dd)][_0x3a3887(0x265)]??!![],'showPassives':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)]['SkillsWindow_ShowPassives']??!![]},Window_BestiarySkills[_0x3a3887(0x3f8)][_0x3a3887(0x3b6)]=function(_0x32911a){const _0x426892=_0x3a3887;Window_Command[_0x426892(0x3f8)][_0x426892(0x3b6)][_0x426892(0x363)](this,_0x32911a),this[_0x426892(0x30c)](),this[_0x426892(0x340)](),this['hide']();},Window_BestiarySkills[_0x3a3887(0x3f8)][_0x3a3887(0x19c)]=function(){const _0x519c16=_0x3a3887;this[_0x519c16(0x2c4)](),this['forceSelect'](0x0),this[_0x519c16(0x299)](0x0,0x0),this[_0x519c16(0x272)]&&this[_0x519c16(0x272)]['show']();},Window_BestiarySkills[_0x3a3887(0x3f8)][_0x3a3887(0x34d)]=function(){},Window_BestiarySkills[_0x3a3887(0x3f8)][_0x3a3887(0x29f)]=function(){this['addEnemyAspect'](),this['addEnemySkills'](),this['addEnemyPassives']();},Window_BestiarySkills[_0x3a3887(0x3f8)]['addEnemyAspect']=function(){const _0x455d9b=_0x3a3887;if(!Window_BestiarySkills[_0x455d9b(0x18d)][_0x455d9b(0x1d8)])return;const _0x252d11=SceneManager[_0x455d9b(0x3fa)][_0x455d9b(0x241)]();if(!_0x252d11)return;if(!_0x252d11['hasAspectData'])return;if(!_0x252d11['hasAspectData']())return;const _0x2e9d2a=_0x252d11[_0x455d9b(0x322)]()[_0x455d9b(0x386)],_0x293dc4=_0x252d11[_0x455d9b(0x322)]()[_0x455d9b(0x28a)],_0x36027b=_0x252d11[_0x455d9b(0x322)]()['nameColor'];let _0x10a55e='';_0x36027b[_0x455d9b(0x303)](/#(.*?)/gi)?_0x10a55e=_0x455d9b(0x221)[_0x455d9b(0x1f5)](_0x293dc4,_0x2e9d2a,_0x36027b):_0x10a55e=_0x455d9b(0x196)[_0x455d9b(0x1f5)](_0x293dc4,_0x2e9d2a,_0x36027b),this[_0x455d9b(0x35e)](_0x10a55e,_0x455d9b(0x137),!![]);},Window_BestiarySkills[_0x3a3887(0x3f8)][_0x3a3887(0x195)]=function(){const _0x197d68=_0x3a3887,_0x28e0f0=SceneManager[_0x197d68(0x3fa)][_0x197d68(0x241)](),_0x290213=_0x28e0f0['skills']()['sort']((_0xec0a23,_0x1ae730)=>_0xec0a23['id']-_0x1ae730['id'])['filter']((_0x10fd6b,_0x8435e5,_0xec1e9d)=>_0xec1e9d[_0x197d68(0x279)](_0x10fd6b)===_0x8435e5);for(const _0x2d917f of _0x290213){if(this[_0x197d68(0x202)](_0x2d917f))continue;this[_0x197d68(0x35e)](String(_0x2d917f['id']),_0x197d68(0x14a),!![],_0x2d917f['id']);}},Window_BestiarySkills[_0x3a3887(0x3f8)][_0x3a3887(0x202)]=function(_0x2f182f){const _0x584c86=_0x3a3887;if(!_0x2f182f)return!![];const _0x4f2b25=VisuMZ[_0x584c86(0x2c6)][_0x584c86(0x1be)],_0x25296b=_0x2f182f['note']||'';if(_0x25296b[_0x584c86(0x303)](_0x4f2b25[_0x584c86(0x3b2)]))return!![];return![];},Window_BestiarySkills[_0x3a3887(0x3f8)]['addEnemyPassives']=function(){const _0x1f0ce3=_0x3a3887;if(!Imported[_0x1f0ce3(0x3ae)])return;if(!Imported['VisuMZ_1_SkillsStatesCore'])return;const _0x2ed26c=SceneManager[_0x1f0ce3(0x3fa)]['enemy'](),_0x3b5ca4=DataManager[_0x1f0ce3(0x388)](_0x2ed26c['enemy']());for(const _0x1240f8 of _0x3b5ca4){const _0x52fca4=$dataStates[_0x1240f8];if(!_0x52fca4)continue;if(_0x52fca4[_0x1f0ce3(0x386)][_0x1f0ce3(0x167)]()==='')continue;if(_0x52fca4[_0x1f0ce3(0x386)][_0x1f0ce3(0x1f8)](_0x1f0ce3(0x130)))continue;if(!_0x52fca4[_0x1f0ce3(0x28a)])continue;if(_0x52fca4['excludeListing'])continue;const _0x151322=_0x52fca4[_0x1f0ce3(0x386)],_0x3edd95=_0x52fca4[_0x1f0ce3(0x28a)];let _0x11b0fb='0';Imported[_0x1f0ce3(0x364)]&&(_0x11b0fb=String(ColorManager['stateColor'](_0x52fca4)));let _0x439d99='';_0x11b0fb[_0x1f0ce3(0x303)](/#(.*?)/gi)?_0x439d99=_0x1f0ce3(0x221)[_0x1f0ce3(0x1f5)](_0x3edd95,_0x151322,_0x11b0fb):_0x439d99=_0x1f0ce3(0x196)[_0x1f0ce3(0x1f5)](_0x3edd95,_0x151322,_0x11b0fb),this['addCommand'](_0x439d99,_0x1f0ce3(0x223),!![],_0x1240f8);}},Window_BestiarySkills[_0x3a3887(0x3f8)][_0x3a3887(0x2f5)]=function(_0x5b0863){const _0x2222d1=_0x3a3887,_0x4164a8=this['commandSymbol'](_0x5b0863);if(_0x4164a8===_0x2222d1(0x137))this[_0x2222d1(0x37a)](_0x5b0863);else _0x4164a8===_0x2222d1(0x223)?this[_0x2222d1(0x197)](_0x5b0863):this[_0x2222d1(0x3a2)](_0x5b0863);},Window_BestiarySkills[_0x3a3887(0x3f8)][_0x3a3887(0x37a)]=function(_0x394ab9){const _0x477cae=_0x3a3887,_0xd0ce2d=this[_0x477cae(0x38b)](_0x394ab9),_0x554c56=this['commandName'](_0x394ab9);this['resetFontSettings'](),this['changePaintOpacity'](!![]),this[_0x477cae(0x301)](_0x554c56,_0xd0ce2d['x'],_0xd0ce2d['y'],_0xd0ce2d[_0x477cae(0x28f)]);},Window_BestiarySkills[_0x3a3887(0x3f8)][_0x3a3887(0x197)]=function(_0x555353){const _0x20295f=_0x3a3887,_0x31a292=this[_0x20295f(0x38b)](_0x555353),_0x180808=this[_0x20295f(0x13a)](_0x555353);this[_0x20295f(0x171)](),this[_0x20295f(0x2cf)](!![]),this['drawTextEx'](_0x180808,_0x31a292['x'],_0x31a292['y'],_0x31a292[_0x20295f(0x28f)]);},Window_BestiarySkills[_0x3a3887(0x3f8)][_0x3a3887(0x3a2)]=function(_0x11b5d1){const _0x202b7b=_0x3a3887,_0x4c2ce6=this['itemLineRect'](_0x11b5d1),_0x58bb02=this[_0x202b7b(0x13a)](_0x11b5d1),_0xb3c4b5=this[_0x202b7b(0x25b)](_0x58bb02);this['resetFontSettings'](),this[_0x202b7b(0x2cf)](this[_0x202b7b(0x2c7)](_0x11b5d1)),this['drawTextEx'](_0xb3c4b5,_0x4c2ce6['x'],_0x4c2ce6['y'],_0x4c2ce6[_0x202b7b(0x28f)]);},Window_BestiarySkills['prototype'][_0x3a3887(0x25b)]=function(_0x2b46fb){const _0xdb551b=_0x3a3887,_0x393c24=$dataSkills[_0x2b46fb];let _0x51a0f7=_0x393c24[_0xdb551b(0x386)],_0x181b64=_0x393c24['iconIndex'];if(Imported[_0xdb551b(0x3ae)]){const _0x1eed0a=_0x393c24[_0xdb551b(0x256)]||'';_0x1eed0a[_0xdb551b(0x303)](/<DISPLAY ICON: (\d+)>/i)&&(_0x181b64=Number(RegExp['$1'])),_0x1eed0a[_0xdb551b(0x303)](/<DISPLAY TEXT: (.*)>/i)&&(_0x51a0f7=String(RegExp['$1']));}return'\x5cI[%2]%1'[_0xdb551b(0x1f5)](_0x51a0f7,_0x181b64);},Window_BestiarySkills[_0x3a3887(0x3f8)]['updateHelp']=function(){const _0x177694=_0x3a3887,_0x1212cd=this[_0x177694(0x3fd)]();if(_0x1212cd==='aspect'){const _0x2a9d6f=SceneManager[_0x177694(0x3fa)][_0x177694(0x241)](),_0x3b5594=_0x2a9d6f[_0x177694(0x322)]()['description']||'';this[_0x177694(0x272)]['setText'](_0x3b5594);}else{if(_0x1212cd===_0x177694(0x223)){const _0x14674b=this[_0x177694(0x16e)]()?$dataStates[this[_0x177694(0x16e)]()]:null;this[_0x177694(0x272)]['setItem'](_0x14674b);}else{const _0x596ac3=this['currentExt']()?$dataSkills[this[_0x177694(0x16e)]()]:null;this[_0x177694(0x272)][_0x177694(0x3d0)](_0x596ac3);}}};function _0xc564(_0x564452,_0xac30fb){const _0xab9d91=_0xab9d();return _0xc564=function(_0xc56404,_0xdb2d79){_0xc56404=_0xc56404-0x129;let _0x33bd61=_0xab9d91[_0xc56404];return _0x33bd61;},_0xc564(_0x564452,_0xac30fb);}function Window_BestiaryRewards(){const _0x43bd0d=_0x3a3887;this[_0x43bd0d(0x3b6)](...arguments);}Window_BestiaryRewards[_0x3a3887(0x3f8)]=Object[_0x3a3887(0x25f)](Window_Command[_0x3a3887(0x3f8)]),Window_BestiaryRewards['prototype'][_0x3a3887(0x345)]=Window_BestiaryRewards,Window_BestiaryRewards['SETTINGS']={'bgType':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)][_0x3a3887(0x1ed)]??0x0,'rewardsOrder':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Window'][_0x3a3887(0x24a)]??[_0x3a3887(0x1ac),'ap','cp','jp','sp',_0x3a3887(0x203),_0x3a3887(0x1e7)],'expIcon':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Window']['EXP_Icon']??0x57,'goldIcon':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)][_0x3a3887(0x216)]??0x13a},Window_BestiaryRewards[_0x3a3887(0x3f8)]['initialize']=function(_0xa46b96){const _0xd1462e=_0x3a3887;Window_Command[_0xd1462e(0x3f8)][_0xd1462e(0x3b6)][_0xd1462e(0x363)](this,_0xa46b96),this[_0xd1462e(0x30c)](),this[_0xd1462e(0x340)](),this['hide']();},Window_BestiaryRewards['prototype'][_0x3a3887(0x19c)]=function(){const _0x57992f=_0x3a3887;this[_0x57992f(0x2c4)](),this['forceSelect'](0x0),this[_0x57992f(0x299)](0x0,0x0);},Window_BestiaryRewards['prototype'][_0x3a3887(0x34d)]=function(){},Window_BestiaryRewards[_0x3a3887(0x3f8)][_0x3a3887(0x29f)]=function(){const _0x41369c=_0x3a3887,_0x44274a=Window_BestiaryRewards[_0x41369c(0x18d)]['rewardsOrder'];Math[_0x41369c(0x38e)]=!![],SceneManager[_0x41369c(0x3fa)][_0x41369c(0x241)]()[_0x41369c(0x14b)]=undefined;for(const _0x11170e of _0x44274a){if(_0x11170e==='exp')this[_0x41369c(0x14e)]();if(_0x11170e==='ap')this[_0x41369c(0x3cb)]();if(_0x11170e==='cp')this[_0x41369c(0x353)]();if(_0x11170e==='jp')this[_0x41369c(0x374)]();if(_0x11170e==='sp')this[_0x41369c(0x2d6)]();if(_0x11170e==='gold')this[_0x41369c(0x38f)]();if(_0x11170e==='items')this['addItemsCommand']();}Math['_noRandom']=![];},Window_BestiaryRewards['prototype'][_0x3a3887(0x14e)]=function(){const _0x51f496=_0x3a3887,_0x270a25=SceneManager['_scene'][_0x51f496(0x241)](),_0x49d559=_0x270a25['exp'](),_0x14044d=TextManager[_0x51f496(0x152)],_0x33c854=Window_BestiaryRewards[_0x51f496(0x18d)][_0x51f496(0x39e)];let _0x55e9f7=_0x33c854>0x0?_0x51f496(0x302)[_0x51f496(0x1f5)](_0x33c854,_0x14044d):_0x14044d;this[_0x51f496(0x35e)](_0x55e9f7,_0x51f496(0x1b3),!![],_0x49d559);},Window_BestiaryRewards[_0x3a3887(0x3f8)]['addApCommand']=function(){const _0x4140c9=_0x3a3887;if(!Imported[_0x4140c9(0x20e)])return;if(!VisuMZ['SkillLearnSystem']['Settings'][_0x4140c9(0x3ef)]['ShowVictory'])return;const _0x565048=SceneManager[_0x4140c9(0x3fa)]['enemy'](),_0x302d3c=_0x565048[_0x4140c9(0x2dd)](),_0x2ba712=TextManager[_0x4140c9(0x1ad)],_0x3a9535=ImageManager['abilityPointsIcon'];let _0x65de66=_0x3a9535>0x0?_0x4140c9(0x302)['format'](_0x3a9535,_0x2ba712):_0x2ba712;this['addCommand'](_0x65de66,_0x4140c9(0x1b3),!![],_0x302d3c);},Window_BestiaryRewards['prototype']['addCpCommand']=function(){const _0x5ec55a=_0x3a3887;if(!Imported[_0x5ec55a(0x37c)])return;if(!VisuMZ[_0x5ec55a(0x14f)][_0x5ec55a(0x3d6)][_0x5ec55a(0x189)][_0x5ec55a(0x199)])return;const _0x300323=SceneManager['_scene'][_0x5ec55a(0x241)](),_0x1567c0=_0x300323[_0x5ec55a(0x3c0)](),_0x3c3357=TextManager[_0x5ec55a(0x205)],_0x4d823c=ImageManager['classPointsIcon'];let _0x2524b9=_0x4d823c>0x0?'\x5cI[%1]%2'[_0x5ec55a(0x1f5)](_0x4d823c,_0x3c3357):_0x3c3357;this['addCommand'](_0x2524b9,'rewards',!![],_0x1567c0);},Window_BestiaryRewards[_0x3a3887(0x3f8)][_0x3a3887(0x374)]=function(){const _0x1e0bc3=_0x3a3887;if(!Imported[_0x1e0bc3(0x37c)])return;if(!VisuMZ[_0x1e0bc3(0x14f)][_0x1e0bc3(0x3d6)][_0x1e0bc3(0x35f)][_0x1e0bc3(0x199)])return;const _0x425ada=SceneManager[_0x1e0bc3(0x3fa)][_0x1e0bc3(0x241)](),_0x33ded8=_0x425ada['jobPoints'](),_0x2688b7=TextManager[_0x1e0bc3(0x13e)],_0x47700b=ImageManager[_0x1e0bc3(0x145)];let _0x35f326=_0x47700b>0x0?_0x1e0bc3(0x302)[_0x1e0bc3(0x1f5)](_0x47700b,_0x2688b7):_0x2688b7;this['addCommand'](_0x35f326,_0x1e0bc3(0x1b3),!![],_0x33ded8);},Window_BestiaryRewards[_0x3a3887(0x3f8)][_0x3a3887(0x2d6)]=function(){const _0x496135=_0x3a3887;if(!Imported[_0x496135(0x20e)])return;if(!VisuMZ[_0x496135(0x289)]['Settings']['SkillPoints']['ShowVictory'])return;const _0x14ae51=SceneManager[_0x496135(0x3fa)][_0x496135(0x241)](),_0x48126d=_0x14ae51['skillPoints'](),_0x493ca3=TextManager[_0x496135(0x219)],_0x1067ff=ImageManager['skillPointsIcon'];let _0x23d5a6=_0x1067ff>0x0?_0x496135(0x302)[_0x496135(0x1f5)](_0x1067ff,_0x493ca3):_0x493ca3;this['addCommand'](_0x23d5a6,_0x496135(0x1b3),!![],_0x48126d);},Window_BestiaryRewards[_0x3a3887(0x3f8)][_0x3a3887(0x38f)]=function(){const _0x1325bc=_0x3a3887,_0x4ddab4=SceneManager['_scene'][_0x1325bc(0x241)](),_0x2a8725=_0x4ddab4[_0x1325bc(0x203)](),_0x54956e=TextManager['currencyUnit'],_0x151da5=Window_BestiaryRewards[_0x1325bc(0x18d)]['goldIcon'];let _0x24cd6e=_0x151da5>0x0?'\x5cI[%1]%2'[_0x1325bc(0x1f5)](_0x151da5,_0x54956e):_0x54956e;this[_0x1325bc(0x35e)](_0x24cd6e,_0x1325bc(0x1b3),!![],_0x2a8725);},Window_BestiaryRewards[_0x3a3887(0x3f8)][_0x3a3887(0x370)]=function(){const _0x38f45e=_0x3a3887;this[_0x38f45e(0x3f4)](),this['addEnemyDatabaseDrops'](),this[_0x38f45e(0x320)](),this['addSortedEnemyDrops']();},Window_BestiaryRewards[_0x3a3887(0x3f8)]['makeEmptyGroups']=function(){const _0x4a66e5=_0x3a3887;this[_0x4a66e5(0x248)]={};const _0x1aba74=[_0x4a66e5(0x254),'chance50',_0x4a66e5(0x191),_0x4a66e5(0x309),_0x4a66e5(0x369),_0x4a66e5(0x232)],_0x4fd298=[_0x4a66e5(0x1e7),'weapons',_0x4a66e5(0x1c0)];for(const _0x4cf17d of _0x1aba74){for(const _0x1f6abc of _0x4fd298){this[_0x4a66e5(0x248)][_0x4cf17d]=this[_0x4a66e5(0x248)][_0x4cf17d]||{},this[_0x4a66e5(0x248)][_0x4cf17d][_0x1f6abc]=this[_0x4a66e5(0x248)][_0x4cf17d][_0x1f6abc]||[];}}},VisuMZ['Bestiary']['GetItemObj']=function(_0x58f3fc,_0xdd88a8){if(_0x58f3fc===0x1)return $dataItems[_0xdd88a8];if(_0x58f3fc===0x2)return $dataWeapons[_0xdd88a8];if(_0x58f3fc===0x3)return $dataArmors[_0xdd88a8];return null;},VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x1b2)]=function(_0x54321a){const _0x1a59d1=_0x3a3887,_0x54581f=TextManager['Bestiary'][_0x1a59d1(0x3ea)];if(_0x54321a>=0x1)return _0x54581f[_0x1a59d1(0x254)];else{if(_0x54321a>=0.5)return _0x54581f[_0x1a59d1(0x138)];else{if(_0x54321a>=0.2)return _0x54581f['chance20'];else return _0x54321a>=0.1?_0x54581f['chance10']:_0x54581f[_0x1a59d1(0x369)];}}},Window_BestiaryRewards['prototype'][_0x3a3887(0x3f0)]=function(_0x23a4b6,_0x325152){const _0x29aa66=_0x3a3887;if(!_0x23a4b6)return;const _0xc590f2=TextManager[_0x29aa66(0x2c6)][_0x29aa66(0x3ea)],_0x32323d=[_0x29aa66(0x254),_0x29aa66(0x138),'chance20',_0x29aa66(0x309),_0x29aa66(0x369),_0x29aa66(0x232)];let _0xff0999='';for(const _0x2c88a3 of _0x32323d){if(_0x325152===_0xc590f2[_0x2c88a3])_0xff0999=_0x2c88a3;}let _0x11a8d1='';if(DataManager['isItem'](_0x23a4b6))_0x11a8d1='items';if(DataManager[_0x29aa66(0x2c8)](_0x23a4b6))_0x11a8d1=_0x29aa66(0x3cc);if(DataManager['isArmor'](_0x23a4b6))_0x11a8d1=_0x29aa66(0x1c0);this[_0x29aa66(0x248)][_0xff0999][_0x11a8d1][_0x29aa66(0x39d)](_0x23a4b6);},Window_BestiaryRewards[_0x3a3887(0x3f8)][_0x3a3887(0x252)]=function(){const _0x332987=_0x3a3887,_0x1309a8=SceneManager[_0x332987(0x3fa)][_0x332987(0x241)](),_0x3057ae=_0x1309a8[_0x332987(0x241)]()['dropItems'];if(!_0x3057ae)return;for(const _0x28165f of _0x3057ae){if(_0x28165f['kind']<=0x0)continue;const _0x8c9e96=0x1/Math[_0x332987(0x134)](_0x28165f[_0x332987(0x2e5)],0x1),_0x140517=VisuMZ['Bestiary'][_0x332987(0x36a)](_0x28165f['kind'],_0x28165f[_0x332987(0x2e0)]),_0x25d6d3=VisuMZ[_0x332987(0x2c6)]['GetDropRateText'](_0x8c9e96);this['addItemToGroup'](_0x140517,_0x25d6d3);}},Window_BestiaryRewards['prototype'][_0x3a3887(0x320)]=function(){const _0x48c624=_0x3a3887;if(!Imported[_0x48c624(0x33f)])return;const _0x2a32a3=SceneManager[_0x48c624(0x3fa)][_0x48c624(0x241)](),_0x1f4ffd=_0x2a32a3[_0x48c624(0x241)]()['note']||'',_0x8d0567=_0x1f4ffd[_0x48c624(0x350)](/[\r\n]+/),_0x4bc6bf=TextManager[_0x48c624(0x2c6)][_0x48c624(0x3ea)][_0x48c624(0x232)];for(const _0x30be4a of _0x8d0567){if(_0x30be4a[_0x48c624(0x303)](/<CONDITIONAL (ITEM|WEAPON|ARMOR) (\d+)[ ](?:THROUGH|to)[ ](\d+) (?:DROP|DROPS)>/i)){const _0x539e40=VisuMZ[_0x48c624(0x182)][_0x48c624(0x36e)](RegExp['$1']),_0x160412=Number(RegExp['$2']),_0x35a3dd=Number(RegExp['$3']);for(let _0x5ee4ce=_0x160412;_0x5ee4ce<=_0x35a3dd;_0x5ee4ce++){const _0x1d54b9=_0x539e40[_0x5ee4ce]||null;_0x1d54b9&&_0x1d54b9['name'][_0x48c624(0x167)]()!==''&&!_0x1d54b9[_0x48c624(0x386)][_0x48c624(0x303)](/-----/i)&&this[_0x48c624(0x3f0)](_0x1d54b9,_0x4bc6bf);}}if(_0x30be4a['match'](/<CONDITIONAL (ITEM|WEAPON|ARMOR) (\d+) (?:DROP|DROPS)>/i)){const _0x45948c=VisuMZ[_0x48c624(0x182)][_0x48c624(0x36e)](RegExp['$1']),_0xe9d711=Number(RegExp['$2']),_0x33c469=_0x45948c[_0xe9d711];this['addItemToGroup'](_0x33c469,_0x4bc6bf);}if(_0x30be4a[_0x48c624(0x303)](/<CONDITIONAL (ITEM|WEAPON|ARMOR) (.*) (?:DROP|DROPS)>/i)){const _0x476d10=VisuMZ['ExtraEnemyDrops']['getDatabaseItem'](RegExp['$1'],RegExp['$2']);this[_0x48c624(0x3f0)](_0x476d10,_0x4bc6bf);}}},Window_BestiaryRewards[_0x3a3887(0x3f8)]['addItemDropCommand']=function(_0x493880,_0x34e5b0){const _0x1bd9a4=_0x3a3887;if(!_0x493880)return;const _0x1a8d11=_0x493880[_0x1bd9a4(0x386)],_0x43a00e=_0x493880[_0x1bd9a4(0x28a)];let _0x46dca0=_0x43a00e>0x0?_0x1bd9a4(0x302)[_0x1bd9a4(0x1f5)](_0x43a00e,_0x1a8d11):_0x1a8d11;this[_0x1bd9a4(0x35e)](_0x46dca0,_0x1bd9a4(0x1b3),!![],_0x34e5b0);},Window_BestiaryRewards[_0x3a3887(0x3f8)][_0x3a3887(0x1ee)]=function(){const _0x34afc0=_0x3a3887,_0x5121b4=['chance100',_0x34afc0(0x138),'chance20',_0x34afc0(0x309),_0x34afc0(0x369),_0x34afc0(0x232)],_0x5eb9d8=[_0x34afc0(0x1e7),_0x34afc0(0x3cc),_0x34afc0(0x1c0)];for(const _0x1f1449 of _0x5121b4){for(const _0x38febc of _0x5eb9d8){let _0x4433e3=this[_0x34afc0(0x248)][_0x1f1449][_0x38febc];_0x4433e3=_0x4433e3[_0x34afc0(0x2ba)]((_0x19151f,_0x291613)=>_0x19151f['id']-_0x291613['id']);for(const _0x4fdb31 of _0x4433e3){const _0x207a96=TextManager[_0x34afc0(0x2c6)]['rewardsWindow'][_0x1f1449];this[_0x34afc0(0x315)](_0x4fdb31,_0x207a96);}}}},Window_BestiaryRewards[_0x3a3887(0x3f8)][_0x3a3887(0x2f5)]=function(_0x476432){const _0x15041a=_0x3a3887,_0x888d5f=this[_0x15041a(0x38b)](_0x476432),_0x5d9584=this[_0x15041a(0x13a)](_0x476432),_0x49bee5=String(this[_0x15041a(0x2b4)][_0x476432]['ext']);this['resetFontSettings'](),this['changePaintOpacity'](this[_0x15041a(0x2c7)](_0x476432)),this[_0x15041a(0x301)](_0x5d9584,_0x888d5f['x'],_0x888d5f['y'],_0x888d5f[_0x15041a(0x28f)]);const _0x549979=_0x888d5f['x']+(_0x888d5f[_0x15041a(0x28f)]-this[_0x15041a(0x26d)](_0x49bee5)[_0x15041a(0x28f)]);this[_0x15041a(0x301)](_0x49bee5,_0x549979,_0x888d5f['y'],_0x888d5f[_0x15041a(0x28f)]);};function Window_BestiaryTraits(){this['initialize'](...arguments);}Window_BestiaryTraits['prototype']=Object[_0x3a3887(0x25f)](Window_Command[_0x3a3887(0x3f8)]),Window_BestiaryTraits[_0x3a3887(0x3f8)][_0x3a3887(0x345)]=Window_BestiaryTraits,Window_BestiaryTraits[_0x3a3887(0x18d)]={'bgType':VisuMZ['Bestiary']['Settings'][_0x3a3887(0x1dd)]['TraitsWindow_BgType']??0x0,'displayAllTraitTypes':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Window'][_0x3a3887(0x2fc)]??![]},Window_BestiaryTraits[_0x3a3887(0x3f8)][_0x3a3887(0x3b6)]=function(_0x280c7a){const _0x136440=_0x3a3887;this[_0x136440(0x318)](),Window_Command[_0x136440(0x3f8)][_0x136440(0x3b6)][_0x136440(0x363)](this,_0x280c7a),this[_0x136440(0x30c)](),this[_0x136440(0x340)](),this['hide']();},Window_BestiaryTraits[_0x3a3887(0x3f8)]['initCategoryStatus']=function(){const _0x12b20e=_0x3a3887;this[_0x12b20e(0x366)]={};const _0xf7ee13=[_0x12b20e(0x3b3),_0x12b20e(0x1c2),_0x12b20e(0x3a5),'Race',_0x12b20e(0x31c),'Alignment',_0x12b20e(0x18e),_0x12b20e(0x339),_0x12b20e(0x217),_0x12b20e(0x3e6)];for(const _0x10bc05 of _0xf7ee13){this[_0x12b20e(0x366)][_0x10bc05['toLowerCase']()['trim']()]=!![];}},Window_BestiaryTraits[_0x3a3887(0x3f8)][_0x3a3887(0x343)]=function(){return![];},Window_BestiaryTraits[_0x3a3887(0x3f8)][_0x3a3887(0x19c)]=function(){const _0x58399b=_0x3a3887;this[_0x58399b(0x2c4)](),this[_0x58399b(0x169)](0x0),this[_0x58399b(0x299)](0x0,0x0),this[_0x58399b(0x272)]&&this[_0x58399b(0x272)]['show']();},Window_BestiaryTraits['prototype'][_0x3a3887(0x34d)]=function(){const _0x55ed05=_0x3a3887;if(this['currentSymbol']()==='category')SoundManager[_0x55ed05(0x288)]();else{if(this[_0x55ed05(0x3fd)]()==='trait'){const _0x760c16=this['currentExt'](),_0x1a9fc1=SceneManager[_0x55ed05(0x3fa)][_0x55ed05(0x241)]();enabled=_0x1a9fc1[_0x55ed05(0x379)](_0x760c16[0x0])[_0x55ed05(0x37e)]()[_0x55ed05(0x167)]()===_0x760c16[0x1][_0x55ed05(0x37e)]()[_0x55ed05(0x167)]();if(!enabled)SoundManager['playEquip']();}}},Window_BestiaryTraits[_0x3a3887(0x3f8)][_0x3a3887(0x29f)]=function(){const _0x21de72=_0x3a3887,_0x51c38e=SceneManager[_0x21de72(0x3fa)]['enemy']();if(!_0x51c38e)return;const _0x562970=_0x51c38e[_0x21de72(0x12c)]();for(const _0xd632bb of _0x562970){if(!this[_0x21de72(0x212)](_0xd632bb,_0x51c38e))continue;this['addTraitCommand'](_0xd632bb),this[_0x21de72(0x258)](_0xd632bb);}},Window_BestiaryTraits[_0x3a3887(0x3f8)][_0x3a3887(0x212)]=function(_0x253c92,_0x56c72b){const _0x4c989f=_0x3a3887,_0x134d6a=DataManager['traitSetType'](_0x253c92);if(!_0x134d6a)return![];if(!_0x134d6a['Visible'])return![];return Window_BestiaryTraits[_0x4c989f(0x18d)][_0x4c989f(0x249)]?!![]:_0x56c72b&&_0x56c72b['getTraitSet'](_0x253c92)!=='';},Window_BestiaryTraits['prototype']['addTraitCommand']=function(_0x3f9ab5){const _0x222558=_0x3a3887,_0x8dfdbd=this[_0x222558(0x347)](_0x3f9ab5)?TextManager[_0x222558(0x2c6)][_0x222558(0x269)]['openCategoriesFmt']:TextManager[_0x222558(0x2c6)][_0x222558(0x269)][_0x222558(0x1a8)],_0x4865df=DataManager[_0x222558(0x3f9)](_0x3f9ab5),_0x5383a8=_0x8dfdbd[_0x222558(0x1f5)](_0x4865df[_0x222558(0x1cd)]);this[_0x222558(0x35e)](_0x5383a8,_0x222558(0x3a6),!![],_0x3f9ab5);},Window_BestiaryTraits[_0x3a3887(0x3f8)]['isCategoryOpen']=function(_0x39cbfe){const _0x8cdabd=_0x3a3887;return _0x39cbfe=_0x39cbfe['toLowerCase']()[_0x8cdabd(0x167)](),this['_categoryStatus'][_0x39cbfe];},Window_BestiaryTraits[_0x3a3887(0x3f8)]['openCloseCurrentCategory']=function(){const _0x5a4e67=_0x3a3887,_0x281665=this[_0x5a4e67(0x3b9)]()[_0x5a4e67(0x1a7)]()[_0x5a4e67(0x167)]();this[_0x5a4e67(0x366)][_0x281665]=!this['_categoryStatus'][_0x281665],this[_0x5a4e67(0x392)]();},Window_BestiaryTraits[_0x3a3887(0x3f8)][_0x3a3887(0x3b9)]=function(){const _0x33513b=_0x3a3887;return this[_0x33513b(0x3fd)]()===_0x33513b(0x3a6)?this[_0x33513b(0x16e)]():null;},Window_BestiaryTraits[_0x3a3887(0x3f8)][_0x3a3887(0x258)]=function(_0x57b432){const _0x355bdf=_0x3a3887;if(!this['isCategoryOpen'](_0x57b432))return;const _0x14c060=SceneManager['_scene'][_0x355bdf(0x241)](),_0x114a61=VisuMZ[_0x355bdf(0x2c6)][_0x355bdf(0x30b)](_0x57b432,_0x14c060);if(_0x114a61[_0x355bdf(0x33e)]<=0x0){const _0x2bf47b=_0x14c060[_0x355bdf(0x379)](_0x57b432);this['makeTraitCommand'](_0x57b432,_0x2bf47b,_0x14c060);}else for(const _0x2983ec of _0x114a61){this[_0x355bdf(0x2b3)](_0x57b432,_0x2983ec,_0x14c060);}},Window_BestiaryTraits[_0x3a3887(0x3f8)]['makeTraitCommand']=function(_0x142cc9,_0x7a12cc,_0x4293e2){const _0x18bacd=_0x3a3887,_0x4dddb8=DataManager[_0x18bacd(0x2c0)](_0x142cc9,_0x7a12cc);this[_0x18bacd(0x35e)]('\x20\x20'+_0x4dddb8[_0x18bacd(0x188)],_0x18bacd(0x3fc),!![],[_0x142cc9,_0x7a12cc]);},Window_BestiaryTraits['prototype'][_0x3a3887(0x2f5)]=function(_0x4c12ab){const _0x1d952b=_0x3a3887,_0x2d8691=this[_0x1d952b(0x38b)](_0x4c12ab),_0x2a10f2=this['commandName'](_0x4c12ab);this[_0x1d952b(0x171)]();let _0x158c7b=!![];if(this[_0x1d952b(0x2b9)](_0x4c12ab)==='trait'){const _0x2a6a41=this['_list'][_0x4c12ab][_0x1d952b(0x295)],_0x29678e=SceneManager[_0x1d952b(0x3fa)][_0x1d952b(0x241)]();_0x158c7b=_0x29678e[_0x1d952b(0x379)](_0x2a6a41[0x0])['toUpperCase']()[_0x1d952b(0x167)]()===_0x2a6a41[0x1][_0x1d952b(0x37e)]()[_0x1d952b(0x167)]();}this[_0x1d952b(0x2cf)](_0x158c7b),this[_0x1d952b(0x301)](_0x2a10f2,_0x2d8691['x'],_0x2d8691['y'],_0x2d8691[_0x1d952b(0x28f)]);},Window_BestiaryTraits['prototype'][_0x3a3887(0x1d5)]=function(){const _0x1a613c=_0x3a3887;if(this['currentSymbol']()===_0x1a613c(0x3a6))this[_0x1a613c(0x272)][_0x1a613c(0x36c)](TextManager['Bestiary']['traitsWindow']['traitHelp']);else{if(this[_0x1a613c(0x3fd)]()===_0x1a613c(0x3fc)){const _0x800906=this[_0x1a613c(0x16e)](),_0x10bdd9=DataManager['traitSet'](_0x800906[0x0],_0x800906[0x1]);this['_helpWindow'][_0x1a613c(0x36c)](_0x10bdd9?_0x10bdd9[_0x1a613c(0x3b8)]||'':'');}else this[_0x1a613c(0x3fd)]()===null&&this[_0x1a613c(0x272)][_0x1a613c(0x36c)](TextManager[_0x1a613c(0x2c6)]['traitsWindow'][_0x1a613c(0x18a)]);}};function Window_BestiaryLore(){const _0x393f25=_0x3a3887;this[_0x393f25(0x3b6)](...arguments);}Window_BestiaryLore[_0x3a3887(0x3f8)]=Object[_0x3a3887(0x25f)](Window_Selectable[_0x3a3887(0x3f8)]),Window_BestiaryLore['prototype'][_0x3a3887(0x345)]=Window_BestiaryLore,Window_BestiaryLore[_0x3a3887(0x18d)]={'bgType':VisuMZ['Bestiary'][_0x3a3887(0x3d6)]['Window'][_0x3a3887(0x247)]??0x0,'fontSize':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Window']['LoreWindow_FontSize']??0x16,'autoWordWrap':VisuMZ[_0x3a3887(0x2c6)]['Settings']['Window'][_0x3a3887(0x2e6)]??![],'slowScrollSpeed':VisuMZ['Bestiary'][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)][_0x3a3887(0x274)]??0x8,'fastScrollSpeed':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)][_0x3a3887(0x397)]??0x20,'slowSoundFrequency':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)]['Window']['SlowSoundFreq']??0x8,'fastSoundFrequency':VisuMZ[_0x3a3887(0x2c6)][_0x3a3887(0x3d6)][_0x3a3887(0x1dd)]['FastSoundFreq']??0x4},Window_BestiaryLore[_0x3a3887(0x3f8)][_0x3a3887(0x3b6)]=function(_0x3b8abd){const _0x23e090=_0x3a3887;this[_0x23e090(0x28b)]='',Window_Selectable['prototype']['initialize'][_0x23e090(0x363)](this,_0x3b8abd),this['deactivate'](),this['deselect'](),this['hide']();},Window_BestiaryLore['prototype']['resetFontSettings']=function(){const _0x4b8380=_0x3a3887;Window_Selectable[_0x4b8380(0x3f8)][_0x4b8380(0x171)][_0x4b8380(0x363)](this),this[_0x4b8380(0x399)][_0x4b8380(0x354)]=Window_BestiaryLore[_0x4b8380(0x18d)][_0x4b8380(0x354)];},Window_BestiaryLore[_0x3a3887(0x3f8)]['refresh']=function(){const _0x3eb19f=_0x3a3887;this[_0x3eb19f(0x3f6)](),this[_0x3eb19f(0x1f4)](),this['createContents'](),this['drawAllText']();},Window_BestiaryLore[_0x3a3887(0x3f8)][_0x3a3887(0x1f4)]=function(){const _0x3992af=_0x3a3887,_0x1ec860=this[_0x3992af(0x28b)];this['_allTextHeight']=0x0,this['_allTextHeight']=this[_0x3992af(0x26d)](_0x1ec860)[_0x3992af(0x327)];},Window_BestiaryLore[_0x3a3887(0x3f8)][_0x3a3887(0x18f)]=function(){const _0x48db09=_0x3a3887;return Math['max'](this[_0x48db09(0x2ae)],0x1);},Window_BestiaryLore[_0x3a3887(0x3f8)][_0x3a3887(0x19c)]=function(){const _0x1a8471=_0x3a3887;this[_0x1a8471(0x2c4)](),this['scrollTo'](0x0,0x0);},Window_BestiaryLore[_0x3a3887(0x3f8)][_0x3a3887(0x3f6)]=function(){const _0x100718=_0x3a3887,_0x392ad0=SceneManager[_0x100718(0x3fa)]['enemy'](),_0x30d3ad=TextManager[_0x100718(0x12d)](_0x392ad0);this[_0x100718(0x36c)](_0x30d3ad);},Window_BestiaryLore[_0x3a3887(0x3f8)][_0x3a3887(0x36c)]=function(_0x283e8c){const _0x3719e4=_0x3a3887;if(_0x283e8c===this[_0x3719e4(0x28b)])return;Imported[_0x3719e4(0x364)]&&Window_BestiaryLore[_0x3719e4(0x18d)]['autoWordWrap']&&(_0x283e8c='<WordWrap>'+_0x283e8c),this[_0x3719e4(0x28b)]=_0x283e8c;},Window_BestiaryLore['prototype']['drawAllText']=function(){const _0x286323=_0x3a3887,_0x320c40=this[_0x286323(0x28b)];this[_0x286323(0x171)](),this[_0x286323(0x3a8)](_0x320c40);if(Imported[_0x286323(0x364)])this['resetWordWrap']();this['scrollToTop']();},Window_BestiaryLore[_0x3a3887(0x3f8)]['drawMessageText']=function(_0x2eeaef){const _0x297bd5=_0x3a3887;this['drawTextEx'](_0x2eeaef,0x0,0x0,this[_0x297bd5(0x2f0)]);},Window_BestiaryLore[_0x3a3887(0x3f8)][_0x3a3887(0x277)]=function(){},Window_BestiaryLore[_0x3a3887(0x3f8)][_0x3a3887(0x368)]=function(){const _0x4fe1f1=_0x3a3887;if(!this[_0x4fe1f1(0x19f)])return;if(Input[_0x4fe1f1(0x15f)](_0x4fe1f1(0x34a)))this[_0x4fe1f1(0x2db)](!![]);else{if(Input['isPressed']('up'))this[_0x4fe1f1(0x2db)](![]);else{if(Input[_0x4fe1f1(0x15f)]('pagedown'))this[_0x4fe1f1(0x3e5)](!![]);else{if(Input[_0x4fe1f1(0x15f)](_0x4fe1f1(0x17f)))this['processFastScroll'](![]);else{if(Input['isTriggered'](_0x4fe1f1(0x1f2)))this['scrollToTop'](!![]);else Input[_0x4fe1f1(0x331)]('end')&&this[_0x4fe1f1(0x1c7)](!![]);}}}}},Window_BestiaryLore[_0x3a3887(0x3f8)]['processSlowScroll']=function(_0x4bb97f){const _0x432ec6=_0x3a3887;let _0x32e3d4=this[_0x432ec6(0x3d5)]['y'];this[_0x432ec6(0x3d5)]['y']+=(_0x4bb97f?0x1:-0x1)*Window_BestiaryLore[_0x432ec6(0x18d)][_0x432ec6(0x328)];let _0x31ce6d=Math[_0x432ec6(0x134)](0x0,this['_allTextHeight']-this['innerHeight']);this[_0x432ec6(0x3d5)]['y']=this[_0x432ec6(0x3d5)]['y'][_0x432ec6(0x38d)](0x0,_0x31ce6d);if(_0x32e3d4!==this[_0x432ec6(0x3d5)]['y']&&Graphics[_0x432ec6(0x1b5)]%Window_BestiaryLore[_0x432ec6(0x18d)][_0x432ec6(0x31f)]===0x0)this[_0x432ec6(0x1e0)]();},Window_BestiaryLore['prototype']['processFastScroll']=function(_0x2009df){const _0x5c5b93=_0x3a3887;let _0x58cc13=this[_0x5c5b93(0x3d5)]['y'];this['origin']['y']+=(_0x2009df?0x1:-0x1)*Window_BestiaryLore['SETTINGS']['fastScrollSpeed'];let _0x58edbf=Math['max'](0x0,this['_allTextHeight']-this[_0x5c5b93(0x286)]);this[_0x5c5b93(0x3d5)]['y']=this['origin']['y'][_0x5c5b93(0x38d)](0x0,_0x58edbf);if(_0x58cc13!==this[_0x5c5b93(0x3d5)]['y']&&Graphics[_0x5c5b93(0x1b5)]%Window_BestiaryLore[_0x5c5b93(0x18d)]['fastSoundFrequency']===0x0)this['playCursorSound']();},Window_BestiaryLore[_0x3a3887(0x3f8)]['scrollToTop']=function(_0x155e4d){const _0x50c550=_0x3a3887;let _0x261d7d=this[_0x50c550(0x3d5)]['y'];this[_0x50c550(0x3d5)]['y']=0x0;if(_0x155e4d&&_0x261d7d!==this[_0x50c550(0x3d5)]['y'])this[_0x50c550(0x1e0)]();},Window_BestiaryLore['prototype']['scrollToBottom']=function(_0x4bafe8){const _0x2abe07=_0x3a3887;let _0x11f8ff=this['origin']['y'],_0x285ee7=Math[_0x2abe07(0x134)](0x0,this[_0x2abe07(0x2ae)]-this['innerHeight']);this[_0x2abe07(0x3d5)]['y']=_0x285ee7;if(_0x4bafe8&&_0x11f8ff!==this[_0x2abe07(0x3d5)]['y'])this['playCursorSound']();},Window_BestiaryLore['prototype'][_0x3a3887(0x3c1)]=function(){const _0x2934ea=_0x3a3887;this[_0x2934ea(0x213)]=this[_0x2934ea(0x3d5)]['y']<this[_0x2934ea(0x2ae)]-this[_0x2934ea(0x286)],this[_0x2934ea(0x306)]=this['origin']['y']>0x0;},Window_BestiaryLore[_0x3a3887(0x3f8)][_0x3a3887(0x1b0)]=function(_0x2f8555,_0x4d1773){const _0x5c571e=_0x3a3887;this['origin']['y']+=_0x4d1773;let _0x2cf3e6=Math['max'](0x0,this['_allTextHeight']-this[_0x5c571e(0x286)]);this['origin']['y']=this['origin']['y'][_0x5c571e(0x38d)](0x0,_0x2cf3e6);},Window_BestiaryLore[_0x3a3887(0x3f8)][_0x3a3887(0x268)]=function(_0x5d6cf5,_0x13f95a){const _0x2582de=_0x3a3887;this['origin']['y']+=_0x13f95a;let _0x480759=Math[_0x2582de(0x134)](0x0,this[_0x2582de(0x2ae)]-this['innerHeight']);this[_0x2582de(0x3d5)]['y']=this[_0x2582de(0x3d5)]['y'][_0x2582de(0x38d)](0x0,_0x480759);};