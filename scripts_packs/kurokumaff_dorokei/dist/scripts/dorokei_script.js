// scripts/dorokei_script.ts
import { system } from "@minecraft/server";

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
import { ModalFormData } from "@minecraft/server-ui";
var SystemBoardBlock = class {
  onPlayerInteract(event) {
    const block = event.block;
    const player = event.player;
    const modalForm = new ModalFormData().title("Example Modal Controls for \xA7o\xA77ModalFormData\xA7r");
    modalForm.toggle("Toggle w/o default");
    modalForm.toggle("Toggle w/ default", {
      defaultValue: true
    });
    modalForm.slider("Slider w/o default", 0, 50, {
      defaultValue: 5
    });
    modalForm.slider("Slider w/ default", 0, 50, {
      defaultValue: 5,
      valueStep: 30
    });
    modalForm.dropdown("Dropdown w/o default", ["option 1", "option 2", "option 3"]);
    modalForm.dropdown("Dropdown w/ default", ["option 1", "option 2", "option 3"], {
      defaultValueIndex: 2
    });
    modalForm.textField("Input w/o default", "type text here");
    modalForm.textField("Input w/ default", "type text here", {
      defaultValue: "this is default"
    });
    modalForm.show(player).then((formData) => {
      player.sendMessage(`Modal form results: ${JSON.stringify(formData.formValues, void 0, 2)}`);
    }).catch((error) => {
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
system.beforeEvents.startup.subscribe((initEvent) => {
  initRegisterDorokeiCustom(initEvent);
});

//# sourceMappingURL=../debug/dorokei_script.js.map
