import { ItemCustomComponent, CustomComponentParameters, ItemComponentUseEvent, EntityProjectileComponent, EntityComponentTypes, ItemComponentHitEntityEvent} from "@minecraft/server";

type Gunparams = {
    "bullet": string,
    "spawn_event": string | undefined
}

export class StunGunComponent implements ItemCustomComponent {

    onUse(event: ItemComponentUseEvent, arg: CustomComponentParameters) {
        const source = event.source;
        const gunPrams = arg.params as Gunparams;

        const bulet = source.dimension.spawnEntity(gunPrams.bullet, source.getHeadLocation(), {
            spawnEvent: gunPrams.spawn_event
        });

        const projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
        projectile.owner = source;
        projectile.shoot(source.getViewDirection());
    };

}
