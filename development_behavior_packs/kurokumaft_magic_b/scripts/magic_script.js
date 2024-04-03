import { world,system,EntityComponentTypes,ItemComponentTypes } from "@minecraft/server";
import { ActionFormData,ModalFormData } from "@minecraft/server-ui";

const guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];

// デバッグ用
function print(text) {
    world.sendMessage(text + "");
};

// 近接hit後
world.afterEvents.entityHitEntity.subscribe(event => {
    var dameger = event.damagingEntity;
    var hitEn = event.hitEntity;
    if (hitEn.typeId == "minecraft:player") {
        shieldGuard(hitEn, true);
        shieldCounter(hitEn, dameger);
        magicAmor(hitEn, dameger);
    }
});
// エンティティを右クリック
world.afterEvents.playerInteractWithEntity.subscribe(event => {
    var player = event.player;
    var target = event.target;
    var item = event.itemStack;
    if (item) {
        if (item.typeId == "kurokumaft:repatriation_fruit" && target.typeId == "kurokumaft:home_gate") {
            homeSetDialog(player, item, target);
        }
    }

});

// 遠距離hit後
world.afterEvents.projectileHitEntity.subscribe(event => {
    var projectileEn = event.projectile;
    var hitEn = event.getEntityHit().entity;
    var dameger = event.source;
    var hitVector = event.hitVector;
    if (hitEn != undefined && hitEn.typeId == "minecraft:player") {
        shieldGuard(hitEn, false);
        shieldCounter(hitEn, dameger);
        magicAmor(hitEn,dameger,projectileEn, hitVector);
    }
});
// ダメージ
world.afterEvents.entityHurt.subscribe(event => {
    var damage = event.damage;
    var damageSource = event.damageSource;
    var hitEn = event.hurtEntity;
    // print(hitEn, damageSource.cause + "=" + damage);
    if (hitEn != undefined && hitEn.typeId == "minecraft:player" && damageSource.cause != "void") {
        if (guards.indexOf(damageSource.cause) != -1) {
            shieldGuard(hitEn, false);
        }
    }
});
// アイテム使用完了
world.afterEvents.itemCompleteUse.subscribe(event => {
    var en = event.source;
    var item = event.itemStack;
    if (en != undefined && en.typeId == "minecraft:player" && item != undefined ) {
        if (item.typeId === "kurokumaft:repatriation_fruit") {
            home_tp(en, item)
        }
    }

});
// ガード
function shieldGuard(player, range) {
    let equ = player.getComponent(EntityComponentTypes.Equippable);
    let offhand = equ.getEquipment("Offhand");
    let mainhand = equ.getEquipment("Mainhand");
    if (player.isSneaking) {
        // シールド耐久
        if (offhand != undefined && (offhand.typeId.indexOf("_shield") != -1)) {
            let dur = offhand.getComponent(ItemComponentTypes.Durability);
            if (dur.maxDurability > (dur.damage + 1)) {
                durabilityDamage(player, offhand, "slot.weapon.offhand", "Offhand", 1);
                playsound(player, "item.shield.block");
            } else {
                breakItem(player, "slot.weapon.offhand");
            }
        } else if (mainhand != undefined && (mainhand.typeId.indexOf("_shield") != -1)) {
            let dur = mainhand.getComponent(ItemComponentTypes.Durability);
            if (dur.maxDurability > (dur.damage + 1)) {
                durabilityDamage(player, mainhand, "slot.weapon.mainhand", "Mainhand", 1);
                playsound(player, "item.shield.block");
            } else {
                breakItem(player, "slot.weapon.mainhand");
            }
        }
    }
};

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
            projectile.clearVelocity();
            projectile.runCommandAsync("particle kurokumaft:lightning_arrow_particle ~~~");
            let intervalNum = system.runInterval(() => {
                projectile.clearVelocity();
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 30);
        }
        if ((head.typeId == "kurokumaft:wind_magic_helmet" || head.typeId == "kurokumaft:nether_wind_magic_helmet") && projectile != undefined) {
            projectile.clearVelocity();
            projectile.runCommandAsync("particle kurokumaft:wind_arrow_particle ~~~");
            projectile.applyImpulse({x:hitVector.x,y:hitVector.y,z:hitVector.z - 180});
        }
    }
};

