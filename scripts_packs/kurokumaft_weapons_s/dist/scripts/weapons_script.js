// scripts/weapons_script.ts
import { world as world19, Player as Player47, EquipmentSlot as EquipmentSlot41, EntityComponentTypes as EntityComponentTypes25, EntityInitializationCause } from "@minecraft/server";

// scripts/common/WeaponsCommonUtil.ts
import { world, ItemStack, EntityComponentTypes, ItemComponentTypes, Direction, TicksPerSecond } from "@minecraft/server";

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
  MinecraftBlockTypes2["ChiseledSandstone"] = "minecraft:chiseled_sandstone";
  MinecraftBlockTypes2["ChiseledStoneBricks"] = "minecraft:chiseled_stone_bricks";
  MinecraftBlockTypes2["ChiseledTuff"] = "minecraft:chiseled_tuff";
  MinecraftBlockTypes2["ChiseledTuffBricks"] = "minecraft:chiseled_tuff_bricks";
  MinecraftBlockTypes2["ChorusFlower"] = "minecraft:chorus_flower";
  MinecraftBlockTypes2["ChorusPlant"] = "minecraft:chorus_plant";
  MinecraftBlockTypes2["Clay"] = "minecraft:clay";
  MinecraftBlockTypes2["ClientRequestPlaceholderBlock"] = "minecraft:client_request_placeholder_block";
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
  MinecraftBlockTypes2["DeprecatedAnvil"] = "minecraft:deprecated_anvil";
  MinecraftBlockTypes2["DeprecatedPurpurBlock1"] = "minecraft:deprecated_purpur_block_1";
  MinecraftBlockTypes2["DeprecatedPurpurBlock2"] = "minecraft:deprecated_purpur_block_2";
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
  MinecraftBlockTypes2["EndGateway"] = "minecraft:end_gateway";
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
  MinecraftBlockTypes2["Glowingobsidian"] = "minecraft:glowingobsidian";
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
  MinecraftBlockTypes2["InfoUpdate"] = "minecraft:info_update";
  MinecraftBlockTypes2["InfoUpdate2"] = "minecraft:info_update2";
  MinecraftBlockTypes2["InvisibleBedrock"] = "minecraft:invisible_bedrock";
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
  MinecraftBlockTypes2["MovingBlock"] = "minecraft:moving_block";
  MinecraftBlockTypes2["Mud"] = "minecraft:mud";
  MinecraftBlockTypes2["MudBrickDoubleSlab"] = "minecraft:mud_brick_double_slab";
  MinecraftBlockTypes2["MudBrickSlab"] = "minecraft:mud_brick_slab";
  MinecraftBlockTypes2["MudBrickStairs"] = "minecraft:mud_brick_stairs";
  MinecraftBlockTypes2["MudBrickWall"] = "minecraft:mud_brick_wall";
  MinecraftBlockTypes2["MudBricks"] = "minecraft:mud_bricks";
  MinecraftBlockTypes2["MuddyMangroveRoots"] = "minecraft:muddy_mangrove_roots";
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
  MinecraftBlockTypes2["Netherreactor"] = "minecraft:netherreactor";
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
  MinecraftBlockTypes2["PearlescentFroglight"] = "minecraft:pearlescent_froglight";
  MinecraftBlockTypes2["Peony"] = "minecraft:peony";
  MinecraftBlockTypes2["PetrifiedOakDoubleSlab"] = "minecraft:petrified_oak_double_slab";
  MinecraftBlockTypes2["PetrifiedOakSlab"] = "minecraft:petrified_oak_slab";
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
  MinecraftBlockTypes2["Reserved6"] = "minecraft:reserved6";
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
  MinecraftBlockTypes2["Skull"] = "minecraft:skull";
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
  MinecraftBlockTypes2["Stonecutter"] = "minecraft:stonecutter";
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
  return MinecraftBlockTypes2;
})(MinecraftBlockTypes || {});
var MinecraftCameraPresetsTypes = ((MinecraftCameraPresetsTypes2) => {
  MinecraftCameraPresetsTypes2["FirstPerson"] = "minecraft:first_person";
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
  MinecraftItemTypes2["Air"] = "minecraft:air";
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
  MinecraftItemTypes2["CreeperBannerPattern"] = "minecraft:creeper_banner_pattern";
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
  MinecraftItemTypes2["PiglinSpawnEgg"] = "minecraft:piglin_spawn_egg";
  MinecraftItemTypes2["PillagerSpawnEgg"] = "minecraft:pillager_spawn_egg";
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
  MinecraftItemTypes2["SkeletonSpawnEgg"] = "minecraft:skeleton_spawn_egg";
  MinecraftItemTypes2["Skull"] = "minecraft:skull";
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

// scripts/common/WeaponsCommonUtil.ts
var guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];
async function itemTans(player, item, replaceitem, slot) {
  let eqc = player.getComponent(EntityComponentTypes.Equippable);
  let newItem = new ItemStack(replaceitem, 1);
  let dur = item.getComponent(ItemComponentTypes.Durability);
  let newDur = newItem.getComponent(ItemComponentTypes.Durability);
  newDur.damage = dur.damage;
  replaceEnchant(item, newItem);
  eqc.setEquipment(slot, void 0);
  eqc.setEquipment(slot, newItem);
}
async function replaceEnchant(oldItem, newItem) {
  let oldEnc = oldItem.getComponent(ItemComponentTypes.Enchantable);
  let newEnc = newItem.getComponent(ItemComponentTypes.Enchantable);
  newEnc.addEnchantments(oldEnc.getEnchantments());
}
function getRandomInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
async function playsound(entity, sound) {
  world.playSound(sound, entity.location);
}
async function itemCoolDown(player, itemStack) {
  let cool = itemStack.getComponent(ItemComponentTypes.Cooldown);
  cool.startCooldown(player);
}
async function breakBlock(block) {
  block.dimension.setBlockType(block.location, MinecraftBlockTypes.Air);
}
function resuscitation(player) {
  let health = player.getComponent(EntityComponentTypes.Health);
  health.setCurrentValue(5);
  player.addEffect(MinecraftEffectTypes.Absorption, TicksPerSecond * 30, {
    amplifier: 5,
    showParticles: true
  });
  playsound(player, "random.totem");
}
function explodeBedrock(impactBLockList) {
  let filterBlockList = impactBLockList.filter((block) => {
    if (!block.matches("minecraft:bedrock")) {
      return block;
    }
  });
  return filterBlockList;
}
var ProbabilisticChoice = (list) => {
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
function getLookPoints(rotation, location, point) {
  let piNum = 90;
  let xlocation;
  let ylocation;
  let zlocation;
  if (rotation.y >= -90 && rotation.y < 0) {
    let yRotax = -rotation.y / piNum;
    let yRotaz = (rotation.y + 90) / piNum;
    let yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      let xRota = (rotation.x + 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 0.5 + yRota;
      zlocation = location.z + yRotaz * xRota * point;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      let xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 0.5 + yRota;
      zlocation = location.z + yRotaz * xRota * point;
    }
  } else if (rotation.y >= 0 && rotation.y <= 90) {
    let yRotax = -rotation.y / piNum;
    let yRotaz = -(rotation.y - 90) / piNum;
    let yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      let xRota = (rotation.x + 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 0.5 + yRota;
      zlocation = location.z + yRotaz * xRota * point;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      let xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 0.5 + yRota;
      zlocation = location.z + yRotaz * xRota * point;
    }
  } else if (rotation.y < -90 && rotation.y > -180) {
    let yRotax = (rotation.y + 180) / piNum;
    let yRotaz = (rotation.y + 90) / piNum;
    let yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      let xRota = (rotation.x + 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 0.5 + yRota;
      zlocation = location.z + yRotaz * xRota * point;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      let xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 0.5 + yRota;
      zlocation = location.z + yRotaz * xRota * point;
    }
  } else if (rotation.y > 90 && rotation.y <= 180) {
    let yRotax = (rotation.y - 180) / piNum;
    let yRotaz = -(rotation.y - 90) / piNum;
    let yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      let xRota = (rotation.x + 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 0.5 + yRota;
      zlocation = location.z + yRotaz * xRota * point;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      let xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 0.5 + yRota;
      zlocation = location.z + yRotaz * xRota * point;
    }
  }
  return { x: xlocation, y: ylocation, z: zlocation };
}
function getLookRotaionPoints(rotation, point, side) {
  let piNum = 90;
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

// scripts/player/WeaponsShieldEvent.ts
import { system, EntityComponentTypes as EntityComponentTypes3, ItemComponentTypes as ItemComponentTypes3, EquipmentSlot as EquipmentSlot3, EntityDamageCause } from "@minecraft/server";

// scripts/common/WeaponsItemDurabilityDamage.ts
import { Player as Player2, ItemComponentTypes as ItemComponentTypes2, EntityComponentTypes as EntityComponentTypes2, GameMode } from "@minecraft/server";
async function itemDurabilityDamage(entity, item, slot) {
  if (entity instanceof Player2 && entity.getGameMode() != GameMode.creative) {
    let equ = entity.getComponent(EntityComponentTypes2.Equippable);
    let durability = item.getComponent(ItemComponentTypes2.Durability);
    let dChange = durability.getDamageChance(Math.ceil(getRandomInRange(0, 3)));
    if (durability.damage + dChange >= durability.maxDurability) {
      equ.setEquipment(slot, void 0);
    } else {
      durability.damage = durability.damage + dChange;
      equ.setEquipment(slot, item);
    }
  }
}
async function itemDurabilityDamageFixed(entity, item, slot, damage) {
  if (entity instanceof Player2 && entity.getGameMode() == GameMode.creative) {
    return;
  }
  let equ = entity.getComponent(EntityComponentTypes2.Equippable);
  let durability = item.getComponent(ItemComponentTypes2.Durability);
  if (durability.damage + damage >= durability.maxDurability) {
    equ.setEquipment(slot, void 0);
  } else {
    durability.damage = durability.damage + damage;
    equ.setEquipment(slot, item);
  }
}
async function throwItemDurabilityDamage(entity, item, slotNum, damage) {
  if (entity instanceof Player2 && entity.getGameMode() == GameMode.creative) {
    return;
  }
  let invent = entity.getComponent(EntityComponentTypes2.Inventory);
  let container = invent.container;
  let durability = item.getComponent(ItemComponentTypes2.Durability);
  let dChange;
  if (damage) {
    dChange = damage;
  } else {
    dChange = durability.getDamageChance(Math.ceil(getRandomInRange(0, 3)));
  }
  if (durability.damage + dChange >= durability.maxDurability) {
    container.setItem(slotNum, void 0);
  } else {
    durability.damage = durability.damage + dChange;
    container.setItem(slotNum, item);
  }
}
async function subtractionItem(player, item, slot, decNum) {
  let remaining = item.amount - decNum;
  let equ = player.getComponent(EntityComponentTypes2.Equippable);
  if (remaining <= 0) {
    equ.setEquipment(slot, void 0);
  } else {
    item.amount -= decNum;
    equ.setEquipment(slot, item);
  }
}

// scripts/player/WeaponsShieldEvent.ts
function shieldGuard(player, range) {
  let equ = player.getComponent(EntityComponentTypes3.Equippable);
  let offhand = equ.getEquipment(EquipmentSlot3.Offhand);
  let mainhand = equ.getEquipment(EquipmentSlot3.Mainhand);
  if (player.isSneaking) {
    if (offhand != void 0 && (offhand.typeId.indexOf("_shield") != -1 || offhand.typeId == "kurokumaft:kettle_lid")) {
      if (offhand.typeId.indexOf("kurokumaft:glass_shield") != -1 && range) {
        itemDurabilityDamageFixed(player, offhand, EquipmentSlot3.Offhand, 10);
        playsound(player, "random.glass");
      } else {
        itemDurabilityDamageFixed(player, offhand, EquipmentSlot3.Offhand, 1);
        if (offhand.typeId == "kurokumaft:tnt_shield" && range) {
          playsound(player, "random.explode");
        } else if (offhand.typeId == "kurokumaft:steel_shield") {
          playsound(player, "item.trident.hit_ground");
        } else {
          playsound(player, "item.shield.block");
        }
      }
    } else if (mainhand != void 0 && (mainhand.typeId.indexOf("_shield") != -1 || mainhand.typeId == "kurokumaft:kettle_lid")) {
      if (mainhand.typeId.indexOf("kurokumaft:glass_shield") != -1 && range) {
        itemDurabilityDamageFixed(player, mainhand, EquipmentSlot3.Mainhand, 10);
        playsound(player, "random.glass");
      } else {
        itemDurabilityDamageFixed(player, mainhand, EquipmentSlot3.Mainhand, 1);
        if (mainhand.typeId == "kurokumaft:tnt_shield" && range) {
          playsound(player, "random.explode");
        } else {
          playsound(player, "item.shield.block");
        }
      }
    }
  }
}
function shieldCounter(player, damager) {
  let equ = player.getComponent(EntityComponentTypes3.Equippable);
  let offhand = equ.getEquipment(EquipmentSlot3.Offhand);
  let mainhand = equ.getEquipment(EquipmentSlot3.Mainhand);
  if (player.isSneaking) {
    if (offhand != void 0 && offhand.typeId == "kurokumaft:magma_shield" || mainhand != void 0 && mainhand.typeId == "kurokumaft:magma_shield") {
      damager.applyDamage(1, { cause: EntityDamageCause.lava });
      damager.dimension.spawnParticle("kurokumaft:mobflame_firing", damager.location);
      let intervalNum = system.runInterval(() => {
        if (damager) {
          let health = damager.getComponent(EntityComponentTypes3.Health);
          if (health && health.isValid()) {
            damager.applyDamage(1, { cause: EntityDamageCause.lava });
            damager.dimension.spawnParticle("kurokumaft:mobflame_firing", damager.location);
          }
        }
      }, 5);
      system.runTimeout(() => {
        system.clearRun(intervalNum);
      }, 30);
    } else if (offhand != void 0 && offhand.typeId == "kurokumaft:blueice_shield" || mainhand != void 0 && mainhand.typeId == "kurokumaft:blueice_shield") {
      damager.applyDamage(1, { cause: EntityDamageCause.freezing });
      damager.dimension.spawnParticle("minecraft:snowflake_particle", damager.location);
      let intervalNum = system.runInterval(() => {
        if (damager) {
          let health = damager.getComponent(EntityComponentTypes3.Health);
          if (health) {
            damager.applyDamage(1, { cause: EntityDamageCause.freezing });
            damager.dimension.spawnParticle("minecraft:snowflake_particle", damager.location);
          }
        }
      }, 5);
      system.runTimeout(() => {
        system.clearRun(intervalNum);
      }, 30);
    } else if (offhand != void 0 && offhand.typeId == "kurokumaft:tnt_shield" || mainhand != void 0 && mainhand.typeId == "kurokumaft:tnt_shield") {
      let view = player.getViewDirection();
      damager.applyDamage(5, { cause: EntityDamageCause.entityExplosion });
      damager.dimension.spawnParticle("minecraft:large_explosion", damager.location);
      damager.applyKnockback(Math.round(view.x) * 10, Math.round(view.z) * 10, 10, 1);
    } else {
      guardKnockback(damager, player);
    }
  }
}
function resuscitationEquipment(player) {
  let health = player.getComponent(EntityComponentTypes3.Health);
  let healthInt = health.currentValue;
  if (healthInt <= 2) {
    let equ = player.getComponent(EntityComponentTypes3.Equippable);
    let offhand = equ.getEquipment(EquipmentSlot3.Offhand);
    let mainhand = equ.getEquipment(EquipmentSlot3.Mainhand);
    if (offhand != void 0 && offhand.typeId == "kurokumaft:immortal_shield") {
      let dur = offhand.getComponent(ItemComponentTypes3.Durability);
      resuscitation(player);
      itemDurabilityDamageFixed(player, offhand, EquipmentSlot3.Offhand, 30 / 100 * dur.maxDurability);
    } else if (mainhand != void 0 && mainhand.typeId == "kurokumaft:immortal_shield") {
      let dur = mainhand.getComponent(ItemComponentTypes3.Durability);
      resuscitation(player);
      itemDurabilityDamageFixed(player, mainhand, EquipmentSlot3.Mainhand, 30 / 100 * dur.maxDurability);
    }
  }
}
function glassReflection(player, projectile, hitVector) {
  if (projectile != void 0) {
    let equ = player.getComponent(EntityComponentTypes3.Equippable);
    let offhand = equ.getEquipment(EquipmentSlot3.Offhand);
    let mainhand = equ.getEquipment(EquipmentSlot3.Mainhand);
    if (player.isSneaking) {
      if (offhand != void 0 && offhand.typeId.indexOf("glass_shield") != -1 || mainhand != void 0 && mainhand.typeId.indexOf("glass_shield") != -1) {
        projectile.clearVelocity();
        projectile.getHeadLocation().z = projectile.getHeadLocation().z - 180;
        projectile.applyImpulse({ x: hitVector.x, y: hitVector.y, z: hitVector.z - 180 });
      }
    }
  }
}
function guardKnockback(damager, player) {
  let view = player.getViewDirection();
  damager.applyKnockback(Math.round(view.x) * 2, Math.round(view.z) * 2, 3, 0.3);
}

// scripts/items/weapons/sword/TntSwordBreak.ts
import { EquipmentSlot as EquipmentSlot4 } from "@minecraft/server";
var TntSwordBreak = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let item = event.itemStack;
    tntBreak(attackEntity, item, hitEntity.location);
  }
};
async function tntBreak(attackEntity, itemStack, location) {
  attackEntity.dimension.spawnEntity("kurokumaft:tnt_sword_break", location);
  itemDurabilityDamage(attackEntity, itemStack, EquipmentSlot4.Mainhand);
}

// scripts/player/WeaponsArmorEquipment.ts
import { EntityComponentTypes as EntityComponentTypes5, EquipmentSlot as EquipmentSlot6, system as system3, world as world4 } from "@minecraft/server";

// scripts/items/armor/HelmetSurveillance.ts
import { EntityComponentTypes as EntityComponentTypes4, EquipmentSlot as EquipmentSlot5, system as system2, TicksPerSecond as TicksPerSecond2, ItemComponentTypes as ItemComponentTypes4 } from "@minecraft/server";
var HelmetSurveillance = class {
  constructor(player, itemStack) {
    this.player = player;
    this.itemStack = itemStack;
  }
  /**
   * 頭装備状態チェック
   */
  checkHelmetTick() {
    this.checkJob();
  }
  async checkJob() {
    let equ = this.player.getComponent(EntityComponentTypes4.Equippable);
    let head = equ.getEquipment(EquipmentSlot5.Head);
    if (head != null && head.typeId == this.itemStack.typeId) {
      this.player.setDynamicProperty("helmet_equ", this.itemStack.typeId);
      head.getTags().forEach((tag) => {
        if ("axolotl_helmet" == tag) {
          this.player.setDynamicProperty("axolotl_helmet", true);
        } else if ("chicken_helmet" == tag) {
          chickenSlowFalling(this.player);
        } else if ("fox_helmet" == tag) {
          foxSpeedBoost(this.player);
        } else if ("rabbit_helmet" == tag) {
          rabbitJumpBoost(this.player);
        } else if ("wolf_helmet" == tag) {
          wolfPowerBoost(this.player);
        }
      });
      system2.runTimeout(() => {
        system2.run(this.checkJob.bind(this));
      }, TicksPerSecond2 * 10);
    } else {
      this.player.setDynamicProperty("helmet_equ", void 0);
      this.player.setDynamicProperty("axolotl_helmet", false);
      resetSlowFalling(this.player);
      resetSpeedBoost(this.player);
      resetJumpBoost(this.player);
      resetPowerBoost(this.player);
    }
  }
};
async function axolotlRegeneration(player) {
  let health = player.getComponent(EntityComponentTypes4.Health);
  if (health.currentValue <= 4) {
    health.setCurrentValue(health.defaultValue);
    let equ = player.getComponent(EntityComponentTypes4.Equippable);
    let head = equ.getEquipment(EquipmentSlot5.Head);
    let itemDur = head.getComponent(ItemComponentTypes4.Durability);
    playsound(player, "random.totem");
    itemDurabilityDamageFixed(player, head, EquipmentSlot5.Head, itemDur.maxDurability / 3);
  }
}
async function chickenSlowFalling(player) {
  player.addEffect(MinecraftEffectTypes.SlowFalling, TicksPerSecond2 * 60, {
    amplifier: 2,
    showParticles: false
  });
}
async function resetSlowFalling(player) {
  player.removeEffect(MinecraftEffectTypes.SlowFalling);
}
async function foxSpeedBoost(player) {
  player.addEffect(MinecraftEffectTypes.Speed, TicksPerSecond2 * 60, {
    amplifier: 2,
    showParticles: false
  });
}
async function resetSpeedBoost(player) {
  player.removeEffect(MinecraftEffectTypes.Speed);
}
async function rabbitJumpBoost(player) {
  player.addEffect(MinecraftEffectTypes.JumpBoost, TicksPerSecond2 * 60, {
    amplifier: 2,
    showParticles: false
  });
}
async function resetJumpBoost(player) {
  player.removeEffect(MinecraftEffectTypes.JumpBoost);
}
async function wolfPowerBoost(player) {
  player.addEffect(MinecraftEffectTypes.Strength, TicksPerSecond2 * 60, {
    amplifier: 2,
    showParticles: false
  });
}
async function resetPowerBoost(player) {
  player.removeEffect(MinecraftEffectTypes.Strength);
}

// scripts/player/WeaponsArmorEquipment.ts
async function checkWeaponsPlayerEquTick() {
  let players = world4.getPlayers();
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    let equ = player.getComponent(EntityComponentTypes5.Equippable);
    let offHand = equ.getEquipment(EquipmentSlot6.Offhand);
    if (offHand) {
      if (offHand.hasTag("kurokumaft:shield") && player.isSneaking) {
        if (!player.hasTag("off_shield_guard")) {
          player.addTag("off_shield_guard");
          player.triggerEvent("kurokumaft:guard_effect_immunity");
        }
      } else {
        if (player.hasTag("off_shield_guard")) {
          player.removeTag("off_shield_guard");
          player.triggerEvent("kurokumaft:guard_effect_immunity_reset");
        }
      }
    }
    let mainHand = equ.getEquipment(EquipmentSlot6.Mainhand);
    if (mainHand) {
      if (mainHand.hasTag("kurokumaft:shield") && player.isSneaking) {
        if (!player.hasTag("main_shield_guard")) {
          player.addTag("main_shield_guard");
          player.triggerEvent("kurokumaft:guard_effect_immunity");
        }
      } else {
        if (player.hasTag("main_shield_guard")) {
          player.removeTag("main_shield_guard");
          player.triggerEvent("kurokumaft:guard_effect_immunity_reset");
        }
      }
    }
    let head = equ.getEquipment(EquipmentSlot6.Head);
    if (head) {
      if (player.getDynamicProperty("helmet_equ") != head.typeId) {
        new HelmetSurveillance(player, head).checkHelmetTick();
      }
    } else {
      player.setDynamicProperty("helmet_equ", void 0);
    }
  }
  system3.run(checkWeaponsPlayerEquTick);
}

