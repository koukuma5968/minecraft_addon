import { CustomComponentParameters, Entity, EquipmentSlot, ItemComponentHitEntityEvent, ItemComponentTypes, ItemComponentUseEvent, ItemCooldownComponent, ItemCustomComponent, ItemStack, Player } from "@minecraft/server";
import { throwing } from "../../../common/MagicShooterMagicEvent";
import { itemDurabilityMagicDamage } from "../../../common/MagicItemDurabilityDamage";
import { deepSnow, frostrush, icebarrier, icewall, powderedSnow, snowtaunt } from "./SnowWandMagic";
import { absorption, darkBread, darkness, invisibility } from "./DarkWandMagic";
import { flash, healing, lightBread, recovery } from "./LightWandMagic";
import { ripplerush, splash, waterball, waterbarrier, waterburst, waterwall } from "./WaterMagic";
import { burstCrash, burstRondo, fireball, firebarrier, firewall, rapidFire } from "./FireMagic";
import { galewind, windbarrier, windcutter, windEdge, windvolley, windwall } from "./WindMagic";
import { sandBlast, stonebarrage, stonebarrette, stonebarrier, stonedust, stonewall } from "./StoneMagic";
import { dreadspark, lightningbarrier, lightningbolt, lightningrush, lightningwall, spark } from "./LightningMagic";
import { ItemMagicCustomComponent } from "../MagicAttackEvent";

interface WandMagicObject {
    magic:string,
    event:string
    sendMsg:string,
    func:CallableFunction
}

type WandMagicType = {
    magic:string,
    type:string
}

const WandHitObjects = Object.freeze([
    {
        magic: "fire",
        event: "",
        func: burstRondo,
        sendMsg: "magic.kurokumaft:burstRondo.translate"
    },
    {
        magic: "water",
        event: "",
        func: splash,
        sendMsg: "magic.kurokumaft:splash.translate"
    },
    {
        magic: "wind",
        event: "",
        func: windEdge,
        sendMsg: "magic.kurokumaft:windEdge.translate"
    },
    {
        magic: "stone",
        event: "",
        func: sandBlast,
        sendMsg: "magic.kurokumaft:sandBlast.translate"
    },
    {
        magic: "lightning",
        event: "",
        func: spark,
        sendMsg: "magic.kurokumaft:spark.translate"
    },
    {
        magic: "snow",
        event: "",
        func: powderedSnow,
        sendMsg: "magic.kurokumaft:powderedSnow.translate"
    },
    {
        magic: "dark",
        event: "",
        func: darkBread,
        sendMsg: "magic.kurokumaft:darkBread.translate"
    },
    {
        magic: "light",
        event: "",
        func: lightBread,
        sendMsg: "magic.kurokumaft:lightBread.translate"
    }

]);

const EnhanceWandHitObjects = Object.freeze([
    {
        magic: "fire",
        event: "",
        func: burstCrash,
        sendMsg: "magic.kurokumaft:burstCrash.translate"
    },
    {
        magic: "water",
        event: "",
        func: ripplerush,
        sendMsg: "magic.kurokumaft:ripplerush.translate"
    },
    {
        magic: "wind",
        event: "",
        func: windvolley,
        sendMsg: "magic.kurokumaft:windvolley.translate"
    },
    {
        magic: "stone",
        event: "",
        func: stonedust,
        sendMsg: "magic.kurokumaft:stonedust.translate"
    },
    {
        magic: "lightning",
        event: "",
        func: dreadspark,
        sendMsg: "magic.kurokumaft:dreadspark.translate"
    },
    {
        magic: "snow",
        event: "",
        func: snowtaunt,
        sendMsg: "magic.kurokumaft:snowtaunt.translate"
    }

]);

const BallMagicObjects = Object.freeze([
    {
        magic: "fire",
        event: "kurokumaft:fireballmagic",
        sendMsg: "magic.kurokumaft:fireball.translate"
    },
    {
        magic: "water",
        event: "kurokumaft:waterballmagic",
        sendMsg: "magic.kurokumaft:waterball.translate"
    },
    {
        magic: "wind",
        event: "kurokumaft:windcuttermagic",
        sendMsg: "magic.kurokumaft:windcutter.translate"
    },
    {
        magic: "stone",
        event: "kurokumaft:stonebarrettemagic",
        sendMsg: "magic.kurokumaft:stonebarrette.translate"
    },
    {
        magic: "lightning",
        event: "kurokumaft:lightningboltmagic",
        sendMsg: "magic.kurokumaft:lightningbolt.translate"
    }

]);

