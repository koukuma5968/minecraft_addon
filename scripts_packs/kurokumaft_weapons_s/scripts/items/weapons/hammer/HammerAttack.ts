import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, EntityDamageCause } from "@minecraft/server";
import { getLookPoints } from "../../../common/WeaponsCommonUtil";

interface HammerObject {
    itemName: string,
    roarHammer: string,
    event: string,
    damage: number
}

const HammerObjects = Object.freeze([
    {
        itemName: "kurokumaft:wooden_hammer",
        roarHammer: "kurokumaft:roar_hammer",
        event: "kurokumaft:wooden_hammer_roar",
        damage: 1
    },
    {
        itemName: "kurokumaft:stone_hammer",
        roarHammer: "kurokumaft:roar_hammer",
        event: "kurokumaft:stone_hammer_roar",
        damage: 2
    },
    {
        itemName: "kurokumaft:iron_hammer",
        roarHammer: "kurokumaft:roar_hammer",
        event: "kurokumaft:iron_hammer_roar",
        damage: 3
    },
    {
        itemName: "kurokumaft:golden_hammer",
        roarHammer: "kurokumaft:roar_hammer",
        event: "kurokumaft:golden_hammer_roar",
        damage: 3
    },
    {
        itemName: "kurokumaft:diamond_hammer",
        roarHammer: "kurokumaft:roar_hammer",
        event: "kurokumaft:diamond_hammer_roar",
        damage: 4
    },
    {
        itemName: "kurokumaft:netherite_hammer",
        roarHammer: "kurokumaft:roar_hammer",
        event: "kurokumaft:netherite_hammer_roar",
        damage: 5
    }
]);

/**
 * ハンマーアタック
 */
export class HammerAttack implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        const itemStack = event.itemStack as ItemStack;

        const hammer = HammerObjects.find(obj => obj.itemName === itemStack.typeId) as HammerObject;
        hammerHit(attackEntity, hitEntity, hammer);
    }

}

async function hammerHit(attackEntity:Entity, hitEntity: Entity, hammer: HammerObject) {

    const loock = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
    attackEntity.dimension.spawnParticle("kurokumaft:shock_particle", loock); 

    hitEntity.applyDamage(hammer.damage, {
        cause: EntityDamageCause.entityAttack
    });
    hitEntity.dimension.spawnEntity(hammer.roarHammer, hitEntity.location, {
        spawnEvent: hammer.event
    });

}
