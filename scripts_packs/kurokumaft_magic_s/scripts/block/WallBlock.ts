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
        const entity = blockEvent.entity as Entity;
        if (entity != undefined) {
            const filterOption = {
                excludeFamilies: [
                    "inanimate", "magic", "arrow"
                ],
                excludeTypes: [
                    "item"
                ],
                location: entity.location
            } as EntityQueryOptions;
    
            if (entity.matches(filterOption)) {
                const wallMagicObject = WallMagicObjects.find(obj => obj.itemName == blockEvent.block.typeId) as WallMagicObject;
                wallMagicObject.func(blockEvent);
            }
        }
    }

    onStepOff(blockEvent:BlockComponentStepOffEvent) {

        const entity = blockEvent.entity as Entity;
        if (entity != undefined) {
            const wallNum = entity.getDynamicProperty("walllNum");
            if (wallNum != undefined) {
                system.clearRun(wallNum as number);
            }
        }
    }
}

async function lightningwall(blockEvent:BlockComponentStepOnEvent) {
    const block = blockEvent.block;
    const dimension = blockEvent.dimension;
    const entity = blockEvent.entity as Entity;
    const intervalnum = system.runInterval(() => {
        entity.applyDamage(1, {
            cause: EntityDamageCause.lightning
        });
    },4);
    entity.setDynamicProperty("walllNum", intervalnum);


}

async function waterwall(blockEvent:BlockComponentStepOnEvent) {
    const block = blockEvent.block;
    const dimension = blockEvent.dimension;
    const entity = blockEvent.entity as Entity;
    const intervalnum = system.runInterval(() => {
        entity.applyDamage(1, {
            cause: EntityDamageCause.drowning
        });
    },4);
    entity.setDynamicProperty("walllNum", intervalnum);

}

async function windwall(blockEvent:BlockComponentStepOnEvent) {
    const block = blockEvent.block;
    const dimension = blockEvent.dimension;
    const entity = blockEvent.entity as Entity;
    entity.addEffect(MinecraftEffectTypes.Levitation, 2*TicksPerSecond, {
        amplifier: 3
    });

}
