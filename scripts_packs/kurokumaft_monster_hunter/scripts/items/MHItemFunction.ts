import { Container, CustomComponentParameters, Entity, EntityComponentTypes, EntityInventoryComponent, ItemCustomComponentInstance, ItemStack, PlayerInventoryItemChangeAfterEvent, RawMessage } from "@minecraft/server";
import { armorPropatiesMap, MHArmorItemType, MHArmorProtectLevelsType, MHArmorSkilType, MHWeaponItemType } from "../common/types/MHItemTypes";

export async function setItemLore(event: PlayerInventoryItemChangeAfterEvent) {
  const item = event.itemStack as ItemStack;
  if (item !== undefined) {
    if (item.hasTag("kurokumaft:mh_weapons")) {
      const lore = item.getLore();
      // console.log(item.typeId, "=説明文行：",lore.length);
      if (lore.length === 0) {
        const weponsCustom = item.getComponent("kurokumaft:mh_wepons_custom") as ItemCustomComponentInstance;
        const parameters = weponsCustom.customComponentParameters as CustomComponentParameters;
        const itemTypes = parameters.params as MHWeaponItemType;
        let elementValue = {translate:"item.lore.kurokumaft:element.value",with:[itemTypes.element[0], itemTypes.element[1]]};
        if ("-" === itemTypes.element[0]) {
          elementValue = {translate:"item.lore.kurokumaft:element.value",with:[itemTypes.element[0]]};
        }
        item.setLore(
          [
            {rawtext: [
              {translate:"item.lore." + itemTypes.type + ".title"},
              {text: " "},
              {translate:"item.lore.kurokumaft:rarity.value",with:[itemTypes.rarity.toString()]}
            ]},
            {rawtext: [
              {translate:"item.lore.kurokumaft:critical.value",with:[itemTypes.critical.toString()]}
            ]},
            {rawtext: [
              {translate:"item.lore.kurokumaft:slot.value",with:[itemTypes.slot.toString()]},
              {text: " "},
              elementValue
            ]},
            {rawtext: [{translate:"item.lore.kurokumaft:sharpness.value",with:[itemTypes.sharpness[0].toString(), itemTypes.sharpness[1].toString()]}]}
          ]
        );
        // console.log(item.typeId, "=説明文セット：",item.getLore());
        const player = event.player;
        const inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        const container = inventory.container as Container;
        container.setItem(event.slot, item);
      }
    } else if (item.hasTag("kurokumaft:mh_armors")) {
      const lore = item.getLore();
      // console.log(item.typeId, "=説明文行：",lore.length);
      if (lore.length === 0) {
        const armorCustom = item.getComponent("kurokumaft:mh_armors_custom") as ItemCustomComponentInstance;
        const parameters = armorCustom.customComponentParameters as CustomComponentParameters;
        const armorTypes = parameters.params as MHArmorItemType;
        const armorPropatie = armorPropatiesMap.find(pre => pre.name === armorTypes.name && pre.type === armorTypes.type);
        if (armorPropatie !== undefined) {
          const skills = armorPropatie.skills as MHArmorSkilType[];

          const skilPoint: RawMessage[] = [];
          skills.forEach(value => {
            const skil = {rawtext: [{translate:"skill.kurokumaft:" + value.name + ".name", with:[value.point.toString()]}]} as RawMessage;
            skilPoint.push(skil);
          });

          const protection = armorTypes.protection as MHArmorProtectLevelsType;
          // const protectionLevel: RawMessage[] = [];
          // protections.forEach(value => {
          //   const skil = {rawtext: [{translate:"armor.lore.kurokumaft:armor.level.value", with:[value.level, value.value]}]} as RawMessage;
          //   protectionLevel.push(skil);
          // });

          item.setLore(
            [
              {rawtext: [
                {translate:"armor.lore." + armorTypes.type + ".title"},
                {text: " "},
                {translate:"armor.lore.kurokumaft:rarity.value",with:[armorTypes.rarity.toString()]},
                {text: " "},
                {translate:"armor.lore.kurokumaft:slot.value",with:[armorTypes.slot.toString()]},
              ]},
              {rawtext: [
                {translate:"armor.lore.kurokumaft:armor.level.value", with:[protection.level.toString(), protection.value.toString()]}
              ]},
              {rawtext: skilPoint}
            ]
          );
          // console.log(item.typeId, "=説明文セット：",item.getLore());
          const player = event.player;
          const inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
          const container = inventory.container as Container;
          container.setItem(event.slot, item);
        }
      }
    }
  }
}

export function starMeatRoast(entity: Entity) {

}
