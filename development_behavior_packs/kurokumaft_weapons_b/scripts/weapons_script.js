import { world,system,EquipmentSlot,EntityComponentTypes,ItemComponentTypes } from "@minecraft/server";
//import { ActionFormData,ModalFormData } from "@minecraft/server-ui";

const logs = ["minecraft:acacia_log","minecraft:birch_log","minecraft:cherry_log","minecraft:dark_oak_log","minecraft:jungle_log","minecraft:mangrove_log","minecraft:oak_log","minecraft:spruce_log","minecraft:stripped_acacia_log","minecraft:stripped_birch_log","minecraft:stripped_cherry_log","minecraft:stripped_dark_oak_log","minecraft:stripped_jungle_log","minecraft:stripped_mangrove_log","minecraft:stripped_oak_log","minecraft:stripped_spruce_log"];
const woods = ["minecraft:cherry_wood","minecraft:double_wooden_slab","minecraft:mangrove_wood","minecraft:stripped_cherry_wood","minecraft:stripped_mangrove_wood","minecraft:wood"];

const hoeDirts = ["minecraft:dirt","minecraft:grass","minecraft:grass_path","minecraft:podzol","minecraft:dirt_with_roots"];
const shovelDirts = ["minecraft:dirt","minecraft:grass","minecraft:farmland","minecraft:podzol","minecraft:dirt_with_roots"];

const silkType = ["kurokumaft:charcoal_block","kurokumaft:small_mithril_bud","kurokumaft:medium_mithril_bud","kurokumaft:large_mithril_bud"
                , "kurokumaft:mithril_cluster","kurokumaft:budding_mithril","kurokumaft:medicinal_plants", "kurokumaft:onions","kurokumaft:soybeans"];
const hoes = ["kurokumaft:steel_hoe","kurokumaft:mithril_hoe"];
const shovels = ["kurokumaft:steel_shovel","kurokumaft:mithril_shovel"];
const axes = ["kurokumaft:bamboo_axe","kurokumaft:copper_axe","kurokumaft:steel_axe","kurokumaft:mithril_axe","kurokumaft:orichalcum_axe","kurokumaft:fire_brand"];

const sickles = ["kurokumaft:wood_sickle","kurokumaft:stone_sickle","kurokumaft:iron_sickle"];
const scythes = ["kurokumaft:wood_scythe","kurokumaft:stone_scythe","kurokumaft:iron_scythe"];

const guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];

