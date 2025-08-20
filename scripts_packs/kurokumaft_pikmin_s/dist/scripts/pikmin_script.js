// scripts/pikmin_script.ts
import { EntityComponentTypes as EntityComponentTypes6, system as system3, TicksPerSecond as TicksPerSecond5, world as world2 } from "@minecraft/server";

// scripts/items/ExtremelyHotSpray.ts
import { EquipmentSlot as EquipmentSlot4 } from "@minecraft/server";

// scripts/common/PikuminCommonUtil.ts
import {
  world,
  ItemStack,
  EntityComponentTypes,
  ItemComponentTypes,
  TicksPerSecond
} from "@minecraft/server";
function getRandomInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
async function itemCoolDown(player, itemStack) {
  const cool = itemStack.getComponent(ItemComponentTypes.Cooldown);
  cool.startCooldown(player);
}
var weightChoice = (list) => {
  const totalWeight = list.reduce((p, c) => {
    return { weight: p.weight + c.weight };
  }).weight;
  return {
    pick() {
      const r = Math.random() * totalWeight;
      let s = 0;
      for (const l of list) {
        s += l.weight;
        if (r < s) {
          return l.item;
        }
      }
    }
  };
};
function addTargetFilter(closest, location, maxDis, exeTag) {
  const filterOption = {
    excludeFamilies: [
      "inanimate",
      "pikmin",
      "villager",
      "animal"
    ],
    excludeTypes: [
      "item"
    ],
    excludeTags: [
      exeTag
    ],
    location,
    maxDistance: maxDis
  };
  if (!world.gameRules.pvp) {
    filterOption.excludeFamilies?.push("player");
  }
  if (closest != 0) {
    filterOption.closest = closest;
  }
  return filterOption;
}
function addDokkuriFireFilter(location, maxDis) {
  const filterOption = {
    excludeFamilies: [
      "inanimate",
      "dokkuri_fire"
    ],
    excludeTypes: [
      "item"
    ],
    location,
    maxDistance: maxDis
  };
  return filterOption;
}
function addDokkuriMizuFilter(location, maxDis) {
  const filterOption = {
    excludeFamilies: [
      "inanimate",
      "dokkuri_water"
    ],
    excludeTypes: [
      "item"
    ],
    location,
    maxDistance: maxDis
  };
  return filterOption;
}
function getLookLocationDistance(angle, forwardPoint, sidePoint, udFixed) {
  const forwardRad = degToRad(angle);
  const forntDisPoint = {
    x: -Math.sin(forwardRad) * forwardPoint,
    z: Math.cos(forwardRad) * forwardPoint
  };
  if (sidePoint < 0) {
    const leftRad = degToRad(angle + 90);
    forntDisPoint.x = forntDisPoint.x + Math.sin(leftRad) * -sidePoint;
    forntDisPoint.z = forntDisPoint.z + Math.cos(leftRad) * -sidePoint;
  } else if (sidePoint > 0) {
    const rightRad = degToRad(angle - 90);
    forntDisPoint.x = forntDisPoint.x + Math.sin(rightRad) * sidePoint;
    forntDisPoint.z = forntDisPoint.z + Math.cos(rightRad) * sidePoint;
  }
  const angleDisPoint = {
    x: Number(forntDisPoint.x.toFixed(3)),
    y: udFixed,
    z: Number(forntDisPoint.z.toFixed(3))
  };
  return angleDisPoint;
}
function getDistanceLocation(origin, distance) {
  const angleDisPoint = {
    x: Number((origin.x + distance.x).toFixed(3)),
    y: Number((origin.y + distance.y).toFixed(3)),
    z: Number((origin.z + distance.z).toFixed(3))
  };
  return angleDisPoint;
}
function degToRad(deg) {
  return deg * Math.PI / 180;
}

// scripts/common/PikuminItemDurabilityDamage.ts
import {
  Player as Player2,
  ItemComponentTypes as ItemComponentTypes2,
  EntityComponentTypes as EntityComponentTypes2,
  GameMode
} from "@minecraft/server";
async function ItemDurabilityDamage(entity, item, slot, damage) {
  if (entity instanceof Player2 && entity.getGameMode() == GameMode.Creative) {
    return;
  }
  const equ = entity.getComponent(EntityComponentTypes2.Equippable);
  const durability = item.getComponent(ItemComponentTypes2.Durability);
  let dChange;
  if (damage) {
    dChange = damage;
  } else {
    dChange = durability.getDamageChance(Math.ceil(getRandomInRange(0, 3)));
  }
  if (durability.damage + dChange >= durability.maxDurability) {
    equ.setEquipment(slot, void 0);
  } else {
    durability.damage = durability.damage + dChange;
    equ.setEquipment(slot, item);
  }
}
async function subtractionItem(player, item, slot, decNum) {
  const remaining = item.amount - decNum;
  const equ = player.getComponent(EntityComponentTypes2.Equippable);
  if (remaining <= 0) {
    equ.setEquipment(slot, void 0);
  } else {
    item.amount -= decNum;
    equ.setEquipment(slot, item);
  }
}

