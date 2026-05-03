import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { OtoNoKata } from "../../kata/OtoNoKata";
import { NomalAttack } from "../../kata/NomalAttack";

/**
 * 呼吸（天元）
 */
export class KokyuTengenComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[11] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:oto_kata" + kokyuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[(index+1)]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:oto_kata" + kokyuObject.kata[(index+1)] + ".value"}]});
        }
    }

    attack = new NomalAttack();
    /**
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
        this.attack.oneAttack(player, itemStack);
    }

    oto = new OtoNoKata();
    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        switch (kata) {
            case 1 :
                this.oto.ichiNoKata(player, itemStack);
            break;
            case 2 :
                this.oto.niNoKata(player, itemStack);
            break;
            case 4 :
                this.oto.shiNoKata(player, itemStack);
            break;
            case 5 :
                this.oto.goNoKata(player, itemStack);
            break;
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        switch (kata) {
            case 3 :
                this.oto.sanNoKata(player, itemStack);
            break;
        }
    }

}
