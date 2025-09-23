import { Entity, EntityDamageCause, EntityQueryOptions, ExplosionOptions, Player, system, TicksPerSecond } from "@minecraft/server";
import { getLookRotaionPointsV2, addTeamsTagFilter } from "../../../common/MagicCommonUtil";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

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
 * ナイトビット
 */
export async function nightBit(player:Player) {

    player.addTag(player.id);

    for (let x=-3.5; x<=3.5; x+=3.5) {
        for (let z=-3.5; z<=3.5; z+=3.5) {
            const filterOption = {
                excludeTags: [
                    player.id,
                ],
                location: {x:player.location.x+x, y:player.location.y+1.8, z:player.location.z+z},
                maxDistance: 2
            } as EntityQueryOptions;

            addTeamsTagFilter(player, filterOption);

            const targets = player.dimension.getEntities(filterOption);
            targets.forEach(en => {
                let damage = 4 as number;
                if (en instanceof Player) {
                    damage = 2;
                }
                en.addEffect(MinecraftEffectTypes.InstantDamage, 2*TicksPerSecond, {
                    amplifier: damage
                });
            });
            const option = {
                allowUnderwater: false,
                breaksBlocks: false,
                causesFire: false,
                source: player
            } as ExplosionOptions;
            player.dimension.createExplosion({x:player.location.x+x, y:player.location.y+1.8, z:player.location.z+z}, 2, option);
            player.dimension.spawnParticle("kurokumaft:night_bit_particle", {x:player.location.x+x, y:player.location.y+1.8, z:player.location.z+z});
        }
    }

    player.removeTag(player.id);
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