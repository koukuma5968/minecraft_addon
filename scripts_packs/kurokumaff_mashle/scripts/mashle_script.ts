import { world,system} from "@minecraft/server";
import { initRegisterMashleCustom } from "./custom/MashleCustomComponentRegistry";

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

