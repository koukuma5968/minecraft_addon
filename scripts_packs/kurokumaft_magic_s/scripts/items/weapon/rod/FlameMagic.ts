import { Entity, EntityDamageCause, EntityQueryOptions, Player, system } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/commonUtil";

/**
 * バムロッド
 */
export async function bumrod(player:Player, hitEntity:Entity) {

    player.addTag("bumrod_self");

    hitEntity.dimension.spawnParticle("kurokumaft:bumrod_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    let filterOption = {
        excludeTags: [
            "bumrod_self",
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 2
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (en instanceof Player) {
            en.applyDamage(2, {
                cause: EntityDamageCause.fire
            });
        } else {
            en.applyDamage(6, {
                cause: EntityDamageCause.fire
            });
        }
    });

    player.removeTag("bumrod_self");
}

/**
 * フレイムサークル
 */
export async function flarecircle(player:Player) {
    player.addTag("flamecircle_self");
    let intervalNum = system.runInterval(() => {

        let filterOption = {
            excludeTags: [
                "flamecircle_self",
            ],
            location: player.location,
            maxDistance: 20,
            closest: 3
        } as EntityQueryOptions;

        addTeamsTagFilter(player, filterOption);

        let targets = player.dimension.getEntities(filterOption);
        targets.forEach(en => {
            en.dimension.spawnParticle("kurokumaft:firestome1_particle",en.location);
            if (en instanceof Player) {
                en.applyDamage(2, {
                    cause: EntityDamageCause.fire
                });
            } else {
                en.applyDamage(5, {
                    cause: EntityDamageCause.fire
                });
            }
        });

    }, 2);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("flamecircle_self");
    }, 60);
}

/**
 * バーストフレア
 */
export async function burstflare(player:Player) {
    player.addTag("burstflare_self");

    let filterOption = {
        excludeTags: [
            "burstflare_self",
        ],
        location: player.location,
        maxDistance: 20,
        closest: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        en.dimension.spawnParticle("kurokumaft:burstflare_particle", en.location);
        en.dimension.spawnEntity("kurokumaft:burstflaremagic<minecraft:explode>", en.location);
        if (en instanceof Player) {
            en.applyDamage(3, {
                cause: EntityDamageCause.fire
            });
        } else {
            en.applyDamage(10, {
                cause: EntityDamageCause.fire
            });
        }
    });

    player.removeTag("burstflare_self");
}