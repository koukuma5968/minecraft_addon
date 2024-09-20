import { world,system,Player,Entity,ItemStack,EntityComponentTypes,ItemComponentTypes,EntityEquippableComponent,EquipmentSlot,ItemEnchantableComponent,ItemDurabilityComponent, Vector2, Vector3, Direction, Block, EntityHealthComponent, Enchantment, ItemCooldownComponent} from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

export const silkType = ["kurokumaft:charcoal_block","kurokumaft:small_mithril_bud","kurokumaft:medium_mithril_bud","kurokumaft:large_mithril_bud"
                , "kurokumaft:mithril_cluster","kurokumaft:budding_mithril","kurokumaft:medicinal_plants", "kurokumaft:onions","kurokumaft:soybeans"];

export const guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];

export const CraftBlocks = ["minecraft:crafting_table","minecraft:anvil","minecraft:smithing_table","minecraft:cartography_table","minecraft:loom","minecraft:barrel"
                    ,"minecraft:smoker","minecraft:blast_furnace","minecraft:furnace","kurokumaft:magic_lectern"];


/**
 * アイテム変換
 * @param {Player} player
 * @param {ItemStack} item
 * @param {string} replaceitem
 * @param {EquipmentSlot} slot
 */
async function itemTans(player: Player, item: ItemStack, replaceitem: string, slot: EquipmentSlot) {

    let eqc = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    let newItem = new ItemStack(replaceitem, 1);
    let dur = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
    let newDur = newItem.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
    newDur.damage = dur.damage;

    replaceEnchant(item, newItem);

    eqc.setEquipment(slot, undefined);
    eqc.setEquipment(slot, newItem);

};

/**
 * エンチャント再設定
 * @param {ItemStack} oldItem
 * @param {ItemStack} newItem
 */
async function replaceEnchant(oldItem: ItemStack, newItem: ItemStack) {

    let oldEnc = oldItem.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
    let newEnc = newItem.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;

    newEnc.addEnchantments(oldEnc.getEnchantments());

};

// デバッグ用
/**
 * @param {Object} text
 */
async function print(text:Object) {
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
    return Math.round(Math.random() * (max - min) + min);
}

// サウンド再生
/**
 * @param {Entity} entity
 * @param {string} sound
 */
async function playsound(entity:Entity, sound:string) {
    world.playSound(sound, entity.location);
};

/**
 * アイテムクールダウン
 * @param {Player} player
 * @param {ItemStack} itemStack
 */
async function itemCoolDown(player:Player, itemStack:ItemStack) {
    let cool = itemStack.getComponent(ItemComponentTypes.Cooldown) as ItemCooldownComponent;
    cool.startCooldown(player);
}

/**
 * ブロック破壊(ドロップなし)
 * @param {Block} block
 */
async function breakBlock(block:Block) {
    block.dimension.setBlockType(block.location, MinecraftBlockTypes.Air);
}

// 蘇生
function resuscitation(player: Player) {
    let health = player.getComponent(EntityComponentTypes.Health) as EntityHealthComponent;
    health.setCurrentValue(5);
    let commandText =  "effect @s absorption 30 5 true";
    player.runCommandAsync(commandText);
    playsound(player, "random.totem");
};

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

        let yRotax = -rotation.y / piNum;
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
        let yRotax = (rotation.y - 180) / piNum;
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

/**
 * 視線位置
 * @param {Vector2} rotation
 * @param {number} point
 */
function getLookRotaionPoints(rotation:Vector2, point:number) {
    let piNum = 90;
    let rotax;
    let rotaz;

    // 西～北
    if (rotation.y >= -90 && rotation.y < 0) {
        rotax = (-rotation.y / piNum) * point;
        rotaz = ((rotation.y + 90) / piNum) * point;
    // 北～東
    } else if (rotation.y >= 0 && rotation.y <= 90) {
        rotax = (-rotation.y / piNum) * point;
        rotaz = (-(rotation.y - 90) / piNum) * point;
    // 西～南
    } else if (rotation.y < -90 && rotation.y > -180) {
        rotax = ((rotation.y + 180) / piNum) * point;
        rotaz = ((rotation.y + 90) / piNum) * point;
    // 東～南
    } else if (rotation.y > 90 && rotation.y <= 180) {
        rotax = ((rotation.y - 180) / piNum) * point;
        rotaz = (-(rotation.y - 90) / piNum) * point;
    }
    return { rotax, rotaz };
}

function normalizeVector(v: Vector3): Vector3 {
    const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length
    };
}

function getDirectionVector(thisEn: Vector3, targetEn: Vector3): Vector3 {
    const direction = {
        x: targetEn.x - thisEn.x,
        y: targetEn.y - thisEn.y,
        z: targetEn.z - thisEn.z
    };
    return normalizeVector(direction);
}

const BlockLocationList = Object.freeze([
    {
        direction: Direction.Up,
        location: {x:0,y:1,z:0}
    },
    {
        direction: Direction.Down,
        location: {x:0,y:-1,z:0}
    },
    {
        direction: Direction.South,
        location: {x:0,y:0,z:1}
    },
    {
        direction: Direction.North,
        location: {x:0,y:0,z:-1}
    },
    {
        direction: Direction.East,
        location: {x:1,y:0,z:0}
    },
    {
        direction: Direction.West,
        location: {x:-1,y:0,z:0}
    }

]);

export { print, clamp, itemTans, getRandomInRange, playsound, breakBlock, resuscitation,
    itemCoolDown, getLookPoints, getDirectionVector, getLookRotaionPoints, BlockLocationList };
