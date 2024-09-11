import { world,system, EquipmentSlot } from "@minecraft/server";
import { initRegisterCustom } from "./custom/CustomComponentRegistry";
import { probabilisticChoice } from "./item/weapon/nichirintou/Nichirintou";
import { ItemDurabilityDamage } from "./common/ItemDurabilityDamage";

// ワールド接続時
world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initRegisterCustom(initEvent);
});
world.beforeEvents.playerLeave.subscribe(leaveEvent => {
  leaveEvent.player.clearDynamicProperties();
});

// アイテム右クリックリリース後
world.afterEvents.itemReleaseUse.subscribe(event => {
  let player = event.source;
  let item = event.itemStack;
  let duration = event.useDuration;
  if (item != undefined) {
    if (player.getDynamicProperty("nichirintou_change")) {
      probabilisticChoice(item, player);
    }
    if (player.getDynamicProperty("kokyu")) {
      player.setDynamicProperty("kokyu", undefined);
      ItemDurabilityDamage(player, item, EquipmentSlot.Mainhand);
    }
  }
});

