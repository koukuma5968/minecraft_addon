import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, EquipmentSlot } from "@minecraft/server";
import { slashHit } from "../../../common/WeaponsSlashAttack";

interface BattleaxeObject {
    itemName: string,
    damage: number
}

const BattleaxeObjects = Object.freeze([
    {
        itemName: "kurokumaft:bamboo_battleaxe",
        damage: 1
    },
    {
        itemName: "kurokumaft:wooden_battleaxe",
        damage: 2
    },
    {
        itemName: "kurokumaft:iron_battleaxe",
        damage: 4
    },
    {
        itemName: "kurokumaft:steel_battleaxe",
        damage: 5
    },
    {
        itemName: "kurokumaft:bone_battleaxe",
        damage: 3
    }

]);

/**
 * バトルアックス
 */
export class Battleaxe implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        const itemStack = event.itemStack as ItemStack;

        if (itemStack !== undefined) {
            const sickle = BattleaxeObjects.find(obj => obj.itemName === itemStack.typeId) as BattleaxeObject;
            slashHit(attackEntity, hitEntity, sickle.damage);
        }
    }

}

