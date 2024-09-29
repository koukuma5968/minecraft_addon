import { BlockCustomComponent, Block, BlockComponentTickEvent, world } from "@minecraft/server";

/**
 * 爆竹爆発
 */
export class BakutikuFire implements BlockCustomComponent {

    onTick(event:BlockComponentTickEvent) {
        let block = event.block as Block;
        block.dimension.spawnEntity("kurokumaft:bakutiku_entity<from_explosion>", {x:block.location.x+0.5,y:block.location.y+0.5,z:block.location.z+0.5});
    }
}
