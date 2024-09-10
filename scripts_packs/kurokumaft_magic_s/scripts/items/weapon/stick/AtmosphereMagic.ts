import { EffectTypes, EntityDamageCause, Player, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * アトモスフィア
 */
export async function atmosphere(player:Player) {
    player.addTag("atmosphere_self");
    let dimen = player.dimension;
    let intervalNum = system.runInterval(() => {
        let ploca = player.location;
        dimen.spawnParticle("kurokumaft:atmosphere_particle", ploca);
        let targets = dimen.getEntities({
            excludeTags: [
                "atmosphere_self"
            ],
            excludeFamilies: [
                "inanimate", "player", "familiar", "magic", "arrow"
            ],
            excludeTypes: [
                "item"
            ],
            location: player.location,
            maxDistance: 10
        });
        targets.forEach(en => {
            let enloca = en.location;
            dimen.spawnParticle("kurokumaft:wind_particle", {x:enloca.x,y:enloca.y,z:enloca.z});
            dimen.spawnParticle("kurokumaft:storm1_particle", {x:enloca.x,y:enloca.y+1,z:enloca.z});
            dimen.spawnParticle("kurokumaft:storm2_particle", {x:enloca.x,y:enloca.y,z:enloca.z});
            dimen.spawnParticle("kurokumaft:storm3_particle", {x:enloca.x,y:enloca.y+1.5,z:enloca.z});
            dimen.spawnParticle("kurokumaft:storm4_particle", {x:enloca.x,y:enloca.y+0.5,z:enloca.z});
            en.addEffect(MinecraftEffectTypes.Levitation, 1*TicksPerSecond, {
                amplifier: 10
            });
            en.applyDamage(3, {
                cause: EntityDamageCause.fallingBlock
            });
        })
    }, 4);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("atmosphere_self");
    }, 100);
}