// scripts/items/weapons/sword/MagmaSwordFire.ts
import { EquipmentSlot as EquipmentSlot7 } from "@minecraft/server";
var MagmaSwordFire = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    magmaFire(attackEntity.dimension, hitEntity.location);
  }
  // ブロック
  onUseOn(event) {
    let source = event.source;
    let block = event.block;
    let itemStack = event.itemStack;
    setMagmaBlock(source.dimension, block.location);
    itemDurabilityDamage(source, itemStack, EquipmentSlot7.Mainhand);
  }
};
async function magmaFire(dimension, location) {
  dimension.spawnEntity("kurokumaft:magma_sword_entity", location);
}
async function setMagmaBlock(dimension, location) {
  dimension.setBlockType(location, MinecraftBlockTypes.Magma);
}

// scripts/items/weapons/sword/BuleSwordIce.ts
import { EquipmentSlot as EquipmentSlot8, EntityDamageCause as EntityDamageCause2 } from "@minecraft/server";
var BuleSwordIce = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    iceFreez(hitEntity);
  }
  // ブロック
  onUseOn(event) {
    let source = event.source;
    let block = event.block;
    let itemStack = event.itemStack;
    setBlueIceBlock(source.dimension, block.location);
    itemDurabilityDamage(source, itemStack, EquipmentSlot8.Mainhand);
  }
};
async function iceFreez(hitEntity) {
  hitEntity.applyDamage(6, {
    cause: EntityDamageCause2.freezing
  });
  hitEntity.dimension.setBlockType(hitEntity.location, MinecraftBlockTypes.Ice);
}
async function setBlueIceBlock(dimension, location) {
  dimension.setBlockType(location, MinecraftBlockTypes.BlueIce);
}

// scripts/common/WeaponsSweepAttack.ts
import { EntityDamageCause as EntityDamageCause3 } from "@minecraft/server";
async function sweepHit(attackEntity, hitEntity, damage) {
  attackEntity.addTag("sweepHit");
  let dim = attackEntity.dimension;
  let look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
  dim.spawnParticle("kurokumaft:sweep_particle", look);
  let targetEn = dim.getEntities({
    excludeTags: [
      "sweepHit"
    ],
    excludeFamilies: [
      "inanimate"
    ],
    excludeTypes: [
      "item"
    ],
    location: hitEntity.location,
    maxDistance: 1.75
  });
  targetEn.forEach((en) => {
    en.applyDamage(damage, {
      cause: EntityDamageCause3.ramAttack
    });
  });
  attackEntity.removeTag("sweepHit");
}
async function sweepThreeHit(attackEntity, hitEntity, damage) {
  attackEntity.addTag("sweepHit");
  let dim = attackEntity.dimension;
  let look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
  dim.spawnParticle("kurokumaft:sweep_particle", { x: look.x, y: look.y - 0.5, z: look.z });
  dim.spawnParticle("kurokumaft:sweep_particle", look);
  dim.spawnParticle("kurokumaft:sweep_particle", { x: look.x, y: look.y + 0.5, z: look.z });
  let targetEn = dim.getEntities({
    excludeTags: [
      "sweepHit"
    ],
    excludeFamilies: [
      "inanimate"
    ],
    excludeTypes: [
      "item"
    ],
    location: hitEntity.location,
    maxDistance: 1.75
  });
  targetEn.forEach((en) => {
    en.applyDamage(damage, {
      cause: EntityDamageCause3.ramAttack
    });
    en.applyDamage(damage, {
      cause: EntityDamageCause3.ramAttack
    });
    en.applyDamage(damage, {
      cause: EntityDamageCause3.ramAttack
    });
  });
  attackEntity.removeTag("sweepHit");
}

// scripts/items/weapons/sword/MithrilSword.ts
var MithrilSword = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
    sweepHit(attackEntity, hitEntity, 6);
  }
};

// scripts/items/weapons/sword/EchoSword.ts
import { EquipmentSlot as EquipmentSlot9 } from "@minecraft/server";

// scripts/common/WeaponsShooterPoints.ts
import { EntityComponentTypes as EntityComponentTypes6 } from "@minecraft/server";
async function shooting(player, throwItem, ranNum, seepd, event) {
  let bulet = player.dimension.spawnEntity(throwItem, player.getHeadLocation());
  if (event) {
    bulet.triggerEvent(event);
  }
  let projectile = bulet.getComponent(EntityComponentTypes6.Projectile);
  projectile.owner = player;
  projectile.shoot(
    player.getViewDirection(),
    {
      uncertainty: ranNum
    }
  );
  return bulet;
}

// scripts/items/weapons/sword/EchoSword.ts
var EchoSword = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
    sweepThreeHit(attackEntity, hitEntity, 2);
  }
  // チャージ完了
  onCompleteUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    sonicBullet(source);
    itemDurabilityDamage(source, itemStack, EquipmentSlot9.Mainhand);
  }
};
async function sonicBullet(player) {
  shooting(player, "kurokumaft:sonic_bullet", 0, 5, void 0);
  player.runCommandAsync('/titleraw @s actionbar {"rawtext": [{"translate": "mess.kurokumaft:echo_sword.sonic_bullet"}]}');
}

// scripts/items/weapons/sword/CherrySword.ts
var CherrySword = class {
  // 通常攻撃
  onHitEntity(event) {
    let hitEntity = event.hitEntity;
    cherrySlash(hitEntity);
  }
};
async function cherrySlash(hitEntity) {
  hitEntity.dimension.spawnParticle("kurokumaft:cherry_slash", { x: hitEntity.location.x, y: hitEntity.location.y + 0.5, z: hitEntity.location.z });
}

// scripts/items/weapons/sword/EnderDragonSword.ts
import { EquipmentSlot as EquipmentSlot10 } from "@minecraft/server";
var EnderDragonSword = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
    sweepHit(attackEntity, hitEntity, 6);
  }
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    dragonFireball(source);
    itemDurabilityDamage(source, itemStack, EquipmentSlot10.Mainhand);
    itemCoolDown(source, itemStack);
  }
};
async function dragonFireball(player) {
  shooting(player, "kurokumaft:dragon_fireball_2", 0, 2, void 0);
}

// scripts/items/weapons/sword/WitherSword.ts
import { EquipmentSlot as EquipmentSlot11 } from "@minecraft/server";
var WitherSword = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
    sweepThreeHit(attackEntity, hitEntity, 3);
    witherSwordEffect(attackEntity, hitEntity);
  }
  // チャージ完了
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    witherSkull(source);
    itemDurabilityDamage(source, itemStack, EquipmentSlot11.Mainhand);
    itemCoolDown(source, itemStack);
  }
};
async function witherSwordEffect(attackEntity, hitEntity) {
  attackEntity.addTag("witherSword");
  let dim = attackEntity.dimension;
  let targetEn = dim.getEntities({
    excludeTags: [
      "witherSword"
    ],
    excludeFamilies: [
      "inanimate"
    ],
    excludeTypes: [
      "item"
    ],
    location: hitEntity.location,
    maxDistance: 1.75
  });
  targetEn.forEach((en) => {
    en.addEffect(MinecraftEffectTypes.Wither, 10, {
      amplifier: 3
    });
  });
  attackEntity.removeTag("witherSword");
}
async function witherSkull(player) {
  let center = getLookRotaionPoints(player.getRotation(), 1.5, 0);
  shooting(player, "kurokumaft:wither_skull_dangerous_2<kurokumaft:blast_1>", 0, 0.5, void 0);
  let left = getLookRotaionPoints(player.getRotation(), 1.5, 1.5);
  shooting(player, "kurokumaft:wither_skull_dangerous_2<kurokumaft:blast_2>", 0, 0.5, void 0);
  let right = getLookRotaionPoints(player.getRotation(), 1.5, -1.5);
  shooting(player, "kurokumaft:wither_skull_dangerous_2<kurokumaft:blast_3>", 0, 0.5, void 0);
}

// scripts/items/weapons/sword/EnderEyeSword.ts
import { EquipmentSlot as EquipmentSlot12, EntityComponentTypes as EntityComponentTypes7, TicksPerSecond as TicksPerSecond3 } from "@minecraft/server";
var EnderEyeSword = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    evilTeleport(attackEntity, hitEntity);
  }
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    evilEye(source);
    itemDurabilityDamage(source, itemStack, EquipmentSlot12.Mainhand);
    itemCoolDown(source, itemStack);
  }
};
async function evilTeleport(attackEntity, hitEntity) {
  let look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 6);
  let xraun = getRandomInRange(-5, 5);
  let yraun = getRandomInRange(0, 5);
  let zraun = getRandomInRange(-5, 5);
  let tpLoca;
  while (true) {
    tpLoca = { x: look.x + xraun, y: look.y + yraun, z: look.z + zraun };
    if (hitEntity.tryTeleport(tpLoca, {
      checkForBlocks: true
    })) {
      break;
    }
  }
  hitEntity.teleport(tpLoca);
}
async function evilEye(player) {
  let health = player.getComponent(EntityComponentTypes7.Health);
  let zan = health.currentValue / 2;
  if (health.currentValue != 1) {
    health.setCurrentValue(zan);
    player.addEffect(MinecraftEffectTypes.Hunger, 10 * TicksPerSecond3, {
      amplifier: 30 - zan * 5
    });
    player.addEffect(MinecraftEffectTypes.Speed, 30 * TicksPerSecond3, {
      amplifier: Math.ceil(zan / 2)
    });
    player.addEffect(MinecraftEffectTypes.Strength, 30 * TicksPerSecond3, {
      amplifier: Math.ceil(zan / 2)
    });
    player.addEffect(MinecraftEffectTypes.Resistance, 30 * TicksPerSecond3, {
      amplifier: Math.ceil(zan / 2)
    });
  } else {
    player.dimension.spawnParticle("minecraft:death_explosion_emitter", player.location);
  }
}

