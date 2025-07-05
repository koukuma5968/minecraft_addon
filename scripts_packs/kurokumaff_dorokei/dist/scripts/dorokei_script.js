// scripts/dorokei_script.ts
import { system as system3 } from "@minecraft/server";

// scripts/item/KeibouComponent.ts
import { world } from "@minecraft/server";
var KeibouComponent = class {
  // 攻撃ヒット
  onHitEntity(event) {
    const hitEntity = event.hitEntity;
    world.sendMessage(hitEntity.typeId);
  }
};

// scripts/block/SystemBoardBlock.ts
import { world as world3 } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

// scripts/monitor/SystemMonitorTick.ts
import { system, TicksPerSecond, world as world2 } from "@minecraft/server";
var SystemMonitorTick = class {
  constructor() {
    this.num = 0;
  }
  startMonitoring(fieldRange, fieldDown) {
    if (this.num != 0) {
      system.clearRun(this.num);
    }
    this.num = system.runInterval(() => {
      try {
        this.checkPlayerKaikyuTick(fieldRange, fieldDown);
      } catch (error) {
        system.clearRun(this.num);
      }
    }, 0.5 * TicksPerSecond);
  }
  async checkPlayerKaikyuTick(fieldRange, fieldDown) {
    world2.getAllPlayers().forEach((player) => {
      if (player.isValid) {
        player.onScreenDisplay.setTitle(
          {
            rawtext: [
              { translate: "screen.kurokumaft:systemblock.fieldRange" },
              { text: fieldRange },
              { text: "\n" },
              { translate: "screen.kurokumaft:systemblock.fieldDown" },
              { text: fieldDown }
            ]
          },
          {
            stayDuration: 100,
            fadeInDuration: 0,
            fadeOutDuration: 1,
            subtitle: ""
          }
        );
      }
    });
  }
};

// scripts/block/SystemBoardBlock.ts
var systemMonitorTick = new SystemMonitorTick();
var SystemBoardBlock = class {
  onPlayerInteract(event) {
    const block = event.block;
    const player = event.player;
    const modalForm = new ModalFormData().title({ translate: "msg.kurokumaft:systemblock.title" });
    modalForm.label({ translate: "msg.kurokumaft:systemblock.field.range.label" });
    modalForm.slider({ translate: "msg.kurokumaft:systemblock.field.down.text" }, 1, 64, {
      defaultValue: 1
    });
    modalForm.slider({ translate: "msg.kurokumaft:systemblock.field.range.text" }, 24, 256, {
      defaultValue: 24
    });
    modalForm.show(player).then((formData) => {
      const values = formData.formValues;
      if (values != void 0) {
        const fieldDown = values[1];
        const fieldRange = values[2];
        if (block.location.y - fieldDown < -63) {
          throw { translate: "error.kurokumaft:systemblock.field.down.max_orver" };
        }
        systemMonitorTick.startMonitoring(fieldRange.toString(), fieldDown.toString());
      }
    }).catch((error) => {
      world3.sendMessage(error.message);
      console.log(error.stack);
      return -1;
    });
  }
};

// scripts/custom/DorokeiCustomComponentRegistry.ts
function initRegisterDorokeiCustom(initEvent) {
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:keibou_component", new KeibouComponent());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:systemboard_component", new SystemBoardBlock());
}

// scripts/dorokei_script.ts
system3.beforeEvents.startup.subscribe((initEvent) => {
  initRegisterDorokeiCustom(initEvent);
});

//# sourceMappingURL=../debug/dorokei_script.js.map
