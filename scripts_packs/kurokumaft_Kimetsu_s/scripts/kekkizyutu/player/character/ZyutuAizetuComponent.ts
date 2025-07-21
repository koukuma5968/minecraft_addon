import { Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { Bunretu } from "../../zyutu/Bunretu";

/**
 * 血気術（哀絶）
 */
export class ZyutuAizetuComponent implements KekkizyutuUseComponent {
    /**
     * 変更
     * @param {Player} player
     */
    changeZyutu(player:Player): void {

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
        const bunretu = new Bunretu();

        try {
            switch (kata) {
                case 1 :
                    bunretu.shitotu(entity);
                break;
            }
        } catch (error: any) {
        }

    }

    releaseAttackZyutu(entity: Entity): void {
    }

}
