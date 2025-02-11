import { BlockCustomComponent, BlockComponentStepOnEvent, world } from "@minecraft/server";

interface BossSummonObject {
    itemName:string,
    entityName:string,
    func: any
}

const BossSummonObjects = Object.freeze([
    {
        itemName: "kurokumaft:phoenix_summon",
        entityName: "kurokumaft:phoenix",
        func: phoenixSummon
    },
    {
        itemName: "kurokumaft:fenrir_summon",
        entityName: "kurokumaft:fenrir",
        func: fenrirSummon
    }

]);

/**
 * ボス召喚ブロック
 */
export class BossSummonBlock implements BlockCustomComponent {

    onStepOn(blockEvent:BlockComponentStepOnEvent) {
        let sumOb = BossSummonObjects.find(obj => obj.itemName == blockEvent.block.typeId) as BossSummonObject;
        sumOb.func(sumOb, blockEvent);
    }

}

async function phoenixSummon(sumOb:BossSummonObject ,blockEvent:BlockComponentStepOnEvent) {
    let block = blockEvent.block;
    let state = block.permutation.getState("kurokumaft:summon_check");
    if (state == 0) {
        let dimension = blockEvent.dimension;
        dimension.spawnEntity(sumOb.entityName, {x:block.location.x+0.5,y:block.location.y+6,z:block.location.z+0.5})
        block.setPermutation(block.permutation.withState("kurokumaft:summon_check", 1));
    }
}

async function fenrirSummon(sumOb:BossSummonObject ,blockEvent:BlockComponentStepOnEvent) {
    let block = blockEvent.block;
    let state = block.permutation.getState("kurokumaft:summon_check");
    if (state == 0) {
        let dimension = blockEvent.dimension;
        dimension.spawnEntity(sumOb.entityName, {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5})
        block.setPermutation(block.permutation.withState("kurokumaft:summon_check", 1));
    }
}
