import { system,Player,Entity,EntityComponentTypes,ItemComponentTypes,EntityEquippableComponent,EquipmentSlot,
    ItemDurabilityComponent,EntityApplyDamageOptions
 } from "@minecraft/server";
import { playsound, durabilityDamage, breakItem } from "../../common/commonUtil"

// シールドガード
/**
 * @param {Player} player
 * @param {Boolean} range
 */
function shieldGuard(player:Player, range:Boolean) {
    let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    let offhand = equ.getEquipment(EquipmentSlot.Offhand);
    let mainhand = equ.getEquipment(EquipmentSlot.Mainhand);
    if (player.isSneaking) {
        // シールド耐久
        if (offhand != undefined && (offhand.typeId.indexOf("_shield") != -1)) {
            let dur = offhand.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
            if (dur.maxDurability > (dur.damage + 1)) {
                durabilityDamage(player, offhand, "slot.weapon.offhand", EquipmentSlot.Offhand, 1);
                playsound(player, "item.shield.block");
            } else {
                breakItem(player, "slot.weapon.offhand");
            }
        } else if (mainhand != undefined && (mainhand.typeId.indexOf("_shield") != -1)) {
            let dur = mainhand.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
            if (dur.maxDurability > (dur.damage + 1)) {
                durabilityDamage(player, mainhand, "slot.weapon.mainhand", EquipmentSlot.Mainhand, 1);
                playsound(player, "item.shield.block");
            } else {
                breakItem(player, "slot.weapon.mainhand");
            }
        }
    }
};

// シールドカウンター
/**
 * @param {Player} player
 * @param {Entity} damager
 */
function shieldCounter(player:Player, damager:Entity) {
    let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    let offhand = equ.getEquipment(EquipmentSlot.Offhand);
    let mainhand = equ.getEquipment(EquipmentSlot.Mainhand);
    if (player.isSneaking) {
        // 火の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:fire_magic_shield") {
            damager.applyDamage(3,{"cause":"lava"} as EntityApplyDamageOptions);
            damager.runCommand("particle kurokumaft:mobflame_firing ~~~");
            let intervalNum = system.runInterval(() => {
                if (damager) {
                    let health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(3,{"cause":"lava"} as EntityApplyDamageOptions);
                        damager.runCommand("particle kurokumaft:mobflame_firing ~~~");
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 15);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:fire_magic_shield") {
            damager.applyDamage(3,{"cause":"lava"} as EntityApplyDamageOptions);
            damager.runCommand("particle kurokumaft:mobflame_firing ~~~");
            let intervalNum = system.runInterval(() => {
                if (damager) {
                    let health = damager.getComponent(EntityComponentTypes.Health);
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
            damager.runCommand("particle kurokumaft:water_sword_particle ~~~");
            damager.addEffect("weakness",600,{"amplifier":1,"showParticles":true});
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:water_magic_shield") {
            damager.applyDamage(1,{"cause":"drowning"} as EntityApplyDamageOptions);
            damager.runCommand("particle kurokumaft:water_sword_particle ~~~");
            damager.addEffect("weakness",600,{"amplifier":1,"showParticles":true});
        }
        // 風の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:wind_magic_shield") {
            let view = player.getViewDirection();
            damager.applyDamage(1,{"cause":"fall"} as EntityApplyDamageOptions);
            damager.runCommand("particle kurokumaft:aero_bomb_short_particle ~~~");
            damager.applyKnockback(Math.round(view.x)*10,Math.round(view.z)*10,10,1);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:wind_magic_shield") {
            let view = player.getViewDirection();
            damager.applyDamage(1,{"cause":"fall"} as EntityApplyDamageOptions);
            damager.runCommand("particle kurokumaft:aero_bomb_short_particle ~~~");
            damager.applyKnockback(Math.round(view.x)*10,Math.round(view.z)*10,10,1);
        }
        // 雷の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:thunder_magic_shield") {
            damager.applyDamage(3,{"cause":"lightning"} as EntityApplyDamageOptions);
            damager.runCommand("particle minecraft:snowflake_particle ~~~");
            let intervalNum = system.runInterval(() => {
                if (damager) {
                    let health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(3,{"cause":"lightning"} as EntityApplyDamageOptions);
                        damager.runCommand("particle minecraft:snowflake_particle ~~~");
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 15);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:thunder_magic_shield") {
            damager.applyDamage(3,{"cause":"lightning"} as EntityApplyDamageOptions);
            damager.runCommand("particle kurokumaft:thunder_sword_particle ~~~");
            let intervalNum = system.runInterval(() => {
                if (damager) {
                    let health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(3,{"cause":"lightning"} as EntityApplyDamageOptions);
                        damager.runCommand("particle kurokumaft:thunder_sword_particle ~~~");
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 15);
        }
        // 岩の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:stone_magic_shield") {
            let view = player.getViewDirection();
            damager.applyDamage(1,{"cause":"piston"} as EntityApplyDamageOptions);
            damager.runCommand("particle kurokumaft:grey_bomb_short_particle ~~~");
            damager.applyKnockback(Math.round(view.x)*10,Math.round(view.z)*10,10,1);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:stone_magic_shield") {
            let view = player.getViewDirection();
            damager.applyDamage(1,{"cause":"piston"} as EntityApplyDamageOptions);
            damager.runCommand("particle kurokumaft:grey_bomb_short_particle ~~~");
            damager.applyKnockback(Math.round(view.x)*10,Math.round(view.z)*10,10,1);
        }
        // 氷の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:ice_magic_shield") {
            damager.applyDamage(1,{"cause":"freezing"} as EntityApplyDamageOptions);
            damager.runCommand("particle kurokumaft:ice_sword_particle ~~~");
            damager.addEffect("slowness",200,{"amplifier":1,"showParticles":false});
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:ice_magic_shield") {
            damager.applyDamage(1,{"cause":"freezing"} as EntityApplyDamageOptions);
            damager.runCommand("particle kurokumaft:ice_sword_particle ~~~");
            damager.addEffect("slowness",200,{"amplifier":1,"showParticles":false});
        }
    }
};

export { shieldGuard, shieldCounter };
