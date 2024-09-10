import { EntityDamageCause, Player, system } from "@minecraft/server";
import { getAdjacentSphericalPoints } from "../../../common/ShooterPoints";
import { MinecraftEntityTypes } from "@minecraft/vanilla-data";

/**
 * フレイムスパーク
 */
export async function flameSpark(player:Player) {
    player.addTag("flamespark_self");
    let intervalNum = system.runInterval(() => {
        let targets = player.dimension.getEntities({
            excludeTags: [
                "flamespark_self"
            ],
            excludeFamilies: [
                "inanimate", "player", "familiar", "magic", "arrow"
            ],
            excludeTypes: [
                "item"
            ],
            location: player.location,
            maxDistance: 30,
            closest: 3
        });
        targets.forEach(en => {
            en.dimension.spawnParticle("kurokumaft:firewall_particle", en.location);
            en.applyDamage(3, {
                cause: EntityDamageCause.fire
            });
            en.dimension.spawnEntity(MinecraftEntityTypes.LightningBolt, en.location);
            en.applyDamage(3, {
                cause: EntityDamageCause.lightning
            });
        })
    }, 10);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("flamespark_self");
    }, 100);
}