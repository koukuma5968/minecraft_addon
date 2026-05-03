import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { IwaNoKata } from "../../kata/IwaNoKata";
import { NomalAttack } from "../../kata/NomalAttack";

/**
 * 呼吸（行冥）
 */
export class KokyuGyoumeiComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[9] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:iwa_kata" + kokyuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[(index+1)]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:iwa_kata" + kokyuObject.kata[(index+1)] + ".value"}]});
            }
    }

    attack = new NomalAttack();
    /**
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
        this.attack.oneAttack(player, itemStack);
    }

    iwa = new IwaNoKata();
    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        player.addTag(player.id);
        switch (kata) {
            case 1 :
                this.iwa.ichiNoKata(player, itemStack);
            break;
            case 2 :
                this.iwa.niNoKata(player, itemStack);
            break;
            case 3 :
                this.iwa.sanNoKata(player, itemStack);
            break;
            case 4 :
                this.iwa.shiNoKata(player, itemStack);
            break;
            case 5 :
                this.iwa.goNoKata(player, itemStack);
            break;
        }
        player.removeTag(player.id);

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
    }

}
