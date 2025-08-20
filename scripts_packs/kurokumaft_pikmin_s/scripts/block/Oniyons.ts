import { BlockCustomComponent, BlockComponentPlayerInteractEvent, Block, Player, 
    EntityEquippableComponent, EntityComponentTypes, ItemStack, EquipmentSlot, BlockPermutation } from "@minecraft/server";
import { subtractionItem } from "../common/PikuminItemDurabilityDamage";

/**
 * オニヨンブロック
 */
export class OniyonsBlock implements BlockCustomComponent {

    onPlayerInteract(event:BlockComponentPlayerInteractEvent) {
        const player = event.player as Player;
        const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const itemStack = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (itemStack != undefined && itemStack.typeId.indexOf("meal") != -1) {
            const block = event.block as Block;
            const states = block.permutation.getAllStates();
            const growth =  states["kurokumaft:growth"] as number;
            if (growth < 3) {
                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1}));
                event.dimension.spawnParticle("minecraft:crop_growth_emitter", {x:block.location.x+0.5, y:block.location.y, z:block.location.z+0.5});
                subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
            } else if (growth == 3) {
                const oniyonType = block.typeId.split(":")[1].split("_");
                const dimension = block.dimension;
                const location = block.location;

                dimension.setBlockType(location, "minecraft:air");
                switch (oniyonType[0]) {
                    case 'red': 
                        dimension.spawnEntity("kurokumaft:red_oniyon_base", location);
                    break;
                    case 'blue': 
                        dimension.spawnEntity("kurokumaft:blue_oniyon_base", location);
                    break;
                    case 'yellow': 
                        dimension.spawnEntity("kurokumaft:yellow_oniyon_base", location);
                    break;
                    case 'purple': 
                        dimension.spawnEntity("kurokumaft:purple_oniyon_base", location);
                    break;
                    case 'white': 
                        dimension.spawnEntity("kurokumaft:white_oniyon_base", location);
                    break;
                    case 'rock': 
                        dimension.spawnEntity("kurokumaft:rock_oniyon_base", location);
                    break;
                    case 'feather': 
                        dimension.spawnEntity("kurokumaft:feather_oniyon_base", location);
                    break;
                    case 'ice': 
                        dimension.spawnEntity("kurokumaft:ice_oniyon_base", location);
                    break;
                }
            }
        }
    }
}
