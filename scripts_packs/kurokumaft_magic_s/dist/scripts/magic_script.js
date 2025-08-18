// scripts/magic_script.ts
import { world as world38, Player as Player101, system as system43, TicksPerSecond as TicksPerSecond54, ScriptEventSource, EntityInitializationCause } from "@minecraft/server";

// scripts/items/weapon/shield/MagicShieldEvent.ts
import { system, Player as Player3, EntityComponentTypes as EntityComponentTypes2, EquipmentSlot as EquipmentSlot2 } from "@minecraft/server";

// scripts/common/MagicCommonUtil.ts
import { world, Direction } from "@minecraft/server";

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
  MinecraftBlockTypes2["Bush"] = "minecraft:bush";
  MinecraftBlockTypes2["Cactus"] = "minecraft:cactus";
  MinecraftBlockTypes2["CactusFlower"] = "minecraft:cactus_flower";
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
  MinecraftBlockTypes2["CopperChest"] = "minecraft:copper_chest";
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
  MinecraftBlockTypes2["DriedGhast"] = "minecraft:dried_ghast";
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
  MinecraftBlockTypes2["ExposedCopperChest"] = "minecraft:exposed_copper_chest";
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
  MinecraftBlockTypes2["FireflyBush"] = "minecraft:firefly_bush";
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
  MinecraftBlockTypes2["LeafLitter"] = "minecraft:leaf_litter";
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
  MinecraftBlockTypes2["OxidizedCopperChest"] = "minecraft:oxidized_copper_chest";
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
  MinecraftBlockTypes2["ShortDryGrass"] = "minecraft:short_dry_grass";
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
  MinecraftBlockTypes2["TallDryGrass"] = "minecraft:tall_dry_grass";
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
  MinecraftBlockTypes2["WaxedCopperChest"] = "minecraft:waxed_copper_chest";
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
  MinecraftBlockTypes2["WaxedExposedCopperChest"] = "minecraft:waxed_exposed_copper_chest";
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
  MinecraftBlockTypes2["WaxedOxidizedCopperChest"] = "minecraft:waxed_oxidized_copper_chest";
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
  MinecraftBlockTypes2["WaxedWeatheredCopperChest"] = "minecraft:waxed_weathered_copper_chest";
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
  MinecraftBlockTypes2["WeatheredCopperChest"] = "minecraft:weathered_copper_chest";
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
  MinecraftBlockTypes2["Wildflowers"] = "minecraft:wildflowers";
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
  MinecraftCameraPresetsTypes2["ControlSchemeCamera"] = "minecraft:control_scheme_camera";
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
var MinecraftDimensionTypes = ((MinecraftDimensionTypes22) => {
  MinecraftDimensionTypes22["Nether"] = "minecraft:nether";
  MinecraftDimensionTypes22["Overworld"] = "minecraft:overworld";
  MinecraftDimensionTypes22["TheEnd"] = "minecraft:the_end";
  return MinecraftDimensionTypes22;
})(MinecraftDimensionTypes || {});
var MinecraftEffectTypes = ((MinecraftEffectTypes22) => {
  MinecraftEffectTypes22["Absorption"] = "minecraft:absorption";
  MinecraftEffectTypes22["BadOmen"] = "minecraft:bad_omen";
  MinecraftEffectTypes22["Blindness"] = "minecraft:blindness";
  MinecraftEffectTypes22["ConduitPower"] = "minecraft:conduit_power";
  MinecraftEffectTypes22["Darkness"] = "minecraft:darkness";
  MinecraftEffectTypes22["FatalPoison"] = "minecraft:fatal_poison";
  MinecraftEffectTypes22["FireResistance"] = "minecraft:fire_resistance";
  MinecraftEffectTypes22["Haste"] = "minecraft:haste";
  MinecraftEffectTypes22["HealthBoost"] = "minecraft:health_boost";
  MinecraftEffectTypes22["Hunger"] = "minecraft:hunger";
  MinecraftEffectTypes22["Infested"] = "minecraft:infested";
  MinecraftEffectTypes22["InstantDamage"] = "minecraft:instant_damage";
  MinecraftEffectTypes22["InstantHealth"] = "minecraft:instant_health";
  MinecraftEffectTypes22["Invisibility"] = "minecraft:invisibility";
  MinecraftEffectTypes22["JumpBoost"] = "minecraft:jump_boost";
  MinecraftEffectTypes22["Levitation"] = "minecraft:levitation";
  MinecraftEffectTypes22["MiningFatigue"] = "minecraft:mining_fatigue";
  MinecraftEffectTypes22["Nausea"] = "minecraft:nausea";
  MinecraftEffectTypes22["NightVision"] = "minecraft:night_vision";
  MinecraftEffectTypes22["Oozing"] = "minecraft:oozing";
  MinecraftEffectTypes22["Poison"] = "minecraft:poison";
  MinecraftEffectTypes22["RaidOmen"] = "minecraft:raid_omen";
  MinecraftEffectTypes22["Regeneration"] = "minecraft:regeneration";
  MinecraftEffectTypes22["Resistance"] = "minecraft:resistance";
  MinecraftEffectTypes22["Saturation"] = "minecraft:saturation";
  MinecraftEffectTypes22["SlowFalling"] = "minecraft:slow_falling";
  MinecraftEffectTypes22["Slowness"] = "minecraft:slowness";
  MinecraftEffectTypes22["Speed"] = "minecraft:speed";
  MinecraftEffectTypes22["Strength"] = "minecraft:strength";
  MinecraftEffectTypes22["TrialOmen"] = "minecraft:trial_omen";
  MinecraftEffectTypes22["VillageHero"] = "minecraft:village_hero";
  MinecraftEffectTypes22["WaterBreathing"] = "minecraft:water_breathing";
  MinecraftEffectTypes22["Weakness"] = "minecraft:weakness";
  MinecraftEffectTypes22["Weaving"] = "minecraft:weaving";
  MinecraftEffectTypes22["WindCharged"] = "minecraft:wind_charged";
  MinecraftEffectTypes22["Wither"] = "minecraft:wither";
  return MinecraftEffectTypes22;
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
  MinecraftEntityTypes2["CopperGolem"] = "minecraft:copper_golem";
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
  MinecraftEntityTypes2["HappyGhast"] = "minecraft:happy_ghast";
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
  MinecraftItemTypes2["BlackHarness"] = "minecraft:black_harness";
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
  MinecraftItemTypes2["BlueEgg"] = "minecraft:blue_egg";
  MinecraftItemTypes2["BlueGlazedTerracotta"] = "minecraft:blue_glazed_terracotta";
  MinecraftItemTypes2["BlueHarness"] = "minecraft:blue_harness";
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
  MinecraftItemTypes2["BrownEgg"] = "minecraft:brown_egg";
  MinecraftItemTypes2["BrownGlazedTerracotta"] = "minecraft:brown_glazed_terracotta";
  MinecraftItemTypes2["BrownHarness"] = "minecraft:brown_harness";
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
  MinecraftItemTypes2["Bush"] = "minecraft:bush";
  MinecraftItemTypes2["Cactus"] = "minecraft:cactus";
  MinecraftItemTypes2["CactusFlower"] = "minecraft:cactus_flower";
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
  MinecraftItemTypes2["CopperAxe"] = "minecraft:copper_axe";
  MinecraftItemTypes2["CopperBlock"] = "minecraft:copper_block";
  MinecraftItemTypes2["CopperBoots"] = "minecraft:copper_boots";
  MinecraftItemTypes2["CopperBulb"] = "minecraft:copper_bulb";
  MinecraftItemTypes2["CopperChest"] = "minecraft:copper_chest";
  MinecraftItemTypes2["CopperChestplate"] = "minecraft:copper_chestplate";
  MinecraftItemTypes2["CopperDoor"] = "minecraft:copper_door";
  MinecraftItemTypes2["CopperGolemSpawnEgg"] = "minecraft:copper_golem_spawn_egg";
  MinecraftItemTypes2["CopperGrate"] = "minecraft:copper_grate";
  MinecraftItemTypes2["CopperHelmet"] = "minecraft:copper_helmet";
  MinecraftItemTypes2["CopperHoe"] = "minecraft:copper_hoe";
  MinecraftItemTypes2["CopperIngot"] = "minecraft:copper_ingot";
  MinecraftItemTypes2["CopperLeggings"] = "minecraft:copper_leggings";
  MinecraftItemTypes2["CopperNugget"] = "minecraft:copper_nugget";
  MinecraftItemTypes2["CopperOre"] = "minecraft:copper_ore";
  MinecraftItemTypes2["CopperPickaxe"] = "minecraft:copper_pickaxe";
  MinecraftItemTypes2["CopperShovel"] = "minecraft:copper_shovel";
  MinecraftItemTypes2["CopperSword"] = "minecraft:copper_sword";
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
  MinecraftItemTypes2["CyanHarness"] = "minecraft:cyan_harness";
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
  MinecraftItemTypes2["DriedGhast"] = "minecraft:dried_ghast";
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
  MinecraftItemTypes2["ExposedCopperChest"] = "minecraft:exposed_copper_chest";
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
  MinecraftItemTypes2["FireflyBush"] = "minecraft:firefly_bush";
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
  MinecraftItemTypes2["GrayHarness"] = "minecraft:gray_harness";
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
  MinecraftItemTypes2["GreenHarness"] = "minecraft:green_harness";
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
  MinecraftItemTypes2["HappyGhastSpawnEgg"] = "minecraft:happy_ghast_spawn_egg";
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
  MinecraftItemTypes2["LeafLitter"] = "minecraft:leaf_litter";
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
  MinecraftItemTypes2["LightBlueHarness"] = "minecraft:light_blue_harness";
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
  MinecraftItemTypes2["LightGrayHarness"] = "minecraft:light_gray_harness";
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
  MinecraftItemTypes2["LimeHarness"] = "minecraft:lime_harness";
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
  MinecraftItemTypes2["MagentaHarness"] = "minecraft:magenta_harness";
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
  MinecraftItemTypes2["MusicDiscLavaChicken"] = "minecraft:music_disc_lava_chicken";
  MinecraftItemTypes2["MusicDiscMall"] = "minecraft:music_disc_mall";
  MinecraftItemTypes2["MusicDiscMellohi"] = "minecraft:music_disc_mellohi";
  MinecraftItemTypes2["MusicDiscOtherside"] = "minecraft:music_disc_otherside";
  MinecraftItemTypes2["MusicDiscPigstep"] = "minecraft:music_disc_pigstep";
  MinecraftItemTypes2["MusicDiscPrecipice"] = "minecraft:music_disc_precipice";
  MinecraftItemTypes2["MusicDiscRelic"] = "minecraft:music_disc_relic";
  MinecraftItemTypes2["MusicDiscStal"] = "minecraft:music_disc_stal";
  MinecraftItemTypes2["MusicDiscStrad"] = "minecraft:music_disc_strad";
  MinecraftItemTypes2["MusicDiscTears"] = "minecraft:music_disc_tears";
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
  MinecraftItemTypes2["OrangeHarness"] = "minecraft:orange_harness";
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
  MinecraftItemTypes2["OxidizedCopperChest"] = "minecraft:oxidized_copper_chest";
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
  MinecraftItemTypes2["PinkHarness"] = "minecraft:pink_harness";
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
  MinecraftItemTypes2["PurpleHarness"] = "minecraft:purple_harness";
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
  MinecraftItemTypes2["RedHarness"] = "minecraft:red_harness";
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
  MinecraftItemTypes2["ShortDryGrass"] = "minecraft:short_dry_grass";
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
  MinecraftItemTypes2["TallDryGrass"] = "minecraft:tall_dry_grass";
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
  MinecraftItemTypes2["WaxedCopperChest"] = "minecraft:waxed_copper_chest";
  MinecraftItemTypes2["WaxedCopperDoor"] = "minecraft:waxed_copper_door";
  MinecraftItemTypes2["WaxedCopperGrate"] = "minecraft:waxed_copper_grate";
  MinecraftItemTypes2["WaxedCopperTrapdoor"] = "minecraft:waxed_copper_trapdoor";
  MinecraftItemTypes2["WaxedCutCopper"] = "minecraft:waxed_cut_copper";
  MinecraftItemTypes2["WaxedCutCopperSlab"] = "minecraft:waxed_cut_copper_slab";
  MinecraftItemTypes2["WaxedCutCopperStairs"] = "minecraft:waxed_cut_copper_stairs";
  MinecraftItemTypes2["WaxedExposedChiseledCopper"] = "minecraft:waxed_exposed_chiseled_copper";
  MinecraftItemTypes2["WaxedExposedCopper"] = "minecraft:waxed_exposed_copper";
  MinecraftItemTypes2["WaxedExposedCopperBulb"] = "minecraft:waxed_exposed_copper_bulb";
  MinecraftItemTypes2["WaxedExposedCopperChest"] = "minecraft:waxed_exposed_copper_chest";
  MinecraftItemTypes2["WaxedExposedCopperDoor"] = "minecraft:waxed_exposed_copper_door";
  MinecraftItemTypes2["WaxedExposedCopperGrate"] = "minecraft:waxed_exposed_copper_grate";
  MinecraftItemTypes2["WaxedExposedCopperTrapdoor"] = "minecraft:waxed_exposed_copper_trapdoor";
  MinecraftItemTypes2["WaxedExposedCutCopper"] = "minecraft:waxed_exposed_cut_copper";
  MinecraftItemTypes2["WaxedExposedCutCopperSlab"] = "minecraft:waxed_exposed_cut_copper_slab";
  MinecraftItemTypes2["WaxedExposedCutCopperStairs"] = "minecraft:waxed_exposed_cut_copper_stairs";
  MinecraftItemTypes2["WaxedOxidizedChiseledCopper"] = "minecraft:waxed_oxidized_chiseled_copper";
  MinecraftItemTypes2["WaxedOxidizedCopper"] = "minecraft:waxed_oxidized_copper";
  MinecraftItemTypes2["WaxedOxidizedCopperBulb"] = "minecraft:waxed_oxidized_copper_bulb";
  MinecraftItemTypes2["WaxedOxidizedCopperChest"] = "minecraft:waxed_oxidized_copper_chest";
  MinecraftItemTypes2["WaxedOxidizedCopperDoor"] = "minecraft:waxed_oxidized_copper_door";
  MinecraftItemTypes2["WaxedOxidizedCopperGrate"] = "minecraft:waxed_oxidized_copper_grate";
  MinecraftItemTypes2["WaxedOxidizedCopperTrapdoor"] = "minecraft:waxed_oxidized_copper_trapdoor";
  MinecraftItemTypes2["WaxedOxidizedCutCopper"] = "minecraft:waxed_oxidized_cut_copper";
  MinecraftItemTypes2["WaxedOxidizedCutCopperSlab"] = "minecraft:waxed_oxidized_cut_copper_slab";
  MinecraftItemTypes2["WaxedOxidizedCutCopperStairs"] = "minecraft:waxed_oxidized_cut_copper_stairs";
  MinecraftItemTypes2["WaxedWeatheredChiseledCopper"] = "minecraft:waxed_weathered_chiseled_copper";
  MinecraftItemTypes2["WaxedWeatheredCopper"] = "minecraft:waxed_weathered_copper";
  MinecraftItemTypes2["WaxedWeatheredCopperBulb"] = "minecraft:waxed_weathered_copper_bulb";
  MinecraftItemTypes2["WaxedWeatheredCopperChest"] = "minecraft:waxed_weathered_copper_chest";
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
  MinecraftItemTypes2["WeatheredCopperChest"] = "minecraft:weathered_copper_chest";
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
  MinecraftItemTypes2["WhiteHarness"] = "minecraft:white_harness";
  MinecraftItemTypes2["WhiteShulkerBox"] = "minecraft:white_shulker_box";
  MinecraftItemTypes2["WhiteStainedGlass"] = "minecraft:white_stained_glass";
  MinecraftItemTypes2["WhiteStainedGlassPane"] = "minecraft:white_stained_glass_pane";
  MinecraftItemTypes2["WhiteTerracotta"] = "minecraft:white_terracotta";
  MinecraftItemTypes2["WhiteTulip"] = "minecraft:white_tulip";
  MinecraftItemTypes2["WhiteWool"] = "minecraft:white_wool";
  MinecraftItemTypes2["WildArmorTrimSmithingTemplate"] = "minecraft:wild_armor_trim_smithing_template";
  MinecraftItemTypes2["Wildflowers"] = "minecraft:wildflowers";
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
  MinecraftItemTypes2["YellowHarness"] = "minecraft:yellow_harness";
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
var MinecraftPotionEffectTypes = ((MinecraftPotionEffectTypes22) => {
  MinecraftPotionEffectTypes22["FireResistance"] = "FireResistance";
  MinecraftPotionEffectTypes22["Harming"] = "Harming";
  MinecraftPotionEffectTypes22["Healing"] = "Healing";
  MinecraftPotionEffectTypes22["Infested"] = "Infested";
  MinecraftPotionEffectTypes22["Invisibility"] = "Invisibility";
  MinecraftPotionEffectTypes22["Leaping"] = "Leaping";
  MinecraftPotionEffectTypes22["NightVision"] = "NightVision";
  MinecraftPotionEffectTypes22["None"] = "None";
  MinecraftPotionEffectTypes22["Oozing"] = "Oozing";
  MinecraftPotionEffectTypes22["Poison"] = "Poison";
  MinecraftPotionEffectTypes22["SlowFalling"] = "SlowFalling";
  MinecraftPotionEffectTypes22["Slowing"] = "Slowing";
  MinecraftPotionEffectTypes22["Strength"] = "Strength";
  MinecraftPotionEffectTypes22["Swiftness"] = "Swiftness";
  MinecraftPotionEffectTypes22["TurtleMaster"] = "TurtleMaster";
  MinecraftPotionEffectTypes22["WaterBreath"] = "WaterBreath";
  MinecraftPotionEffectTypes22["Weakness"] = "Weakness";
  MinecraftPotionEffectTypes22["Weaving"] = "Weaving";
  MinecraftPotionEffectTypes22["WindCharged"] = "WindCharged";
  MinecraftPotionEffectTypes22["Wither"] = "Wither";
  return MinecraftPotionEffectTypes22;
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

// scripts/common/MagicCommonUtil.ts
var MagicCraftBlocks = [
  MinecraftBlockTypes.CraftingTable,
  MinecraftBlockTypes.Anvil,
  MinecraftBlockTypes.SmithingTable,
  MinecraftBlockTypes.CartographyTable,
  MinecraftBlockTypes.Loom,
  MinecraftBlockTypes.Barrel,
  MinecraftBlockTypes.Smoker,
  MinecraftBlockTypes.BlastFurnace,
  MinecraftBlockTypes.Furnace,
  "kurokumaft:magic_lectern"
];
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function getRandomInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function playsound(player, sound) {
  player.playSound(sound);
}
function getLookPoints(rotation, location, point) {
  const piNum = 90;
  let xlocation;
  let ylocation;
  let zlocation;
  if (rotation.y >= -90 && rotation.y < 0) {
    const yRotax = -rotation.y / piNum;
    const yRotaz = (rotation.y + 90) / piNum;
    const yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      const xRota = (rotation.x + 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      const xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    }
  } else if (rotation.y >= 0 && rotation.y <= 90) {
    const yRotax = -rotation.y / piNum;
    const yRotaz = -(rotation.y - 90) / piNum;
    const yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      const xRota = (rotation.x + 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      const xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    }
  } else if (rotation.y < -90 && rotation.y > -180) {
    const yRotax = (rotation.y + 180) / piNum;
    const yRotaz = (rotation.y + 90) / piNum;
    const yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      const xRota = (rotation.x + 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      const xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    }
  } else if (rotation.y > 90 && rotation.y <= 180) {
    const yRotax = (rotation.y - 180) / piNum;
    const yRotaz = -(rotation.y - 90) / piNum;
    const yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      const xRota = (rotation.x + 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      const xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    }
  }
  return { x: xlocation, y: ylocation, z: zlocation };
}
function getLookRotaionPointsV2(rotation, point, side) {
  const piNum = 90;
  let rotax;
  let rotaz;
  if (rotation.y >= -90 && rotation.y < 0) {
    rotax = -rotation.y / piNum * point + side * ((rotation.y + 90) / piNum);
    rotaz = (rotation.y + 90) / piNum * point + side * (-rotation.y / piNum);
  } else if (rotation.y >= 0 && rotation.y <= 90) {
    rotax = -rotation.y / piNum * point + side * (-(rotation.y + 90) / piNum);
    rotaz = -(rotation.y - 90) / piNum * point + side * (-rotation.y / piNum);
  } else if (rotation.y < -90 && rotation.y > -180) {
    rotax = (rotation.y + 180) / piNum * point + side * ((rotation.y + 90) / piNum);
    rotaz = (rotation.y + 90) / piNum * point + side * ((rotation.y + 180) / piNum);
  } else if (rotation.y > 90 && rotation.y <= 180) {
    rotax = (rotation.y - 180) / piNum * point + side * (-(rotation.y - 90) / piNum);
    rotaz = -(rotation.y - 90) / piNum * point + side * ((rotation.y - 180) / piNum);
  }
  return { x: rotax, z: rotaz };
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
function degToRad(deg) {
  return deg * Math.PI / 180;
}
function normalizeVector(v) {
  const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length
  };
}
function getDirectionVector(thisEn, targetEn) {
  const direction = {
    x: targetEn.x - thisEn.x,
    y: targetEn.y - thisEn.y,
    z: targetEn.z - thisEn.z
  };
  return normalizeVector(direction);
}
function getDistanceLocation(origin, distance) {
  const angleDisPoint = {
    x: Number((origin.x + distance.x).toFixed(3)),
    y: Number((origin.y + distance.y).toFixed(3)),
    z: Number((origin.z + distance.z).toFixed(3))
  };
  return angleDisPoint;
}
function addTeamsTagFilter(player, filterOption) {
  if (filterOption.excludeFamilies == void 0) {
    filterOption.excludeFamilies = ["inanimate", "magic", "arrow"];
  } else {
    filterOption.excludeFamilies.push("inanimate", "magic", "arrow");
  }
  if (!world.gameRules.pvp) {
    filterOption.excludeFamilies.push("player");
  }
  if (filterOption.excludeTypes == void 0) {
    filterOption.excludeTypes = ["item"];
  } else {
    filterOption.excludeTypes.push("item");
  }
  if (filterOption.excludeTags == void 0) {
    filterOption.excludeTags = ["main_shield_guard", "off_shield_guard"];
  } else {
    filterOption.excludeTags.push("main_shield_guard", "off_shield_guard");
  }
  const tags = player.getTags();
  if (tags != void 0 && tags.length > 0) {
    for (const index in tags) {
      if (tags[index].indexOf("team") != -1) {
        filterOption.excludeTags.push(tags[index]);
      }
    }
  }
}
function explodeBedrock(impactBLockList) {
  try {
    const filterBlockList = impactBLockList.filter((block) => {
      if (block.location.y >= -64) {
        if (!block.matches("minecraft:bedrock")) {
          return block;
        }
      }
    });
    return filterBlockList;
  } catch (error) {
  }
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

// scripts/common/MagicItemDurabilityDamage.ts
import { ItemStack, Player as Player2, ItemComponentTypes, EntityComponentTypes, GameMode } from "@minecraft/server";
async function itemDurabilityDamage(entity, item, slot) {
  if (entity instanceof Player2 && entity.getGameMode() != GameMode.Creative) {
    const equ = entity.getComponent(EntityComponentTypes.Equippable);
    const durability = item.getComponent(ItemComponentTypes.Durability);
    const dChangeRang = durability.getDamageChanceRange();
    let dChange = getRandomInRange(dChangeRang.min, dChangeRang.max);
    const enchantable = item.getComponent(ItemComponentTypes.Enchantable);
    const unbreaking = enchantable.getEnchantment(MinecraftEnchantmentTypes.Unbreaking);
    if (unbreaking != void 0) {
      dChange = durability.getDamageChance(unbreaking.level);
    }
    if (durability.damage + dChange >= durability.maxDurability) {
      equ.setEquipment(slot, void 0);
    } else {
      durability.damage = durability.damage + dChange;
      equ.setEquipment(slot, item);
    }
  }
}
async function itemDurabilityDamageFixed(entity, item, slot, damage) {
  if (entity instanceof Player2 && entity.getGameMode() == GameMode.Creative) {
    return;
  }
  const equ = entity.getComponent(EntityComponentTypes.Equippable);
  const durability = item.getComponent(ItemComponentTypes.Durability);
  if (durability.damage + damage >= durability.maxDurability) {
    equ.setEquipment(slot, void 0);
  } else {
    durability.damage = durability.damage + damage;
    equ.setEquipment(slot, item);
  }
}
async function summonGrimoireDurabilityDamage(entity, item, slot) {
  if (entity instanceof Player2 && entity.getGameMode() != GameMode.Creative) {
    const equ = entity.getComponent(EntityComponentTypes.Equippable);
    const durability = item.getComponent(ItemComponentTypes.Durability);
    if (durability.damage + 1 >= durability.maxDurability) {
      equ.setEquipment(slot, void 0);
    } else {
      durability.damage = durability.damage + 1;
      equ.setEquipment(slot, item);
    }
  }
}
async function decrimentGrimoireCount(player, item) {
  if (player.getGameMode() != GameMode.Creative) {
    const lore = item.getLore();
    if (lore.length > 0) {
      let cont = Number(lore[0].substring(3));
      player.onScreenDisplay.setActionBar(cont + "");
      cont--;
      player.onScreenDisplay.setActionBar(cont + "");
      const inventory = player.getComponent(EntityComponentTypes.Inventory);
      const con = inventory.container;
      if (cont == 0) {
        player.onScreenDisplay.setActionBar("grimoire_damage");
        const grimoire_damage = new ItemStack("kurokumaft:grimoire_damage", 1);
        con.setItem(player.selectedSlotIndex, grimoire_damage);
      } else {
        item.setLore(["\u6B8B\u6570\uFF1A" + cont]);
        player.onScreenDisplay.setActionBar(item.getLore());
        con.setItem(player.selectedSlotIndex, item);
      }
    }
  }
}

// scripts/items/weapon/shield/MagicShieldEvent.ts
function magicShieldGuard(player, range) {
  const equ = player.getComponent(EntityComponentTypes2.Equippable);
  const offhand = equ.getEquipment(EquipmentSlot2.Offhand);
  const mainhand = equ.getEquipment(EquipmentSlot2.Mainhand);
  if (player.isSneaking) {
    if (offhand != void 0 && offhand.typeId.indexOf("_shield") != -1) {
      itemDurabilityDamage(player, offhand, EquipmentSlot2.Offhand);
      playsound(player, "item.shield.block");
    } else if (mainhand != void 0 && mainhand.typeId.indexOf("_shield") != -1) {
      itemDurabilityDamage(player, mainhand, EquipmentSlot2.Mainhand);
      playsound(player, "item.shield.block");
    }
  }
}
function magicShieldCounter(player, damager) {
  const equ = player.getComponent(EntityComponentTypes2.Equippable);
  const offhand = equ.getEquipment(EquipmentSlot2.Offhand);
  const mainhand = equ.getEquipment(EquipmentSlot2.Mainhand);
  if (player.isSneaking) {
    if (offhand != void 0 && offhand.typeId == "kurokumaft:fire_magic_shield") {
      damager.applyDamage(3, { "cause": "lava" });
      damager.dimension.spawnParticle("kurokumaft:mobflame_firing", damager.location);
      const intervalNum = system.runInterval(() => {
        if (damager) {
          const health = damager.getComponent(EntityComponentTypes2.Health);
          if (health) {
            damager.applyDamage(3, { "cause": "lava" });
            damager.dimension.spawnParticle("kurokumaft:mobflame_firing", damager.location);
          }
        }
      }, 5);
      system.runTimeout(() => {
        system.clearRun(intervalNum);
      }, 15);
    } else if (mainhand != void 0 && mainhand.typeId == "kurokumaft:fire_magic_shield") {
      damager.applyDamage(3, { "cause": "lava" });
      damager.dimension.spawnParticle("kurokumaft:mobflame_firing", damager.location);
      const intervalNum = system.runInterval(() => {
        if (damager) {
          const health = damager.getComponent(EntityComponentTypes2.Health);
          if (health) {
            damager.applyDamage(3, { "cause": "lava" });
            damager.runCommand("particle kurokumaft:mobflame_firing ~~~");
          }
        }
      }, 5);
      system.runTimeout(() => {
        system.clearRun(intervalNum);
      }, 15);
    }
    if (offhand != void 0 && offhand.typeId == "kurokumaft:water_magic_shield") {
      damager.applyDamage(1, { "cause": "drowning" });
      damager.dimension.spawnParticle("kurokumaft:water_sword_particle", damager.location);
      damager.addEffect("weakness", 600, { "amplifier": 1, "showParticles": true });
    } else if (mainhand != void 0 && mainhand.typeId == "kurokumaft:water_magic_shield") {
      damager.applyDamage(1, { "cause": "drowning" });
      damager.dimension.spawnParticle("kurokumaft:water_sword_particle", damager.location);
      damager.addEffect("weakness", 600, { "amplifier": 1, "showParticles": true });
    }
    if (offhand != void 0 && offhand.typeId == "kurokumaft:wind_magic_shield") {
      const view = player.getViewDirection();
      damager.applyDamage(1, { "cause": "fall" });
      damager.dimension.spawnParticle("kurokumaft:aero_bomb_short_particle", damager.location);
      damager.applyKnockback({ x: Math.round(view.x) * 10, z: Math.round(view.z) * 10 }, 1);
    } else if (mainhand != void 0 && mainhand.typeId == "kurokumaft:wind_magic_shield") {
      const view = player.getViewDirection();
      damager.applyDamage(1, { "cause": "fall" });
      damager.dimension.spawnParticle("kurokumaft:aero_bomb_short_particle", damager.location);
      damager.applyKnockback({ x: Math.round(view.x) * 10, z: Math.round(view.z) * 10 }, 1);
    }
    if (offhand != void 0 && offhand.typeId == "kurokumaft:thunder_magic_shield") {
      damager.applyDamage(3, { "cause": "lightning" });
      damager.dimension.spawnParticle("kurokumaft:snowflake_particle", damager.location);
      const intervalNum = system.runInterval(() => {
        if (damager) {
          const health = damager.getComponent(EntityComponentTypes2.Health);
          if (health) {
            damager.applyDamage(3, { "cause": "lightning" });
            damager.dimension.spawnParticle("kurokumaft:snowflake_particle", damager.location);
          }
        }
      }, 5);
      system.runTimeout(() => {
        system.clearRun(intervalNum);
      }, 15);
    } else if (mainhand != void 0 && mainhand.typeId == "kurokumaft:thunder_magic_shield") {
      damager.applyDamage(3, { "cause": "lightning" });
      damager.dimension.spawnParticle("kurokumaft:thunder_sword_particle", damager.location);
      const intervalNum = system.runInterval(() => {
        if (damager) {
          const health = damager.getComponent(EntityComponentTypes2.Health);
          if (health) {
            damager.applyDamage(3, { "cause": "lightning" });
            damager.dimension.spawnParticle("kurokumaft:thunder_sword_particle", damager.location);
          }
        }
      }, 5);
      system.runTimeout(() => {
        system.clearRun(intervalNum);
      }, 15);
    }
    if (offhand != void 0 && offhand.typeId == "kurokumaft:stone_magic_shield") {
      const view = player.getViewDirection();
      damager.applyDamage(1, { "cause": "piston" });
      damager.dimension.spawnParticle("kurokumaft:grey_bomb_short_particle", damager.location);
      damager.applyKnockback({ x: Math.round(view.x) * 10, z: Math.round(view.z) * 10 }, 1);
    } else if (mainhand != void 0 && mainhand.typeId == "kurokumaft:stone_magic_shield") {
      const view = player.getViewDirection();
      damager.applyDamage(1, { "cause": "piston" });
      damager.dimension.spawnParticle("kurokumaft:grey_bomb_short_particle", damager.location);
      damager.applyKnockback({ x: Math.round(view.x) * 10, z: Math.round(view.z) * 10 }, 1);
    }
    if (offhand != void 0 && offhand.typeId == "kurokumaft:ice_magic_shield") {
      damager.applyDamage(1, { "cause": "freezing" });
      damager.dimension.spawnParticle("kurokumaft:ice_sword_particle", damager.location);
      damager.addEffect("slowness", 200, { "amplifier": 1, "showParticles": false });
    } else if (mainhand != void 0 && mainhand.typeId == "kurokumaft:ice_magic_shield") {
      damager.applyDamage(1, { "cause": "freezing" });
      damager.dimension.spawnParticle("kurokumaft:ice_sword_particle", damager.location);
      damager.addEffect("slowness", 200, { "amplifier": 1, "showParticles": false });
    }
  }
}
async function MagicShieldKnockback(entity) {
  entity.applyKnockback({ x: 1, z: 1 }, 0.2);
  if (entity instanceof Player3) {
    magicShieldGuard(entity, false);
  }
}

// scripts/items/weapon/armor/MagicAmorHitEvent.ts
import { system as system2, EntityComponentTypes as EntityComponentTypes3, EquipmentSlot as EquipmentSlot3 } from "@minecraft/server";
async function hitMagicAmor(player, damager, projectile, hitVector) {
  const equ = player.getComponent(EntityComponentTypes3.Equippable);
  if (!equ) {
    return;
  }
  const chest = equ.getEquipment(EquipmentSlot3.Chest);
  const legs = equ.getEquipment(EquipmentSlot3.Legs);
  const head = equ.getEquipment(EquipmentSlot3.Head);
  if (chest != void 0) {
    if (damager != void 0 && projectile == void 0) {
      if (chest.typeId == "kurokumaft:stone_magic_chestplate" || chest.typeId == "kurokumaft:nether_stone_magic_chestplate") {
        const view = player.getViewDirection();
        damager.applyDamage(5, { "cause": "entityExplosion" });
        damager.dimension.spawnParticle("minecraft:large_explosion", damager.location);
        damager.applyKnockback({ x: Math.round(view.x) * 10, z: Math.round(view.z) * 10 }, 10);
        itemDurabilityDamage(player, chest, EquipmentSlot3.Chest);
      }
      if (chest.typeId == "kurokumaft:lightning_magic_chestplate" || chest.typeId == "kurokumaft:nether_lightning_magic_chest") {
        damager.applyDamage(5, { "cause": "lightning" });
        damager.dimension.spawnParticle("kurokumaft:lightning_arrow_particle", damager.location);
        itemDurabilityDamage(player, chest, EquipmentSlot3.Chest);
      }
    }
  }
  if (legs != void 0) {
    if (damager != void 0 && projectile == void 0) {
      if (legs.typeId == "kurokumaft:lightning_magic_leggings" || legs.typeId == "kurokumaft:nether_lightning_magic_leggings") {
        const location = damager.location;
        const randomNum1 = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
        const randomNum2 = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
        const randomInRange1 = Math.floor(Math.random() * 2) == 1 ? -randomNum1 : randomNum1;
        const randomInRange2 = Math.floor(Math.random() * 2) == 1 ? -randomNum2 : randomNum2;
        damager.teleport({ x: location.x + randomInRange1, y: location.y, z: location.z + randomInRange2 });
        itemDurabilityDamage(player, legs, EquipmentSlot3.Legs);
      }
    }
  }
  if (head != void 0) {
    if ((head.typeId == "kurokumaft:lightning_magic_helmet" || head.typeId == "kurokumaft:nether_lightning_magic_helmet") && projectile != void 0) {
      try {
        projectile.clearVelocity();
        projectile.dimension.spawnParticle("kurokumaft:lightning_arrow_particle", projectile.location);
        const projComp = projectile.getComponent(EntityComponentTypes3.Projectile);
        projComp.stopOnHit = true;
        const intervalNum = system2.runInterval(() => {
          if (!projectile.isValid) {
            projectile.clearVelocity();
          }
        }, 5);
        system2.runTimeout(() => {
          system2.clearRun(intervalNum);
        }, 30);
        itemDurabilityDamage(player, head, EquipmentSlot3.Head);
      } catch (error) {
      }
    }
    if ((head.typeId == "kurokumaft:wind_magic_helmet" || head.typeId == "kurokumaft:nether_wind_magic_helmet") && projectile != void 0) {
      try {
        projectile.clearVelocity();
        projectile.dimension.spawnParticle("kurokumaft:wind_arrow_particle", projectile.location);
        const projComp = projectile.getComponent(EntityComponentTypes3.Projectile);
        projComp.owner = player;
        projComp.shoot(projectile.getViewDirection(), {
          uncertainty: 0
        });
        itemDurabilityDamage(player, head, EquipmentSlot3.Head);
      } catch (error) {
      }
    }
  }
}

// scripts/items/weapon/wand/WandWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot4, ItemComponentTypes as ItemComponentTypes2 } from "@minecraft/server";

// scripts/common/MagicShooterMagicEvent.ts
import { EntityComponentTypes as EntityComponentTypes4 } from "@minecraft/server";
function throwing(player, item, throwItem, ranNum) {
  const bulet = player.dimension.spawnEntity(throwItem, player.getHeadLocation());
  item.amount++;
  const projectile = bulet.getComponent(EntityComponentTypes4.Projectile);
  projectile.owner = player;
  projectile.shoot(player.getViewDirection(), {
    uncertainty: ranNum
  });
}
function shooting(player, throwItem, ranNum, seepd, event) {
  let bulet;
  if (event != void 0) {
    bulet = player.dimension.spawnEntity(throwItem + "<" + event + ">", player.getHeadLocation());
  } else {
    bulet = player.dimension.spawnEntity(throwItem, player.getHeadLocation());
  }
  const projectile = bulet.getComponent(EntityComponentTypes4.Projectile);
  projectile.owner = player;
  projectile.shoot(
    {
      x: player.getViewDirection().x * seepd,
      y: player.getViewDirection().y * seepd,
      z: player.getViewDirection().z * seepd
    },
    {
      uncertainty: ranNum
    }
  );
  return bulet;
}

// scripts/items/weapon/wand/SnowWandMagic.ts
import { EntityDamageCause, Player as Player6 } from "@minecraft/server";
async function powderedSnow(player, hitEntity) {
  player.addTag("powderedSnow_self");
  hitEntity.dimension.spawnParticle("kurokumaft:snow_particle", { x: hitEntity.location.x, y: hitEntity.location.y + 1.8, z: hitEntity.location.z });
  const filterOption = {
    excludeTags: [
      "powderedSnow_self"
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    let damage = 2;
    if (en instanceof Player6) {
      damage = 1;
    }
    en.applyDamage(damage, {
      cause: EntityDamageCause.freezing
    });
  });
  player.removeTag("powderedSnow_self");
}
async function deepSnow(player) {
  player.addTag("deepSnow_self");
  const filterOption = {
    excludeTags: [
      "deepSnow_self"
    ],
    location: player.location,
    maxDistance: 10,
    closest: 1
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    en.dimension.setBlockType({ x: en.location.x, y: en.location.y - 1, z: en.location.z }, "powder_snow");
    en.dimension.setBlockType({ x: en.location.x, y: en.location.y - 1, z: en.location.z + 1 }, "powder_snow");
    en.dimension.setBlockType({ x: en.location.x, y: en.location.y - 1, z: en.location.z - 1 }, "powder_snow");
    en.dimension.setBlockType({ x: en.location.x + 1, y: en.location.y - 1, z: en.location.z }, "powder_snow");
    en.dimension.setBlockType({ x: en.location.x + 1, y: en.location.y - 1, z: en.location.z + 1 }, "powder_snow");
    en.dimension.setBlockType({ x: en.location.x + 1, y: en.location.y - 1, z: en.location.z - 1 }, "powder_snow");
    en.dimension.setBlockType({ x: en.location.x - 1, y: en.location.y - 1, z: en.location.z }, "powder_snow");
    en.dimension.setBlockType({ x: en.location.x - 1, y: en.location.y - 1, z: en.location.z + 1 }, "powder_snow");
    en.dimension.setBlockType({ x: en.location.x - 1, y: en.location.y - 1, z: en.location.z - 1 }, "powder_snow");
  });
  player.removeTag("deepSnow_self");
}
async function icewall(player) {
  const look = getLookRotaionPointsV2(player.getRotation(), 4, 0);
  player.dimension.setBlockType({ x: player.location.x + look.x, y: player.location.y, z: player.location.z + look.z }, MinecraftBlockTypes.Ice);
  player.dimension.setBlockType({ x: player.location.x + look.x, y: player.location.y + 1, z: player.location.z + look.z }, MinecraftBlockTypes.Ice);
}

// scripts/items/weapon/wand/DarkWandMagic.ts
import { EntityDamageCause as EntityDamageCause2, Player as Player7, TicksPerSecond } from "@minecraft/server";
async function darkBread(player, hitEntity) {
  player.addTag("darkBread_self");
  hitEntity.dimension.spawnParticle("kurokumaft:dark_bread_particle", { x: hitEntity.location.x, y: hitEntity.location.y + 0.8, z: hitEntity.location.z });
  const filterOption = {
    propertyOption: [
      {
        propertyId: player.id,
        exclude: true
      }
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    let damage = 2;
    if (en instanceof Player7) {
      damage = 1;
    }
    en.applyDamage(damage, {
      cause: EntityDamageCause2.wither
    });
  });
  player.removeTag("darkBread_self");
}
async function absorption(player) {
  player.addEffect(MinecraftEffectTypes.Absorption, 10 * TicksPerSecond, {
    amplifier: 1
  });
}
async function invisibility(player) {
  player.addEffect(MinecraftEffectTypes.Invisibility, 20 * TicksPerSecond, {
    amplifier: 5
  });
}

// scripts/items/weapon/wand/LightWandMagic.ts
import { EntityDamageCause as EntityDamageCause3, Player as Player8, TicksPerSecond as TicksPerSecond2 } from "@minecraft/server";
async function lightBread(player, hitEntity) {
  player.addTag("lightBread_self");
  hitEntity.dimension.spawnParticle("kurokumaft:light_bread_particle", { x: hitEntity.location.x, y: hitEntity.location.y + 0.8, z: hitEntity.location.z });
  const filterOption = {
    excludeTags: [
      "lightBread_self"
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = hitEntity.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    let damage = 2;
    if (en instanceof Player8) {
      damage = 1;
    }
    en.applyDamage(damage, {
      cause: EntityDamageCause3.soulCampfire
    });
  });
  player.removeTag("lightBread_self");
}
async function healing(player) {
  player.addEffect(MinecraftEffectTypes.InstantHealth, 1 * TicksPerSecond2, {
    amplifier: 1
  });
}
async function recovery(player) {
  player.runCommand("/effect " + player.nameTag + " clear");
}

// scripts/items/weapon/wand/WaterMagic.ts
import { EntityDamageCause as EntityDamageCause4, Player as Player9 } from "@minecraft/server";
async function splash(player, hitEntity) {
  player.addTag("splash_self");
  hitEntity.dimension.spawnParticle("kurokumaft:water_particle", { x: hitEntity.location.x, y: hitEntity.location.y + 1.8, z: hitEntity.location.z });
  const filterOption = {
    excludeTags: [
      "splash_self"
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    let damage = 2;
    if (en instanceof Player9) {
      damage = 1;
    }
    en.applyDamage(damage, {
      cause: EntityDamageCause4.drowning
    });
  });
  player.removeTag("splash_self");
}
async function waterwall(player) {
  const look = getLookRotaionPointsV2(player.getRotation(), 4, 0);
  player.dimension.setBlockType({ x: player.location.x + look.x, y: player.location.y, z: player.location.z + look.z }, "kurokumaft:waterwall_block");
  player.dimension.setBlockType({ x: player.location.x + look.x, y: player.location.y + 1, z: player.location.z + look.z }, "kurokumaft:waterwall_block");
}
function waterball(entity) {
  if (entity.location.y > -64) {
    entity.dimension.spawnParticle("kurokumaft:water_particle", entity.location);
  }
}

// scripts/items/weapon/wand/FireMagic.ts
import { EntityDamageCause as EntityDamageCause5, Player as Player10 } from "@minecraft/server";
async function burstRondo(player, hitEntity) {
  player.addTag("burstRondo_self");
  hitEntity.dimension.spawnParticle("kurokumaft:fire_particle", { x: hitEntity.location.x, y: hitEntity.location.y + 0.8, z: hitEntity.location.z });
  const filterOption = {
    excludeTags: [
      "burstRondo_self"
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = hitEntity.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    let damage = 2;
    if (en instanceof Player10) {
      damage = 1;
    }
    en.applyDamage(damage, {
      cause: EntityDamageCause5.fire
    });
  });
  player.removeTag("burstRondo_self");
}
async function firewall(player) {
  const look = getLookRotaionPointsV2(player.getRotation(), 4, 0);
  player.dimension.setBlockType({ x: player.location.x + look.x, y: player.location.y, z: player.location.z + look.z }, MinecraftBlockTypes.Magma);
  player.dimension.setBlockType({ x: player.location.x + look.x, y: player.location.y + 1, z: player.location.z + look.z }, MinecraftBlockTypes.Magma);
}
function fireball(entity) {
  if (entity.location.y > -64) {
    entity.dimension.spawnParticle("kurokumaft:fire_particle", entity.location);
  }
}

// scripts/items/weapon/wand/WindMagic.ts
import { EntityDamageCause as EntityDamageCause6, Player as Player11 } from "@minecraft/server";
async function windEdge(player, hitEntity) {
  player.addTag("wind_edge_self");
  hitEntity.dimension.spawnParticle("kurokumaft:wind_particle", { x: hitEntity.location.x, y: hitEntity.location.y + 1.8, z: hitEntity.location.z });
  const filterOption = {
    excludeTags: [
      "wind_edge_self"
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    let damage = 2;
    if (en instanceof Player11) {
      damage = 1;
    }
    en.applyDamage(damage, {
      cause: EntityDamageCause6.flyIntoWall
    });
  });
  player.removeTag("wind_edge_self");
}
async function windwall(player) {
  const look = getLookRotaionPointsV2(player.getRotation(), 4, 0);
  player.dimension.setBlockType({ x: player.location.x + look.x, y: player.location.y, z: player.location.z + look.z }, "kurokumaft:windwall_block");
  player.dimension.setBlockType({ x: player.location.x + look.x, y: player.location.y + 1, z: player.location.z + look.z }, "kurokumaft:windwall_block");
}
function windcutter(entity) {
  if (entity.location.y > -64) {
    entity.dimension.spawnParticle("kurokumaft:wind_particle", entity.location);
  }
}

// scripts/items/weapon/wand/StoneMagic.ts
import { EntityDamageCause as EntityDamageCause7, Player as Player12 } from "@minecraft/server";
async function sandBlast(player, hitEntity) {
  player.addTag("sand_blast_self");
  player.dimension.spawnParticle("kurokumaft:sand_particle", { x: hitEntity.location.x, y: hitEntity.location.y + 1.8, z: hitEntity.location.z });
  const filterOption = {
    excludeTags: [
      "sand_blast_self"
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    let damage = 2;
    if (en instanceof Player12) {
      damage = 1;
    }
    en.applyDamage(damage, {
      cause: EntityDamageCause7.stalagmite
    });
  });
  player.removeTag("sand_blast_self");
}
async function stonewall(player) {
  const look = getLookRotaionPointsV2(player.getRotation(), 4, 0);
  player.dimension.setBlockType({ x: player.location.x + look.x, y: player.location.y, z: player.location.z + look.z }, MinecraftBlockTypes.Basalt);
  player.dimension.setBlockType({ x: player.location.x + look.x, y: player.location.y + 1, z: player.location.z + look.z }, MinecraftBlockTypes.Basalt);
}
function stonebarrette(entity) {
  if (entity.location.y > -64) {
    entity.dimension.spawnParticle("kurokumaft:stone_particle", entity.location);
  }
}

// scripts/items/weapon/wand/LightningMagic.ts
import { EntityDamageCause as EntityDamageCause8, Player as Player13 } from "@minecraft/server";
async function spark(player, hitEntity) {
  player.addTag("spark_self");
  player.dimension.spawnParticle("kurokumaft:spark_particle", { x: hitEntity.location.x, y: hitEntity.location.y + 0.8, z: hitEntity.location.z });
  const filterOption = {
    excludeTags: [
      "spark_self"
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    let damage = 2;
    if (en instanceof Player13) {
      damage = 1;
    }
    en.applyDamage(damage, {
      cause: EntityDamageCause8.lightning
    });
  });
  player.removeTag("spark_self");
}
async function lightningwall(player) {
  const look = getLookRotaionPointsV2(player.getRotation(), 4, 0);
  player.dimension.setBlockType({ x: player.location.x + look.x, y: player.location.y, z: player.location.z + look.z }, "kurokumaft:lightningwall_block");
  player.dimension.setBlockType({ x: player.location.x + look.x, y: player.location.y + 1, z: player.location.z + look.z }, "kurokumaft:lightningwall_block");
}
function lightningbolt(entity) {
  if (entity.location.y > -64) {
    entity.dimension.spawnParticle("kurokumaft:lightning_particle", entity.location);
  }
}

// scripts/items/weapon/wand/WandWeaponMagic.ts
var WandHitObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_wand",
    event: "",
    func: burstRondo,
    sendMsg: "magic.kurokumaft:burstRondo.translate"
  },
  {
    itemName: "kurokumaft:water_wand",
    event: "",
    func: splash,
    sendMsg: "magic.kurokumaft:splash.translate"
  },
  {
    itemName: "kurokumaft:wind_wand",
    event: "",
    func: windEdge,
    sendMsg: "magic.kurokumaft:windEdge.translate"
  },
  {
    itemName: "kurokumaft:stone_wand",
    event: "",
    func: sandBlast,
    sendMsg: "magic.kurokumaft:sandBlast.translate"
  },
  {
    itemName: "kurokumaft:lightning_wand",
    event: "",
    func: spark,
    sendMsg: "magic.kurokumaft:spark.translate"
  },
  {
    itemName: "kurokumaft:snow_wand",
    event: "",
    func: powderedSnow,
    sendMsg: "magic.kurokumaft:powderedSnow.translate"
  },
  {
    itemName: "kurokumaft:dark_wand",
    event: "",
    func: darkBread,
    sendMsg: "magic.kurokumaft:darkBread.translate"
  },
  {
    itemName: "kurokumaft:light_wand",
    event: "",
    func: lightBread,
    sendMsg: "magic.kurokumaft:lightBread.translate"
  }
]);
var BallMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_wand",
    event: "kurokumaft:fireballmagic",
    sendMsg: "magic.kurokumaft:fireball.translate"
  },
  {
    itemName: "kurokumaft:water_wand",
    event: "kurokumaft:waterballmagic",
    sendMsg: "magic.kurokumaft:waterball.translate"
  },
  {
    itemName: "kurokumaft:wind_wand",
    event: "kurokumaft:windcuttermagic",
    sendMsg: "magic.kurokumaft:windcutter.translate"
  },
  {
    itemName: "kurokumaft:stone_wand",
    event: "kurokumaft:stonebarrettemagic",
    sendMsg: "magic.kurokumaft:stonebarrette.translate"
  },
  {
    itemName: "kurokumaft:lightning_wand",
    event: "kurokumaft:lightningboltmagic",
    sendMsg: "magic.kurokumaft:lightningbolt.translate"
  }
]);
var WallMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_wand",
    event: "",
    func: firewall,
    sendMsg: "magic.kurokumaft:firewall.translate"
  },
  {
    itemName: "kurokumaft:water_wand",
    event: "",
    func: waterwall,
    sendMsg: "magic.kurokumaft:waterwall.translate"
  },
  {
    itemName: "kurokumaft:wind_wand",
    event: "",
    func: windwall,
    sendMsg: "magic.kurokumaft:windwall.translate"
  },
  {
    itemName: "kurokumaft:stone_wand",
    event: "",
    func: stonewall,
    sendMsg: "magic.kurokumaft:stonewall.translate"
  },
  {
    itemName: "kurokumaft:lightning_wand",
    event: "",
    func: lightningwall,
    sendMsg: "magic.kurokumaft:lightningwall.translate"
  },
  {
    itemName: "kurokumaft:snow_wand",
    event: "",
    func: icewall,
    sendMsg: "magic.kurokumaft:icewall.translate"
  }
]);
var OtherUpMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:snow_wand",
    event: "",
    func: deepSnow,
    sendMsg: "magic.kurokumaft:deepSnow.translate"
  },
  {
    itemName: "kurokumaft:dark_wand",
    event: "",
    func: absorption,
    sendMsg: "magic.kurokumaft:absorption.translate"
  },
  {
    itemName: "kurokumaft:light_wand",
    event: "",
    func: healing,
    sendMsg: "magic.kurokumaft:healing.translate"
  }
]);
var OtherDownMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:dark_wand",
    event: "",
    func: invisibility,
    sendMsg: "\xA78\u30A4\u30F3\u30D3\u30B8\u30D6\u30EB"
  },
  {
    itemName: "kurokumaft:light_wand",
    event: "",
    func: recovery,
    sendMsg: "\xA7e\u30EA\u30AB\u30D0\u30EA\u30FC"
  }
]);
var WandWeaponMagic = class {
  // 通常攻撃
  onHitEntity(event) {
    const itemStack = event.itemStack;
    const attackEntity = event.attackingEntity;
    const hitEntity = event.hitEntity;
    const effect = event.hadEffect;
    if (!itemStack) {
      return;
    }
    const wandMagic = WandHitObjects.find((obj) => obj.itemName == itemStack.typeId);
    wandMagic.func(attackEntity, hitEntity);
    attackEntity.onScreenDisplay.setActionBar({ rawtext: [{ translate: wandMagic.sendMsg }] });
  }
  // 右クリック
  onUse(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    let wandMagic;
    if (player.isSneaking) {
      wandMagic = WallMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
      if (wandMagic) {
        wandMagic.func(player);
      } else {
        wandMagic = OtherDownMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        wandMagic.func(player);
      }
    } else {
      wandMagic = BallMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
      if (wandMagic) {
        throwing(player, itemStack, wandMagic.event, 2.5);
      } else {
        wandMagic = OtherUpMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        wandMagic.func(player);
      }
    }
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: wandMagic.sendMsg }] });
    itemDurabilityDamage(player, itemStack, EquipmentSlot4.Mainhand);
    const cool = itemStack.getComponent(ItemComponentTypes2.Cooldown);
    cool.startCooldown(player);
  }
};
var WandProjectileObjects = Object.freeze([
  {
    itemName: "kurokumaft:fireballmagic",
    func: fireball,
    event: "",
    sendMsg: ""
  },
  {
    itemName: "kurokumaft:waterballmagic",
    func: waterball,
    event: "",
    sendMsg: ""
  },
  {
    itemName: "kurokumaft:windcuttermagic",
    func: windcutter,
    event: "",
    sendMsg: ""
  },
  {
    itemName: "kurokumaft:stonebarrettemagic",
    func: stonebarrette,
    event: "",
    sendMsg: ""
  },
  {
    itemName: "kurokumaft:lightningboltmagic",
    func: lightningbolt,
    event: "",
    sendMsg: ""
  }
]);
function checkWandProjectile(projectileName) {
  return WandProjectileObjects.some((obj) => obj.itemName == projectileName);
}
function hitWandProjectileEvent(projectile) {
  const proje = WandProjectileObjects.find((obj) => obj.itemName == projectile.typeId);
  try {
    proje.func(projectile);
    projectile.remove();
  } catch (error) {
  }
}

// scripts/items/weapon/sword/SwordWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot5 } from "@minecraft/server";

// scripts/items/weapon/sword/FireSwordMagic.ts
import { EntityDamageCause as EntityDamageCause9, Player as Player15, world as world3 } from "@minecraft/server";
async function fireSword(player, entity) {
  entity.dimension.spawnParticle("kurokumaft:fire_sword_slash", entity.location);
  entity.dimension.spawnEntity(
    "kurokumaft:fire_sword_magic",
    {
      x: entity.location.x,
      y: entity.location.y + 0.75,
      z: entity.location.z
    }
  );
  if (entity instanceof Player15) {
    if (world3.gameRules.pvp) {
      entity.applyDamage(10, {
        cause: EntityDamageCause9.fire
      });
    }
  } else {
    entity.applyDamage(60, {
      cause: EntityDamageCause9.fire
    });
  }
}
async function blazeBurst(player) {
  player.addTag("blazeBurst_self");
  player.dimension.spawnParticle("kurokumaft:explosion_shell", player.location);
  player.dimension.spawnParticle("kurokumaft:explosion_wave", player.location);
  const filterOption = {
    excludeTags: [
      "blazeBurst_self"
    ],
    location: player.location,
    maxDistance: 5
  };
  addTeamsTagFilter(player, filterOption);
  const entitys = player.dimension.getEntities(filterOption);
  entitys.forEach((en) => {
    en.dimension.spawnEntity(
      "kurokumaft:fire_sword_magic",
      {
        x: en.location.x,
        y: en.location.y + 0.75,
        z: en.location.z
      }
    );
    let damage = 60;
    if (en instanceof Player15) {
      damage = 20;
    }
    en.applyDamage(damage, {
      cause: EntityDamageCause9.fire
    });
  });
  player.removeTag("blazeBurst_self");
}
async function fireSwordMons(attack, hit) {
  hit.dimension.spawnParticle("kurokumaft:fire_sword_slash", hit.location);
  hit.dimension.spawnEntity(
    "kurokumaft:fire_sword_magic",
    {
      x: hit.location.x,
      y: hit.location.y + 0.75,
      z: hit.location.z
    }
  );
  if (hit instanceof Player15) {
    hit.applyDamage(5, {
      cause: EntityDamageCause9.fire
    });
  } else {
    hit.applyDamage(15, {
      cause: EntityDamageCause9.fire
    });
  }
}

// scripts/items/weapon/sword/WaterSwordMagic.ts
import { EntityDamageCause as EntityDamageCause10, Player as Player16, TicksPerSecond as TicksPerSecond3, world as world4 } from "@minecraft/server";
async function waterSword(player, entity) {
  entity.dimension.spawnParticle("kurokumaft:water_sword_slash", entity.location);
  if (entity instanceof Player16) {
    if (world4.gameRules.pvp) {
      entity.applyDamage(2, {
        cause: EntityDamageCause10.drowning
      });
      entity.addEffect(MinecraftEffectTypes.Slowness, 10 * TicksPerSecond3, {
        amplifier: 2
      });
    }
  } else {
    entity.applyDamage(10, {
      cause: EntityDamageCause10.drowning
    });
    entity.addEffect(MinecraftEffectTypes.Slowness, 10 * TicksPerSecond3, {
      amplifier: 10
    });
  }
}
async function waterSwordMons(attack, hit) {
  hit.dimension.spawnParticle("kurokumaft:water_sword_slash", hit.location);
  if (hit instanceof Player16) {
    hit.applyDamage(2, {
      cause: EntityDamageCause10.drowning
    });
    hit.addEffect(MinecraftEffectTypes.Slowness, 10 * TicksPerSecond3, {
      amplifier: 2
    });
  } else {
    hit.applyDamage(10, {
      cause: EntityDamageCause10.drowning
    });
    hit.addEffect(MinecraftEffectTypes.Slowness, 10 * TicksPerSecond3, {
      amplifier: 10
    });
  }
}

// scripts/items/weapon/sword/WindSwordMagic.ts
import { EntityDamageCause as EntityDamageCause11, Player as Player17, world as world5 } from "@minecraft/server";
async function windSword(player, entity) {
  entity.dimension.spawnParticle("kurokumaft:wind_roar_particle", entity.location);
  entity.dimension.spawnEntity(
    "kurokumaft:wind_sword_knockback_roar<player_roar>",
    {
      x: entity.location.x,
      y: entity.location.y + 0.75,
      z: entity.location.z
    }
  );
  if (entity instanceof Player17) {
    if (world5.gameRules.pvp) {
      entity.applyDamage(2, {
        cause: EntityDamageCause11.fallingBlock
      });
    }
  } else {
    entity.applyDamage(10, {
      cause: EntityDamageCause11.fallingBlock
    });
  }
}
async function windSwordMons(attack, hit) {
  hit.dimension.spawnParticle("kurokumaft:wind_roar_particle", hit.location);
  hit.dimension.spawnEntity(
    "kurokumaft:wind_sword_knockback_roar<monster_roar>",
    {
      x: hit.location.x,
      y: hit.location.y + 0.75,
      z: hit.location.z
    }
  );
  if (hit instanceof Player17) {
    if (world5.gameRules.pvp) {
      hit.applyDamage(2, {
        cause: EntityDamageCause11.fallingBlock
      });
    }
  } else {
    hit.applyDamage(10, {
      cause: EntityDamageCause11.fallingBlock
    });
  }
}

// scripts/items/weapon/sword/StoneSwordMagic.ts
import { EntityDamageCause as EntityDamageCause12, Player as Player18, TicksPerSecond as TicksPerSecond4, world as world6 } from "@minecraft/server";
async function stoneSword(player, entity) {
  entity.dimension.spawnParticle("kurokumaft:stone_sword_slash", entity.location);
  if (entity instanceof Player18) {
    if (world6.gameRules.pvp) {
      entity.applyDamage(2, {
        cause: EntityDamageCause12.fallingBlock
      });
      entity.addEffect(MinecraftEffectTypes.Weakness, 20 * TicksPerSecond4, {
        amplifier: 2
      });
    }
  } else {
    entity.applyDamage(5, {
      cause: EntityDamageCause12.fallingBlock
    });
    entity.addEffect(MinecraftEffectTypes.Weakness, 100 * TicksPerSecond4, {
      amplifier: 50
    });
  }
}
async function stoneSwordMons(attack, hit) {
  hit.dimension.spawnParticle("kurokumaft:water_sword_slash", hit.location);
  if (hit instanceof Player18) {
    hit.applyDamage(2, {
      cause: EntityDamageCause12.fallingBlock
    });
    hit.addEffect(MinecraftEffectTypes.Weakness, 10 * TicksPerSecond4, {
      amplifier: 1
    });
  } else {
    hit.applyDamage(5, {
      cause: EntityDamageCause12.fallingBlock
    });
    hit.addEffect(MinecraftEffectTypes.Weakness, 100 * TicksPerSecond4, {
      amplifier: 50
    });
  }
}

// scripts/items/weapon/sword/ThunderSwordMagic.ts
import { EntityDamageCause as EntityDamageCause13, world as world7 } from "@minecraft/server";
async function thunderSword(player, entity) {
  player.addTag("thunder_sword_slash_self");
  entity.dimension.spawnParticle("kurokumaft:thunder_sword_slash", entity.location);
  const entitys = player.dimension.getEntities({
    excludeFamilies: [
      "player",
      "inanimate",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    excludeTags: [
      "thunder_sword_slash_self"
    ],
    location: entity.location,
    maxDistance: 5
  });
  entitys.forEach((en) => {
    en.dimension.spawnEntity(
      "kurokumaft:thunder_sword_magic",
      {
        x: en.location.x,
        y: en.location.y + 0.75,
        z: en.location.z
      }
    );
    en.applyDamage(25, {
      cause: EntityDamageCause13.lightning
    });
    en.addTag("thunder_sword_slash_target");
  });
  if (world7.gameRules.pvp) {
    const filterOption = {
      excludeFamilies: [
        "inanimate"
      ],
      excludeTypes: [
        "item"
      ],
      excludeTags: [
        "thunder_sword_slash_target",
        "thunder_sword_slash_self"
      ],
      location: entity.location,
      maxDistance: 5
    };
    addTeamsTagFilter(player, filterOption);
    const others = player.dimension.getEntities(filterOption);
    others.forEach((en) => {
      en.dimension.spawnEntity(
        "kurokumaft:thunder_sword_magic",
        {
          x: en.location.x,
          y: en.location.y + 0.75,
          z: en.location.z
        }
      );
      en.applyDamage(8, {
        cause: EntityDamageCause13.lightning
      });
    });
    entitys.forEach((en) => {
      en.removeTag("thunder_sword_slash_target");
    });
    player.removeTag("thunder_sword_slash_self");
  }
}
async function thunderSwordMons(attack, hit) {
  attack.addTag("thunder_sword_slash_self");
  hit.dimension.spawnParticle("kurokumaft:thunder_sword_slash", hit.location);
  const entitys = attack.dimension.getEntities({
    excludeFamilies: [
      "player",
      "inanimate",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    excludeTags: [
      "thunder_sword_slash_self"
    ],
    location: hit.location,
    maxDistance: 5
  });
  entitys.forEach((en) => {
    en.dimension.spawnEntity(
      "kurokumaft:thunder_sword_magic",
      {
        x: en.location.x,
        y: en.location.y + 0.75,
        z: en.location.z
      }
    );
    en.applyDamage(25, {
      cause: EntityDamageCause13.lightning
    });
    en.addTag("thunder_sword_slash_target");
  });
  const filterOption = {
    excludeFamilies: [
      "inanimate"
    ],
    excludeTypes: [
      "item"
    ],
    excludeTags: [
      "thunder_sword_slash_target",
      "thunder_sword_slash_self"
    ],
    location: hit.location,
    maxDistance: 5
  };
  const others = attack.dimension.getEntities(filterOption);
  others.forEach((en) => {
    en.dimension.spawnEntity(
      "kurokumaft:thunder_sword_magic",
      {
        x: en.location.x,
        y: en.location.y + 0.75,
        z: en.location.z
      }
    );
    en.applyDamage(4, {
      cause: EntityDamageCause13.lightning
    });
  });
  entitys.forEach((en) => {
    en.removeTag("thunder_sword_slash_target");
  });
  attack.removeTag("thunder_sword_slash_self");
}

// scripts/items/weapon/sword/IceSwordMagic.ts
import { EntityDamageCause as EntityDamageCause14, Player as Player20, TicksPerSecond as TicksPerSecond5, world as world8 } from "@minecraft/server";
async function iceSword(player, entity) {
  entity.dimension.spawnParticle("kurokumaft:ice_sword_slash", entity.location);
  if (entity instanceof Player20) {
    if (world8.gameRules.pvp) {
      entity.addEffect(MinecraftEffectTypes.InstantHealth, 10 * TicksPerSecond5, {
        amplifier: 2
      });
    }
  } else {
    entity.applyDamage(25, {
      cause: EntityDamageCause14.freezing
    });
    entity.addEffect(MinecraftEffectTypes.Poison, 20 * TicksPerSecond5, {
      amplifier: 10
    });
  }
}
async function iceSwordMons(attack, hit) {
  hit.dimension.spawnParticle("kurokumaft:ice_sword_slash", hit.location);
  if (hit instanceof Player20) {
    hit.applyDamage(2, {
      cause: EntityDamageCause14.freezing
    });
    hit.addEffect(MinecraftEffectTypes.Poison, 10 * TicksPerSecond5, {
      amplifier: 2
    });
  } else {
    hit.applyDamage(15, {
      cause: EntityDamageCause14.freezing
    });
    hit.addEffect(MinecraftEffectTypes.Poison, 20 * TicksPerSecond5, {
      amplifier: 10
    });
  }
}

// scripts/items/weapon/sword/DarkSwordMagic.ts
import { EntityDamageCause as EntityDamageCause15, Player as Player21, TicksPerSecond as TicksPerSecond6, world as world9 } from "@minecraft/server";
async function darkSword(player, entity) {
  entity.dimension.spawnParticle("kurokumaft:dark_sword_slash", entity.location);
  if (entity instanceof Player21) {
    if (world9.gameRules.pvp) {
      entity.applyDamage(5, {
        cause: EntityDamageCause15.wither
      });
      entity.addEffect(MinecraftEffectTypes.Wither, 10 * TicksPerSecond6, {
        amplifier: 5
      });
    }
  } else {
    entity.applyDamage(15, {
      cause: EntityDamageCause15.wither
    });
    entity.addEffect(MinecraftEffectTypes.Wither, 20 * TicksPerSecond6, {
      amplifier: 15
    });
  }
}
async function darkSwordMons(attack, hit) {
  hit.dimension.spawnParticle("kurokumaft:dark_sword_slash", hit.location);
  if (hit instanceof Player21) {
    hit.applyDamage(3, {
      cause: EntityDamageCause15.wither
    });
    hit.addEffect(MinecraftEffectTypes.Wither, 10 * TicksPerSecond6, {
      amplifier: 3
    });
  } else {
    hit.applyDamage(15, {
      cause: EntityDamageCause15.wither
    });
    hit.addEffect(MinecraftEffectTypes.Wither, 20 * TicksPerSecond6, {
      amplifier: 15
    });
  }
}

// scripts/items/weapon/sword/HollySwordMagic.ts
import { TicksPerSecond as TicksPerSecond7 } from "@minecraft/server";
async function hollySword(player, entity) {
  entity.dimension.spawnParticle("kurokumaft:holly_sword_slash", entity.location);
  const entitys = entity.dimension.getEntities({
    excludeFamilies: [
      "inanimate",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    location: entity.location,
    maxDistance: 7
  });
  entitys.forEach((en) => {
    en.addEffect(MinecraftEffectTypes.InstantHealth, 1 * TicksPerSecond7, {
      amplifier: 10,
      showParticles: false
    });
  });
}
async function hollySwordMons(attack, hit) {
  hit.dimension.spawnParticle("kurokumaft:holly_sword_slash", hit.location);
  const entitys = hit.dimension.getEntities({
    excludeFamilies: [
      "inanimate",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    location: hit.location,
    maxDistance: 7
  });
  entitys.forEach((en) => {
    en.addEffect(MinecraftEffectTypes.InstantHealth, 1 * TicksPerSecond7, {
      amplifier: 10,
      showParticles: false
    });
  });
}

// scripts/items/weapon/sword/RainbowSwordMagic.ts
import { EntityDamageCause as EntityDamageCause16, Player as Player23, TicksPerSecond as TicksPerSecond8, world as world10 } from "@minecraft/server";
async function rainbowSword(player, entity) {
  player.addTag("rainbow_sword");
  entity.dimension.spawnParticle("kurokumaft:rainbow_sword_slash", entity.location);
  if (entity instanceof Player23) {
    if (world10.gameRules.pvp) {
      entity.applyDamage(5, {
        cause: EntityDamageCause16.fire
      });
      entity.applyDamage(5, {
        cause: EntityDamageCause16.lightning
      });
      entity.applyDamage(5, {
        cause: EntityDamageCause16.freezing
      });
      entity.addEffect(MinecraftEffectTypes.Weakness, 10 * TicksPerSecond8, {
        amplifier: 10
      });
      entity.addEffect(MinecraftEffectTypes.Wither, 10 * TicksPerSecond8, {
        amplifier: 1
      });
      entity.addEffect(MinecraftEffectTypes.Slowness, 10 * TicksPerSecond8, {
        amplifier: 1
      });
      entity.addEffect(MinecraftEffectTypes.Blindness, 3 * TicksPerSecond8, {
        amplifier: 1
      });
    }
  } else {
    entity.applyDamage(20, {
      cause: EntityDamageCause16.fire
    });
    entity.applyDamage(20, {
      cause: EntityDamageCause16.lightning
    });
    entity.applyDamage(20, {
      cause: EntityDamageCause16.freezing
    });
    entity.addEffect(MinecraftEffectTypes.Weakness, 20 * TicksPerSecond8, {
      amplifier: 15
    });
    entity.addEffect(MinecraftEffectTypes.Wither, 20 * TicksPerSecond8, {
      amplifier: 10
    });
    entity.addEffect(MinecraftEffectTypes.Slowness, 20 * TicksPerSecond8, {
      amplifier: 10
    });
    entity.addEffect(MinecraftEffectTypes.Blindness, 3 * TicksPerSecond8, {
      amplifier: 15
    });
  }
  player.removeTag("rainbow_sword");
}

// scripts/items/weapon/sword/SwordWeaponMagic.ts
var SwordHitObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_sword",
    func: fireSword,
    sendMsg: "magic.kurokumaft:fireSword.translate"
  },
  {
    itemName: "kurokumaft:water_magic_sword",
    func: waterSword,
    sendMsg: "magic.kurokumaft:waterSword.translate"
  },
  {
    itemName: "kurokumaft:wind_magic_sword",
    func: windSword,
    sendMsg: "magic.kurokumaft:windSword.translate"
  },
  {
    itemName: "kurokumaft:stone_magic_sword",
    func: stoneSword,
    sendMsg: "magic.kurokumaft:stoneSword.translate"
  },
  {
    itemName: "kurokumaft:thunder_magic_sword",
    func: thunderSword,
    sendMsg: "magic.kurokumaft:thunderSword.translate"
  },
  {
    itemName: "kurokumaft:ice_magic_sword",
    func: iceSword,
    sendMsg: "magic.kurokumaft:iceSword.translate"
  },
  {
    itemName: "kurokumaft:dark_magic_sword",
    func: darkSword,
    sendMsg: "magic.kurokumaft:darkSword.translate"
  },
  {
    itemName: "kurokumaft:holly_magic_sword",
    func: hollySword,
    sendMsg: "magic.kurokumaft:hollySword.translate"
  },
  {
    itemName: "kurokumaft:rainbow_magic_sword",
    func: rainbowSword,
    sendMsg: "magic.kurokumaft:rainbowSword.translate"
  },
  {
    itemName: "kurokumaft:phoenix_sword",
    func: fireSword,
    sendMsg: "magic.kurokumaft:fireSword.translate"
  }
]);
var SwordHitMonsObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_sword",
    func: fireSwordMons
  },
  {
    itemName: "kurokumaft:water_magic_sword",
    func: waterSwordMons
  },
  {
    itemName: "kurokumaft:wind_magic_sword",
    func: windSwordMons
  },
  {
    itemName: "kurokumaft:stone_magic_sword",
    func: stoneSwordMons
  },
  {
    itemName: "kurokumaft:thunder_magic_sword",
    func: thunderSwordMons
  },
  {
    itemName: "kurokumaft:ice_magic_sword",
    func: iceSwordMons
  },
  {
    itemName: "kurokumaft:dark_magic_sword",
    func: darkSwordMons
  },
  {
    itemName: "kurokumaft:holly_magic_sword",
    func: hollySwordMons
  }
]);
var SwordChargeObjects = Object.freeze([
  {
    itemName: "kurokumaft:phoenix_sword",
    func: blazeBurst,
    sendMsg: "magic.kurokumaft:blazeBurst.translate"
  }
]);
var SwordWeaponMagic = class {
  // 通常攻撃
  onHitEntity(event) {
    const itemStack = event.itemStack;
    const attackEntity = event.attackingEntity;
    const hitEntity = event.hitEntity;
    const effect = event.hadEffect;
    if (!itemStack) {
      return;
    }
    const swordMagicObject = SwordHitObjects.find((obj) => obj.itemName == itemStack.typeId);
    attackEntity.onScreenDisplay.setActionBar({ rawtext: [{ translate: swordMagicObject.sendMsg }] });
    swordMagicObject.func(attackEntity, hitEntity);
  }
  // チャージ完了
  onCompconsteUse(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    if (!itemStack) {
      return;
    }
    const swordChargeMagicObject = SwordChargeObjects.find((obj) => obj.itemName == itemStack.typeId);
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: swordChargeMagicObject.sendMsg }] });
    swordChargeMagicObject.func(player);
    itemDurabilityDamage(player, itemStack, EquipmentSlot5.Mainhand);
  }
};
var SwordWeaponMagicMons = class {
  // 通常攻撃
  onHitEntity(event) {
    const itemStack = event.itemStack;
    const attackEntity = event.attackingEntity;
    const hitEntity = event.hitEntity;
    const effect = event.hadEffect;
    if (!itemStack) {
      return;
    }
    const swordMagicObject = SwordHitMonsObjects.find((obj) => obj.itemName == itemStack.typeId);
    swordMagicObject.func(attackEntity, hitEntity);
    itemDurabilityDamage(attackEntity, itemStack, EquipmentSlot5.Mainhand);
  }
};

// scripts/items/weapon/bow/BowWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot6, TicksPerSecond as TicksPerSecond17 } from "@minecraft/server";

// scripts/items/weapon/bow/FireArrowMagic.ts
import { EntityDamageCause as EntityDamageCause17, Player as Player25, system as system3, TicksPerSecond as TicksPerSecond9, world as world11 } from "@minecraft/server";
async function fireArrow(entity) {
  const intervalNum = system3.runInterval(() => {
    if (entity.isValid) {
      if (entity instanceof Player25) {
        if (world11.gameRules.pvp) {
          entity.applyDamage(1, {
            cause: EntityDamageCause17.fireTick
          });
          entity.setOnFire(10, true);
        }
      } else {
        entity.applyDamage(3, {
          cause: EntityDamageCause17.fireTick
        });
        entity.setOnFire(10, true);
      }
    }
  }, TicksPerSecond9);
  system3.runTimeout(() => {
    system3.clearRun(intervalNum);
  }, TicksPerSecond9 * 2);
}

// scripts/items/weapon/bow/WaterArrowMagic.ts
import { EntityDamageCause as EntityDamageCause18, Player as Player26, system as system4, TicksPerSecond as TicksPerSecond10, world as world12 } from "@minecraft/server";
async function waterArrowHoming(player, arrow, ran, speed) {
  const water2 = shooting(player, arrow, ran, speed, void 0);
  water2.addTag("waterarrow");
  player.addTag("waterarrow_self");
  const intervalNum = system4.runInterval(() => {
    if (water2 != void 0 && water2.isValid) {
      const filterOption = {
        excludeTags: [
          "waterarrow",
          "waterarrow_self"
        ],
        location: water2.location,
        maxDistance: 30,
        closest: 1
      };
      addTeamsTagFilter(player, filterOption);
      const target = water2.dimension.getEntities(filterOption);
      if (target != void 0 && target.length > 0 && target[0].isValid) {
        const targetLoc = getDirectionVector(water2.location, target[0].location);
        const tpLoc = {
          x: water2.location.x + targetLoc.x,
          y: water2.location.y + targetLoc.y,
          z: water2.location.z + targetLoc.z
        };
        water2.teleport(tpLoc, {
          checkForBlocks: false,
          facingLocation: targetLoc,
          keepVelocity: false
        });
        water2.applyImpulse(targetLoc);
      }
      player.setDynamicProperty(player.id, void 0);
    } else {
      system4.clearRun(intervalNum);
    }
  }, 5);
  system4.runTimeout(() => {
    if (water2 != void 0 && water2.isValid) {
      water2.removeTag("waterarrow");
      water2.removeTag("waterarrow_self");
      water2.remove();
    }
    system4.clearRun(intervalNum);
  }, 10 * TicksPerSecond10);
}
async function waterArrow(entity) {
  const intervalNum = system4.runInterval(() => {
    if (entity.isValid) {
      if (entity instanceof Player26) {
        if (world12.gameRules.pvp) {
          entity.applyDamage(1, {
            cause: EntityDamageCause18.drowning
          });
        }
      } else {
        entity.applyDamage(3, {
          cause: EntityDamageCause18.drowning
        });
      }
    }
  }, TicksPerSecond10);
  system4.runTimeout(() => {
    system4.clearRun(intervalNum);
  }, TicksPerSecond10 * 2);
}

// scripts/items/weapon/bow/WindArrowMagic.ts
import { EntityDamageCause as EntityDamageCause19, Player as Player27, system as system5, TicksPerSecond as TicksPerSecond11, world as world13 } from "@minecraft/server";
async function windArrowShot(player, arrow, ran, speed) {
  const intervalNum = system5.runInterval(() => {
    shooting(player, arrow, ran, speed, void 0);
  }, 2);
  system5.runTimeout(() => {
    system5.clearRun(intervalNum);
  }, 10);
}
async function windArrow(entity) {
  const intervalNum = system5.runInterval(() => {
    if (entity.isValid) {
      if (entity instanceof Player27) {
        if (world13.gameRules.pvp) {
          entity.applyDamage(1, {
            cause: EntityDamageCause19.fall
          });
        }
      } else {
        entity.applyDamage(3, {
          cause: EntityDamageCause19.fall
        });
      }
    }
  }, TicksPerSecond11);
  system5.runTimeout(() => {
    system5.clearRun(intervalNum);
  }, TicksPerSecond11 * 4);
}

// scripts/items/weapon/bow/StoneArrowMagic.ts
import { EntityDamageCause as EntityDamageCause20, Player as Player28, system as system6, TicksPerSecond as TicksPerSecond12, world as world14 } from "@minecraft/server";
async function stoneArrow(entity) {
  entity.applyKnockback({ x: 1, z: 1 }, 1);
  const intervalNum = system6.runInterval(() => {
    if (entity.isValid) {
      if (entity instanceof Player28) {
        if (world14.gameRules.pvp) {
          entity.applyDamage(1, {
            cause: EntityDamageCause20.thorns
          });
        }
      } else {
        entity.applyDamage(3, {
          cause: EntityDamageCause20.thorns
        });
      }
    }
  }, TicksPerSecond12);
  system6.runTimeout(() => {
    system6.clearRun(intervalNum);
  }, TicksPerSecond12 * 2);
}

// scripts/items/weapon/bow/LightningArrowMagic.ts
import { EntityDamageCause as EntityDamageCause21, Player as Player29, system as system7, TicksPerSecond as TicksPerSecond13, world as world15 } from "@minecraft/server";
async function lightningArrow(entity) {
  const intervalNum = system7.runInterval(() => {
    if (entity.isValid) {
      if (entity instanceof Player29) {
        if (world15.gameRules.pvp) {
          entity.dimension.spawnParticle("kurokumaft:thunder_desires_particle", entity.location);
          entity.applyDamage(1, {
            cause: EntityDamageCause21.lightning
          });
        }
      } else {
        entity.dimension.spawnParticle("kurokumaft:thunder_desires_particle", entity.location);
        entity.applyDamage(3, {
          cause: EntityDamageCause21.lightning
        });
      }
    }
  }, TicksPerSecond13);
  system7.runTimeout(() => {
    system7.clearRun(intervalNum);
  }, TicksPerSecond13 * 2);
}

// scripts/items/weapon/bow/IceArrowMagic.ts
import { EntityDamageCause as EntityDamageCause22, Player as Player30, system as system8, TicksPerSecond as TicksPerSecond14, world as world16 } from "@minecraft/server";
async function iceArrow(entity) {
  const intervalNum = system8.runInterval(() => {
    if (entity.isValid) {
      if (entity instanceof Player30) {
        if (world16.gameRules.pvp) {
          entity.applyDamage(1, {
            cause: EntityDamageCause22.freezing
          });
        }
      } else {
        entity.applyDamage(3, {
          cause: EntityDamageCause22.freezing
        });
      }
    }
  }, TicksPerSecond14);
  system8.runTimeout(() => {
    system8.clearRun(intervalNum);
  }, TicksPerSecond14 * 2);
}

// scripts/items/weapon/bow/DarkArrowMagic.ts
import { EntityDamageCause as EntityDamageCause23, Player as Player31, system as system9, TicksPerSecond as TicksPerSecond15, world as world17 } from "@minecraft/server";
async function darkArrow(entity) {
  const intervalNum = system9.runInterval(() => {
    if (entity.isValid) {
      if (entity instanceof Player31) {
        if (world17.gameRules.pvp) {
          entity.applyDamage(1, {
            cause: EntityDamageCause23.wither
          });
        }
      } else {
        entity.applyDamage(3, {
          cause: EntityDamageCause23.wither
        });
      }
    }
  }, TicksPerSecond15);
  system9.runTimeout(() => {
    system9.clearRun(intervalNum);
  }, TicksPerSecond15 * 2);
}

// scripts/items/weapon/bow/HollyArrowMagic.ts
import { EntityDamageCause as EntityDamageCause24, Player as Player32, system as system10, TicksPerSecond as TicksPerSecond16, world as world18 } from "@minecraft/server";
async function hollyArrow(entity) {
  const intervalNum = system10.runInterval(() => {
    if (entity.isValid) {
      if (entity instanceof Player32) {
        if (world18.gameRules.pvp) {
          entity.applyDamage(1, {
            cause: EntityDamageCause24.none
          });
        }
      } else {
        entity.applyDamage(3, {
          cause: EntityDamageCause24.none
        });
      }
    }
  }, TicksPerSecond16);
  system10.runTimeout(() => {
    system10.clearRun(intervalNum);
  }, TicksPerSecond16 * 2);
}

// scripts/items/weapon/bow/BowWeaponMagic.ts
var BowChargeObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_bow",
    event: "kurokumaft:fire_magic_arrow",
    sendMsg: "entity.kurokumaft:fire_magic_arrow.name",
    maxduration: 1e3,
    addition: 1
  },
  {
    itemName: "kurokumaft:water_magic_bow",
    event: "kurokumaft:water_magic_arrow",
    sendMsg: "entity.kurokumaft:water_magic_arrow.name",
    maxduration: 1e3,
    addition: 1.5
  },
  {
    itemName: "kurokumaft:wind_magic_bow",
    event: "kurokumaft:wind_magic_arrow",
    sendMsg: "entity.kurokumaft:wind_magic_arrow.name",
    maxduration: 5e3,
    addition: 2
  },
  {
    itemName: "kurokumaft:stone_magic_bow",
    event: "kurokumaft:stone_magic_arrow",
    sendMsg: "entity.kurokumaft:stone_magic_arrow.name",
    maxduration: 1e3,
    addition: 0.75
  },
  {
    itemName: "kurokumaft:lightning_magic_bow",
    event: "kurokumaft:lightning_magic_arrow",
    sendMsg: "entity.kurokumaft:lightning_magic_arrow.name",
    maxduration: 1e3,
    addition: 2
  },
  {
    itemName: "kurokumaft:ice_magic_bow",
    event: "kurokumaft:ice_magic_arrow",
    sendMsg: "entity.kurokumaft:ice_magic_arrow.name",
    maxduration: 1e3,
    addition: 1.5
  },
  {
    itemName: "kurokumaft:dark_magic_bow",
    event: "kurokumaft:dark_magic_arrow",
    sendMsg: "entity.kurokumaft:dark_magic_arrow.name",
    maxduration: 1e3,
    addition: 1.5
  },
  {
    itemName: "kurokumaft:holly_magic_bow",
    event: "kurokumaft:holly_magic_arrow",
    sendMsg: "entity.kurokumaft:holly_magic_arrow.name",
    maxduration: 1e3,
    addition: 1.5
  }
]);
var BowShotMagic = class {
  // 右クリック
  onUse(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    if (!itemStack) {
      return;
    }
    player.setDynamicProperty("BowShotMagicCharge", true);
  }
};
async function magicBowShot(player, itemStack, duration) {
  player.setDynamicProperty("BowShotMagicCharge", false);
  const bowMagicObject = BowChargeObjects.find((obj) => obj.itemName == itemStack.typeId);
  if (bowMagicObject) {
    const speed = Math.ceil(clamp(bowMagicObject.maxduration - duration / TicksPerSecond17, 0, 5) * bowMagicObject.addition);
    if (itemStack.typeId == "kurokumaft:wind_magic_bow") {
      windArrowShot(player, bowMagicObject.event, 2, speed);
    } else if (itemStack.typeId == "kurokumaft:water_magic_bow") {
      waterArrowHoming(player, bowMagicObject.event, 0, speed);
    } else {
      shooting(player, bowMagicObject.event, 0, speed, void 0);
    }
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: bowMagicObject.sendMsg }] });
    itemDurabilityDamage(player, itemStack, EquipmentSlot6.Mainhand);
  }
}
var BowCProjectilehargeObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_arrow",
    func: fireArrow
  },
  {
    itemName: "kurokumaft:water_magic_arrow",
    func: waterArrow
  },
  {
    itemName: "kurokumaft:wind_magic_arrow",
    func: windArrow
  },
  {
    itemName: "kurokumaft:stone_magic_arrow",
    func: stoneArrow
  },
  {
    itemName: "kurokumaft:lightning_magic_arrow",
    func: lightningArrow
  },
  {
    itemName: "kurokumaft:ice_magic_arrow",
    func: iceArrow
  },
  {
    itemName: "kurokumaft:dark_magic_arrow",
    func: darkArrow
  },
  {
    itemName: "kurokumaft:holly_magic_arrow",
    func: hollyArrow
  }
]);
function checkArrowProjectile(projectileName) {
  return BowCProjectilehargeObjects.some((obj) => obj.itemName == projectileName);
}
function hitArrowEvent(projectile, target) {
  const proje = BowCProjectilehargeObjects.find((obj) => obj.itemName == projectile.typeId);
  try {
    proje.func(target);
  } catch (error) {
  }
}

// scripts/items/weapon/stick/StickWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot7, ItemComponentTypes as ItemComponentTypes3, Player as Player42, system as system17, world as world20 } from "@minecraft/server";

// scripts/items/weapon/stick/WaterCurrentMagic.ts
import { EntityDamageCause as EntityDamageCause25, Player as Player34, system as system11, TicksPerSecond as TicksPerSecond18 } from "@minecraft/server";
async function aquaShock(player, entity) {
  player.addTag("aqua_shock_self");
  const left = getLookRotaionPointsV2(entity.getRotation(), 0, 2.5);
  entity.dimension.spawnParticle("kurokumaft:aqua_shock_particle", { x: entity.location.x + left.x, y: entity.location.y + 1.8, z: entity.location.z + left.z });
  const center = getLookRotaionPointsV2(entity.getRotation(), 0, 0);
  entity.dimension.spawnParticle("kurokumaft:aqua_shock_particle", { x: entity.location.x + center.x, y: entity.location.y + 1.8, z: entity.location.z + center.z });
  const right = getLookRotaionPointsV2(entity.getRotation(), 0, -2.5);
  entity.dimension.spawnParticle("kurokumaft:aqua_shock_particle", { x: entity.location.x + right.x, y: entity.location.y + 1.8, z: entity.location.z + right.z });
  const filterOption = {
    excludeTags: [
      "aqua_shock_self"
    ],
    location: entity.location,
    maxDistance: 5
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player34) {
      en.applyDamage(2, {
        cause: EntityDamageCause25.drowning
      });
    } else {
      en.applyDamage(6, {
        cause: EntityDamageCause25.drowning
      });
    }
  });
  player.removeTag("aqua_shock_self");
}
async function aquaShot(player) {
  player.addTag("aqua_shot_self");
  const dimension = player.dimension;
  const filterOption = {
    excludeTags: [
      "aqua_shot_self"
    ],
    location: player.location,
    closest: 4,
    maxDistance: 10
  };
  addTeamsTagFilter(player, filterOption);
  const targets = dimension.getEntities(filterOption);
  const intervalNum = system11.runInterval(() => {
    targets.forEach((en) => {
      if (!en.isValid) {
        return;
      }
      en.dimension.spawnParticle("kurokumaft:aqua_shot_particle", en.location);
      en.addEffect("slowness", 5, {
        amplifier: 5
      });
      if (en instanceof Player34) {
        en.applyDamage(2, {
          cause: EntityDamageCause25.drowning
        });
      } else {
        en.applyDamage(4, {
          cause: EntityDamageCause25.drowning
        });
      }
    });
  }, 4);
  system11.runTimeout(() => {
    system11.clearRun(intervalNum);
  }, 40);
  player.removeTag("aqua_shot_self");
}
async function tidalWave(player) {
  player.addTag("tidal_wave_self");
  const dimension = player.dimension;
  const filterOption = {
    excludeFamilies: [
      "inanimate",
      "familiar",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    excludeTags: [
      "tidal_wave_target",
      "tidal_wave_self"
    ],
    location: player.location,
    maxDistance: 15
  };
  addTeamsTagFilter(player, filterOption);
  const targets = dimension.getEntities(filterOption);
  const intervalNum = system11.runInterval(() => {
    targets.forEach((en) => {
      en.dimension.spawnParticle("kurokumaft:tidal_wave_particle", en.location);
      if (en instanceof Player34) {
        en.addEffect(MinecraftEffectTypes.Slowness, 2 * TicksPerSecond18, {
          amplifier: 3
        });
        en.applyDamage(3, {
          cause: EntityDamageCause25.drowning
        });
      } else {
        en.addEffect(MinecraftEffectTypes.Slowness, 6 * TicksPerSecond18, {
          amplifier: 10
        });
        en.applyDamage(6, {
          cause: EntityDamageCause25.drowning
        });
      }
    });
  }, 4);
  system11.runTimeout(() => {
    system11.clearRun(intervalNum);
  }, 100);
  player.removeTag("tidal_wave_self");
}

// scripts/items/weapon/stick/AtmosphereMagic.ts
import { EntityDamageCause as EntityDamageCause26, Player as Player35, system as system12, TicksPerSecond as TicksPerSecond19 } from "@minecraft/server";
async function stormShock(player, entity) {
  player.addTag("storm_shock_self");
  const left = getLookRotaionPointsV2(entity.getRotation(), 0, 2.5);
  entity.dimension.spawnParticle("kurokumaft:storm_shock_particle", { x: entity.location.x + left.x, y: entity.location.y + 1.8, z: entity.location.z + left.z });
  const center = getLookRotaionPointsV2(entity.getRotation(), 0, 0);
  entity.dimension.spawnParticle("kurokumaft:storm_shock_particle", { x: entity.location.x + center.x, y: entity.location.y + 1.8, z: entity.location.z + center.z });
  const right = getLookRotaionPointsV2(entity.getRotation(), 0, -2.5);
  entity.dimension.spawnParticle("kurokumaft:storm_shock_particle", { x: entity.location.x + right.x, y: entity.location.y + 1.8, z: entity.location.z + right.z });
  const filterOption = {
    excludeTags: [
      "storm_shock_self"
    ],
    location: entity.location,
    maxDistance: 5
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    let damage = 6;
    if (en instanceof Player35) {
      damage = 2;
    }
    en.applyDamage(damage, {
      cause: EntityDamageCause26.fall
    });
  });
  player.removeTag("storm_shock_self");
}
async function atmosphere(player) {
  player.addTag("atmosphere_self");
  const dimen = player.dimension;
  const intervalNum = system12.runInterval(() => {
    const ploca = player.location;
    dimen.spawnParticle("kurokumaft:atmosphere_particle", ploca);
    const filterOption = {
      excludeTags: [
        "atmosphere_self"
      ],
      location: ploca,
      maxDistance: 10
    };
    addTeamsTagFilter(player, filterOption);
    const targets = dimen.getEntities(filterOption);
    targets.forEach((en) => {
      if (!en.isValid) {
        return;
      }
      const enloca = en.location;
      dimen.spawnParticle("kurokumaft:wind_particle", { x: enloca.x, y: enloca.y, z: enloca.z });
      dimen.spawnParticle("kurokumaft:storm1_particle", { x: enloca.x, y: enloca.y + 1, z: enloca.z });
      dimen.spawnParticle("kurokumaft:storm2_particle", { x: enloca.x, y: enloca.y, z: enloca.z });
      dimen.spawnParticle("kurokumaft:storm3_particle", { x: enloca.x, y: enloca.y + 1.5, z: enloca.z });
      dimen.spawnParticle("kurokumaft:storm4_particle", { x: enloca.x, y: enloca.y + 0.5, z: enloca.z });
      en.addEffect(MinecraftEffectTypes.Levitation, 1 * TicksPerSecond19, {
        amplifier: 10
      });
      let damage = 6;
      if (en instanceof Player35) {
        damage = 2;
      }
      en.applyDamage(damage, {
        cause: EntityDamageCause26.fallingBlock
      });
    });
  }, 4);
  system12.runTimeout(() => {
    system12.clearRun(intervalNum);
    player.removeTag("atmosphere_self");
  }, 100);
}

// scripts/items/weapon/stick/EarthMagic.ts
import { EntityDamageCause as EntityDamageCause27, Player as Player36, system as system13, TicksPerSecond as TicksPerSecond20 } from "@minecraft/server";
async function earthShock(player, entity) {
  player.addTag("earth_shock_self");
  const left = getLookRotaionPointsV2(entity.getRotation(), 0, 2.5);
  entity.dimension.spawnParticle("kurokumaft:earth_shock_particle", { x: entity.location.x + left.x, y: entity.location.y + 1.8, z: entity.location.z + left.z });
  const center = getLookRotaionPointsV2(entity.getRotation(), 0, 0);
  entity.dimension.spawnParticle("kurokumaft:earth_shock_particle", { x: entity.location.x + center.x, y: entity.location.y + 1.8, z: entity.location.z + center.z });
  const right = getLookRotaionPointsV2(entity.getRotation(), 0, -2.5);
  entity.dimension.spawnParticle("kurokumaft:earth_shock_particle", { x: entity.location.x + right.x, y: entity.location.y + 1.8, z: entity.location.z + right.z });
  const filterOption = {
    excludeTags: [
      "earth_shock_self"
    ],
    location: entity.location,
    maxDistance: 5
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    let damage = 6;
    if (en instanceof Player36) {
      damage = 2;
    }
    en.applyDamage(damage, {
      cause: EntityDamageCause27.anvil
    });
  });
  player.removeTag("earth_shock_self");
}
async function gravityField(player) {
  player.addTag("gravity_field_self");
  const intervalNum = system13.runInterval(() => {
    player.dimension.spawnParticle("kurokumaft:gravity_field_particle", player.location);
    const filterOption = {
      excludeTags: [
        "gravity_field_self"
      ],
      location: player.location,
      maxDistance: 10
    };
    addTeamsTagFilter(player, filterOption);
    const targets = player.dimension.getEntities(filterOption);
    targets.forEach((en) => {
      if (!en.isValid) {
        return;
      }
      en.dimension.spawnParticle("kurokumaft:gravity_particle", en.location);
      if (en instanceof Player36) {
        en.addEffect(MinecraftEffectTypes.Slowness, 2 * TicksPerSecond20, {
          amplifier: 2
        });
        en.applyDamage(3, {
          cause: EntityDamageCause27.fallingBlock
        });
      } else {
        en.addEffect(MinecraftEffectTypes.Slowness, 4 * TicksPerSecond20, {
          amplifier: 8
        });
        en.applyDamage(3, {
          cause: EntityDamageCause27.fallingBlock
        });
      }
    });
  }, 4);
  system13.runTimeout(() => {
    system13.clearRun(intervalNum);
    player.removeTag("gravity_field_self");
  }, 100);
}

// scripts/items/weapon/stick/LightningStrikeMagic.ts
import { EntityDamageCause as EntityDamageCause28, Player as Player37, system as system14, TicksPerSecond as TicksPerSecond21 } from "@minecraft/server";
async function sparkShock(player, entity) {
  player.addTag("spark_shock_self");
  const left = getLookRotaionPointsV2(entity.getRotation(), 0, 2.5);
  entity.dimension.spawnParticle("kurokumaft:spark_shock_particle", { x: entity.location.x + left.x, y: entity.location.y + 1.8, z: entity.location.z + left.z });
  const center = getLookRotaionPointsV2(entity.getRotation(), 0, 0);
  entity.dimension.spawnParticle("kurokumaft:spark_shock_particle", { x: entity.location.x + center.x, y: entity.location.y + 1.8, z: entity.location.z + center.z });
  const right = getLookRotaionPointsV2(entity.getRotation(), 0, -2.5);
  entity.dimension.spawnParticle("kurokumaft:spark_shock_particle", { x: entity.location.x + right.x, y: entity.location.y + 1.8, z: entity.location.z + right.z });
  const filterOption = {
    excludeTags: [
      "spark_shock_self"
    ],
    location: entity.location,
    maxDistance: 5
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player37) {
      en.applyDamage(2, {
        cause: EntityDamageCause28.lightning
      });
    } else {
      en.applyDamage(6, {
        cause: EntityDamageCause28.lightning
      });
    }
  });
  player.removeTag("spark_shock_self");
}
async function lightningStrike(player) {
  player.addTag("lightningstrike_self");
  const intervalNum = system14.runInterval(() => {
    player.dimension.spawnParticle("kurokumaft:thunder_sword_particle", player.location);
    const filterOption = {
      excludeTags: [
        "lightningstrike_self"
      ],
      location: player.location,
      maxDistance: 10
    };
    addTeamsTagFilter(player, filterOption);
    const targets = player.dimension.getEntities(filterOption);
    targets.forEach((en) => {
      if (!en.isValid) {
        return;
      }
      en.dimension.spawnParticle("kurokumaft:spark_particle", en.location);
      if (en instanceof Player37) {
        en.addEffect(MinecraftEffectTypes.Slowness, 2 * TicksPerSecond21, {
          amplifier: 3
        });
        en.applyDamage(2, {
          cause: EntityDamageCause28.lightning
        });
      } else {
        en.addEffect(MinecraftEffectTypes.Slowness, 3 * TicksPerSecond21, {
          amplifier: 6
        });
        en.applyDamage(6, {
          cause: EntityDamageCause28.lightning
        });
      }
    });
  }, 4);
  system14.runTimeout(() => {
    system14.clearRun(intervalNum);
    player.removeTag("lightningstrike_self");
  }, 100);
}

// scripts/items/weapon/stick/JetBlackMagic.ts
import { EntityDamageCause as EntityDamageCause29, Player as Player38, system as system15 } from "@minecraft/server";
async function jetblackShock(player, entity) {
  player.addTag("jetblack_shock_self");
  const left = getLookRotaionPointsV2(entity.getRotation(), 0, 2.5);
  entity.dimension.spawnParticle("kurokumaft:jetblack_shock_particle", { x: entity.location.x + left.x, y: entity.location.y + 1.8, z: entity.location.z + left.z });
  const center = getLookRotaionPointsV2(entity.getRotation(), 0, 0);
  entity.dimension.spawnParticle("kurokumaft:jetblack_shock_particle", { x: entity.location.x + center.x, y: entity.location.y + 1.8, z: entity.location.z + center.z });
  const right = getLookRotaionPointsV2(entity.getRotation(), 0, -2.5);
  entity.dimension.spawnParticle("kurokumaft:jetblack_shock_particle", { x: entity.location.x + right.x, y: entity.location.y + 1.8, z: entity.location.z + right.z });
  const filterOption = {
    excludeTags: [
      "jetblack_shock_self"
    ],
    location: player.location,
    maxDistance: 5
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player38) {
      en.applyDamage(2, {
        cause: EntityDamageCause29.wither
      });
    } else {
      en.applyDamage(6, {
        cause: EntityDamageCause29.wither
      });
    }
  });
  player.removeTag("jetblack_shock_self");
}
async function blackHole(player) {
  player.addTag("black_hole_self");
  const black_hole = player.dimension.spawnEntity(
    "kurokumaft:black_hole",
    {
      x: player.location.x,
      y: player.location.y + 8,
      z: player.location.z
    }
  );
  const holeLo = black_hole.location;
  const dim = black_hole.dimension;
  const intervalNum = system15.runInterval(() => {
    black_hole.teleport({ x: holeLo.x, y: holeLo.y + 0.1, z: holeLo.z });
    dim.spawnParticle("kurokumaft:black_hole_particle", black_hole.location);
    dim.spawnParticle("kurokumaft:black_hole_outer_particle", black_hole.location);
    const filterOption = {
      excludeTags: [
        "black_hole_self"
      ],
      location: holeLo,
      maxDistance: 18
    };
    addTeamsTagFilter(player, filterOption);
    const targets = player.dimension.getEntities(filterOption);
    targets.forEach((en) => {
      if (!en.isValid) {
        return;
      }
      en.teleport(holeLo);
      if (en instanceof Player38) {
        en.applyDamage(3, {
          cause: EntityDamageCause29.wither
        });
      } else {
        en.applyDamage(10, {
          cause: EntityDamageCause29.wither
        });
      }
    });
  }, 10);
  system15.runTimeout(() => {
    system15.clearRun(intervalNum);
    player.removeTag("black_hole_self");
    black_hole.remove();
  }, 80);
}

// scripts/items/weapon/stick/SparkleMagic.ts
import { EntityDamageCause as EntityDamageCause30, Player as Player39, system as system16 } from "@minecraft/server";
async function sparkleShock(player, entity) {
  player.addTag("sparkle_shock_self");
  const left = getLookRotaionPointsV2(entity.getRotation(), 0, 2.5);
  entity.dimension.spawnParticle("kurokumaft:sparkle_light_particle", { x: entity.location.x + left.x, y: entity.location.y + 1.8, z: entity.location.z + left.z });
  const center = getLookRotaionPointsV2(entity.getRotation(), 0, 0);
  entity.dimension.spawnParticle("kurokumaft:sparkle_light_particle", { x: entity.location.x + center.x, y: entity.location.y + 1.8, z: entity.location.z + center.z });
  const right = getLookRotaionPointsV2(entity.getRotation(), 0, -2.5);
  entity.dimension.spawnParticle("kurokumaft:sparkle_light_particle", { x: entity.location.x + right.x, y: entity.location.y + 1.8, z: entity.location.z + right.z });
  const filterOption = {
    excludeTags: [
      "sparkle_shock_self"
    ],
    location: player.location,
    maxDistance: 5
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player39) {
      en.applyDamage(2, {
        cause: EntityDamageCause30.soulCampfire
      });
    } else {
      en.applyDamage(6, {
        cause: EntityDamageCause30.soulCampfire
      });
    }
  });
  player.removeTag("sparkle_shock_self");
}
async function hollyField(player) {
  const holly_field = player.dimension.spawnEntity(
    "kurokumaft:holly_field",
    {
      x: player.location.x,
      y: player.location.y,
      z: player.location.z
    }
  );
  const holeLo = holly_field.location;
  const intervalNum = system16.runInterval(() => {
    holly_field.dimension.spawnParticle("kurokumaft:holly_field_particle", holly_field.location);
    holly_field.dimension.spawnParticle("kurokumaft:holly_field_outer_particle", holly_field.location);
    const filterOption = {
      excludeTags: [
        "sparkle_shock_self"
      ],
      excludeFamilies: [
        "inanimate",
        "magic",
        "arrow",
        "monster"
      ],
      excludeTypes: [
        "item"
      ],
      location: holeLo,
      maxDistance: 15
    };
    const targets = player.dimension.getEntities(filterOption);
    targets.forEach((en) => {
      if (!en.isValid) {
        return;
      }
      en.addEffect(MinecraftEffectTypes.InstantHealth, 5, {
        amplifier: 10
      });
    });
  }, 10);
  system16.runTimeout(() => {
    system16.clearRun(intervalNum);
    holly_field.remove();
  }, 100);
}

// scripts/items/weapon/stick/BlazeMagic.ts
import { EntityDamageCause as EntityDamageCause31, Player as Player40 } from "@minecraft/server";
async function flameShock(player, entity) {
  player.addTag("flame_shock_self");
  const left = getLookRotaionPointsV2(entity.getRotation(), 0, 2.5);
  entity.dimension.spawnParticle("kurokumaft:flame_shock_particle", { x: entity.location.x + left.x, y: entity.location.y + 1.8, z: entity.location.z + left.z });
  const center = getLookRotaionPointsV2(entity.getRotation(), 0, 0);
  entity.dimension.spawnParticle("kurokumaft:flame_shock_particle", { x: entity.location.x + center.x, y: entity.location.y + 1.8, z: entity.location.z + center.z });
  const right = getLookRotaionPointsV2(entity.getRotation(), 0, -2.5);
  entity.dimension.spawnParticle("kurokumaft:flame_shock_particle", { x: entity.location.x + right.x, y: entity.location.y + 1.8, z: entity.location.z + right.z });
  const filterOption = {
    excludeTags: [
      "flame_shock_self"
    ],
    location: player.location,
    maxDistance: 5
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    let damage = 6;
    if (en instanceof Player40) {
      damage = 3;
    }
    en.applyDamage(damage, {
      cause: EntityDamageCause31.fire
    });
  });
  player.removeTag("flame_shock_self");
}
async function blastbomb(player) {
  player.addTag("blastbomb_self");
  const filterOption = {
    excludeTags: [
      "blastbomb_self"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    let damage = 10;
    if (en instanceof Player40) {
      damage = 4;
    }
    en.applyDamage(damage, {
      cause: EntityDamageCause31.fire
    });
    en.dimension.spawnParticle("kurokumaft:burstflare_particle", { x: en.location.x + 0.5, y: en.location.y + 0.5, z: en.location.z + 0.5 });
    en.dimension.spawnEntity("kurokumaft:blastbombmagic<minecraft:explode>", { x: en.location.x + 0.5, y: en.location.y + 0.5, z: en.location.z + 0.5 });
  });
  player.removeTag("blastbomb_self");
}

// scripts/items/weapon/stick/BlockiceMagic.ts
import { EntityDamageCause as EntityDamageCause32, Player as Player41, TicksPerSecond as TicksPerSecond22 } from "@minecraft/server";
async function iceShock(player, entity) {
  player.addTag("ice_shock_self");
  const left = getLookRotaionPointsV2(entity.getRotation(), 0, 2.5);
  entity.dimension.spawnParticle("kurokumaft:ice_shock_particle", { x: entity.location.x + left.x, y: entity.location.y + 1.8, z: entity.location.z + left.z });
  const center = getLookRotaionPointsV2(entity.getRotation(), 0, 0);
  entity.dimension.spawnParticle("kurokumaft:ice_shock_particle", { x: entity.location.x + center.x, y: entity.location.y + 1.8, z: entity.location.z + center.z });
  const right = getLookRotaionPointsV2(entity.getRotation(), 0, -2.5);
  entity.dimension.spawnParticle("kurokumaft:ice_shock_particle", { x: entity.location.x + right.x, y: entity.location.y + 1.8, z: entity.location.z + right.z });
  const filterOption = {
    excludeTags: [
      "ice_shock_self"
    ],
    location: player.location,
    maxDistance: 5
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    let damage = 6;
    if (en instanceof Player41) {
      damage = 2;
    }
    en.applyDamage(damage, {
      cause: EntityDamageCause32.freezing
    });
  });
  player.removeTag("ice_shock_self");
}
async function iceBlock(player) {
  player.addTag("iceblock_self");
  const filterOption = {
    excludeTags: [
      "iceblock_self"
    ],
    location: player.location,
    maxDistance: 15,
    closest: 4
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    let damage = 10;
    if (en instanceof Player41) {
      damage = 2;
    }
    en.addEffect(MinecraftEffectTypes.Slowness, 10 * TicksPerSecond22, {
      amplifier: damage
    });
    en.addEffect(MinecraftEffectTypes.Weakness, 10 * TicksPerSecond22, {
      amplifier: damage
    });
    en.dimension.spawnEntity("kurokumaft:ice_blockmagic", { x: en.location.x + 0.5, y: en.location.y + 10, z: en.location.z + 0.5 });
  });
  player.removeTag("iceblock_self");
}

// scripts/items/weapon/stick/StickWeaponMagic.ts
var StickHitObjects = Object.freeze([
  {
    itemName: "kurokumaft:blaze_stick",
    func: flameShock,
    sendMsg: "magic.kurokumaft:flameShock.translate"
  },
  {
    itemName: "kurokumaft:watercurrent_stick",
    func: aquaShock,
    sendMsg: "magic.kurokumaft:aquaShock.translate"
  },
  {
    itemName: "kurokumaft:atmosphere_stick",
    func: stormShock,
    sendMsg: "magic.kurokumaft:stormShock.translate"
  },
  {
    itemName: "kurokumaft:earth_stick",
    func: earthShock,
    sendMsg: "magic.kurokumaft:earthShock.translate"
  },
  {
    itemName: "kurokumaft:lightningstrike_stick",
    func: sparkShock,
    sendMsg: "magic.kurokumaft:sparkShock.translate"
  },
  {
    itemName: "kurokumaft:blockice_stick",
    func: iceShock,
    sendMsg: "magic.kurokumaft:iceShock.translate"
  },
  {
    itemName: "kurokumaft:jetblack_stick",
    func: jetblackShock,
    sendMsg: "magic.kurokumaft:jetblackShock.translate"
  },
  {
    itemName: "kurokumaft:sparkle_stick",
    func: sparkleShock,
    sendMsg: "magic.kurokumaft:sparkleShock.translate"
  }
]);
var StickShotMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:blaze_stick",
    event: "kurokumaft:valleleflairmagic",
    sendMsg: "magic.kurokumaft:valleleflair.translate",
    addition: 5
  },
  {
    itemName: "kurokumaft:atmosphere_stick",
    event: "kurokumaft:storm_cutter_magic",
    sendMsg: "magic.kurokumaft:storm_cutter.translate",
    addition: 6
  },
  {
    itemName: "kurokumaft:earth_stick",
    event: "kurokumaft:stone_edge_magic",
    sendMsg: "magic.kurokumaft:stone_edge.translate",
    addition: 4
  },
  {
    itemName: "kurokumaft:lightningstrike_stick",
    event: "kurokumaft:thunder_lance_magic",
    sendMsg: "magic.kurokumaft:thunder_lance.translate",
    addition: 7
  },
  {
    itemName: "kurokumaft:blockice_stick",
    event: "kurokumaft:ice_lance_magic",
    sendMsg: "magic.kurokumaft:ice_lance.translate",
    addition: 6
  },
  {
    itemName: "kurokumaft:jetblack_stick",
    event: "kurokumaft:dark_lance_magic",
    sendMsg: "magic.kurokumaft:dark_lance.translate",
    addition: 5
  },
  {
    itemName: "kurokumaft:sparkle_stick",
    event: "kurokumaft:holly_lance_magic",
    sendMsg: "magic.kurokumaft:holly_lance.translate",
    addition: 5
  }
]);
var StickRightOneMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:watercurrent_stick",
    func: aquaShot,
    sendMsg: "magic.kurokumaft:aquaShot.translate"
  }
]);
var StickRightFuncMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:blaze_stick",
    func: blastbomb,
    sendMsg: "magic.kurokumaft:blastbomb.translate"
  },
  {
    itemName: "kurokumaft:watercurrent_stick",
    func: tidalWave,
    sendMsg: "magic.kurokumaft:tidalWave.translate"
  },
  {
    itemName: "kurokumaft:atmosphere_stick",
    func: atmosphere,
    sendMsg: "magic.kurokumaft:atmosphere.translate"
  },
  {
    itemName: "kurokumaft:earth_stick",
    func: gravityField,
    sendMsg: "magic.kurokumaft:gravityField.translate"
  },
  {
    itemName: "kurokumaft:lightningstrike_stick",
    func: lightningStrike,
    sendMsg: "magic.kurokumaft:lightningStrike.translate"
  },
  {
    itemName: "kurokumaft:blockice_stick",
    func: iceBlock,
    sendMsg: "magic.kurokumaft:iceBlock.translate"
  },
  {
    itemName: "kurokumaft:jetblack_stick",
    func: blackHole,
    sendMsg: "magic.kurokumaft:blackHole.translate"
  },
  {
    itemName: "kurokumaft:sparkle_stick",
    func: hollyField,
    sendMsg: "magic.kurokumaft:hollyField.translate"
  }
]);
var StickWeaponMagic = class {
  // 通常攻撃
  onHitEntity(event) {
    const itemStack = event.itemStack;
    const attackEntity = event.attackingEntity;
    const hitEntity = event.hitEntity;
    const effect = event.hadEffect;
    if (!itemStack || hitEntity instanceof Player42 && !world20.gameRules.pvp) {
      return;
    }
    const stickMagicObject = StickHitObjects.find((obj) => obj.itemName == itemStack.typeId);
    stickMagicObject.func(attackEntity, hitEntity);
    attackEntity.onScreenDisplay.setActionBar({ rawtext: [{ translate: stickMagicObject.sendMsg }] });
  }
  // 右クリック
  onUse(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    if (player.isSneaking) {
      const stickFuncMagicObject = StickRightFuncMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
      if (stickFuncMagicObject) {
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: stickFuncMagicObject.sendMsg }] });
        stickFuncMagicObject.func(player);
      }
    } else {
      const stickShotMagicObject = StickShotMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
      if (stickShotMagicObject) {
        if (itemStack.typeId == "kurokumaft:atmosphere_stick") {
          const intervalNum = system17.runInterval(() => {
            shooting(player, stickShotMagicObject.event, 1, stickShotMagicObject.addition, void 0);
          }, 4);
          system17.runTimeout(() => {
            system17.clearRun(intervalNum);
          }, 16);
        } else {
          shooting(player, stickShotMagicObject.event, 0, stickShotMagicObject.addition, void 0);
        }
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: stickShotMagicObject.sendMsg }] });
      }
      const stickRightOneMagicObject = StickRightOneMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
      if (stickRightOneMagicObject) {
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: stickRightOneMagicObject.sendMsg }] });
        stickRightOneMagicObject.func(player);
      }
    }
    itemDurabilityDamage(player, itemStack, EquipmentSlot7.Mainhand);
    const cool = itemStack.getComponent(ItemComponentTypes3.Cooldown);
    cool.startCooldown(player);
  }
};

// scripts/items/weapon/rod/RodWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot8, ItemComponentTypes as ItemComponentTypes4 } from "@minecraft/server";

// scripts/items/weapon/rod/FlameMagic.ts
import { EntityDamageCause as EntityDamageCause33, Player as Player43, system as system18 } from "@minecraft/server";
async function bumrod(player, hitEntity) {
  player.addTag("bumrod_self");
  hitEntity.dimension.spawnParticle("kurokumaft:bumrod_particle", { x: hitEntity.location.x, y: hitEntity.location.y + 1.8, z: hitEntity.location.z });
  const filterOption = {
    excludeTags: [
      "bumrod_self"
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 2
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player43) {
      en.applyDamage(2, {
        cause: EntityDamageCause33.fire
      });
    } else {
      en.applyDamage(6, {
        cause: EntityDamageCause33.fire
      });
    }
  });
  player.removeTag("bumrod_self");
}
async function flarecircle(player) {
  player.addTag("flamecircle_self");
  const intervalNum = system18.runInterval(() => {
    const filterOption = {
      excludeTags: [
        "flamecircle_self"
      ],
      location: player.location,
      maxDistance: 20,
      closest: 3
    };
    addTeamsTagFilter(player, filterOption);
    const targets = player.dimension.getEntities(filterOption);
    targets.forEach((en) => {
      if (!en.isValid) {
        return;
      }
      en.dimension.spawnParticle("kurokumaft:firestome1_particle", en.location);
      if (en instanceof Player43) {
        en.applyDamage(2, {
          cause: EntityDamageCause33.fire
        });
      } else {
        en.applyDamage(5, {
          cause: EntityDamageCause33.fire
        });
      }
    });
  }, 2);
  system18.runTimeout(() => {
    system18.clearRun(intervalNum);
    player.removeTag("flamecircle_self");
  }, 60);
}
async function burstflare(player) {
  player.addTag("burstflare_self");
  const filterOption = {
    excludeTags: [
      "burstflare_self"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    en.dimension.spawnParticle("kurokumaft:burstflare_particle", en.location);
    en.dimension.spawnEntity("kurokumaft:burstflaremagic<minecraft:explode>", en.location);
    if (en instanceof Player43) {
      en.applyDamage(3, {
        cause: EntityDamageCause33.fire
      });
    } else {
      en.applyDamage(10, {
        cause: EntityDamageCause33.fire
      });
    }
  });
  player.removeTag("burstflare_self");
}

// scripts/items/weapon/rod/WaterWaveMagic.ts
import { EntityDamageCause as EntityDamageCause34, Player as Player44, system as system19, TicksPerSecond as TicksPerSecond23 } from "@minecraft/server";

// scripts/common/MagicShooterPoints.ts
function getAdjacentSphericalPoints(rotation, location) {
  const piNum = 75;
  let xapply;
  let yapply;
  let zapply;
  let xlocation;
  let ylocation;
  let zlocation;
  if (rotation.y >= -90 && rotation.y < 0) {
    let yRotax = -rotation.y / piNum;
    let yRotaz = (rotation.y + 90) / piNum;
    let yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      let xRota = (rotation.x + 90) / piNum;
      xlocation = location.x + yRotax * xRota * 1.75;
      xapply = yRotax * xRota;
      if (rotation.x <= -45) {
        ylocation = location.y + 1.5 + yRota * 1.75;
      } else {
        ylocation = location.y + 1.75 + yRota * 1.5;
      }
      yapply = yRota;
      zlocation = location.z + yRotaz * xRota * 1.75;
      zapply = yRotaz * xRota;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      let xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x + yRotax * xRota * 1.75;
      xapply = yRotax * xRota;
      if (rotation.x >= 45) {
        ylocation = location.y + 1.5 + yRota * 1.75;
      } else {
        ylocation = location.y + 1.75 + yRota * 1.5;
      }
      yapply = yRota;
      zlocation = location.z + yRotaz * xRota * 1.75;
      zapply = yRotaz * xRota;
    }
  } else if (rotation.y >= 0 && rotation.y <= 90) {
    let yRotax = rotation.y / piNum;
    let yRotaz = -(rotation.y - 90) / piNum;
    let yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      let xRota = (rotation.x + 90) / piNum;
      if (rotation.y >= 45) {
        xlocation = location.x - yRotax * xRota * 1.75;
      } else {
        xlocation = location.x - (yRotax * xRota + 0.5) * 1.75;
      }
      xapply = -(yRotax * xRota);
      if (rotation.x <= -45) {
        ylocation = location.y + 1.75 + yRota * 1.5;
      } else {
        ylocation = location.y + 1.5 + yRota * 1.75;
      }
      yapply = yRota;
      if (rotation.y >= 45) {
        zlocation = location.z + (yRotaz * xRota - 0.5) * 1.75;
      } else {
        zlocation = location.z + yRotaz * xRota * 1.75;
      }
      zapply = yRotaz * xRota;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      let xRota = -(rotation.x - 90) / piNum;
      if (rotation.y >= 45) {
        xlocation = location.x - yRotax * xRota * 1.75;
      } else {
        xlocation = location.x - (yRotax * xRota + 0.5) * 1.75;
      }
      xapply = -(yRotax * xRota);
      if (rotation.x >= 45) {
        ylocation = location.y + 1.75 + yRota * 1.5;
      } else {
        ylocation = location.y + 1.5 + yRota * 1.75;
      }
      yapply = yRota;
      if (rotation.y >= 45) {
        zlocation = location.z + (yRotaz * xRota - 0.5) * 1.75;
      } else {
        zlocation = location.z + yRotaz * xRota * 1.75;
      }
      zapply = yRotaz * xRota;
    }
  } else if (rotation.y < -90 && rotation.y > -180) {
    let yRotax = (rotation.y + 180) / piNum;
    let yRotaz = (rotation.y + 90) / piNum;
    let yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      let xRota = (rotation.x + 90) / piNum;
      xlocation = location.x + yRotax * xRota * 1.75;
      xapply = yRotax * xRota;
      if (rotation.x <= -45) {
        ylocation = location.y + 1.75 + yRota * 1.5;
      } else {
        ylocation = location.y + 1.5 + yRota * 1.75;
      }
      yapply = yRota;
      zlocation = location.z + yRotaz * xRota * 1.75;
      zapply = yRotaz * xRota;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      let xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x + yRotax * xRota * 1.75;
      xapply = yRotax * xRota;
      if (rotation.x >= 45) {
        ylocation = location.y + 1.75 + yRota * 1.5;
      } else {
        ylocation = location.y + 1.5 + yRota * 1.75;
      }
      yapply = yRota;
      zlocation = location.z + yRotaz * xRota * 1.75;
      zapply = yRotaz * xRota;
    }
  } else if (rotation.y > 90 && rotation.y <= 180) {
    let yRotax = -(rotation.y - 180) / piNum;
    let yRotaz = -(rotation.y - 90) / piNum;
    let yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      let xRota = (rotation.x + 90) / piNum;
      xlocation = location.x - yRotax * xRota * 1.75;
      xapply = -(yRotax * xRota);
      if (rotation.x <= -45) {
        ylocation = location.y + 1.5 + yRota * 1.75;
      } else {
        ylocation = location.y + 1.75 + yRota * 1.5;
      }
      yapply = yRota;
      if (rotation.y <= 135) {
        zlocation = location.z + (yRotaz * xRota - 0.5) * 1.75;
      } else {
        zlocation = location.z + yRotaz * xRota * 1.75;
      }
      zapply = yRotaz * xRota;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      let xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x - yRotax * xRota * 1.75;
      xapply = -(yRotax * xRota);
      if (rotation.x >= 45) {
        ylocation = location.y + 1.75 + yRota * 1.5;
      } else {
        ylocation = location.y + 1.5 + yRota * 1.75;
      }
      yapply = yRota;
      if (rotation.y <= 135) {
        zlocation = location.z + (yRotaz * xRota - 0.5) * 1.75;
      } else {
        zlocation = location.z + yRotaz * xRota * 1.75;
      }
      zapply = yRotaz * xRota;
    }
  }
  return { xapply, yapply, zapply, xlocation, ylocation, zlocation };
}

// scripts/items/weapon/rod/WaterWaveMagic.ts
async function watercutter(player, hitEntity) {
  player.addTag("watercutter_self");
  hitEntity.dimension.spawnParticle("kurokumaft:watercutter_particle", { x: hitEntity.location.x, y: hitEntity.location.y + 1.8, z: hitEntity.location.z });
  const filterOption = {
    excludeTags: [
      "watercutter_self"
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 4
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player44) {
      en.applyDamage(1, {
        cause: EntityDamageCause34.drowning
      });
    } else {
      en.applyDamage(3, {
        cause: EntityDamageCause34.drowning
      });
    }
  });
  player.removeTag("watercutter_self");
}
async function waterwave(player) {
  const { xapply, yapply, zapply, xlocation, ylocation, zlocation } = getAdjacentSphericalPoints(player.getRotation(), player.location);
  const wave = player.dimension.spawnEntity("kurokumaft:waterwavemagic", { x: xlocation, y: player.location.y, z: zlocation });
  const intervalNum = system19.runInterval(() => {
    wave.applyImpulse({ x: xapply, y: 0, z: zapply });
    wave.setRotation({ x: xlocation, y: zlocation });
  }, 2);
  system19.runTimeout(() => {
    system19.clearRun(intervalNum);
    wave.remove();
  }, 60);
}
async function waterjail(player) {
  player.addTag("waterjail_self");
  const filterOption = {
    excludeTags: [
      "waterjail_self"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 2
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    en.dimension.spawnParticle("kurokumaft:waterjail_particle", en.location);
    if (en instanceof Player44) {
      en.addEffect(MinecraftEffectTypes.Slowness, 5 * TicksPerSecond23, {
        amplifier: 10
      });
    } else {
      en.addEffect(MinecraftEffectTypes.Slowness, 10 * TicksPerSecond23, {
        amplifier: 50
      });
    }
  });
  player.removeTag("waterjail_self");
}

// scripts/items/weapon/rod/StormMagic.ts
import { EntityDamageCause as EntityDamageCause35, Player as Player45, TicksPerSecond as TicksPerSecond24 } from "@minecraft/server";
async function stormBread(player, hitEntity) {
  player.addTag("storm_bread_self");
  hitEntity.dimension.spawnParticle("kurokumaft:storm_bread_particle", { x: hitEntity.location.x, y: hitEntity.location.y + 1.8, z: hitEntity.location.z });
  const filterOption = {
    excludeTags: [
      "storm_bread_self"
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 2
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player45) {
      en.applyDamage(2, {
        cause: EntityDamageCause35.fall
      });
    } else {
      en.applyDamage(4, {
        cause: EntityDamageCause35.fall
      });
    }
  });
  player.removeTag("storm_bread_self");
}
async function storm(player) {
  player.setDynamicProperty(player.id, true);
  const filterOption = {
    propertyOptions: [
      {
        exclude: true,
        propertyId: player.id
      }
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    en.dimension.spawnParticle("kurokumaft:storm1_particle", { x: en.location.x, y: en.location.y, z: en.location.z });
    en.dimension.spawnParticle("kurokumaft:storm2_particle", { x: en.location.x, y: en.location.y + 1, z: en.location.z });
    en.dimension.spawnParticle("kurokumaft:storm3_particle", { x: en.location.x, y: en.location.y + 2, z: en.location.z });
    en.dimension.spawnParticle("kurokumaft:storm4_particle", { x: en.location.x, y: en.location.y + 3, z: en.location.z });
    if (en instanceof Player45) {
      en.addEffect(MinecraftEffectTypes.Levitation, 1 * TicksPerSecond24, {
        amplifier: 10
      });
      en.applyDamage(1, {
        cause: EntityDamageCause35.fall
      });
    } else {
      en.addEffect(MinecraftEffectTypes.Levitation, 1 * TicksPerSecond24, {
        amplifier: 15
      });
      en.applyDamage(3, {
        cause: EntityDamageCause35.fall
      });
    }
  });
  player.removeTag("storm_self");
}
async function aerobomb(player) {
  player.setDynamicProperty(player.id, true);
  const filterOption = {
    propertyOptions: [
      {
        exclude: true,
        propertyId: player.id
      }
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player45) {
      en.applyDamage(3, {
        cause: EntityDamageCause35.fall
      });
    } else {
      en.applyDamage(10, {
        cause: EntityDamageCause35.fall
      });
    }
    en.dimension.spawnParticle("kurokumaft:aero_bomb_particle", en.location);
    en.dimension.createExplosion(en.location, 2, {
      allowUnderwater: true,
      breaksBlocks: false,
      causesFire: false,
      source: player
    });
  });
  player.setDynamicProperty(player.id, void 0);
}

// scripts/items/weapon/rod/RockMagic.ts
import { EntityDamageCause as EntityDamageCause36, Player as Player46, TicksPerSecond as TicksPerSecond25 } from "@minecraft/server";
async function stoneBread(player, hitEntity) {
  player.addTag("stone_bread_self");
  hitEntity.dimension.spawnParticle("kurokumaft:stone_bread_particle", { x: hitEntity.location.x, y: hitEntity.location.y + 1.8, z: hitEntity.location.z });
  const filterOption = {
    excludeTags: [
      "stone_bread_self"
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 4
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player46) {
      en.applyDamage(2, {
        cause: EntityDamageCause36.fallingBlock
      });
    } else {
      en.applyDamage(4, {
        cause: EntityDamageCause36.fallingBlock
      });
    }
  });
  player.removeTag("stone_bread_self");
}
async function rockbreak(player) {
  player.addTag("rock_break_self");
  const filterOption = {
    excludeTags: [
      "rock_break_self"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player46) {
      en.addEffect(MinecraftEffectTypes.Nausea, 5 * TicksPerSecond25, {
        amplifier: 2
      });
    } else {
      en.addEffect(MinecraftEffectTypes.Nausea, 10 * TicksPerSecond25, {
        amplifier: 10
      });
    }
    const rock = en.dimension.spawnEntity("kurokumaft:rockbreakmagic", { x: en.location.x, y: en.location.y + 10, z: en.location.z });
  });
  player.removeTag("rock_break_self");
}
async function greybomb(player) {
  player.addTag("grey_bomb_self");
  const filterOption = {
    excludeTags: [
      "grey_bomb_self"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    en.dimension.spawnParticle("kurokumaft:grey_bomb_particle", en.location);
    if (en instanceof Player46) {
      en.applyDamage(3, {
        cause: EntityDamageCause36.fallingBlock
      });
    } else {
      en.applyDamage(10, {
        cause: EntityDamageCause36.fallingBlock
      });
    }
    en.dimension.createExplosion(en.location, 2, {
      allowUnderwater: true,
      breaksBlocks: false,
      causesFire: false,
      source: player
    });
  });
  player.removeTag("grey_bomb_self");
}

// scripts/items/weapon/rod/ThunderclapMagic.ts
import { EntityDamageCause as EntityDamageCause37, Player as Player47, TicksPerSecond as TicksPerSecond26 } from "@minecraft/server";
async function lightningBread(player, hitEntity) {
  player.addTag("lightning_bread_self");
  player.dimension.spawnParticle("kurokumaft:lightning_bread_particle", { x: hitEntity.location.x, y: player.location.y + 1.8, z: hitEntity.location.z });
  const filterOption = {
    excludeTags: [
      "lightning_bread_self"
    ],
    location: { x: hitEntity.location.x, y: player.location.y + 1, z: hitEntity.location.z },
    maxDistance: 4
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player47) {
      en.applyDamage(2, {
        cause: EntityDamageCause37.lightning
      });
    } else {
      en.applyDamage(6, {
        cause: EntityDamageCause37.lightning
      });
    }
  });
  player.removeTag("lightning_bread_self");
}
async function thunderclap(player) {
  player.addTag("thunderclap_self");
  const filterOption = {
    excludeTags: [
      "thunderclap_self"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    en.dimension.spawnParticle("kurokumaft:lightningbolt_particle", en.location);
    en.dimension.spawnEntity(MinecraftEntityTypes.LightningBolt, en.location);
    if (en instanceof Player47) {
      en.applyDamage(3, {
        cause: EntityDamageCause37.lightning
      });
    } else {
      en.applyDamage(10, {
        cause: EntityDamageCause37.lightning
      });
    }
  });
  player.removeTag("thunderclap_self");
}
async function thunderjail(player) {
  player.addTag("thunder_jail_self");
  const filterOption = {
    excludeTags: [
      "thunder_jail_self"
    ],
    location: player.location,
    maxDistance: 8
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    en.dimension.spawnParticle("kurokumaft:thunder_jail_particle", en.location);
    if (en instanceof Player47) {
      en.addEffect("slowness", 5 * TicksPerSecond26, {
        amplifier: 10
      });
      en.applyDamage(1, {
        cause: EntityDamageCause37.lightning
      });
    } else {
      en.addEffect("slowness", 10 * TicksPerSecond26, {
        amplifier: 30
      });
      en.applyDamage(4, {
        cause: EntityDamageCause37.lightning
      });
    }
  });
  player.removeTag("thunder_jail_self");
}

// scripts/items/weapon/rod/FreezeMagic.ts
import { EntityDamageCause as EntityDamageCause38, Player as Player48, TicksPerSecond as TicksPerSecond27 } from "@minecraft/server";
async function iceBread(player, hitEntity) {
  player.addTag("ice_bread_self");
  hitEntity.dimension.spawnParticle("kurokumaft:ice_bread_particle", { x: hitEntity.location.x, y: hitEntity.location.y + 1.8, z: hitEntity.location.z });
  const filterOption = {
    excludeTags: [
      "ice_bread_self"
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 2
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player48) {
      en.applyDamage(2, {
        cause: EntityDamageCause38.freezing
      });
    } else {
      en.applyDamage(6, {
        cause: EntityDamageCause38.freezing
      });
    }
  });
  player.removeTag("ice_bread_self");
}
async function freezConclusion(player) {
  player.addTag("freez_conclusion_self");
  const filterOption = {
    excludeTags: [
      "freez_conclusion_self"
    ],
    location: player.location,
    maxDistance: 15,
    closest: 2
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    en.dimension.spawnParticle("kurokumaft:freezingconclusion_particle", en.location);
    en.dimension.setBlockType({ x: en.location.x - 1, y: en.location.y, z: en.location.z }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x - 1, y: en.location.y, z: en.location.z + 1 }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x - 1, y: en.location.y, z: en.location.z - 1 }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x, y: en.location.y, z: en.location.z }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x, y: en.location.y, z: en.location.z + 1 }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x, y: en.location.y, z: en.location.z - 1 }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x + 1, y: en.location.y, z: en.location.z }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x + 1, y: en.location.y, z: en.location.z + 1 }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x + 1, y: en.location.y, z: en.location.z - 1 }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x - 1, y: en.location.y + 1, z: en.location.z }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x - 1, y: en.location.y + 1, z: en.location.z + 1 }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x - 1, y: en.location.y + 1, z: en.location.z - 1 }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x, y: en.location.y + 1, z: en.location.z }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x, y: en.location.y + 1, z: en.location.z + 1 }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x, y: en.location.y + 1, z: en.location.z - 1 }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x + 1, y: en.location.y + 1, z: en.location.z }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x + 1, y: en.location.y + 1, z: en.location.z + 1 }, MinecraftBlockTypes.PackedIce);
    en.dimension.setBlockType({ x: en.location.x + 1, y: en.location.y + 1, z: en.location.z - 1 }, MinecraftBlockTypes.PackedIce);
    if (en instanceof Player48) {
      en.addEffect(MinecraftEffectTypes.Weakness, 5 * TicksPerSecond27, {
        amplifier: 1
      });
    } else {
      en.addEffect(MinecraftEffectTypes.Weakness, 20 * TicksPerSecond27, {
        amplifier: 3
      });
    }
  });
  player.removeTag("freez_conclusion_self");
}

// scripts/items/weapon/rod/DarknessMagic.ts
import { EntityDamageCause as EntityDamageCause39, Player as Player49, system as system20 } from "@minecraft/server";
async function darkFang(player, hitEntity) {
  player.addTag("dark_fang_self");
  const look = getLookRotaionPointsV2(player.getRotation(), 3.5, 0);
  const filterOption = {
    excludeTags: [
      "dark_fang_self"
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 4
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    en.dimension.spawnParticle("kurokumaft:dark_fang_particle", { x: player.location.x + look.x, y: player.location.y + 0.8, z: player.location.z + look.z });
    if (en instanceof Player49) {
      en.applyDamage(2, {
        cause: EntityDamageCause39.wither
      });
    } else {
      en.applyDamage(6, {
        cause: EntityDamageCause39.wither
      });
    }
  });
  player.removeTag("dark_fang_self");
}
async function brushash(player) {
  player.addTag("brushash_self");
  const filterOption = {
    excludeTags: [
      "brushash_self"
    ],
    location: player.location,
    maxDistance: 10,
    closest: 3
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  const intervalNum = system20.runInterval(() => {
    targets.forEach((en) => {
      if (en.isValid) {
        en.dimension.spawnParticle("kurokumaft:dark_brushash_particle", en.location);
        if (en instanceof Player49) {
          en.applyDamage(2, {
            cause: EntityDamageCause39.wither
          });
        } else {
          en.applyDamage(6, {
            cause: EntityDamageCause39.wither
          });
        }
      }
    });
  }, 4);
  system20.runTimeout(() => {
    system20.clearRun(intervalNum);
  }, 40);
  player.removeTag("brushash_self");
}
async function summonSkeconston(player) {
  player.dimension.spawnEntity("kurokumaft:dark_skeconston", { x: player.location.x + 3, y: player.location.y, z: player.location.z }).nameTag = "\u30C0\u30FC\u30AF\u30B9\u30B1\u30EB\u30C8\u30F3";
  player.dimension.spawnEntity("kurokumaft:dark_skeconston", { x: player.location.x - 3, y: player.location.y, z: player.location.z }).nameTag = "\u30C0\u30FC\u30AF\u30B9\u30B1\u30EB\u30C8\u30F3";
  player.dimension.spawnEntity("kurokumaft:dark_skeconston", { x: player.location.x, y: player.location.y, z: player.location.z + 3 }).nameTag = "\u30C0\u30FC\u30AF\u30B9\u30B1\u30EB\u30C8\u30F3";
}

// scripts/items/weapon/rod/BrightnessMagic.ts
import { EntityDamageCause as EntityDamageCause40, Player as Player50, TicksPerSecond as TicksPerSecond28 } from "@minecraft/server";
async function lightFang(player, hitEntity) {
  player.addTag("light_fang_self");
  const look = getLookRotaionPointsV2(player.getRotation(), 3.5, 0);
  const filterOption = {
    excludeTags: [
      "light_self"
    ],
    location: { x: hitEntity.location.x, y: hitEntity.location.y + 1, z: hitEntity.location.z },
    maxDistance: 4
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    en.dimension.spawnParticle("kurokumaft:light_fang_particle", { x: player.location.x + look.x, y: player.location.y + 0.8, z: player.location.z + look.z });
    if (en instanceof Player50) {
      en.applyDamage(2, {
        cause: EntityDamageCause40.soulCampfire
      });
    } else {
      en.applyDamage(6, {
        cause: EntityDamageCause40.soulCampfire
      });
    }
  });
  player.removeTag("light_self");
}
async function areaheel(player) {
  player.dimension.spawnParticle("kurokumaft:areaheel_particle", player.location);
  const p = player.dimension.getEntities({
    excludeFamilies: [
      "inanimate",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    families: [
      "player"
    ],
    location: player.location,
    maxDistance: 10
  });
  const f = player.dimension.getEntities({
    excludeFamilies: [
      "inanimate",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    families: [
      "familiar"
    ],
    location: player.location,
    maxDistance: 10
  });
  const u = player.dimension.getEntities({
    excludeFamilies: [
      "inanimate",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    families: [
      "undead"
    ],
    location: player.location,
    maxDistance: 10
  });
  p.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    en.addEffect(MinecraftEffectTypes.InstantHealth, 5 * TicksPerSecond28, {
      amplifier: 5,
      showParticles: true
    });
  });
  f.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    en.addEffect(MinecraftEffectTypes.InstantHealth, 5 * TicksPerSecond28, {
      amplifier: 5,
      showParticles: true
    });
  });
  u.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    en.addEffect(MinecraftEffectTypes.InstantHealth, 5 * TicksPerSecond28, {
      amplifier: 5,
      showParticles: true
    });
  });
}
async function summonGolem(player) {
  const golem = player.dimension.spawnEntity("kurokumaft:brightness_golem<minecraft:from_player>", { x: player.location.x, y: player.location.y, z: player.location.z + 3 });
  golem.nameTag = "\u30D6\u30E9\u30A4\u30C8\u30B4\u30FC\u30EC\u30E0";
}

// scripts/items/weapon/rod/RodWeaponMagic.ts
var RodHitObjects = Object.freeze([
  {
    itemName: "kurokumaft:flame_rod",
    func: bumrod,
    sendMsg: "magic.kurokumaft:bumrod.translate"
  },
  {
    itemName: "kurokumaft:waterwave_rod",
    func: watercutter,
    sendMsg: "magic.kurokumaft:watercutter.translate"
  },
  {
    itemName: "kurokumaft:storm_rod",
    func: stormBread,
    sendMsg: "magic.kurokumaft:stormBread.translate"
  },
  {
    itemName: "kurokumaft:rock_rod",
    func: stoneBread,
    sendMsg: "magic.kurokumaft:stoneBread.translate"
  },
  {
    itemName: "kurokumaft:thunderclap_rod",
    func: lightningBread,
    sendMsg: "magic.kurokumaft:lightningBread.translate"
  },
  {
    itemName: "kurokumaft:freeze_rod",
    func: iceBread,
    sendMsg: "magic.kurokumaft:iceBread.translate"
  },
  {
    itemName: "kurokumaft:darkness_rod",
    func: darkFang,
    sendMsg: "magic.kurokumaft:darkFang.translate"
  },
  {
    itemName: "kurokumaft:brightness_rod",
    func: lightFang,
    sendMsg: "magic.kurokumaft:lightFang.translate"
  }
]);
var RodShotMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:freeze_rod",
    event: "kurokumaft:ice_barrette_magic",
    sendMsg: "magic.kurokumaft:ice_barrette.translate",
    addition: 4
  }
]);
var RodRightOneMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:flame_rod",
    func: flarecircle,
    sendMsg: "magic.kurokumaft:flarecircle.translate"
  },
  {
    itemName: "kurokumaft:waterwave_rod",
    func: waterwave,
    sendMsg: "magic.kurokumaft:waterwave.translate"
  },
  {
    itemName: "kurokumaft:storm_rod",
    func: storm,
    sendMsg: "magic.kurokumaft:storm.translate"
  },
  {
    itemName: "kurokumaft:rock_rod",
    func: rockbreak,
    sendMsg: "magic.kurokumaft:rockbreak.translate"
  },
  {
    itemName: "kurokumaft:thunderclap_rod",
    func: thunderclap,
    sendMsg: "magic.kurokumaft:thunderclap.translate"
  },
  {
    itemName: "kurokumaft:darkness_rod",
    func: brushash,
    sendMsg: "magic.kurokumaft:brushash.translate"
  },
  {
    itemName: "kurokumaft:brightness_rod",
    func: areaheel,
    sendMsg: "magic.kurokumaft:areaheel.translate"
  }
]);
var RodRightFuncMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:flame_rod",
    func: burstflare,
    sendMsg: "magic.kurokumaft:burstflare.translate"
  },
  {
    itemName: "kurokumaft:waterwave_rod",
    func: waterjail,
    sendMsg: "magic.kurokumaft:waterjail.translate"
  },
  {
    itemName: "kurokumaft:storm_rod",
    func: aerobomb,
    sendMsg: "magic.kurokumaft:aerobomb.translate"
  },
  {
    itemName: "kurokumaft:rock_rod",
    func: greybomb,
    sendMsg: "magic.kurokumaft:greybomb.translate"
  },
  {
    itemName: "kurokumaft:thunderclap_rod",
    func: thunderjail,
    sendMsg: "magic.kurokumaft:thunderjail.translate"
  },
  {
    itemName: "kurokumaft:freeze_rod",
    func: freezConclusion,
    sendMsg: "magic.kurokumaft:freezConclusion.translate"
  },
  {
    itemName: "kurokumaft:darkness_rod",
    func: summonSkeconston,
    sendMsg: "magic.kurokumaft:summonSkeconston.translate"
  },
  {
    itemName: "kurokumaft:brightness_rod",
    func: summonGolem,
    sendMsg: "magic.kurokumaft:summonGolem.translate"
  }
]);
var RodWeaponMagic = class {
  // 通常攻撃
  onHitEntity(event) {
    const itemStack = event.itemStack;
    const attackEntity = event.attackingEntity;
    const hitEntity = event.hitEntity;
    const effect = event.hadEffect;
    if (!itemStack) {
      return;
    }
    const wandMagicObject = RodHitObjects.find((obj) => obj.itemName == itemStack.typeId);
    wandMagicObject.func(attackEntity, hitEntity);
    attackEntity.onScreenDisplay.setActionBar({ rawtext: [{ translate: wandMagicObject.sendMsg }] });
  }
  // 右クリック
  onUse(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    if (player.isSneaking) {
      const rodFuncMagicObject = RodRightFuncMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
      if (rodFuncMagicObject) {
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: rodFuncMagicObject.sendMsg }] });
        rodFuncMagicObject.func(player);
      }
    } else {
      const rodShotMagicObject = RodShotMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
      if (rodShotMagicObject) {
        shooting(player, rodShotMagicObject.event, 0, rodShotMagicObject.addition, void 0);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: rodShotMagicObject.sendMsg }] });
      }
      const rodRightOneMagicObject = RodRightOneMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
      if (rodRightOneMagicObject) {
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: rodRightOneMagicObject.sendMsg }] });
        rodRightOneMagicObject.func(player);
      }
    }
    itemDurabilityDamage(player, itemStack, EquipmentSlot8.Mainhand);
    const cool = itemStack.getComponent(ItemComponentTypes4.Cooldown);
    cool.startCooldown(player);
  }
};

// scripts/items/weapon/staff/StaffWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot9, ItemComponentTypes as ItemComponentTypes5 } from "@minecraft/server";

// scripts/items/weapon/staff/FirestormMagic.ts
import { EntityDamageCause as EntityDamageCause41, Player as Player52, system as system21 } from "@minecraft/server";
async function bramFang(player) {
  player.addTag("bram_fang_self");
  const filterOption = {
    excludeTags: [
      "bram_fang_self"
    ],
    location: player.location,
    maxDistance: 6.5
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    en.dimension.spawnParticle("kurokumaft:bram_fang_particle", en.location);
    en.dimension.spawnEntity("kurokumaft:bram_fang_magic", en.location);
  });
  player.removeTag("bram_fang_self");
}
async function fireStorm(player) {
  player.addTag("firestormmagic_self");
  const look = getLookPoints(player.getRotation(), player.location, 15);
  const dim = player.dimension;
  const ploc = player.location;
  const intervalNum = system21.runInterval(() => {
    dim.spawnParticle("kurokumaft:firestome5_particle", { x: look.x, y: ploc.y, z: look.z });
    const filterOption = {
      excludeTags: [
        "firestormmagic_self"
      ],
      location: { x: look.x, y: ploc.y, z: look.z },
      maxDistance: 10
    };
    addTeamsTagFilter(player, filterOption);
    const targets = dim.getEntities(filterOption);
    targets.forEach((en) => {
      if (!en.isValid) {
        return;
      }
      if (en instanceof Player52) {
        en.applyDamage(3, {
          cause: EntityDamageCause41.fire
        });
      } else {
        en.applyDamage(6, {
          cause: EntityDamageCause41.fire
        });
      }
    });
  }, 1);
  system21.runTimeout(() => {
    system21.clearRun(intervalNum);
    player.removeTag("firestormmagic_self");
  }, 60);
}

// scripts/items/weapon/staff/ExplosionMagic.ts
import { EntityComponentTypes as EntityComponentTypes5, EntityDamageCause as EntityDamageCause42, Player as Player53, system as system22 } from "@minecraft/server";
async function megaBrand(player) {
  player.addTag("megaBrand_self");
  player.dimension.spawnParticle(
    "kurokumaft:megabland_explosion",
    {
      x: player.location.x,
      y: player.location.y + 1.8,
      z: player.location.z
    }
  );
  const filterOption = {
    excludeTags: [
      "megaBrand_self"
    ],
    location: { x: player.location.x, y: player.location.y + 1.8, z: player.location.z },
    maxDistance: 6.5
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player53) {
      en.applyDamage(3, {
        cause: EntityDamageCause42.fire
      });
      en.applyDamage(3, {
        cause: EntityDamageCause42.stalagmite
      });
    } else {
      en.applyDamage(15, {
        cause: EntityDamageCause42.fire
      });
      en.applyDamage(15, {
        cause: EntityDamageCause42.stalagmite
      });
    }
  });
  player.removeTag("megaBrand_self");
}
async function explosion(player) {
  const look = getLookPoints(player.getRotation(), player.location, 30);
  const explosion2 = player.dimension.spawnEntity(
    "kurokumaft:explosionmagic",
    {
      x: look.x,
      y: player.location.y + 25,
      z: look.z
    }
  );
  const projectile = explosion2.getComponent(EntityComponentTypes5.Projectile);
  projectile.owner = player;
  let dim = explosion2.dimension;
  let loca = explosion2.location;
  const intervalNum = system22.runInterval(() => {
    if (explosion2.isValid) {
      explosion2.dimension.spawnParticle("kurokumaft:explosion_wave", explosion2.location);
      dim = explosion2.dimension;
      loca = explosion2.location;
    } else {
      dim.spawnParticle("kurokumaft:explosion_shell", loca);
      system22.clearRun(intervalNum);
    }
  }, 4);
}

// scripts/items/weapon/staff/FlameSparkMagic.ts
import { EntityDamageCause as EntityDamageCause43, Player as Player54, system as system23 } from "@minecraft/server";
async function digVault(player) {
  player.addTag("digVault_self");
  const left = getLookRotaionPointsV2(player.getRotation(), 4.4, 2.5);
  player.dimension.spawnParticle(
    "kurokumaft:spark_shock_particle",
    {
      x: player.location.x + left.x,
      y: player.location.y + 1.8,
      z: player.location.z + left.z
    }
  );
  const center = getLookRotaionPointsV2(player.getRotation(), 4.4, 0);
  player.dimension.spawnParticle(
    "kurokumaft:spark_shock_particle",
    {
      x: player.location.x + center.x,
      y: player.location.y + 1.8,
      z: player.location.z + center.z
    }
  );
  const right = getLookRotaionPointsV2(player.getRotation(), 4.4, -2.5);
  player.dimension.spawnParticle(
    "kurokumaft:spark_shock_particle",
    {
      x: player.location.x + right.x,
      y: player.location.y + 1.8,
      z: player.location.z + right.z
    }
  );
  const filterOption = {
    excludeTags: [
      "digVault_self"
    ],
    location: { x: player.location.x + center.x, y: player.location.y + 1.8, z: player.location.z + center.z },
    maxDistance: 6.5
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player54) {
      en.applyDamage(3, {
        cause: EntityDamageCause43.fire
      });
      en.applyDamage(3, {
        cause: EntityDamageCause43.lightning
      });
    } else {
      en.applyDamage(15, {
        cause: EntityDamageCause43.fire
      });
      en.applyDamage(15, {
        cause: EntityDamageCause43.lightning
      });
    }
  });
  player.removeTag("digVault_self");
}
async function flameSpark(player) {
  player.addTag("flamespark_self");
  const intervalNum = system23.runInterval(() => {
    const filterOption = {
      excludeTags: [
        "flamespark_self"
      ],
      location: player.location,
      maxDistance: 30,
      closest: 3
    };
    addTeamsTagFilter(player, filterOption);
    const targets = player.dimension.getEntities(filterOption);
    targets.forEach((en) => {
      if (!en.isValid) {
        return;
      }
      en.dimension.spawnParticle("kurokumaft:firewall_particle", en.location);
      en.applyDamage(3, {
        cause: EntityDamageCause43.fire
      });
      en.dimension.spawnEntity(MinecraftEntityTypes.LightningBolt, en.location);
      en.applyDamage(3, {
        cause: EntityDamageCause43.lightning
      });
    });
  }, 10);
  system23.runTimeout(() => {
    system23.clearRun(intervalNum);
    player.removeTag("flamespark_self");
  }, 100);
}

// scripts/items/weapon/staff/MailstromMagic.ts
import { EntityDamageCause as EntityDamageCause44, Player as Player55, system as system24 } from "@minecraft/server";
async function sonicSlicer(player) {
  player.addTag("sonicSlicer_self");
  const slicer1 = getLookRotaionPointsV2(player.getRotation(), 5, 0);
  player.dimension.spawnParticle(
    "kurokumaft:storm_bread_particle",
    {
      x: player.location.x + slicer1.x,
      y: player.location.y + 0.2,
      z: player.location.z + slicer1.z
    }
  );
  player.dimension.spawnParticle(
    "kurokumaft:storm_bread_particle",
    {
      x: player.location.x + slicer1.x,
      y: player.location.y + 0.5,
      z: player.location.z + slicer1.z
    }
  );
  const slicer2 = getLookRotaionPointsV2(player.getRotation(), 5, -2);
  player.dimension.spawnParticle(
    "kurokumaft:storm_bread_particle",
    {
      x: player.location.x + slicer2.x,
      y: player.location.y + 0.5,
      z: player.location.z + slicer2.z
    }
  );
  player.dimension.spawnParticle(
    "kurokumaft:storm_bread_particle",
    {
      x: player.location.x + slicer2.x,
      y: player.location.y + 0.8,
      z: player.location.z + slicer2.z
    }
  );
  const slicer3 = getLookRotaionPointsV2(player.getRotation(), 5, 2);
  player.dimension.spawnParticle(
    "kurokumaft:storm_bread_particle",
    {
      x: player.location.x + slicer3.x,
      y: player.location.y + 0.8,
      z: player.location.z + slicer3.z
    }
  );
  player.dimension.spawnParticle(
    "kurokumaft:storm_bread_particle",
    {
      x: player.location.x + slicer3.x,
      y: player.location.y + 1,
      z: player.location.z + slicer3.z
    }
  );
  const filterOption = {
    excludeTags: [
      "sonicSlicer_self"
    ],
    location: { x: player.location.x + slicer1.x, y: player.location.y + 0.8, z: player.location.z + slicer1.z },
    maxDistance: 6.5
  };
  addTeamsTagFilter(player, filterOption);
  const targets = player.dimension.getEntities(filterOption);
  targets.forEach((en) => {
    if (!en.isValid) {
      return;
    }
    if (en instanceof Player55) {
      en.applyDamage(3, {
        cause: EntityDamageCause44.fall
      });
    } else {
      en.applyDamage(20, {
        cause: EntityDamageCause44.fall
      });
    }
  });
  player.removeTag("sonicSlicer_self");
}
async function mailstrom(player) {
  player.addTag("mailstrom_self");
  const look = getLookPoints(player.getRotation(), player.location, 15);
  const mailLo = { x: look.x, y: player.location.y, z: look.z };
  const dim = player.dimension;
  const intervalNum = system24.runInterval(() => {
    dim.spawnParticle("kurokumaft:mailstrom1_particle", mailLo);
    dim.spawnParticle("kurokumaft:mailstrom1_particle", { x: mailLo.x, y: mailLo.y + 0.5, z: mailLo.z });
    dim.spawnParticle("kurokumaft:mailstrom2_particle", { x: mailLo.x, y: mailLo.y + 1, z: mailLo.z });
    dim.spawnParticle("kurokumaft:mailstrom2_particle", { x: mailLo.x, y: mailLo.y + 1.5, z: mailLo.z });
    dim.spawnParticle("kurokumaft:mailstrom3_particle", { x: mailLo.x, y: mailLo.y + 2, z: mailLo.z });
    dim.spawnParticle("kurokumaft:mailstrom3_particle", { x: mailLo.x, y: mailLo.y + 2.5, z: mailLo.z });
    dim.spawnParticle("kurokumaft:mailstrom4_particle", { x: mailLo.x, y: mailLo.y + 3, z: mailLo.z });
    dim.spawnParticle("kurokumaft:mailstrom4_particle", { x: mailLo.x, y: mailLo.y + 3.5, z: mailLo.z });
    dim.spawnParticle("kurokumaft:mailstrom5_particle", { x: mailLo.x, y: mailLo.y + 4, z: mailLo.z });
    dim.spawnParticle("kurokumaft:mailstrom5_particle", { x: mailLo.x, y: mailLo.y + 4.5, z: mailLo.z });
    dim.spawnParticle("kurokumaft:mailstrom6_particle", { x: mailLo.x, y: mailLo.y + 5, z: mailLo.z });
    dim.spawnParticle("kurokumaft:mailstrom6_particle", { x: mailLo.x, y: mailLo.y + 5.5, z: mailLo.z });
    const filterOption = {
      excludeTags: [
        "mailstrom_self"
      ],
      location: mailLo,
      maxDistance: 10
    };
    addTeamsTagFilter(player, filterOption);
    const targets = dim.getEntities(filterOption);
    targets.forEach((en) => {
      if (!en.isValid) {
        return;
      }
      en.teleport(mailLo);
      if (en instanceof Player55) {
        en.applyDamage(3, {
          cause: EntityDamageCause44.drowning
        });
      } else {
        en.applyDamage(5, {
          cause: EntityDamageCause44.drowning
        });
      }
    });
  }, 5);
  system24.runTimeout(() => {
    system24.clearRun(intervalNum);
    player.removeTag("mailstrom_self");
  }, 100);
}

// scripts/items/weapon/staff/StaffWeaponMagic.ts
var StaffHitObjects = Object.freeze([
  {
    itemName: "kurokumaft:explosion_staff",
    func: megaBrand,
    sendMsg: "magic.kurokumaft:megaBrand.translate"
  },
  {
    itemName: "kurokumaft:firestorm_staff",
    func: bramFang,
    sendMsg: "magic.kurokumaft:bramFang.translate"
  },
  {
    itemName: "kurokumaft:flamespark_staff",
    func: digVault,
    sendMsg: "magic.kurokumaft:digVault.translate"
  },
  {
    itemName: "kurokumaft:mailstrom_staff",
    func: sonicSlicer,
    sendMsg: "magic.kurokumaft:sonicSlicer.translate"
  }
]);
var StaffRightOneMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:firestorm_staff",
    func: fireStorm,
    sendMsg: "magic.kurokumaft:fireStorm.translate"
  },
  {
    itemName: "kurokumaft:explosion_staff",
    func: explosion,
    sendMsg: "magic.kurokumaft:explosion.translate"
  },
  {
    itemName: "kurokumaft:flamespark_staff",
    func: flameSpark,
    sendMsg: "magic.kurokumaft:flameSpark.translate"
  },
  {
    itemName: "kurokumaft:mailstrom_staff",
    func: mailstrom,
    sendMsg: "magic.kurokumaft:mailstrom.translate"
  }
]);
var StaffWeaponMagic = class {
  // 通常攻撃
  onHitEntity(event) {
    const itemStack = event.itemStack;
    const attackEntity = event.attackingEntity;
    const hitEntity = event.hitEntity;
    const effect = event.hadEffect;
    if (!itemStack) {
      return;
    }
    const staffMagicObject = StaffHitObjects.find((obj) => obj.itemName == itemStack.typeId);
    staffMagicObject.func(attackEntity);
    attackEntity.onScreenDisplay.setActionBar({ rawtext: [{ translate: staffMagicObject.sendMsg }] });
  }
  // 右クリック
  onUse(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    const staffRightOneMagicObject = StaffRightOneMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (staffRightOneMagicObject) {
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: staffRightOneMagicObject.sendMsg }] });
      staffRightOneMagicObject.func(player);
    }
    itemDurabilityDamage(player, itemStack, EquipmentSlot9.Mainhand);
    const cool = itemStack.getComponent(ItemComponentTypes5.Cooldown);
    cool.startCooldown(player);
  }
  // ブロッククリック
  onUseOn(event) {
  }
};

// scripts/items/weapon/bread/BreadWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot10, ItemComponentTypes as ItemComponentTypes6 } from "@minecraft/server";

// scripts/items/weapon/bread/FireMagicBread.ts
import { EntityDamageCause as EntityDamageCause45 } from "@minecraft/server";
async function flamingDesires(entity) {
  if (entity != void 0 && entity.isValid) {
    entity.dimension.spawnParticle("kurokumaft:flaming_desires_particle", entity.location);
    entity.applyDamage(5, {
      cause: EntityDamageCause45.fire
    });
  }
}
async function crimsonBread(player) {
  shooting(player, "kurokumaft:crimson_bread", 0.5, 2, void 0);
}

// scripts/items/weapon/bread/WaterMagicBread.ts
import { EntityDamageCause as EntityDamageCause46 } from "@minecraft/server";
async function aquaDesires(entity) {
  if (entity != void 0 && entity.isValid) {
    entity.dimension.spawnParticle("kurokumaft:aqua_desires_particle", { x: entity.location.x + 0.5, y: entity.location.y, z: entity.location.z });
    entity.dimension.spawnParticle("kurokumaft:aqua_desires_particle", { x: entity.location.x, y: entity.location.y, z: entity.location.z });
    entity.dimension.spawnParticle("kurokumaft:aqua_desires_particle", { x: entity.location.x - 0.5, y: entity.location.y, z: entity.location.z });
    entity.applyDamage(5, {
      cause: EntityDamageCause46.drowning
    });
  }
}
async function mercurySmash(player) {
  shooting(player, "kurokumaft:mercury_smash", 0, 2, "kurokumaft:projectile_1");
  shooting(player, "kurokumaft:mercury_smash", 0, 2, "kurokumaft:projectile_2");
  shooting(player, "kurokumaft:mercury_smash", 0, 2, "kurokumaft:projectile_3");
}

// scripts/items/weapon/bread/WindMagicBread.ts
import { EntityDamageCause as EntityDamageCause47, system as system25 } from "@minecraft/server";
function windDesires(entity) {
  if (entity != void 0 && entity.isValid) {
    entity.dimension.spawnParticle("kurokumaft:wind_desires_particle", { x: entity.location.x + 0.5, y: entity.location.y, z: entity.location.z });
    entity.dimension.spawnParticle("kurokumaft:wind_desires_particle", { x: entity.location.x, y: entity.location.y, z: entity.location.z });
    entity.dimension.spawnParticle("kurokumaft:wind_desires_particle", { x: entity.location.x - 0.5, y: entity.location.y, z: entity.location.z });
    entity.applyDamage(2, {
      cause: EntityDamageCause47.flyIntoWall
    });
    entity.applyDamage(2, {
      cause: EntityDamageCause47.flyIntoWall
    });
    entity.applyDamage(2, {
      cause: EntityDamageCause47.flyIntoWall
    });
  }
}
function windBarkSlash(player) {
  const intervalNum = system25.runInterval(() => {
    shooting(player, "kurokumaft:wind_bark_slash", 1, 5, "kurokumaft:projectile_1");
    shooting(player, "kurokumaft:wind_bark_slash", 1, 5, "kurokumaft:projectile_2");
    shooting(player, "kurokumaft:wind_bark_slash", 1, 5, "kurokumaft:projectile_3");
  }, 5);
  system25.runTimeout(() => {
    system25.clearRun(intervalNum);
  }, 60);
}

// scripts/items/weapon/bread/StoneMagicBread.ts
import { EntityDamageCause as EntityDamageCause48 } from "@minecraft/server";
async function stoneDesires(entity) {
  if (entity != void 0 && entity.isValid) {
    entity.dimension.spawnParticle("kurokumaft:stone_desires_particle", entity.location);
    entity.applyDamage(5, {
      cause: EntityDamageCause48.thorns
    });
  }
}
async function breakRockSlash(player) {
  shooting(player, "kurokumaft:break_rock_slash", 0.5, 3, void 0);
}

// scripts/items/weapon/bread/ThunderMagicBread.ts
import { EntityDamageCause as EntityDamageCause49 } from "@minecraft/server";
async function thunderDesires(entity) {
  if (entity != void 0 && entity.isValid) {
    entity.dimension.spawnParticle("kurokumaft:thunder_desires_particle", entity.location);
    entity.applyDamage(5, {
      cause: EntityDamageCause49.lightning
    });
  }
}
async function raizinBread(player) {
  shooting(player, "kurokumaft:raizin_bread", 0.1, 4, void 0);
}

// scripts/items/weapon/bread/IceMagicBread.ts
import { EntityDamageCause as EntityDamageCause50 } from "@minecraft/server";
async function iceDesires(entity) {
  if (entity != void 0 && entity.isValid) {
    entity.dimension.spawnParticle("kurokumaft:ice_desires_particle", entity.location);
    entity.applyDamage(5, {
      cause: EntityDamageCause50.freezing
    });
  }
}
async function syusetuBread(player) {
  shooting(player, "kurokumaft:syusetu_bread", 0.5, 4, "kurokumaft:projectile_1");
}

// scripts/items/weapon/bread/BreadWeaponMagic.ts
var BreadHitObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_bread",
    func: flamingDesires,
    sendMsg: "magic.kurokumaft:flamingDesires.translate"
  },
  {
    itemName: "kurokumaft:water_magic_bread",
    func: aquaDesires,
    sendMsg: "magic.kurokumaft:aquaDesires.translate"
  },
  {
    itemName: "kurokumaft:wind_magic_bread",
    func: windDesires,
    sendMsg: "magic.kurokumaft:windDesires.translate"
  },
  {
    itemName: "kurokumaft:stone_magic_bread",
    func: stoneDesires,
    sendMsg: "magic.kurokumaft:stoneDesires.translate"
  },
  {
    itemName: "kurokumaft:thunder_magic_bread",
    func: thunderDesires,
    sendMsg: "magic.kurokumaft:thunderDesires.translate"
  },
  {
    itemName: "kurokumaft:ice_magic_bread",
    func: iceDesires,
    sendMsg: "magic.kurokumaft:iceDesires.translate"
  }
]);
var BreadShotObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_bread",
    func: crimsonBread,
    sendMsg: "magic.kurokumaft:crimsonBread.translate"
  },
  {
    itemName: "kurokumaft:water_magic_bread",
    func: mercurySmash,
    sendMsg: "magic.kurokumaft:mercurySmash.translate"
  },
  {
    itemName: "kurokumaft:wind_magic_bread",
    func: windBarkSlash,
    sendMsg: "magic.kurokumaft:windBarkSlash.translate"
  },
  {
    itemName: "kurokumaft:stone_magic_bread",
    func: breakRockSlash,
    sendMsg: "magic.kurokumaft:breakRockSlash.translate"
  },
  {
    itemName: "kurokumaft:thunder_magic_bread",
    func: raizinBread,
    sendMsg: "magic.kurokumaft:raizinBread.translate"
  },
  {
    itemName: "kurokumaft:ice_magic_bread",
    func: syusetuBread,
    sendMsg: "magic.kurokumaft:syusetuBread.translate"
  }
]);
var BreadWeaponMagic = class {
  // 通常攻撃
  onHitEntity(event) {
    const itemStack = event.itemStack;
    const attackEntity = event.attackingEntity;
    const hitEntity = event.hitEntity;
    const effect = event.hadEffect;
    if (!itemStack) {
      return;
    }
    const breadMagicObject = BreadHitObjects.find((obj) => obj.itemName == itemStack.typeId);
    breadMagicObject.func(hitEntity);
    attackEntity.onScreenDisplay.setActionBar({ rawtext: [{ translate: breadMagicObject.sendMsg }] });
    itemDurabilityDamage(attackEntity, itemStack, EquipmentSlot10.Mainhand);
  }
  // 右クリック
  onUse(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    if (!itemStack) {
      return;
    }
    const breadShotObject = BreadShotObjects.find((obj) => obj.itemName == itemStack.typeId);
    breadShotObject.func(player);
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: breadShotObject.sendMsg }] });
    itemDurabilityDamage(player, itemStack, EquipmentSlot10.Mainhand);
    const cool = itemStack.getComponent(ItemComponentTypes6.Cooldown);
    cool.startCooldown(player);
  }
};

// scripts/items/weapon/bazooka/FireShellMagic.ts
import { EntityDamageCause as EntityDamageCause51, Player as Player64, system as system26 } from "@minecraft/server";
async function fireShell(entity, dameger) {
  try {
    const dim = dameger.dimension;
    const enLoc = entity.location;
    dameger.addTag("fire_shell");
    const intervalNum = system26.runInterval(() => {
      dim.spawnParticle("kurokumaft:fire_shell", enLoc);
      const filterOption = {
        excludeTags: [
          "fire_shell"
        ],
        location: enLoc,
        maxDistance: 6
      };
      addTeamsTagFilter(dameger, filterOption);
      const targets = dim.getEntities(filterOption);
      targets.forEach((en) => {
        if (en instanceof Player64) {
          en.applyDamage(1, {
            cause: EntityDamageCause51.fire
          });
        } else {
          en.applyDamage(3, {
            cause: EntityDamageCause51.fire
          });
        }
      });
    }, 5);
    system26.runTimeout(() => {
      system26.clearRun(intervalNum);
      dameger.removeTag("fire_shell");
    }, 60);
  } catch (error) {
  } finally {
    entity.remove();
  }
}

// scripts/items/weapon/bazooka/IceShellMagic.ts
import { EntityDamageCause as EntityDamageCause52, Player as Player65, system as system27 } from "@minecraft/server";
async function iceShell(entity, dameger) {
  try {
    const dim = dameger.dimension;
    const enLoc = entity.location;
    dameger.addTag("ice_shell");
    const intervalNum = system27.runInterval(() => {
      dim.spawnParticle("kurokumaft:ice_shell", enLoc);
      const filterOption = {
        excludeTags: [
          "ice_shell"
        ],
        location: enLoc,
        maxDistance: 6
      };
      addTeamsTagFilter(dameger, filterOption);
      const targets = dim.getEntities(filterOption);
      targets.forEach((en) => {
        if (en instanceof Player65) {
          en.applyDamage(1, {
            cause: EntityDamageCause52.freezing
          });
        } else {
          en.applyDamage(3, {
            cause: EntityDamageCause52.freezing
          });
        }
      });
    }, 5);
    system27.runTimeout(() => {
      system27.clearRun(intervalNum);
      dameger.removeTag("ice_shell");
    }, 60);
  } catch (error) {
  } finally {
    entity.remove();
  }
}

// scripts/items/weapon/bazooka/LightningShellMagic.ts
import { EntityDamageCause as EntityDamageCause53, Player as Player66, system as system28 } from "@minecraft/server";
async function lightningShell(entity, dameger) {
  try {
    const dim = dameger.dimension;
    const enLoc = entity.location;
    dameger.addTag("lightning_shell");
    const intervalNum = system28.runInterval(() => {
      dim.spawnParticle("kurokumaft:lightning_shell", enLoc);
      const filterOption = {
        excludeTags: [
          "lightning_shell"
        ],
        location: enLoc,
        maxDistance: 6
      };
      addTeamsTagFilter(dameger, filterOption);
      const targets = dim.getEntities(filterOption);
      targets.forEach((en) => {
        if (en instanceof Player66) {
          en.applyDamage(1, {
            cause: EntityDamageCause53.lightning
          });
        } else {
          en.applyDamage(3, {
            cause: EntityDamageCause53.lightning
          });
        }
      });
    }, 5);
    system28.runTimeout(() => {
      system28.clearRun(intervalNum);
      dameger.removeTag("lightning_shell");
    }, 60);
  } catch (error) {
  } finally {
    entity.remove();
  }
}

// scripts/items/weapon/bazooka/StoneShellMagic.ts
import { EntityDamageCause as EntityDamageCause54, Player as Player67, system as system29 } from "@minecraft/server";
async function stoneShell(entity, dameger) {
  try {
    const dim = dameger.dimension;
    const enLoc = entity.location;
    dameger.addTag("stone_shell");
    const intervalNum = system29.runInterval(() => {
      dim.spawnParticle("kurokumaft:stone_shell", enLoc);
      const filterOption = {
        excludeTags: [
          "stone_shell"
        ],
        location: enLoc,
        maxDistance: 6
      };
      addTeamsTagFilter(dameger, filterOption);
      const targets = dim.getEntities(filterOption);
      targets.forEach((en) => {
        if (en instanceof Player67) {
          en.applyDamage(1, {
            cause: EntityDamageCause54.stalagmite
          });
        } else {
          en.applyDamage(3, {
            cause: EntityDamageCause54.stalagmite
          });
        }
      });
    }, 5);
    system29.runTimeout(() => {
      system29.clearRun(intervalNum);
      dameger.removeTag("stone_shell");
    }, 60);
  } catch (error) {
  } finally {
    entity.remove();
  }
}

// scripts/items/weapon/bazooka/WaterShellMagic.ts
import { EntityDamageCause as EntityDamageCause55, Player as Player68, system as system30 } from "@minecraft/server";
async function waterShell(entity, dameger) {
  try {
    const dim = dameger.dimension;
    const enLoc = entity.location;
    dameger.addTag("water_shell");
    const intervalNum = system30.runInterval(() => {
      dim.spawnParticle("kurokumaft:water_shell", enLoc);
      const filterOption = {
        excludeTags: [
          "water_shell"
        ],
        location: enLoc,
        maxDistance: 6
      };
      addTeamsTagFilter(dameger, filterOption);
      const targets = dim.getEntities(filterOption);
      targets.forEach((en) => {
        if (en instanceof Player68) {
          en.applyDamage(1, {
            cause: EntityDamageCause55.drowning
          });
        } else {
          en.applyDamage(3, {
            cause: EntityDamageCause55.drowning
          });
        }
      });
    }, 5);
    system30.runTimeout(() => {
      system30.clearRun(intervalNum);
      dameger.removeTag("water_shell");
    }, 60);
  } catch (error) {
  } finally {
    entity.remove();
  }
}

// scripts/items/weapon/bazooka/WindShellMagic.ts
import { EntityDamageCause as EntityDamageCause56, Player as Player69, system as system31 } from "@minecraft/server";
async function windShell(entity, dameger) {
  try {
    const dim = dameger.dimension;
    const enLoc = entity.location;
    dameger.addTag("wind_shell");
    const intervalNum = system31.runInterval(() => {
      dim.spawnParticle("kurokumaft:wind_shell", enLoc);
      const filterOption = {
        excludeTags: [
          "wind_shell"
        ],
        location: enLoc,
        maxDistance: 6
      };
      addTeamsTagFilter(dameger, filterOption);
      const targets = dim.getEntities(filterOption);
      targets.forEach((en) => {
        if (en instanceof Player69) {
          en.applyDamage(1, {
            cause: EntityDamageCause56.fall
          });
        } else {
          en.applyDamage(3, {
            cause: EntityDamageCause56.fall
          });
        }
      });
    }, 5);
    system31.runTimeout(() => {
      system31.clearRun(intervalNum);
      dameger.removeTag("wind_shell");
    }, 60);
  } catch (error) {
  } finally {
    entity.remove();
  }
}

// scripts/items/weapon/bazooka/BazookaWeaponMagic.ts
var BazookaChargeObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_bazooka"
  },
  {
    itemName: "kurokumaft:water_magic_bazooka"
  },
  {
    itemName: "kurokumaft:wind_magic_bazooka"
  },
  {
    itemName: "kurokumaft:stone_magic_bazooka"
  },
  {
    itemName: "kurokumaft:lightning_magic_bazooka"
  },
  {
    itemName: "kurokumaft:ice_magic_bazooka"
  }
]);
var ShellBomObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_shell",
    func: fireShell
  },
  {
    itemName: "kurokumaft:water_magic_shell",
    func: waterShell
  },
  {
    itemName: "kurokumaft:wind_magic_shell",
    func: windShell
  },
  {
    itemName: "kurokumaft:stone_magic_shell",
    func: stoneShell
  },
  {
    itemName: "kurokumaft:lightning_magic_shell",
    func: lightningShell
  },
  {
    itemName: "kurokumaft:ice_magic_shell",
    func: iceShell
  }
]);
var BazookaShotMagic = class {
  // チャージ完了
  onCompconsteUse(event) {
    const itemStack = event.itemStack;
    const player = event.source;
  }
  // 右クリック
  onUse(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    if (!itemStack) {
      return;
    }
  }
};
function checkShellProjectile(projectileName) {
  return ShellBomObjects.some((obj) => obj.itemName == projectileName);
}
function hitShellEvent(projectile, dameger) {
  const proje = ShellBomObjects.find((obj) => obj.itemName == projectile.typeId);
  try {
    proje.func(projectile, dameger);
  } catch (error) {
  }
}

// scripts/items/weapon/gun/GunWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot11 } from "@minecraft/server";
var GunChargeObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_gun",
    event: "kurokumaft:fire_magic_bulconst",
    sendMsg: "magic.kurokumaft:fire_magic_bulconst.translate",
    property: "kurokumaft:gun_charge_fire"
  },
  {
    itemName: "kurokumaft:water_magic_gun",
    event: "kurokumaft:water_magic_bulconst",
    sendMsg: "magic.kurokumaft:water_magic_bulconst.translate",
    property: "kurokumaft:gun_charge_water"
  },
  {
    itemName: "kurokumaft:wind_magic_gun",
    event: "kurokumaft:wind_magic_bulconst",
    sendMsg: "magic.kurokumaft:wind_magic_bulconst.translate",
    property: "kurokumaft:gun_charge_wind"
  },
  {
    itemName: "kurokumaft:stone_magic_gun",
    event: "kurokumaft:stone_magic_bulconst",
    sendMsg: "magic.kurokumaft:stone_magic_bulconst.translate",
    property: "kurokumaft:gun_charge_stone"
  },
  {
    itemName: "kurokumaft:lightning_magic_gun",
    event: "kurokumaft:lightning_magic_bulconst",
    sendMsg: "magic.kurokumaft:lightning_magic_bulconst.translate",
    property: "kurokumaft:gun_charge_lightning"
  },
  {
    itemName: "kurokumaft:ice_magic_gun",
    event: "kurokumaft:ice_magic_bulconst",
    sendMsg: "magic.kurokumaft:ice_magic_bulconst.translate",
    property: "kurokumaft:gun_charge_ice"
  }
]);
var GunShotMagic = class {
  // チャージ完了
  onCompconsteUse(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    if (!itemStack) {
      return;
    }
    const gunMagicObject = GunChargeObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (gunMagicObject) {
      player.setProperty(gunMagicObject.property, 1);
    }
  }
  // 右クリック
  onUse(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    if (!itemStack) {
      return;
    }
    const gunMagicObject = GunChargeObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (gunMagicObject) {
      if (player.getProperty(gunMagicObject.property) == 2) {
        magicGunShot(player, itemStack, gunMagicObject);
      }
    }
  }
};
function isChargeed(player, itemStack) {
  const gunMagicObject = GunChargeObjects.find((obj) => obj.itemName == itemStack.typeId);
  if (gunMagicObject) {
    if (player.getProperty(gunMagicObject.property) == 1) {
      player.setProperty(gunMagicObject.property, 2);
      return true;
    }
    return false;
  }
  return false;
}
async function magicGunShot(player, itemStack, gunMagicObject) {
  if (gunMagicObject.itemName == "kurokumaft:water_magic_gun") {
    shooting(player, gunMagicObject.event + "<kurokumaft:projectile_1>", 0, 3, void 0);
    shooting(player, gunMagicObject.event + "<kurokumaft:projectile_2>", 0, 3, void 0);
    shooting(player, gunMagicObject.event + "<kurokumaft:projectile_3>", 0, 3, void 0);
    shooting(player, gunMagicObject.event + "<kurokumaft:projectile_4>", 0, 3, void 0);
    shooting(player, gunMagicObject.event + "<kurokumaft:projectile_5>", 0, 3, void 0);
    shooting(player, gunMagicObject.event + "<kurokumaft:projectile_6>", 0, 3, void 0);
    shooting(player, gunMagicObject.event + "<kurokumaft:projectile_7>", 0, 3, void 0);
    shooting(player, gunMagicObject.event + "<kurokumaft:projectile_8>", 0, 3, void 0);
  } else {
    shooting(player, gunMagicObject.event, 0, 3, void 0);
  }
  itemDurabilityDamage(player, itemStack, EquipmentSlot11.Mainhand);
  player.setProperty(gunMagicObject.property, 0);
  player.onScreenDisplay.setActionBar({ rawtext: [{ translate: gunMagicObject.sendMsg }] });
}

// scripts/items/weapon/grimoire/SummonGrimoireMagic.ts
import { EntityDamageCause as EntityDamageCause57, EquipmentSlot as EquipmentSlot12, Player as Player72, system as system32 } from "@minecraft/server";

// scripts/items/weapon/grimoire/WaterGrimoireMagic.ts
import { BlockPermutation } from "@minecraft/server";
async function water(event) {
  const entity = event.source;
  const itemStack = event.itemStack;
  const block = event.block;
  const blockFace = event.blockFace;
  let setFireF = false;
  if (MagicCraftBlocks.indexOf(block.typeId) != -1) {
    return;
  }
  BlockLocationList.forEach((obj) => {
    if (obj.direction == blockFace) {
      const blockDim = block.dimension;
      const bx = block.location.x;
      const by = block.location.y;
      const bz = block.location.z;
      const vec = { "x": bx + obj.location.x, "y": by + obj.location.y, "z": bz + obj.location.z };
      const dimeBlock = blockDim.getBlock(vec);
      if (dimeBlock.isAir) {
        const setLocation = { x: bx + obj.location.x, y: by + obj.location.y, z: bz + obj.location.z };
        blockDim.setBlockPermutation(setLocation, BlockPermutation.resolve(MinecraftBlockTypes.FlowingWater, { liquid_depth: 0 }));
        setFireF = true;
      }
    }
  });
  if (setFireF) {
    decrimentGrimoireCount(entity, itemStack);
  }
}
async function waterCauldron(event) {
  const entity = event.source;
  const itemStack = event.itemStack;
  const block = event.block;
  const blockPer = block.permutation;
  const cauldron = blockPer.getState("cauldron_liquid");
  let setFireF = false;
  if (cauldron) {
    block.setPermutation(blockPer.withState("cauldron_liquid", "water"));
    block.setPermutation(blockPer.withState("fill_level", 6));
    setFireF = true;
  }
  if (setFireF) {
    decrimentGrimoireCount(entity, itemStack);
  }
}

// scripts/items/weapon/grimoire/SummonGrimoireMagic.ts
var SummonGrimoireObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_grimoire",
    particle: "kurokumaft:fire_bread_particle",
    entity: "kurokumaft:phoenix_spear",
    sendMsg: "entity.kurokumaft:phoenix_spear.name",
    extag: "phoenix_spear_selt",
    damageType: EntityDamageCause57.fire,
    damageParticle: "kurokumaft:phoenix_wall_particle"
  }
]);
var SummonGrimoireMagic = class {
  // 右クリック
  onUse(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    const summonMagicObject = SummonGrimoireObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (summonMagicObject) {
      grimoire_summon_Release(player, itemStack);
    }
  }
  onUseOn(event, arg1) {
    const item = event.itemStack;
    if (item != void 0 && item.typeId == "kurokumaft:grimoire_water") {
      waterCauldron(event);
    }
  }
};
async function grimoire_summon_Release(player, itemStack) {
  const summonMagicObject = SummonGrimoireObjects.find((obj) => obj.itemName == itemStack.typeId);
  player.dimension.spawnParticle(summonMagicObject.particle, { x: player.location.x, y: player.location.y + 0.75, z: player.location.z });
  player.onScreenDisplay.setActionBar({ rawtext: [{ translate: summonMagicObject.sendMsg }] });
  player.addTag(summonMagicObject.extag);
  const point = getLookRotaionPointsV2(player.getRotation(), 8, 0);
  const summonMons = player.dimension.spawnEntity(summonMagicObject.entity, { x: player.location.x + point.x, y: player.location.y + 4, z: player.location.z + point.z });
  const sommonLoc = summonMons.location;
  summonGrimoireDurabilityDamage(player, itemStack, EquipmentSlot12.Mainhand);
  const intervalNum = system32.runInterval(() => {
    const filterOption = {
      excludeTags: [
        summonMagicObject.extag
      ],
      location: sommonLoc,
      maxDistance: 25
    };
    addTeamsTagFilter(player, filterOption);
    const targets = player.dimension.getEntities(filterOption);
    targets.forEach((en) => {
      if (!en.isValid) {
        return;
      }
      if (en instanceof Player72) {
        en.applyDamage(5, {
          cause: summonMagicObject.damageType
        });
      } else {
        en.applyDamage(15, {
          cause: summonMagicObject.damageType
        });
      }
      en.dimension.spawnParticle(summonMagicObject.damageParticle, en.location);
    });
  }, 10);
  system32.runTimeout(() => {
    system32.clearRun(intervalNum);
    player.removeTag(summonMagicObject.extag);
    summonMons.remove();
  }, 100);
}

// scripts/block/TorchlightBlock.ts
var TorchlightBlock = class {
  onPlace(blockEvent) {
    torchlightFire(blockEvent);
  }
  onTick(blockEvent) {
    torchlightFire(blockEvent);
  }
};
async function torchlightFire(blockEvent) {
  const block = blockEvent.block;
  const dimension = blockEvent.dimension;
  dimension.spawnParticle("kurokumaft:torchlight_fire", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
}

// scripts/items/weapon/grimoire/FireGrimoireMagic.ts
import { BlockPermutation as BlockPermutation2 } from "@minecraft/server";
async function torchlight(event) {
  const entity = event.source;
  const blockPerm = event.usedOnBlockPermutation;
  const itemStack = event.itemStack;
  const block = event.block;
  const blockFace = event.blockFace;
  const faceLocation = event.faceLocation;
  if (block.typeId.indexOf("chest") == -1 && block.typeId.indexOf("boat") == -1 && MagicCraftBlocks.indexOf(block.typeId) == -1) {
    decrimentGrimoireCount(entity, itemStack);
  }
}
async function ignited(event) {
  const entity = event.source;
  const blockPerm = event.usedOnBlockPermutation;
  const itemStack = event.itemStack;
  const block = event.block;
  const blockFace = event.blockFace;
  const faceLocation = event.faceLocation;
  const blockPer = block.permutation;
  const extinguished = blockPer.getState("extinguished");
  const lit = blockPer.getState("lit");
  let setFireF = false;
  if (MagicCraftBlocks.indexOf(block.typeId) != -1) {
    return;
  }
  if (extinguished) {
    block.setPermutation(blockPer.withState("extinguished", false));
    setFireF = true;
  } else if (lit != void 0 && !lit) {
    block.setPermutation(blockPer.withState("lit", true));
    setFireF = true;
  } else if (block.typeId == "minecraft:tnt") {
    const blockDim = block.dimension;
    blockDim.setBlockType(block.location, MinecraftBlockTypes.Air);
    const tnt = blockDim.spawnEntity(MinecraftEntityTypes.Tnt, block.location);
    setFireF = true;
  } else {
    BlockLocationList.forEach((obj) => {
      if (obj.direction == blockFace) {
        const bx = block.location.x;
        const by = block.location.y;
        const bz = block.location.z;
        const vec = { "x": bx + obj.location.x, "y": by + obj.location.y, "z": bz + obj.location.z };
        const blockDim = block.dimension;
        const dimeBlock = blockDim.getBlock(vec);
        if (dimeBlock.isAir) {
          const setLocation = { x: bx + obj.location.x, y: by + obj.location.y, z: bz + obj.location.z };
          blockDim.setBlockPermutation(setLocation, BlockPermutation2.resolve(MinecraftBlockTypes.Fire, { age: 0 }));
          setFireF = true;
        }
      }
    });
  }
  if (setFireF) {
    decrimentGrimoireCount(entity, itemStack);
  }
}

// scripts/items/weapon/grimoire/WindGrimoireMagic.ts
import { system as system33, Player as Player74, world as world21 } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
var MowingBlockS = Object.freeze([
  "minecraft:bamboo",
  "minecraft:bamboo_sapling",
  "minecraft:acacia_leaves",
  "minecraft:dark_oak_leaves",
  "minecraft:oak_leaves",
  "minecraft:spruce_leaves",
  "minecraft:birch_leaves",
  "minecraft:jungle_leaves",
  "minecraft:azalea_leaves",
  "minecraft:azalea_leaves_flowered",
  "minecraft:cherry_leaves",
  "minecraft:mangrove_leaves",
  "minecraft:reeds",
  "minecraft:cave_vines",
  "minecraft:cave_vines_body_with_berries",
  "minecraft:cave_vines_head_with_berries",
  "minecraft:twisting_vines",
  "minecraft:wheat",
  "minecraft:vine",
  "minecraft:pumpkin_stem",
  "minecraft:pumpkin",
  "minecraft:warped_stem",
  "minecraft:crimson_stem",
  "minecraft:melon_stem",
  "minecraft:melon",
  "minecraft:cocoa",
  "minecraft:potatoes",
  "minecraft:carrots",
  "minecraft:sweet_berry_bush",
  "minecraft:kelp",
  "minecraft:brown_mushroom",
  "minecraft:brown_mushroom_block",
  "minecraft:red_mushroom",
  "minecraft:red_mushroom_block",
  "minecraft:crimson_fungus",
  "minecraft:warped_fungus",
  "minecraft:tallgrass",
  "minecraft:poppy",
  "minecraft:blue_orchid",
  "minecraft:allium",
  "minecraft:azure_bluet",
  "minecraft:red_tulip",
  "minecraft:orange_tulip",
  "minecraft:white_tulip",
  "minecraft:pink_tulip",
  "minecraft:oxeye_daisy",
  "minecraft:cornflower",
  "minecraft:lily_of_the_valley",
  "minecraft:yellow_flower",
  "minecraft:lilac",
  "minecraft:large_fern",
  "minecraft:rose_bush",
  "minecraft:tall_grass",
  "minecraft:short_grass",
  "minecraft:sunflower",
  "minecraft:peony",
  "minecraft:double_plant",
  "minecraft:dandelion"
]);
async function mowing(event) {
  const entity = event.source;
  const itemStack = event.itemStack;
  const playerDim = entity.dimension;
  const bx = entity.location.x;
  const by = entity.location.y;
  const bz = entity.location.z;
  let setFireF = false;
  let xpcount1 = 0;
  const intervalNumXP = system33.runInterval(() => {
    for (let z = 0; z < 10; z++) {
      for (let y = 0; y < 10; y++) {
        const vec = { "x": bx + xpcount1, "y": by + y, "z": bz + z };
        const dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xpcount1) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
      for (let y = -1; y > -3; y--) {
        const vec = { "x": bx + xpcount1, "y": by + y, "z": bz + z };
        const dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xpcount1) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
    }
    xpcount1++;
  }, 1);
  let xmcount1 = 0;
  const intervalNumXM = system33.runInterval(() => {
    for (let z = 0; z < 10; z++) {
      for (let y = 0; y < 10; y++) {
        const vec = { "x": bx + xmcount1, "y": by + y, "z": bz + z };
        const dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xmcount1) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
      for (let y = -1; y > -3; y--) {
        const vec = { "x": bx + xmcount1, "y": by + y, "z": bz + z };
        const dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xmcount1) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
    }
    xmcount1--;
  }, 1);
  let xpcount2 = 0;
  const intervalNumZP = system33.runInterval(() => {
    for (let z = -1; z > -10; z--) {
      for (let y = 0; y < 10; y++) {
        const vec = { "x": bx + xpcount2, "y": by + y, "z": bz + z };
        const dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xpcount2) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
      for (let y = -1; y > -3; y--) {
        const vec = { "x": bx + xpcount2, "y": by + y, "z": bz + z };
        const dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xpcount2) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
    }
    xpcount2++;
  }, 1);
  let xmcount2 = 0;
  const intervalNumZM = system33.runInterval(() => {
    for (let z = -1; z > -10; z--) {
      for (let y = 0; y < 10; y++) {
        const vec = { "x": bx + xmcount2, "y": by + y, "z": bz + z };
        const dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xmcount2) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
      for (let y = -1; y > -3; y--) {
        const vec = { "x": bx + xmcount2, "y": by + y, "z": bz + z };
        const dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xmcount2) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
    }
    xmcount2--;
  }, 1);
  playerDim.spawnParticle("kurokumaft:mowing_particle", entity.location);
  system33.runTimeout(() => {
    system33.clearRun(intervalNumXP);
    system33.clearRun(intervalNumZP);
    system33.clearRun(intervalNumXM);
    system33.clearRun(intervalNumZM);
    if (setFireF) {
      decrimentGrimoireCount(entity, itemStack);
    }
  }, 15);
}
var MusicRecodes = Object.freeze([
  {
    itemName: "minecraft:music_disc_11",
    eventName: "record.11",
    viewDesc: "item.record_11.desc"
  },
  {
    itemName: "minecraft:music_disc_13",
    eventName: "record.13",
    viewDesc: "item.record_13.desc"
  },
  {
    itemName: "minecraft:music_disc_5",
    eventName: "record.5",
    viewDesc: "item.record_5.desc"
  },
  {
    itemName: "minecraft:music_disc_blocks",
    eventName: "record.blocks",
    viewDesc: "item.record_blocks.desc"
  },
  {
    itemName: "minecraft:music_disc_cat",
    eventName: "record.cat",
    viewDesc: "item.record_cat.desc"
  },
  {
    itemName: "minecraft:music_disc_chirp",
    eventName: "record.chirp",
    viewDesc: "item.record_chirp.desc"
  },
  {
    itemName: "minecraft:music_disc_far",
    eventName: "record.far",
    viewDesc: "item.record_far.desc"
  },
  {
    itemName: "minecraft:music_disc_mal",
    eventName: "record.mall",
    viewDesc: "item.record_mall.desc"
  },
  {
    itemName: "minecraft:music_disc_mellohi",
    eventName: "record.mellohi",
    viewDesc: "item.record_mellohi.desc"
  },
  {
    itemName: "minecraft:music_disc_stal",
    eventName: "record.stal",
    viewDesc: "item.record_stal.desc"
  },
  {
    itemName: "minecraft:music_disc_strad",
    eventName: "record.strad",
    viewDesc: "item.record_strad.desc"
  },
  {
    itemName: "minecraft:music_disc_wait",
    eventName: "record.wait",
    viewDesc: "item.record_wait.desc"
  },
  {
    itemName: "minecraft:music_disc_ward",
    eventName: "record.ward",
    viewDesc: "item.record_ward.desc"
  },
  {
    itemName: "minecraft:music_disc_pigstep",
    eventName: "record.pigstep",
    viewDesc: "item.record_pigstep.desc"
  },
  {
    itemName: "minecraft:music_disc_otherside",
    eventName: "record.otherside",
    viewDesc: "item.record_otherside.desc"
  },
  {
    itemName: "minecraft:music_disc_relic",
    eventName: "record.relic",
    viewDesc: "item.record_relic.desc"
  },
  {
    itemName: "minecraft:music_disc_precipice",
    eventName: "record.precipice",
    viewDesc: "item.record_precipice.desc"
  },
  {
    itemName: "minecraft:music_disc_creator",
    eventName: "record.creator",
    viewDesc: "item.record_creator.desc"
  },
  {
    itemName: "minecraft:music_disc_creator_music_box",
    eventName: "record.creator_music_box",
    viewDesc: "item.record_creator_music_box"
  }
]);
async function musicSound(event) {
  const entity = event.source;
  const itemStack = event.itemStack;
  world21.stopMusic();
  const form = new ActionFormData().title({ translate: "mess.kurokumaft:musicSound.title" }).body({ translate: "mess.kurokumaft:musicSound.body" });
  const viewList = new Array();
  if (entity instanceof Player74 && itemStack.getDynamicPropertyIds().length > 0) {
    itemStack.getDynamicPropertyIds().forEach((sound, index) => {
      const music = itemStack.getDynamicProperty(sound);
      const music_rec = MusicRecodes.find((obj) => obj.itemName == music);
      form.button({ translate: music_rec.viewDesc });
      viewList.push(music_rec.itemName);
    });
  } else {
    MusicRecodes.forEach((sound) => {
      form.button({ translate: sound.viewDesc });
      viewList.push(sound.itemName);
    });
  }
  form.show(entity).then((response) => {
    if (!response.canceled) {
      const music_rec = MusicRecodes.find((obj) => obj.itemName == viewList[response.selection]);
      world21.playMusic(music_rec.eventName, {
        volume: 1,
        fade: 5
      });
    }
  });
}

// scripts/items/weapon/grimoire/StoneGrimoireMagic.ts
import { system as system34, ItemComponentTypes as ItemComponentTypes7, BlockPermutation as BlockPermutation3, Direction as Direction4 } from "@minecraft/server";
var FlowerBlockS = Object.freeze([
  "",
  "",
  "minecraft:tallgrass",
  "minecraft:poppy",
  "minecraft:blue_orchid",
  "minecraft:allium",
  "minecraft:azure_bluet",
  "minecraft:red_tulip",
  "minecraft:orange_tulip",
  "minecraft:white_tulip",
  "minecraft:pink_tulip",
  "minecraft:oxeye_daisy",
  "minecraft:cornflower",
  "minecraft:lily_of_the_valley",
  "minecraft:yellow_flower",
  "minecraft:dandelion",
  "double",
  "double",
  "double",
  "double"
]);
var DoubleFlowerBlockS = Object.freeze([
  {
    double_plant_type: "sunflower",
    upper_block_bit: false
  },
  {
    double_plant_type: "syringa",
    upper_block_bit: false
  },
  {
    double_plant_type: "grass",
    upper_block_bit: false
  },
  {
    double_plant_type: "fern",
    upper_block_bit: false
  },
  {
    double_plant_type: "rose",
    upper_block_bit: false
  },
  {
    double_plant_type: "paeonia",
    upper_block_bit: false
  }
]);
async function flowerGarden(event) {
  const entity = event.source;
  const blockPerm = event.usedOnBlockPermutation;
  const itemStack = event.itemStack;
  const block = event.block;
  const blockFace = event.blockFace;
  const faceLocation = event.faceLocation;
  const blockDim = block.dimension;
  const bx = block.location.x;
  const by = block.location.y;
  const bz = block.location.z;
  const itemCool = itemStack.getComponent(ItemComponentTypes7.Cooldown);
  let setFireF = false;
  if (itemCool.getCooldownTicksRemaining(entity) != 0) {
    return;
  }
  if (MagicCraftBlocks.indexOf(block.typeId) != -1) {
    return;
  }
  if (blockFace == Direction4.Up) {
    blockDim.spawnParticle("kurokumaft:flower_garden_growth_emitter", block.location);
    itemCool.startCooldown(entity);
    let xpcount1 = 0;
    const intervalNumXP = system34.runInterval(() => {
      for (let z = 0; z < 8; z++) {
        const vec = { "x": bx + xpcount1, "y": by, "z": bz + z };
        const upvec = { "x": bx + xpcount1, "y": by + 1, "z": bz + z };
        const dupvec = { "x": bx + xpcount1, "y": by + 2, "z": bz + z };
        const dimeBlock = blockDim.getBlock(vec);
        const updimeBlock = blockDim.getBlock(upvec);
        if (dimeBlock.typeId == MinecraftBlockTypes.GrassBlock || dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
          if (dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
            blockDim.setBlockType(vec, MinecraftBlockTypes.GrassBlock);
          }
          if (updimeBlock.isAir) {
            const randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            if (randomBlock == "") {
              continue;
            }
            const dupdimeBlock = blockDim.getBlock(dupvec);
            if (randomBlock == "double") {
              if (dupdimeBlock.isAir) {
                const state = DoubleFlowerBlockS[Math.floor(Math.random() * DoubleFlowerBlockS.length)];
                blockDim.setBlockPermutation(upvec, BlockPermutation3.resolve("minecraft:double_plant", state));
              }
            } else {
              blockDim.setBlockType(upvec, randomBlock);
            }
            setFireF = true;
          }
        }
      }
      xpcount1++;
    }, 1);
    let xmcount1 = 0;
    const intervalNumXM = system34.runInterval(() => {
      for (let z = 0; z < 8; z++) {
        const vec = { "x": bx + xmcount1, "y": by, "z": bz + z };
        const upvec = { "x": bx + xmcount1, "y": by + 1, "z": bz + z };
        const dupvec = { "x": bx + xmcount1, "y": by + 2, "z": bz + z };
        const dimeBlock = blockDim.getBlock(vec);
        const updimeBlock = blockDim.getBlock(upvec);
        if (dimeBlock.typeId == MinecraftBlockTypes.GrassBlock || dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
          if (dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
            blockDim.setBlockType(vec, MinecraftBlockTypes.GrassBlock);
          }
          if (updimeBlock.isAir) {
            const randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            if (randomBlock == "") {
              continue;
            }
            const dupdimeBlock = blockDim.getBlock(dupvec);
            if (randomBlock == "double") {
              if (dupdimeBlock.isAir) {
                const state = DoubleFlowerBlockS[Math.floor(Math.random() * DoubleFlowerBlockS.length)];
                blockDim.setBlockPermutation(upvec, BlockPermutation3.resolve("minecraft:double_plant", state));
              }
            } else {
              blockDim.setBlockType(upvec, randomBlock);
            }
            setFireF = true;
          }
        }
      }
      xmcount1--;
    }, 1);
    let xpcount2 = 0;
    const intervalNumZP = system34.runInterval(() => {
      for (let z = -1; z > -8; z--) {
        const vec = { "x": bx + xpcount2, "y": by, "z": bz + z };
        const upvec = { "x": bx + xpcount2, "y": by + 1, "z": bz + z };
        const dupvec = { "x": bx + xpcount2, "y": by + 2, "z": bz + z };
        const dimeBlock = blockDim.getBlock(vec);
        const updimeBlock = blockDim.getBlock(upvec);
        if (dimeBlock.typeId == MinecraftBlockTypes.GrassBlock || dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
          if (dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
            blockDim.setBlockType(vec, MinecraftBlockTypes.GrassBlock);
          }
          if (updimeBlock.isAir) {
            const randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            if (randomBlock == "") {
              continue;
            }
            const dupdimeBlock = blockDim.getBlock(dupvec);
            if (randomBlock == "double") {
              if (dupdimeBlock.isAir) {
                const state = DoubleFlowerBlockS[Math.floor(Math.random() * DoubleFlowerBlockS.length)];
                blockDim.setBlockPermutation(upvec, BlockPermutation3.resolve("minecraft:double_plant", state));
              }
            } else {
              blockDim.setBlockType(upvec, randomBlock);
            }
            setFireF = true;
          }
        }
      }
      xpcount2++;
    }, 1);
    let xmcount2 = 0;
    const intervalNumZM = system34.runInterval(() => {
      for (let z = -1; z > -8; z--) {
        const vec = { "x": bx + xmcount2, "y": by, "z": bz + z };
        const upvec = { "x": bx + xmcount2, "y": by + 1, "z": bz + z };
        const dupvec = { "x": bx + xmcount2, "y": by + 2, "z": bz + z };
        const dimeBlock = blockDim.getBlock(vec);
        const updimeBlock = blockDim.getBlock(upvec);
        if (dimeBlock.typeId == MinecraftBlockTypes.GrassBlock || dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
          if (dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
            blockDim.setBlockType(vec, MinecraftBlockTypes.GrassBlock);
          }
          if (updimeBlock.isAir) {
            const randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            if (randomBlock == "") {
              continue;
            }
            const dupdimeBlock = blockDim.getBlock(dupvec);
            if (randomBlock == "double") {
              if (dupdimeBlock.isAir) {
                const state = DoubleFlowerBlockS[Math.floor(Math.random() * DoubleFlowerBlockS.length)];
                blockDim.setBlockPermutation(upvec, BlockPermutation3.resolve("minecraft:double_plant", state));
              }
            } else {
              blockDim.setBlockType(upvec, randomBlock);
            }
            setFireF = true;
          }
        }
      }
      xmcount2--;
    }, 1);
    system34.runTimeout(() => {
      system34.clearRun(intervalNumXP);
      system34.clearRun(intervalNumZP);
      system34.clearRun(intervalNumXM);
      system34.clearRun(intervalNumZM);
      if (setFireF) {
        decrimentGrimoireCount(entity, itemStack);
      }
    }, 15);
  }
}
var wood_sapling = Object.freeze([
  "minecraft:oak_sapling",
  "minecraft:spruce_sapling",
  "minecraft:birch_sapling",
  "minecraft:jungle_sapling",
  "minecraft:acacia_sapling",
  "minecraft:dark_oak_sapling"
]);
async function growth(event) {
  const player = event.source;
  const blockPerm = event.usedOnBlockPermutation;
  const itemStack = event.itemStack;
  const block = event.block;
  const blockFace = event.blockFace;
  const faceLocation = event.faceLocation;
  const blockPer = block.permutation;
  const blockDim = block.dimension;
  const bx = block.location.x;
  const by = block.location.y;
  const bz = block.location.z;
  let setFireF = false;
  if (MagicCraftBlocks.indexOf(block.typeId) != -1) {
    return;
  } else if (block.typeId == MinecraftBlockTypes.Bamboo || block.typeId == MinecraftBlockTypes.BambooSapling) {
    if (block.typeId == MinecraftBlockTypes.BambooSapling) {
      blockDim.setBlockType(block.location, MinecraftBlockTypes.Bamboo);
    }
    let count = 1;
    let demBlock = blockDim.getBlock({ "x": bx, "y": by + count, "z": bz });
    while (count <= 15 && demBlock.isAir) {
      let blockCom = BlockPermutation3.resolve(MinecraftBlockTypes.Bamboo, {
        bamboo_leaf_size: "no_leaves",
        bamboo_stalk_thickness: "thick"
      });
      if (count > 10) {
        blockCom = BlockPermutation3.resolve(MinecraftBlockTypes.Bamboo, {
          bamboo_leaf_size: "large_leaves",
          bamboo_stalk_thickness: "thick"
        });
      } else if (count > 5) {
        blockCom = BlockPermutation3.resolve(MinecraftBlockTypes.Bamboo, {
          bamboo_leaf_size: "small_leaves",
          bamboo_stalk_thickness: "thick"
        });
      }
      blockDim.setBlockPermutation({ "x": bx, "y": by + count, "z": bz }, blockCom);
      setFireF = true;
      count++;
      demBlock = blockDim.getBlock({ "x": bx, "y": by + count, "z": bz });
    }
    blockDim.spawnParticle("minecraft:crop_growth_emitter", block.location);
  } else if (block.typeId == MinecraftBlockTypes.TwistingVines) {
    let air_count = 1;
    let airBlock = blockDim.getBlock({ "x": bx, "y": by + air_count, "z": bz });
    while (air_count <= 15 && airBlock.isAir) {
      blockDim.setBlockType({ "x": bx, "y": by + air_count, "z": bz }, MinecraftBlockTypes.TwistingVines);
      setFireF = true;
      air_count++;
      airBlock = blockDim.getBlock({ "x": bx, "y": by + air_count, "z": bz });
    }
    blockDim.spawnParticle("minecraft:crop_growth_emitter", block.location);
  } else if (block.typeId == MinecraftBlockTypes.Reeds) {
    let air_count = 1;
    let airBlock = blockDim.getBlock({ "x": bx, "y": by + air_count, "z": bz });
    while (air_count <= 15 && airBlock.isAir) {
      blockDim.setBlockType({ "x": bx, "y": by + air_count, "z": bz }, MinecraftBlockTypes.Reeds);
      setFireF = true;
      air_count++;
      airBlock = blockDim.getBlock({ "x": bx, "y": by + air_count, "z": bz });
    }
    blockDim.spawnParticle("minecraft:crop_growth_emitter", block.location);
  } else if (wood_sapling.indexOf(block.typeId) != -1) {
    const age_bit = blockPer.getState("age_bit");
    if (age_bit) {
    }
  }
  if (setFireF) {
    decrimentGrimoireCount(player, itemStack);
  }
}

// scripts/items/weapon/grimoire/LifeGrimoireMagic.ts
var LifeGrimoireUseOnObjects = Object.freeze([
  {
    itemName: "kurokumaft:grimoire_torchlight",
    func: torchlight
  },
  {
    itemName: "kurokumaft:grimoire_ignited",
    func: ignited
  },
  {
    itemName: "kurokumaft:grimoire_water",
    func: water
  },
  {
    itemName: "kurokumaft:grimoire_flower_garden",
    func: flowerGarden
  },
  {
    itemName: "kurokumaft:grimoire_growth",
    func: growth
  }
]);
var LifeGrimoireUseObjects = Object.freeze([
  {
    itemName: "kurokumaft:grimoire_mowing",
    func: mowing
  },
  {
    itemName: "kurokumaft:grimoire_music_sound",
    func: musicSound
  }
]);
var LifeGrimoireBlockMagic = class {
  // ブロッククリック
  onUseOn(event) {
    const itemStack = event.itemStack;
    const magicObject = LifeGrimoireUseOnObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (magicObject) {
      magicObject.func(event);
    }
  }
};
var LifeGrimoireUseMagic = class {
  // 右クリック
  onUse(event) {
    const itemStack = event.itemStack;
    const magicObject = LifeGrimoireUseObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (magicObject) {
      magicObject.func(event);
    }
  }
};

// scripts/items/SummonStoneMagic.ts
var SummonStoneObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_horse_summon_stone",
    event: "kurokumaft:fire_horse"
  },
  {
    itemName: "kurokumaft:aqua_frog_summon_stone",
    event: "kurokumaft:aqua_frog"
  },
  {
    itemName: "kurokumaft:storm_eagle_summon_stone",
    event: "kurokumaft:storm_eagle"
  },
  {
    itemName: "kurokumaft:lightning_hornet_summon_stone",
    event: "kurokumaft:lightning_hornet"
  },
  {
    itemName: "kurokumaft:snow_bear_summon_stone",
    event: "kurokumaft:snow_bear"
  },
  {
    itemName: "kurokumaft:crag_kong_summon_stone",
    event: "kurokumaft:crag_kong"
  }
]);
var SummonStoneMagic = class {
  // ブロッククリック
  onUseOn(event) {
    const block = event.block;
    const itemStack = event.itemStack;
    const magicObject = SummonStoneObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (magicObject) {
      const loc = block.location;
      block.dimension.spawnEntity(magicObject.event, { x: loc.x, y: loc.y + 1, z: loc.z });
    }
  }
};

// scripts/block/MagicLecternBlock.ts
import { ItemStack as ItemStack16, EquipmentSlot as EquipmentSlot13, EntityComponentTypes as EntityComponentTypes6, world as world22 } from "@minecraft/server";
import { ActionFormData as ActionFormData2 } from "@minecraft/server-ui";

// scripts/block/magicLectern/GrimoireBookComponent.ts
var GrimoireBookOjects = Object.freeze({
  empty: {
    typeId: "kurokumaft:grimoire_empty",
    event: "kurokumaft:none",
    items: [
      { name: "", multiValue: 0 }
    ]
  },
  torch: {
    typeId: "kurokumaft:grimoire_torchlight",
    event: "kurokumaft:fire",
    items: [
      { name: "minecraft:coal", multiValue: 1 },
      { name: "minecraft:coal_block", multiValue: 9 },
      { name: "minecraft:charcoal", multiValue: 1 }
    ]
  },
  ignited: {
    typeId: "kurokumaft:grimoire_ignited",
    event: "kurokumaft:fire",
    items: [
      { name: "minecraft:flint", multiValue: 1 }
    ]
  },
  water: {
    typeId: "kurokumaft:grimoire_water",
    event: "kurokumaft:water",
    items: [
      { name: "minecraft:water_bucket", multiValue: 10 }
    ]
  },
  mowing: {
    typeId: "kurokumaft:grimoire_mowing",
    event: "kurokumaft:wind",
    items: [
      { name: "minecraft:shears", multiValue: 9 }
    ]
  },
  music_sound: {
    typeId: "kurokumaft:grimoire_music_sound",
    event: "kurokumaft:wind",
    items: [
      { name: "minecraft:music_disc_11", multiValue: 10 },
      { name: "minecraft:music_disc_13", multiValue: 10 },
      { name: "minecraft:music_disc_5", multiValue: 10 },
      { name: "minecraft:music_disc_blocks", multiValue: 10 },
      { name: "minecraft:music_disc_cat", multiValue: 10 },
      { name: "minecraft:music_disc_chirp", multiValue: 10 },
      { name: "minecraft:music_disc_far", multiValue: 10 },
      { name: "minecraft:music_disc_mall", multiValue: 10 },
      { name: "minecraft:music_disc_mellohi", multiValue: 10 },
      { name: "minecraft:music_disc_otherside", multiValue: 10 },
      { name: "minecraft:music_disc_pigstep", multiValue: 10 },
      { name: "minecraft:music_disc_relic", multiValue: 10 },
      { name: "minecraft:music_disc_stal", multiValue: 10 },
      { name: "minecraft:music_disc_strad", multiValue: 10 },
      { name: "minecraft:music_disc_wait", multiValue: 10 },
      { name: "minecraft:music_disc_ward", multiValue: 10 },
      { name: "minecraft:music_disc_precipice", multiValue: 10 },
      { name: "minecraft:music_disc_creator", multiValue: 10 },
      { name: "minecraft:music_disc_creator_music_box", multiValue: 10 }
    ]
  },
  growth: {
    typeId: "kurokumaft:grimoire_growth",
    event: "kurokumaft:stone",
    items: [
      { name: "minecraft:bone_meal", multiValue: 1 },
      { name: "minecraft:bone_block", multiValue: 9 },
      { name: "minecraft:bone", multiValue: 3 }
    ]
  },
  flower_garden: {
    typeId: "kurokumaft:grimoire_flower_garden",
    event: "kurokumaft:stone",
    items: [
      { name: "minecraft:poppy", multiValue: 1 },
      { name: "minecraft:blue_orchid", multiValue: 1 },
      { name: "minecraft:allium", multiValue: 1 },
      { name: "minecraft:azure_bluet", multiValue: 1 },
      { name: "minecraft:red_tulip", multiValue: 1 },
      { name: "minecraft:orange_tulip", multiValue: 1 },
      { name: "minecraft:white_tulip", multiValue: 1 },
      { name: "minecraft:pink_tulip", multiValue: 1 },
      { name: "minecraft:oxeye_daisy", multiValue: 1 },
      { name: "minecraft:cornflower", multiValue: 1 },
      { name: "minecraft:lily_of_the_valley", multiValue: 1 },
      { name: "minecraft:double_plant", multiValue: 4 }
    ]
  }
});
function getGrimoireObjectId(bookId) {
  const grimoireKeys = Object.keys(GrimoireBookOjects);
  return grimoireKeys.find((obj) => GrimoireBookOjects[obj].typeId == bookId);
}
function isGrimoireItemsObject(grimoireItemType, itemName) {
  const grimoireKeys = Object.keys(GrimoireBookOjects);
  const type = grimoireKeys.find((obj) => obj == grimoireItemType);
  if (type) {
    return GrimoireBookOjects[type].items.find((item) => item.name == itemName) != void 0;
  }
  return false;
}
function isGrimoireAllItemsObject(itemName) {
  const items = Object.values(GrimoireBookOjects).find((obj) => {
    return obj.items.find((itemObj) => {
      return itemObj.name == itemName;
    });
  });
  return items != void 0;
}
function getGrimoireItemsMultiValue(grimoireItemType, itemName) {
  const grimoireKeys = Object.keys(GrimoireBookOjects);
  const type = grimoireKeys.find((obj) => obj == grimoireItemType);
  if (type) {
    return GrimoireBookOjects[type].items.find((item) => item.name == itemName)?.multiValue;
  }
  return 0;
}
function getGrimoireAllItemsMultiValue(itemName) {
  let retVal = 1;
  Object.values(GrimoireBookOjects).forEach((obj) => {
    obj.items.forEach((itemObj) => {
      if (itemObj.name == itemName) {
        retVal = itemObj.multiValue;
      }
    });
  });
  return retVal;
}
function getGrimoireAllItemsId(itemName) {
  const obj = Object.values(GrimoireBookOjects).find((obj2) => {
    const filObj = obj2.items.find((itemObj) => {
      return itemObj.name == itemName;
    });
    return filObj;
  });
  return obj.typeId;
}
function getGrimoireAllItemsEvent(typeId) {
  const obj = Object.values(GrimoireBookOjects).find((obj2) => {
    return obj2.typeId == typeId;
  });
  return obj.event;
}
function isGrimoireAllItemsId(bookName) {
  return Object.values(GrimoireBookOjects).find((obj) => {
    return obj.typeId == bookName;
  }) != void 0;
}
function getGrimoireAllObjectsId(bookName) {
  return Object.values(GrimoireBookOjects).find((obj) => {
    return obj.typeId == bookName;
  });
}

// scripts/block/magicLectern/MagicStoneComponet.ts
var MagicStoneOjects = Object.freeze([
  {
    name: "kurokumaft:fire_magic_stone",
    state: 1,
    event: "kurokumaft:fire"
  },
  {
    name: "kurokumaft:water_magic_stone",
    state: 2,
    event: "kurokumaft:water"
  },
  {
    name: "kurokumaft:stone_magic_stone",
    state: 3,
    event: "kurokumaft:stone"
  },
  {
    name: "kurokumaft:wind_magic_stone",
    state: 4,
    event: "kurokumaft:wind"
  },
  {
    name: "kurokumaft:lightning_magic_stone",
    state: 5,
    event: "kurokumaft:lightning"
  },
  {
    name: "kurokumaft:ice_magic_stone",
    state: 6,
    event: "kurokumaft:ice"
  },
  {
    name: "kurokumaft:ligh_magic_stone",
    state: 7,
    event: "kurokumaft:ligh"
  },
  {
    name: "kurokumaft:dark_magic_stone",
    state: 8,
    event: "kurokumaft:dark"
  }
]);
function getMagicStoneOjectByName(stoneName) {
  return MagicStoneOjects.find((obj) => obj.name == stoneName);
}
function isMagicStoneOject(stoneName) {
  return MagicStoneOjects.find((obj) => obj.name == stoneName) != void 0;
}

// scripts/block/MagicLecternBlock.ts
var MagicLecternBlock = class {
  onPlayerBreak(blockEvent) {
    const block = blockEvent.block;
    const dimension = blockEvent.dimension;
    magic_lectern_break(block, dimension);
  }
  onPlayerInteract(blockEvent) {
    const player = blockEvent.player;
    world22.sendMessage(player.typeId);
    const equ = player?.getComponent(EntityComponentTypes6.Equippable);
    const item = equ.getEquipment(EquipmentSlot13.Mainhand);
    const block = blockEvent.block;
    const dimension = blockEvent.dimension;
    magic_lectern(player, item, block);
  }
};
function magic_lectern(player, item, block) {
  const blockPer = block.permutation;
  const block_entitys = block.dimension.getEntitiesAtBlockLocation({ x: block.location.x, y: block.location.y + 1, z: block.location.z });
  const grimoire_entity = block_entitys.find((en) => en.typeId === "kurokumaft:grimoire_book_entity");
  const magic_stone_entity = block_entitys.find((en) => en.typeId === "kurokumaft:magic_stone_entity");
  world22.sendMessage("" + item);
  if (item !== void 0) {
    world22.sendMessage(item.typeId);
    if (isGrimoireAllItemsId(item.typeId)) {
      world22.sendMessage("\u9B54\u5C0E\u66F8");
      world22.sendMessage("" + grimoire_entity);
      if (grimoire_entity === void 0) {
        const grimoire_book_entity = block.dimension.spawnEntity("kurokumaft:grimoire_book_entity", { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
        const bookObj = getGrimoireAllObjectsId(item.typeId);
        grimoire_book_entity.triggerEvent(bookObj.event);
        const invent = grimoire_book_entity.getComponent(EntityComponentTypes6.Inventory);
        const container = invent.container;
        const grimoire_empty = item.clone();
        grimoire_empty.amount = 1;
        container.addItem(grimoire_empty);
        const direction = blockPer.getState("minecraft:cardinal_direction");
        if (direction == "north") {
          grimoire_book_entity.triggerEvent("kurokumaft:north");
        } else if (direction == "south") {
          grimoire_book_entity.triggerEvent("kurokumaft:south");
        } else if (direction == "east") {
          grimoire_book_entity.triggerEvent("kurokumaft:east");
        } else {
          grimoire_book_entity.triggerEvent("kurokumaft:west");
        }
      }
    } else if (isMagicStoneOject(item.typeId)) {
      if (magic_stone_entity !== void 0) {
        magic_stone_entity.remove();
      }
      const new_magic_stone_entity = block.dimension.spawnEntity("kurokumaft:magic_stone_entity", { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
      new_magic_stone_entity.setDynamicProperty("stone_life_count", 10);
      const stoneComp = getMagicStoneOjectByName(item.typeId);
      new_magic_stone_entity.triggerEvent(stoneComp.event);
      const direction = blockPer.getState("minecraft:cardinal_direction");
      if (direction == "north") {
        new_magic_stone_entity.triggerEvent("kurokumaft:north");
      } else if (direction == "south") {
        new_magic_stone_entity.triggerEvent("kurokumaft:south");
      } else if (direction == "east") {
        new_magic_stone_entity.triggerEvent("kurokumaft:east");
      } else {
        new_magic_stone_entity.triggerEvent("kurokumaft:west");
      }
      const invent = new_magic_stone_entity.getComponent(EntityComponentTypes6.Inventory);
      const container = invent.container;
      const magic_stone = item.clone();
      magic_stone.amount = 1;
      container.addItem(magic_stone);
    } else {
      if (grimoire_entity !== void 0) {
        const invent = grimoire_entity.getComponent(EntityComponentTypes6.Inventory);
        const container = invent.container;
        const grimoire_book = container.getItem(0);
        if (grimoire_book == void 0) {
          return;
        }
        const lore = grimoire_book.getLore();
        let remainingNum = 0;
        if (lore.length > 0) {
          remainingNum = Number(lore[0].substring(3));
        }
        if (!block.matches(block.typeId, { "kurokumaft:stone_set": 0 })) {
          let new_grimoire_book;
          const grimoireItemType = getGrimoireObjectId(grimoire_book.typeId);
          if (grimoireItemType != "empty") {
            if (!isGrimoireItemsObject(grimoireItemType, item.typeId)) {
              noBookItem(player);
              return;
            }
            const mulVal = getGrimoireItemsMultiValue(grimoireItemType, item.typeId);
            new_grimoire_book = grimoire_book;
            if (new_grimoire_book.typeId == "kurokumaft:grimoire_music_sound") {
              new_grimoire_book.setDynamicProperty(item.typeId, item.typeId);
            }
            remainingNum = remainingNum + item.amount * mulVal;
          } else {
            if (!isGrimoireAllItemsObject(item.typeId)) {
              noBookItem(player);
              return;
            }
            const mulVal = getGrimoireAllItemsMultiValue(item.typeId);
            remainingNum = remainingNum + item.amount * mulVal;
            const bookId = getGrimoireAllItemsId(item.typeId);
            new_grimoire_book = new ItemStack16(bookId, 1);
            if (bookId == "kurokumaft:grimoire_music_sound") {
              new_grimoire_book.setDynamicProperty(item.typeId, item.typeId);
            }
            const event = getGrimoireAllItemsEvent(bookId);
            grimoire_entity.triggerEvent(event);
          }
          if (new_grimoire_book.typeId != "kurokumaft:grimoire_music_sound") {
            new_grimoire_book.setLore(["\u6B8B\u6570\uFF1A" + remainingNum]);
          }
          container.setItem(0, new_grimoire_book);
          const equ = player.getComponent(EntityComponentTypes6.Equippable);
          equ.setEquipment(EquipmentSlot13.Mainhand);
          const magic_stone_entitys = block.dimension.getEntitiesAtBlockLocation({ x: block.location.x, y: block.location.y + 1, z: block.location.z });
          for (let i = 0; i < magic_stone_entitys.length; i++) {
            if (magic_stone_entitys[i].typeId == "kurokumaft:magic_stone_entity") {
              const magic_stone_en = magic_stone_entitys[i];
              const life = magic_stone_en.getDynamicProperty("stone_life_count");
              if (life == 1) {
                magic_stone_en.remove();
              } else {
                magic_stone_en.setDynamicProperty("stone_life_count", life - 1);
              }
            }
          }
        }
      }
    }
  } else {
    if (grimoire_entity !== void 0) {
      const pinvent = player.getComponent(EntityComponentTypes6.Inventory);
      const pcontainer = pinvent.container;
      const invent = grimoire_entity.getComponent(EntityComponentTypes6.Inventory);
      const gcontainer = invent.container;
      if (pcontainer.emptySlotsCount != 0) {
        pcontainer.setItem(player.selectedSlotIndex, gcontainer.getItem(0));
      } else {
        grimoire_entity.dimension.spawnItem(gcontainer.getItem(0), grimoire_entity.location);
      }
      gcontainer.clearAll();
      grimoire_entity.remove();
    } else {
      const actionForm = new ActionFormData2().title({ translate: "tile.kurokumaft:magic_lectern.name" }).body({ rawtext: [
        { translate: "magic_lectern.mess.title" },
        { text: "\n\n" },
        { translate: "magic_lectern.mess.body1" },
        { text: "\n\n" },
        { translate: "magic_lectern.mess.errorInfo" },
        { text: "\n" }
      ] }).button({ translate: "magic_lectern.mess.confirm" });
      actionForm.show(player);
    }
  }
}
async function magic_lectern_break(block, dimension) {
  const entitys = dimension.getEntitiesAtBlockLocation({ x: block.location.x, y: block.location.y + 1, z: block.location.z });
  entitys.forEach((en) => {
    let invent = en.getComponent(EntityComponentTypes6.Inventory);
    let item = invent.container?.getItem(0);
    if (item) {
      dimension.spawnItem(item, en.location);
    }
    en.remove();
  });
}
function noBookItem(player) {
  player.onScreenDisplay.setActionBar({ translate: "magic_lectern.mess.noboobk" });
}

// scripts/block/WallBlock.ts
import { EntityDamageCause as EntityDamageCause58, TicksPerSecond as TicksPerSecond35, system as system35 } from "@minecraft/server";
var WallMagicObjects2 = Object.freeze([
  {
    itemName: "kurokumaft:lightningwall_block",
    func: lightningwall2
  },
  {
    itemName: "kurokumaft:waterwall_block",
    func: waterwall2
  },
  {
    itemName: "kurokumaft:windwall_block",
    func: windwall2
  }
]);
var WallBlock = class {
  onStepOn(blockEvent) {
    const entity = blockEvent.entity;
    if (entity != void 0) {
      const filterOption = {
        excludeFamilies: [
          "inanimate",
          "magic",
          "arrow"
        ],
        excludeTypes: [
          "item"
        ],
        location: entity.location
      };
      if (entity.matches(filterOption)) {
        const wallMagicObject = WallMagicObjects2.find((obj) => obj.itemName == blockEvent.block.typeId);
        wallMagicObject.func(blockEvent);
      }
    }
  }
  onStepOff(blockEvent) {
    const entity = blockEvent.entity;
    if (entity != void 0) {
      const wallNum = entity.getDynamicProperty("walllNum");
      if (wallNum != void 0) {
        system35.clearRun(wallNum);
      }
    }
  }
};
async function lightningwall2(blockEvent) {
  const block = blockEvent.block;
  const dimension = blockEvent.dimension;
  const entity = blockEvent.entity;
  const intervalnum = system35.runInterval(() => {
    entity.applyDamage(1, {
      cause: EntityDamageCause58.lightning
    });
  }, 4);
  entity.setDynamicProperty("walllNum", intervalnum);
}
async function waterwall2(blockEvent) {
  const block = blockEvent.block;
  const dimension = blockEvent.dimension;
  const entity = blockEvent.entity;
  const intervalnum = system35.runInterval(() => {
    entity.applyDamage(1, {
      cause: EntityDamageCause58.drowning
    });
  }, 4);
  entity.setDynamicProperty("walllNum", intervalnum);
}
async function windwall2(blockEvent) {
  const block = blockEvent.block;
  const dimension = blockEvent.dimension;
  const entity = blockEvent.entity;
  entity.addEffect(MinecraftEffectTypes.Levitation, 2 * TicksPerSecond35, {
    amplifier: 3
  });
}

// scripts/items/FlagStoneMagic.ts
import { EquipmentSlot as EquipmentSlot14, world as world24 } from "@minecraft/server";
var FlagStoneObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_flagstone",
    blockName: "kurokumaft:magma_portal_gate",
    gate: {
      x: "kurokumaft:magma_portal_x",
      z: "kurokumaft:magma_portal_z"
    },
    portalState: "magma_states"
  }
]);
var FlagStoneMagic = class {
  // ブロッククリック
  onUseOn(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    const magicObject = FlagStoneObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (magicObject) {
      setPortalStand(magicObject, event);
      itemDurabilityDamage(player, itemStack, EquipmentSlot14.Mainhand);
    }
  }
};
async function setPortalStand(magicObject, event) {
  const block = event.block;
  const face = event.blockFace;
  if (magicObject.blockName == block.typeId && face == "Up") {
    const dimension = block.dimension;
    const location = block.location;
    let xLoca = true;
    A:
      for (let x = -2; x <= 2; x++) {
        for (let y = 0; y <= 4; y++) {
          let block2 = dimension.getBlock({ x: location.x + x, y: location.y + y, z: location.z });
          if (x == -2 || x == 2) {
            if (block2 == void 0 || block2.typeId != magicObject.blockName) {
              xLoca = false;
              break A;
            }
          } else {
            if (y > 0 && y < 4) {
              if (block2 == void 0 || !block2.isAir) {
                xLoca = false;
                break A;
              }
            } else {
              if (block2 == void 0 || block2.typeId != magicObject.blockName) {
                xLoca = false;
                break A;
              }
            }
          }
        }
      }
    if (xLoca) {
      for (let x = -1; x <= 1; x++) {
        for (let y = 1; y <= 3; y++) {
          dimension.setBlockType({ x: location.x + x, y: location.y + y, z: location.z }, magicObject.gate.x);
        }
      }
      world24.setDynamicProperty(magicObject.portalState, 0);
      return;
    }
    let zLoca = true;
    A:
      for (let z = -2; z <= 2; z++) {
        for (let y = 0; y <= 4; y++) {
          let block2 = dimension.getBlock({ x: location.x, y: location.y + y, z: location.z + z });
          if (z == -2 || z == 2) {
            if (block2 == void 0 || block2.typeId != magicObject.blockName) {
              zLoca = false;
              break A;
            }
          } else {
            if (y > 0 && y < 4) {
              if (block2 == void 0 || !block2.isAir) {
                zLoca = false;
                break A;
              }
            } else {
              if (block2 == void 0 || block2.typeId != magicObject.blockName) {
                zLoca = false;
                break A;
              }
            }
          }
        }
      }
    if (zLoca) {
      for (let z = -1; z <= 1; z++) {
        for (let y = 1; y <= 3; y++) {
          dimension.setBlockType({ x: location.x, y: location.y + y, z: location.z + z }, magicObject.gate.z);
        }
      }
      world24.setDynamicProperty(magicObject.portalState, 0);
      return;
    }
  }
}

// scripts/block/BossSummonBlock.ts
var BossSummonObjects = Object.freeze([
  {
    itemName: "kurokumaft:phoenix_summon",
    entityName: "kurokumaft:phoenix",
    func: phoenixSummon
  },
  {
    itemName: "kurokumaft:fenrir_summon",
    entityName: "kurokumaft:fenrir",
    func: fenrirSummon
  }
]);
var BossSummonBlock = class {
  onStepOn(blockEvent) {
    const sumOb = BossSummonObjects.find((obj) => obj.itemName == blockEvent.block.typeId);
    sumOb.func(sumOb, blockEvent);
  }
};
async function phoenixSummon(sumOb, blockEvent) {
  const block = blockEvent.block;
  const dimension = blockEvent.dimension;
  dimension.spawnEntity(sumOb.entityName, { x: block.location.x + 0.5, y: block.location.y + 6, z: block.location.z + 0.5 });
  block.dimension.setBlockType(block.location, sumOb.itemName + "_empty");
}
async function fenrirSummon(sumOb, blockEvent) {
  const block = blockEvent.block;
  const dimension = blockEvent.dimension;
  dimension.spawnEntity(sumOb.entityName, { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
  block.dimension.setBlockType(block.location, sumOb.itemName + "_empty");
}

// scripts/block/PortalGateBlock.ts
import { world as world25 } from "@minecraft/server";
var PortalGateObjects = Object.freeze([
  {
    itemName: "kurokumaft:magma_portal_gate",
    endName: "burning_hell",
    gate: {
      x: "kurokumaft:magma_portal_x",
      z: "kurokumaft:magma_portal_z"
    },
    portalState: "magma_states",
    hellLocate: {
      x: -564,
      z: -564
    },
    tpLocate: {
      x: -544,
      z: -464
    }
  }
]);
var PortalGateBlock = class {
  onStepOn(blockEvent) {
    let gateObj = PortalGateObjects.find((obj) => obj.itemName == blockEvent.block.typeId);
    portalGateTp(gateObj, blockEvent);
  }
};
async function portalGateTp(gateObj, blockEvent) {
  const entity = blockEvent.entity;
  const block = blockEvent.block;
  const location = block.location;
  const dimension = blockEvent.dimension;
  const portal = dimension.getBlock({ x: location.x, y: location.y + 1, z: location.z });
  if (portal && (portal.typeId == gateObj.gate.x || portal.typeId == gateObj.gate.z)) {
    if (dimension.id == MinecraftDimensionTypes.Overworld) {
      const portal2 = dimension.getBlock({ x: location.x, y: location.y + 1, z: location.z });
      if (portal2 && (portal2.typeId == gateObj.gate.x || portal2.typeId == gateObj.gate.z)) {
        if (world25.getDynamicProperty(gateObj.portalState) == 0) {
          world25.setDynamicProperty(gateObj.portalState, 1);
          let zloca = gateObj.hellLocate.z;
          for (let x = 1; x <= 8; x++) {
            let xloca = gateObj.hellLocate.x;
            for (let z = 1; z <= 8; z++) {
              world25.structureManager.place(
                gateObj.endName + "_" + x + "_" + z,
                world25.getDimension(MinecraftDimensionTypes.TheEnd),
                { x: xloca, y: 100, z: zloca }
              );
              xloca += 16;
            }
            zloca += 16;
          }
        }
        if (portal2.typeId == gateObj.gate.x) {
          entity?.setDynamicProperty("hell_tp_point", { x: location.x, y: location.y, z: location.z + 2 });
        } else {
          entity?.setDynamicProperty("hell_tp_point", { x: location.x + 2, y: location.y, z: location.z });
        }
        entity?.addEffect(MinecraftEffectTypes.SlowFalling, 5, {
          amplifier: 5
        });
        entity?.teleport({ x: gateObj.tpLocate.x, y: 130, z: gateObj.tpLocate.z }, {
          dimension: world25.getDimension(MinecraftDimensionTypes.TheEnd)
        });
      }
    } else {
      const overLoc = entity?.getDynamicProperty("hell_tp_point");
      if (overLoc) {
        entity?.teleport(overLoc, {
          dimension: world25.getDimension(MinecraftDimensionTypes.Overworld)
        });
      } else {
        const player = entity;
        player?.teleport({ x: player.getSpawnPoint().x, y: player.getSpawnPoint().y, z: player.getSpawnPoint().z }, {
          dimension: world25.getDimension(MinecraftDimensionTypes.Overworld)
        });
      }
    }
  }
}

// scripts/block/PortalBlock.ts
import { world as world26 } from "@minecraft/server";
var PortalObjects = Object.freeze([
  {
    itemName: "kurokumaft:magma_portal_x",
    portalState: "magma_states"
  },
  {
    itemName: "kurokumaft:magma_portal_z",
    portalState: "magma_states"
  }
]);
var PortalBlock = class {
  onPlayerBreak(blockEvent) {
    const blockPermutation = blockEvent.brokenBlockPermutation;
    const block = blockEvent.block;
    portalGateBreak(block, blockPermutation);
  }
};
async function portalGateBreak(block, blockPermutation) {
  const portalObj = PortalObjects.find((obj) => obj.itemName == blockPermutation.type.id);
  if (portalObj) {
    world26.setDynamicProperty(portalObj.portalState, 0);
    for (let x = -2; x <= 2; x++) {
      for (let y = -2; y <= 2; y++) {
        const portal = block.dimension.getBlock({ x: block.location.x + x, y: block.location.y + y, z: block.location.z });
        if (portal && portal.typeId == portalObj.itemName) {
          block.dimension.setBlockType({ x: block.location.x + x, y: block.location.y + y, z: block.location.z }, MinecraftBlockTypes.Air);
        }
      }
    }
    for (let z = -2; z <= 2; z++) {
      for (let y = -2; y <= 2; y++) {
        const portal = block.dimension.getBlock({ x: block.location.x, y: block.location.y + y, z: block.location.z + z });
        if (portal && portal.typeId == portalObj.itemName) {
          block.dimension.setBlockType({ x: block.location.x, y: block.location.y + y, z: block.location.z + z }, MinecraftBlockTypes.Air);
        }
      }
    }
  }
}

// scripts/items/food/RepatriationFruitMagic.ts
import { EntityComponentTypes as EntityComponentTypes7, world as world27 } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
var RepatriationFruitMagic = class {
  onConsume(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    home_tp(player, itemStack);
  }
  onUseOn(event) {
    const player = event.source;
    const itemStack = event.itemStack;
    const block = event.block;
    if (block.typeId == "kurokumaft:home_gate") {
      homeSetDialog(player, itemStack, block);
    }
  }
};
function homeSetDialog(player, item, block) {
  const modalForm = new ModalFormData().title({ translate: "mess.kurokumaft:homegate.title" });
  modalForm.textField({ translate: "mess.kurokumaft:homegate.textLabel" }, "");
  modalForm.show(player).then((formData) => {
    if (!formData.formValues) {
      return;
    }
    item.setLore([
      "base:" + formData.formValues[0],
      "x:" + block.location.x,
      "y:" + block.location.y,
      "x:" + block.location.z,
      block.dimension.id
    ]);
    const inventory = player.getComponent(EntityComponentTypes7.Inventory);
    if (inventory && inventory.container) {
      inventory.container.setItem(player.selectedSlotIndex, item);
      player.sendMessage({ translate: "mess.kurokumaft:homegate.commit" });
    }
  }).catch((error) => {
    return -1;
  });
}
async function home_tp(player, item) {
  const lores = item.getLore();
  if (lores.length > 0 && lores[0].length > 0) {
    const blockx = lores[1].substring(2);
    const blocky = lores[2].substring(2);
    const blockz = lores[3].substring(2);
    let homeDim;
    try {
      homeDim = world27.getDimension(lores[4]);
    } catch (error) {
      homeDim = player.dimension;
    }
    player.teleport({ x: Number(blockx), y: Number(blocky) + 1, z: Number(blockz) }, {
      dimension: homeDim
    });
  }
}

// scripts/items/food/lognut/FireLogNut.ts
import { TicksPerSecond as TicksPerSecond36 } from "@minecraft/server";
async function fireNutStrengthUp(player) {
  try {
    player.addEffect(MinecraftEffectTypes.Strength, 10 * TicksPerSecond36, {
      amplifier: 10
    });
    player.addEffect(MinecraftEffectTypes.Hunger, 30 * TicksPerSecond36, {
      amplifier: 5
    });
    player.addEffect(MinecraftEffectTypes.Poison, 15 * TicksPerSecond36, {
      amplifier: 5
    });
  } catch (error) {
  }
}

// scripts/items/food/lognut/WaterLogNut.ts
import { TicksPerSecond as TicksPerSecond37 } from "@minecraft/server";
async function waterNutHealthBoost(player) {
  try {
    player.addEffect(MinecraftEffectTypes.HealthBoost, 10 * TicksPerSecond37, {
      amplifier: 20
    });
    player.addEffect(MinecraftEffectTypes.InstantHealth, 1 * TicksPerSecond37, {
      amplifier: 20
    });
    player.addEffect(MinecraftEffectTypes.Hunger, 30 * TicksPerSecond37, {
      amplifier: 5
    });
    player.addEffect(MinecraftEffectTypes.Poison, 15 * TicksPerSecond37, {
      amplifier: 5
    });
  } catch (error) {
  }
}

// scripts/items/food/lognut/WindLogNut.ts
import { TicksPerSecond as TicksPerSecond38 } from "@minecraft/server";
async function windNutJumpBoost(player) {
  try {
    player.addEffect(MinecraftEffectTypes.JumpBoost, 10 * TicksPerSecond38, {
      amplifier: 10
    });
    player.addEffect(MinecraftEffectTypes.Hunger, 30 * TicksPerSecond38, {
      amplifier: 5
    });
    player.addEffect(MinecraftEffectTypes.Poison, 15 * TicksPerSecond38, {
      amplifier: 5
    });
  } catch (error) {
  }
}

// scripts/items/food/lognut/StoneLogNut.ts
import { TicksPerSecond as TicksPerSecond39 } from "@minecraft/server";
async function stoneNutResistance(player) {
  try {
    player.addEffect(MinecraftEffectTypes.Resistance, 10 * TicksPerSecond39, {
      amplifier: 10
    });
    player.addEffect(MinecraftEffectTypes.Hunger, 30 * TicksPerSecond39, {
      amplifier: 5
    });
    player.addEffect(MinecraftEffectTypes.Poison, 15 * TicksPerSecond39, {
      amplifier: 5
    });
  } catch (error) {
  }
}

// scripts/items/food/lognut/IceLogNut.ts
import { TicksPerSecond as TicksPerSecond40 } from "@minecraft/server";
async function iceNutAbsorption(player) {
  try {
    player.addEffect(MinecraftEffectTypes.Absorption, 10 * TicksPerSecond40, {
      amplifier: 10
    });
    player.addEffect(MinecraftEffectTypes.Hunger, 30 * TicksPerSecond40, {
      amplifier: 5
    });
    player.addEffect(MinecraftEffectTypes.Poison, 15 * TicksPerSecond40, {
      amplifier: 5
    });
  } catch (error) {
  }
}

// scripts/items/food/lognut/LightningLogNut.ts
import { TicksPerSecond as TicksPerSecond41 } from "@minecraft/server";
async function lightningNutSpeedUp(player) {
  try {
    player.addEffect(MinecraftEffectTypes.Speed, 10 * TicksPerSecond41, {
      amplifier: 10
    });
    player.addEffect(MinecraftEffectTypes.Hunger, 30 * TicksPerSecond41, {
      amplifier: 5
    });
    player.addEffect(MinecraftEffectTypes.Poison, 15 * TicksPerSecond41, {
      amplifier: 5
    });
  } catch (error) {
  }
}

// scripts/items/food/lognut/MagicLogNutEat.ts
var MagicLogNutObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_log_nut",
    func: fireNutStrengthUp
  },
  {
    itemName: "kurokumaft:water_log_nut",
    func: waterNutHealthBoost
  },
  {
    itemName: "kurokumaft:wind_log_nut",
    func: windNutJumpBoost
  },
  {
    itemName: "kurokumaft:stone_log_nut",
    func: stoneNutResistance
  },
  {
    itemName: "kurokumaft:lightning_log_nut",
    func: lightningNutSpeedUp
  },
  {
    itemName: "kurokumaft:ice_log_nut",
    func: iceNutAbsorption
  }
]);
var MagicLogNutEat = class {
  onConsume(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    const nut = MagicLogNutObjects.find((obj) => obj.itemName == itemStack.typeId);
    nut.func(player);
  }
};

// scripts/items/potion/DiamondBottle.ts
import { Direction as Direction5, EntityComponentTypes as EntityComponentTypes8, EquipmentSlot as EquipmentSlot15, ItemStack as ItemStack19 } from "@minecraft/server";
var DiamondBottle = class {
  onUseOn(event) {
    const bottle = event.itemStack;
    const player = event.source;
    const block = event.block;
    if (block.typeId != MinecraftBlockTypes.Water) {
      const blockFace = event.blockFace;
      let faceBlock;
      const blocLocation = block.location;
      if (Direction5.Up == blockFace) {
        faceBlock = player.dimension.getBlock({ x: blocLocation.x, y: blocLocation.y + 1, z: blocLocation.z });
      } else if (Direction5.Down == blockFace) {
        faceBlock = player.dimension.getBlock({ x: blocLocation.x, y: blocLocation.y - 1, z: blocLocation.z });
      } else if (Direction5.East == blockFace) {
        faceBlock = player.dimension.getBlock({ x: blocLocation.x + 1, y: blocLocation.y, z: blocLocation.z });
      } else if (Direction5.West == blockFace) {
        faceBlock = player.dimension.getBlock({ x: blocLocation.x - 1, y: blocLocation.y, z: blocLocation.z });
      } else if (Direction5.North == blockFace) {
        faceBlock = player.dimension.getBlock({ x: blocLocation.x, y: blocLocation.y, z: blocLocation.z - 1 });
      } else if (Direction5.South == blockFace) {
        faceBlock = player.dimension.getBlock({ x: blocLocation.x, y: blocLocation.y, z: blocLocation.z + 1 });
      }
      if (faceBlock == void 0 || faceBlock.typeId != MinecraftBlockTypes.Water) {
        return;
      }
    }
    const equippable = player.getComponent(EntityComponentTypes8.Equippable);
    const inventory = player.getComponent(EntityComponentTypes8.Inventory);
    const waterBottle = new ItemStack19("kurokumaft:diamond_bottle_water", 1);
    const remaining = bottle.amount - 1;
    if (remaining <= 0) {
      equippable.setEquipment(EquipmentSlot15.Mainhand, void 0);
      equippable.setEquipment(EquipmentSlot15.Mainhand, waterBottle);
    } else {
      bottle.amount -= 1;
      equippable.setEquipment(EquipmentSlot15.Mainhand, bottle);
      const container = inventory.container;
      if (container.emptySlotsCount == 0) {
        const point = getLookPoints(player.getRotation(), player.location, 1);
        player.dimension.spawnItem(waterBottle, point);
      } else {
        container.addItem(waterBottle);
      }
    }
  }
};

// scripts/block/MagicBrewingStand.ts
import { ItemStack as ItemStack20, EntityComponentTypes as EntityComponentTypes9, system as system36, TicksPerSecond as TicksPerSecond42 } from "@minecraft/server";
var MagicBrewingItemObjects = Object.freeze([
  {
    materialItem: "kurokumaft:fire_log_nut",
    stoneItem: "kurokumaft:fire_magic_stone",
    outputItem: "kurokumaft:fire_strengt_potion",
    type: "fire",
    lore: "\u653B\u6483\u529B\u4E0A\u6607 \u2169 (10:00)",
    particle: "kurokumaft:brewing_frame"
  },
  {
    materialItem: "kurokumaft:water_log_nut",
    stoneItem: "kurokumaft:water_magic_stone",
    outputItem: "kurokumaft:water_healthboost_potion",
    type: "water",
    lore: "\u4F53\u529B\u5897\u5F37 \u2169 (10:00)",
    particle: "kurokumaft:brewing_water"
  },
  {
    materialItem: "kurokumaft:wind_log_nut",
    stoneItem: "kurokumaft:wind_magic_stone",
    outputItem: "kurokumaft:wind_jumpboost_potion",
    type: "wind",
    lore: "\u8DF3\u8E8D\u529B\u4E0A\u6607 \u2169 (10:00)",
    particle: "kurokumaft:brewing_wind"
  },
  {
    materialItem: "kurokumaft:stone_log_nut",
    stoneItem: "kurokumaft:stone_magic_stone",
    outputItem: "kurokumaft:stone_resistance_potion",
    type: "stone",
    lore: "\u8010\u6027 \u2169 (10:00)",
    particle: "kurokumaft:brewing_stone"
  },
  {
    materialItem: "kurokumaft:lightning_log_nut",
    stoneItem: "kurokumaft:lightning_magic_stone",
    outputItem: "kurokumaft:lightning_speedup_potion",
    type: "lightning",
    lore: "\u79FB\u52D5\u901F\u5EA6\u4E0A\u6607 \u2169 (10:00)",
    particle: "kurokumaft:brewing_lightning"
  },
  {
    materialItem: "kurokumaft:ice_log_nut",
    stoneItem: "kurokumaft:ice_magic_stone",
    outputItem: "kurokumaft:ice_absorption_potion",
    type: "ice",
    lore: "\u885D\u6483\u5438\u53CE \u2169 (10:00)",
    particle: "kurokumaft:brewing_ice"
  }
]);
var MagicBrewingStandBlock = class {
  onPlace(blockEvent) {
    const block = blockEvent.block;
    const dimension = blockEvent.dimension;
    const magic_brewing_stand = dimension.spawnEntity("kurokumaft:magic_brewing_stand", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
    magic_brewing_stand.nameTag = "magic_brewing_stand";
    const direction = block.permutation.getState("minecraft:cardinal_direction");
    if (direction == "north") {
      magic_brewing_stand.setProperty("kurokumaft:stand_pos", "n");
    } else if (direction == "south") {
      magic_brewing_stand.setProperty("kurokumaft:stand_pos", "s");
    } else if (direction == "east") {
      magic_brewing_stand.setProperty("kurokumaft:stand_pos", "e");
    } else if (direction == "west") {
      magic_brewing_stand.setProperty("kurokumaft:stand_pos", "w");
    }
    new MagicBrewingStand(magic_brewing_stand, block).checkPosionBrewTick();
  }
  onPlayerBreak(blockEvent) {
    const block = blockEvent.block;
    const dimension = blockEvent.dimension;
    breakMagicBrewing(block, dimension);
  }
};
var MagicBrewingStand = class {
  constructor(stand, block) {
    this.stand = stand;
    this.block = block;
    this.stand.setProperty("kurokumaft:brewing_fuel", 0);
    this.stand.setProperty("kurokumaft:bottle_type", "empty");
  }
  checkPosionBrewTick() {
    this.checkJob();
  }
  async checkJob() {
    if (this.stand.isValid) {
      const inventory = this.stand.getComponent(EntityComponentTypes9.Inventory);
      const container = inventory.container;
      const materialItem = container.getItem(0);
      const stoneItem = container.getItem(1);
      const fuelItem = container.getItem(2);
      const outputItem = container.getItem(3);
      if (outputItem != void 0) {
        if (outputItem.typeId == "kurokumaft:diamond_bottle_water") {
          this.stand.setProperty("kurokumaft:bottle_type", "magic");
        } else {
          this.stand.setProperty("kurokumaft:bottle_type", isPorionBottle(outputItem));
        }
        if (materialItem != void 0 && stoneItem != void 0) {
          const brewingItemObject = getBrewingItemObject(materialItem, stoneItem);
          if (brewingItemObject != void 0) {
            if (fuelItem != void 0 && fuelItem.typeId == "minecraft:blaze_powder" && outputItem.typeId == "kurokumaft:diamond_bottle_water") {
              let brewingCount = this.stand.getProperty("kurokumaft:brewing_fuel");
              this.stand.dimension.spawnParticle(brewingItemObject.particle, this.stand.location);
              brewingCount++;
              if (brewingCount == 10) {
                const newOutputItem = new ItemStack20(brewingItemObject.outputItem, 1);
                newOutputItem.setLore([brewingItemObject.lore]);
                container.setItem(3, void 0);
                container.setItem(3, newOutputItem);
                materialItem.amount--;
                if (materialItem.amount == 0) {
                  container.setItem(0, void 0);
                } else {
                  container.setItem(0, materialItem);
                }
                stoneItem.amount--;
                if (stoneItem.amount == 0) {
                  container.setItem(1, void 0);
                } else {
                  container.setItem(1, stoneItem);
                }
                fuelItem.amount--;
                if (fuelItem.amount == 0) {
                  container.setItem(2, void 0);
                } else {
                  container.setItem(2, fuelItem);
                }
                this.stand.setProperty("kurokumaft:brewing_fuel", 0);
                this.stand.setProperty("kurokumaft:bottle_type", brewingItemObject.type);
              }
              this.stand.setProperty("kurokumaft:brewing_fuel", brewingCount);
            }
          } else {
            this.stand.setProperty("kurokumaft:brewing_fuel", 0);
          }
        } else {
          this.stand.setProperty("kurokumaft:brewing_fuel", 0);
        }
      } else {
        this.stand.setProperty("kurokumaft:brewing_fuel", 0);
        this.stand.setProperty("kurokumaft:bottle_type", "empty");
      }
      system36.runTimeout(this.checkJob.bind(this), TicksPerSecond42);
    }
  }
};
function getBrewingItemObject(materialItem, stoneItem) {
  const brewingItem = MagicBrewingItemObjects.find((predicate) => {
    return predicate.materialItem == materialItem.typeId && predicate.stoneItem == stoneItem.typeId;
  });
  return brewingItem;
}
function isPorionBottle(potion) {
  const brewingItem = MagicBrewingItemObjects.find((predicate) => {
    return predicate.outputItem == potion.typeId;
  });
  return brewingItem != void 0 ? brewingItem.type : "empty";
}
async function breakMagicBrewing(block, dimension) {
  const stand = dimension.getEntitiesAtBlockLocation({ x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
  const inventory = stand[0].getComponent(EntityComponentTypes9.Inventory);
  const container = inventory.container;
  const materialItem = container.getItem(0);
  if (materialItem != void 0) {
    dimension.spawnItem(materialItem, stand[0].location);
  }
  const stoneItem = container.getItem(1);
  if (stoneItem != void 0) {
    dimension.spawnItem(stoneItem, stand[0].location);
  }
  const fuelItem = container.getItem(2);
  if (fuelItem != void 0) {
    dimension.spawnItem(fuelItem, stand[0].location);
  }
  const outputItem = container.getItem(3);
  if (outputItem != void 0) {
    dimension.spawnItem(outputItem, stand[0].location);
  }
  stand[0].remove();
}

// scripts/items/potion/FirePotion.ts
import { TicksPerSecond as TicksPerSecond43 } from "@minecraft/server";
async function firePotionStrengthUp(player) {
  try {
    player.addEffect(MinecraftEffectTypes.Strength, 600 * TicksPerSecond43, {
      amplifier: 6
    });
  } catch (error) {
  }
}

// scripts/items/potion/IcePotion.ts
import { TicksPerSecond as TicksPerSecond44 } from "@minecraft/server";
async function icePotionAbsorption(player) {
  try {
    player.addEffect(MinecraftEffectTypes.Absorption, 600 * TicksPerSecond44, {
      amplifier: 6
    });
  } catch (error) {
  }
}

// scripts/items/potion/LightningPotion.ts
import { TicksPerSecond as TicksPerSecond45 } from "@minecraft/server";
async function lightningPotionSpeedUp(player) {
  try {
    player.addEffect(MinecraftEffectTypes.Speed, 600 * TicksPerSecond45, {
      amplifier: 6
    });
  } catch (error) {
  }
}

// scripts/items/potion/StonePotion.ts
import { TicksPerSecond as TicksPerSecond46 } from "@minecraft/server";
async function stonePotionResistance(player) {
  try {
    player.addEffect(MinecraftEffectTypes.Resistance, 600 * TicksPerSecond46, {
      amplifier: 6
    });
  } catch (error) {
  }
}

// scripts/items/potion/WaterPotion.ts
import { TicksPerSecond as TicksPerSecond47 } from "@minecraft/server";
async function waterPotionHealthBoost(player) {
  try {
    player.addEffect(MinecraftEffectTypes.HealthBoost, 600 * TicksPerSecond47, {
      amplifier: 10
    });
    player.addEffect(MinecraftEffectTypes.InstantHealth, 1 * TicksPerSecond47, {
      amplifier: 20
    });
  } catch (error) {
  }
}

// scripts/items/potion/WindPotion.ts
import { TicksPerSecond as TicksPerSecond48 } from "@minecraft/server";
async function windPotionJumpBoost(player) {
  try {
    player.addEffect(MinecraftEffectTypes.JumpBoost, 600 * TicksPerSecond48, {
      amplifier: 6
    });
  } catch (error) {
  }
}

// scripts/items/potion/MagicPotionDrink.ts
var MagicPotionObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_strengt_potion",
    func: firePotionStrengthUp
  },
  {
    itemName: "kurokumaft:water_healthboost_potion",
    func: waterPotionHealthBoost
  },
  {
    itemName: "kurokumaft:wind_jumpboost_potion",
    func: windPotionJumpBoost
  },
  {
    itemName: "kurokumaft:stone_resistance_potion",
    func: stonePotionResistance
  },
  {
    itemName: "kurokumaft:lightning_speedup_potion",
    func: lightningPotionSpeedUp
  },
  {
    itemName: "kurokumaft:ice_absorption_potion",
    func: icePotionAbsorption
  }
]);
var MagicPotionDrink = class {
  onConsume(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    const nut = MagicPotionObjects.find((obj) => obj.itemName == itemStack.typeId);
    nut.func(player);
  }
};

// scripts/items/tool/MagicMineDurability.ts
import { EquipmentSlot as EquipmentSlot16 } from "@minecraft/server";
var MagicMineDurability = class {
  onMineBlock(event) {
    const source = event.source;
    const itemStack = event.itemStack;
    itemDurabilityDamage(source, itemStack, EquipmentSlot16.Mainhand);
  }
};

// scripts/items/pickaxe/MagicPickaxe.ts
import { EntityDamageCause as EntityDamageCause59, Player as Player94, world as world31 } from "@minecraft/server";

// scripts/items/pickaxe/BlazeMagicPickaxe.ts
import { BlockVolume, EquipmentSlot as EquipmentSlot17, ItemStack as ItemStack22 } from "@minecraft/server";
var FiringOreBlocks = Object.freeze([
  {
    block: MinecraftBlockTypes.IronOre,
    item: MinecraftItemTypes.IronIngot
  },
  {
    block: MinecraftBlockTypes.CopperOre,
    item: MinecraftItemTypes.CopperIngot
  },
  {
    block: MinecraftBlockTypes.GoldOre,
    item: MinecraftItemTypes.GoldIngot
  },
  {
    block: MinecraftBlockTypes.DeepslateIronOre,
    item: MinecraftItemTypes.IronIngot
  },
  {
    block: MinecraftBlockTypes.DeepslateCopperOre,
    item: MinecraftItemTypes.CopperIngot
  },
  {
    block: MinecraftBlockTypes.DeepslateGoldOre,
    item: MinecraftItemTypes.GoldIngot
  },
  {
    block: MinecraftBlockTypes.Sand,
    item: MinecraftItemTypes.Glass
  }
]);
async function firingOreBlock(event) {
  try {
    const entity = event.source;
    const itemStack = event.itemStack;
    const block = event.block;
    const oreBlock = FiringOreBlocks.find((obj) => obj.block == block.typeId);
    if (oreBlock != void 0) {
      block.dimension.setBlockType(block.location, MinecraftBlockTypes.Air);
      block.dimension.spawnItem(new ItemStack22(oreBlock.item, getRandomInRange(1, 3)), { x: block.location.x, y: block.location.y + 1, z: block.location.z });
      block.dimension.spawnParticle("kurokumaft:mobflame_firing", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
      itemDurabilityDamageFixed(entity, itemStack, EquipmentSlot17.Mainhand, 5);
    }
    const blockVol = new BlockVolume(
      {
        x: block.location.x - 4,
        y: block.location.y - 4,
        z: block.location.z - 4
      },
      {
        x: block.location.x + 4,
        y: block.location.y + 4,
        z: block.location.z + 4
      }
    );
    const blockIt = blockVol.getBlockLocationIterator();
    let nextValue = blockIt.next();
    while (!nextValue.done) {
      const value = nextValue.value;
      if (value.y >= -64) {
        const breakBlock = block.dimension.getBlock(value);
        if (breakBlock != void 0) {
          if (breakBlock.typeId.indexOf("_terracotta") != -1 && breakBlock.typeId.indexOf("_glazed_") == -1) {
            breakBlock.dimension.setBlockType(breakBlock.location, breakBlock.typeId.split("_").join("_glazed_"));
            breakBlock.dimension.spawnParticle("kurokumaft:mobflame_firing", { x: breakBlock.location.x + 0.5, y: breakBlock.location.y, z: breakBlock.location.z + 0.5 });
            itemDurabilityDamageFixed(entity, itemStack, EquipmentSlot17.Mainhand, 1);
          }
        }
      }
      nextValue = blockIt.next();
    }
  } catch (error) {
  }
}

// scripts/items/pickaxe/GraizMagicPickaxe.ts
import { BlockVolume as BlockVolume2, EquipmentSlot as EquipmentSlot18, ItemStack as ItemStack23 } from "@minecraft/server";
async function breakRangeBlock(event) {
  try {
    const entity = event.source;
    const itemStack = event.itemStack;
    const block = event.block;
    const blockVol = new BlockVolume2(
      {
        x: block.location.x - 2,
        y: block.location.y - 2,
        z: block.location.z - 2
      },
      {
        x: block.location.x + 2,
        y: block.location.y + 2,
        z: block.location.z + 2
      }
    );
    const blockIt = blockVol.getBlockLocationIterator();
    let nextValue = blockIt.next();
    while (!nextValue.done) {
      const value = nextValue.value;
      const breakBlock = block.dimension.getBlock(value);
      if (breakBlock != void 0) {
        if (breakBlock.hasTag("minecraft:is_pickaxe_item_destructible")) {
          breakBlock.dimension.spawnItem(new ItemStack23(breakBlock.typeId, 1), breakBlock.location);
        }
      }
      nextValue = blockIt.next();
    }
    const ListBlockVolume = block.dimension.fillBlocks(blockVol, MinecraftBlockTypes.Air, {
      blockFilter: {
        includeTags: [
          "minecraft:is_pickaxe_item_destructible"
        ]
      },
      ignoreChunkBoundErrors: true
    });
    itemDurabilityDamageFixed(entity, itemStack, EquipmentSlot18.Mainhand, 5);
    block.dimension.spawnParticle("kurokumaft:stone_charge_burst", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
  } catch (error) {
  }
}

// scripts/items/pickaxe/VolzasMagicPickaxe.ts
import { BlockVolume as BlockVolume3, EquipmentSlot as EquipmentSlot19, ItemStack as ItemStack24 } from "@minecraft/server";
async function breakLineBlock(event) {
  try {
    const entity = event.source;
    const itemStack = event.itemStack;
    const block = event.block;
    const point = getLookPoints(entity.getRotation(), entity.location, 10);
    const blockVol = new BlockVolume3(
      block.location,
      point
    );
    const blockIt = blockVol.getBlockLocationIterator();
    let nextValue = blockIt.next();
    while (!nextValue.done) {
      const value = nextValue.value;
      const breakBlock = block.dimension.getBlock(value);
      if (breakBlock != void 0) {
        if (breakBlock.hasTag("minecraft:is_pickaxe_item_destructible")) {
          breakBlock.dimension.spawnItem(new ItemStack24(breakBlock.typeId, 1), breakBlock.location);
        }
      }
      nextValue = blockIt.next();
    }
    const ListBlockVolume = block.dimension.fillBlocks(blockVol, MinecraftBlockTypes.Air, {
      blockFilter: {
        includeTags: [
          "minecraft:is_pickaxe_item_destructible"
        ]
      },
      ignoreChunkBoundErrors: true
    });
    itemDurabilityDamageFixed(entity, itemStack, EquipmentSlot19.Mainhand, 5);
    block.dimension.spawnParticle("kurokumaft:thunder_sword_particle", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
  } catch (error) {
  }
}

// scripts/items/pickaxe/BlizzasMagicPickaxe.ts
import { BlockVolume as BlockVolume4, EquipmentSlot as EquipmentSlot20 } from "@minecraft/server";
async function freezeRangeBlock(event) {
  try {
    const entity = event.source;
    const itemStack = event.itemStack;
    const block = event.block;
    const blockVol = new BlockVolume4(
      {
        x: block.location.x - 4,
        y: block.location.y - 4,
        z: block.location.z - 4
      },
      {
        x: block.location.x + 4,
        y: block.location.y + 4,
        z: block.location.z + 4
      }
    );
    const blockIt = blockVol.getBlockLocationIterator();
    let nextValue = blockIt.next();
    while (!nextValue.done) {
      const value = nextValue.value;
      if (value.y >= -64) {
        const breakBlock = block.dimension.getBlock(value);
        if (breakBlock != void 0) {
          if (breakBlock.typeId == MinecraftBlockTypes.Water || breakBlock.typeId == MinecraftBlockTypes.FlowingWater) {
            breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.PackedIce);
          } else if (breakBlock.typeId == MinecraftBlockTypes.Lava || breakBlock.typeId == MinecraftBlockTypes.FlowingLava) {
            breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.Magma);
          } else if (breakBlock.typeId == MinecraftBlockTypes.Sand) {
            breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.Sandstone);
          } else if (breakBlock.typeId == MinecraftBlockTypes.RedSand) {
            breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.RedSandstone);
          } else if (breakBlock.typeId == MinecraftBlockTypes.Gravel) {
            breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.CoarseDirt);
          } else if (breakBlock.typeId == MinecraftBlockTypes.Mud) {
            breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.Clay);
          }
        }
      }
      nextValue = blockIt.next();
    }
    itemDurabilityDamageFixed(entity, itemStack, EquipmentSlot20.Mainhand, 5);
    block.dimension.spawnParticle("kurokumaft:ice_arrow_particle", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
  } catch (error) {
  }
}

// scripts/items/pickaxe/BreezeMagicPickaxe.ts
import { BlockVolume as BlockVolume5, EquipmentSlot as EquipmentSlot21 } from "@minecraft/server";
var polishedStone = [
  { polished: "minecraft:polished_andesite", coarse: "minecraft:andesite" },
  { polished: "minecraft:polished_andesite_double_slab", coarse: "minecraft:andesite_double_slab" },
  { polished: "minecraft:polished_andesite_slab", coarse: "minecraft:andesite_slab" },
  { polished: "minecraft:polished_andesite_stairs", coarse: "minecraft:andesite_stairs" },
  { polished: "minecraft:polished_basalt", coarse: "minecraft:basalt" },
  { polished: "minecraft:polished_blackstone", coarse: "minecraft:blackstone" },
  { polished: "minecraft:polished_blackstone_brick_double_slab", coarse: "minecraft:blackstone_brick_double_slab" },
  { polished: "minecraft:polished_blackstone_brick_slab", coarse: "minecraft:blackstone_brick_slab" },
  { polished: "minecraft:polished_blackstone_brick_stairs", coarse: "minecraft:blackstone_brick_stairs" },
  { polished: "minecraft:polished_blackstone_brick_wall", coarse: "minecraft:blackstone_brick_wall" },
  { polished: "minecraft:polished_blackstone_bricks", coarse: "minecraft:blackstone_bricks" },
  { polished: "minecraft:polished_blackstone_button", coarse: "minecraft:blackstone_button" },
  { polished: "minecraft:polished_blackstone_double_slab", coarse: "minecraft:blackstone_double_slab" },
  { polished: "minecraft:polished_blackstone_pressure_plate", coarse: "minecraft:blackstone_pressure_plate" },
  { polished: "minecraft:polished_blackstone_slab", coarse: "minecraft:blackstone_slab" },
  { polished: "minecraft:polished_blackstone_stairs", coarse: "minecraft:blackstone_stairs" },
  { polished: "minecraft:polished_blackstone_wall", coarse: "minecraft:blackstone_wall" },
  { polished: "minecraft:polished_deepslate", coarse: "minecraft:deepslate" },
  { polished: "minecraft:polished_deepslate_double_slab", coarse: "minecraft:deepslate_double_slab" },
  { polished: "minecraft:polished_deepslate_slab", coarse: "minecraft:deepslate_slab" },
  { polished: "minecraft:polished_deepslate_stairs", coarse: "minecraft:deepslate_stairs" },
  { polished: "minecraft:polished_deepslate_wall", coarse: "minecraft:deepslate_wall" },
  { polished: "minecraft:polished_diorite", coarse: "minecraft:diorite" },
  { polished: "minecraft:polished_diorite_double_slab", coarse: "minecraft:diorite_double_slab" },
  { polished: "minecraft:polished_diorite_slab", coarse: "minecraft:diorite_slab" },
  { polished: "minecraft:polished_diorite_stairs", coarse: "minecraft:diorite_stairs" },
  { polished: "minecraft:polished_granite", coarse: "minecraft:granite" },
  { polished: "minecraft:polished_granite_double_slab", coarse: "minecraft:granite_double_slab" },
  { polished: "minecraft:polished_granite_slab", coarse: "minecraft:granite_slab" },
  { polished: "minecraft:polished_granite_stairs", coarse: "minecraft:granite_stairs" },
  { polished: "minecraft:polished_tuff", coarse: "minecraft:tuff" },
  { polished: "minecraft:polished_tuff_double_slab", coarse: "minecraft:tuff_double_slab" },
  { polished: "minecraft:polished_tuff_slab", coarse: "minecraft:tuff_slab" },
  { polished: "minecraft:polished_tuff_stairs", coarse: "minecraft:tuff_stairs" },
  { polished: "minecraft:polished_tuff_wall", coarse: "minecraft:tuff_wall" }
];
var chiseledStone = [
  { chiseled: "minecraft:chiseled_tuff", carved: "minecraft:tuff" },
  { chiseled: "minecraft:chiseled_tuff_bricks", carved: "minecraft:tuff_bricks" },
  { chiseled: "minecraft:chiseled_polished_blackstone", carved: "minecraft:polished_blackstone" },
  { chiseled: "minecraft:chiseled_nether_bricks", carved: "minecraft:nether_brick" },
  { chiseled: "minecraft:chiseled_purpur_block", carved: "minecraft:purpur_block" },
  { chiseled: "minecraft:infested_chiseled_stone_bricks", carved: "minecraft:infested_stone_bricks" },
  { chiseled: "minecraft:chiseled_quartz_block", carved: "minecraft:quartz_block" },
  { chiseled: "minecraft:chiseled_red_sandstone", carved: "minecraft:red_sandstone" },
  { chiseled: "minecraft:chiseled_sandstone", carved: "minecraft:sandstone" },
  { chiseled: "minecraft:chiseled_stone_bricks", carved: "minecraft:stone_bricks" },
  { chiseled: "minecraft:chiseled_resin_bricks", carved: "minecraft:resin_bricks" },
  { chiseled: "minecraft:chiseled_deepslate", carved: "minecraft:deepslate" },
  { chiseled: "minecraft:chiseled_copper", carved: "minecraft:copper" },
  { chiseled: "minecraft:exposed_chiseled_copper", carved: "minecraft:exposed_copper" },
  { chiseled: "minecraft:oxidized_chiseled_copper", carved: "minecraft:oxidized_copper" },
  { chiseled: "minecraft:waxed_chiseled_copper", carved: "minecraft:waxed_copper" },
  { chiseled: "minecraft:waxed_exposed_chiseled_copper", carved: "minecraft:waxed_exposed_copper" },
  { chiseled: "minecraft:waxed_oxidized_chiseled_copper", carved: "minecraft:waxed_oxidized_copper" },
  { chiseled: "minecraft:waxed_weathered_chiseled_copper", carved: "minecraft:waxed_weathered_copper" },
  { chiseled: "minecraft:weathered_chiseled_copper", carved: "minecraft:weathered_copper" }
];
async function polishBlock(event) {
  try {
    const entity = event.source;
    const itemStack = event.itemStack;
    const block = event.block;
    const blockVol = new BlockVolume5(
      {
        x: block.location.x - 4,
        y: block.location.y - 4,
        z: block.location.z - 4
      },
      {
        x: block.location.x + 4,
        y: block.location.y + 4,
        z: block.location.z + 4
      }
    );
    const blockIt = blockVol.getBlockLocationIterator();
    let nextValue = blockIt.next();
    while (!nextValue.done) {
      const value = nextValue.value;
      if (value.y >= -64) {
        const breakBlock = block.dimension.getBlock(value);
        if (breakBlock != void 0 && breakBlock.typeId != MinecraftBlockTypes.Air) {
          if (polishedStone.some((obj) => obj.coarse == breakBlock.typeId)) {
            const polisBlock = polishedStone.find((obj) => obj.coarse == breakBlock.typeId);
            if (polisBlock != void 0) {
              breakBlock.dimension.setBlockType(breakBlock.location, polisBlock.polished);
            }
          } else if (chiseledStone.some((obj) => obj.carved == breakBlock.typeId)) {
            const chiseledBlock = chiseledStone.find((obj) => obj.carved == breakBlock.typeId);
            if (chiseledBlock != void 0) {
              breakBlock.dimension.setBlockType(breakBlock.location, chiseledBlock.chiseled);
            }
          }
        }
      }
      nextValue = blockIt.next();
    }
    itemDurabilityDamageFixed(entity, itemStack, EquipmentSlot21.Mainhand, 5);
    block.dimension.spawnParticle("kurokumaft:mowing_particle", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
  } catch (error) {
  }
}

// scripts/items/pickaxe/DraizMagicPickaxe.ts
import { BlockVolume as BlockVolume6, EquipmentSlot as EquipmentSlot22 } from "@minecraft/server";
async function wetRangeBlock(event) {
  try {
    const entity = event.source;
    const itemStack = event.itemStack;
    const block = event.block;
    const blockVol = new BlockVolume6(
      {
        x: block.location.x - 4,
        y: block.location.y - 4,
        z: block.location.z - 4
      },
      {
        x: block.location.x + 4,
        y: block.location.y + 4,
        z: block.location.z + 4
      }
    );
    const blockIt = blockVol.getBlockLocationIterator();
    let nextValue = blockIt.next();
    while (!nextValue.done) {
      const value = nextValue.value;
      if (value.y >= -64) {
        const breakBlock = block.dimension.getBlock(value);
        if (breakBlock != void 0) {
          if (breakBlock.typeId == MinecraftBlockTypes.Sandstone) {
            breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.Sand);
          } else if (breakBlock.typeId == MinecraftBlockTypes.RedSandstone) {
            breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.RedSand);
          } else if (breakBlock.typeId == MinecraftBlockTypes.CoarseDirt) {
            breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.Gravel);
          } else if (breakBlock.typeId.indexOf("concrete_powder") != -1) {
            breakBlock.dimension.setBlockType(breakBlock.location, breakBlock.typeId.split("_powder").join(""));
          }
        }
      }
      nextValue = blockIt.next();
    }
    itemDurabilityDamageFixed(entity, itemStack, EquipmentSlot22.Mainhand, 5);
    block.dimension.spawnParticle("kurokumaft:water_sword_slash", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
  } catch (error) {
  }
}

// scripts/items/pickaxe/MagicPickaxe.ts
var PicAttackObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_pickaxe",
    cause: EntityDamageCause59.fire,
    damage: 1,
    particle: "kurokumaft:pickaxe_fire"
  },
  {
    itemName: "kurokumaft:water_pickaxe",
    cause: EntityDamageCause59.drowning,
    damage: 1,
    particle: "kurokumaft:pickaxe_water"
  },
  {
    itemName: "kurokumaft:wind_pickaxe",
    cause: EntityDamageCause59.fall,
    damage: 1,
    particle: "kurokumaft:pickaxe_wind"
  },
  {
    itemName: "kurokumaft:stone_pickaxe",
    cause: EntityDamageCause59.thorns,
    damage: 1,
    particle: "kurokumaft:pickaxe_stone"
  },
  {
    itemName: "kurokumaft:lightning_pickaxe",
    cause: EntityDamageCause59.lightning,
    damage: 1,
    particle: "kurokumaft:pickaxe_lightning"
  },
  {
    itemName: "kurokumaft:ice_pickaxe",
    cause: EntityDamageCause59.freezing,
    damage: 1,
    particle: "kurokumaft:pickaxe_ice"
  },
  {
    itemName: "kurokumaft:blaze_magic_pickaxe",
    cause: EntityDamageCause59.fire,
    damage: 5,
    particle: "kurokumaft:pickaxe_fire"
  },
  {
    itemName: "kurokumaft:draiz_magic_pickaxe",
    cause: EntityDamageCause59.drowning,
    damage: 5,
    particle: "kurokumaft:pickaxe_water"
  },
  {
    itemName: "kurokumaft:breeze_magic_pickaxe",
    cause: EntityDamageCause59.fall,
    damage: 5,
    particle: "kurokumaft:pickaxe_wind"
  },
  {
    itemName: "kurokumaft:graiz_magic_pickaxe",
    cause: EntityDamageCause59.thorns,
    damage: 5,
    particle: "kurokumaft:pickaxe_stone"
  },
  {
    itemName: "kurokumaft:volzas_magic_pickaxe",
    cause: EntityDamageCause59.lightning,
    damage: 5,
    particle: "kurokumaft:pickaxe_lightning"
  },
  {
    itemName: "kurokumaft:blizzas_magic_pickaxe",
    cause: EntityDamageCause59.freezing,
    damage: 5,
    particle: "kurokumaft:pickaxe_ice"
  }
]);
var PicMagicAttack = class {
  onHitEntity(event) {
    const itemStack = event.itemStack;
    const entity = event.hitEntity;
    if (itemStack == void 0 || !entity.isValid) {
      return;
    }
    const pic = PicAttackObjects.find((obj) => obj.itemName == itemStack.typeId);
    try {
      if (entity instanceof Player94) {
        if (world31.gameRules.pvp) {
          entity.applyDamage(pic.damage, {
            cause: pic.cause
          });
          entity.dimension.spawnParticle(pic.particle, entity.location);
        }
      } else {
        entity.applyDamage(pic.damage, {
          cause: pic.cause
        });
        entity.dimension.spawnParticle(pic.particle, entity.location);
      }
    } catch (error) {
    }
  }
};
var MagicPicObjects = Object.freeze([
  {
    itemName: "kurokumaft:blaze_magic_pickaxe",
    func: firingOreBlock
  },
  {
    itemName: "kurokumaft:draiz_magic_pickaxe",
    func: wetRangeBlock
  },
  {
    itemName: "kurokumaft:breeze_magic_pickaxe",
    func: polishBlock
  },
  {
    itemName: "kurokumaft:graiz_magic_pickaxe",
    func: breakRangeBlock
  },
  {
    itemName: "kurokumaft:volzas_magic_pickaxe",
    func: breakLineBlock
  },
  {
    itemName: "kurokumaft:blizzas_magic_pickaxe",
    func: freezeRangeBlock
  }
]);
var PicMagicTool = class {
  onUseOn(event) {
    magicPickaxe(event);
  }
};
function magicPickaxe(event) {
  const itemStack = event.itemStack;
  if (itemStack != void 0) {
    const magicPic = MagicPicObjects.find((pic) => pic.itemName == itemStack.typeId);
    magicPic.func(event);
  }
}

// scripts/custom/MagicCustomComponentRegistry.ts
function initRegisterMagicCustom(initEvent) {
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:wand_magic", new WandWeaponMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:rod_magic", new RodWeaponMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:stick_magic", new StickWeaponMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:staff_magic", new StaffWeaponMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:sword_magic", new SwordWeaponMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:sword_magic_monster", new SwordWeaponMagicMons());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:bread_magic", new BreadWeaponMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:bow_magic", new BowShotMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:gun_magic", new GunShotMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:bazooka_magic", new BazookaShotMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:magic_flagstone", new FlagStoneMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:summon_grimoire", new SummonGrimoireMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:life_grimoire_block", new LifeGrimoireBlockMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:life_grimoire_item", new LifeGrimoireUseMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:repatriation_fruit", new RepatriationFruitMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:magic_log_nut", new MagicLogNutEat());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:diamond_bottle", new DiamondBottle());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:magic_potion", new MagicPotionDrink());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:summon_stone", new SummonStoneMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:magic_mine_durability", new MagicMineDurability());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:pic_magic_attack", new PicMagicAttack());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:pic_magic_tool", new PicMagicTool());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:torchlight_block", new TorchlightBlock());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:magic_lectern", new MagicLecternBlock());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:magic_brewing", new MagicBrewingStandBlock());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:wall_block", new WallBlock());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:boss_summon_block", new BossSummonBlock());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:portal_gate", new PortalGateBlock());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:portal", new PortalBlock());
}

// scripts/mob/animal/FireChicken.ts
import { EntityDamageCause as EntityDamageCause60 } from "@minecraft/server";
async function fireChickenAttack(hitEntity) {
  try {
    hitEntity.applyDamage(1, {
      cause: EntityDamageCause60.fireTick
    });
    hitEntity.dimension.spawnParticle("kurokumaft:chicken_firing", { x: hitEntity.location.x, y: hitEntity.location.y + 0.5, z: hitEntity.location.z });
  } catch (error) {
  }
}

// scripts/mob/animal/FlamePorcupine.ts
import { EntityDamageCause as EntityDamageCause61 } from "@minecraft/server";
async function flamePorcupineGuard(dameger) {
  dameger.applyDamage(3, {
    cause: EntityDamageCause61.fire
  });
  dameger.dimension.spawnParticle("kurokumaft:porcupine_pillar", dameger.location);
}

// scripts/mob/animal/AquaJackal.ts
import { EntityDamageCause as EntityDamageCause62 } from "@minecraft/server";
async function aquaJackalAttack(hitEntity) {
  hitEntity.applyDamage(1, {
    cause: EntityDamageCause62.drowning
  });
  hitEntity.dimension.spawnParticle("kurokumaft:jackal_desires", hitEntity.location);
}

// scripts/mob/animal/SnowWolf.ts
import { EntityDamageCause as EntityDamageCause63 } from "@minecraft/server";
async function snowWolfAttack(hitEntity) {
  hitEntity.applyDamage(1, {
    cause: EntityDamageCause63.freezing
  });
  hitEntity.dimension.spawnParticle("kurokumaft:ice_wolf_fang", hitEntity.location);
}

// scripts/mob/animal/EarthRhino.ts
async function earthRhinoKnockback(hitEntity) {
  hitEntity.dimension.spawnParticle("kurokumaft:rhino_knockback", hitEntity.location);
  hitEntity.applyKnockback({ x: 0, z: 3 }, 1);
}

// scripts/mob/boos/PhoenixActionCompornent.ts
import { EntityComponentTypes as EntityComponentTypes10, EntityDamageCause as EntityDamageCause64, Player as Player95, system as system37, TicksPerSecond as TicksPerSecond49, world as world33 } from "@minecraft/server";

// scripts/mob/boos/mover/BossMoverBase.ts
var BossMoverBase = class {
  constructor(center, speed) {
    this.angle = 0;
    this.origin = { x: 0, y: 0, z: 0 };
    this.position = { x: 0, y: 0, z: 0 };
    this.center = { x: 0, y: 0, z: 0 };
    this.speed = 0;
    this.center = center;
    this.speed = speed;
  }
  setPotion(position) {
    this.position = position;
    this.origin = { x: position.x, y: position.y, z: position.z };
  }
  setCenterY(y) {
    this.center.y = y;
  }
  getCenter() {
    return this.center;
  }
  moveCenter(deltaTime) {
    const dx = this.center.x - this.position.x;
    const dy = this.center.y - this.position.y;
    const dz = this.center.z - this.position.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (distance === 0)
      return this.position;
    const moveDist = this.speed * deltaTime;
    if (moveDist >= distance) {
      this.position = { ...this.center };
    } else {
      const ratio = moveDist / distance;
      this.position.x += dx * ratio;
      this.position.y += dy * ratio;
      this.position.z += dz * ratio;
    }
    return this.position;
  }
  moveOrigin(deltaTime) {
    const dx = this.origin.x - this.position.x;
    const dy = this.origin.y - this.position.y;
    const dz = this.origin.z - this.position.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (distance === 0)
      return this.position;
    const moveDist = this.speed * deltaTime;
    if (moveDist >= distance) {
      this.position = { ...this.origin };
    } else {
      const ratio = moveDist / distance;
      this.position.x += dx * ratio;
      this.position.y += dy * ratio;
      this.position.z += dz * ratio;
    }
    return this.position;
  }
  isComplete() {
    return this.position.x === this.center.x && this.position.y === this.center.y && this.position.z === this.center.z;
  }
  isCompleteOrigin() {
    return this.position.x === this.origin.x && this.position.y === this.origin.y && this.position.z === this.origin.z;
  }
};

// scripts/mob/boos/mover/BossEllipticalMover.ts
var BossEllipticalMover = class extends BossMoverBase {
  constructor(center, radiusX, radiusZ, speed) {
    super(center, speed);
    this.radiusX = radiusX;
    this.radiusZ = radiusZ;
  }
  updatePosition(deltaTime) {
    this.angle += this.speed * deltaTime;
    const x = this.center.x + this.radiusX * Math.cos(this.angle);
    const z = this.center.z - this.radiusZ * Math.sin(this.angle);
    const y = this.center.y;
    return { x, y, z };
  }
};

// scripts/mob/boos/PhoenixActionCompornent.ts
var PhoenixActionCompornent = class {
  constructor(entity) {
    this.entity = entity;
    this.center = entity.location;
    this.mover = new BossEllipticalMover(this.center, 25, 35, Math.PI / 3);
    this.entity.addTag(this.entity.id);
    this.attackCount = 0;
    this.moveCount = 0;
  }
  startMoniter() {
    this.entity.setProperty("kurokumaft:boss_pattern", 0);
    world33.sendMessage("\u79FB\u52D5");
    this.startMoveing();
  }
  startMoveing() {
    try {
      if (this.entity !== void 0 && this.entity.isValid) {
        const hitBlock = this.entity.dimension.getBlockFromRay(this.entity.location, { x: 0, y: -1, z: 0 });
        let brokHi = this.entity.location.y;
        if (hitBlock !== void 0) {
          brokHi = hitBlock.block.location.y + 10;
        }
        if (this.moveCount >= 300) {
          this.moveCount = 0;
          world33.sendMessage("\u4E2D\u5FC3\u79FB\u52D5");
          this.mover.setPotion(this.entity.location);
          this.mover.setCenterY(brokHi - 9);
          this.entity.setProperty("kurokumaft:boss_pattern", 1);
          this.centerMoveing();
        } else {
          this.moveCount = this.moveCount + getRandomInRange(1, 5);
          const pos = this.mover.updatePosition(0.1);
          this.entity.teleport(this.entity.location, {
            checkForBlocks: true,
            facingLocation: pos
          });
          this.entity.teleport({ x: pos.x, y: brokHi, z: pos.z }, {
            checkForBlocks: true
          });
          if (this.attackCount >= 60) {
            if (getRandomInRange(1, 2) === 1) {
              this.fireBlast(0);
              system37.waitTicks(3).then(() => {
                this.attackCount = this.attackCount + getRandomInRange(1, 3);
                this.startMoveing();
              });
            } else {
              this.entity.setProperty("kurokumaft:boss_pattern", 1);
              this.mover.setPotion(this.entity.location);
              this.blazeWear(0, brokHi);
            }
            this.attackCount = 0;
          } else {
            system37.waitTicks(3).then(() => {
              this.attackCount = this.attackCount + getRandomInRange(1, 3);
              this.startMoveing();
            });
          }
        }
      }
    } catch (error) {
    } finally {
    }
  }
  centerMoveing() {
    try {
      if (this.entity !== void 0 && this.entity.isValid) {
        const center = this.mover.moveCenter(1.5);
        this.entity.teleport(this.entity.location, {
          checkForBlocks: true,
          facingLocation: center
        });
        this.entity.teleport(center, {
          checkForBlocks: true
        });
        if (this.mover.isComplete()) {
          world33.sendMessage("\u4E2D\u5FC3\u79FB\u52D5\u7D42\u308F\u308A");
          system37.waitTicks(getRandomInRange(3, 8) * TicksPerSecond49).then(() => {
            this.entity.setProperty("kurokumaft:boss_pattern", 0);
            this.flameStream(0);
          });
        } else {
          system37.waitTicks(5).then(() => {
            this.centerMoveing();
          });
        }
      }
    } catch (error) {
    } finally {
    }
  }
  originMoveing(deltaTime) {
    try {
      if (this.entity !== void 0 && this.entity.isValid) {
        const origin = this.mover.moveOrigin(deltaTime);
        this.entity.teleport(this.entity.location, {
          checkForBlocks: true,
          facingLocation: origin
        });
        this.entity.teleport(origin, {
          checkForBlocks: true
        });
        if (this.mover.isCompleteOrigin()) {
          world33.sendMessage("\u30AA\u30EA\u30B8\u30F3\u79FB\u52D5\u7D42\u308F\u308A");
          this.entity.setProperty("kurokumaft:boss_pattern", 0);
          this.startMoveing();
        } else {
          system37.waitTicks(5).then(() => {
            this.originMoveing(deltaTime);
          });
        }
      }
    } catch (error) {
    } finally {
    }
  }
  flameStream(count) {
    try {
      world33.sendMessage("\u706B\u7114\u653E\u5C04");
      if (this.entity !== void 0 && this.entity.isValid) {
        const filterOption1 = {
          location: this.entity.location,
          maxDistance: 32,
          excludeTags: [this.entity.id]
        };
        const targets1 = this.entity.dimension.getEntities(filterOption1);
        this.entity.dimension.spawnParticle("kurokumaft:phoenix_stream_particle", this.entity.location);
        targets1.forEach((en) => {
          if (en instanceof Player95) {
            en.applyDamage(1, {
              cause: EntityDamageCause64.fire
            });
          } else {
            en.applyDamage(3, {
              cause: EntityDamageCause64.fire
            });
          }
        });
        system37.waitTicks(3).then(() => {
          if (count !== 10) {
            this.flameStream(count + 1);
          } else {
            system37.waitTicks(TicksPerSecond49).then(() => {
              world33.sendMessage("\u3082\u3068\u306B\u4F4D\u7F6E\u306B\u623B\u308B");
              this.originMoveing(1.5);
            });
          }
        });
      }
    } catch (error) {
      throw error;
    }
  }
  async fireBlast(count) {
    world33.sendMessage("\u706B\u7403\u4E71\u5C04");
    try {
      const bulet = this.entity.dimension.spawnEntity("kurokumaft:fireballmagic", this.entity.location);
      const projectile = bulet.getComponent(EntityComponentTypes10.Projectile);
      projectile.owner = this.entity;
      projectile.shoot({
        x: this.entity.getViewDirection().x,
        y: this.entity.getViewDirection().y - 3,
        z: this.entity.getViewDirection().z
      }, {
        uncertainty: 3
      });
      system37.waitTicks(5).then(() => {
        if (count !== 5) {
          this.fireBlast(count + 1);
        }
      });
    } catch (error) {
      throw error;
    }
  }
  blazeWear(count, hight) {
    world33.sendMessage("\u706B\u7114\u7E8F");
    try {
      system37.waitTicks(5).then(() => {
        const loc = this.entity.location;
        this.entity.teleport({ x: loc.x, y: hight, z: loc.z }, {
          checkForBlocks: true,
          facingLocation: this.mover.getCenter()
        });
        if (count === 8) {
          this.entity.setProperty("kurokumaft:boss_pattern", 0);
          this.blazeWearAttack(0);
        } else {
          this.blazeWear(count + 1, hight - 1);
        }
      });
    } catch (error) {
    }
  }
  blazeWearAttack(count) {
    world33.sendMessage("\u706B\u7114\u7E8F\u30A2\u30BF\u30C3\u30AF");
    try {
      system37.waitTicks(1).then(() => {
        const distance = getLookLocationDistance(this.entity.getRotation().y, 1, 0, 0);
        this.entity.teleport(getDistanceLocation(this.entity.location, distance), {
          checkForBlocks: true
        });
        if (count === 30) {
          this.originMoveing(3);
        } else {
          this.blazeWearAttack(count + 1);
        }
      });
    } catch (error) {
    }
  }
};

// scripts/mob/boos/mover/BossActionInterface.ts
var BossActionObjects = Object.freeze([
  {
    entityName: "kurokumaft:phoenix",
    className: "phoenix"
  }
]);
var BossActionClassRecord = {
  phoenix: PhoenixActionCompornent
};

// scripts/player/MagicArmorEquipment.ts
import { EntityComponentTypes as EntityComponentTypes15, EquipmentSlot as EquipmentSlot27, system as system42 } from "@minecraft/server";

// scripts/items/weapon/armor/MagicHelmetSurveillance.ts
import { EntityComponentTypes as EntityComponentTypes11, EquipmentSlot as EquipmentSlot23, system as system38, TicksPerSecond as TicksPerSecond50 } from "@minecraft/server";
var MagicHelmetObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_helmet",
    func: fireResistanceEffect,
    delay: TicksPerSecond50 * 10,
    removeFunc: fireResistanceEffectReset
  },
  {
    itemName: "kurokumaft:water_magic_helmet",
    func: waterBreathingEffect,
    delay: TicksPerSecond50 * 10,
    removeFunc: waterBreathingEffectReset
  },
  {
    itemName: "kurokumaft:wind_magic_helmet",
    func: projectileInvalid,
    delay: TicksPerSecond50 * 1,
    removeFunc: projectileInvalidReset
  },
  {
    itemName: "kurokumaft:lightning_magic_helmet",
    func: projectileInvalid,
    delay: TicksPerSecond50 * 1,
    removeFunc: projectileInvalidReset
  },
  {
    itemName: "kurokumaft:stone_magic_helmet",
    func: resistanceEffect,
    delay: TicksPerSecond50 * 10,
    removeFunc: resistanceEffectReset
  },
  {
    itemName: "kurokumaft:ice_magic_helmet",
    func: nightVisionEffect,
    delay: TicksPerSecond50 * 10,
    removeFunc: nightVisionEffectReset
  },
  {
    itemName: "kurokumaft:nether_fire_magic_helmet",
    func: fireResistanceEffect,
    delay: TicksPerSecond50 * 10,
    removeFunc: fireResistanceEffectReset
  },
  {
    itemName: "kurokumaft:nether_water_magic_helmet",
    func: waterBreathingEffect,
    delay: TicksPerSecond50 * 10,
    removeFunc: waterBreathingEffectReset
  },
  {
    itemName: "kurokumaft:nether_wind_magic_helmet",
    func: projectileInvalid,
    delay: TicksPerSecond50 * 1,
    removeFunc: projectileInvalidReset
  },
  {
    itemName: "kurokumaft:nether_lightning_magic_helmet",
    func: projectileInvalid,
    delay: TicksPerSecond50 * 1,
    removeFunc: projectileInvalidReset
  },
  {
    itemName: "kurokumaft:nether_stone_magic_helmet",
    func: resistanceEffect,
    delay: TicksPerSecond50 * 10,
    removeFunc: resistanceEffectReset
  },
  {
    itemName: "kurokumaft:nether_ice_magic_helmet",
    func: nightVisionEffect,
    delay: TicksPerSecond50 * 10,
    removeFunc: nightVisionEffectReset
  }
]);
var MagicHelmetSurveillance = class {
  constructor(player, itemStack) {
    this.player = player;
    this.itemStack = itemStack;
  }
  /**
   * 頭装備状態チェック
   */
  checkMagicHelmetTick() {
    this.checkJob();
  }
  async checkJob() {
    const equItem = MagicHelmetObjects.find((obj) => obj.itemName == this.itemStack.typeId);
    if (equItem == void 0) {
      return;
    }
    const equ = this.player.getComponent(EntityComponentTypes11.Equippable);
    const head = equ.getEquipment(EquipmentSlot23.Head);
    if (head != null && head.typeId == equItem.itemName) {
      this.player.setDynamicProperty("magic_helmet_equ", true);
      equItem.func(this.player);
      system38.runTimeout(() => {
        system38.run(this.checkJob.bind(this));
      }, equItem.delay);
    } else {
      this.player.setDynamicProperty("magic_helmet_equ", false);
    }
  }
};
async function fireResistanceEffect(player) {
  player.addEffect(MinecraftEffectTypes.FireResistance, TicksPerSecond50 * 60, {
    amplifier: 5,
    showParticles: false
  });
}
async function waterBreathingEffect(player) {
  player.addEffect(MinecraftEffectTypes.WaterBreathing, TicksPerSecond50 * 60, {
    amplifier: 5,
    showParticles: false
  });
}
async function resistanceEffect(player) {
  player.addEffect(MinecraftEffectTypes.Resistance, TicksPerSecond50 * 60, {
    amplifier: 3,
    showParticles: false
  });
}
async function nightVisionEffect(player) {
  player.addEffect(MinecraftEffectTypes.NightVision, TicksPerSecond50 * 60, {
    amplifier: 10,
    showParticles: false
  });
}
async function projectileInvalid(player) {
  player.addTag("projectile_invalid");
}
async function projectileInvalidReset(player) {
  player.removeTag("projectile_invalid");
}
async function fireResistanceEffectReset(player) {
  player.removeEffect(MinecraftEffectTypes.FireResistance);
}
async function waterBreathingEffectReset(player) {
  player.removeEffect(MinecraftEffectTypes.WaterBreathing);
}
async function resistanceEffectReset(player) {
  player.removeEffect(MinecraftEffectTypes.Resistance);
}
async function nightVisionEffectReset(player) {
  player.removeEffect(MinecraftEffectTypes.NightVision);
}

// scripts/items/weapon/armor/MagicChestSurveillance.ts
import { EntityComponentTypes as EntityComponentTypes12, EquipmentSlot as EquipmentSlot24, system as system39, TicksPerSecond as TicksPerSecond51, BlockVolume as BlockVolume7, BlockPermutation as BlockPermutation6 } from "@minecraft/server";
var MagicChestObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_chestplate",
    func: fireAttackUp,
    delay: TicksPerSecond51,
    removeFunc: fireAttackReset
  },
  {
    itemName: "kurokumaft:water_magic_chestplate",
    func: waterHealthUp,
    delay: TicksPerSecond51 * 20,
    removeFunc: waterHealthReset
  },
  {
    itemName: "kurokumaft:ice_magic_chestplate",
    func: lavaFreeze,
    delay: 10,
    removeFunc: lavaFreezeReset
  },
  {
    itemName: "kurokumaft:nether_fire_magic_chestplate",
    func: fireAttackUp,
    delay: TicksPerSecond51,
    removeFunc: fireAttackReset
  },
  {
    itemName: "kurokumaft:nether_water_magic_chestplate",
    func: waterHealthUp,
    delay: TicksPerSecond51 * 10,
    removeFunc: waterHealthReset
  },
  {
    itemName: "kurokumaft:nether_ice_magic_chestplate",
    func: lavaFreeze,
    delay: 10,
    removeFunc: lavaFreezeReset
  }
]);
var MagicChestSurveillance = class {
  constructor(player, itemStack) {
    this.player = player;
    this.itemStack = itemStack;
  }
  /**
   * 胴装備状態チェック
   */
  checkMagicChestTick() {
    this.checkJob();
  }
  async checkJob() {
    const equItem = MagicChestObjects.find((obj) => obj.itemName == this.itemStack.typeId);
    if (equItem == void 0) {
      return;
    }
    const equ = this.player.getComponent(EntityComponentTypes12.Equippable);
    const chest = equ.getEquipment(EquipmentSlot24.Chest);
    if (chest != null && chest.typeId == equItem.itemName) {
      this.player.setDynamicProperty("magic_chest_equ", true);
      equItem.func(this.player);
      system39.runTimeout(() => {
        system39.run(this.checkJob.bind(this));
      }, equItem.delay);
    } else {
      this.player.setDynamicProperty("magic_Chest_equ", false);
    }
  }
};
async function fireAttackUp(player) {
  player.triggerEvent("kurokumaft:attack10_up");
}
async function waterHealthUp(player) {
  player.addEffect(MinecraftEffectTypes.HealthBoost, 60 * TicksPerSecond51, {
    amplifier: 2,
    showParticles: true
  });
}
async function lavaFreeze(player) {
  const blockVol = new BlockVolume7(
    {
      x: player.location.x - 2,
      y: player.location.y - 2,
      z: player.location.z - 2
    },
    {
      x: player.location.x + 2,
      y: player.location.y + 2,
      z: player.location.z + 2
    }
  );
  player.dimension.fillBlocks(blockVol, MinecraftBlockTypes.Ice, {
    blockFilter: {
      includePermutations: [
        BlockPermutation6.resolve(MinecraftBlockTypes.Lava),
        BlockPermutation6.resolve(MinecraftBlockTypes.Magma)
      ]
    },
    ignoreChunkBoundErrors: true
  });
}
async function fireAttackReset(player) {
  player.triggerEvent("kurokumaft:attack_down");
}
async function waterHealthReset(player) {
}
async function lavaFreezeReset(player) {
}

// scripts/items/weapon/armor/MagicLeggingsSurveillance.ts
import { EntityComponentTypes as EntityComponentTypes13, EquipmentSlot as EquipmentSlot25, system as system40, TicksPerSecond as TicksPerSecond52 } from "@minecraft/server";
var MagicLeggingsObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_leggings",
    func: jumpBoostEffect,
    delay: TicksPerSecond52 * 10,
    removeFunc: jumpBoostEffectReset
  },
  {
    itemName: "kurokumaft:water_magic_leggings",
    func: waterRegenerationEffect,
    delay: TicksPerSecond52 * 10,
    removeFunc: waterRegenerationEffectReset
  },
  {
    itemName: "kurokumaft:ice_magic_leggings",
    func: iceResistanceEffect,
    delay: TicksPerSecond52 * 10,
    removeFunc: iceResistanceEffectReset
  },
  {
    itemName: "kurokumaft:nether_fire_magic_leggings",
    func: jumpBoostEffect,
    delay: TicksPerSecond52 * 10,
    removeFunc: jumpBoostEffectReset
  },
  {
    itemName: "kurokumaft:nether_water_magic_leggings",
    func: waterRegenerationEffect,
    delay: TicksPerSecond52 * 10,
    removeFunc: waterRegenerationEffectReset
  },
  {
    itemName: "kurokumaft:nether_ice_magic_leggings",
    func: iceResistanceEffect,
    delay: TicksPerSecond52 * 10,
    removeFunc: iceResistanceEffectReset
  }
]);
var MagicLeggingsSurveillance = class {
  constructor(player, itemStack) {
    this.player = player;
    this.itemStack = itemStack;
  }
  /**
   * 胴装備状態チェック
   */
  checkMagicLeggingsTick() {
    this.checkJob();
  }
  async checkJob() {
    const equItem = MagicLeggingsObjects.find((obj) => obj.itemName == this.itemStack.typeId);
    if (equItem == void 0) {
      return;
    }
    const equ = this.player.getComponent(EntityComponentTypes13.Equippable);
    const leg = equ.getEquipment(EquipmentSlot25.Legs);
    if (leg != null && leg.typeId == equItem.itemName) {
      this.player.setDynamicProperty("magic_leg_equ", true);
      equItem.func(this.player);
      system40.runTimeout(() => {
        system40.run(this.checkJob.bind(this));
      }, equItem.delay);
    } else {
      this.player.setDynamicProperty("magic_leg_equ", false);
    }
  }
};
async function jumpBoostEffect(player) {
  player.addEffect(MinecraftEffectTypes.JumpBoost, TicksPerSecond52 * 60, {
    amplifier: 1,
    showParticles: false
  });
}
async function waterRegenerationEffect(player) {
  player.addEffect(MinecraftEffectTypes.Regeneration, TicksPerSecond52 * 60, {
    amplifier: 2,
    showParticles: false
  });
}
async function iceResistanceEffect(player) {
  player.addEffect(MinecraftEffectTypes.FireResistance, TicksPerSecond52 * 60, {
    amplifier: 5,
    showParticles: false
  });
}
async function jumpBoostEffectReset(player) {
  player.removeEffect(MinecraftEffectTypes.JumpBoost);
}
async function waterRegenerationEffectReset(player) {
  player.removeEffect(MinecraftEffectTypes.Regeneration);
}
async function iceResistanceEffectReset(player) {
  player.removeEffect(MinecraftEffectTypes.FireResistance);
}

// scripts/items/weapon/armor/MagicBootsSurveillance.ts
import { EntityComponentTypes as EntityComponentTypes14, EquipmentSlot as EquipmentSlot26, system as system41, TicksPerSecond as TicksPerSecond53, BlockPermutation as BlockPermutation7, BlockVolume as BlockVolume8 } from "@minecraft/server";
var MagicBootsObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_boots",
    func: lavaWalker,
    delay: 1,
    removeFunc: lavaWalkerReset
  },
  {
    itemName: "kurokumaft:water_magic_boots",
    func: waterSpeedUp,
    delay: TicksPerSecond53 * 1,
    removeFunc: waterSpeedReset
  },
  {
    itemName: "kurokumaft:wind_magic_boots",
    func: windSpeedUp,
    delay: TicksPerSecond53 * 1,
    removeFunc: windSpeedReset
  },
  {
    itemName: "kurokumaft:stone_magic_boots",
    func: stoneFallInvalid,
    delay: TicksPerSecond53 * 1,
    removeFunc: stoneFallInvalidReset
  },
  {
    itemName: "kurokumaft:lightning_magic_boots",
    func: lightningSpeedUp,
    delay: TicksPerSecond53 * 1,
    removeFunc: lightningSpeedReset
  },
  {
    itemName: "kurokumaft:ice_magic_boots",
    func: iceWalker,
    delay: 5,
    removeFunc: iceWalkerReset
  },
  {
    itemName: "kurokumaft:nether_fire_magic_boots",
    func: lavaWalker,
    delay: 1,
    removeFunc: lavaWalkerReset
  },
  {
    itemName: "kurokumaft:nether_water_magic_boots",
    func: waterSpeedUp,
    delay: TicksPerSecond53 * 1,
    removeFunc: waterSpeedReset
  },
  {
    itemName: "kurokumaft:nether_wind_magic_boots",
    func: windSpeedUp,
    delay: TicksPerSecond53 * 1,
    removeFunc: windSpeedReset
  },
  {
    itemName: "kurokumaft:nether_stone_magic_boots",
    func: stoneFallInvalid,
    delay: TicksPerSecond53 * 1,
    removeFunc: stoneFallInvalidReset
  },
  {
    itemName: "kurokumaft:nether_lightning_magic_boots",
    func: lightningSpeedUp,
    delay: TicksPerSecond53 * 1,
    removeFunc: lightningSpeedReset
  },
  {
    itemName: "kurokumaft:nether_ice_magic_boots",
    func: iceWalker,
    delay: 5,
    removeFunc: iceWalkerReset
  }
]);
var MagicBootsSurveillance = class {
  constructor(player, itemStack) {
    this.player = player;
    this.itemStack = itemStack;
  }
  /**
   * 胴装備状態チェック
   */
  checkMagicBootsTick() {
    this.checkJob();
  }
  async checkJob() {
    const equItem = MagicBootsObjects.find((obj) => obj.itemName == this.itemStack.typeId);
    if (equItem == void 0) {
      return;
    }
    const equ = this.player.getComponent(EntityComponentTypes14.Equippable);
    const boot = equ.getEquipment(EquipmentSlot26.Feet);
    if (boot != null && boot.typeId == equItem.itemName) {
      this.player.setDynamicProperty("magic_boot_equ", true);
      equItem.func(this.player);
      system41.runTimeout(() => {
        system41.run(this.checkJob.bind(this));
      }, equItem.delay);
    } else {
      this.player.setDynamicProperty("magic_boot_equ", false);
    }
  }
};
async function lavaWalker(player) {
  const blockVol = new BlockVolume8(
    {
      x: player.location.x - 1,
      y: player.location.y - 1,
      z: player.location.z - 1
    },
    {
      x: player.location.x + 1,
      y: player.location.y - 1,
      z: player.location.z + 1
    }
  );
  player.dimension.fillBlocks(blockVol, MinecraftBlockTypes.Magma, {
    blockFilter: {
      includePermutations: [
        BlockPermutation7.resolve(MinecraftBlockTypes.Lava),
        BlockPermutation7.resolve(MinecraftBlockTypes.FlowingLava)
      ]
    },
    ignoreChunkBoundErrors: true
  });
}
async function waterSpeedUp(player) {
  const move = player.getComponent(EntityComponentTypes14.UnderwaterMovement);
  if (player.isInWater) {
    move.setCurrentValue(0.15);
  } else {
    move.setCurrentValue(0.02);
  }
}
async function windSpeedUp(player) {
  const move = player.getComponent(EntityComponentTypes14.Movement);
  if (!player.isInWater) {
    move.setCurrentValue(0.2);
  } else {
    move.setCurrentValue(0.1);
  }
}
async function stoneFallInvalid(player) {
  player.addTag("fall_invalid");
}
async function stoneFallInvalidReset(player) {
  player.removeTag("fall_invalid");
}
async function lightningSpeedUp(player) {
  const move = player.getComponent(EntityComponentTypes14.Movement);
  if (move.currentValue != 0.4) {
    move.setCurrentValue(0.4);
  }
}
async function iceWalker(player) {
  const blockVol = new BlockVolume8(
    {
      x: player.location.x - 1,
      y: player.location.y - 1,
      z: player.location.z - 1
    },
    {
      x: player.location.x + 1,
      y: player.location.y - 1,
      z: player.location.z + 1
    }
  );
  player.dimension.fillBlocks(blockVol, MinecraftBlockTypes.PackedIce, {
    blockFilter: {
      includePermutations: [
        BlockPermutation7.resolve(MinecraftBlockTypes.Water),
        BlockPermutation7.resolve(MinecraftBlockTypes.FlowingWater)
      ]
    },
    ignoreChunkBoundErrors: true
  });
}
async function lavaWalkerReset(player) {
}
async function waterSpeedReset(player) {
  const move = player.getComponent(EntityComponentTypes14.UnderwaterMovement);
  if (move.currentValue != 0.02) {
    move.setCurrentValue(0.02);
  }
}
async function windSpeedReset(player) {
  const move = player.getComponent(EntityComponentTypes14.Movement);
  if (move.currentValue != 0.1) {
    move.setCurrentValue(0.1);
  }
}
async function lightningSpeedReset(player) {
  const move = player.getComponent(EntityComponentTypes14.Movement);
  if (move.currentValue != 0.1) {
    move.setCurrentValue(0.1);
  }
}
async function iceWalkerReset(player) {
}

// scripts/player/MagicArmorEquipment.ts
var MagicPlayerMonitorTick = class _MagicPlayerMonitorTick {
  constructor(player) {
    this.player = player;
  }
  startMonitoring() {
    this.checkPlayerMagicEquTick();
  }
  async checkPlayerMagicEquTick() {
    if (this.player.isValid) {
      try {
        const equ = this.player.getComponent(EntityComponentTypes15.Equippable);
        const offHand = equ.getEquipment(EquipmentSlot27.Offhand);
        if (offHand != void 0) {
          if (offHand.hasTag("kurokumaft:magic_shield") && this.player.isSneaking) {
            if (!this.player.hasTag("off_shield_guard")) {
              this.player.addTag("off_shield_guard");
            }
          } else {
            if (this.player.hasTag("off_shield_guard")) {
              this.player.removeTag("off_shield_guard");
            }
          }
        } else {
          if (this.player.hasTag("off_shield_guard")) {
            this.player.removeTag("off_shield_guard");
          }
        }
        const mainHand = equ.getEquipment(EquipmentSlot27.Mainhand);
        if (mainHand != void 0) {
          if (mainHand.hasTag("kurokumaft:magic_shield") && this.player.isSneaking) {
            if (!this.player.hasTag("main_shield_guard")) {
              this.player.addTag("main_shield_guard");
            }
          } else {
            if (this.player.hasTag("main_shield_guard")) {
              this.player.removeTag("main_shield_guard");
            }
          }
        } else {
          if (this.player.hasTag("main_shield_guard")) {
            this.player.removeTag("main_shield_guard");
          }
        }
        const head = equ.getEquipment(EquipmentSlot27.Head);
        if (head != void 0) {
          if (!this.player.getDynamicProperty("magic_helmet_equ")) {
            new MagicHelmetSurveillance(this.player, head).checkMagicHelmetTick();
          }
        } else {
          this.player.setDynamicProperty("magic_helmet_equ", false);
        }
        const chest = equ.getEquipment(EquipmentSlot27.Chest);
        if (chest != void 0) {
          if (!this.player.getDynamicProperty("magic_chest_equ")) {
            new MagicChestSurveillance(this.player, chest).checkMagicChestTick();
          }
        } else {
          this.player.setDynamicProperty("magic_chest_equ", false);
        }
        const legs = equ.getEquipment(EquipmentSlot27.Legs);
        if (legs != void 0) {
          if (!this.player.getDynamicProperty("magic_leg_equ")) {
            new MagicLeggingsSurveillance(this.player, legs).checkMagicLeggingsTick();
          }
        } else {
          this.player.setDynamicProperty("magic_leg_equ", false);
        }
        const feet = equ.getEquipment(EquipmentSlot27.Feet);
        if (feet != void 0) {
          if (!this.player.getDynamicProperty("magic_boot_equ")) {
            new MagicBootsSurveillance(this.player, feet).checkMagicBootsTick();
          }
        } else {
          this.player.setDynamicProperty("magic_boot_equ", false);
        }
        checkAttackProtection(this.player, head, chest, legs, feet);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
      system42.waitTicks(2).then(() => {
        new _MagicPlayerMonitorTick(this.player).startMonitoring();
      });
    }
  }
};
function checkAttackProtection(player, head, chest, legs, feet) {
  if (!player.hasTag("attack_protection")) {
    if (head != void 0 && head.hasTag("kurokumaft:nether_magic_armor")) {
      player.addTag("attack_protection");
    } else if (chest != void 0 && chest.hasTag("kurokumaft:nether_magic_armor")) {
      player.addTag("attack_protection");
    } else if (legs != void 0 && legs.hasTag("kurokumaft:nether_magic_armor")) {
      player.addTag("attack_protection");
    } else if (feet != void 0 && feet.hasTag("kurokumaft:nether_magic_armor")) {
      player.addTag("attack_protection");
    } else {
      player.removeTag("attack_protection");
    }
  }
}

// scripts/magic_script.ts
var guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];
system43.beforeEvents.startup.subscribe((initEvent) => {
  initRegisterMagicCustom(initEvent);
});
world38.beforeEvents.playerLeave.subscribe((leaveEvent) => {
  leaveEvent.player.clearDynamicProperties();
});
world38.afterEvents.playerSpawn.subscribe((event) => {
  new MagicPlayerMonitorTick(event.player).startMonitoring();
});
world38.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
  const entity = event.entity;
  if (event.eventId == "kurokumaft:explosion_guard_knockback") {
    MagicShieldKnockback(entity);
  } else if (event.eventId == "kurokumaft:moniter_boss_event") {
    const object = BossActionObjects.find((ob) => ob.entityName == entity.typeId);
    if (object != void 0) {
      const actionClass = BossActionClassRecord[object.className];
      const actionObject = new actionClass(entity);
      actionObject.startMoniter();
    }
  }
});
world38.afterEvents.entityHitEntity.subscribe((event) => {
  const dameger = event.damagingEntity;
  const hitEn = event.hitEntity;
  if (hitEn.typeId == "minecraft:player") {
    magicShieldGuard(hitEn, true);
    magicShieldCounter(hitEn, dameger);
    hitMagicAmor(hitEn, dameger, void 0, void 0);
  }
  if (dameger.typeId == "kurokumaft:fire_chicken") {
    fireChickenAttack(hitEn);
  } else if (dameger.typeId == "kurokumaft:aqua_jackal") {
    aquaJackalAttack(hitEn);
  } else if (dameger.typeId == "kurokumaft:snow_wolf") {
    snowWolfAttack(hitEn);
  } else if (dameger.typeId == "kurokumaft:earth_rhino") {
    earthRhinoKnockback(hitEn);
  }
  if (hitEn.typeId == "kurokumaft:flame_porcupine") {
    flamePorcupineGuard(dameger);
  }
});
world38.afterEvents.projectileHitEntity.subscribe((event) => {
  const projectileEn = event.projectile;
  const hitEn = event.getEntityHit().entity;
  const dameger = event.source;
  const hitVector = event.hitVector;
  if (hitEn != void 0 && hitEn.typeId == "minecraft:player") {
    magicShieldGuard(hitEn, false);
    magicShieldCounter(hitEn, dameger);
    hitMagicAmor(hitEn, dameger, projectileEn, hitVector);
  }
  if (projectileEn != void 0) {
    if (checkWandProjectile(projectileEn.typeId)) {
      hitWandProjectileEvent(projectileEn);
    }
    if (checkArrowProjectile(projectileEn.typeId)) {
      hitArrowEvent(projectileEn, hitEn);
    }
    if (checkShellProjectile(projectileEn.typeId)) {
      hitShellEvent(projectileEn, dameger);
    }
  }
});
world38.afterEvents.entityHitBlock.subscribe((event) => {
  const block = event.hitBlock;
  const entity = event.damagingEntity;
});
world38.afterEvents.projectileHitBlock.subscribe((event) => {
  const projectileEn = event.projectile;
  const dameger = event.source;
  if (projectileEn != void 0) {
    if (checkWandProjectile(projectileEn.typeId)) {
      hitWandProjectileEvent(projectileEn);
    }
    if (checkShellProjectile(projectileEn.typeId)) {
      hitShellEvent(projectileEn, dameger);
    }
  }
});
world38.afterEvents.entityHurt.subscribe((event) => {
  const damageSource = event.damageSource;
  const hitEn = event.hurtEntity;
  if (hitEn != void 0 && hitEn.typeId == "minecraft:player" && damageSource.cause != "void") {
    if (guards.indexOf(damageSource.cause) != -1) {
      magicShieldGuard(hitEn, false);
    }
  }
});
world38.afterEvents.itemReleaseUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;
  const duration = event.useDuration;
  if (item != void 0) {
    if (player.getDynamicProperty("BowShotMagicCharge")) {
      magicBowShot(player, item, duration);
    }
    isChargeed(player, item);
  }
});
world38.afterEvents.blockExplode.subscribe((event) => {
  const block = event.block;
  if (block.typeId == "kurokumaft:magic_lectern") {
    magic_lectern_break(block, block.dimension);
  }
  if (block.typeId == "kurokumaft:magma_portal_x" || block.typeId == "kurokumaft:magma_portal_z") {
    portalGateBreak(block, event.explodedBlockPermutation);
  }
});
world38.beforeEvents.explosion.subscribe((event) => {
  const impactBLockList = event.getImpactedBlocks();
  const filterBlockList = explodeBedrock(impactBLockList);
  if (filterBlockList != void 0) {
    event.setImpactedBlocks(filterBlockList);
  }
});
world38.beforeEvents.playerBreakBlock.subscribe((event) => {
  const player = event.player;
  const block = event.block;
  if (player != void 0) {
  }
});
world38.afterEvents.entityLoad.subscribe((event) => {
  const entity = event.entity;
  if (entity.typeId == "kurokumaft:magic_brewing_stand") {
    const brewing_block = entity.dimension.getBlock(entity.location);
    new MagicBrewingStand(entity, brewing_block).checkPosionBrewTick();
  }
});
world38.afterEvents.entitySpawn.subscribe((event) => {
  const entity = event.entity;
  const cause = event.cause;
  if (cause == EntityInitializationCause.Spawned) {
    if (entity.typeId == "kurokumaft:dolphin_ultrasonic") {
      entity.dimension.playSound("mob.dolphin.death", entity.location, {
        pitch: 1,
        volume: 2
      });
    } else if (entity.typeId == "kurokumaft:bat_ultrasonic") {
      entity.dimension.playSound("mob.bat.death", entity.location, {
        pitch: 1,
        volume: 2
      });
    }
  }
});
world38.afterEvents.buttonPush.subscribe((event) => {
  const entity = event.source;
  const block = event.block;
  A:
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        for (let z = -1; z <= 1; z++) {
          const nearLoc = { x: block.location.x + x, y: block.location.y + y, z: block.location.z + z };
          const nearblock = event.dimension.getBlock(nearLoc);
          if (nearblock.typeId == MinecraftBlockTypes.CommandBlock) {
            entity.setDynamicProperty("teamCommandSet", true);
            system43.runTimeout(() => {
              entity.setDynamicProperty("teamCommandSet", void 0);
            }, TicksPerSecond54 * 2);
            break A;
          }
        }
      }
    }
});
system43.afterEvents.scriptEventReceive.subscribe((event) => {
  const id = event.id;
  const message = event.message;
  const initiator = event.initiator;
  if (initiator != void 0) {
  }
  const sourceType = event.sourceType;
  if (sourceType == ScriptEventSource.Block) {
    const sourceBlock = event.sourceBlock;
    if (sourceBlock != void 0 && sourceBlock.typeId == MinecraftBlockTypes.CommandBlock) {
      if (id == "kk:teamtag") {
        const players = sourceBlock.dimension.getPlayers({
          location: sourceBlock.location,
          maxDistance: 2
        });
        players.forEach((player) => {
          if (player.getDynamicProperty("teamCommandSet")) {
            const params = message.split(" ");
            if (params[0] == "add") {
              const tags = player.getTags();
              tags.forEach((tag) => {
                if (tag.indexOf("team") != -1) {
                  player.removeTag(tag);
                  player.onScreenDisplay.setActionBar({ translate: "mess.kurokumaft:team_name.remove", with: [tag.substring(4)] });
                }
              });
              player.addTag("team" + params[1]);
              player.onScreenDisplay.setActionBar({ translate: "mess.kurokumaft:team_name.add", with: [params[1]] });
            } else if (params[0] == "remove") {
              const tags = player.getTags();
              tags.forEach((tag) => {
                if (tag.indexOf("team") != -1) {
                  player.removeTag(tag);
                  player.onScreenDisplay.setActionBar({ translate: "mess.kurokumaft:team_name.remove", with: [tag.substring(4)] });
                }
              });
            }
          }
        });
      }
    }
  } else if (sourceType == ScriptEventSource.Entity) {
    const sourceEntity = event.sourceEntity;
    if (sourceEntity != void 0 && sourceEntity instanceof Player101) {
      if (id == "kk:teamtag") {
        const params = message.split(" ");
        if (params[0] == "add") {
          const tags = sourceEntity.getTags();
          tags.forEach((tag) => {
            if (tag.indexOf("team") != -1) {
              sourceEntity.removeTag(tag);
              sourceEntity.onScreenDisplay.setActionBar({ translate: "mess.kurokumaft:team_name.remove", with: [tag.substring(4)] });
            }
          });
          sourceEntity.addTag("team" + params[1]);
          sourceEntity.onScreenDisplay.setActionBar({ translate: "mess.kurokumaft:team_name.add", with: [params[1]] });
        } else if (params[0] == "remove") {
          const tags = sourceEntity.getTags();
          tags.forEach((tag) => {
            if (tag.indexOf("team") != -1) {
              sourceEntity.removeTag(tag);
              sourceEntity.onScreenDisplay.setActionBar({ translate: "mess.kurokumaft:team_name.remove", with: [tag.substring(4)] });
            }
          });
        }
      }
    }
  }
}, {
  namespaces: [
    "kk"
  ]
});

//# sourceMappingURL=../debug/magic_script.js.map
