import { EquipmentSlot, ItemComponentUseOnEvent, ItemCustomComponent, ItemStack, Player, world } from "@minecraft/server";
import { itemDurabilityMagicDamage } from "../common/MagicItemDurabilityDamage";

interface gateObj { 
    x: string
    z: string
}

interface FlagStoneObject {
    itemName:string,
    blockName:string,
    entity: string,
    gate: gateObj,
    portalState: string
}

const FlagStoneObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_flagstone",
        blockName: "kurokumaft:magma_portal_gate",
        gate: {
            x: "kurokumaft:magma_portal_x",
            z: "kurokumaft:magma_portal_z"
        },
        portalState: "magma_states"
    }

]);

/**
 * 魔法火打石
 */
export class FlagStoneMagic implements ItemCustomComponent {

    // ブロッククリック
    onUseOn(event:ItemComponentUseOnEvent) {
        const itemStack = event.itemStack as ItemStack;
        const player = event.source as Player;

        const magicObject = FlagStoneObjects.find(obj => obj.itemName == itemStack.typeId) as FlagStoneObject;
        if (magicObject) {
            setPortalStand(magicObject, event);
            itemDurabilityMagicDamage(player, itemStack, EquipmentSlot.Mainhand);
        }
    }

}

async function setPortalStand(magicObject:FlagStoneObject ,event:ItemComponentUseOnEvent) {
    const block = event.block;
    const face = event.blockFace;
    if (magicObject.blockName == block.typeId && face == "Up") {
        const dimension = block.dimension;
        const location = block.location;
        let xLoca = true;
        A:
        for (let x=-2; x<=2; x++) {
            for (let y=0; y<=4; y++) {
                let block = dimension.getBlock({x:location.x+x,y:location.y+y,z:location.z});
                if (x==-2 || x==2) {
                    if (block == undefined || block.typeId != magicObject.blockName) {
                        xLoca = false;
                        break A;
                    }
                } else {
                    if (y > 0 && y < 4) {
                        if (block == undefined || !block.isAir) {
                            xLoca = false;
                            break A;
                        }
                    } else {
                        if (block == undefined || block.typeId != magicObject.blockName) {
                            xLoca = false;
                            break A;
                        }
                    }
                }
            }
        }

        if (xLoca) {
            for (let x=-1; x<=1; x++) {
                for (let y=1; y<=3; y++) {
                    dimension.setBlockType({x:location.x+x,y:location.y+y,z:location.z}, magicObject.gate.x);
                }
            }
            world.setDynamicProperty(magicObject.portalState, 0);
            return;
        }

        let zLoca = true;
        A:
        for (let z=-2; z<=2; z++) {
            for (let y=0; y<=4; y++) {
                let block = dimension.getBlock({x:location.x,y:location.y+y,z:location.z+z});
                if (z==-2 || z==2) {
                    if (block == undefined || block.typeId != magicObject.blockName) {
                        zLoca = false;
                        break A;
                    }
                } else {
                    if (y > 0 && y < 4) {
                        if (block == undefined || !block.isAir) {
                            zLoca = false;
                            break A;
                        }
                    } else {
                        if (block == undefined || block.typeId != magicObject.blockName) {
                            zLoca = false;
                            break A;
                        }
                    }
                }
            }
        }

        if (zLoca) {
            for (let z=-1; z<=1; z++) {
                for (let y=1; y<=3; y++) {
                    dimension.setBlockType({x:location.x,y:location.y+y,z:location.z+z}, magicObject.gate.z);
                }
            }
            world.setDynamicProperty(magicObject.portalState, 0);
            return;
        }
    }
}