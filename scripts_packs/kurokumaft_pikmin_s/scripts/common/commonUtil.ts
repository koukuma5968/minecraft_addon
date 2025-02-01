import { world,Player,Entity,ItemStack,EntityComponentTypes,ItemComponentTypes,EntityEquippableComponent,EquipmentSlot,ItemEnchantableComponent,ItemDurabilityComponent, Direction, Block, EntityHealthComponent, ItemCooldownComponent, TicksPerSecond} from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftEffectTypes } from "@minecraft/vanilla-data";

export const silkType = ["kurokumaft:charcoal_block","kurokumaft:small_mithril_bud","kurokumaft:medium_mithril_bud","kurokumaft:large_mithril_bud"
, "kurokumaft:mithril_cluster","kurokumaft:budding_mithril","kurokumaft:medicinal_plants", "kurokumaft:onions","kurokumaft:soybeans"];

export const guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];

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
    player.addEffect(MinecraftEffectTypes.Absorption, TicksPerSecond * 30, {
        amplifier: 5,
        showParticles: true
    });
    playsound(player, "random.totem");
};

// 岩盤破壊キャンセル
export function explodeBedrock(impactBLockList:Block[]): Block[] {
    let filterBlockList = impactBLockList.filter(block => {
        if (!block.matches("minecraft:bedrock")) {
            return block;
        }
    });
    return filterBlockList;
}
export const ProbabilisticChoice = (list: any[]) => {
    const totalWeight = list.reduce((p, c) => {
        return { weight: p.weight + c.weight }
    }).weight

    return {
        pick () {
        const r = Math.random() * totalWeight;
        let s = 0.0;
        for (const l of list) {
            s += l.weight
            if (r < s) { return l.item }
        }
        }
    }
};

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
    itemCoolDown, BlockLocationList };
