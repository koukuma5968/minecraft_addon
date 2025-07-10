import { Entity, EquipmentSlot, ItemComponentHitEntityEvent, ItemComponentTypes, ItemComponentUseEvent, ItemCooldownComponent, ItemCustomComponent, ItemStack, Player } from "@minecraft/server";
import { throwing } from "../../../common/MagicShooterMagicEvent";
import { itemDurabilityDamage } from "../../../common/MagicItemDurabilityDamage";
import { deepSnow, icewall, powderedSnow } from "./SnowWandMagic";
import { absorption, darkBread, invisibility } from "./DarkWandMagic";
import { healing, lightBread, recovery } from "./LightWandMagic";
import { splash, waterball, waterwall } from "./WaterMagic";
import { burstRondo, fireball, firewall } from "./FireMagic";
import { windcutter, windEdge, windwall } from "./WindMagic";
import { sandBlast, stonebarrette, stonewall } from "./StoneMagic";
import { lightningbolt, lightningwall, spark } from "./LightningMagic";

interface WandMagicObject {
    itemName:string,
    event:string
    sendMsg:string,
    func:CallableFunction
}

const WandHitObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_wand",
        event: "",
        func: burstRondo,
        sendMsg: "magic.kurokumaft:burstRondo.translate"
    },
    {
        itemName: "kurokumaft:water_wand",
        event: "",
        func: splash,
        sendMsg: "magic.kurokumaft:splash.translate"
    },
    {
        itemName: "kurokumaft:wind_wand",
        event: "",
        func: windEdge,
        sendMsg: "magic.kurokumaft:windEdge.translate"
    },
    {
        itemName: "kurokumaft:stone_wand",
        event: "",
        func: sandBlast,
        sendMsg: "magic.kurokumaft:sandBlast.translate"
    },
    {
        itemName: "kurokumaft:lightning_wand",
        event: "",
        func: spark,
        sendMsg: "magic.kurokumaft:spark.translate"
    },
    {
        itemName: "kurokumaft:snow_wand",
        event: "",
        func: powderedSnow,
        sendMsg: "magic.kurokumaft:powderedSnow.translate"
    },
    {
        itemName: "kurokumaft:dark_wand",
        event: "",
        func: darkBread,
        sendMsg: "magic.kurokumaft:darkBread.translate"
    },
    {
        itemName: "kurokumaft:light_wand",
        event: "",
        func: lightBread,
        sendMsg: "magic.kurokumaft:lightBread.translate"
    }

]);

const BallMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_wand",
        event: "kurokumaft:fireballmagic",
        sendMsg: "magic.kurokumaft:fireball.translate"
    },
    {
        itemName: "kurokumaft:water_wand",
        event: "kurokumaft:waterballmagic",
        sendMsg: "magic.kurokumaft:waterball.translate"
    },
    {
        itemName: "kurokumaft:wind_wand",
        event: "kurokumaft:windcuttermagic",
        sendMsg: "magic.kurokumaft:windcutter.translate"
    },
    {
        itemName: "kurokumaft:stone_wand",
        event: "kurokumaft:stonebarrettemagic",
        sendMsg: "magic.kurokumaft:stonebarrette.translate"
    },
    {
        itemName: "kurokumaft:lightning_wand",
        event: "kurokumaft:lightningboltmagic",
        sendMsg: "magic.kurokumaft:lightningbolt.translate"
    }

]);

const WallMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_wand",
        event: "",
        func: firewall,
        sendMsg: "magic.kurokumaft:firewall.translate"
    },
    {
        itemName: "kurokumaft:water_wand",
        event: "",
        func: waterwall,
        sendMsg: "magic.kurokumaft:waterwall.translate"
    },
    {
        itemName: "kurokumaft:wind_wand",
        event: "",
        func: windwall,
        sendMsg: "magic.kurokumaft:windwall.translate"
    },
    {
        itemName: "kurokumaft:stone_wand",
        event: "",
        func: stonewall,
        sendMsg: "magic.kurokumaft:stonewall.translate"
    },
    {
        itemName: "kurokumaft:lightning_wand",
        event: "",
        func: lightningwall,
        sendMsg: "magic.kurokumaft:lightningwall.translate"
    },
    {
        itemName: "kurokumaft:snow_wand",
        event: "",
        func: icewall,
        sendMsg: "magic.kurokumaft:icewall.translate"
    }

]);

const OtherUpMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:snow_wand",
        event: "",
        func: deepSnow,
        sendMsg: "magic.kurokumaft:deepSnow.translate"
    },
    {
        itemName: "kurokumaft:dark_wand",
        event: "",
        func: absorption,
        sendMsg: "magic.kurokumaft:absorption.translate"
    },
    {
        itemName: "kurokumaft:light_wand",
        event: "",
        func: healing,
        sendMsg: "magic.kurokumaft:healing.translate"
    }

]);

const OtherDownMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:dark_wand",
        event: "",
        func: invisibility,
        sendMsg: "§8インビジブル"
    },
    {
        itemName: "kurokumaft:light_wand",
        event: "",
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
        const itemStack = event.itemStack as ItemStack;
        const attackEntity = event.attackingEntity as Player;
        const hitEntity = event.hitEntity as Entity;
        const effect = event.hadEffect as boolean;

        if (!itemStack) {
            return;
        }
        const wandMagic = WandHitObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
        wandMagic.func(attackEntity, hitEntity);
        attackEntity.onScreenDisplay.setActionBar({rawtext:[{translate:"wandMagic.sendMsg"}]});
    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        const itemStack = event.itemStack as ItemStack;
        const player = event.source as Player;

        let wandMagic:WandMagicObject;
        if (player.isSneaking) {
            wandMagic = WallMagicObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
            if (wandMagic) {
                wandMagic.func(player);
            } else {
                wandMagic = OtherDownMagicObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
                wandMagic.func(player);
            }
        } else {
            wandMagic = BallMagicObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
            if (wandMagic) {
                throwing(player, itemStack, wandMagic.event, 2.5);
            } else {
                wandMagic = OtherUpMagicObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
                wandMagic.func(player);
            }
        }

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"wandMagic.sendMsg"}]});

        itemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);

        const cool = itemStack.getComponent(ItemComponentTypes.Cooldown) as ItemCooldownComponent;
        cool.startCooldown(player);
    }

}

const WandProjectileObjects = Object.freeze([
    {
        itemName: "kurokumaft:fireballmagic",
        func: fireball,
        event: "",
        sendMsg: ""
   },
    {
        itemName: "kurokumaft:waterballmagic",
        func: waterball,
        event: "",
        sendMsg: ""
    },
    {
        itemName: "kurokumaft:windcuttermagic",
        func: windcutter,
        event: "",
        sendMsg: ""
    },
    {
        itemName: "kurokumaft:stonebarrettemagic",
        func: stonebarrette,
        event: "",
        sendMsg: ""
    },
    {
        itemName: "kurokumaft:lightningboltmagic",
        func: lightningbolt,
        event: "",
        sendMsg: ""
    }

]);

export function checkWandProjectile(projectileName:string) {
   return WandProjectileObjects.some(obj => obj.itemName == projectileName);
}

export function hitWandProjectileEvent(projectile:Entity) {
    const proje = WandProjectileObjects.find(obj => obj.itemName == projectile.typeId) as WandMagicObject;
    try {
        proje.func(projectile);
        projectile.remove();
    } catch (error) {
    }
}