// シールドカウンター
function shieldCounter(player, damager) {
    let equ = player.getComponent(EntityComponentTypes.Equippable);
    let offhand = equ.getEquipment("Offhand");
    let mainhand = equ.getEquipment("Mainhand");
    if (player.isSneaking) {
        // 火の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:fire_magic_shield") {
            damager.applyDamage(3,{"cause":"lava"});
            damager.runCommandAsync("particle kurokumaft:mobflame_firing ~~~");
            let intervalNum = system.runInterval(() => {
                if (damager) {
                    let health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(3,{"cause":"lava"});
                        damager.runCommandAsync("particle kurokumaft:mobflame_firing ~~~");
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 15);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:fire_magic_shield") {
            damager.applyDamage(3,{"cause":"lava"});
            damager.runCommandAsync("particle kurokumaft:mobflame_firing ~~~");
            let intervalNum = system.runInterval(() => {
                if (damager) {
                    let health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(3,{"cause":"lava"});
                        damager.runCommandAsync("particle kurokumaft:mobflame_firing ~~~");
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 15);
        }
        // 水の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:water_magic_shield") {
            damager.applyDamage(1,{"cause":"drowning"});
            damager.runCommandAsync("particle kurokumaft:water_sword_particle ~~~");
            damager.addEffect("weakness",600,{"amplifier":1,"showParticles":true});
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:water_magic_shield") {
            damager.applyDamage(1,{"cause":"drowning"});
            damager.runCommandAsync("particle kurokumaft:water_sword_particle ~~~");
            damager.addEffect("weakness",600,{"amplifier":1,"showParticles":true});
        }
        // 風の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:wind_magic_shield") {
            let view = player.getViewDirection();
            damager.applyDamage(1,{"cause":"fall"});
            damager.runCommandAsync("particle kurokumaft:aero_bomb_short_particle ~~~");
            damager.applyKnockback(Math.round(view.x)*10,Math.round(view.z)*10,10,1);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:wind_magic_shield") {
            let view = player.getViewDirection();
            damager.applyDamage(1,{"cause":"fall"});
            damager.runCommandAsync("particle kurokumaft:aero_bomb_short_particle ~~~");
            damager.applyKnockback(Math.round(view.x)*10,Math.round(view.z)*10,10,1);
        }
        // 雷の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:thunder_magic_shield") {
            damager.applyDamage(3,{"cause":"lightning"});
            damager.runCommandAsync("particle minecraft:snowflake_particle ~~~");
            let intervalNum = system.runInterval(() => {
                if (damager) {
                    let health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(3,{"cause":"lightning"});
                        damager.runCommandAsync("particle minecraft:snowflake_particle ~~~");
                    }
                }
            }, 5);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 15);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:thunder_magic_shield") {
            damager.applyDamage(3,{"cause":"lightning"});
            damager.runCommandAsync("particle kurokumaft:thunder_sword_particle ~~~");
            let intervalNum = system.runInterval(() => {
                if (damager) {
                    let health = damager.getComponent(EntityComponentTypes.Health);
                    if (health) {
                        damager.applyDamage(3,{"cause":"lightning"});
                        damager.runCommandAsync("particle kurokumaft:thunder_sword_particle ~~~");
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
            damager.applyDamage(1,{"cause":"piston"});
            damager.runCommandAsync("particle kurokumaft:grey_bomb_short_particle ~~~");
            damager.applyKnockback(Math.round(view.x)*10,Math.round(view.z)*10,10,1);
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:stone_magic_shield") {
            let view = player.getViewDirection();
            damager.applyDamage(1,{"cause":"piston"});
            damager.runCommandAsync("particle kurokumaft:grey_bomb_short_particle ~~~");
            damager.applyKnockback(Math.round(view.x)*10,Math.round(view.z)*10,10,1);
        }
        // 氷の盾
        if (offhand != undefined && offhand.typeId == "kurokumaft:ice_magic_shield") {
            damager.applyDamage(1,{"cause":"freezing"});
            damager.runCommandAsync("particle kurokumaft:ice_sword_particle ~~~");
            damager.addEffect("slowness",200,{"amplifier":1,"showParticles":false});
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:ice_magic_shield") {
            damager.applyDamage(1,{"cause":"freezing"});
            damager.runCommandAsync("particle kurokumaft:ice_sword_particle ~~~");
            damager.addEffect("slowness",200,{"amplifier":1,"showParticles":false});
        }
    }
};

// サウンド再生
function playsound(entity, sound) {
    let commandText =  "playsound " + sound + " @s";
    entity.runCommandAsync(commandText);
};
// 耐久値減少
function durabilityDamage(player, item, slotName, slot, damage) {
    let dur = item.getComponent(ItemComponentTypes.Durability);
    let enc = item.getComponent(ItemComponentTypes.Enchantable);
    let encs = null;
    if (enc) {
        encs = enc.getEnchantments();
    }
    let commandText =  "replaceitem entity @s " + slotName + " 0 " + item.typeId + " 1 " + (dur.damage + damage);
    player.runCommandAsync(commandText);

    if (encs) {
        let intervalNum = system.runInterval(() => {
            let reEqu = player.getComponent(EntityComponentTypes.Equippable);
            let reItem = reEqu.getEquipment(slot);
            let reEnc = reItem.getComponent(ItemComponentTypes.Enchantable);
            for (let i=0;i<encs.length;i++) {
                reEnc.addEnchantment(encs[i]);
            }
        
            reEqu.setEquipment(slot, reItem);
        
        }, 2);
        system.runTimeout(() => {
            system.clearRun(intervalNum);
        }, 3);
    }
};
// アイテム破壊
function breakItem(player, slot) {
    let commandText =  "replaceitem entity @s " + slot + " 0 destroy air";
    player.runCommandAsync(commandText);
};

function home_tp(player, item) {
    let lores = item.getLore();
    if (lores.length > 0 && lores[0].indexOf("拠点") != -1) {
        let entity = world.getEntity(lores[4].substr(3));
        // if (entity != undefined && entity.typeId == "kurokumaft:home_gate") {
            let text = "tp @s " + lores[1].substr(2) + " " + lores[2].substr(2) + " " + lores[3].substr(2);
            player.runCommandAsync(text);
        // } else {
        //     print("登録した拠点は使用出来ません。");
        // }
    }
};

function homeSetDialog(player, item, target) {

    let modalForm = new ModalFormData().title("拠点名を入力");
    modalForm.textField('拠点名', '');
    modalForm
        .show(player)
        .then(formData => {
            // player.sendMessage(`Modal form results: ${JSON.stringify(formData.formValues, undefined, 2)}`);
            item.setLore(["拠点:" + formData.formValues[0],"x:"+target.location.x,"y:"+target.location.y,"x:"+target.location.z,"id:"+target.id]);
            let inventory = player.getComponent(EntityComponentTypes.Inventory);
            inventory.container.setItem(player.selectedSlot, item);
            target.addTag("home_gate_set");
            player.sendMessage(`拠点を登録しました。`)
        })
        .catch((error) => {
            return -1;
        });
};
