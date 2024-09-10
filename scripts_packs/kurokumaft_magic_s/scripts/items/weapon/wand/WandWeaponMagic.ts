import { Block, Entity, EquipmentSlot, GameMode, ItemComponent, ItemComponentHitEntityEvent, ItemComponentTypes, ItemComponentUseEvent, ItemComponentUseOnEvent, ItemCooldownComponent, ItemCustomComponent, ItemStack, Player, RawMessage, world } from "@minecraft/server";
import { throwing } from "../../../custom/ShooterMagicEvent";
import { print, getRandomInRange } from "../../../common/commonUtil";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { deepSnow } from "./SnowWandMagic";
import { absorption, invisibility } from "./DarkWandMagic";
import { healing, recovery } from "./LightWandMagic";

interface WandMagicObject {
    itemName:string,
    event:string
    sendMsg:string,
    func:any
}

const WandHitObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_wand",
        event: "fire/burst_rondo",
        sendMsg: "§cバーストロンド"
    },
    {
        itemName: "kurokumaft:water_wand",
        event: "water/splash",
        sendMsg: "§bスプラッシュ"
    },
    {
        itemName: "kurokumaft:wind_wand",
        event: "wind/wind_edge",
        sendMsg: "§aウィンドエッジ"
    },
    {
        itemName: "kurokumaft:stone_wand",
        event: "stone/sand_blast",
        sendMsg: "§7サンドブラスト"
    },
    {
        itemName: "kurokumaft:lightning_wand",
        event: "lightning/spark",
        sendMsg: "§6スパーク"
    },
    {
        itemName: "kurokumaft:snow_wand",
        event: "ice/powdered_snow",
        sendMsg: "§fパウダースノー"
    },
    {
        itemName: "kurokumaft:dark_wand",
        event: "dark/dark_bread",
        sendMsg: "§8ダークブレード"
    },
    {
        itemName: "kurokumaft:light_wand",
        event: "light/light_bread",
        sendMsg: "§eライトブレード"
    }

]);

const BallMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_wand",
        event: "kurokumaft:fireballmagic",
        sendMsg: "§cファイヤーボール"
    },
    {
        itemName: "kurokumaft:water_wand",
        event: "kurokumaft:waterballmagic",
        sendMsg: "§bウォーターボール"
    },
    {
        itemName: "kurokumaft:wind_wand",
        event: "kurokumaft:windcuttermagic",
        sendMsg: "§aウィンドカッター"
    },
    {
        itemName: "kurokumaft:stone_wand",
        event: "kurokumaft:stonebarrettemagic",
        sendMsg: "§7ストーンバレット"
    },
    {
        itemName: "kurokumaft:lightning_wand",
        event: "kurokumaft:lightningboltmagic",
        sendMsg: "§6ライトニングボルト"
    }

]);

const WallMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_wand",
        event: "fire/firewall",
        sendMsg: "§cファイアウォール"
    },
    {
        itemName: "kurokumaft:water_wand",
        event: "water/waterwall",
        sendMsg: "§bウォーターウォール"
    },
    {
        itemName: "kurokumaft:wind_wand",
        event: "wind/windwall",
        sendMsg: "§aウィンドウォール"
    },
    {
        itemName: "kurokumaft:stone_wand",
        event: "stone/stonewall",
        sendMsg: "§7ストーンウォール"
    },
    {
        itemName: "kurokumaft:lightning_wand",
        event: "lightning/lightningwall",
        sendMsg: "§6ライトニングウォール"
    },
    {
        itemName: "kurokumaft:snow_wand",
        event: "ice/icewall",
        sendMsg: "§fアイスウォール"
    }

]);

const OtherUpMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:snow_wand",
        func: deepSnow,
        sendMsg: "§fディープスノー"
    },
    {
        itemName: "kurokumaft:dark_wand",
        func: absorption,
        sendMsg: "§8アブソープション"
    },
    {
        itemName: "kurokumaft:light_wand",
        func: healing,
        sendMsg: "§eヒーリング"
    }

]);

const OtherDownMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:dark_wand",
        func: invisibility,
        sendMsg: "§8インビジブル"
    },
    {
        itemName: "kurokumaft:light_wand",
        func: recovery,
        sendMsg: "§eリカバリー"
    }

]);

/**
 * ワンド系魔法
 */
export class WandWeaponMagic implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let itemStack = event.itemStack as ItemStack;
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let effect = event.hadEffect as boolean;

        if (!itemStack || (hitEntity instanceof Player && !world.gameRules.pvp)) {
            return;
        }
        let wandMagic = WandHitObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
        attackEntity.runCommand("/function magic/" + wandMagic.event);
        attackEntity.runCommand("/titleraw @s actionbar " + JSON.stringify({
            rawtext: [{ text: wandMagic.sendMsg }]
        }));
    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        let xran = parseFloat(getRandomInRange(-0.1, 0.5).toFixed(3));
        let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
        let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

        let wandMagic:WandMagicObject;
        // pvp用
        if (player.isSneaking) {
            wandMagic = WallMagicObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
            if (wandMagic) {
                player.runCommand("/function magic/" + wandMagic.event);
            } else {
                wandMagic = OtherDownMagicObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
                wandMagic.func(player);
            }
        } else {
            wandMagic = BallMagicObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
            if (wandMagic) {
                throwing(player, itemStack, wandMagic.event, {x:xran,y:yran,z:zran});
            } else {
                wandMagic = OtherUpMagicObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
                wandMagic.func(player);
            }
        }

        let rawMessage = {
            rawtext: [{ text: wandMagic.sendMsg }]
        } as RawMessage;
        player.runCommand("/titleraw @s actionbar " + JSON.stringify(rawMessage));

        if (player.getGameMode() != GameMode.creative) {
            ItemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);
        }

        let cool = itemStack.getComponent(ItemComponentTypes.Cooldown) as ItemCooldownComponent;
        cool.startCooldown(player);
    }

}

const WandProjectileObjects = Object.freeze([
    {
        itemName: "kurokumaft:fireballmagic",
        event: "fire/fireball"
    },
    {
        itemName: "kurokumaft:waterballmagic",
        event: "water/waterball"
    },
    {
        itemName: "kurokumaft:windcuttermagic",
        event: "wind/windcutter"
    },
    {
        itemName: "kurokumaft:stonebarrettemagic",
        event: "stone/stonebarrette"
    },
    {
        itemName: "kurokumaft:lightningboltmagic",
        event: "lightning/lightningbolt"
    }

]);

export function checkWandProjectile(projectileName:string) {
   return WandProjectileObjects.some(obj => obj.itemName == projectileName);
}

export function hitProjectileEvent(projectile:Entity) {
    let proje = WandProjectileObjects.find(obj => obj.itemName == projectile.typeId) as WandMagicObject;
    try {
        projectile.runCommand("/function magic/" + proje.event);
        projectile.remove();
    } catch (error) {
    }
}