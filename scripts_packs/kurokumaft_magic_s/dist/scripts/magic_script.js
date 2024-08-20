// scripts/magic_script.ts
import { world as world6 } from "@minecraft/server";

// scripts/shieldEvent.ts
import {
  system as system2,
  EntityComponentTypes as EntityComponentTypes2,
  ItemComponentTypes as ItemComponentTypes2,
  EquipmentSlot as EquipmentSlot2
} from "@minecraft/server";

// scripts/common/commonUtil.ts
import { world, system, EntityComponentTypes, ItemComponentTypes } from "@minecraft/server";
var CraftBlocks = [
  "minecraft:crafting_table",
  "minecraft:anvil",
  "minecraft:smithing_table",
  "minecraft:cartography_table",
  "minecraft:loom",
  "minecraft:barrel",
  "minecraft:smoker",
  "minecraft:blast_furnace",
  "minecraft:furnace",
  "kurokumaft:magic_lectern"
];
function print(text) {
  world.sendMessage(text + "");
}
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
function playsound(entity, sound) {
  let commandText = "playsound " + sound + " @s";
  entity.runCommandAsync(commandText);
}
function durabilityDamage(player, item, slotName, slot, damage) {
  let dur = item.getComponent(ItemComponentTypes.Durability);
  let enc = item.getComponent(ItemComponentTypes.Enchantable);
  let encs = null;
  if (enc) {
    encs = enc.getEnchantments();
  }
  let commandText = "replaceitem entity @s " + slotName + " 0 " + item.typeId + " 1 " + (dur.damage + damage);
  player.runCommand(commandText);
  if (encs) {
    let intervalNum = system.runInterval(() => {
      let reEqu = player.getComponent(EntityComponentTypes.Equippable);
      let reItem = reEqu.getEquipment(slot);
      let reEnc = reItem.getComponent(ItemComponentTypes.Enchantable);
      for (let i = 0; i < encs.length; i++) {
        reEnc.addEnchantment(encs[i]);
      }
      reEqu.setEquipment(slot, reItem);
    }, 2);
    system.runTimeout(() => {
      system.clearRun(intervalNum);
    }, 3);
  }
}
function breakItem(player, slotName) {
  let commandText = "replaceitem entity @s " + slotName + " 0 destroy air";
  player.runCommand(commandText);
}
var MusicRecodes = Object.freeze([
  "record.5",
  "record.relic",
  "record.13",
  "record.cat",
  "record.blocks",
  "record.chirp",
  "record.far",
  "record.mall",
  "record.mellohi",
  "record.stal",
  "record.strad",
  "record.ward",
  "record.11",
  "record.wait",
  "record.pigstep",
  "record.otherside"
]);

// scripts/shieldEvent.ts
function shieldGuard(player, range) {
  let equ = player.getComponent(EntityComponentTypes2.Equippable);
  let offhand = equ.getEquipment(EquipmentSlot2.Offhand);
  let mainhand = equ.getEquipment(EquipmentSlot2.Mainhand);
  if (player.isSneaking) {
    if (offhand != void 0 && offhand.typeId.indexOf("_shield") != -1) {
      let dur = offhand.getComponent(ItemComponentTypes2.Durability);
      if (dur.maxDurability > dur.damage + 1) {
        durabilityDamage(player, offhand, "slot.weapon.offhand", EquipmentSlot2.Offhand, 1);
        playsound(player, "item.shield.block");
      } else {
        breakItem(player, "slot.weapon.offhand");
      }
    } else if (mainhand != void 0 && mainhand.typeId.indexOf("_shield") != -1) {
      let dur = mainhand.getComponent(ItemComponentTypes2.Durability);
      if (dur.maxDurability > dur.damage + 1) {
        durabilityDamage(player, mainhand, "slot.weapon.mainhand", EquipmentSlot2.Mainhand, 1);
        playsound(player, "item.shield.block");
      } else {
        breakItem(player, "slot.weapon.mainhand");
      }
    }
  }
}
function shieldCounter(player, damager) {
  let equ = player.getComponent(EntityComponentTypes2.Equippable);
  let offhand = equ.getEquipment(EquipmentSlot2.Offhand);
  let mainhand = equ.getEquipment(EquipmentSlot2.Mainhand);
  if (player.isSneaking) {
    if (offhand != void 0 && offhand.typeId == "kurokumaft:fire_magic_shield") {
      damager.applyDamage(3, { "cause": "lava" });
      damager.runCommand("particle kurokumaft:mobflame_firing ~~~");
      let intervalNum = system2.runInterval(() => {
        if (damager) {
          let health = damager.getComponent(EntityComponentTypes2.Health);
          if (health) {
            damager.applyDamage(3, { "cause": "lava" });
            damager.runCommand("particle kurokumaft:mobflame_firing ~~~");
          }
        }
      }, 5);
      system2.runTimeout(() => {
        system2.clearRun(intervalNum);
      }, 15);
    } else if (mainhand != void 0 && mainhand.typeId == "kurokumaft:fire_magic_shield") {
      damager.applyDamage(3, { "cause": "lava" });
      damager.runCommand("particle kurokumaft:mobflame_firing ~~~");
      let intervalNum = system2.runInterval(() => {
        if (damager) {
          let health = damager.getComponent(EntityComponentTypes2.Health);
          if (health) {
            damager.applyDamage(3, { "cause": "lava" });
            damager.runCommand("particle kurokumaft:mobflame_firing ~~~");
          }
        }
      }, 5);
      system2.runTimeout(() => {
        system2.clearRun(intervalNum);
      }, 15);
    }
    if (offhand != void 0 && offhand.typeId == "kurokumaft:water_magic_shield") {
      damager.applyDamage(1, { "cause": "drowning" });
      damager.runCommand("particle kurokumaft:water_sword_particle ~~~");
      damager.addEffect("weakness", 600, { "amplifier": 1, "showParticles": true });
    } else if (mainhand != void 0 && mainhand.typeId == "kurokumaft:water_magic_shield") {
      damager.applyDamage(1, { "cause": "drowning" });
      damager.runCommand("particle kurokumaft:water_sword_particle ~~~");
      damager.addEffect("weakness", 600, { "amplifier": 1, "showParticles": true });
    }
    if (offhand != void 0 && offhand.typeId == "kurokumaft:wind_magic_shield") {
      let view = player.getViewDirection();
      damager.applyDamage(1, { "cause": "fall" });
      damager.runCommand("particle kurokumaft:aero_bomb_short_particle ~~~");
      damager.applyKnockback(Math.round(view.x) * 10, Math.round(view.z) * 10, 10, 1);
    } else if (mainhand != void 0 && mainhand.typeId == "kurokumaft:wind_magic_shield") {
      let view = player.getViewDirection();
      damager.applyDamage(1, { "cause": "fall" });
      damager.runCommand("particle kurokumaft:aero_bomb_short_particle ~~~");
      damager.applyKnockback(Math.round(view.x) * 10, Math.round(view.z) * 10, 10, 1);
    }
    if (offhand != void 0 && offhand.typeId == "kurokumaft:thunder_magic_shield") {
      damager.applyDamage(3, { "cause": "lightning" });
      damager.runCommand("particle minecraft:snowflake_particle ~~~");
      let intervalNum = system2.runInterval(() => {
        if (damager) {
          let health = damager.getComponent(EntityComponentTypes2.Health);
          if (health) {
            damager.applyDamage(3, { "cause": "lightning" });
            damager.runCommand("particle minecraft:snowflake_particle ~~~");
          }
        }
      }, 5);
      system2.runTimeout(() => {
        system2.clearRun(intervalNum);
      }, 15);
    } else if (mainhand != void 0 && mainhand.typeId == "kurokumaft:thunder_magic_shield") {
      damager.applyDamage(3, { "cause": "lightning" });
      damager.runCommand("particle kurokumaft:thunder_sword_particle ~~~");
      let intervalNum = system2.runInterval(() => {
        if (damager) {
          let health = damager.getComponent(EntityComponentTypes2.Health);
          if (health) {
            damager.applyDamage(3, { "cause": "lightning" });
            damager.runCommand("particle kurokumaft:thunder_sword_particle ~~~");
          }
        }
      }, 5);
      system2.runTimeout(() => {
        system2.clearRun(intervalNum);
      }, 15);
    }
    if (offhand != void 0 && offhand.typeId == "kurokumaft:stone_magic_shield") {
      let view = player.getViewDirection();
      damager.applyDamage(1, { "cause": "piston" });
      damager.runCommand("particle kurokumaft:grey_bomb_short_particle ~~~");
      damager.applyKnockback(Math.round(view.x) * 10, Math.round(view.z) * 10, 10, 1);
    } else if (mainhand != void 0 && mainhand.typeId == "kurokumaft:stone_magic_shield") {
      let view = player.getViewDirection();
      damager.applyDamage(1, { "cause": "piston" });
      damager.runCommand("particle kurokumaft:grey_bomb_short_particle ~~~");
      damager.applyKnockback(Math.round(view.x) * 10, Math.round(view.z) * 10, 10, 1);
    }
    if (offhand != void 0 && offhand.typeId == "kurokumaft:ice_magic_shield") {
      damager.applyDamage(1, { "cause": "freezing" });
      damager.runCommand("particle kurokumaft:ice_sword_particle ~~~");
      damager.addEffect("slowness", 200, { "amplifier": 1, "showParticles": false });
    } else if (mainhand != void 0 && mainhand.typeId == "kurokumaft:ice_magic_shield") {
      damager.applyDamage(1, { "cause": "freezing" });
      damager.runCommand("particle kurokumaft:ice_sword_particle ~~~");
      damager.addEffect("slowness", 200, { "amplifier": 1, "showParticles": false });
    }
  }
}

