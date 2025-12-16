// scripts/mashle_script.ts
import { world as world3, system as system3 } from "@minecraft/server";

// scripts/items/CaneComponent.ts
var CaneComponent = class {
  onUse(event, arg) {
    const caneType = arg.params;
    event.source.setDynamicProperty("cane_type", caneType[0].type);
    console.info(JSON.stringify(caneType));
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

// scripts/player/MagicPowerTick.ts
import { system as system2, TicksPerSecond } from "@minecraft/server";
var MagicPowerTick = class {
  constructor(player) {
    this.player = player;
    this.num = 0;
  }
  startMonitoring() {
    this.num = system2.runInterval(() => {
      if (this.player.isValid) {
        this.checkPlayerMagicTick();
      } else {
        system2.clearRun(this.num);
      }
    }, 5);
  }
  async checkPlayerMagicTick() {
    if (this.player.isValid) {
      try {
      } catch (error) {
      } finally {
        this.player.onScreenDisplay.setTitle(
          {
            translate: "icon.kurokumaft:magic.power.full"
          },
          {
            stayDuration: 10 * TicksPerSecond,
            fadeInDuration: 0,
            fadeOutDuration: 50 * TicksPerSecond
          }
        );
      }
    }
  }
};

// scripts/mashle_script.ts
system3.beforeEvents.startup.subscribe((initEvent) => {
  initRegisterMashleCustom(initEvent);
});
world3.beforeEvents.playerLeave.subscribe((leaveEvent) => {
  leaveEvent.player.clearDynamicProperties();
});
world3.afterEvents.playerSpawn.subscribe((event) => {
  const playerTick = new MagicPowerTick(event.player);
  playerTick.startMonitoring();
});
world3.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
});
world3.afterEvents.itemReleaseUse.subscribe((event) => {
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
