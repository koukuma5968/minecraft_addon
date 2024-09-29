import { BlockCustomComponent, Block, BlockComponentTickEvent, BlockPermutation } from "@minecraft/server";
import { getRandomInRange } from "../../common/commonUtil";

/**
 * 芽吹きミスリル成長
 */
export class MithrilBudGrowth implements BlockCustomComponent {

    onTick(event:BlockComponentTickEvent) {
        let block = event.block as Block;
        let place_type = block.permutation.getState("kurokumaft:place_type") as number;
        if (place_type == 1) {
            let rotation = block.permutation.getState("kurokumaft:rotation") as number;
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
