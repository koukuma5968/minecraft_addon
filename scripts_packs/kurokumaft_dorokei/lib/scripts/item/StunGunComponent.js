import { EntityComponentTypes } from "@minecraft/server";
export class StunGunComponent {
    onUse(event, arg) {
        const source = event.source;
        const gunPrams = arg.params;
        const bulet = source.dimension.spawnEntity(gunPrams.bullet, source.getHeadLocation(), {
            spawnEvent: gunPrams.spawn_event
        });
        const projectile = bulet.getComponent(EntityComponentTypes.Projectile);
        projectile.owner = source;
        projectile.shoot(source.getViewDirection());
    }
    ;
}
//# sourceMappingURL=StunGunComponent.js.map