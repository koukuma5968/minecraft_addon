import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, EquipmentSlot, ItemComponentCompleteUseEvent, CustomComponentParameters } from "@minecraft/server";
import { itemDurabilityMagicDamage } from "../../../common/MagicItemDurabilityDamage";
import { shooting } from "../../../common/MagicShooterMagicEvent";

interface GunMagicObject {
    itemName:string,
    event:string
    sendMsg:string,
    property:string,
    sound:string
}

const GunChargeObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_gun",
        event: "kurokumaft:fire_magic_bullet",
        sendMsg: "magic.kurokumaft:fire_magic_bullet.translate",
        property: "kurokumaft:gun_charge_fire",
        sound: "cauldron.explode"
    },
    {
        itemName: "kurokumaft:water_magic_gun",
        event: "kurokumaft:water_magic_bullet",
        sendMsg: "magic.kurokumaft:water_magic_bullet.translate",
        property: "kurokumaft:gun_charge_water",
        sound: "cauldron.explode"
    },
    {
        itemName: "kurokumaft:wind_magic_gun",
        event: "kurokumaft:wind_magic_bullet",
        sendMsg: "magic.kurokumaft:wind_magic_bullet.translate",
        property: "kurokumaft:gun_charge_wind",
        sound: "cauldron.explode"
    },
    {
        itemName: "kurokumaft:stone_magic_gun",
        event: "kurokumaft:stone_magic_bullet",
        sendMsg: "magic.kurokumaft:stone_magic_bullet.translate",
        property: "kurokumaft:gun_charge_stone",
        sound: "cauldron.explode"
    },
    {
        itemName: "kurokumaft:lightning_magic_gun",
        event: "kurokumaft:lightning_magic_bullet",
        sendMsg: "magic.kurokumaft:lightning_magic_bullet.translate",
        property: "kurokumaft:gun_charge_lightning",
        sound: "cauldron.explode"
    },
    {
        itemName: "kurokumaft:ice_magic_gun",
        event: "kurokumaft:ice_magic_bullet",
        sendMsg: "magic.kurokumaft:ice_magic_bullet.translate",
        property: "kurokumaft:gun_charge_ice",
        sound: "cauldron.explode"
    }
]);


/**
 * 銃系魔法
 */
export class GunShotMagic implements ItemCustomComponent {

    // チャージ完了
    onCompleteUse(event:ItemComponentCompleteUseEvent) {
        const itemStack = event.itemStack as ItemStack;
        const player = event.source as Player;

        const gunMagicObject = GunChargeObjects.find(obj => obj.itemName == itemStack.typeId) as GunMagicObject;
        if (gunMagicObject !== undefined) {
           player.setProperty(gunMagicObject.property, true);
        }
    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        const itemStack = event.itemStack as ItemStack;
        const player = event.source as Player;

        const gunMagicObject = GunChargeObjects.find(obj => obj.itemName == itemStack.typeId) as GunMagicObject;
        if (gunMagicObject !== undefined) {
            if (player.getProperty(gunMagicObject.property)) {
                magicGunShot(player, itemStack, gunMagicObject);
            }
        }
    }
}

/**
 * チャージ後に魔弾を発射
 * 
 * @param {Player} player
 * @param {ItemStack} itemStack
 * @param {GunMagicObject} gunMagicObject
 */
async function magicGunShot(player: Player, itemStack: ItemStack, gunMagicObject: GunMagicObject) {

    if (gunMagicObject.itemName === "kurokumaft:water_magic_gun") {
        shooting(player, gunMagicObject.event, 0, 3, "kurokumaft:projectile_1");
        shooting(player, gunMagicObject.event, 0, 3, "kurokumaft:projectile_2");
        shooting(player, gunMagicObject.event, 0, 3, "kurokumaft:projectile_3");
        shooting(player, gunMagicObject.event, 0, 3, "kurokumaft:projectile_4");
        shooting(player, gunMagicObject.event, 0, 3, "kurokumaft:projectile_5");
        shooting(player, gunMagicObject.event, 0, 3, "kurokumaft:projectile_6");
        shooting(player, gunMagicObject.event, 0, 3, "kurokumaft:projectile_7");
        shooting(player, gunMagicObject.event, 0, 3, "kurokumaft:projectile_8");
    } else {
        shooting(player, gunMagicObject.event, 0, 3, undefined);
    }
    player.dimension.playSound(gunMagicObject.sound, player.location, {
        pitch:1,
        volume:1
    });
    itemDurabilityMagicDamage(player, itemStack, EquipmentSlot.Mainhand);
    player.setProperty(gunMagicObject.property, false);
    player.onScreenDisplay.setActionBar({rawtext:[{translate:gunMagicObject.sendMsg}]});

}