// scripts/entity/Pikmin.ts
import {
  BlockVolume,
  EntityComponentTypes as EntityComponentTypes3,
  EntityDamageCause,
  EquipmentSlot as EquipmentSlot3,
  ItemStack as ItemStack3,
  system,
  TicksPerSecond as TicksPerSecond2
} from "@minecraft/server";
var Pikumin = class {
  checkExtremelyHotTime(pikmin) {
    if (pikmin.isValid) {
      const mode = pikmin.getProperty("kurokumaft:mode");
      if (mode === "nomal") {
        return;
      }
      pikmin.triggerEvent("kurokumaft:extremely_hot_up");
      pikmin.dimension.spawnParticle("kurokumaft:extremely_hot_emitter", pikmin.location);
      const num = system.runInterval(() => {
        if (pikmin.isValid) {
          const splay_timer2 = pikmin.getProperty("kurokumaft:splay_timer");
          if (splay_timer2 != 0) {
            pikmin.setProperty("kurokumaft:splay_timer", splay_timer2 - 1);
            pikmin.dimension.spawnParticle("kurokumaft:extremely_hot_emitter", pikmin.location);
          }
        }
      }, TicksPerSecond2);
      const splay_timer = pikmin.getProperty("kurokumaft:splay_timer");
      system.runTimeout(() => {
        if (pikmin.isValid) {
          pikmin.setProperty("kurokumaft:mode", "nomal");
          pikmin.setProperty("kurokumaft:splay_timer", 60);
          pikmin.triggerEvent("kurokumaft:extremely_hot_down");
        }
        system.clearRun(num);
      }, splay_timer * TicksPerSecond2);
    }
  }
  pikminGrasp(target, player) {
    const pikumin = target.typeId.split(":")[1].split("_");
    const equ = player.getComponent(EntityComponentTypes3.Equippable);
    switch (pikumin[0]) {
      case "red":
        equ.setEquipment(EquipmentSlot3.Mainhand, new ItemStack3("kurokumaft:red_pikmin_item", 1));
        break;
      case "blue":
        equ.setEquipment(EquipmentSlot3.Mainhand, new ItemStack3("kurokumaft:blue_pikmin_item", 1));
        break;
      case "yellow":
        equ.setEquipment(EquipmentSlot3.Mainhand, new ItemStack3("kurokumaft:yellow_pikmin_item", 1));
        break;
      case "purple":
        equ.setEquipment(EquipmentSlot3.Mainhand, new ItemStack3("kurokumaft:purple_pikmin_item", 1));
        break;
      case "white":
        equ.setEquipment(EquipmentSlot3.Mainhand, new ItemStack3("kurokumaft:white_pikmin_item", 1));
        break;
      case "rock":
        equ.setEquipment(EquipmentSlot3.Mainhand, new ItemStack3("kurokumaft:rock_pikmin_item", 1));
        break;
      case "feather":
        equ.setEquipment(EquipmentSlot3.Mainhand, new ItemStack3("kurokumaft:feather_pikmin_item", 1));
        break;
      case "ice":
        equ.setEquipment(EquipmentSlot3.Mainhand, new ItemStack3("kurokumaft:ice_pikmin_item", 1));
        break;
    }
    target.remove();
  }
  pikmintame(player, pikmin) {
    const tameable = pikmin.getComponent(EntityComponentTypes3.Tameable);
    if (!tameable.isTamed) {
      tameable.tame(player);
      pikmin.triggerEvent("kurokumaft:pikmin_pull_up");
    }
  }
  pikminThrownhit(projectile, target, source, location, dimension) {
    const pikumin = projectile.typeId.split(":")[1].split("_");
    source.addTag(source.id);
    try {
      switch (pikumin[0]) {
        case "red":
          const redTargets = dimension.getEntities(addTargetFilter(0, location, 6, source.id));
          redTargets.forEach((en) => {
            dimension.spawnParticle("minecraft:mobflame_single", en.location);
            en.applyDamage(6, {
              cause: EntityDamageCause.fire,
              damagingEntity: source
            });
          });
          if (projectile.isValid) {
            projectile.remove();
          }
          break;
        case "blue":
          const blueTargets = dimension.getEntities(addTargetFilter(0, location, 6, source.id));
          blueTargets.forEach((en) => {
            dimension.spawnParticle("minecraft:bubble_column_up_particle", en.location);
            en.addEffect("minecraft:weakness", 10 * TicksPerSecond2, {
              amplifier: 10,
              showParticles: false
            });
            en.applyDamage(6, {
              cause: EntityDamageCause.drowning,
              damagingEntity: source
            });
          });
          if (projectile.isValid) {
            projectile.remove();
          }
          break;
        case "yellow":
          const yellowTargets = dimension.getEntities(addTargetFilter(0, location, 6, source.id));
          yellowTargets.forEach((en) => {
            dimension.spawnParticle("minecraft:yellow_lightning", en.location);
            en.applyDamage(6, {
              cause: EntityDamageCause.lightning,
              damagingEntity: source
            });
          });
          if (projectile.isValid) {
            projectile.remove();
          }
          break;
        case "purple":
          if (projectile.isValid) {
            const shock = dimension.spawnEntity("kurokumaft:purple_shock", location);
            const projeComp = shock.getComponent(EntityComponentTypes3.Projectile);
            projeComp.owner = source;
            projectile.remove();
          }
          break;
        case "white":
          if (target !== void 0) {
            target.addEffect("minecraft:poison", 10 * TicksPerSecond2, {
              amplifier: 10,
              showParticles: false
            });
          }
          if (projectile.isValid) {
            projectile.remove();
          }
          break;
        case "rock":
          if (target !== void 0) {
            const point = getLookLocationDistance(target.location.y, -2, 0, 0);
            target.applyKnockback({ x: point.x, z: point.z }, 0.2);
            target.addEffect("minecraft:nausea", 5 * TicksPerSecond2, {
              amplifier: 5,
              showParticles: false
            });
          }
          if (projectile.isValid) {
            projectile.remove();
          }
          break;
        case "feather":
          if (target !== void 0) {
            target.addEffect("minecraft:levitation", 5 * TicksPerSecond2, {
              amplifier: 5,
              showParticles: false
            });
          }
          break;
        case "ice":
          if (target !== void 0) {
            target.addEffect("minecraft:weakness", 5 * TicksPerSecond2, {
              amplifier: 5,
              showParticles: false
            });
          }
          break;
      }
    } catch (error) {
    }
    source.addTag(source.id);
  }
  pikminThrownhitBlock(projectile, block, source, location, dimension) {
    const pikumin = projectile.typeId.split(":")[1].split("_");
    source.addTag(source.id);
    try {
      switch (pikumin[0]) {
        case "red":
          if (projectile.isValid) {
            const red = dimension.spawnEntity("kurokumaft:red_pikmin", location);
            red.triggerEvent("kurokumaft:oniyon_spawned");
            red.triggerEvent("kurokumaft:pikmin_pull_up");
            projectile.remove();
          }
          break;
        case "blue":
          if (projectile.isValid) {
            const blue = dimension.spawnEntity("kurokumaft:blue_pikmin", location);
            blue.triggerEvent("kurokumaft:oniyon_spawned");
            blue.triggerEvent("kurokumaft:pikmin_pull_up");
            projectile.remove();
          }
          break;
        case "yellow":
          if (projectile.isValid) {
            const yellow = dimension.spawnEntity("kurokumaft:yellow_pikmin", location);
            yellow.triggerEvent("kurokumaft:oniyon_spawned");
            yellow.triggerEvent("kurokumaft:pikmin_pull_up");
            projectile.remove();
          }
          break;
        case "purple":
          if (projectile.isValid) {
            const shock = dimension.spawnEntity("kurokumaft:purple_shock", location);
            const projeComp = shock.getComponent(EntityComponentTypes3.Projectile);
            projeComp.owner = source;
            const purple = dimension.spawnEntity("kurokumaft:purple_pikmin", location);
            purple.triggerEvent("kurokumaft:oniyon_spawned");
            purple.triggerEvent("kurokumaft:pikmin_pull_up");
            projectile.remove();
          }
          break;
        case "white":
          if (projectile.isValid) {
            const white = dimension.spawnEntity("kurokumaft:white_pikmin", location);
            white.triggerEvent("kurokumaft:oniyon_spawned");
            white.triggerEvent("kurokumaft:pikmin_pull_up");
            projectile.remove();
          }
          break;
        case "rock":
          if (block !== void 0 && !block.isLiquid && block.typeId !== "minecraft:bedrock") {
            dimension.setBlockType(location, "minecraft:air");
            dimension.spawnItem(new ItemStack3(block.typeId, 1), { x: location.x, y: location.y + 1, z: location.z });
          }
          if (projectile.isValid) {
            const rock = dimension.spawnEntity("kurokumaft:rock_pikmin", location);
            rock.triggerEvent("kurokumaft:oniyon_spawned");
            rock.triggerEvent("kurokumaft:pikmin_pull_up");
            projectile.remove();
          }
          break;
        case "feather":
          if (projectile.isValid) {
            const feather = dimension.spawnEntity("kurokumaft:feather_pikmin", location);
            feather.triggerEvent("kurokumaft:oniyon_spawned");
            feather.triggerEvent("kurokumaft:pikmin_pull_up");
            projectile.remove();
          }
          break;
        case "ice":
          if (projectile.isValid) {
            const ice = dimension.spawnEntity("kurokumaft:ice_pikmin", location);
            ice.triggerEvent("kurokumaft:oniyon_spawned");
            ice.triggerEvent("kurokumaft:pikmin_pull_up");
            projectile.remove();
            if (block !== void 0) {
              if ("minecraft:frosted_ice" === block.typeId) {
                const startTick = system.currentTick;
                const run = system.runInterval(() => {
                  try {
                    if (ice.isValid) {
                      this.pikminThrownFreezeWater(ice);
                      if (startTick + 500 <= system.currentTick) {
                        system.clearRun(run);
                      }
                    } else {
                      system.clearRun(run);
                    }
                  } catch (error) {
                    system.clearRun(run);
                  }
                  ;
                }, TicksPerSecond2);
              }
            }
          }
          break;
      }
    } catch (error) {
    }
    source.addTag(source.id);
  }
  whitePoison(target) {
    target.addEffect("minecraft:poison", 10 * TicksPerSecond2, {
      amplifier: 5,
      showParticles: false
    });
  }
  pikminThrownFreezeWater(hit) {
    if (hit.isValid) {
      const blockVolume = new BlockVolume(
        { x: hit.location.x - 2, y: hit.location.y - 2, z: hit.location.z - 2 },
        { x: hit.location.x + 2, y: hit.location.y + 2, z: hit.location.z + 2 }
      );
      hit.dimension.fillBlocks(blockVolume, "minecraft:frosted_ice", {
        blockFilter: {
          includeTypes: [
            "minecraft:frosted_ice",
            "minecraft:water",
            "minecraft:flowing_water"
          ]
        },
        ignoreChunkBoundErrors: true
      });
    }
  }
};

