import { CustomComponentParameters, Entity, EntityComponentTypes, EntityEquippableComponent, EntityInventoryComponent, EntityRidingComponent, EquipmentSlot, ItemComponentUseEvent, ItemCustomComponent, ItemStack, Player, PlayerSoundOptions, system, TicksPerSecond } from "@minecraft/server";

export class MHMeatRoast implements ItemCustomComponent {

  onUse(event: ItemComponentUseEvent, arg: CustomComponentParameters) {
    const item = event.itemStack
    if (item !== undefined) {
      const player = event.source as Player;
      const riding = player.getComponent(EntityComponentTypes.Riding) as EntityRidingComponent;
      if (riding === undefined) {
        return;
      }
      const ridEntity = riding.entityRidingOn as Entity;
      if (ridEntity !== undefined && ridEntity.typeId === "kurokumaft:meat_roaster") {
        const inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        const container = inventory.container;
        if (ridEntity.getProperty("kurokumaft:mh_action") === "none") {
          const startTime = system.currentTick;
          ridEntity.setProperty("kurokumaft:mh_action", "roast");
          player.playSound("meat_roast.start");
          const run = system.runInterval(() => {
            // ridEntity.dimension.spawnParticle("kurokumaft:mh_roast_fire", ridEntity.location);
            if (ridEntity.getProperty("kurokumaft:mh_action") === "none") {
              system.clearRun(run);
              return;
            }
            const equippable = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
            const mainhand = equippable.getEquipment(EquipmentSlot.Mainhand);
            if (startTime + 13*TicksPerSecond < system.currentTick) {
              ridEntity.setProperty("kurokumaft:mh_action", "none");
              player.playSound("meat_roast.open");
              player.playSound("meat_roast.failure");
              if (container.emptySlotsCount > 0) {
                container.addItem(new ItemStack("kurokumaft:mh_burnt_meat", 1));
              } else {
                ridEntity.dimension.spawnItem(new ItemStack("kurokumaft:mh_burnt_meat", 1), {
                  x: ridEntity.location.x,
                  y: ridEntity.location.y + 2,
                  z: ridEntity.location.z
                });
              }
              ridEntity.setProperty("kurokumaft:roast_state", 0);
              if (item.amount === 1) {
                equippable.setEquipment(EquipmentSlot.Mainhand, undefined);
              } else {
                equippable.setEquipment(EquipmentSlot.Mainhand, new ItemStack(item.typeId, item.amount-1));
              }
            } else if (mainhand === undefined || mainhand.typeId !== item.typeId) {
              ridEntity.setProperty("kurokumaft:mh_action", "none");
              player.playSound("meat_roast.open");
              player.playSound("meat_roast.failure");
              if (container.emptySlotsCount > 0) {
                container.addItem(new ItemStack("kurokumaft:mh_burnt_meat", 1));
              } else {
                ridEntity.dimension.spawnItem(new ItemStack("kurokumaft:mh_burnt_meat", 1), {
                  x: ridEntity.location.x,
                  y: ridEntity.location.y + 2,
                  z: ridEntity.location.z
                });
              }

              ridEntity.setProperty("kurokumaft:roast_state", 0);
              if (container.contains(item)) {
                const slotNum = container.find(item) as number;
                const slot = container.getSlot(slotNum);
                if (slot.amount === 1) {
                  container.setItem(slotNum, undefined)
                } else {
                  container.setItem(slotNum, new ItemStack(slot.typeId, slot.amount-1));
                }
              }
            } else if (startTime + 11*TicksPerSecond < system.currentTick) {
              ridEntity.setProperty("kurokumaft:roast_state", 3);
            } else if (startTime + 9*TicksPerSecond < system.currentTick) {
              ridEntity.setProperty("kurokumaft:roast_state", 2);
            } else if (startTime + 4*TicksPerSecond < system.currentTick) {
              ridEntity.setProperty("kurokumaft:roast_state", 1);
            }
          }, 0.5*TicksPerSecond);
        } else {
          const playerSoundOptions: PlayerSoundOptions = {
            pitch: 20,
            volume: 0.01,
          };
          player.playSound("meat_roast.start", playerSoundOptions);
          player.playSound("meat_roast.open");
          ridEntity.setProperty("kurokumaft:mh_action", "none");
          const state = ridEntity.getProperty("kurokumaft:roast_state") as number;
          let newItem = "kurokumaft:mh_meat";
          if (state === 1) {
            newItem = "kurokumaft:mh_undercooked_meat";
            player.playSound("meat_roast.failure");
          } else if (state === 2) {
            newItem = "kurokumaft:mh_crispy_meat";
            player.playSound("meat_roast.crispy");
          } else if (state === 3) {
            newItem = "kurokumaft:mh_burnt_meat";
            player.playSound("meat_roast.failure");
          }
          const equippable = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
          if (item.amount === 1) {
            equippable.setEquipment(EquipmentSlot.Mainhand, undefined);
          } else {
            equippable.setEquipment(EquipmentSlot.Mainhand, new ItemStack(item.typeId, item.amount-1));
          }
          if (container.emptySlotsCount > 0) {
            container.addItem(new ItemStack(newItem, 1));
          } else {
            ridEntity.dimension.spawnItem(new ItemStack(newItem, 1), {
              x: ridEntity.location.x,
              y: ridEntity.location.y + 2,
              z: ridEntity.location.z
            });
          }
          ridEntity.setProperty("kurokumaft:roast_state", 0);
        }
      }
    }
  };
}