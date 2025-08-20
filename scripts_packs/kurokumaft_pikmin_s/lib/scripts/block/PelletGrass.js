import { EntityComponentTypes, EquipmentSlot, BlockPermutation } from "@minecraft/server";
import { subtractionItem } from "../common/PikuminItemDurabilityDamage";
import { weightChoice } from "../common/PikuminCommonUtil";
/**
 * ペレットブロック
 */
export class PelletGrassBlock {
    onTick(event) {
        const block = event.block;
        const states = block.permutation.getAllStates();
        const growth = states["kurokumaft:growth"];
        if (growth < 2) {
            block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth": growth + 1 }));
        }
    }
    onPlayerInteract(event) {
        const player = event.player;
        const equ = player.getComponent(EntityComponentTypes.Equippable);
        const itemStack = equ.getEquipment(EquipmentSlot.Mainhand);
        if (itemStack != undefined && itemStack.typeId.indexOf("meal") != -1) {
            const block = event.block;
            const states = block.permutation.getAllStates();
            const growth = states["kurokumaft:growth"];
            if (growth < 2) {
                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth": growth + 1 }));
                event.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
                subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
            }
            else if (growth == 2) {
                const dimension = block.dimension;
                const location = block.location;
                const pekketLists = weightChoice([
                    { item: 'red', weight: 20 },
                    { item: 'blue', weight: 20 },
                    { item: 'yellow', weight: 20 },
                    { item: 'purple', weight: 15 },
                    { item: 'white', weight: 15 },
                    { item: 'rock', weight: 5 },
                    { item: 'feather', weight: 5 },
                ]);
                dimension.setBlockType(location, "minecraft:air");
                const choice = pekketLists.pick();
                switch (choice) {
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
//# sourceMappingURL=PelletGrass.js.map