import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { MizuNoKata } from "../../kata/MizuNoKata";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { NomalAttack } from "../../kata/NomalAttack";

/**
 * 呼吸（義勇）
 */
export class KokyuGiyuComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[5] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kata" + kokyuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[(index+1)]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kata" + kokyuObject.kata[(index+1)] + ".value"}]});
            }

    }

    attack = new NomalAttack();
    /**
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
        this.attack.oneAttack(player, itemStack);
    }

    mizu = new MizuNoKata();
    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        switch (kata) {
            case 2 :
                this.mizu.niNoKata(player, itemStack);
            break;
            case 3 :
                this.mizu.sanNoKata(player, itemStack);
            break;
            case 4 :
                this.mizu.shiNoKata(player, itemStack);
            break;
            case 9 :
                this.mizu.kuNoKata(player, itemStack);
            break;
            case 10 :
                this.mizu.zyuNoKata(player, itemStack);
            break;
            case 11 :
                this.mizu.zyuichiNoKata(player, itemStack);
            break;
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        switch (kata) {
            case 1 :
                this.mizu.ichiNoKata(player, itemStack);
            break;
            case 5 :
                this.mizu.goNoKata(player, itemStack);
            break;
            case 6 :
                this.mizu.rokuNoKata(player, itemStack);
            break;
            case 7 :
                this.mizu.shitiNoKata(player, itemStack);
            break;
            case 8 :
                this.mizu.hachiNoKata(player, itemStack);
            break;
       }
    }

}
