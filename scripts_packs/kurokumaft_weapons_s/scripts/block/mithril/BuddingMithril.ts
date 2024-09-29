import { BlockCustomComponent, Block, BlockComponentTickEvent, Vector3, Dimension, BlockPermutation } from "@minecraft/server";
import { getRandomInRange, ProbabilisticChoice } from "../../common/commonUtil";

const mithrilChoiceLists = ProbabilisticChoice([
    { item: 1 , weight: 20 },
    { item: 2 , weight: 15 },
    { item: 3 , weight: 15 },
    { item: 4 , weight: 15 },
    { item: 5 , weight: 15 },
    { item: 6 , weight: 20 },
]);

/**
 * ミスリルブロック
 */
export class BuddingMithril implements BlockCustomComponent {

    onTick(event:BlockComponentTickEvent) {
        let block = event.block as Block;
        let dimension = event.dimension as Dimension;
        let budding_pos = mithrilChoiceLists.pick() as number;
        let bloc = {x:block.location.x,y:block.location.y,z:block.location.z} as Vector3;
        let b;
        if (budding_pos == 1) {
            bloc = {x:block.location.x,y:block.location.y+1,z:block.location.z} as Vector3;
            b = dimension.getBlock(bloc) as Block;
        } else if (budding_pos == 2) {
            bloc = {x:block.location.x,y:block.location.y-1,z:block.location.z} as Vector3;
            b = dimension.getBlock(bloc) as Block;
        } else if (budding_pos == 3) {
            bloc = {x:block.location.x,y:block.location.y,z:block.location.z+1} as Vector3;
            b = dimension.getBlock(bloc) as Block;
        } else if (budding_pos == 4) {
            bloc = {x:block.location.x,y:block.location.y,z:block.location.z-1} as Vector3;
            b = dimension.getBlock(bloc) as Block;
        } else if (budding_pos == 5) {
            bloc = {x:block.location.x+1,y:block.location.y,z:block.location.z} as Vector3;
            b = dimension.getBlock(bloc) as Block;
        } else if (budding_pos == 6) {
            bloc = {x:block.location.x-1,y:block.location.y,z:block.location.z} as Vector3;
            b = dimension.getBlock(bloc) as Block;
        }
        if (b && b.isAir) {
            b.setPermutation(BlockPermutation.resolve("kurokumaft:small_mithril_bud", {
                "kurokumaft:rotation": budding_pos,
                "kurokumaft:place_type": 1
            }));
        }
    }
}
