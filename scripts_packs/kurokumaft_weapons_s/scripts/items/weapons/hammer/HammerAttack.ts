import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, EntityDamageCause } from "@minecraft/server";
import { getLookPoints } from "../../../common/WeaponsCommonUtil";

interface HammerObject {
    itemName: string,
    roarHammer: string,
    damage: number
}

const HammerObjects = Object.freeze([
    {
        itemName: "kurokumaft:wooden_hammer",
        roarHammer: "kurokumaft:roar_hammer<kurokumaft:wooden_hammer_roar>",
        damage: 1
    },
    {
        itemName: "kurokumaft:stone_hammer",
        roarHammer: "kurokumaft:roar_hammer<kurokumaft:stone_hammer_roar>",
        damage: 2
    },
    {
        itemName: "kurokumaft:iron_hammer",
        roarHammer: "kurokumaft:roar_hammer<kurokumaft:iron_hammer_roar>",
        damage: 3
    },
    {
        itemName: "kurokumaft:golden_hammer",
        roarHammer: "kurokumaft:roar_hammer<kurokumaft:golden_hammer_roar>",
        damage: 3
    },
    {
        itemName: "kurokumaft:diamond_hammer",
        roarHammer: "kurokumaft:roar_hammer<kurokumaft:diamond_hammer_roar>",
        damage: 4
    },
    {
        itemName: "kurokumaft:netherite_hammer",
        roarHammer: "kurokumaft:roar_hammer<kurokumaft:netherite_hammer_roar>",
        damage: 5
    }
]);

/**
 * ハンマーアタック
 */
export class HammerAttack implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;

        let hammer = HammerObjects.find(obj => obj.itemName == itemStack.typeId) as HammerObject;
        hammerHit(attackEntity, hitEntity, hammer);
    }

}

async function hammerHit(attackEntity:Entity, hitEntity: Entity, hammer: HammerObject) {

    let loock = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
    attackEntity.dimension.spawnParticle("kurokumaft:shock_particle", loock); 

    hitEntity.applyDamage(hammer.damage, {
        cause: EntityDamageCause.entityAttack
    });
    hitEntity.dimension.spawnEntity(hammer.roarHammer, hitEntity.location);

}
