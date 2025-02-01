import { BlockCustomComponent, Block, BlockComponentTickEvent, BlockPermutation, BlockComponentPlayerInteractEvent, Player, EntityComponentTypes, EquipmentSlot, EntityEquippableComponent, ItemStack, world } from "@minecraft/server";
import { subtractionItem } from "../../common/ItemDurabilityDamage";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

/**
 * 植物
 */
export class PlantsGrowth implements BlockCustomComponent {

    onTick(event:BlockComponentTickEvent) {
        let block = event.block as Block;
        let growth = block.permutation.getState("kurokumaft:growth") as number;
        if (growth < 7) {
            let growthUp = false;
            if (block.typeId == "kurokumaft:rice_plant") {
                for (let x=-1; x<=1; x++) {
                    for (let z=-1; z<=1; z++) {
                        let side = block.dimension.getBlock({x:block.location.x+x, y:block.location.y, z:block.location.z+z}) as Block;
                        if (side.typeId == MinecraftBlockTypes.Water) {
                            growthUp = true;
                        }
                    }
                }
            } else {
                for (let x=-4; x<=4; x++) {
                    for (let z=-4; z<=4; z++) {
                        let side = block.dimension.getBlock({x:block.location.x+x, y:block.location.y-1, z:block.location.z+z}) as Block;
                        if (side.typeId == MinecraftBlockTypes.Water) {
                            growthUp = true;
                        }
                    }
                }
            }
            if (growthUp) {
                block.setPermutation(block.permutation.withState("kurokumaft:growth", growth+1));
            }
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
                let growthUp = false;

                if (block.typeId == "kurokumaft:rice_plant") {
                    for (let x=-1; x<=1; x++) {
                        for (let z=-1; z<=1; z++) {
                            let side = block.dimension.getBlock({x:block.location.x+x, y:block.location.y, z:block.location.z+z}) as Block;
                            if (side.typeId == MinecraftBlockTypes.Water) {
                                growthUp = true;
                            }
                        }
                    }
                } else {
                    for (let x=-4; x<=4; x++) {
                        for (let z=-4; z<=4; z++) {
                            let side = block.dimension.getBlock({x:block.location.x+x, y:block.location.y-1, z:block.location.z+z}) as Block;
                            if (side.typeId == MinecraftBlockTypes.Water) {
                                growthUp = true;
                            }
                        }
                    }
                }
    
                if (growthUp) {
                    block.setPermutation(block.permutation.withState("kurokumaft:growth", growth+1));
                    event.dimension.spawnParticle("minecraft:crop_growth_emitter", {x:block.location.x+0.5, y:block.location.y, z:block.location.z+0.5});
                    subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
                }
            }
        }
    }
}
