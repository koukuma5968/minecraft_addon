import { world,system } from "@minecraft/server";
import { print,itemTans,breakItem,durabilityDamage } from "./common";
import { shieldGuard,shieldCounter,resuscitationEquipment,glassReflection } from "./shieldEvent";
import { tearEnchantBlock,setTearEnchantBook } from "./block/tearEnchantEvent";
import { shotGatling, shotMachinegun, stopGatling, stopMachinegun } from "./gun/gunShot";

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
    let player = event.source;
    let item = event.itemStack;
    let block = event.block;
    if (item != undefined && player != undefined) {
        // クワの耐久値減少
        if (hoes.indexOf(item.typeId) != -1) {
            if (hoeDirts.indexOf(block.typeId) != -1) {
                if (item.maxDurability <= (item.damage + 1)) {
                    breakItem(hitEn, "slot.weapon.mainhand");
                } else {
                    durabilityDamage(player, item, "slot.weapon.mainhand", "Mainhand", 1);
                }
            }
        }
        // シャベルの耐久値減少
        else if (shovels.indexOf(item.typeId) != -1) {
            if (shovelDirts.indexOf(block.typeId) != -1) {
                if (item.maxDurability <= (item.damage + 1)) {
                    breakItem(hitEn, "slot.weapon.mainhand");
                } else {
                    durabilityDamage(player, item, "slot.weapon.mainhand", "Mainhand", 1);
                }
            }
        }
        // 斧の耐久値減少
        else if (axes.indexOf(item.typeId) != -1) {
            if (logs.indexOf(block.typeId) != -1 || woods.indexOf(block.typeId) != -1) {
                if (item.maxDurability <= (item.damage + 1)) {
                    breakItem(hitEn, "slot.weapon.mainhand");
                } else {
                    durabilityDamage(player, item, "slot.weapon.mainhand", "Mainhand", 1);
                }
            }
        }
    }
    // エンチャントリリース
    if (block.typeId == "kurokumaft:tear_enchant") {
        tearEnchantBlock(player, item, block);
    }
});
// アイテムブロック使用後
world.afterEvents.itemUseOn.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    let block = event.block;
    if (item != undefined) {

    }
});
// プレイヤーがブロックをクリック
world.afterEvents.playerInteractWithBlock.subscribe(event => {
    let block = event.block;
    let item = event.itemStack;
    let player = event.player;
    if (block.typeId == "kurokumaft:tear_enchant") {
        setTearEnchantBook(player, item, block);
    }
});
// アイテム使用開始
world.afterEvents.itemStartUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    if (item != undefined) {
        if (item.typeId == "kurokumaft:gatling") {
            shotGatling(player, item);
        } else if (item.typeId == "kurokumaft:machine_gun") {
            shotMachinegun(player, item);
        } 
    }
});
// アイテム使用停止
world.afterEvents.itemStopUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    if (item != undefined) {
        if (player.getDynamicProperty("gatlingShot")) {
            stopGatling(player, item);
        } else if (player.getDynamicProperty("machinegunShot")) {
            stopMachinegun(player, item);
        }
    }
});
// アイテム使用リリース
world.afterEvents.itemReleaseUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    if (item != undefined) {
        if (item.typeId == "kurokumaft:gatling") {
            shotGatling(player, item);
        } else if (item.typeId == "kurokumaft:machine_gun") {
            shotMachinegun(player, item);
        } else if (item.typeId.indexOf("spear")) {
            print("itemReleaseUse");
            print(item.typeId);
        } 
    }
});
// エンティティスポーン
world.afterEvents.entitySpawn.subscribe(event => {
    let cause = event.cause;
    let entity = event.entity;
    if ("Spawned" == cause && entity.typeId.indexOf("spear")) {
        print("entitySpawn");
        print(entity.typeId);
    }
});
// アイテム使用前
world.beforeEvents.itemUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    if (item != undefined) {
    }
});
// アイテム使用後
world.afterEvents.itemUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    if (item != undefined) {
        // シックル→サイスエンチャント付けなおし
        if (item.typeId.indexOf("sickle") != -1 && player.isSneaking) {
            itemTans(player, item, scythes[sickles.indexOf(item.typeId)], "slot.weapon.mainhand", "Mainhand");
//            replaceEnchant(player, item);
        }
        // サイス→シックルエンチャント付けなおし
        else if (item.typeId.indexOf("scythe") != -1 && player.isSneaking) {
            itemTans(player, item, sickles[scythes.indexOf(item.typeId)], "slot.weapon.mainhand", "Mainhand");
//            replaceEnchant(player, item);
        }
    }
});
// ブロック破壊前
world.beforeEvents.playerBreakBlock.subscribe(event => {
    let player = event.player;
    let item = event.itemStack;
    let block = event.block;
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

// 近接hit後
world.afterEvents.entityHitEntity.subscribe(event => {
    let damageEn = event.damagingEntity;
    let hitEn = event.hitEntity;
    if (hitEn != undefined && hitEn.typeId == "minecraft:player") {
        shieldGuard(hitEn, true);
        shieldCounter(hitEn, damageEn);
    }
});
// 遠距離hit後
world.afterEvents.projectileHitEntity.subscribe(event => {
    let projectileEn = event.projectile;
    let hitEn = event.getEntityHit().entity;
    let hitVector = event.hitVector;
    if (hitEn != undefined && hitEn.typeId == "minecraft:player") {
        shieldGuard(hitEn, false);
        glassReflection(hitEn, projectileEn, hitVector);
    }
});
// ダメージ
world.afterEvents.entityHurt.subscribe(event => {
    let damage = event.damage;
    let damageSource = event.damageSource;
    let hitEn = event.hurtEntity;
    // print(hitEn, damageSource.cause + "=" + damage);
    if (hitEn.typeId == "minecraft:player" && damageSource.cause != "void") {
        if (guards.indexOf(damageSource.cause) != -1) {
            shieldGuard(hitEn, false);
        }
        resuscitationEquipment(hitEn);
    }
});

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