// アイテムブロック使用前
world.beforeEvents.itemUseOn.subscribe(event => {
    var player = event.source;
    var item = event.itemStack;
    var block = event.block;
    if (item != undefined) {
        // クワの耐久値減少
        if (hoes.indexOf(item.typeId) != -1) {
            if (hoeDirts.indexOf(block.typeId) != -1) {
                if (item.maxDurability <= (item.damage + 1)) {
                    breakItem(hitEn, "slot.weapon.mainhand");
                } else {
                    durabilityDamage(player, item, item.typeId, "slot.weapon.mainhand", 1);
                }
            }
        }
        // シャベルの耐久値減少
        else if (shovels.indexOf(item.typeId) != -1) {
            if (shovelDirts.indexOf(block.typeId) != -1) {
                if (item.maxDurability <= (item.damage + 1)) {
                    breakItem(hitEn, "slot.weapon.mainhand");
                } else {
                    durabilityDamage(player, item, item.typeId, "slot.weapon.mainhand", 1);
                }
            }
        }
        // 斧の耐久値減少
        else if (axes.indexOf(item.typeId) != -1) {
            if (logs.indexOf(block.typeId) != -1 || woods.indexOf(block.typeId) != -1) {
                if (item.maxDurability <= (item.damage + 1)) {
                    breakItem(hitEn, "slot.weapon.mainhand");
                } else {
                    durabilityDamage(player, item, item.typeId, "slot.weapon.mainhand", 1);
                }
            }
        }
    }
});
// アイテムブロック使用後
world.afterEvents.itemUseOn.subscribe(event => {
    var player = event.source;
    var item = event.itemStack;
    var block = event.block;
    if (item != undefined) {
        // クワエンチャント付けなおし
        if (hoes.indexOf(item.typeId) != -1) {
            if (hoeDirts.indexOf(block.typeId) != -1) {
                replaceEnchant(player, item);
            }
        }
        // シャベルエンチャント付けなおし
        else if (shovels.indexOf(item.typeId) != -1) {
            if (shovelDirts.indexOf(block.typeId) != -1) {
                replaceEnchant(player, item);
            }
        }
        // 斧エンチャント付けなおし
        else if (axes.indexOf(item.typeId) != -1) {
            if (logs.indexOf(block.typeId) != -1 || woods.indexOf(block.typeId) != -1) {
                replaceEnchant(player, item);
            }
        }
    }
});
// アイテム使用前
world.beforeEvents.itemUse.subscribe(event => {
    var player = event.source;
    var item = event.itemStack;
    if (item != undefined) {
        // シックル→サイス
        if (item.typeId.indexOf("sickle") != -1 && player.isSneaking) {
            itemTans(player, item, scythes[sickles.indexOf(item.typeId)], "slot.weapon.mainhand");
        }
        // サイス→シックル
        else if (item.typeId.indexOf("scythe") != -1 && player.isSneaking) {
            itemTans(player, item, sickles[scythes.indexOf(item.typeId)], "slot.weapon.mainhand");
        }
    }
});
// アイテム使用後
world.afterEvents.itemUse.subscribe(event => {
    var player = event.source;
    var item = event.itemStack;
    if (item != undefined) {
        // シックル→サイスエンチャント付けなおし
        if (item.typeId.indexOf("sickle") != -1 && player.isSneaking) {
            replaceEnchant(player, item);
        }
        // サイス→シックルエンチャント付けなおし
        else if (item.typeId.indexOf("scythe") != -1 && player.isSneaking) {
            replaceEnchant(player, item);
        }
    }
});
// ブロック破壊前
world.beforeEvents.playerBreakBlock.subscribe(event => {
    var player = event.player;
    var item = event.itemStack;
    var block = event.block;
    if (item != undefined) {
        if (item.typeId == "kurokumaft:fire_brand") {
            if (logs.indexOf(block.typeId) != -1 || woods.indexOf(block.typeId) != -1) {
                event.cancel = true;
                let commandText =  "particle kurokumaft:mobflame_firing " + block.x + " " + (block.y + 0.5) + " " + block.z;
                player.runCommandAsync(commandText);
                commandText =  "execute as @s run setblock " + block.x + " " + block.y + " " + block.z + " kurokumaft:charcoal_block replace";
                player.runCommandAsync(commandText);
            }
        }
    }
    if (silkType.indexOf(block.typeId) != -1) {
        event.cancel = true;
        let commandText =  "execute as @s run setblock " + block.x + " " + block.y + " " + block.z + " air destroy";
        player.runCommandAsync(commandText);
    }
});
// world.beforeEvents.entityRemove.subscribe(event => {
//     var entity = event.removedEntity;
//     print(entity, entity.typeId);
//     var comps = entity.getComponents();
//     for (var i=0;i<comps.length;i++) {
//         print(entity, JSON.stringify(comps[i]));
//     }
//     // let health = entity.getComponent(EntityComponentTypes.Health);
//     // print(entity, parseInt(health.currentValue));
// });
// var useItemStack = new Map();
// world.beforeEvents.itemUse.subscribe(event => {
//     var entity = event.source;
//     print(entity, "itemUse");
//     var item = event.itemStack;
//     if (item != undefined) {
//         print(entity, item.type.id);
//         if (item != undefined) {
//             let id = entity.id;
//             useItemStack.set(id, item);
//             let dur = item.getComponent(ItemComponentTypes.Durability);
//             print(entity, dur.damage);
//         }
//     }
// });
// world.afterEvents.itemReleaseUse.subscribe(event => {
//     var entity = event.source;
//     print(entity, "itemReleaseUse");
// });
// world.afterEvents.entitySpawn.subscribe(event => {
//     var entity = event.entity;
//     print(entity, JSON.stringify(useItemStack));
//     print(entity, "entitySpawn");
//     print(entity, entity.typeId);
//     var comps = entity.getComponents();
//     for (var i=0;i<comps.length;i++) {
//         print(entity, JSON.stringify(comps[i]));
//     }
// });
// 近接hit後
world.afterEvents.entityHitEntity.subscribe(event => {
    var damageEn = event.damagingEntity;
    var hitEn = event.hitEntity;
    if (hitEn.typeId == "minecraft:player") {
        shieldGuard(hitEn, true);
        shieldCounter(hitEn, damageEn);
    }
});
// 遠距離hit後
world.afterEvents.projectileHitEntity.subscribe(event => {
    var projectileEn = event.projectile;
    var hitEn = event.getEntityHit().entity;
    var hitVector = event.hitVector;
    if (hitEn.typeId == "minecraft:player") {
        shieldGuard(hitEn, false);
        glassReflection(hitEn, projectileEn, hitVector);
    }
});
// ダメージ
world.afterEvents.entityHurt.subscribe(event => {
    var damage = event.damage;
    var damageSource = event.damageSource;
    var hitEn = event.hurtEntity;
    // print(hitEn, damageSource.cause + "=" + damage);
    if (hitEn.typeId == "minecraft:player" && damageSource.cause != "void") {
        if (guards.indexOf(damageSource.cause) != -1) {
            shieldGuard(hitEn, false);
        }
        resuscitationEquipment(hitEn);
    }
});
// デバッグ用
function print(text) {
    world.sendMessage(text);
};
// ガード
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
                    durabilityDamage(player, offhand, offhand.typeId, "slot.weapon.offhand", 10);
                    playsound(player, "random.glass");
                } else {
                    durabilityDamage(player, offhand, offhand.typeId, "slot.weapon.offhand", 1);
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
                    durabilityDamage(player, mainhand, mainhand.typeId, "slot.weapon.mainhand", 10);
                    playsound(player, "random.glass");
                } else {
                    durabilityDamage(player, mainhand, mainhand.typeId, "slot.weapon.mainhand", 1);
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
                durabilityDamage(player, offhand, offhand.typeId, "slot.weapon.offhand", (30/100)*dur.maxDurability);
            } else {
                breakItem(player, "slot.weapon.offhand");
            }
        } else if (mainhand != undefined && (mainhand.typeId == "kurokumaft:immortal_shield")) {
            let dur = mainhand.getComponent(ItemComponentTypes.Durability);
            resuscitation(player);
            if ((dur.damage + ((30/100)*dur.maxDurability)) < dur.maxDurability) {
                durabilityDamage(player, mainhand, mainhand.typeId, "slot.weapon.mainhand", (30/100)*dur.maxDurability);
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
// サウンド再生
function playsound(entity, sound) {
    let commandText =  "playsound " + sound + " @s";
    entity.runCommandAsync(commandText);
};
// 耐久値減少
function durabilityDamage(player, item, replaceitem, slot, damage) {
    var dur = item.getComponent(ItemComponentTypes.Durability);
    let commandText =  "replaceitem entity @s " + slot + " 0 " + replaceitem + " 1 " + (dur.damage + damage);
    player.runCommandAsync(commandText);
};
// アイテム変換
function itemTans(player, item, replaceitem, slot) {
    var dur = item.getComponent(ItemComponentTypes.Durability);
    let commandText =  "replaceitem entity @s " + slot + " 0 " + replaceitem + " 1 " + dur;
    player.runCommandAsync(commandText);
};
// エンチャント再設定
function replaceEnchant(player, item) {
    var enc = item.getComponent(ItemComponentTypes.Enchantable);
    var encs = enc.getEnchantments();
    for (var i=0;i<encs.length;i++) {
        let commandText = "enchant @s " + encs[i].type.id + " " + encs[i].level;
        player.runCommandAsync(commandText);
    }
};
// アイテム破壊
function breakItem(player, slot) {
    let commandText =  "replaceitem entity @s " + slot + " 0 destroy air";
    player.runCommandAsync(commandText);
};
// 蘇生
function resuscitation(player) {
    let health = player.getComponent(EntityComponentTypes.Health);
    health.setCurrentValue(5);
    let commandText =  "effect @s absorption 30 5 true";
    player.runCommandAsync(commandText);
    playsound(player, "random.totem");
};

// world.afterEvents.itemDefinitionEvent.subscribe(event => {
//     var player = event.source;
//     var item = event.itemStack;
//     print(player,item.typeId);
// });

// var players = new Array();

// world.afterEvents.entityDie.subscribe(event => {
//     let entity = event.deadEntity;
//     print(entity, entity.typeId);
    // if (entity.typeId == "minecraft:player") {
    //     modalForm.show(entity).then((formData) => {
    //         players[0].sendMessage(`Modal form results: ${JSON.stringify(formData.formValues, undefined, 2)}`);
    //     });
        
    //     form.show(entity).then((response) => {
    //         if (response.selection === 3) {
    //             dimension.runCommand("say I like April too!");
    //         }
    //     });
    // }
// });

// const modalForm = new ModalFormData().title("Example Modal Controls for §o§7ModalFormData§r");

// modalForm.toggle("Toggle w/o default");
// modalForm.toggle("Toggle w/ default", true);

// modalForm.slider("Slider w/o default", 0, 50, 5);
// modalForm.slider("Slider w/ default", 0, 50, 5, 30);

// modalForm.dropdown("Dropdown w/o default", ["option 1", "option 2", "option 3"]);
// modalForm.dropdown("Dropdown w/ default", ["option 1", "option 2", "option 3"], 2);

// modalForm.textField("Input w/o default", "type text here");
// modalForm.textField("Input w/ default", "type text here", "this is default");

// world.afterEvents.entitySpawn.subscribe(event => {
//     let entity = event.entity;
//     print(entity, entity.typeId);
// });

// const form = new ActionFormData()
// .title("Months")
// .body("Choose your favorite month!")
// .button("January")
// .button("February")
// .button("March")
// .button("April")
// .button("May");

