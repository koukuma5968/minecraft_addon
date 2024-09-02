import { world,system,Player,Entity,ItemStack,EntityComponentTypes,ItemComponentTypes,EntityEquippableComponent,EquipmentSlot,ItemEnchantableComponent,ItemDurabilityComponent, Vector2, Vector3} from "@minecraft/server";

const CraftBlocks = ["minecraft:crafting_table","minecraft:anvil","minecraft:smithing_table","minecraft:cartography_table","minecraft:loom","minecraft:barrel"
                    ,"minecraft:smoker","minecraft:blast_furnace","minecraft:furnace","kurokumaft:magic_lectern"];

// デバッグ用
/**
 * @param {Object} text
 */
function print(text:Object) {
    world.sendMessage(text + "");
};

// 制限
/**
 * @param {number} min
 * @param {number} max
 */
function clamp(value:number, min:number, max:number) {
    return Math.min(Math.max(value, min), max);
};

// 乱数
/**
 * @param {number} min
 * @param {number} max
 */
function getRandomInRange(min:number, max:number) {
    return Math.random() * (max - min) + min;
}

// サウンド再生
/**
 * @param {Entity} entity
 * @param {String} sound
 */
function playsound(entity:Entity, sound:String) {
    let commandText =  "playsound " + sound + " @s";
    entity.runCommandAsync(commandText);
};

// 耐久値減少
/**
 * @param {Player} player
 * @param {ItemStack} item
 * @param {String} slotName
 * @param {EquipmentSlot} slot
 * @param {number} damage
 */
function durabilityDamage(player:Player, item:ItemStack, slotName:String, slot:EquipmentSlot, damage:number) {
    let dur = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
    let enc = item.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
    let encs = null;
    if (enc) {
        encs = enc.getEnchantments();
    }
    let commandText =  "replaceitem entity @s " + slotName + " 0 " + item.typeId + " 1 " + (dur.damage + damage);
    player.runCommand(commandText);

    if (encs) {
        let intervalNum = system.runInterval(() => {
            let reEqu = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
            let reItem = reEqu.getEquipment(slot) as ItemStack ;
            let reEnc = reItem.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
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
function breakItem(player:Player, slotName:String) {
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

/**
 * 視線位置
 * @param {Vector2} rotation
 * @param {Vector3} location
 * @param {number} point
 */
function getLookPoints(rotation:Vector2, location:Vector3, point:number) {
    let piNum = 90;
    let xlocation;
    let ylocation;
    let zlocation;

    // 西～北
    if (rotation.y >= -90 && rotation.y < 0) {
        let yRotax = -rotation.y / piNum;
        let yRotaz = (rotation.y + 90) / piNum;
        let yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            let xRota = (rotation.x + 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;

        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        }

    // 北～東
    } else if (rotation.y >= 0 && rotation.y <= 90) {

        let yRotax = rotation.y / piNum;
        let yRotaz = -(rotation.y - 90) / piNum;
        let yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            let xRota = (rotation.x + 90) / piNum;
            xlocation = location.x - (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x - (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        }

    // 西～南
    } else if (rotation.y < -90 && rotation.y > -180) {

        let yRotax = (rotation.y + 180) / piNum;
        let yRotaz = (rotation.y + 90) / piNum;
        let yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            let xRota = (rotation.x + 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;

        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        }

    // 東～南
    } else if (rotation.y > 90 && rotation.y <= 180) {
        let yRotax = -(rotation.y - 180) / piNum;
        let yRotaz = -(rotation.y - 90) / piNum;
        let yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            let xRota = (rotation.x + 90) / piNum;
            xlocation = location.x - (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x - (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        }

    }
    return { xlocation, ylocation, zlocation };
}

export { print, clamp, getRandomInRange, playsound, durabilityDamage, breakItem, getLookPoints, CraftBlocks, MusicRecodes };
