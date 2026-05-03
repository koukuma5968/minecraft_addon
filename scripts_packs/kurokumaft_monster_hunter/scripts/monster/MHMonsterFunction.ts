import { Entity, EntityComponentTypes, EntityTypeFamilyComponent, EntityEquippableComponent, EquipmentSlot, ItemStack, ItemCustomComponentInstance, CustomComponentParameters, Vector3 } from "@minecraft/server";
import { MHWeaponItemType, sharpnessDamageMap, weaponsDamageMap } from "../common/types/MHItemTypes";
import { MHAilmentWeaknessTypes, MHBirdDragonMonsterActionClass, MHHerbivoreMonsterActionClass, MHWeaknessTypes } from "../common/types/MHMonsterTypes";
import { MHMonsterManager } from "./MHMonsterManager";

export function startMHMonsterAction(entity: Entity) {
  const typeFamily = entity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
  // console.info(typeFamily.hasTypeFamily("mh_monster"));
  if (typeFamily !== undefined && typeFamily.hasTypeFamily("mh_monster")) {
    const monsId = entity.typeId.substring(11);
    if (typeFamily !== undefined && typeFamily.hasTypeFamily("herbivore")) {
      const ationCl = MHHerbivoreMonsterActionClass[monsId];
      const action = new ationCl(entity);
      MHMonsterManager.addMonster(entity, action);
    } else if (typeFamily !== undefined && typeFamily.hasTypeFamily("bird_dragon")) {
      const ationCl = MHBirdDragonMonsterActionClass[monsId];
      const action = new ationCl(entity);
      MHMonsterManager.addMonster(entity, action);
    }
  }
}

export function hitMHMonsterDamage(damagingEntity: Entity, weakElements: MHWeaknessTypes[]): number {

  let damage = 0;
  const equippable = damagingEntity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
  const mainhand = equippable.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
  if (mainhand !== undefined && mainhand.hasTag("kurokumaft:mh_weapons")) {
    const weponsCustom = mainhand.getComponent("kurokumaft:mh_wepons_custom") as ItemCustomComponentInstance;
    const parameters = weponsCustom.customComponentParameters as CustomComponentParameters;
    const itemTypes = parameters.params as MHWeaponItemType;
    const sharpness = itemTypes.sharpness[0];

    const weponDamageRate = getWeaponDamage(itemTypes, weakElements);

    const sharpnessRate = getShapnessRate(sharpness);
    damage = weponDamageRate * sharpnessRate;

    // console.info("health:" + health);
    // console.info("切れ味レート:" + sharpnessRate);
    // console.info("ダメージレート:" + weponDamageRate);
    // console.info("合計ダメージ：" + damage);
  }
  return Math.round(damage);
}

export function getMHMonsterAilmentDamage(damagingEntity: Entity, weakAilments: MHAilmentWeaknessTypes[]): MHAilmentWeaknessTypes | undefined {

  const equippable = damagingEntity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
  const mainhand = equippable.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
  if (mainhand !== undefined && mainhand.hasTag("kurokumaft:mh_weapons")) {
    const weponsCustom = mainhand.getComponent("kurokumaft:mh_wepons_custom") as ItemCustomComponentInstance;
    const parameters = weponsCustom.customComponentParameters as CustomComponentParameters;
    const itemTypes = parameters.params as MHWeaponItemType;
    const elementType = itemTypes.element;

    const alimentType = weakAilments.find(aliment => aliment.type === elementType[0]) as MHAilmentWeaknessTypes;
    if (alimentType !== undefined) {
      const retAlimentType = {
        type: alimentType.type,
        endurance: (Number(elementType[1]) * alimentType.endurance),
        duration: alimentType.duration,
        damage: alimentType.damage
      };
      return retAlimentType;
    }
  }
  return undefined;
}

export function getMHMonsterDizziness(damagingEntity: Entity, weakDizziness: MHAilmentWeaknessTypes): MHAilmentWeaknessTypes | undefined {

  const equippable = damagingEntity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
  const mainhand = equippable.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
  if (mainhand !== undefined && mainhand.hasTag("kurokumaft:mh_weapons")) {
    const weponsCustom = mainhand.getComponent("kurokumaft:mh_wepons_custom") as ItemCustomComponentInstance;
    const parameters = weponsCustom.customComponentParameters as CustomComponentParameters;
    const itemTypes = parameters.params as MHWeaponItemType;
    const rate = weaponsDamageMap.find(pre => pre.weaponType === itemTypes.type);
    if (rate === undefined) {
      return undefined;
    }
    let retDizzinessDamage = 0;
    const attackType = rate.attackType;
    switch (attackType) {
      case "blow":
        retDizzinessDamage = 10 * weakDizziness.endurance
        break;
      case "stab":
        retDizzinessDamage = 5 * weakDizziness.endurance
        break;
      case "bullet":
        retDizzinessDamage = 2 * weakDizziness.endurance
        break;
    }

    if (retDizzinessDamage !== 0) {
      const retDizzinessType = {
        type: weakDizziness.type,
        endurance: retDizzinessDamage,
        duration: weakDizziness.duration,
        damage: weakDizziness.damage
      };
      return retDizzinessType;
    }
  }
  return undefined;
}

function getWeaponDamage(itemTypes: MHWeaponItemType, weakElements: MHWeaknessTypes[]) {
  const rate = weaponsDamageMap.find(pre => pre.weaponType === itemTypes.type);
  if (rate !== undefined) {
    const damage = itemTypes.attack * rate.damage_rate;
    let critical = 1;
    if (Math.random() <= itemTypes.critical/100) {
      critical = rate.critical_rate;
    }
    const elementType = itemTypes.element;
    let element = 0;

    const weakElement = weakElements.find(element => element.type === elementType[0]) as MHWeaknessTypes;
    if (weakElement !== undefined) {
      element = (Number(elementType[1]) * weakElement.endurance) * rate.element_rate;
    }
    return damage * critical + element;
  }
  return itemTypes.attack;
}

function getShapnessRate(sharpness: number) {
  const sharpnessRate = sharpnessDamageMap.findLast(pre => {
    return pre.sharpness <= sharpness
  });
  if (sharpnessRate !== undefined) {
    return sharpnessRate.rate;
  } else {
    return 1
  }
}

export function targetDistance(a: Vector3, b: Vector3): number {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  return Math.sqrt(dx * dx + dz * dz);
}

