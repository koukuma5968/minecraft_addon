import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, EquipmentSlot, ItemComponentCompleteUseEvent } from "@minecraft/server";
import { itemDurabilityDamage } from "../../../common/MagicItemDurabilityDamage";
import { shooting } from "../../../common/MagicShooterMagicEvent";

interface GunMagicObject {
    itemName:string,
    event:string
    sendMsg:string,
    property:string
}

const GunChargeObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_gun",
        event: "kurokumaft:fire_magic_bullet",
        sendMsg: "magic.kurokumaft:fire_magic_bullet.translate",
        property: "kurokumaft:gun_charge_fire"
    },
    {
        itemName: "kurokumaft:water_magic_gun",
        event: "kurokumaft:water_magic_bullet",
        sendMsg: "magic.kurokumaft:water_magic_bullet.translate",
        property: "kurokumaft:gun_charge_water"
    },
    {
        itemName: "kurokumaft:wind_magic_gun",
        event: "kurokumaft:wind_magic_bullet",
        sendMsg: "magic.kurokumaft:wind_magic_bullet.translate",
        property: "kurokumaft:gun_charge_wind"
    },
    {
        itemName: "kurokumaft:stone_magic_gun",
        event: "kurokumaft:stone_magic_bullet",
        sendMsg: "magic.kurokumaft:stone_magic_bullet.translate",
        property: "kurokumaft:gun_charge_stone"
    },
    {
        itemName: "kurokumaft:lightning_magic_gun",
        event: "kurokumaft:lightning_magic_bullet",
        sendMsg: "magic.kurokumaft:lightning_magic_bullet.translate",
        property: "kurokumaft:gun_charge_lightning"
    },
    {
        itemName: "kurokumaft:ice_magic_gun",
        event: "kurokumaft:ice_magic_bullet",
        sendMsg: "magic.kurokumaft:ice_magic_bullet.translate",
        property: "kurokumaft:gun_charge_ice"
    }
]);


/**
 * 銃系魔法
 */
export class GunShotMagic implements ItemCustomComponent {

    // チャージ完了
    onCompleteUse(event:ItemComponentCompleteUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;
        if (!itemStack) {
            return;
        }

        let gunMagicObject = GunChargeObjects.find(obj => obj.itemName == itemStack.typeId) as GunMagicObject;
        if (gunMagicObject) {
           player.setProperty(gunMagicObject.property, 1);
        }
    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        if (!itemStack) {
            return;
        }
        let gunMagicObject = GunChargeObjects.find(obj => obj.itemName == itemStack.typeId) as GunMagicObject;
        if (gunMagicObject) {
            if (player.getProperty(gunMagicObject.property) == 2) {
                magicGunShot(player, itemStack, gunMagicObject);
            }
        }
    }
}

export function isChargeed(player:Player, itemStack:ItemStack) : boolean {

    let gunMagicObject = GunChargeObjects.find(obj => obj.itemName == itemStack.typeId) as GunMagicObject;
    if (gunMagicObject) {
        if (player.getProperty(gunMagicObject.property) == 1) {
            player.setProperty(gunMagicObject.property, 2);
            return true;
        }
        return false;
    }
    return false;
}

/**
 * チャージ後に魔弾を発射
 * 
 * @param {Player} player
 * @param {ItemStack} itemStack
 * @param {GunMagicObject} gunMagicObject
 */
async function magicGunShot(player: Player, itemStack: ItemStack, gunMagicObject: GunMagicObject) {

    if (gunMagicObject.itemName == "kurokumaft:water_magic_gun") {
        shooting(player, gunMagicObject.event+"<kurokumaft:projectile_1>", 0, 3, undefined);
        shooting(player, gunMagicObject.event+"<kurokumaft:projectile_2>", 0, 3, undefined);
        shooting(player, gunMagicObject.event+"<kurokumaft:projectile_3>", 0, 3, undefined);
        shooting(player, gunMagicObject.event+"<kurokumaft:projectile_4>", 0, 3, undefined);
        shooting(player, gunMagicObject.event+"<kurokumaft:projectile_5>", 0, 3, undefined);
        shooting(player, gunMagicObject.event+"<kurokumaft:projectile_6>", 0, 3, undefined);
        shooting(player, gunMagicObject.event+"<kurokumaft:projectile_7>", 0, 3, undefined);
        shooting(player, gunMagicObject.event+"<kurokumaft:projectile_8>", 0, 3, undefined);
    } else {
        shooting(player, gunMagicObject.event, 0, 3, undefined);
    }
    itemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);
    player.setProperty(gunMagicObject.property, 0);
    player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + gunMagicObject.sendMsg + "\"}]}");

}
