import { system,EntityComponentTypes,ItemComponentTypes } from "@minecraft/server";
import { breakItem,durabilityDamage,playsound,resuscitation } from "./common";

/**
 * ガード
 * @param {Player} player
 * @param {Boolean} range
 */
function shieldGuard(player, range) {
    let equ = player.getComponent(EntityComponentTypes.Equippable);
    let offhand = equ.getEquipment("Offhand");
    let mainhand = equ.getEquipment("Mainhand");
    if (player.isSneaking) {
        // シールド耐久
        if (offhand != undefined && (offhand.typeId.indexOf("_shield") != -1 || offhand.typeId == "kurokumaft:kettle_lid")) {
            let dur = offhand.getComponent(ItemComponentTypes.Durability);
            if (dur.maxDurability > (dur.damage + 1)) {
                // ガラスで近接は10減少
                if (offhand.typeId.indexOf("kurokumaft:glass_shield") != -1 && range) {
                    durabilityDamage(player, offhand, "slot.weapon.offhand", "Offhand", 10);
                    playsound(player, "random.glass");
                } else {
                    durabilityDamage(player, offhand, "slot.weapon.offhand", "Offhand", 1);
                    if (offhand.typeId == "kurokumaft:tnt_shield" && range) {
                        playsound(player, "random.explode");
                    } else if (offhand.typeId == "kurokumaft:steel_shield") {
                        playsound(player, "item.trident.hit_ground");
                    } else {
                        playsound(player, "item.shield.block");
                    }
                }
            } else {
                breakItem(player, "slot.weapon.offhand");
            }
        } else if (mainhand != undefined && (mainhand.typeId.indexOf("_shield") != -1 || mainhand.typeId == "kurokumaft:kettle_lid")) {
            let dur = mainhand.getComponent(ItemComponentTypes.Durability);
            if (dur.maxDurability > (dur.damage + 1)) {
                // ガラスで近接は10減少
                if (mainhand.typeId.indexOf("kurokumaft:glass_shield") != -1 && range) {
                    durabilityDamage(player, mainhand, "slot.weapon.mainhand", "Mainhand", 10);
                    playsound(player, "random.glass");
                } else {
                    durabilityDamage(player, mainhand, "slot.weapon.mainhand", "Mainhand", 1);
                    if (mainhand.typeId == "kurokumaft:tnt_shield" && range) {
                        playsound(player, "random.explode");
                    } else {
                        playsound(player, "item.shield.block");
                    }
                }
            } else {
                breakItem(player, "slot.weapon.mainhand");
            }
        }
    }
}
// シールドカウンター
function shieldCounter(player, damager) {
    let equ = player.getComponent(EntityComponentTypes.Equippable);
    let offhand = equ.getEquipment("Offhand");
    let mainhand = equ.getEquipment("Mainhand");
    if (player.isSneaking) {
        // マグマ
        if (offhand != undefined && offhand.typeId == "kurokumaft:magma_shield") {
            damager.applyDamage(1,{"cause":"lava"});
            damager.runCommandAsync("particle kurokumaft:mobflame_firing ~~~");
            let intervalNum = system.runInterval(() => {
                if (damager) {
                    let health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(1,{"cause":"lava"});
                        damager.runCommandAsync("particle kurokumaft:mobflame_firing ~~~");
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 30);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:magma_shield") {
            damager.applyDamage(1,{"cause":"lava"});
            damager.runCommandAsync("particle kurokumaft:mobflame_firing ~~~");
            let intervalNum = system.runInterval(() => {
                if (damager) {
                    let health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(1,{"cause":"lava"});
                        damager.runCommandAsync("particle kurokumaft:mobflame_firing ~~~");
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 30);
        }
        // アイス
        if (offhand != undefined && offhand.typeId == "kurokumaft:blueice_shield") {
            damager.applyDamage(1,{"cause":"freezing"});
            damager.runCommandAsync("particle minecraft:snowflake_particle ~~~");
            let intervalNum = system.runInterval(() => {
                if (damager) {
                    let health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(1,{"cause":"freezing"});
                        damager.runCommandAsync("particle minecraft:snowflake_particle ~~~");
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 30);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:blueice_shield") {
            damager.applyDamage(1,{"cause":"freezing"});
            damager.runCommandAsync("particle minecraft:snowflake_particle ~~~");
            let intervalNum = system.runInterval(() => {
                if (damager) {
                    let health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(1,{"cause":"freezing"});
                        damager.runCommandAsync("particle minecraft:snowflake_particle ~~~");
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 30);
        }
        // TNT
        if (offhand != undefined && offhand.typeId == "kurokumaft:tnt_shield") {
            let view = player.getViewDirection();
            damager.applyDamage(5,{"cause":"entityExplosion"});
            damager.runCommandAsync("particle minecraft:large_explosion  ~~~");
            damager.applyKnockback(Math.round(view.x)*10,Math.round(view.z)*10,10,1);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:tnt_shield") {
            let view = player.getViewDirection();
            damager.applyDamage(5,{"cause":"entityExplosion"});
            damager.runCommandAsync("particle minecraft:large_explosion  ~~~");
            damager.applyKnockback(Math.round(view.x)*10,Math.round(view.z)*10,10,1);
        }
    }
}
// 蘇生
function resuscitationEquipment(player) {
    let health = player.getComponent(EntityComponentTypes.Health);
    let healthInt = parseInt(health.currentValue);
    if (healthInt <= 2) {
        let equ = player.getComponent(EntityComponentTypes.Equippable);
        let offhand = equ.getEquipment("Offhand");
        let mainhand = equ.getEquipment("Mainhand");
        // 不死の守盾
        if (offhand != undefined && (offhand.typeId == "kurokumaft:immortal_shield")) {
            let dur = offhand.getComponent(ItemComponentTypes.Durability);
            resuscitation(player);
            if ((dur.damage + ((30/100)*dur.maxDurability)) < dur.maxDurability) {
                durabilityDamage(player, offhand, "slot.weapon.offhand", "Offhand", (30/100)*dur.maxDurability);
            } else {
                breakItem(player, "slot.weapon.offhand");
            }
        } else if (mainhand != undefined && (mainhand.typeId == "kurokumaft:immortal_shield")) {
            let dur = mainhand.getComponent(ItemComponentTypes.Durability);
            resuscitation(player);
            if ((dur.damage + ((30/100)*dur.maxDurability)) < dur.maxDurability) {
                durabilityDamage(player, mainhand, "slot.weapon.mainhand", "Mainhand", (30/100)*dur.maxDurability);
            } else {
                breakItem(player, "slot.weapon.mainhand");
            }
        }
    }
}
// ガラス反射
function glassReflection(player, projectile, hitVector) {
    if (projectile != undefined) {
        let equ = player.getComponent(EntityComponentTypes.Equippable);
        let offhand = equ.getEquipment("Offhand");
        let mainhand = equ.getEquipment("Mainhand");
        if (player.isSneaking) {
            // ガラス
            if (offhand != undefined && offhand.typeId.indexOf("glass_shield") != -1) {
                projectile.clearVelocity();
                projectile.getHeadLocation().z = projectile.getHeadLocation().z - 180;
                projectile.applyImpulse({x:hitVector.x,y:hitVector.y,z:hitVector.z - 180});
            } else if (mainhand != undefined && mainhand.typeId.indexOf("glass_shield") != -1) {
                projectile.clearVelocity();
                projectile.getHeadLocation().z = projectile.getHeadLocation().z - 180;
                projectile.applyImpulse({x:hitVector.x,y:hitVector.y,z:hitVector.z - 180});
            }
        }
    }
}

export { shieldGuard,shieldCounter,resuscitationEquipment,glassReflection };