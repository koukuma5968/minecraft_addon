import { Entity } from "@minecraft/server";

export interface MHMonsterActionInterface {

  startPeaceTimeActionControl(): void;
  startHostileActionControl(): void;
  damageAction(damagingEntity: Entity): void;
  peelingDrop(): void;
}