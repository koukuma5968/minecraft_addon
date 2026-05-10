import { ItemCustomComponent, CustomComponentParameters, ItemComponentBeforeDurabilityDamageEvent } from "@minecraft/server";
import { ItemCustomBase } from "../ItemCustomBase";

/**
 * 防具
 */
export class MHArmorsItem extends ItemCustomBase implements ItemCustomComponent {

    onBeforeDurabilityDamage(event: ItemComponentBeforeDurabilityDamageEvent, arg: CustomComponentParameters) {

    }
}
