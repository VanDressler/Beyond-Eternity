/*:
 * @target MZ
 * @plugindesc [Custom] Dodaje wyświetlanie AP (Ability Points) w standardowym menu umiejętności obok HP/MP. Współpracuje z VisuStella Skill Learn System. @Łukasz
 * @author Łukasz
 *
 * @help
 * Ten plugin dodaje liczbę punktów AP postaci w menu SKILL.
 * AP są wyświetlane w dolnej części okna statusu, obok HP i MP.
 *
 * Wymaga VisuMZ_2_SkillLearnSystem.
 */

(() => {
  const _Window_SkillStatus_drawActorSimpleStatus = Window_SkillStatus.prototype.drawActorSimpleStatus;
  Window_SkillStatus.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    _Window_SkillStatus_drawActorSimpleStatus.call(this, actor, x, y, width);

    const lineHeight = this.lineHeight();
    const apY = y + lineHeight * 2.1;

    if (actor && actor.currentClass && actor.currentClass()) {
      const classId = actor.currentClass().id;
      if (actor.getAbilityPoints) {
        const ap = actor.getAbilityPoints(classId);
        const label = "AP:";
        const value = String(ap);
        const labelWidth = this.textWidth(label + " ");
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(label, x, apY, labelWidth, "left");
        this.resetTextColor();
        this.drawText(value, x + labelWidth, apY, width - labelWidth, "left");
      }
    }
  };
})();
