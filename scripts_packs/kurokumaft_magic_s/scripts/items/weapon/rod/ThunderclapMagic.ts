import { EntityDamageCause, Player, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftEntityTypes } from "@minecraft/vanilla-data";

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
            "inanimate", "player", "familiar", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        maxDistance: 20,
        closest: 3
    });
    targets.forEach(en => {
        en.dimension.spawnParticle("kurokumaft:lightningbolt_particle", en.location);
        en.dimension.spawnEntity(MinecraftEntityTypes.LightningBolt, en.location);
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
            "inanimate", "player", "familiar", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        maxDistance: 8
    });
    targets.forEach(en => {
        en.runCommand("/particle kurokumaft:thunder_jail_particle ~~~");
        en.addEffect("slowness", 10*TicksPerSecond, {
            amplifier: 30
        });
        en.applyDamage(4, {
            cause: EntityDamageCause.lightning
        });
    })
    player.removeTag("thunder_jail_self");
}