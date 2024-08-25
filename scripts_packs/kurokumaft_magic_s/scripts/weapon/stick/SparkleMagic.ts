import { EntityDamageCause, Player, system } from "@minecraft/server";

/**
 * ホーリーフィールド
 */
export function hollyField(player:Player) {
    let holly_field = player.dimension.spawnEntity("kurokumaft:holly_field", 
        {
            x:player.location.x,
            y:player.location.y,
            z:player.location.z
        }
    );
    let holeLo = holly_field.location;
    let intervalNum = system.runInterval(() => {
        holly_field.runCommand("/particle kurokumaft:holly_field_particle ~~~");
        holly_field.runCommand("/particle kurokumaft:holly_field_outer_particle ~~~");
        let targets = player.dimension.getEntities({
            excludeTags: [
                "black_hole_self"
            ],
            excludeFamilies: [
                "inanimate"
            ],
            excludeTypes: [
                "item"
            ],
            location: holeLo,
            maxDistance: 15
        });
        targets.forEach(en => {
            en.addEffect("instant_health", 2, {
                amplifier: 10
            });
        })
    }, 10);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        holly_field.remove();
    }, 100);
}