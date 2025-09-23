import { system,Player,Entity,EntityComponentTypes,Vector3,EntityEquippableComponent,EquipmentSlot,EntityApplyDamageOptions, EntityProjectileComponent } from "@minecraft/server";
import { itemDurabilityMagicDamage } from "../../../common/MagicItemDurabilityDamage";

/**
 * 魔法防具反撃効果
 * 
 * @param {Player} player
 * @param {Entity} damager
 * @param {Entity} projectile
 * @param {Vector3} hitVector
 */
async function hitMagicAmor(player:Player, damager:Entity, projectile:Entity | undefined, hitVector:Vector3 | undefined) {
    const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    if (!equ) {
        return;
    }
    const chest = equ.getEquipment(EquipmentSlot.Chest);
    const legs = equ.getEquipment(EquipmentSlot.Legs);
    const head = equ.getEquipment(EquipmentSlot.Head);
    if (chest != undefined) {
        if (damager != undefined && projectile == undefined) {
            if (chest.typeId == "kurokumaft:stone_magic_chestplate" || chest.typeId == "kurokumaft:nether_stone_magic_chestplate") {
                const view = player.getViewDirection();
                damager.applyDamage(5,{"cause":"entityExplosion"} as EntityApplyDamageOptions);
                damager.dimension.spawnParticle("minecraft:large_explosion", damager.location);
                damager.applyKnockback({x:Math.round(view.x)*10, z:Math.round(view.z)*10}, 10);
                itemDurabilityMagicDamage(player, chest, EquipmentSlot.Chest);
            }
            if (chest.typeId == "kurokumaft:lightning_magic_chestplate" || chest.typeId == "kurokumaft:nether_lightning_magic_chest") {
                damager.applyDamage(5,{"cause":"lightning"} as EntityApplyDamageOptions);
                damager.dimension.spawnParticle("kurokumaft:lightning_arrow_particle", damager.location);
                itemDurabilityMagicDamage(player, chest, EquipmentSlot.Chest);
            }
        }
    }
    if (legs != undefined) {
        if (damager != undefined && projectile == undefined) {
            if (legs.typeId == "kurokumaft:lightning_magic_leggings" || legs.typeId == "kurokumaft:nether_lightning_magic_leggings") {
                const location = damager.location;
                // 5から15の範囲のランダムな数値を取得
                const randomNum1 = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
                const randomNum2 = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
                const randomInRange1 = Math.floor(Math.random()*2) == 1 ? -randomNum1 : randomNum1;
                const randomInRange2 = Math.floor(Math.random()*2) == 1 ? -randomNum2 : randomNum2;
                damager.teleport({x:location.x + randomInRange1, y:location.y, z:location.z + randomInRange2});
                itemDurabilityMagicDamage(player, legs, EquipmentSlot.Legs);
            }
        }
    }
    if (head != undefined) {
        if ((head.typeId == "kurokumaft:lightning_magic_helmet" || head.typeId == "kurokumaft:nether_lightning_magic_helmet") && projectile != undefined) {
            try {
                projectile.clearVelocity();
                projectile.dimension.spawnParticle("kurokumaft:lightning_arrow_particle", projectile.location);
                const projComp = projectile.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
                projComp.stopOnHit = true;
                const intervalNum = system.runInterval(() => {
                    if (!projectile.isValid) {
                        projectile.clearVelocity();
                    }
                }, 5);
                system.runTimeout(() => {
                    system.clearRun(intervalNum);
                }, 30);
                itemDurabilityMagicDamage(player, head, EquipmentSlot.Head);
            } catch (error) {
            }
        }
        if ((head.typeId == "kurokumaft:wind_magic_helmet" || head.typeId == "kurokumaft:nether_wind_magic_helmet") && projectile != undefined) {
            try {
                projectile.clearVelocity();
                projectile.dimension.spawnParticle("kurokumaft:wind_arrow_particle", projectile.location);
                const projComp = projectile.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
                projComp.owner = player;
                projComp.shoot(projectile.getViewDirection(), {
                    uncertainty: 0
                });

                // projectile.applyImpulse({x:hitVector!.x,y:hitVector!.y,z:-hitVector!.z});
                itemDurabilityMagicDamage(player, head, EquipmentSlot.Head);
            } catch (error) {
            }
        }
    }
};

export { hitMagicAmor }
