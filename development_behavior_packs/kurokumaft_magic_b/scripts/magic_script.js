import { world,system,EntityComponentTypes,ItemComponentTypes } from "@minecraft/server";
import { ActionFormData,ModalFormData } from "@minecraft/server-ui";

const guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];

// デバッグ用
function print(text) {
    world.sendMessage(text + "");
};

// 近接hit後
world.afterEvents.entityHitEntity.subscribe(event => {
    var damageEn = event.damagingEntity;
    var hitEn = event.hitEntity;
    if (hitEn.typeId == "minecraft:player") {
        shieldGuard(hitEn, true);
//        shieldCounter(hitEn, damageEn);
    }
});
// エンティティを右クリック
world.afterEvents.playerInteractWithEntity.subscribe(event => {
    var player = event.player;
    var target = event.target;
    var item = event.itemStack;
    if (item.typeId == "kurokumaft:repatriation_fruit" && target.typeId == "kurokumaft:home_gate") {
        homeSetDialog(player, item, target);
    }

});

// 遠距離hit後
world.afterEvents.projectileHitEntity.subscribe(event => {
    var projectileEn = event.projectile;
    var hitEn = event.getEntityHit().entity;
    var hitVector = event.hitVector;
    if (hitEn.typeId == "minecraft:player") {
        shieldGuard(hitEn, false);
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
    }
});
// アイテム使用完了
world.afterEvents.itemCompleteUse.subscribe(event => {
    print("itemCompleteUse");
    var en = event.source;
    var item = event.itemStack;
    if (en.typeId == "minecraft:player" && item != undefined && item.typeId === "kurokumaft:repatriation_fruit") {
        home_tp(en, item)
    }
    print(item.isStackable);
    let pros = item.getComponents();
    for (let i=0;i<pros.length;i++) {
        print(pros[i].typeId);
    }

});

// ガード
function shieldGuard(player, range) {
    let equ = player.getComponent(EntityComponentTypes.Equippable);
    let offhand = equ.getEquipment("Offhand");
    let mainhand = equ.getEquipment("Mainhand");
    if (player.isSneaking) {
        print("shieldGuard");
        // シールド耐久
        if (offhand != undefined && (offhand.typeId.indexOf("_shield") != -1)) {
            let dur = offhand.getComponent(ItemComponentTypes.Durability);
            if (dur.maxDurability > (dur.damage + 1)) {
                durabilityDamage(player, offhand, offhand.typeId, "slot.weapon.offhand", 1);
                playsound(player, "item.shield.block");
            } else {
                breakItem(player, "slot.weapon.offhand");
            }
        } else if (mainhand != undefined && (mainhand.typeId.indexOf("_shield") != -1)) {
            let dur = mainhand.getComponent(ItemComponentTypes.Durability);
            if (dur.maxDurability > (dur.damage + 1)) {
                durabilityDamage(player, mainhand, mainhand.typeId, "slot.weapon.mainhand", 1);
                playsound(player, "item.shield.block");
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
        if (offhand != undefined && offhand.typeId == "kurokumaft:fire_magic_shield") {
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
        } else if (mainhand != undefined && mainhand.typeId == "kurokumaft:fire_magic_shield") {
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

function home_tp(entity, item) {
    let lores = item.getLore();
    if (lores.length > 0 && lores[0].indexOf("拠点") != -1) {
        let result = player.runCommand();
        if (result.successCount > 0) {
            let text = "tp @s " + lores[1].substr(2) + " " + lores[2].substr(2) + " " + lores[3].substr(2);
            entity.runCommandAsync(text);
        }
    }
};

function homeSetDialog(player, item, target) {

    const modalForm = new ModalFormData().title("拠点名を入力");
    modalForm.textField('拠点名', '');

    modalForm
        .show(player)
        .then(formData => {
            // player.sendMessage(`Modal form results: ${JSON.stringify(formData.formValues, undefined, 2)}`);
            item.setLore(["拠点:" + formData.formValues[0],"x:"+target.location.x,"y:"+target.location.y,"x:"+target.location.z]);
            const inventory = player.getComponent(EntityComponentTypes.Inventory);
            inventory.container.setItem(player.selectedSlot, item);
        })
        .catch((error) => {
            return -1;
        });
};