// scripts/items/weapons/spear/ThrowableSpear.ts
import { system as system4, EquipmentSlot as EquipmentSlot13, ItemComponentTypes as ItemComponentTypes9, EntityComponentTypes as EntityComponentTypes8 } from "@minecraft/server";
var SpearObjects = Object.freeze([
  {
    itemName: "kurokumaft:wooden_spear",
    throwSpear: "kurokumaft:thrown_wooden_spear",
    damage: 1
  },
  {
    itemName: "kurokumaft:stone_spear",
    throwSpear: "kurokumaft:thrown_stone_spear",
    damage: 2
  },
  {
    itemName: "kurokumaft:bamboo_spear",
    throwSpear: "kurokumaft:thrown_bamboo_spear",
    damage: 1
  },
  {
    itemName: "kurokumaft:iron_spear",
    throwSpear: "kurokumaft:thrown_iron_spear",
    damage: 1
  },
  {
    itemName: "kurokumaft:cherry_spear",
    throwSpear: "kurokumaft:thrown_cherry_spear",
    damage: 2
  },
  {
    itemName: "kurokumaft:steel_spear",
    throwSpear: "kurokumaft:thrown_steel_spear",
    damage: 6
  },
  {
    itemName: "kurokumaft:blaze_spear",
    throwSpear: "kurokumaft:thrown_blaze_spear",
    damage: 6
  },
  {
    itemName: "kurokumaft:mithril_spear",
    throwSpear: "kurokumaft:thrown_mithril_spear",
    damage: 5
  },
  {
    itemName: "kurokumaft:diamond_spear",
    throwSpear: "kurokumaft:thrown_diamond_spear",
    damage: 5
  },
  {
    itemName: "kurokumaft:netherite_spear",
    throwSpear: "kurokumaft:thrown_netherite_spear",
    damage: 5
  }
]);
var ThrowableSpear = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
    let spear = SpearObjects.find((obj) => obj.itemName == itemStack.typeId);
    sweepHit(attackEntity, hitEntity, spear.damage);
  }
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    source.addTag("spearOwner");
  }
};
async function spawnSpear(throwSpear) {
  let spear = SpearObjects.find((obj) => obj.throwSpear == throwSpear.typeId);
  if (!spear) {
    return;
  }
  throwSpear.setDynamicProperty("throwSpear", true);
  throwSpear.addTag("throwSpear");
}
async function stopSpear(player) {
  player.removeTag("spearOwner");
}
async function releaseSpear(player, spear) {
  let spearItem = SpearObjects.find((obj) => obj.itemName == spear.typeId);
  if (!spearItem) {
    return;
  }
  let throwSpear = player.dimension.getEntities({
    tags: [
      "throwSpear"
    ],
    families: [
      "spear"
    ],
    location: player.location,
    closest: 1
  });
  if (throwSpear.length > 0) {
    throwItemDurabilityDamage(throwSpear[0], spear, 0, void 0);
    let enchant = spear.getComponent(ItemComponentTypes9.Enchantable);
    if (enchant.hasEnchantment(MinecraftEnchantmentTypes.Loyalty)) {
      let loyalty = enchant.getEnchantment(MinecraftEnchantmentTypes.Loyalty);
      throwSpear[0].setDynamicProperty("Loyalty", true);
      throwSpear[0].setDynamicProperty("LoyaltyLevel", loyalty.level);
    } else {
      throwSpear[0].setDynamicProperty("Loyalty", false);
    }
  }
}
async function removeSpear(throwSpear) {
  let item = SpearObjects.find((obj) => obj.throwSpear == throwSpear.typeId);
  if (!item) {
    return;
  }
  if (!throwSpear.getDynamicProperty("throwSpear")) {
    return;
  }
  let invent = throwSpear.getComponent(EntityComponentTypes8.Inventory);
  let container = invent.container;
  let spear = container.getItem(0);
  let player = throwSpear.dimension.getEntities({
    families: [
      "player"
    ],
    location: throwSpear.location,
    closest: 1
  });
  let emptySlot = true;
  if (player) {
    let equ = player[0].getComponent(EntityComponentTypes8.Equippable);
    let main = equ.getEquipment(EquipmentSlot13.Mainhand);
    if (main == void 0) {
      system4.runTimeout(() => {
        equ.setEquipment(EquipmentSlot13.Mainhand, spear);
      }, 2);
      emptySlot = false;
    } else {
      let invent2 = player[0].getComponent(EntityComponentTypes8.Inventory);
      let con = invent2.container;
      if (con.emptySlotsCount > 0) {
        system4.runTimeout(() => {
          con.addItem(spear);
        }, 2);
        emptySlot = false;
      }
    }
  }
  if (emptySlot) {
    let dim = throwSpear.dimension;
    let loca = throwSpear.location;
    system4.runTimeout(() => {
      dim.spawnItem(spear, loca);
    }, 2);
  }
}
async function hitSpear(throwEntity, throwSpear) {
  let item = SpearObjects.find((obj) => obj.throwSpear == throwSpear.typeId);
  if (!item) {
    return;
  }
  if (throwSpear.getDynamicProperty("Loyalty")) {
    let level = throwSpear.getDynamicProperty("LoyaltyLevel");
    system4.runTimeout(() => {
      let intervalNum = system4.runInterval(() => {
        if (throwSpear != void 0 && throwSpear.isValid()) {
          let targetLoc = getDirectionVector(throwSpear.location, { x: throwEntity.location.x, y: throwEntity.location.y + 1, z: throwEntity.location.z });
          let tpLoc = {
            x: throwSpear.location.x + targetLoc.x,
            y: throwSpear.location.y + targetLoc.y,
            z: throwSpear.location.z + targetLoc.z
          };
          throwSpear.teleport(tpLoc, {
            checkForBlocks: false,
            keepVelocity: true
          });
        } else {
          system4.clearRun(intervalNum);
        }
      }, level == 1 ? 3 : level == 2 ? 2 : 1);
    }, 5);
  }
}

// scripts/items/weapons/spear/BlazeSpear.ts
import { EntityDamageCause as EntityDamageCause6 } from "@minecraft/server";
var BlazeSpear = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
    blazeHit(attackEntity, hitEntity, itemStack);
  }
};
async function blazeHit(attackEntity, hitEntity, itemStack) {
  attackEntity.addTag("blazeHit");
  let dim = attackEntity.dimension;
  let look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
  let targetEn = dim.getEntities({
    excludeTags: [
      "blazeHit"
    ],
    excludeFamilies: [
      "inanimate"
    ],
    excludeTypes: [
      "item"
    ],
    location: hitEntity.location,
    maxDistance: 1.75
  });
  targetEn.forEach((en) => {
    dim.spawnParticle("kurokumaft:mobflame_firing", look);
    en.applyDamage(6, {
      cause: EntityDamageCause6.fire
    });
  });
  attackEntity.removeTag("blazeHit");
}

// scripts/items/weapons/spear/CherrySpear.ts
var CherrySpear = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    cherrySlash2(attackEntity, hitEntity);
  }
};
async function cherrySlash2(attackEntity, hitEntity) {
  let dim = attackEntity.dimension;
  dim.spawnParticle("kurokumaft:cherry_slash", { x: hitEntity.location.x, y: hitEntity.location.y + 0.5, z: hitEntity.location.z });
}

// scripts/items/weapons/spear/MithrilSpear.ts
import { EntityDamageCause as EntityDamageCause7 } from "@minecraft/server";
var MithrilSpear = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
    mithrilHit(attackEntity, hitEntity, itemStack);
  }
};
async function mithrilHit(attackEntity, hitEntity, itemStack) {
  attackEntity.addTag("mithrilHit");
  let dim = attackEntity.dimension;
  let look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
  dim.spawnParticle("kurokumaft:sweep_particle", { x: look.x, y: look.y + 0.5, z: look.z });
  dim.spawnParticle("kurokumaft:sweep_particle", { x: look.x, y: look.y + 1, z: look.z });
  let targetEn = dim.getEntities({
    excludeTags: [
      "mithrilHit"
    ],
    excludeFamilies: [
      "inanimate"
    ],
    excludeTypes: [
      "item"
    ],
    location: hitEntity.location,
    maxDistance: 1.75
  });
  targetEn.forEach((en) => {
    en.applyDamage(5, {
      cause: EntityDamageCause7.ramAttack
    });
    en.applyDamage(5, {
      cause: EntityDamageCause7.ramAttack
    });
  });
  attackEntity.removeTag("mithrilHit");
}

// scripts/items/weapons/sickle/Sickle.ts
import { EquipmentSlot as EquipmentSlot14 } from "@minecraft/server";

// scripts/common/WeaponsSlashAttack.ts
import { EntityDamageCause as EntityDamageCause8 } from "@minecraft/server";
async function slashHit(attackEntity, hitEntity, damage) {
  let dim = attackEntity.dimension;
  let look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
  dim.spawnParticle("kurokumaft:slash_particle", look);
  hitEntity.applyDamage(damage, {
    cause: EntityDamageCause8.entityAttack
  });
}

// scripts/items/weapons/sickle/Sickle.ts
var SickleObjects = Object.freeze([
  {
    itemName: "kurokumaft:wood_sickle",
    changeItem: "kurokumaft:wood_scythe",
    throwEntity: "kurokumaft:spirit_sickle<kurokumaft:wooden_spirit_sickle>",
    damage: 1
  },
  {
    itemName: "kurokumaft:stone_sickle",
    changeItem: "kurokumaft:stone_scythe",
    throwEntity: "kurokumaft:spirit_sickle<kurokumaft:stone_spirit_sickle>",
    damage: 2
  },
  {
    itemName: "kurokumaft:iron_sickle",
    changeItem: "kurokumaft:iron_scythe",
    throwEntity: "kurokumaft:spirit_sickle<kurokumaft:iron_spirit_sickle>",
    damage: 3
  }
]);
var Sickle = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
    let sickle = SickleObjects.find((obj) => obj.itemName == itemStack.typeId);
    slashHit(attackEntity, hitEntity, sickle.damage);
  }
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    let scytheItem = SickleObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (source.isSneaking) {
      itemTans(source, itemStack, scytheItem.changeItem, EquipmentSlot14.Mainhand);
    } else {
      spiritSickle(source, scytheItem);
      itemDurabilityDamage(source, itemStack, EquipmentSlot14.Mainhand);
    }
  }
};
async function spiritSickle(player, scytheItem) {
  shooting(player, scytheItem.throwEntity, 0, 3, void 0);
  player.runCommandAsync('/titleraw @s actionbar {"rawtext": [{"translate": "mess.kurokumaft:spirit_sickle.shot"}]}');
}

// scripts/items/weapons/scythe/Scythe.ts
import { EquipmentSlot as EquipmentSlot15 } from "@minecraft/server";
var ScytheObjects = Object.freeze([
  {
    itemName: "kurokumaft:wood_scythe",
    changeItem: "kurokumaft:wood_sickle",
    throwEntity: "kurokumaft:roar_scythe<kurokumaft:wood_scythe_roar>",
    damage: 1
  },
  {
    itemName: "kurokumaft:stone_sickle",
    changeItem: "kurokumaft:stone_scythe",
    throwEntity: "kurokumaft:roar_scythe<kurokumaft:stone_scythe_roar>",
    damage: 2
  },
  {
    itemName: "kurokumaft:iron_sickle",
    changeItem: "kurokumaft:iron_scythe",
    throwEntity: "kurokumaft:roar_scythe<kurokumaft:iron_scythe_roar>",
    damage: 3
  }
]);
var Scythe = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
    let sickle = ScytheObjects.find((obj) => obj.itemName == itemStack.typeId);
    sweepHit(attackEntity, hitEntity, sickle.damage);
  }
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    let scytheItem = ScytheObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (source.isSneaking) {
      itemTans(source, itemStack, scytheItem.changeItem, EquipmentSlot15.Mainhand);
    } else {
      roarScythe(source, scytheItem);
      itemDurabilityDamage(source, itemStack, EquipmentSlot15.Mainhand);
    }
  }
};
async function roarScythe(player, scytheItem) {
  shooting(player, scytheItem.throwEntity, 0, 1, void 0);
  player.runCommandAsync('/titleraw @s actionbar {"rawtext": [{"translate": "mess.kurokumaft:roar_scythe.shot"}]}');
}

// scripts/items/shovel/ShovelPavement.ts
import { BlockPermutation, EquipmentSlot as EquipmentSlot16 } from "@minecraft/server";

// scripts/common/WeaponsConstants.ts
var LogBlocks = Object.freeze([
  MinecraftBlockTypes.AcaciaLog,
  MinecraftBlockTypes.BirchLog,
  MinecraftBlockTypes.CherryLog,
  MinecraftBlockTypes.DarkOakLog,
  MinecraftBlockTypes.JungleLog,
  MinecraftBlockTypes.MangroveLog,
  MinecraftBlockTypes.OakLog
]);
var OtherLogBlocks = Object.freeze([
  MinecraftBlockTypes.BambooBlock,
  MinecraftBlockTypes.WarpedStem,
  MinecraftBlockTypes.CrimsonStem
]);
var StrippedLogBlocks = Object.freeze([
  MinecraftBlockTypes.StrippedAcaciaLog,
  MinecraftBlockTypes.StrippedBirchLog,
  MinecraftBlockTypes.StrippedCherryLog,
  MinecraftBlockTypes.StrippedDarkOakLog,
  MinecraftBlockTypes.StrippedJungleLog,
  MinecraftBlockTypes.StrippedMangroveLog,
  MinecraftBlockTypes.StrippedOakLog,
  MinecraftBlockTypes.StrippedSpruceLog
]);
var OtherStrippedLogBlocks = Object.freeze([
  MinecraftBlockTypes.StrippedBambooBlock,
  MinecraftBlockTypes.StrippedWarpedStem,
  MinecraftBlockTypes.StrippedCrimsonStem
]);
var WoodBlocks = Object.freeze([
  MinecraftBlockTypes.AcaciaWood,
  MinecraftBlockTypes.BirchWood,
  MinecraftBlockTypes.CherryWood,
  MinecraftBlockTypes.DarkOakWood,
  MinecraftBlockTypes.JungleWood,
  MinecraftBlockTypes.MangroveWood,
  MinecraftBlockTypes.OakWood,
  MinecraftBlockTypes.SpruceWood
]);
var OtherWoodBlocks = Object.freeze([
  MinecraftBlockTypes.WarpedHyphae,
  MinecraftBlockTypes.CrimsonHyphae
]);
var StrippedWoodBlocks = Object.freeze([
  MinecraftBlockTypes.SpruceWood,
  MinecraftBlockTypes.StrippedAcaciaWood,
  MinecraftBlockTypes.StrippedBirchWood,
  MinecraftBlockTypes.StrippedCherryWood,
  MinecraftBlockTypes.StrippedDarkOakWood,
  MinecraftBlockTypes.StrippedJungleWood,
  MinecraftBlockTypes.StrippedMangroveWood,
  MinecraftBlockTypes.StrippedOakWood,
  MinecraftBlockTypes.StrippedSpruceWood
]);
var OtherStrippedWoodBlocks = Object.freeze([
  MinecraftBlockTypes.StrippedWarpedHyphae,
  MinecraftBlockTypes.StrippedCrimsonHyphae
]);
var PavementBlocks = Object.freeze([
  MinecraftBlockTypes.Dirt,
  MinecraftBlockTypes.GrassBlock,
  MinecraftBlockTypes.Farmland,
  MinecraftBlockTypes.Podzol,
  MinecraftBlockTypes.DirtWithRoots,
  MinecraftBlockTypes.CoarseDirt
]);
var FarmingBlocks = Object.freeze([
  MinecraftBlockTypes.Dirt,
  MinecraftBlockTypes.GrassBlock,
  MinecraftBlockTypes.GrassPath,
  MinecraftBlockTypes.Podzol,
  MinecraftBlockTypes.DirtWithRoots,
  MinecraftBlockTypes.CoarseDirt
]);
var CraftBlocks = Object.freeze([
  MinecraftBlockTypes.CraftingTable,
  MinecraftBlockTypes.Anvil,
  MinecraftBlockTypes.SmithingTable,
  MinecraftBlockTypes.CartographyTable,
  MinecraftBlockTypes.Loom,
  MinecraftBlockTypes.Barrel,
  MinecraftBlockTypes.Smoker,
  MinecraftBlockTypes.BlastFurnace,
  MinecraftBlockTypes.Furnace,
  "kurokumaft:kitchen_table",
  "kurokumaft:millstone",
  "kurokumaft:tear_enchant"
]);
var PlantsBlocks = Object.freeze([
  MinecraftBlockTypes.Wheat,
  MinecraftBlockTypes.OakSapling,
  MinecraftBlockTypes.BirchSapling,
  MinecraftBlockTypes.SpruceSapling,
  MinecraftBlockTypes.AcaciaSapling,
  MinecraftBlockTypes.BambooSapling,
  MinecraftBlockTypes.CherrySapling,
  MinecraftBlockTypes.JungleSapling,
  MinecraftBlockTypes.RedMushroom,
  MinecraftBlockTypes.BrownMushroom
]);

