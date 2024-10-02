import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, system, ItemComponentUseEvent, Player, EquipmentSlot, ItemComponentTypes, EntityComponentTypes, EntityEquippableComponent, EntityInventoryComponent, Container, ItemEnchantableComponent, Enchantment } from "@minecraft/server";
import { getDirectionVector } from "../common/commonUtil";
import { MinecraftEnchantmentTypes } from "@minecraft/vanilla-data";
import { sweepHit } from "../common/SweepAttack";
import { throwItemDurabilityDamage } from "../common/ItemDurabilityDamage";

interface SpearObject {
    itemName: string,
    throwSpear: string,
    damage: number
}

const SpearObjects = Object.freeze([
    {
        itemName: "kurokumaft:wooden_spear",
        throwSpear: "kurokumaft:thrown_wooden_spear",
        damage: 1
    }

]);

/**
 * スピアー
 */
export class ThrowableSpear implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {

        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;

        let spear = SpearObjects.find(obj => obj.itemName == itemStack.typeId) as SpearObject;
        sweepHit(attackEntity, hitEntity, spear.damage);
    }

    // 右クリック時
    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        // プレイヤーにタグを追加
        source.addTag("spearOwner");
    }
}

/**
 * thrown_wooden_spearエンティティがスポーンした時に実行する
 * @param {Entity} throwSpear
 */
export async function spawnSpear(throwSpear:Entity) {

    let spear = SpearObjects.find(obj => obj.throwSpear == throwSpear.typeId) as SpearObject;
    // スポーンしたのが別のエンティティなら実行しない
    if (!spear) {
        return;
    }
    throwSpear.setDynamicProperty("throwSpear", true);
    throwSpear.addTag("throwSpear");

}

/**
 * thrown_wooden_spearエンティティが停止時に実行する
 * @param {Player} player
 */
export async function stopSpear(player:Player) {
    player.removeTag("spearOwner");
}

/**
 * 右クリックが放された時に実行する
 * @param {Player} player
 * @param {ItemStack} spear
 */
export async function releaseSpear(player:Player, spear:ItemStack) {
    let spearItem = SpearObjects.find(obj => obj.itemName == spear.typeId) as SpearObject;
    if (!spearItem) {
        return;
    }
    // 投げた瞬間にスポーンしたthrown_wooden_spearエンティティを探す
    let throwSpear = player.dimension.getEntities({
        tags: [
            "throwSpear"
        ],
        families: [
            "spear"
        ],
        location: player.location,
        closest: 1
    }) as Entity[];

    if (throwSpear.length > 0) {
        // 投げた後のwooden_spearアイテムの耐久値を減らす
        throwItemDurabilityDamage(throwSpear[0], spear, 0, undefined);

        // アイテムのエンチャントを取得して忠誠エンチャントがあるかチェック
        let enchant = spear.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
        if (enchant.hasEnchantment(MinecraftEnchantmentTypes.Loyalty)) {
            // 忠誠エンチャントが付いていればエンチャントありで設定
            let loyalty = enchant.getEnchantment(MinecraftEnchantmentTypes.Loyalty) as Enchantment;
            throwSpear[0].setDynamicProperty("Loyalty", true);
            throwSpear[0].setDynamicProperty("LoyaltyLevel", loyalty.level);
        } else {
            // それ以外はなしを設定
            throwSpear[0].setDynamicProperty("Loyalty", false);
        }
    }

}

/**
 * プレイヤーが接触し、thrown_wooden_spearエンティティが消えた時
 * @param {Entity} throwSpear
 */
export async function removeSpear(throwSpear:Entity) {

    let item = SpearObjects.find(obj => obj.throwSpear == throwSpear.typeId) as SpearObject;
    if (!item) {
        return;
    }

    if (!throwSpear.getDynamicProperty("throwSpear")) {
        return;
    }

    // thrown_wooden_spearエンティティのインベントリからアイテムを取り出す
    let invent = throwSpear.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
    let container = invent.container as Container;
    let spear = container.getItem(0) as ItemStack;

    // 接触したプレイヤーを探す
    let player = throwSpear.dimension.getEntities({
        families: [
            "player"
        ],
        location: throwSpear.location,
        closest: 1
    }) as Player[];

    let emptySlot = true;
    if (player) {
        // プレイヤーの右手が空いていれば右手にアイテムをセットする
        let equ = player[0].getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let main = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (main == undefined) {
            system.runTimeout(() => {
                equ.setEquipment(EquipmentSlot.Mainhand, spear);
            }, 2);
            emptySlot = false;
        } else {
            // 右手が空いていなければインベントリの空きスロットに入れる
            let invent = player[0].getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
            let con = invent.container as Container;
            if (con.emptySlotsCount > 0){
                system.runTimeout(() => {
                    con.addItem(spear);
                }, 2);
                emptySlot = false;
            }
        }
    }
    // インベントリに空きがない場合はアイテムをドロップさせる
    if (emptySlot) {
        let dim = throwSpear.dimension;
        let loca = throwSpear.location;
        system.runTimeout(() => {
            dim.spawnItem(spear, loca);
        }, 2);
    }
}

/**
 * thrown_wooden_spearエンティティがhitした時に実行する
 * @param {Entity} throwEntity
 * @param {Entity} throwSpear
 */
export async function hitSpear(throwEntity:Entity, throwSpear:Entity) {

    let item = SpearObjects.find(obj => obj.throwSpear == throwSpear.typeId) as SpearObject;
    if (!item) {
        return;
    }

    // 忠誠エンチャントがあるなら、投げたエンティティのもとに戻る
    if (throwSpear.getDynamicProperty("Loyalty")) {
        let level = throwSpear.getDynamicProperty("LoyaltyLevel") as number
        system.runTimeout(() => {
            let intervalNum = system.runInterval(() => {
                if (throwSpear != undefined && throwSpear.isValid()) {
                    let targetLoc = getDirectionVector(throwSpear.location, {x:throwEntity.location.x, y:throwEntity.location.y+1, z:throwEntity.location.z});
                    let tpLoc = {
                        x:throwSpear.location.x+targetLoc.x,
                        y:throwSpear.location.y+targetLoc.y,
                        z:throwSpear.location.z+targetLoc.z
                    }
                    throwSpear.teleport(tpLoc, {
                        checkForBlocks: false,
                        keepVelocity: true
                    });
                } else {
                    system.clearRun(intervalNum);
                }
            }, level==1?3:level==2?2:1);
        }, 5);
    }
}