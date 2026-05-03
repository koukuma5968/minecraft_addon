import { Entity, ItemStack } from "@minecraft/server";
import { MHMonsterActionInterface } from "./action/MHMonsterActionInterface";

export class MHMonsterManager {
  static monsters: Map<string, MHMonsterActionInterface> = new Map();

  static addMonster(monster: Entity, action: MHMonsterActionInterface) {
    this.monsters.set(monster.id, action);
    action.startPeaceTimeActionControl();
  }

  static removeMonster(id: string) {
    this.monsters.delete(id);
  }

  static damageMonster(hitEntity: Entity, damagingEntity: Entity) {
    const monster = this.monsters.get(hitEntity.id);
    if (monster !== undefined) {
      monster.damageAction(damagingEntity);
    }
  }

  static peelingMHMonster(target: Entity, itemStack: ItemStack|undefined) {
    if (itemStack !== undefined && "kurokumaft:peeling_knife" === itemStack.typeId) {
      const monster = this.monsters.get(target.id);
      if (monster !== undefined) {
        monster.peelingDrop();
      }
    }
  }

}