import { Entity, EntityDamageCause, EntityQueryOptions, Player, system } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { getLookRotaionPointsV2, addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * スパークルライト
 */
export async function sparkleShock(player:Player, entity:Entity) {

    player.addTag("sparkle_shock_self");

    const left = getLookRotaionPointsV2(entity.getRotation(), 0, 2.5);
    entity.dimension.spawnParticle("kurokumaft:sparkle_light_particle", {x:entity.location.x+left.x, y:entity.location.y+1.8, z:entity.location.z+left.z});
    const center = getLookRotaionPointsV2(entity.getRotation(), 0, 0);
    entity.dimension.spawnParticle("kurokumaft:sparkle_light_particle", {x:entity.location.x+center.x, y:entity.location.y+1.8, z:entity.location.z+center.z});
    const right = getLookRotaionPointsV2(entity.getRotation(), 0, -2.5);
    entity.dimension.spawnParticle("kurokumaft:sparkle_light_particle", {x:entity.location.x+right.x, y:entity.location.y+1.8, z:entity.location.z+right.z});

    const filterOption = {
        excludeTags: [
            "sparkle_shock_self",
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
                cause: EntityDamageCause.soulCampfire
            });
        } else {
            en.applyDamage(6, {
                cause: EntityDamageCause.soulCampfire
            });
        }
    });

    player.removeTag("sparkle_shock_self");
}

/**
 * ホーリーフィールド
 */
export async function hollyField(player:Player) {
    const holly_field = player.dimension.spawnEntity("kurokumaft:holly_field", 
        {
            x:player.location.x,
            y:player.location.y,
            z:player.location.z
        }
    );
    const holeLo = holly_field.location;
    const intervalNum = system.runInterval(() => {
        holly_field.dimension.spawnParticle("kurokumaft:holly_field_particle", holly_field.location);
        holly_field.dimension.spawnParticle("kurokumaft:holly_field_outer_particle", holly_field.location);

        const filterOption = {
            excludeTags: [
                "sparkle_shock_self",
            ],
            excludeFamilies: [
                "inanimate", "magic", "arrow", "monster"
            ],
            excludeTypes: [
                "item"
            ],
            location: holeLo,
            maxDistance: 15
        } as EntityQueryOptions;

        const targets = player.dimension.getEntities(filterOption);
        targets.forEach(en => {
            if (!en.isValid) {
                return;
            }
            en.addEffect(MinecraftEffectTypes.InstantHealth, 5, {
                amplifier: 10
            });
        });
    }, 10);

    system.runTimeout(() => {
        system.clearRun(intervalNum);
        holly_field.remove();
    }, 100);
}