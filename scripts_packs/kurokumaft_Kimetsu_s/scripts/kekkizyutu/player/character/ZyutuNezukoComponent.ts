import { Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { Bakketu } from "../../zyutu/Bakketu";

/**
 * 血気術（禰豆子）
 */
export class ZyutuNezukoComponent implements KekkizyutuUseComponent {
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
        const bakketu = new Bakketu();

        switch (kata) {
            case 1 :
                bakketu.bakketu(entity);
            break;
        }

    }

    releaseAttackZyutu(entity: Entity): void {
    }

}
