import { BlockCustomComponent, BlockComponentPlayerInteractEvent, Block, Player, BlockComponentTickEvent, EntityEquippableComponent, EntityComponentTypes, ItemStack, EquipmentSlot } from "@minecraft/server";
import { subtractionItem } from "../common/PikuminItemDurabilityDamage";
import { weightChoice } from "../common/PikuminCommonUtil";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

/**
 * ペレットブロック
 */
export class PelletGrassBlock implements BlockCustomComponent {

    onTick(event:BlockComponentTickEvent) {
        const block = event.block as Block;
        const growth = block.permutation.getState("kurokumaft:growth") as number;
        if (growth < 2) {
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
            if (growth < 2) {
                block.setPermutation(block.permutation.withState("kurokumaft:growth", growth+1));
                event.dimension.spawnParticle("minecraft:crop_kurokumaft:growth_emitter", {x:block.location.x+0.5, y:block.location.y, z:block.location.z+0.5});
                subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
            } else if (growth == 2) {
                const dimension = block.dimension;
                const location = block.location;

                const pekketLists = weightChoice([
                    { item: 'red' , weight: 20 },
                    { item: 'blue' , weight: 20 },
                    { item: 'yellow' , weight: 20 },
                    { item: 'purple' , weight: 15 },
                    { item: 'white' , weight: 15 },
                    { item: 'rock' , weight: 5 },
                    { item: 'feather' , weight: 5 },
                ]);

                dimension.setBlockType(location, MinecraftBlockTypes.Air);
                const choice = pekketLists.pick();
                switch (choice as string) {
                    case 'red': 
                        dimension.spawnEntity("kurokumaft:red_pellet_grass", location);
                    break;
                    case 'blue': 
                        dimension.spawnEntity("kurokumaft:blue_pellet_grass", location);
                    break;
                    case 'yellow': 
                        dimension.spawnEntity("kurokumaft:yellow_pellet_grass", location);
                    break;
                    case 'purple': 
                        dimension.spawnEntity("kurokumaft:purple_pellet_grass", location);
                    break;
                    case 'white': 
                        dimension.spawnEntity("kurokumaft:white_pellet_grass", location);
                    break;
                    case 'rock': 
                        dimension.spawnEntity("kurokumaft:rock_pellet_grass", location);
                    break;
                    case 'feather': 
                        dimension.spawnEntity("kurokumaft:feather_pellet_grass", location);
                    break;
                }
            }
        }
    }
}