// scripts/items/ExtremelyHotSpray.ts
var ExtremelyHotSpray = class {
  onUse(event) {
    const source = event.source;
    const itemStack = event.itemStack;
    source.dimension.spawnParticle("kurokumaft:extremely_hot_spray", source.location);
    const filterOption = {
      families: [
        "pikmin"
      ],
      location: source.location,
      maxDistance: 8
    };
    const targets = source.dimension.getEntities(filterOption);
    targets.forEach((en) => {
      en.setProperty("kurokumaft:mode", "hot");
      new Pikumin().checkExtremelyHotTime(en);
    });
    ItemDurabilityDamage(source, itemStack, EquipmentSlot4.Mainhand, void 0);
    itemCoolDown(source, itemStack);
  }
};

// scripts/block/PelletGrass.ts
import {
  EntityComponentTypes as EntityComponentTypes4,
  EquipmentSlot as EquipmentSlot5,
  BlockPermutation
} from "@minecraft/server";
var PelletGrassBlock = class {
  onTick(event) {
    const block = event.block;
    const states = block.permutation.getAllStates();
    const growth = states["kurokumaft:growth"];
    if (growth < 2) {
      block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth": growth + 1 }));
    }
  }
  onPlayerInteract(event) {
    const player = event.player;
    const equ = player.getComponent(EntityComponentTypes4.Equippable);
    const itemStack = equ.getEquipment(EquipmentSlot5.Mainhand);
    if (itemStack != void 0 && itemStack.typeId.indexOf("meal") != -1) {
      const block = event.block;
      const states = block.permutation.getAllStates();
      const growth = states["kurokumaft:growth"];
      if (growth < 2) {
        block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:growth": growth + 1 }));
        event.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
        subtractionItem(player, itemStack, EquipmentSlot5.Mainhand, 1);
      } else if (growth == 2) {
        const dimension = block.dimension;
        const location = block.location;
        const pekketLists = weightChoice([
          { item: "red", weight: 20 },
          { item: "blue", weight: 20 },
          { item: "yellow", weight: 20 },
          { item: "purple", weight: 15 },
          { item: "white", weight: 15 },
          { item: "rock", weight: 5 },
          { item: "feather", weight: 5 }
        ]);
        dimension.setBlockType(location, "minecraft:air");
        const choice = pekketLists.pick();
        switch (choice) {
          case "red":
            dimension.spawnEntity("kurokumaft:red_pellet_grass", location);
            break;
          case "blue":
            dimension.spawnEntity("kurokumaft:blue_pellet_grass", location);
            break;
          case "yellow":
            dimension.spawnEntity("kurokumaft:yellow_pellet_grass", location);
            break;
          case "purple":
            dimension.spawnEntity("kurokumaft:purple_pellet_grass", location);
            break;
          case "white":
            dimension.spawnEntity("kurokumaft:white_pellet_grass", location);
            break;
          case "rock":
            dimension.spawnEntity("kurokumaft:rock_pellet_grass", location);
            break;
          case "feather":
            dimension.spawnEntity("kurokumaft:feather_pellet_grass", location);
            break;
        }
      }
    }
  }
};

