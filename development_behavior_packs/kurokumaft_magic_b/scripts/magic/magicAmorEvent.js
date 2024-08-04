import { system,Player,Entity,EntityComponentTypes,ItemComponentTypes } from "@minecraft/server";
import { print, playsound, durabilityDamage, breakItem } from "../common"

// 耐久値減少
/**
 * @param {Player} player
 * @param {Entity} damager
 * @param {Entity} projectile
 * @param {Vector3} hitVector
 */
function magicAmor(player, damager, projectile, hitVector) {
    let equ = player.getComponent(EntityComponentTypes.Equippable);
    let chest = equ.getEquipment("Chest");
    let legs = equ.getEquipment("Legs");
    let head = equ.getEquipment("Head");
    if (chest != undefined) {
        if (damager != undefined && projectile == undefined) {
            if (chest.typeId == "kurokumaft:stone_magic_chestplate" || chest.typeId == "kurokumaft:nether_stone_magic_chestplate") {
                let view = player.getViewDirection();
                damager.applyDamage(5,{"cause":"entityExplosion"});
                damager.runCommandAsync("particle minecraft:large_explosion  ~~~");
                damager.applyKnockback(Math.round(view.x)*10,Math.round(view.z)*10,10,1);
            }
            if (chest.typeId == "kurokumaft:lightning_magic_chestplate" || chest.typeId == "kurokumaft:nether_lightning_magic_chestplate") {
                damager.applyDamage(5,{"cause":"lightning"});
                damager.runCommandAsync("particle kurokumaft:lightning_arrow_particle ~~~");
            }
        }
    }
    if (legs != undefined) {
        if (damager != undefined && projectile == undefined) {
            if (legs.typeId == "kurokumaft:lightning_magic_leggings" || legs.typeId == "kurokumaft:nether_lightning_magic_leggings") {
                let location = damager.location;
                // 5から15の範囲のランダムな数値を取得
                let randomNum1 = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
                let randomNum2 = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
                let randomInRange1 = Math.floor(Math.random()*2) == 1 ? -randomNum1 : randomNum1;
                let randomInRange2 = Math.floor(Math.random()*2) == 1 ? -randomNum2 : randomNum2;
                damager.teleport({x:location.x + randomInRange1, y:location.y, z:location.z + randomInRange2},null);
            }
        }
    }
    if (head != undefined) {
        if ((head.typeId == "kurokumaft:lightning_magic_helmet" || head.typeId == "kurokumaft:nether_lightning_magic_helmet") && projectile != undefined) {
            try {
                projectile.clearVelocity();
                projectile.runCommand("particle kurokumaft:lightning_arrow_particle ~~~");
                let intervalNum = system.runInterval(() => {
                    projectile.clearVelocity();
                }, 5);
                system.runTimeout(() => {
                    system.clearRun(intervalNum);
                }, 30);
            } catch (error) {
            }
        }
        if ((head.typeId == "kurokumaft:wind_magic_helmet" || head.typeId == "kurokumaft:nether_wind_magic_helmet") && projectile != undefined) {
            try {
                projectile.clearVelocity();
                projectile.runCommand("particle kurokumaft:wind_arrow_particle ~~~");
                projectile.applyImpulse({x:hitVector.x,y:hitVector.y,z:-hitVector.z});
            } catch (error) {
            }
        }
    }
};

export { magicAmor }
