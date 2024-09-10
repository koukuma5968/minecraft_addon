import { BlockCustomComponent, BlockEvent, BlockComponentStepOnEvent, EntityDamageCause, Entity, EffectTypes } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

interface WallMagicObject {
    itemName:string,
    func:any
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
        WallMagicObjects.find(obj => obj.itemName == blockEvent.block.typeId)?.func(blockEvent);
    }

}

async function lightningwall(blockEvent:BlockComponentStepOnEvent) {
    let block = blockEvent.block;
    let dimension = blockEvent.dimension;
    let entity = blockEvent.entity as Entity;
    entity.applyDamage(1, {
        cause: EntityDamageCause.lightning
    });

}

async function waterwall(blockEvent:BlockComponentStepOnEvent) {
    let block = blockEvent.block;
    let dimension = blockEvent.dimension;
    let entity = blockEvent.entity as Entity;
    entity.applyDamage(1, {
        cause: EntityDamageCause.drowning
    });

}

async function windwall(blockEvent:BlockComponentStepOnEvent) {
    let block = blockEvent.block;
    let dimension = blockEvent.dimension;
    let entity = blockEvent.entity as Entity;
    entity.addEffect(MinecraftEffectTypes.Levitation, 2, {
        amplifier: 2
    });

}