// scripts/block/Oniyons.ts
import {
  EntityComponentTypes as EntityComponentTypes5,
  EquipmentSlot as EquipmentSlot6,
  BlockPermutation as BlockPermutation2
} from "@minecraft/server";
var OniyonsBlock = class {
  onPlayerInteract(event) {
    const player = event.player;
    const equ = player.getComponent(EntityComponentTypes5.Equippable);
    const itemStack = equ.getEquipment(EquipmentSlot6.Mainhand);
    if (itemStack != void 0 && itemStack.typeId.indexOf("meal") != -1) {
      const block = event.block;
      const states = block.permutation.getAllStates();
      const growth = states["kurokumaft:growth"];
      if (growth < 3) {
        block.setPermutation(BlockPermutation2.resolve(block.typeId, { "kurokumaft:growth": growth + 1 }));
        event.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
        subtractionItem(player, itemStack, EquipmentSlot6.Mainhand, 1);
      } else if (growth == 3) {
        const oniyonType = block.typeId.split(":")[1].split("_");
        const dimension = block.dimension;
        const location = block.location;
        dimension.setBlockType(location, "minecraft:air");
        switch (oniyonType[0]) {
          case "red":
            dimension.spawnEntity("kurokumaft:red_oniyon_base", location);
            break;
          case "blue":
            dimension.spawnEntity("kurokumaft:blue_oniyon_base", location);
            break;
          case "yellow":
            dimension.spawnEntity("kurokumaft:yellow_oniyon_base", location);
            break;
          case "purple":
            dimension.spawnEntity("kurokumaft:purple_oniyon_base", location);
            break;
          case "white":
            dimension.spawnEntity("kurokumaft:white_oniyon_base", location);
            break;
          case "rock":
            dimension.spawnEntity("kurokumaft:rock_oniyon_base", location);
            break;
          case "feather":
            dimension.spawnEntity("kurokumaft:feather_oniyon_base", location);
            break;
          case "ice":
            dimension.spawnEntity("kurokumaft:ice_oniyon_base", location);
            break;
        }
      }
    }
  }
};

