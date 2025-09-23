import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, Player, EquipmentSlot, EntityDamageCause, ItemComponentCompleteUseEvent } from "@minecraft/server";
import { getLookPoints, getLookRotaionPoints } from "../../../common/WeaponsCommonUtil";
import { shooting } from "../../../common/WeaponsShooterPoints";
import { itemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";

interface KnuckleObject {
    itemName: string,
    throwSpear: string,
    event: string,
    damage: number
}

const KnuckleObjects = Object.freeze([
    {
        itemName: "kurokumaft:leather_knuckle",
        throwSpear: "kurokumaft:knuckle_shot",
        event: "kurokumaft:leather",
        damage: 1
    },
    {
        itemName: "kurokumaft:stone_knuckle",
        throwSpear: "kurokumaft:knuckle_shot",
        event: "kurokumaft:stone",
        damage: 2
    },
    {
        itemName: "kurokumaft:iron_knuckle",
        throwSpear: "kurokumaft:knuckle_shot",
        event: "kurokumaft:iron",
        damage: 3
    },
    {
        itemName: "kurokumaft:golden_knuckle",
        throwSpear: "kurokumaft:knuckle_shot",
        event: "kurokumaft:golden",
        damage: 1
    },
    {
        itemName: "kurokumaft:diamond_knuckle",
        throwSpear: "kurokumaft:knuckle_shot",
        event: "kurokumaft:diamond",
        damage: 4
    },
    {
        itemName: "kurokumaft:netherite_knuckle",
        throwSpear: "kurokumaft:knuckle_shot",
        event: "kurokumaft:netherite",
        damage: 5
    }

]);

/**
 * ナックル
 */
export class ChargeKnuckle implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {

        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        const itemStack = event.itemStack as ItemStack;

        const knuckle = KnuckleObjects.find(obj => obj.itemName == itemStack.typeId) as KnuckleObject;
        knuckleHit(attackEntity, hitEntity, knuckle);
        itemDurabilityDamage(attackEntity, itemStack, EquipmentSlot.Mainhand);
    }

    onCompleteUse(event:ItemComponentCompleteUseEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
        const knuckle = KnuckleObjects.find(obj => obj.itemName == itemStack.typeId) as KnuckleObject;
        charge_knuckle(source, knuckle);
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
    }
}

async function knuckleHit(attackEntity:Entity, hitEntity: Entity, knuckle: KnuckleObject) {

    const look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
    attackEntity.dimension.spawnParticle("kurokumaft:knuckle_shock", look); 

    hitEntity.applyDamage(knuckle.damage, {
        cause: EntityDamageCause.entityAttack
    });
    const rota = getLookRotaionPoints(attackEntity.getRotation(), knuckle.damage, 0);
    hitEntity.applyKnockback({x:rota.x, z:rota.z}, 0);

}

async function charge_knuckle(player: Player, knuckle: KnuckleObject) {
    shooting(player, knuckle.throwSpear, 0, 3, knuckle.event);
}