const EnhanceBallMagicObjects = Object.freeze([
    {
        magic: "fire",
        event: "kurokumaft:fireballmagic",
        func: rapidFire,
        sendMsg: "magic.kurokumaft:rapidfire.translate"
    },
    {
        magic: "water",
        event: "kurokumaft:waterballmagic",
        func: waterburst,
        sendMsg: "magic.kurokumaft:waterburst.translate"
    },
    {
        magic: "wind",
        event: "kurokumaft:windcuttermagic",
        func: galewind,
        sendMsg: "magic.kurokumaft:galewind.translate"
    },
    {
        magic: "stone",
        event: "kurokumaft:stonebarrettemagic",
        func: stonebarrage,
        sendMsg: "magic.kurokumaft:stonebarrage.translate"
    },
    {
        magic: "lightning",
        event: "kurokumaft:lightningboltmagic",
        func: lightningrush,
        sendMsg: "magic.kurokumaft:lightningrush.translate"
    },
    {
        magic: "snow",
        event: "kurokumaft:deepsnowmagic",
        func: frostrush,
        sendMsg: "magic.kurokumaft:frostrush.translate"
    }

]);

const WallMagicObjects = Object.freeze([
    {
        magic: "fire",
        event: "",
        func: firewall,
        sendMsg: "magic.kurokumaft:firewall.translate"
    },
    {
        magic: "water",
        event: "",
        func: waterwall,
        sendMsg: "magic.kurokumaft:waterwall.translate"
    },
    {
        magic: "wind",
        event: "",
        func: windwall,
        sendMsg: "magic.kurokumaft:windwall.translate"
    },
    {
        magic: "stone",
        event: "",
        func: stonewall,
        sendMsg: "magic.kurokumaft:stonewall.translate"
    },
    {
        magic: "lightning",
        event: "",
        func: lightningwall,
        sendMsg: "magic.kurokumaft:lightningwall.translate"
    },
    {
        magic: "snow",
        event: "",
        func: icewall,
        sendMsg: "magic.kurokumaft:icewall.translate"
    }

]);

const EnhanceWallMagicObjects = Object.freeze([
    {
        magic: "fire",
        event: "",
        func: firebarrier,
        sendMsg: "magic.kurokumaft:firebarrier.translate"
    },
    {
        magic: "water",
        event: "",
        func: waterbarrier,
        sendMsg: "magic.kurokumaft:waterbarrier.translate"
    },
    {
        magic: "wind",
        event: "",
        func: windbarrier,
        sendMsg: "magic.kurokumaft:windbarrier.translate"
    },
    {
        magic: "stone",
        event: "",
        func: stonebarrier,
        sendMsg: "magic.kurokumaft:stonebarrier.translate"
    },
    {
        magic: "lightning",
        event: "",
        func: lightningbarrier,
        sendMsg: "magic.kurokumaft:lightningbarrier.translate"
    },
    {
        magic: "snow",
        event: "",
        func: icebarrier,
        sendMsg: "magic.kurokumaft:icebarrier.translate"
    }

]);

const OtherUpMagicObjects = Object.freeze([
    {
        magic: "snow",
        event: "",
        func: deepSnow,
        sendMsg: "magic.kurokumaft:deepSnow.translate"
    },
    {
        magic: "dark",
        event: "",
        func: absorption,
        sendMsg: "magic.kurokumaft:absorption.translate"
    },
    {
        magic: "light",
        event: "",
        func: healing,
        sendMsg: "magic.kurokumaft:healing.translate"
    }

]);

const OtherDownMagicObjects = Object.freeze([
    {
        magic: "dark",
        event: "",
        func: invisibility,
        sendMsg: "magic.kurokumaft:invisibility.translate"
    },
    {
        magic: "light",
        event: "",
        func: recovery,
        sendMsg: "magic.kurokumaft:recovery.translate"
    }

]);

const WandSneakAttackObjects = Object.freeze([
    {
        magic: "dark",
        event: "",
        func: darkness,
        sendMsg: "magic.kurokumaft:darkness.translate"
    },
    {
        magic: "light",
        event: "",
        func: flash,
        sendMsg: "magic.kurokumaft:flash.translate"
    }

]);

/**
 * ワンド系魔法
 */
export class WandWeaponMagic implements ItemCustomComponent, ItemMagicCustomComponent {

