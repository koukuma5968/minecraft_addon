import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { MushiNoKata } from "../../kata/MushiNoKata";
import { NomalAttack } from "../../kata/NomalAttack";

/**
 * 呼吸（しのぶ）
 */
export class KokyuShinobuComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[6] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mushi_kata" + kokyuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[(index+1)]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mushi_kata" + kokyuObject.kata[(index+1)] + ".value"}]});
        }

    }

    attack = new NomalAttack();
    /**
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
        this.attack.oneAttack(player, itemStack);
    }

    mushi = new MushiNoKata();
    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        switch (kata) {
            case 1 :
                this.mushi.ichiNoKata(player, itemStack);
            break;
            case 2 :
                this.mushi.niNoKata(player, itemStack);
            break;
            case 3 :
                this.mushi.sanNoKata(player, itemStack);
            break;
            case 4 :
                this.mushi.shiNoKata(player, itemStack);
            break;
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
    }

}
