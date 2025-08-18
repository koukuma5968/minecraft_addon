import { Entity, EntityDamageCause, EntityQueryOptions, Player, system } from "@minecraft/server";
import { getLookRotaionPointsV2, addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * ジェットブラック
 */
export async function jetblackShock(player:Player, entity:Entity) {

    player.addTag("jetblack_shock_self");

    const left = getLookRotaionPointsV2(entity.getRotation(), 0, 2.5);
    entity.dimension.spawnParticle("kurokumaft:jetblack_shock_particle", {x:entity.location.x+left.x, y:entity.location.y+1.8, z:entity.location.z+left.z});
    const center = getLookRotaionPointsV2(entity.getRotation(), 0, 0);
    entity.dimension.spawnParticle("kurokumaft:jetblack_shock_particle", {x:entity.location.x+center.x, y:entity.location.y+1.8, z:entity.location.z+center.z});
    const right = getLookRotaionPointsV2(entity.getRotation(), 0, -2.5);
    entity.dimension.spawnParticle("kurokumaft:jetblack_shock_particle", {x:entity.location.x+right.x, y:entity.location.y+1.8, z:entity.location.z+right.z});

    const filterOption = {
        excludeTags: [
            "jetblack_shock_self",
        ],
        location: player.location,
        maxDistance: 5
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid) {
            return;
        }
        if (en instanceof Player) {
            en.applyDamage(2, {
                cause: EntityDamageCause.wither
            });
        } else {
            en.applyDamage(6, {
                cause: EntityDamageCause.wither
            });
        }
    });

    player.removeTag("jetblack_shock_self");
}

/**
 * ブラックホール
 */
export async function blackHole(player:Player) {
    player.addTag("black_hole_self");
    const black_hole = player.dimension.spawnEntity("kurokumaft:black_hole", 
        {
            x:player.location.x,
            y:player.location.y + 8,
            z:player.location.z
        }
    );
    const holeLo = black_hole.location;
    const dim = black_hole.dimension;
    const intervalNum = system.runInterval(() => {
        black_hole.teleport({x:holeLo.x, y:holeLo.y+0.1, z:holeLo.z});
        dim.spawnParticle("kurokumaft:black_hole_particle",black_hole.location);
        dim.spawnParticle("kurokumaft:black_hole_outer_particle",black_hole.location);

        const filterOption = {
            excludeTags: [
                "black_hole_self",
            ],
            location: holeLo,
            maxDistance: 18
        } as EntityQueryOptions;

        addTeamsTagFilter(player, filterOption);

        const targets = player.dimension.getEntities(filterOption);
        targets.forEach(en => {
            if (!en.isValid) {
                return;
            }
            en.teleport(holeLo);
            if (en instanceof Player) {
                en.applyDamage(3, {
                    cause: EntityDamageCause.wither
                });
            } else {
                en.applyDamage(10, {
                    cause: EntityDamageCause.wither
                });
            }
        });

    }, 10);

    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("black_hole_self");
        black_hole.remove();
    }, 80);
}