import { ItemStack, Player } from "@minecraft/server";
import { CaneUseComponent } from "../CaneUseComponent";

/**
 * 筋肉魔法
 */
export class MuscleMagicComponent implements CaneUseComponent {

    /**
     * @param {Player} player
     * @param {ItemStack} itemStack
     */
    useMagic(player: Player, itemStack: ItemStack, duration: number): void {
        throw new Error("Method not implemented.");
    }

}
