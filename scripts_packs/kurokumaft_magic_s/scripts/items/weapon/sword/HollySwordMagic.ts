import { Entity, Player, TicksPerSecond } from "@minecraft/server";

/**
 * ホーリーソード
 * @param {Player} player
 * @param {Entity} entity
 */
export async function hollySword(player:Player, entity:Entity) {

    entity.dimension.spawnParticle("kurokumaft:holly_sword_slash", entity.location);

    const entitys = entity.dimension.getEntities({
        excludeFamilies: [
            "inanimate", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        location: entity.location,
        maxDistance: 7
    }) as Entity[];

    entitys.forEach(en => {
        en.addEffect("minecraft:instant_health", 1*TicksPerSecond, {
            amplifier: 10,
            showParticles: false
        });
    });

}

/**
 * ホーリーソード(モンス)
 * @param {Entity} attack
 * @param {Entity} hit
 */
export async function hollySwordMons(attack:Entity, hit:Entity) {

    hit.dimension.spawnParticle("kurokumaft:holly_sword_slash", hit.location);

    const entitys = hit.dimension.getEntities({
        excludeFamilies: [
            "inanimate", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        location: hit.location,
        maxDistance: 7
    }) as Entity[];

    entitys.forEach(en => {
        en.addEffect("minecraft:instant_health", 1*TicksPerSecond, {
            amplifier: 10,
            showParticles: false
        });
    });

}