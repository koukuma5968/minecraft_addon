import { ItemCustomComponent, CustomComponentParameters, ItemComponentHitEntityEvent } from "@minecraft/server";
import { ItemCustomBase } from "../ItemCustomBase";

/**
 * 武器
 */
export class MHWeaponsItem extends ItemCustomBase implements ItemCustomComponent {

    onHitEntity(event: ItemComponentHitEntityEvent, arg: CustomComponentParameters) {

    }
}
