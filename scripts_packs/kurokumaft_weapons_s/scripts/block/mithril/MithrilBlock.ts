import { BlockCustomComponent, Block, BlockComponentTickEvent, Dimension, Vector3, BlockPermutation, BlockComponentPlayerInteractEvent } from "@minecraft/server";
import { ProbabilisticChoice } from "../../common/WeaponsCommonUtil";

const mithrilChoiceLists = ProbabilisticChoice([
    { item: 0 , weight: 70 },
    { item: 1 , weight: 5 },
    { item: 2 , weight: 5 },
    { item: 3 , weight: 5 },
    { item: 4 , weight: 5 },
    { item: 5 , weight: 5 },
    { item: 6 , weight: 5 },
]);


/**
 * ミスリルブロック
 */
export class MithrilBlock implements BlockCustomComponent {

    onTick(event:BlockComponentTickEvent) {
        const block = event.block as Block;
        const dimension = event.dimension as Dimension;
        const states = block.permutation.getAllStates();
        const budding_type = states["kurokumaft:budding_type"] as string;
        if (budding_type === "none") {
            block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:budding_set":false, "kurokumaft:budding_type" : "spawn"}));
        } else if (budding_type === "spawn") {
            const budding_set = states["kurokumaft:budding_set"] as boolean;
            if (budding_set) {
                const budding_pos = states["kurokumaft:budding_pos"] as number;
                let bloc = {x:block.location.x,y:block.location.y,z:block.location.z} as Vector3;
                let b;
                if (budding_pos === 1) {
                    bloc = {x:block.location.x,y:block.location.y+1,z:block.location.z} as Vector3;
                    b = dimension.getBlock(bloc) as Block;
                } else if (budding_pos === 2) {
                    bloc = {x:block.location.x,y:block.location.y-1,z:block.location.z} as Vector3;
                    b = dimension.getBlock(bloc) as Block;
                } else if (budding_pos === 3) {
                    bloc = {x:block.location.x,y:block.location.y,z:block.location.z+1} as Vector3;
                    b = dimension.getBlock(bloc) as Block;
                } else if (budding_pos === 4) {
                    bloc = {x:block.location.x,y:block.location.y,z:block.location.z-1} as Vector3;
                    b = dimension.getBlock(bloc) as Block;
                } else if (budding_pos === 5) {
                    bloc = {x:block.location.x+1,y:block.location.y,z:block.location.z} as Vector3;
                    b = dimension.getBlock(bloc) as Block;
                } else if (budding_pos === 6) {
                    bloc = {x:block.location.x-1,y:block.location.y,z:block.location.z} as Vector3;
                    b = dimension.getBlock(bloc) as Block;
                }
                if (b && b.isAir) {
                    b.setPermutation(BlockPermutation.resolve("kurokumaft:small_mithril_bud", {
                        "kurokumaft:rotation": budding_pos,
                        "kurokumaft:place_type": 1
                    }));
                }
            } else {
                const set_budding_pos = mithrilChoiceLists.pick() as number;
                block.setPermutation(BlockPermutation.resolve(block.typeId, { 
                    "kurokumaft:budding_type" : "spawn",
                    "kurokumaft:budding_set" : true,
                    "kurokumaft:budding_pos" : set_budding_pos
                }));
            }
        }
    }

    onPlayerInteract(event:BlockComponentPlayerInteractEvent) {
        const block = event.block;
        checkMithrilBlock(block);
    }
}

export async function playerMithrilset(block:Block) {
    if (block.typeId == "kurokumaft:mithril_block") {
        block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:budding_type" : "player"}));
    }
    
}

async function checkMithrilBlock(block:Block) {

    if (block != undefined && block.matches("kurokumaft:mithril_block",{"kurokumaft:budding_type":"geode"})) {
        block.setPermutation(BlockPermutation.resolve(block.typeId, { 
            "kurokumaft:budding_set" : true,
            "kurokumaft:budding_type" : "spawn"
        }));
    }
}
