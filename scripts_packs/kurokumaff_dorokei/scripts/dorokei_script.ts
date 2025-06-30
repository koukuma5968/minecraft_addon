import { system } from "@minecraft/server";
import { initRegisterDorokeiCustom } from "./custom/DorokeiCustomComponentRegistry";

// ワールド起動時
system.beforeEvents.startup.subscribe(initEvent => {
  initRegisterDorokeiCustom(initEvent);
});