    attackSneak(player: Player, itemStack: ItemStack): void {
        const wandSneakAttackObjectt = WandSneakAttackObjects.find(obj => obj.magic == itemStack.typeId) as WandMagicObject;
        if (wandSneakAttackObjectt !== undefined) {
            player.onScreenDisplay.setActionBar({rawtext:[{translate:wandSneakAttackObjectt.sendMsg}]});
            wandSneakAttackObjectt.func(player);
        }
        itemDurabilityMagicDamage(player, itemStack, EquipmentSlot.Mainhand);
    }

    // 通常攻撃
    
    onHitEntity (event: ItemComponentHitEntityEvent, arg: CustomComponentParameters) {
        const itemStack = event.itemStack as ItemStack;
        const attackEntity = event.attackingEntity as Player;
        const hitEntity = event.hitEntity as Entity;
        const wandType = arg.params as WandMagicType;
        const effect = event.hadEffect as boolean;

        if (!itemStack) {
            return;
        }
        if (wandType.type === "nomal") {
            const wandMagic = WandHitObjects.find(obj => obj.magic == wandType.magic) as WandMagicObject;
            wandMagic.func(attackEntity, hitEntity);
            attackEntity.onScreenDisplay.setActionBar({rawtext:[{translate:wandMagic.sendMsg}]});
        } else {
            const wandMagic = EnhanceWandHitObjects.find(obj => obj.magic == wandType.magic) as WandMagicObject;
            wandMagic.func(attackEntity, hitEntity);
            attackEntity.onScreenDisplay.setActionBar({rawtext:[{translate:wandMagic.sendMsg}]});
        }
    }

    // 右クリック
    onUse(event:ItemComponentUseEvent, arg: CustomComponentParameters) {
        const itemStack = event.itemStack as ItemStack;
        const player = event.source as Player;
        const wandType = arg.params as WandMagicType;

        let wandMagic:WandMagicObject;
        if (player.isSneaking) {
            if (wandType.type === "nomal") {
                wandMagic = WallMagicObjects.find(obj => obj.magic == wandType.magic) as WandMagicObject;
                if (wandMagic) {
                    wandMagic.func(player);
                } else {
                    wandMagic = OtherDownMagicObjects.find(obj => obj.magic == wandType.magic) as WandMagicObject;
                    wandMagic.func(player);
                }
            } else {
                wandMagic = EnhanceWallMagicObjects.find(obj => obj.magic == wandType.magic) as WandMagicObject;
                wandMagic.func(player);
            }
        } else {
            if (wandType.type === "nomal") {
                wandMagic = BallMagicObjects.find(obj => obj.magic == wandType.magic) as WandMagicObject;
                if (wandMagic) {
                    throwing(player, itemStack, wandMagic.event, 2.5);
                } else {
                    wandMagic = OtherUpMagicObjects.find(obj => obj.magic == wandType.magic) as WandMagicObject;
                    wandMagic.func(player);
                }
            } else {
                wandMagic = EnhanceBallMagicObjects.find(obj => obj.magic == wandType.magic) as WandMagicObject;
                wandMagic.func(player, wandMagic.event);
            }
        }

        player.onScreenDisplay.setActionBar({rawtext:[{translate:wandMagic.sendMsg}]});

        itemDurabilityMagicDamage(player, itemStack, EquipmentSlot.Mainhand);

        const cool = itemStack.getComponent(ItemComponentTypes.Cooldown) as ItemCooldownComponent;
        cool.startCooldown(player);
    }

}

const WandProjectileObjects = Object.freeze([
    {
        magic: "fireballmagic",
        func: fireball,
        event: "",
        sendMsg: ""
   },
    {
        magic: "waterballmagic",
        func: waterball,
        event: "",
        sendMsg: ""
    },
    {
        magic: "windcuttermagic",
        func: windcutter,
        event: "",
        sendMsg: ""
    },
    {
        magic: "stonebarrettemagic",
        func: stonebarrette,
        event: "",
        sendMsg: ""
    },
    {
        magic: "lightningboltmagic",
        func: lightningbolt,
        event: "",
        sendMsg: ""
    }

]);

export function checkWandProjectile(projectileName:string) {
   return WandProjectileObjects.some(obj => obj.magic == projectileName);
}

export function hitWandProjectileEvent(projectile:Entity) {
    const proje = WandProjectileObjects.find(obj => obj.magic == projectile.typeId) as WandMagicObject;
    try {
        proje.func(projectile);
        projectile.remove();
    } catch (error) {
    }
}