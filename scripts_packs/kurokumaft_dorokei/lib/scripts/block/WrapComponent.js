import { world } from "@minecraft/server";
/**
 * 転送ブロック
 */
export class WrapComponent {
    onTick(event, arg) {
        const block = event.block;
        const dimension = event.dimension;
        const entities = dimension.getEntities({
            maxDistance: 2,
            location: { x: block.location.x, y: block.location.y + 1, z: block.location.z },
            volume: { x: 0, y: 2, z: 0 }
        });
        entities.forEach(entity => {
            if (entity.getDynamicProperty("ensure")) {
                console.info(entity.typeId);
                const tp_point = world.getDynamicProperty("tp_point");
                if (tp_point !== undefined) {
                    entity.teleport(tp_point);
                }
            }
        });
    }
    ;
}
//# sourceMappingURL=WrapComponent.js.map