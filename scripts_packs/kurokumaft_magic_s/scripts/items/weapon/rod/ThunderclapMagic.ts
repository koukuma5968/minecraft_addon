import { EntityDamageCause, Player, system } from "@minecraft/server";

/**
 * サンダークラップ
 */
export async function thunderclap(player:Player) {
    player.addTag("thunderclap_self");
    let targets = player.dimension.getEntities({
        excludeTags: [
            "thunderclap_self"
        ],
        excludeFamilies: [
            "inanimate", "player", "familiar"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        maxDistance: 20,
        closest: 3
    });
    targets.forEach(en => {
        en.runCommand("/particle kurokumaft:lightningbolt_particle ~~~");
        en.dimension.spawnEntity("Lightning_Bolt", en.location);
        en.applyDamage(10, {
            cause: EntityDamageCause.lightning
        });
    })
    player.removeTag("thunderclap_self");
}

/**
 * サンダージェイル
 */
export async function thunderjail(player:Player) {
    player.addTag("thunder_jail_self");
    let targets = player.dimension.getEntities({
        excludeTags: [
            "thunder_jail_self"
        ],
        excludeFamilies: [
            "inanimate", "player", "familiar"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        maxDistance: 8
    });
    targets.forEach(en => {
        en.runCommand("/particle kurokumaft:thunder_jail_particle ~~~");
        en.addEffect("slowness", 2, {
            amplifier: 30
        });
        en.applyDamage(4, {
            cause: EntityDamageCause.lightning
        });
    })
    player.removeTag("thunder_jail_self");
}