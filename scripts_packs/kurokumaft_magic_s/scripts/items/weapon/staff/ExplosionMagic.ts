import { EntityComponentTypes, EntityDamageCause, EntityProjectileComponent, EntityQueryOptions, Player, system } from "@minecraft/server";
import { addTeamsTagFilter, getLookPoints } from "../../../common/MagicCommonUtil";

/**
 * メガブランド
 */
export async function megaBrand(player:Player) {
    player.addTag("megaBrand_self");

    player.dimension.spawnParticle("kurokumaft:megabland_explosion", 
        {
            x:player.location.x, 
            y:player.location.y+1.8,
            z:player.location.z
        }
    );

    const filterOption = {
        excludeTags: [
            "megaBrand_self",
        ],
        location: {x:player.location.x, y:player.location.y+1.8, z:player.location.z},
        maxDistance: 6.5
    } as EntityQueryOptions;
    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid()) {
            return;
        }

        if (en instanceof Player) {
            en.applyDamage(3, {
                cause: EntityDamageCause.fire
            });
            en.applyDamage(3, {
                cause: EntityDamageCause.stalagmite
            });
        } else {
            en.applyDamage(15, {
                cause: EntityDamageCause.fire
            });
            en.applyDamage(15, {
                cause: EntityDamageCause.stalagmite
            });
        }
    });

    player.removeTag("megaBrand_self");

}

/**
 * エクスプロージョン
 */
export async function explosion(player:Player) {
    const look = getLookPoints(player.getRotation(), player.location, 30);
    const explosion = player.dimension.spawnEntity("kurokumaft:explosionmagic", 
        {
            x:look.x,
            y:player.location.y + 25,
            z:look.z
        }
    );
    const projectile = explosion.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
    projectile.owner = player;
    let dim = explosion.dimension;
    let loca = explosion.location;
    const intervalNum = system.runInterval(() => {
        if (explosion.isValid()) {
            explosion.dimension.spawnParticle("kurokumaft:explosion_wave", explosion.location);
            dim = explosion.dimension;
            loca = explosion.location;
        } else {
            dim.spawnParticle("kurokumaft:explosion_shell", loca);
            system.clearRun(intervalNum);
        }
    }, 4);
}