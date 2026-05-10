import { ItemCustomComponent, ItemComponentConsumeEvent, CustomComponentParameters, Player } from "@minecraft/server";
import { ItemCustomBase } from "./ItemCustomBase";

/**
 * エフェクト付与
 */
export class MHUseItemEffect extends ItemCustomBase implements ItemCustomComponent {

    onConsume(event:ItemComponentConsumeEvent, arg: CustomComponentParameters) {
        super.useEffectItem(event.source as Player, arg.params);
    }
}
