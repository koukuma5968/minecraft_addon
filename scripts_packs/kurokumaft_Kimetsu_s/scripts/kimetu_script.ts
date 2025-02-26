import { world,system, EquipmentSlot, Player } from "@minecraft/server";
import { initRegisterKimetuCustom, initStateChangeKimetuMonitor } from "./custom/KimetuCustomComponentRegistry";
import { ItemDurabilityDamage } from "./common/ItemDurabilityDamage";
import { kokyuClassRecord, KokyuObject, KokyuObjects } from "./item/weapon/NichirintouTypes";

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
    let nichirintou = entity.getProperty("kurokumaft:nichirintou_type") as number;
    if (nichirintou > 1) {
      if (event.eventId == "kurokumaft:kokyu_change") {
        let object = KokyuObjects.find(ob => ob.type == nichirintou) as KokyuObject;
        let kokyuClass = kokyuClassRecord[object.className];
        let kokyuObject = new kokyuClass();
        kokyuObject.changeKata(entity);
      } else if (event.eventId == "kurokumaft:attack_time") {
        let object = KokyuObjects.find(ob => ob.type == nichirintou) as KokyuObject;
        let kokyuClass = kokyuClassRecord[object.className];
        let kokyuObject = new kokyuClass();
        kokyuObject.hitAttackKata(entity);
      }
    }
  }
});

// アイテム右クリックリリース後
world.afterEvents.itemReleaseUse.subscribe(event => {
  let player = event.source;
  let item = event.itemStack;
  let duration = event.useDuration;
  let nichirintou = player.getProperty("kurokumaft:nichirintou_type");
  if (item != undefined && nichirintou != undefined && nichirintou != 0) {
    if (player.getProperty("kurokumaft:kokyu_use")) {
      let object = KokyuObjects.find(ob => ob.type == nichirintou) as KokyuObject;
      let kokyuClass = kokyuClassRecord[object.className];
      let kokyuObject = new kokyuClass();
      kokyuObject.releaseAttackKata(player, item);

      ItemDurabilityDamage(player, item, EquipmentSlot.Mainhand);
      player.setProperty("kurokumaft:kokyu_use", false);
    }
  }
});

