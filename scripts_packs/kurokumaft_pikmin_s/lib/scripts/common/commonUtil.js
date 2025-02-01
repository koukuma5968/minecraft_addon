import { world, ItemStack, EntityComponentTypes, ItemComponentTypes, Direction, TicksPerSecond } from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftEffectTypes } from "@minecraft/vanilla-data";
export const silkType = ["kurokumaft:charcoal_block", "kurokumaft:small_mithril_bud", "kurokumaft:medium_mithril_bud", "kurokumaft:large_mithril_bud",
    "kurokumaft:mithril_cluster", "kurokumaft:budding_mithril", "kurokumaft:medicinal_plants", "kurokumaft:onions", "kurokumaft:soybeans"];
export const guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];
/**
 * アイテム変換
 * @param {Player} player
 * @param {ItemStack} item
 * @param {string} replaceitem
 * @param {EquipmentSlot} slot
 */
function itemTans(player, item, replaceitem, slot) {
    return __awaiter(this, void 0, void 0, function* () {
        let eqc = player.getComponent(EntityComponentTypes.Equippable);
        let newItem = new ItemStack(replaceitem, 1);
        let dur = item.getComponent(ItemComponentTypes.Durability);
        let newDur = newItem.getComponent(ItemComponentTypes.Durability);
        newDur.damage = dur.damage;
        replaceEnchant(item, newItem);
        eqc.setEquipment(slot, undefined);
        eqc.setEquipment(slot, newItem);
    });
}
;
/**
 * エンチャント再設定
 * @param {ItemStack} oldItem
 * @param {ItemStack} newItem
 */
function replaceEnchant(oldItem, newItem) {
    return __awaiter(this, void 0, void 0, function* () {
        let oldEnc = oldItem.getComponent(ItemComponentTypes.Enchantable);
        let newEnc = newItem.getComponent(ItemComponentTypes.Enchantable);
        newEnc.addEnchantments(oldEnc.getEnchantments());
    });
}
;
// デバッグ用
/**
 * @param {Object} text
 */
function print(text) {
    return __awaiter(this, void 0, void 0, function* () {
        world.sendMessage(text + "");
    });
}
;
// 制限
/**
 * @param {number} min
 * @param {number} max
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
;
// 乱数
/**
 * @param {number} min
 * @param {number} max
 */
function getRandomInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
// サウンド再生
/**
 * @param {Entity} entity
 * @param {string} sound
 */
function playsound(entity, sound) {
    return __awaiter(this, void 0, void 0, function* () {
        world.playSound(sound, entity.location);
    });
}
;
/**
 * アイテムクールダウン
 * @param {Player} player
 * @param {ItemStack} itemStack
 */
function itemCoolDown(player, itemStack) {
    return __awaiter(this, void 0, void 0, function* () {
        let cool = itemStack.getComponent(ItemComponentTypes.Cooldown);
        cool.startCooldown(player);
    });
}
/**
 * ブロック破壊(ドロップなし)
 * @param {Block} block
 */
function breakBlock(block) {
    return __awaiter(this, void 0, void 0, function* () {
        block.dimension.setBlockType(block.location, MinecraftBlockTypes.Air);
    });
}
// 蘇生
function resuscitation(player) {
    let health = player.getComponent(EntityComponentTypes.Health);
    health.setCurrentValue(5);
    player.addEffect(MinecraftEffectTypes.Absorption, TicksPerSecond * 30, {
        amplifier: 5,
        showParticles: true
    });
    playsound(player, "random.totem");
}
;
// 岩盤破壊キャンセル
export function explodeBedrock(impactBLockList) {
    let filterBlockList = impactBLockList.filter(block => {
        if (!block.matches("minecraft:bedrock")) {
            return block;
        }
    });
    return filterBlockList;
}
export const ProbabilisticChoice = (list) => {
    const totalWeight = list.reduce((p, c) => {
        return { weight: p.weight + c.weight };
    }).weight;
    return {
        pick() {
            const r = Math.random() * totalWeight;
            let s = 0.0;
            for (const l of list) {
                s += l.weight;
                if (r < s) {
                    return l.item;
                }
            }
        }
    };
};
const BlockLocationList = Object.freeze([
    {
        direction: Direction.Up,
        location: { x: 0, y: 1, z: 0 }
    },
    {
        direction: Direction.Down,
        location: { x: 0, y: -1, z: 0 }
    },
    {
        direction: Direction.South,
        location: { x: 0, y: 0, z: 1 }
    },
    {
        direction: Direction.North,
        location: { x: 0, y: 0, z: -1 }
    },
    {
        direction: Direction.East,
        location: { x: 1, y: 0, z: 0 }
    },
    {
        direction: Direction.West,
        location: { x: -1, y: 0, z: 0 }
    }
]);
export { print, clamp, itemTans, getRandomInRange, playsound, breakBlock, resuscitation, itemCoolDown, BlockLocationList };
//# sourceMappingURL=commonUtil.js.map