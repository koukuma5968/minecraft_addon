import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, GameMode, EquipmentSlot, ItemComponentUseOnEvent, system, ItemComponentCompleteUseEvent, MolangVariableMap, world, ScoreboardObjective } from "@minecraft/server";
import { getRandomInRange, clamp } from "../../../common/commonUtil";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { shooting } from "../../../custom/ShooterMagicEvent";

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
        sendMsg: "§cヒートハザード",
        property: "kurokumaft:gun_charge_fire"
    },
    {
        itemName: "kurokumaft:water_magic_gun",
        event: "kurokumaft:water_magic_bullet",
        sendMsg: "§bウォーターバースト",
        property: "kurokumaft:gun_charge_water"
    },
    {
        itemName: "kurokumaft:wind_magic_gun",
        event: "kurokumaft:wind_magic_bullet",
        sendMsg: "§aテンペストファング",
        property: "kurokumaft:gun_charge_wind"
    },
    {
        itemName: "kurokumaft:stone_magic_gun",
        event: "kurokumaft:stone_magic_bullet",
        sendMsg: "§7クラックロアー",
        property: "kurokumaft:gun_charge_stone"
    },
    {
        itemName: "kurokumaft:lightning_magic_gun",
        event: "kurokumaft:lightning_magic_bullet",
        sendMsg: "§6アマラガン",
        property: "kurokumaft:gun_charge_lightning"
    },
    {
        itemName: "kurokumaft:ice_magic_gun",
        event: "kurokumaft:ice_magic_bullet",
        sendMsg: "§fグレイシアファング",
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
           player.setDynamicProperty("gunCharge", "full");
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
            if (player.getProperty(gunMagicObject.property) == 1 && player.getDynamicProperty("gunCharge") == "release") {
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

    if (gunMagicObject.itemName == "kurokumaft:water_magic_gun") {
        shooting(player, gunMagicObject.event, {x:0,y:0,z:0}, 3, "kurokumaft:projectile_1");
        shooting(player, gunMagicObject.event, {x:4,y:0,z:0}, 3, "kurokumaft:projectile_2");
        shooting(player, gunMagicObject.event, {x:-4,y:0,z:0}, 3, "kurokumaft:projectile_3");
        shooting(player, gunMagicObject.event, {x:0,y:4,z:0}, 3, "kurokumaft:projectile_4");
        shooting(player, gunMagicObject.event, {x:2,y:2,z:0}, 3, "kurokumaft:projectile_5");
        shooting(player, gunMagicObject.event, {x:-2,y:2,z:0}, 3, "kurokumaft:projectile_6");
        shooting(player, gunMagicObject.event, {x:2,y:0,z:0}, 3, "kurokumaft:projectile_7");
        shooting(player, gunMagicObject.event, {x:-2,y:0,z:0}, 3, "kurokumaft:projectile_8");
    } else {
        shooting(player, gunMagicObject.event, {x:0,y:0,z:0}, 3, undefined);
    }
    if (player.getGameMode() != GameMode.creative) {
        ItemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);
    }
    player.setDynamicProperty("gunCharge", undefined);
    player.setProperty(gunMagicObject.property, 0);

}
