import { Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { Mari } from "../../zyutu/Mari";

/**
 * 血気術（朱紗丸）
 */
export class ZyutuSusamaruComponent implements KekkizyutuUseComponent {
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
     * @param {ItemStack} itemStack
     * @param {Entity} entity
     */
    useAttackZyutu(entity: Entity): void {

        const kata = entity.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const mari = new Mari();

        switch (kata) {
            case 1 :
                mari.mari(entity);
            break;
        }

    }

    releaseAttackZyutu(entity: Entity): void {
    }

}
