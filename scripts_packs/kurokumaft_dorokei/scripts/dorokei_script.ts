import { system, TicksPerSecond, world } from "@minecraft/server";
import { initRegisterDorokeiCustom } from "./custom/DorokeiCustomComponentRegistry";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

// ワールド起動時
system.beforeEvents.startup.subscribe(initEvent => {
  initRegisterDorokeiCustom(initEvent);
});

world.afterEvents.projectileHitEntity.subscribe(event => {
  const projectile = event.projectile;
  const entity = event.getEntityHit().entity;
  if (projectile !== undefined && projectile.typeId === "kurokumaft:stun_bullet") {
    if (entity !== undefined) {
      entity.addEffect(MinecraftEffectTypes.Slowness, 5*TicksPerSecond, {
        amplifier: 5,
        showParticles: true
      });
      entity.dimension.spawnParticle("kurokumaft:stun_electrocution", entity.location);
    }
  }
});

world.afterEvents.playerInteractWithEntity.subscribe(event => {
  event.player
});


