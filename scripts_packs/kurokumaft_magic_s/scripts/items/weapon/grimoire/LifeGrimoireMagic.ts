import { ItemComponentUseEvent, ItemComponentUseOnEvent, ItemCustomComponent, ItemStack } from "@minecraft/server";
import { ignited, torchlight } from "./FireGrimoireMagic";
import { water } from "./WaterGrimoireMagic";
import { mowing, musicSound } from "./WindGrimoireMagic";
import { flowerGarden, growth } from "./StoneGrimoireMagic";

interface LifeGrimoireMagicObject {
    itemName:string,
    func:any
}

const LifeGrimoireUseOnObjects = Object.freeze([
    {
        itemName: "kurokumaft:grimoire_torchlight",
        func: torchlight
    },
    {
        itemName: "kurokumaft:grimoire_ignited",
        func: ignited
    },
    {
        itemName: "kurokumaft:grimoire_water",
        func: water
    },
    {
        itemName: "kurokumaft:grimoire_flower_garden",
        func: flowerGarden
    },
    {
        itemName: "kurokumaft:grimoire_growth",
        func: growth
    }

]);

const LifeGrimoireUseObjects = Object.freeze([
    {
        itemName: "kurokumaft:grimoire_mowing",
        func: mowing
    },
    {
        itemName: "kurokumaft:grimoire_music_sound",
        func: musicSound
    }

]);

/**
 * 生活魔導書(ブロック系)
 */
export class LifeGrimoireBlockMagic implements ItemCustomComponent {

    // ブロッククリック
    onUseOn(event:ItemComponentUseOnEvent) {
        const itemStack = event.itemStack as ItemStack;

        const magicObject = LifeGrimoireUseOnObjects.find(obj => obj.itemName == itemStack.typeId) as LifeGrimoireMagicObject;
        if (magicObject) {
            magicObject.func(event);
        }
    }

}

/**
 * 生活魔導書(アイテム使用)
 */
export class LifeGrimoireUseMagic implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        const itemStack = event.itemStack as ItemStack;

        const magicObject = LifeGrimoireUseObjects.find(obj => obj.itemName == itemStack.typeId) as LifeGrimoireMagicObject;
        if (magicObject) {
            magicObject.func(event);
        }
    }
}

