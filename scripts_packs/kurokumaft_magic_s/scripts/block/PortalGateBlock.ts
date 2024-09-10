import { BlockCustomComponent, BlockComponentStepOnEvent, world, Vector3, Player } from "@minecraft/server";
import { MinecraftDimensionTypes, MinecraftEffectTypes } from "@minecraft/vanilla-data";

interface gateObj { 
    x: string
    z: string
}

interface hellVector2 { 
    x: number
    z: number
}

interface PortalGateObject {
    itemName:string,
    endName: string,
    gate: gateObj,
    portalState: string,
    hellLocate: hellVector2,
    tpLocate: hellVector2
}

const PortalGateObjects = Object.freeze([
    {
        itemName: "kurokumaft:magma_portal_gate",
        endName: "burning_hell",
        gate: {
            x: "kurokumaft:magma_portal_x",
            z: "kurokumaft:magma_portal_z"
        },
        portalState: "magma_states",
        hellLocate: {
            x: -564,
            z: -564
        },
        tpLocate: {
            x: -544,
            z: -464
        }

    }

]);

/**
 * ポータルゲートブロック
 */
export class PortalGateBlock implements BlockCustomComponent {

    onStepOn(blockEvent:BlockComponentStepOnEvent) {
        let gateObj = PortalGateObjects.find(obj => obj.itemName == blockEvent.block.typeId) as PortalGateObject;
        portalGateTp(gateObj, blockEvent);
    }

}

async function portalGateTp(gateObj:PortalGateObject, blockEvent:BlockComponentStepOnEvent) {
    let entity = blockEvent.entity;
    let block = blockEvent.block;
    let location = block.location;
    let dimension = blockEvent.dimension;
    let portal = dimension.getBlock({x:location.x,y:location.y+1,z:location.z});
    if (portal && (portal.typeId == gateObj.gate.x || portal.typeId == gateObj.gate.z)) {

        if (dimension.id == MinecraftDimensionTypes.Overworld) {
            let portal = dimension.getBlock({x:location.x,y:location.y+1,z:location.z});
            if (portal && (portal.typeId == gateObj.gate.x || portal.typeId == gateObj.gate.z)) {
                if (world.getDynamicProperty(gateObj.portalState) == 0) {
                    world.setDynamicProperty(gateObj.portalState, 1);
                    let zloca = gateObj.hellLocate.z;
                    for (let x=1; x<=8; x++) {
                        let xloca = gateObj.hellLocate.x;
                        for (let z=1; z<=8; z++) {
                            world.structureManager.place(gateObj.endName+"_"+x+"_"+z, 
                                world.getDimension(MinecraftDimensionTypes.TheEnd),
                                {x:xloca,y:100,z:zloca}
                            );
                            xloca += 16;
                        }
                        zloca += 16;
                    }
                }
                if (portal.typeId == gateObj.gate.x) {
                    entity?.setDynamicProperty("hell_tp_point", {x:location.x,y:location.y,z:location.z+2});
                } else {
                    entity?.setDynamicProperty("hell_tp_point", {x:location.x+2,y:location.y,z:location.z});
                }
                entity?.addEffect(MinecraftEffectTypes.SlowFalling,5, {
                    amplifier: 5
                });
                entity?.teleport({x:gateObj.tpLocate.x,y:130,z:gateObj.tpLocate.z}, {
                    dimension: world.getDimension(MinecraftDimensionTypes.TheEnd)
                });
            }
        } else {
            let overLoc = entity?.getDynamicProperty("hell_tp_point");
            if (overLoc) {
                entity?.teleport(overLoc as Vector3, {
                    dimension: world.getDimension(MinecraftDimensionTypes.Overworld)
                });
            } else {
                let player = entity as Player;
                player?.teleport({x:player.getSpawnPoint()!.x,y:player.getSpawnPoint()!.y,z:player.getSpawnPoint()!.z}, {
                    dimension: world.getDimension(MinecraftDimensionTypes.Overworld)
                });
            }
        }
    }

}
