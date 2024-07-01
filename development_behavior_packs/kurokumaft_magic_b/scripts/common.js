import { world,system,Entity,EntityComponent,EntityComponentTypes,ItemComponentTypes,EquipmentSlot } from "@minecraft/server";

const CraftBlocks = ["minecraft:crafting_table","minecraft:anvil","minecraft:smithing_table","minecraft:cartography_table","minecraft:loom","minecraft:barrel"
                    ,"minecraft:smoker","minecraft:blast_furnace","minecraft:furnace","kurokumaft:magic_lectern"];

// デバッグ用
/**
 * @param {String} text
 */
function print(text) {
    world.sendMessage(text + "");
};

// サウンド再生
/**
 * @param {Entity} entity
 * @param {String} sound
 */
function playsound(entity, sound) {
    let commandText =  "playsound " + sound + " @s";
    entity.runCommandAsync(commandText);
};

// 耐久値減少
/**
 * @param {Player} player
 * @param {EntityComponent} item
 * @param {String} slotName
 * @param {EquipmentSlot} slot
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
    player.runCommand(commandText);

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
/**
 * @param {Player} player
 * @param {String} slotName
 */
function breakItem(player, slotName) {
    let commandText =  "replaceitem entity @s " + slotName + " 0 destroy air";
    player.runCommand(commandText);
};

// ミュージックレコード
const MusicRecodes = Object.freeze([
    "record.5",
    "record.relic",
    "record.13",
    "record.cat",
    "record.blocks",
    "record.chirp",
    "record.far",
    "record.mall",
    "record.mellohi",
    "record.stal",
    "record.strad",
    "record.ward",
    "record.11",
    "record.wait",
    "record.pigstep",
    "record.otherside"
]);

export { print, playsound, durabilityDamage, breakItem, CraftBlocks, MusicRecodes };
