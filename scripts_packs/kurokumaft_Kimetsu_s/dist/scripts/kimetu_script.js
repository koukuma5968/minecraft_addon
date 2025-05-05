// scripts/kimetu_script.ts
import { world as world5, system as system20, EquipmentSlot as EquipmentSlot8, Player as Player28, EntityComponentTypes as EntityComponentTypes10, ItemStack as ItemStack25, ScriptEventSource } from "@minecraft/server";

// scripts/kokyu/kata/MizuNoKata.ts
import { EntityDamageCause as EntityDamageCause2, EquipmentSlot as EquipmentSlot3, MolangVariableMap, Player as Player5, system, TicksPerSecond } from "@minecraft/server";

// scripts/common/KimetuCommonUtil.ts
import { world, Direction } from "@minecraft/server";
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
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
function getLookLocationDistancePitch(angle, forwardPoint, sidePoint) {
  const forwardRad = degToRad(angle.y);
  const pitchRad = degToRad(angle.x);
  let angleDisPoint = {
    x: -(Math.cos(pitchRad) * Math.sin(forwardRad)) * forwardPoint,
    y: Math.sin(pitchRad) * forwardPoint,
    z: Math.cos(pitchRad) * Math.cos(forwardRad) * forwardPoint
  };
  if (sidePoint < 0) {
    const leftRad = degToRad(angle.y + 90);
    angleDisPoint = crossProduct(angleDisPoint, {
      x: Math.sin(leftRad) * -sidePoint,
      y: 0,
      z: Math.cos(leftRad) * -sidePoint
    });
  } else if (sidePoint > 0) {
    const rightRad = degToRad(angle.y - 90);
    angleDisPoint = crossProduct(angleDisPoint, {
      x: Math.sin(rightRad) * sidePoint,
      y: 0,
      z: Math.cos(rightRad) * sidePoint
    });
  }
  const retDisPoint = {
    x: Number(angleDisPoint.x.toFixed(3)),
    y: -Number(angleDisPoint.y.toFixed(3)),
    z: Number(angleDisPoint.z.toFixed(3))
  };
  return retDisPoint;
}
function getDistanceLocation(origin, distance) {
  const angleDisPoint = {
    x: Number((origin.x + distance.x).toFixed(3)),
    y: Number((origin.y + distance.y).toFixed(3)),
    z: Number((origin.z + distance.z).toFixed(3))
  };
  return angleDisPoint;
}
function crossProduct(front, side) {
  return {
    x: Number((front.x * +side.x).toFixed(3)),
    y: Number(front.y.toFixed(3)),
    z: Number((front.z + side.z).toFixed(3))
  };
}
function degToRad(deg) {
  return deg * Math.PI / 180;
}
function getForwardPosition(origin, angleZ, distance) {
  const rad = degToRad(angleZ);
  return {
    x: origin.x + Math.sin(rad) * distance,
    y: origin.y,
    z: origin.z + Math.cos(rad) * distance
  };
}
function getRightPosition(origin, angleZ, distance) {
  const rad = degToRad(angleZ + 90);
  return {
    x: origin.x + Math.sin(rad) * distance,
    y: origin.y,
    z: origin.z + Math.cos(rad) * distance
  };
}
function getLeftPosition(origin, angleZ, distance) {
  const rad = degToRad(angleZ - 90);
  return {
    x: origin.x + Math.sin(rad) * distance,
    y: origin.y,
    z: origin.z + Math.cos(rad) * distance
  };
}
function addRegimentalFilter(closest, location, maxDis, exeTag) {
  let filterOption = {
    excludeFamilies: [
      "inanimate",
      "regimental_soldier",
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
function addProjectionFilter(closest, location, maxDis) {
  let filterOption = {
    families: [
      "arrow"
    ],
    location,
    maxDistance: maxDis
  };
  if (closest != 0) {
    filterOption.closest = closest;
  }
  return filterOption;
}
var BlockLocationList = Object.freeze([
  {
    direction: Direction.Up,
    location: { x: 0, y: 1, z: 0 }
  },
  {
    direction: Direction.Down,
    location: { x: 0, y: -1, z: 0 }
  },
  {
    direction: Direction.South,
    location: { x: 0, y: 0, z: 1 }
  },
  {
    direction: Direction.North,
    location: { x: 0, y: 0, z: -1 }
  },
  {
    direction: Direction.East,
    location: { x: 1, y: 0, z: 0 }
  },
  {
    direction: Direction.West,
    location: { x: -1, y: 0, z: 0 }
  }
]);
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

// scripts/kokyu/kata/KataComonClass.ts
import { EntityComponentTypes as EntityComponentTypes2, EntityDamageCause, EquipmentSlot as EquipmentSlot2, Player as Player3, world as world2 } from "@minecraft/server";

// scripts/common/KimetuItemDurabilityDamage.ts
import { ItemComponentTypes, EntityComponentTypes, GameMode, Player as Player2 } from "@minecraft/server";
async function ItemDurabilityDamage(entity, item, slot) {
  if (entity instanceof Player2 && entity.getGameMode() != GameMode.creative) {
    let equ = entity.getComponent(EntityComponentTypes.Equippable);
    let durability = item.getComponent(ItemComponentTypes.Durability);
    let dChange = durability.getDamageChance(Math.ceil(getRandomInRange(0, 3)));
    if (durability.damage + dChange >= durability.maxDurability) {
      equ.setEquipment(slot, void 0);
    } else {
      durability.damage = durability.damage + dChange;
      equ.setEquipment(slot, item);
    }
  }
}

// scripts/kokyu/kata/KataComonClass.ts
var KataComonClass = class {
  gardCheck(en) {
    let equ = en.getComponent(EntityComponentTypes2.Equippable);
    let main = equ.getEquipment(EquipmentSlot2.Mainhand);
    let off = equ.getEquipment(EquipmentSlot2.Offhand);
    if (en.isSneaking && (main != void 0 && main.typeId.indexOf("shield") != -1 || off != void 0 && off.typeId.indexOf("shield") != -1)) {
      world2.playSound("item.shield.block", en.location, {
        pitch: 1,
        volume: 2
      });
      return false;
    }
    return true;
  }
  kokyuApplyDamage(player, filter, enDamage, pDamage, itemStack) {
    player.addTag(player.id);
    const targets = player.dimension.getEntities(filter);
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    targets.forEach((en) => {
      if (en instanceof Player3) {
        if (this.gardCheck(en)) {
          en.applyDamage(pDamage * kaikyuNum, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: player
          });
        }
      } else {
        en.applyDamage(enDamage * kaikyuNum, {
          cause: EntityDamageCause.entityAttack,
          damagingEntity: player
        });
      }
    });
    if (itemStack != void 0) {
      ItemDurabilityDamage(player, itemStack, EquipmentSlot2.Mainhand);
    }
    player.removeTag(player.id);
  }
  kokyuApplyEffect(player, filter, duration, damage, effect) {
    player.addTag(player.id);
    const targets = player.dimension.getEntities(filter);
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    targets.forEach((en) => {
      if (en instanceof Player3) {
        if (this.gardCheck(en)) {
          en.addEffect(effect, Math.round(duration * kaikyuNum * 0.25), {
            amplifier: Math.round(damage * kaikyuNum * 0.25),
            showParticles: true
          });
        }
      } else {
        en.addEffect(effect, Math.round(duration * kaikyuNum * 0.75), {
          amplifier: Math.round(damage * kaikyuNum),
          showParticles: true
        });
      }
    });
    player.removeTag(player.id);
  }
  projectRefrect(player, volume) {
    let hit = false;
    const projfilter = addProjectionFilter(0, volume, 4.5);
    const projectiles = player.dimension.getEntities(projfilter);
    projectiles.forEach((projectile) => {
      projectile.clearVelocity();
      const projComp = projectile.getComponent(EntityComponentTypes2.Projectile);
      if (projComp != void 0) {
        projComp.shoot(projectile.getViewDirection(), {
          uncertainty: 0
        });
        hit = true;
      }
    });
    return hit;
  }
};

// node_modules/@minecraft/vanilla-data/lib/index.js
var MinecraftBiomeTypes = ((MinecraftBiomeTypes2) => {
  MinecraftBiomeTypes2["BambooJungle"] = "minecraft:bamboo_jungle";
  MinecraftBiomeTypes2["BambooJungleHills"] = "minecraft:bamboo_jungle_hills";
  MinecraftBiomeTypes2["BasaltDeltas"] = "minecraft:basalt_deltas";
  MinecraftBiomeTypes2["Beach"] = "minecraft:beach";
  MinecraftBiomeTypes2["BirchForest"] = "minecraft:birch_forest";
  MinecraftBiomeTypes2["BirchForestHills"] = "minecraft:birch_forest_hills";
  MinecraftBiomeTypes2["BirchForestHillsMutated"] = "minecraft:birch_forest_hills_mutated";
  MinecraftBiomeTypes2["BirchForestMutated"] = "minecraft:birch_forest_mutated";
  MinecraftBiomeTypes2["CherryGrove"] = "minecraft:cherry_grove";
  MinecraftBiomeTypes2["ColdBeach"] = "minecraft:cold_beach";
  MinecraftBiomeTypes2["ColdOcean"] = "minecraft:cold_ocean";
  MinecraftBiomeTypes2["ColdTaiga"] = "minecraft:cold_taiga";
  MinecraftBiomeTypes2["ColdTaigaHills"] = "minecraft:cold_taiga_hills";
  MinecraftBiomeTypes2["ColdTaigaMutated"] = "minecraft:cold_taiga_mutated";
  MinecraftBiomeTypes2["CrimsonForest"] = "minecraft:crimson_forest";
  MinecraftBiomeTypes2["DeepColdOcean"] = "minecraft:deep_cold_ocean";
  MinecraftBiomeTypes2["DeepDark"] = "minecraft:deep_dark";
  MinecraftBiomeTypes2["DeepFrozenOcean"] = "minecraft:deep_frozen_ocean";
  MinecraftBiomeTypes2["DeepLukewarmOcean"] = "minecraft:deep_lukewarm_ocean";
  MinecraftBiomeTypes2["DeepOcean"] = "minecraft:deep_ocean";
  MinecraftBiomeTypes2["DeepWarmOcean"] = "minecraft:deep_warm_ocean";
  MinecraftBiomeTypes2["Desert"] = "minecraft:desert";
  MinecraftBiomeTypes2["DesertHills"] = "minecraft:desert_hills";
  MinecraftBiomeTypes2["DesertMutated"] = "minecraft:desert_mutated";
  MinecraftBiomeTypes2["DripstoneCaves"] = "minecraft:dripstone_caves";
  MinecraftBiomeTypes2["ExtremeHills"] = "minecraft:extreme_hills";
  MinecraftBiomeTypes2["ExtremeHillsEdge"] = "minecraft:extreme_hills_edge";
  MinecraftBiomeTypes2["ExtremeHillsMutated"] = "minecraft:extreme_hills_mutated";
  MinecraftBiomeTypes2["ExtremeHillsPlusTrees"] = "minecraft:extreme_hills_plus_trees";
  MinecraftBiomeTypes2["ExtremeHillsPlusTreesMutated"] = "minecraft:extreme_hills_plus_trees_mutated";
  MinecraftBiomeTypes2["FlowerForest"] = "minecraft:flower_forest";
  MinecraftBiomeTypes2["Forest"] = "minecraft:forest";
  MinecraftBiomeTypes2["ForestHills"] = "minecraft:forest_hills";
  MinecraftBiomeTypes2["FrozenOcean"] = "minecraft:frozen_ocean";
  MinecraftBiomeTypes2["FrozenPeaks"] = "minecraft:frozen_peaks";
  MinecraftBiomeTypes2["FrozenRiver"] = "minecraft:frozen_river";
  MinecraftBiomeTypes2["Grove"] = "minecraft:grove";
  MinecraftBiomeTypes2["Hell"] = "minecraft:hell";
  MinecraftBiomeTypes2["IceMountains"] = "minecraft:ice_mountains";
  MinecraftBiomeTypes2["IcePlains"] = "minecraft:ice_plains";
  MinecraftBiomeTypes2["IcePlainsSpikes"] = "minecraft:ice_plains_spikes";
  MinecraftBiomeTypes2["JaggedPeaks"] = "minecraft:jagged_peaks";
  MinecraftBiomeTypes2["Jungle"] = "minecraft:jungle";
  MinecraftBiomeTypes2["JungleEdge"] = "minecraft:jungle_edge";
  MinecraftBiomeTypes2["JungleEdgeMutated"] = "minecraft:jungle_edge_mutated";
  MinecraftBiomeTypes2["JungleHills"] = "minecraft:jungle_hills";
  MinecraftBiomeTypes2["JungleMutated"] = "minecraft:jungle_mutated";
  MinecraftBiomeTypes2["LegacyFrozenOcean"] = "minecraft:legacy_frozen_ocean";
  MinecraftBiomeTypes2["LukewarmOcean"] = "minecraft:lukewarm_ocean";
  MinecraftBiomeTypes2["LushCaves"] = "minecraft:lush_caves";
  MinecraftBiomeTypes2["MangroveSwamp"] = "minecraft:mangrove_swamp";
  MinecraftBiomeTypes2["Meadow"] = "minecraft:meadow";
  MinecraftBiomeTypes2["MegaTaiga"] = "minecraft:mega_taiga";
  MinecraftBiomeTypes2["MegaTaigaHills"] = "minecraft:mega_taiga_hills";
  MinecraftBiomeTypes2["Mesa"] = "minecraft:mesa";
  MinecraftBiomeTypes2["MesaBryce"] = "minecraft:mesa_bryce";
  MinecraftBiomeTypes2["MesaPlateau"] = "minecraft:mesa_plateau";
  MinecraftBiomeTypes2["MesaPlateauMutated"] = "minecraft:mesa_plateau_mutated";
  MinecraftBiomeTypes2["MesaPlateauStone"] = "minecraft:mesa_plateau_stone";
  MinecraftBiomeTypes2["MesaPlateauStoneMutated"] = "minecraft:mesa_plateau_stone_mutated";
  MinecraftBiomeTypes2["MushroomIsland"] = "minecraft:mushroom_island";
  MinecraftBiomeTypes2["MushroomIslandShore"] = "minecraft:mushroom_island_shore";
  MinecraftBiomeTypes2["Ocean"] = "minecraft:ocean";
  MinecraftBiomeTypes2["PaleGarden"] = "minecraft:pale_garden";
  MinecraftBiomeTypes2["Plains"] = "minecraft:plains";
  MinecraftBiomeTypes2["RedwoodTaigaHillsMutated"] = "minecraft:redwood_taiga_hills_mutated";
  MinecraftBiomeTypes2["RedwoodTaigaMutated"] = "minecraft:redwood_taiga_mutated";
  MinecraftBiomeTypes2["River"] = "minecraft:river";
  MinecraftBiomeTypes2["RoofedForest"] = "minecraft:roofed_forest";
  MinecraftBiomeTypes2["RoofedForestMutated"] = "minecraft:roofed_forest_mutated";
  MinecraftBiomeTypes2["Savanna"] = "minecraft:savanna";
  MinecraftBiomeTypes2["SavannaMutated"] = "minecraft:savanna_mutated";
  MinecraftBiomeTypes2["SavannaPlateau"] = "minecraft:savanna_plateau";
  MinecraftBiomeTypes2["SavannaPlateauMutated"] = "minecraft:savanna_plateau_mutated";
  MinecraftBiomeTypes2["SnowySlopes"] = "minecraft:snowy_slopes";
  MinecraftBiomeTypes2["SoulsandValley"] = "minecraft:soulsand_valley";
  MinecraftBiomeTypes2["StoneBeach"] = "minecraft:stone_beach";
  MinecraftBiomeTypes2["StonyPeaks"] = "minecraft:stony_peaks";
  MinecraftBiomeTypes2["SunflowerPlains"] = "minecraft:sunflower_plains";
  MinecraftBiomeTypes2["Swampland"] = "minecraft:swampland";
  MinecraftBiomeTypes2["SwamplandMutated"] = "minecraft:swampland_mutated";
  MinecraftBiomeTypes2["Taiga"] = "minecraft:taiga";
  MinecraftBiomeTypes2["TaigaHills"] = "minecraft:taiga_hills";
  MinecraftBiomeTypes2["TaigaMutated"] = "minecraft:taiga_mutated";
  MinecraftBiomeTypes2["TheEnd"] = "minecraft:the_end";
  MinecraftBiomeTypes2["WarmOcean"] = "minecraft:warm_ocean";
  MinecraftBiomeTypes2["WarpedForest"] = "minecraft:warped_forest";
  return MinecraftBiomeTypes2;
})(MinecraftBiomeTypes || {});
var MinecraftBlockTypes = ((MinecraftBlockTypes2) => {
  MinecraftBlockTypes2["AcaciaButton"] = "minecraft:acacia_button";
  MinecraftBlockTypes2["AcaciaDoor"] = "minecraft:acacia_door";
  MinecraftBlockTypes2["AcaciaDoubleSlab"] = "minecraft:acacia_double_slab";
  MinecraftBlockTypes2["AcaciaFence"] = "minecraft:acacia_fence";
  MinecraftBlockTypes2["AcaciaFenceGate"] = "minecraft:acacia_fence_gate";
  MinecraftBlockTypes2["AcaciaHangingSign"] = "minecraft:acacia_hanging_sign";
  MinecraftBlockTypes2["AcaciaLeaves"] = "minecraft:acacia_leaves";
  MinecraftBlockTypes2["AcaciaLog"] = "minecraft:acacia_log";
  MinecraftBlockTypes2["AcaciaPlanks"] = "minecraft:acacia_planks";
  MinecraftBlockTypes2["AcaciaPressurePlate"] = "minecraft:acacia_pressure_plate";
  MinecraftBlockTypes2["AcaciaSapling"] = "minecraft:acacia_sapling";
  MinecraftBlockTypes2["AcaciaSlab"] = "minecraft:acacia_slab";
  MinecraftBlockTypes2["AcaciaStairs"] = "minecraft:acacia_stairs";
  MinecraftBlockTypes2["AcaciaStandingSign"] = "minecraft:acacia_standing_sign";
  MinecraftBlockTypes2["AcaciaTrapdoor"] = "minecraft:acacia_trapdoor";
  MinecraftBlockTypes2["AcaciaWallSign"] = "minecraft:acacia_wall_sign";
  MinecraftBlockTypes2["AcaciaWood"] = "minecraft:acacia_wood";
  MinecraftBlockTypes2["ActivatorRail"] = "minecraft:activator_rail";
  MinecraftBlockTypes2["Air"] = "minecraft:air";
  MinecraftBlockTypes2["Allium"] = "minecraft:allium";
  MinecraftBlockTypes2["Allow"] = "minecraft:allow";
  MinecraftBlockTypes2["AmethystBlock"] = "minecraft:amethyst_block";
  MinecraftBlockTypes2["AmethystCluster"] = "minecraft:amethyst_cluster";
  MinecraftBlockTypes2["AncientDebris"] = "minecraft:ancient_debris";
  MinecraftBlockTypes2["Andesite"] = "minecraft:andesite";
  MinecraftBlockTypes2["AndesiteDoubleSlab"] = "minecraft:andesite_double_slab";
  MinecraftBlockTypes2["AndesiteSlab"] = "minecraft:andesite_slab";
  MinecraftBlockTypes2["AndesiteStairs"] = "minecraft:andesite_stairs";
  MinecraftBlockTypes2["AndesiteWall"] = "minecraft:andesite_wall";
  MinecraftBlockTypes2["Anvil"] = "minecraft:anvil";
  MinecraftBlockTypes2["Azalea"] = "minecraft:azalea";
  MinecraftBlockTypes2["AzaleaLeaves"] = "minecraft:azalea_leaves";
  MinecraftBlockTypes2["AzaleaLeavesFlowered"] = "minecraft:azalea_leaves_flowered";
  MinecraftBlockTypes2["AzureBluet"] = "minecraft:azure_bluet";
  MinecraftBlockTypes2["Bamboo"] = "minecraft:bamboo";
  MinecraftBlockTypes2["BambooBlock"] = "minecraft:bamboo_block";
  MinecraftBlockTypes2["BambooButton"] = "minecraft:bamboo_button";
  MinecraftBlockTypes2["BambooDoor"] = "minecraft:bamboo_door";
  MinecraftBlockTypes2["BambooDoubleSlab"] = "minecraft:bamboo_double_slab";
  MinecraftBlockTypes2["BambooFence"] = "minecraft:bamboo_fence";
  MinecraftBlockTypes2["BambooFenceGate"] = "minecraft:bamboo_fence_gate";
  MinecraftBlockTypes2["BambooHangingSign"] = "minecraft:bamboo_hanging_sign";
  MinecraftBlockTypes2["BambooMosaic"] = "minecraft:bamboo_mosaic";
  MinecraftBlockTypes2["BambooMosaicDoubleSlab"] = "minecraft:bamboo_mosaic_double_slab";
  MinecraftBlockTypes2["BambooMosaicSlab"] = "minecraft:bamboo_mosaic_slab";
  MinecraftBlockTypes2["BambooMosaicStairs"] = "minecraft:bamboo_mosaic_stairs";
  MinecraftBlockTypes2["BambooPlanks"] = "minecraft:bamboo_planks";
  MinecraftBlockTypes2["BambooPressurePlate"] = "minecraft:bamboo_pressure_plate";
  MinecraftBlockTypes2["BambooSapling"] = "minecraft:bamboo_sapling";
  MinecraftBlockTypes2["BambooSlab"] = "minecraft:bamboo_slab";
  MinecraftBlockTypes2["BambooStairs"] = "minecraft:bamboo_stairs";
  MinecraftBlockTypes2["BambooStandingSign"] = "minecraft:bamboo_standing_sign";
  MinecraftBlockTypes2["BambooTrapdoor"] = "minecraft:bamboo_trapdoor";
  MinecraftBlockTypes2["BambooWallSign"] = "minecraft:bamboo_wall_sign";
  MinecraftBlockTypes2["Barrel"] = "minecraft:barrel";
  MinecraftBlockTypes2["Barrier"] = "minecraft:barrier";
  MinecraftBlockTypes2["Basalt"] = "minecraft:basalt";
  MinecraftBlockTypes2["Beacon"] = "minecraft:beacon";
  MinecraftBlockTypes2["Bed"] = "minecraft:bed";
  MinecraftBlockTypes2["Bedrock"] = "minecraft:bedrock";
  MinecraftBlockTypes2["BeeNest"] = "minecraft:bee_nest";
  MinecraftBlockTypes2["Beehive"] = "minecraft:beehive";
  MinecraftBlockTypes2["Beetroot"] = "minecraft:beetroot";
  MinecraftBlockTypes2["Bell"] = "minecraft:bell";
  MinecraftBlockTypes2["BigDripleaf"] = "minecraft:big_dripleaf";
  MinecraftBlockTypes2["BirchButton"] = "minecraft:birch_button";
  MinecraftBlockTypes2["BirchDoor"] = "minecraft:birch_door";
  MinecraftBlockTypes2["BirchDoubleSlab"] = "minecraft:birch_double_slab";
  MinecraftBlockTypes2["BirchFence"] = "minecraft:birch_fence";
  MinecraftBlockTypes2["BirchFenceGate"] = "minecraft:birch_fence_gate";
  MinecraftBlockTypes2["BirchHangingSign"] = "minecraft:birch_hanging_sign";
  MinecraftBlockTypes2["BirchLeaves"] = "minecraft:birch_leaves";
  MinecraftBlockTypes2["BirchLog"] = "minecraft:birch_log";
  MinecraftBlockTypes2["BirchPlanks"] = "minecraft:birch_planks";
  MinecraftBlockTypes2["BirchPressurePlate"] = "minecraft:birch_pressure_plate";
  MinecraftBlockTypes2["BirchSapling"] = "minecraft:birch_sapling";
  MinecraftBlockTypes2["BirchSlab"] = "minecraft:birch_slab";
  MinecraftBlockTypes2["BirchStairs"] = "minecraft:birch_stairs";
  MinecraftBlockTypes2["BirchStandingSign"] = "minecraft:birch_standing_sign";
  MinecraftBlockTypes2["BirchTrapdoor"] = "minecraft:birch_trapdoor";
  MinecraftBlockTypes2["BirchWallSign"] = "minecraft:birch_wall_sign";
  MinecraftBlockTypes2["BirchWood"] = "minecraft:birch_wood";
  MinecraftBlockTypes2["BlackCandle"] = "minecraft:black_candle";
  MinecraftBlockTypes2["BlackCandleCake"] = "minecraft:black_candle_cake";
  MinecraftBlockTypes2["BlackCarpet"] = "minecraft:black_carpet";
  MinecraftBlockTypes2["BlackConcrete"] = "minecraft:black_concrete";
  MinecraftBlockTypes2["BlackConcretePowder"] = "minecraft:black_concrete_powder";
  MinecraftBlockTypes2["BlackGlazedTerracotta"] = "minecraft:black_glazed_terracotta";
  MinecraftBlockTypes2["BlackShulkerBox"] = "minecraft:black_shulker_box";
  MinecraftBlockTypes2["BlackStainedGlass"] = "minecraft:black_stained_glass";
  MinecraftBlockTypes2["BlackStainedGlassPane"] = "minecraft:black_stained_glass_pane";
  MinecraftBlockTypes2["BlackTerracotta"] = "minecraft:black_terracotta";
  MinecraftBlockTypes2["BlackWool"] = "minecraft:black_wool";
  MinecraftBlockTypes2["Blackstone"] = "minecraft:blackstone";
  MinecraftBlockTypes2["BlackstoneDoubleSlab"] = "minecraft:blackstone_double_slab";
  MinecraftBlockTypes2["BlackstoneSlab"] = "minecraft:blackstone_slab";
  MinecraftBlockTypes2["BlackstoneStairs"] = "minecraft:blackstone_stairs";
  MinecraftBlockTypes2["BlackstoneWall"] = "minecraft:blackstone_wall";
  MinecraftBlockTypes2["BlastFurnace"] = "minecraft:blast_furnace";
  MinecraftBlockTypes2["BlueCandle"] = "minecraft:blue_candle";
  MinecraftBlockTypes2["BlueCandleCake"] = "minecraft:blue_candle_cake";
  MinecraftBlockTypes2["BlueCarpet"] = "minecraft:blue_carpet";
  MinecraftBlockTypes2["BlueConcrete"] = "minecraft:blue_concrete";
  MinecraftBlockTypes2["BlueConcretePowder"] = "minecraft:blue_concrete_powder";
  MinecraftBlockTypes2["BlueGlazedTerracotta"] = "minecraft:blue_glazed_terracotta";
  MinecraftBlockTypes2["BlueIce"] = "minecraft:blue_ice";
  MinecraftBlockTypes2["BlueOrchid"] = "minecraft:blue_orchid";
  MinecraftBlockTypes2["BlueShulkerBox"] = "minecraft:blue_shulker_box";
  MinecraftBlockTypes2["BlueStainedGlass"] = "minecraft:blue_stained_glass";
  MinecraftBlockTypes2["BlueStainedGlassPane"] = "minecraft:blue_stained_glass_pane";
  MinecraftBlockTypes2["BlueTerracotta"] = "minecraft:blue_terracotta";
  MinecraftBlockTypes2["BlueWool"] = "minecraft:blue_wool";
  MinecraftBlockTypes2["BoneBlock"] = "minecraft:bone_block";
  MinecraftBlockTypes2["Bookshelf"] = "minecraft:bookshelf";
  MinecraftBlockTypes2["BorderBlock"] = "minecraft:border_block";
  MinecraftBlockTypes2["BrainCoral"] = "minecraft:brain_coral";
  MinecraftBlockTypes2["BrainCoralBlock"] = "minecraft:brain_coral_block";
  MinecraftBlockTypes2["BrainCoralFan"] = "minecraft:brain_coral_fan";
  MinecraftBlockTypes2["BrainCoralWallFan"] = "minecraft:brain_coral_wall_fan";
  MinecraftBlockTypes2["BrewingStand"] = "minecraft:brewing_stand";
  MinecraftBlockTypes2["BrickBlock"] = "minecraft:brick_block";
  MinecraftBlockTypes2["BrickDoubleSlab"] = "minecraft:brick_double_slab";
  MinecraftBlockTypes2["BrickSlab"] = "minecraft:brick_slab";
  MinecraftBlockTypes2["BrickStairs"] = "minecraft:brick_stairs";
  MinecraftBlockTypes2["BrickWall"] = "minecraft:brick_wall";
  MinecraftBlockTypes2["BrownCandle"] = "minecraft:brown_candle";
  MinecraftBlockTypes2["BrownCandleCake"] = "minecraft:brown_candle_cake";
  MinecraftBlockTypes2["BrownCarpet"] = "minecraft:brown_carpet";
  MinecraftBlockTypes2["BrownConcrete"] = "minecraft:brown_concrete";
  MinecraftBlockTypes2["BrownConcretePowder"] = "minecraft:brown_concrete_powder";
  MinecraftBlockTypes2["BrownGlazedTerracotta"] = "minecraft:brown_glazed_terracotta";
  MinecraftBlockTypes2["BrownMushroom"] = "minecraft:brown_mushroom";
  MinecraftBlockTypes2["BrownMushroomBlock"] = "minecraft:brown_mushroom_block";
  MinecraftBlockTypes2["BrownShulkerBox"] = "minecraft:brown_shulker_box";
  MinecraftBlockTypes2["BrownStainedGlass"] = "minecraft:brown_stained_glass";
  MinecraftBlockTypes2["BrownStainedGlassPane"] = "minecraft:brown_stained_glass_pane";
  MinecraftBlockTypes2["BrownTerracotta"] = "minecraft:brown_terracotta";
  MinecraftBlockTypes2["BrownWool"] = "minecraft:brown_wool";
  MinecraftBlockTypes2["BubbleColumn"] = "minecraft:bubble_column";
  MinecraftBlockTypes2["BubbleCoral"] = "minecraft:bubble_coral";
  MinecraftBlockTypes2["BubbleCoralBlock"] = "minecraft:bubble_coral_block";
  MinecraftBlockTypes2["BubbleCoralFan"] = "minecraft:bubble_coral_fan";
  MinecraftBlockTypes2["BubbleCoralWallFan"] = "minecraft:bubble_coral_wall_fan";
  MinecraftBlockTypes2["BuddingAmethyst"] = "minecraft:budding_amethyst";
  MinecraftBlockTypes2["Cactus"] = "minecraft:cactus";
  MinecraftBlockTypes2["Cake"] = "minecraft:cake";
  MinecraftBlockTypes2["Calcite"] = "minecraft:calcite";
  MinecraftBlockTypes2["CalibratedSculkSensor"] = "minecraft:calibrated_sculk_sensor";
  MinecraftBlockTypes2["Camera"] = "minecraft:camera";
  MinecraftBlockTypes2["Campfire"] = "minecraft:campfire";
  MinecraftBlockTypes2["Candle"] = "minecraft:candle";
  MinecraftBlockTypes2["CandleCake"] = "minecraft:candle_cake";
  MinecraftBlockTypes2["Carrots"] = "minecraft:carrots";
  MinecraftBlockTypes2["CartographyTable"] = "minecraft:cartography_table";
  MinecraftBlockTypes2["CarvedPumpkin"] = "minecraft:carved_pumpkin";
  MinecraftBlockTypes2["Cauldron"] = "minecraft:cauldron";
  MinecraftBlockTypes2["CaveVines"] = "minecraft:cave_vines";
  MinecraftBlockTypes2["CaveVinesBodyWithBerries"] = "minecraft:cave_vines_body_with_berries";
  MinecraftBlockTypes2["CaveVinesHeadWithBerries"] = "minecraft:cave_vines_head_with_berries";
  MinecraftBlockTypes2["Chain"] = "minecraft:chain";
  MinecraftBlockTypes2["ChainCommandBlock"] = "minecraft:chain_command_block";
  MinecraftBlockTypes2["ChemicalHeat"] = "minecraft:chemical_heat";
  MinecraftBlockTypes2["CherryButton"] = "minecraft:cherry_button";
  MinecraftBlockTypes2["CherryDoor"] = "minecraft:cherry_door";
  MinecraftBlockTypes2["CherryDoubleSlab"] = "minecraft:cherry_double_slab";
  MinecraftBlockTypes2["CherryFence"] = "minecraft:cherry_fence";
  MinecraftBlockTypes2["CherryFenceGate"] = "minecraft:cherry_fence_gate";
  MinecraftBlockTypes2["CherryHangingSign"] = "minecraft:cherry_hanging_sign";
  MinecraftBlockTypes2["CherryLeaves"] = "minecraft:cherry_leaves";
  MinecraftBlockTypes2["CherryLog"] = "minecraft:cherry_log";
  MinecraftBlockTypes2["CherryPlanks"] = "minecraft:cherry_planks";
  MinecraftBlockTypes2["CherryPressurePlate"] = "minecraft:cherry_pressure_plate";
  MinecraftBlockTypes2["CherrySapling"] = "minecraft:cherry_sapling";
  MinecraftBlockTypes2["CherrySlab"] = "minecraft:cherry_slab";
  MinecraftBlockTypes2["CherryStairs"] = "minecraft:cherry_stairs";
  MinecraftBlockTypes2["CherryStandingSign"] = "minecraft:cherry_standing_sign";
  MinecraftBlockTypes2["CherryTrapdoor"] = "minecraft:cherry_trapdoor";
  MinecraftBlockTypes2["CherryWallSign"] = "minecraft:cherry_wall_sign";
  MinecraftBlockTypes2["CherryWood"] = "minecraft:cherry_wood";
  MinecraftBlockTypes2["Chest"] = "minecraft:chest";
  MinecraftBlockTypes2["ChippedAnvil"] = "minecraft:chipped_anvil";
  MinecraftBlockTypes2["ChiseledBookshelf"] = "minecraft:chiseled_bookshelf";
  MinecraftBlockTypes2["ChiseledCopper"] = "minecraft:chiseled_copper";
  MinecraftBlockTypes2["ChiseledDeepslate"] = "minecraft:chiseled_deepslate";
  MinecraftBlockTypes2["ChiseledNetherBricks"] = "minecraft:chiseled_nether_bricks";
  MinecraftBlockTypes2["ChiseledPolishedBlackstone"] = "minecraft:chiseled_polished_blackstone";
  MinecraftBlockTypes2["ChiseledQuartzBlock"] = "minecraft:chiseled_quartz_block";
  MinecraftBlockTypes2["ChiseledRedSandstone"] = "minecraft:chiseled_red_sandstone";
  MinecraftBlockTypes2["ChiseledResinBricks"] = "minecraft:chiseled_resin_bricks";
  MinecraftBlockTypes2["ChiseledSandstone"] = "minecraft:chiseled_sandstone";
  MinecraftBlockTypes2["ChiseledStoneBricks"] = "minecraft:chiseled_stone_bricks";
  MinecraftBlockTypes2["ChiseledTuff"] = "minecraft:chiseled_tuff";
  MinecraftBlockTypes2["ChiseledTuffBricks"] = "minecraft:chiseled_tuff_bricks";
  MinecraftBlockTypes2["ChorusFlower"] = "minecraft:chorus_flower";
  MinecraftBlockTypes2["ChorusPlant"] = "minecraft:chorus_plant";
  MinecraftBlockTypes2["Clay"] = "minecraft:clay";
  MinecraftBlockTypes2["ClosedEyeblossom"] = "minecraft:closed_eyeblossom";
  MinecraftBlockTypes2["CoalBlock"] = "minecraft:coal_block";
  MinecraftBlockTypes2["CoalOre"] = "minecraft:coal_ore";
  MinecraftBlockTypes2["CoarseDirt"] = "minecraft:coarse_dirt";
  MinecraftBlockTypes2["CobbledDeepslate"] = "minecraft:cobbled_deepslate";
  MinecraftBlockTypes2["CobbledDeepslateDoubleSlab"] = "minecraft:cobbled_deepslate_double_slab";
  MinecraftBlockTypes2["CobbledDeepslateSlab"] = "minecraft:cobbled_deepslate_slab";
  MinecraftBlockTypes2["CobbledDeepslateStairs"] = "minecraft:cobbled_deepslate_stairs";
  MinecraftBlockTypes2["CobbledDeepslateWall"] = "minecraft:cobbled_deepslate_wall";
  MinecraftBlockTypes2["Cobblestone"] = "minecraft:cobblestone";
  MinecraftBlockTypes2["CobblestoneDoubleSlab"] = "minecraft:cobblestone_double_slab";
  MinecraftBlockTypes2["CobblestoneSlab"] = "minecraft:cobblestone_slab";
  MinecraftBlockTypes2["CobblestoneWall"] = "minecraft:cobblestone_wall";
  MinecraftBlockTypes2["Cocoa"] = "minecraft:cocoa";
  MinecraftBlockTypes2["ColoredTorchBlue"] = "minecraft:colored_torch_blue";
  MinecraftBlockTypes2["ColoredTorchGreen"] = "minecraft:colored_torch_green";
  MinecraftBlockTypes2["ColoredTorchPurple"] = "minecraft:colored_torch_purple";
  MinecraftBlockTypes2["ColoredTorchRed"] = "minecraft:colored_torch_red";
  MinecraftBlockTypes2["CommandBlock"] = "minecraft:command_block";
  MinecraftBlockTypes2["Composter"] = "minecraft:composter";
  MinecraftBlockTypes2["CompoundCreator"] = "minecraft:compound_creator";
  MinecraftBlockTypes2["Conduit"] = "minecraft:conduit";
  MinecraftBlockTypes2["CopperBlock"] = "minecraft:copper_block";
  MinecraftBlockTypes2["CopperBulb"] = "minecraft:copper_bulb";
  MinecraftBlockTypes2["CopperDoor"] = "minecraft:copper_door";
  MinecraftBlockTypes2["CopperGrate"] = "minecraft:copper_grate";
  MinecraftBlockTypes2["CopperOre"] = "minecraft:copper_ore";
  MinecraftBlockTypes2["CopperTrapdoor"] = "minecraft:copper_trapdoor";
  MinecraftBlockTypes2["Cornflower"] = "minecraft:cornflower";
  MinecraftBlockTypes2["CrackedDeepslateBricks"] = "minecraft:cracked_deepslate_bricks";
  MinecraftBlockTypes2["CrackedDeepslateTiles"] = "minecraft:cracked_deepslate_tiles";
  MinecraftBlockTypes2["CrackedNetherBricks"] = "minecraft:cracked_nether_bricks";
  MinecraftBlockTypes2["CrackedPolishedBlackstoneBricks"] = "minecraft:cracked_polished_blackstone_bricks";
  MinecraftBlockTypes2["CrackedStoneBricks"] = "minecraft:cracked_stone_bricks";
  MinecraftBlockTypes2["Crafter"] = "minecraft:crafter";
  MinecraftBlockTypes2["CraftingTable"] = "minecraft:crafting_table";
  MinecraftBlockTypes2["CreakingHeart"] = "minecraft:creaking_heart";
  MinecraftBlockTypes2["CreeperHead"] = "minecraft:creeper_head";
  MinecraftBlockTypes2["CrimsonButton"] = "minecraft:crimson_button";
  MinecraftBlockTypes2["CrimsonDoor"] = "minecraft:crimson_door";
  MinecraftBlockTypes2["CrimsonDoubleSlab"] = "minecraft:crimson_double_slab";
  MinecraftBlockTypes2["CrimsonFence"] = "minecraft:crimson_fence";
  MinecraftBlockTypes2["CrimsonFenceGate"] = "minecraft:crimson_fence_gate";
  MinecraftBlockTypes2["CrimsonFungus"] = "minecraft:crimson_fungus";
  MinecraftBlockTypes2["CrimsonHangingSign"] = "minecraft:crimson_hanging_sign";
  MinecraftBlockTypes2["CrimsonHyphae"] = "minecraft:crimson_hyphae";
  MinecraftBlockTypes2["CrimsonNylium"] = "minecraft:crimson_nylium";
  MinecraftBlockTypes2["CrimsonPlanks"] = "minecraft:crimson_planks";
  MinecraftBlockTypes2["CrimsonPressurePlate"] = "minecraft:crimson_pressure_plate";
  MinecraftBlockTypes2["CrimsonRoots"] = "minecraft:crimson_roots";
  MinecraftBlockTypes2["CrimsonSlab"] = "minecraft:crimson_slab";
  MinecraftBlockTypes2["CrimsonStairs"] = "minecraft:crimson_stairs";
  MinecraftBlockTypes2["CrimsonStandingSign"] = "minecraft:crimson_standing_sign";
  MinecraftBlockTypes2["CrimsonStem"] = "minecraft:crimson_stem";
  MinecraftBlockTypes2["CrimsonTrapdoor"] = "minecraft:crimson_trapdoor";
  MinecraftBlockTypes2["CrimsonWallSign"] = "minecraft:crimson_wall_sign";
  MinecraftBlockTypes2["CryingObsidian"] = "minecraft:crying_obsidian";
  MinecraftBlockTypes2["CutCopper"] = "minecraft:cut_copper";
  MinecraftBlockTypes2["CutCopperSlab"] = "minecraft:cut_copper_slab";
  MinecraftBlockTypes2["CutCopperStairs"] = "minecraft:cut_copper_stairs";
  MinecraftBlockTypes2["CutRedSandstone"] = "minecraft:cut_red_sandstone";
  MinecraftBlockTypes2["CutRedSandstoneDoubleSlab"] = "minecraft:cut_red_sandstone_double_slab";
  MinecraftBlockTypes2["CutRedSandstoneSlab"] = "minecraft:cut_red_sandstone_slab";
  MinecraftBlockTypes2["CutSandstone"] = "minecraft:cut_sandstone";
  MinecraftBlockTypes2["CutSandstoneDoubleSlab"] = "minecraft:cut_sandstone_double_slab";
  MinecraftBlockTypes2["CutSandstoneSlab"] = "minecraft:cut_sandstone_slab";
  MinecraftBlockTypes2["CyanCandle"] = "minecraft:cyan_candle";
  MinecraftBlockTypes2["CyanCandleCake"] = "minecraft:cyan_candle_cake";
  MinecraftBlockTypes2["CyanCarpet"] = "minecraft:cyan_carpet";
  MinecraftBlockTypes2["CyanConcrete"] = "minecraft:cyan_concrete";
  MinecraftBlockTypes2["CyanConcretePowder"] = "minecraft:cyan_concrete_powder";
  MinecraftBlockTypes2["CyanGlazedTerracotta"] = "minecraft:cyan_glazed_terracotta";
  MinecraftBlockTypes2["CyanShulkerBox"] = "minecraft:cyan_shulker_box";
  MinecraftBlockTypes2["CyanStainedGlass"] = "minecraft:cyan_stained_glass";
  MinecraftBlockTypes2["CyanStainedGlassPane"] = "minecraft:cyan_stained_glass_pane";
  MinecraftBlockTypes2["CyanTerracotta"] = "minecraft:cyan_terracotta";
  MinecraftBlockTypes2["CyanWool"] = "minecraft:cyan_wool";
  MinecraftBlockTypes2["DamagedAnvil"] = "minecraft:damaged_anvil";
  MinecraftBlockTypes2["Dandelion"] = "minecraft:dandelion";
  MinecraftBlockTypes2["DarkOakButton"] = "minecraft:dark_oak_button";
  MinecraftBlockTypes2["DarkOakDoor"] = "minecraft:dark_oak_door";
  MinecraftBlockTypes2["DarkOakDoubleSlab"] = "minecraft:dark_oak_double_slab";
  MinecraftBlockTypes2["DarkOakFence"] = "minecraft:dark_oak_fence";
  MinecraftBlockTypes2["DarkOakFenceGate"] = "minecraft:dark_oak_fence_gate";
  MinecraftBlockTypes2["DarkOakHangingSign"] = "minecraft:dark_oak_hanging_sign";
  MinecraftBlockTypes2["DarkOakLeaves"] = "minecraft:dark_oak_leaves";
  MinecraftBlockTypes2["DarkOakLog"] = "minecraft:dark_oak_log";
  MinecraftBlockTypes2["DarkOakPlanks"] = "minecraft:dark_oak_planks";
  MinecraftBlockTypes2["DarkOakPressurePlate"] = "minecraft:dark_oak_pressure_plate";
  MinecraftBlockTypes2["DarkOakSapling"] = "minecraft:dark_oak_sapling";
  MinecraftBlockTypes2["DarkOakSlab"] = "minecraft:dark_oak_slab";
  MinecraftBlockTypes2["DarkOakStairs"] = "minecraft:dark_oak_stairs";
  MinecraftBlockTypes2["DarkOakTrapdoor"] = "minecraft:dark_oak_trapdoor";
  MinecraftBlockTypes2["DarkOakWood"] = "minecraft:dark_oak_wood";
  MinecraftBlockTypes2["DarkPrismarine"] = "minecraft:dark_prismarine";
  MinecraftBlockTypes2["DarkPrismarineDoubleSlab"] = "minecraft:dark_prismarine_double_slab";
  MinecraftBlockTypes2["DarkPrismarineSlab"] = "minecraft:dark_prismarine_slab";
  MinecraftBlockTypes2["DarkPrismarineStairs"] = "minecraft:dark_prismarine_stairs";
  MinecraftBlockTypes2["DarkoakStandingSign"] = "minecraft:darkoak_standing_sign";
  MinecraftBlockTypes2["DarkoakWallSign"] = "minecraft:darkoak_wall_sign";
  MinecraftBlockTypes2["DaylightDetector"] = "minecraft:daylight_detector";
  MinecraftBlockTypes2["DaylightDetectorInverted"] = "minecraft:daylight_detector_inverted";
  MinecraftBlockTypes2["DeadBrainCoral"] = "minecraft:dead_brain_coral";
  MinecraftBlockTypes2["DeadBrainCoralBlock"] = "minecraft:dead_brain_coral_block";
  MinecraftBlockTypes2["DeadBrainCoralFan"] = "minecraft:dead_brain_coral_fan";
  MinecraftBlockTypes2["DeadBrainCoralWallFan"] = "minecraft:dead_brain_coral_wall_fan";
  MinecraftBlockTypes2["DeadBubbleCoral"] = "minecraft:dead_bubble_coral";
  MinecraftBlockTypes2["DeadBubbleCoralBlock"] = "minecraft:dead_bubble_coral_block";
  MinecraftBlockTypes2["DeadBubbleCoralFan"] = "minecraft:dead_bubble_coral_fan";
  MinecraftBlockTypes2["DeadBubbleCoralWallFan"] = "minecraft:dead_bubble_coral_wall_fan";
  MinecraftBlockTypes2["DeadFireCoral"] = "minecraft:dead_fire_coral";
  MinecraftBlockTypes2["DeadFireCoralBlock"] = "minecraft:dead_fire_coral_block";
  MinecraftBlockTypes2["DeadFireCoralFan"] = "minecraft:dead_fire_coral_fan";
  MinecraftBlockTypes2["DeadFireCoralWallFan"] = "minecraft:dead_fire_coral_wall_fan";
  MinecraftBlockTypes2["DeadHornCoral"] = "minecraft:dead_horn_coral";
  MinecraftBlockTypes2["DeadHornCoralBlock"] = "minecraft:dead_horn_coral_block";
  MinecraftBlockTypes2["DeadHornCoralFan"] = "minecraft:dead_horn_coral_fan";
  MinecraftBlockTypes2["DeadHornCoralWallFan"] = "minecraft:dead_horn_coral_wall_fan";
  MinecraftBlockTypes2["DeadTubeCoral"] = "minecraft:dead_tube_coral";
  MinecraftBlockTypes2["DeadTubeCoralBlock"] = "minecraft:dead_tube_coral_block";
  MinecraftBlockTypes2["DeadTubeCoralFan"] = "minecraft:dead_tube_coral_fan";
  MinecraftBlockTypes2["DeadTubeCoralWallFan"] = "minecraft:dead_tube_coral_wall_fan";
  MinecraftBlockTypes2["Deadbush"] = "minecraft:deadbush";
  MinecraftBlockTypes2["DecoratedPot"] = "minecraft:decorated_pot";
  MinecraftBlockTypes2["Deepslate"] = "minecraft:deepslate";
  MinecraftBlockTypes2["DeepslateBrickDoubleSlab"] = "minecraft:deepslate_brick_double_slab";
  MinecraftBlockTypes2["DeepslateBrickSlab"] = "minecraft:deepslate_brick_slab";
  MinecraftBlockTypes2["DeepslateBrickStairs"] = "minecraft:deepslate_brick_stairs";
  MinecraftBlockTypes2["DeepslateBrickWall"] = "minecraft:deepslate_brick_wall";
  MinecraftBlockTypes2["DeepslateBricks"] = "minecraft:deepslate_bricks";
  MinecraftBlockTypes2["DeepslateCoalOre"] = "minecraft:deepslate_coal_ore";
  MinecraftBlockTypes2["DeepslateCopperOre"] = "minecraft:deepslate_copper_ore";
  MinecraftBlockTypes2["DeepslateDiamondOre"] = "minecraft:deepslate_diamond_ore";
  MinecraftBlockTypes2["DeepslateEmeraldOre"] = "minecraft:deepslate_emerald_ore";
  MinecraftBlockTypes2["DeepslateGoldOre"] = "minecraft:deepslate_gold_ore";
  MinecraftBlockTypes2["DeepslateIronOre"] = "minecraft:deepslate_iron_ore";
  MinecraftBlockTypes2["DeepslateLapisOre"] = "minecraft:deepslate_lapis_ore";
  MinecraftBlockTypes2["DeepslateRedstoneOre"] = "minecraft:deepslate_redstone_ore";
  MinecraftBlockTypes2["DeepslateTileDoubleSlab"] = "minecraft:deepslate_tile_double_slab";
  MinecraftBlockTypes2["DeepslateTileSlab"] = "minecraft:deepslate_tile_slab";
  MinecraftBlockTypes2["DeepslateTileStairs"] = "minecraft:deepslate_tile_stairs";
  MinecraftBlockTypes2["DeepslateTileWall"] = "minecraft:deepslate_tile_wall";
  MinecraftBlockTypes2["DeepslateTiles"] = "minecraft:deepslate_tiles";
  MinecraftBlockTypes2["Deny"] = "minecraft:deny";
  MinecraftBlockTypes2["DetectorRail"] = "minecraft:detector_rail";
  MinecraftBlockTypes2["DiamondBlock"] = "minecraft:diamond_block";
  MinecraftBlockTypes2["DiamondOre"] = "minecraft:diamond_ore";
  MinecraftBlockTypes2["Diorite"] = "minecraft:diorite";
  MinecraftBlockTypes2["DioriteDoubleSlab"] = "minecraft:diorite_double_slab";
  MinecraftBlockTypes2["DioriteSlab"] = "minecraft:diorite_slab";
  MinecraftBlockTypes2["DioriteStairs"] = "minecraft:diorite_stairs";
  MinecraftBlockTypes2["DioriteWall"] = "minecraft:diorite_wall";
  MinecraftBlockTypes2["Dirt"] = "minecraft:dirt";
  MinecraftBlockTypes2["DirtWithRoots"] = "minecraft:dirt_with_roots";
  MinecraftBlockTypes2["Dispenser"] = "minecraft:dispenser";
  MinecraftBlockTypes2["DoubleCutCopperSlab"] = "minecraft:double_cut_copper_slab";
  MinecraftBlockTypes2["DragonEgg"] = "minecraft:dragon_egg";
  MinecraftBlockTypes2["DragonHead"] = "minecraft:dragon_head";
  MinecraftBlockTypes2["DriedKelpBlock"] = "minecraft:dried_kelp_block";
  MinecraftBlockTypes2["DripstoneBlock"] = "minecraft:dripstone_block";
  MinecraftBlockTypes2["Dropper"] = "minecraft:dropper";
  MinecraftBlockTypes2["Element0"] = "minecraft:element_0";
  MinecraftBlockTypes2["Element1"] = "minecraft:element_1";
  MinecraftBlockTypes2["Element10"] = "minecraft:element_10";
  MinecraftBlockTypes2["Element100"] = "minecraft:element_100";
  MinecraftBlockTypes2["Element101"] = "minecraft:element_101";
  MinecraftBlockTypes2["Element102"] = "minecraft:element_102";
  MinecraftBlockTypes2["Element103"] = "minecraft:element_103";
  MinecraftBlockTypes2["Element104"] = "minecraft:element_104";
  MinecraftBlockTypes2["Element105"] = "minecraft:element_105";
  MinecraftBlockTypes2["Element106"] = "minecraft:element_106";
  MinecraftBlockTypes2["Element107"] = "minecraft:element_107";
  MinecraftBlockTypes2["Element108"] = "minecraft:element_108";
  MinecraftBlockTypes2["Element109"] = "minecraft:element_109";
  MinecraftBlockTypes2["Element11"] = "minecraft:element_11";
  MinecraftBlockTypes2["Element110"] = "minecraft:element_110";
  MinecraftBlockTypes2["Element111"] = "minecraft:element_111";
  MinecraftBlockTypes2["Element112"] = "minecraft:element_112";
  MinecraftBlockTypes2["Element113"] = "minecraft:element_113";
  MinecraftBlockTypes2["Element114"] = "minecraft:element_114";
  MinecraftBlockTypes2["Element115"] = "minecraft:element_115";
  MinecraftBlockTypes2["Element116"] = "minecraft:element_116";
  MinecraftBlockTypes2["Element117"] = "minecraft:element_117";
  MinecraftBlockTypes2["Element118"] = "minecraft:element_118";
  MinecraftBlockTypes2["Element12"] = "minecraft:element_12";
  MinecraftBlockTypes2["Element13"] = "minecraft:element_13";
  MinecraftBlockTypes2["Element14"] = "minecraft:element_14";
  MinecraftBlockTypes2["Element15"] = "minecraft:element_15";
  MinecraftBlockTypes2["Element16"] = "minecraft:element_16";
  MinecraftBlockTypes2["Element17"] = "minecraft:element_17";
  MinecraftBlockTypes2["Element18"] = "minecraft:element_18";
  MinecraftBlockTypes2["Element19"] = "minecraft:element_19";
  MinecraftBlockTypes2["Element2"] = "minecraft:element_2";
  MinecraftBlockTypes2["Element20"] = "minecraft:element_20";
  MinecraftBlockTypes2["Element21"] = "minecraft:element_21";
  MinecraftBlockTypes2["Element22"] = "minecraft:element_22";
  MinecraftBlockTypes2["Element23"] = "minecraft:element_23";
  MinecraftBlockTypes2["Element24"] = "minecraft:element_24";
  MinecraftBlockTypes2["Element25"] = "minecraft:element_25";
  MinecraftBlockTypes2["Element26"] = "minecraft:element_26";
  MinecraftBlockTypes2["Element27"] = "minecraft:element_27";
  MinecraftBlockTypes2["Element28"] = "minecraft:element_28";
  MinecraftBlockTypes2["Element29"] = "minecraft:element_29";
  MinecraftBlockTypes2["Element3"] = "minecraft:element_3";
  MinecraftBlockTypes2["Element30"] = "minecraft:element_30";
  MinecraftBlockTypes2["Element31"] = "minecraft:element_31";
  MinecraftBlockTypes2["Element32"] = "minecraft:element_32";
  MinecraftBlockTypes2["Element33"] = "minecraft:element_33";
  MinecraftBlockTypes2["Element34"] = "minecraft:element_34";
  MinecraftBlockTypes2["Element35"] = "minecraft:element_35";
  MinecraftBlockTypes2["Element36"] = "minecraft:element_36";
  MinecraftBlockTypes2["Element37"] = "minecraft:element_37";
  MinecraftBlockTypes2["Element38"] = "minecraft:element_38";
  MinecraftBlockTypes2["Element39"] = "minecraft:element_39";
  MinecraftBlockTypes2["Element4"] = "minecraft:element_4";
  MinecraftBlockTypes2["Element40"] = "minecraft:element_40";
  MinecraftBlockTypes2["Element41"] = "minecraft:element_41";
  MinecraftBlockTypes2["Element42"] = "minecraft:element_42";
  MinecraftBlockTypes2["Element43"] = "minecraft:element_43";
  MinecraftBlockTypes2["Element44"] = "minecraft:element_44";
  MinecraftBlockTypes2["Element45"] = "minecraft:element_45";
  MinecraftBlockTypes2["Element46"] = "minecraft:element_46";
  MinecraftBlockTypes2["Element47"] = "minecraft:element_47";
  MinecraftBlockTypes2["Element48"] = "minecraft:element_48";
  MinecraftBlockTypes2["Element49"] = "minecraft:element_49";
  MinecraftBlockTypes2["Element5"] = "minecraft:element_5";
  MinecraftBlockTypes2["Element50"] = "minecraft:element_50";
  MinecraftBlockTypes2["Element51"] = "minecraft:element_51";
  MinecraftBlockTypes2["Element52"] = "minecraft:element_52";
  MinecraftBlockTypes2["Element53"] = "minecraft:element_53";
  MinecraftBlockTypes2["Element54"] = "minecraft:element_54";
  MinecraftBlockTypes2["Element55"] = "minecraft:element_55";
  MinecraftBlockTypes2["Element56"] = "minecraft:element_56";
  MinecraftBlockTypes2["Element57"] = "minecraft:element_57";
  MinecraftBlockTypes2["Element58"] = "minecraft:element_58";
  MinecraftBlockTypes2["Element59"] = "minecraft:element_59";
  MinecraftBlockTypes2["Element6"] = "minecraft:element_6";
  MinecraftBlockTypes2["Element60"] = "minecraft:element_60";
  MinecraftBlockTypes2["Element61"] = "minecraft:element_61";
  MinecraftBlockTypes2["Element62"] = "minecraft:element_62";
  MinecraftBlockTypes2["Element63"] = "minecraft:element_63";
  MinecraftBlockTypes2["Element64"] = "minecraft:element_64";
  MinecraftBlockTypes2["Element65"] = "minecraft:element_65";
  MinecraftBlockTypes2["Element66"] = "minecraft:element_66";
  MinecraftBlockTypes2["Element67"] = "minecraft:element_67";
  MinecraftBlockTypes2["Element68"] = "minecraft:element_68";
  MinecraftBlockTypes2["Element69"] = "minecraft:element_69";
  MinecraftBlockTypes2["Element7"] = "minecraft:element_7";
  MinecraftBlockTypes2["Element70"] = "minecraft:element_70";
  MinecraftBlockTypes2["Element71"] = "minecraft:element_71";
  MinecraftBlockTypes2["Element72"] = "minecraft:element_72";
  MinecraftBlockTypes2["Element73"] = "minecraft:element_73";
  MinecraftBlockTypes2["Element74"] = "minecraft:element_74";
  MinecraftBlockTypes2["Element75"] = "minecraft:element_75";
  MinecraftBlockTypes2["Element76"] = "minecraft:element_76";
  MinecraftBlockTypes2["Element77"] = "minecraft:element_77";
  MinecraftBlockTypes2["Element78"] = "minecraft:element_78";
  MinecraftBlockTypes2["Element79"] = "minecraft:element_79";
  MinecraftBlockTypes2["Element8"] = "minecraft:element_8";
  MinecraftBlockTypes2["Element80"] = "minecraft:element_80";
  MinecraftBlockTypes2["Element81"] = "minecraft:element_81";
  MinecraftBlockTypes2["Element82"] = "minecraft:element_82";
  MinecraftBlockTypes2["Element83"] = "minecraft:element_83";
  MinecraftBlockTypes2["Element84"] = "minecraft:element_84";
  MinecraftBlockTypes2["Element85"] = "minecraft:element_85";
  MinecraftBlockTypes2["Element86"] = "minecraft:element_86";
  MinecraftBlockTypes2["Element87"] = "minecraft:element_87";
  MinecraftBlockTypes2["Element88"] = "minecraft:element_88";
  MinecraftBlockTypes2["Element89"] = "minecraft:element_89";
  MinecraftBlockTypes2["Element9"] = "minecraft:element_9";
  MinecraftBlockTypes2["Element90"] = "minecraft:element_90";
  MinecraftBlockTypes2["Element91"] = "minecraft:element_91";
  MinecraftBlockTypes2["Element92"] = "minecraft:element_92";
  MinecraftBlockTypes2["Element93"] = "minecraft:element_93";
  MinecraftBlockTypes2["Element94"] = "minecraft:element_94";
  MinecraftBlockTypes2["Element95"] = "minecraft:element_95";
  MinecraftBlockTypes2["Element96"] = "minecraft:element_96";
  MinecraftBlockTypes2["Element97"] = "minecraft:element_97";
  MinecraftBlockTypes2["Element98"] = "minecraft:element_98";
  MinecraftBlockTypes2["Element99"] = "minecraft:element_99";
  MinecraftBlockTypes2["ElementConstructor"] = "minecraft:element_constructor";
  MinecraftBlockTypes2["EmeraldBlock"] = "minecraft:emerald_block";
  MinecraftBlockTypes2["EmeraldOre"] = "minecraft:emerald_ore";
  MinecraftBlockTypes2["EnchantingTable"] = "minecraft:enchanting_table";
  MinecraftBlockTypes2["EndBrickStairs"] = "minecraft:end_brick_stairs";
  MinecraftBlockTypes2["EndBricks"] = "minecraft:end_bricks";
  MinecraftBlockTypes2["EndPortal"] = "minecraft:end_portal";
  MinecraftBlockTypes2["EndPortalFrame"] = "minecraft:end_portal_frame";
  MinecraftBlockTypes2["EndRod"] = "minecraft:end_rod";
  MinecraftBlockTypes2["EndStone"] = "minecraft:end_stone";
  MinecraftBlockTypes2["EndStoneBrickDoubleSlab"] = "minecraft:end_stone_brick_double_slab";
  MinecraftBlockTypes2["EndStoneBrickSlab"] = "minecraft:end_stone_brick_slab";
  MinecraftBlockTypes2["EndStoneBrickWall"] = "minecraft:end_stone_brick_wall";
  MinecraftBlockTypes2["EnderChest"] = "minecraft:ender_chest";
  MinecraftBlockTypes2["ExposedChiseledCopper"] = "minecraft:exposed_chiseled_copper";
  MinecraftBlockTypes2["ExposedCopper"] = "minecraft:exposed_copper";
  MinecraftBlockTypes2["ExposedCopperBulb"] = "minecraft:exposed_copper_bulb";
  MinecraftBlockTypes2["ExposedCopperDoor"] = "minecraft:exposed_copper_door";
  MinecraftBlockTypes2["ExposedCopperGrate"] = "minecraft:exposed_copper_grate";
  MinecraftBlockTypes2["ExposedCopperTrapdoor"] = "minecraft:exposed_copper_trapdoor";
  MinecraftBlockTypes2["ExposedCutCopper"] = "minecraft:exposed_cut_copper";
  MinecraftBlockTypes2["ExposedCutCopperSlab"] = "minecraft:exposed_cut_copper_slab";
  MinecraftBlockTypes2["ExposedCutCopperStairs"] = "minecraft:exposed_cut_copper_stairs";
  MinecraftBlockTypes2["ExposedDoubleCutCopperSlab"] = "minecraft:exposed_double_cut_copper_slab";
  MinecraftBlockTypes2["Farmland"] = "minecraft:farmland";
  MinecraftBlockTypes2["FenceGate"] = "minecraft:fence_gate";
  MinecraftBlockTypes2["Fern"] = "minecraft:fern";
  MinecraftBlockTypes2["Fire"] = "minecraft:fire";
  MinecraftBlockTypes2["FireCoral"] = "minecraft:fire_coral";
  MinecraftBlockTypes2["FireCoralBlock"] = "minecraft:fire_coral_block";
  MinecraftBlockTypes2["FireCoralFan"] = "minecraft:fire_coral_fan";
  MinecraftBlockTypes2["FireCoralWallFan"] = "minecraft:fire_coral_wall_fan";
  MinecraftBlockTypes2["FletchingTable"] = "minecraft:fletching_table";
  MinecraftBlockTypes2["FlowerPot"] = "minecraft:flower_pot";
  MinecraftBlockTypes2["FloweringAzalea"] = "minecraft:flowering_azalea";
  MinecraftBlockTypes2["FlowingLava"] = "minecraft:flowing_lava";
  MinecraftBlockTypes2["FlowingWater"] = "minecraft:flowing_water";
  MinecraftBlockTypes2["Frame"] = "minecraft:frame";
  MinecraftBlockTypes2["FrogSpawn"] = "minecraft:frog_spawn";
  MinecraftBlockTypes2["FrostedIce"] = "minecraft:frosted_ice";
  MinecraftBlockTypes2["Furnace"] = "minecraft:furnace";
  MinecraftBlockTypes2["GildedBlackstone"] = "minecraft:gilded_blackstone";
  MinecraftBlockTypes2["Glass"] = "minecraft:glass";
  MinecraftBlockTypes2["GlassPane"] = "minecraft:glass_pane";
  MinecraftBlockTypes2["GlowFrame"] = "minecraft:glow_frame";
  MinecraftBlockTypes2["GlowLichen"] = "minecraft:glow_lichen";
  MinecraftBlockTypes2["Glowstone"] = "minecraft:glowstone";
  MinecraftBlockTypes2["GoldBlock"] = "minecraft:gold_block";
  MinecraftBlockTypes2["GoldOre"] = "minecraft:gold_ore";
  MinecraftBlockTypes2["GoldenRail"] = "minecraft:golden_rail";
  MinecraftBlockTypes2["Granite"] = "minecraft:granite";
  MinecraftBlockTypes2["GraniteDoubleSlab"] = "minecraft:granite_double_slab";
  MinecraftBlockTypes2["GraniteSlab"] = "minecraft:granite_slab";
  MinecraftBlockTypes2["GraniteStairs"] = "minecraft:granite_stairs";
  MinecraftBlockTypes2["GraniteWall"] = "minecraft:granite_wall";
  MinecraftBlockTypes2["GrassBlock"] = "minecraft:grass_block";
  MinecraftBlockTypes2["GrassPath"] = "minecraft:grass_path";
  MinecraftBlockTypes2["Gravel"] = "minecraft:gravel";
  MinecraftBlockTypes2["GrayCandle"] = "minecraft:gray_candle";
  MinecraftBlockTypes2["GrayCandleCake"] = "minecraft:gray_candle_cake";
  MinecraftBlockTypes2["GrayCarpet"] = "minecraft:gray_carpet";
  MinecraftBlockTypes2["GrayConcrete"] = "minecraft:gray_concrete";
  MinecraftBlockTypes2["GrayConcretePowder"] = "minecraft:gray_concrete_powder";
  MinecraftBlockTypes2["GrayGlazedTerracotta"] = "minecraft:gray_glazed_terracotta";
  MinecraftBlockTypes2["GrayShulkerBox"] = "minecraft:gray_shulker_box";
  MinecraftBlockTypes2["GrayStainedGlass"] = "minecraft:gray_stained_glass";
  MinecraftBlockTypes2["GrayStainedGlassPane"] = "minecraft:gray_stained_glass_pane";
  MinecraftBlockTypes2["GrayTerracotta"] = "minecraft:gray_terracotta";
  MinecraftBlockTypes2["GrayWool"] = "minecraft:gray_wool";
  MinecraftBlockTypes2["GreenCandle"] = "minecraft:green_candle";
  MinecraftBlockTypes2["GreenCandleCake"] = "minecraft:green_candle_cake";
  MinecraftBlockTypes2["GreenCarpet"] = "minecraft:green_carpet";
  MinecraftBlockTypes2["GreenConcrete"] = "minecraft:green_concrete";
  MinecraftBlockTypes2["GreenConcretePowder"] = "minecraft:green_concrete_powder";
  MinecraftBlockTypes2["GreenGlazedTerracotta"] = "minecraft:green_glazed_terracotta";
  MinecraftBlockTypes2["GreenShulkerBox"] = "minecraft:green_shulker_box";
  MinecraftBlockTypes2["GreenStainedGlass"] = "minecraft:green_stained_glass";
  MinecraftBlockTypes2["GreenStainedGlassPane"] = "minecraft:green_stained_glass_pane";
  MinecraftBlockTypes2["GreenTerracotta"] = "minecraft:green_terracotta";
  MinecraftBlockTypes2["GreenWool"] = "minecraft:green_wool";
  MinecraftBlockTypes2["Grindstone"] = "minecraft:grindstone";
  MinecraftBlockTypes2["HangingRoots"] = "minecraft:hanging_roots";
  MinecraftBlockTypes2["HardBlackStainedGlass"] = "minecraft:hard_black_stained_glass";
  MinecraftBlockTypes2["HardBlackStainedGlassPane"] = "minecraft:hard_black_stained_glass_pane";
  MinecraftBlockTypes2["HardBlueStainedGlass"] = "minecraft:hard_blue_stained_glass";
  MinecraftBlockTypes2["HardBlueStainedGlassPane"] = "minecraft:hard_blue_stained_glass_pane";
  MinecraftBlockTypes2["HardBrownStainedGlass"] = "minecraft:hard_brown_stained_glass";
  MinecraftBlockTypes2["HardBrownStainedGlassPane"] = "minecraft:hard_brown_stained_glass_pane";
  MinecraftBlockTypes2["HardCyanStainedGlass"] = "minecraft:hard_cyan_stained_glass";
  MinecraftBlockTypes2["HardCyanStainedGlassPane"] = "minecraft:hard_cyan_stained_glass_pane";
  MinecraftBlockTypes2["HardGlass"] = "minecraft:hard_glass";
  MinecraftBlockTypes2["HardGlassPane"] = "minecraft:hard_glass_pane";
  MinecraftBlockTypes2["HardGrayStainedGlass"] = "minecraft:hard_gray_stained_glass";
  MinecraftBlockTypes2["HardGrayStainedGlassPane"] = "minecraft:hard_gray_stained_glass_pane";
  MinecraftBlockTypes2["HardGreenStainedGlass"] = "minecraft:hard_green_stained_glass";
  MinecraftBlockTypes2["HardGreenStainedGlassPane"] = "minecraft:hard_green_stained_glass_pane";
  MinecraftBlockTypes2["HardLightBlueStainedGlass"] = "minecraft:hard_light_blue_stained_glass";
  MinecraftBlockTypes2["HardLightBlueStainedGlassPane"] = "minecraft:hard_light_blue_stained_glass_pane";
  MinecraftBlockTypes2["HardLightGrayStainedGlass"] = "minecraft:hard_light_gray_stained_glass";
  MinecraftBlockTypes2["HardLightGrayStainedGlassPane"] = "minecraft:hard_light_gray_stained_glass_pane";
  MinecraftBlockTypes2["HardLimeStainedGlass"] = "minecraft:hard_lime_stained_glass";
  MinecraftBlockTypes2["HardLimeStainedGlassPane"] = "minecraft:hard_lime_stained_glass_pane";
  MinecraftBlockTypes2["HardMagentaStainedGlass"] = "minecraft:hard_magenta_stained_glass";
  MinecraftBlockTypes2["HardMagentaStainedGlassPane"] = "minecraft:hard_magenta_stained_glass_pane";
  MinecraftBlockTypes2["HardOrangeStainedGlass"] = "minecraft:hard_orange_stained_glass";
  MinecraftBlockTypes2["HardOrangeStainedGlassPane"] = "minecraft:hard_orange_stained_glass_pane";
  MinecraftBlockTypes2["HardPinkStainedGlass"] = "minecraft:hard_pink_stained_glass";
  MinecraftBlockTypes2["HardPinkStainedGlassPane"] = "minecraft:hard_pink_stained_glass_pane";
  MinecraftBlockTypes2["HardPurpleStainedGlass"] = "minecraft:hard_purple_stained_glass";
  MinecraftBlockTypes2["HardPurpleStainedGlassPane"] = "minecraft:hard_purple_stained_glass_pane";
  MinecraftBlockTypes2["HardRedStainedGlass"] = "minecraft:hard_red_stained_glass";
  MinecraftBlockTypes2["HardRedStainedGlassPane"] = "minecraft:hard_red_stained_glass_pane";
  MinecraftBlockTypes2["HardWhiteStainedGlass"] = "minecraft:hard_white_stained_glass";
  MinecraftBlockTypes2["HardWhiteStainedGlassPane"] = "minecraft:hard_white_stained_glass_pane";
  MinecraftBlockTypes2["HardYellowStainedGlass"] = "minecraft:hard_yellow_stained_glass";
  MinecraftBlockTypes2["HardYellowStainedGlassPane"] = "minecraft:hard_yellow_stained_glass_pane";
  MinecraftBlockTypes2["HardenedClay"] = "minecraft:hardened_clay";
  MinecraftBlockTypes2["HayBlock"] = "minecraft:hay_block";
  MinecraftBlockTypes2["HeavyCore"] = "minecraft:heavy_core";
  MinecraftBlockTypes2["HeavyWeightedPressurePlate"] = "minecraft:heavy_weighted_pressure_plate";
  MinecraftBlockTypes2["HoneyBlock"] = "minecraft:honey_block";
  MinecraftBlockTypes2["HoneycombBlock"] = "minecraft:honeycomb_block";
  MinecraftBlockTypes2["Hopper"] = "minecraft:hopper";
  MinecraftBlockTypes2["HornCoral"] = "minecraft:horn_coral";
  MinecraftBlockTypes2["HornCoralBlock"] = "minecraft:horn_coral_block";
  MinecraftBlockTypes2["HornCoralFan"] = "minecraft:horn_coral_fan";
  MinecraftBlockTypes2["HornCoralWallFan"] = "minecraft:horn_coral_wall_fan";
  MinecraftBlockTypes2["Ice"] = "minecraft:ice";
  MinecraftBlockTypes2["InfestedChiseledStoneBricks"] = "minecraft:infested_chiseled_stone_bricks";
  MinecraftBlockTypes2["InfestedCobblestone"] = "minecraft:infested_cobblestone";
  MinecraftBlockTypes2["InfestedCrackedStoneBricks"] = "minecraft:infested_cracked_stone_bricks";
  MinecraftBlockTypes2["InfestedDeepslate"] = "minecraft:infested_deepslate";
  MinecraftBlockTypes2["InfestedMossyStoneBricks"] = "minecraft:infested_mossy_stone_bricks";
  MinecraftBlockTypes2["InfestedStone"] = "minecraft:infested_stone";
  MinecraftBlockTypes2["InfestedStoneBricks"] = "minecraft:infested_stone_bricks";
  MinecraftBlockTypes2["IronBars"] = "minecraft:iron_bars";
  MinecraftBlockTypes2["IronBlock"] = "minecraft:iron_block";
  MinecraftBlockTypes2["IronDoor"] = "minecraft:iron_door";
  MinecraftBlockTypes2["IronOre"] = "minecraft:iron_ore";
  MinecraftBlockTypes2["IronTrapdoor"] = "minecraft:iron_trapdoor";
  MinecraftBlockTypes2["Jigsaw"] = "minecraft:jigsaw";
  MinecraftBlockTypes2["Jukebox"] = "minecraft:jukebox";
  MinecraftBlockTypes2["JungleButton"] = "minecraft:jungle_button";
  MinecraftBlockTypes2["JungleDoor"] = "minecraft:jungle_door";
  MinecraftBlockTypes2["JungleDoubleSlab"] = "minecraft:jungle_double_slab";
  MinecraftBlockTypes2["JungleFence"] = "minecraft:jungle_fence";
  MinecraftBlockTypes2["JungleFenceGate"] = "minecraft:jungle_fence_gate";
  MinecraftBlockTypes2["JungleHangingSign"] = "minecraft:jungle_hanging_sign";
  MinecraftBlockTypes2["JungleLeaves"] = "minecraft:jungle_leaves";
  MinecraftBlockTypes2["JungleLog"] = "minecraft:jungle_log";
  MinecraftBlockTypes2["JunglePlanks"] = "minecraft:jungle_planks";
  MinecraftBlockTypes2["JunglePressurePlate"] = "minecraft:jungle_pressure_plate";
  MinecraftBlockTypes2["JungleSapling"] = "minecraft:jungle_sapling";
  MinecraftBlockTypes2["JungleSlab"] = "minecraft:jungle_slab";
  MinecraftBlockTypes2["JungleStairs"] = "minecraft:jungle_stairs";
  MinecraftBlockTypes2["JungleStandingSign"] = "minecraft:jungle_standing_sign";
  MinecraftBlockTypes2["JungleTrapdoor"] = "minecraft:jungle_trapdoor";
  MinecraftBlockTypes2["JungleWallSign"] = "minecraft:jungle_wall_sign";
  MinecraftBlockTypes2["JungleWood"] = "minecraft:jungle_wood";
  MinecraftBlockTypes2["Kelp"] = "minecraft:kelp";
  MinecraftBlockTypes2["LabTable"] = "minecraft:lab_table";
  MinecraftBlockTypes2["Ladder"] = "minecraft:ladder";
  MinecraftBlockTypes2["Lantern"] = "minecraft:lantern";
  MinecraftBlockTypes2["LapisBlock"] = "minecraft:lapis_block";
  MinecraftBlockTypes2["LapisOre"] = "minecraft:lapis_ore";
  MinecraftBlockTypes2["LargeAmethystBud"] = "minecraft:large_amethyst_bud";
  MinecraftBlockTypes2["LargeFern"] = "minecraft:large_fern";
  MinecraftBlockTypes2["Lava"] = "minecraft:lava";
  MinecraftBlockTypes2["Lectern"] = "minecraft:lectern";
  MinecraftBlockTypes2["Lever"] = "minecraft:lever";
  MinecraftBlockTypes2["LightBlock0"] = "minecraft:light_block_0";
  MinecraftBlockTypes2["LightBlock1"] = "minecraft:light_block_1";
  MinecraftBlockTypes2["LightBlock10"] = "minecraft:light_block_10";
  MinecraftBlockTypes2["LightBlock11"] = "minecraft:light_block_11";
  MinecraftBlockTypes2["LightBlock12"] = "minecraft:light_block_12";
  MinecraftBlockTypes2["LightBlock13"] = "minecraft:light_block_13";
  MinecraftBlockTypes2["LightBlock14"] = "minecraft:light_block_14";
  MinecraftBlockTypes2["LightBlock15"] = "minecraft:light_block_15";
  MinecraftBlockTypes2["LightBlock2"] = "minecraft:light_block_2";
  MinecraftBlockTypes2["LightBlock3"] = "minecraft:light_block_3";
  MinecraftBlockTypes2["LightBlock4"] = "minecraft:light_block_4";
  MinecraftBlockTypes2["LightBlock5"] = "minecraft:light_block_5";
  MinecraftBlockTypes2["LightBlock6"] = "minecraft:light_block_6";
  MinecraftBlockTypes2["LightBlock7"] = "minecraft:light_block_7";
  MinecraftBlockTypes2["LightBlock8"] = "minecraft:light_block_8";
  MinecraftBlockTypes2["LightBlock9"] = "minecraft:light_block_9";
  MinecraftBlockTypes2["LightBlueCandle"] = "minecraft:light_blue_candle";
  MinecraftBlockTypes2["LightBlueCandleCake"] = "minecraft:light_blue_candle_cake";
  MinecraftBlockTypes2["LightBlueCarpet"] = "minecraft:light_blue_carpet";
  MinecraftBlockTypes2["LightBlueConcrete"] = "minecraft:light_blue_concrete";
  MinecraftBlockTypes2["LightBlueConcretePowder"] = "minecraft:light_blue_concrete_powder";
  MinecraftBlockTypes2["LightBlueGlazedTerracotta"] = "minecraft:light_blue_glazed_terracotta";
  MinecraftBlockTypes2["LightBlueShulkerBox"] = "minecraft:light_blue_shulker_box";
  MinecraftBlockTypes2["LightBlueStainedGlass"] = "minecraft:light_blue_stained_glass";
  MinecraftBlockTypes2["LightBlueStainedGlassPane"] = "minecraft:light_blue_stained_glass_pane";
  MinecraftBlockTypes2["LightBlueTerracotta"] = "minecraft:light_blue_terracotta";
  MinecraftBlockTypes2["LightBlueWool"] = "minecraft:light_blue_wool";
  MinecraftBlockTypes2["LightGrayCandle"] = "minecraft:light_gray_candle";
  MinecraftBlockTypes2["LightGrayCandleCake"] = "minecraft:light_gray_candle_cake";
  MinecraftBlockTypes2["LightGrayCarpet"] = "minecraft:light_gray_carpet";
  MinecraftBlockTypes2["LightGrayConcrete"] = "minecraft:light_gray_concrete";
  MinecraftBlockTypes2["LightGrayConcretePowder"] = "minecraft:light_gray_concrete_powder";
  MinecraftBlockTypes2["LightGrayShulkerBox"] = "minecraft:light_gray_shulker_box";
  MinecraftBlockTypes2["LightGrayStainedGlass"] = "minecraft:light_gray_stained_glass";
  MinecraftBlockTypes2["LightGrayStainedGlassPane"] = "minecraft:light_gray_stained_glass_pane";
  MinecraftBlockTypes2["LightGrayTerracotta"] = "minecraft:light_gray_terracotta";
  MinecraftBlockTypes2["LightGrayWool"] = "minecraft:light_gray_wool";
  MinecraftBlockTypes2["LightWeightedPressurePlate"] = "minecraft:light_weighted_pressure_plate";
  MinecraftBlockTypes2["LightningRod"] = "minecraft:lightning_rod";
  MinecraftBlockTypes2["Lilac"] = "minecraft:lilac";
  MinecraftBlockTypes2["LilyOfTheValley"] = "minecraft:lily_of_the_valley";
  MinecraftBlockTypes2["LimeCandle"] = "minecraft:lime_candle";
  MinecraftBlockTypes2["LimeCandleCake"] = "minecraft:lime_candle_cake";
  MinecraftBlockTypes2["LimeCarpet"] = "minecraft:lime_carpet";
  MinecraftBlockTypes2["LimeConcrete"] = "minecraft:lime_concrete";
  MinecraftBlockTypes2["LimeConcretePowder"] = "minecraft:lime_concrete_powder";
  MinecraftBlockTypes2["LimeGlazedTerracotta"] = "minecraft:lime_glazed_terracotta";
  MinecraftBlockTypes2["LimeShulkerBox"] = "minecraft:lime_shulker_box";
  MinecraftBlockTypes2["LimeStainedGlass"] = "minecraft:lime_stained_glass";
  MinecraftBlockTypes2["LimeStainedGlassPane"] = "minecraft:lime_stained_glass_pane";
  MinecraftBlockTypes2["LimeTerracotta"] = "minecraft:lime_terracotta";
  MinecraftBlockTypes2["LimeWool"] = "minecraft:lime_wool";
  MinecraftBlockTypes2["LitBlastFurnace"] = "minecraft:lit_blast_furnace";
  MinecraftBlockTypes2["LitDeepslateRedstoneOre"] = "minecraft:lit_deepslate_redstone_ore";
  MinecraftBlockTypes2["LitFurnace"] = "minecraft:lit_furnace";
  MinecraftBlockTypes2["LitPumpkin"] = "minecraft:lit_pumpkin";
  MinecraftBlockTypes2["LitRedstoneLamp"] = "minecraft:lit_redstone_lamp";
  MinecraftBlockTypes2["LitRedstoneOre"] = "minecraft:lit_redstone_ore";
  MinecraftBlockTypes2["LitSmoker"] = "minecraft:lit_smoker";
  MinecraftBlockTypes2["Lodestone"] = "minecraft:lodestone";
  MinecraftBlockTypes2["Loom"] = "minecraft:loom";
  MinecraftBlockTypes2["MagentaCandle"] = "minecraft:magenta_candle";
  MinecraftBlockTypes2["MagentaCandleCake"] = "minecraft:magenta_candle_cake";
  MinecraftBlockTypes2["MagentaCarpet"] = "minecraft:magenta_carpet";
  MinecraftBlockTypes2["MagentaConcrete"] = "minecraft:magenta_concrete";
  MinecraftBlockTypes2["MagentaConcretePowder"] = "minecraft:magenta_concrete_powder";
  MinecraftBlockTypes2["MagentaGlazedTerracotta"] = "minecraft:magenta_glazed_terracotta";
  MinecraftBlockTypes2["MagentaShulkerBox"] = "minecraft:magenta_shulker_box";
  MinecraftBlockTypes2["MagentaStainedGlass"] = "minecraft:magenta_stained_glass";
  MinecraftBlockTypes2["MagentaStainedGlassPane"] = "minecraft:magenta_stained_glass_pane";
  MinecraftBlockTypes2["MagentaTerracotta"] = "minecraft:magenta_terracotta";
  MinecraftBlockTypes2["MagentaWool"] = "minecraft:magenta_wool";
  MinecraftBlockTypes2["Magma"] = "minecraft:magma";
  MinecraftBlockTypes2["MangroveButton"] = "minecraft:mangrove_button";
  MinecraftBlockTypes2["MangroveDoor"] = "minecraft:mangrove_door";
  MinecraftBlockTypes2["MangroveDoubleSlab"] = "minecraft:mangrove_double_slab";
  MinecraftBlockTypes2["MangroveFence"] = "minecraft:mangrove_fence";
  MinecraftBlockTypes2["MangroveFenceGate"] = "minecraft:mangrove_fence_gate";
  MinecraftBlockTypes2["MangroveHangingSign"] = "minecraft:mangrove_hanging_sign";
  MinecraftBlockTypes2["MangroveLeaves"] = "minecraft:mangrove_leaves";
  MinecraftBlockTypes2["MangroveLog"] = "minecraft:mangrove_log";
  MinecraftBlockTypes2["MangrovePlanks"] = "minecraft:mangrove_planks";
  MinecraftBlockTypes2["MangrovePressurePlate"] = "minecraft:mangrove_pressure_plate";
  MinecraftBlockTypes2["MangrovePropagule"] = "minecraft:mangrove_propagule";
  MinecraftBlockTypes2["MangroveRoots"] = "minecraft:mangrove_roots";
  MinecraftBlockTypes2["MangroveSlab"] = "minecraft:mangrove_slab";
  MinecraftBlockTypes2["MangroveStairs"] = "minecraft:mangrove_stairs";
  MinecraftBlockTypes2["MangroveStandingSign"] = "minecraft:mangrove_standing_sign";
  MinecraftBlockTypes2["MangroveTrapdoor"] = "minecraft:mangrove_trapdoor";
  MinecraftBlockTypes2["MangroveWallSign"] = "minecraft:mangrove_wall_sign";
  MinecraftBlockTypes2["MangroveWood"] = "minecraft:mangrove_wood";
  MinecraftBlockTypes2["MaterialReducer"] = "minecraft:material_reducer";
  MinecraftBlockTypes2["MediumAmethystBud"] = "minecraft:medium_amethyst_bud";
  MinecraftBlockTypes2["MelonBlock"] = "minecraft:melon_block";
  MinecraftBlockTypes2["MelonStem"] = "minecraft:melon_stem";
  MinecraftBlockTypes2["MobSpawner"] = "minecraft:mob_spawner";
  MinecraftBlockTypes2["MossBlock"] = "minecraft:moss_block";
  MinecraftBlockTypes2["MossCarpet"] = "minecraft:moss_carpet";
  MinecraftBlockTypes2["MossyCobblestone"] = "minecraft:mossy_cobblestone";
  MinecraftBlockTypes2["MossyCobblestoneDoubleSlab"] = "minecraft:mossy_cobblestone_double_slab";
  MinecraftBlockTypes2["MossyCobblestoneSlab"] = "minecraft:mossy_cobblestone_slab";
  MinecraftBlockTypes2["MossyCobblestoneStairs"] = "minecraft:mossy_cobblestone_stairs";
  MinecraftBlockTypes2["MossyCobblestoneWall"] = "minecraft:mossy_cobblestone_wall";
  MinecraftBlockTypes2["MossyStoneBrickDoubleSlab"] = "minecraft:mossy_stone_brick_double_slab";
  MinecraftBlockTypes2["MossyStoneBrickSlab"] = "minecraft:mossy_stone_brick_slab";
  MinecraftBlockTypes2["MossyStoneBrickStairs"] = "minecraft:mossy_stone_brick_stairs";
  MinecraftBlockTypes2["MossyStoneBrickWall"] = "minecraft:mossy_stone_brick_wall";
  MinecraftBlockTypes2["MossyStoneBricks"] = "minecraft:mossy_stone_bricks";
  MinecraftBlockTypes2["Mud"] = "minecraft:mud";
  MinecraftBlockTypes2["MudBrickDoubleSlab"] = "minecraft:mud_brick_double_slab";
  MinecraftBlockTypes2["MudBrickSlab"] = "minecraft:mud_brick_slab";
  MinecraftBlockTypes2["MudBrickStairs"] = "minecraft:mud_brick_stairs";
  MinecraftBlockTypes2["MudBrickWall"] = "minecraft:mud_brick_wall";
  MinecraftBlockTypes2["MudBricks"] = "minecraft:mud_bricks";
  MinecraftBlockTypes2["MuddyMangroveRoots"] = "minecraft:muddy_mangrove_roots";
  MinecraftBlockTypes2["MushroomStem"] = "minecraft:mushroom_stem";
  MinecraftBlockTypes2["Mycelium"] = "minecraft:mycelium";
  MinecraftBlockTypes2["NetherBrick"] = "minecraft:nether_brick";
  MinecraftBlockTypes2["NetherBrickDoubleSlab"] = "minecraft:nether_brick_double_slab";
  MinecraftBlockTypes2["NetherBrickFence"] = "minecraft:nether_brick_fence";
  MinecraftBlockTypes2["NetherBrickSlab"] = "minecraft:nether_brick_slab";
  MinecraftBlockTypes2["NetherBrickStairs"] = "minecraft:nether_brick_stairs";
  MinecraftBlockTypes2["NetherBrickWall"] = "minecraft:nether_brick_wall";
  MinecraftBlockTypes2["NetherGoldOre"] = "minecraft:nether_gold_ore";
  MinecraftBlockTypes2["NetherSprouts"] = "minecraft:nether_sprouts";
  MinecraftBlockTypes2["NetherWart"] = "minecraft:nether_wart";
  MinecraftBlockTypes2["NetherWartBlock"] = "minecraft:nether_wart_block";
  MinecraftBlockTypes2["NetheriteBlock"] = "minecraft:netherite_block";
  MinecraftBlockTypes2["Netherrack"] = "minecraft:netherrack";
  MinecraftBlockTypes2["NormalStoneDoubleSlab"] = "minecraft:normal_stone_double_slab";
  MinecraftBlockTypes2["NormalStoneSlab"] = "minecraft:normal_stone_slab";
  MinecraftBlockTypes2["NormalStoneStairs"] = "minecraft:normal_stone_stairs";
  MinecraftBlockTypes2["Noteblock"] = "minecraft:noteblock";
  MinecraftBlockTypes2["OakDoubleSlab"] = "minecraft:oak_double_slab";
  MinecraftBlockTypes2["OakFence"] = "minecraft:oak_fence";
  MinecraftBlockTypes2["OakHangingSign"] = "minecraft:oak_hanging_sign";
  MinecraftBlockTypes2["OakLeaves"] = "minecraft:oak_leaves";
  MinecraftBlockTypes2["OakLog"] = "minecraft:oak_log";
  MinecraftBlockTypes2["OakPlanks"] = "minecraft:oak_planks";
  MinecraftBlockTypes2["OakSapling"] = "minecraft:oak_sapling";
  MinecraftBlockTypes2["OakSlab"] = "minecraft:oak_slab";
  MinecraftBlockTypes2["OakStairs"] = "minecraft:oak_stairs";
  MinecraftBlockTypes2["OakWood"] = "minecraft:oak_wood";
  MinecraftBlockTypes2["Observer"] = "minecraft:observer";
  MinecraftBlockTypes2["Obsidian"] = "minecraft:obsidian";
  MinecraftBlockTypes2["OchreFroglight"] = "minecraft:ochre_froglight";
  MinecraftBlockTypes2["OpenEyeblossom"] = "minecraft:open_eyeblossom";
  MinecraftBlockTypes2["OrangeCandle"] = "minecraft:orange_candle";
  MinecraftBlockTypes2["OrangeCandleCake"] = "minecraft:orange_candle_cake";
  MinecraftBlockTypes2["OrangeCarpet"] = "minecraft:orange_carpet";
  MinecraftBlockTypes2["OrangeConcrete"] = "minecraft:orange_concrete";
  MinecraftBlockTypes2["OrangeConcretePowder"] = "minecraft:orange_concrete_powder";
  MinecraftBlockTypes2["OrangeGlazedTerracotta"] = "minecraft:orange_glazed_terracotta";
  MinecraftBlockTypes2["OrangeShulkerBox"] = "minecraft:orange_shulker_box";
  MinecraftBlockTypes2["OrangeStainedGlass"] = "minecraft:orange_stained_glass";
  MinecraftBlockTypes2["OrangeStainedGlassPane"] = "minecraft:orange_stained_glass_pane";
  MinecraftBlockTypes2["OrangeTerracotta"] = "minecraft:orange_terracotta";
  MinecraftBlockTypes2["OrangeTulip"] = "minecraft:orange_tulip";
  MinecraftBlockTypes2["OrangeWool"] = "minecraft:orange_wool";
  MinecraftBlockTypes2["OxeyeDaisy"] = "minecraft:oxeye_daisy";
  MinecraftBlockTypes2["OxidizedChiseledCopper"] = "minecraft:oxidized_chiseled_copper";
  MinecraftBlockTypes2["OxidizedCopper"] = "minecraft:oxidized_copper";
  MinecraftBlockTypes2["OxidizedCopperBulb"] = "minecraft:oxidized_copper_bulb";
  MinecraftBlockTypes2["OxidizedCopperDoor"] = "minecraft:oxidized_copper_door";
  MinecraftBlockTypes2["OxidizedCopperGrate"] = "minecraft:oxidized_copper_grate";
  MinecraftBlockTypes2["OxidizedCopperTrapdoor"] = "minecraft:oxidized_copper_trapdoor";
  MinecraftBlockTypes2["OxidizedCutCopper"] = "minecraft:oxidized_cut_copper";
  MinecraftBlockTypes2["OxidizedCutCopperSlab"] = "minecraft:oxidized_cut_copper_slab";
  MinecraftBlockTypes2["OxidizedCutCopperStairs"] = "minecraft:oxidized_cut_copper_stairs";
  MinecraftBlockTypes2["OxidizedDoubleCutCopperSlab"] = "minecraft:oxidized_double_cut_copper_slab";
  MinecraftBlockTypes2["PackedIce"] = "minecraft:packed_ice";
  MinecraftBlockTypes2["PackedMud"] = "minecraft:packed_mud";
  MinecraftBlockTypes2["PaleHangingMoss"] = "minecraft:pale_hanging_moss";
  MinecraftBlockTypes2["PaleMossBlock"] = "minecraft:pale_moss_block";
  MinecraftBlockTypes2["PaleMossCarpet"] = "minecraft:pale_moss_carpet";
  MinecraftBlockTypes2["PaleOakButton"] = "minecraft:pale_oak_button";
  MinecraftBlockTypes2["PaleOakDoor"] = "minecraft:pale_oak_door";
  MinecraftBlockTypes2["PaleOakDoubleSlab"] = "minecraft:pale_oak_double_slab";
  MinecraftBlockTypes2["PaleOakFence"] = "minecraft:pale_oak_fence";
  MinecraftBlockTypes2["PaleOakFenceGate"] = "minecraft:pale_oak_fence_gate";
  MinecraftBlockTypes2["PaleOakHangingSign"] = "minecraft:pale_oak_hanging_sign";
  MinecraftBlockTypes2["PaleOakLeaves"] = "minecraft:pale_oak_leaves";
  MinecraftBlockTypes2["PaleOakLog"] = "minecraft:pale_oak_log";
  MinecraftBlockTypes2["PaleOakPlanks"] = "minecraft:pale_oak_planks";
  MinecraftBlockTypes2["PaleOakPressurePlate"] = "minecraft:pale_oak_pressure_plate";
  MinecraftBlockTypes2["PaleOakSapling"] = "minecraft:pale_oak_sapling";
  MinecraftBlockTypes2["PaleOakSlab"] = "minecraft:pale_oak_slab";
  MinecraftBlockTypes2["PaleOakStairs"] = "minecraft:pale_oak_stairs";
  MinecraftBlockTypes2["PaleOakStandingSign"] = "minecraft:pale_oak_standing_sign";
  MinecraftBlockTypes2["PaleOakTrapdoor"] = "minecraft:pale_oak_trapdoor";
  MinecraftBlockTypes2["PaleOakWallSign"] = "minecraft:pale_oak_wall_sign";
  MinecraftBlockTypes2["PaleOakWood"] = "minecraft:pale_oak_wood";
  MinecraftBlockTypes2["PearlescentFroglight"] = "minecraft:pearlescent_froglight";
  MinecraftBlockTypes2["Peony"] = "minecraft:peony";
  MinecraftBlockTypes2["PetrifiedOakDoubleSlab"] = "minecraft:petrified_oak_double_slab";
  MinecraftBlockTypes2["PetrifiedOakSlab"] = "minecraft:petrified_oak_slab";
  MinecraftBlockTypes2["PiglinHead"] = "minecraft:piglin_head";
  MinecraftBlockTypes2["PinkCandle"] = "minecraft:pink_candle";
  MinecraftBlockTypes2["PinkCandleCake"] = "minecraft:pink_candle_cake";
  MinecraftBlockTypes2["PinkCarpet"] = "minecraft:pink_carpet";
  MinecraftBlockTypes2["PinkConcrete"] = "minecraft:pink_concrete";
  MinecraftBlockTypes2["PinkConcretePowder"] = "minecraft:pink_concrete_powder";
  MinecraftBlockTypes2["PinkGlazedTerracotta"] = "minecraft:pink_glazed_terracotta";
  MinecraftBlockTypes2["PinkPetals"] = "minecraft:pink_petals";
  MinecraftBlockTypes2["PinkShulkerBox"] = "minecraft:pink_shulker_box";
  MinecraftBlockTypes2["PinkStainedGlass"] = "minecraft:pink_stained_glass";
  MinecraftBlockTypes2["PinkStainedGlassPane"] = "minecraft:pink_stained_glass_pane";
  MinecraftBlockTypes2["PinkTerracotta"] = "minecraft:pink_terracotta";
  MinecraftBlockTypes2["PinkTulip"] = "minecraft:pink_tulip";
  MinecraftBlockTypes2["PinkWool"] = "minecraft:pink_wool";
  MinecraftBlockTypes2["Piston"] = "minecraft:piston";
  MinecraftBlockTypes2["PistonArmCollision"] = "minecraft:piston_arm_collision";
  MinecraftBlockTypes2["PitcherCrop"] = "minecraft:pitcher_crop";
  MinecraftBlockTypes2["PitcherPlant"] = "minecraft:pitcher_plant";
  MinecraftBlockTypes2["PlayerHead"] = "minecraft:player_head";
  MinecraftBlockTypes2["Podzol"] = "minecraft:podzol";
  MinecraftBlockTypes2["PointedDripstone"] = "minecraft:pointed_dripstone";
  MinecraftBlockTypes2["PolishedAndesite"] = "minecraft:polished_andesite";
  MinecraftBlockTypes2["PolishedAndesiteDoubleSlab"] = "minecraft:polished_andesite_double_slab";
  MinecraftBlockTypes2["PolishedAndesiteSlab"] = "minecraft:polished_andesite_slab";
  MinecraftBlockTypes2["PolishedAndesiteStairs"] = "minecraft:polished_andesite_stairs";
  MinecraftBlockTypes2["PolishedBasalt"] = "minecraft:polished_basalt";
  MinecraftBlockTypes2["PolishedBlackstone"] = "minecraft:polished_blackstone";
  MinecraftBlockTypes2["PolishedBlackstoneBrickDoubleSlab"] = "minecraft:polished_blackstone_brick_double_slab";
  MinecraftBlockTypes2["PolishedBlackstoneBrickSlab"] = "minecraft:polished_blackstone_brick_slab";
  MinecraftBlockTypes2["PolishedBlackstoneBrickStairs"] = "minecraft:polished_blackstone_brick_stairs";
  MinecraftBlockTypes2["PolishedBlackstoneBrickWall"] = "minecraft:polished_blackstone_brick_wall";
  MinecraftBlockTypes2["PolishedBlackstoneBricks"] = "minecraft:polished_blackstone_bricks";
  MinecraftBlockTypes2["PolishedBlackstoneButton"] = "minecraft:polished_blackstone_button";
  MinecraftBlockTypes2["PolishedBlackstoneDoubleSlab"] = "minecraft:polished_blackstone_double_slab";
  MinecraftBlockTypes2["PolishedBlackstonePressurePlate"] = "minecraft:polished_blackstone_pressure_plate";
  MinecraftBlockTypes2["PolishedBlackstoneSlab"] = "minecraft:polished_blackstone_slab";
  MinecraftBlockTypes2["PolishedBlackstoneStairs"] = "minecraft:polished_blackstone_stairs";
  MinecraftBlockTypes2["PolishedBlackstoneWall"] = "minecraft:polished_blackstone_wall";
  MinecraftBlockTypes2["PolishedDeepslate"] = "minecraft:polished_deepslate";
  MinecraftBlockTypes2["PolishedDeepslateDoubleSlab"] = "minecraft:polished_deepslate_double_slab";
  MinecraftBlockTypes2["PolishedDeepslateSlab"] = "minecraft:polished_deepslate_slab";
  MinecraftBlockTypes2["PolishedDeepslateStairs"] = "minecraft:polished_deepslate_stairs";
  MinecraftBlockTypes2["PolishedDeepslateWall"] = "minecraft:polished_deepslate_wall";
  MinecraftBlockTypes2["PolishedDiorite"] = "minecraft:polished_diorite";
  MinecraftBlockTypes2["PolishedDioriteDoubleSlab"] = "minecraft:polished_diorite_double_slab";
  MinecraftBlockTypes2["PolishedDioriteSlab"] = "minecraft:polished_diorite_slab";
  MinecraftBlockTypes2["PolishedDioriteStairs"] = "minecraft:polished_diorite_stairs";
  MinecraftBlockTypes2["PolishedGranite"] = "minecraft:polished_granite";
  MinecraftBlockTypes2["PolishedGraniteDoubleSlab"] = "minecraft:polished_granite_double_slab";
  MinecraftBlockTypes2["PolishedGraniteSlab"] = "minecraft:polished_granite_slab";
  MinecraftBlockTypes2["PolishedGraniteStairs"] = "minecraft:polished_granite_stairs";
  MinecraftBlockTypes2["PolishedTuff"] = "minecraft:polished_tuff";
  MinecraftBlockTypes2["PolishedTuffDoubleSlab"] = "minecraft:polished_tuff_double_slab";
  MinecraftBlockTypes2["PolishedTuffSlab"] = "minecraft:polished_tuff_slab";
  MinecraftBlockTypes2["PolishedTuffStairs"] = "minecraft:polished_tuff_stairs";
  MinecraftBlockTypes2["PolishedTuffWall"] = "minecraft:polished_tuff_wall";
  MinecraftBlockTypes2["Poppy"] = "minecraft:poppy";
  MinecraftBlockTypes2["Portal"] = "minecraft:portal";
  MinecraftBlockTypes2["Potatoes"] = "minecraft:potatoes";
  MinecraftBlockTypes2["PowderSnow"] = "minecraft:powder_snow";
  MinecraftBlockTypes2["PoweredComparator"] = "minecraft:powered_comparator";
  MinecraftBlockTypes2["PoweredRepeater"] = "minecraft:powered_repeater";
  MinecraftBlockTypes2["Prismarine"] = "minecraft:prismarine";
  MinecraftBlockTypes2["PrismarineBrickDoubleSlab"] = "minecraft:prismarine_brick_double_slab";
  MinecraftBlockTypes2["PrismarineBrickSlab"] = "minecraft:prismarine_brick_slab";
  MinecraftBlockTypes2["PrismarineBricks"] = "minecraft:prismarine_bricks";
  MinecraftBlockTypes2["PrismarineBricksStairs"] = "minecraft:prismarine_bricks_stairs";
  MinecraftBlockTypes2["PrismarineDoubleSlab"] = "minecraft:prismarine_double_slab";
  MinecraftBlockTypes2["PrismarineSlab"] = "minecraft:prismarine_slab";
  MinecraftBlockTypes2["PrismarineStairs"] = "minecraft:prismarine_stairs";
  MinecraftBlockTypes2["PrismarineWall"] = "minecraft:prismarine_wall";
  MinecraftBlockTypes2["Pumpkin"] = "minecraft:pumpkin";
  MinecraftBlockTypes2["PumpkinStem"] = "minecraft:pumpkin_stem";
  MinecraftBlockTypes2["PurpleCandle"] = "minecraft:purple_candle";
  MinecraftBlockTypes2["PurpleCandleCake"] = "minecraft:purple_candle_cake";
  MinecraftBlockTypes2["PurpleCarpet"] = "minecraft:purple_carpet";
  MinecraftBlockTypes2["PurpleConcrete"] = "minecraft:purple_concrete";
  MinecraftBlockTypes2["PurpleConcretePowder"] = "minecraft:purple_concrete_powder";
  MinecraftBlockTypes2["PurpleGlazedTerracotta"] = "minecraft:purple_glazed_terracotta";
  MinecraftBlockTypes2["PurpleShulkerBox"] = "minecraft:purple_shulker_box";
  MinecraftBlockTypes2["PurpleStainedGlass"] = "minecraft:purple_stained_glass";
  MinecraftBlockTypes2["PurpleStainedGlassPane"] = "minecraft:purple_stained_glass_pane";
  MinecraftBlockTypes2["PurpleTerracotta"] = "minecraft:purple_terracotta";
  MinecraftBlockTypes2["PurpleWool"] = "minecraft:purple_wool";
  MinecraftBlockTypes2["PurpurBlock"] = "minecraft:purpur_block";
  MinecraftBlockTypes2["PurpurDoubleSlab"] = "minecraft:purpur_double_slab";
  MinecraftBlockTypes2["PurpurPillar"] = "minecraft:purpur_pillar";
  MinecraftBlockTypes2["PurpurSlab"] = "minecraft:purpur_slab";
  MinecraftBlockTypes2["PurpurStairs"] = "minecraft:purpur_stairs";
  MinecraftBlockTypes2["QuartzBlock"] = "minecraft:quartz_block";
  MinecraftBlockTypes2["QuartzBricks"] = "minecraft:quartz_bricks";
  MinecraftBlockTypes2["QuartzDoubleSlab"] = "minecraft:quartz_double_slab";
  MinecraftBlockTypes2["QuartzOre"] = "minecraft:quartz_ore";
  MinecraftBlockTypes2["QuartzPillar"] = "minecraft:quartz_pillar";
  MinecraftBlockTypes2["QuartzSlab"] = "minecraft:quartz_slab";
  MinecraftBlockTypes2["QuartzStairs"] = "minecraft:quartz_stairs";
  MinecraftBlockTypes2["Rail"] = "minecraft:rail";
  MinecraftBlockTypes2["RawCopperBlock"] = "minecraft:raw_copper_block";
  MinecraftBlockTypes2["RawGoldBlock"] = "minecraft:raw_gold_block";
  MinecraftBlockTypes2["RawIronBlock"] = "minecraft:raw_iron_block";
  MinecraftBlockTypes2["RedCandle"] = "minecraft:red_candle";
  MinecraftBlockTypes2["RedCandleCake"] = "minecraft:red_candle_cake";
  MinecraftBlockTypes2["RedCarpet"] = "minecraft:red_carpet";
  MinecraftBlockTypes2["RedConcrete"] = "minecraft:red_concrete";
  MinecraftBlockTypes2["RedConcretePowder"] = "minecraft:red_concrete_powder";
  MinecraftBlockTypes2["RedGlazedTerracotta"] = "minecraft:red_glazed_terracotta";
  MinecraftBlockTypes2["RedMushroom"] = "minecraft:red_mushroom";
  MinecraftBlockTypes2["RedMushroomBlock"] = "minecraft:red_mushroom_block";
  MinecraftBlockTypes2["RedNetherBrick"] = "minecraft:red_nether_brick";
  MinecraftBlockTypes2["RedNetherBrickDoubleSlab"] = "minecraft:red_nether_brick_double_slab";
  MinecraftBlockTypes2["RedNetherBrickSlab"] = "minecraft:red_nether_brick_slab";
  MinecraftBlockTypes2["RedNetherBrickStairs"] = "minecraft:red_nether_brick_stairs";
  MinecraftBlockTypes2["RedNetherBrickWall"] = "minecraft:red_nether_brick_wall";
  MinecraftBlockTypes2["RedSand"] = "minecraft:red_sand";
  MinecraftBlockTypes2["RedSandstone"] = "minecraft:red_sandstone";
  MinecraftBlockTypes2["RedSandstoneDoubleSlab"] = "minecraft:red_sandstone_double_slab";
  MinecraftBlockTypes2["RedSandstoneSlab"] = "minecraft:red_sandstone_slab";
  MinecraftBlockTypes2["RedSandstoneStairs"] = "minecraft:red_sandstone_stairs";
  MinecraftBlockTypes2["RedSandstoneWall"] = "minecraft:red_sandstone_wall";
  MinecraftBlockTypes2["RedShulkerBox"] = "minecraft:red_shulker_box";
  MinecraftBlockTypes2["RedStainedGlass"] = "minecraft:red_stained_glass";
  MinecraftBlockTypes2["RedStainedGlassPane"] = "minecraft:red_stained_glass_pane";
  MinecraftBlockTypes2["RedTerracotta"] = "minecraft:red_terracotta";
  MinecraftBlockTypes2["RedTulip"] = "minecraft:red_tulip";
  MinecraftBlockTypes2["RedWool"] = "minecraft:red_wool";
  MinecraftBlockTypes2["RedstoneBlock"] = "minecraft:redstone_block";
  MinecraftBlockTypes2["RedstoneLamp"] = "minecraft:redstone_lamp";
  MinecraftBlockTypes2["RedstoneOre"] = "minecraft:redstone_ore";
  MinecraftBlockTypes2["RedstoneTorch"] = "minecraft:redstone_torch";
  MinecraftBlockTypes2["RedstoneWire"] = "minecraft:redstone_wire";
  MinecraftBlockTypes2["Reeds"] = "minecraft:reeds";
  MinecraftBlockTypes2["ReinforcedDeepslate"] = "minecraft:reinforced_deepslate";
  MinecraftBlockTypes2["RepeatingCommandBlock"] = "minecraft:repeating_command_block";
  MinecraftBlockTypes2["ResinBlock"] = "minecraft:resin_block";
  MinecraftBlockTypes2["ResinBrickDoubleSlab"] = "minecraft:resin_brick_double_slab";
  MinecraftBlockTypes2["ResinBrickSlab"] = "minecraft:resin_brick_slab";
  MinecraftBlockTypes2["ResinBrickStairs"] = "minecraft:resin_brick_stairs";
  MinecraftBlockTypes2["ResinBrickWall"] = "minecraft:resin_brick_wall";
  MinecraftBlockTypes2["ResinBricks"] = "minecraft:resin_bricks";
  MinecraftBlockTypes2["ResinClump"] = "minecraft:resin_clump";
  MinecraftBlockTypes2["RespawnAnchor"] = "minecraft:respawn_anchor";
  MinecraftBlockTypes2["RoseBush"] = "minecraft:rose_bush";
  MinecraftBlockTypes2["Sand"] = "minecraft:sand";
  MinecraftBlockTypes2["Sandstone"] = "minecraft:sandstone";
  MinecraftBlockTypes2["SandstoneDoubleSlab"] = "minecraft:sandstone_double_slab";
  MinecraftBlockTypes2["SandstoneSlab"] = "minecraft:sandstone_slab";
  MinecraftBlockTypes2["SandstoneStairs"] = "minecraft:sandstone_stairs";
  MinecraftBlockTypes2["SandstoneWall"] = "minecraft:sandstone_wall";
  MinecraftBlockTypes2["Scaffolding"] = "minecraft:scaffolding";
  MinecraftBlockTypes2["Sculk"] = "minecraft:sculk";
  MinecraftBlockTypes2["SculkCatalyst"] = "minecraft:sculk_catalyst";
  MinecraftBlockTypes2["SculkSensor"] = "minecraft:sculk_sensor";
  MinecraftBlockTypes2["SculkShrieker"] = "minecraft:sculk_shrieker";
  MinecraftBlockTypes2["SculkVein"] = "minecraft:sculk_vein";
  MinecraftBlockTypes2["SeaLantern"] = "minecraft:sea_lantern";
  MinecraftBlockTypes2["SeaPickle"] = "minecraft:sea_pickle";
  MinecraftBlockTypes2["Seagrass"] = "minecraft:seagrass";
  MinecraftBlockTypes2["ShortGrass"] = "minecraft:short_grass";
  MinecraftBlockTypes2["Shroomlight"] = "minecraft:shroomlight";
  MinecraftBlockTypes2["SilverGlazedTerracotta"] = "minecraft:silver_glazed_terracotta";
  MinecraftBlockTypes2["SkeletonSkull"] = "minecraft:skeleton_skull";
  MinecraftBlockTypes2["Slime"] = "minecraft:slime";
  MinecraftBlockTypes2["SmallAmethystBud"] = "minecraft:small_amethyst_bud";
  MinecraftBlockTypes2["SmallDripleafBlock"] = "minecraft:small_dripleaf_block";
  MinecraftBlockTypes2["SmithingTable"] = "minecraft:smithing_table";
  MinecraftBlockTypes2["Smoker"] = "minecraft:smoker";
  MinecraftBlockTypes2["SmoothBasalt"] = "minecraft:smooth_basalt";
  MinecraftBlockTypes2["SmoothQuartz"] = "minecraft:smooth_quartz";
  MinecraftBlockTypes2["SmoothQuartzDoubleSlab"] = "minecraft:smooth_quartz_double_slab";
  MinecraftBlockTypes2["SmoothQuartzSlab"] = "minecraft:smooth_quartz_slab";
  MinecraftBlockTypes2["SmoothQuartzStairs"] = "minecraft:smooth_quartz_stairs";
  MinecraftBlockTypes2["SmoothRedSandstone"] = "minecraft:smooth_red_sandstone";
  MinecraftBlockTypes2["SmoothRedSandstoneDoubleSlab"] = "minecraft:smooth_red_sandstone_double_slab";
  MinecraftBlockTypes2["SmoothRedSandstoneSlab"] = "minecraft:smooth_red_sandstone_slab";
  MinecraftBlockTypes2["SmoothRedSandstoneStairs"] = "minecraft:smooth_red_sandstone_stairs";
  MinecraftBlockTypes2["SmoothSandstone"] = "minecraft:smooth_sandstone";
  MinecraftBlockTypes2["SmoothSandstoneDoubleSlab"] = "minecraft:smooth_sandstone_double_slab";
  MinecraftBlockTypes2["SmoothSandstoneSlab"] = "minecraft:smooth_sandstone_slab";
  MinecraftBlockTypes2["SmoothSandstoneStairs"] = "minecraft:smooth_sandstone_stairs";
  MinecraftBlockTypes2["SmoothStone"] = "minecraft:smooth_stone";
  MinecraftBlockTypes2["SmoothStoneDoubleSlab"] = "minecraft:smooth_stone_double_slab";
  MinecraftBlockTypes2["SmoothStoneSlab"] = "minecraft:smooth_stone_slab";
  MinecraftBlockTypes2["SnifferEgg"] = "minecraft:sniffer_egg";
  MinecraftBlockTypes2["Snow"] = "minecraft:snow";
  MinecraftBlockTypes2["SnowLayer"] = "minecraft:snow_layer";
  MinecraftBlockTypes2["SoulCampfire"] = "minecraft:soul_campfire";
  MinecraftBlockTypes2["SoulFire"] = "minecraft:soul_fire";
  MinecraftBlockTypes2["SoulLantern"] = "minecraft:soul_lantern";
  MinecraftBlockTypes2["SoulSand"] = "minecraft:soul_sand";
  MinecraftBlockTypes2["SoulSoil"] = "minecraft:soul_soil";
  MinecraftBlockTypes2["SoulTorch"] = "minecraft:soul_torch";
  MinecraftBlockTypes2["Sponge"] = "minecraft:sponge";
  MinecraftBlockTypes2["SporeBlossom"] = "minecraft:spore_blossom";
  MinecraftBlockTypes2["SpruceButton"] = "minecraft:spruce_button";
  MinecraftBlockTypes2["SpruceDoor"] = "minecraft:spruce_door";
  MinecraftBlockTypes2["SpruceDoubleSlab"] = "minecraft:spruce_double_slab";
  MinecraftBlockTypes2["SpruceFence"] = "minecraft:spruce_fence";
  MinecraftBlockTypes2["SpruceFenceGate"] = "minecraft:spruce_fence_gate";
  MinecraftBlockTypes2["SpruceHangingSign"] = "minecraft:spruce_hanging_sign";
  MinecraftBlockTypes2["SpruceLeaves"] = "minecraft:spruce_leaves";
  MinecraftBlockTypes2["SpruceLog"] = "minecraft:spruce_log";
  MinecraftBlockTypes2["SprucePlanks"] = "minecraft:spruce_planks";
  MinecraftBlockTypes2["SprucePressurePlate"] = "minecraft:spruce_pressure_plate";
  MinecraftBlockTypes2["SpruceSapling"] = "minecraft:spruce_sapling";
  MinecraftBlockTypes2["SpruceSlab"] = "minecraft:spruce_slab";
  MinecraftBlockTypes2["SpruceStairs"] = "minecraft:spruce_stairs";
  MinecraftBlockTypes2["SpruceStandingSign"] = "minecraft:spruce_standing_sign";
  MinecraftBlockTypes2["SpruceTrapdoor"] = "minecraft:spruce_trapdoor";
  MinecraftBlockTypes2["SpruceWallSign"] = "minecraft:spruce_wall_sign";
  MinecraftBlockTypes2["SpruceWood"] = "minecraft:spruce_wood";
  MinecraftBlockTypes2["StandingBanner"] = "minecraft:standing_banner";
  MinecraftBlockTypes2["StandingSign"] = "minecraft:standing_sign";
  MinecraftBlockTypes2["StickyPiston"] = "minecraft:sticky_piston";
  MinecraftBlockTypes2["StickyPistonArmCollision"] = "minecraft:sticky_piston_arm_collision";
  MinecraftBlockTypes2["Stone"] = "minecraft:stone";
  MinecraftBlockTypes2["StoneBrickDoubleSlab"] = "minecraft:stone_brick_double_slab";
  MinecraftBlockTypes2["StoneBrickSlab"] = "minecraft:stone_brick_slab";
  MinecraftBlockTypes2["StoneBrickStairs"] = "minecraft:stone_brick_stairs";
  MinecraftBlockTypes2["StoneBrickWall"] = "minecraft:stone_brick_wall";
  MinecraftBlockTypes2["StoneBricks"] = "minecraft:stone_bricks";
  MinecraftBlockTypes2["StoneButton"] = "minecraft:stone_button";
  MinecraftBlockTypes2["StonePressurePlate"] = "minecraft:stone_pressure_plate";
  MinecraftBlockTypes2["StoneStairs"] = "minecraft:stone_stairs";
  MinecraftBlockTypes2["StonecutterBlock"] = "minecraft:stonecutter_block";
  MinecraftBlockTypes2["StrippedAcaciaLog"] = "minecraft:stripped_acacia_log";
  MinecraftBlockTypes2["StrippedAcaciaWood"] = "minecraft:stripped_acacia_wood";
  MinecraftBlockTypes2["StrippedBambooBlock"] = "minecraft:stripped_bamboo_block";
  MinecraftBlockTypes2["StrippedBirchLog"] = "minecraft:stripped_birch_log";
  MinecraftBlockTypes2["StrippedBirchWood"] = "minecraft:stripped_birch_wood";
  MinecraftBlockTypes2["StrippedCherryLog"] = "minecraft:stripped_cherry_log";
  MinecraftBlockTypes2["StrippedCherryWood"] = "minecraft:stripped_cherry_wood";
  MinecraftBlockTypes2["StrippedCrimsonHyphae"] = "minecraft:stripped_crimson_hyphae";
  MinecraftBlockTypes2["StrippedCrimsonStem"] = "minecraft:stripped_crimson_stem";
  MinecraftBlockTypes2["StrippedDarkOakLog"] = "minecraft:stripped_dark_oak_log";
  MinecraftBlockTypes2["StrippedDarkOakWood"] = "minecraft:stripped_dark_oak_wood";
  MinecraftBlockTypes2["StrippedJungleLog"] = "minecraft:stripped_jungle_log";
  MinecraftBlockTypes2["StrippedJungleWood"] = "minecraft:stripped_jungle_wood";
  MinecraftBlockTypes2["StrippedMangroveLog"] = "minecraft:stripped_mangrove_log";
  MinecraftBlockTypes2["StrippedMangroveWood"] = "minecraft:stripped_mangrove_wood";
  MinecraftBlockTypes2["StrippedOakLog"] = "minecraft:stripped_oak_log";
  MinecraftBlockTypes2["StrippedOakWood"] = "minecraft:stripped_oak_wood";
  MinecraftBlockTypes2["StrippedPaleOakLog"] = "minecraft:stripped_pale_oak_log";
  MinecraftBlockTypes2["StrippedPaleOakWood"] = "minecraft:stripped_pale_oak_wood";
  MinecraftBlockTypes2["StrippedSpruceLog"] = "minecraft:stripped_spruce_log";
  MinecraftBlockTypes2["StrippedSpruceWood"] = "minecraft:stripped_spruce_wood";
  MinecraftBlockTypes2["StrippedWarpedHyphae"] = "minecraft:stripped_warped_hyphae";
  MinecraftBlockTypes2["StrippedWarpedStem"] = "minecraft:stripped_warped_stem";
  MinecraftBlockTypes2["StructureBlock"] = "minecraft:structure_block";
  MinecraftBlockTypes2["StructureVoid"] = "minecraft:structure_void";
  MinecraftBlockTypes2["Sunflower"] = "minecraft:sunflower";
  MinecraftBlockTypes2["SuspiciousGravel"] = "minecraft:suspicious_gravel";
  MinecraftBlockTypes2["SuspiciousSand"] = "minecraft:suspicious_sand";
  MinecraftBlockTypes2["SweetBerryBush"] = "minecraft:sweet_berry_bush";
  MinecraftBlockTypes2["TallGrass"] = "minecraft:tall_grass";
  MinecraftBlockTypes2["Target"] = "minecraft:target";
  MinecraftBlockTypes2["TintedGlass"] = "minecraft:tinted_glass";
  MinecraftBlockTypes2["Tnt"] = "minecraft:tnt";
  MinecraftBlockTypes2["Torch"] = "minecraft:torch";
  MinecraftBlockTypes2["Torchflower"] = "minecraft:torchflower";
  MinecraftBlockTypes2["TorchflowerCrop"] = "minecraft:torchflower_crop";
  MinecraftBlockTypes2["Trapdoor"] = "minecraft:trapdoor";
  MinecraftBlockTypes2["TrappedChest"] = "minecraft:trapped_chest";
  MinecraftBlockTypes2["TrialSpawner"] = "minecraft:trial_spawner";
  MinecraftBlockTypes2["TripWire"] = "minecraft:trip_wire";
  MinecraftBlockTypes2["TripwireHook"] = "minecraft:tripwire_hook";
  MinecraftBlockTypes2["TubeCoral"] = "minecraft:tube_coral";
  MinecraftBlockTypes2["TubeCoralBlock"] = "minecraft:tube_coral_block";
  MinecraftBlockTypes2["TubeCoralFan"] = "minecraft:tube_coral_fan";
  MinecraftBlockTypes2["TubeCoralWallFan"] = "minecraft:tube_coral_wall_fan";
  MinecraftBlockTypes2["Tuff"] = "minecraft:tuff";
  MinecraftBlockTypes2["TuffBrickDoubleSlab"] = "minecraft:tuff_brick_double_slab";
  MinecraftBlockTypes2["TuffBrickSlab"] = "minecraft:tuff_brick_slab";
  MinecraftBlockTypes2["TuffBrickStairs"] = "minecraft:tuff_brick_stairs";
  MinecraftBlockTypes2["TuffBrickWall"] = "minecraft:tuff_brick_wall";
  MinecraftBlockTypes2["TuffBricks"] = "minecraft:tuff_bricks";
  MinecraftBlockTypes2["TuffDoubleSlab"] = "minecraft:tuff_double_slab";
  MinecraftBlockTypes2["TuffSlab"] = "minecraft:tuff_slab";
  MinecraftBlockTypes2["TuffStairs"] = "minecraft:tuff_stairs";
  MinecraftBlockTypes2["TuffWall"] = "minecraft:tuff_wall";
  MinecraftBlockTypes2["TurtleEgg"] = "minecraft:turtle_egg";
  MinecraftBlockTypes2["TwistingVines"] = "minecraft:twisting_vines";
  MinecraftBlockTypes2["UnderwaterTnt"] = "minecraft:underwater_tnt";
  MinecraftBlockTypes2["UnderwaterTorch"] = "minecraft:underwater_torch";
  MinecraftBlockTypes2["UndyedShulkerBox"] = "minecraft:undyed_shulker_box";
  MinecraftBlockTypes2["Unknown"] = "minecraft:unknown";
  MinecraftBlockTypes2["UnlitRedstoneTorch"] = "minecraft:unlit_redstone_torch";
  MinecraftBlockTypes2["UnpoweredComparator"] = "minecraft:unpowered_comparator";
  MinecraftBlockTypes2["UnpoweredRepeater"] = "minecraft:unpowered_repeater";
  MinecraftBlockTypes2["Vault"] = "minecraft:vault";
  MinecraftBlockTypes2["VerdantFroglight"] = "minecraft:verdant_froglight";
  MinecraftBlockTypes2["Vine"] = "minecraft:vine";
  MinecraftBlockTypes2["WallBanner"] = "minecraft:wall_banner";
  MinecraftBlockTypes2["WallSign"] = "minecraft:wall_sign";
  MinecraftBlockTypes2["WarpedButton"] = "minecraft:warped_button";
  MinecraftBlockTypes2["WarpedDoor"] = "minecraft:warped_door";
  MinecraftBlockTypes2["WarpedDoubleSlab"] = "minecraft:warped_double_slab";
  MinecraftBlockTypes2["WarpedFence"] = "minecraft:warped_fence";
  MinecraftBlockTypes2["WarpedFenceGate"] = "minecraft:warped_fence_gate";
  MinecraftBlockTypes2["WarpedFungus"] = "minecraft:warped_fungus";
  MinecraftBlockTypes2["WarpedHangingSign"] = "minecraft:warped_hanging_sign";
  MinecraftBlockTypes2["WarpedHyphae"] = "minecraft:warped_hyphae";
  MinecraftBlockTypes2["WarpedNylium"] = "minecraft:warped_nylium";
  MinecraftBlockTypes2["WarpedPlanks"] = "minecraft:warped_planks";
  MinecraftBlockTypes2["WarpedPressurePlate"] = "minecraft:warped_pressure_plate";
  MinecraftBlockTypes2["WarpedRoots"] = "minecraft:warped_roots";
  MinecraftBlockTypes2["WarpedSlab"] = "minecraft:warped_slab";
  MinecraftBlockTypes2["WarpedStairs"] = "minecraft:warped_stairs";
  MinecraftBlockTypes2["WarpedStandingSign"] = "minecraft:warped_standing_sign";
  MinecraftBlockTypes2["WarpedStem"] = "minecraft:warped_stem";
  MinecraftBlockTypes2["WarpedTrapdoor"] = "minecraft:warped_trapdoor";
  MinecraftBlockTypes2["WarpedWallSign"] = "minecraft:warped_wall_sign";
  MinecraftBlockTypes2["WarpedWartBlock"] = "minecraft:warped_wart_block";
  MinecraftBlockTypes2["Water"] = "minecraft:water";
  MinecraftBlockTypes2["Waterlily"] = "minecraft:waterlily";
  MinecraftBlockTypes2["WaxedChiseledCopper"] = "minecraft:waxed_chiseled_copper";
  MinecraftBlockTypes2["WaxedCopper"] = "minecraft:waxed_copper";
  MinecraftBlockTypes2["WaxedCopperBulb"] = "minecraft:waxed_copper_bulb";
  MinecraftBlockTypes2["WaxedCopperDoor"] = "minecraft:waxed_copper_door";
  MinecraftBlockTypes2["WaxedCopperGrate"] = "minecraft:waxed_copper_grate";
  MinecraftBlockTypes2["WaxedCopperTrapdoor"] = "minecraft:waxed_copper_trapdoor";
  MinecraftBlockTypes2["WaxedCutCopper"] = "minecraft:waxed_cut_copper";
  MinecraftBlockTypes2["WaxedCutCopperSlab"] = "minecraft:waxed_cut_copper_slab";
  MinecraftBlockTypes2["WaxedCutCopperStairs"] = "minecraft:waxed_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedDoubleCutCopperSlab"] = "minecraft:waxed_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedExposedChiseledCopper"] = "minecraft:waxed_exposed_chiseled_copper";
  MinecraftBlockTypes2["WaxedExposedCopper"] = "minecraft:waxed_exposed_copper";
  MinecraftBlockTypes2["WaxedExposedCopperBulb"] = "minecraft:waxed_exposed_copper_bulb";
  MinecraftBlockTypes2["WaxedExposedCopperDoor"] = "minecraft:waxed_exposed_copper_door";
  MinecraftBlockTypes2["WaxedExposedCopperGrate"] = "minecraft:waxed_exposed_copper_grate";
  MinecraftBlockTypes2["WaxedExposedCopperTrapdoor"] = "minecraft:waxed_exposed_copper_trapdoor";
  MinecraftBlockTypes2["WaxedExposedCutCopper"] = "minecraft:waxed_exposed_cut_copper";
  MinecraftBlockTypes2["WaxedExposedCutCopperSlab"] = "minecraft:waxed_exposed_cut_copper_slab";
  MinecraftBlockTypes2["WaxedExposedCutCopperStairs"] = "minecraft:waxed_exposed_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedExposedDoubleCutCopperSlab"] = "minecraft:waxed_exposed_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedOxidizedChiseledCopper"] = "minecraft:waxed_oxidized_chiseled_copper";
  MinecraftBlockTypes2["WaxedOxidizedCopper"] = "minecraft:waxed_oxidized_copper";
  MinecraftBlockTypes2["WaxedOxidizedCopperBulb"] = "minecraft:waxed_oxidized_copper_bulb";
  MinecraftBlockTypes2["WaxedOxidizedCopperDoor"] = "minecraft:waxed_oxidized_copper_door";
  MinecraftBlockTypes2["WaxedOxidizedCopperGrate"] = "minecraft:waxed_oxidized_copper_grate";
  MinecraftBlockTypes2["WaxedOxidizedCopperTrapdoor"] = "minecraft:waxed_oxidized_copper_trapdoor";
  MinecraftBlockTypes2["WaxedOxidizedCutCopper"] = "minecraft:waxed_oxidized_cut_copper";
  MinecraftBlockTypes2["WaxedOxidizedCutCopperSlab"] = "minecraft:waxed_oxidized_cut_copper_slab";
  MinecraftBlockTypes2["WaxedOxidizedCutCopperStairs"] = "minecraft:waxed_oxidized_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedOxidizedDoubleCutCopperSlab"] = "minecraft:waxed_oxidized_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedWeatheredChiseledCopper"] = "minecraft:waxed_weathered_chiseled_copper";
  MinecraftBlockTypes2["WaxedWeatheredCopper"] = "minecraft:waxed_weathered_copper";
  MinecraftBlockTypes2["WaxedWeatheredCopperBulb"] = "minecraft:waxed_weathered_copper_bulb";
  MinecraftBlockTypes2["WaxedWeatheredCopperDoor"] = "minecraft:waxed_weathered_copper_door";
  MinecraftBlockTypes2["WaxedWeatheredCopperGrate"] = "minecraft:waxed_weathered_copper_grate";
  MinecraftBlockTypes2["WaxedWeatheredCopperTrapdoor"] = "minecraft:waxed_weathered_copper_trapdoor";
  MinecraftBlockTypes2["WaxedWeatheredCutCopper"] = "minecraft:waxed_weathered_cut_copper";
  MinecraftBlockTypes2["WaxedWeatheredCutCopperSlab"] = "minecraft:waxed_weathered_cut_copper_slab";
  MinecraftBlockTypes2["WaxedWeatheredCutCopperStairs"] = "minecraft:waxed_weathered_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedWeatheredDoubleCutCopperSlab"] = "minecraft:waxed_weathered_double_cut_copper_slab";
  MinecraftBlockTypes2["WeatheredChiseledCopper"] = "minecraft:weathered_chiseled_copper";
  MinecraftBlockTypes2["WeatheredCopper"] = "minecraft:weathered_copper";
  MinecraftBlockTypes2["WeatheredCopperBulb"] = "minecraft:weathered_copper_bulb";
  MinecraftBlockTypes2["WeatheredCopperDoor"] = "minecraft:weathered_copper_door";
  MinecraftBlockTypes2["WeatheredCopperGrate"] = "minecraft:weathered_copper_grate";
  MinecraftBlockTypes2["WeatheredCopperTrapdoor"] = "minecraft:weathered_copper_trapdoor";
  MinecraftBlockTypes2["WeatheredCutCopper"] = "minecraft:weathered_cut_copper";
  MinecraftBlockTypes2["WeatheredCutCopperSlab"] = "minecraft:weathered_cut_copper_slab";
  MinecraftBlockTypes2["WeatheredCutCopperStairs"] = "minecraft:weathered_cut_copper_stairs";
  MinecraftBlockTypes2["WeatheredDoubleCutCopperSlab"] = "minecraft:weathered_double_cut_copper_slab";
  MinecraftBlockTypes2["Web"] = "minecraft:web";
  MinecraftBlockTypes2["WeepingVines"] = "minecraft:weeping_vines";
  MinecraftBlockTypes2["WetSponge"] = "minecraft:wet_sponge";
  MinecraftBlockTypes2["Wheat"] = "minecraft:wheat";
  MinecraftBlockTypes2["WhiteCandle"] = "minecraft:white_candle";
  MinecraftBlockTypes2["WhiteCandleCake"] = "minecraft:white_candle_cake";
  MinecraftBlockTypes2["WhiteCarpet"] = "minecraft:white_carpet";
  MinecraftBlockTypes2["WhiteConcrete"] = "minecraft:white_concrete";
  MinecraftBlockTypes2["WhiteConcretePowder"] = "minecraft:white_concrete_powder";
  MinecraftBlockTypes2["WhiteGlazedTerracotta"] = "minecraft:white_glazed_terracotta";
  MinecraftBlockTypes2["WhiteShulkerBox"] = "minecraft:white_shulker_box";
  MinecraftBlockTypes2["WhiteStainedGlass"] = "minecraft:white_stained_glass";
  MinecraftBlockTypes2["WhiteStainedGlassPane"] = "minecraft:white_stained_glass_pane";
  MinecraftBlockTypes2["WhiteTerracotta"] = "minecraft:white_terracotta";
  MinecraftBlockTypes2["WhiteTulip"] = "minecraft:white_tulip";
  MinecraftBlockTypes2["WhiteWool"] = "minecraft:white_wool";
  MinecraftBlockTypes2["WitherRose"] = "minecraft:wither_rose";
  MinecraftBlockTypes2["WitherSkeletonSkull"] = "minecraft:wither_skeleton_skull";
  MinecraftBlockTypes2["WoodenButton"] = "minecraft:wooden_button";
  MinecraftBlockTypes2["WoodenDoor"] = "minecraft:wooden_door";
  MinecraftBlockTypes2["WoodenPressurePlate"] = "minecraft:wooden_pressure_plate";
  MinecraftBlockTypes2["YellowCandle"] = "minecraft:yellow_candle";
  MinecraftBlockTypes2["YellowCandleCake"] = "minecraft:yellow_candle_cake";
  MinecraftBlockTypes2["YellowCarpet"] = "minecraft:yellow_carpet";
  MinecraftBlockTypes2["YellowConcrete"] = "minecraft:yellow_concrete";
  MinecraftBlockTypes2["YellowConcretePowder"] = "minecraft:yellow_concrete_powder";
  MinecraftBlockTypes2["YellowGlazedTerracotta"] = "minecraft:yellow_glazed_terracotta";
  MinecraftBlockTypes2["YellowShulkerBox"] = "minecraft:yellow_shulker_box";
  MinecraftBlockTypes2["YellowStainedGlass"] = "minecraft:yellow_stained_glass";
  MinecraftBlockTypes2["YellowStainedGlassPane"] = "minecraft:yellow_stained_glass_pane";
  MinecraftBlockTypes2["YellowTerracotta"] = "minecraft:yellow_terracotta";
  MinecraftBlockTypes2["YellowWool"] = "minecraft:yellow_wool";
  MinecraftBlockTypes2["ZombieHead"] = "minecraft:zombie_head";
  return MinecraftBlockTypes2;
})(MinecraftBlockTypes || {});
var MinecraftCameraPresetsTypes = ((MinecraftCameraPresetsTypes2) => {
  MinecraftCameraPresetsTypes2["FirstPerson"] = "minecraft:first_person";
  MinecraftCameraPresetsTypes2["FixedBoom"] = "minecraft:fixed_boom";
  MinecraftCameraPresetsTypes2["FollowOrbit"] = "minecraft:follow_orbit";
  MinecraftCameraPresetsTypes2["Free"] = "minecraft:free";
  MinecraftCameraPresetsTypes2["ThirdPerson"] = "minecraft:third_person";
  MinecraftCameraPresetsTypes2["ThirdPersonFront"] = "minecraft:third_person_front";
  return MinecraftCameraPresetsTypes2;
})(MinecraftCameraPresetsTypes || {});
var MinecraftCooldownCategoryTypes = ((MinecraftCooldownCategoryTypes2) => {
  MinecraftCooldownCategoryTypes2["Chorusfruit"] = "minecraft:chorusfruit";
  MinecraftCooldownCategoryTypes2["EnderPearl"] = "minecraft:ender_pearl";
  MinecraftCooldownCategoryTypes2["GoatHorn"] = "minecraft:goat_horn";
  MinecraftCooldownCategoryTypes2["Shield"] = "minecraft:shield";
  MinecraftCooldownCategoryTypes2["WindCharge"] = "minecraft:wind_charge";
  return MinecraftCooldownCategoryTypes2;
})(MinecraftCooldownCategoryTypes || {});
var MinecraftDimensionTypes = ((MinecraftDimensionTypes2) => {
  MinecraftDimensionTypes2["Nether"] = "minecraft:nether";
  MinecraftDimensionTypes2["Overworld"] = "minecraft:overworld";
  MinecraftDimensionTypes2["TheEnd"] = "minecraft:the_end";
  return MinecraftDimensionTypes2;
})(MinecraftDimensionTypes || {});
var MinecraftEffectTypes = ((MinecraftEffectTypes2) => {
  MinecraftEffectTypes2["Absorption"] = "minecraft:absorption";
  MinecraftEffectTypes2["BadOmen"] = "minecraft:bad_omen";
  MinecraftEffectTypes2["Blindness"] = "minecraft:blindness";
  MinecraftEffectTypes2["ConduitPower"] = "minecraft:conduit_power";
  MinecraftEffectTypes2["Darkness"] = "minecraft:darkness";
  MinecraftEffectTypes2["FatalPoison"] = "minecraft:fatal_poison";
  MinecraftEffectTypes2["FireResistance"] = "minecraft:fire_resistance";
  MinecraftEffectTypes2["Haste"] = "minecraft:haste";
  MinecraftEffectTypes2["HealthBoost"] = "minecraft:health_boost";
  MinecraftEffectTypes2["Hunger"] = "minecraft:hunger";
  MinecraftEffectTypes2["Infested"] = "minecraft:infested";
  MinecraftEffectTypes2["InstantDamage"] = "minecraft:instant_damage";
  MinecraftEffectTypes2["InstantHealth"] = "minecraft:instant_health";
  MinecraftEffectTypes2["Invisibility"] = "minecraft:invisibility";
  MinecraftEffectTypes2["JumpBoost"] = "minecraft:jump_boost";
  MinecraftEffectTypes2["Levitation"] = "minecraft:levitation";
  MinecraftEffectTypes2["MiningFatigue"] = "minecraft:mining_fatigue";
  MinecraftEffectTypes2["Nausea"] = "minecraft:nausea";
  MinecraftEffectTypes2["NightVision"] = "minecraft:night_vision";
  MinecraftEffectTypes2["Oozing"] = "minecraft:oozing";
  MinecraftEffectTypes2["Poison"] = "minecraft:poison";
  MinecraftEffectTypes2["RaidOmen"] = "minecraft:raid_omen";
  MinecraftEffectTypes2["Regeneration"] = "minecraft:regeneration";
  MinecraftEffectTypes2["Resistance"] = "minecraft:resistance";
  MinecraftEffectTypes2["Saturation"] = "minecraft:saturation";
  MinecraftEffectTypes2["SlowFalling"] = "minecraft:slow_falling";
  MinecraftEffectTypes2["Slowness"] = "minecraft:slowness";
  MinecraftEffectTypes2["Speed"] = "minecraft:speed";
  MinecraftEffectTypes2["Strength"] = "minecraft:strength";
  MinecraftEffectTypes2["TrialOmen"] = "minecraft:trial_omen";
  MinecraftEffectTypes2["VillageHero"] = "minecraft:village_hero";
  MinecraftEffectTypes2["WaterBreathing"] = "minecraft:water_breathing";
  MinecraftEffectTypes2["Weakness"] = "minecraft:weakness";
  MinecraftEffectTypes2["Weaving"] = "minecraft:weaving";
  MinecraftEffectTypes2["WindCharged"] = "minecraft:wind_charged";
  MinecraftEffectTypes2["Wither"] = "minecraft:wither";
  return MinecraftEffectTypes2;
})(MinecraftEffectTypes || {});
var MinecraftEnchantmentTypes = ((MinecraftEnchantmentTypes2) => {
  MinecraftEnchantmentTypes2["AquaAffinity"] = "minecraft:aqua_affinity";
  MinecraftEnchantmentTypes2["BaneOfArthropods"] = "minecraft:bane_of_arthropods";
  MinecraftEnchantmentTypes2["Binding"] = "minecraft:binding";
  MinecraftEnchantmentTypes2["BlastProtection"] = "minecraft:blast_protection";
  MinecraftEnchantmentTypes2["BowInfinity"] = "minecraft:infinity";
  MinecraftEnchantmentTypes2["Breach"] = "minecraft:breach";
  MinecraftEnchantmentTypes2["Channeling"] = "minecraft:channeling";
  MinecraftEnchantmentTypes2["Density"] = "minecraft:density";
  MinecraftEnchantmentTypes2["DepthStrider"] = "minecraft:depth_strider";
  MinecraftEnchantmentTypes2["Efficiency"] = "minecraft:efficiency";
  MinecraftEnchantmentTypes2["FeatherFalling"] = "minecraft:feather_falling";
  MinecraftEnchantmentTypes2["FireAspect"] = "minecraft:fire_aspect";
  MinecraftEnchantmentTypes2["FireProtection"] = "minecraft:fire_protection";
  MinecraftEnchantmentTypes2["Flame"] = "minecraft:flame";
  MinecraftEnchantmentTypes2["Fortune"] = "minecraft:fortune";
  MinecraftEnchantmentTypes2["FrostWalker"] = "minecraft:frost_walker";
  MinecraftEnchantmentTypes2["Impaling"] = "minecraft:impaling";
  MinecraftEnchantmentTypes2["Knockback"] = "minecraft:knockback";
  MinecraftEnchantmentTypes2["Looting"] = "minecraft:looting";
  MinecraftEnchantmentTypes2["Loyalty"] = "minecraft:loyalty";
  MinecraftEnchantmentTypes2["LuckOfTheSea"] = "minecraft:luck_of_the_sea";
  MinecraftEnchantmentTypes2["Lure"] = "minecraft:lure";
  MinecraftEnchantmentTypes2["Mending"] = "minecraft:mending";
  MinecraftEnchantmentTypes2["Multishot"] = "minecraft:multishot";
  MinecraftEnchantmentTypes2["Piercing"] = "minecraft:piercing";
  MinecraftEnchantmentTypes2["Power"] = "minecraft:power";
  MinecraftEnchantmentTypes2["ProjectileProtection"] = "minecraft:projectile_protection";
  MinecraftEnchantmentTypes2["Protection"] = "minecraft:protection";
  MinecraftEnchantmentTypes2["Punch"] = "minecraft:punch";
  MinecraftEnchantmentTypes2["QuickCharge"] = "minecraft:quick_charge";
  MinecraftEnchantmentTypes2["Respiration"] = "minecraft:respiration";
  MinecraftEnchantmentTypes2["Riptide"] = "minecraft:riptide";
  MinecraftEnchantmentTypes2["Sharpness"] = "minecraft:sharpness";
  MinecraftEnchantmentTypes2["SilkTouch"] = "minecraft:silk_touch";
  MinecraftEnchantmentTypes2["Smite"] = "minecraft:smite";
  MinecraftEnchantmentTypes2["SoulSpeed"] = "minecraft:soul_speed";
  MinecraftEnchantmentTypes2["SwiftSneak"] = "minecraft:swift_sneak";
  MinecraftEnchantmentTypes2["Thorns"] = "minecraft:thorns";
  MinecraftEnchantmentTypes2["Unbreaking"] = "minecraft:unbreaking";
  MinecraftEnchantmentTypes2["Vanishing"] = "minecraft:vanishing";
  MinecraftEnchantmentTypes2["WindBurst"] = "minecraft:wind_burst";
  return MinecraftEnchantmentTypes2;
})(MinecraftEnchantmentTypes || {});
var MinecraftEntityTypes = ((MinecraftEntityTypes2) => {
  MinecraftEntityTypes2["Agent"] = "minecraft:agent";
  MinecraftEntityTypes2["Allay"] = "minecraft:allay";
  MinecraftEntityTypes2["AreaEffectCloud"] = "minecraft:area_effect_cloud";
  MinecraftEntityTypes2["Armadillo"] = "minecraft:armadillo";
  MinecraftEntityTypes2["ArmorStand"] = "minecraft:armor_stand";
  MinecraftEntityTypes2["Arrow"] = "minecraft:arrow";
  MinecraftEntityTypes2["Axolotl"] = "minecraft:axolotl";
  MinecraftEntityTypes2["Bat"] = "minecraft:bat";
  MinecraftEntityTypes2["Bee"] = "minecraft:bee";
  MinecraftEntityTypes2["Blaze"] = "minecraft:blaze";
  MinecraftEntityTypes2["Boat"] = "minecraft:boat";
  MinecraftEntityTypes2["Bogged"] = "minecraft:bogged";
  MinecraftEntityTypes2["Breeze"] = "minecraft:breeze";
  MinecraftEntityTypes2["BreezeWindChargeProjectile"] = "minecraft:breeze_wind_charge_projectile";
  MinecraftEntityTypes2["Camel"] = "minecraft:camel";
  MinecraftEntityTypes2["Cat"] = "minecraft:cat";
  MinecraftEntityTypes2["CaveSpider"] = "minecraft:cave_spider";
  MinecraftEntityTypes2["ChestBoat"] = "minecraft:chest_boat";
  MinecraftEntityTypes2["ChestMinecart"] = "minecraft:chest_minecart";
  MinecraftEntityTypes2["Chicken"] = "minecraft:chicken";
  MinecraftEntityTypes2["Cod"] = "minecraft:cod";
  MinecraftEntityTypes2["CommandBlockMinecart"] = "minecraft:command_block_minecart";
  MinecraftEntityTypes2["Cow"] = "minecraft:cow";
  MinecraftEntityTypes2["Creaking"] = "minecraft:creaking";
  MinecraftEntityTypes2["Creeper"] = "minecraft:creeper";
  MinecraftEntityTypes2["Dolphin"] = "minecraft:dolphin";
  MinecraftEntityTypes2["Donkey"] = "minecraft:donkey";
  MinecraftEntityTypes2["DragonFireball"] = "minecraft:dragon_fireball";
  MinecraftEntityTypes2["Drowned"] = "minecraft:drowned";
  MinecraftEntityTypes2["Egg"] = "minecraft:egg";
  MinecraftEntityTypes2["ElderGuardian"] = "minecraft:elder_guardian";
  MinecraftEntityTypes2["EnderCrystal"] = "minecraft:ender_crystal";
  MinecraftEntityTypes2["EnderDragon"] = "minecraft:ender_dragon";
  MinecraftEntityTypes2["EnderPearl"] = "minecraft:ender_pearl";
  MinecraftEntityTypes2["Enderman"] = "minecraft:enderman";
  MinecraftEntityTypes2["Endermite"] = "minecraft:endermite";
  MinecraftEntityTypes2["EvocationIllager"] = "minecraft:evocation_illager";
  MinecraftEntityTypes2["EyeOfEnderSignal"] = "minecraft:eye_of_ender_signal";
  MinecraftEntityTypes2["Fireball"] = "minecraft:fireball";
  MinecraftEntityTypes2["FireworksRocket"] = "minecraft:fireworks_rocket";
  MinecraftEntityTypes2["FishingHook"] = "minecraft:fishing_hook";
  MinecraftEntityTypes2["Fox"] = "minecraft:fox";
  MinecraftEntityTypes2["Frog"] = "minecraft:frog";
  MinecraftEntityTypes2["Ghast"] = "minecraft:ghast";
  MinecraftEntityTypes2["GlowSquid"] = "minecraft:glow_squid";
  MinecraftEntityTypes2["Goat"] = "minecraft:goat";
  MinecraftEntityTypes2["Guardian"] = "minecraft:guardian";
  MinecraftEntityTypes2["Hoglin"] = "minecraft:hoglin";
  MinecraftEntityTypes2["HopperMinecart"] = "minecraft:hopper_minecart";
  MinecraftEntityTypes2["Horse"] = "minecraft:horse";
  MinecraftEntityTypes2["Husk"] = "minecraft:husk";
  MinecraftEntityTypes2["IronGolem"] = "minecraft:iron_golem";
  MinecraftEntityTypes2["LightningBolt"] = "minecraft:lightning_bolt";
  MinecraftEntityTypes2["LingeringPotion"] = "minecraft:lingering_potion";
  MinecraftEntityTypes2["Llama"] = "minecraft:llama";
  MinecraftEntityTypes2["LlamaSpit"] = "minecraft:llama_spit";
  MinecraftEntityTypes2["MagmaCube"] = "minecraft:magma_cube";
  MinecraftEntityTypes2["Minecart"] = "minecraft:minecart";
  MinecraftEntityTypes2["Mooshroom"] = "minecraft:mooshroom";
  MinecraftEntityTypes2["Mule"] = "minecraft:mule";
  MinecraftEntityTypes2["Npc"] = "minecraft:npc";
  MinecraftEntityTypes2["Ocelot"] = "minecraft:ocelot";
  MinecraftEntityTypes2["OminousItemSpawner"] = "minecraft:ominous_item_spawner";
  MinecraftEntityTypes2["Panda"] = "minecraft:panda";
  MinecraftEntityTypes2["Parrot"] = "minecraft:parrot";
  MinecraftEntityTypes2["Phantom"] = "minecraft:phantom";
  MinecraftEntityTypes2["Pig"] = "minecraft:pig";
  MinecraftEntityTypes2["Piglin"] = "minecraft:piglin";
  MinecraftEntityTypes2["PiglinBrute"] = "minecraft:piglin_brute";
  MinecraftEntityTypes2["Pillager"] = "minecraft:pillager";
  MinecraftEntityTypes2["Player"] = "minecraft:player";
  MinecraftEntityTypes2["PolarBear"] = "minecraft:polar_bear";
  MinecraftEntityTypes2["Pufferfish"] = "minecraft:pufferfish";
  MinecraftEntityTypes2["Rabbit"] = "minecraft:rabbit";
  MinecraftEntityTypes2["Ravager"] = "minecraft:ravager";
  MinecraftEntityTypes2["Salmon"] = "minecraft:salmon";
  MinecraftEntityTypes2["Sheep"] = "minecraft:sheep";
  MinecraftEntityTypes2["Shulker"] = "minecraft:shulker";
  MinecraftEntityTypes2["ShulkerBullet"] = "minecraft:shulker_bullet";
  MinecraftEntityTypes2["Silverfish"] = "minecraft:silverfish";
  MinecraftEntityTypes2["Skeleton"] = "minecraft:skeleton";
  MinecraftEntityTypes2["SkeletonHorse"] = "minecraft:skeleton_horse";
  MinecraftEntityTypes2["Slime"] = "minecraft:slime";
  MinecraftEntityTypes2["SmallFireball"] = "minecraft:small_fireball";
  MinecraftEntityTypes2["Sniffer"] = "minecraft:sniffer";
  MinecraftEntityTypes2["SnowGolem"] = "minecraft:snow_golem";
  MinecraftEntityTypes2["Snowball"] = "minecraft:snowball";
  MinecraftEntityTypes2["Spider"] = "minecraft:spider";
  MinecraftEntityTypes2["SplashPotion"] = "minecraft:splash_potion";
  MinecraftEntityTypes2["Squid"] = "minecraft:squid";
  MinecraftEntityTypes2["Stray"] = "minecraft:stray";
  MinecraftEntityTypes2["Strider"] = "minecraft:strider";
  MinecraftEntityTypes2["Tadpole"] = "minecraft:tadpole";
  MinecraftEntityTypes2["ThrownTrident"] = "minecraft:thrown_trident";
  MinecraftEntityTypes2["Tnt"] = "minecraft:tnt";
  MinecraftEntityTypes2["TntMinecart"] = "minecraft:tnt_minecart";
  MinecraftEntityTypes2["TraderLlama"] = "minecraft:trader_llama";
  MinecraftEntityTypes2["TripodCamera"] = "minecraft:tripod_camera";
  MinecraftEntityTypes2["Tropicalfish"] = "minecraft:tropicalfish";
  MinecraftEntityTypes2["Turtle"] = "minecraft:turtle";
  MinecraftEntityTypes2["Vex"] = "minecraft:vex";
  MinecraftEntityTypes2["Villager"] = "minecraft:villager";
  MinecraftEntityTypes2["VillagerV2"] = "minecraft:villager_v2";
  MinecraftEntityTypes2["Vindicator"] = "minecraft:vindicator";
  MinecraftEntityTypes2["WanderingTrader"] = "minecraft:wandering_trader";
  MinecraftEntityTypes2["Warden"] = "minecraft:warden";
  MinecraftEntityTypes2["WindChargeProjectile"] = "minecraft:wind_charge_projectile";
  MinecraftEntityTypes2["Witch"] = "minecraft:witch";
  MinecraftEntityTypes2["Wither"] = "minecraft:wither";
  MinecraftEntityTypes2["WitherSkeleton"] = "minecraft:wither_skeleton";
  MinecraftEntityTypes2["WitherSkull"] = "minecraft:wither_skull";
  MinecraftEntityTypes2["WitherSkullDangerous"] = "minecraft:wither_skull_dangerous";
  MinecraftEntityTypes2["Wolf"] = "minecraft:wolf";
  MinecraftEntityTypes2["XpBottle"] = "minecraft:xp_bottle";
  MinecraftEntityTypes2["XpOrb"] = "minecraft:xp_orb";
  MinecraftEntityTypes2["Zoglin"] = "minecraft:zoglin";
  MinecraftEntityTypes2["Zombie"] = "minecraft:zombie";
  MinecraftEntityTypes2["ZombieHorse"] = "minecraft:zombie_horse";
  MinecraftEntityTypes2["ZombiePigman"] = "minecraft:zombie_pigman";
  MinecraftEntityTypes2["ZombieVillager"] = "minecraft:zombie_villager";
  MinecraftEntityTypes2["ZombieVillagerV2"] = "minecraft:zombie_villager_v2";
  return MinecraftEntityTypes2;
})(MinecraftEntityTypes || {});
var MinecraftFeatureTypes = ((MinecraftFeatureTypes2) => {
  MinecraftFeatureTypes2["AncientCity"] = "minecraft:ancient_city";
  MinecraftFeatureTypes2["BastionRemnant"] = "minecraft:bastion_remnant";
  MinecraftFeatureTypes2["BuriedTreasure"] = "minecraft:buried_treasure";
  MinecraftFeatureTypes2["EndCity"] = "minecraft:end_city";
  MinecraftFeatureTypes2["Fortress"] = "minecraft:fortress";
  MinecraftFeatureTypes2["Mansion"] = "minecraft:mansion";
  MinecraftFeatureTypes2["Mineshaft"] = "minecraft:mineshaft";
  MinecraftFeatureTypes2["Monument"] = "minecraft:monument";
  MinecraftFeatureTypes2["PillagerOutpost"] = "minecraft:pillager_outpost";
  MinecraftFeatureTypes2["RuinedPortal"] = "minecraft:ruined_portal";
  MinecraftFeatureTypes2["Ruins"] = "minecraft:ruins";
  MinecraftFeatureTypes2["Shipwreck"] = "minecraft:shipwreck";
  MinecraftFeatureTypes2["Stronghold"] = "minecraft:stronghold";
  MinecraftFeatureTypes2["Temple"] = "minecraft:temple";
  MinecraftFeatureTypes2["TrailRuins"] = "minecraft:trail_ruins";
  MinecraftFeatureTypes2["TrialChambers"] = "minecraft:trial_chambers";
  MinecraftFeatureTypes2["Village"] = "minecraft:village";
  return MinecraftFeatureTypes2;
})(MinecraftFeatureTypes || {});
var MinecraftItemTypes = ((MinecraftItemTypes2) => {
  MinecraftItemTypes2["AcaciaBoat"] = "minecraft:acacia_boat";
  MinecraftItemTypes2["AcaciaButton"] = "minecraft:acacia_button";
  MinecraftItemTypes2["AcaciaChestBoat"] = "minecraft:acacia_chest_boat";
  MinecraftItemTypes2["AcaciaDoor"] = "minecraft:acacia_door";
  MinecraftItemTypes2["AcaciaFence"] = "minecraft:acacia_fence";
  MinecraftItemTypes2["AcaciaFenceGate"] = "minecraft:acacia_fence_gate";
  MinecraftItemTypes2["AcaciaHangingSign"] = "minecraft:acacia_hanging_sign";
  MinecraftItemTypes2["AcaciaLeaves"] = "minecraft:acacia_leaves";
  MinecraftItemTypes2["AcaciaLog"] = "minecraft:acacia_log";
  MinecraftItemTypes2["AcaciaPlanks"] = "minecraft:acacia_planks";
  MinecraftItemTypes2["AcaciaPressurePlate"] = "minecraft:acacia_pressure_plate";
  MinecraftItemTypes2["AcaciaSapling"] = "minecraft:acacia_sapling";
  MinecraftItemTypes2["AcaciaSign"] = "minecraft:acacia_sign";
  MinecraftItemTypes2["AcaciaSlab"] = "minecraft:acacia_slab";
  MinecraftItemTypes2["AcaciaStairs"] = "minecraft:acacia_stairs";
  MinecraftItemTypes2["AcaciaTrapdoor"] = "minecraft:acacia_trapdoor";
  MinecraftItemTypes2["AcaciaWood"] = "minecraft:acacia_wood";
  MinecraftItemTypes2["ActivatorRail"] = "minecraft:activator_rail";
  MinecraftItemTypes2["AllaySpawnEgg"] = "minecraft:allay_spawn_egg";
  MinecraftItemTypes2["Allium"] = "minecraft:allium";
  MinecraftItemTypes2["Allow"] = "minecraft:allow";
  MinecraftItemTypes2["AmethystBlock"] = "minecraft:amethyst_block";
  MinecraftItemTypes2["AmethystCluster"] = "minecraft:amethyst_cluster";
  MinecraftItemTypes2["AmethystShard"] = "minecraft:amethyst_shard";
  MinecraftItemTypes2["AncientDebris"] = "minecraft:ancient_debris";
  MinecraftItemTypes2["Andesite"] = "minecraft:andesite";
  MinecraftItemTypes2["AndesiteSlab"] = "minecraft:andesite_slab";
  MinecraftItemTypes2["AndesiteStairs"] = "minecraft:andesite_stairs";
  MinecraftItemTypes2["AndesiteWall"] = "minecraft:andesite_wall";
  MinecraftItemTypes2["AnglerPotterySherd"] = "minecraft:angler_pottery_sherd";
  MinecraftItemTypes2["Anvil"] = "minecraft:anvil";
  MinecraftItemTypes2["Apple"] = "minecraft:apple";
  MinecraftItemTypes2["ArcherPotterySherd"] = "minecraft:archer_pottery_sherd";
  MinecraftItemTypes2["ArmadilloScute"] = "minecraft:armadillo_scute";
  MinecraftItemTypes2["ArmadilloSpawnEgg"] = "minecraft:armadillo_spawn_egg";
  MinecraftItemTypes2["ArmorStand"] = "minecraft:armor_stand";
  MinecraftItemTypes2["ArmsUpPotterySherd"] = "minecraft:arms_up_pottery_sherd";
  MinecraftItemTypes2["Arrow"] = "minecraft:arrow";
  MinecraftItemTypes2["AxolotlBucket"] = "minecraft:axolotl_bucket";
  MinecraftItemTypes2["AxolotlSpawnEgg"] = "minecraft:axolotl_spawn_egg";
  MinecraftItemTypes2["Azalea"] = "minecraft:azalea";
  MinecraftItemTypes2["AzaleaLeaves"] = "minecraft:azalea_leaves";
  MinecraftItemTypes2["AzaleaLeavesFlowered"] = "minecraft:azalea_leaves_flowered";
  MinecraftItemTypes2["AzureBluet"] = "minecraft:azure_bluet";
  MinecraftItemTypes2["BakedPotato"] = "minecraft:baked_potato";
  MinecraftItemTypes2["Bamboo"] = "minecraft:bamboo";
  MinecraftItemTypes2["BambooBlock"] = "minecraft:bamboo_block";
  MinecraftItemTypes2["BambooButton"] = "minecraft:bamboo_button";
  MinecraftItemTypes2["BambooChestRaft"] = "minecraft:bamboo_chest_raft";
  MinecraftItemTypes2["BambooDoor"] = "minecraft:bamboo_door";
  MinecraftItemTypes2["BambooFence"] = "minecraft:bamboo_fence";
  MinecraftItemTypes2["BambooFenceGate"] = "minecraft:bamboo_fence_gate";
  MinecraftItemTypes2["BambooHangingSign"] = "minecraft:bamboo_hanging_sign";
  MinecraftItemTypes2["BambooMosaic"] = "minecraft:bamboo_mosaic";
  MinecraftItemTypes2["BambooMosaicSlab"] = "minecraft:bamboo_mosaic_slab";
  MinecraftItemTypes2["BambooMosaicStairs"] = "minecraft:bamboo_mosaic_stairs";
  MinecraftItemTypes2["BambooPlanks"] = "minecraft:bamboo_planks";
  MinecraftItemTypes2["BambooPressurePlate"] = "minecraft:bamboo_pressure_plate";
  MinecraftItemTypes2["BambooRaft"] = "minecraft:bamboo_raft";
  MinecraftItemTypes2["BambooSign"] = "minecraft:bamboo_sign";
  MinecraftItemTypes2["BambooSlab"] = "minecraft:bamboo_slab";
  MinecraftItemTypes2["BambooStairs"] = "minecraft:bamboo_stairs";
  MinecraftItemTypes2["BambooTrapdoor"] = "minecraft:bamboo_trapdoor";
  MinecraftItemTypes2["Banner"] = "minecraft:banner";
  MinecraftItemTypes2["Barrel"] = "minecraft:barrel";
  MinecraftItemTypes2["Barrier"] = "minecraft:barrier";
  MinecraftItemTypes2["Basalt"] = "minecraft:basalt";
  MinecraftItemTypes2["BatSpawnEgg"] = "minecraft:bat_spawn_egg";
  MinecraftItemTypes2["Beacon"] = "minecraft:beacon";
  MinecraftItemTypes2["Bed"] = "minecraft:bed";
  MinecraftItemTypes2["Bedrock"] = "minecraft:bedrock";
  MinecraftItemTypes2["BeeNest"] = "minecraft:bee_nest";
  MinecraftItemTypes2["BeeSpawnEgg"] = "minecraft:bee_spawn_egg";
  MinecraftItemTypes2["Beef"] = "minecraft:beef";
  MinecraftItemTypes2["Beehive"] = "minecraft:beehive";
  MinecraftItemTypes2["Beetroot"] = "minecraft:beetroot";
  MinecraftItemTypes2["BeetrootSeeds"] = "minecraft:beetroot_seeds";
  MinecraftItemTypes2["BeetrootSoup"] = "minecraft:beetroot_soup";
  MinecraftItemTypes2["Bell"] = "minecraft:bell";
  MinecraftItemTypes2["BigDripleaf"] = "minecraft:big_dripleaf";
  MinecraftItemTypes2["BirchBoat"] = "minecraft:birch_boat";
  MinecraftItemTypes2["BirchButton"] = "minecraft:birch_button";
  MinecraftItemTypes2["BirchChestBoat"] = "minecraft:birch_chest_boat";
  MinecraftItemTypes2["BirchDoor"] = "minecraft:birch_door";
  MinecraftItemTypes2["BirchFence"] = "minecraft:birch_fence";
  MinecraftItemTypes2["BirchFenceGate"] = "minecraft:birch_fence_gate";
  MinecraftItemTypes2["BirchHangingSign"] = "minecraft:birch_hanging_sign";
  MinecraftItemTypes2["BirchLeaves"] = "minecraft:birch_leaves";
  MinecraftItemTypes2["BirchLog"] = "minecraft:birch_log";
  MinecraftItemTypes2["BirchPlanks"] = "minecraft:birch_planks";
  MinecraftItemTypes2["BirchPressurePlate"] = "minecraft:birch_pressure_plate";
  MinecraftItemTypes2["BirchSapling"] = "minecraft:birch_sapling";
  MinecraftItemTypes2["BirchSign"] = "minecraft:birch_sign";
  MinecraftItemTypes2["BirchSlab"] = "minecraft:birch_slab";
  MinecraftItemTypes2["BirchStairs"] = "minecraft:birch_stairs";
  MinecraftItemTypes2["BirchTrapdoor"] = "minecraft:birch_trapdoor";
  MinecraftItemTypes2["BirchWood"] = "minecraft:birch_wood";
  MinecraftItemTypes2["BlackBundle"] = "minecraft:black_bundle";
  MinecraftItemTypes2["BlackCandle"] = "minecraft:black_candle";
  MinecraftItemTypes2["BlackCarpet"] = "minecraft:black_carpet";
  MinecraftItemTypes2["BlackConcrete"] = "minecraft:black_concrete";
  MinecraftItemTypes2["BlackConcretePowder"] = "minecraft:black_concrete_powder";
  MinecraftItemTypes2["BlackDye"] = "minecraft:black_dye";
  MinecraftItemTypes2["BlackGlazedTerracotta"] = "minecraft:black_glazed_terracotta";
  MinecraftItemTypes2["BlackShulkerBox"] = "minecraft:black_shulker_box";
  MinecraftItemTypes2["BlackStainedGlass"] = "minecraft:black_stained_glass";
  MinecraftItemTypes2["BlackStainedGlassPane"] = "minecraft:black_stained_glass_pane";
  MinecraftItemTypes2["BlackTerracotta"] = "minecraft:black_terracotta";
  MinecraftItemTypes2["BlackWool"] = "minecraft:black_wool";
  MinecraftItemTypes2["Blackstone"] = "minecraft:blackstone";
  MinecraftItemTypes2["BlackstoneSlab"] = "minecraft:blackstone_slab";
  MinecraftItemTypes2["BlackstoneStairs"] = "minecraft:blackstone_stairs";
  MinecraftItemTypes2["BlackstoneWall"] = "minecraft:blackstone_wall";
  MinecraftItemTypes2["BladePotterySherd"] = "minecraft:blade_pottery_sherd";
  MinecraftItemTypes2["BlastFurnace"] = "minecraft:blast_furnace";
  MinecraftItemTypes2["BlazePowder"] = "minecraft:blaze_powder";
  MinecraftItemTypes2["BlazeRod"] = "minecraft:blaze_rod";
  MinecraftItemTypes2["BlazeSpawnEgg"] = "minecraft:blaze_spawn_egg";
  MinecraftItemTypes2["BlueBundle"] = "minecraft:blue_bundle";
  MinecraftItemTypes2["BlueCandle"] = "minecraft:blue_candle";
  MinecraftItemTypes2["BlueCarpet"] = "minecraft:blue_carpet";
  MinecraftItemTypes2["BlueConcrete"] = "minecraft:blue_concrete";
  MinecraftItemTypes2["BlueConcretePowder"] = "minecraft:blue_concrete_powder";
  MinecraftItemTypes2["BlueDye"] = "minecraft:blue_dye";
  MinecraftItemTypes2["BlueGlazedTerracotta"] = "minecraft:blue_glazed_terracotta";
  MinecraftItemTypes2["BlueIce"] = "minecraft:blue_ice";
  MinecraftItemTypes2["BlueOrchid"] = "minecraft:blue_orchid";
  MinecraftItemTypes2["BlueShulkerBox"] = "minecraft:blue_shulker_box";
  MinecraftItemTypes2["BlueStainedGlass"] = "minecraft:blue_stained_glass";
  MinecraftItemTypes2["BlueStainedGlassPane"] = "minecraft:blue_stained_glass_pane";
  MinecraftItemTypes2["BlueTerracotta"] = "minecraft:blue_terracotta";
  MinecraftItemTypes2["BlueWool"] = "minecraft:blue_wool";
  MinecraftItemTypes2["BoggedSpawnEgg"] = "minecraft:bogged_spawn_egg";
  MinecraftItemTypes2["BoltArmorTrimSmithingTemplate"] = "minecraft:bolt_armor_trim_smithing_template";
  MinecraftItemTypes2["Bone"] = "minecraft:bone";
  MinecraftItemTypes2["BoneBlock"] = "minecraft:bone_block";
  MinecraftItemTypes2["BoneMeal"] = "minecraft:bone_meal";
  MinecraftItemTypes2["Book"] = "minecraft:book";
  MinecraftItemTypes2["Bookshelf"] = "minecraft:bookshelf";
  MinecraftItemTypes2["BorderBlock"] = "minecraft:border_block";
  MinecraftItemTypes2["BordureIndentedBannerPattern"] = "minecraft:bordure_indented_banner_pattern";
  MinecraftItemTypes2["Bow"] = "minecraft:bow";
  MinecraftItemTypes2["Bowl"] = "minecraft:bowl";
  MinecraftItemTypes2["BrainCoral"] = "minecraft:brain_coral";
  MinecraftItemTypes2["BrainCoralBlock"] = "minecraft:brain_coral_block";
  MinecraftItemTypes2["BrainCoralFan"] = "minecraft:brain_coral_fan";
  MinecraftItemTypes2["Bread"] = "minecraft:bread";
  MinecraftItemTypes2["BreezeRod"] = "minecraft:breeze_rod";
  MinecraftItemTypes2["BreezeSpawnEgg"] = "minecraft:breeze_spawn_egg";
  MinecraftItemTypes2["BrewerPotterySherd"] = "minecraft:brewer_pottery_sherd";
  MinecraftItemTypes2["BrewingStand"] = "minecraft:brewing_stand";
  MinecraftItemTypes2["Brick"] = "minecraft:brick";
  MinecraftItemTypes2["BrickBlock"] = "minecraft:brick_block";
  MinecraftItemTypes2["BrickSlab"] = "minecraft:brick_slab";
  MinecraftItemTypes2["BrickStairs"] = "minecraft:brick_stairs";
  MinecraftItemTypes2["BrickWall"] = "minecraft:brick_wall";
  MinecraftItemTypes2["BrownBundle"] = "minecraft:brown_bundle";
  MinecraftItemTypes2["BrownCandle"] = "minecraft:brown_candle";
  MinecraftItemTypes2["BrownCarpet"] = "minecraft:brown_carpet";
  MinecraftItemTypes2["BrownConcrete"] = "minecraft:brown_concrete";
  MinecraftItemTypes2["BrownConcretePowder"] = "minecraft:brown_concrete_powder";
  MinecraftItemTypes2["BrownDye"] = "minecraft:brown_dye";
  MinecraftItemTypes2["BrownGlazedTerracotta"] = "minecraft:brown_glazed_terracotta";
  MinecraftItemTypes2["BrownMushroom"] = "minecraft:brown_mushroom";
  MinecraftItemTypes2["BrownMushroomBlock"] = "minecraft:brown_mushroom_block";
  MinecraftItemTypes2["BrownShulkerBox"] = "minecraft:brown_shulker_box";
  MinecraftItemTypes2["BrownStainedGlass"] = "minecraft:brown_stained_glass";
  MinecraftItemTypes2["BrownStainedGlassPane"] = "minecraft:brown_stained_glass_pane";
  MinecraftItemTypes2["BrownTerracotta"] = "minecraft:brown_terracotta";
  MinecraftItemTypes2["BrownWool"] = "minecraft:brown_wool";
  MinecraftItemTypes2["Brush"] = "minecraft:brush";
  MinecraftItemTypes2["BubbleCoral"] = "minecraft:bubble_coral";
  MinecraftItemTypes2["BubbleCoralBlock"] = "minecraft:bubble_coral_block";
  MinecraftItemTypes2["BubbleCoralFan"] = "minecraft:bubble_coral_fan";
  MinecraftItemTypes2["Bucket"] = "minecraft:bucket";
  MinecraftItemTypes2["BuddingAmethyst"] = "minecraft:budding_amethyst";
  MinecraftItemTypes2["Bundle"] = "minecraft:bundle";
  MinecraftItemTypes2["BurnPotterySherd"] = "minecraft:burn_pottery_sherd";
  MinecraftItemTypes2["Cactus"] = "minecraft:cactus";
  MinecraftItemTypes2["Cake"] = "minecraft:cake";
  MinecraftItemTypes2["Calcite"] = "minecraft:calcite";
  MinecraftItemTypes2["CalibratedSculkSensor"] = "minecraft:calibrated_sculk_sensor";
  MinecraftItemTypes2["CamelSpawnEgg"] = "minecraft:camel_spawn_egg";
  MinecraftItemTypes2["Campfire"] = "minecraft:campfire";
  MinecraftItemTypes2["Candle"] = "minecraft:candle";
  MinecraftItemTypes2["Carrot"] = "minecraft:carrot";
  MinecraftItemTypes2["CarrotOnAStick"] = "minecraft:carrot_on_a_stick";
  MinecraftItemTypes2["CartographyTable"] = "minecraft:cartography_table";
  MinecraftItemTypes2["CarvedPumpkin"] = "minecraft:carved_pumpkin";
  MinecraftItemTypes2["CatSpawnEgg"] = "minecraft:cat_spawn_egg";
  MinecraftItemTypes2["Cauldron"] = "minecraft:cauldron";
  MinecraftItemTypes2["CaveSpiderSpawnEgg"] = "minecraft:cave_spider_spawn_egg";
  MinecraftItemTypes2["Chain"] = "minecraft:chain";
  MinecraftItemTypes2["ChainCommandBlock"] = "minecraft:chain_command_block";
  MinecraftItemTypes2["ChainmailBoots"] = "minecraft:chainmail_boots";
  MinecraftItemTypes2["ChainmailChestplate"] = "minecraft:chainmail_chestplate";
  MinecraftItemTypes2["ChainmailHelmet"] = "minecraft:chainmail_helmet";
  MinecraftItemTypes2["ChainmailLeggings"] = "minecraft:chainmail_leggings";
  MinecraftItemTypes2["Charcoal"] = "minecraft:charcoal";
  MinecraftItemTypes2["CherryBoat"] = "minecraft:cherry_boat";
  MinecraftItemTypes2["CherryButton"] = "minecraft:cherry_button";
  MinecraftItemTypes2["CherryChestBoat"] = "minecraft:cherry_chest_boat";
  MinecraftItemTypes2["CherryDoor"] = "minecraft:cherry_door";
  MinecraftItemTypes2["CherryFence"] = "minecraft:cherry_fence";
  MinecraftItemTypes2["CherryFenceGate"] = "minecraft:cherry_fence_gate";
  MinecraftItemTypes2["CherryHangingSign"] = "minecraft:cherry_hanging_sign";
  MinecraftItemTypes2["CherryLeaves"] = "minecraft:cherry_leaves";
  MinecraftItemTypes2["CherryLog"] = "minecraft:cherry_log";
  MinecraftItemTypes2["CherryPlanks"] = "minecraft:cherry_planks";
  MinecraftItemTypes2["CherryPressurePlate"] = "minecraft:cherry_pressure_plate";
  MinecraftItemTypes2["CherrySapling"] = "minecraft:cherry_sapling";
  MinecraftItemTypes2["CherrySign"] = "minecraft:cherry_sign";
  MinecraftItemTypes2["CherrySlab"] = "minecraft:cherry_slab";
  MinecraftItemTypes2["CherryStairs"] = "minecraft:cherry_stairs";
  MinecraftItemTypes2["CherryTrapdoor"] = "minecraft:cherry_trapdoor";
  MinecraftItemTypes2["CherryWood"] = "minecraft:cherry_wood";
  MinecraftItemTypes2["Chest"] = "minecraft:chest";
  MinecraftItemTypes2["ChestMinecart"] = "minecraft:chest_minecart";
  MinecraftItemTypes2["Chicken"] = "minecraft:chicken";
  MinecraftItemTypes2["ChickenSpawnEgg"] = "minecraft:chicken_spawn_egg";
  MinecraftItemTypes2["ChippedAnvil"] = "minecraft:chipped_anvil";
  MinecraftItemTypes2["ChiseledBookshelf"] = "minecraft:chiseled_bookshelf";
  MinecraftItemTypes2["ChiseledCopper"] = "minecraft:chiseled_copper";
  MinecraftItemTypes2["ChiseledDeepslate"] = "minecraft:chiseled_deepslate";
  MinecraftItemTypes2["ChiseledNetherBricks"] = "minecraft:chiseled_nether_bricks";
  MinecraftItemTypes2["ChiseledPolishedBlackstone"] = "minecraft:chiseled_polished_blackstone";
  MinecraftItemTypes2["ChiseledQuartzBlock"] = "minecraft:chiseled_quartz_block";
  MinecraftItemTypes2["ChiseledRedSandstone"] = "minecraft:chiseled_red_sandstone";
  MinecraftItemTypes2["ChiseledResinBricks"] = "minecraft:chiseled_resin_bricks";
  MinecraftItemTypes2["ChiseledSandstone"] = "minecraft:chiseled_sandstone";
  MinecraftItemTypes2["ChiseledStoneBricks"] = "minecraft:chiseled_stone_bricks";
  MinecraftItemTypes2["ChiseledTuff"] = "minecraft:chiseled_tuff";
  MinecraftItemTypes2["ChiseledTuffBricks"] = "minecraft:chiseled_tuff_bricks";
  MinecraftItemTypes2["ChorusFlower"] = "minecraft:chorus_flower";
  MinecraftItemTypes2["ChorusFruit"] = "minecraft:chorus_fruit";
  MinecraftItemTypes2["ChorusPlant"] = "minecraft:chorus_plant";
  MinecraftItemTypes2["Clay"] = "minecraft:clay";
  MinecraftItemTypes2["ClayBall"] = "minecraft:clay_ball";
  MinecraftItemTypes2["Clock"] = "minecraft:clock";
  MinecraftItemTypes2["ClosedEyeblossom"] = "minecraft:closed_eyeblossom";
  MinecraftItemTypes2["Coal"] = "minecraft:coal";
  MinecraftItemTypes2["CoalBlock"] = "minecraft:coal_block";
  MinecraftItemTypes2["CoalOre"] = "minecraft:coal_ore";
  MinecraftItemTypes2["CoarseDirt"] = "minecraft:coarse_dirt";
  MinecraftItemTypes2["CoastArmorTrimSmithingTemplate"] = "minecraft:coast_armor_trim_smithing_template";
  MinecraftItemTypes2["CobbledDeepslate"] = "minecraft:cobbled_deepslate";
  MinecraftItemTypes2["CobbledDeepslateSlab"] = "minecraft:cobbled_deepslate_slab";
  MinecraftItemTypes2["CobbledDeepslateStairs"] = "minecraft:cobbled_deepslate_stairs";
  MinecraftItemTypes2["CobbledDeepslateWall"] = "minecraft:cobbled_deepslate_wall";
  MinecraftItemTypes2["Cobblestone"] = "minecraft:cobblestone";
  MinecraftItemTypes2["CobblestoneSlab"] = "minecraft:cobblestone_slab";
  MinecraftItemTypes2["CobblestoneWall"] = "minecraft:cobblestone_wall";
  MinecraftItemTypes2["CocoaBeans"] = "minecraft:cocoa_beans";
  MinecraftItemTypes2["Cod"] = "minecraft:cod";
  MinecraftItemTypes2["CodBucket"] = "minecraft:cod_bucket";
  MinecraftItemTypes2["CodSpawnEgg"] = "minecraft:cod_spawn_egg";
  MinecraftItemTypes2["CommandBlock"] = "minecraft:command_block";
  MinecraftItemTypes2["CommandBlockMinecart"] = "minecraft:command_block_minecart";
  MinecraftItemTypes2["Comparator"] = "minecraft:comparator";
  MinecraftItemTypes2["Compass"] = "minecraft:compass";
  MinecraftItemTypes2["Composter"] = "minecraft:composter";
  MinecraftItemTypes2["Conduit"] = "minecraft:conduit";
  MinecraftItemTypes2["CookedBeef"] = "minecraft:cooked_beef";
  MinecraftItemTypes2["CookedChicken"] = "minecraft:cooked_chicken";
  MinecraftItemTypes2["CookedCod"] = "minecraft:cooked_cod";
  MinecraftItemTypes2["CookedMutton"] = "minecraft:cooked_mutton";
  MinecraftItemTypes2["CookedPorkchop"] = "minecraft:cooked_porkchop";
  MinecraftItemTypes2["CookedRabbit"] = "minecraft:cooked_rabbit";
  MinecraftItemTypes2["CookedSalmon"] = "minecraft:cooked_salmon";
  MinecraftItemTypes2["Cookie"] = "minecraft:cookie";
  MinecraftItemTypes2["CopperBlock"] = "minecraft:copper_block";
  MinecraftItemTypes2["CopperBulb"] = "minecraft:copper_bulb";
  MinecraftItemTypes2["CopperDoor"] = "minecraft:copper_door";
  MinecraftItemTypes2["CopperGrate"] = "minecraft:copper_grate";
  MinecraftItemTypes2["CopperIngot"] = "minecraft:copper_ingot";
  MinecraftItemTypes2["CopperOre"] = "minecraft:copper_ore";
  MinecraftItemTypes2["CopperTrapdoor"] = "minecraft:copper_trapdoor";
  MinecraftItemTypes2["Cornflower"] = "minecraft:cornflower";
  MinecraftItemTypes2["CowSpawnEgg"] = "minecraft:cow_spawn_egg";
  MinecraftItemTypes2["CrackedDeepslateBricks"] = "minecraft:cracked_deepslate_bricks";
  MinecraftItemTypes2["CrackedDeepslateTiles"] = "minecraft:cracked_deepslate_tiles";
  MinecraftItemTypes2["CrackedNetherBricks"] = "minecraft:cracked_nether_bricks";
  MinecraftItemTypes2["CrackedPolishedBlackstoneBricks"] = "minecraft:cracked_polished_blackstone_bricks";
  MinecraftItemTypes2["CrackedStoneBricks"] = "minecraft:cracked_stone_bricks";
  MinecraftItemTypes2["Crafter"] = "minecraft:crafter";
  MinecraftItemTypes2["CraftingTable"] = "minecraft:crafting_table";
  MinecraftItemTypes2["CreakingHeart"] = "minecraft:creaking_heart";
  MinecraftItemTypes2["CreakingSpawnEgg"] = "minecraft:creaking_spawn_egg";
  MinecraftItemTypes2["CreeperBannerPattern"] = "minecraft:creeper_banner_pattern";
  MinecraftItemTypes2["CreeperHead"] = "minecraft:creeper_head";
  MinecraftItemTypes2["CreeperSpawnEgg"] = "minecraft:creeper_spawn_egg";
  MinecraftItemTypes2["CrimsonButton"] = "minecraft:crimson_button";
  MinecraftItemTypes2["CrimsonDoor"] = "minecraft:crimson_door";
  MinecraftItemTypes2["CrimsonFence"] = "minecraft:crimson_fence";
  MinecraftItemTypes2["CrimsonFenceGate"] = "minecraft:crimson_fence_gate";
  MinecraftItemTypes2["CrimsonFungus"] = "minecraft:crimson_fungus";
  MinecraftItemTypes2["CrimsonHangingSign"] = "minecraft:crimson_hanging_sign";
  MinecraftItemTypes2["CrimsonHyphae"] = "minecraft:crimson_hyphae";
  MinecraftItemTypes2["CrimsonNylium"] = "minecraft:crimson_nylium";
  MinecraftItemTypes2["CrimsonPlanks"] = "minecraft:crimson_planks";
  MinecraftItemTypes2["CrimsonPressurePlate"] = "minecraft:crimson_pressure_plate";
  MinecraftItemTypes2["CrimsonRoots"] = "minecraft:crimson_roots";
  MinecraftItemTypes2["CrimsonSign"] = "minecraft:crimson_sign";
  MinecraftItemTypes2["CrimsonSlab"] = "minecraft:crimson_slab";
  MinecraftItemTypes2["CrimsonStairs"] = "minecraft:crimson_stairs";
  MinecraftItemTypes2["CrimsonStem"] = "minecraft:crimson_stem";
  MinecraftItemTypes2["CrimsonTrapdoor"] = "minecraft:crimson_trapdoor";
  MinecraftItemTypes2["Crossbow"] = "minecraft:crossbow";
  MinecraftItemTypes2["CryingObsidian"] = "minecraft:crying_obsidian";
  MinecraftItemTypes2["CutCopper"] = "minecraft:cut_copper";
  MinecraftItemTypes2["CutCopperSlab"] = "minecraft:cut_copper_slab";
  MinecraftItemTypes2["CutCopperStairs"] = "minecraft:cut_copper_stairs";
  MinecraftItemTypes2["CutRedSandstone"] = "minecraft:cut_red_sandstone";
  MinecraftItemTypes2["CutRedSandstoneSlab"] = "minecraft:cut_red_sandstone_slab";
  MinecraftItemTypes2["CutSandstone"] = "minecraft:cut_sandstone";
  MinecraftItemTypes2["CutSandstoneSlab"] = "minecraft:cut_sandstone_slab";
  MinecraftItemTypes2["CyanBundle"] = "minecraft:cyan_bundle";
  MinecraftItemTypes2["CyanCandle"] = "minecraft:cyan_candle";
  MinecraftItemTypes2["CyanCarpet"] = "minecraft:cyan_carpet";
  MinecraftItemTypes2["CyanConcrete"] = "minecraft:cyan_concrete";
  MinecraftItemTypes2["CyanConcretePowder"] = "minecraft:cyan_concrete_powder";
  MinecraftItemTypes2["CyanDye"] = "minecraft:cyan_dye";
  MinecraftItemTypes2["CyanGlazedTerracotta"] = "minecraft:cyan_glazed_terracotta";
  MinecraftItemTypes2["CyanShulkerBox"] = "minecraft:cyan_shulker_box";
  MinecraftItemTypes2["CyanStainedGlass"] = "minecraft:cyan_stained_glass";
  MinecraftItemTypes2["CyanStainedGlassPane"] = "minecraft:cyan_stained_glass_pane";
  MinecraftItemTypes2["CyanTerracotta"] = "minecraft:cyan_terracotta";
  MinecraftItemTypes2["CyanWool"] = "minecraft:cyan_wool";
  MinecraftItemTypes2["DamagedAnvil"] = "minecraft:damaged_anvil";
  MinecraftItemTypes2["Dandelion"] = "minecraft:dandelion";
  MinecraftItemTypes2["DangerPotterySherd"] = "minecraft:danger_pottery_sherd";
  MinecraftItemTypes2["DarkOakBoat"] = "minecraft:dark_oak_boat";
  MinecraftItemTypes2["DarkOakButton"] = "minecraft:dark_oak_button";
  MinecraftItemTypes2["DarkOakChestBoat"] = "minecraft:dark_oak_chest_boat";
  MinecraftItemTypes2["DarkOakDoor"] = "minecraft:dark_oak_door";
  MinecraftItemTypes2["DarkOakFence"] = "minecraft:dark_oak_fence";
  MinecraftItemTypes2["DarkOakFenceGate"] = "minecraft:dark_oak_fence_gate";
  MinecraftItemTypes2["DarkOakHangingSign"] = "minecraft:dark_oak_hanging_sign";
  MinecraftItemTypes2["DarkOakLeaves"] = "minecraft:dark_oak_leaves";
  MinecraftItemTypes2["DarkOakLog"] = "minecraft:dark_oak_log";
  MinecraftItemTypes2["DarkOakPlanks"] = "minecraft:dark_oak_planks";
  MinecraftItemTypes2["DarkOakPressurePlate"] = "minecraft:dark_oak_pressure_plate";
  MinecraftItemTypes2["DarkOakSapling"] = "minecraft:dark_oak_sapling";
  MinecraftItemTypes2["DarkOakSign"] = "minecraft:dark_oak_sign";
  MinecraftItemTypes2["DarkOakSlab"] = "minecraft:dark_oak_slab";
  MinecraftItemTypes2["DarkOakStairs"] = "minecraft:dark_oak_stairs";
  MinecraftItemTypes2["DarkOakTrapdoor"] = "minecraft:dark_oak_trapdoor";
  MinecraftItemTypes2["DarkOakWood"] = "minecraft:dark_oak_wood";
  MinecraftItemTypes2["DarkPrismarine"] = "minecraft:dark_prismarine";
  MinecraftItemTypes2["DarkPrismarineSlab"] = "minecraft:dark_prismarine_slab";
  MinecraftItemTypes2["DarkPrismarineStairs"] = "minecraft:dark_prismarine_stairs";
  MinecraftItemTypes2["DaylightDetector"] = "minecraft:daylight_detector";
  MinecraftItemTypes2["DeadBrainCoral"] = "minecraft:dead_brain_coral";
  MinecraftItemTypes2["DeadBrainCoralBlock"] = "minecraft:dead_brain_coral_block";
  MinecraftItemTypes2["DeadBrainCoralFan"] = "minecraft:dead_brain_coral_fan";
  MinecraftItemTypes2["DeadBubbleCoral"] = "minecraft:dead_bubble_coral";
  MinecraftItemTypes2["DeadBubbleCoralBlock"] = "minecraft:dead_bubble_coral_block";
  MinecraftItemTypes2["DeadBubbleCoralFan"] = "minecraft:dead_bubble_coral_fan";
  MinecraftItemTypes2["DeadFireCoral"] = "minecraft:dead_fire_coral";
  MinecraftItemTypes2["DeadFireCoralBlock"] = "minecraft:dead_fire_coral_block";
  MinecraftItemTypes2["DeadFireCoralFan"] = "minecraft:dead_fire_coral_fan";
  MinecraftItemTypes2["DeadHornCoral"] = "minecraft:dead_horn_coral";
  MinecraftItemTypes2["DeadHornCoralBlock"] = "minecraft:dead_horn_coral_block";
  MinecraftItemTypes2["DeadHornCoralFan"] = "minecraft:dead_horn_coral_fan";
  MinecraftItemTypes2["DeadTubeCoral"] = "minecraft:dead_tube_coral";
  MinecraftItemTypes2["DeadTubeCoralBlock"] = "minecraft:dead_tube_coral_block";
  MinecraftItemTypes2["DeadTubeCoralFan"] = "minecraft:dead_tube_coral_fan";
  MinecraftItemTypes2["Deadbush"] = "minecraft:deadbush";
  MinecraftItemTypes2["DecoratedPot"] = "minecraft:decorated_pot";
  MinecraftItemTypes2["Deepslate"] = "minecraft:deepslate";
  MinecraftItemTypes2["DeepslateBrickSlab"] = "minecraft:deepslate_brick_slab";
  MinecraftItemTypes2["DeepslateBrickStairs"] = "minecraft:deepslate_brick_stairs";
  MinecraftItemTypes2["DeepslateBrickWall"] = "minecraft:deepslate_brick_wall";
  MinecraftItemTypes2["DeepslateBricks"] = "minecraft:deepslate_bricks";
  MinecraftItemTypes2["DeepslateCoalOre"] = "minecraft:deepslate_coal_ore";
  MinecraftItemTypes2["DeepslateCopperOre"] = "minecraft:deepslate_copper_ore";
  MinecraftItemTypes2["DeepslateDiamondOre"] = "minecraft:deepslate_diamond_ore";
  MinecraftItemTypes2["DeepslateEmeraldOre"] = "minecraft:deepslate_emerald_ore";
  MinecraftItemTypes2["DeepslateGoldOre"] = "minecraft:deepslate_gold_ore";
  MinecraftItemTypes2["DeepslateIronOre"] = "minecraft:deepslate_iron_ore";
  MinecraftItemTypes2["DeepslateLapisOre"] = "minecraft:deepslate_lapis_ore";
  MinecraftItemTypes2["DeepslateRedstoneOre"] = "minecraft:deepslate_redstone_ore";
  MinecraftItemTypes2["DeepslateTileSlab"] = "minecraft:deepslate_tile_slab";
  MinecraftItemTypes2["DeepslateTileStairs"] = "minecraft:deepslate_tile_stairs";
  MinecraftItemTypes2["DeepslateTileWall"] = "minecraft:deepslate_tile_wall";
  MinecraftItemTypes2["DeepslateTiles"] = "minecraft:deepslate_tiles";
  MinecraftItemTypes2["Deny"] = "minecraft:deny";
  MinecraftItemTypes2["DetectorRail"] = "minecraft:detector_rail";
  MinecraftItemTypes2["Diamond"] = "minecraft:diamond";
  MinecraftItemTypes2["DiamondAxe"] = "minecraft:diamond_axe";
  MinecraftItemTypes2["DiamondBlock"] = "minecraft:diamond_block";
  MinecraftItemTypes2["DiamondBoots"] = "minecraft:diamond_boots";
  MinecraftItemTypes2["DiamondChestplate"] = "minecraft:diamond_chestplate";
  MinecraftItemTypes2["DiamondHelmet"] = "minecraft:diamond_helmet";
  MinecraftItemTypes2["DiamondHoe"] = "minecraft:diamond_hoe";
  MinecraftItemTypes2["DiamondHorseArmor"] = "minecraft:diamond_horse_armor";
  MinecraftItemTypes2["DiamondLeggings"] = "minecraft:diamond_leggings";
  MinecraftItemTypes2["DiamondOre"] = "minecraft:diamond_ore";
  MinecraftItemTypes2["DiamondPickaxe"] = "minecraft:diamond_pickaxe";
  MinecraftItemTypes2["DiamondShovel"] = "minecraft:diamond_shovel";
  MinecraftItemTypes2["DiamondSword"] = "minecraft:diamond_sword";
  MinecraftItemTypes2["Diorite"] = "minecraft:diorite";
  MinecraftItemTypes2["DioriteSlab"] = "minecraft:diorite_slab";
  MinecraftItemTypes2["DioriteStairs"] = "minecraft:diorite_stairs";
  MinecraftItemTypes2["DioriteWall"] = "minecraft:diorite_wall";
  MinecraftItemTypes2["Dirt"] = "minecraft:dirt";
  MinecraftItemTypes2["DirtWithRoots"] = "minecraft:dirt_with_roots";
  MinecraftItemTypes2["DiscFragment5"] = "minecraft:disc_fragment_5";
  MinecraftItemTypes2["Dispenser"] = "minecraft:dispenser";
  MinecraftItemTypes2["DolphinSpawnEgg"] = "minecraft:dolphin_spawn_egg";
  MinecraftItemTypes2["DonkeySpawnEgg"] = "minecraft:donkey_spawn_egg";
  MinecraftItemTypes2["DragonBreath"] = "minecraft:dragon_breath";
  MinecraftItemTypes2["DragonEgg"] = "minecraft:dragon_egg";
  MinecraftItemTypes2["DragonHead"] = "minecraft:dragon_head";
  MinecraftItemTypes2["DriedKelp"] = "minecraft:dried_kelp";
  MinecraftItemTypes2["DriedKelpBlock"] = "minecraft:dried_kelp_block";
  MinecraftItemTypes2["DripstoneBlock"] = "minecraft:dripstone_block";
  MinecraftItemTypes2["Dropper"] = "minecraft:dropper";
  MinecraftItemTypes2["DrownedSpawnEgg"] = "minecraft:drowned_spawn_egg";
  MinecraftItemTypes2["DuneArmorTrimSmithingTemplate"] = "minecraft:dune_armor_trim_smithing_template";
  MinecraftItemTypes2["EchoShard"] = "minecraft:echo_shard";
  MinecraftItemTypes2["Egg"] = "minecraft:egg";
  MinecraftItemTypes2["ElderGuardianSpawnEgg"] = "minecraft:elder_guardian_spawn_egg";
  MinecraftItemTypes2["Elytra"] = "minecraft:elytra";
  MinecraftItemTypes2["Emerald"] = "minecraft:emerald";
  MinecraftItemTypes2["EmeraldBlock"] = "minecraft:emerald_block";
  MinecraftItemTypes2["EmeraldOre"] = "minecraft:emerald_ore";
  MinecraftItemTypes2["EmptyMap"] = "minecraft:empty_map";
  MinecraftItemTypes2["EnchantedBook"] = "minecraft:enchanted_book";
  MinecraftItemTypes2["EnchantedGoldenApple"] = "minecraft:enchanted_golden_apple";
  MinecraftItemTypes2["EnchantingTable"] = "minecraft:enchanting_table";
  MinecraftItemTypes2["EndBrickStairs"] = "minecraft:end_brick_stairs";
  MinecraftItemTypes2["EndBricks"] = "minecraft:end_bricks";
  MinecraftItemTypes2["EndCrystal"] = "minecraft:end_crystal";
  MinecraftItemTypes2["EndPortalFrame"] = "minecraft:end_portal_frame";
  MinecraftItemTypes2["EndRod"] = "minecraft:end_rod";
  MinecraftItemTypes2["EndStone"] = "minecraft:end_stone";
  MinecraftItemTypes2["EndStoneBrickSlab"] = "minecraft:end_stone_brick_slab";
  MinecraftItemTypes2["EndStoneBrickWall"] = "minecraft:end_stone_brick_wall";
  MinecraftItemTypes2["EnderChest"] = "minecraft:ender_chest";
  MinecraftItemTypes2["EnderDragonSpawnEgg"] = "minecraft:ender_dragon_spawn_egg";
  MinecraftItemTypes2["EnderEye"] = "minecraft:ender_eye";
  MinecraftItemTypes2["EnderPearl"] = "minecraft:ender_pearl";
  MinecraftItemTypes2["EndermanSpawnEgg"] = "minecraft:enderman_spawn_egg";
  MinecraftItemTypes2["EndermiteSpawnEgg"] = "minecraft:endermite_spawn_egg";
  MinecraftItemTypes2["EvokerSpawnEgg"] = "minecraft:evoker_spawn_egg";
  MinecraftItemTypes2["ExperienceBottle"] = "minecraft:experience_bottle";
  MinecraftItemTypes2["ExplorerPotterySherd"] = "minecraft:explorer_pottery_sherd";
  MinecraftItemTypes2["ExposedChiseledCopper"] = "minecraft:exposed_chiseled_copper";
  MinecraftItemTypes2["ExposedCopper"] = "minecraft:exposed_copper";
  MinecraftItemTypes2["ExposedCopperBulb"] = "minecraft:exposed_copper_bulb";
  MinecraftItemTypes2["ExposedCopperDoor"] = "minecraft:exposed_copper_door";
  MinecraftItemTypes2["ExposedCopperGrate"] = "minecraft:exposed_copper_grate";
  MinecraftItemTypes2["ExposedCopperTrapdoor"] = "minecraft:exposed_copper_trapdoor";
  MinecraftItemTypes2["ExposedCutCopper"] = "minecraft:exposed_cut_copper";
  MinecraftItemTypes2["ExposedCutCopperSlab"] = "minecraft:exposed_cut_copper_slab";
  MinecraftItemTypes2["ExposedCutCopperStairs"] = "minecraft:exposed_cut_copper_stairs";
  MinecraftItemTypes2["EyeArmorTrimSmithingTemplate"] = "minecraft:eye_armor_trim_smithing_template";
  MinecraftItemTypes2["Farmland"] = "minecraft:farmland";
  MinecraftItemTypes2["Feather"] = "minecraft:feather";
  MinecraftItemTypes2["FenceGate"] = "minecraft:fence_gate";
  MinecraftItemTypes2["FermentedSpiderEye"] = "minecraft:fermented_spider_eye";
  MinecraftItemTypes2["Fern"] = "minecraft:fern";
  MinecraftItemTypes2["FieldMasonedBannerPattern"] = "minecraft:field_masoned_banner_pattern";
  MinecraftItemTypes2["FilledMap"] = "minecraft:filled_map";
  MinecraftItemTypes2["FireCharge"] = "minecraft:fire_charge";
  MinecraftItemTypes2["FireCoral"] = "minecraft:fire_coral";
  MinecraftItemTypes2["FireCoralBlock"] = "minecraft:fire_coral_block";
  MinecraftItemTypes2["FireCoralFan"] = "minecraft:fire_coral_fan";
  MinecraftItemTypes2["FireworkRocket"] = "minecraft:firework_rocket";
  MinecraftItemTypes2["FireworkStar"] = "minecraft:firework_star";
  MinecraftItemTypes2["FishingRod"] = "minecraft:fishing_rod";
  MinecraftItemTypes2["FletchingTable"] = "minecraft:fletching_table";
  MinecraftItemTypes2["Flint"] = "minecraft:flint";
  MinecraftItemTypes2["FlintAndSteel"] = "minecraft:flint_and_steel";
  MinecraftItemTypes2["FlowArmorTrimSmithingTemplate"] = "minecraft:flow_armor_trim_smithing_template";
  MinecraftItemTypes2["FlowBannerPattern"] = "minecraft:flow_banner_pattern";
  MinecraftItemTypes2["FlowPotterySherd"] = "minecraft:flow_pottery_sherd";
  MinecraftItemTypes2["FlowerBannerPattern"] = "minecraft:flower_banner_pattern";
  MinecraftItemTypes2["FlowerPot"] = "minecraft:flower_pot";
  MinecraftItemTypes2["FloweringAzalea"] = "minecraft:flowering_azalea";
  MinecraftItemTypes2["FoxSpawnEgg"] = "minecraft:fox_spawn_egg";
  MinecraftItemTypes2["Frame"] = "minecraft:frame";
  MinecraftItemTypes2["FriendPotterySherd"] = "minecraft:friend_pottery_sherd";
  MinecraftItemTypes2["FrogSpawn"] = "minecraft:frog_spawn";
  MinecraftItemTypes2["FrogSpawnEgg"] = "minecraft:frog_spawn_egg";
  MinecraftItemTypes2["FrostedIce"] = "minecraft:frosted_ice";
  MinecraftItemTypes2["Furnace"] = "minecraft:furnace";
  MinecraftItemTypes2["GhastSpawnEgg"] = "minecraft:ghast_spawn_egg";
  MinecraftItemTypes2["GhastTear"] = "minecraft:ghast_tear";
  MinecraftItemTypes2["GildedBlackstone"] = "minecraft:gilded_blackstone";
  MinecraftItemTypes2["Glass"] = "minecraft:glass";
  MinecraftItemTypes2["GlassBottle"] = "minecraft:glass_bottle";
  MinecraftItemTypes2["GlassPane"] = "minecraft:glass_pane";
  MinecraftItemTypes2["GlisteringMelonSlice"] = "minecraft:glistering_melon_slice";
  MinecraftItemTypes2["GlobeBannerPattern"] = "minecraft:globe_banner_pattern";
  MinecraftItemTypes2["GlowBerries"] = "minecraft:glow_berries";
  MinecraftItemTypes2["GlowFrame"] = "minecraft:glow_frame";
  MinecraftItemTypes2["GlowInkSac"] = "minecraft:glow_ink_sac";
  MinecraftItemTypes2["GlowLichen"] = "minecraft:glow_lichen";
  MinecraftItemTypes2["GlowSquidSpawnEgg"] = "minecraft:glow_squid_spawn_egg";
  MinecraftItemTypes2["Glowstone"] = "minecraft:glowstone";
  MinecraftItemTypes2["GlowstoneDust"] = "minecraft:glowstone_dust";
  MinecraftItemTypes2["GoatHorn"] = "minecraft:goat_horn";
  MinecraftItemTypes2["GoatSpawnEgg"] = "minecraft:goat_spawn_egg";
  MinecraftItemTypes2["GoldBlock"] = "minecraft:gold_block";
  MinecraftItemTypes2["GoldIngot"] = "minecraft:gold_ingot";
  MinecraftItemTypes2["GoldNugget"] = "minecraft:gold_nugget";
  MinecraftItemTypes2["GoldOre"] = "minecraft:gold_ore";
  MinecraftItemTypes2["GoldenApple"] = "minecraft:golden_apple";
  MinecraftItemTypes2["GoldenAxe"] = "minecraft:golden_axe";
  MinecraftItemTypes2["GoldenBoots"] = "minecraft:golden_boots";
  MinecraftItemTypes2["GoldenCarrot"] = "minecraft:golden_carrot";
  MinecraftItemTypes2["GoldenChestplate"] = "minecraft:golden_chestplate";
  MinecraftItemTypes2["GoldenHelmet"] = "minecraft:golden_helmet";
  MinecraftItemTypes2["GoldenHoe"] = "minecraft:golden_hoe";
  MinecraftItemTypes2["GoldenHorseArmor"] = "minecraft:golden_horse_armor";
  MinecraftItemTypes2["GoldenLeggings"] = "minecraft:golden_leggings";
  MinecraftItemTypes2["GoldenPickaxe"] = "minecraft:golden_pickaxe";
  MinecraftItemTypes2["GoldenRail"] = "minecraft:golden_rail";
  MinecraftItemTypes2["GoldenShovel"] = "minecraft:golden_shovel";
  MinecraftItemTypes2["GoldenSword"] = "minecraft:golden_sword";
  MinecraftItemTypes2["Granite"] = "minecraft:granite";
  MinecraftItemTypes2["GraniteSlab"] = "minecraft:granite_slab";
  MinecraftItemTypes2["GraniteStairs"] = "minecraft:granite_stairs";
  MinecraftItemTypes2["GraniteWall"] = "minecraft:granite_wall";
  MinecraftItemTypes2["GrassBlock"] = "minecraft:grass_block";
  MinecraftItemTypes2["GrassPath"] = "minecraft:grass_path";
  MinecraftItemTypes2["Gravel"] = "minecraft:gravel";
  MinecraftItemTypes2["GrayBundle"] = "minecraft:gray_bundle";
  MinecraftItemTypes2["GrayCandle"] = "minecraft:gray_candle";
  MinecraftItemTypes2["GrayCarpet"] = "minecraft:gray_carpet";
  MinecraftItemTypes2["GrayConcrete"] = "minecraft:gray_concrete";
  MinecraftItemTypes2["GrayConcretePowder"] = "minecraft:gray_concrete_powder";
  MinecraftItemTypes2["GrayDye"] = "minecraft:gray_dye";
  MinecraftItemTypes2["GrayGlazedTerracotta"] = "minecraft:gray_glazed_terracotta";
  MinecraftItemTypes2["GrayShulkerBox"] = "minecraft:gray_shulker_box";
  MinecraftItemTypes2["GrayStainedGlass"] = "minecraft:gray_stained_glass";
  MinecraftItemTypes2["GrayStainedGlassPane"] = "minecraft:gray_stained_glass_pane";
  MinecraftItemTypes2["GrayTerracotta"] = "minecraft:gray_terracotta";
  MinecraftItemTypes2["GrayWool"] = "minecraft:gray_wool";
  MinecraftItemTypes2["GreenBundle"] = "minecraft:green_bundle";
  MinecraftItemTypes2["GreenCandle"] = "minecraft:green_candle";
  MinecraftItemTypes2["GreenCarpet"] = "minecraft:green_carpet";
  MinecraftItemTypes2["GreenConcrete"] = "minecraft:green_concrete";
  MinecraftItemTypes2["GreenConcretePowder"] = "minecraft:green_concrete_powder";
  MinecraftItemTypes2["GreenDye"] = "minecraft:green_dye";
  MinecraftItemTypes2["GreenGlazedTerracotta"] = "minecraft:green_glazed_terracotta";
  MinecraftItemTypes2["GreenShulkerBox"] = "minecraft:green_shulker_box";
  MinecraftItemTypes2["GreenStainedGlass"] = "minecraft:green_stained_glass";
  MinecraftItemTypes2["GreenStainedGlassPane"] = "minecraft:green_stained_glass_pane";
  MinecraftItemTypes2["GreenTerracotta"] = "minecraft:green_terracotta";
  MinecraftItemTypes2["GreenWool"] = "minecraft:green_wool";
  MinecraftItemTypes2["Grindstone"] = "minecraft:grindstone";
  MinecraftItemTypes2["GuardianSpawnEgg"] = "minecraft:guardian_spawn_egg";
  MinecraftItemTypes2["Gunpowder"] = "minecraft:gunpowder";
  MinecraftItemTypes2["GusterBannerPattern"] = "minecraft:guster_banner_pattern";
  MinecraftItemTypes2["GusterPotterySherd"] = "minecraft:guster_pottery_sherd";
  MinecraftItemTypes2["HangingRoots"] = "minecraft:hanging_roots";
  MinecraftItemTypes2["HardenedClay"] = "minecraft:hardened_clay";
  MinecraftItemTypes2["HayBlock"] = "minecraft:hay_block";
  MinecraftItemTypes2["HeartOfTheSea"] = "minecraft:heart_of_the_sea";
  MinecraftItemTypes2["HeartPotterySherd"] = "minecraft:heart_pottery_sherd";
  MinecraftItemTypes2["HeartbreakPotterySherd"] = "minecraft:heartbreak_pottery_sherd";
  MinecraftItemTypes2["HeavyCore"] = "minecraft:heavy_core";
  MinecraftItemTypes2["HeavyWeightedPressurePlate"] = "minecraft:heavy_weighted_pressure_plate";
  MinecraftItemTypes2["HoglinSpawnEgg"] = "minecraft:hoglin_spawn_egg";
  MinecraftItemTypes2["HoneyBlock"] = "minecraft:honey_block";
  MinecraftItemTypes2["HoneyBottle"] = "minecraft:honey_bottle";
  MinecraftItemTypes2["Honeycomb"] = "minecraft:honeycomb";
  MinecraftItemTypes2["HoneycombBlock"] = "minecraft:honeycomb_block";
  MinecraftItemTypes2["Hopper"] = "minecraft:hopper";
  MinecraftItemTypes2["HopperMinecart"] = "minecraft:hopper_minecart";
  MinecraftItemTypes2["HornCoral"] = "minecraft:horn_coral";
  MinecraftItemTypes2["HornCoralBlock"] = "minecraft:horn_coral_block";
  MinecraftItemTypes2["HornCoralFan"] = "minecraft:horn_coral_fan";
  MinecraftItemTypes2["HorseSpawnEgg"] = "minecraft:horse_spawn_egg";
  MinecraftItemTypes2["HostArmorTrimSmithingTemplate"] = "minecraft:host_armor_trim_smithing_template";
  MinecraftItemTypes2["HowlPotterySherd"] = "minecraft:howl_pottery_sherd";
  MinecraftItemTypes2["HuskSpawnEgg"] = "minecraft:husk_spawn_egg";
  MinecraftItemTypes2["Ice"] = "minecraft:ice";
  MinecraftItemTypes2["InfestedChiseledStoneBricks"] = "minecraft:infested_chiseled_stone_bricks";
  MinecraftItemTypes2["InfestedCobblestone"] = "minecraft:infested_cobblestone";
  MinecraftItemTypes2["InfestedCrackedStoneBricks"] = "minecraft:infested_cracked_stone_bricks";
  MinecraftItemTypes2["InfestedDeepslate"] = "minecraft:infested_deepslate";
  MinecraftItemTypes2["InfestedMossyStoneBricks"] = "minecraft:infested_mossy_stone_bricks";
  MinecraftItemTypes2["InfestedStone"] = "minecraft:infested_stone";
  MinecraftItemTypes2["InfestedStoneBricks"] = "minecraft:infested_stone_bricks";
  MinecraftItemTypes2["InkSac"] = "minecraft:ink_sac";
  MinecraftItemTypes2["IronAxe"] = "minecraft:iron_axe";
  MinecraftItemTypes2["IronBars"] = "minecraft:iron_bars";
  MinecraftItemTypes2["IronBlock"] = "minecraft:iron_block";
  MinecraftItemTypes2["IronBoots"] = "minecraft:iron_boots";
  MinecraftItemTypes2["IronChestplate"] = "minecraft:iron_chestplate";
  MinecraftItemTypes2["IronDoor"] = "minecraft:iron_door";
  MinecraftItemTypes2["IronGolemSpawnEgg"] = "minecraft:iron_golem_spawn_egg";
  MinecraftItemTypes2["IronHelmet"] = "minecraft:iron_helmet";
  MinecraftItemTypes2["IronHoe"] = "minecraft:iron_hoe";
  MinecraftItemTypes2["IronHorseArmor"] = "minecraft:iron_horse_armor";
  MinecraftItemTypes2["IronIngot"] = "minecraft:iron_ingot";
  MinecraftItemTypes2["IronLeggings"] = "minecraft:iron_leggings";
  MinecraftItemTypes2["IronNugget"] = "minecraft:iron_nugget";
  MinecraftItemTypes2["IronOre"] = "minecraft:iron_ore";
  MinecraftItemTypes2["IronPickaxe"] = "minecraft:iron_pickaxe";
  MinecraftItemTypes2["IronShovel"] = "minecraft:iron_shovel";
  MinecraftItemTypes2["IronSword"] = "minecraft:iron_sword";
  MinecraftItemTypes2["IronTrapdoor"] = "minecraft:iron_trapdoor";
  MinecraftItemTypes2["Jigsaw"] = "minecraft:jigsaw";
  MinecraftItemTypes2["Jukebox"] = "minecraft:jukebox";
  MinecraftItemTypes2["JungleBoat"] = "minecraft:jungle_boat";
  MinecraftItemTypes2["JungleButton"] = "minecraft:jungle_button";
  MinecraftItemTypes2["JungleChestBoat"] = "minecraft:jungle_chest_boat";
  MinecraftItemTypes2["JungleDoor"] = "minecraft:jungle_door";
  MinecraftItemTypes2["JungleFence"] = "minecraft:jungle_fence";
  MinecraftItemTypes2["JungleFenceGate"] = "minecraft:jungle_fence_gate";
  MinecraftItemTypes2["JungleHangingSign"] = "minecraft:jungle_hanging_sign";
  MinecraftItemTypes2["JungleLeaves"] = "minecraft:jungle_leaves";
  MinecraftItemTypes2["JungleLog"] = "minecraft:jungle_log";
  MinecraftItemTypes2["JunglePlanks"] = "minecraft:jungle_planks";
  MinecraftItemTypes2["JunglePressurePlate"] = "minecraft:jungle_pressure_plate";
  MinecraftItemTypes2["JungleSapling"] = "minecraft:jungle_sapling";
  MinecraftItemTypes2["JungleSign"] = "minecraft:jungle_sign";
  MinecraftItemTypes2["JungleSlab"] = "minecraft:jungle_slab";
  MinecraftItemTypes2["JungleStairs"] = "minecraft:jungle_stairs";
  MinecraftItemTypes2["JungleTrapdoor"] = "minecraft:jungle_trapdoor";
  MinecraftItemTypes2["JungleWood"] = "minecraft:jungle_wood";
  MinecraftItemTypes2["Kelp"] = "minecraft:kelp";
  MinecraftItemTypes2["Ladder"] = "minecraft:ladder";
  MinecraftItemTypes2["Lantern"] = "minecraft:lantern";
  MinecraftItemTypes2["LapisBlock"] = "minecraft:lapis_block";
  MinecraftItemTypes2["LapisLazuli"] = "minecraft:lapis_lazuli";
  MinecraftItemTypes2["LapisOre"] = "minecraft:lapis_ore";
  MinecraftItemTypes2["LargeAmethystBud"] = "minecraft:large_amethyst_bud";
  MinecraftItemTypes2["LargeFern"] = "minecraft:large_fern";
  MinecraftItemTypes2["LavaBucket"] = "minecraft:lava_bucket";
  MinecraftItemTypes2["Lead"] = "minecraft:lead";
  MinecraftItemTypes2["Leather"] = "minecraft:leather";
  MinecraftItemTypes2["LeatherBoots"] = "minecraft:leather_boots";
  MinecraftItemTypes2["LeatherChestplate"] = "minecraft:leather_chestplate";
  MinecraftItemTypes2["LeatherHelmet"] = "minecraft:leather_helmet";
  MinecraftItemTypes2["LeatherHorseArmor"] = "minecraft:leather_horse_armor";
  MinecraftItemTypes2["LeatherLeggings"] = "minecraft:leather_leggings";
  MinecraftItemTypes2["Lectern"] = "minecraft:lectern";
  MinecraftItemTypes2["Lever"] = "minecraft:lever";
  MinecraftItemTypes2["LightBlock0"] = "minecraft:light_block_0";
  MinecraftItemTypes2["LightBlock1"] = "minecraft:light_block_1";
  MinecraftItemTypes2["LightBlock10"] = "minecraft:light_block_10";
  MinecraftItemTypes2["LightBlock11"] = "minecraft:light_block_11";
  MinecraftItemTypes2["LightBlock12"] = "minecraft:light_block_12";
  MinecraftItemTypes2["LightBlock13"] = "minecraft:light_block_13";
  MinecraftItemTypes2["LightBlock14"] = "minecraft:light_block_14";
  MinecraftItemTypes2["LightBlock15"] = "minecraft:light_block_15";
  MinecraftItemTypes2["LightBlock2"] = "minecraft:light_block_2";
  MinecraftItemTypes2["LightBlock3"] = "minecraft:light_block_3";
  MinecraftItemTypes2["LightBlock4"] = "minecraft:light_block_4";
  MinecraftItemTypes2["LightBlock5"] = "minecraft:light_block_5";
  MinecraftItemTypes2["LightBlock6"] = "minecraft:light_block_6";
  MinecraftItemTypes2["LightBlock7"] = "minecraft:light_block_7";
  MinecraftItemTypes2["LightBlock8"] = "minecraft:light_block_8";
  MinecraftItemTypes2["LightBlock9"] = "minecraft:light_block_9";
  MinecraftItemTypes2["LightBlueBundle"] = "minecraft:light_blue_bundle";
  MinecraftItemTypes2["LightBlueCandle"] = "minecraft:light_blue_candle";
  MinecraftItemTypes2["LightBlueCarpet"] = "minecraft:light_blue_carpet";
  MinecraftItemTypes2["LightBlueConcrete"] = "minecraft:light_blue_concrete";
  MinecraftItemTypes2["LightBlueConcretePowder"] = "minecraft:light_blue_concrete_powder";
  MinecraftItemTypes2["LightBlueDye"] = "minecraft:light_blue_dye";
  MinecraftItemTypes2["LightBlueGlazedTerracotta"] = "minecraft:light_blue_glazed_terracotta";
  MinecraftItemTypes2["LightBlueShulkerBox"] = "minecraft:light_blue_shulker_box";
  MinecraftItemTypes2["LightBlueStainedGlass"] = "minecraft:light_blue_stained_glass";
  MinecraftItemTypes2["LightBlueStainedGlassPane"] = "minecraft:light_blue_stained_glass_pane";
  MinecraftItemTypes2["LightBlueTerracotta"] = "minecraft:light_blue_terracotta";
  MinecraftItemTypes2["LightBlueWool"] = "minecraft:light_blue_wool";
  MinecraftItemTypes2["LightGrayBundle"] = "minecraft:light_gray_bundle";
  MinecraftItemTypes2["LightGrayCandle"] = "minecraft:light_gray_candle";
  MinecraftItemTypes2["LightGrayCarpet"] = "minecraft:light_gray_carpet";
  MinecraftItemTypes2["LightGrayConcrete"] = "minecraft:light_gray_concrete";
  MinecraftItemTypes2["LightGrayConcretePowder"] = "minecraft:light_gray_concrete_powder";
  MinecraftItemTypes2["LightGrayDye"] = "minecraft:light_gray_dye";
  MinecraftItemTypes2["LightGrayShulkerBox"] = "minecraft:light_gray_shulker_box";
  MinecraftItemTypes2["LightGrayStainedGlass"] = "minecraft:light_gray_stained_glass";
  MinecraftItemTypes2["LightGrayStainedGlassPane"] = "minecraft:light_gray_stained_glass_pane";
  MinecraftItemTypes2["LightGrayTerracotta"] = "minecraft:light_gray_terracotta";
  MinecraftItemTypes2["LightGrayWool"] = "minecraft:light_gray_wool";
  MinecraftItemTypes2["LightWeightedPressurePlate"] = "minecraft:light_weighted_pressure_plate";
  MinecraftItemTypes2["LightningRod"] = "minecraft:lightning_rod";
  MinecraftItemTypes2["Lilac"] = "minecraft:lilac";
  MinecraftItemTypes2["LilyOfTheValley"] = "minecraft:lily_of_the_valley";
  MinecraftItemTypes2["LimeBundle"] = "minecraft:lime_bundle";
  MinecraftItemTypes2["LimeCandle"] = "minecraft:lime_candle";
  MinecraftItemTypes2["LimeCarpet"] = "minecraft:lime_carpet";
  MinecraftItemTypes2["LimeConcrete"] = "minecraft:lime_concrete";
  MinecraftItemTypes2["LimeConcretePowder"] = "minecraft:lime_concrete_powder";
  MinecraftItemTypes2["LimeDye"] = "minecraft:lime_dye";
  MinecraftItemTypes2["LimeGlazedTerracotta"] = "minecraft:lime_glazed_terracotta";
  MinecraftItemTypes2["LimeShulkerBox"] = "minecraft:lime_shulker_box";
  MinecraftItemTypes2["LimeStainedGlass"] = "minecraft:lime_stained_glass";
  MinecraftItemTypes2["LimeStainedGlassPane"] = "minecraft:lime_stained_glass_pane";
  MinecraftItemTypes2["LimeTerracotta"] = "minecraft:lime_terracotta";
  MinecraftItemTypes2["LimeWool"] = "minecraft:lime_wool";
  MinecraftItemTypes2["LingeringPotion"] = "minecraft:lingering_potion";
  MinecraftItemTypes2["LitPumpkin"] = "minecraft:lit_pumpkin";
  MinecraftItemTypes2["LlamaSpawnEgg"] = "minecraft:llama_spawn_egg";
  MinecraftItemTypes2["Lodestone"] = "minecraft:lodestone";
  MinecraftItemTypes2["LodestoneCompass"] = "minecraft:lodestone_compass";
  MinecraftItemTypes2["Loom"] = "minecraft:loom";
  MinecraftItemTypes2["Mace"] = "minecraft:mace";
  MinecraftItemTypes2["MagentaBundle"] = "minecraft:magenta_bundle";
  MinecraftItemTypes2["MagentaCandle"] = "minecraft:magenta_candle";
  MinecraftItemTypes2["MagentaCarpet"] = "minecraft:magenta_carpet";
  MinecraftItemTypes2["MagentaConcrete"] = "minecraft:magenta_concrete";
  MinecraftItemTypes2["MagentaConcretePowder"] = "minecraft:magenta_concrete_powder";
  MinecraftItemTypes2["MagentaDye"] = "minecraft:magenta_dye";
  MinecraftItemTypes2["MagentaGlazedTerracotta"] = "minecraft:magenta_glazed_terracotta";
  MinecraftItemTypes2["MagentaShulkerBox"] = "minecraft:magenta_shulker_box";
  MinecraftItemTypes2["MagentaStainedGlass"] = "minecraft:magenta_stained_glass";
  MinecraftItemTypes2["MagentaStainedGlassPane"] = "minecraft:magenta_stained_glass_pane";
  MinecraftItemTypes2["MagentaTerracotta"] = "minecraft:magenta_terracotta";
  MinecraftItemTypes2["MagentaWool"] = "minecraft:magenta_wool";
  MinecraftItemTypes2["Magma"] = "minecraft:magma";
  MinecraftItemTypes2["MagmaCream"] = "minecraft:magma_cream";
  MinecraftItemTypes2["MagmaCubeSpawnEgg"] = "minecraft:magma_cube_spawn_egg";
  MinecraftItemTypes2["MangroveBoat"] = "minecraft:mangrove_boat";
  MinecraftItemTypes2["MangroveButton"] = "minecraft:mangrove_button";
  MinecraftItemTypes2["MangroveChestBoat"] = "minecraft:mangrove_chest_boat";
  MinecraftItemTypes2["MangroveDoor"] = "minecraft:mangrove_door";
  MinecraftItemTypes2["MangroveFence"] = "minecraft:mangrove_fence";
  MinecraftItemTypes2["MangroveFenceGate"] = "minecraft:mangrove_fence_gate";
  MinecraftItemTypes2["MangroveHangingSign"] = "minecraft:mangrove_hanging_sign";
  MinecraftItemTypes2["MangroveLeaves"] = "minecraft:mangrove_leaves";
  MinecraftItemTypes2["MangroveLog"] = "minecraft:mangrove_log";
  MinecraftItemTypes2["MangrovePlanks"] = "minecraft:mangrove_planks";
  MinecraftItemTypes2["MangrovePressurePlate"] = "minecraft:mangrove_pressure_plate";
  MinecraftItemTypes2["MangrovePropagule"] = "minecraft:mangrove_propagule";
  MinecraftItemTypes2["MangroveRoots"] = "minecraft:mangrove_roots";
  MinecraftItemTypes2["MangroveSign"] = "minecraft:mangrove_sign";
  MinecraftItemTypes2["MangroveSlab"] = "minecraft:mangrove_slab";
  MinecraftItemTypes2["MangroveStairs"] = "minecraft:mangrove_stairs";
  MinecraftItemTypes2["MangroveTrapdoor"] = "minecraft:mangrove_trapdoor";
  MinecraftItemTypes2["MangroveWood"] = "minecraft:mangrove_wood";
  MinecraftItemTypes2["MediumAmethystBud"] = "minecraft:medium_amethyst_bud";
  MinecraftItemTypes2["MelonBlock"] = "minecraft:melon_block";
  MinecraftItemTypes2["MelonSeeds"] = "minecraft:melon_seeds";
  MinecraftItemTypes2["MelonSlice"] = "minecraft:melon_slice";
  MinecraftItemTypes2["MilkBucket"] = "minecraft:milk_bucket";
  MinecraftItemTypes2["Minecart"] = "minecraft:minecart";
  MinecraftItemTypes2["MinerPotterySherd"] = "minecraft:miner_pottery_sherd";
  MinecraftItemTypes2["MobSpawner"] = "minecraft:mob_spawner";
  MinecraftItemTypes2["MojangBannerPattern"] = "minecraft:mojang_banner_pattern";
  MinecraftItemTypes2["MooshroomSpawnEgg"] = "minecraft:mooshroom_spawn_egg";
  MinecraftItemTypes2["MossBlock"] = "minecraft:moss_block";
  MinecraftItemTypes2["MossCarpet"] = "minecraft:moss_carpet";
  MinecraftItemTypes2["MossyCobblestone"] = "minecraft:mossy_cobblestone";
  MinecraftItemTypes2["MossyCobblestoneSlab"] = "minecraft:mossy_cobblestone_slab";
  MinecraftItemTypes2["MossyCobblestoneStairs"] = "minecraft:mossy_cobblestone_stairs";
  MinecraftItemTypes2["MossyCobblestoneWall"] = "minecraft:mossy_cobblestone_wall";
  MinecraftItemTypes2["MossyStoneBrickSlab"] = "minecraft:mossy_stone_brick_slab";
  MinecraftItemTypes2["MossyStoneBrickStairs"] = "minecraft:mossy_stone_brick_stairs";
  MinecraftItemTypes2["MossyStoneBrickWall"] = "minecraft:mossy_stone_brick_wall";
  MinecraftItemTypes2["MossyStoneBricks"] = "minecraft:mossy_stone_bricks";
  MinecraftItemTypes2["MournerPotterySherd"] = "minecraft:mourner_pottery_sherd";
  MinecraftItemTypes2["Mud"] = "minecraft:mud";
  MinecraftItemTypes2["MudBrickSlab"] = "minecraft:mud_brick_slab";
  MinecraftItemTypes2["MudBrickStairs"] = "minecraft:mud_brick_stairs";
  MinecraftItemTypes2["MudBrickWall"] = "minecraft:mud_brick_wall";
  MinecraftItemTypes2["MudBricks"] = "minecraft:mud_bricks";
  MinecraftItemTypes2["MuddyMangroveRoots"] = "minecraft:muddy_mangrove_roots";
  MinecraftItemTypes2["MuleSpawnEgg"] = "minecraft:mule_spawn_egg";
  MinecraftItemTypes2["MushroomStem"] = "minecraft:mushroom_stem";
  MinecraftItemTypes2["MushroomStew"] = "minecraft:mushroom_stew";
  MinecraftItemTypes2["MusicDisc11"] = "minecraft:music_disc_11";
  MinecraftItemTypes2["MusicDisc13"] = "minecraft:music_disc_13";
  MinecraftItemTypes2["MusicDisc5"] = "minecraft:music_disc_5";
  MinecraftItemTypes2["MusicDiscBlocks"] = "minecraft:music_disc_blocks";
  MinecraftItemTypes2["MusicDiscCat"] = "minecraft:music_disc_cat";
  MinecraftItemTypes2["MusicDiscChirp"] = "minecraft:music_disc_chirp";
  MinecraftItemTypes2["MusicDiscCreator"] = "minecraft:music_disc_creator";
  MinecraftItemTypes2["MusicDiscCreatorMusicBox"] = "minecraft:music_disc_creator_music_box";
  MinecraftItemTypes2["MusicDiscFar"] = "minecraft:music_disc_far";
  MinecraftItemTypes2["MusicDiscMall"] = "minecraft:music_disc_mall";
  MinecraftItemTypes2["MusicDiscMellohi"] = "minecraft:music_disc_mellohi";
  MinecraftItemTypes2["MusicDiscOtherside"] = "minecraft:music_disc_otherside";
  MinecraftItemTypes2["MusicDiscPigstep"] = "minecraft:music_disc_pigstep";
  MinecraftItemTypes2["MusicDiscPrecipice"] = "minecraft:music_disc_precipice";
  MinecraftItemTypes2["MusicDiscRelic"] = "minecraft:music_disc_relic";
  MinecraftItemTypes2["MusicDiscStal"] = "minecraft:music_disc_stal";
  MinecraftItemTypes2["MusicDiscStrad"] = "minecraft:music_disc_strad";
  MinecraftItemTypes2["MusicDiscWait"] = "minecraft:music_disc_wait";
  MinecraftItemTypes2["MusicDiscWard"] = "minecraft:music_disc_ward";
  MinecraftItemTypes2["Mutton"] = "minecraft:mutton";
  MinecraftItemTypes2["Mycelium"] = "minecraft:mycelium";
  MinecraftItemTypes2["NameTag"] = "minecraft:name_tag";
  MinecraftItemTypes2["NautilusShell"] = "minecraft:nautilus_shell";
  MinecraftItemTypes2["NetherBrick"] = "minecraft:nether_brick";
  MinecraftItemTypes2["NetherBrickFence"] = "minecraft:nether_brick_fence";
  MinecraftItemTypes2["NetherBrickSlab"] = "minecraft:nether_brick_slab";
  MinecraftItemTypes2["NetherBrickStairs"] = "minecraft:nether_brick_stairs";
  MinecraftItemTypes2["NetherBrickWall"] = "minecraft:nether_brick_wall";
  MinecraftItemTypes2["NetherGoldOre"] = "minecraft:nether_gold_ore";
  MinecraftItemTypes2["NetherSprouts"] = "minecraft:nether_sprouts";
  MinecraftItemTypes2["NetherStar"] = "minecraft:nether_star";
  MinecraftItemTypes2["NetherWart"] = "minecraft:nether_wart";
  MinecraftItemTypes2["NetherWartBlock"] = "minecraft:nether_wart_block";
  MinecraftItemTypes2["Netherbrick"] = "minecraft:netherbrick";
  MinecraftItemTypes2["NetheriteAxe"] = "minecraft:netherite_axe";
  MinecraftItemTypes2["NetheriteBlock"] = "minecraft:netherite_block";
  MinecraftItemTypes2["NetheriteBoots"] = "minecraft:netherite_boots";
  MinecraftItemTypes2["NetheriteChestplate"] = "minecraft:netherite_chestplate";
  MinecraftItemTypes2["NetheriteHelmet"] = "minecraft:netherite_helmet";
  MinecraftItemTypes2["NetheriteHoe"] = "minecraft:netherite_hoe";
  MinecraftItemTypes2["NetheriteIngot"] = "minecraft:netherite_ingot";
  MinecraftItemTypes2["NetheriteLeggings"] = "minecraft:netherite_leggings";
  MinecraftItemTypes2["NetheritePickaxe"] = "minecraft:netherite_pickaxe";
  MinecraftItemTypes2["NetheriteScrap"] = "minecraft:netherite_scrap";
  MinecraftItemTypes2["NetheriteShovel"] = "minecraft:netherite_shovel";
  MinecraftItemTypes2["NetheriteSword"] = "minecraft:netherite_sword";
  MinecraftItemTypes2["NetheriteUpgradeSmithingTemplate"] = "minecraft:netherite_upgrade_smithing_template";
  MinecraftItemTypes2["Netherrack"] = "minecraft:netherrack";
  MinecraftItemTypes2["NormalStoneSlab"] = "minecraft:normal_stone_slab";
  MinecraftItemTypes2["NormalStoneStairs"] = "minecraft:normal_stone_stairs";
  MinecraftItemTypes2["Noteblock"] = "minecraft:noteblock";
  MinecraftItemTypes2["OakBoat"] = "minecraft:oak_boat";
  MinecraftItemTypes2["OakChestBoat"] = "minecraft:oak_chest_boat";
  MinecraftItemTypes2["OakFence"] = "minecraft:oak_fence";
  MinecraftItemTypes2["OakHangingSign"] = "minecraft:oak_hanging_sign";
  MinecraftItemTypes2["OakLeaves"] = "minecraft:oak_leaves";
  MinecraftItemTypes2["OakLog"] = "minecraft:oak_log";
  MinecraftItemTypes2["OakPlanks"] = "minecraft:oak_planks";
  MinecraftItemTypes2["OakSapling"] = "minecraft:oak_sapling";
  MinecraftItemTypes2["OakSign"] = "minecraft:oak_sign";
  MinecraftItemTypes2["OakSlab"] = "minecraft:oak_slab";
  MinecraftItemTypes2["OakStairs"] = "minecraft:oak_stairs";
  MinecraftItemTypes2["OakWood"] = "minecraft:oak_wood";
  MinecraftItemTypes2["Observer"] = "minecraft:observer";
  MinecraftItemTypes2["Obsidian"] = "minecraft:obsidian";
  MinecraftItemTypes2["OcelotSpawnEgg"] = "minecraft:ocelot_spawn_egg";
  MinecraftItemTypes2["OchreFroglight"] = "minecraft:ochre_froglight";
  MinecraftItemTypes2["OminousBottle"] = "minecraft:ominous_bottle";
  MinecraftItemTypes2["OminousTrialKey"] = "minecraft:ominous_trial_key";
  MinecraftItemTypes2["OpenEyeblossom"] = "minecraft:open_eyeblossom";
  MinecraftItemTypes2["OrangeBundle"] = "minecraft:orange_bundle";
  MinecraftItemTypes2["OrangeCandle"] = "minecraft:orange_candle";
  MinecraftItemTypes2["OrangeCarpet"] = "minecraft:orange_carpet";
  MinecraftItemTypes2["OrangeConcrete"] = "minecraft:orange_concrete";
  MinecraftItemTypes2["OrangeConcretePowder"] = "minecraft:orange_concrete_powder";
  MinecraftItemTypes2["OrangeDye"] = "minecraft:orange_dye";
  MinecraftItemTypes2["OrangeGlazedTerracotta"] = "minecraft:orange_glazed_terracotta";
  MinecraftItemTypes2["OrangeShulkerBox"] = "minecraft:orange_shulker_box";
  MinecraftItemTypes2["OrangeStainedGlass"] = "minecraft:orange_stained_glass";
  MinecraftItemTypes2["OrangeStainedGlassPane"] = "minecraft:orange_stained_glass_pane";
  MinecraftItemTypes2["OrangeTerracotta"] = "minecraft:orange_terracotta";
  MinecraftItemTypes2["OrangeTulip"] = "minecraft:orange_tulip";
  MinecraftItemTypes2["OrangeWool"] = "minecraft:orange_wool";
  MinecraftItemTypes2["OxeyeDaisy"] = "minecraft:oxeye_daisy";
  MinecraftItemTypes2["OxidizedChiseledCopper"] = "minecraft:oxidized_chiseled_copper";
  MinecraftItemTypes2["OxidizedCopper"] = "minecraft:oxidized_copper";
  MinecraftItemTypes2["OxidizedCopperBulb"] = "minecraft:oxidized_copper_bulb";
  MinecraftItemTypes2["OxidizedCopperDoor"] = "minecraft:oxidized_copper_door";
  MinecraftItemTypes2["OxidizedCopperGrate"] = "minecraft:oxidized_copper_grate";
  MinecraftItemTypes2["OxidizedCopperTrapdoor"] = "minecraft:oxidized_copper_trapdoor";
  MinecraftItemTypes2["OxidizedCutCopper"] = "minecraft:oxidized_cut_copper";
  MinecraftItemTypes2["OxidizedCutCopperSlab"] = "minecraft:oxidized_cut_copper_slab";
  MinecraftItemTypes2["OxidizedCutCopperStairs"] = "minecraft:oxidized_cut_copper_stairs";
  MinecraftItemTypes2["PackedIce"] = "minecraft:packed_ice";
  MinecraftItemTypes2["PackedMud"] = "minecraft:packed_mud";
  MinecraftItemTypes2["Painting"] = "minecraft:painting";
  MinecraftItemTypes2["PaleHangingMoss"] = "minecraft:pale_hanging_moss";
  MinecraftItemTypes2["PaleMossBlock"] = "minecraft:pale_moss_block";
  MinecraftItemTypes2["PaleMossCarpet"] = "minecraft:pale_moss_carpet";
  MinecraftItemTypes2["PaleOakBoat"] = "minecraft:pale_oak_boat";
  MinecraftItemTypes2["PaleOakButton"] = "minecraft:pale_oak_button";
  MinecraftItemTypes2["PaleOakChestBoat"] = "minecraft:pale_oak_chest_boat";
  MinecraftItemTypes2["PaleOakDoor"] = "minecraft:pale_oak_door";
  MinecraftItemTypes2["PaleOakFence"] = "minecraft:pale_oak_fence";
  MinecraftItemTypes2["PaleOakFenceGate"] = "minecraft:pale_oak_fence_gate";
  MinecraftItemTypes2["PaleOakHangingSign"] = "minecraft:pale_oak_hanging_sign";
  MinecraftItemTypes2["PaleOakLeaves"] = "minecraft:pale_oak_leaves";
  MinecraftItemTypes2["PaleOakLog"] = "minecraft:pale_oak_log";
  MinecraftItemTypes2["PaleOakPlanks"] = "minecraft:pale_oak_planks";
  MinecraftItemTypes2["PaleOakPressurePlate"] = "minecraft:pale_oak_pressure_plate";
  MinecraftItemTypes2["PaleOakSapling"] = "minecraft:pale_oak_sapling";
  MinecraftItemTypes2["PaleOakSign"] = "minecraft:pale_oak_sign";
  MinecraftItemTypes2["PaleOakSlab"] = "minecraft:pale_oak_slab";
  MinecraftItemTypes2["PaleOakStairs"] = "minecraft:pale_oak_stairs";
  MinecraftItemTypes2["PaleOakTrapdoor"] = "minecraft:pale_oak_trapdoor";
  MinecraftItemTypes2["PaleOakWood"] = "minecraft:pale_oak_wood";
  MinecraftItemTypes2["PandaSpawnEgg"] = "minecraft:panda_spawn_egg";
  MinecraftItemTypes2["Paper"] = "minecraft:paper";
  MinecraftItemTypes2["ParrotSpawnEgg"] = "minecraft:parrot_spawn_egg";
  MinecraftItemTypes2["PearlescentFroglight"] = "minecraft:pearlescent_froglight";
  MinecraftItemTypes2["Peony"] = "minecraft:peony";
  MinecraftItemTypes2["PetrifiedOakSlab"] = "minecraft:petrified_oak_slab";
  MinecraftItemTypes2["PhantomMembrane"] = "minecraft:phantom_membrane";
  MinecraftItemTypes2["PhantomSpawnEgg"] = "minecraft:phantom_spawn_egg";
  MinecraftItemTypes2["PigSpawnEgg"] = "minecraft:pig_spawn_egg";
  MinecraftItemTypes2["PiglinBannerPattern"] = "minecraft:piglin_banner_pattern";
  MinecraftItemTypes2["PiglinBruteSpawnEgg"] = "minecraft:piglin_brute_spawn_egg";
  MinecraftItemTypes2["PiglinHead"] = "minecraft:piglin_head";
  MinecraftItemTypes2["PiglinSpawnEgg"] = "minecraft:piglin_spawn_egg";
  MinecraftItemTypes2["PillagerSpawnEgg"] = "minecraft:pillager_spawn_egg";
  MinecraftItemTypes2["PinkBundle"] = "minecraft:pink_bundle";
  MinecraftItemTypes2["PinkCandle"] = "minecraft:pink_candle";
  MinecraftItemTypes2["PinkCarpet"] = "minecraft:pink_carpet";
  MinecraftItemTypes2["PinkConcrete"] = "minecraft:pink_concrete";
  MinecraftItemTypes2["PinkConcretePowder"] = "minecraft:pink_concrete_powder";
  MinecraftItemTypes2["PinkDye"] = "minecraft:pink_dye";
  MinecraftItemTypes2["PinkGlazedTerracotta"] = "minecraft:pink_glazed_terracotta";
  MinecraftItemTypes2["PinkPetals"] = "minecraft:pink_petals";
  MinecraftItemTypes2["PinkShulkerBox"] = "minecraft:pink_shulker_box";
  MinecraftItemTypes2["PinkStainedGlass"] = "minecraft:pink_stained_glass";
  MinecraftItemTypes2["PinkStainedGlassPane"] = "minecraft:pink_stained_glass_pane";
  MinecraftItemTypes2["PinkTerracotta"] = "minecraft:pink_terracotta";
  MinecraftItemTypes2["PinkTulip"] = "minecraft:pink_tulip";
  MinecraftItemTypes2["PinkWool"] = "minecraft:pink_wool";
  MinecraftItemTypes2["Piston"] = "minecraft:piston";
  MinecraftItemTypes2["PitcherPlant"] = "minecraft:pitcher_plant";
  MinecraftItemTypes2["PitcherPod"] = "minecraft:pitcher_pod";
  MinecraftItemTypes2["PlayerHead"] = "minecraft:player_head";
  MinecraftItemTypes2["PlentyPotterySherd"] = "minecraft:plenty_pottery_sherd";
  MinecraftItemTypes2["Podzol"] = "minecraft:podzol";
  MinecraftItemTypes2["PointedDripstone"] = "minecraft:pointed_dripstone";
  MinecraftItemTypes2["PoisonousPotato"] = "minecraft:poisonous_potato";
  MinecraftItemTypes2["PolarBearSpawnEgg"] = "minecraft:polar_bear_spawn_egg";
  MinecraftItemTypes2["PolishedAndesite"] = "minecraft:polished_andesite";
  MinecraftItemTypes2["PolishedAndesiteSlab"] = "minecraft:polished_andesite_slab";
  MinecraftItemTypes2["PolishedAndesiteStairs"] = "minecraft:polished_andesite_stairs";
  MinecraftItemTypes2["PolishedBasalt"] = "minecraft:polished_basalt";
  MinecraftItemTypes2["PolishedBlackstone"] = "minecraft:polished_blackstone";
  MinecraftItemTypes2["PolishedBlackstoneBrickSlab"] = "minecraft:polished_blackstone_brick_slab";
  MinecraftItemTypes2["PolishedBlackstoneBrickStairs"] = "minecraft:polished_blackstone_brick_stairs";
  MinecraftItemTypes2["PolishedBlackstoneBrickWall"] = "minecraft:polished_blackstone_brick_wall";
  MinecraftItemTypes2["PolishedBlackstoneBricks"] = "minecraft:polished_blackstone_bricks";
  MinecraftItemTypes2["PolishedBlackstoneButton"] = "minecraft:polished_blackstone_button";
  MinecraftItemTypes2["PolishedBlackstonePressurePlate"] = "minecraft:polished_blackstone_pressure_plate";
  MinecraftItemTypes2["PolishedBlackstoneSlab"] = "minecraft:polished_blackstone_slab";
  MinecraftItemTypes2["PolishedBlackstoneStairs"] = "minecraft:polished_blackstone_stairs";
  MinecraftItemTypes2["PolishedBlackstoneWall"] = "minecraft:polished_blackstone_wall";
  MinecraftItemTypes2["PolishedDeepslate"] = "minecraft:polished_deepslate";
  MinecraftItemTypes2["PolishedDeepslateSlab"] = "minecraft:polished_deepslate_slab";
  MinecraftItemTypes2["PolishedDeepslateStairs"] = "minecraft:polished_deepslate_stairs";
  MinecraftItemTypes2["PolishedDeepslateWall"] = "minecraft:polished_deepslate_wall";
  MinecraftItemTypes2["PolishedDiorite"] = "minecraft:polished_diorite";
  MinecraftItemTypes2["PolishedDioriteSlab"] = "minecraft:polished_diorite_slab";
  MinecraftItemTypes2["PolishedDioriteStairs"] = "minecraft:polished_diorite_stairs";
  MinecraftItemTypes2["PolishedGranite"] = "minecraft:polished_granite";
  MinecraftItemTypes2["PolishedGraniteSlab"] = "minecraft:polished_granite_slab";
  MinecraftItemTypes2["PolishedGraniteStairs"] = "minecraft:polished_granite_stairs";
  MinecraftItemTypes2["PolishedTuff"] = "minecraft:polished_tuff";
  MinecraftItemTypes2["PolishedTuffSlab"] = "minecraft:polished_tuff_slab";
  MinecraftItemTypes2["PolishedTuffStairs"] = "minecraft:polished_tuff_stairs";
  MinecraftItemTypes2["PolishedTuffWall"] = "minecraft:polished_tuff_wall";
  MinecraftItemTypes2["PoppedChorusFruit"] = "minecraft:popped_chorus_fruit";
  MinecraftItemTypes2["Poppy"] = "minecraft:poppy";
  MinecraftItemTypes2["Porkchop"] = "minecraft:porkchop";
  MinecraftItemTypes2["Potato"] = "minecraft:potato";
  MinecraftItemTypes2["Potion"] = "minecraft:potion";
  MinecraftItemTypes2["PowderSnowBucket"] = "minecraft:powder_snow_bucket";
  MinecraftItemTypes2["Prismarine"] = "minecraft:prismarine";
  MinecraftItemTypes2["PrismarineBrickSlab"] = "minecraft:prismarine_brick_slab";
  MinecraftItemTypes2["PrismarineBricks"] = "minecraft:prismarine_bricks";
  MinecraftItemTypes2["PrismarineBricksStairs"] = "minecraft:prismarine_bricks_stairs";
  MinecraftItemTypes2["PrismarineCrystals"] = "minecraft:prismarine_crystals";
  MinecraftItemTypes2["PrismarineShard"] = "minecraft:prismarine_shard";
  MinecraftItemTypes2["PrismarineSlab"] = "minecraft:prismarine_slab";
  MinecraftItemTypes2["PrismarineStairs"] = "minecraft:prismarine_stairs";
  MinecraftItemTypes2["PrismarineWall"] = "minecraft:prismarine_wall";
  MinecraftItemTypes2["PrizePotterySherd"] = "minecraft:prize_pottery_sherd";
  MinecraftItemTypes2["Pufferfish"] = "minecraft:pufferfish";
  MinecraftItemTypes2["PufferfishBucket"] = "minecraft:pufferfish_bucket";
  MinecraftItemTypes2["PufferfishSpawnEgg"] = "minecraft:pufferfish_spawn_egg";
  MinecraftItemTypes2["Pumpkin"] = "minecraft:pumpkin";
  MinecraftItemTypes2["PumpkinPie"] = "minecraft:pumpkin_pie";
  MinecraftItemTypes2["PumpkinSeeds"] = "minecraft:pumpkin_seeds";
  MinecraftItemTypes2["PurpleBundle"] = "minecraft:purple_bundle";
  MinecraftItemTypes2["PurpleCandle"] = "minecraft:purple_candle";
  MinecraftItemTypes2["PurpleCarpet"] = "minecraft:purple_carpet";
  MinecraftItemTypes2["PurpleConcrete"] = "minecraft:purple_concrete";
  MinecraftItemTypes2["PurpleConcretePowder"] = "minecraft:purple_concrete_powder";
  MinecraftItemTypes2["PurpleDye"] = "minecraft:purple_dye";
  MinecraftItemTypes2["PurpleGlazedTerracotta"] = "minecraft:purple_glazed_terracotta";
  MinecraftItemTypes2["PurpleShulkerBox"] = "minecraft:purple_shulker_box";
  MinecraftItemTypes2["PurpleStainedGlass"] = "minecraft:purple_stained_glass";
  MinecraftItemTypes2["PurpleStainedGlassPane"] = "minecraft:purple_stained_glass_pane";
  MinecraftItemTypes2["PurpleTerracotta"] = "minecraft:purple_terracotta";
  MinecraftItemTypes2["PurpleWool"] = "minecraft:purple_wool";
  MinecraftItemTypes2["PurpurBlock"] = "minecraft:purpur_block";
  MinecraftItemTypes2["PurpurPillar"] = "minecraft:purpur_pillar";
  MinecraftItemTypes2["PurpurSlab"] = "minecraft:purpur_slab";
  MinecraftItemTypes2["PurpurStairs"] = "minecraft:purpur_stairs";
  MinecraftItemTypes2["Quartz"] = "minecraft:quartz";
  MinecraftItemTypes2["QuartzBlock"] = "minecraft:quartz_block";
  MinecraftItemTypes2["QuartzBricks"] = "minecraft:quartz_bricks";
  MinecraftItemTypes2["QuartzOre"] = "minecraft:quartz_ore";
  MinecraftItemTypes2["QuartzPillar"] = "minecraft:quartz_pillar";
  MinecraftItemTypes2["QuartzSlab"] = "minecraft:quartz_slab";
  MinecraftItemTypes2["QuartzStairs"] = "minecraft:quartz_stairs";
  MinecraftItemTypes2["Rabbit"] = "minecraft:rabbit";
  MinecraftItemTypes2["RabbitFoot"] = "minecraft:rabbit_foot";
  MinecraftItemTypes2["RabbitHide"] = "minecraft:rabbit_hide";
  MinecraftItemTypes2["RabbitSpawnEgg"] = "minecraft:rabbit_spawn_egg";
  MinecraftItemTypes2["RabbitStew"] = "minecraft:rabbit_stew";
  MinecraftItemTypes2["Rail"] = "minecraft:rail";
  MinecraftItemTypes2["RaiserArmorTrimSmithingTemplate"] = "minecraft:raiser_armor_trim_smithing_template";
  MinecraftItemTypes2["RavagerSpawnEgg"] = "minecraft:ravager_spawn_egg";
  MinecraftItemTypes2["RawCopper"] = "minecraft:raw_copper";
  MinecraftItemTypes2["RawCopperBlock"] = "minecraft:raw_copper_block";
  MinecraftItemTypes2["RawGold"] = "minecraft:raw_gold";
  MinecraftItemTypes2["RawGoldBlock"] = "minecraft:raw_gold_block";
  MinecraftItemTypes2["RawIron"] = "minecraft:raw_iron";
  MinecraftItemTypes2["RawIronBlock"] = "minecraft:raw_iron_block";
  MinecraftItemTypes2["RecoveryCompass"] = "minecraft:recovery_compass";
  MinecraftItemTypes2["RedBundle"] = "minecraft:red_bundle";
  MinecraftItemTypes2["RedCandle"] = "minecraft:red_candle";
  MinecraftItemTypes2["RedCarpet"] = "minecraft:red_carpet";
  MinecraftItemTypes2["RedConcrete"] = "minecraft:red_concrete";
  MinecraftItemTypes2["RedConcretePowder"] = "minecraft:red_concrete_powder";
  MinecraftItemTypes2["RedDye"] = "minecraft:red_dye";
  MinecraftItemTypes2["RedGlazedTerracotta"] = "minecraft:red_glazed_terracotta";
  MinecraftItemTypes2["RedMushroom"] = "minecraft:red_mushroom";
  MinecraftItemTypes2["RedMushroomBlock"] = "minecraft:red_mushroom_block";
  MinecraftItemTypes2["RedNetherBrick"] = "minecraft:red_nether_brick";
  MinecraftItemTypes2["RedNetherBrickSlab"] = "minecraft:red_nether_brick_slab";
  MinecraftItemTypes2["RedNetherBrickStairs"] = "minecraft:red_nether_brick_stairs";
  MinecraftItemTypes2["RedNetherBrickWall"] = "minecraft:red_nether_brick_wall";
  MinecraftItemTypes2["RedSand"] = "minecraft:red_sand";
  MinecraftItemTypes2["RedSandstone"] = "minecraft:red_sandstone";
  MinecraftItemTypes2["RedSandstoneSlab"] = "minecraft:red_sandstone_slab";
  MinecraftItemTypes2["RedSandstoneStairs"] = "minecraft:red_sandstone_stairs";
  MinecraftItemTypes2["RedSandstoneWall"] = "minecraft:red_sandstone_wall";
  MinecraftItemTypes2["RedShulkerBox"] = "minecraft:red_shulker_box";
  MinecraftItemTypes2["RedStainedGlass"] = "minecraft:red_stained_glass";
  MinecraftItemTypes2["RedStainedGlassPane"] = "minecraft:red_stained_glass_pane";
  MinecraftItemTypes2["RedTerracotta"] = "minecraft:red_terracotta";
  MinecraftItemTypes2["RedTulip"] = "minecraft:red_tulip";
  MinecraftItemTypes2["RedWool"] = "minecraft:red_wool";
  MinecraftItemTypes2["Redstone"] = "minecraft:redstone";
  MinecraftItemTypes2["RedstoneBlock"] = "minecraft:redstone_block";
  MinecraftItemTypes2["RedstoneLamp"] = "minecraft:redstone_lamp";
  MinecraftItemTypes2["RedstoneOre"] = "minecraft:redstone_ore";
  MinecraftItemTypes2["RedstoneTorch"] = "minecraft:redstone_torch";
  MinecraftItemTypes2["ReinforcedDeepslate"] = "minecraft:reinforced_deepslate";
  MinecraftItemTypes2["Repeater"] = "minecraft:repeater";
  MinecraftItemTypes2["RepeatingCommandBlock"] = "minecraft:repeating_command_block";
  MinecraftItemTypes2["ResinBlock"] = "minecraft:resin_block";
  MinecraftItemTypes2["ResinBrick"] = "minecraft:resin_brick";
  MinecraftItemTypes2["ResinBrickSlab"] = "minecraft:resin_brick_slab";
  MinecraftItemTypes2["ResinBrickStairs"] = "minecraft:resin_brick_stairs";
  MinecraftItemTypes2["ResinBrickWall"] = "minecraft:resin_brick_wall";
  MinecraftItemTypes2["ResinBricks"] = "minecraft:resin_bricks";
  MinecraftItemTypes2["ResinClump"] = "minecraft:resin_clump";
  MinecraftItemTypes2["RespawnAnchor"] = "minecraft:respawn_anchor";
  MinecraftItemTypes2["RibArmorTrimSmithingTemplate"] = "minecraft:rib_armor_trim_smithing_template";
  MinecraftItemTypes2["RoseBush"] = "minecraft:rose_bush";
  MinecraftItemTypes2["RottenFlesh"] = "minecraft:rotten_flesh";
  MinecraftItemTypes2["Saddle"] = "minecraft:saddle";
  MinecraftItemTypes2["Salmon"] = "minecraft:salmon";
  MinecraftItemTypes2["SalmonBucket"] = "minecraft:salmon_bucket";
  MinecraftItemTypes2["SalmonSpawnEgg"] = "minecraft:salmon_spawn_egg";
  MinecraftItemTypes2["Sand"] = "minecraft:sand";
  MinecraftItemTypes2["Sandstone"] = "minecraft:sandstone";
  MinecraftItemTypes2["SandstoneSlab"] = "minecraft:sandstone_slab";
  MinecraftItemTypes2["SandstoneStairs"] = "minecraft:sandstone_stairs";
  MinecraftItemTypes2["SandstoneWall"] = "minecraft:sandstone_wall";
  MinecraftItemTypes2["Scaffolding"] = "minecraft:scaffolding";
  MinecraftItemTypes2["ScrapePotterySherd"] = "minecraft:scrape_pottery_sherd";
  MinecraftItemTypes2["Sculk"] = "minecraft:sculk";
  MinecraftItemTypes2["SculkCatalyst"] = "minecraft:sculk_catalyst";
  MinecraftItemTypes2["SculkSensor"] = "minecraft:sculk_sensor";
  MinecraftItemTypes2["SculkShrieker"] = "minecraft:sculk_shrieker";
  MinecraftItemTypes2["SculkVein"] = "minecraft:sculk_vein";
  MinecraftItemTypes2["SeaLantern"] = "minecraft:sea_lantern";
  MinecraftItemTypes2["SeaPickle"] = "minecraft:sea_pickle";
  MinecraftItemTypes2["Seagrass"] = "minecraft:seagrass";
  MinecraftItemTypes2["SentryArmorTrimSmithingTemplate"] = "minecraft:sentry_armor_trim_smithing_template";
  MinecraftItemTypes2["ShaperArmorTrimSmithingTemplate"] = "minecraft:shaper_armor_trim_smithing_template";
  MinecraftItemTypes2["SheafPotterySherd"] = "minecraft:sheaf_pottery_sherd";
  MinecraftItemTypes2["Shears"] = "minecraft:shears";
  MinecraftItemTypes2["SheepSpawnEgg"] = "minecraft:sheep_spawn_egg";
  MinecraftItemTypes2["ShelterPotterySherd"] = "minecraft:shelter_pottery_sherd";
  MinecraftItemTypes2["Shield"] = "minecraft:shield";
  MinecraftItemTypes2["ShortGrass"] = "minecraft:short_grass";
  MinecraftItemTypes2["Shroomlight"] = "minecraft:shroomlight";
  MinecraftItemTypes2["ShulkerShell"] = "minecraft:shulker_shell";
  MinecraftItemTypes2["ShulkerSpawnEgg"] = "minecraft:shulker_spawn_egg";
  MinecraftItemTypes2["SilenceArmorTrimSmithingTemplate"] = "minecraft:silence_armor_trim_smithing_template";
  MinecraftItemTypes2["SilverGlazedTerracotta"] = "minecraft:silver_glazed_terracotta";
  MinecraftItemTypes2["SilverfishSpawnEgg"] = "minecraft:silverfish_spawn_egg";
  MinecraftItemTypes2["SkeletonHorseSpawnEgg"] = "minecraft:skeleton_horse_spawn_egg";
  MinecraftItemTypes2["SkeletonSkull"] = "minecraft:skeleton_skull";
  MinecraftItemTypes2["SkeletonSpawnEgg"] = "minecraft:skeleton_spawn_egg";
  MinecraftItemTypes2["SkullBannerPattern"] = "minecraft:skull_banner_pattern";
  MinecraftItemTypes2["SkullPotterySherd"] = "minecraft:skull_pottery_sherd";
  MinecraftItemTypes2["Slime"] = "minecraft:slime";
  MinecraftItemTypes2["SlimeBall"] = "minecraft:slime_ball";
  MinecraftItemTypes2["SlimeSpawnEgg"] = "minecraft:slime_spawn_egg";
  MinecraftItemTypes2["SmallAmethystBud"] = "minecraft:small_amethyst_bud";
  MinecraftItemTypes2["SmallDripleafBlock"] = "minecraft:small_dripleaf_block";
  MinecraftItemTypes2["SmithingTable"] = "minecraft:smithing_table";
  MinecraftItemTypes2["Smoker"] = "minecraft:smoker";
  MinecraftItemTypes2["SmoothBasalt"] = "minecraft:smooth_basalt";
  MinecraftItemTypes2["SmoothQuartz"] = "minecraft:smooth_quartz";
  MinecraftItemTypes2["SmoothQuartzSlab"] = "minecraft:smooth_quartz_slab";
  MinecraftItemTypes2["SmoothQuartzStairs"] = "minecraft:smooth_quartz_stairs";
  MinecraftItemTypes2["SmoothRedSandstone"] = "minecraft:smooth_red_sandstone";
  MinecraftItemTypes2["SmoothRedSandstoneSlab"] = "minecraft:smooth_red_sandstone_slab";
  MinecraftItemTypes2["SmoothRedSandstoneStairs"] = "minecraft:smooth_red_sandstone_stairs";
  MinecraftItemTypes2["SmoothSandstone"] = "minecraft:smooth_sandstone";
  MinecraftItemTypes2["SmoothSandstoneSlab"] = "minecraft:smooth_sandstone_slab";
  MinecraftItemTypes2["SmoothSandstoneStairs"] = "minecraft:smooth_sandstone_stairs";
  MinecraftItemTypes2["SmoothStone"] = "minecraft:smooth_stone";
  MinecraftItemTypes2["SmoothStoneSlab"] = "minecraft:smooth_stone_slab";
  MinecraftItemTypes2["SnifferEgg"] = "minecraft:sniffer_egg";
  MinecraftItemTypes2["SnifferSpawnEgg"] = "minecraft:sniffer_spawn_egg";
  MinecraftItemTypes2["SnortPotterySherd"] = "minecraft:snort_pottery_sherd";
  MinecraftItemTypes2["SnoutArmorTrimSmithingTemplate"] = "minecraft:snout_armor_trim_smithing_template";
  MinecraftItemTypes2["Snow"] = "minecraft:snow";
  MinecraftItemTypes2["SnowGolemSpawnEgg"] = "minecraft:snow_golem_spawn_egg";
  MinecraftItemTypes2["SnowLayer"] = "minecraft:snow_layer";
  MinecraftItemTypes2["Snowball"] = "minecraft:snowball";
  MinecraftItemTypes2["SoulCampfire"] = "minecraft:soul_campfire";
  MinecraftItemTypes2["SoulLantern"] = "minecraft:soul_lantern";
  MinecraftItemTypes2["SoulSand"] = "minecraft:soul_sand";
  MinecraftItemTypes2["SoulSoil"] = "minecraft:soul_soil";
  MinecraftItemTypes2["SoulTorch"] = "minecraft:soul_torch";
  MinecraftItemTypes2["SpiderEye"] = "minecraft:spider_eye";
  MinecraftItemTypes2["SpiderSpawnEgg"] = "minecraft:spider_spawn_egg";
  MinecraftItemTypes2["SpireArmorTrimSmithingTemplate"] = "minecraft:spire_armor_trim_smithing_template";
  MinecraftItemTypes2["SplashPotion"] = "minecraft:splash_potion";
  MinecraftItemTypes2["Sponge"] = "minecraft:sponge";
  MinecraftItemTypes2["SporeBlossom"] = "minecraft:spore_blossom";
  MinecraftItemTypes2["SpruceBoat"] = "minecraft:spruce_boat";
  MinecraftItemTypes2["SpruceButton"] = "minecraft:spruce_button";
  MinecraftItemTypes2["SpruceChestBoat"] = "minecraft:spruce_chest_boat";
  MinecraftItemTypes2["SpruceDoor"] = "minecraft:spruce_door";
  MinecraftItemTypes2["SpruceFence"] = "minecraft:spruce_fence";
  MinecraftItemTypes2["SpruceFenceGate"] = "minecraft:spruce_fence_gate";
  MinecraftItemTypes2["SpruceHangingSign"] = "minecraft:spruce_hanging_sign";
  MinecraftItemTypes2["SpruceLeaves"] = "minecraft:spruce_leaves";
  MinecraftItemTypes2["SpruceLog"] = "minecraft:spruce_log";
  MinecraftItemTypes2["SprucePlanks"] = "minecraft:spruce_planks";
  MinecraftItemTypes2["SprucePressurePlate"] = "minecraft:spruce_pressure_plate";
  MinecraftItemTypes2["SpruceSapling"] = "minecraft:spruce_sapling";
  MinecraftItemTypes2["SpruceSign"] = "minecraft:spruce_sign";
  MinecraftItemTypes2["SpruceSlab"] = "minecraft:spruce_slab";
  MinecraftItemTypes2["SpruceStairs"] = "minecraft:spruce_stairs";
  MinecraftItemTypes2["SpruceTrapdoor"] = "minecraft:spruce_trapdoor";
  MinecraftItemTypes2["SpruceWood"] = "minecraft:spruce_wood";
  MinecraftItemTypes2["Spyglass"] = "minecraft:spyglass";
  MinecraftItemTypes2["SquidSpawnEgg"] = "minecraft:squid_spawn_egg";
  MinecraftItemTypes2["Stick"] = "minecraft:stick";
  MinecraftItemTypes2["StickyPiston"] = "minecraft:sticky_piston";
  MinecraftItemTypes2["Stone"] = "minecraft:stone";
  MinecraftItemTypes2["StoneAxe"] = "minecraft:stone_axe";
  MinecraftItemTypes2["StoneBrickSlab"] = "minecraft:stone_brick_slab";
  MinecraftItemTypes2["StoneBrickStairs"] = "minecraft:stone_brick_stairs";
  MinecraftItemTypes2["StoneBrickWall"] = "minecraft:stone_brick_wall";
  MinecraftItemTypes2["StoneBricks"] = "minecraft:stone_bricks";
  MinecraftItemTypes2["StoneButton"] = "minecraft:stone_button";
  MinecraftItemTypes2["StoneHoe"] = "minecraft:stone_hoe";
  MinecraftItemTypes2["StonePickaxe"] = "minecraft:stone_pickaxe";
  MinecraftItemTypes2["StonePressurePlate"] = "minecraft:stone_pressure_plate";
  MinecraftItemTypes2["StoneShovel"] = "minecraft:stone_shovel";
  MinecraftItemTypes2["StoneStairs"] = "minecraft:stone_stairs";
  MinecraftItemTypes2["StoneSword"] = "minecraft:stone_sword";
  MinecraftItemTypes2["StonecutterBlock"] = "minecraft:stonecutter_block";
  MinecraftItemTypes2["StraySpawnEgg"] = "minecraft:stray_spawn_egg";
  MinecraftItemTypes2["StriderSpawnEgg"] = "minecraft:strider_spawn_egg";
  MinecraftItemTypes2["String"] = "minecraft:string";
  MinecraftItemTypes2["StrippedAcaciaLog"] = "minecraft:stripped_acacia_log";
  MinecraftItemTypes2["StrippedAcaciaWood"] = "minecraft:stripped_acacia_wood";
  MinecraftItemTypes2["StrippedBambooBlock"] = "minecraft:stripped_bamboo_block";
  MinecraftItemTypes2["StrippedBirchLog"] = "minecraft:stripped_birch_log";
  MinecraftItemTypes2["StrippedBirchWood"] = "minecraft:stripped_birch_wood";
  MinecraftItemTypes2["StrippedCherryLog"] = "minecraft:stripped_cherry_log";
  MinecraftItemTypes2["StrippedCherryWood"] = "minecraft:stripped_cherry_wood";
  MinecraftItemTypes2["StrippedCrimsonHyphae"] = "minecraft:stripped_crimson_hyphae";
  MinecraftItemTypes2["StrippedCrimsonStem"] = "minecraft:stripped_crimson_stem";
  MinecraftItemTypes2["StrippedDarkOakLog"] = "minecraft:stripped_dark_oak_log";
  MinecraftItemTypes2["StrippedDarkOakWood"] = "minecraft:stripped_dark_oak_wood";
  MinecraftItemTypes2["StrippedJungleLog"] = "minecraft:stripped_jungle_log";
  MinecraftItemTypes2["StrippedJungleWood"] = "minecraft:stripped_jungle_wood";
  MinecraftItemTypes2["StrippedMangroveLog"] = "minecraft:stripped_mangrove_log";
  MinecraftItemTypes2["StrippedMangroveWood"] = "minecraft:stripped_mangrove_wood";
  MinecraftItemTypes2["StrippedOakLog"] = "minecraft:stripped_oak_log";
  MinecraftItemTypes2["StrippedOakWood"] = "minecraft:stripped_oak_wood";
  MinecraftItemTypes2["StrippedPaleOakLog"] = "minecraft:stripped_pale_oak_log";
  MinecraftItemTypes2["StrippedPaleOakWood"] = "minecraft:stripped_pale_oak_wood";
  MinecraftItemTypes2["StrippedSpruceLog"] = "minecraft:stripped_spruce_log";
  MinecraftItemTypes2["StrippedSpruceWood"] = "minecraft:stripped_spruce_wood";
  MinecraftItemTypes2["StrippedWarpedHyphae"] = "minecraft:stripped_warped_hyphae";
  MinecraftItemTypes2["StrippedWarpedStem"] = "minecraft:stripped_warped_stem";
  MinecraftItemTypes2["StructureBlock"] = "minecraft:structure_block";
  MinecraftItemTypes2["StructureVoid"] = "minecraft:structure_void";
  MinecraftItemTypes2["Sugar"] = "minecraft:sugar";
  MinecraftItemTypes2["SugarCane"] = "minecraft:sugar_cane";
  MinecraftItemTypes2["Sunflower"] = "minecraft:sunflower";
  MinecraftItemTypes2["SuspiciousGravel"] = "minecraft:suspicious_gravel";
  MinecraftItemTypes2["SuspiciousSand"] = "minecraft:suspicious_sand";
  MinecraftItemTypes2["SuspiciousStew"] = "minecraft:suspicious_stew";
  MinecraftItemTypes2["SweetBerries"] = "minecraft:sweet_berries";
  MinecraftItemTypes2["TadpoleBucket"] = "minecraft:tadpole_bucket";
  MinecraftItemTypes2["TadpoleSpawnEgg"] = "minecraft:tadpole_spawn_egg";
  MinecraftItemTypes2["TallGrass"] = "minecraft:tall_grass";
  MinecraftItemTypes2["Target"] = "minecraft:target";
  MinecraftItemTypes2["TideArmorTrimSmithingTemplate"] = "minecraft:tide_armor_trim_smithing_template";
  MinecraftItemTypes2["TintedGlass"] = "minecraft:tinted_glass";
  MinecraftItemTypes2["Tnt"] = "minecraft:tnt";
  MinecraftItemTypes2["TntMinecart"] = "minecraft:tnt_minecart";
  MinecraftItemTypes2["Torch"] = "minecraft:torch";
  MinecraftItemTypes2["Torchflower"] = "minecraft:torchflower";
  MinecraftItemTypes2["TorchflowerSeeds"] = "minecraft:torchflower_seeds";
  MinecraftItemTypes2["TotemOfUndying"] = "minecraft:totem_of_undying";
  MinecraftItemTypes2["TraderLlamaSpawnEgg"] = "minecraft:trader_llama_spawn_egg";
  MinecraftItemTypes2["Trapdoor"] = "minecraft:trapdoor";
  MinecraftItemTypes2["TrappedChest"] = "minecraft:trapped_chest";
  MinecraftItemTypes2["TrialKey"] = "minecraft:trial_key";
  MinecraftItemTypes2["TrialSpawner"] = "minecraft:trial_spawner";
  MinecraftItemTypes2["Trident"] = "minecraft:trident";
  MinecraftItemTypes2["TripwireHook"] = "minecraft:tripwire_hook";
  MinecraftItemTypes2["TropicalFish"] = "minecraft:tropical_fish";
  MinecraftItemTypes2["TropicalFishBucket"] = "minecraft:tropical_fish_bucket";
  MinecraftItemTypes2["TropicalFishSpawnEgg"] = "minecraft:tropical_fish_spawn_egg";
  MinecraftItemTypes2["TubeCoral"] = "minecraft:tube_coral";
  MinecraftItemTypes2["TubeCoralBlock"] = "minecraft:tube_coral_block";
  MinecraftItemTypes2["TubeCoralFan"] = "minecraft:tube_coral_fan";
  MinecraftItemTypes2["Tuff"] = "minecraft:tuff";
  MinecraftItemTypes2["TuffBrickSlab"] = "minecraft:tuff_brick_slab";
  MinecraftItemTypes2["TuffBrickStairs"] = "minecraft:tuff_brick_stairs";
  MinecraftItemTypes2["TuffBrickWall"] = "minecraft:tuff_brick_wall";
  MinecraftItemTypes2["TuffBricks"] = "minecraft:tuff_bricks";
  MinecraftItemTypes2["TuffSlab"] = "minecraft:tuff_slab";
  MinecraftItemTypes2["TuffStairs"] = "minecraft:tuff_stairs";
  MinecraftItemTypes2["TuffWall"] = "minecraft:tuff_wall";
  MinecraftItemTypes2["TurtleEgg"] = "minecraft:turtle_egg";
  MinecraftItemTypes2["TurtleHelmet"] = "minecraft:turtle_helmet";
  MinecraftItemTypes2["TurtleScute"] = "minecraft:turtle_scute";
  MinecraftItemTypes2["TurtleSpawnEgg"] = "minecraft:turtle_spawn_egg";
  MinecraftItemTypes2["TwistingVines"] = "minecraft:twisting_vines";
  MinecraftItemTypes2["UndyedShulkerBox"] = "minecraft:undyed_shulker_box";
  MinecraftItemTypes2["Vault"] = "minecraft:vault";
  MinecraftItemTypes2["VerdantFroglight"] = "minecraft:verdant_froglight";
  MinecraftItemTypes2["VexArmorTrimSmithingTemplate"] = "minecraft:vex_armor_trim_smithing_template";
  MinecraftItemTypes2["VexSpawnEgg"] = "minecraft:vex_spawn_egg";
  MinecraftItemTypes2["VillagerSpawnEgg"] = "minecraft:villager_spawn_egg";
  MinecraftItemTypes2["VindicatorSpawnEgg"] = "minecraft:vindicator_spawn_egg";
  MinecraftItemTypes2["Vine"] = "minecraft:vine";
  MinecraftItemTypes2["WanderingTraderSpawnEgg"] = "minecraft:wandering_trader_spawn_egg";
  MinecraftItemTypes2["WardArmorTrimSmithingTemplate"] = "minecraft:ward_armor_trim_smithing_template";
  MinecraftItemTypes2["WardenSpawnEgg"] = "minecraft:warden_spawn_egg";
  MinecraftItemTypes2["WarpedButton"] = "minecraft:warped_button";
  MinecraftItemTypes2["WarpedDoor"] = "minecraft:warped_door";
  MinecraftItemTypes2["WarpedFence"] = "minecraft:warped_fence";
  MinecraftItemTypes2["WarpedFenceGate"] = "minecraft:warped_fence_gate";
  MinecraftItemTypes2["WarpedFungus"] = "minecraft:warped_fungus";
  MinecraftItemTypes2["WarpedFungusOnAStick"] = "minecraft:warped_fungus_on_a_stick";
  MinecraftItemTypes2["WarpedHangingSign"] = "minecraft:warped_hanging_sign";
  MinecraftItemTypes2["WarpedHyphae"] = "minecraft:warped_hyphae";
  MinecraftItemTypes2["WarpedNylium"] = "minecraft:warped_nylium";
  MinecraftItemTypes2["WarpedPlanks"] = "minecraft:warped_planks";
  MinecraftItemTypes2["WarpedPressurePlate"] = "minecraft:warped_pressure_plate";
  MinecraftItemTypes2["WarpedRoots"] = "minecraft:warped_roots";
  MinecraftItemTypes2["WarpedSign"] = "minecraft:warped_sign";
  MinecraftItemTypes2["WarpedSlab"] = "minecraft:warped_slab";
  MinecraftItemTypes2["WarpedStairs"] = "minecraft:warped_stairs";
  MinecraftItemTypes2["WarpedStem"] = "minecraft:warped_stem";
  MinecraftItemTypes2["WarpedTrapdoor"] = "minecraft:warped_trapdoor";
  MinecraftItemTypes2["WarpedWartBlock"] = "minecraft:warped_wart_block";
  MinecraftItemTypes2["WaterBucket"] = "minecraft:water_bucket";
  MinecraftItemTypes2["Waterlily"] = "minecraft:waterlily";
  MinecraftItemTypes2["WaxedChiseledCopper"] = "minecraft:waxed_chiseled_copper";
  MinecraftItemTypes2["WaxedCopper"] = "minecraft:waxed_copper";
  MinecraftItemTypes2["WaxedCopperBulb"] = "minecraft:waxed_copper_bulb";
  MinecraftItemTypes2["WaxedCopperDoor"] = "minecraft:waxed_copper_door";
  MinecraftItemTypes2["WaxedCopperGrate"] = "minecraft:waxed_copper_grate";
  MinecraftItemTypes2["WaxedCopperTrapdoor"] = "minecraft:waxed_copper_trapdoor";
  MinecraftItemTypes2["WaxedCutCopper"] = "minecraft:waxed_cut_copper";
  MinecraftItemTypes2["WaxedCutCopperSlab"] = "minecraft:waxed_cut_copper_slab";
  MinecraftItemTypes2["WaxedCutCopperStairs"] = "minecraft:waxed_cut_copper_stairs";
  MinecraftItemTypes2["WaxedExposedChiseledCopper"] = "minecraft:waxed_exposed_chiseled_copper";
  MinecraftItemTypes2["WaxedExposedCopper"] = "minecraft:waxed_exposed_copper";
  MinecraftItemTypes2["WaxedExposedCopperBulb"] = "minecraft:waxed_exposed_copper_bulb";
  MinecraftItemTypes2["WaxedExposedCopperDoor"] = "minecraft:waxed_exposed_copper_door";
  MinecraftItemTypes2["WaxedExposedCopperGrate"] = "minecraft:waxed_exposed_copper_grate";
  MinecraftItemTypes2["WaxedExposedCopperTrapdoor"] = "minecraft:waxed_exposed_copper_trapdoor";
  MinecraftItemTypes2["WaxedExposedCutCopper"] = "minecraft:waxed_exposed_cut_copper";
  MinecraftItemTypes2["WaxedExposedCutCopperSlab"] = "minecraft:waxed_exposed_cut_copper_slab";
  MinecraftItemTypes2["WaxedExposedCutCopperStairs"] = "minecraft:waxed_exposed_cut_copper_stairs";
  MinecraftItemTypes2["WaxedOxidizedChiseledCopper"] = "minecraft:waxed_oxidized_chiseled_copper";
  MinecraftItemTypes2["WaxedOxidizedCopper"] = "minecraft:waxed_oxidized_copper";
  MinecraftItemTypes2["WaxedOxidizedCopperBulb"] = "minecraft:waxed_oxidized_copper_bulb";
  MinecraftItemTypes2["WaxedOxidizedCopperDoor"] = "minecraft:waxed_oxidized_copper_door";
  MinecraftItemTypes2["WaxedOxidizedCopperGrate"] = "minecraft:waxed_oxidized_copper_grate";
  MinecraftItemTypes2["WaxedOxidizedCopperTrapdoor"] = "minecraft:waxed_oxidized_copper_trapdoor";
  MinecraftItemTypes2["WaxedOxidizedCutCopper"] = "minecraft:waxed_oxidized_cut_copper";
  MinecraftItemTypes2["WaxedOxidizedCutCopperSlab"] = "minecraft:waxed_oxidized_cut_copper_slab";
  MinecraftItemTypes2["WaxedOxidizedCutCopperStairs"] = "minecraft:waxed_oxidized_cut_copper_stairs";
  MinecraftItemTypes2["WaxedWeatheredChiseledCopper"] = "minecraft:waxed_weathered_chiseled_copper";
  MinecraftItemTypes2["WaxedWeatheredCopper"] = "minecraft:waxed_weathered_copper";
  MinecraftItemTypes2["WaxedWeatheredCopperBulb"] = "minecraft:waxed_weathered_copper_bulb";
  MinecraftItemTypes2["WaxedWeatheredCopperDoor"] = "minecraft:waxed_weathered_copper_door";
  MinecraftItemTypes2["WaxedWeatheredCopperGrate"] = "minecraft:waxed_weathered_copper_grate";
  MinecraftItemTypes2["WaxedWeatheredCopperTrapdoor"] = "minecraft:waxed_weathered_copper_trapdoor";
  MinecraftItemTypes2["WaxedWeatheredCutCopper"] = "minecraft:waxed_weathered_cut_copper";
  MinecraftItemTypes2["WaxedWeatheredCutCopperSlab"] = "minecraft:waxed_weathered_cut_copper_slab";
  MinecraftItemTypes2["WaxedWeatheredCutCopperStairs"] = "minecraft:waxed_weathered_cut_copper_stairs";
  MinecraftItemTypes2["WayfinderArmorTrimSmithingTemplate"] = "minecraft:wayfinder_armor_trim_smithing_template";
  MinecraftItemTypes2["WeatheredChiseledCopper"] = "minecraft:weathered_chiseled_copper";
  MinecraftItemTypes2["WeatheredCopper"] = "minecraft:weathered_copper";
  MinecraftItemTypes2["WeatheredCopperBulb"] = "minecraft:weathered_copper_bulb";
  MinecraftItemTypes2["WeatheredCopperDoor"] = "minecraft:weathered_copper_door";
  MinecraftItemTypes2["WeatheredCopperGrate"] = "minecraft:weathered_copper_grate";
  MinecraftItemTypes2["WeatheredCopperTrapdoor"] = "minecraft:weathered_copper_trapdoor";
  MinecraftItemTypes2["WeatheredCutCopper"] = "minecraft:weathered_cut_copper";
  MinecraftItemTypes2["WeatheredCutCopperSlab"] = "minecraft:weathered_cut_copper_slab";
  MinecraftItemTypes2["WeatheredCutCopperStairs"] = "minecraft:weathered_cut_copper_stairs";
  MinecraftItemTypes2["Web"] = "minecraft:web";
  MinecraftItemTypes2["WeepingVines"] = "minecraft:weeping_vines";
  MinecraftItemTypes2["WetSponge"] = "minecraft:wet_sponge";
  MinecraftItemTypes2["Wheat"] = "minecraft:wheat";
  MinecraftItemTypes2["WheatSeeds"] = "minecraft:wheat_seeds";
  MinecraftItemTypes2["WhiteBundle"] = "minecraft:white_bundle";
  MinecraftItemTypes2["WhiteCandle"] = "minecraft:white_candle";
  MinecraftItemTypes2["WhiteCarpet"] = "minecraft:white_carpet";
  MinecraftItemTypes2["WhiteConcrete"] = "minecraft:white_concrete";
  MinecraftItemTypes2["WhiteConcretePowder"] = "minecraft:white_concrete_powder";
  MinecraftItemTypes2["WhiteDye"] = "minecraft:white_dye";
  MinecraftItemTypes2["WhiteGlazedTerracotta"] = "minecraft:white_glazed_terracotta";
  MinecraftItemTypes2["WhiteShulkerBox"] = "minecraft:white_shulker_box";
  MinecraftItemTypes2["WhiteStainedGlass"] = "minecraft:white_stained_glass";
  MinecraftItemTypes2["WhiteStainedGlassPane"] = "minecraft:white_stained_glass_pane";
  MinecraftItemTypes2["WhiteTerracotta"] = "minecraft:white_terracotta";
  MinecraftItemTypes2["WhiteTulip"] = "minecraft:white_tulip";
  MinecraftItemTypes2["WhiteWool"] = "minecraft:white_wool";
  MinecraftItemTypes2["WildArmorTrimSmithingTemplate"] = "minecraft:wild_armor_trim_smithing_template";
  MinecraftItemTypes2["WindCharge"] = "minecraft:wind_charge";
  MinecraftItemTypes2["WitchSpawnEgg"] = "minecraft:witch_spawn_egg";
  MinecraftItemTypes2["WitherRose"] = "minecraft:wither_rose";
  MinecraftItemTypes2["WitherSkeletonSkull"] = "minecraft:wither_skeleton_skull";
  MinecraftItemTypes2["WitherSkeletonSpawnEgg"] = "minecraft:wither_skeleton_spawn_egg";
  MinecraftItemTypes2["WitherSpawnEgg"] = "minecraft:wither_spawn_egg";
  MinecraftItemTypes2["WolfArmor"] = "minecraft:wolf_armor";
  MinecraftItemTypes2["WolfSpawnEgg"] = "minecraft:wolf_spawn_egg";
  MinecraftItemTypes2["WoodenAxe"] = "minecraft:wooden_axe";
  MinecraftItemTypes2["WoodenButton"] = "minecraft:wooden_button";
  MinecraftItemTypes2["WoodenDoor"] = "minecraft:wooden_door";
  MinecraftItemTypes2["WoodenHoe"] = "minecraft:wooden_hoe";
  MinecraftItemTypes2["WoodenPickaxe"] = "minecraft:wooden_pickaxe";
  MinecraftItemTypes2["WoodenPressurePlate"] = "minecraft:wooden_pressure_plate";
  MinecraftItemTypes2["WoodenShovel"] = "minecraft:wooden_shovel";
  MinecraftItemTypes2["WoodenSword"] = "minecraft:wooden_sword";
  MinecraftItemTypes2["WritableBook"] = "minecraft:writable_book";
  MinecraftItemTypes2["YellowBundle"] = "minecraft:yellow_bundle";
  MinecraftItemTypes2["YellowCandle"] = "minecraft:yellow_candle";
  MinecraftItemTypes2["YellowCarpet"] = "minecraft:yellow_carpet";
  MinecraftItemTypes2["YellowConcrete"] = "minecraft:yellow_concrete";
  MinecraftItemTypes2["YellowConcretePowder"] = "minecraft:yellow_concrete_powder";
  MinecraftItemTypes2["YellowDye"] = "minecraft:yellow_dye";
  MinecraftItemTypes2["YellowGlazedTerracotta"] = "minecraft:yellow_glazed_terracotta";
  MinecraftItemTypes2["YellowShulkerBox"] = "minecraft:yellow_shulker_box";
  MinecraftItemTypes2["YellowStainedGlass"] = "minecraft:yellow_stained_glass";
  MinecraftItemTypes2["YellowStainedGlassPane"] = "minecraft:yellow_stained_glass_pane";
  MinecraftItemTypes2["YellowTerracotta"] = "minecraft:yellow_terracotta";
  MinecraftItemTypes2["YellowWool"] = "minecraft:yellow_wool";
  MinecraftItemTypes2["ZoglinSpawnEgg"] = "minecraft:zoglin_spawn_egg";
  MinecraftItemTypes2["ZombieHead"] = "minecraft:zombie_head";
  MinecraftItemTypes2["ZombieHorseSpawnEgg"] = "minecraft:zombie_horse_spawn_egg";
  MinecraftItemTypes2["ZombiePigmanSpawnEgg"] = "minecraft:zombie_pigman_spawn_egg";
  MinecraftItemTypes2["ZombieSpawnEgg"] = "minecraft:zombie_spawn_egg";
  MinecraftItemTypes2["ZombieVillagerSpawnEgg"] = "minecraft:zombie_villager_spawn_egg";
  return MinecraftItemTypes2;
})(MinecraftItemTypes || {});
var MinecraftPotionEffectTypes = ((MinecraftPotionEffectTypes2) => {
  MinecraftPotionEffectTypes2["FireResistance"] = "FireResistance";
  MinecraftPotionEffectTypes2["Harming"] = "Harming";
  MinecraftPotionEffectTypes2["Healing"] = "Healing";
  MinecraftPotionEffectTypes2["Infested"] = "Infested";
  MinecraftPotionEffectTypes2["Invisibility"] = "Invisibility";
  MinecraftPotionEffectTypes2["Leaping"] = "Leaping";
  MinecraftPotionEffectTypes2["NightVision"] = "NightVision";
  MinecraftPotionEffectTypes2["None"] = "None";
  MinecraftPotionEffectTypes2["Oozing"] = "Oozing";
  MinecraftPotionEffectTypes2["Poison"] = "Poison";
  MinecraftPotionEffectTypes2["SlowFalling"] = "SlowFalling";
  MinecraftPotionEffectTypes2["Slowing"] = "Slowing";
  MinecraftPotionEffectTypes2["Strength"] = "Strength";
  MinecraftPotionEffectTypes2["Swiftness"] = "Swiftness";
  MinecraftPotionEffectTypes2["TurtleMaster"] = "TurtleMaster";
  MinecraftPotionEffectTypes2["WaterBreath"] = "WaterBreath";
  MinecraftPotionEffectTypes2["Weakness"] = "Weakness";
  MinecraftPotionEffectTypes2["Weaving"] = "Weaving";
  MinecraftPotionEffectTypes2["WindCharged"] = "WindCharged";
  MinecraftPotionEffectTypes2["Wither"] = "Wither";
  return MinecraftPotionEffectTypes2;
})(MinecraftPotionEffectTypes || {});
var MinecraftPotionLiquidTypes = ((MinecraftPotionLiquidTypes2) => {
  MinecraftPotionLiquidTypes2["Lingering"] = "Lingering";
  MinecraftPotionLiquidTypes2["Regular"] = "Regular";
  MinecraftPotionLiquidTypes2["Splash"] = "Splash";
  return MinecraftPotionLiquidTypes2;
})(MinecraftPotionLiquidTypes || {});
var MinecraftPotionModifierTypes = ((MinecraftPotionModifierTypes2) => {
  MinecraftPotionModifierTypes2["Long"] = "Long";
  MinecraftPotionModifierTypes2["Normal"] = "Normal";
  MinecraftPotionModifierTypes2["Strong"] = "Strong";
  return MinecraftPotionModifierTypes2;
})(MinecraftPotionModifierTypes || {});

// scripts/common/ShooterEvent.ts
import { EntityComponentTypes as EntityComponentTypes3 } from "@minecraft/server";
function shooting(player, throwItem, ranNum, seepd, event) {
  let bulet;
  const distance = getLookLocationDistancePitch(player.getRotation(), 1, 0);
  if (event != void 0) {
    bulet = player.dimension.spawnEntity(throwItem + "<" + event + ">", getDistanceLocation(
      {
        x: player.location.x,
        y: player.location.y + 0.5,
        z: player.location.z
      },
      distance
    ));
  } else {
    bulet = player.dimension.spawnEntity(throwItem, getDistanceLocation(
      {
        x: player.location.x,
        y: player.location.y + 0.5,
        z: player.location.z
      },
      distance
    ));
  }
  let projectile = bulet.getComponent(EntityComponentTypes3.Projectile);
  projectile.owner = player;
  projectile.shoot(
    {
      x: distance.x * seepd,
      y: distance.y * seepd,
      z: distance.z * seepd
    },
    {
      uncertainty: ranNum
    }
  );
  return bulet;
}

// scripts/kokyu/kata/MizuNoKata.ts
var MizuNoKata = class extends KataComonClass {
  constructor() {
    super(...arguments);
    this.nagiIntervalId = 0;
  }
  /**
   * 壱ノ型 水面切り
   */
  ichiNoKata(player, itemStack) {
    player.setProperty("kurokumaft:kokyu_use", false);
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu1.value" }] });
    const distance = getLookLocationDistancePitch(player.getRotation(), 1, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
    this.kokyuApplyDamage(player, filter, 4, 2, itemStack);
    system.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 6);
  }
  /**
   * 弐ノ型 水車
   */
  niNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu2.value" }] });
    const fdistance = getLookLocationDistance(player.getRotation().y, 2.5, 0, 0);
    const ffilter = addRegimentalFilter(0, getDistanceLocation(player.location, fdistance), 2.5, player.id);
    this.kokyuApplyDamage(player, ffilter, 3, 1, itemStack);
    const bdistance = getLookLocationDistance(player.getRotation().y, -2.5, 0, 0);
    const bfilter = addRegimentalFilter(0, getDistanceLocation(player.location, bdistance), 2.5, player.id);
    this.kokyuApplyDamage(player, bfilter, 3, 1, itemStack);
    const udistance = getLookLocationDistance(player.getRotation().y, 0, 0, 2.5);
    const ufilter = addRegimentalFilter(0, getDistanceLocation(player.location, udistance), 2.5, player.id);
    this.kokyuApplyDamage(player, ufilter, 3, 1, itemStack);
    const ddistance = getLookLocationDistance(player.getRotation().y, 0, 0, -2.5);
    const dfilter = addRegimentalFilter(0, getDistanceLocation(player.location, ddistance), 2.5, player.id);
    this.kokyuApplyDamage(player, dfilter, 3, 1, itemStack);
    system.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, TicksPerSecond);
  }
  /**
   * 参ノ型 流流舞い
   */
  sanNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu3.value" }] });
    const num = system.runInterval(() => {
      const point = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
      player.applyKnockback(point.x, point.z, 2, 0);
      const distance = getLookLocationDistancePitch(player.getRotation(), 1, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 4, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
    }, 6);
    system.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system.clearRun(num);
    }, 30);
  }
  /**
   * 肆ノ型 打ち潮
   */
  shiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu4.value" }] });
    let side = -2;
    const num = system.runInterval(() => {
      const distance = getLookLocationDistancePitch(player.getRotation(), 1.5, side);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3.5, player.id);
      player.dimension.spawnParticle("kurokumaft:mizu2_particle", getDistanceLocation(player.location, distance));
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
      side = -side;
    }, 8);
    system.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      system.clearRun(num);
    }, 30);
  }
  /**
   * 伍ノ型 干天の慈雨
   */
  goNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu5.value" }] });
    const goKataLists = weightChoice([
      { item: "small", weight: 55 },
      { item: "lage", weight: 40 },
      { item: "kill", weight: 5 }
    ]);
    player.addTag(player.id);
    const distance = getLookLocationDistancePitch(player.getRotation(), 1.5, 0);
    const filter = addRegimentalFilter(1, getDistanceLocation(player.location, distance), 3, player.id);
    const targets = player.dimension.getEntities(filter);
    targets.forEach((en) => {
      const choice = goKataLists.pick();
      switch (choice) {
        case "small":
          if (en instanceof Player5) {
            if (this.gardCheck(en)) {
              en.applyDamage(2, {
                cause: EntityDamageCause2.entityAttack,
                damagingEntity: player
              });
            }
          } else {
            en.applyDamage(3, {
              cause: EntityDamageCause2.entityAttack,
              damagingEntity: player
            });
          }
          break;
        case "lage":
          if (en instanceof Player5) {
            if (this.gardCheck(en)) {
              en.applyDamage(3, {
                cause: EntityDamageCause2.entityAttack,
                damagingEntity: player
              });
            }
          } else {
            en.applyDamage(8, {
              cause: EntityDamageCause2.entityAttack,
              damagingEntity: player
            });
          }
          break;
        case "kill":
          en.kill();
          break;
      }
    });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    player.dimension.spawnParticle("kurokumaft:mizu5_particle", player.location, molang);
    player.dimension.spawnParticle("kurokumaft:mizu5_particle", player.location, molang);
    player.removeTag(player.id);
    system.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
    }, 4);
  }
  /**
   * 陸ノ型 ねじれ渦
   */
  rokuNoKata(player, itemStack) {
    player.setProperty("kurokumaft:kokyu_use", false);
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu6.value" }] });
    if (player.isInWater) {
      const filter = addRegimentalFilter(0, player.location, 5, player.id);
      this.kokyuApplyDamage(player, filter, 10, 4, itemStack);
    } else {
      const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
      this.kokyuApplyDamage(player, filter, 5, 2, itemStack);
    }
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 1);
    player.applyKnockback(distance.x, distance.z, 0, 1);
    const num = system.runInterval(() => {
      if (player.isInWater) {
        const filter = addRegimentalFilter(0, player.location, 5, player.id);
        this.kokyuApplyDamage(player, filter, 10, 4, itemStack);
      } else {
        const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
        this.kokyuApplyDamage(player, filter, 5, 2, itemStack);
      }
    }, 4);
    system.runTimeout(() => {
      player.addEffect(MinecraftEffectTypes.SlowFalling, 2 * TicksPerSecond, {
        amplifier: 1,
        showParticles: false
      });
    }, 20);
    system.runTimeout(() => {
      player.removeEffect(MinecraftEffectTypes.SlowFalling);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system.clearRun(num);
    }, 25);
  }
  /**
   * 漆ノ型 雫波紋突き
   */
  shitiNoKata(player, itemStack) {
    player.setProperty("kurokumaft:kokyu_use", false);
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu7.value" }] });
    const distance = getLookLocationDistancePitch(player.getRotation(), 3.5, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 2.5, player.id);
    this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    player.dimension.spawnParticle("kurokumaft:mizu7_1_particle", getDistanceLocation(player.location, distance), molang);
    player.dimension.spawnParticle("kurokumaft:mizu7_2_particle", getDistanceLocation(player.location, distance), molang);
    system.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 5);
  }
  /**
   * 捌ノ型 滝壺
   */
  hachiNoKata(player, itemStack) {
    player.setProperty("kurokumaft:kokyu_use", false);
    if (!player.getDynamicProperty("kurokumaft:mizuhati")) {
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu8.value" }] });
      player.setDynamicProperty("kurokumaft:mizuhati", true);
      const oLocate = player.location;
      const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
      player.applyKnockback(distance.x, distance.z, 0, 1.5);
      let parnum = 0;
      system.runTimeout(() => {
        player.setProperty("kurokumaft:kokyu_particle", false);
        const filter = addRegimentalFilter(0, oLocate, 6, player.id);
        const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        parnum = system.runInterval(() => {
          player.dimension.spawnParticle("kurokumaft:mizu8_particle", { x: oLocate.x, y: oLocate.y + 0.5, z: oLocate.z }, molang);
          player.dimension.spawnParticle("kurokumaft:mizu_pillar_particle", { x: player.location.x + 1, y: player.location.y - 0.5, z: player.location.z + 1 }, molang);
          player.dimension.spawnParticle("kurokumaft:mizu_pillar_particle", { x: player.location.x + 1, y: player.location.y - 0.5, z: player.location.z - 1 }, molang);
          player.dimension.spawnParticle("kurokumaft:mizu_pillar_particle", { x: player.location.x - 1, y: player.location.y - 0.5, z: player.location.z + 1 }, molang);
          player.dimension.spawnParticle("kurokumaft:mizu_pillar_particle", { x: player.location.x - 1, y: player.location.y - 0.5, z: player.location.z - 1 }, molang);
          this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
        }, 1);
      }, 25);
      system.runTimeout(() => {
        player.addEffect(MinecraftEffectTypes.SlowFalling, 2 * TicksPerSecond, {
          amplifier: 1,
          showParticles: false
        });
      }, 30);
      system.runTimeout(() => {
        player.removeEffect(MinecraftEffectTypes.SlowFalling);
        player.setDynamicProperty("kurokumaft:mizuhati", false);
        system.clearRun(parnum);
      }, 40);
    }
  }
  /**
   * 玖ノ型 水流飛沫・乱
   */
  kuNoKata(player, itemStack) {
    if (player.getDynamicProperty("kurokumaft:chage_type") == void 0) {
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu9.value" }] });
      player.setDynamicProperty("kurokumaft:chage_type", true);
      player.addEffect(MinecraftEffectTypes.Speed, 10 * TicksPerSecond, {
        amplifier: 5,
        showParticles: false
      });
      player.addEffect(MinecraftEffectTypes.JumpBoost, 10 * TicksPerSecond, {
        amplifier: 3,
        showParticles: false
      });
      system.runTimeout(() => {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_particle", false);
        player.setDynamicProperty("kurokumaft:chage_type", void 0);
      }, 10 * TicksPerSecond);
    }
  }
  /**
   * 拾ノ型 生生流転　発射
   */
  zyuNoKataShot(player, itemStack) {
    const chage = player.getProperty("kurokumaft:kokyu_chage");
    player.setProperty("kurokumaft:kokyu_use", false);
    if (chage == 4) {
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu10.value" }] });
      player.setProperty("kurokumaft:kokyu_chage", 10);
      system.runTimeout(() => {
        const dragon = shooting(player, "kurokumaft:mizu_dragon", 0, 3, void 0);
        player.setProperty("kurokumaft:kokyu_chage", 0);
        player.setProperty("kurokumaft:kokyu_particle", false);
        system.runTimeout(() => {
          if (dragon.isValid()) {
            dragon.remove();
          }
        }, 2 * TicksPerSecond);
      }, 10);
    }
  }
  /**
   * 拾ノ型 生生流転
   */
  zyuNoKata(player, itemStack) {
    let chage = player.getProperty("kurokumaft:kokyu_chage");
    if (chage < 4) {
      player.setProperty("kurokumaft:kokyu_particle", true);
      if (chage + 1 < 4) {
        system.runTimeout(() => {
          chage = player.getProperty("kurokumaft:kokyu_chage");
          if (chage < 4) {
            player.setProperty("kurokumaft:kokyu_particle", false);
          }
        }, 14);
      }
      player.setProperty("kurokumaft:kokyu_chage", chage + 1);
    }
    const filter = addRegimentalFilter(0, player.location, 4.5, player.id);
    this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
  }
  /**
   * 拾壱ノ型 凪
   */
  zyuichiNoKata(player, itemStack) {
    if (player.getDynamicProperty("kurokumaft:chage_type") == void 0) {
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu11.value" }] });
      player.setDynamicProperty("kurokumaft:chage_type", true);
      this.nagiIntervalId = system.runInterval(() => {
        player.setProperty("kurokumaft:kokyu_attack", false);
        this.checkNagiReflection(player, itemStack);
      }, 2);
      const parnum = system.runInterval(() => {
        const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        player.dimension.spawnParticle("kurokumaft:mizu11_particle", player.location, molang);
      }, TicksPerSecond);
      system.runTimeout(() => {
        player.setProperty("kurokumaft:kokyu_attack", false);
        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_particle", false);
        player.setDynamicProperty("kurokumaft:chage_type", void 0);
        system.clearRun(this.nagiIntervalId);
        system.clearRun(parnum);
      }, 10 * TicksPerSecond);
    }
  }
  checkNagiReflection(player, itemStack) {
    if (player.isValid()) {
      if (this.projectRefrect(player, player.location)) {
        player.setProperty("kurokumaft:kokyu_attack", true);
      }
      player.addTag(player.id);
      const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
      const filter = addRegimentalFilter(0, player.location, 4.5, player.id);
      const targets = player.dimension.getEntities(filter);
      targets.forEach((en) => {
        const view = en.getViewDirection();
        en.applyKnockback(-Math.round(view.x) * 3, -Math.round(view.z) * 3, 3, 0);
        if (en instanceof Player5) {
          if (this.gardCheck(en)) {
            en.applyDamage(2 * kaikyuNum, {
              cause: EntityDamageCause2.entityAttack,
              damagingEntity: player
            });
          }
        } else {
          en.applyDamage(6 * kaikyuNum, {
            cause: EntityDamageCause2.entityAttack,
            damagingEntity: player
          });
        }
        player.setProperty("kurokumaft:kokyu_attack", true);
        ItemDurabilityDamage(player, itemStack, EquipmentSlot3.Mainhand);
      });
      player.removeTag(player.id);
    } else {
      system.clearRun(this.nagiIntervalId);
    }
  }
};

// scripts/kokyu/character/KokyuGiyuComponent.ts
var KokyuGiyuComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[5];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:mizu_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const mizu = new MizuNoKata();
    switch (kata) {
      case 10:
        mizu.zyuNoKata(player, itemStack);
        break;
    }
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const mizu = new MizuNoKata();
    switch (kata) {
      case 2:
        mizu.niNoKata(player, itemStack);
        break;
      case 3:
        mizu.sanNoKata(player, itemStack);
        break;
      case 4:
        mizu.shiNoKata(player, itemStack);
        break;
      case 9:
        mizu.kuNoKata(player, itemStack);
        break;
      case 10:
        mizu.zyuNoKataShot(player, itemStack);
        break;
      case 11:
        mizu.zyuichiNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const mizu = new MizuNoKata();
    switch (kata) {
      case 1:
        mizu.ichiNoKata(player, itemStack);
        break;
      case 5:
        mizu.goNoKata(player, itemStack);
        break;
      case 6:
        mizu.rokuNoKata(player, itemStack);
        break;
      case 7:
        mizu.shitiNoKata(player, itemStack);
        break;
      case 8:
        mizu.hachiNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/kata/HanaNoKata.ts
import { MolangVariableMap as MolangVariableMap2, system as system2, TicksPerSecond as TicksPerSecond2 } from "@minecraft/server";
var HanaNoKata = class extends KataComonClass {
  /**
   * 弐ノ型 御影梅
   */
  niNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hana_kokyu2.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap2();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system2.runInterval(() => {
      const distance = getLookLocationDistance(player.getRotation().y, 2, 0, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 2.5, player.id);
      player.dimension.spawnParticle("kurokumaft:hana_ni_particle", getDistanceLocation(player.location, distance), molang);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
    }, 4);
    system2.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      system2.clearRun(num);
    }, 20);
  }
  /**
   * 肆ノ型 紅花衣
   */
  shiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hana_kokyu4.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 2, 0, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
    this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap2();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    player.dimension.spawnParticle("kurokumaft:hana_shi_particle", getDistanceLocation(player.location, distance), molang);
    system2.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
    }, 20);
  }
  /**
   * 伍ノ型 徒の芍薬
   */
  goNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hana_kokyu5.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap2();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    let count = 1;
    const num = system2.runInterval(() => {
      const distance = getLookLocationDistance(player.getRotation().y, 2, 0, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 2.5, player.id);
      this.kokyuApplyDamage(player, filter, 4, 2, itemStack);
      if (count <= 9) {
        player.dimension.spawnParticle("kurokumaft:hana_go_" + count + "_particle", getDistanceLocation(player.location, distance), molang);
        count++;
      }
    }, 2);
    system2.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      system2.clearRun(num);
    }, 20);
  }
  /**
   * 陸ノ型 渦桃
   */
  rokuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hana_kokyu6.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap2();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const distance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 1);
    player.applyKnockback(distance.x, distance.z, 5, 0.6);
    const num = system2.runInterval(() => {
      const distance2 = getLookLocationDistance(player.getRotation().y, 1.5, 0, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance2), 3, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
      player.dimension.spawnParticle("kurokumaft:hana_roku_particle", getDistanceLocation(player.location, distance2), molang);
    }, 5);
    system2.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      system2.clearRun(num);
    }, 10);
  }
  /**
   * 終ノ型 彼岸朱眼
   */
  shitiNoKata(player, itemStack) {
    player.setProperty("kurokumaft:kokyu_use", false);
    player.setProperty("kurokumaft:kokyu_particle", false);
    if (player.getDynamicProperty("kurokumaft:chage_type") == void 0) {
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hana_kokyu7.value" }] });
      player.setDynamicProperty("kurokumaft:chage_type", true);
      player.addEffect(MinecraftEffectTypes.Speed, 200 * TicksPerSecond2, {
        amplifier: 5,
        showParticles: false
      });
      player.addEffect(MinecraftEffectTypes.JumpBoost, 200 * TicksPerSecond2, {
        amplifier: 3,
        showParticles: false
      });
      player.addEffect(MinecraftEffectTypes.NightVision, 200 * TicksPerSecond2, {
        amplifier: 10,
        showParticles: false
      });
      system2.runTimeout(() => {
        player.setDynamicProperty("kurokumaft:chage_type", void 0);
        player.removeEffect(MinecraftEffectTypes.Speed);
        player.removeEffect(MinecraftEffectTypes.JumpBoost);
        player.removeEffect(MinecraftEffectTypes.NightVision);
        let higanLists = weightChoice([
          { item: "minor", weight: 50 },
          { item: "serious", weight: 35 },
          { item: "blindness", weight: 15 }
        ]);
        let choice = higanLists.pick();
        switch (choice) {
          case "blindness":
            player.addEffect(MinecraftEffectTypes.Blindness, 600 * TicksPerSecond2, {
              amplifier: 3,
              showParticles: false
            });
          case "serious":
            player.addEffect(MinecraftEffectTypes.Weakness, 10 * TicksPerSecond2, {
              amplifier: 1,
              showParticles: false
            });
          case "minor":
            player.addEffect(MinecraftEffectTypes.Slowness, 10 * TicksPerSecond2, {
              amplifier: 1,
              showParticles: false
            });
            break;
        }
      }, 180 * TicksPerSecond2);
    }
  }
};

// scripts/kokyu/character/KokyuKanawoComponent.ts
var KokyuKanawoComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[4];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:hana_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const hana = new HanaNoKata();
    switch (kata) {
      case 2:
        hana.niNoKata(player, itemStack);
        break;
      case 4:
        hana.shiNoKata(player, itemStack);
        break;
      case 5:
        hana.goNoKata(player, itemStack);
        break;
      case 6:
        hana.rokuNoKata(player, itemStack);
        break;
      case 7:
        hana.shitiNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/kata/KoiNoKata.ts
import { MolangVariableMap as MolangVariableMap3, system as system3, TicksPerSecond as TicksPerSecond3 } from "@minecraft/server";
var KoiNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 初恋のわななき
   */
  ichiNoKata(player, itemStack) {
    player.setProperty("kurokumaft:kokyu_use", false);
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:koi_kokyu1.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(distance.x, distance.z, 30, 0);
    const num = system3.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 5, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
    }, 2);
    system3.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      system3.clearRun(num);
    }, 10);
  }
  /**
   * 弐ノ型 懊悩巡る恋
   */
  niNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:koi_kokyu2.value" }] });
    const num = system3.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 6, player.id);
      this.kokyuApplyDamage(player, filter, 4, 2, itemStack);
    }, 4);
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(distance.x, distance.z, 10, 1);
    system3.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system3.clearRun(num);
      player.addEffect(MinecraftEffectTypes.SlowFalling, 2 * TicksPerSecond3, {
        amplifier: 1,
        showParticles: false
      });
    }, 20);
  }
  /**
   * 参ノ型 恋猫しぐれ
   */
  sanNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:koi_kokyu3.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 2, -2, 0);
    player.applyKnockback(distance.x, distance.z, 10, 0.4);
    player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", player.location);
    player.setProperty("kurokumaft:kokyu_attack", true);
    let side = 5;
    const num = system3.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 4, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      const distance2 = getLookLocationDistance(player.getRotation().y, 2, side, 0);
      player.applyKnockback(distance2.x, distance2.z, 10, 0.4);
      player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", player.location);
      side = -side;
    }, 10);
    system3.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_attack", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system3.clearRun(num);
    }, 60);
  }
  /**
   * 伍ノ型 揺らめく恋情・乱れ爪
   */
  goNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:koi_kokyu5.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(distance.x, distance.z, 0, 1);
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap3();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    system3.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      const distance2 = getLookLocationDistance(player.getRotation().y, 0, 0, -2);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance2), 6, player.id);
      const parnum = system3.runInterval(() => {
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
      }, 1);
      player.addEffect(MinecraftEffectTypes.SlowFalling, 1 * TicksPerSecond3, {
        amplifier: 1,
        showParticles: false
      });
      system3.runTimeout(() => {
        player.setProperty("kurokumaft:kokyu_particle", false);
        system3.clearRun(parnum);
        player.removeEffect(MinecraftEffectTypes.SlowFalling);
        system3.runTimeout(() => {
          player.addEffect(MinecraftEffectTypes.SlowFalling, 1 * TicksPerSecond3, {
            amplifier: 1,
            showParticles: false
          });
        }, 5);
      }, 10);
    }, 10);
  }
  /**
   * 陸ノ型 猫足恋風
   */
  rokuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:koi_kokyu6.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(distance.x, distance.z, 5, 1);
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap3();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    system3.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      const distance2 = getLookLocationDistance(player.getRotation().y, 0, 0, -1);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance2), 6, player.id);
      const parnum = system3.runInterval(() => {
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
      }, 1);
      system3.runTimeout(() => {
        player.setProperty("kurokumaft:kokyu_particle", false);
        system3.clearRun(parnum);
        player.addEffect(MinecraftEffectTypes.SlowFalling, 1 * TicksPerSecond3, {
          amplifier: 1,
          showParticles: false
        });
      }, 10);
    }, 10);
  }
};

// scripts/kokyu/character/KokyuMituriComponent.ts
var KokyuMituriComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[13];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:koi_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const koi = new KoiNoKata();
    switch (kata) {
      case 2:
        koi.niNoKata(player, itemStack);
        break;
      case 3:
        koi.sanNoKata(player, itemStack);
        break;
      case 5:
        koi.goNoKata(player, itemStack);
        break;
      case 6:
        koi.rokuNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const koi = new KoiNoKata();
    switch (kata) {
      case 1:
        koi.ichiNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/kata/HonoNoKata.ts
import { EquipmentSlot as EquipmentSlot4, system as system4 } from "@minecraft/server";
var HonoNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 不知火
   */
  ichiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kokyu1.value" }] });
    player.setProperty("kurokumaft:kokyu_use", false);
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(distance.x, distance.z, 20, 0);
    const num = system4.runInterval(() => {
      let filter = addRegimentalFilter(0, player.location, 3.5, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    }, 1);
    system4.runTimeout(() => {
      player.setDynamicProperty("kurokumaft:chage_type", void 0);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system4.clearRun(num);
    }, 12);
  }
  /**
   * 弐ノ型 昇り炎天
   */
  niNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kokyu2.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
    this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    system4.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 10);
  }
  /**
   * 参ノ型 気炎万象
   */
  sanNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kokyu3.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
    this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    system4.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 10);
  }
  /**
   * 肆ノ型 盛炎のうねり
   */
  shiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kokyu4.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 3, 0, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 4, player.id);
    this.kokyuApplyDamage(player, filter, 5, 2, itemStack);
    system4.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 25);
  }
  /**
   * 伍ノ型 炎虎
   */
  goNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kokyu5.value" }] });
    const dragon = shooting(player, "kurokumaft:hono_tiger", 0, 3, void 0);
    if (itemStack != void 0) {
      ItemDurabilityDamage(player, itemStack, EquipmentSlot4.Mainhand);
    }
    system4.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 10);
    system4.runTimeout(() => {
      if (dragon.isValid()) {
        dragon.remove();
      }
    }, 20);
  }
  /**
   * 玖ノ型 煉獄
   */
  kuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kokyu9.value" }] });
    player.setProperty("kurokumaft:kokyu_use", false);
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(distance.x, distance.z, 50, 0);
    const num = system4.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
      this.kokyuApplyDamage(player, filter, 10, 3, itemStack);
    }, 1);
    system4.runTimeout(() => {
      player.setDynamicProperty("kurokumaft:chage_type", void 0);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system4.clearRun(num);
    }, 12);
  }
};

// scripts/kokyu/character/KokyuKyouzyuroComponent.ts
var KokyuKyouzyuroComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[7];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:hono_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const hono = new HonoNoKata();
    switch (kata) {
      case 2:
        hono.niNoKata(player, itemStack);
        break;
      case 3:
        hono.sanNoKata(player, itemStack);
        break;
      case 4:
        hono.shiNoKata(player, itemStack);
        break;
      case 5:
        hono.goNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const hono = new HonoNoKata();
    switch (kata) {
      case 1:
        hono.ichiNoKata(player, itemStack);
        break;
      case 9:
        hono.kuNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/kata/KazeNoKata.ts
import { MolangVariableMap as MolangVariableMap4, system as system5, TicksPerSecond as TicksPerSecond4 } from "@minecraft/server";
var KazeNoKata = class extends KataComonClass {
  constructor() {
    super(...arguments);
    this.sazinIntervalId = 0;
  }
  /**
   * 壱ノ型 塵旋風・削ぎ
   */
  ichiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu1.value" }] });
    player.setProperty("kurokumaft:kokyu_use", false);
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(distance.x, distance.z, 30, 0);
    const num = system5.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
    }, 1);
    system5.runTimeout(() => {
      player.setDynamicProperty("kurokumaft:chage_type", void 0);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system5.clearRun(num);
    }, 12);
  }
  /**
   * 弐ノ型 爪々・科戸風
   */
  niNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu2.value" }] });
    const distance = getLookLocationDistancePitch(player.getRotation(), 2.5, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
    this.kokyuApplyDamage(player, filter, 4, 1, itemStack);
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap4();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    player.dimension.spawnParticle("kurokumaft:kaze2_particle", getDistanceLocation(player.location, distance), molang);
    system5.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 10);
  }
  /**
   * 参ノ型 晴嵐風樹
   */
  sanNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu3.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap4();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system5.runInterval(() => {
      const distance = getLookLocationDistancePitch(player.getRotation(), 1.5, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
      player.dimension.spawnParticle("kurokumaft:kaze3_particle", getDistanceLocation(player.location, distance), molang);
    }, 2);
    system5.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system5.clearRun(num);
    }, 30);
  }
  /**
   * 肆ノ型 昇上砂塵嵐
   */
  shiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu4.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap4();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system5.runInterval(() => {
      const distance = getLookLocationDistance(player.getRotation().y, 0, 0, 4);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 5, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      player.dimension.spawnParticle("kurokumaft:kaze4_particle", player.location, molang);
      this.checkSazinReflection(player);
    }, 2);
    system5.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      system5.clearRun(this.sazinIntervalId);
      system5.clearRun(num);
    }, 40);
  }
  checkSazinReflection(player) {
    if (player.isValid()) {
      this.projectRefrect(player, player.location);
      player.addTag(player.id);
      const filter = addRegimentalFilter(0, player.location, 5, player.id);
      const targets = player.dimension.getEntities(filter);
      targets.forEach((en) => {
        const view = en.getViewDirection();
        en.applyKnockback(-Math.round(player.location.x - view.x), -Math.round(player.location.z - view.z), 3, 1);
      });
      player.removeTag(player.id);
    } else {
      system5.clearRun(this.sazinIntervalId);
    }
  }
  /**
   * 伍ノ型 木枯らし颪
   */
  goNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu5.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 0, 0, 1);
    player.applyKnockback(distance.x, distance.z, 0, 1);
    const num = system5.runInterval(() => {
      const distance2 = getLookLocationDistance(player.getRotation().y, 2.5, 0, -1.5);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance2), 5, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
    }, 2);
    system5.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      system5.clearRun(num);
    }, 30);
  }
  /**
   * 陸ノ型 黒風烟嵐
   */
  rokuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu6.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
    this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    system5.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 15);
  }
  /**
   * 漆ノ型 勁風・天狗風
   */
  shitiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu7.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap4();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    for (let i = 0; i <= 6; i++) {
      const side = getRandomInRange(-4, 4);
      const around = getRandomInRange(-4, 4);
      const distance = getLookLocationDistance(player.getRotation().y, around, side, 0);
      player.dimension.spawnParticle("kurokumaft:kaze7_particle", getDistanceLocation(player.location, distance), molang);
    }
    const num = system5.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 4.5, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    }, 4);
    system5.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system5.clearRun(num);
    }, 20);
  }
  /**
   * 捌ノ型 初烈風斬り
   */
  hachiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu8.value" }] });
    const num = system5.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 4, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      const distance = getLookLocationDistance(player.getRotation().y, 2, 0, 0);
      player.applyKnockback(distance.x, distance.z, 10, 0);
    }, 4);
    system5.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system5.clearRun(num);
    }, 40);
  }
  /**
   * 玖ノ型 韋駄天台風
   */
  kuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu9.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 0, 0, 1);
    player.applyKnockback(distance.x, distance.z, 0, 1);
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap4();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system5.runInterval(() => {
      const distance2 = getLookLocationDistance(player.getRotation().y, 3, 0, -1);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance2), 5, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
      player.dimension.spawnParticle("kurokumaft:kaze3_particle", getDistanceLocation(player.location, distance2), molang);
    }, 2);
    player.addEffect(MinecraftEffectTypes.SlowFalling, 2 * TicksPerSecond4, {
      amplifier: 1,
      showParticles: false
    });
    system5.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system5.clearRun(num);
    }, 40);
  }
};

// scripts/kokyu/character/KokyuSanemiComponent.ts
var KokyuSanemiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[8];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        let index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:kaze_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kaze = new KazeNoKata();
    switch (kata) {
      case 2:
        kaze.niNoKata(player, itemStack);
        break;
      case 3:
        kaze.sanNoKata(player, itemStack);
        break;
      case 4:
        kaze.shiNoKata(player, itemStack);
        break;
      case 5:
        kaze.goNoKata(player, itemStack);
        break;
      case 6:
        kaze.rokuNoKata(player, itemStack);
        break;
      case 7:
        kaze.shitiNoKata(player, itemStack);
        break;
      case 8:
        kaze.hachiNoKata(player, itemStack);
        break;
      case 9:
        kaze.kuNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kaze = new KazeNoKata();
    switch (kata) {
      case 1:
        kaze.ichiNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/kata/MushiNoKata.ts
import { system as system6 } from "@minecraft/server";
var MushiNoKata = class extends KataComonClass {
  /**
   * 蝶ノ舞 戯れ
   */
  ichiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mushi_kokyu1.value" }] });
    const num = system6.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 3, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      this.kokyuApplyEffect(player, filter, 2, 1, MinecraftEffectTypes.Poison);
    }, 2);
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0.5);
    player.applyKnockback(distance.x, distance.z, 10, 0.4);
    player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", player.location);
    system6.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system6.clearRun(num);
    }, 8);
  }
  /**
   * 蜂牙ノ舞 真靡き
   */
  niNoKata(player, itemStack) {
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:mushi_kokyu2.value"}]}');
    const point = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(point.x, point.z, 15, 0);
    system6.runTimeout(() => {
      player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", player.location);
      const filter = addRegimentalFilter(0, player.location, 3, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      this.kokyuApplyEffect(player, filter, 2, 1, MinecraftEffectTypes.Poison);
    }, 2);
    system6.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 8);
  }
  /**
   * 蜻蛉ノ舞 複眼六角
   */
  sanNoKata(player, itemStack) {
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:mushi_kokyu3.value"}]}');
    const num = system6.runInterval(() => {
      const distance = getLookLocationDistance(player.getRotation().y, 2, 0, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3.5, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      this.kokyuApplyEffect(player, filter, 2, 1, MinecraftEffectTypes.Poison);
    }, 4);
    system6.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system6.clearRun(num);
    }, 16);
  }
  /**
   * 蜈蚣ノ舞 百蟲の呼吸
   */
  shiNoKata(player, itemStack) {
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:mushi_kokyu4.value"}]}');
    const distance = getLookLocationDistance(player.getRotation().y, 2, -2, 0);
    player.applyKnockback(distance.x, distance.z, 10, 0);
    player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", player.location);
    player.setProperty("kurokumaft:kokyu_attack", true);
    let side = 2;
    const num = system6.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 4, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      this.kokyuApplyEffect(player, filter, 2, 1, MinecraftEffectTypes.Poison);
      const distance2 = getLookLocationDistance(player.getRotation().y, 2, side, 0);
      player.applyKnockback(distance2.x, distance2.z, 10, 0);
      player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", player.location);
      side = -side;
    }, 4);
    system6.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_attack", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system6.clearRun(num);
    }, 40);
  }
};

// scripts/kokyu/character/KokyuShinobuComponent.ts
var KokyuShinobuComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[6];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        let index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:mushi_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
    }
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let mushi = new MushiNoKata();
    switch (kata) {
      case 1:
        mushi.ichiNoKata(player, itemStack);
        break;
      case 2:
        mushi.niNoKata(player, itemStack);
        break;
      case 3:
        mushi.sanNoKata(player, itemStack);
        break;
      case 4:
        mushi.shiNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
    }
  }
};

// scripts/kokyu/character/KokyuTanjiroComponent.ts
import { system as system8, TicksPerSecond as TicksPerSecond6 } from "@minecraft/server";

// scripts/kokyu/kata/HiNoKata.ts
import { MolangVariableMap as MolangVariableMap5, system as system7, TicksPerSecond as TicksPerSecond5 } from "@minecraft/server";
var HiNoKata = class extends KataComonClass {
  constructor() {
    super(...arguments);
    this.gennitiIntervalId = 0;
  }
  /**
   * 壱ノ型 円舞
   */
  ichiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu1.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 2.5, 0, 0.5);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
    this.kokyuApplyDamage(player, filter, 4, 1, itemStack);
    system7.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
    }, 2);
    system7.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 15);
  }
  /**
   * 壱ノ型 円舞一閃
   */
  ichiNoKataIssen(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu1_issen.value" }] });
    player.setProperty("kurokumaft:kokyu_use", false);
    player.setProperty("kurokumaft:kokyu_chage", 0);
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(distance.x, distance.z, 30, 0);
    const num = system7.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    }, 1);
    system7.runTimeout(() => {
      player.setDynamicProperty("kurokumaft:chage_type", void 0);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system7.clearRun(num);
    }, 12);
  }
  /**
   * 弐ノ型 碧羅の天
   */
  niNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu2.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 2.5, 0, 0.5);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
    this.kokyuApplyDamage(player, filter, 6, 2, itemStack);
    system7.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 7);
  }
  /**
   * 参ノ型 烈日紅鏡
   */
  sanNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu3.value" }] });
    const ldistance = getLookLocationDistance(player.getRotation().y, 1.5, -1.5, 1);
    const lfilter = addRegimentalFilter(0, getDistanceLocation(player.location, ldistance), 3, player.id);
    this.kokyuApplyDamage(player, lfilter, 3, 1, itemStack);
    system7.runTimeout(() => {
      const rdistance = getLookLocationDistance(player.getRotation().y, 1.5, 1.5, 1);
      const rfilter = addRegimentalFilter(0, getDistanceLocation(player.location, rdistance), 3, player.id);
      this.kokyuApplyDamage(player, rfilter, 3, 1, itemStack);
    }, 15);
    system7.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 25);
  }
  /**
   * 肆ノ型 灼骨炎陽
   */
  shiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu4.value" }] });
    let z = 0;
    const num = system7.runInterval(() => {
      const distance = getLookLocationDistance(player.getRotation().y, z, 0, 0.5);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
      this.kokyuApplyDamage(player, filter, 6, 2, itemStack);
      z++;
    }, 4);
    system7.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system7.clearRun(num);
    }, 30);
  }
  /**
   * 伍ノ型 陽華突
   */
  goNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu5.value" }] });
    player.setProperty("kurokumaft:kokyu_use", false);
    const distance = getLookLocationDistancePitch(player.getRotation(), 3.5, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3.5, player.id);
    this.kokyuApplyDamage(player, filter, 6, 2, itemStack);
    system7.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 5);
  }
  /**
   * 陸ノ型 日暈の龍 頭舞い
   */
  rokuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu6.value" }] });
    player.setDynamicProperty("kurokumaft:chage_type", true);
    player.setProperty("kurokumaft:kokyu_chage", 1);
    player.addEffect(MinecraftEffectTypes.Speed, 5 * TicksPerSecond5, {
      amplifier: 6,
      showParticles: false
    });
    player.setProperty("kurokumaft:kokyu_attack", true);
    let side = 2;
    const num = system7.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 4, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      const distance = getLookLocationDistance(player.getRotation().y, 2, side, 0);
      player.applyKnockback(distance.x, distance.z, 5, 0);
      side = -side;
    }, 4);
    system7.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_attack", false);
      player.setProperty("kurokumaft:kokyu_chage", 0);
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setDynamicProperty("kurokumaft:chage_type", void 0);
      system7.clearRun(num);
    }, 5 * TicksPerSecond5);
  }
  /**
   * 漆ノ型 斜陽転身
   */
  shitiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu7.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, -3, 0, 1);
    player.applyKnockback(distance.x, distance.z, 1, 0.6);
    const distance2 = getLookLocationDistance(player.getRotation().y, 3, 0, -1);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance2), 4, player.id);
    this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    system7.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 15);
  }
  /**
   * 捌ノ型 飛輪陽炎
   */
  hachiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu8.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 3.5, 0, 0.5);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 4, player.id);
    this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    system7.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 15);
  }
  /**
   * 玖ノ型 輝輝恩光
   */
  kuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu9.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap5();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system7.runInterval(() => {
      player.dimension.spawnParticle("kurokumaft:hi9_particle", player.location, molang);
    }, 1);
    const distance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 0.5);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 2, player.id);
    this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    const udistance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 3);
    const ufilter = addRegimentalFilter(0, getDistanceLocation(player.location, udistance), 3, player.id);
    this.kokyuApplyDamage(player, ufilter, 6, 3, itemStack);
    system7.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system7.clearRun(num);
    }, 20);
  }
  /**
   * 拾ノ型 火車
   */
  zyuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu10.value" }] });
    const fdistance = getLookLocationDistance(player.getRotation().y, 2.5, 0, 0);
    const ffilter = addRegimentalFilter(0, getDistanceLocation(player.location, fdistance), 2.5, player.id);
    this.kokyuApplyDamage(player, ffilter, 6, 3, itemStack);
    const bdistance = getLookLocationDistance(player.getRotation().y, -2.5, 0, 0);
    const bfilter = addRegimentalFilter(0, getDistanceLocation(player.location, bdistance), 2.5, player.id);
    this.kokyuApplyDamage(player, bfilter, 6, 3, itemStack);
    const udistance = getLookLocationDistance(player.getRotation().y, 0, 0, 2.5);
    const ufilter = addRegimentalFilter(0, getDistanceLocation(player.location, udistance), 2.5, player.id);
    this.kokyuApplyDamage(player, ufilter, 6, 3, itemStack);
    const ddistance = getLookLocationDistance(player.getRotation().y, 0, 0, -2.5);
    const dfilter = addRegimentalFilter(0, getDistanceLocation(player.location, ddistance), 2.5, player.id);
    this.kokyuApplyDamage(player, dfilter, 6, 3, itemStack);
    system7.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 15);
  }
  /**
   * 拾壱ノ型 幻日虹
   */
  zyuichiNoKata(player, itemStack) {
    if (player.getDynamicProperty("kurokumaft:chage_type") == void 0) {
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu11.value" }] });
      player.setDynamicProperty("kurokumaft:chage_type", true);
      player.triggerEvent("kurokumaft:add_damage_clear");
      this.gennitiIntervalId = system7.runInterval(() => {
        this.checkGennitiMove(player, itemStack);
      }, 2);
      const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
      const molang = new MolangVariableMap5();
      molang.setFloat("variable.kaikyu", kaikyuNum);
      const num = system7.runInterval(() => {
        player.dimension.spawnParticle("kurokumaft:hi_heat_haze_particle", player.location, molang);
      }, 1);
      system7.runTimeout(() => {
        player.setProperty("kurokumaft:kokyu_attack", false);
        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_particle", false);
        player.setDynamicProperty("kurokumaft:chage_type", void 0);
        system7.clearRun(this.gennitiIntervalId);
        system7.clearRun(num);
        player.triggerEvent("kurokumaft:remove_damage_clear");
      }, 10 * TicksPerSecond5);
    }
  }
  checkGennitiMove(player, itemStack) {
    if (player.isValid()) {
      const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
      const molang = new MolangVariableMap5();
      molang.setFloat("variable.kaikyu", kaikyuNum);
      if (this.projectRefrect(player, player.location)) {
        player.dimension.spawnParticle("kurokumaft:hi11_particle", player.location, molang);
      }
      player.addTag(player.id);
      const filter = addRegimentalFilter(1, player.location, 2.5, player.id);
      const targets = player.dimension.getEntities(filter);
      targets.forEach((en) => {
        player.dimension.spawnParticle("kurokumaft:hi11_particle", player.location, molang);
      });
      player.removeTag(player.id);
    } else {
      system7.clearRun(this.gennitiIntervalId);
    }
  }
  /**
   * 拾弐ノ型 炎舞
   */
  zyuniNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu12.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 2.5, 0, 0.5);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
    this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    system7.runTimeout(() => {
      this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    }, 10);
    system7.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 10);
  }
};

// scripts/kokyu/character/KokyuTanjiroComponent.ts
var KokyuTanjiroComponent = class {
  constructor() {
    this.enbuIntervalId = 0;
  }
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[1];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", 1);
        kata = kokyuObject.kata[0];
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kata" + kata + ".value" }] });
        break;
      default:
        player.setProperty("kurokumaft:kokyu_kata", kata + 1);
        kata = kata + 1;
        if (kata < 11) {
          player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kata" + kata + ".value" }] });
        } else {
          player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hinokami_kata" + kata + ".value" }] });
        }
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let mizu = new MizuNoKata();
    let hi = new HiNoKata();
    switch (kata) {
      case 10:
        mizu.zyuNoKata(player, itemStack);
        break;
    }
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let mizu = new MizuNoKata();
    let hi = new HiNoKata();
    switch (kata) {
      case 2:
        mizu.niNoKata(player, itemStack);
        break;
      case 3:
        mizu.sanNoKata(player, itemStack);
        break;
      case 4:
        mizu.shiNoKata(player, itemStack);
        break;
      case 9:
        mizu.kuNoKata(player, itemStack);
        break;
      case 10:
        mizu.zyuNoKataShot(player, itemStack);
        break;
      case 11:
        if (player.getProperty("kurokumaft:kokyu_chage") == 0) {
          player.setProperty("kurokumaft:kokyu_chage", 1);
          this.enbuIntervalId = system8.runTimeout(() => {
            if (player.getProperty("kurokumaft:kokyu_use")) {
              player.setProperty("kurokumaft:kokyu_chage", 5);
            }
          }, 3 * TicksPerSecond6);
        }
        break;
      case 12:
        hi.niNoKata(player, itemStack);
        break;
      case 13:
        hi.sanNoKata(player, itemStack);
        break;
      case 14:
        hi.shiNoKata(player, itemStack);
        break;
      case 16:
        hi.rokuNoKata(player, itemStack);
        break;
      case 17:
        hi.shitiNoKata(player, itemStack);
        break;
      case 18:
        hi.hachiNoKata(player, itemStack);
        break;
      case 19:
        hi.kuNoKata(player, itemStack);
        break;
      case 20:
        hi.zyuNoKata(player, itemStack);
        break;
      case 21:
        hi.zyuichiNoKata(player, itemStack);
        break;
      case 22:
        hi.zyuniNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let mizu = new MizuNoKata();
    let hi = new HiNoKata();
    switch (kata) {
      case 1:
        mizu.ichiNoKata(player, itemStack);
        break;
      case 5:
        mizu.goNoKata(player, itemStack);
        break;
      case 6:
        mizu.rokuNoKata(player, itemStack);
        break;
      case 7:
        mizu.shitiNoKata(player, itemStack);
        break;
      case 8:
        mizu.hachiNoKata(player, itemStack);
        break;
      case 11:
        if (player.getDynamicProperty("kurokumaft:chage_type") == void 0) {
          player.setDynamicProperty("kurokumaft:chage_type", true);
          if (player.getProperty("kurokumaft:kokyu_chage") == 5) {
            hi.ichiNoKataIssen(player, itemStack);
          } else {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_chage", 0);
            player.setDynamicProperty("kurokumaft:chage_type", void 0);
            system8.clearRun(this.enbuIntervalId);
            hi.ichiNoKata(player, itemStack);
          }
        }
        break;
      case 15:
        hi.goNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/character/KokyuZenituComponent.ts
import { system as system10, TicksPerSecond as TicksPerSecond8 } from "@minecraft/server";

// scripts/kokyu/kata/KaminariNoKata.ts
import { MolangVariableMap as MolangVariableMap6, system as system9, TicksPerSecond as TicksPerSecond7 } from "@minecraft/server";
var KaminariNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 霹靂一閃
   */
  ichiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu1.value" }] });
    player.setProperty("kurokumaft:kokyu_use", false);
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(distance.x, distance.z, 15, 0);
    const num = system9.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 2.5, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    }, 1);
    system9.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      system9.clearRun(num);
    }, 6);
  }
  /**
   * 壱ノ型 霹靂一閃 連
   */
  ichiNoKataRen(player, itemStack) {
    player.setDynamicProperty("kurokumaft:attack_count", 0);
    player.addEffect(MinecraftEffectTypes.Speed, 5 * TicksPerSecond7, {
      amplifier: 10,
      showParticles: false
    });
    system9.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_chage", 0);
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setDynamicProperty("kurokumaft:chage_type", void 0);
      let chage = player.getDynamicProperty("kurokumaft:attack_count");
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu1_rengeki.value", with: [chage.toString()] }] });
    }, 5 * TicksPerSecond7);
  }
  /**
   * 壱ノ型 霹靂一閃 連撃
   */
  ichiAttack(player, itemStack) {
    const distance = getLookLocationDistancePitch(player.getRotation(), 1.5, 0);
    const filter = addRegimentalFilter(0, distance, 3, player.id);
    this.kokyuApplyDamage(player, filter, 5, 2, itemStack);
  }
  /**
   * 壱ノ型 霹靂一閃 神速
   */
  ichiNoKataShinsoku(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu1_shinsoku.value" }] });
    player.setProperty("kurokumaft:kokyu_use", false);
    player.setProperty("kurokumaft:kokyu_chage", 0);
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(distance.x, distance.z, 50, 0);
    const num = system9.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
      this.kokyuApplyDamage(player, filter, 5, 2, itemStack);
    }, 1);
    system9.runTimeout(() => {
      player.setDynamicProperty("kurokumaft:chage_type", void 0);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system9.clearRun(num);
    }, 12);
  }
  /**
   * 弐ノ型 稲魂
   */
  niNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu2.value" }] });
    const num = system9.runInterval(() => {
      const distance = getLookLocationDistancePitch(player.getRotation(), 1.5, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    }, 4);
    system9.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system9.clearRun(num);
    }, 20);
  }
  /**
   * 参ノ型 聚蚊成雷
   */
  sanNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu3.value" }] });
    const num = system9.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 4, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    }, 2);
    const distance = getLookLocationDistance(player.getRotation().y, 2, -2, 0);
    player.applyKnockback(distance.x, distance.z, 2, 0);
    player.teleport(player.location, {
      keepVelocity: false,
      rotation: {
        x: 0,
        y: player.getRotation().y + 90
      }
    });
    const num2 = system9.runInterval(() => {
      const distance2 = getLookLocationDistance(player.getRotation().y, 2, -2, 0);
      player.applyKnockback(distance2.x, distance2.z, 2, 0);
      player.teleport(player.location, {
        keepVelocity: false,
        rotation: {
          x: 0,
          y: player.getRotation().y - 90
        }
      });
    }, 5);
    system9.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system9.clearRun(num);
      system9.clearRun(num2);
    }, 30);
  }
  /**
   * 肆ノ型 遠雷
   */
  shiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu4.value" }] });
    player.setProperty("kurokumaft:kokyu_use", false);
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap6();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system9.runInterval(() => {
      const distance = getLookLocationDistance(player.getRotation().y, 8, 0, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 8, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      player.dimension.spawnParticle("kurokumaft:kaminari4_particle", player.location, molang);
    }, 2);
    system9.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      system9.clearRun(num);
    }, 20);
  }
  /**
   * 伍ノ型 熱界雷
   */
  goNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu5.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap6();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system9.runInterval(() => {
      player.dimension.spawnParticle("kurokumaft:kaminari5_particle", player.location, molang);
    }, 1);
    let event = "kurokumaft:small_damage";
    if (kaikyuNum > 8) {
      event = "kurokumaft:lage_damage";
    } else if (kaikyuNum > 4) {
      event = "kurokumaft:middle_damage";
    }
    const dragon = shooting(player, "kurokumaft:kaminari_dragon_small", 0, 3, event);
    system9.runTimeout(() => {
      if (dragon.isValid()) {
        dragon.remove();
      }
    }, 2 * TicksPerSecond7);
    const filter = addRegimentalFilter(1, player.location, 6, player.id);
    this.kokyuApplyDamage(player, filter, 5, 2, itemStack);
    system9.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system9.clearRun(num);
    }, 10);
  }
  /**
   * 陸ノ型 電轟雷轟
   */
  rokuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu6.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(distance.x, distance.z, 0, 0.8);
    player.addEffect(MinecraftEffectTypes.SlowFalling, 1 * TicksPerSecond7, {
      amplifier: 1,
      showParticles: false
    });
    const nowloc = player.location;
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap6();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system9.runInterval(() => {
      player.dimension.spawnParticle("kurokumaft:kaminari6_particle", nowloc, molang);
    }, 1);
    const filter = addRegimentalFilter(1, player.location, 15, player.id);
    this.kokyuApplyDamage(player, filter, 8, 4, itemStack);
    system9.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system9.clearRun(num);
    }, 10);
  }
  /**
   * 漆ノ型 火雷神
   */
  shitiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu7.value" }] });
    player.setProperty("kurokumaft:kokyu_use", false);
    player.setProperty("kurokumaft:kokyu_chage", 0);
    player.setDynamicProperty("kurokumaft:chage_type", void 0);
    system9.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 20);
    const filter = addRegimentalFilter(1, player.location, 30, player.id);
    const targets = player.dimension.getEntities(filter);
    if (targets.length > 0) {
      player.teleport(targets[0].location, {
        facingLocation: targets[0].location
      });
    }
    const filter2 = addRegimentalFilter(0, player.location, 8, player.id);
    this.kokyuApplyDamage(player, filter2, 20, 8, itemStack);
  }
};

// scripts/kokyu/character/KokyuZenituComponent.ts
var KokyuZenituComponent = class {
  constructor() {
    this.shinsokuIntervalId = 0;
    this.ikazutiIntervalId = 0;
  }
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[2];
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kaminari = new KaminariNoKata();
    switch (kata) {
      case 1:
        if (player.getDynamicProperty("kurokumaft:attack_count") != void 0) {
          let chage = player.getDynamicProperty("kurokumaft:attack_count");
          player.setDynamicProperty("kurokumaft:attack_count", chage + 1);
          kaminari.ichiAttack(player, itemStack);
        }
        break;
    }
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kaminari = new KaminariNoKata();
    switch (kata) {
      case 1:
        player.setProperty("kurokumaft:kokyu_chage", 1);
        this.shinsokuIntervalId = system10.runTimeout(() => {
          if (player.getProperty("kurokumaft:kokyu_use")) {
            player.setProperty("kurokumaft:kokyu_chage", 5);
            this.ikazutiIntervalId = system10.runTimeout(() => {
              if (player.getProperty("kurokumaft:kokyu_chage") == 5 && player.getProperty("kurokumaft:kokyu_use")) {
                player.setProperty("kurokumaft:kokyu_chage", 10);
                player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:kaminari_kata7.value"}]}');
              }
            }, 5 * TicksPerSecond8);
          }
        }, 3 * TicksPerSecond8);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kaminari = new KaminariNoKata();
    switch (kata) {
      case 1:
        if (player.getDynamicProperty("kurokumaft:chage_type") == void 0) {
          player.setDynamicProperty("kurokumaft:chage_type", true);
          if (player.getProperty("kurokumaft:kokyu_chage") == 5) {
            kaminari.ichiNoKataShinsoku(player, itemStack);
            system10.clearRun(this.shinsokuIntervalId);
            system10.clearRun(this.ikazutiIntervalId);
          } else if (player.getProperty("kurokumaft:kokyu_chage") == 10) {
            kaminari.shitiNoKata(player, itemStack);
            system10.clearRun(this.shinsokuIntervalId);
            system10.clearRun(this.ikazutiIntervalId);
          } else {
            system10.clearRun(this.shinsokuIntervalId);
            system10.clearRun(this.ikazutiIntervalId);
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_chage", 2);
            kaminari.ichiNoKataRen(player, itemStack);
          }
        }
        break;
    }
  }
};

// scripts/kokyu/NichirintouChoiceComponent.ts
import { ItemStack as ItemStack14, ItemComponentTypes as ItemComponentTypes2, EntityComponentTypes as EntityComponentTypes4, EquipmentSlot as EquipmentSlot6 } from "@minecraft/server";
var nichirintouLists = weightChoice([
  { item: "kurokumaft:nichirintou_mizu", weight: 50 },
  { item: "kurokumaft:nichirintou_hono", weight: 30 },
  { item: "kurokumaft:nichirintou_kaze", weight: 20 },
  { item: "kurokumaft:nichirintou_hana", weight: 20 },
  { item: "kurokumaft:nichirintou_kaminari", weight: 15 },
  { item: "kurokumaft:nichirintou_koi", weight: 5 },
  { item: "kurokumaft:nichirintou_mushi", weight: 5 },
  { item: "kurokumaft:nichirintou_oto", weight: 5 },
  { item: "kurokumaft:nichirintou_hi", weight: 1 }
]);
var NichirintouChoiceComponent = class {
  changeKata(player) {
  }
  hitAttackKata(player, itemStack) {
  }
  useAttackKata(player, itemStack) {
  }
  releaseAttackKata(player, itemStack, duration) {
    this.probabilisticChoice(itemStack, player);
  }
  /**
   * 日輪刀色変わり
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  probabilisticChoice(itemStack, player) {
    let nichirintou = nichirintouLists.pick();
    let enchant = itemStack.getComponent(ItemComponentTypes2.Enchantable);
    let changeItem = new ItemStack14(nichirintou);
    let newEnchant = changeItem.getComponent(ItemComponentTypes2.Enchantable);
    newEnchant.addEnchantments(enchant.getEnchantments());
    let equ = player.getComponent(EntityComponentTypes4.Equippable);
    equ.setEquipment(EquipmentSlot6.Mainhand, changeItem);
  }
};

// scripts/kokyu/kata/HebiNoKata.ts
import { system as system11 } from "@minecraft/server";
var HebiNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 委蛇斬り
   */
  ichiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hebi_kokyu1.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(distance.x, distance.z, 6, 0);
    const distancePitch = getLookLocationDistancePitch(player.getRotation(), 3, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distancePitch), 4, player.id);
    this.kokyuApplyDamage(player, filter, 3, 2, itemStack);
    system11.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 6);
  }
  /**
   * 弐ノ型 狭頭の毒牙
   */
  niNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hebi_kokyu2.value" }] });
    const distancePitch = getLookLocationDistancePitch(player.getRotation(), 0, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distancePitch), 3, player.id);
    this.kokyuApplyDamage(player, filter, 4, 2, itemStack);
    this.kokyuApplyEffect(player, filter, 2, 1, MinecraftEffectTypes.Poison);
    system11.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 6);
  }
  /**
   * 参ノ型 塒締め
   */
  sanNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hebi_kokyu3.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(distance.x, distance.z, 30, 0);
    const num = system11.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 6, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    }, 4);
    system11.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system11.clearRun(num);
    }, 20);
  }
  /**
   * 肆ノ型 頸蛇双生
   */
  shiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hebi_kokyu4.value" }] });
    const num = system11.runInterval(() => {
      const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
      player.applyKnockback(distance.x, distance.z, 3, 0);
      const filter = addRegimentalFilter(1, player.location, 4, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
    }, 2);
    system11.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system11.clearRun(num);
    }, 40);
  }
  /**
   * 伍ノ型 蜿蜿長蛇
   */
  goNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hebi_kokyu5.value" }] });
    let side = 2;
    const num = system11.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 4, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      const distance = getLookLocationDistance(player.getRotation().y, 2, side, 0);
      player.applyKnockback(distance.x, distance.z, 3, 0);
      side = -side;
    }, 2);
    system11.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system11.clearRun(num);
    }, 20);
  }
};

// scripts/kokyu/regimental/KokyuHebiComponent.ts
var KokyuHebiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[23];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:hebi_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let hebi = new HebiNoKata();
    switch (kata) {
      case 1:
        hebi.ichiNoKata(player, itemStack);
        break;
      case 2:
        hebi.niNoKata(player, itemStack);
        break;
      case 3:
        hebi.sanNoKata(player, itemStack);
        break;
      case 4:
        hebi.shiNoKata(player, itemStack);
        break;
      case 5:
        hebi.goNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/regimental/KokyuHiComponent.ts
var KokyuHiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[16];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:hi_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let hi = new HiNoKata();
    switch (kata) {
      case 1:
        hi.ichiNoKata(player, itemStack);
        break;
      case 2:
        hi.niNoKata(player, itemStack);
        break;
      case 3:
        hi.sanNoKata(player, itemStack);
        break;
      case 4:
        hi.shiNoKata(player, itemStack);
        break;
      case 6:
        hi.rokuNoKata(player, itemStack);
        break;
      case 7:
        hi.shitiNoKata(player, itemStack);
        break;
      case 8:
        hi.hachiNoKata(player, itemStack);
        break;
      case 9:
        hi.kuNoKata(player, itemStack);
        break;
      case 10:
        hi.zyuNoKata(player, itemStack);
        break;
      case 11:
        hi.zyuichiNoKata(player, itemStack);
        break;
      case 12:
        hi.zyuniNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let hi = new HiNoKata();
    switch (kata) {
      case 5:
        hi.goNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/regimental/KokyuHonoComponent.ts
var KokyuHonoComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[17];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:hono_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let hono = new HonoNoKata();
    switch (kata) {
      case 2:
        hono.niNoKata(player, itemStack);
        break;
      case 3:
        hono.sanNoKata(player, itemStack);
        break;
      case 4:
        hono.shiNoKata(player, itemStack);
        break;
      case 5:
        hono.goNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let hono = new HonoNoKata();
    switch (kata) {
      case 1:
        hono.ichiNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/kata/IwaNoKata.ts
import { MolangVariableMap as MolangVariableMap7, system as system12, TicksPerSecond as TicksPerSecond9 } from "@minecraft/server";
var IwaNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 蛇紋岩・双極
   */
  ichiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:iwa_kokyu1.value" }] });
    const ono = shooting(player, "kurokumaft:iwa_axe", 0, 3, void 0);
    const ball = shooting(player, "kurokumaft:iwa_iron_ball", 0, 3, void 0);
    system12.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 10);
  }
  /**
   * 弐ノ型 天面砕き
   */
  niNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:iwa_kokyu2.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap7();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    system12.runTimeout(() => {
      const distance = getLookLocationDistance(player.getRotation().y, 4, 0, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 6, player.id);
      this.kokyuApplyDamage(player, filter, 4, 2, itemStack);
      player.dimension.spawnParticle("kurokumaft:iwa2_particle", getDistanceLocation(player.location, distance), molang);
    }, 6);
    system12.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 10);
  }
  /**
   * 参ノ型 岩軀の膚
   */
  sanNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:iwa_kokyu3.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap7();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system12.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 6, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
      this.projectRefrect(player, player.location);
      player.dimension.spawnParticle("kurokumaft:iwa3_particle", player.location, molang);
    }, 2);
    system12.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system12.clearRun(num);
    }, 30);
  }
  /**
   * 肆ノ型 流紋岩・速征
   */
  shiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:iwa_kokyu4.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap7();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system12.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 4, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      const distance = getLookLocationDistance(player.getRotation().y, 2, 0, 0);
      player.applyKnockback(distance.x, distance.z, 5, 0);
      player.dimension.spawnParticle("kurokumaft:iwa3_particle", player.location, molang);
    }, 2);
    system12.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system12.clearRun(num);
    }, 20);
  }
  /**
   * 伍ノ型 瓦輪刑部
   */
  goNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:iwa_kokyu5.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap7();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 1);
    player.applyKnockback(distance.x, distance.z, 0, 1);
    const num = system12.runInterval(() => {
      const distance2 = getLookLocationDistance(player.getRotation().y, 0, 0, -5);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance2), 5, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      const side = getRandomInRange(-5, 5);
      const around = getRandomInRange(-5, 5);
      const distance22 = getLookLocationDistance(player.getRotation().y, around, side, 0.5);
      player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", getDistanceLocation(player.location, distance22));
      player.dimension.spawnParticle("kurokumaft:iwa3_particle", getDistanceLocation(player.location, distance22), molang);
    }, 2);
    player.addEffect(MinecraftEffectTypes.SlowFalling, 2 * TicksPerSecond9, {
      amplifier: 1,
      showParticles: false
    });
    system12.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      system12.clearRun(num);
    }, 40);
  }
};

// scripts/kokyu/regimental/KokyuIwaComponent.ts
var KokyuIwaComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[20];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:iwa_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let iwa = new IwaNoKata();
    switch (kata) {
      case 1:
        iwa.ichiNoKata(player, itemStack);
        break;
      case 2:
        iwa.niNoKata(player, itemStack);
        break;
      case 3:
        iwa.sanNoKata(player, itemStack);
        break;
      case 4:
        iwa.shiNoKata(player, itemStack);
        break;
      case 5:
        iwa.goNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/regimental/KokyuKaminariComponent.ts
var KokyuKaminariComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[15];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:kaminari_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kaminari = new KaminariNoKata();
    switch (kata) {
      case 2:
        kaminari.niNoKata(player, itemStack);
        break;
      case 3:
        kaminari.sanNoKata(player, itemStack);
        break;
      case 5:
        kaminari.goNoKata(player, itemStack);
        break;
      case 6:
        kaminari.rokuNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kaminari = new KaminariNoKata();
    switch (kata) {
      case 1:
        kaminari.ichiNoKata(player, itemStack);
        break;
      case 4:
        kaminari.shiNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/kata/KasumiNoKata.ts
import { MolangVariableMap as MolangVariableMap8, system as system13, TicksPerSecond as TicksPerSecond10 } from "@minecraft/server";
var KasumiNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 垂天遠霞
   */
  ichiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kokyu1.value" }] });
    player.setProperty("kurokumaft:kokyu_use", false);
    system13.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 5);
    const distance1 = getLookLocationDistancePitch(player.getRotation(), 1.5, 0);
    const filter1 = addRegimentalFilter(0, getDistanceLocation(player.location, distance1), 3, player.id);
    this.kokyuApplyDamage(player, filter1, 4, 1, itemStack);
    const distance2 = getLookLocationDistancePitch(player.getRotation(), 4.5, 0);
    const filter2 = addRegimentalFilter(0, getDistanceLocation(player.location, distance2), 2, player.id);
    this.kokyuApplyDamage(player, filter2, 4, 1, itemStack);
  }
  /**
   * 弐ノ型 八重霞
   */
  niNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kokyu2.value" }] });
    const num = system13.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 4, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    }, 2);
    system13.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system13.clearRun(num);
    }, 20);
  }
  /**
   * 参ノ型 霞散の飛沫
   */
  sanNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kokyu3.value" }] });
    player.setProperty("kurokumaft:kokyu_use", false);
    const filter = addRegimentalFilter(0, player.location, 6, player.id);
    this.kokyuApplyDamage(player, filter, 5, 2, itemStack);
    system13.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 10);
  }
  /**
   * 肆ノ型 移流斬り
   */
  shiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kokyu4.value" }] });
    player.setProperty("kurokumaft:kokyu_use", false);
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap8();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const filter = addRegimentalFilter(0, player.location, 2.5, player.id);
    this.kokyuApplyDamage(player, filter, 4, 1, itemStack);
    const num = system13.runInterval(() => {
      player.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", player.location, molang);
    }, 2);
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    player.applyKnockback(distance.x, distance.z, 6, 0);
    system13.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      system13.clearRun(num);
    }, 10);
  }
  /**
   * 伍ノ型 霞雲の海
   */
  goNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kokyu5.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap8();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system13.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 3, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
      const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
      player.applyKnockback(distance.x, distance.z, 2, 0);
      const pdistance = getLookLocationDistance(player.getRotation().y, 2, 0, 0);
      player.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", getDistanceLocation(player.location, pdistance), molang);
    }, 2);
    system13.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system13.clearRun(num);
    }, 20);
  }
  /**
   * 陸ノ型 月の霞消
   */
  rokuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kokyu6.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap8();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system13.runInterval(() => {
      const distance2 = getLookLocationDistance(player.getRotation().y, 1.5, 0, -0.5);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance2), 6, player.id);
      this.kokyuApplyDamage(player, filter, 4, 2, itemStack);
      player.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", getDistanceLocation(player.location, distance2), molang);
    }, 4);
    const distance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 1);
    player.applyKnockback(distance.x, distance.z, 5, 0.6);
    system13.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system13.clearRun(num);
    }, 20);
  }
  /**
   * 漆ノ型 朧
   */
  shitiNoKata(player, itemStack) {
    if (player.getDynamicProperty("kurokumaft:chage_type") == void 0) {
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kokyu7.value" }] });
      player.setDynamicProperty("kurokumaft:chage_type", true);
      const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
      const molang = new MolangVariableMap8();
      molang.setFloat("variable.kaikyu", kaikyuNum);
      player.addEffect(MinecraftEffectTypes.Speed, 10 * TicksPerSecond10, {
        amplifier: 3,
        showParticles: false
      });
      player.setProperty("kurokumaft:kokyu_chage", 1);
      player.dimension.spawnParticle("kurokumaft:kasumi_fog_lage_particle", player.location, molang);
      player.addEffect(MinecraftEffectTypes.Invisibility, 20, {
        amplifier: 10,
        showParticles: false
      });
      const num = system13.runInterval(() => {
        player.dimension.spawnParticle("kurokumaft:kasumi_fog_lage_particle", player.location, molang);
        if (player.getProperty("kurokumaft:kokyu_chage") == 1) {
          player.setProperty("kurokumaft:kokyu_chage", 2);
          player.removeEffect(MinecraftEffectTypes.Invisibility);
        } else {
          player.setProperty("kurokumaft:kokyu_chage", 1);
          player.addEffect(MinecraftEffectTypes.Invisibility, 20, {
            amplifier: 10,
            showParticles: false
          });
        }
      }, 20);
      system13.runTimeout(() => {
        player.setProperty("kurokumaft:kokyu_chage", 0);
        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_particle", false);
        player.setDynamicProperty("kurokumaft:chage_type", void 0);
        system13.clearRun(num);
      }, 10 * TicksPerSecond10);
    }
  }
};

// scripts/kokyu/regimental/KokyuKasumiComponent.ts
var KokyuKasumiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[21];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:kasumi_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kasumi = new KasumiNoKata();
    player.addTag(player.id);
    switch (kata) {
      case 2:
        kasumi.niNoKata(player, itemStack);
        break;
      case 5:
        kasumi.goNoKata(player, itemStack);
        break;
      case 6:
        kasumi.rokuNoKata(player, itemStack);
        break;
      case 7:
        kasumi.shitiNoKata(player, itemStack);
        break;
    }
    player.removeTag(player.id);
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kasumi = new KasumiNoKata();
    player.addTag(player.id);
    switch (kata) {
      case 1:
        kasumi.ichiNoKata(player, itemStack);
        break;
      case 3:
        kasumi.sanNoKata(player, itemStack);
        break;
      case 4:
        kasumi.shiNoKata(player, itemStack);
        break;
    }
    player.removeTag(player.id);
  }
};

// scripts/kokyu/regimental/KokyuKazeComponent.ts
var KokyuKazeComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[19];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:kaze_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kaze = new KazeNoKata();
    switch (kata) {
      case 2:
        kaze.niNoKata(player, itemStack);
        break;
      case 3:
        kaze.sanNoKata(player, itemStack);
        break;
      case 4:
        kaze.shiNoKata(player, itemStack);
        break;
      case 5:
        kaze.goNoKata(player, itemStack);
        break;
      case 6:
        kaze.rokuNoKata(player, itemStack);
        break;
      case 7:
        kaze.shitiNoKata(player, itemStack);
        break;
      case 8:
        kaze.hachiNoKata(player, itemStack);
        break;
      case 9:
        kaze.kuNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kaze = new KazeNoKata();
    switch (kata) {
      case 1:
        kaze.ichiNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/regimental/KokyuMizuComponent.ts
var KokyuMizuComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[14];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:mizu_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let mizu = new MizuNoKata();
    switch (kata) {
      case 10:
        mizu.zyuNoKata(player, itemStack);
        break;
    }
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let mizu = new MizuNoKata();
    switch (kata) {
      case 2:
        mizu.niNoKata(player, itemStack);
        break;
      case 3:
        mizu.sanNoKata(player, itemStack);
        break;
      case 4:
        mizu.shiNoKata(player, itemStack);
        break;
      case 9:
        mizu.kuNoKata(player, itemStack);
        break;
      case 10:
        mizu.zyuNoKataShot(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let mizu = new MizuNoKata();
    switch (kata) {
      case 1:
        mizu.ichiNoKata(player, itemStack);
        break;
      case 5:
        mizu.goNoKata(player, itemStack);
        break;
      case 6:
        mizu.rokuNoKata(player, itemStack);
        break;
      case 7:
        mizu.shitiNoKata(player, itemStack);
        break;
      case 8:
        mizu.hachiNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/regimental/KokyuMushiComponent.ts
var KokyuMushiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[25];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:mushi_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let mushi = new MushiNoKata();
    switch (kata) {
      case 1:
        mushi.ichiNoKata(player, itemStack);
        break;
      case 2:
        mushi.niNoKata(player, itemStack);
        break;
      case 3:
        mushi.sanNoKata(player, itemStack);
        break;
      case 4:
        mushi.shiNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/kata/OtoNoKata.ts
import { MolangVariableMap as MolangVariableMap9, system as system14, TicksPerSecond as TicksPerSecond11 } from "@minecraft/server";
var OtoNoKata = class extends KataComonClass {
  constructor() {
    super(...arguments);
    this.sousouIntervalId = 0;
  }
  /**
   * 壱ノ型 轟
   */
  ichiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:oto_kokyu1.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 0.5);
    const disLocation = getDistanceLocation(player.location, distance);
    const filter = addRegimentalFilter(0, disLocation, 3, player.id);
    this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    const option = {
      allowUnderwater: true,
      breaksBlocks: true,
      causesFire: false,
      source: player
    };
    player.dimension.createExplosion(disLocation, 1, option);
    system14.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 5);
  }
  /**
   * 弐ノ型 薙ぎ払い
   */
  niNoKata(player, itemStack) {
    const option = {
      allowUnderwater: true,
      breaksBlocks: false,
      causesFire: false,
      source: player
    };
    let side = -2;
    const num = system14.runInterval(() => {
      const distance = getLookLocationDistance(player.getRotation().y, 2, side, 0.5);
      const disLocation = getDistanceLocation(player.location, distance);
      const filter = addRegimentalFilter(0, disLocation, 4, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      player.dimension.createExplosion(disLocation, 1, option);
      side = side + 2;
    }, 5);
    system14.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system14.clearRun(num);
    }, 16);
  }
  /**
   * 参ノ型 突進突き
   */
  sanNoKata(player, itemStack) {
    player.setProperty("kurokumaft:kokyu_use", false);
    const option = {
      allowUnderwater: true,
      breaksBlocks: false,
      causesFire: false,
      source: player
    };
    const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0.5);
    player.applyKnockback(distance.x, distance.z, 30, 0);
    const num = system14.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      const front = getForwardPosition(player.location, player.getRotation().y, 1);
      player.dimension.createExplosion(front, 2, option);
    }, 2);
    system14.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      system14.clearRun(num);
    }, 12);
  }
  /**
   * 肆ノ型 鳴弦奏々
   */
  shiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:oto_kokyu4.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap9();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const option = {
      allowUnderwater: true,
      breaksBlocks: false,
      causesFire: false,
      source: player
    };
    const num = system14.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 5, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      this.checkSousouReflection(player, option);
    }, 2);
    system14.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      system14.clearRun(this.sousouIntervalId);
      system14.clearRun(num);
    }, 20);
  }
  checkSousouReflection(player, option) {
    if (player.isValid()) {
      this.projectRefrect(player, player.location);
      player.addTag(player.id);
      let distance = getLookLocationDistance(player.getRotation().y, 2, 2, 0);
      let disLocation = getDistanceLocation(player.location, distance);
      player.dimension.createExplosion(disLocation, 2, option);
      distance = getLookLocationDistance(player.getRotation().y, -2, 2, 0);
      disLocation = getDistanceLocation(player.location, distance);
      player.dimension.createExplosion(disLocation, 2, option);
      distance = getLookLocationDistance(player.getRotation().y, 2, -2, 0);
      disLocation = getDistanceLocation(player.location, distance);
      player.dimension.createExplosion(disLocation, 2, option);
      distance = getLookLocationDistance(player.getRotation().y, -2, -2, 0);
      disLocation = getDistanceLocation(player.location, distance);
      player.dimension.createExplosion(disLocation, 2, option);
      player.removeTag(player.id);
    } else {
      system14.clearRun(this.sousouIntervalId);
    }
  }
  /**
   * 伍ノ型 響斬無間
   */
  goNoKata(player, itemStack) {
    if (player.getDynamicProperty("kurokumaft:chage_type") == void 0) {
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:oto_kokyu5.value" }] });
      player.setDynamicProperty("kurokumaft:chage_type", true);
      player.addEffect(MinecraftEffectTypes.Speed, 3 * TicksPerSecond11, {
        amplifier: 5,
        showParticles: false
      });
      const option = {
        allowUnderwater: true,
        breaksBlocks: false,
        causesFire: false,
        source: player
      };
      const num = system14.runInterval(() => {
        const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0.5);
        player.applyKnockback(distance.x, distance.z, 3, 0);
        const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
        this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
        const right = getRightPosition(player.location, player.getRotation().y, 3);
        player.dimension.createExplosion(right, 2.5, option);
        const left = getLeftPosition(player.location, player.getRotation().y, 3);
        player.dimension.createExplosion(left, 2.5, option);
      }, 2);
      system14.runTimeout(() => {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_particle", false);
        player.setDynamicProperty("kurokumaft:chage_type", void 0);
        system14.clearRun(num);
      }, 3 * TicksPerSecond11);
    }
  }
};

// scripts/kokyu/regimental/KokyuOtoComponent.ts
var KokyuOtoComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[22];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:oto_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let oto = new OtoNoKata();
    switch (kata) {
      case 1:
        oto.ichiNoKata(player, itemStack);
        break;
      case 2:
        oto.niNoKata(player, itemStack);
        break;
      case 4:
        oto.shiNoKata(player, itemStack);
        break;
      case 5:
        oto.goNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let oto = new OtoNoKata();
    switch (kata) {
      case 3:
        oto.sanNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/character/KokyuMuitiroComponent.ts
var KokyuMuitiroComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[10];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        let index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:kasumi_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kasumi = new KasumiNoKata();
    player.addTag(player.id);
    switch (kata) {
      case 2:
        kasumi.niNoKata(player, itemStack);
        break;
      case 5:
        kasumi.goNoKata(player, itemStack);
        break;
      case 6:
        kasumi.rokuNoKata(player, itemStack);
        break;
      case 7:
        kasumi.shitiNoKata(player, itemStack);
        break;
    }
    player.removeTag(player.id);
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kasumi = new KasumiNoKata();
    player.addTag(player.id);
    switch (kata) {
      case 1:
        kasumi.ichiNoKata(player, itemStack);
        break;
      case 3:
        kasumi.sanNoKata(player, itemStack);
        break;
      case 4:
        kasumi.shiNoKata(player, itemStack);
        break;
    }
    player.removeTag(player.id);
  }
};

// scripts/kokyu/character/KokyuObanaiComponent.ts
var KokyuObanaiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[12];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        let index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:hebi_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let hebi = new HebiNoKata();
    player.addTag(player.id);
    switch (kata) {
      case 1:
        hebi.ichiNoKata(player, itemStack);
        break;
      case 2:
        hebi.niNoKata(player, itemStack);
        break;
      case 3:
        hebi.sanNoKata(player, itemStack);
        break;
      case 4:
        hebi.shiNoKata(player, itemStack);
        break;
      case 5:
        hebi.goNoKata(player, itemStack);
        break;
    }
    player.removeTag(player.id);
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/regimental/KokyuKoiComponent.ts
var KokyuKoiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[24];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:koi_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let koi = new KoiNoKata();
    switch (kata) {
      case 2:
        koi.niNoKata(player, itemStack);
        break;
      case 3:
        koi.sanNoKata(player, itemStack);
        break;
      case 5:
        koi.goNoKata(player, itemStack);
        break;
      case 6:
        koi.rokuNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let koi = new KoiNoKata();
    switch (kata) {
      case 1:
        koi.ichiNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/kata/KedamonoNoKata.ts
import { system as system15, TicksPerSecond as TicksPerSecond12 } from "@minecraft/server";
var KedamonoNoKata = class extends KataComonClass {
  /**
   * 壱ノ牙 穿ち抜き
   */
  ichiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu1.value" }] });
    const distance = getLookLocationDistancePitch(player.getRotation(), 1.5, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
    this.kokyuApplyDamage(player, filter, 4, 2, itemStack);
    system15.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 15);
  }
  /**
   * 弐ノ牙 切り裂き
   */
  niNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu2.value" }] });
    const distance = getLookLocationDistancePitch(player.getRotation(), 1.5, -0.5);
    const lfilter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
    this.kokyuApplyDamage(player, lfilter, 2, 1, itemStack);
    system15.runTimeout(() => {
      const distance2 = getLookLocationDistancePitch(player.getRotation(), 1.5, 0.5);
      const rfilter = addRegimentalFilter(0, getDistanceLocation(player.location, distance2), 3, player.id);
      this.kokyuApplyDamage(player, rfilter, 2, 1, itemStack);
    }, 10);
    system15.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 15);
  }
  /**
   * 参ノ牙 喰い裂き
   */
  sanNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu3.value" }] });
    const distance = getLookLocationDistancePitch(player.getRotation(), 1.5, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 2.5, player.id);
    this.kokyuApplyDamage(player, filter, 4, 2, itemStack);
    system15.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 10);
  }
  /**
   * 肆ノ牙 切細裂き
   */
  shiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu4.value" }] });
    const num = system15.runInterval(() => {
      const distance = getLookLocationDistancePitch(player.getRotation(), 1.5, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    }, 4);
    system15.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system15.clearRun(num);
    }, 40);
  }
  /**
   * 伍ノ牙 狂い裂き
   */
  goNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu5.value" }] });
    const num = system15.runInterval(() => {
      const filter = addRegimentalFilter(0, player.location, 4, player.id);
      this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    }, 4);
    system15.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system15.clearRun(num);
    }, 20);
  }
  /**
   * 陸ノ牙 乱杭咬み
   */
  rokuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu6.value" }] });
    const num = system15.runInterval(() => {
      const distance = getLookLocationDistancePitch(player.getRotation(), 1, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3.5, player.id);
      this.kokyuApplyDamage(player, filter, 4, 2, itemStack);
    }, 4);
    system15.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system15.clearRun(num);
    }, 40);
  }
  /**
   * 漆ノ型 空間識覚
   */
  shitiNoKata(player, itemStack) {
    if (player.getDynamicProperty("kurokumaft:chage_type") == void 0) {
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu7.value" }] });
      player.setProperty("kurokumaft:kokyu_chage", 10);
      player.setDynamicProperty("kurokumaft:chage_type", true);
      player.addEffect(MinecraftEffectTypes.NightVision, 30 * TicksPerSecond12, {
        amplifier: 5,
        showParticles: false
      });
      const filter = addRegimentalFilter(0, player.location, 16, player.id);
      const targets = player.dimension.getEntities(filter);
      const num = system15.runInterval(() => {
        targets.forEach((en) => {
          en.dimension.spawnParticle("kurokumaft:kedamono7_particle", en.location);
        });
      }, 2);
      system15.runTimeout(() => {
        player.setDynamicProperty("kurokumaft:chage_type", void 0);
        player.setProperty("kurokumaft:kokyu_chage", 0);
        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_particle", false);
      }, 10);
      system15.runTimeout(() => {
        system15.clearRun(num);
      }, 10 * TicksPerSecond12);
    }
  }
  /**
   * 捌ノ型 爆裂猛進
   */
  hachiNoKata(player, itemStack) {
    if (player.getDynamicProperty("kurokumaft:chage_type") == void 0) {
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu8.value" }] });
      player.setDynamicProperty("kurokumaft:chage_type", true);
      player.setProperty("kurokumaft:kokyu_chage", 10);
      player.addEffect(MinecraftEffectTypes.Speed, 10 * TicksPerSecond12, {
        amplifier: 5,
        showParticles: false
      });
      system15.runTimeout(() => {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_particle", false);
        player.setDynamicProperty("kurokumaft:chage_type", void 0);
        player.setProperty("kurokumaft:kokyu_chage", 0);
      }, 10 * TicksPerSecond12);
    }
  }
  /**
   * 玖ノ牙 伸・うねり裂き
   */
  kuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu9.value" }] });
    const distance = getLookLocationDistancePitch(player.getRotation(), 3.5, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 6, player.id);
    this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    system15.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 10);
  }
  /**
   * 拾ノ牙 円転旋牙
   */
  zyuNoKata(player, itemStack) {
    if (player.getDynamicProperty("kurokumaft:chage_type") == void 0) {
      player.setDynamicProperty("kurokumaft:chage_type", true);
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu10.value" }] });
      const num = system15.runInterval(() => {
        const ldistance = getLookLocationDistancePitch(player.getRotation(), 0.5, -1.5);
        const lfilter = addRegimentalFilter(0, getDistanceLocation(player.location, ldistance), 4, player.id);
        this.kokyuApplyDamage(player, lfilter, 2, 1, itemStack);
        const rdistance = getLookLocationDistancePitch(player.getRotation(), 0.5, 1.5);
        const rfilter = addRegimentalFilter(0, getDistanceLocation(player.location, rdistance), 4, player.id);
        this.kokyuApplyDamage(player, rfilter, 2, 1, itemStack);
      }, 4);
      system15.runTimeout(() => {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_particle", false);
        player.setDynamicProperty("kurokumaft:chage_type", void 0);
        system15.clearRun(num);
      }, 3 * TicksPerSecond12);
    }
  }
};

// scripts/kokyu/regimental/KokyuKedamonoComponent.ts
var KokyuKedamonoComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[18];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:kedamono_kata' + kata + '.value"}]}');
  }
  /**
   * 獣 呼吸
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
    }
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kedamono = new KedamonoNoKata();
    switch (kata) {
      case 1:
        kedamono.ichiNoKata(player, itemStack);
        break;
      case 2:
        kedamono.niNoKata(player, itemStack);
        break;
      case 3:
        kedamono.sanNoKata(player, itemStack);
        break;
      case 4:
        kedamono.shiNoKata(player, itemStack);
        break;
      case 5:
        kedamono.goNoKata(player, itemStack);
        break;
      case 6:
        kedamono.rokuNoKata(player, itemStack);
        break;
      case 7:
        kedamono.shitiNoKata(player, itemStack);
        break;
      case 8:
        kedamono.hachiNoKata(player, itemStack);
        break;
      case 9:
        kedamono.kuNoKata(player, itemStack);
        break;
      case 10:
        kedamono.zyuNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
    }
  }
};

// scripts/kokyu/character/KokyuGyoumeiComponent.ts
var KokyuGyoumeiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[9];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:iwa_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const iwa = new IwaNoKata();
    player.addTag(player.id);
    switch (kata) {
      case 1:
        iwa.ichiNoKata(player, itemStack);
        break;
      case 2:
        iwa.niNoKata(player, itemStack);
        break;
      case 3:
        iwa.sanNoKata(player, itemStack);
        break;
      case 4:
        iwa.shiNoKata(player, itemStack);
        break;
      case 5:
        iwa.goNoKata(player, itemStack);
        break;
    }
    player.removeTag(player.id);
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/character/KokyuInosukeComponent.ts
var KokyuInosukeComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[3];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:kedamono_kata' + kata + '.value"}]}');
  }
  /**
   * 伊之助 呼吸
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
    }
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kedamono = new KedamonoNoKata();
    switch (kata) {
      case 1:
        kedamono.ichiNoKata(player, itemStack);
        break;
      case 2:
        kedamono.niNoKata(player, itemStack);
        break;
      case 3:
        kedamono.sanNoKata(player, itemStack);
        break;
      case 4:
        kedamono.shiNoKata(player, itemStack);
        break;
      case 5:
        kedamono.goNoKata(player, itemStack);
        break;
      case 6:
        kedamono.rokuNoKata(player, itemStack);
        break;
      case 7:
        kedamono.shitiNoKata(player, itemStack);
        break;
      case 8:
        kedamono.hachiNoKata(player, itemStack);
        break;
      case 9:
        kedamono.kuNoKata(player, itemStack);
        break;
      case 10:
        kedamono.zyuNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
    }
  }
};

// scripts/kokyu/character/KokyuTengenComponent.ts
var KokyuTengenComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[11];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        let index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:oto_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let oto = new OtoNoKata();
    switch (kata) {
      case 1:
        oto.ichiNoKata(player, itemStack);
        break;
      case 2:
        oto.niNoKata(player, itemStack);
        break;
      case 4:
        oto.shiNoKata(player, itemStack);
        break;
      case 5:
        oto.goNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let oto = new OtoNoKata();
    switch (kata) {
      case 3:
        oto.sanNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/regimental/KokyuHanaComponent.ts
var KokyuHanaComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[26];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:hana_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const hana = new HanaNoKata();
    switch (kata) {
      case 2:
        hana.niNoKata(player, itemStack);
        break;
      case 4:
        hana.shiNoKata(player, itemStack);
        break;
      case 5:
        hana.goNoKata(player, itemStack);
        break;
      case 6:
        hana.rokuNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/kata/TukiNoKata.ts
import { EntityComponentTypes as EntityComponentTypes5, MolangVariableMap as MolangVariableMap10, system as system16 } from "@minecraft/server";
var TukiNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 闇月・宵の宮
   */
  ichiNoKata(player, itemStack) {
    player.setProperty("kurokumaft:kokyu_use", false);
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu1.value" }] });
    const distance = getLookLocationDistance(player.getRotation().y, 2.5, 0, 0.5);
    const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
    this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
    const molang = new MolangVariableMap10();
    molang.setFloat("variable.tuki_rotaion", -player.getRotation().y);
    molang.setFloat("variable.tuki_size_x", 5);
    molang.setFloat("variable.tuki_size_y", 2.5);
    player.dimension.spawnParticle("kurokumaft:tuki5_particle", getDistanceLocation(player.location, distance), molang);
    system16.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 5);
  }
  /**
   * 弐ノ型 珠華ノ弄月
   */
  niNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu2.value" }] });
    const molang = new MolangVariableMap10();
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    let side = -3;
    let tuki_rotaion = 90;
    const num = system16.runInterval(() => {
      molang.setFloat("variable.tuki_rotaion", tuki_rotaion);
      const distance = getLookLocationDistance(player.getRotation().y, 3, 0, 0.5);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      const pdistance = getLookLocationDistance(player.getRotation().y, 2.5, side, 1);
      player.dimension.spawnParticle("kurokumaft:tuki_sweep_particle", getDistanceLocation(player.location, pdistance), molang);
      side = side + 3;
      tuki_rotaion = tuki_rotaion - 90;
    }, 5);
    system16.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system16.clearRun(num);
    }, 15);
  }
  /**
   * 参ノ型 厭忌月・銷り
   */
  sanNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu3.value" }] });
    const molang = new MolangVariableMap10();
    molang.setFloat("variable.tuki_size_x", 5);
    molang.setFloat("variable.tuki_size_y", 2.5);
    const distance = getLookLocationDistance(player.getRotation().y, 2.5, -1.5, 1);
    const lfilter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3.5, player.id);
    this.kokyuApplyDamage(player, lfilter, 3, 1, itemStack);
    molang.setFloat("variable.tuki_rotaion", 0);
    player.dimension.spawnParticle("kurokumaft:tuki_sweep_particle", getDistanceLocation(player.location, distance), molang);
    system16.runTimeout(() => {
      const distance2 = getLookLocationDistance(player.getRotation().y, 2.5, 1.5, 1);
      const rfilter = addRegimentalFilter(0, getDistanceLocation(player.location, distance2), 3.5, player.id);
      this.kokyuApplyDamage(player, rfilter, 3, 1, itemStack);
      molang.setFloat("variable.tuki_rotaion", 180);
      player.dimension.spawnParticle("kurokumaft:tuki_sweep_particle", getDistanceLocation(player.location, distance2), molang);
    }, 5);
    system16.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 10);
  }
  /**
   * 伍ノ型 月魄災渦
   */
  goNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu5.value" }] });
    const molang = new MolangVariableMap10();
    const num = system16.runInterval(() => {
      const y = getRandomInRange(0.1, 2.5);
      const distance = getLookLocationDistance(player.getRotation().y, 3.5, 0, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 4, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      const pdistance = getLookLocationDistance(player.getRotation().y, 6.5, 0, y);
      molang.setFloat("variable.tuki_rotaion", -player.getRotation().y);
      molang.setFloat("variable.tuki_size_x", getRandomInRange(8, 12));
      molang.setFloat("variable.tuki_size_y", getRandomInRange(4, 8));
      player.dimension.spawnParticle("kurokumaft:tuki5_particle", getDistanceLocation(player.location, pdistance), molang);
    }, 2);
    system16.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system16.clearRun(num);
    }, 20);
  }
  /**
   * 陸ノ型 常夜孤月・無間
   */
  rokuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu6.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap10();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    const parlo = getForwardPosition(player.location, player.getRotation().y, 4);
    player.dimension.spawnParticle("kurokumaft:tuki_box_particle", parlo, molang);
    const num = system16.runInterval(() => {
      const side = getRandomInRange(-5, 5);
      const tuki_rotaion = getRandomInRange(-90, 90);
      molang.setFloat("variable.tuki_rotaion", tuki_rotaion);
      const distance = getLookLocationDistance(player.getRotation().y, 6, 0, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 8, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      const pdistance = getLookLocationDistance(player.getRotation().y, 6, side, 1);
      player.dimension.spawnParticle("kurokumaft:tuki_sweep_particle", getDistanceLocation(player.location, pdistance), molang);
    }, 2);
    system16.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      system16.clearRun(num);
    }, 20);
  }
  /**
   * 漆ノ型 厄鏡・月映え
   */
  shitiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu7.value" }] });
    const front = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
    this.tukibae(player, player.location, front);
    const right1 = getLookLocationDistance(player.getRotation().y, 1, 0.5, 0);
    this.tukibae(player, player.location, right1);
    const right2 = getLookLocationDistance(player.getRotation().y, 1, 1, 0);
    this.tukibae(player, player.location, right2);
    const left1 = getLookLocationDistance(player.getRotation().y, 1, -0.5, 0);
    this.tukibae(player, player.location, left1);
    const left2 = getLookLocationDistance(player.getRotation().y, 1, -1, 0);
    this.tukibae(player, player.location, left2);
    const num = system16.runInterval(() => {
      const distance = getLookLocationDistancePitch(player.getRotation(), 6, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 8, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
    }, 2);
    system16.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      system16.clearRun(num);
    }, 10);
  }
  /**
   * 月映え
   */
  async tukibae(player, location, distance) {
    const tuki = player.dimension.spawnEntity("kurokumaft:tuki_blead", {
      x: location.x + distance.x,
      y: location.y,
      z: location.z + distance.z
    });
    const projectile = tuki.getComponent(EntityComponentTypes5.Projectile);
    projectile.owner = player;
    projectile.shoot({
      x: distance.x * 3,
      y: 0,
      z: distance.z * 3
    });
    const num = system16.runInterval(() => {
      const filter = addRegimentalFilter(0, location, 2, player.id);
      const exes = filter.excludeFamilies;
      if (exes != void 0) {
        exes.push("tuki_blead");
      }
      this.kokyuApplyDamage(player, filter, 2, 1, void 0);
    }, 2);
    system16.runTimeout(() => {
      if (tuki.isValid()) {
        tuki.remove();
      }
      system16.clearRun(num);
    }, 20);
  }
  /**
   * 捌ノ型 月龍輪尾
   */
  hachiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu8.value" }] });
    const molang = new MolangVariableMap10();
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    const distance = getLookLocationDistance(player.getRotation().y, 6.5, 0, 0);
    const disLotation = getDistanceLocation(player.location, distance);
    molang.setFloat("variable.tuki_rotaion", -player.getRotation().y);
    molang.setFloat("variable.tuki_size_x", getRandomInRange(8, 12));
    molang.setFloat("variable.tuki_size_y", getRandomInRange(4, 8));
    player.dimension.spawnParticle("kurokumaft:tuki8_particle", disLotation, molang);
    const filter = addRegimentalFilter(0, disLotation, 4, player.id);
    this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    system16.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 15);
  }
  /**
   * 玖ノ型 降り月・連面
   */
  kuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu9.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap10();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    let tuki_rotaion = 75;
    const num = system16.runInterval(() => {
      const side = getRandomInRange(-5, 5);
      molang.setFloat("variable.tuki_rotaion", tuki_rotaion);
      const distance = getLookLocationDistance(player.getRotation().y, 6, 0, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 8, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      const pdistance = getLookLocationDistance(player.getRotation().y, 6, side, 1);
      player.dimension.spawnParticle("kurokumaft:tuki_sweep_particle", getDistanceLocation(player.location, pdistance), molang);
      tuki_rotaion = -tuki_rotaion;
    }, 2);
    system16.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      system16.clearRun(num);
    }, 20);
  }
  /**
   * 拾ノ型 穿面斬・蘿月
   */
  zyuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu10.value" }] });
    const ldistance = getLookLocationDistance(player.getRotation().y, 1, -1.5, 0);
    this.ragetu(player, player.location, ldistance);
    const rdistance = getLookLocationDistance(player.getRotation().y, 1, 1.5, 0);
    this.ragetu(player, player.location, rdistance);
    system16.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
    }, 15);
  }
  /**
   * 蘿月
   */
  async ragetu(player, location, distance) {
    const tuki = player.dimension.spawnEntity("kurokumaft:tuki_ragetu", {
      x: location.x + distance.x,
      y: location.y,
      z: location.z + distance.z
    });
    const front = getLookLocationDistance(player.getRotation().y, 2, 0, 0);
    const projectile = tuki.getComponent(EntityComponentTypes5.Projectile);
    projectile.owner = player;
    projectile.shoot({
      x: front.x * 3,
      y: 0,
      z: front.z * 3
    });
    const num = system16.runInterval(() => {
      const filter = addRegimentalFilter(0, location, 2, player.id);
      const exes = filter.excludeFamilies;
      if (exes != void 0) {
        exes.push("tuki_blead");
      }
      this.kokyuApplyDamage(player, filter, 2, 1, void 0);
    }, 2);
    system16.runTimeout(() => {
      if (tuki.isValid()) {
        tuki.remove();
      }
      system16.clearRun(num);
    }, 20);
  }
  /**
   * 拾肆ノ型 兇変・天満繊月
   */
  zyushiNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu14.value" }] });
    const molang = new MolangVariableMap10();
    const num = system16.runInterval(() => {
      const y = getRandomInRange(0.1, 2.5);
      const distance = getLookLocationDistance(player.getRotation().y, 5, 0, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 6, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      const pdistance = getLookLocationDistance(player.getRotation().y, 8, 0, y);
      molang.setFloat("variable.tuki_rotaion", -player.getRotation().y);
      molang.setFloat("variable.tuki_size_x", getRandomInRange(12, 16));
      molang.setFloat("variable.tuki_size_y", getRandomInRange(8, 12));
      player.dimension.spawnParticle("kurokumaft:tuki5_particle", getDistanceLocation(player.location, pdistance), molang);
    }, 2);
    system16.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_use", false);
      player.setProperty("kurokumaft:kokyu_particle", false);
      system16.clearRun(num);
    }, 40);
  }
  /**
   * 拾陸ノ型 月虹・片割れ月
   */
  zyurokuNoKata(player, itemStack) {
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu16.value" }] });
    const kaikyuNum = player.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap10();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    let tuki_rotaion = 90;
    const num = system16.runInterval(() => {
      const side = getRandomInRange(-5, 5);
      molang.setFloat("variable.tuki_rotaion", tuki_rotaion);
      const distance = getLookLocationDistance(player.getRotation().y, 8, 0, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 8, player.id);
      this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
      const pdistance = getLookLocationDistance(player.getRotation().y, 8, side, 1);
      player.dimension.spawnParticle("kurokumaft:tuki_sweep_particle", getDistanceLocation(player.location, pdistance), molang);
      tuki_rotaion = -tuki_rotaion;
    }, 2);
    system16.runTimeout(() => {
      player.setProperty("kurokumaft:kokyu_particle", false);
      player.setProperty("kurokumaft:kokyu_use", false);
      system16.clearRun(num);
    }, 40);
  }
};

// scripts/kokyu/regimental/KokyuTukiComponent.ts
var KokyuTukiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let kokyuObject = KokyuObjects[27];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        kata = kokyuObject.kata[0];
        player.setProperty("kurokumaft:kokyu_kata", kata);
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el == kata);
        kata = kokyuObject.kata[index + 1];
        player.setProperty("kurokumaft:kokyu_kata", kata);
    }
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:tuki_kata' + kata + '.value"}]}');
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let tuki = new TukiNoKata();
    switch (kata) {
      case 2:
        tuki.niNoKata(player, itemStack);
        break;
      case 3:
        tuki.sanNoKata(player, itemStack);
        break;
      case 5:
        tuki.goNoKata(player, itemStack);
        break;
      case 6:
        tuki.rokuNoKata(player, itemStack);
        break;
      case 7:
        tuki.shitiNoKata(player, itemStack);
        break;
      case 8:
        tuki.hachiNoKata(player, itemStack);
        break;
      case 9:
        tuki.kuNoKata(player, itemStack);
        break;
      case 10:
        tuki.zyuNoKata(player, itemStack);
        break;
      case 14:
        tuki.zyushiNoKata(player, itemStack);
        break;
      case 16:
        tuki.zyurokuNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let tuki = new TukiNoKata();
    switch (kata) {
      case 1:
        tuki.ichiNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/item/weapon/NichirintouTypes.ts
var kokyuClassRecord = {
  nichirintou: NichirintouChoiceComponent,
  tanjiro: KokyuTanjiroComponent,
  zenitu: KokyuZenituComponent,
  inosuke: KokyuInosukeComponent,
  kanawo: KokyuKanawoComponent,
  giyu: KokyuGiyuComponent,
  shinobu: KokyuShinobuComponent,
  kyouzyuro: KokyuKyouzyuroComponent,
  sanemi: KokyuSanemiComponent,
  gyoumei: KokyuGyoumeiComponent,
  muitiro: KokyuMuitiroComponent,
  tengen: KokyuTengenComponent,
  obanai: KokyuObanaiComponent,
  mituri: KokyuMituriComponent,
  mizu: KokyuMizuComponent,
  kaminari: KokyuKaminariComponent,
  hi: KokyuHiComponent,
  kedamono: KokyuKedamonoComponent,
  hono: KokyuHonoComponent,
  kaze: KokyuKazeComponent,
  iwa: KokyuIwaComponent,
  kasumi: KokyuKasumiComponent,
  oto: KokyuOtoComponent,
  hebi: KokyuHebiComponent,
  koi: KokyuKoiComponent,
  mushi: KokyuMushiComponent,
  hana: KokyuHanaComponent,
  tuki: KokyuTukiComponent
};
var KokyuObjects = Object.freeze([
  {
    itemName: "kurokumaft:nichirintou",
    type: 1,
    className: "nichirintou"
  },
  {
    itemName: "kurokumaft:nichirintou_tanjiro",
    type: 2,
    kata: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    kata_msg: "mizu_kata",
    className: "tanjiro"
  },
  {
    itemName: "kurokumaft:nichirintou_zenitu",
    type: 3,
    kata: [1],
    kata_msg: "kaminari_kata",
    className: "zenitu"
  },
  {
    itemName: "kurokumaft:nichirintou_inosuke",
    type: 4,
    kata: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    kata_msg: "kedamono_kata",
    className: "inosuke"
  },
  {
    itemName: "kurokumaft:nichirintou_kanawo",
    type: 5,
    kata: [2, 4, 5, 6, 7],
    kata_msg: "hana_kata",
    className: "kanawo"
  },
  {
    itemName: "kurokumaft:nichirintou_giyu",
    type: 6,
    kata: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    kata_msg: "mizu_kata",
    className: "giyu"
  },
  {
    itemName: "kurokumaft:nichirintou_shinobu",
    type: 7,
    kata: [1, 2, 3, 4],
    kata_msg: "mushi_kata",
    className: "shinobu"
  },
  {
    itemName: "kurokumaft:nichirintou_kyouzyuro",
    type: 8,
    kata: [1, 2, 3, 4, 5, 9],
    kata_msg: "hono_kata",
    className: "kyouzyuro"
  },
  {
    itemName: "kurokumaft:nichirintou_sanemi",
    type: 9,
    kata: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    kata_msg: "kaze_kata",
    className: "sanemi"
  },
  {
    itemName: "kurokumaft:nichirintou_gyoumei",
    type: 10,
    kata: [1, 2, 3, 4, 5],
    kata_msg: "iwa_kata",
    className: "gyoumei"
  },
  {
    itemName: "kurokumaft:nichirintou_muitiro",
    type: 11,
    kata: [1, 2, 3, 4, 5, 6, 7],
    kata_msg: "kasumi_kata",
    className: "muitiro"
  },
  {
    itemName: "kurokumaft:nichirintou_tengen",
    type: 12,
    kata: [1, 2, 3, 4, 5],
    kata_msg: "oto_kata",
    className: "tengen"
  },
  {
    itemName: "kurokumaft:nichirintou_obanai",
    type: 13,
    kata: [1, 2, 3, 4, 5],
    kata_msg: "hebi_kata",
    className: "obanai"
  },
  {
    itemName: "kurokumaft:nichirintou_mituri",
    type: 14,
    kata: [1, 2, 3, 5, 6],
    kata_msg: "koi_kata",
    className: "mituri"
  },
  {
    itemName: "kurokumaft:nichirintou_mizu",
    type: 15,
    kata: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    kata_msg: "mizu_kata",
    className: "mizu"
  },
  {
    itemName: "kurokumaft:nichirintou_kaminari",
    type: 16,
    kata: [1, 2, 3, 4, 5, 6],
    kata_msg: "kaminari_kata",
    className: "kaminari"
  },
  {
    itemName: "kurokumaft:nichirintou_hi",
    type: 17,
    kata: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    kata_msg: "hi_kata",
    className: "hi"
  },
  {
    itemName: "kurokumaft:nichirintou_hono",
    type: 18,
    kata: [1, 2, 3, 4, 5],
    kata_msg: "hono_kata",
    className: "hono"
  },
  {
    itemName: "kurokumaft:nichirintou_kemono",
    type: 19,
    kata: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    kata_msg: "kedamono_kata",
    className: "kedamono"
  },
  {
    itemName: "kurokumaft:nichirintou_kaze",
    type: 20,
    kata: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    kata_msg: "kaze_kata",
    className: "kaze"
  },
  {
    itemName: "kurokumaft:nichirintou_iwa",
    type: 21,
    kata: [1, 2, 3, 4, 5],
    kata_msg: "iwa_kata",
    className: "iwa"
  },
  {
    itemName: "kurokumaft:nichirintou_kasumi",
    type: 22,
    kata: [1, 2, 3, 4, 5, 6, 7],
    kata_msg: "kasumi_kata",
    className: "kasumi"
  },
  {
    itemName: "kurokumaft:nichirintou_oto",
    type: 23,
    kata: [1, 2, 3, 4, 5],
    kata_msg: "oto_kata",
    className: "oto"
  },
  {
    itemName: "kurokumaft:nichirintou_hebi",
    type: 24,
    kata: [1, 2, 3, 4, 5],
    kata_msg: "hebi_kata",
    className: "hebi"
  },
  {
    itemName: "kurokumaft:nichirintou_koi",
    type: 25,
    kata: [1, 2, 3, 5, 6],
    kata_msg: "koi_kata",
    className: "koi"
  },
  {
    itemName: "kurokumaft:nichirintou_mushi",
    type: 26,
    kata: [1, 2, 3, 4],
    kata_msg: "mushi_kata",
    className: "mushi"
  },
  {
    itemName: "kurokumaft:nichirintou_hana",
    type: 27,
    kata: [2, 4, 5, 6],
    kata_msg: "hana_kata",
    className: "hana"
  },
  {
    itemName: "kurokumaft:nichirintou_tuki",
    type: 28,
    kata: [1, 2, 3, 5, 6, 7, 8, 9, 10, 14, 16],
    kata_msg: "tuki_kata",
    className: "tuki"
  }
]);

// scripts/item/weapon/nichirintou/NichirintouComponent.ts
var NichirintouComponent = class {
  // 右クリック
  onUse(event) {
    let player = event.source;
    let itemStack = event.itemStack;
    if (player.isSneaking) {
      const nichirintou = player.getProperty("kurokumaft:nichirintou_type");
      const object = KokyuObjects.find((ob) => ob.type == nichirintou);
      const kokyuClass = kokyuClassRecord[object.className];
      const kokyuObject = new kokyuClass();
      kokyuObject.changeKata(player);
      return;
    }
    if (!player.getProperty("kurokumaft:kokyu_use")) {
      let nichirintou = player.getProperty("kurokumaft:nichirintou_type");
      let object = KokyuObjects.find((ob) => ob.type == nichirintou);
      let kokyuClass = kokyuClassRecord[object.className];
      let kokyuObject = new kokyuClass();
      player.setProperty("kurokumaft:kokyu_use", true);
      player.setProperty("kurokumaft:kokyu_particle", true);
      kokyuObject.useAttackKata(player, itemStack);
    }
  }
};

// scripts/item/weapon/kekkizyutu/KekkizyutuBakketu.ts
var KekkizyutuBakketu = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
  }
};

// scripts/item/weapon/kekkizyutu/KekkizyutuHakaisatu.ts
import { EntityComponentTypes as EntityComponentTypes6 } from "@minecraft/server";
var KekkizyutuHakaisatu = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    let variant = player.getComponent(EntityComponentTypes6.Variant);
    if (variant && variant.value == 2) {
      shooting(player, "kurokumaft:kushiki", 0, 6, void 0);
    }
  }
};

// scripts/item/weapon/kekkizyutu/KekkizyutuKoushi.ts
import { EntityComponentTypes as EntityComponentTypes7 } from "@minecraft/server";
var KekkizyutuKoushi = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    let variant = player.getComponent(EntityComponentTypes7.Variant);
    if (variant && variant.value == 3) {
      shooting(player, "kurokumaft:kokushirinten", 0, 6, void 0);
    }
  }
};

// scripts/item/weapon/kekkizyutu/KekkizyutuTigama.ts
import { EntityComponentTypes as EntityComponentTypes8 } from "@minecraft/server";
var KekkizyutuTigama = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    let variant = player.getComponent(EntityComponentTypes8.Variant);
    if (variant && variant.value == 1) {
      shooting(player, "kurokumaft:tobi_tigama", 0, 4, void 0);
    }
  }
};

// scripts/item/weapon/kekkizyutu/KekkizyutuUltrasonic.ts
var KekkizyutuUltrasonic = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
  }
};

// scripts/item/tool/BloodDrinking.ts
import { system as system17 } from "@minecraft/server";
var BloodDrinking = class {
  onConsume(event) {
    const item = event.itemStack;
    const player = event.source;
    const lores = item.getLore();
    const rank = player.getProperty("kurokumaft:orge_rank");
    let becoming = player.getProperty("kurokumaft:orge_becoming");
    if (lores != void 0 && lores.length > 0) {
      switch (lores[0]) {
        case "Lv 5":
          becoming = becoming + 30;
        case "Lv 4":
          becoming = becoming + 25;
        case "Lv 3":
          becoming = becoming + 20;
        case "Lv 2":
          becoming = becoming + 15;
        case "Lv 1":
          becoming = becoming + 10;
          break;
      }
    } else {
      becoming = becoming + 10;
    }
    if ("none" == rank) {
      if (becoming >= 100) {
        player.setProperty("kurokumaft:orge_rank", "low");
        player.setProperty("kurokumaft:orge_becoming", 0);
        system17.runTimeout(() => {
          player.triggerEvent("kurokumaft:orge_rank_change");
        }, 2);
      } else {
        player.setProperty("kurokumaft:orge_becoming", becoming);
        player.addEffect(MinecraftEffectTypes.Hunger, 20, {
          amplifier: 10,
          showParticles: false
        });
        player.addEffect(MinecraftEffectTypes.Wither, 20, {
          amplifier: 5,
          showParticles: false
        });
      }
    } else {
      if (becoming >= 100) {
        switch (rank) {
          case "low":
            player.setProperty("kurokumaft:orge_rank", "unusual");
            break;
          case "unusual":
            player.setProperty("kurokumaft:orge_rank", "quarter");
            break;
          case "quarter":
            const moon1 = player.getProperty("kurokumaft:orge_moon");
            if (moon1 == 1) {
              player.setProperty("kurokumaft:orge_moon", 6);
              player.setProperty("kurokumaft:orge_rank", "crescent");
            } else {
              player.setProperty("kurokumaft:orge_moon", moon1 - 1);
            }
            break;
          case "crescent":
            const moon2 = player.getProperty("kurokumaft:orge_moon");
            if (moon2 == 1) {
              player.setProperty("kurokumaft:orge_rank", "king");
            } else {
              player.setProperty("kurokumaft:orge_moon", moon2 - 1);
            }
            break;
        }
        player.setProperty("kurokumaft:orge_becoming", 0);
        system17.runTimeout(() => {
          player.triggerEvent("kurokumaft:orge_rank_change");
        }, 2);
      } else {
        player.setProperty("kurokumaft:orge_becoming", becoming);
      }
    }
  }
};

// scripts/custom/KimetuCustomComponentRegistry.ts
function initRegisterKimetuCustom(initEvent) {
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_component", new NichirintouComponent());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:blood_drinking", new BloodDrinking());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:kekkizyutu_bakketu", new KekkizyutuBakketu());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:kekkizyutu_tigama", new KekkizyutuTigama());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:kekkizyutu_hakaisatu", new KekkizyutuHakaisatu());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:kekkizyutu_koushi", new KekkizyutuKoushi());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:kekkizyutu_ultrasonic", new KekkizyutuUltrasonic());
}

// scripts/player/KimetuEquipmentTick.ts
import { EntityComponentTypes as EntityComponentTypes9, EquipmentSlot as EquipmentSlot7, system as system18, TicksPerSecond as TicksPerSecond14 } from "@minecraft/server";
var KimetuEquipmentTick = class {
  constructor(player) {
    this.player = player;
  }
  checkPlayerKaikyuTick() {
    if (this.player.isValid()) {
      const orgeRank = this.player.getProperty("kurokumaft:orge_rank");
      if ("none" == orgeRank) {
        const kaikyuNum = this.player.getProperty("kurokumaft:kaikyu");
        if (kaikyuNum > 0) {
          const kaikyu = "msg.kurokumaft:kaikyu" + kaikyuNum + ".value";
          this.player.onScreenDisplay.setTitle(
            {
              rawtext: [
                { translate: kaikyu }
              ]
            },
            {
              stayDuration: 100,
              fadeInDuration: 0,
              fadeOutDuration: 1,
              subtitle: ""
            }
          );
        }
      } else {
        const orgeMoon = this.player.getProperty("kurokumaft:orge_moon");
        const rank = "msg.kurokumaft:orgerank_" + orgeRank + ("quarter" == orgeRank || "crescent" == orgeRank ? orgeMoon : "") + ".value";
        this.player.onScreenDisplay.setTitle(
          {
            rawtext: [
              { translate: rank }
            ]
          },
          {
            stayDuration: 100,
            fadeInDuration: 0,
            fadeOutDuration: 1,
            subtitle: ""
          }
        );
      }
      system18.runTimeout(() => {
        system18.run(this.checkPlayerKaikyuTick.bind(this));
      }, 20);
    }
  }
  checkPlayerKimetuEquTick() {
    if (this.player.isValid()) {
      const equ = this.player.getComponent(EntityComponentTypes9.Equippable);
      const mainHand = equ.getEquipment(EquipmentSlot7.Mainhand);
      if (mainHand != void 0) {
        const object = KokyuObjects.find((ob) => ob.itemName == mainHand.typeId);
        if (object != void 0) {
          if (this.player.getProperty("kurokumaft:nichirintou_type") != object.type) {
            this.player.setProperty("kurokumaft:nichirintou_type", object.type);
            if (object.type > 1) {
              this.player.setProperty("kurokumaft:kokyu_kata", object.kata[0]);
              this.player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:' + object.kata_msg + object.kata[0] + '.value"}]}');
            }
          }
        } else {
          this.player.setProperty("kurokumaft:nichirintou_type", 0);
          this.player.setProperty("kurokumaft:kokyu_kata", 0);
        }
      } else {
        if (this.player.getProperty("kurokumaft:nichirintou_type") != 0) {
          this.player.setProperty("kurokumaft:nichirintou_type", 0);
          this.player.setProperty("kurokumaft:kokyu_kata", 0);
        }
      }
      system18.waitTicks(TicksPerSecond14);
      system18.run(this.checkPlayerKimetuEquTick.bind(this));
    }
  }
};

// scripts/player/RaisingStatusCheckClass.ts
import { system as system19 } from "@minecraft/server";
var RaisingStatusCheckClass = class {
  statusCheck(player, orge) {
    const kaikyu = player.getProperty("kurokumaft:kaikyu");
    const count = player.getProperty("kurokumaft:orge_kill");
    const point = orge.getProperty("kurokumaft:orge_point");
    let upPoint = count + point;
    let killtarget = 0;
    switch (kaikyu) {
      case 0:
        killtarget = 1;
        break;
      case 10:
        const orgeKaikyu = orge.getProperty("kurokumaft:orge_kaikyu");
        if (orgeKaikyu >= 9) {
          killtarget = killtarget + 300;
        } else {
          upPoint = 0;
        }
      case 9:
        killtarget = killtarget + 90;
      case 8:
        killtarget = killtarget + 80;
      case 7:
        killtarget = killtarget + 70;
      case 6:
        killtarget = killtarget + 60;
      case 5:
        killtarget = killtarget + 50;
      case 4:
        killtarget = killtarget + 40;
      case 3:
        killtarget = killtarget + 30;
      case 2:
        killtarget = killtarget + 20;
      case 1:
        killtarget = killtarget + 10;
        if (upPoint >= killtarget) {
          player.setProperty("kurokumaft:kaikyu", kaikyu + 1);
          player.setProperty("kurokumaft:orge_kill", 0);
          system19.runTimeout(() => {
            player.triggerEvent("kurokumaft:kakyu_change");
          }, 2);
        } else {
          player.setProperty("kurokumaft:orge_kill", upPoint);
        }
    }
  }
};

// scripts/kimetu_script.ts
world5.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initRegisterKimetuCustom(initEvent);
});
world5.beforeEvents.playerLeave.subscribe((leaveEvent) => {
  leaveEvent.player.clearDynamicProperties();
});
world5.afterEvents.playerSpawn.subscribe((event) => {
  if (event.initialSpawn) {
    event.player.setProperty("kurokumaft:kokyu_use", false);
    event.player.setProperty("kurokumaft:kokyu_particle", false);
    event.player.setProperty("kurokumaft:kokyu_attack", false);
    event.player.setProperty("kurokumaft:kokyu_chage", 0);
    event.player.setProperty("kurokumaft:kokyu_ran", 0);
    event.player.setDynamicProperty("kurokumaft:chage_type", void 0);
  }
  const playerTick = new KimetuEquipmentTick(event.player);
  playerTick.checkPlayerKimetuEquTick();
  playerTick.checkPlayerKaikyuTick();
});
world5.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
  const entity = event.entity;
  if (entity instanceof Player28) {
    const nichirintou = entity.getProperty("kurokumaft:nichirintou_type");
    if (nichirintou > 1) {
      if (event.eventId == "kurokumaft:attack_time" && !entity.getProperty("kurokumaft:kokyu_attack")) {
        entity.setProperty("kurokumaft:kokyu_attack", true);
        system20.runTimeout(() => {
          entity.setProperty("kurokumaft:kokyu_attack", false);
        }, 10);
        const object = KokyuObjects.find((ob) => ob.type == nichirintou);
        const kokyuClass = kokyuClassRecord[object.className];
        const kokyuObject = new kokyuClass();
        const equ = entity.getComponent(EntityComponentTypes10.Equippable);
        const itemStack = equ.getEquipment(EquipmentSlot8.Mainhand);
        kokyuObject.hitAttackKata(entity, itemStack);
      }
    }
  }
});
world5.afterEvents.itemReleaseUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;
  const duration = event.useDuration;
  const nichirintou = player.getProperty("kurokumaft:nichirintou_type");
  if (item != void 0 && nichirintou != void 0 && nichirintou != 0) {
    if (player.getProperty("kurokumaft:kokyu_use")) {
      const object = KokyuObjects.find((ob) => ob.type == nichirintou);
      const kokyuClass = kokyuClassRecord[object.className];
      const kokyuObject = new kokyuClass();
      kokyuObject.releaseAttackKata(player, item, duration);
    }
  }
});
world5.afterEvents.entityDie.subscribe((event) => {
  const deadEntity = event.deadEntity;
  const familyTypes = deadEntity.getComponent(EntityComponentTypes10.TypeFamily);
  if (familyTypes != void 0 && familyTypes.hasTypeFamily("ogre")) {
    const damager = event.damageSource.damagingEntity;
    if (damager != void 0) {
      const dfamilyTypes = damager.getComponent(EntityComponentTypes10.TypeFamily);
      if (dfamilyTypes.hasTypeFamily("player")) {
        new RaisingStatusCheckClass().statusCheck(damager, deadEntity);
      }
    }
  }
});
world5.afterEvents.projectileHitEntity.subscribe((event) => {
  const projectile = event.projectile;
  const hitEntity = event.getEntityHit().entity;
  if ("kurokumaft:thrown_syringe_dagger" == projectile.typeId) {
    if (hitEntity != void 0) {
      const familyTypes = hitEntity.getComponent(EntityComponentTypes10.TypeFamily);
      if (familyTypes.hasTypeFamily("ogre")) {
        const rank = hitEntity.getProperty("kurokumaft:orge_rank");
        const daggerFull = new ItemStack25("kurokumaft:syringe_dagger_full", 1);
        switch (rank) {
          case "low":
            daggerFull.setLore(["Lv 1"]);
            break;
          case "unusual":
            daggerFull.setLore(["Lv 2"]);
            break;
          case "quarter":
            daggerFull.setLore(["Lv 3"]);
            break;
          case "crescent":
            daggerFull.setLore(["Lv 4"]);
            break;
          case "king":
            daggerFull.setLore(["Lv 5"]);
            break;
        }
        event.dimension.spawnItem(daggerFull, event.location);
      }
    }
  }
});
world5.afterEvents.projectileHitBlock.subscribe((event) => {
  const projectile = event.projectile;
  if ("kurokumaft:thrown_syringe_dagger" == projectile.typeId) {
    event.dimension.spawnItem(new ItemStack25("kurokumaft:syringe_dagger", 1), event.location);
  }
});
system20.afterEvents.scriptEventReceive.subscribe((event) => {
  const id = event.id;
  const message = event.message;
  const initiator = event.initiator;
  const sourceEntity = event.sourceEntity;
  const sourceType = event.sourceType;
  if (initiator != void 0) {
  }
  if (id == "kk:kaikyuchange" && sourceType == ScriptEventSource.Entity && sourceEntity instanceof Player28) {
    const params = message.split(" ");
    if (params[0] != "set" && params[0] != "add") {
      world5.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_method" });
      return;
    }
    if (params[0] == "add") {
      if (params.length != 3) {
        world5.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_add_argument" });
        return;
      }
      if (params[1] != "promotion" && params[1] != "demotion") {
        world5.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_add_type" });
        return;
      }
      if (!(typeof params[2] === "number" && Number.isFinite(params[2]))) {
        world5.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_add_num" });
        return;
      }
    } else if (params[0] == "set") {
      if (params.length != 2) {
        world5.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_set_argument" });
        return;
      }
      const num = Number(params[1]);
      if (!(!isNaN(num) && Number.isFinite(num))) {
        world5.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_set_num" });
        return;
      }
    }
    sourceEntity.setProperty("kurokumaft:orge_rank", "none");
    sourceEntity.setProperty("kurokumaft:orge_moon", 6);
    sourceEntity.setProperty("kurokumaft:orge_becoming", 0);
    const kaikyu = sourceEntity.getProperty("kurokumaft:kaikyu");
    const kill = sourceEntity.getProperty("kurokumaft:orge_kill");
    if (params[0] == "add") {
      const num = Number(params[2]);
      if (params[1] == "promotion") {
        let upPoint = kill + num;
        let killtarget = 0;
        switch (kaikyu) {
          case 0:
            killtarget = 1;
            break;
          case 10:
            killtarget = killtarget + 150;
          case 9:
            killtarget = killtarget + 90;
          case 8:
            killtarget = killtarget + 80;
          case 7:
            killtarget = killtarget + 70;
          case 6:
            killtarget = killtarget + 60;
          case 5:
            killtarget = killtarget + 50;
          case 4:
            killtarget = killtarget + 40;
          case 3:
            killtarget = killtarget + 30;
          case 2:
            killtarget = killtarget + 20;
          case 1:
            killtarget = killtarget + 10;
            if (upPoint >= killtarget) {
              sourceEntity.setProperty("kurokumaft:kaikyu", kaikyu + 1);
              sourceEntity.setProperty("kurokumaft:orge_kill", 0);
            } else {
              sourceEntity.setProperty("kurokumaft:orge_kill", upPoint);
            }
        }
      } else if (params[1] == "demotion") {
        let upPoint = kill - num;
        let killtarget = 0;
        switch (kaikyu) {
          case 0:
            break;
          case 10:
            killtarget = killtarget + 150;
          case 9:
            killtarget = killtarget + 90;
          case 8:
            killtarget = killtarget + 80;
          case 7:
            killtarget = killtarget + 70;
          case 6:
            killtarget = killtarget + 60;
          case 5:
            killtarget = killtarget + 50;
          case 4:
            killtarget = killtarget + 40;
          case 3:
            killtarget = killtarget + 30;
          case 2:
            killtarget = killtarget + 20;
          case 1:
            killtarget = killtarget + 10;
            if (upPoint < 0) {
              sourceEntity.setProperty("kurokumaft:kaikyu", kaikyu - 1);
              sourceEntity.setProperty("kurokumaft:orge_kill", killtarget);
              sourceEntity.triggerEvent("kurokumaft:kakyu_change");
            } else {
              sourceEntity.setProperty("kurokumaft:orge_kill", upPoint);
            }
            break;
          case 11:
            sourceEntity.setProperty("kurokumaft:kaikyu", kaikyu - 1);
            sourceEntity.setProperty("kurokumaft:orge_kill", 300);
            sourceEntity.triggerEvent("kurokumaft:kakyu_change");
        }
      }
    } else if (params[0] == "set") {
      const num = Number(params[1]);
      if (num > 0 && num <= 11) {
        sourceEntity.setProperty("kurokumaft:kaikyu", num);
        system20.runTimeout(() => {
          sourceEntity.triggerEvent("kurokumaft:kakyu_change");
        }, 2);
      } else if (num == 0) {
        sourceEntity.setProperty("kurokumaft:kaikyu", num);
        system20.runTimeout(() => {
          sourceEntity.triggerEvent("kurokumaft:kakyu_change");
        }, 2);
      }
    }
  }
  if (id == "kk:orgerankchange" && sourceType == ScriptEventSource.Entity && sourceEntity instanceof Player28) {
    const params = message.split(" ");
    if (params[0] != "set" && params[0] != "add") {
      world5.sendMessage({ translate: "msg.kurokumaft:orgeRankChange.missing_method" });
      return;
    }
    if (params[0] == "add") {
      if (params.length != 3) {
        world5.sendMessage({ translate: "msg.kurokumaft:orgeRankChange.missing_add_argument" });
        return;
      }
      if (params[1] != "promotion" && params[1] != "demotion") {
        world5.sendMessage({ translate: "msg.kurokumaft:orgeRankChange.missing_add_type" });
        return;
      }
      if (!(typeof params[2] === "number" && Number.isFinite(params[2]))) {
        world5.sendMessage({ translate: "msg.kurokumaft:orgeRankChange.missing_add_num" });
        return;
      }
    } else if (params[0] == "set") {
      if (params.length != 2) {
        world5.sendMessage({ translate: "msg.kurokumaft:orgeRankChange.missing_set_argument" });
        return;
      }
      const num = Number(params[1]);
      if (!(!isNaN(num) && Number.isFinite(num))) {
        world5.sendMessage({ translate: "msg.kurokumaft:orgeRankChange.missing_set_num" });
        return;
      }
    }
    sourceEntity.setProperty("kurokumaft:kaikyu", 0);
    sourceEntity.setProperty("kurokumaft:orge_kill", 0);
    const rank = sourceEntity.getProperty("kurokumaft:orge_rank");
    if (params[0] == "add") {
      let becoming = sourceEntity.getProperty("kurokumaft:orge_becoming");
      const num = Number(params[2]);
      if (params[1] == "promotion") {
        becoming = becoming + num;
        if (becoming >= 100) {
          switch (rank) {
            case "low":
              sourceEntity.setProperty("kurokumaft:orge_rank", "unusual");
              break;
            case "unusual":
              sourceEntity.setProperty("kurokumaft:orge_rank", "quarter");
              break;
            case "quarter":
              const moon1 = sourceEntity.getProperty("kurokumaft:orge_moon");
              if (moon1 == 1) {
                sourceEntity.setProperty("kurokumaft:orge_moon", 6);
                sourceEntity.setProperty("kurokumaft:orge_rank", "crescent");
              } else {
                sourceEntity.setProperty("kurokumaft:orge_moon", moon1 - 1);
              }
              break;
            case "crescent":
              const moon2 = sourceEntity.getProperty("kurokumaft:orge_moon");
              if (moon2 == 1) {
                sourceEntity.setProperty("kurokumaft:orge_rank", "king");
              } else {
                sourceEntity.setProperty("kurokumaft:orge_moon", moon2 - 1);
              }
              break;
          }
          sourceEntity.setProperty("kurokumaft:orge_becoming", 0);
          system20.runTimeout(() => {
            sourceEntity.triggerEvent("kurokumaft:orge_rank_change");
          }, 2);
        } else {
          sourceEntity.setProperty("kurokumaft:orge_becoming", becoming);
        }
      } else if (params[1] == "demotion") {
        becoming = becoming - num;
        if (becoming > 0) {
          switch (rank) {
            case "low":
              sourceEntity.setProperty("kurokumaft:orge_rank", "none");
              break;
            case "unusual":
              sourceEntity.setProperty("kurokumaft:orge_rank", "low");
              break;
            case "quarter":
              const moon1 = sourceEntity.getProperty("kurokumaft:orge_moon");
              if (moon1 == 6) {
                sourceEntity.setProperty("kurokumaft:orge_rank", "unusual");
              } else {
                sourceEntity.setProperty("kurokumaft:orge_moon", moon1 + 1);
              }
              break;
            case "crescent":
              const moon2 = sourceEntity.getProperty("kurokumaft:orge_moon");
              if (moon2 == 6) {
                sourceEntity.setProperty("kurokumaft:orge_rank", "quarter");
              } else {
                sourceEntity.setProperty("kurokumaft:orge_moon", moon2 + 1);
              }
              break;
            case "king":
              sourceEntity.setProperty("kurokumaft:orge_rank", "crescent");
              sourceEntity.setProperty("kurokumaft:orge_moon", 1);
              break;
          }
          sourceEntity.setProperty("kurokumaft:orge_becoming", 0);
          system20.runTimeout(() => {
            sourceEntity.triggerEvent("kurokumaft:orge_rank_change");
          }, 2);
        } else {
          sourceEntity.setProperty("kurokumaft:orge_becoming", becoming);
        }
      }
    } else if (params[0] == "set") {
      const num = Number(params[1]);
      if (num >= 0 && num <= 15) {
        switch (num) {
          case 0:
            sourceEntity.setProperty("kurokumaft:orge_rank", "none");
            break;
          case 1:
            sourceEntity.setProperty("kurokumaft:orge_rank", "low");
            break;
          case 2:
            sourceEntity.setProperty("kurokumaft:orge_rank", "unusual");
            break;
          case 3:
            sourceEntity.setProperty("kurokumaft:orge_rank", "quarter");
            sourceEntity.setProperty("kurokumaft:orge_moon", 6);
            break;
          case 4:
            sourceEntity.setProperty("kurokumaft:orge_rank", "quarter");
            sourceEntity.setProperty("kurokumaft:orge_moon", 5);
            break;
          case 5:
            sourceEntity.setProperty("kurokumaft:orge_rank", "quarter");
            sourceEntity.setProperty("kurokumaft:orge_moon", 4);
            break;
          case 6:
            sourceEntity.setProperty("kurokumaft:orge_rank", "quarter");
            sourceEntity.setProperty("kurokumaft:orge_moon", 3);
            break;
          case 7:
            sourceEntity.setProperty("kurokumaft:orge_rank", "quarter");
            sourceEntity.setProperty("kurokumaft:orge_moon", 2);
            break;
          case 8:
            sourceEntity.setProperty("kurokumaft:orge_rank", "quarter");
            sourceEntity.setProperty("kurokumaft:orge_moon", 1);
            break;
          case 9:
            sourceEntity.setProperty("kurokumaft:orge_rank", "crescent");
            sourceEntity.setProperty("kurokumaft:orge_moon", 6);
            break;
          case 10:
            sourceEntity.setProperty("kurokumaft:orge_rank", "crescent");
            sourceEntity.setProperty("kurokumaft:orge_moon", 5);
            break;
          case 11:
            sourceEntity.setProperty("kurokumaft:orge_rank", "crescent");
            sourceEntity.setProperty("kurokumaft:orge_moon", 4);
            break;
          case 12:
            sourceEntity.setProperty("kurokumaft:orge_rank", "crescent");
            sourceEntity.setProperty("kurokumaft:orge_moon", 3);
            break;
          case 13:
            sourceEntity.setProperty("kurokumaft:orge_rank", "crescent");
            sourceEntity.setProperty("kurokumaft:orge_moon", 2);
            break;
          case 14:
            sourceEntity.setProperty("kurokumaft:orge_rank", "crescent");
            sourceEntity.setProperty("kurokumaft:orge_moon", 1);
            break;
          case 15:
            sourceEntity.setProperty("kurokumaft:orge_rank", "king");
            break;
        }
        system20.runTimeout(() => {
          sourceEntity.triggerEvent("kurokumaft:kakyu_change");
        }, 2);
      }
    }
  }
});

//# sourceMappingURL=../debug/kimetu_script.js.map
