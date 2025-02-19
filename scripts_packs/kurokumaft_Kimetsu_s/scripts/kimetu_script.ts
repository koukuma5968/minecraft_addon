import { world,system, EquipmentSlot, Player } from "@minecraft/server";
import { initRegisterKimetuCustom, initStateChangeKimetuMonitor } from "./custom/KimetuCustomComponentRegistry";
import { probabilisticChoice } from "./item/weapon/nichirintou/Nichirintou";
import { ItemDurabilityDamage } from "./common/ItemDurabilityDamage";
import { KokyuObject, KokyuObjects } from "./item/weapon/NichirintouTypes";

// ワールド接続時
world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initRegisterKimetuCustom(initEvent);
  initStateChangeKimetuMonitor(initEvent);
});
world.beforeEvents.playerLeave.subscribe(leaveEvent => {
  leaveEvent.player.clearDynamicProperties();
});

world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
  let entity = event.entity;
  if (entity instanceof Player) {
    if (event.eventId == "kurokumaft:kokyu_change") {
      let nichirintou = entity.getProperty("kurokumaft:nichirintou_type");
      if (nichirintou != 0) {
        let object = KokyuObjects.find(ob => ob.type == nichirintou) as KokyuObject;
        object.change(entity);
      }
    }
  }
});

// アイテム右クリックリリース後
world.afterEvents.itemReleaseUse.subscribe(event => {
  let player = event.source;
  let item = event.itemStack;
  let duration = event.useDuration;
  if (item != undefined) {
    world.sendMessage("itemReleaseUse");
    if (player.getDynamicProperty("kokyu")) {
      player.setDynamicProperty("kokyu", undefined);
      let nichirintou = player.getProperty("kurokumaft:nichirintou_type");
      if (nichirintou != 0) {
        let object = KokyuObjects.find(ob => ob.type == nichirintou) as KokyuObject;
        object.func(item, player);
      }
      player.setProperty("kurokumaft:kokyu_use", false);
      ItemDurabilityDamage(player, item, EquipmentSlot.Mainhand);
    }
  }
});

