import { BlockCustomComponent, Block, BlockComponentTickEvent, Dimension, Vector3, BlockPermutation, BlockComponentOnPlaceEvent, BlockComponentPlayerPlaceBeforeEvent, world, BlockComponentPlayerInteractEvent, Player, system, TicksPerSecond } from "@minecraft/server";
import { getRandomInRange, ProbabilisticChoice } from "../../common/commonUtil";

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
        let block = event.block as Block;
        let dimension = event.dimension as Dimension;
        let budding_type = block.permutation.getState("kurokumaft:budding_type") as string;
        if (budding_type == "none") {
            block.setPermutation(block.permutation.withState("kurokumaft:budding_type", "spawn"));
        } else if (budding_type == "spawn") {
            let budding_set = block.permutation.getState("kurokumaft:budding_set") as boolean;
            if (budding_set) {
                let budding_pos = block.permutation.getState("kurokumaft:budding_pos") as number;
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
            } else {
                let set_budding_pos = mithrilChoiceLists.pick() as number;
                block.setPermutation(block.permutation.withState("kurokumaft:budding_pos", set_budding_pos));
                block.setPermutation(block.permutation.withState("kurokumaft:budding_set", true));
            }
        }
    }

}

export async function playerMithrilset(block:Block) {
    if (block.typeId == "kurokumaft:mithril_block") {
        block.setPermutation(block.permutation.withState("kurokumaft:budding_type", "player"));
    }
    
}

export async function checkMithrilGeodeTick() {

    let players = world.getPlayers() as Player[];

    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        checkMithrilBlock(player);
    }
    system.runTimeout(checkMithrilGeodeTick,5*TicksPerSecond);
}

async function checkMithrilBlock(player:Player) {

    for (let x=-16;x<=16;x++) {
        for (let z=-16;z<=16;z++) {
            for (let y=-16;y<=16;y++) {
                if (player.location.y+y >= -64) {
                    let block = player.dimension.getBlock({x:player.location.x+x,y:player.location.y+y,z:player.location.z+z}) as Block;
                    if (block != undefined && block.matches("kurokumaft:mithril_block",{"kurokumaft:budding_set":false})) {
                        if (block.matches("kurokumaft:mithril_block",{"kurokumaft:budding_type":"none"})) {
                            block.setPermutation(block.permutation.withState("kurokumaft:budding_type", "spawn"));
                            let set_budding_pos = mithrilChoiceLists.pick() as number;
                            block.setPermutation(block.permutation.withState("kurokumaft:budding_pos", set_budding_pos));
                            block.setPermutation(block.permutation.withState("kurokumaft:budding_set", true));
                        }
                    }
                }
            }
        }
    }
}