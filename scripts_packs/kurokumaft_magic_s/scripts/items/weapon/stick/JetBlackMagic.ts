import { EntityDamageCause, Player, system } from "@minecraft/server";

/**
 * ブラックホール
 */
export async function blackHole(player:Player) {
    player.addTag("black_hole_self");
    let black_hole = player.dimension.spawnEntity("kurokumaft:black_hole", 
        {
            x:player.location.x,
            y:player.location.y + 8,
            z:player.location.z
        }
    );
    let holeLo = black_hole.location;
    let dim = black_hole.dimension;
    let intervalNum = system.runInterval(() => {
        black_hole.teleport({x:holeLo.x, y:holeLo.y+0.1, z:holeLo.z});
        dim.spawnParticle("kurokumaft:black_hole_particle",black_hole.location);
        dim.spawnParticle("kurokumaft:black_hole_outer_particle",black_hole.location);
        let targets = player.dimension.getEntities({
            excludeTags: [
                "black_hole_self"
            ],
            excludeFamilies: [
                "inanimate", "player", "familiar", "magic", "arrow"
            ],
            excludeTypes: [
                "item"
            ],
            location: holeLo,
            maxDistance: 18
        });
        targets.forEach(en => {
            en.teleport(holeLo);
            en.applyDamage(10, {
                cause: EntityDamageCause.wither
            });
        })
    }, 10);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("black_hole_self");
        black_hole.remove();
    }, 100);
}