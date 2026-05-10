import { Entity, ItemStack } from "@minecraft/server";
import { MHInsectActionInterface } from "./action/MHInsectActionInterface";

export class MHInsectManager {
  static insect: Map<string, MHInsectActionInterface> = new Map();

  static addInsect(insect: Entity, action: MHInsectActionInterface) {
    this.insect.set(insect.id, action);
    action.startPeaceTimeActionControl();
  }

  static removeInsect(id: string) {
    this.insect.delete(id);
  }

  static damageInsect(hitEntity: Entity) {
    const monster = this.insect.get(hitEntity.id);
    if (monster !== undefined) {
      monster.damageAction();
    }
  }

  static huntingMHInsect(target: Entity, itemStack: ItemStack|undefined) {
    if (itemStack !== undefined && "kurokumaft:insect_net" === itemStack.typeId) {
      const insect = this.insect.get(target.id);
      if (insect !== undefined) {
        insect.huntingDrop();
      }
    }
  }

}