import { BlockCustomComponent, Block, BlockComponentTickEvent, BlockPermutation, CustomComponentParameters, BlockComponentPlayerInteractEvent, Player, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, ItemStack } from "@minecraft/server";
import { MHGrowthPlantsTypes } from "../common/types/MHBlocksTypes";
import { subtractionItem } from "../common/MHCommonUtil";

/**
 * 植物
 */
export class MHPlantsGrowth implements BlockCustomComponent {

    onTick (event: BlockComponentTickEvent, arg: CustomComponentParameters) {
        const block = event.block as Block;
        const states = block.permutation.getAllStates();
        const growth =  states["kurokumaft:growth"] as number;
        const groew_types = arg.params as MHGrowthPlantsTypes;
        if (growth < groew_types.grow_size) {
            switch (groew_types.type) {
                case "farmland" :
                    for (let x=-4; x<=4; x++) {
                        for (let z=-4; z<=4; z++) {
                            const side = block.dimension.getBlock({x:block.location.x+x, y:block.location.y-1, z:block.location.z+z}) as Block;
                            if (side.typeId == "minecraft:water") {
                                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1}));
                            }
                        }
                    }
                    break;
                case "log" :
                    const block_face =  states["minecraft:block_face"] as string;
                    switch (block_face) {
                        case "up" :
                            const up = block.dimension.getBlock({x:block.location.x, y:block.location.y-1, z:block.location.z}) as Block;
                            if (up.permutation.getTags().indexOf("log") != -1) {
                                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1, "minecraft:block_face": block_face}));
                            }
                            break;
                        case "down" :
                            const down = block.dimension.getBlock({x:block.location.x, y:block.location.y+1, z:block.location.z}) as Block;
                            if (down.permutation.getTags().indexOf("log") != -1) {
                                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1, "minecraft:block_face": block_face}));
                            }
                            break;
                        case "north" :
                            const north = block.dimension.getBlock({x:block.location.x, y:block.location.y, z:block.location.z+1}) as Block;
                            if (north.permutation.getTags().indexOf("log") != -1) {
                                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1, "minecraft:block_face": block_face}));
                            }
                            break;
                        case "south" :
                            const south = block.dimension.getBlock({x:block.location.x, y:block.location.y, z:block.location.z-1}) as Block;
                            if (south.permutation.getTags().indexOf("log") != -1) {
                                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1, "minecraft:block_face": block_face}));
                            }
                            break;
                        case "west" :
                            const west = block.dimension.getBlock({x:block.location.x+1, y:block.location.y, z:block.location.z}) as Block;
                            if (west.permutation.getTags().indexOf("log") != -1) {
                                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1, "minecraft:block_face": block_face}));
                            }
                            break;
                        case "east" :
                            const east = block.dimension.getBlock({x:block.location.x-1, y:block.location.y, z:block.location.z}) as Block;
                            if (east.permutation.getTags().indexOf("log") != -1) {
                                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1, "minecraft:block_face": block_face}));
                            }
                            break;
                    }
                    break;
            }
        }
    }

    onPlayerInteract(event:BlockComponentPlayerInteractEvent, arg: CustomComponentParameters) {
        const player = event.player as Player;
        const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const itemStack = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (itemStack != undefined && itemStack.typeId.indexOf("meal") != -1) {
            const block = event.block as Block;
            const states = block.permutation.getAllStates();
            const growth =  states["kurokumaft:growth"] as number;
            const groew_types = arg.params as MHGrowthPlantsTypes;
            if (growth < groew_types.grow_size) {
            switch (groew_types.type) {
                case "farmland" :
                    for (let x=-4; x<=4; x++) {
                        for (let z=-4; z<=4; z++) {
                            const side = block.dimension.getBlock({x:block.location.x+x, y:block.location.y-1, z:block.location.z+z}) as Block;
                            if (side.typeId == "minecraft:water") {
                                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1}));
                                event.dimension.spawnParticle("minecraft:crop_growth_emitter", {x:block.location.x+0.5, y:block.location.y, z:block.location.z+0.5});
                                subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
                            }
                        }
                    }
                    break;
                case "log" :
                    const block_face =  states["minecraft:block_face"] as string;
                    switch (block_face) {
                        case "up" :
                            const up = block.dimension.getBlock({x:block.location.x, y:block.location.y-1, z:block.location.z}) as Block;
                            if (up.permutation.getTags().indexOf("log") != -1) {
                                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1, "minecraft:block_face": block_face}));
                                event.dimension.spawnParticle("minecraft:crop_growth_emitter", {x:block.location.x+0.5, y:block.location.y, z:block.location.z+0.5});
                                subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
                            }
                            break;
                        case "down" :
                            const down = block.dimension.getBlock({x:block.location.x, y:block.location.y+1, z:block.location.z}) as Block;
                            if (down.permutation.getTags().indexOf("log") != -1) {
                                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1, "minecraft:block_face": block_face}));
                                event.dimension.spawnParticle("minecraft:crop_growth_emitter", {x:block.location.x+0.5, y:block.location.y, z:block.location.z+0.5});
                                subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
                            }
                            break;
                        case "north" :
                            const north = block.dimension.getBlock({x:block.location.x, y:block.location.y, z:block.location.z+1}) as Block;
                            if (north.permutation.getTags().indexOf("log") != -1) {
                                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1, "minecraft:block_face": block_face}));
                                event.dimension.spawnParticle("minecraft:crop_growth_emitter", {x:block.location.x+0.5, y:block.location.y, z:block.location.z+0.5});
                                subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
                            }
                            break;
                        case "south" :
                            const south = block.dimension.getBlock({x:block.location.x, y:block.location.y, z:block.location.z-1}) as Block;
                            if (south.permutation.getTags().indexOf("log") != -1) {
                                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1, "minecraft:block_face": block_face}));
                                event.dimension.spawnParticle("minecraft:crop_growth_emitter", {x:block.location.x+0.5, y:block.location.y, z:block.location.z+0.5});
                                subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
                            }
                            break;
                        case "west" :
                            const west = block.dimension.getBlock({x:block.location.x+1, y:block.location.y, z:block.location.z}) as Block;
                            if (west.permutation.getTags().indexOf("log") != -1) {
                                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1, "minecraft:block_face": block_face}));
                                event.dimension.spawnParticle("minecraft:crop_growth_emitter", {x:block.location.x+0.5, y:block.location.y, z:block.location.z+0.5});
                                subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
                            }
                            break;
                        case "east" :
                            const east = block.dimension.getBlock({x:block.location.x-1, y:block.location.y, z:block.location.z}) as Block;
                            if (east.permutation.getTags().indexOf("log") != -1) {
                                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth" : growth+1, "minecraft:block_face": block_face}));
                                event.dimension.spawnParticle("minecraft:crop_growth_emitter", {x:block.location.x+0.5, y:block.location.y, z:block.location.z+0.5});
                                subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
                            }
                            break;
                    }
                    break;
                }
            }
        }
    }

}
