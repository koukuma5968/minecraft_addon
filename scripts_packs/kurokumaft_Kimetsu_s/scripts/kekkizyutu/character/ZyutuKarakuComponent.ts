import { ItemStack, Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../KekkizyutuUseComponent";
import { Tigama } from "../zyutu/Tigama";

/**
 * 血気術（うろぎ）
 */
export class ZyutuKarakuComponent implements KekkizyutuUseComponent {
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
        const tigama = new Tigama();

        switch (kata) {
            case 1 :
                tigama.tobiTigama(entity);
            break;
            case 2 :
                tigama.bakkotyouryou(entity);
            break;
            case 3 :
                tigama.enzansenkai(entity);
            break;
        }

    }

    releaseAttackZyutu(entity: Entity): void {
    }

}
