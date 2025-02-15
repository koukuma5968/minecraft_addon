import { EntityDamageCause, EntityQueryOptions, Player, system } from "@minecraft/server";
import { MinecraftEntityTypes } from "@minecraft/vanilla-data";
import { addTeamsTagFilter, getLookRotaionPoints } from "../../../common/MagicCommonUtil";

/**
 * ディグ・ヴォルト
 */
export async function digVault(player:Player) {
    player.addTag("digVault_self");

    let left = getLookRotaionPoints(player.getRotation(), 4.4, 2.5);
    player.dimension.spawnParticle("kurokumaft:spark_shock_particle", 
        {
            x:player.location.x+left.x, 
            y:player.location.y+1.8,
            z:player.location.z+left.z
        }
    );

    let center = getLookRotaionPoints(player.getRotation(), 4.4, 0);
    player.dimension.spawnParticle("kurokumaft:spark_shock_particle", 
        {
            x:player.location.x+center.x, 
            y:player.location.y+1.8,
            z:player.location.z+center.z
        }
    );

    let right = getLookRotaionPoints(player.getRotation(), 4.4, -2.5);
    player.dimension.spawnParticle("kurokumaft:spark_shock_particle", 
        {
            x:player.location.x+right.x, 
            y:player.location.y+1.8,
            z:player.location.z+right.z
        }
    );

    let filterOption = {
        excludeTags: [
            "digVault_self",
        ],
        location: {x:player.location.x+center.x, y:player.location.y+1.8, z:player.location.z+center.z},
        maxDistance: 6.5
    } as EntityQueryOptions;
    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid()) {
            return;
        }

        if (en instanceof Player) {
            en.applyDamage(3, {
                cause: EntityDamageCause.fire
            });
            en.applyDamage(3, {
                cause: EntityDamageCause.lightning
            });
        } else {
            en.applyDamage(15, {
                cause: EntityDamageCause.fire
            });
            en.applyDamage(15, {
                cause: EntityDamageCause.lightning
            });
        }
    });

    player.removeTag("digVault_self");

}

/**
 * フレイムスパーク
 */
export async function flameSpark(player:Player) {
    player.addTag("flamespark_self");
    let intervalNum = system.runInterval(() => {

        let filterOption = {
            excludeTags: [
                "flamespark_self",
            ],
            location: player.location,
            maxDistance: 30,
            closest: 3
        } as EntityQueryOptions;
        addTeamsTagFilter(player, filterOption);

        let targets = player.dimension.getEntities(filterOption);
        targets.forEach(en => {
            if (!en.isValid()) {
                return;
            }

            en.dimension.spawnParticle("kurokumaft:firewall_particle", en.location);
            en.applyDamage(3, {
                cause: EntityDamageCause.fire
            });
            en.dimension.spawnEntity(MinecraftEntityTypes.LightningBolt, en.location);
            en.applyDamage(3, {
                cause: EntityDamageCause.lightning
            });
        });
    }, 10);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("flamespark_self");
    }, 100);
}
