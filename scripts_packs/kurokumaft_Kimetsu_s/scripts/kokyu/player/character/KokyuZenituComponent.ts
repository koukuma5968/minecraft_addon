import { ItemStack, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KaminariNoKata } from "../../kata/KaminariNoKata";

/**
 * 呼吸（善逸）
 */
export class KokyuZenituComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

    }

    /**
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
    }

    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player:Player, itemStack:ItemStack): void {
    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kaminari = new KaminariNoKata();

        switch (kata) {
            case 1 :
                const chage = (duration / TicksPerSecond);
                if (chage > 997) {
                    kaminari.ichiNoKata(player, itemStack);
                } else if (chage > 993) {
                    kaminari.ichiNoKataRoku(player, itemStack);
                } else if (chage > 991) {
                    kaminari.ichiNoKataHati(player, itemStack);
                } else if (chage > 988) {
                    kaminari.ichiNoKataShinsoku(player, itemStack);
                } else {
                    kaminari.shitiNoKata(player, itemStack);
                }
            break;
        }
    }

}
