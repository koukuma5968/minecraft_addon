import { ItemCustomComponent, ItemComponentHitEntityEvent, Entity } from "@minecraft/server";

/**
 * 桜のやり
 */
export class CherrySpear implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        cherrySlash(attackEntity, hitEntity);
    }

}

async function cherrySlash(attackEntity: Entity, hitEntity: Entity) {
    const dim = attackEntity.dimension;
    dim.spawnParticle("kurokumaft:cherry_slash", {x:hitEntity.location.x, y:hitEntity.location.y+0.5,z:hitEntity.location.z});
}
