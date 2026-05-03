import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { KasumiNoKata } from "../../kata/KasumiNoKata";
import { NomalAttack } from "../../kata/NomalAttack";

/**
 * 呼吸（無一郎）
 */
export class KokyuMuitiroComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[10] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kata" + kokyuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[(index+1)]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kata" + kokyuObject.kata[(index+1)] + ".value"}]});
        }
    }

    attack = new NomalAttack();
    /**
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
        this.attack.oneAttack(player, itemStack);
    }

    kasumi = new KasumiNoKata();
    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        switch (kata) {
            case 2 :
                this.kasumi.niNoKata(player, itemStack);
            break;
            case 5 :
                this.kasumi.goNoKata(player, itemStack);
            break;
            case 6 :
                this.kasumi.rokuNoKata(player, itemStack);
            break;
            case 7 :
                this.kasumi.shitiNoKata(player, itemStack);
            break;
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        switch (kata) {
            case 1 :
                this.kasumi.ichiNoKata(player, itemStack);
            break;
            case 3 :
                this.kasumi.sanNoKata(player, itemStack);
            break;
            case 4 :
                this.kasumi.shiNoKata(player, itemStack);
            break;
        }
    }

}