// scripts/magicItem.ts
import {
  world as world2,
  system as system3,
  EntityComponentTypes as EntityComponentTypes3,
  ItemStack as ItemStack2,
  Direction,
  ItemComponentTypes as ItemComponentTypes3
} from "@minecraft/server";

// scripts/magic/MagicBookComponent.ts
var MagicBookComponent = class {
  // jobId
  constructor(playerId, item, durability, intervalNum) {
    this.playerId = playerId;
    this.item = item;
    this.durability = durability;
    this.intervalNum = intervalNum;
  }
  isPlayerId(id) {
    return id == this.playerId;
  }
  getItem() {
    return this.item;
  }
  getDurability() {
    return this.durability;
  }
  getIntervalNum() {
    return this.intervalNum;
  }
};
var MagicBookComponent_default = MagicBookComponent;

// scripts/magicItem.ts
import { ModalFormData } from "@minecraft/server-ui";
function home_tp(player, item) {
  let lores = item.getLore();
  if (lores.length > 0 && lores[0].indexOf("\u62E0\u70B9") != -1) {
    let entity = world2.getEntity(lores[4].substr(3));
    let text = "tp @s " + lores[1].substr(2) + " " + lores[2].substr(2) + " " + lores[3].substr(2);
    player.runCommand(text);
  }
}
function torchlight_use(player, block, item) {
  if (block.typeId.indexOf("chest") == -1 && block.typeId.indexOf("boat") == -1 && CraftBlocks.indexOf(block.typeId) == -1) {
    decrimentGrimoireCount(player, item);
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
function ignited_use_af(player, block, direction, item) {
  let blockPer = block.permutation;
  let extinguished = blockPer.getState("extinguished");
  let lit = blockPer.getState("lit");
  let blockDim = block.dimension;
  let bx = block.location.x;
  let by = block.location.y;
  let bz = block.location.z;
  let setFireF = false;
  let setLocation = "";
  if (CraftBlocks.indexOf(block.typeId) != -1) {
    return;
  }
  if (extinguished) {
    block.setPermutation(blockPer.withState("extinguished", false));
    setFireF = true;
  } else if (lit != void 0 && !lit) {
    block.setPermutation(blockPer.withState("lit", true));
    setFireF = true;
  } else {
    BlockLocationList.forEach((obj) => {
      if (obj.direction == direction) {
        let vec = { "x": bx + obj.location.x, "y": by + obj.location.y, "z": bz + obj.location.z };
        let dimeBlock = blockDim.getBlock(vec);
        if (dimeBlock.isAir) {
          setLocation = bx + obj.location.x + " " + (by + obj.location.y) + " " + (bz + obj.location.z);
          player.runCommand("setblock " + setLocation + ' minecraft:fire ["age"=0]');
          setFireF = true;
        }
      }
    });
  }
  if (setFireF) {
    decrimentGrimoireCount(player, item);
  }
}
function ignited_use_be(player, block, direction, item) {
  let bx = block.location.x;
  let by = block.location.y;
  let bz = block.location.z;
  if (CraftBlocks.indexOf(block.typeId) != -1) {
    return;
  }
  if (block.typeId == "minecraft:tnt") {
    player.runCommand("setblock " + bx + " " + by + " " + bz + " minecraft:air");
    player.runCommand("summon minecraft:tnt " + bx + " " + by + " " + bz + " ~ ~ from_explosion");
    decrimentGrimoireCount(player, item);
  }
}
function water_use(player, block, direction, item) {
  let blockPer = block.permutation;
  let cauldron = blockPer.getState("cauldron_liquid");
  let blockDim = block.dimension;
  let bx = block.location.x;
  let by = block.location.y;
  let bz = block.location.z;
  let setFireF = false;
  let setLocation = "";
  if (CraftBlocks.indexOf(block.typeId) != -1) {
    return;
  }
  if (cauldron) {
    block.setPermutation(blockPer.withState("cauldron_liquid", "water"));
    block.setPermutation(blockPer.withState("fill_level", 6));
    setFireF = true;
  } else {
    BlockLocationList.forEach((obj) => {
      if (obj.direction == direction) {
        let vec = { "x": bx + obj.location.x, "y": by + obj.location.y, "z": bz + obj.location.z };
        let dimeBlock = blockDim.getBlock(vec);
        if (dimeBlock.isAir) {
          setLocation = bx + obj.location.x + " " + (by + obj.location.y) + " " + (bz + obj.location.z);
          setFireF = true;
        }
      }
    });
  }
  if (setFireF) {
    player.runCommand("setblock " + setLocation + ' minecraft:flowing_water ["liquid_depth"=0]');
    decrimentGrimoireCount(player, item);
  }
}
var FlowerBlockS = Object.freeze([
  "",
  "",
  "",
  "",
  "",
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
  'minecraft:double_plant ["double_plant_type"="sunflower", "upper_block_bit"=false]',
  'minecraft:double_plant ["double_plant_type"="syringa", "upper_block_bit"=false]',
  'minecraft:double_plant ["double_plant_type"="grass", "upper_block_bit"=false]',
  'minecraft:double_plant ["double_plant_type"="fern", "upper_block_bit"=false]',
  'minecraft:double_plant ["double_plant_type"="rose", "upper_block_bit"=false]',
  'minecraft:double_plant ["double_plant_type"="paeonia", "upper_block_bit"=false]'
]);
function flower_garden_use(player, block, direction, item) {
  let blockPer = block.permutation;
  let blockDim = block.dimension;
  let bx = block.location.x;
  let by = block.location.y;
  let bz = block.location.z;
  let itemCool = item.getComponent(ItemComponentTypes3.Cooldown);
  let setFireF = false;
  if (itemCool.getCooldownTicksRemaining(player) != 0) {
    return;
  }
  if (CraftBlocks.indexOf(block.typeId) != -1) {
    return;
  }
  if (block.typeId == "minecraft:grass_block") {
    if (direction == Direction.Up) {
      player.runCommand("particle kurokumaft:flower_garden_growth_emitter ~~~");
      itemCool.startCooldown(player);
      let xpcount1 = 0;
      let intervalNumXP = system3.runInterval(() => {
        for (let z = 0; z < 8; z++) {
          let vec = { "x": bx + xpcount1, "y": by, "z": bz + z };
          let upvec = { "x": bx + xpcount1, "y": by + 1, "z": bz + z };
          let dupvec = { "x": bx + xpcount1, "y": by + 2, "z": bz + z };
          let dimeBlock = blockDim.getBlock(vec);
          let updimeBlock = blockDim.getBlock(upvec);
          if (dimeBlock.typeId == "minecraft:grass_block" && updimeBlock.isAir) {
            let randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            if (randomBlock == "") {
              continue;
            }
            let dupdimeBlock = blockDim.getBlock(dupvec);
            while (randomBlock.indexOf("double") != -1 && !dupdimeBlock.isAir) {
              randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            }
            player.runCommand("setblock " + (bx + xpcount1) + " " + (by + 1) + " " + (bz + z) + " " + randomBlock);
            setFireF = true;
          }
        }
        xpcount1++;
      }, 1);
      let xmcount1 = 0;
      let intervalNumXM = system3.runInterval(() => {
        for (let z = 0; z < 8; z++) {
          let vec = { "x": bx + xmcount1, "y": by, "z": bz + z };
          let upvec = { "x": bx + xmcount1, "y": by + 1, "z": bz + z };
          let dupvec = { "x": bx + xmcount1, "y": by + 2, "z": bz + z };
          let dimeBlock = blockDim.getBlock(vec);
          let updimeBlock = blockDim.getBlock(upvec);
          if (dimeBlock.typeId == "minecraft:grass_block" && updimeBlock.isAir) {
            let randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            if (randomBlock == "") {
              continue;
            }
            let dupdimeBlock = blockDim.getBlock(dupvec);
            while (randomBlock.indexOf("double") != -1 && !dupdimeBlock.isAir) {
              randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            }
            player.runCommand("setblock " + (bx + xmcount1) + " " + (by + 1) + " " + (bz + z) + " " + randomBlock);
            setFireF = true;
          }
        }
        xmcount1--;
      }, 1);
      let xpcount2 = 0;
      let intervalNumZP = system3.runInterval(() => {
        for (let z = -1; z > -8; z--) {
          let vec = { "x": bx + xpcount2, "y": by, "z": bz + z };
          let upvec = { "x": bx + xpcount2, "y": by + 1, "z": bz + z };
          let dupvec = { "x": bx + xpcount2, "y": by + 2, "z": bz + z };
          let dimeBlock = blockDim.getBlock(vec);
          let updimeBlock = blockDim.getBlock(upvec);
          if (dimeBlock.typeId == "minecraft:grass_block" && updimeBlock.isAir) {
            let randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            if (randomBlock == "") {
              continue;
            }
            let dupdimeBlock = blockDim.getBlock(dupvec);
            while (randomBlock.indexOf("double") != -1 && !dupdimeBlock.isAir) {
              randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            }
            player.runCommand("setblock " + (bx + xpcount2) + " " + (by + 1) + " " + (bz + z) + " " + randomBlock);
            setFireF = true;
          }
        }
        xpcount2++;
      }, 1);
      let xmcount2 = 0;
      let intervalNumZM = system3.runInterval(() => {
        for (let z = -1; z > -8; z--) {
          let vec = { "x": bx + xmcount2, "y": by, "z": bz + z };
          let upvec = { "x": bx + xmcount2, "y": by + 1, "z": bz + z };
          let dupvec = { "x": bx + xmcount2, "y": by + 2, "z": bz + z };
          let dimeBlock = blockDim.getBlock(vec);
          let updimeBlock = blockDim.getBlock(upvec);
          if (dimeBlock.typeId == "minecraft:grass_block" && updimeBlock.isAir) {
            let randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            if (randomBlock == "") {
              continue;
            }
            let dupdimeBlock = blockDim.getBlock(dupvec);
            while (randomBlock.indexOf("double") != -1 && !dupdimeBlock.isAir) {
              randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            }
            player.runCommand("setblock " + (bx + xmcount2) + " " + (by + 1) + " " + (bz + z) + " " + randomBlock);
            setFireF = true;
          }
        }
        xmcount2--;
      }, 1);
      system3.runTimeout(() => {
        system3.clearRun(intervalNumXP);
        system3.clearRun(intervalNumZP);
        system3.clearRun(intervalNumXM);
        system3.clearRun(intervalNumZM);
        if (setFireF) {
          decrimentGrimoireCount(player, item);
        }
      }, 15);
    }
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
function growth_use(player, block, direction, item) {
  let blockPer = block.permutation;
  let blockDim = block.dimension;
  let bx = block.location.x;
  let by = block.location.y;
  let bz = block.location.z;
  let setFireF = false;
  let setLocation = "";
  if (CraftBlocks.indexOf(block.typeId) != -1) {
    return;
  } else if (block.typeId == "minecraft:bamboo" || block.typeId == "minecraft:bamboo_sapling") {
    if (block.typeId == "minecraft:bamboo_sapling") {
      player.runCommand("setblock " + bx + " " + by + " " + bz + " minecraft:bamboo");
    }
    let count = 1;
    let demBlock = blockDim.getBlock({ "x": bx, "y": by + count, "z": bz });
    while (count <= 15 && (demBlock.typeId == "minecraft:bamboo" || demBlock.isAir)) {
      let blockCom = 'minecraft:bamboo ["bamboo_leaf_size"="no_leaves", "bamboo_stalk_thickness" = "thick"]';
      if (count > 10) {
        blockCom = 'minecraft:bamboo ["bamboo_leaf_size"="large_leaves", "bamboo_stalk_thickness" = "thick"]';
      } else if (count > 5) {
        blockCom = 'minecraft:bamboo ["bamboo_leaf_size"="small_leaves", "bamboo_stalk_thickness" = "thick"]';
      }
      player.runCommand("setblock " + bx + " " + (by + count) + " " + bz + " " + blockCom);
      count++;
    }
    player.runCommand("particle minecraft:crop_growth_emitter " + bx + " " + by + " " + bz);
  } else if (block.typeId == "minecraft:twisting_vines") {
    let vin_count = 1;
    let vinBlock = blockDim.getBlock({ "x": bx, "y": by + vin_count, "z": bz });
    while (vinBlock.typeId == "minecraft:twisting_vines") {
      vin_count++;
    }
    let air_count = vin_count + 1;
    let air_last = air_count + 15;
    let airBlock = blockDim.getBlock({ "x": bx, "y": by + air_count, "z": bz });
    while (air_count <= air_last && airBlock.isAir) {
      air_count++;
    }
    player.runCommand("fill " + bx + " " + (by + vin_count) + " " + bz + " " + bx + " " + (by + air_count) + " " + bz + " minecraft:twisting_vines");
    player.runCommand("particle minecraft:crop_growth_emitter " + bx + " " + by + " " + bz);
  } else if (block.typeId == "minecraft:cave_vines") {
    let up_count = 1;
    let upBlock = blockDim.getBlock({ "x": bx, "y": by + up_count, "z": bz });
    while (upBlock.typeId == "minecraft:cave_vines") {
      up_count++;
    }
    let down_count = 0;
    let downBlock = blockDim.getBlock({ "x": bx, "y": by + down_count, "z": bz });
    while (downBlock.typeId == "minecraft:cave_vines") {
      down_count--;
    }
    player.runCommand("fill " + bx + " " + (by + down_count + 2) + " " + bz + " " + bx + " " + (by + up_count - 1) + " " + bz + " minecraft:cave_vines_body_with_berries");
    player.runCommand("setblock " + bx + " " + (by + down_count + 1) + " " + bz + " minecraft:cave_vines_head_with_berries");
    player.runCommand("particle minecraft:crop_growth_emitter " + bx + " " + by + " " + bz);
  } else if (block.typeId == "minecraft:reeds") {
    let vin_count = 1;
    let vinBlock = blockDim.getBlock({ "x": bx, "y": by + vin_count, "z": bz });
    while (vinBlock.typeId == "minecraft:reeds") {
      vin_count++;
    }
    let air_count = vin_count + 1;
    let air_last = air_count + 15;
    let airBlock = blockDim.getBlock({ "x": bx, "y": by + air_count, "z": bz });
    while (air_count <= air_last && airBlock.isAir) {
      air_count++;
    }
    player.runCommand("fill " + bx + " " + (by + vin_count) + " " + bz + " " + bx + " " + (by + air_count) + " " + bz + " minecraft:reeds");
    player.runCommand("particle minecraft:crop_growth_emitter " + bx + " " + by + " " + bz);
  } else if (wood_sapling.indexOf(block.typeId) != -1) {
    let age_bit = blockPer.getState("age_bit");
    if (age_bit) {
    }
  }
  if (setFireF) {
    decrimentGrimoireCount(player, item);
  }
}
var MowingBlocks = Object.freeze([
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
  "minecraft:double_plant"
]);
function mowing_use(player, item) {
  let playerDim = player.dimension;
  let bx = player.location.x;
  let by = player.location.y;
  let bz = player.location.z;
  let setFireF = false;
  let xpcount1 = 0;
  let intervalNumXP = system3.runInterval(() => {
    for (let z = 0; z < 10; z++) {
      for (let y = 0; y < 10; y++) {
        let vec = { "x": bx + xpcount1, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlocks.indexOf(dimBlock.typeId) != -1) {
          player.runCommand("setblock " + (bx + xpcount1) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
      for (let y = -1; y > -3; y--) {
        let vec = { "x": bx + xpcount1, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlocks.indexOf(dimBlock.typeId) != -1) {
          player.runCommand("setblock " + (bx + xpcount1) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
    }
    xpcount1++;
  }, 1);
  let xmcount1 = 0;
  let intervalNumXM = system3.runInterval(() => {
    for (let z = 0; z < 10; z++) {
      for (let y = 0; y < 10; y++) {
        let vec = { "x": bx + xmcount1, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlocks.indexOf(dimBlock.typeId) != -1) {
          player.runCommand("setblock " + (bx + xmcount1) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
      for (let y = -1; y > -3; y--) {
        let vec = { "x": bx + xmcount1, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlocks.indexOf(dimBlock.typeId) != -1) {
          player.runCommand("setblock " + (bx + xmcount1) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
    }
    xmcount1--;
  }, 1);
  let xpcount2 = 0;
  let intervalNumZP = system3.runInterval(() => {
    for (let z = -1; z > -10; z--) {
      for (let y = 0; y < 10; y++) {
        let vec = { "x": bx + xpcount2, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlocks.indexOf(dimBlock.typeId) != -1) {
          player.runCommand("setblock " + (bx + xpcount2) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
      for (let y = -1; y > -3; y--) {
        let vec = { "x": bx + xpcount2, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlocks.indexOf(dimBlock.typeId) != -1) {
          player.runCommand("setblock " + (bx + xpcount2) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
    }
    xpcount2++;
  }, 1);
  let xmcount2 = 0;
  let intervalNumZM = system3.runInterval(() => {
    for (let z = -1; z > -10; z--) {
      for (let y = 0; y < 10; y++) {
        let vec = { "x": bx + xmcount2, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlocks.indexOf(dimBlock.typeId) != -1) {
          player.runCommand("setblock " + (bx + xmcount2) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
      for (let y = -1; y > -3; y--) {
        let vec = { "x": bx + xmcount2, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlocks.indexOf(dimBlock.typeId) != -1) {
          player.runCommand("setblock " + (bx + xmcount2) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
    }
    xmcount2--;
  }, 1);
  player.runCommand("particle kurokumaft:mowing_particle " + bx + " " + by + " " + bz);
  system3.runTimeout(() => {
    system3.clearRun(intervalNumXP);
    system3.clearRun(intervalNumZP);
    system3.clearRun(intervalNumXM);
    system3.clearRun(intervalNumZM);
    if (setFireF) {
      decrimentGrimoireCount(player, item);
    }
  }, 15);
}
function music_sound_use(player, item) {
  player.runCommand("music play " + MusicRecodes[Math.floor(Math.random() * MusicRecodes.length)] + " 1 5");
  decrimentGrimoireCount(player, item);
}
var magicBookList = [];
function grimoire_summon_use(player, item) {
  let particle = "";
  if (item.typeId == "kurokumaft:fire_grimoire") {
    particle = "kurokumaft:fire_bread_particle";
  }
  player.runCommand("particle " + particle + " ~~0.75~");
  let intervalNum = system3.runInterval(() => {
    player.runCommand("particle " + particle + " ~~0.75~");
  }, 10);
  let durability = item.getComponent(ItemComponentTypes3.Durability);
  let magicBook = new MagicBookComponent_default(player.id, item, durability.damage, intervalNum);
  magicBookList.push(magicBook);
  system3.runTimeout(() => {
    system3.clearRun(intervalNum);
  }, 60);
}
function grimoire_summon_Release(player, item, duration) {
  let magicBook = magicBookList.find((book) => book.isPlayerId(player.id));
  if (duration <= 900) {
    let inventory = player.getComponent(EntityComponentTypes3.Inventory);
    let grimoire_damage = new ItemStack2(item.typeId, 1);
    let grimoire_dur = grimoire_damage.getComponent(ItemComponentTypes3.Durability);
    let item_dur = item.getComponent(ItemComponentTypes3.Durability);
    grimoire_dur.damage = item_dur.damage + 1;
    if (item_dur.maxDurability != grimoire_dur.damage) {
      let con = inventory.container;
      con.setItem(player.selectedSlotIndex, grimoire_damage);
    }
  }
  let delIndex = magicBookList.findIndex((book) => book.isPlayerId(player.id));
  if (delIndex != -1) {
    magicBookList.splice(delIndex, 1);
  }
  system3.clearRun(magicBook.getIntervalNum());
}
function decrimentGrimoireCount(player, item) {
  let lore = item.getLore();
  if (lore.length > 0) {
    let cont = Number(lore[0].substr(3));
    cont--;
    let inventory = player.getComponent(EntityComponentTypes3.Inventory);
    let con = inventory.container;
    if (cont == 0) {
      let grimoire_damage = new ItemStack2("kurokumaft:grimoire_damage", 1);
      con.setItem(player.selectedSlotIndex, grimoire_damage);
    } else {
      item.setLore(["\u6B8B\u6570\uFF1A" + cont]);
      con.setItem(player.selectedSlotIndex, item);
    }
  }
}

// scripts/magicBlock.ts
import { system as system4, world as world3, EntityComponentTypes as EntityComponentTypes4, ItemStack as ItemStack3, EquipmentSlot as EquipmentSlot3 } from "@minecraft/server";

// scripts/magic/GrimoireBookComponent.ts
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
      { name: "minecraft:disc_fragment", multiValue: 3 },
      { name: "minecraft:disc_fragment_5", multiValue: 5 },
      { name: "minecraft:jukebox", multiValue: 20 },
      { name: "minecraft:noteblock", multiValue: 10 }
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

// scripts/magic/MagicStoneComponet.ts
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

// scripts/magicBlock.ts
import { ActionFormData } from "@minecraft/server-ui";
function magic_lectern_break(player, block) {
  let intervalNum = system4.runInterval(() => {
    let lectern_entity = block.dimension.getEntitiesAtBlockLocation({ x: block.location.x, y: block.location.y + 1, z: block.location.z });
    for (let i = 0; i < lectern_entity.length; i++) {
      if (lectern_entity[i].typeId == "kurokumaft:grimoire_book_entity") {
        lectern_entity[i].runCommand("kill @s");
      }
      if (lectern_entity[i].typeId == "kurokumaft:magic_stone_entity") {
        lectern_entity[i].triggerEvent("on_breaking");
      }
    }
  }, 2);
  system4.runTimeout(() => {
    system4.clearRun(intervalNum);
  }, 4);
}

// scripts/magic/magicAmorEvent.ts
import {
  system as system5,
  EntityComponentTypes as EntityComponentTypes5,
  EquipmentSlot as EquipmentSlot4
} from "@minecraft/server";
function magicAmor(player, damager, projectile, hitVector) {
  let equ = player.getComponent(EntityComponentTypes5.Equippable);
  if (!equ) {
    return;
  }
  let chest = equ.getEquipment(EquipmentSlot4.Chest);
  let legs = equ.getEquipment(EquipmentSlot4.Legs);
  let head = equ.getEquipment(EquipmentSlot4.Head);
  if (chest != void 0) {
    if (damager != void 0 && projectile == void 0) {
      if (chest.typeId == "kurokumaft:stone_magic_chestplate" || chest.typeId == "kurokumaft:nether_stone_magic_chestplate") {
        let view = player.getViewDirection();
        damager.applyDamage(5, { "cause": "entityExplosion" });
        damager.runCommandAsync("particle minecraft:large_explosion  ~~~");
        damager.applyKnockback(Math.round(view.x) * 10, Math.round(view.z) * 10, 10, 1);
      }
      if (chest.typeId == "kurokumaft:lightning_magic_chestplate" || chest.typeId == "kurokumaft:nether_lightning_magic_chest") {
        damager.applyDamage(5, { "cause": "lightning" });
        damager.runCommandAsync("particle kurokumaft:lightning_arrow_particle ~~~");
      }
    }
  }
  if (legs != void 0) {
    if (damager != void 0 && projectile == void 0) {
      if (legs.typeId == "kurokumaft:lightning_magic_leggings" || legs.typeId == "kurokumaft:nether_lightning_magic_leggings") {
        let location = damager.location;
        let randomNum1 = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
        let randomNum2 = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
        let randomInRange1 = Math.floor(Math.random() * 2) == 1 ? -randomNum1 : randomNum1;
        let randomInRange2 = Math.floor(Math.random() * 2) == 1 ? -randomNum2 : randomNum2;
        damager.teleport({ x: location.x + randomInRange1, y: location.y, z: location.z + randomInRange2 }, void 0);
      }
    }
  }
  if (head != void 0) {
    if ((head.typeId == "kurokumaft:lightning_magic_helmet" || head.typeId == "kurokumaft:nether_lightning_magic_helmet") && projectile != void 0) {
      try {
        projectile.clearVelocity();
        projectile.runCommand("particle kurokumaft:lightning_arrow_particle ~~~");
        let intervalNum = system5.runInterval(() => {
          projectile.clearVelocity();
        }, 5);
        system5.runTimeout(() => {
          system5.clearRun(intervalNum);
        }, 30);
      } catch (error) {
      }
    }
    if ((head.typeId == "kurokumaft:wind_magic_helmet" || head.typeId == "kurokumaft:nether_wind_magic_helmet") && projectile != void 0) {
      try {
        projectile.clearVelocity();
        projectile.runCommand("particle kurokumaft:wind_arrow_particle ~~~");
        projectile.applyImpulse({ x: hitVector.x, y: hitVector.y, z: -hitVector.z });
      } catch (error) {
      }
    }
  }
}

// scripts/magic/imperial.ts
function fireStorm(dim, locat) {
  let stand = dim.spawnEntity("kurokumaft:firestormmagic_stand", locat);
  stand.runCommand("tag @s add firestormmagic_self");
}

// scripts/weapon/wand/WandWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot6, GameMode, ItemComponentTypes as ItemComponentTypes5, Player as Player7, world as world4 } from "@minecraft/server";

// scripts/common/ShooterPoints.ts
function getAdjacentSphericalPoints(rotation, location) {
  let r = 1;
  let piNum = 75;
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
        ylocation = location.y + 1.25 + yRota * 1.5;
      } else {
        ylocation = location.y + 1.5 + yRota * 1.25;
      }
      yapply = yRota;
      zlocation = location.z + yRotaz * xRota * 1.75;
      zapply = yRotaz * xRota;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      let xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x + yRotax * xRota * 1.75;
      xapply = yRotax * xRota;
      if (rotation.x >= 45) {
        ylocation = location.y + 1.25 + yRota * 1.5;
      } else {
        ylocation = location.y + 1.25 + yRota * 1.25;
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
        ylocation = location.y + 1.75 + yRota * 1.25;
      } else {
        ylocation = location.y + 1.5 + yRota * 1.25;
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
        ylocation = location.y + 1.75 + yRota * 1.25;
      } else {
        ylocation = location.y + 1.25 + yRota * 1.25;
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
        ylocation = location.y + 1.25 + yRota * 1.5;
      } else {
        ylocation = location.y + 1.5 + yRota * 1.25;
      }
      yapply = yRota;
      zlocation = location.z + yRotaz * xRota * 1.75;
      zapply = yRotaz * xRota;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      let xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x + yRotax * xRota * 1.75;
      xapply = yRotax * xRota;
      if (rotation.x >= 45) {
        ylocation = location.y + 1.25 + yRota * 1.5;
      } else {
        ylocation = location.y + 1.25 + yRota * 1.25;
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
        ylocation = location.y + 1.25 + yRota * 1.5;
      } else {
        ylocation = location.y + 1.5 + yRota * 1.25;
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
        ylocation = location.y + 1.25 + yRota * 1.5;
      } else {
        ylocation = location.y + 1.25 + yRota * 1.25;
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

// scripts/custom/ShooterMagicEvent.ts
function throwing(player, item, throwItem, ranNum) {
  let { xapply, yapply, zapply, xlocation, ylocation, zlocation } = getAdjacentSphericalPoints(player.getRotation(), player.location);
  let bulet = player.dimension.spawnEntity(
    throwItem,
    {
      x: xlocation + ranNum.x,
      y: ylocation + ranNum.y,
      z: zlocation + ranNum.z
    }
  );
  item.amount++;
  bulet.setRotation({ x: 0, y: player.getRotation().y });
  bulet.applyImpulse({ x: xapply * 1.5, y: yapply * 1.5, z: zapply * 1.5 });
}

// scripts/common/ItemDurabilityDamage.ts
import { ItemComponentTypes as ItemComponentTypes4, EntityComponentTypes as EntityComponentTypes6 } from "@minecraft/server";
async function ItemDurabilityDamageEvent(entity, item, slot) {
  let equ = entity.getComponent(EntityComponentTypes6.Equippable);
  let durability = item.getComponent(ItemComponentTypes4.Durability);
  let dChange = durability.getDamageChance(Math.ceil(getRandomInRange(0, 3)));
  print(dChange);
  if (durability.damage + dChange >= durability.maxDurability) {
    equ.setEquipment(slot, void 0);
  } else {
    durability.damage = durability.damage + dChange;
    equ.setEquipment(slot, item);
  }
}

// scripts/weapon/wand/WandWeaponMagic.ts
var WandHitObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_wand",
    event: "fire/burst_rondo",
    sendMsg: "\xA7c\u30D0\u30FC\u30B9\u30C8\u30ED\u30F3\u30C9"
  },
  {
    itemName: "kurokumaft:water_wand",
    event: "water/splash",
    sendMsg: "\xA7b\u30B9\u30D7\u30E9\u30C3\u30B7\u30E5"
  },
  {
    itemName: "kurokumaft:wind_wand",
    event: "wind/wind_edge",
    sendMsg: "\xA7a\u30A6\u30A3\u30F3\u30C9\u30A8\u30C3\u30B8"
  },
  {
    itemName: "kurokumaft:stone_wand",
    event: "stone/sand_blast",
    sendMsg: "\xA77\u30B5\u30F3\u30C9\u30D6\u30E9\u30B9\u30C8"
  },
  {
    itemName: "kurokumaft:lightning_wand",
    event: "lightning/spark",
    sendMsg: "\xA76\u30B9\u30D1\u30FC\u30AF"
  },
  {
    itemName: "kurokumaft:snow_wand",
    event: "ice/powdered_snow",
    sendMsg: "\xA7f\u30D1\u30A6\u30C0\u30FC\u30B9\u30CE\u30FC"
  },
  {
    itemName: "kurokumaft:dark_wand",
    event: "dark/dark_bread",
    sendMsg: "\xA78\u30C0\u30FC\u30AF\u30D6\u30EC\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:light_wand",
    event: "light/light_bread",
    sendMsg: "\xA7e\u30E9\u30A4\u30C8\u30D6\u30EC\u30FC\u30C9"
  }
]);
var BallMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_wand",
    event: "kurokumaft:fireballmagic",
    sendMsg: "\xA7c\u30D5\u30A1\u30A4\u30E4\u30FC\u30DC\u30FC\u30EB"
  },
  {
    itemName: "kurokumaft:water_wand",
    event: "kurokumaft:waterballmagic",
    sendMsg: "\xA7b\u30A6\u30A9\u30FC\u30BF\u30FC\u30DC\u30FC\u30EB"
  },
  {
    itemName: "kurokumaft:wind_wand",
    event: "kurokumaft:windcuttermagic",
    sendMsg: "\xA7a\u30A6\u30A3\u30F3\u30C9\u30AB\u30C3\u30BF\u30FC"
  },
  {
    itemName: "kurokumaft:stone_wand",
    event: "kurokumaft:stonebarrettemagic",
    sendMsg: "\xA77\u30B9\u30C8\u30FC\u30F3\u30D0\u30EC\u30C3\u30C8"
  },
  {
    itemName: "kurokumaft:lightning_wand",
    event: "kurokumaft:lightningboltmagic",
    sendMsg: "\xA76\u30E9\u30A4\u30C8\u30CB\u30F3\u30B0\u30DC\u30EB\u30C8"
  }
]);
var WallMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_wand",
    event: "fire/firewall",
    sendMsg: "\xA7c\u30D5\u30A1\u30A4\u30A2\u30A6\u30A9\u30FC\u30EB"
  },
  {
    itemName: "kurokumaft:water_wand",
    event: "water/waterwall",
    sendMsg: "\xA7b\u30A6\u30A9\u30FC\u30BF\u30FC\u30A6\u30A9\u30FC\u30EB"
  },
  {
    itemName: "kurokumaft:wind_wand",
    event: "wind/windwall",
    sendMsg: "\xA7a\u30A6\u30A3\u30F3\u30C9\u30A6\u30A9\u30FC\u30EB"
  },
  {
    itemName: "kurokumaft:stone_wand",
    event: "stone/stonewall",
    sendMsg: "\xA77\u30B9\u30C8\u30FC\u30F3\u30A6\u30A9\u30FC\u30EB"
  },
  {
    itemName: "kurokumaft:lightning_wand",
    event: "lightning/lightningwall",
    sendMsg: "\xA76\u30E9\u30A4\u30C8\u30CB\u30F3\u30B0\u30A6\u30A9\u30FC\u30EB"
  }
]);
var OtherUpMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:snow_wand",
    event: "ice/deep_snow",
    sendMsg: "\xA7f\u30C7\u30A3\u30FC\u30D7\u30B9\u30CE\u30FC"
  },
  {
    itemName: "kurokumaft:dark_wand",
    event: "dark/absorption",
    sendMsg: "\xA78\u30A2\u30D6\u30BD\u30FC\u30D7\u30B7\u30E7\u30F3"
  },
  {
    itemName: "kurokumaft:light_wand",
    event: "light/healing",
    sendMsg: "\xA7e\u30D2\u30FC\u30EA\u30F3\u30B0"
  }
]);
var OtherDownMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:snow_wand",
    event: "ice/deep_snow",
    sendMsg: "\xA7f\u30C7\u30A3\u30FC\u30D7\u30B9\u30CE\u30FC"
  },
  {
    itemName: "kurokumaft:dark_wand",
    event: "dark/invisibility",
    sendMsg: "\xA78\u30A4\u30F3\u30D3\u30B8\u30D6\u30EB"
  },
  {
    itemName: "kurokumaft:light_wand",
    event: "light/recovery",
    sendMsg: "\xA7e\u30EA\u30AB\u30D0\u30EA\u30FC"
  }
]);
var WandWeaponMagic = class {
  // 通常攻撃
  onHitEntity(event) {
    let itemStack = event.itemStack;
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let effect = event.hadEffect;
    if (!itemStack || hitEntity instanceof Player7 && !world4.gameRules.pvp) {
      return;
    }
    let wandMagicObject = WandHitObjects.find((obj) => obj.itemName == itemStack.typeId);
    attackEntity.runCommand("/function magic/" + wandMagicObject.event);
    attackEntity.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + wandMagicObject.sendMsg + '"}]}');
  }
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    let xran = parseFloat(getRandomInRange(-0.1, 0.5).toFixed(3));
    let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    if (player.getGameMode() != GameMode.creative) {
      ItemDurabilityDamageEvent(player, itemStack, EquipmentSlot6.Mainhand);
    }
    if (world4.gameRules.pvp) {
      let ballMagicObject = BallMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
      if (ballMagicObject) {
        throwing(player, itemStack, ballMagicObject.event, { x: xran, y: yran, z: zran });
        player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + ballMagicObject.sendMsg + '"}]}');
      } else {
        if (player.isSneaking) {
          let otherDownMagicObject = OtherDownMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
          if (otherDownMagicObject) {
            player.runCommand("/function magic/" + otherDownMagicObject.event);
            player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + otherDownMagicObject.sendMsg + '"}]}');
          }
        } else {
          let otherUpMagicObject = OtherUpMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
          if (otherUpMagicObject) {
            player.runCommand("/function magic/" + otherUpMagicObject.event);
            player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + otherUpMagicObject.sendMsg + '"}]}');
          }
        }
      }
    } else {
      let ballMagicObject = BallMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
      if (ballMagicObject) {
        throwing(player, itemStack, ballMagicObject.event, { x: xran, y: yran, z: zran });
        player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + ballMagicObject.sendMsg + '"}]}');
      } else {
        if (player.isSneaking) {
          let otherDownMagicObject = OtherDownMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
          if (otherDownMagicObject) {
            player.runCommand("/function magic/" + otherDownMagicObject.event);
            player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + otherDownMagicObject.sendMsg + '"}]}');
          }
        } else {
          let otherUpMagicObject = OtherUpMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
          if (otherUpMagicObject) {
            player.runCommand("/function magic/" + otherUpMagicObject.event);
            player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + otherUpMagicObject.sendMsg + '"}]}');
          }
        }
      }
    }
    let cool = itemStack.getComponent(ItemComponentTypes5.Cooldown);
    cool.startCooldown(player);
  }
  // ブロッククリック
  onUseOn(event) {
  }
};

// scripts/weapon/shield/ShieldMagic.ts
var ShieldMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_wand",
    event: "kurokumaft:fireballmagic",
    sendMsg: "\xA7c\u30D5\u30A1\u30A4\u30E4\u30FC\u30DC\u30FC\u30EB"
  },
  {
    itemName: "kurokumaft:water_wand",
    event: "kurokumaft:waterballmagic",
    sendMsg: "\xA7b\u30A6\u30A9\u30FC\u30BF\u30FC\u30DC\u30FC\u30EB"
  },
  {
    itemName: "kurokumaft:wind_wand",
    event: "kurokumaft:windcuttermagic",
    sendMsg: "\xA7a\u30A6\u30A3\u30F3\u30C9\u30AB\u30C3\u30BF\u30FC"
  },
  {
    itemName: "kurokumaft:stone_wand",
    event: "kurokumaft:stonebarrettemagic",
    sendMsg: "\xA77\u30B9\u30C8\u30FC\u30F3\u30D0\u30EC\u30C3\u30C8"
  },
  {
    itemName: "kurokumaft:lightning_wand",
    event: "kurokumaft:lightningboltmagic",
    sendMsg: "\xA76\u30E9\u30A4\u30C8\u30CB\u30F3\u30B0\u30DC\u30EB\u30C8"
  }
]);
var ShieldMagic = class {
  // 通常攻撃
  onBeforeDurabilityDamage(event) {
    print("onBeforeDurabilityDamage");
    let attackEntity = event.attackingEntity;
    let damage = event.durabilityDamage;
    let itemStack = event.itemStack;
    let hitEntity = event.hitEntity;
  }
};

// scripts/weapon/sword/SwordWeaponMagic.ts
import { Player as Player8, GameMode as GameMode2, EquipmentSlot as EquipmentSlot7 } from "@minecraft/server";
var SwordHitObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_sword",
    event: "fire/fire_sword",
    sendMsg: "\xA7c\u30D5\u30EC\u30A4\u30E0\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:water_magic_sword",
    event: "water/water_sword",
    sendMsg: "\xA7b\u30A6\u30A9\u30FC\u30BF\u30FC\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:wind_magic_sword",
    event: "wind/wind_sword",
    sendMsg: "\xA7a\u30A6\u30A3\u30F3\u30C9\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:stone_magic_sword",
    event: "stone/stone_sword",
    sendMsg: "\xA77\u30B9\u30C8\u30FC\u30F3\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:thunder_magic_sword",
    event: "lightning/thunder_sword",
    sendMsg: "\xA76\u30B5\u30F3\u30C0\u30FC\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:ice_magic_sword",
    event: "ice/ice_sword",
    sendMsg: "\xA7f\u30A2\u30A4\u30B9\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:dark_magic_sword",
    event: "dark/dark_sword",
    sendMsg: "\xA78\u30C0\u30FC\u30AF\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:holly_magic_sword",
    event: "light/holly_sword",
    sendMsg: "\xA7e\u30DB\u30FC\u30EA\u30FC\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:rainbow_magic_sword",
    event: "rainbow/rainbow_sword",
    sendMsg: "\xA75\u30EC\xA71\u30A4\xA79\u30F3\xA7a\u30DC\u30FC\xA7e\u30BD\xA76\u30FC\xA74\u30C9"
  },
  {
    itemName: "kurokumaft:phoenix_sword",
    event: "fire/fire_sword",
    sendMsg: "\xA7c\u30D5\u30EC\u30A4\u30E0\u30BD\u30FC\u30C9"
  }
]);
var SwordHitMonsObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_sword",
    event: "fire/fire_sword",
    sendMsg: "\xA7c\u30D5\u30EC\u30A4\u30E0\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:water_magic_sword",
    event: "water/water_sword",
    sendMsg: "\xA7b\u30A6\u30A9\u30FC\u30BF\u30FC\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:wind_magic_sword",
    event: "wind/wind_sword",
    sendMsg: "\xA7a\u30A6\u30A3\u30F3\u30C9\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:stone_magic_sword",
    event: "stone/stone_sword",
    sendMsg: "\xA77\u30B9\u30C8\u30FC\u30F3\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:thunder_magic_sword",
    event: "lightning/thunder_sword",
    sendMsg: "\xA76\u30B5\u30F3\u30C0\u30FC\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:ice_magic_sword",
    event: "ice/ice_sword",
    sendMsg: "\xA7f\u30A2\u30A4\u30B9\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:dark_magic_sword",
    event: "dark/dark_sword",
    sendMsg: "\xA78\u30C0\u30FC\u30AF\u30BD\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:holly_magic_sword",
    event: "light/holly_sword",
    sendMsg: "\xA7e\u30DB\u30FC\u30EA\u30FC\u30BD\u30FC\u30C9"
  }
]);
var SwordChargeObjects = Object.freeze([
  {
    itemName: "kurokumaft:phoenix_sword",
    event: "fire/blaze_burst",
    sendMsg: "\xA7c\u30D6\u30EC\u30A4\u30BA\u30D0\u30FC\u30B9\u30C8"
  }
]);
var SwordWeaponMagic = class {
  // 通常攻撃
  onHitEntity(event) {
    let itemStack = event.itemStack;
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let effect = event.hadEffect;
    if (!itemStack) {
      return;
    }
    let swordMagicObject = SwordHitObjects.find((obj) => obj.itemName == itemStack.typeId);
    hitEntity.runCommand("/function magic/" + swordMagicObject.event);
    if (attackEntity instanceof Player8 && attackEntity.getGameMode() != GameMode2.creative) {
      ItemDurabilityDamageEvent(attackEntity, itemStack, EquipmentSlot7.Mainhand);
    }
  }
  // チャージ完了
  onCompleteUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    if (!itemStack) {
      return;
    }
    let swordChargeMagicObject = SwordChargeObjects.find((obj) => obj.itemName == itemStack.typeId);
    player.runCommand("/function magic/" + swordChargeMagicObject.event);
    if (player.getGameMode() != GameMode2.creative) {
      ItemDurabilityDamageEvent(player, itemStack, EquipmentSlot7.Mainhand);
    }
  }
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
  }
  // ブロッククリック
  onUseOn(event) {
  }
};
var SwordWeaponMagicMons = class {
  // 通常攻撃
  onHitEntity(event) {
    let itemStack = event.itemStack;
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let effect = event.hadEffect;
    if (!itemStack) {
      return;
    }
    let swordMagicObject = SwordHitMonsObjects.find((obj) => obj.itemName == itemStack.typeId);
    hitEntity.runCommand("/function monster/" + swordMagicObject.event);
    attackEntity.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + swordMagicObject.sendMsg + '"}]}');
    ItemDurabilityDamageEvent(attackEntity, itemStack, EquipmentSlot7.Mainhand);
  }
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
  }
  // ブロッククリック
  onUseOn(event) {
  }
};

