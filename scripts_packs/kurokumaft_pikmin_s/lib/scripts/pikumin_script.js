import { world } from "@minecraft/server";
import { initRegisterCustom } from "./custom/CustomComponentRegistry";
// ワールド接続時
world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initRegisterCustom(initEvent);
});
world.beforeEvents.playerLeave.subscribe(leaveEvent => {
    leaveEvent.player.clearDynamicProperties();
});
//# sourceMappingURL=pikumin_script.js.map