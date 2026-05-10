import { Entity, EntityComponentTypes, EntityTypeFamilyComponent } from "@minecraft/server";
import { MHInsectManager } from "./MHInsectManager";
import { MHInsectTypesActionClass } from "../common/types/MHInsectTypes";

export function startMHInsectAction(entity: Entity) {
  const typeFamily = entity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
  if (typeFamily !== undefined && typeFamily.hasTypeFamily("mh_insect")) {
    const insectId = entity.typeId.substring(11);
    const ationCl = MHInsectTypesActionClass[insectId];
    const action = new ationCl(entity);
    MHInsectManager.addInsect(entity, action);
  }
}
