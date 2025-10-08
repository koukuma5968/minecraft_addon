// scripts/mashle_script.ts
import { world, system } from "@minecraft/server";

// scripts/items/CaneComponent.ts
var CaneComponent = class {
  onUse(event, arg) {
    const caneType = arg.params;
    event.source.setDynamicProperty("cane_type", caneType.tyep);
  }
};

// scripts/custom/MashleCustomComponentRegistry.ts
function initRegisterMashleCustom(initEvent) {
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:cane_component", new CaneComponent());
}

// scripts/items/cane/player/GeneralMagicComponent.ts
import { EntityComponentTypes } from "@minecraft/server";
var GeneralMagicComponent = class {
  /**
   * @param {Player} player
   * @param {ItemStack} itemStack
   */
  useMagic(player, itemStack, duration) {
    const bulet = player.dimension.spawnEntity("kurokumaft:narcom", player.getHeadLocation());
    const projectile = bulet.getComponent(EntityComponentTypes.Projectile);
    projectile.owner = player;
    projectile.shoot(player.getViewDirection());
  }
};

// scripts/items/cane/player/MuscleMagicComponent.ts
var MuscleMagicComponent = class {
  /**
   * @param {Player} player
   * @param {ItemStack} itemStack
   */
  useMagic(player, itemStack, duration) {
    throw new Error("Method not implemented.");
  }
};

// scripts/common/MashleMagicConst.ts
var CaneList = {
  nomal: GeneralMagicComponent,
  none: MuscleMagicComponent
};
var UniqueMagicList = Object.freeze([
  { id: 0, name: "none" },
  { id: 1, name: "changes" },
  { id: 2, name: "gravior" },
  { id: 3, name: "explom" },
  { id: 4, name: "cuffs" }
]);

// scripts/mashle_script.ts
system.beforeEvents.startup.subscribe((initEvent) => {
  initRegisterMashleCustom(initEvent);
});
world.beforeEvents.playerLeave.subscribe((leaveEvent) => {
  leaveEvent.player.clearDynamicProperties();
});
world.afterEvents.playerSpawn.subscribe((event) => {
});
world.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
});
world.afterEvents.itemReleaseUse.subscribe((event) => {
  const source = event.source;
  const itemStack = event.itemStack;
  const useDuration = event.useDuration;
  const type = source.getDynamicProperty("cane_type");
  source.setDynamicProperty("cane_type");
  const caneClass = CaneList[type];
  const caneObject = new caneClass();
  caneObject.useMagic(source, itemStack, useDuration);
});

//# sourceMappingURL=../debug/mashle_script.js.map
