import { ItemStack, Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { Bunretu } from "../../zyutu/Bunretu";

/**
 * 血気術（うろぎ）
 */
export class ZyutuUrogiComponent implements KekkizyutuUseComponent {
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
        const bunretu = new Bunretu();

        switch (kata) {
            case 1 :
                bunretu.ultrasonic(entity);
            break;
        }

    }

    releaseAttackZyutu(entity: Entity): void {
    }

}
