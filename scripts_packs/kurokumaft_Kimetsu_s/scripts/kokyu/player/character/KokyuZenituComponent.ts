import { ItemStack, Player, TicksPerSecond } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KaminariNoKata } from "../../kata/KaminariNoKata";
import { NomalAttack } from "../../kata/NomalAttack";

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
        const attack = new NomalAttack();
        attack.oneAttack(player, itemStack);
    }

    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player:Player, itemStack:ItemStack): void {
    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kaminari = new KaminariNoKata();

        switch (kata) {
            case 1 :
                const chage = (duration / TicksPerSecond);
                if (chage > 998.5) {
                    kaminari.ichiNoKata(player, itemStack);
                } else if (chage > 996.5) {
                    kaminari.ichiNoKataRoku(player, itemStack);
                } else if (chage > 995.5) {
                    kaminari.ichiNoKataHati(player, itemStack);
                } else if (chage > 994) {
                    kaminari.ichiNoKataShinsoku(player, itemStack);
                } else {
                    kaminari.shitiNoKata(player, itemStack);
                }
            break;
        }
    }

}
