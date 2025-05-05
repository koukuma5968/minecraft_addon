import { BlockCustomComponent, BlockComponentPlayerInteractEvent, Block, Player, BlockComponentTickEvent, EntityEquippableComponent, EntityComponentTypes, ItemStack, EquipmentSlot } from "@minecraft/server";
import { subtractionItem } from "../common/PikuminItemDurabilityDamage";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

/**
 * オニヨンブロック
 */
export class OniyonsBlock implements BlockCustomComponent {

    onTick(event:BlockComponentTickEvent) {
        const block = event.block as Block;
        const growth = block.permutation.getState("kurokumaft:growth") as number;
        if (growth < 3) {
            block.setPermutation(block.permutation.withState("kurokumaft:growth", growth+1));
        }
    }

    onPlayerInteract(event:BlockComponentPlayerInteractEvent) {
        const player = event.player as Player;
        const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const itemStack = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (itemStack != undefined && itemStack.typeId.indexOf("meal") != -1) {
            const block = event.block as Block;
            const growth = block.permutation.getState("kurokumaft:growth") as number;
            if (growth < 3) {
                block.setPermutation(block.permutation.withState("kurokumaft:growth", growth+1));
                event.dimension.spawnParticle("minecraft:crop_kurokumaft:growth_emitter", {x:block.location.x+0.5, y:block.location.y, z:block.location.z+0.5});
                subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
            } else if (growth == 3) {
                const  oniyonType = block.permutation.getState("color");
                const dimension = block.dimension;
                const location = block.location;

                dimension.setBlockType(location, MinecraftBlockTypes.Air);
                switch (oniyonType as string) {
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
                }
            }
        }
    }
}
