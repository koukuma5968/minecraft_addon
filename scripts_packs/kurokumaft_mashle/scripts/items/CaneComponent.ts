import { CustomComponentParameters, ItemComponentUseEvent, ItemCustomComponent } from "@minecraft/server";

type CaneTypes = {
  tyep: string
}

export class CaneComponent implements ItemCustomComponent {

  onUse (event: ItemComponentUseEvent, arg: CustomComponentParameters) {
    const caneType = arg.params as CaneTypes;
    event.source.setDynamicProperty("cane_type", caneType.tyep);
  }

}
