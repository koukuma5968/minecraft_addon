import { world,Player,Entity,ItemStack,EntityComponentTypes,ItemComponentTypes,EntityEquippableComponent,EquipmentSlot,ItemEnchantableComponent,ItemDurabilityComponent, Direction, Block, EntityHealthComponent, ItemCooldownComponent, TicksPerSecond, EntityQueryOptions, Vector3, Vector2} from "@minecraft/server";
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

const weightChoice = (list: any[]) => {
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

function addTargetFilter(closest:number, location:Vector3, maxDis:number, exeTag:string): EntityQueryOptions {

    let filterOption = {
        excludeFamilies: [
            "inanimate", "pikmin", "villager", "animal"
        ],
        excludeTypes: [
            "item"
        ],
        excludeTags: [
            exeTag
        ],
        location: location,
        maxDistance: maxDis
    } as EntityQueryOptions;

    if (!world.gameRules.pvp) {
        filterOption.excludeFamilies?.push("player");
    }
    if (closest != 0) {
        filterOption.closest = closest;
    }

    return filterOption;

};

function addDokkuriFireFilter(location:Vector3, maxDis:number): EntityQueryOptions {

    let filterOption = {
        excludeFamilies: [
            "inanimate", "dokkuri_fire"
        ],
        excludeTypes: [
            "item"
        ],
        location: location,
        maxDistance: maxDis
    } as EntityQueryOptions;

    return filterOption;

};

function addDokkuriMizuFilter(location:Vector3, maxDis:number): EntityQueryOptions {

    let filterOption = {
        excludeFamilies: [
            "inanimate", "dokkuri_water"
        ],
        excludeTypes: [
            "item"
        ],
        location: location,
        maxDistance: maxDis
    } as EntityQueryOptions;

    return filterOption;

};

/**
 * 水平視線位置取得
 * @param {number} angle
 * @param {number} forwardPoint
 * @param {number} sidePoint
 * @param {number} udFixed
 */
function getLookLocationDistance(angle: number, forwardPoint:number, sidePoint:number, udFixed:number) : Vector3 {

    const forwardRad = degToRad(angle);

    const forntDisPoint = {
        x: -(Math.sin(forwardRad)) * forwardPoint,
        z: (Math.cos(forwardRad)) * forwardPoint,
    }

    if (sidePoint < 0) {
        const leftRad = degToRad(angle + 90);
        forntDisPoint.x = forntDisPoint.x + Math.sin(leftRad) * -sidePoint;
        forntDisPoint.z = forntDisPoint.z + Math.cos(leftRad) * -sidePoint;
    } else if (sidePoint > 0) {
        const rightRad = degToRad(angle - 90);
        forntDisPoint.x = forntDisPoint.x + Math.sin(rightRad) * sidePoint;
        forntDisPoint.z = forntDisPoint.z + Math.cos(rightRad) * sidePoint;
    }

    const angleDisPoint = {
        x: Number(forntDisPoint.x.toFixed(3)),
        y: udFixed,
        z: Number(forntDisPoint.z.toFixed(3))
    };

    return angleDisPoint;
}

/**
 * 空間視線位置取得
 * @param {Vector2} angle
 * @param {number} forwardPoint
 * @param {number} sidePoint
 */
function getLookLocationDistancePitch(angle: Vector2, forwardPoint:number, sidePoint:number) : Vector3 {

    const forwardRad = degToRad(angle.y);
    const pitchRad = degToRad(angle.x);

    let angleDisPoint = {
        x: -(Math.cos(pitchRad) * Math.sin(forwardRad)) * forwardPoint,
        y: Math.sin(pitchRad) * forwardPoint,
        z: (Math.cos(pitchRad) * Math.cos(forwardRad)) * forwardPoint,
    };

    if (sidePoint < 0) {
        const leftRad = degToRad(angle.y + 90);
        angleDisPoint = crossProduct(angleDisPoint, {
            x: Math.sin(leftRad) * -sidePoint,
            y: 0,
            z: Math.cos(leftRad) * -sidePoint
        });
    } else if (sidePoint > 0) {
        const rightRad = degToRad(angle.y - 90);
        angleDisPoint = crossProduct(angleDisPoint, {
            x: Math.sin(rightRad) * sidePoint,
            y: 0,
            z: Math.cos(rightRad) * sidePoint
        });
    }

    const retDisPoint = {
        x: Number(angleDisPoint.x.toFixed(3)),
        y: -Number(angleDisPoint.y.toFixed(3)),
        z: Number(angleDisPoint.z.toFixed(3))
    };
    return retDisPoint;
}

/**
 * 空間視線位置取得
 * @param {Vector3} origin
 * @param {Vector3} distance
 */
function getDistanceLocation(origin: Vector3, distance:Vector3) : Vector3 {
    const angleDisPoint = {
        x: Number((origin.x + distance.x).toFixed(3)),
        y: Number((origin.y + distance.y).toFixed(3)),
        z: Number((origin.z + distance.z).toFixed(3))
    };

    return angleDisPoint;
}

function crossProduct(front: Vector3, side: Vector3): Vector3 {
    return {
      x: Number((front.x * + side.x).toFixed(3)),
      y: Number(front.y.toFixed(3)),
      z: Number((front.z + side.z).toFixed(3)),
    };
}

function degToRad(deg: number): number {
  return deg * Math.PI / 180;
}

function getForwardPosition(origin: Vector3, angleZ: number, distance: number): Vector3 {
  const rad = degToRad(angleZ);
  return {
    x: origin.x + Math.sin(rad) * distance,
    y: origin.y,
    z: origin.z + Math.cos(rad) * distance
  };
}

function getRightPosition(origin: Vector3, angleZ: number, distance: number): Vector3 {
  const rad = degToRad(angleZ + 90);
  return {
    x: origin.x + Math.sin(rad) * distance,
    y: origin.y,
    z: origin.z + Math.cos(rad) * distance
  };
}

function getLeftPosition(origin: Vector3, angleZ: number, distance: number): Vector3 {
  const rad = degToRad(angleZ - 90);
  return {
    x: origin.x + Math.sin(rad) * distance,
    y: origin.y,
    z: origin.z + Math.cos(rad) * distance
  };
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

export { print, clamp, itemTans, getRandomInRange, playsound, breakBlock, resuscitation,
    itemCoolDown, BlockLocationList, weightChoice, addTargetFilter,
    getLookLocationDistance, getLookLocationDistancePitch, getDistanceLocation,
    addDokkuriFireFilter, addDokkuriMizuFilter };
