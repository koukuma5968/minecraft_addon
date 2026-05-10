import { EntityAttributeComponent, EntityComponentTypes, Player, TicksPerSecond } from "@minecraft/server";
import { MHPotinEffectType } from "../common/types/MHItemTypes";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class ItemCustomBase {

  public useEffectItem(entity: Player, params: unknown) {

    if (params === undefined) {
      return;
    }

    const types = Array.isArray(params) ? params : [params];

    for (const t of types) {
      const type = t as MHPotinEffectType;

      const ran = Math.random();
      if (ran <= type.chance) {
        if ("" !== type.particle) {
          entity.dimension.spawnParticle(type.particle, entity.location);
        }
        if (type.type === "effect") {
          entity.addEffect(type.name, type.duration * TicksPerSecond, {
            amplifier: type.amplifier,
            showParticles: false
          });
        } else if (type.type === "custom") {
          if (type.name === "instant_health") {
            const health = entity.getComponent(EntityComponentTypes.Health) as EntityAttributeComponent;
            let addHelth = type.amplifier;
            if (health.effectiveMax < (health.currentValue + type.amplifier)) {
              addHelth = health.effectiveMax - health.currentValue;
            }
            if (addHelth > 0) {
              health.setCurrentValue(health.currentValue + addHelth);
            }
          } else if (type.name === "detoxifying") {
            const effects = entity.getEffects();
            effects.forEach(effect => {
              if (effect === undefined) {
                return;
              }
              if (effect.typeId === MinecraftEffectTypes.Poison) {
                entity.removeEffect(MinecraftEffectTypes.Poison);
              } else if (effect.typeId === MinecraftEffectTypes.Wither) {
                entity.removeEffect(MinecraftEffectTypes.Wither);
              }
            });
          } else if (type.name === "instant_damage") {
            const health = entity.getComponent(EntityComponentTypes.Health) as EntityAttributeComponent;
            let addHelth = type.amplifier;
            if (1 === health.currentValue) {
              addHelth = 0;
            } else if (0 >= (health.currentValue - type.amplifier)) {
              addHelth = health.currentValue - 1;
            }
            if (addHelth > 0) {
              health.setCurrentValue(health.currentValue - addHelth);
            }
          }
        }
      }
    }
    entity.playSound("item.use.whoosh");
  }

}

