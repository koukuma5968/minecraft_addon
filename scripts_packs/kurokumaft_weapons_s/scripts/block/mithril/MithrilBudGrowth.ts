import { BlockCustomComponent, Block, BlockComponentTickEvent, BlockPermutation } from "@minecraft/server";

/**
 * 芽吹きミスリル成長
 */
export class MithrilBudGrowth implements BlockCustomComponent {

    onTick(event:BlockComponentTickEvent) {
        const block = event.block as Block;
        if (block.permutation.matches(block.typeId, {"kurokumaft:place_type":1})) {
            const states = block.permutation.getAllStates();
            const rotation = states["kurokumaft:rotation"] as number;
            if (block.typeId == "kurokumaft:small_mithril_bud") {
                block.setPermutation(BlockPermutation.resolve("kurokumaft:medium_mithril_bud", {
                    "kurokumaft:rotation": rotation,
                    "kurokumaft:place_type": 1
                }));
            } else if (block.typeId == "kurokumaft:medium_mithril_bud") {
                block.setPermutation(BlockPermutation.resolve("kurokumaft:large_mithril_bud", {
                    "kurokumaft:rotation": rotation,
                    "kurokumaft:place_type": 1
                }));
            } else if (block.typeId == "kurokumaft:large_mithril_bud") {
                block.setPermutation(BlockPermutation.resolve("kurokumaft:mithril_cluster", {
                    "kurokumaft:rotation": rotation,
                    "kurokumaft:place_type": 1
                }));
            }
        }
    }
}
