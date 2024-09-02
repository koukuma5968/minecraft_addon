import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, GameMode, EquipmentSlot, ItemComponentUseOnEvent, system, ItemComponentCompleteUseEvent } from "@minecraft/server";
import { getRandomInRange, clamp } from "../../../common/commonUtil";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { shooting } from "../../../custom/ShooterMagicEvent";

interface BazookaMagicObject {
    itemName:string
}

const BazookaChargeObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_bazooka"
    },
    {
        itemName: "kurokumaft:water_magic_bazooka"
    },
    {
        itemName: "kurokumaft:wind_magic_bazooka"
    },
    {
        itemName: "kurokumaft:stone_magic_bazooka"
    },
    {
        itemName: "kurokumaft:lightning_magic_bazooka"
    },
    {
        itemName: "kurokumaft:ice_magic_bazooka"
    }
]);


/**
 * バズーカ系魔法
 */
export class BazookaShotMagic implements ItemCustomComponent {

    // チャージ完了
    onCompleteUse(event:ItemComponentCompleteUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;
    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        if (!itemStack) {
            return;
        }
    }

    // ブロッククリック
    onUseOn(event:ItemComponentUseOnEvent) {
    }
}
