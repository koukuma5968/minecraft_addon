import { world,system, Player, ItemStack} from "@minecraft/server";
import { initRegisterMashleCustom } from "./custom/MashleCustomComponentRegistry";
import { CaneList } from "./common/MashleMagicConst";

// ワールド接続時
system.beforeEvents.startup.subscribe(initEvent => {
  initRegisterMashleCustom(initEvent);
});

world.beforeEvents.playerLeave.subscribe(leaveEvent => {
  leaveEvent.player.clearDynamicProperties();
});

world.afterEvents.playerSpawn.subscribe(event => {
});

world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
});

world.afterEvents.itemReleaseUse.subscribe(event => {
  const source = event.source as Player;
  const itemStack = event.itemStack as ItemStack;
  const useDuration = event.useDuration as number;
  const type = source.getDynamicProperty("cane_type") as string;
  source.setDynamicProperty("cane_type");

  const caneClass = CaneList[type];
  const caneObject = new caneClass();
  caneObject.useMagic(source, itemStack, useDuration);
});
