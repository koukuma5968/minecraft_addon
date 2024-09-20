import { world,ItemStack, Player, Block, EquipmentSlot, Entity, EntityEquippableComponent, EntityComponentTypes, EntityInitializationCause } from "@minecraft/server";
import { guards, silkType } from "./common/commonUtil";
import { shieldGuard,shieldCounter,resuscitationEquipment,glassReflection } from "./shieldEvent";
import { tearEnchantBlock } from "./block/tearEnchantEvent";
import { stopMachinegun } from "./gun/gunShot";
import { initRegisterCustom, initStateChangeMonitor } from "./custom/CustomComponentRegistry";
import { tntBreak } from "./items/weapons/sword/TntSwordBreak";
import { breakBlock } from "./common/commonUtil";
import { hitSpear, releaseSpear, removeSpear, spawnSpear, stopSpear } from "./items/weapons/spear/ThrowableSpear";
import { stopGatling } from "./items/weapons/gun/Gatling";
import { fireCharcoalBlock } from "./items/axe/FireBrand";

// ワールド接続時
world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initRegisterCustom(initEvent);
    initStateChangeMonitor(initEvent);
});
world.beforeEvents.playerLeave.subscribe(leaveEvent => {
    leaveEvent.player.clearDynamicProperties();
});

// アイテムブロック使用前
world.beforeEvents.itemUseOn.subscribe(event => {
    let player = event.source as Player;
    let item = event.itemStack as ItemStack;
    let block = event.block as Block;
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
// // プレイヤーがブロックをクリック
// world.afterEvents.playerInteractWithBlock.subscribe(event => {
//     let block = event.block;
//     let item = event.itemStack;
//     let player = event.player;
//     if (block.typeId == "kurokumaft:tear_enchant") {
//         setTearEnchantBook(player, item, block);
//     }
// });
// アイテム使用開始
world.afterEvents.itemStartUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
});

// エンティティ削除前
world.beforeEvents.entityRemove.subscribe(event => {

    let removedEntity = event.removedEntity;
    removeSpear(removedEntity);

});

// アイテム使用リリース
world.afterEvents.itemReleaseUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    world.sendMessage("itemReleaseUse");
    if (item != undefined) {
        if (player.getDynamicProperty("machinegunShot")) {
            stopMachinegun(player, item);
        }
        if (item.typeId.indexOf("spear") != -1) {
            releaseSpear(player, item);
        } 
    }
});

// アイテム使用停止
world.afterEvents.itemStopUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    world.sendMessage("itemStopUse");
    if (item != undefined) {
        if (player.getDynamicProperty("gatlingShot")) {
            stopGatling(player);
        }
        if (player.getDynamicProperty("machinegunShot")) {
            stopMachinegun(player, item);
        }
        if (item.typeId.indexOf("spear") != -1) {
            stopSpear(player);
        }
    }
});

// エンティティスポーン
world.afterEvents.entitySpawn.subscribe(event => {
    let cause = event.cause;
    let entity = event.entity;
    if (EntityInitializationCause.Spawned == cause) {
        spawnSpear(entity);
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
});
// ブロック破壊前
world.beforeEvents.playerBreakBlock.subscribe(event => {
    let player = event.player;
    let item = event.itemStack;
    let block = event.block;
    if (item != undefined) {
    }
    if (silkType.indexOf(block.typeId) != -1) {
        event.cancel = true;
        let commandText =  "execute as @s run setblock " + block.x + " " + block.y + " " + block.z + " air destroy";
        player.runCommandAsync(commandText);
    }
});

// 近接hit後
world.afterEvents.entityHitEntity.subscribe(event => {
    let damageEn = event.damagingEntity as Entity;
    let hitEn = event.hitEntity as Entity;
    if (hitEn != undefined && hitEn instanceof Player) {
        shieldGuard(hitEn, true);
        shieldCounter(hitEn, damageEn);
    }
});

// 近接ブロックhit後
world.afterEvents.entityHitBlock.subscribe(event => {
    let damageEn = event.damagingEntity as Entity;
    let hitBlock = event.hitBlock as Block;
    if (hitBlock != undefined) {
        let equ = damageEn.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let itemStack = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (itemStack != undefined) {
            if (itemStack.typeId == "kurokumaft:fire_brand") {
                fireCharcoalBlock(damageEn, itemStack, hitBlock);
            }
            if (itemStack.typeId == "kurokumaft:tnt_sword") {
                tntBreak(damageEn, itemStack, hitBlock.location);
            }
            if (itemStack.typeId == "kurokumaft:mithril_sword") {
                breakBlock(hitBlock);
            }
        }
  
    }
});

// 遠距離hit後
world.afterEvents.projectileHitEntity.subscribe(event => {
    let projectileEn = event.projectile;
    let source = event.source as Entity
    let hitEn = event.getEntityHit().entity as Entity;
    let hitVector = event.hitVector;
    if (hitEn != undefined && hitEn instanceof Player) {
        shieldGuard(hitEn, false);
        glassReflection(hitEn, projectileEn, hitVector);
    }
    if (source != undefined && source instanceof Player) {
        hitSpear(source, projectileEn);
    }
});

// 遠距離ブロックhit後
world.afterEvents.projectileHitBlock.subscribe(event => {
    let projectileEn = event.projectile;
    let source = event.source as Entity
    if (source != undefined && source instanceof Player) {
        hitSpear(source, projectileEn);
    }
});

// ダメージ
world.afterEvents.entityHurt.subscribe(event => {
    let damage = event.damage;
    let damageSource = event.damageSource;
    let hitEn = event.hurtEntity as Player;
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

