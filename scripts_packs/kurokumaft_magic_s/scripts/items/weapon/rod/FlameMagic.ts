import { Entity, EntityDamageCause, EntityQueryOptions, ExplosionOptions, Player, system } from "@minecraft/server";
import { addTeamsTagFilter, applyExplosionDamage } from "../../../common/MagicCommonUtil";

/**
 * バムロッド
 */
export async function bumrod(player:Player, hitEntity:Entity) {

    player.addTag(player.id);

    hitEntity.dimension.spawnParticle("kurokumaft:bumrod_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 2
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid) {
            return;
        }

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

    player.removeTag(player.id);
}

/**
 * フレイムサークル
 */
export async function flarecircle(player:Player) {
    player.addTag(player.id);
    const intervalNum = system.runInterval(() => {

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
        player.removeTag(player.id);
    }, 60);
}

/**
 * バーストフレア
 */
export async function burstflare(player:Player) {
    player.addTag(player.id);

    const filterOption = {
        excludeTags: [
            player.id,
        ],
        location: player.location,
        maxDistance: 20,
        closest: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    const option = {
        allowUnderwater: true,
        breaksBlocks: false,
        causesFire: false,
        source: player
    } as ExplosionOptions;

    targets.forEach(en => {
        if (!en.isValid) {
            return;
        }

        en.dimension.spawnParticle("kurokumaft:burstflare_particle", en.location);
        applyExplosionDamage(option, player, filterOption, player.dimension, en.location, 3, 2);
    });

     player.removeTag(player.id);
}