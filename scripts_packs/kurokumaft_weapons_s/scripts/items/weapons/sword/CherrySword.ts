import { ItemCustomComponent, ItemComponentHitEntityEvent, Entity } from "@minecraft/server";


/**
 * 桜の剣
 */
export class CherrySword implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let hitEntity = event.hitEntity as Entity;
        cherrySlash(hitEntity);
    }

}

async function cherrySlash(hitEntity:Entity) {
    hitEntity.dimension.spawnParticle("kurokumaft:cherry_slash", {x:hitEntity.location.x, y:hitEntity.location.y+0.5,z:hitEntity.location.z});
}
