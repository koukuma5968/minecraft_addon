import { BlockCustomComponent, Block, BlockComponentTickEvent, BlockPermutation, BlockComponentPlayerInteractEvent, Player, EntityComponentTypes, EquipmentSlot, EntityEquippableComponent, ItemStack, world } from "@minecraft/server";
import { subtractionItem } from "../../common/ItemDurabilityDamage";

/**
 * 植物
 */
export class PlantsGrowth implements BlockCustomComponent {

    onTick(event:BlockComponentTickEvent) {
        let block = event.block as Block;
        let growth = block.permutation.getState("kurokumaft:growth") as number;
        if (growth < 7) {
            block.setPermutation(block.permutation.withState("kurokumaft:growth", growth+1));

        }
    }

    onPlayerInteract(event:BlockComponentPlayerInteractEvent) {
        let player = event.player as Player;
        let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let itemStack = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (itemStack != undefined && itemStack.typeId.indexOf("meal") != -1) {
            let block = event.block as Block;
            let growth = block.permutation.getState("kurokumaft:growth") as number;
            if (growth < 7) {
                block.setPermutation(block.permutation.withState("kurokumaft:growth", growth+1));
                event.dimension.spawnParticle("minecraft:crop_growth_emitter", {x:block.location.x+0.5, y:block.location.y, z:block.location.z+0.5});
                subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
            }
        }
    }
}
