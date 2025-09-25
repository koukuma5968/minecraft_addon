import { BlockCustomComponent, BlockComponentStepOnEvent, BlockPermutation } from "@minecraft/server";

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
        const sumOb = BossSummonObjects.find(obj => obj.itemName == blockEvent.block.typeId) as BossSummonObject;
        sumOb.func(sumOb, blockEvent);
    }

}

async function phoenixSummon(sumOb:BossSummonObject ,blockEvent:BlockComponentStepOnEvent) {
    const block = blockEvent.block;
    const dimension = blockEvent.dimension;
    dimension.spawnEntity(sumOb.entityName, {x:block.location.x+0.5,y:block.location.y+6,z:block.location.z+0.5})
    block.setPermutation(BlockPermutation.resolve(block.typeId, {"kurokumaft:summon_check":1}));
}

async function fenrirSummon(sumOb:BossSummonObject ,blockEvent:BlockComponentStepOnEvent) {
    const block = blockEvent.block;
    const dimension = blockEvent.dimension;
    dimension.spawnEntity(sumOb.entityName, {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5})
    block.setPermutation(BlockPermutation.resolve(block.typeId, {"kurokumaft:summon_check":1}));
}
