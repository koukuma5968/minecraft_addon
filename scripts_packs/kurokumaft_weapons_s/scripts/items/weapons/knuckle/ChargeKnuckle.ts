import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, Player, EquipmentSlot, EntityDamageCause, ItemComponentCompleteUseEvent } from "@minecraft/server";
import { getLookPoints, getLookRotaionPoints } from "../../../common/WeaponsCommonUtil";
import { shooting } from "../../../common/WeaponsShooterPoints";
import { itemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";

interface KnuckleObject {
    itemName: string,
    throwSpear: string,
    damage: number
}

const KnuckleObjects = Object.freeze([
    {
        itemName: "kurokumaft:leather_knuckle",
        throwSpear: "kurokumaft:knuckle_shot<kurokumaft:leather>",
        damage: 1
    },
    {
        itemName: "kurokumaft:stone_knuckle",
        throwSpear: "kurokumaft:knuckle_shot<kurokumaft:stone>",
        damage: 2
    },
    {
        itemName: "kurokumaft:iron_knuckle",
        throwSpear: "kurokumaft:knuckle_shot<kurokumaft:iron>",
        damage: 3
    },
    {
        itemName: "kurokumaft:golden_knuckle",
        throwSpear: "kurokumaft:knuckle_shot<kurokumaft:golden>",
        damage: 1
    },
    {
        itemName: "kurokumaft:diamond_knuckle",
        throwSpear: "kurokumaft:knuckle_shot<kurokumaft:diamond>",
        damage: 4
    },
    {
        itemName: "kurokumaft:netherite_knuckle",
        throwSpear: "kurokumaft:knuckle_shot<kurokumaft:netherite>",
        damage: 5
    }

]);

/**
 * ナックル
 */
export class ChargeKnuckle implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {

        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;

        let knuckle = KnuckleObjects.find(obj => obj.itemName == itemStack.typeId) as KnuckleObject;
        knuckleHit(attackEntity, hitEntity, knuckle);
        itemDurabilityDamage(attackEntity, itemStack, EquipmentSlot.Mainhand);
    }

    onCompleteUse(event:ItemComponentCompleteUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        let knuckle = KnuckleObjects.find(obj => obj.itemName == itemStack.typeId) as KnuckleObject;
        charge_knuckle(source, knuckle);
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
    }
}

async function knuckleHit(attackEntity:Entity, hitEntity: Entity, knuckle: KnuckleObject) {

    let look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5
);
    attackEntity.dimension.spawnParticle("kurokumaft:knuckle_shock", look); 

    hitEntity.applyDamage(knuckle.damage, {
        cause: EntityDamageCause.entityAttack
    });
    let rota = getLookRotaionPoints(attackEntity.getRotation(), knuckle.damage, 0);
    hitEntity.applyKnockback(rota.x, rota.z, knuckle.damage, 0);

}

async function charge_knuckle(player: Player, knuckle: KnuckleObject) {
    shooting(player, knuckle.throwSpear, 0, 3, undefined);
}