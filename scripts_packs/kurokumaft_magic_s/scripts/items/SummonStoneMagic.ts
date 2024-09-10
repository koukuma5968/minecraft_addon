import { ItemComponentUseOnEvent, ItemCustomComponent, ItemStack } from "@minecraft/server";

interface SummonStoneObject {
    itemName:string,
    event:string
}

const SummonStoneObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_horse_summon_stone",
        event: "kurokumaft:fire_horse"
    },
    {
        itemName: "kurokumaft:aqua_frog_summon_stone",
        event: "kurokumaft:aqua_frog"
    },
    {
        itemName: "kurokumaft:storm_eagle_summon_stone",
        event: "kurokumaft:storm_eagle"
    },
    {
        itemName: "kurokumaft:lightning_hornet_summon_stone",
        event: "kurokumaft:lightning_hornet"
    },
    {
        itemName: "kurokumaft:snow_bear_summon_stone",
        event: "kurokumaft:snow_bear"
    },
    {
        itemName: "kurokumaft:crag_kong_summon_stone",
        event: "kurokumaft:crag_kong"
    }

]);

/**
 * 召喚石
 */
export class SummonStoneMagic implements ItemCustomComponent {

    // ブロッククリック
    onUseOn(event:ItemComponentUseOnEvent) {
        let block = event.block;
        let itemStack = event.itemStack as ItemStack;

        let magicObject = SummonStoneObjects.find(obj => obj.itemName == itemStack.typeId) as SummonStoneObject;
        if (magicObject) {
            let loc = block.location;
            block.dimension.spawnEntity(magicObject.event, {x:loc.x,y:loc.y+1,z:loc.z});
        }
    }

}
