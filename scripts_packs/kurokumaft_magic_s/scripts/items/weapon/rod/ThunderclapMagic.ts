import { Entity, EntityDamageCause, EntityQueryOptions, Player, TicksPerSecond } from "@minecraft/server";
import { MinecraftEntityTypes } from "@minecraft/vanilla-data";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * ライトニングブレード
 */
export async function lightningBread(player:Player, hitEntity:Entity) {

    player.addTag("lightning_bread_self");

    player.dimension.spawnParticle("kurokumaft:lightning_bread_particle", {x:hitEntity.location.x, y:player.location.y+1.8, z:hitEntity.location.z});

    const filterOption = {
        excludeTags: [
            "lightning_bread_self",
        ],
        location: {x:hitEntity.location.x, y:player.location.y+1, z:hitEntity.location.z},
        maxDistance: 4
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid()) {
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

    player.removeTag("lightning_bread_self");
}

/**
 * サンダークラップ
 */
export async function thunderclap(player:Player) {
    player.addTag("thunderclap_self");

    const filterOption = {
        excludeTags: [
            "thunderclap_self",
        ],
        location: player.location,
        maxDistance: 20,
        closest: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid()) {
            return;
        }

        en.dimension.spawnParticle("kurokumaft:lightningbolt_particle", en.location);
        en.dimension.spawnEntity(MinecraftEntityTypes.LightningBolt, en.location);
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

    player.removeTag("thunderclap_self");
}

/**
 * サンダージェイル
 */
export async function thunderjail(player:Player) {
    player.addTag("thunder_jail_self");
 
    const filterOption = {
        excludeTags: [
            "thunder_jail_self"
        ],
        location: player.location,
        maxDistance: 8
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid()) {
            return;
        }

        en.dimension.spawnParticle("kurokumaft:thunder_jail_particle", en.location);
        if (en instanceof Player) {
            en.addEffect("slowness", 5*TicksPerSecond, {
                amplifier: 10
            });
            en.applyDamage(1, {
                cause: EntityDamageCause.lightning
            });
        } else {
            en.addEffect("slowness", 10*TicksPerSecond, {
                amplifier: 30
            });
            en.applyDamage(4, {
                cause: EntityDamageCause.lightning
            });
        }
    })
    player.removeTag("thunder_jail_self");
}