import { EntityComponentTypes, EntityProjectileComponent, ItemStack, Player } from "@minecraft/server";
import { CaneUseComponent } from "../CaneUseComponent";

/**
 * 一般魔法
 */
export class GeneralMagicComponent implements CaneUseComponent {

    /**
     * @param {Player} player
     * @param {ItemStack} itemStack
     */
    useMagic(player: Player, itemStack: ItemStack, duration: number): void {
        const bulet = player.dimension.spawnEntity("kurokumaft:narcom", player.getHeadLocation());

        const projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
        projectile.owner = player;
        projectile.shoot(player.getViewDirection());
    }

}
