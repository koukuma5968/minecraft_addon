import { system,Player,Entity,EntityComponentTypes,EntityEquippableComponent,EquipmentSlot,EntityApplyDamageOptions } from "@minecraft/server";
import { playsound } from "../../../common/MagicCommonUtil"
import { itemDurabilityMagicDamage } from "../../../common/MagicItemDurabilityDamage";

// シールドガード
/**
 * @param {Player} player
 * @param {Boolean} range
 */
function magicShieldGuard(player:Player, range:Boolean) {
    const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    const offhand = equ.getEquipment(EquipmentSlot.Offhand);
    const mainhand = equ.getEquipment(EquipmentSlot.Mainhand);
    if (player.isSneaking) {
        // シールド耐久
        if (offhand != undefined && (offhand.typeId.indexOf("_shield") != -1)) {
            itemDurabilityMagicDamage(player, offhand, EquipmentSlot.Offhand);
            playsound(player, "item.shield.block");
        } else if (mainhand != undefined && (mainhand.typeId.indexOf("_shield") != -1)) {
            itemDurabilityMagicDamage(player, mainhand, EquipmentSlot.Mainhand);
            playsound(player, "item.shield.block");
        }
    }
};

// シールドカウンター
/**
 * @param {Player} player
 * @param {Entity} damager
 */
function magicShieldCounter(player:Player, damager:Entity) {
    const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    const offhand = equ.getEquipment(EquipmentSlot.Offhand);
    const mainhand = equ.getEquipment(EquipmentSlot.Mainhand);
    if (player.isSneaking) {
        // 火の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:fire_magic_shield") {
            damager.applyDamage(3,{"cause":"lava"} as EntityApplyDamageOptions);
            damager.dimension.spawnParticle("kurokumaft:mobflame_firing", damager.location);
            const intervalNum = system.runInterval(() => {
                if (damager) {
                    const health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(3,{"cause":"lava"} as EntityApplyDamageOptions);
                        damager.dimension.spawnParticle("kurokumaft:mobflame_firing", damager.location);
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 15);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:fire_magic_shield") {
            damager.applyDamage(3,{"cause":"lava"} as EntityApplyDamageOptions);
            damager.dimension.spawnParticle("kurokumaft:mobflame_firing", damager.location);
            const intervalNum = system.runInterval(() => {
                if (damager) {
                    const health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(3,{"cause":"lava"} as EntityApplyDamageOptions);
                        damager.runCommand("particle kurokumaft:mobflame_firing ~~~");
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 15);
        }
        // 水の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:water_magic_shield") {
            damager.applyDamage(1,{"cause":"drowning"} as EntityApplyDamageOptions);
            damager.dimension.spawnParticle("kurokumaft:water_sword_particle", damager.location);
            damager.addEffect("weakness",600,{"amplifier":1,"showParticles":true});
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:water_magic_shield") {
            damager.applyDamage(1,{"cause":"drowning"} as EntityApplyDamageOptions);
            damager.dimension.spawnParticle("kurokumaft:water_sword_particle", damager.location);
            damager.addEffect("weakness",600,{"amplifier":1,"showParticles":true});
        }
        // 風の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:wind_magic_shield") {
            const view = player.getViewDirection();
            damager.applyDamage(1,{"cause":"fall"} as EntityApplyDamageOptions);
            damager.dimension.spawnParticle("kurokumaft:aero_bomb_short_particle", damager.location);
            damager.applyKnockback({x:Math.round(view.x)*10,z:Math.round(view.z)*10},1);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:wind_magic_shield") {
            const view = player.getViewDirection();
            damager.applyDamage(1,{"cause":"fall"} as EntityApplyDamageOptions);
            damager.dimension.spawnParticle("kurokumaft:aero_bomb_short_particle", damager.location);
            damager.applyKnockback({x:Math.round(view.x)*10,z:Math.round(view.z)*10},1);
        }
        // 雷の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:thunder_magic_shield") {
            damager.applyDamage(3,{"cause":"lightning"} as EntityApplyDamageOptions);
            damager.dimension.spawnParticle("kurokumaft:snowflake_particle", damager.location);
            const intervalNum = system.runInterval(() => {
                if (damager) {
                    const health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(3,{"cause":"lightning"} as EntityApplyDamageOptions);
                        damager.dimension.spawnParticle("kurokumaft:snowflake_particle", damager.location);
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 15);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:thunder_magic_shield") {
            damager.applyDamage(3,{"cause":"lightning"} as EntityApplyDamageOptions);
            damager.dimension.spawnParticle("kurokumaft:thunder_sword_particle", damager.location);
            const intervalNum = system.runInterval(() => {
                if (damager) {
                    const health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(3,{"cause":"lightning"} as EntityApplyDamageOptions);
                        damager.dimension.spawnParticle("kurokumaft:thunder_sword_particle", damager.location);
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 15);
        }
        // 岩の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:stone_magic_shield") {
            const view = player.getViewDirection();
            damager.applyDamage(1,{"cause":"piston"} as EntityApplyDamageOptions);
            damager.dimension.spawnParticle("kurokumaft:grey_bomb_short_particle", damager.location);
            damager.applyKnockback({x:Math.round(view.x)*10,z:Math.round(view.z)*10},1);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:stone_magic_shield") {
            const view = player.getViewDirection();
            damager.applyDamage(1,{"cause":"piston"} as EntityApplyDamageOptions);
            damager.dimension.spawnParticle("kurokumaft:grey_bomb_short_particle", damager.location);
            damager.applyKnockback({x:Math.round(view.x)*10,z:Math.round(view.z)*10},1);
        }
        // 氷の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:ice_magic_shield") {
            damager.applyDamage(1,{"cause":"freezing"} as EntityApplyDamageOptions);
            damager.dimension.spawnParticle("kurokumaft:ice_sword_particle", damager.location);
            damager.addEffect("slowness",200,{"amplifier":1,"showParticles":false});
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:ice_magic_shield") {
            damager.applyDamage(1,{"cause":"freezing"} as EntityApplyDamageOptions);
            damager.dimension.spawnParticle("kurokumaft:ice_sword_particle", damager.location);
            damager.addEffect("slowness",200,{"amplifier":1,"showParticles":false});
        }
    }
};

async function MagicShieldKnockback(entity:Entity) {
    entity.applyKnockback({x:1, z:1}, 0.2);
    if (entity instanceof Player) {
        magicShieldGuard(entity, false);
    }
}

export { magicShieldGuard, magicShieldCounter, MagicShieldKnockback };