// scripts/items/GekikaraFruitEat.ts
import { TicksPerSecond as TicksPerSecond3 } from "@minecraft/server";
var GekikaraFruitEat = class {
  onConsume(event, arg1) {
    const source = event.source;
    const itemStack = event.itemStack;
    source.addEffect("minecraft:strength", 30 * TicksPerSecond3, {
      amplifier: 2,
      showParticles: true
    });
    source.addEffect("minecraft:speed", 30 * TicksPerSecond3, {
      amplifier: 2,
      showParticles: true
    });
    source.addEffect("minecraft:hunger", 60 * TicksPerSecond3, {
      amplifier: 2,
      showParticles: true
    });
    itemCoolDown(source, itemStack);
  }
};

// scripts/custom/PikuminCustomComponentRegistry.ts
function initPikuminRegisterCustom(initEvent) {
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:extremely_hot_spray", new ExtremelyHotSpray());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:gekikara_fruit_eat", new GekikaraFruitEat());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:pellet_grass", new PelletGrassBlock());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:oniyon_block", new OniyonsBlock());
}

// scripts/entity/OniyonBase.ts
import { EquipmentSlot as EquipmentSlot7 } from "@minecraft/server";
var OniyonBase = class {
  pikuminSpawn(target, itemStack, player) {
    const oniyon = target.typeId.split(":")[1].split("_");
    const pellet = itemStack.typeId.split(":")[1].split("_");
    const location = target.location;
    switch (oniyon[0]) {
      case "red":
        if (pellet[0] == "red") {
          target.dimension.spawnEntity("kurokumaft:red_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:red_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:red_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        } else {
          target.dimension.spawnEntity("kurokumaft:red_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        }
        break;
      case "blue":
        if (pellet[0] == "blue") {
          target.dimension.spawnEntity("kurokumaft:blue_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:blue_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:blue_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        } else {
          target.dimension.spawnEntity("kurokumaft:blue_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        }
        break;
      case "yellow":
        if (pellet[0] == "yellow") {
          target.dimension.spawnEntity("kurokumaft:yellow_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:yellow_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:yellow_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        } else {
          target.dimension.spawnEntity("kurokumaft:yellow_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        }
        break;
      case "purple":
        if (pellet[0] == "purple") {
          target.dimension.spawnEntity("kurokumaft:purple_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:purple_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:purple_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        } else {
          target.dimension.spawnEntity("kurokumaft:purple_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        }
        break;
      case "white":
        if (pellet[0] == "white") {
          target.dimension.spawnEntity("kurokumaft:white_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:white_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:white_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        } else {
          target.dimension.spawnEntity("kurokumaft:white_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        }
        break;
      case "rock":
        if (pellet[0] == "rock") {
          target.dimension.spawnEntity("kurokumaft:rock_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:rock_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:rock_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        } else {
          target.dimension.spawnEntity("kurokumaft:rock_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        }
        break;
      case "feather":
        if (pellet[0] == "feather") {
          target.dimension.spawnEntity("kurokumaft:feather_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:feather_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:feather_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        } else {
          target.dimension.spawnEntity("kurokumaft:feather_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        }
        break;
      case "ice":
        if (pellet[0] == "ice") {
          target.dimension.spawnEntity("kurokumaft:ice_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:ice_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
          target.dimension.spawnEntity("kurokumaft:ice_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        } else {
          target.dimension.spawnEntity("kurokumaft:ice_pikmin", { x: location.x + getRandomInRange(-5, 5), y: location.y, z: location.z + getRandomInRange(-5, 5) }).triggerEvent("kurokumaft:oniyon_spawned");
        }
        break;
    }
    subtractionItem(player, itemStack, EquipmentSlot7.Mainhand, 1);
  }
};

// scripts/entity/ButaDokkuri.ts
import { EntityDamageCause as EntityDamageCause2, system as system2, TicksPerSecond as TicksPerSecond4 } from "@minecraft/server";
var ButaDokkuri = class {
  dokkuriFire(dokkuri) {
    const num = system2.runInterval(() => {
      if (dokkuri.isValid) {
        const distance1 = getLookLocationDistance(dokkuri.getRotation().y, 1, 0, 0.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance1));
        const target1 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance1), 1.5));
        target1.forEach((en) => {
          en.applyDamage(2, {
            cause: EntityDamageCause2.fire,
            damagingEntity: dokkuri
          });
        });
        const distance2 = getLookLocationDistance(dokkuri.getRotation().y, 2, 0, 0.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance2));
        const target2 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance2), 1.5));
        target2.forEach((en) => {
          en.applyDamage(2, {
            cause: EntityDamageCause2.fire,
            damagingEntity: dokkuri
          });
        });
        const distance3 = getLookLocationDistance(dokkuri.getRotation().y, 3, 0, 0.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance3));
        const target3 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance3), 1.5));
        target3.forEach((en) => {
          en.applyDamage(2, {
            cause: EntityDamageCause2.fire,
            damagingEntity: dokkuri
          });
        });
        const distance4 = getLookLocationDistance(dokkuri.getRotation().y, 4, 0, 0.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance4));
        const target4 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance4), 1.5));
        target4.forEach((en) => {
          en.applyDamage(2, {
            cause: EntityDamageCause2.fire,
            damagingEntity: dokkuri
          });
        });
      }
    }, 5);
    system2.runTimeout(() => {
      system2.clearRun(num);
    }, 2 * TicksPerSecond4);
  }
  kodokkuriFire(dokkuri) {
    const num = system2.runInterval(() => {
      if (dokkuri.isValid) {
        const distance1 = getLookLocationDistance(dokkuri.getRotation().y, 1, 0, 0.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance1));
        const target1 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance1), 1.5));
        target1.forEach((en) => {
          en.applyDamage(1, {
            cause: EntityDamageCause2.fire,
            damagingEntity: dokkuri
          });
        });
        const distance2 = getLookLocationDistance(dokkuri.getRotation().y, 2, 0, 0.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance2));
        const target2 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance2), 1.5));
        target2.forEach((en) => {
          en.applyDamage(1, {
            cause: EntityDamageCause2.fire,
            damagingEntity: dokkuri
          });
        });
        const distance3 = getLookLocationDistance(dokkuri.getRotation().y, 3, 0, 0.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance3));
        const target3 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance3), 1.5));
        target3.forEach((en) => {
          en.applyDamage(1, {
            cause: EntityDamageCause2.fire,
            damagingEntity: dokkuri
          });
        });
        const distance4 = getLookLocationDistance(dokkuri.getRotation().y, 4, 0, 0.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance4));
        const target4 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance4), 1.5));
        target4.forEach((en) => {
          en.applyDamage(1, {
            cause: EntityDamageCause2.fire,
            damagingEntity: dokkuri
          });
        });
      }
    }, 5);
    system2.runTimeout(() => {
      system2.clearRun(num);
    }, 1 * TicksPerSecond4);
  }
  mizudokkuriFire(dokkuri) {
    const num = system2.runInterval(() => {
      if (dokkuri.isValid) {
        const distance1 = getLookLocationDistance(dokkuri.getRotation().y, 1, 0, 0.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_mizu", getDistanceLocation(dokkuri.location, distance1));
        const target1 = dokkuri.dimension.getEntities(addDokkuriMizuFilter(getDistanceLocation(dokkuri.location, distance1), 1.5));
        target1.forEach((en) => {
          en.applyDamage(2, {
            cause: EntityDamageCause2.drowning,
            damagingEntity: dokkuri
          });
        });
        const distance2 = getLookLocationDistance(dokkuri.getRotation().y, 2, 0, 0.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_mizu", getDistanceLocation(dokkuri.location, distance2));
        const target2 = dokkuri.dimension.getEntities(addDokkuriMizuFilter(getDistanceLocation(dokkuri.location, distance2), 1.5));
        target2.forEach((en) => {
          en.applyDamage(2, {
            cause: EntityDamageCause2.drowning,
            damagingEntity: dokkuri
          });
        });
        const distance3 = getLookLocationDistance(dokkuri.getRotation().y, 3, 0, 0.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_mizu", getDistanceLocation(dokkuri.location, distance3));
        const target3 = dokkuri.dimension.getEntities(addDokkuriMizuFilter(getDistanceLocation(dokkuri.location, distance3), 1.5));
        target3.forEach((en) => {
          en.applyDamage(2, {
            cause: EntityDamageCause2.drowning,
            damagingEntity: dokkuri
          });
        });
        const distance4 = getLookLocationDistance(dokkuri.getRotation().y, 4, 0, 0.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_mizu", getDistanceLocation(dokkuri.location, distance4));
        const target4 = dokkuri.dimension.getEntities(addDokkuriMizuFilter(getDistanceLocation(dokkuri.location, distance4), 1.5));
        target4.forEach((en) => {
          en.applyDamage(2, {
            cause: EntityDamageCause2.drowning,
            damagingEntity: dokkuri
          });
        });
      }
    }, 5);
    system2.runTimeout(() => {
      system2.clearRun(num);
    }, 2 * TicksPerSecond4);
  }
  zoudokkuriFire(dokkuri) {
    const num = system2.runInterval(() => {
      if (dokkuri.isValid) {
        const distance1 = getLookLocationDistance(dokkuri.getRotation().y, 10, 0, 2.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance1));
        const target1 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance1), 4));
        target1.forEach((en) => {
          en.applyDamage(3, {
            cause: EntityDamageCause2.fire,
            damagingEntity: dokkuri
          });
        });
        const distance2 = getLookLocationDistance(dokkuri.getRotation().y, 12, 0, 2.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance2));
        const target2 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance2), 4));
        target2.forEach((en) => {
          en.applyDamage(3, {
            cause: EntityDamageCause2.fire,
            damagingEntity: dokkuri
          });
        });
        const distance3 = getLookLocationDistance(dokkuri.getRotation().y, 14, 0, 2.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance3));
        const target3 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance3), 4));
        target3.forEach((en) => {
          en.applyDamage(3, {
            cause: EntityDamageCause2.fire,
            damagingEntity: dokkuri
          });
        });
        const distance4 = getLookLocationDistance(dokkuri.getRotation().y, 16, 0, 2.5);
        dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance4));
        const target4 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance4), 4));
        target4.forEach((en) => {
          en.applyDamage(3, {
            cause: EntityDamageCause2.fire,
            damagingEntity: dokkuri
          });
        });
      } else {
        system2.clearRun(num);
      }
    }, 5);
    system2.runTimeout(() => {
      system2.clearRun(num);
    }, 2 * TicksPerSecond4);
  }
};