// scripts/custom/CustomComponentRegistry.ts
function registerCustomComponentFunction(initEvent) {
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:wand_magic", new WandWeaponMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:sword_magic", new SwordWeaponMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:sword_magic_monster", new SwordWeaponMagicMons());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:shield_magic", new ShieldMagic());
}

// scripts/magic_script.ts
var guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];
world6.beforeEvents.worldInitialize.subscribe((initEvent) => {
  registerCustomComponentFunction(initEvent);
});
world6.afterEvents.entityHitEntity.subscribe((event) => {
  var dameger = event.damagingEntity;
  var hitEn = event.hitEntity;
  if (hitEn.typeId == "minecraft:player") {
    shieldGuard(hitEn, true);
    shieldCounter(hitEn, dameger);
    magicAmor(hitEn, dameger, void 0, void 0);
  }
});
world6.afterEvents.projectileHitEntity.subscribe((event) => {
  var projectileEn = event.projectile;
  var hitEn = event.getEntityHit().entity;
  var dameger = event.source;
  var hitVector = event.hitVector;
  if (hitEn != void 0 && hitEn.typeId == "minecraft:player") {
    shieldGuard(hitEn, false);
    shieldCounter(hitEn, dameger);
    magicAmor(hitEn, dameger, projectileEn, hitVector);
  }
  if (projectileEn) {
    if (projectileEn.typeId == "kurokumaft:firestormmagic") {
      fireStorm(event.dimension, event.location);
    }
  }
});
world6.afterEvents.projectileHitBlock.subscribe((event) => {
  var projectileEn = event.projectile;
  if (projectileEn) {
    if (projectileEn.typeId == "kurokumaft:firestormmagic") {
      fireStorm(event.dimension, event.location);
    }
  }
});
world6.afterEvents.entityHurt.subscribe((event) => {
  var damageSource = event.damageSource;
  var hitEn = event.hurtEntity;
  if (hitEn != void 0 && hitEn.typeId == "minecraft:player" && damageSource.cause != "void") {
    if (guards.indexOf(damageSource.cause) != -1) {
      shieldGuard(hitEn, false);
    }
  }
});
world6.afterEvents.itemCompleteUse.subscribe((event) => {
  var en = event.source;
  var item = event.itemStack;
  if (en != void 0 && en.typeId == "minecraft:player" && item != void 0) {
    if (item.typeId === "kurokumaft:repatriation_fruit") {
      home_tp(en, item);
    }
  }
});
world6.afterEvents.itemUse.subscribe((event) => {
  var player = event.source;
  var item = event.itemStack;
  if (item != void 0) {
    if (item.typeId == "kurokumaft:grimoire_mowing") {
      mowing_use(player, item);
    } else if (item.typeId == "kurokumaft:grimoire_music_sound") {
      music_sound_use(player, item);
    } else if (item.typeId == "kurokumaft:fire_grimoire") {
      grimoire_summon_use(player, item);
    }
  }
});
world6.afterEvents.itemReleaseUse.subscribe((event) => {
  var player = event.source;
  var item = event.itemStack;
  var duration = event.useDuration;
  if (item != void 0) {
    if (item.typeId == "kurokumaft:fire_grimoire") {
      grimoire_summon_Release(player, item, duration);
    }
  }
});
world6.afterEvents.itemUseOn.subscribe((event) => {
  var player = event.source;
  var item = event.itemStack;
  var block = event.block;
  var blockFace = event.blockFace;
  if (item != void 0) {
    if (item.typeId == "kurokumaft:grimoire_torchlight") {
      torchlight_use(player, block, item);
    } else if (item.typeId == "kurokumaft:grimoire_ignited") {
      ignited_use_af(player, block, blockFace, item);
    } else if (item.typeId == "kurokumaft:grimoire_water") {
      water_use(player, block, blockFace, item);
    } else if (item.typeId == "kurokumaft:grimoire_flower_garden") {
      flower_garden_use(player, block, blockFace, item);
    } else if (item.typeId == "kurokumaft:grimoire_growth") {
      growth_use(player, block, blockFace, item);
    }
  }
});
world6.beforeEvents.itemUseOn.subscribe((event) => {
  var player = event.source;
  var item = event.itemStack;
  var block = event.block;
  var blockFace = event.blockFace;
  if (item != void 0) {
    if (block.typeId != "minecraft:tnt" && item.typeId == "kurokumaft:grimoire_ignited") {
      ignited_use_be(player, block, blockFace, item);
    }
  }
});
world6.beforeEvents.playerBreakBlock.subscribe((event) => {
  var player = event.player;
  var block = event.block;
  if (player != void 0) {
    if (block.typeId == "kurokumaft:magic_lectern") {
      magic_lectern_break(player, block);
    }
  }
});
world6.afterEvents.entityLoad.subscribe((event) => {
  var entity = event.entity;
});
world6.afterEvents.entitySpawn.subscribe((event) => {
  var entity = event.entity;
  var cause = event.cause;
});

//# sourceMappingURL=../debug/magic_script.js.map