// scripts/items/shovel/ShovelPavement.ts
var ShovelPavement = class {
  onUseOn(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    let block = event.block;
    pavement(block);
    itemDurabilityDamage(source, itemStack, EquipmentSlot16.Mainhand);
  }
};
async function pavement(block) {
  if (PavementBlocks.find((type) => type == block.typeId) != void 0) {
    block.setPermutation(BlockPermutation.resolve(MinecraftBlockTypes.GrassPath));
  }
}

// scripts/items/weapons/gun/Gatling.ts
import { system as system5, EquipmentSlot as EquipmentSlot17, EntityComponentTypes as EntityComponentTypes9 } from "@minecraft/server";
var Gatling = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
  }
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    shotGatling(source, itemStack);
  }
};
async function shotGatling(player, item) {
  player.setDynamicProperty("gatlingShot", true);
  player.setProperty("kurokumaft:gun_shot", true);
  let count = 0;
  let shot = 1;
  let intervalNum = system5.runInterval(() => {
    let reEqu = player.getComponent(EntityComponentTypes9.Equippable);
    let reItem = reEqu.getEquipment(EquipmentSlot17.Offhand);
    if (reItem == void 0 || reItem.typeId != "kurokumaft:twenty_two_lr") {
      system5.clearRun(intervalNum);
      return;
    }
    shooting(player, "kurokumaft:twenty_two_lr_entity<kurokumaft:shot" + shot + ">", 0.2, 5, void 0);
    shot++;
    if (shot > 5) {
      shot = 1;
    }
    if (count % 4 === 0) {
      let look = getLookPoints(player.getRotation(), player.location, 1.5);
      player.dimension.spawnParticle("minecraft:explosion_manual", look);
      subtractionItem(player, reItem, EquipmentSlot17.Offhand, 1);
      itemDurabilityDamage(player, item, EquipmentSlot17.Mainhand);
    }
    count = count + 1;
  }, 1);
  player.setDynamicProperty("gatlingShotEventNum", intervalNum);
}
async function stopGatling(player) {
  let eventNum = player.getDynamicProperty("gatlingShotEventNum");
  player.setProperty("kurokumaft:gun_shot", false);
  player.setDynamicProperty("gatlingShot", void 0);
  player.setDynamicProperty("gatlingShotEventNum", void 0);
  system5.clearRun(eventNum);
}

// scripts/items/weapons/knuckle/ChargeKnuckle.ts
import { EquipmentSlot as EquipmentSlot18, EntityDamageCause as EntityDamageCause9 } from "@minecraft/server";
var KnuckleObjects = Object.freeze([
  {
    itemName: "kurokumaft:leather_knuckle",
    throwSpear: "kurokumaft:knuckle_shot<kurokumaft:leather>",
    damage: 1
  },
  {
    itemName: "kurokumaft:stone_knuckle",
    throwSpear: "kurokumaft:knuckle_shot<kurokumaft:stone>",
    damage: 2
  },
  {
    itemName: "kurokumaft:iron_knuckle",
    throwSpear: "kurokumaft:knuckle_shot<kurokumaft:iron>",
    damage: 3
  },
  {
    itemName: "kurokumaft:golden_knuckle",
    throwSpear: "kurokumaft:knuckle_shot<kurokumaft:golden>",
    damage: 1
  },
  {
    itemName: "kurokumaft:diamond_knuckle",
    throwSpear: "kurokumaft:knuckle_shot<kurokumaft:diamond>",
    damage: 4
  },
  {
    itemName: "kurokumaft:netherite_knuckle",
    throwSpear: "kurokumaft:knuckle_shot<kurokumaft:netherite>",
    damage: 5
  }
]);
var ChargeKnuckle = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
    let knuckle = KnuckleObjects.find((obj) => obj.itemName == itemStack.typeId);
    knuckleHit(attackEntity, hitEntity, knuckle);
    itemDurabilityDamage(attackEntity, itemStack, EquipmentSlot18.Mainhand);
  }
  onCompleteUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    let knuckle = KnuckleObjects.find((obj) => obj.itemName == itemStack.typeId);
    charge_knuckle(source, knuckle);
    itemDurabilityDamage(source, itemStack, EquipmentSlot18.Mainhand);
  }
};
async function knuckleHit(attackEntity, hitEntity, knuckle) {
  let look = getLookPoints(
    attackEntity.getRotation(),
    attackEntity.location,
    4.5
  );
  attackEntity.dimension.spawnParticle("kurokumaft:knuckle_shock", look);
  hitEntity.applyDamage(knuckle.damage, {
    cause: EntityDamageCause9.entityAttack
  });
  let rota = getLookRotaionPoints(attackEntity.getRotation(), knuckle.damage, 0);
  hitEntity.applyKnockback(rota.x, rota.z, knuckle.damage, 0);
}
async function charge_knuckle(player, knuckle) {
  shooting(player, knuckle.throwSpear, 0, 3, void 0);
}

// scripts/items/tool/MineDurability.ts
import { EquipmentSlot as EquipmentSlot19 } from "@minecraft/server";
var MineDurability = class {
  onMineBlock(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    itemDurabilityDamage(source, itemStack, EquipmentSlot19.Mainhand);
  }
};

// scripts/items/axe/FireBrand.ts
import { EquipmentSlot as EquipmentSlot20, EntityDamageCause as EntityDamageCause10 } from "@minecraft/server";
var FireBrand = class {
  onHitEntity(event) {
    let attackingEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
    mobflameFiring(hitEntity);
    itemDurabilityDamage(attackingEntity, itemStack, EquipmentSlot20.Mainhand);
  }
};
async function mobflameFiring(hitEntity) {
  hitEntity.applyDamage(15, {
    cause: EntityDamageCause10.fire
  });
  hitEntity.dimension.spawnParticle("kurokumaft:mobflame_firing", hitEntity.location);
}
async function fireCharcoalBlock(attackingEntity, itemStack, block) {
  if (LogBlocks.find((type) => type == block.typeId) != void 0 || StrippedLogBlocks.find((type) => type == block.typeId) != void 0 || WoodBlocks.find((type) => type == block.typeId) != void 0 || StrippedWoodBlocks.find((type) => type == block.typeId) != void 0) {
    block.dimension.setBlockType(block.location, "kurokumaft:charcoal_block");
    block.dimension.spawnParticle("kurokumaft:mobflame_firing", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
    itemDurabilityDamage(attackingEntity, itemStack, EquipmentSlot20.Mainhand);
  }
}

// scripts/items/axe/AxeStripped.ts
import { BlockPermutation as BlockPermutation2, EquipmentSlot as EquipmentSlot21 } from "@minecraft/server";
var AxeStripped = class {
  onUseOn(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    let block = event.block;
    stripped(block);
    itemDurabilityDamage(source, itemStack, EquipmentSlot21.Mainhand);
  }
};
async function stripped(block) {
  if (LogBlocks.find((type) => type == block.typeId) != void 0 || WoodBlocks.find((type) => type == block.typeId) != void 0 || OtherLogBlocks.find((type) => type == block.typeId) != void 0 || OtherWoodBlocks.find((type) => type == block.typeId) != void 0) {
    let log = StrippedLogBlocks.find((type) => {
      let str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
      return type == str;
    });
    if (log) {
      block.setPermutation(BlockPermutation2.resolve(log));
      return;
    }
    let otlog = OtherStrippedLogBlocks.find((type) => {
      let str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
      return type == str;
    });
    if (otlog) {
      block.setPermutation(BlockPermutation2.resolve(otlog));
      return;
    }
    let wood = StrippedWoodBlocks.find((type) => {
      let str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
      return type == str;
    });
    if (wood) {
      block.setPermutation(BlockPermutation2.resolve(wood));
      return;
    }
    let otwood = OtherStrippedWoodBlocks.find((type) => {
      let str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
      return type == str;
    });
    if (otwood) {
      block.setPermutation(BlockPermutation2.resolve(otwood));
      return;
    }
  }
}

// scripts/items/weapons/gun/FlametHrower.ts
import { system as system6, EquipmentSlot as EquipmentSlot22, EntityDamageCause as EntityDamageCause11 } from "@minecraft/server";
var FlametHrower = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
  }
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    shotFlametHrower(source, itemStack);
  }
};
async function shotFlametHrower(player, item) {
  player.setDynamicProperty("flametHrowerShot", true);
  player.addTag("flametHrowerSelf");
  let dimension = player.dimension;
  let count = 0;
  let intervalNum = system6.runInterval(() => {
    for (let i = 1; i <= 5; i++) {
      let loock = getLookPoints(player.getRotation(), player.location, i);
      player.dimension.spawnParticle("kurokumaft:flamethrower_fire", { x: loock.x, y: loock.y - 0.5, z: loock.z });
      let target = dimension.getEntities({
        excludeTags: [
          "flametHrowerSelf"
        ],
        excludeTypes: [
          "item"
        ],
        location: loock
      });
      target.forEach((en) => {
        en.applyDamage(2, {
          cause: EntityDamageCause11.fire
        });
      });
      if (count % 4 === 0) {
        itemDurabilityDamage(player, item, EquipmentSlot22.Mainhand);
      }
    }
    count = count + 1;
  }, 4);
  player.setDynamicProperty("flametHrowerEventNum", intervalNum);
}
async function stopFlametHrower(player) {
  let eventNum = player.getDynamicProperty("flametHrowerEventNum");
  player.setDynamicProperty("flametHrowerShot", void 0);
  player.setDynamicProperty("flametHrowerEventNum", void 0);
  player.removeTag("flametHrowerSelf");
  system6.clearRun(eventNum);
}

// scripts/items/weapons/gun/MachineGun.ts
import { system as system7, EquipmentSlot as EquipmentSlot23, EntityComponentTypes as EntityComponentTypes10 } from "@minecraft/server";
var MachineGun = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
  }
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    shotMachineGun(source, itemStack);
  }
};
async function shotMachineGun(player, item) {
  player.setDynamicProperty("machineGunShot", true);
  let count = 0;
  let intervalNum = system7.runInterval(() => {
    let reEqu = player.getComponent(EntityComponentTypes10.Equippable);
    let reItem = reEqu.getEquipment(EquipmentSlot23.Offhand);
    if (reItem == void 0 || reItem.typeId != "kurokumaft:thirty_eight_special") {
      system7.clearRun(intervalNum);
      return;
    }
    shooting(player, "kurokumaft:thirty_eight_special_entity", 0.2, 5, void 0);
    if (count % 4 === 0) {
      let loock = getLookPoints(player.getRotation(), player.location, 1.5);
      player.dimension.spawnParticle("minecraft:explosion_manual", { x: loock.x, y: loock.y, z: loock.z });
      subtractionItem(player, reItem, EquipmentSlot23.Offhand, 1);
      itemDurabilityDamage(player, item, EquipmentSlot23.Mainhand);
    }
    count = count + 1;
  }, 1);
  player.setDynamicProperty("machineGunShotEventNum", intervalNum);
}
async function stopMachineGun(player) {
  let eventNum = player.getDynamicProperty("machineGunShotEventNum");
  player.setDynamicProperty("machineGunShot", void 0);
  player.setDynamicProperty("machineGunShotEventNum", void 0);
  system7.clearRun(eventNum);
}

// scripts/items/weapons/gun/SniperRifle.ts
import { system as system8, TicksPerSecond as TicksPerSecond5 } from "@minecraft/server";

// scripts/common/WeaponsSniperScope.ts
import { TicksPerSecond as TicksPerSecond4 } from "@minecraft/server";
async function lageScope(player) {
  player.addEffect(MinecraftEffectTypes.Slowness, 1e3 * TicksPerSecond4, {
    amplifier: 10,
    showParticles: false
  });
}
async function middleScope(player) {
  player.addEffect(MinecraftEffectTypes.Slowness, 1e3 * TicksPerSecond4, {
    amplifier: 6,
    showParticles: false
  });
}
async function clearScope(player) {
  player.removeEffect(MinecraftEffectTypes.Slowness);
}

// scripts/items/weapons/gun/SniperRifle.ts
var SniperRifle = class {
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    shotSniper(source, itemStack);
  }
};
async function shotSniper(player, item) {
  player.setDynamicProperty("SniperRifleShot", true);
  let intervalNum = system8.runInterval(() => {
    if (player.isSneaking) {
      lageScope(player);
    } else {
      clearScope(player);
    }
  }, 1);
  player.setDynamicProperty("SniperRifleShotIntervalNum", intervalNum);
}
async function stopSniper(player) {
  let num = player.getDynamicProperty("SniperRifleShotIntervalNum");
  system8.clearRun(num);
  player.setDynamicProperty("SniperRifleShot", void 0);
  player.setDynamicProperty("SniperRifleShotIntervalNum", void 0);
  system8.runTimeout(() => {
    clearScope(player);
  }, TicksPerSecond5 * 1);
}

