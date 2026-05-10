import { Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { Kouketunoya } from "../../zyutu/Kouketunoya";
import { KekkizyutuObject, KekkizyutuObjects } from "../../../item/weapon/KekkizyutuTypes";

/**
 * 血気術（矢琶羽）
 */
export class ZyutuYahabaComponent implements KekkizyutuUseComponent {

    ya = new Kouketunoya();
    /**
     * 変更
     * @param {Player} player
     */
    changeZyutu(player:Player): void {
        let kata = player.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const kekkizyutuObject = KekkizyutuObjects[15] as KekkizyutuObject;

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
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouketunoya" + kata + ".value"}]});
    }

    /**
     * @param {Entity} entity
     */
    hitAttackZyutu(entity: Entity): void {
    }

    /**
     * @param {Entity} entity
     */
    useAttackZyutu(entity: Entity): void {

        const kata = entity.getProperty("kurokumaft:kekkizyutu_kata") as number;

        switch (kata) {
            case 1 :
                this.ya.hi(entity);
            break;
            case 2 :
                this.ya.show(entity);
            break;
            case 3 :
                this.ya.raku(entity);
            break;
            case 4 :
                this.ya.geki(entity);
            break;
        }

    }

    releaseAttackZyutu(entity: Entity): void {
    }

}
