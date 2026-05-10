import { Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { KekkizyutuObject, KekkizyutuObjects } from "../../../item/weapon/KekkizyutuTypes";
import { Hakaisatu } from "../../zyutu/Hakaisatu";

/**
 * 血気術（猗窩座）
 */
export class ZyutuAkazaComponent implements KekkizyutuUseComponent {

    hakaisatu = new Hakaisatu();
    /**
     * 変更
     * @param {Player} player
     */
    changeZyutu(player:Player): void {

        let kata = player.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const kekkizyutuObject = KekkizyutuObjects[2] as KekkizyutuObject;

        switch (kata) {
            case kekkizyutuObject.kata[kekkizyutuObject.kata.length-1] :
                kata = kekkizyutuObject.kata[0];
                player.setProperty("kurokumaft:kekkizyutu_kata", kata);
                break;
            default :
                const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
                kata = kekkizyutuObject.kata[index+1];
                player.setProperty("kurokumaft:kekkizyutu_kata", kata);
            }
            player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai" + kata + ".value"}]});

    }

    /**
     * @param {Entity} entity
     */
    hitAttackZyutu(entity: Entity): void {
    }

    /**
     * @param {ItemStack} itemStack
     * @param {Entity} entity
     */
    useAttackZyutu(entity: Entity): void {

        const kata = entity.getProperty("kurokumaft:kekkizyutu_kata") as number;

        switch (kata) {
            case 1 :
                this.hakaisatu.rashin(entity);
            break;
            case 2 :
                this.hakaisatu.kushiki(entity);
            break;
            case 3 :
                this.hakaisatu.ranshiki(entity);
            break;
            case 5 :
                this.hakaisatu.kamurosakiwari(entity);
            break;
            case 6 :
                this.hakaisatu.ryusengunkou(entity);
            break;
            case 7 :
                this.hakaisatu.hiyuuseisenrin(entity);
            break;
            case 8 :
                this.hakaisatu.manyousenyanagi(entity);
            break;
            case 9 :
                this.hakaisatu.kishinyaenshin(entity);
            break;
            case 10 :
                this.hakaisatu.aoginranzankou(entity);
            break;
        }

    }

    releaseAttackZyutu(entity: Entity): void {

        const kata = entity.getProperty("kurokumaft:kekkizyutu_kata") as number;
        switch (kata) {
            case 4 :
                this.hakaisatu.messhiki(entity);
            break;
        }
    }

}
