import { Container, ContainerSlot, EntityComponentTypes, EntityInventoryComponent, ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { HanaNoKata } from "../../kata/HanaNoKata";
import { ItemDurabilityDamage } from "../../../common/KimetuItemDurabilityDamage";

/**
 * 呼吸（花）
 */
export class KokyuHanaComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[26] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", 0);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kata" + kokyuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", (index+1));
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kata" + kokyuObject.kata[(index+1)] + ".value"}]});
        }

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
    useAttackKata(player: Player, itemStack: ItemStack): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const hana = new HanaNoKata();

        try {

            switch (kata) {
                case 2 :
                    hana.niNoKata(player, itemStack);
                break;
                case 4 :
                    hana.shiNoKata(player, itemStack);
                break;
                case 5 :
                    hana.goNoKata(player, itemStack);
                break;
                case 6 :
                    hana.rokuNoKata(player, itemStack);
                break;
            }
        } catch (error: any) {
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
    }

}
