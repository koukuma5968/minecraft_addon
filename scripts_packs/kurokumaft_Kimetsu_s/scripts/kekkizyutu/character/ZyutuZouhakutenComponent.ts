import { ItemStack, Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../KekkizyutuUseComponent";
import { Bunretu } from "../zyutu/Bunretu";

/**
 * 血気術（積怒）
 */
export class ZyutuZouhakutenComponent implements KekkizyutuUseComponent {
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

        switch (kata) {
            case 1 :
                bunretu.tokage(entity);
            break;
            case 2 :
                bunretu.kyoumeiraisatu(entity);
            break;
            case 3 :
                bunretu.kyouatumeiha(entity);
            break;
            case 4 :
                bunretu.mukengouzyu(entity);
            break;
        }

    }

    releaseAttackZyutu(entity: Entity): void {
    }

}
