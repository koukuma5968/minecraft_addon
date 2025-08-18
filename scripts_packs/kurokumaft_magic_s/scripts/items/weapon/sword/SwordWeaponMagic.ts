import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, Player, EquipmentSlot, ItemComponentCompleteUseEvent } from "@minecraft/server";
import { itemDurabilityDamage } from "../../../common/MagicItemDurabilityDamage";
import { blazeBurst, fireSword, fireSwordMons } from "./FireSwordMagic";
import { waterSword, waterSwordMons } from "./WaterSwordMagic";
import { windSword, windSwordMons } from "./WindSwordMagic";
import { stoneSword, stoneSwordMons } from "./StoneSwordMagic";
import { thunderSword, thunderSwordMons } from "./ThunderSwordMagic";
import { iceSword, iceSwordMons } from "./IceSwordMagic";
import { darkSword, darkSwordMons } from "./DarkSwordMagic";
import { hollySword, hollySwordMons } from "./HollySwordMagic";
import { rainbowSword } from "./RainbowSwordMagic";

interface SwordMagicObject {
    itemName:string,
    func:CallableFunction,
    sendMsg:string
}

const SwordHitObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_sword",
        func: fireSword,
        sendMsg: "magic.kurokumaft:fireSword.translate"
    },
    {
        itemName: "kurokumaft:water_magic_sword",
        func: waterSword,
        sendMsg: "magic.kurokumaft:waterSword.translate"
    },
    {
        itemName: "kurokumaft:wind_magic_sword",
        func: windSword,
        sendMsg: "magic.kurokumaft:windSword.translate"
    },
    {
        itemName: "kurokumaft:stone_magic_sword",
        func: stoneSword,
        sendMsg: "magic.kurokumaft:stoneSword.translate"
    },
    {
        itemName: "kurokumaft:thunder_magic_sword",
        func: thunderSword,
        sendMsg: "magic.kurokumaft:thunderSword.translate"
    },
    {
        itemName: "kurokumaft:ice_magic_sword",
        func: iceSword,
        sendMsg: "magic.kurokumaft:iceSword.translate"
    },
    {
        itemName: "kurokumaft:dark_magic_sword",
        func: darkSword,
        sendMsg: "magic.kurokumaft:darkSword.translate"
    },
    {
        itemName: "kurokumaft:holly_magic_sword",
        func: hollySword,
        sendMsg: "magic.kurokumaft:hollySword.translate"
    },
    {
        itemName: "kurokumaft:rainbow_magic_sword",
        func: rainbowSword,
        sendMsg: "magic.kurokumaft:rainbowSword.translate"
    },
    {
        itemName: "kurokumaft:phoenix_sword",
        func: fireSword,
        sendMsg: "magic.kurokumaft:fireSword.translate"
    }
]);

interface SwordMagicMonsObject {
    itemName:string,
    func:CallableFunction
}

const SwordHitMonsObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_sword",
        func: fireSwordMons
    },
    {
        itemName: "kurokumaft:water_magic_sword",
        func: waterSwordMons
    },
    {
        itemName: "kurokumaft:wind_magic_sword",
        func: windSwordMons
    },
    {
        itemName: "kurokumaft:stone_magic_sword",
        func: stoneSwordMons
    },
    {
        itemName: "kurokumaft:thunder_magic_sword",
        func: thunderSwordMons
    },
    {
        itemName: "kurokumaft:ice_magic_sword",
        func: iceSwordMons
    },
    {
        itemName: "kurokumaft:dark_magic_sword",
        func: darkSwordMons
    },
    {
        itemName: "kurokumaft:holly_magic_sword",
        func: hollySwordMons
    }

]);

const SwordChargeObjects = Object.freeze([
    {
        itemName: "kurokumaft:phoenix_sword",
        func: blazeBurst,
        sendMsg: "magic.kurokumaft:blazeBurst.translate"
    }
]);

/**
 * ソード系魔法
 */
export class SwordWeaponMagic implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const itemStack = event.itemStack as ItemStack;
        const attackEntity = event.attackingEntity as Player;
        const hitEntity = event.hitEntity as Entity;
        const effect = event.hadEffect as boolean;

        if (!itemStack) {
            return;
        }
        const swordMagicObject = SwordHitObjects.find(obj => obj.itemName == itemStack.typeId) as SwordMagicObject;
        attackEntity.onScreenDisplay.setActionBar({rawtext:[{translate:swordMagicObject.sendMsg}]});
        swordMagicObject.func(attackEntity, hitEntity);

    }

    // チャージ完了
    onCompconsteUse(event:ItemComponentCompleteUseEvent) {
        const itemStack = event.itemStack as ItemStack;
        const player = event.source as Player;
        if (!itemStack) {
            return;
        }
        const swordChargeMagicObject = SwordChargeObjects.find(obj => obj.itemName == itemStack.typeId) as SwordMagicObject;
        player.onScreenDisplay.setActionBar({rawtext:[{translate:swordChargeMagicObject.sendMsg}]});
        swordChargeMagicObject.func(player);
        itemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);
    }

}

/**
 * ソード系魔法（モンスター）
 */
export class SwordWeaponMagicMons implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const itemStack = event.itemStack as ItemStack;
        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        const effect = event.hadEffect as boolean;

        if (!itemStack) {
            return;
        }
        const swordMagicObject = SwordHitMonsObjects.find(obj => obj.itemName == itemStack.typeId) as SwordMagicMonsObject;
        swordMagicObject.func(attackEntity, hitEntity);
        itemDurabilityDamage(attackEntity, itemStack, EquipmentSlot.Mainhand);

    }
}