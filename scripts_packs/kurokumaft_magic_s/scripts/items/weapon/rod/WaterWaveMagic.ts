import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond, Vector3 } from "@minecraft/server";
import { getAdjacentSphericalPoints } from "../../../common/MagicShooterPoints";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * ウォーターカッター
 */
export async function watercutter(player:Player, hitEntity:Entity) {

    player.addTag(player.id);

    hitEntity.dimension.spawnParticle("kurokumaft:watercutter_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 4
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid) {
            return;
        }

        if (en instanceof Player) {
            en.applyDamage(1, {
                cause: EntityDamageCause.drowning
            });
        } else {
            en.applyDamage(3, {
                cause: EntityDamageCause.drowning
            });
        }
    });

    player.removeTag(player.id);
}

/**
 * ウォーターウェーブ
 */
export async function waterwave(player:Player) {

    const {xapply, yapply, zapply, xlocation, ylocation, zlocation} = getAdjacentSphericalPoints(player.getRotation(), player.location);

    const wave = player.dimension.spawnEntity("kurokumaft:waterwavemagic", {x:xlocation!,y:player.location.y,z:zlocation!});
    const intervalNum = system.runInterval(() => {
        wave.applyImpulse({x:xapply!,y:0,z:zapply!});
        wave.setRotation({x:xlocation!,y:zlocation!});
    }, 2);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        wave.remove();
    }, 60);
}

/**
 * ウォータジェイル
 */
export async function waterjail(player:Player) {
    player.addTag(player.id);

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: player.location,
        maxDistance: 20,
        closest: 2
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);
    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        waterjailHold(en, en.location);
    })
    player.removeTag(player.id);
}

async function waterjailHold(en: Entity, location: Vector3) {

    en.dimension.spawnParticle("kurokumaft:waterjail_particle", location);
    const num = system.runInterval(() => {
        try {
            if (!en.isValid) {
                system.clearRun(num);
            }
            en.teleport(location);
            if (en instanceof Player) {
                en.applyDamage(1, {
                    cause: EntityDamageCause.drowning
                });
            } else {
                en.applyDamage(4, {
                    cause: EntityDamageCause.drowning
                });
            }
        } catch (error: any) {
            system.clearRun(num);
        }
    }, 2);
    system.waitTicks(5*TicksPerSecond).then(() => {
        system.clearRun(num);
    });
}