// scripts/items/weapons/hammer/ThrowableHammer.ts
import { system as system9, EquipmentSlot as EquipmentSlot24, EntityComponentTypes as EntityComponentTypes11 } from "@minecraft/server";
var HammerObjects = Object.freeze([
  {
    itemName: "kurokumaft:wooden_hammer",
    throwHammer: "kurokumaft:thrown_wooden_hammer"
  },
  {
    itemName: "kurokumaft:stone_hammer",
    throwHammer: "kurokumaft:thrown_stone_hammer"
  },
  {
    itemName: "kurokumaft:iron_hammer",
    throwHammer: "kurokumaft:thrown_iron_hammer"
  },
  {
    itemName: "kurokumaft:golden_hammer",
    throwHammer: "kurokumaft:thrown_golden_hammer"
  },
  {
    itemName: "kurokumaft:diamond_hammer",
    throwHammer: "kurokumaft:thrown_diamond_hammer"
  },
  {
    itemName: "kurokumaft:netherite_hammer",
    throwHammer: "kurokumaft:thrown_netherite_hammer"
  },
  {
    itemName: "kurokumaft:warden_hammer",
    throwHammer: "kurokumaft:thrown_warden_hammer"
  }
]);
var ThrowableHammer = class {
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
  }
};
async function spawnHammer(throwHammer) {
  let hammer = HammerObjects.find((obj) => obj.throwHammer == throwHammer.typeId);
  if (!hammer) {
    return;
  }
  throwHammer.setDynamicProperty("throwHammer", true);
  throwHammer.addTag("throwHammer");
}
async function releaseHammer(player, hammer) {
  let hammerItem = HammerObjects.find((obj) => obj.itemName == hammer.typeId);
  if (!hammerItem) {
    return;
  }
  let throwHammer = player.dimension.getEntities({
    tags: [
      "throwHammer"
    ],
    families: [
      "hammer"
    ],
    location: player.location,
    closest: 1
  });
  if (throwHammer.length > 0) {
    throwItemDurabilityDamage(throwHammer[0], hammer, 0, void 0);
  }
}
async function stopHammer(throwHammer) {
  system9.runTimeout(() => {
    throwHammer.triggerEvent("variant1");
  }, 10);
}
async function removeHammer(throwHammer) {
  let item = HammerObjects.find((obj) => obj.throwHammer == throwHammer.typeId);
  if (!item) {
    return;
  }
  if (!throwHammer.getDynamicProperty("throwHammer")) {
    return;
  }
  let invent = throwHammer.getComponent(EntityComponentTypes11.Inventory);
  let container = invent.container;
  let hammer = container.getItem(0);
  let player = throwHammer.dimension.getEntities({
    families: [
      "player"
    ],
    location: throwHammer.location,
    closest: 1
  });
  let emptySlot = true;
  if (player) {
    let equ = player[0].getComponent(EntityComponentTypes11.Equippable);
    let main = equ.getEquipment(EquipmentSlot24.Mainhand);
    if (main == void 0) {
      system9.runTimeout(() => {
        equ.setEquipment(EquipmentSlot24.Mainhand, hammer);
      }, 2);
      emptySlot = false;
    } else {
      let invent2 = player[0].getComponent(EntityComponentTypes11.Inventory);
      let con = invent2.container;
      if (con.emptySlotsCount > 0) {
        system9.runTimeout(() => {
          con.addItem(hammer);
        }, 2);
        emptySlot = false;
      }
    }
  }
  if (emptySlot) {
    let dim = throwHammer.dimension;
    let loca = throwHammer.location;
    system9.runTimeout(() => {
      dim.spawnItem(hammer, loca);
    }, 2);
  }
}
function isThrowHammer(throwHammer) {
  let item = HammerObjects.find((obj) => obj.throwHammer == throwHammer.typeId);
  return item != void 0;
}

// scripts/items/weapons/hammer/HammerAttack.ts
import { EntityDamageCause as EntityDamageCause13 } from "@minecraft/server";
var HammerObjects2 = Object.freeze([
  {
    itemName: "kurokumaft:wooden_hammer",
    roarHammer: "kurokumaft:roar_hammer<kurokumaft:wooden_hammer_roar>",
    damage: 1
  },
  {
    itemName: "kurokumaft:stone_hammer",
    roarHammer: "kurokumaft:roar_hammer<kurokumaft:stone_hammer_roar>",
    damage: 2
  },
  {
    itemName: "kurokumaft:iron_hammer",
    roarHammer: "kurokumaft:roar_hammer<kurokumaft:iron_hammer_roar>",
    damage: 3
  },
  {
    itemName: "kurokumaft:golden_hammer",
    roarHammer: "kurokumaft:roar_hammer<kurokumaft:golden_hammer_roar>",
    damage: 3
  },
  {
    itemName: "kurokumaft:diamond_hammer",
    roarHammer: "kurokumaft:roar_hammer<kurokumaft:diamond_hammer_roar>",
    damage: 4
  },
  {
    itemName: "kurokumaft:netherite_hammer",
    roarHammer: "kurokumaft:roar_hammer<kurokumaft:netherite_hammer_roar>",
    damage: 5
  }
]);
var HammerAttack = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
    let hammer = HammerObjects2.find((obj) => obj.itemName == itemStack.typeId);
    hammerHit(attackEntity, hitEntity, hammer);
  }
};
async function hammerHit(attackEntity, hitEntity, hammer) {
  let loock = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
  attackEntity.dimension.spawnParticle("kurokumaft:shock_particle", loock);
  hitEntity.applyDamage(hammer.damage, {
    cause: EntityDamageCause13.entityAttack
  });
  hitEntity.dimension.spawnEntity(hammer.roarHammer, hitEntity.location);
}

// scripts/items/weapons/hammer/WardenHammer.ts
import { EntityDamageCause as EntityDamageCause14 } from "@minecraft/server";
var WardenHammer = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
    hammerHit2(attackEntity, hitEntity);
  }
};
async function hammerHit2(attackEntity, hitEntity) {
  let loock = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
  attackEntity.dimension.spawnParticle("kurokumaft:shock_particle", loock);
  hitEntity.applyDamage(5, {
    cause: EntityDamageCause14.entityAttack
  });
  shooting(attackEntity, "kurokumaft:sonic_bullet", 0, 5, void 0);
}
async function waveWardenHammer(attackEntity, hammer) {
  if (hammer.typeId != "kurokumaft:thrown_warden_hammer") {
    return;
  }
  hammer.dimension.spawnParticle("kurokumaft:warden_shock", hammer.location);
  let hitEntitys = hammer.dimension.getEntities({
    tags: [
      "throwHammer"
    ],
    location: hammer.location,
    closest: 5
  });
  hitEntitys.forEach((en) => {
    en.applyDamage(5, {
      cause: EntityDamageCause14.magic
    });
  });
}

// scripts/items/weapons/fort/ShellShot.ts
import { EquipmentSlot as EquipmentSlot25, EntityComponentTypes as EntityComponentTypes12 } from "@minecraft/server";
var ShellShot = class {
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    shotShell(source, itemStack);
  }
};
async function shotShell(player, hammer) {
  let raid = player.getComponent(EntityComponentTypes12.Riding);
  if (raid && raid.entityRidingOn.typeId == "kurokumaft:tank") {
    shooting(player, "kurokumaft:shell_entity", 0, 3, void 0);
    subtractionItem(player, hammer, EquipmentSlot25.Mainhand, 1);
    itemCoolDown(player, hammer);
  }
}

// scripts/items/weapons/fort/BaristaShot.ts
import { EquipmentSlot as EquipmentSlot26, EntityComponentTypes as EntityComponentTypes13 } from "@minecraft/server";
var BaristaShot = class {
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    baristaArrow(source, itemStack);
  }
};
async function baristaArrow(player, hammer) {
  let raid = player.getComponent(EntityComponentTypes13.Riding);
  if (raid && raid.entityRidingOn.typeId == "kurokumaft:barista") {
    let center = getLookRotaionPoints(player.getRotation(), 1.5, 0);
    shooting(player, "kurokumaft:barista_arrow<kurokumaft:center_arrow>", 0, 3, void 0);
    let left = getLookRotaionPoints(player.getRotation(), 1.5, 1.5);
    shooting(player, "kurokumaft:barista_arrow<kurokumaft:left_arrow>", 0, 3, void 0);
    let right = getLookRotaionPoints(player.getRotation(), 1.5, -1.5);
    shooting(player, "kurokumaft:barista_arrow<kurokumaft:right_arrow>", 0, 3, void 0);
    subtractionItem(player, hammer, EquipmentSlot26.Mainhand, 1);
    itemCoolDown(player, hammer);
  }
}

// scripts/items/weapons/boomerang/ThrowableBoomerang.ts
import { system as system10, EquipmentSlot as EquipmentSlot27, EntityComponentTypes as EntityComponentTypes14, TicksPerSecond as TicksPerSecond6 } from "@minecraft/server";
var BoomerangObjects = Object.freeze([
  {
    itemName: "kurokumaft:wooden_boomerang",
    throwBoomerang: "kurokumaft:thrown_wooden_boomerang",
    damage: 1
  },
  {
    itemName: "kurokumaft:stone_boomerang",
    throwBoomerang: "kurokumaft:thrown_stone_boomerang",
    damage: 2
  },
  {
    itemName: "kurokumaft:iron_boomerang",
    throwBoomerang: "kurokumaft:thrown_iron_boomerang",
    damage: 1
  },
  {
    itemName: "kurokumaft:diamond_boomerang",
    throwBoomerang: "kurokumaft:thrown_diamond_boomerang",
    damage: 5
  }
]);
var ThrowableBoomerang = class {
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    source.addTag("boomerangOwner");
  }
};
async function spawnBoomerang(throwBoomerang) {
  let boomerang = BoomerangObjects.find((obj) => obj.throwBoomerang == throwBoomerang.typeId);
  if (!boomerang) {
    return;
  }
  throwBoomerang.setDynamicProperty("throwBoomerang", true);
  throwBoomerang.addTag("throwBoomerang");
}
async function stopBoomerang(player) {
  player.removeTag("boomerangOwner");
}
async function releaseBoomerang(player, boomerang) {
  let boomerangItem = BoomerangObjects.find((obj) => obj.itemName == boomerang.typeId);
  if (!boomerangItem) {
    return;
  }
  let throwBoomerang = player.dimension.getEntities({
    tags: [
      "throwBoomerang"
    ],
    families: [
      "boomerang"
    ],
    location: player.location,
    closest: 1
  });
  if (throwBoomerang.length > 0) {
    throwItemDurabilityDamage(throwBoomerang[0], boomerang, 0, void 0);
    system10.runTimeout(() => {
      hitBoomerang(player, throwBoomerang[0]);
    }, TicksPerSecond6 * 2);
  }
}
async function removeBoomerang(player, throwBoomerang) {
  let item = BoomerangObjects.find((obj) => obj.throwBoomerang == throwBoomerang.typeId);
  if (!item) {
    return;
  }
  if (!throwBoomerang.getDynamicProperty("throwBoomerang")) {
    return;
  }
  let invent = throwBoomerang.getComponent(EntityComponentTypes14.Inventory);
  let container = invent.container;
  let boomerang = container.getItem(0);
  let emptySlot = true;
  let equ = player.getComponent(EntityComponentTypes14.Equippable);
  let main = equ.getEquipment(EquipmentSlot27.Mainhand);
  if (main == void 0) {
    system10.runTimeout(() => {
      equ.setEquipment(EquipmentSlot27.Mainhand, boomerang);
    }, 2);
    emptySlot = false;
  } else {
    let invent2 = player.getComponent(EntityComponentTypes14.Inventory);
    let con = invent2.container;
    if (con.emptySlotsCount > 0) {
      system10.runTimeout(() => {
        con.addItem(boomerang);
      }, 2);
      emptySlot = false;
    }
  }
  if (emptySlot) {
    let dim = throwBoomerang.dimension;
    let loca = throwBoomerang.location;
    system10.runTimeout(() => {
      dim.spawnItem(boomerang, loca);
    }, 2);
  }
}
async function hitBoomerang(throwEntity, throwBoomerang) {
  let item = BoomerangObjects.find((obj) => obj.throwBoomerang == throwBoomerang.typeId);
  if (!item) {
    return;
  }
  let intervalNum = system10.runInterval(() => {
    if (throwBoomerang != void 0 && throwBoomerang.isValid()) {
      let player = throwBoomerang.dimension.getEntities({
        families: [
          "player"
        ],
        name: throwEntity.nameTag,
        location: throwBoomerang.location,
        maxDistance: 2,
        closest: 1
      });
      if (player.length > 0) {
        stopBoomerang(player[0]);
        removeBoomerang(player[0], throwBoomerang);
        throwBoomerang.remove();
      } else {
        let targetLoc = getDirectionVector(throwBoomerang.location, { x: throwEntity.location.x, y: throwEntity.location.y + 1, z: throwEntity.location.z });
        let tpLoc = {
          x: throwBoomerang.location.x + targetLoc.x,
          y: throwBoomerang.location.y + targetLoc.y,
          z: throwBoomerang.location.z + targetLoc.z
        };
        throwBoomerang.teleport(tpLoc, {
          checkForBlocks: false,
          keepVelocity: true
        });
      }
    } else {
      system10.clearRun(intervalNum);
    }
  }, 1);
}

// scripts/block/ChocolateCakeBlock.ts
import { TicksPerSecond as TicksPerSecond7, BlockPermutation as BlockPermutation3 } from "@minecraft/server";
var ChocolateCakeBlock = class {
  onPlayerInteract(event) {
    let block = event.block;
    let player = event.player;
    let eat = block.permutation.getState("kurokumaft:eat");
    player.addEffect(MinecraftEffectTypes.Saturation, TicksPerSecond7 * 1, {
      amplifier: 2,
      showParticles: false
    });
    if (eat < 6) {
      block.setPermutation(block.permutation.withState("kurokumaft:eat", eat + 1));
    } else {
      block.setPermutation(BlockPermutation3.resolve(MinecraftBlockTypes.Air));
    }
  }
};

// scripts/block/mithril/BuddingMithril.ts
import { BlockPermutation as BlockPermutation4 } from "@minecraft/server";
var mithrilChoiceLists = ProbabilisticChoice([
  { item: 1, weight: 20 },
  { item: 2, weight: 15 },
  { item: 3, weight: 15 },
  { item: 4, weight: 15 },
  { item: 5, weight: 15 },
  { item: 6, weight: 20 }
]);
var BuddingMithril = class {
  onTick(event) {
    let block = event.block;
    let dimension = event.dimension;
    let budding_pos = mithrilChoiceLists.pick();
    let bloc = { x: block.location.x, y: block.location.y, z: block.location.z };
    let b;
    if (budding_pos == 1) {
      bloc = { x: block.location.x, y: block.location.y + 1, z: block.location.z };
      b = dimension.getBlock(bloc);
    } else if (budding_pos == 2) {
      bloc = { x: block.location.x, y: block.location.y - 1, z: block.location.z };
      b = dimension.getBlock(bloc);
    } else if (budding_pos == 3) {
      bloc = { x: block.location.x, y: block.location.y, z: block.location.z + 1 };
      b = dimension.getBlock(bloc);
    } else if (budding_pos == 4) {
      bloc = { x: block.location.x, y: block.location.y, z: block.location.z - 1 };
      b = dimension.getBlock(bloc);
    } else if (budding_pos == 5) {
      bloc = { x: block.location.x + 1, y: block.location.y, z: block.location.z };
      b = dimension.getBlock(bloc);
    } else if (budding_pos == 6) {
      bloc = { x: block.location.x - 1, y: block.location.y, z: block.location.z };
      b = dimension.getBlock(bloc);
    }
    if (b && b.isAir) {
      b.setPermutation(BlockPermutation4.resolve("kurokumaft:small_mithril_bud", {
        "kurokumaft:rotation": budding_pos,
        "kurokumaft:place_type": 1
      }));
    }
  }
};

// scripts/block/mithril/MithrilBlock.ts
import { BlockPermutation as BlockPermutation5 } from "@minecraft/server";
var mithrilChoiceLists2 = ProbabilisticChoice([
  { item: 0, weight: 70 },
  { item: 1, weight: 5 },
  { item: 2, weight: 5 },
  { item: 3, weight: 5 },
  { item: 4, weight: 5 },
  { item: 5, weight: 5 },
  { item: 6, weight: 5 }
]);
var MithrilBlock = class {
  onTick(event) {
    let block = event.block;
    let dimension = event.dimension;
    let budding_type = block.permutation.getState("kurokumaft:budding_type");
    if (budding_type == "none") {
      block.setPermutation(block.permutation.withState("kurokumaft:budding_type", "spawn"));
    } else if (budding_type == "spawn") {
      let budding_set = block.permutation.getState("kurokumaft:budding_set");
      if (budding_set) {
        let budding_pos = block.permutation.getState("kurokumaft:budding_pos");
        let bloc = { x: block.location.x, y: block.location.y, z: block.location.z };
        let b;
        if (budding_pos == 1) {
          bloc = { x: block.location.x, y: block.location.y + 1, z: block.location.z };
          b = dimension.getBlock(bloc);
        } else if (budding_pos == 2) {
          bloc = { x: block.location.x, y: block.location.y - 1, z: block.location.z };
          b = dimension.getBlock(bloc);
        } else if (budding_pos == 3) {
          bloc = { x: block.location.x, y: block.location.y, z: block.location.z + 1 };
          b = dimension.getBlock(bloc);
        } else if (budding_pos == 4) {
          bloc = { x: block.location.x, y: block.location.y, z: block.location.z - 1 };
          b = dimension.getBlock(bloc);
        } else if (budding_pos == 5) {
          bloc = { x: block.location.x + 1, y: block.location.y, z: block.location.z };
          b = dimension.getBlock(bloc);
        } else if (budding_pos == 6) {
          bloc = { x: block.location.x - 1, y: block.location.y, z: block.location.z };
          b = dimension.getBlock(bloc);
        }
        if (b && b.isAir) {
          b.setPermutation(BlockPermutation5.resolve("kurokumaft:small_mithril_bud", {
            "kurokumaft:rotation": budding_pos,
            "kurokumaft:place_type": 1
          }));
        }
      } else {
        let set_budding_pos = mithrilChoiceLists2.pick();
        block.setPermutation(block.permutation.withState("kurokumaft:budding_pos", set_budding_pos));
        block.setPermutation(block.permutation.withState("kurokumaft:budding_set", true));
      }
    }
  }
  onPlayerInteract(event) {
    let block = event.block;
    checkMithrilBlock(block);
  }
};
async function playerMithrilset(block) {
  if (block.typeId == "kurokumaft:mithril_block") {
    block.setPermutation(block.permutation.withState("kurokumaft:budding_type", "player"));
  }
}
async function checkMithrilBlock(block) {
  if (block != void 0 && block.matches("kurokumaft:mithril_block", { "kurokumaft:budding_type": "geode" })) {
    block.setPermutation(block.permutation.withState("kurokumaft:budding_type", "spawn"));
    block.setPermutation(block.permutation.withState("kurokumaft:budding_set", true));
  }
}

