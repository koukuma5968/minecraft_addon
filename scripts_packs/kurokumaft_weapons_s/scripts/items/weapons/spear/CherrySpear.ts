import { ItemCustomComponent, ItemComponentHitEntityEvent, Entity } from "@minecraft/server";

/**
 * 桜のやり
 */
export class CherrySpear implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        cherrySlash(attackEntity, hitEntity);
    }

}

async function cherrySlash(attackEntity: Entity, hitEntity: Entity) {
    let dim = attackEntity.dimension;
    dim.spawnParticle("kurokumaft:cherry_slash", {x:hitEntity.location.x, y:hitEntity.location.y+0.5,z:hitEntity.location.z});
}
