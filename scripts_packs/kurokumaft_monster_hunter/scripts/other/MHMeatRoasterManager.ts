import { Entity, EntityComponentTypes, EntityTypeFamilyComponent, ItemStack } from "@minecraft/server";

export function hitMHMeatRoaster(hitEntity: Entity, damagingEntity: Entity) {

  if (hitEntity.typeId === "kurokumaft:meat_roaster") {
    const damageFamily = damagingEntity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
    if (damageFamily.hasTypeFamily("player")) {
      hitEntity.dimension.spawnItem(new ItemStack("kurokumaft:meat_roaster", 1), hitEntity.location);
      hitEntity.remove();
    }
  }
}