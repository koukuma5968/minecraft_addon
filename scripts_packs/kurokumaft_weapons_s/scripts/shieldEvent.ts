import { system,EntityComponentTypes,ItemComponentTypes, Entity, Player, EntityEquippableComponent, EquipmentSlot, ItemDurabilityComponent, EntityDamageCause, EntityHealableComponent, EntityHealthComponent, Vector3 } from "@minecraft/server";
import { playsound,resuscitation } from "./common/commonUtil"
import { ItemDurabilityDamage } from "./common/ItemDurabilityDamage";

/**
 * ガード
 * @param {Player} player
 * @param {Boolean} range
 */
function shieldGuard(player: Player, range: boolean) {
    let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    let offhand = equ.getEquipment(EquipmentSlot.Offhand);
    let mainhand = equ.getEquipment(EquipmentSlot.Mainhand);
    if (player.isSneaking) {
        // シールド耐久
        if (offhand != undefined && (offhand.typeId.indexOf("_shield") != -1 || offhand.typeId == "kurokumaft:kettle_lid")) {
            let dur = offhand.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
            // ガラスで近接は10減少
            if (offhand.typeId.indexOf("kurokumaft:glass_shield") != -1 && range) {
                ItemDurabilityDamage(player, offhand, EquipmentSlot.Offhand, 10);
                playsound(player, "random.glass");
            } else {
                ItemDurabilityDamage(player, offhand, EquipmentSlot.Offhand, undefined);
                if (offhand.typeId == "kurokumaft:tnt_shield" && range) {
                    playsound(player, "random.explode");
                } else if (offhand.typeId == "kurokumaft:steel_shield") {
                    playsound(player, "item.trident.hit_ground");
                } else {
                    playsound(player, "item.shield.block");
                }
            }
        } else if (mainhand != undefined && (mainhand.typeId.indexOf("_shield") != -1 || mainhand.typeId == "kurokumaft:kettle_lid")) {
            let dur = mainhand.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
            // ガラスで近接は10減少
            if (mainhand.typeId.indexOf("kurokumaft:glass_shield") != -1 && range) {
                ItemDurabilityDamage(player, mainhand, EquipmentSlot.Mainhand, 10);
                playsound(player, "random.glass");
            } else {
                ItemDurabilityDamage(player, mainhand, EquipmentSlot.Mainhand, undefined);
                if (mainhand.typeId == "kurokumaft:tnt_shield" && range) {
                    playsound(player, "random.explode");
                } else {
                    playsound(player, "item.shield.block");
                }
            }
        }
    }
}
// シールドカウンター
function shieldCounter(player: Player, damager: Entity) {
    let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    let offhand = equ.getEquipment(EquipmentSlot.Offhand);
    let mainhand = equ.getEquipment(EquipmentSlot.Mainhand);
    if (player.isSneaking) {
        // マグマ
        if ((offhand != undefined && offhand.typeId == "kurokumaft:magma_shield") || (mainhand != undefined && mainhand.typeId == "kurokumaft:magma_shield")) {
            damager.applyDamage(1,{cause:EntityDamageCause.lava});
            damager.dimension.spawnParticle("kurokumaft:mobflame_firing", damager.location);
            let intervalNum = system.runInterval(() => {
                if (damager) {
                    let health = damager.getComponent(EntityComponentTypes.Health) as EntityHealthComponent;
                    if (health && health.isValid()) {
                        damager.applyDamage(1,{cause:EntityDamageCause.lava});
                        damager.dimension.spawnParticle("kurokumaft:mobflame_firing", damager.location);
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 30);
        }
        // アイス
        if ((offhand != undefined && offhand.typeId == "kurokumaft:blueice_shield") || (mainhand != undefined && mainhand.typeId == "kurokumaft:blueice_shield")) {
            damager.applyDamage(1,{cause:EntityDamageCause.freezing});
            damager.dimension.spawnParticle("minecraft:snowflake_particle", damager.location);
            let intervalNum = system.runInterval(() => {
                if (damager) {
                    let health = damager.getComponent(EntityComponentTypes.Health) as EntityHealthComponent;
                    if (health) {
                        damager.applyDamage(1,{cause:EntityDamageCause.freezing});
                        damager.dimension.spawnParticle("minecraft:snowflake_particle", damager.location);
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 30);
        }
        // TNT
        if ((offhand != undefined && offhand.typeId == "kurokumaft:tnt_shield") || (mainhand != undefined && mainhand.typeId == "kurokumaft:tnt_shield")) {
            let view = player.getViewDirection();
            damager.applyDamage(5,{cause:EntityDamageCause.entityExplosion});
            damager.dimension.spawnParticle("minecraft:large_explosion", damager.location);
            damager.applyKnockback(Math.round(view.x)*10,Math.round(view.z)*10,10,1);
        }
    }
}
// 蘇生
function resuscitationEquipment(player: Player) {
    let health = player.getComponent(EntityComponentTypes.Health) as EntityHealthComponent;
    let healthInt = health.currentValue;
    if (healthInt <= 2) {
        let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let offhand = equ.getEquipment(EquipmentSlot.Offhand);
        let mainhand = equ.getEquipment(EquipmentSlot.Mainhand);
        // 不死の守盾
        if (offhand != undefined && (offhand.typeId == "kurokumaft:immortal_shield")) {
            let dur = offhand.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
            resuscitation(player);
            ItemDurabilityDamage(player, offhand, EquipmentSlot.Offhand, (30/100)*dur.maxDurability);
        } else if (mainhand != undefined && (mainhand.typeId == "kurokumaft:immortal_shield")) {
            let dur = mainhand.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
            resuscitation(player);
            ItemDurabilityDamage(player, mainhand, EquipmentSlot.Mainhand, (30/100)*dur.maxDurability);
        }
    }
}
// ガラス反射
function glassReflection(player: Player, projectile: Entity, hitVector: Vector3) {
    if (projectile != undefined) {
        let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let offhand = equ.getEquipment(EquipmentSlot.Offhand);
        let mainhand = equ.getEquipment(EquipmentSlot.Mainhand);
        if (player.isSneaking) {
            // ガラス
            if ((offhand != undefined && offhand.typeId.indexOf("glass_shield") != -1) || (mainhand != undefined && mainhand.typeId.indexOf("glass_shield") != -1)) {
                projectile.clearVelocity();
                projectile.getHeadLocation().z = projectile.getHeadLocation().z - 180;
                projectile.applyImpulse({x:hitVector.x,y:hitVector.y,z:hitVector.z - 180});
            }
        }
    }
}

export { shieldGuard,shieldCounter,resuscitationEquipment,glassReflection };