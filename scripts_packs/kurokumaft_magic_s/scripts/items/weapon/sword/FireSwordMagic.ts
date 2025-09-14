import { Entity, EntityDamageCause, EntityQueryOptions, Player, world } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * フレイムソード
 * @param {Player} player
 * @param {Entity} entity
 */
export async function fireSword(player:Player, entity:Entity) {

    entity.dimension.spawnParticle("kurokumaft:fire_sword_slash", entity.location);
    entity.setOnFire(5, true);
    if (entity instanceof Player) {
        if (world.gameRules.pvp) {
            entity.applyDamage(10, {
                cause: EntityDamageCause.fire
            });
        }
    } else {
        entity.applyDamage(60, {
            cause: EntityDamageCause.fire
        });
    }
}

/**
 * §cブレイズバースト
 * @param {Player} player
 */
export async function blazeBurst(player:Player) {

    player.addTag(player.id);
    player.dimension.spawnParticle("kurokumaft:explosion_shell", player.location);
    player.dimension.spawnParticle("kurokumaft:explosion_wave", player.location);

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: player.location,
        maxDistance: 5
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const entitys = player.dimension.getEntities(filterOption) as Entity[];
    entitys.forEach(en => {
        en.setOnFire(10, true);
        let damage = 60;
        if (en instanceof Player) {
            damage = 20;
        }
        en.applyDamage(damage, {
            cause: EntityDamageCause.fire
        });
    });

    player.removeTag(player.id);

}

/**
 * フレイムソード(モンス)
 * @param {Entity} attack
 * @param {Entity} hit
 */
export async function fireSwordMons(attack:Entity, hit:Entity) {

    hit.dimension.spawnParticle("kurokumaft:fire_sword_slash", hit.location);
    hit.setOnFire(5, true);
    if (hit instanceof Player) {
        hit.applyDamage(5, {
            cause: EntityDamageCause.fire
        });
    } else {
        hit.applyDamage(15, {
            cause: EntityDamageCause.fire
        });
    }
}