// scripts/block/mithril/MithrilBudGrowth.ts
import { BlockPermutation as BlockPermutation6 } from "@minecraft/server";
var MithrilBudGrowth = class {
  onTick(event) {
    let block = event.block;
    let place_type = block.permutation.getState("kurokumaft:place_type");
    if (place_type == 1) {
      let rotation = block.permutation.getState("kurokumaft:rotation");
      if (block.typeId == "kurokumaft:small_mithril_bud") {
        block.setPermutation(BlockPermutation6.resolve("kurokumaft:medium_mithril_bud", {
          "kurokumaft:rotation": rotation,
          "kurokumaft:place_type": 1
        }));
      } else if (block.typeId == "kurokumaft:medium_mithril_bud") {
        block.setPermutation(BlockPermutation6.resolve("kurokumaft:large_mithril_bud", {
          "kurokumaft:rotation": rotation,
          "kurokumaft:place_type": 1
        }));
      } else if (block.typeId == "kurokumaft:large_mithril_bud") {
        block.setPermutation(BlockPermutation6.resolve("kurokumaft:mithril_cluster", {
          "kurokumaft:rotation": rotation,
          "kurokumaft:place_type": 1
        }));
      }
    }
  }
};

// scripts/block/FortuneDestroy.ts
import { EntityComponentTypes as EntityComponentTypes15, EquipmentSlot as EquipmentSlot28, ItemComponentTypes as ItemComponentTypes10, ItemStack as ItemStack35 } from "@minecraft/server";
var CustomBlocks = Object.freeze([
  {
    block: "kurokumaft:chromium_ore",
    item: "kurokumaft:chromium_nugget"
  },
  {
    block: "kurokumaft:mithril_cluster",
    item: "kurokumaft:mithril_shard"
  },
  {
    block: "kurokumaft:orichalcum_ore",
    item: "kurokumaft:orichalcum"
  },
  {
    block: "kurokumaft:deepslate_orichalcum_ore",
    item: "kurokumaft:orichalcum"
  },
  {
    block: "kurokumaft:deepslate_chromium_ore",
    item: "kurokumaft:chromium_nugget"
  },
  {
    block: "kurokumaft:chromium_ore",
    item: "kurokumaft:chromium_nugget"
  }
]);
var FortuneDestroy = class {
  // プレイヤーがブロックを破壊した時のイベント
  onPlayerDestroy(event) {
    let player = event.player;
    let block = event.block;
    let blockPermutation = event.destroyedBlockPermutation;
    fortuneDestroy(player, block, blockPermutation);
  }
};
async function fortuneDestroy(player, block, blockPermutation) {
  let equ = player.getComponent(EntityComponentTypes15.Equippable);
  let itemStack = equ.getEquipment(EquipmentSlot28.Mainhand);
  if (itemStack) {
    let enc = itemStack.getComponent(ItemComponentTypes10.Enchantable);
    if (enc) {
      if (enc.hasEnchantment(MinecraftEnchantmentTypes.Fortune)) {
        let fortune = enc.getEnchantment(MinecraftEnchantmentTypes.Fortune);
        let customBlock = CustomBlocks.find((obj) => obj.block == blockPermutation.type.id);
        let count = getRandomInRange5(0, fortune.level);
        for (let i = 0; i < count; i++) {
          block.dimension.spawnItem(new ItemStack35(customBlock.item), block.location);
        }
      }
    }
  }
}
function getRandomInRange5(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// scripts/items/hoe/HoeFarming.ts
import { BlockPermutation as BlockPermutation8, EquipmentSlot as EquipmentSlot29 } from "@minecraft/server";
var HoeFarming = class {
  onUseOn(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    let block = event.block;
    farming(block);
    itemDurabilityDamage(source, itemStack, EquipmentSlot29.Mainhand);
  }
};
async function farming(block) {
  if (FarmingBlocks.find((type) => type == block.typeId) != void 0) {
    block.setPermutation(BlockPermutation8.resolve(MinecraftBlockTypes.Farmland));
  }
}

// scripts/block/plants/PlantsGrowth.ts
import { EntityComponentTypes as EntityComponentTypes16, EquipmentSlot as EquipmentSlot30 } from "@minecraft/server";
var PlantsGrowth = class {
  onTick(event) {
    let block = event.block;
    let growth = block.permutation.getState("kurokumaft:growth");
    if (growth < 7) {
      let growthUp = false;
      if (block.typeId == "kurokumaft:rice_plant") {
        for (let x = -1; x <= 1; x++) {
          for (let z = -1; z <= 1; z++) {
            let side = block.dimension.getBlock({ x: block.location.x + x, y: block.location.y, z: block.location.z + z });
            if (side.typeId == MinecraftBlockTypes.Water) {
              growthUp = true;
            }
          }
        }
      } else {
        for (let x = -4; x <= 4; x++) {
          for (let z = -4; z <= 4; z++) {
            let side = block.dimension.getBlock({ x: block.location.x + x, y: block.location.y - 1, z: block.location.z + z });
            if (side.typeId == MinecraftBlockTypes.Water) {
              growthUp = true;
            }
          }
        }
      }
      if (growthUp) {
        block.setPermutation(block.permutation.withState("kurokumaft:growth", growth + 1));
      }
    }
  }
  onPlayerInteract(event) {
    let player = event.player;
    let equ = player.getComponent(EntityComponentTypes16.Equippable);
    let itemStack = equ.getEquipment(EquipmentSlot30.Mainhand);
    if (itemStack != void 0 && itemStack.typeId.indexOf("meal") != -1) {
      let block = event.block;
      let growth = block.permutation.getState("kurokumaft:growth");
      if (growth < 7) {
        let growthUp = false;
        if (block.typeId == "kurokumaft:rice_plant") {
          for (let x = -1; x <= 1; x++) {
            for (let z = -1; z <= 1; z++) {
              let side = block.dimension.getBlock({ x: block.location.x + x, y: block.location.y, z: block.location.z + z });
              if (side.typeId == MinecraftBlockTypes.Water) {
                growthUp = true;
              }
            }
          }
        } else {
          for (let x = -4; x <= 4; x++) {
            for (let z = -4; z <= 4; z++) {
              let side = block.dimension.getBlock({ x: block.location.x + x, y: block.location.y - 1, z: block.location.z + z });
              if (side.typeId == MinecraftBlockTypes.Water) {
                growthUp = true;
              }
            }
          }
        }
        if (growthUp) {
          block.setPermutation(block.permutation.withState("kurokumaft:growth", growth + 1));
          event.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
          subtractionItem(player, itemStack, EquipmentSlot30.Mainhand, 1);
        }
      }
    }
  }
};

// scripts/items/meal/GrowthMeal.ts
import { EquipmentSlot as EquipmentSlot31, Direction as Direction2 } from "@minecraft/server";
var GrowthMeal = class {
  onUseOn(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    let block = event.block;
    growths(source, itemStack, block);
    woodGrowth(source, itemStack, block);
    grassPlant(event);
  }
};
async function growths(source, itemStack, block) {
  let growth = block.permutation.getState("growth");
  if (growth != void 0 && growth < 7) {
    block.setPermutation(block.permutation.withState("growth", growth + 1));
    block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
    subtractionItem(source, itemStack, EquipmentSlot31.Mainhand, 1);
  }
}
async function woodGrowth(source, itemStack, block) {
  let blockPer = block.permutation;
  let blockDim = block.dimension;
  let bx = block.location.x;
  let by = block.location.y;
  let bz = block.location.z;
  let setFireF = false;
  let age_bit = blockPer.getState("age_bit");
  if (age_bit != void 0) {
  }
}
var flowerChoiceLists = ProbabilisticChoice([
  { item: "", weight: 50 },
  { item: "minecraft:short_grass", weight: 15 },
  { item: "minecraft:fern", weight: 15 },
  { item: "minecraft:poppy", weight: 5 },
  { item: "minecraft:cornflower", weight: 5 },
  { item: "minecraft:azure_bluet", weight: 3 },
  { item: "minecraft:oxeye_daisy", weight: 3 },
  { item: "minecraft:red_tulip", weight: 2 },
  { item: "minecraft:dandelion", weight: 2 }
]);
async function grassPlant(event) {
  let player = event.source;
  let itemStack = event.itemStack;
  let block = event.block;
  let blockFace = event.blockFace;
  if (CraftBlocks.indexOf(block.typeId) != -1 || block.typeId != MinecraftBlockTypes.GrassBlock && block.typeId != MinecraftBlockTypes.Dirt) {
    return;
  }
  if (blockFace == Direction2.Up) {
    let blockDim = block.dimension;
    let bx = block.location.x;
    let by = block.location.y;
    let bz = block.location.z;
    blockDim.spawnParticle("minecraft:crop_growth_area_emitter", { "x": bx, "y": by + 1, "z": bz });
    for (let y = -2; y <= 2; y++) {
      for (let z = -2; z <= 2; z++) {
        let vec = { "x": bx + y, "y": by, "z": bz + z };
        let upvec = { "x": bx + y, "y": by + 1, "z": bz + z };
        let dimeBlock = blockDim.getBlock(vec);
        let updimeBlock = blockDim.getBlock(upvec);
        if (dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
          blockDim.setBlockType(dimeBlock.location, MinecraftBlockTypes.GrassBlock);
        }
        if (updimeBlock.isAir && dimeBlock.typeId == MinecraftBlockTypes.GrassBlock) {
          let randomBlock = flowerChoiceLists.pick();
          if (randomBlock != "") {
            blockDim.setBlockType(upvec, randomBlock);
          }
        }
      }
    }
    subtractionItem(player, itemStack, EquipmentSlot31.Mainhand, 1);
  }
}

// scripts/items/potion/PotionEffect.ts
import { TicksPerSecond as TicksPerSecond9 } from "@minecraft/server";
var PotionObjects = Object.freeze([
  {
    itemName: "kurokumaft:milk_chocolate",
    effects: []
  },
  {
    itemName: "kurokumaft:green_soybean",
    effects: [
      {
        effect: MinecraftEffectTypes.NightVision,
        duration: 60,
        amplifier: 1
      }
    ]
  },
  {
    itemName: "kurokumaft:medicinal_plant",
    effects: [
      {
        effect: MinecraftEffectTypes.Regeneration,
        duration: 1,
        amplifier: 2.5
      },
      {
        effect: MinecraftEffectTypes.Hunger,
        duration: 10,
        amplifier: 1
      }
    ]
  },
  {
    itemName: "kurokumaft:poisonous_plant",
    effects: [
      {
        effect: MinecraftEffectTypes.Poison,
        duration: 10,
        amplifier: 1
      },
      {
        effect: MinecraftEffectTypes.Hunger,
        duration: 10,
        amplifier: 1
      }
    ]
  },
  {
    itemName: "kurokumaft:hiheal_potion",
    effects: [
      {
        effect: MinecraftEffectTypes.InstantHealth,
        duration: 1,
        amplifier: 5
      },
      {
        effect: MinecraftEffectTypes.Regeneration,
        duration: 30,
        amplifier: 3
      }
    ]
  },
  {
    itemName: "kurokumaft:histurdiness_potion",
    effects: [
      {
        effect: MinecraftEffectTypes.Resistance,
        duration: 180,
        amplifier: 5
      },
      {
        effect: MinecraftEffectTypes.FireResistance,
        duration: 180,
        amplifier: 5
      }
    ]
  },
  {
    itemName: "kurokumaft:hidamageboost_potion",
    effects: [
      {
        effect: MinecraftEffectTypes.Strength,
        duration: 180,
        amplifier: 5
      }
    ]
  },
  {
    itemName: "kurokumaft:hipoison_potion",
    effects: [
      {
        effect: MinecraftEffectTypes.Poison,
        duration: 60,
        amplifier: 5
      }
    ]
  },
  {
    itemName: "kurokumaft:himovespeed_potion",
    effects: [
      {
        effect: MinecraftEffectTypes.Speed,
        duration: 90,
        amplifier: 5
      },
      {
        effect: MinecraftEffectTypes.JumpBoost,
        duration: 90,
        amplifier: 5
      }
    ]
  }
]);
var PotionEffect = class {
  onConsume(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    let potionItem = PotionObjects.find((obj) => obj.itemName == itemStack.typeId);
    addEffectPotion(source, potionItem);
  }
};
async function addEffectPotion(player, potionItem) {
  let effects = potionItem.effects;
  if (effects.length == 0) {
    player.runCommand("/effect @s clear");
  } else {
    effects.forEach((effectType) => {
      player.addEffect(effectType.effect, effectType.duration * TicksPerSecond9, {
        amplifier: effectType.amplifier
      });
    });
  }
}

// scripts/block/bom/BakutikuFlint.ts
import { EntityComponentTypes as EntityComponentTypes17, EquipmentSlot as EquipmentSlot32, system as system13 } from "@minecraft/server";
var BakutikuFlint = class {
  onPlayerInteract(event) {
    let player = event.player;
    let equ = player.getComponent(EntityComponentTypes17.Equippable);
    let itemStack = equ.getEquipment(EquipmentSlot32.Mainhand);
    if (itemStack != void 0 && itemStack.typeId == "minecraft:flint_and_steel") {
      let block = event.block;
      let flint = block.permutation.getState("kurokumaft:flint");
      if (flint == 0) {
        block.setPermutation(block.permutation.withState("kurokumaft:flint", 1));
        let block_face = block.permutation.getState("minecraft:block_face");
        if (block_face == "up" || block_face == "down") {
          block.dimension.spawnParticle("minecraft:basic_flame_particle", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
        } else {
          block.dimension.spawnParticle("minecraft:basic_flame_particle", { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
        }
      }
    }
  }
};
function explodeBakutikuCancel(impactBLockList) {
  let filterBlockList = impactBLockList.filter((block) => {
    if (!block.matches("kurokumaft:bakutiku_block", { "kurokumaft:flint": 0 })) {
      return block;
    }
  });
  return filterBlockList;
}
async function explodeBakutikuChain(impactBLockList) {
  let filterBlockList = impactBLockList.filter((block) => {
    if (block.matches("kurokumaft:bakutiku_block", { "kurokumaft:flint": 0 })) {
      return block;
    }
  });
  system13.runTimeout(() => {
    filterBlockList.forEach((block) => {
      block.setPermutation(block.permutation.withState("kurokumaft:flint", 1));
      let block_face = block.permutation.getState("minecraft:block_face");
      if (block_face == "up" || block_face == "down") {
        block.dimension.spawnParticle("minecraft:basic_flame_particle", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
      } else {
        block.dimension.spawnParticle("minecraft:basic_flame_particle", { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
      }
    });
  }, 1);
}

// scripts/block/bom/BakutikuFire.ts
var BakutikuFire = class {
  onTick(event) {
    let block = event.block;
    block.dimension.spawnEntity("kurokumaft:bakutiku_entity<from_explosion>", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
  }
};

// scripts/block/TearEnchant.ts
import { system as system14, EntityComponentTypes as EntityComponentTypes18, ItemComponentTypes as ItemComponentTypes12, ItemStack as ItemStack41, EquipmentSlot as EquipmentSlot33, world as world16 } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
var TearEnchant = class {
  onPlayerDestroy(event) {
    let block = event.block;
    let dimension = event.dimension;
    breackTearEnchant(dimension, block);
  }
  onPlayerInteract(event) {
    let player = event.player;
    let block = event.block;
    let equ = player.getComponent(EntityComponentTypes18.Equippable);
    let itemStack = equ.getEquipment(EquipmentSlot33.Mainhand);
    if (block.matches("kurokumaft:tear_enchant", { "kurokumaft:isBook": 1 })) {
      tearEnchantBlock(player, itemStack, block);
    } else {
      setTearEnchantBook(player, itemStack, block);
    }
  }
};
async function breackTearEnchant(dimension, block) {
  let book_entity = dimension.getEntities({
    families: [
      "tear_enchant_book"
    ],
    location: { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 },
    closest: 1
  });
  if (book_entity.length > 0) {
    let bookInvent = book_entity[0].getComponent(EntityComponentTypes18.Inventory);
    let container = bookInvent.container;
    let setBook = container.getItem(0);
    dimension.spawnItem(setBook, block.location);
  }
  book_entity[0].remove();
}
async function tearEnchantBlock(player, item, block) {
  let equ = player.getComponent(EntityComponentTypes18.Equippable);
  let mainhand = equ.getEquipment(EquipmentSlot33.Mainhand);
  if (item != void 0) {
    let actionForm = new ActionFormData().title({ translate: "tile.kurokumaft:tear_enchant.name" });
    let enc = mainhand.getComponent(ItemComponentTypes12.Enchantable);
    if (enc != void 0) {
      let encs = enc.getEnchantments();
      if (encs != void 0 && encs.length > 0) {
        actionForm.body({ rawtext: [
          { translate: "tear_enchant.mess.body" },
          { text: "\n\n" },
          { translate: "tear_enchant.mess.body.kome1" },
          { text: "\n" },
          { translate: "tear_enchant.mess.body.kome2" }
        ] }).button({ translate: "tear_enchant.mess.ok" }).button({ translate: "tear_enchant.mess.cancel" });
        actionForm.show(player).then((formData) => {
          if (formData.selection == 0) {
            let book_entity = block.dimension.getEntities({
              families: [
                "tear_enchant_book"
              ],
              location: { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 },
              closest: 1
            });
            let bookInvent = book_entity[0].getComponent(EntityComponentTypes18.Inventory);
            let container = bookInvent.container;
            let setBook = container.getItem(0);
            let setBookEnc = setBook.getComponent(ItemComponentTypes12.Enchantable);
            for (let i = 0; i < encs.length; i++) {
              let repEnc = encs[i];
              try {
                if (setBookEnc.canAddEnchantment(repEnc)) {
                  if (setBookEnc.hasEnchantment(repEnc.type.id)) {
                    let tearEnc = setBookEnc.getEnchantment(repEnc.type.id);
                    if (repEnc.level == tearEnc.level && repEnc.level < repEnc.type.maxLevel) {
                      setBookEnc.removeEnchantment(repEnc.type);
                      setBookEnc.addEnchantment({ "level": repEnc.level + 1, "type": repEnc.type });
                    } else if (repEnc.level > tearEnc.level) {
                      setBookEnc.removeEnchantment(repEnc.type);
                      setBookEnc.addEnchantment({ "level": repEnc.level, "type": repEnc.type });
                    }
                  } else {
                    setBookEnc.addEnchantment({ "level": repEnc.level, "type": repEnc.type });
                  }
                  enc.removeEnchantment(repEnc.type);
                }
              } catch (error) {
                world16.sendMessage({ translate: "tear_enchant.mess.notenchant", with: [repEnc.type.id] });
              }
            }
            let reenc = mainhand.getComponent(ItemComponentTypes12.Enchantable);
            if (mainhand.typeId == "minecraft:enchanted_book" && (reenc == void 0 || reenc.getEnchantments().length == 0)) {
              let newmainhand = new ItemStack41("minecraft:book", 1);
              equ.setEquipment(EquipmentSlot33.Mainhand, newmainhand);
            } else {
              equ.setEquipment(EquipmentSlot33.Mainhand, mainhand);
            }
            if (setBookEnc.getEnchantments().length == 1) {
              let newBook = new ItemStack41("minecraft:enchanted_book", 1);
              let newBookEnc = newBook.getComponent(ItemComponentTypes12.Enchantable);
              newBookEnc.addEnchantments(setBookEnc.getEnchantments());
              container.setItem(0, newBook);
            } else {
              container.setItem(0, setBook);
            }
          } else {
            player.sendMessage({ translate: "tear_enchant.mess.cancelsend" });
          }
        });
      } else {
        actionForm.body({ translate: "tear_enchant.mess.body.notenc" }).button({ translate: "tear_enchant.mess.confirm" });
        actionForm.show(player).then((formData) => {
        }).catch((error) => {
        });
      }
    } else {
      actionForm.body({ translate: "tear_enchant.mess.body.notenc" }).button({ translate: "tear_enchant.mess.confirm" });
      actionForm.show(player).then((formData) => {
      }).catch((error) => {
      });
    }
  } else {
    let book_entity = block.dimension.getEntities({
      families: [
        "tear_enchant_book"
      ],
      location: { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 },
      closest: 1
    });
    let bookInvent = book_entity[0].getComponent(EntityComponentTypes18.Inventory);
    let container = bookInvent.container;
    let equ2 = player.getComponent(EntityComponentTypes18.Equippable);
    equ2.setEquipment(EquipmentSlot33.Mainhand, container.getItem(0));
    book_entity[0].remove();
    block.setPermutation(block.permutation.withState("kurokumaft:isBook", 0));
  }
}
async function setTearEnchantBook(player, item, block) {
  if (block.matches("kurokumaft:tear_enchant", { "kurokumaft:isBook": 0 })) {
    if (item != void 0) {
      if (item.typeId == "minecraft:book" || item.typeId == "minecraft:enchanted_book") {
        let book_entity = block.dimension.spawnEntity("kurokumaft:tear_enchant_book_entity", { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
        let bookInvent = book_entity.getComponent(EntityComponentTypes18.Inventory);
        let container = bookInvent.container;
        let equ = player.getComponent(EntityComponentTypes18.Equippable);
        let mainhand = equ.getEquipment(EquipmentSlot33.Mainhand);
        container.setItem(0, mainhand);
        block.setPermutation(block.permutation.withState("kurokumaft:isBook", 1));
        system14.runTimeout(() => {
          equ.setEquipment(EquipmentSlot33.Mainhand, void 0);
        }, 1);
      }
    } else {
      system14.runTimeout(() => {
        let actionForm = new ActionFormData().title({ translate: "tile.kurokumaft:tear_enchant.name" }).body({ rawtext: [
          { translate: "tear_enchant.mess.body.notbook" },
          { text: "\n\n" },
          { translate: "tear_enchant.mess.body.notbook_kome1" },
          { text: "\n\n" },
          { translate: "tear_enchant.mess.body.notbook_kome2" },
          { text: "\n\n" },
          { translate: "tear_enchant.mess.body.notbook_kome3" },
          { text: "\n\n" },
          { translate: "tear_enchant.mess.body.kome1" },
          { text: "\n" },
          { translate: "tear_enchant.mess.body.kome2" }
        ] }).button({ translate: "tear_enchant.mess.confirm" });
        actionForm.show(player);
      }, 1);
    }
  }
}

// scripts/items/weapons/bow/SniperSteelBow.ts
import { system as system15, TicksPerSecond as TicksPerSecond10 } from "@minecraft/server";
var SniperSteelBow = class {
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    shotSniperBow(source, itemStack);
  }
};
async function shotSniperBow(player, item) {
  player.setDynamicProperty("SniperSteelBowShot", true);
  let intervalNum = system15.runInterval(() => {
    if (player.isSneaking) {
      middleScope(player);
    } else {
      clearScope(player);
    }
  }, 1);
  player.setDynamicProperty("SniperSteelBowShotIntervalNum", intervalNum);
}
async function stopSniperBow(player) {
  let num = player.getDynamicProperty("SniperSteelBowShotIntervalNum");
  system15.clearRun(num);
  player.setDynamicProperty("SniperSteelBowShot", void 0);
  player.setDynamicProperty("SniperSteelBowShotIntervalNum", void 0);
  system15.runTimeout(() => {
    clearScope(player);
  }, TicksPerSecond10 * 1);
}

// scripts/items/weapons/battleaxe/Battleaxe.ts
var BattleaxeObjects = Object.freeze([
  {
    itemName: "kurokumaft:bamboo_battleaxe",
    damage: 1
  },
  {
    itemName: "kurokumaft:wooden_battleaxe",
    damage: 2
  },
  {
    itemName: "kurokumaft:iron_battleaxe",
    damage: 4
  },
  {
    itemName: "kurokumaft:steel_battleaxe",
    damage: 5
  },
  {
    itemName: "kurokumaft:bone_battleaxe",
    damage: 3
  }
]);
var Battleaxe = class {
  // 通常攻撃
  onHitEntity(event) {
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let itemStack = event.itemStack;
    let sickle = BattleaxeObjects.find((obj) => obj.itemName == itemStack.typeId);
    slashHit(attackEntity, hitEntity, sickle.damage);
  }
};

// scripts/items/weapons/battleaxe/CrossBone.ts
import { EquipmentSlot as EquipmentSlot34 } from "@minecraft/server";
var CrossBone = class {
  // チャージ完了
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    crossBoneShot(source);
    itemDurabilityDamage(source, itemStack, EquipmentSlot34.Mainhand);
  }
};
async function crossBoneShot(player) {
  shooting(player, "kurokumaft:cross_bone", 0, 4, void 0);
}

// scripts/items/bucket/CopperBucket.ts
import { ItemStack as ItemStack44, EquipmentSlot as EquipmentSlot35, Direction as Direction3, EntityComponentTypes as EntityComponentTypes19 } from "@minecraft/server";
var CopperBucket = class {
  onUseOn(event) {
    let copper_bucket = event.itemStack;
    let player = event.source;
    let block = event.block;
    let blockFace = event.blockFace;
    let faceBlock;
    let blocLocation = block.location;
    if (block.typeId == MinecraftBlockTypes.Water || block.typeId == MinecraftBlockTypes.Lava) {
      faceBlock = block;
    } else if (Direction3.Up == blockFace) {
      faceBlock = player.dimension.getBlock({ x: blocLocation.x, y: blocLocation.y + 1, z: blocLocation.z });
    } else if (Direction3.Down == blockFace) {
      faceBlock = player.dimension.getBlock({ x: blocLocation.x, y: blocLocation.y - 1, z: blocLocation.z });
    } else if (Direction3.East == blockFace) {
      faceBlock = player.dimension.getBlock({ x: blocLocation.x + 1, y: blocLocation.y, z: blocLocation.z });
    } else if (Direction3.West == blockFace) {
      faceBlock = player.dimension.getBlock({ x: blocLocation.x - 1, y: blocLocation.y, z: blocLocation.z });
    } else if (Direction3.North == blockFace) {
      faceBlock = player.dimension.getBlock({ x: blocLocation.x, y: blocLocation.y, z: blocLocation.z - 1 });
    } else if (Direction3.South == blockFace) {
      faceBlock = player.dimension.getBlock({ x: blocLocation.x, y: blocLocation.y, z: blocLocation.z + 1 });
    }
    if (faceBlock == void 0) {
      return;
    }
    let equippable = player.getComponent(EntityComponentTypes19.Equippable);
    let inventory = player.getComponent(EntityComponentTypes19.Inventory);
    if (faceBlock.typeId == MinecraftBlockTypes.Water && faceBlock.permutation.getState("liquid_depth") == 0) {
      let bucketWater = new ItemStack44("kurokumaft:copper_bucket_water", 1);
      let remaining = copper_bucket.amount - 1;
      if (remaining <= 0) {
        equippable.setEquipment(EquipmentSlot35.Mainhand, void 0);
        equippable.setEquipment(EquipmentSlot35.Mainhand, bucketWater);
      } else {
        copper_bucket.amount -= 1;
        equippable.setEquipment(EquipmentSlot35.Mainhand, copper_bucket);
        let container = inventory.container;
        if (container.emptySlotsCount == 0) {
          let point = getLookPoints(player.getRotation(), player.location, 1);
          player.dimension.spawnItem(bucketWater, point);
        } else {
          container.addItem(bucketWater);
        }
      }
      faceBlock.dimension.setBlockType(faceBlock.location, MinecraftBlockTypes.Air);
    } else if (faceBlock.typeId == MinecraftBlockTypes.Lava && faceBlock.permutation.getState("liquid_depth") == 0) {
      let bucketLava = new ItemStack44("kurokumaft:copper_bucket_lava", 1);
      let remaining = copper_bucket.amount - 1;
      if (remaining <= 0) {
        equippable.setEquipment(EquipmentSlot35.Mainhand, void 0);
        equippable.setEquipment(EquipmentSlot35.Mainhand, bucketLava);
      } else {
        copper_bucket.amount -= 1;
        equippable.setEquipment(EquipmentSlot35.Mainhand, copper_bucket);
        let container = inventory.container;
        if (container.emptySlotsCount == 0) {
          let point = getLookPoints(player.getRotation(), player.location, 1);
          player.dimension.spawnItem(bucketLava, point);
        } else {
          container.addItem(bucketLava);
        }
      }
      faceBlock.dimension.setBlockType(faceBlock.location, MinecraftBlockTypes.Air);
    }
  }
  onUse(event) {
    let source = event.source;
    let itemStack = event.itemStack;
    let cow = source.dimension.getEntities({
      closest: 1,
      location: source.location,
      maxDistance: 3.5,
      type: MinecraftEntityTypes.Cow
    });
    if (cow != void 0 && cow.length > 0) {
      let equippable = source.getComponent(EntityComponentTypes19.Equippable);
      let inventory = source.getComponent(EntityComponentTypes19.Inventory);
      let bucketMilk = new ItemStack44("kurokumaft:copper_bucket_milk", 1);
      let remaining = itemStack.amount - 1;
      if (remaining <= 0) {
        equippable.setEquipment(EquipmentSlot35.Mainhand, void 0);
        equippable.setEquipment(EquipmentSlot35.Mainhand, bucketMilk);
      } else {
        itemStack.amount -= 1;
        equippable.setEquipment(EquipmentSlot35.Mainhand, itemStack);
        let container = inventory.container;
        if (container.emptySlotsCount == 0) {
          let point = getLookPoints(source.getRotation(), source.location, 1);
          source.dimension.spawnItem(bucketMilk, point);
        } else {
          container.addItem(bucketMilk);
        }
      }
    }
  }
};

// scripts/items/bucket/CopperBucketLava.ts
import { ItemStack as ItemStack45, Direction as Direction4, BlockPermutation as BlockPermutation12, EntityComponentTypes as EntityComponentTypes20, EquipmentSlot as EquipmentSlot36 } from "@minecraft/server";
var CopperBucketLava = class {
  onUseOn(event) {
    let copper_bucket = event.itemStack;
    let player = event.source;
    let block = event.block;
    let blockFace = event.blockFace;
    let faceBlock;
    let blocLocation = block.location;
    if (Direction4.Up == blockFace) {
      faceBlock = player.dimension.getBlock({ x: blocLocation.x, y: blocLocation.y + 1, z: blocLocation.z });
    } else if (Direction4.Down == blockFace) {
      faceBlock = player.dimension.getBlock({ x: blocLocation.x, y: blocLocation.y - 1, z: blocLocation.z });
    } else if (Direction4.East == blockFace) {
      faceBlock = player.dimension.getBlock({ x: blocLocation.x + 1, y: blocLocation.y, z: blocLocation.z });
    } else if (Direction4.West == blockFace) {
      faceBlock = player.dimension.getBlock({ x: blocLocation.x - 1, y: blocLocation.y, z: blocLocation.z });
    } else if (Direction4.North == blockFace) {
      faceBlock = player.dimension.getBlock({ x: blocLocation.x, y: blocLocation.y, z: blocLocation.z - 1 });
    } else if (Direction4.South == blockFace) {
      faceBlock = player.dimension.getBlock({ x: blocLocation.x, y: blocLocation.y, z: blocLocation.z + 1 });
    }
    if (faceBlock == void 0) {
      return;
    }
    let bucket = new ItemStack45("kurokumaft:copper_bucket", 1);
    let equippable = player.getComponent(EntityComponentTypes20.Equippable);
    equippable.setEquipment(EquipmentSlot36.Mainhand, bucket);
    faceBlock.setPermutation(BlockPermutation12.resolve(MinecraftBlockTypes.Lava, { liquid_depth: 0 }));
  }
};

// scripts/items/bucket/CopperBucketMilk.ts
import { EntityComponentTypes as EntityComponentTypes21, EquipmentSlot as EquipmentSlot37, ItemStack as ItemStack46 } from "@minecraft/server";
var CopperBucketMilk = class {
  onConsume(event) {
    let player = event.source;
    player.runCommand("/effect " + player.nameTag + " clear");
    let bucket = new ItemStack46("kurokumaft:copper_bucket", 1);
    let equippable = player.getComponent(EntityComponentTypes21.Equippable);
    equippable.setEquipment(EquipmentSlot37.Mainhand, bucket);
  }
};

// scripts/items/bucket/CopperBucketWater.ts
import { Direction as Direction5, BlockPermutation as BlockPermutation13, ItemStack as ItemStack47, EntityComponentTypes as EntityComponentTypes22, EquipmentSlot as EquipmentSlot38 } from "@minecraft/server";
var CopperBucketWater = class {
  onUseOn(event) {
    let player = event.source;
    let block = event.block;
    let blockFace = event.blockFace;
    let faceBlock;
    let blocLocation = block.location;
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
    if (faceBlock == void 0) {
      return;
    }
    let bucket = new ItemStack47("kurokumaft:copper_bucket", 1);
    let equippable = player.getComponent(EntityComponentTypes22.Equippable);
    equippable.setEquipment(EquipmentSlot38.Mainhand, bucket);
    faceBlock.setPermutation(BlockPermutation13.resolve(MinecraftBlockTypes.Water, { liquid_depth: 0 }));
  }
};

// scripts/block/plants/OliveGrowth.ts
import { EntityComponentTypes as EntityComponentTypes23, EquipmentSlot as EquipmentSlot39, ItemStack as ItemStack48 } from "@minecraft/server";
var OliveGrowth = class {
  onTick(event) {
    let block = event.block;
    let growth = block.permutation.getState("kurokumaft:growth");
    if (growth < 3) {
      block.setPermutation(block.permutation.withState("kurokumaft:growth", growth + 1));
    }
  }
  onPlayerInteract(event) {
    let player = event.player;
    let equ = player.getComponent(EntityComponentTypes23.Equippable);
    let itemStack = equ.getEquipment(EquipmentSlot39.Mainhand);
    let block = event.block;
    let growth = block.permutation.getState("kurokumaft:growth");
    if (itemStack != void 0 && itemStack.typeId.indexOf("meal") != -1) {
      if (growth < 3) {
        block.setPermutation(block.permutation.withState("kurokumaft:growth", growth + 1));
        event.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
        subtractionItem(player, itemStack, EquipmentSlot39.Mainhand, 1);
      }
    } else {
      if (growth == 2) {
        block.setPermutation(block.permutation.withState("kurokumaft:growth", 1));
        block.dimension.spawnItem(new ItemStack48("kurokumaft:olive_green", 2), block.location);
      }
    }
    if (growth == 3) {
      block.setPermutation(block.permutation.withState("kurokumaft:growth", 1));
      block.dimension.spawnItem(new ItemStack48("kurokumaft:olive", 2), block.location);
    }
  }
};

// scripts/block/Fryer.ts
import { EntityComponentTypes as EntityComponentTypes24, ItemStack as ItemStack49, EquipmentSlot as EquipmentSlot40 } from "@minecraft/server";
var FlyItems = Object.freeze([
  {
    "item": MinecraftItemTypes.Chicken,
    "flyItem": "kurokumaft:fried_chicken"
  },
  {
    "item": MinecraftItemTypes.Porkchop,
    "flyItem": "kurokumaft:pork_cutlet"
  },
  {
    "item": MinecraftItemTypes.Potato,
    "flyItem": "kurokumaft:french_fries"
  }
]);
var Fryer = class {
  onPlayerInteract(event) {
    let player = event.player;
    let block = event.block;
    let equ = player.getComponent(EntityComponentTypes24.Equippable);
    let itemStack = equ.getEquipment(EquipmentSlot40.Mainhand);
    if (itemStack != void 0) {
      if (block.matches("kurokumaft:fryer", { "kurokumaft:oil_type": "empty" })) {
        setOilType(equ, itemStack, block);
      } else {
        deepFlyEat(player, equ, itemStack, block);
      }
    }
  }
};
async function setOilType(equ, item, block) {
  if (item.typeId == "kurokumaft:olive_oil") {
    equ.setEquipment(EquipmentSlot40.Mainhand, new ItemStack49(MinecraftItemTypes.GlassBottle, 1));
    block.setPermutation(block.permutation.withState("kurokumaft:oil_type", "olive"));
  }
}
async function deepFlyEat(player, equ, item, block) {
  let count = block.permutation.getState("kurokumaft:oil_count");
  if (count < 10) {
    if (block.matches("kurokumaft:fryer", { "kurokumaft:oil_type": "olive" })) {
      let flyItem = FlyItems.find((obj) => obj.item == item.typeId);
      if (flyItem != void 0) {
        let fried = new ItemStack49(flyItem.flyItem, 1);
        if (item.amount == 1) {
          equ.setEquipment(EquipmentSlot40.Mainhand, fried);
        } else {
          block.dimension.spawnItem(fried, { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
          subtractionItem(player, item, EquipmentSlot40.Mainhand, 1);
        }
      }
    }
    block.setPermutation(block.permutation.withState("kurokumaft:oil_count", count + 1));
    if (count + 1 == 10) {
      block.setPermutation(block.permutation.withState("kurokumaft:oil_type", "dirty"));
    }
  } else {
    if (item.typeId == MinecraftItemTypes.GlassBottle) {
      equ.setEquipment(EquipmentSlot40.Mainhand, new ItemStack49("kurokumaft:dirty_oil", 1));
      block.setPermutation(block.permutation.withState("kurokumaft:oil_count", 0));
      block.setPermutation(block.permutation.withState("kurokumaft:oil_type", "empty"));
    }
  }
}

// scripts/custom/WeaponsCustomComponentRegistry.ts
function initWeaponsRegisterCustom(initEvent) {
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:tnt_sword", new TntSwordBreak());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:magma_sword", new MagmaSwordFire());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:blue_ice_sword", new BuleSwordIce());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:mithril_sword", new MithrilSword());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:echo_sword", new EchoSword());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:cherry_sword", new CherrySword());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:ender_dragon_sword", new EnderDragonSword());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:wither_sword", new WitherSword());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:ender_eye_sword", new EnderEyeSword());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:throwable_spear", new ThrowableSpear());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:cherry_spear", new CherrySpear());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:blaze_spear", new BlazeSpear());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:mithril_spear", new MithrilSpear());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:thrown_hammer", new ThrowableHammer());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:hammer_attack", new HammerAttack());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:warden_hammer", new WardenHammer());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:barista_shot", new BaristaShot());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:shell_shot", new ShellShot());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:throwable_boomerang", new ThrowableBoomerang());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:sickle_change", new Sickle());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:scythe_change", new Scythe());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:battleaxe_slash", new Battleaxe());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:cross_bone", new CrossBone());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:charge_knuckle", new ChargeKnuckle());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:gatling", new Gatling());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:machine_gun", new MachineGun());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:flamethrower", new FlametHrower());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:sniper_rifle", new SniperRifle());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:sniper_steel_bow", new SniperSteelBow());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:shovel_pavement", new ShovelPavement());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:axe_stripped", new AxeStripped());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:hoe_farming", new HoeFarming());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:fire_brand", new FireBrand());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:mine_durability", new MineDurability());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:growth_meal", new GrowthMeal());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:potion_effect", new PotionEffect());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:copper_bucket", new CopperBucket());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:copper_bucket_water", new CopperBucketWater());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:copper_bucket_lava", new CopperBucketLava());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:copper_bucket_milk", new CopperBucketMilk());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:chocolate_cake_eat", new ChocolateCakeBlock());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:mithril_block", new MithrilBlock());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:budding_mithril", new BuddingMithril());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:mithril_bud_growth", new MithrilBudGrowth());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:fortune_destroy", new FortuneDestroy());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:plants_growth", new PlantsGrowth());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:olive_growth", new OliveGrowth());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:bakutiku_flint", new BakutikuFlint());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:bakutiku_fire", new BakutikuFire());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:tear_enchant", new TearEnchant());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:fryer", new Fryer());
}
function initWeaponsStateChangeMonitor(initEvent) {
  checkWeaponsPlayerEquTick();
}

