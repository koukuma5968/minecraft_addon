import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond, Vector3 } from "@minecraft/server";
import { addTeamsTagFilter, getLookRotaionPointsV2 } from "../../../common/MagicCommonUtil";

/**
 * ライトニングブレード
 */
export async function lightningBread(player:Player, hitEntity:Entity) {

    player.addTag(player.id);

    player.dimension.spawnParticle("kurokumaft:lightning_bread_particle", {x:hitEntity.location.x, y:player.location.y+1.8, z:hitEntity.location.z});

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: {x:hitEntity.location.x, y:player.location.y+1, z:hitEntity.location.z},
        maxDistance: 4
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid) {
            return;
        }

        if (en instanceof Player) {
            en.applyDamage(2, {
                cause: EntityDamageCause.lightning
            });
        } else {
            en.applyDamage(6, {
                cause: EntityDamageCause.lightning
            });
        }
    });

    player.removeTag(player.id);
}

/**
 * サンダーカッター
 */
export async function thunderCutter(player:Player) {

    player.addTag(player.id);
    const center = getLookRotaionPointsV2(player.getRotation(), 3.5, 0);
    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: {x:player.location.x+center.x, y:player.location.y+1.8, z:player.location.z+center.z},
        maxDistance: 5
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    player.dimension.spawnParticle("kurokumaft:thunder_cutter_particle", {x:player.location.x+center.x, y:player.location.y+1.8, z:player.location.z+center.z});

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid) {
            return;
        }

        if (en instanceof Player) {
            en.applyDamage(4, {
                cause: EntityDamageCause.lightning
            });
        } else {
            en.applyDamage(10, {
                cause: EntityDamageCause.lightning
            });
        }
    });

    player.removeTag(player.id);

}

/**
 * サンダークラップ
 */
export async function thunderclap(player:Player) {
    player.addTag(player.id);

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: player.location,
        maxDistance: 20,
        closest: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid) {
            return;
        }

        en.dimension.spawnParticle("kurokumaft:lightningbolt_particle", en.location);
        en.dimension.spawnEntity("minecraft:lightning_bolt", en.location);
        if (en instanceof Player) {
            en.applyDamage(3, {
                cause: EntityDamageCause.lightning
            });
        } else {
            en.applyDamage(10, {
                cause: EntityDamageCause.lightning
            });
        }
    })

    player.removeTag(player.id);
}

/**
 * サンダージェイル
 */
export async function thunderjail(player:Player) {
    player.addTag(player.id);
 
    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: player.location,
        maxDistance: 8
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        thunderJailHold(en, en.location);
    })
    player.removeTag(player.id);
}

async function thunderJailHold(en: Entity, location: Vector3) {

    en.dimension.spawnParticle("kurokumaft:thunder_jail_particle", location);
    const num = system.runInterval(() => {
        try {
            if (!en.isValid) {
                system.clearRun(num);
            }
            en.teleport(location);
            if (en instanceof Player) {
                en.applyDamage(1, {
                    cause: EntityDamageCause.lightning
                });
            } else {
                en.applyDamage(4, {
                    cause: EntityDamageCause.lightning
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