// scripts/pikmin_script.ts
system3.beforeEvents.startup.subscribe((initEvent) => {
  initPikuminRegisterCustom(initEvent);
});
world2.beforeEvents.playerLeave.subscribe((leaveEvent) => {
  leaveEvent.player.clearDynamicProperties();
});
world2.afterEvents.entityLoad.subscribe((event) => {
  const entity = event.entity;
  if (entity.typeId.endsWith("pikmin")) {
    new Pikumin().checkExtremelyHotTime(entity);
  }
});
world2.afterEvents.entityHitEntity.subscribe((event) => {
  const damagingEntity = event.damagingEntity;
  const hitEntity = event.hitEntity;
  if (hitEntity.typeId == "kurokumaft:white_pikmin") {
    new Pikumin().whitePoison(damagingEntity);
  }
  if (damagingEntity.typeId == "kurokumaft:white_pikmin") {
    new Pikumin().whitePoison(hitEntity);
  }
});
world2.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
  const entity = event.entity;
  if (event.eventId === "kurokumaft:this_kill") {
    entity.kill();
  }
  if (event.eventId === "kurokumaft:dokkuri_breath") {
    const dokkuri = new ButaDokkuri();
    if ("kurokumaft:butadokkuri" == entity.typeId) {
      dokkuri.dokkuriFire(entity);
    } else if ("kurokumaft:kobutadokkuri" == entity.typeId) {
      dokkuri.kodokkuriFire(entity);
    } else if ("kurokumaft:mizubutadokkuri" == entity.typeId) {
      dokkuri.mizudokkuriFire(entity);
    } else if ("kurokumaft:zoubutadokkuri" == entity.typeId) {
      dokkuri.zoudokkuriFire(entity);
    }
  }
  if (event.eventId === "kurokumaft:freeze_water") {
    new Pikumin().pikminThrownFreezeWater(entity);
  }
});
world2.afterEvents.entitySpawn.subscribe((event) => {
  const cause = event.cause;
  const entity = event.entity;
  if (entity.typeId == "kurokumaft:feather_pikmin_thrown") {
    system3.runTimeout(() => {
      if (entity.isValid) {
        entity.remove();
      }
    }, 3 * TicksPerSecond5);
  }
});
world2.afterEvents.projectileHitEntity.subscribe((event) => {
  const projectile = event.projectile;
  if (projectile.typeId.lastIndexOf("pikmin_thrown") != -1) {
    if (event.source != void 0) {
      new Pikumin().pikminThrownhit(projectile, event.getEntityHit().entity, event.source, event.location, event.dimension);
    }
  }
});
world2.afterEvents.projectileHitBlock.subscribe((event) => {
  const projectile = event.projectile;
  if (projectile.typeId.lastIndexOf("pikmin_thrown") != -1) {
    if (event.source != void 0) {
      new Pikumin().pikminThrownhitBlock(projectile, event.getBlockHit().block, event.source, event.location, event.dimension);
    }
  }
});
world2.afterEvents.playerInteractWithEntity.subscribe((event) => {
  const target = event.target;
  const itemStack = event.itemStack;
  if (target.typeId.lastIndexOf("oniyon_base") != -1) {
    if (itemStack != void 0 && itemStack.typeId.lastIndexOf("pellet")) {
      new OniyonBase().pikuminSpawn(target, itemStack, event.player);
    }
  } else if (target.typeId.lastIndexOf("pikmin") != -1) {
    if (itemStack == void 0) {
      const familyTypes = target.getComponent(EntityComponentTypes6.TypeFamily);
      if (familyTypes.hasTypeFamily("pikmin_plant")) {
        new Pikumin().pikmintame(event.player, target);
      } else if (familyTypes.hasTypeFamily("pikmin")) {
        new Pikumin().pikminGrasp(target, event.player);
      }
    }
  }
});

//# sourceMappingURL=../debug/pikmin_script.js.map