// scripts/weapons_script.ts
world19.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initWeaponsRegisterCustom(initEvent);
  initWeaponsStateChangeMonitor(initEvent);
});
world19.beforeEvents.playerLeave.subscribe((leaveEvent) => {
  leaveEvent.player.clearDynamicProperties();
});
world19.beforeEvents.itemUseOn.subscribe((event) => {
  let player = event.source;
  let item = event.itemStack;
  let block = event.block;
});
world19.afterEvents.itemUseOn.subscribe((event) => {
  let player = event.source;
  let item = event.itemStack;
  let block = event.block;
});
world19.beforeEvents.explosion.subscribe((event) => {
  let impactBLockList = event.getImpactedBlocks();
  let filterBlockList = explodeBedrock(impactBLockList);
  filterBlockList = explodeBakutikuCancel(filterBlockList);
  event.setImpactedBlocks(filterBlockList);
  explodeBakutikuChain(impactBLockList);
});
world19.afterEvents.itemStartUse.subscribe((event) => {
  let player = event.source;
  let item = event.itemStack;
});
world19.beforeEvents.entityRemove.subscribe((event) => {
  let removedEntity = event.removedEntity;
  removeSpear(removedEntity);
  removeHammer(removedEntity);
});
world19.afterEvents.itemReleaseUse.subscribe((event) => {
  let player = event.source;
  let item = event.itemStack;
  if (item != void 0) {
    if (player.getDynamicProperty("gatlingShot")) {
      stopGatling(player);
    }
    if (player.getDynamicProperty("machineGunShot")) {
      stopMachineGun(player);
    }
    if (player.getDynamicProperty("flametHrowerShot")) {
      stopFlametHrower(player);
    }
    if (player.getDynamicProperty("SniperRifleShot")) {
      stopSniper(player);
    }
    if (player.getDynamicProperty("SniperSteelBowShot")) {
      stopSniperBow(player);
    }
    if (item.typeId.indexOf("spear") != -1) {
      releaseSpear(player, item);
    }
    if (item.typeId.indexOf("hammer") != -1) {
      releaseHammer(player, item);
    }
    if (item.typeId.indexOf("boomerang") != -1) {
      releaseBoomerang(player, item);
    }
  }
});
world19.afterEvents.itemStopUse.subscribe((event) => {
  let player = event.source;
  let item = event.itemStack;
  if (item != void 0) {
    if (player.getDynamicProperty("gatlingShot")) {
      stopGatling(player);
    }
    if (player.getDynamicProperty("machinegunShot")) {
      stopMachineGun(player);
    }
    if (player.getDynamicProperty("flametHrowerShot")) {
      stopFlametHrower(player);
    }
    if (player.getDynamicProperty("SniperRifleShot")) {
      stopSniper(player);
    }
    if (player.getDynamicProperty("SniperSteelBowShot")) {
      stopSniperBow(player);
    }
    if (item.typeId.indexOf("spear") != -1) {
      stopSpear(player);
    }
    if (item.typeId.indexOf("hammer") != -1) {
      releaseHammer(player, item);
    }
    if (item.typeId.indexOf("boomerang") != -1) {
      releaseBoomerang(player, item);
    }
  }
});
world19.afterEvents.entitySpawn.subscribe((event) => {
  let cause = event.cause;
  let entity = event.entity;
  if (EntityInitializationCause.Spawned == cause) {
    spawnSpear(entity);
    spawnHammer(entity);
    spawnBoomerang(entity);
  }
});
world19.beforeEvents.itemUse.subscribe((event) => {
  let player = event.source;
  let item = event.itemStack;
  if (item != void 0) {
  }
});
world19.afterEvents.itemUse.subscribe((event) => {
  let player = event.source;
  let item = event.itemStack;
});
world19.afterEvents.blockExplode.subscribe((event) => {
  let dimension = event.dimension;
  let block = event.block;
  if (block.typeId == "kurokumaft:tear_enchant") {
    breackTearEnchant(dimension, block);
  }
});
world19.afterEvents.playerPlaceBlock.subscribe((event) => {
  let block = event.block;
  let dimension = event.dimension;
  playerMithrilset(block);
});
world19.beforeEvents.playerBreakBlock.subscribe((event) => {
  let player = event.player;
  let item = event.itemStack;
  let block = event.block;
  if (item != void 0) {
  }
});
world19.afterEvents.entityHitEntity.subscribe((event) => {
  let damageEn = event.damagingEntity;
  let hitEn = event.hitEntity;
  if (hitEn != void 0 && hitEn instanceof Player47) {
    shieldGuard(hitEn, true);
    shieldCounter(hitEn, damageEn);
  }
});
world19.afterEvents.entityHitBlock.subscribe((event) => {
  let damageEn = event.damagingEntity;
  let hitBlock = event.hitBlock;
  if (hitBlock != void 0) {
    let equ = damageEn.getComponent(EntityComponentTypes25.Equippable);
    let itemStack = equ.getEquipment(EquipmentSlot41.Mainhand);
    if (itemStack != void 0) {
      if (itemStack.typeId == "kurokumaft:fire_brand") {
        fireCharcoalBlock(damageEn, itemStack, hitBlock);
      }
      if (itemStack.typeId == "kurokumaft:tnt_sword") {
        tntBreak(damageEn, itemStack, hitBlock.location);
      }
      if (itemStack.typeId == "kurokumaft:mithril_sword") {
        breakBlock(hitBlock);
      }
    }
  }
});
world19.afterEvents.projectileHitEntity.subscribe((event) => {
  let projectileEn = event.projectile;
  let source = event.source;
  let hitEn = event.getEntityHit().entity;
  let hitVector = event.hitVector;
  if (hitEn != void 0 && hitEn instanceof Player47) {
    shieldGuard(hitEn, false);
    glassReflection(hitEn, projectileEn, hitVector);
  }
  if (source != void 0 && source instanceof Player47) {
    hitSpear(source, projectileEn);
  }
  if (projectileEn && isThrowHammer(projectileEn)) {
    waveWardenHammer(source, projectileEn);
    stopHammer(projectileEn);
  }
});
world19.afterEvents.projectileHitBlock.subscribe((event) => {
  let projectileEn = event.projectile;
  let source = event.source;
  if (source != void 0 && source instanceof Player47) {
    hitSpear(source, projectileEn);
  }
  if (projectileEn && isThrowHammer(projectileEn)) {
    waveWardenHammer(source, projectileEn);
    stopHammer(projectileEn);
  }
});
world19.afterEvents.entityHurt.subscribe((event) => {
  let damage = event.damage;
  let damageSource = event.damageSource;
  let hitEn = event.hurtEntity;
  if (hitEn instanceof Player47 && damageSource.cause != "void") {
    if (guards.indexOf(damageSource.cause) != -1) {
      shieldGuard(hitEn, false);
    }
    if (hitEn.getDynamicProperty("axolotl_helmet")) {
      axolotlRegeneration(hitEn);
    }
    resuscitationEquipment(hitEn);
  }
});

//# sourceMappingURL=../debug/weapons_script.js.map
