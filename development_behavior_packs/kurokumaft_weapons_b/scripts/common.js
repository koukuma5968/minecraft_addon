import { world,system,EntityComponentTypes,ItemComponentTypes,ItemStack } from "@minecraft/server";

/**
 * アイテム変換
 * @param {Player} player
 * @param {ItemStack} item
 * @param {String} replaceitem
 * @param {String} slotName
 * @param {String} slot
 */
function itemTans(player, item, replaceitem, slotName, slot) {
    let dur = item.getComponent(ItemComponentTypes.Durability);
    let enc = item.getComponent(ItemComponentTypes.Enchantable);
    let encs = null;
    if (enc) {
        encs = enc.getEnchantments();
    }
    let commandText =  "replaceitem entity @s " + slotName + " 0 " + replaceitem + " 1 " + dur.damage;
    player.runCommandAsync(commandText);

    if (encs) {
        replaceEnchant(player, slot, encs);
    }

};

/**
 * 耐久値減少
 * @param {Player} player
 * @param {ItemStack} item
 * @param {String} slotName
 * @param {String} slot
 * @param {Number} damage
 */
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
        replaceEnchant(player, slot, encs);
    }
};

/**
 * アイテムスタック減少
 * @param {Player} player
 * @param {ItemStack} item
 * @param {String} slotName
 * @param {String} slot
 * @param {Number} decNum
 */
function subtractionItem(player, item, slotName, slot, decNum) {
    let dur = item.getComponent(ItemComponentTypes.Durability);
    let enc = item.getComponent(ItemComponentTypes.Enchantable);
    let encs = null;
    if (enc) {
        encs = enc.getEnchantments();
    }
    let commandText =  "replaceitem entity @s " + slotName + " 0 " + item.typeId + " " + decNum + " 0";
    player.runCommandAsync(commandText);

    if (encs) {
        replaceEnchant(player, slot, encs);
    }
};

/**
 * エンチャント再設定
 * @param {Player} player
 * @param {String} slot
 * @param {Enchantment[]} encs
 */
function replaceEnchant(player, slot, encs) {
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

};

/**
 * アイテム破壊
 * @param {Player} player
 * @param {String} slot
 */
function breakItem(player, slot) {
    let commandText =  "replaceitem entity @s " + slot + " 0 destroy air";
    player.runCommandAsync(commandText);
};

// サウンド再生
function playsound(entity, sound) {
    let commandText =  "playsound " + sound + " @s";
    entity.runCommandAsync(commandText);
};
// 蘇生
function resuscitation(player) {
    let health = player.getComponent(EntityComponentTypes.Health);
    health.setCurrentValue(5);
    let commandText =  "effect @s absorption 30 5 true";
    player.runCommandAsync(commandText);
    playsound(player, "random.totem");
};

// 乱数
function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// デバッグ用
function print(text) {
    world.sendMessage(text+"");
};

export { print,itemTans,breakItem,replaceEnchant,subtractionItem,durabilityDamage,playsound,resuscitation,getRandomInRange };
