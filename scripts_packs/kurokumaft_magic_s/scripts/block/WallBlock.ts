import { BlockCustomComponent, BlockEvent, BlockComponentStepOnEvent, EntityDamageCause, Entity, EffectTypes, TicksPerSecond, system, EntityQueryOptions, BlockComponentStepOffEvent, world } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

interface WallMagicObject {
    itemName:string,
    func:CallableFunction
}

const WallMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:lightningwall_block",
        func: lightningwall
    },
    {
        itemName: "kurokumaft:waterwall_block",
        func: waterwall
    },
    {
        itemName: "kurokumaft:windwall_block",
        func: windwall
    }

]);

/**
 * ウォールブロック
 */
export class WallBlock implements BlockCustomComponent {

    onStepOn(blockEvent:BlockComponentStepOnEvent) {
        let entity = blockEvent.entity as Entity;
        if (entity != undefined) {
            let filterOption = {
                excludeFamilies: [
                    "inanimate", "magic", "arrow"
                ],
                excludeTypes: [
                    "item"
                ],
                location: entity.location
            } as EntityQueryOptions;
    
            if (entity.matches(filterOption)) {
                let wallMagicObject = WallMagicObjects.find(obj => obj.itemName == blockEvent.block.typeId) as WallMagicObject;
                wallMagicObject.func(blockEvent);
            }
        }
    }

    onStepOff(blockEvent:BlockComponentStepOffEvent) {

        let entity = blockEvent.entity as Entity;
        if (entity != undefined) {
            let wallNum = entity.getDynamicProperty("walllNum");
            if (wallNum != undefined) {
                system.clearRun(wallNum as number);
            }
        }
    }
}

async function lightningwall(blockEvent:BlockComponentStepOnEvent) {
    let block = blockEvent.block;
    let dimension = blockEvent.dimension;
    let entity = blockEvent.entity as Entity;
    let intervalnum = system.runInterval(() => {
        entity.applyDamage(1, {
            cause: EntityDamageCause.lightning
        });
    },4);
    entity.setDynamicProperty("walllNum", intervalnum);


}

async function waterwall(blockEvent:BlockComponentStepOnEvent) {
    let block = blockEvent.block;
    let dimension = blockEvent.dimension;
    let entity = blockEvent.entity as Entity;
    let intervalnum = system.runInterval(() => {
        entity.applyDamage(1, {
            cause: EntityDamageCause.drowning
        });
    },4);
    entity.setDynamicProperty("walllNum", intervalnum);

}

async function windwall(blockEvent:BlockComponentStepOnEvent) {
    let block = blockEvent.block;
    let dimension = blockEvent.dimension;
    let entity = blockEvent.entity as Entity;
    entity.addEffect(MinecraftEffectTypes.Levitation, 2*TicksPerSecond, {
        amplifier: 3
    });

}
