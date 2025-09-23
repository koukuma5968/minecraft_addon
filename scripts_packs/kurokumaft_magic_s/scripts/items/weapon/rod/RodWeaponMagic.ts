import { Entity, EquipmentSlot, ItemComponentHitEntityEvent, ItemComponentTypes, ItemComponentUseEvent, ItemCooldownComponent, ItemCustomComponent, ItemStack, Player } from "@minecraft/server";
import { shooting } from "../../../common/MagicShooterMagicEvent";
import { itemDurabilityMagicDamage } from "../../../common/MagicItemDurabilityDamage";
import { bumrod, burstflare, flarecircle, framePillar } from "./FlameMagic";
import { watercutter, waterjail, waterPillar, waterwave } from "./WaterWaveMagic";
import { aerobomb, storm, stormBread, windRoar } from "./StormMagic";
import { greybomb, rockbreak, stoneBread, stoneNeedle } from "./RockMagic";
import { lightningBread, thunderclap, thunderCutter, thunderjail } from "./ThunderclapMagic";
import { freezConclusion, iceBread, iceNeedle } from "./FreezeMagic";
import { brushash, darkFang, hellBlast, summonSkeleton } from "./DarknessMagic";
import { ability, areaheel, lightFang, summonGolem } from "./BrightnessMagic";
import { ItemMagicCustomComponent } from "../MagicAttackEvent";

interface RodFuncMagicObject {
    itemName:string,
    sendMsg:string,
    func: CallableFunction
}

interface RodMagicObject {
    itemName:string,
    event:string
    sendMsg:string,
    addition:number
}

const RodHitObjects = Object.freeze([
    {
        itemName: "kurokumaft:flame_rod",
        func: bumrod,
        sendMsg: "magic.kurokumaft:bumrod.translate"
    },
    {
        itemName: "kurokumaft:waterwave_rod",
        func: watercutter,
        sendMsg: "magic.kurokumaft:watercutter.translate"
    },
    {
        itemName: "kurokumaft:storm_rod",
        func: stormBread,
        sendMsg: "magic.kurokumaft:stormBread.translate"
    },
    {
        itemName: "kurokumaft:rock_rod",
        func: stoneBread,
        sendMsg: "magic.kurokumaft:stoneBread.translate"
    },
    {
        itemName: "kurokumaft:thunderclap_rod",
        func: lightningBread,
        sendMsg: "magic.kurokumaft:lightningBread.translate"
    },
    {
        itemName: "kurokumaft:freeze_rod",
        func: iceBread,
        sendMsg: "magic.kurokumaft:iceBread.translate"
    },
    {
        itemName: "kurokumaft:darkness_rod",
        func: darkFang,
        sendMsg: "magic.kurokumaft:darkFang.translate"
    },
    {
        itemName: "kurokumaft:brightness_rod",
        func: lightFang,
        sendMsg: "magic.kurokumaft:lightFang.translate"
    }

]);

const RodShotMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:freeze_rod",
        event: "kurokumaft:ice_barrette_magic",
        sendMsg: "magic.kurokumaft:ice_barrette.translate",
        addition: 4
    }

]);

const RodRightOneMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:flame_rod",
        func: flarecircle,
        sendMsg: "magic.kurokumaft:flarecircle.translate"
    },
    {
        itemName: "kurokumaft:waterwave_rod",
        func: waterwave,
        sendMsg: "magic.kurokumaft:waterwave.translate"
    },
    {
        itemName: "kurokumaft:storm_rod",
        func: storm,
        sendMsg: "magic.kurokumaft:storm.translate"
    },
    {
        itemName: "kurokumaft:rock_rod",
        func: rockbreak,
        sendMsg: "magic.kurokumaft:rockbreak.translate"
    },
    {
        itemName: "kurokumaft:thunderclap_rod",
        func: thunderclap,
        sendMsg: "magic.kurokumaft:thunderclap.translate"
    },
    {
        itemName: "kurokumaft:darkness_rod",
        func: brushash,
        sendMsg: "magic.kurokumaft:brushash.translate"
    },
    {
        itemName: "kurokumaft:brightness_rod",
        func: areaheel,
        sendMsg: "magic.kurokumaft:areaheel.translate"
    }

]);

const RodRightFuncMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:flame_rod",
        func: burstflare,
        sendMsg: "magic.kurokumaft:burstflare.translate"
    },
    {
        itemName: "kurokumaft:waterwave_rod",
        func: waterjail,
        sendMsg: "magic.kurokumaft:waterjail.translate"
    },
    {
        itemName: "kurokumaft:storm_rod",
        func: aerobomb,
        sendMsg: "magic.kurokumaft:aerobomb.translate"
    },
    {
        itemName: "kurokumaft:rock_rod",
        func: greybomb,
        sendMsg: "magic.kurokumaft:greybomb.translate"
    },
    {
        itemName: "kurokumaft:thunderclap_rod",
        func: thunderjail,
        sendMsg: "magic.kurokumaft:thunderjail.translate"
    },
    {
        itemName: "kurokumaft:freeze_rod",
        func: freezConclusion,
        sendMsg: "magic.kurokumaft:freezConclusion.translate"
    },
    {
        itemName: "kurokumaft:darkness_rod",
        func: summonSkeleton,
        sendMsg: "magic.kurokumaft:summonSkeleton.translate"
    },
    {
        itemName: "kurokumaft:brightness_rod",
        func: summonGolem,
        sendMsg: "magic.kurokumaft:summonGolem.translate"
    }

]);

const RodSneakMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:flame_rod",
        func: framePillar,
        sendMsg: "magic.kurokumaft:framepillar.translate"
    },
    {
        itemName: "kurokumaft:waterwave_rod",
        func: waterPillar,
        sendMsg: "magic.kurokumaft:waterpillar.translate"
    },
    {
        itemName: "kurokumaft:storm_rod",
        func: windRoar,
        sendMsg: "magic.kurokumaft:wind_roar.translate"
    },
    {
        itemName: "kurokumaft:rock_rod",
        func: stoneNeedle,
        sendMsg: "magic.kurokumaft:stone_needle.translate"
    },
    {
        itemName: "kurokumaft:thunderclap_rod",
        func: thunderCutter,
        sendMsg: "magic.kurokumaft:thunder_cutter.translate"
    },
    {
        itemName: "kurokumaft:freeze_rod",
        func: iceNeedle,
        sendMsg: "magic.kurokumaft:ice_needle.translate"
    },
    {
        itemName: "kurokumaft:darkness_rod",
        func: hellBlast,
        sendMsg: "magic.kurokumaft:hellblast.translate"
    },
    {
        itemName: "kurokumaft:brightness_rod",
        func: ability,
        sendMsg: "magic.kurokumaft:ability.translate"
    }

]);

/**
 * ロッド系魔法
 */
export class RodWeaponMagic implements ItemCustomComponent, ItemMagicCustomComponent {

    attackSneak(player: Player, itemStack: ItemStack): void {
        const rodFuncMagicObject = RodSneakMagicObjects.find(obj => obj.itemName == itemStack.typeId) as RodFuncMagicObject;
        if (rodFuncMagicObject !== undefined) {
            player.onScreenDisplay.setActionBar({rawtext:[{translate:rodFuncMagicObject.sendMsg}]});
            rodFuncMagicObject.func(player);
        }
        itemDurabilityMagicDamage(player, itemStack, EquipmentSlot.Mainhand);
    }

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const itemStack = event.itemStack as ItemStack;
        const attackEntity = event.attackingEntity as Player;
        const hitEntity = event.hitEntity as Entity;
        const effect = event.hadEffect as boolean;

        if (!itemStack) {
            return;
        }
        const wandMagicObject = RodHitObjects.find(obj => obj.itemName == itemStack.typeId) as RodFuncMagicObject;
        wandMagicObject.func(attackEntity, hitEntity);
        attackEntity.onScreenDisplay.setActionBar({rawtext:[{translate:wandMagicObject.sendMsg}]});

    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        const itemStack = event.itemStack as ItemStack;
        const player = event.source as Player;

        if (player.isSneaking) {
            const rodFuncMagicObject = RodRightFuncMagicObjects.find(obj => obj.itemName == itemStack.typeId) as RodFuncMagicObject;
            if (rodFuncMagicObject) {
                player.onScreenDisplay.setActionBar({rawtext:[{translate:rodFuncMagicObject.sendMsg}]});
                rodFuncMagicObject.func(player);
            }
        } else {
            const rodShotMagicObject = RodShotMagicObjects.find(obj => obj.itemName == itemStack.typeId) as RodMagicObject;
            if (rodShotMagicObject) {

                shooting(player, rodShotMagicObject.event, 0, rodShotMagicObject.addition, undefined);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:rodShotMagicObject.sendMsg}]});
            }
            const rodRightOneMagicObject = RodRightOneMagicObjects.find(obj => obj.itemName == itemStack.typeId) as RodFuncMagicObject;
            if (rodRightOneMagicObject) {
                player.onScreenDisplay.setActionBar({rawtext:[{translate:rodRightOneMagicObject.sendMsg}]});
                rodRightOneMagicObject.func(player);
            }
        }

        itemDurabilityMagicDamage(player, itemStack, EquipmentSlot.Mainhand);

        const cool = itemStack.getComponent(ItemComponentTypes.Cooldown) as ItemCooldownComponent;
        cool.startCooldown(player);

    }

}