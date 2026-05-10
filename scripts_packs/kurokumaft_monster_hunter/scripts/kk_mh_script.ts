import { Entity, system, world } from "@minecraft/server";
import { MHCustomComponentRegistry } from "./custom/MHCustomComponentRegistry";
import { setItemLore } from "./items/MHItemFunction";
import { setGuardOperation } from "./player/MHPlayerInputOperation";
import { startMHMonsterAction } from "./monster/MHMonsterFunction";
import { MHMonsterManager } from "./monster/MHMonsterManager";
import { hitMHMeatRoaster } from "./other/MHMeatRoasterManager";
import { startMHInsectAction } from "./insect/MHInsectFunction";
import { MHInsectManager } from "./insect/MHInsectManager";

system.beforeEvents.startup.subscribe(initEvent => {
  MHCustomComponentRegistry(initEvent);
});

world.afterEvents.entityLoad.subscribe(event => {
  const entity = event.entity as Entity;
  startMHMonsterAction(entity);
  startMHInsectAction(entity);
});

world.afterEvents.entityRemove.subscribe(event => {
  MHMonsterManager.removeMonster(event.removedEntityId);
  MHInsectManager.removeInsect(event.removedEntityId);
});

world.afterEvents.playerInventoryItemChange.subscribe(event => {
  setItemLore(event);
});

world.afterEvents.playerInteractWithEntity.subscribe(event => {
  MHMonsterManager.peelingMHMonster(event.target, event.itemStack);
  MHInsectManager.huntingMHInsect(event.target, event.itemStack);
});

world.afterEvents.entityHitEntity.subscribe(event => {
  MHMonsterManager.damageMonster(event.hitEntity, event.damagingEntity);
  MHInsectManager.damageInsect(event.hitEntity);
  hitMHMeatRoaster(event.hitEntity, event.damagingEntity);
});

world.afterEvents.playerButtonInput.subscribe(event => {
  setGuardOperation(event);
});

world.afterEvents.entitySpawn.subscribe(event => {
  const entity = event.entity as Entity;
  startMHMonsterAction(entity);
  startMHInsectAction(entity);
});

world.afterEvents.itemCompleteUse.subscribe(event => {
});
