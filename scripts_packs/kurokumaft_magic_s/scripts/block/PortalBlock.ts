import { BlockCustomComponent, BlockComponentStepOnEvent, world, BlockComponentPlayerBreakEvent, Block, BlockPermutation } from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftDimensionTypes, MinecraftEffectTypes } from "@minecraft/vanilla-data";

interface PortalObject {
    itemName:string,
    portalState: string,
}

const PortalObjects = Object.freeze([
    {
        itemName: "kurokumaft:magma_portal_x",
        portalState: "magma_states"
    },
    {
        itemName: "kurokumaft:magma_portal_z",
        portalState: "magma_states"
    }

]);

/**
 * ポータルブロック
 */
export class PortalBlock implements BlockCustomComponent {

    onPlayerBreak(blockEvent:BlockComponentPlayerBreakEvent) {
        const blockPermutation = blockEvent.brokenBlockPermutation as BlockPermutation;
        const block = blockEvent.block;
        portalGateBreak(block, blockPermutation);
    }

}

export async function portalGateBreak(block:Block, blockPermutation:BlockPermutation) {

    const portalObj = PortalObjects.find(obj => obj.itemName === blockPermutation.type.id) as PortalObject;
    if (portalObj !== undefined) {
        world.setDynamicProperty(portalObj.portalState, 0);
        for (let x=-2; x<=2; x++) {
            for (let y=-2; y<=2; y++) {
                const portal = block.dimension.getBlock({x:block.location.x+x,y:block.location.y+y,z:block.location.z}) as Block;
                if (portal && portal.typeId == portalObj.itemName) {
                    block.dimension.setBlockType({x:block.location.x+x,y:block.location.y+y,z:block.location.z}, MinecraftBlockTypes.Air);
                }
            }
        }
        for (let z=-2; z<=2; z++) {
            for (let y=-2; y<=2; y++) {
                const portal = block.dimension.getBlock({x:block.location.x,y:block.location.y+y,z:block.location.z+z}) as Block;
                if (portal && portal.typeId == portalObj.itemName) {
                    block.dimension.setBlockType({x:block.location.x,y:block.location.y+y,z:block.location.z+z}, MinecraftBlockTypes.Air);
                }
            }
        }
    }

}
