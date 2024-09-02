// scripts/magic_script.ts
import { world as world18 } from "@minecraft/server";

// scripts/items/weapon/shield/shieldEvent.ts
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
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
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
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      let xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    }
  } else if (rotation.y >= 0 && rotation.y <= 90) {
    let yRotax = rotation.y / piNum;
    let yRotaz = -(rotation.y - 90) / piNum;
    let yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      let xRota = (rotation.x + 90) / piNum;
      xlocation = location.x - yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      let xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x - yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    }
  } else if (rotation.y < -90 && rotation.y > -180) {
    let yRotax = (rotation.y + 180) / piNum;
    let yRotaz = (rotation.y + 90) / piNum;
    let yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      let xRota = (rotation.x + 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      let xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x + yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    }
  } else if (rotation.y > 90 && rotation.y <= 180) {
    let yRotax = -(rotation.y - 180) / piNum;
    let yRotaz = -(rotation.y - 90) / piNum;
    let yRota = -(rotation.x / piNum);
    if (rotation.x >= -90 && rotation.x < 0) {
      let xRota = (rotation.x + 90) / piNum;
      xlocation = location.x - yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    } else if (rotation.x >= 0 && rotation.x <= 90) {
      let xRota = -(rotation.x - 90) / piNum;
      xlocation = location.x - yRotax * xRota * point;
      ylocation = location.y + 1.5 + yRota * point;
      zlocation = location.z + yRotaz * xRota * point;
    }
  }
  return { xlocation, ylocation, zlocation };
}

// scripts/items/weapon/shield/shieldEvent.ts
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
  EntityComponentTypes as EntityComponentTypes4,
  Direction,
  ItemComponentTypes as ItemComponentTypes4
} from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

// scripts/common/ItemDurabilityDamage.ts
import { ItemStack as ItemStack2, ItemComponentTypes as ItemComponentTypes3, EntityComponentTypes as EntityComponentTypes3 } from "@minecraft/server";
async function ItemDurabilityDamage(entity, item, slot) {
  let equ = entity.getComponent(EntityComponentTypes3.Equippable);
  let durability = item.getComponent(ItemComponentTypes3.Durability);
  let dChange = durability.getDamageChance(Math.ceil(getRandomInRange(0, 3)));
  if (durability.damage + dChange >= durability.maxDurability) {
    equ.setEquipment(slot, void 0);
  } else {
    durability.damage = durability.damage + dChange;
    equ.setEquipment(slot, item);
  }
}
async function SummonGrimoireDurabilityDamage(entity, item, slot) {
  let equ = entity.getComponent(EntityComponentTypes3.Equippable);
  let durability = item.getComponent(ItemComponentTypes3.Durability);
  if (durability.damage + 1 >= durability.maxDurability) {
    equ.setEquipment(slot, void 0);
  } else {
    durability.damage = durability.damage + 1;
    equ.setEquipment(slot, item);
  }
}
async function decrimentGrimoireCount(player, item) {
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

// scripts/magicItem.ts
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
  let itemCool = item.getComponent(ItemComponentTypes4.Cooldown);
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

// scripts/magicBlock.ts
import { system as system4, world as world3, EntityComponentTypes as EntityComponentTypes5, ItemStack as ItemStack4, EquipmentSlot as EquipmentSlot4 } from "@minecraft/server";

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

// scripts/items/weapon/armor/magicAmorHitEvent.ts
import { system as system5, EntityComponentTypes as EntityComponentTypes6, EquipmentSlot as EquipmentSlot5 } from "@minecraft/server";
async function hitMagicAmor(player, damager, projectile, hitVector) {
  let equ = player.getComponent(EntityComponentTypes6.Equippable);
  if (!equ) {
    return;
  }
  let chest = equ.getEquipment(EquipmentSlot5.Chest);
  let legs = equ.getEquipment(EquipmentSlot5.Legs);
  let head = equ.getEquipment(EquipmentSlot5.Head);
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

// scripts/items/weapon/wand/WandWeaponMagic.ts
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
function shooting(player, throwItem, ranNum, seepd, event) {
  let { xapply, yapply, zapply, xlocation, ylocation, zlocation } = getAdjacentSphericalPoints(player.getRotation(), player.location);
  let bulet = player.dimension.spawnEntity(
    throwItem,
    {
      x: xlocation + ranNum.x,
      y: ylocation + ranNum.y,
      z: zlocation + ranNum.z
    }
  );
  if (event) {
    bulet.triggerEvent(event);
  }
  bulet.applyImpulse({ x: xapply * seepd, y: yapply * seepd, z: zapply * seepd });
}

// scripts/items/weapon/wand/WandWeaponMagic.ts
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
      ItemDurabilityDamage(player, itemStack, EquipmentSlot6.Mainhand);
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
};

// scripts/items/weapon/shield/ShieldMagic.ts
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

// scripts/items/weapon/sword/SwordWeaponMagic.ts
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
      ItemDurabilityDamage(attackEntity, itemStack, EquipmentSlot7.Mainhand);
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
      ItemDurabilityDamage(player, itemStack, EquipmentSlot7.Mainhand);
    }
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
    ItemDurabilityDamage(attackEntity, itemStack, EquipmentSlot7.Mainhand);
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

// scripts/items/weapon/bow/BowWeaponMagic.ts
import { GameMode as GameMode3, EquipmentSlot as EquipmentSlot8, system as system6 } from "@minecraft/server";
var BowChargeObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_bow",
    event: "kurokumaft:fire_magic_arrow",
    sendMsg: "\xA7c\u30D5\u30EC\u30A4\u30E0\u30A2\u30ED\u30FC",
    maxduration: 30,
    addition: 1.5
  },
  {
    itemName: "kurokumaft:water_magic_bow",
    event: "kurokumaft:water_magic_arrow",
    sendMsg: "\xA7b\u30A6\u30A9\u30FC\u30BF\u30FC\u30A2\u30ED\u30FC",
    maxduration: 10,
    addition: 1.5
  },
  {
    itemName: "kurokumaft:wind_magic_bow",
    event: "kurokumaft:wind_magic_arrow",
    sendMsg: "\xA7a\u30A6\u30A3\u30F3\u30C9\u30A2\u30ED\u30FC",
    maxduration: 1,
    addition: 2.5
  },
  {
    itemName: "kurokumaft:stone_magic_bow",
    event: "kurokumaft:stone_magic_arrow",
    sendMsg: "\xA77\u30ED\u30C3\u30AF\u30A2\u30ED\u30FC",
    maxduration: 20,
    addition: 0.75
  },
  {
    itemName: "kurokumaft:lightning_magic_bow",
    event: "kurokumaft:lightning_magic_arrow",
    sendMsg: "\xA76\u30E9\u30A4\u30C8\u30CB\u30F3\u30B0\u30A2\u30ED\u30FC",
    maxduration: 20,
    addition: 2
  },
  {
    itemName: "kurokumaft:ice_magic_bow",
    event: "kurokumaft:ice_magic_arrow",
    sendMsg: "\xA7f\u30A2\u30A4\u30B9\u30A2\u30ED\u30FC",
    maxduration: 15,
    addition: 1.5
  },
  {
    itemName: "kurokumaft:dark_magic_bow",
    event: "kurokumaft:dark_magic_arrow",
    sendMsg: "\xA78\u30C0\u30FC\u30AF\u30A2\u30ED\u30FC",
    maxduration: 10,
    addition: 1.5
  },
  {
    itemName: "kurokumaft:holly_magic_bow",
    event: "kurokumaft:holly_magic_arrow",
    sendMsg: "\xA7e\u30DB\u30FC\u30EA\u30FC\u30A2\u30ED\u30FC",
    maxduration: 10,
    addition: 1.5
  }
]);
var BowShotMagic = class {
  // チャージ完了
  onCompleteUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
  }
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    if (!itemStack) {
      return;
    }
  }
};
async function magicBowShot(player, itemStack, duration) {
  player.setDynamicProperty("BowShotMagicCharge", false);
  let bowMagicObject = BowChargeObjects.find((obj) => obj.itemName == itemStack.typeId);
  if (bowMagicObject) {
    let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let speed = Math.ceil(clamp(-duration / bowMagicObject.maxduration, 0, 3) * bowMagicObject.addition);
    if (itemStack.typeId == "kurokumaft:wind_magic_bow") {
      let intervalNum = system6.runInterval(() => {
        shooting(player, bowMagicObject.event, { x: xran, y: yran, z: zran }, speed, void 0);
      }, 2);
      system6.runTimeout(() => {
        system6.clearRun(intervalNum);
      }, 10);
    } else {
      shooting(player, bowMagicObject.event, { x: xran, y: yran, z: zran }, speed, void 0);
    }
    if (player.getGameMode() != GameMode3.creative) {
      ItemDurabilityDamage(player, itemStack, EquipmentSlot8.Mainhand);
    }
  }
}

// scripts/player/armorEquipment.ts
import { EntityComponentTypes as EntityComponentTypes11, EquipmentSlot as EquipmentSlot13, system as system11, world as world10 } from "@minecraft/server";

// scripts/items/weapon/armor/MagicHelmetSurveillance.ts
import { EntityComponentTypes as EntityComponentTypes7, EquipmentSlot as EquipmentSlot9, system as system7, TicksPerSecond } from "@minecraft/server";
var MagicHelmetObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_helmet",
    func: fireResistanceEffect,
    delay: TicksPerSecond * 10,
    removeFunc: fireResistanceEffectReset
  },
  {
    itemName: "kurokumaft:water_magic_helmet",
    func: waterBreathingEffect,
    delay: TicksPerSecond * 10,
    removeFunc: waterBreathingEffectReset
  },
  {
    itemName: "kurokumaft:stone_magic_helmet",
    func: resistanceEffect,
    delay: TicksPerSecond * 10,
    removeFunc: resistanceEffectReset
  },
  {
    itemName: "kurokumaft:ice_magic_helmet",
    func: nightVisionEffect,
    delay: TicksPerSecond * 10,
    removeFunc: nightVisionEffectReset
  },
  {
    itemName: "kurokumaft:nether_fire_magic_helmet",
    func: fireResistanceEffect,
    delay: TicksPerSecond * 10,
    removeFunc: fireResistanceEffectReset
  },
  {
    itemName: "kurokumaft:nether_water_magic_helmet",
    func: waterBreathingEffect,
    delay: TicksPerSecond * 10,
    removeFunc: waterBreathingEffectReset
  },
  {
    itemName: "kurokumaft:nether_stone_magic_helmet",
    func: resistanceEffect,
    delay: TicksPerSecond * 10,
    removeFunc: resistanceEffectReset
  },
  {
    itemName: "kurokumaft:nether_ice_magic_helmet",
    func: nightVisionEffect,
    delay: TicksPerSecond * 10,
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
    let equItem = MagicHelmetObjects.find((obj) => obj.itemName == this.itemStack.typeId);
    let equ = this.player.getComponent(EntityComponentTypes7.Equippable);
    let head = equ.getEquipment(EquipmentSlot9.Head);
    if (head != null && head.typeId == equItem.itemName) {
      this.player.setDynamicProperty("magic_helmet_equ", true);
      equItem.func(this.player);
      system7.runTimeout(() => {
        system7.run(this.checkJob.bind(this));
      }, equItem.delay);
    } else {
      equItem.removeFunc(this.player);
      this.player.setDynamicProperty("magic_helmet_equ", false);
    }
  }
};
async function fireResistanceEffect(player) {
  player.addEffect("fire_resistance", TicksPerSecond * 60, {
    amplifier: 5,
    showParticles: false
  });
}
async function waterBreathingEffect(player) {
  player.addEffect("water_breathing", TicksPerSecond * 60, {
    amplifier: 5,
    showParticles: false
  });
}
async function resistanceEffect(player) {
  player.addEffect("resistance", TicksPerSecond * 60, {
    amplifier: 3,
    showParticles: false
  });
}
async function nightVisionEffect(player) {
  player.addEffect("night_vision", TicksPerSecond * 60, {
    amplifier: 10,
    showParticles: false
  });
}
async function fireResistanceEffectReset(player) {
  player.removeEffect("fire_resistance");
}
async function waterBreathingEffectReset(player) {
  player.removeEffect("water_breathing");
}
async function resistanceEffectReset(player) {
  player.removeEffect("resistance");
}
async function nightVisionEffectReset(player) {
  player.removeEffect("night_vision");
}

// scripts/items/weapon/armor/MagicChestSurveillance.ts
import { EntityComponentTypes as EntityComponentTypes8, EquipmentSlot as EquipmentSlot10, system as system8, TicksPerSecond as TicksPerSecond2 } from "@minecraft/server";
var MagicChestObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_chestplate",
    func: fireAttackUp,
    delay: TicksPerSecond2,
    removeFunc: fireAttackReset
  },
  {
    itemName: "kurokumaft:water_magic_chestplate",
    func: waterHealthUp,
    delay: TicksPerSecond2 * 5,
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
    delay: TicksPerSecond2,
    removeFunc: fireAttackReset
  },
  {
    itemName: "kurokumaft:nether_water_magic_chestplate",
    func: waterHealthUp,
    delay: TicksPerSecond2 * 5,
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
    let equItem = MagicChestObjects.find((obj) => obj.itemName == this.itemStack.typeId);
    let equ = this.player.getComponent(EntityComponentTypes8.Equippable);
    let chest = equ.getEquipment(EquipmentSlot10.Chest);
    if (chest != null && chest.typeId == equItem.itemName) {
      this.player.setDynamicProperty("magic_chest_equ", true);
      equItem.func(this.player);
      system8.runTimeout(() => {
        system8.run(this.checkJob.bind(this));
      }, equItem.delay);
    } else {
      equItem.removeFunc(this.player);
      this.player.setDynamicProperty("magic_Chest_equ", false);
    }
  }
};
async function fireAttackUp(player) {
  player.runCommand("/event entity @s kurokumaft:attack20_up");
}
async function waterHealthUp(player) {
  player.runCommand("/event entity @s kurokumaft:health40_up");
}
async function lavaFreeze(player) {
  player.runCommand("/execute as @s if block ^1^1^ lava run setblock ^1^1^ air");
  player.runCommand("/execute as @s if block ^-1^1^ lava run setblock ^-1^1^ air");
  player.runCommand("/execute as @s if block ^^1^1 lava run setblock ^^1^1 air");
  player.runCommand("/execute as @s if block ^^1^-1 lava run setblock ^^1^-1 air");
  player.runCommand("/execute as @s if block ^^1^-1 lava run setblock ^^1^-1 air");
  player.runCommand("/execute as @s if block ^-1^2^ lava run setblock ^-1^2^ air");
  player.runCommand("/execute as @s if block ^^2^1 lava run setblock ^^2^1 air");
  player.runCommand("/execute as @s if block ^^2^-1 lava run setblock ^^2^-1 air");
  player.runCommand("/execute as @s if block ^^3^ lava run setblock ^^3^ air");
}
async function fireAttackReset(player) {
  player.runCommand("/event entity @s kurokumaft:attack_down");
}
async function waterHealthReset(player) {
  player.runCommand("/event entity @s kurokumaft:health_down");
}
async function lavaFreezeReset(player) {
}

// scripts/items/weapon/armor/MagicLeggingsSurveillance.ts
import { EntityComponentTypes as EntityComponentTypes9, EquipmentSlot as EquipmentSlot11, system as system9, TicksPerSecond as TicksPerSecond3 } from "@minecraft/server";
var MagicLeggingsObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_leggings",
    func: jumpBoostEffect,
    delay: TicksPerSecond3 * 10,
    removeFunc: jumpBoostEffectReset
  },
  {
    itemName: "kurokumaft:water_magic_leggings",
    func: waterRegenerationEffect,
    delay: TicksPerSecond3 * 10,
    removeFunc: waterRegenerationEffectReset
  },
  {
    itemName: "kurokumaft:ice_magic_leggings",
    func: iceResistanceEffect,
    delay: TicksPerSecond3 * 10,
    removeFunc: iceResistanceEffectReset
  },
  {
    itemName: "kurokumaft:nether_fire_magic_leggings",
    func: jumpBoostEffect,
    delay: TicksPerSecond3 * 10,
    removeFunc: jumpBoostEffectReset
  },
  {
    itemName: "kurokumaft:nether_water_magic_leggings",
    func: waterRegenerationEffect,
    delay: TicksPerSecond3 * 10,
    removeFunc: waterRegenerationEffectReset
  },
  {
    itemName: "kurokumaft:nether_ice_magic_leggings",
    func: iceResistanceEffect,
    delay: TicksPerSecond3 * 10,
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
    let equItem = MagicLeggingsObjects.find((obj) => obj.itemName == this.itemStack.typeId);
    let equ = this.player.getComponent(EntityComponentTypes9.Equippable);
    let leg = equ.getEquipment(EquipmentSlot11.Legs);
    if (leg != null && leg.typeId == equItem.itemName) {
      this.player.setDynamicProperty("magic_leg_equ", true);
      equItem.func(this.player);
      system9.runTimeout(() => {
        system9.run(this.checkJob.bind(this));
      }, equItem.delay);
    } else {
      equItem.removeFunc(this.player);
      this.player.setDynamicProperty("magic_leg_equ", false);
    }
  }
};
async function jumpBoostEffect(player) {
  player.addEffect("jump_boost", TicksPerSecond3 * 60, {
    amplifier: 1,
    showParticles: false
  });
}
async function waterRegenerationEffect(player) {
  player.addEffect("regeneration", TicksPerSecond3 * 60, {
    amplifier: 2,
    showParticles: false
  });
}
async function iceResistanceEffect(player) {
  player.addEffect("fire_resistance", TicksPerSecond3 * 60, {
    amplifier: 5,
    showParticles: false
  });
}
async function jumpBoostEffectReset(player) {
  player.removeEffect("jump_boost");
}
async function waterRegenerationEffectReset(player) {
  player.removeEffect("regeneration");
}
async function iceResistanceEffectReset(player) {
  player.removeEffect("fire_resistance");
}

// scripts/items/weapon/armor/MagicBootsSurveillance.ts
import { EntityComponentTypes as EntityComponentTypes10, EquipmentSlot as EquipmentSlot12, system as system10, TicksPerSecond as TicksPerSecond4 } from "@minecraft/server";
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
    delay: TicksPerSecond4 * 1,
    removeFunc: waterSpeedReset
  },
  {
    itemName: "kurokumaft:wind_magic_boots",
    func: windSpeedUp,
    delay: TicksPerSecond4 * 1,
    removeFunc: windSpeedReset
  },
  {
    itemName: "kurokumaft:lightning_magic_boots",
    func: lightningSpeedUp,
    delay: TicksPerSecond4 * 1,
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
    delay: TicksPerSecond4 * 1,
    removeFunc: waterSpeedReset
  },
  {
    itemName: "kurokumaft:nether_wind_magic_boots",
    func: windSpeedUp,
    delay: TicksPerSecond4 * 1,
    removeFunc: windSpeedReset
  },
  {
    itemName: "kurokumaft:nether_lightning_magic_boots",
    func: lightningSpeedUp,
    delay: TicksPerSecond4 * 1,
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
    let equItem = MagicBootsObjects.find((obj) => obj.itemName == this.itemStack.typeId);
    let equ = this.player.getComponent(EntityComponentTypes10.Equippable);
    let boot = equ.getEquipment(EquipmentSlot12.Feet);
    if (boot != null && boot.typeId == equItem.itemName) {
      this.player.setDynamicProperty("magic_boot_equ", true);
      equItem.func(this.player);
      system10.runTimeout(() => {
        system10.run(this.checkJob.bind(this));
      }, equItem.delay);
    } else {
      equItem.removeFunc(this.player);
      this.player.setDynamicProperty("magic_boot_equ", false);
    }
  }
};
async function lavaWalker(player) {
  player.runCommand("/execute as @s if block ~~-1~ lava run setblock ~~-1~ magma");
  player.runCommand("/execute as @s if block ~~-1~ flowing_lava run setblock ~~-1~ magma");
}
async function waterSpeedUp(player) {
  if (player.isInWater) {
    player.runCommand("/event entity @s kurokumaft:water_speed_walker_up");
  } else {
    player.runCommand("/event entity @s kurokumaft:water_speed_walker_down");
  }
}
async function windSpeedUp(player) {
  if (!player.isInWater) {
    player.runCommand("/event entity @s kurokumaft:speed_walker_up");
  } else {
    player.runCommand("/event entity @s kurokumaft:speed_walker_down");
  }
}
async function lightningSpeedUp(player) {
  player.runCommand("/event entity @s kurokumaft:speed_walker_up4");
}
async function iceWalker(player) {
  player.runCommand("/execute as @s if block ~~-1~ water run setblock ~~-1~ packed_ice");
  player.runCommand("/execute as @s if block ~~-1~ flowing_water run setblock ~~-1~ packed_ice");
}
async function lavaWalkerReset(player) {
}
async function waterSpeedReset(player) {
  player.runCommand("/event entity @s kurokumaft:water_speed_walker_down");
}
async function windSpeedReset(player) {
  player.runCommand("/event entity @s kurokumaft:speed_walker_down");
}
async function lightningSpeedReset(player) {
  player.runCommand("/event entity @s kurokumaft:speed_walker_down");
}
async function iceWalkerReset(player) {
}

// scripts/player/armorEquipment.ts
async function checkPlayerEquTick() {
  let players = world10.getPlayers();
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    let equ = player.getComponent(EntityComponentTypes11.Equippable);
    let offHand = equ.getEquipment(EquipmentSlot13.Offhand);
    if (offHand) {
      if (offHand.hasTag("kurokumaft:magic_shield") && player.isSneaking) {
        if (!player.hasTag("off_shield_guard")) {
          player.addTag("off_shield_guard");
        }
      } else {
        if (player.hasTag("off_shield_guard")) {
          player.removeTag("off_shield_guard");
        }
      }
    }
    let mainHand = equ.getEquipment(EquipmentSlot13.Mainhand);
    if (mainHand) {
      if (mainHand.hasTag("kurokumaft:magic_shield") && player.isSneaking) {
        if (!player.hasTag("main_shield_guard")) {
          player.addTag("main_shield_guard");
        }
      } else {
        if (player.hasTag("main_shield_guard")) {
          player.removeTag("main_shield_guard");
        }
      }
    }
    let head = equ.getEquipment(EquipmentSlot13.Head);
    if (head) {
      if (!player.getDynamicProperty("magic_helmet_equ")) {
        new MagicHelmetSurveillance(player, head).checkMagicHelmetTick();
      }
    } else {
      player.setDynamicProperty("magic_helmet_equ", false);
    }
    let chest = equ.getEquipment(EquipmentSlot13.Chest);
    if (chest) {
      if (!player.getDynamicProperty("magic_chest_equ")) {
        new MagicChestSurveillance(player, chest).checkMagicChestTick();
      }
    } else {
      player.setDynamicProperty("magic_chest_equ", false);
    }
    let legs = equ.getEquipment(EquipmentSlot13.Legs);
    if (legs) {
      if (!player.getDynamicProperty("magic_leg_equ")) {
        new MagicLeggingsSurveillance(player, legs).checkMagicLeggingsTick();
      }
    } else {
      player.setDynamicProperty("magic_leg_equ", false);
    }
    let feet = equ.getEquipment(EquipmentSlot13.Feet);
    if (feet) {
      if (!player.getDynamicProperty("magic_boot_equ")) {
        new MagicBootsSurveillance(player, feet).checkMagicBootsTick();
      }
    } else {
      player.setDynamicProperty("magic_boot_equ", false);
    }
  }
  system11.run(checkPlayerEquTick);
}

// scripts/items/weapon/stick/StickWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot14, GameMode as GameMode4, ItemComponentTypes as ItemComponentTypes7, Player as Player21, system as system18, world as world12 } from "@minecraft/server";

// scripts/items/weapon/stick/WaterCurrentMagic.ts
import { EntityDamageCause, system as system12 } from "@minecraft/server";
async function aquaShot(player) {
  player.addTag("aqua_shot_self");
  let dimension = player.dimension;
  let targets = dimension.getEntities({
    excludeTags: [
      "aqua_shot_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    closest: 4,
    maxDistance: 10
  });
  let intervalNum = system12.runInterval(() => {
    targets.forEach((en) => {
      en.runCommand("/particle kurokumaft:aqua_shot_particle ~~~");
      en.addEffect("slowness", 5, {
        amplifier: 5
      });
      en.applyDamage(2, {
        cause: EntityDamageCause.drowning
      });
    });
  }, 4);
  system12.runTimeout(() => {
    system12.clearRun(intervalNum);
  }, 40);
  player.removeTag("aqua_shot_self");
}
async function tidalWave(player) {
  player.addTag("tidal_wave_self");
  let dimension = player.dimension;
  let targets = dimension.getEntities({
    excludeTags: [
      "tidal_wave_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 15
  });
  let intervalNum = system12.runInterval(() => {
    targets.forEach((en) => {
      en.runCommand("/particle kurokumaft:tidal_wave_particle ~~~");
      en.addEffect("slowness", 1, {
        amplifier: 10
      });
      en.applyDamage(3, {
        cause: EntityDamageCause.drowning
      });
    });
  }, 4);
  system12.runTimeout(() => {
    system12.clearRun(intervalNum);
  }, 100);
  player.removeTag("tidal_wave_self");
}

// scripts/items/weapon/stick/AtmosphereMagic.ts
import { EntityDamageCause as EntityDamageCause2, system as system13 } from "@minecraft/server";
async function atmosphere(player) {
  player.addTag("atmosphere_self");
  let intervalNum = system13.runInterval(() => {
    player.runCommand("/particle kurokumaft:atmosphere_particle ~~~");
    let targets = player.dimension.getEntities({
      excludeTags: [
        "atmosphere_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar"
      ],
      excludeTypes: [
        "item"
      ],
      location: player.location,
      maxDistance: 10
    });
    targets.forEach((en) => {
      en.runCommand("/particle kurokumaft:wind_particle ~~~");
      en.runCommand("/particle kurokumaft:storm1_particle ~~1~");
      en.runCommand("/particle kurokumaft:storm2_particle ~~0~");
      en.runCommand("/particle kurokumaft:storm3_particle ~~1.5~");
      en.runCommand("/particle kurokumaft:storm4_particle ~~0.5~");
      en.addEffect("slowness", 1, {
        amplifier: 10
      });
      en.applyDamage(3, {
        cause: EntityDamageCause2.fallingBlock
      });
    });
  }, 4);
  system13.runTimeout(() => {
    system13.clearRun(intervalNum);
    player.removeTag("atmosphere_self");
  }, 100);
}

// scripts/items/weapon/stick/EarthMagic.ts
import { EntityDamageCause as EntityDamageCause3, system as system14 } from "@minecraft/server";
async function gravityField(player) {
  player.addTag("gravity_field_self");
  let intervalNum = system14.runInterval(() => {
    player.runCommand("/particle kurokumaft:gravity_field_particle ~~~");
    let targets = player.dimension.getEntities({
      excludeTags: [
        "atmosphere_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar"
      ],
      excludeTypes: [
        "item"
      ],
      location: player.location,
      maxDistance: 15
    });
    targets.forEach((en) => {
      en.runCommand("/particle kurokumaft:gravity_particle ~~~");
      en.addEffect("slowness", 1, {
        amplifier: 10
      });
      en.applyDamage(3, {
        cause: EntityDamageCause3.fallingBlock
      });
    });
  }, 4);
  system14.runTimeout(() => {
    system14.clearRun(intervalNum);
    player.removeTag("gravity_field_self");
  }, 100);
}

// scripts/items/weapon/stick/LightningStrikeMagic.ts
import { EntityDamageCause as EntityDamageCause4, system as system15 } from "@minecraft/server";
async function lightningStrike(player) {
  player.addTag("lightningstrike_self");
  let intervalNum = system15.runInterval(() => {
    player.runCommand("/particle kurokumaft:thunder_sword_particle ~~~");
    let targets = player.dimension.getEntities({
      excludeTags: [
        "lightningstrike_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar"
      ],
      excludeTypes: [
        "item"
      ],
      location: player.location,
      maxDistance: 10
    });
    targets.forEach((en) => {
      en.runCommand("/particle kurokumaft:spark_particle ~~~");
      en.addEffect("slowness", 1, {
        amplifier: 1
      });
      en.applyDamage(6, {
        cause: EntityDamageCause4.lightning
      });
    });
  }, 4);
  system15.runTimeout(() => {
    system15.clearRun(intervalNum);
    player.removeTag("lightningstrike_self");
  }, 100);
}

// scripts/items/weapon/stick/JetBlackMagic.ts
import { EntityDamageCause as EntityDamageCause5, system as system16 } from "@minecraft/server";
async function blackHole(player) {
  player.addTag("black_hole_self");
  let black_hole = player.dimension.spawnEntity(
    "kurokumaft:black_hole",
    {
      x: player.location.x,
      y: player.location.y + 8,
      z: player.location.z
    }
  );
  let holeLo = black_hole.location;
  let intervalNum = system16.runInterval(() => {
    black_hole.teleport({ x: holeLo.x, y: holeLo.y + 0.1, z: holeLo.z });
    black_hole.runCommand("/particle kurokumaft:black_hole_particle ~~~");
    black_hole.runCommand("/particle kurokumaft:black_hole_outer_particle ~~~");
    let targets = player.dimension.getEntities({
      excludeTags: [
        "black_hole_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar"
      ],
      excludeTypes: [
        "item"
      ],
      location: holeLo,
      maxDistance: 18
    });
    targets.forEach((en) => {
      en.teleport(holeLo);
      en.applyDamage(10, {
        cause: EntityDamageCause5.wither
      });
    });
  }, 10);
  system16.runTimeout(() => {
    system16.clearRun(intervalNum);
    player.removeTag("black_hole_self");
    black_hole.remove();
  }, 100);
}

// scripts/items/weapon/stick/SparkleMagic.ts
import { system as system17 } from "@minecraft/server";
async function hollyField(player) {
  let holly_field = player.dimension.spawnEntity(
    "kurokumaft:holly_field",
    {
      x: player.location.x,
      y: player.location.y,
      z: player.location.z
    }
  );
  let holeLo = holly_field.location;
  let intervalNum = system17.runInterval(() => {
    holly_field.runCommand("/particle kurokumaft:holly_field_particle ~~~");
    holly_field.runCommand("/particle kurokumaft:holly_field_outer_particle ~~~");
    let targets = player.dimension.getEntities({
      excludeTags: [
        "black_hole_self"
      ],
      excludeFamilies: [
        "inanimate"
      ],
      excludeTypes: [
        "item"
      ],
      location: holeLo,
      maxDistance: 15
    });
    targets.forEach((en) => {
      en.addEffect("instant_health", 2, {
        amplifier: 10
      });
    });
  }, 10);
  system17.runTimeout(() => {
    system17.clearRun(intervalNum);
    holly_field.remove();
  }, 100);
}

// scripts/items/weapon/stick/StickWeaponMagic.ts
var StickHitObjects = Object.freeze([
  {
    itemName: "kurokumaft:blaze_stick",
    event: "fire/flame_shock",
    sendMsg: "\xA7c\u30D5\u30EC\u30A4\u30E0\u30B7\u30E7\u30C3\u30AF"
  },
  {
    itemName: "kurokumaft:watercurrent_stick",
    event: "water/splash",
    sendMsg: "\xA7b\u30B9\u30D7\u30E9\u30C3\u30B7\u30E5"
  },
  {
    itemName: "kurokumaft:atmosphere_stick",
    event: "wind/storm_shock",
    sendMsg: "\xA7a\u30B9\u30C8\u30FC\u30E0\u30B7\u30E7\u30C3\u30AF"
  },
  {
    itemName: "kurokumaft:earth_stick",
    event: "stone/earth_shock",
    sendMsg: "\xA77\u30A2\u30FC\u30B9\u30B7\u30E7\u30C3\u30AF"
  },
  {
    itemName: "kurokumaft:lightningstrike_stick",
    event: "lightning/spark_shock",
    sendMsg: "\xA76\u30B9\u30D1\u30FC\u30AF\u30B7\u30E7\u30C3\u30AF"
  },
  {
    itemName: "kurokumaft:blockice_stick",
    event: "ice/powdered_snow",
    sendMsg: "\xA7f\u30A2\u30A4\u30B9\u30B7\u30E7\u30C3\u30AF"
  },
  {
    itemName: "kurokumaft:jetblack_stick",
    event: "dark/jetblack_shock",
    sendMsg: "\xA78\u30B8\u30A7\u30C3\u30C8\u30D6\u30E9\u30C3\u30AF"
  },
  {
    itemName: "kurokumaft:sparkle_stick",
    event: "light/sparkle_light",
    sendMsg: "\xA7e\u30B9\u30D1\u30FC\u30AF\u30EB\u30E9\u30A4\u30C8"
  }
]);
var StickShotMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:blaze_stick",
    event: "kurokumaft:valleleflairmagic",
    sendMsg: "\xA7c\u30F4\u30A1\u30EB\u30D5\u30EC\u30A2",
    addition: 2
  },
  {
    itemName: "kurokumaft:atmosphere_stick",
    event: "kurokumaft:storm_cutter_magic",
    sendMsg: "\xA7a\u30B9\u30C8\u30FC\u30E0\u30AB\u30C3\u30BF\u30FC",
    addition: 5
  },
  {
    itemName: "kurokumaft:earth_stick",
    event: "kurokumaft:stone_edge_magic",
    sendMsg: "\xA77\u30B9\u30C8\u30FC\u30F3\u30A8\u30C3\u30B8",
    addition: 2
  },
  {
    itemName: "kurokumaft:lightningstrike_stick",
    event: "kurokumaft:thunder_lance_magic",
    sendMsg: "\xA76\u30B5\u30F3\u30C0\u30FC\u30E9\u30F3\u30B9",
    addition: 6
  },
  {
    itemName: "kurokumaft:blockice_stick",
    event: "kurokumaft:ice_lance_magic",
    sendMsg: "\xA7f\u30A2\u30A4\u30B9\u30E9\u30F3\u30B9",
    addition: 4
  },
  {
    itemName: "kurokumaft:jetblack_stick",
    event: "kurokumaft:dark_lance_magic",
    sendMsg: "\xA78\u30C0\u30FC\u30AF\u30E9\u30F3\u30B9",
    addition: 4
  },
  {
    itemName: "kurokumaft:sparkle_stick",
    event: "kurokumaft:holly_lance_magic",
    sendMsg: "\xA7e\u30DB\u30FC\u30EA\u30FC\u30E9\u30F3\u30B9",
    addition: 4
  }
]);
var StickRightOneMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:watercurrent_stick",
    func: aquaShot,
    sendMsg: "\xA7b\u30A2\u30AF\u30A2\u30B7\u30E7\u30C3\u30C8"
  }
]);
var StickRightEventMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:blaze_stick",
    event: "fire/blastbomb",
    sendMsg: "\xA7c\u30D6\u30E9\u30B9\u30C8\u30DC\u30E0"
  },
  {
    itemName: "kurokumaft:blockice_stick",
    event: "ice/ice_block",
    sendMsg: "\xA7f\u30A2\u30A4\u30B9\u30D6\u30ED\u30C3\u30AF"
  }
]);
var StickRightFuncMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:watercurrent_stick",
    func: tidalWave,
    sendMsg: "\xA7b\u30BF\u30A4\u30C0\u30EB\u30A6\u30A7\u30A4\u30D6"
  },
  {
    itemName: "kurokumaft:atmosphere_stick",
    func: atmosphere,
    sendMsg: "\xA7a\u30A2\u30C8\u30E2\u30B9\u30D5\u30A3\u30A2"
  },
  {
    itemName: "kurokumaft:earth_stick",
    func: gravityField,
    sendMsg: "\xA77\u30B0\u30E9\u30D3\u30C6\u30A3\u30D5\u30A3\u30FC\u30EB\u30C9"
  },
  {
    itemName: "kurokumaft:lightningstrike_stick",
    func: lightningStrike,
    sendMsg: "\xA76\u30E9\u30A4\u30C8\u30CB\u30F3\u30B0\u30B9\u30C8\u30E9\u30A4\u30AF"
  },
  {
    itemName: "kurokumaft:jetblack_stick",
    func: blackHole,
    sendMsg: "\xA78\u30D6\u30E9\u30C3\u30AF\u30DB\u30FC\u30EB"
  },
  {
    itemName: "kurokumaft:sparkle_stick",
    func: hollyField,
    sendMsg: "\xA7e\u30DB\u30FC\u30EA\u30FC\u30D5\u30A3\u30FC\u30EB\u30C9"
  }
]);
var StickWeaponMagic = class {
  // 通常攻撃
  onHitEntity(event) {
    let itemStack = event.itemStack;
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let effect = event.hadEffect;
    if (!itemStack || hitEntity instanceof Player21 && !world12.gameRules.pvp) {
      return;
    }
    let wandMagicObject = StickHitObjects.find((obj) => obj.itemName == itemStack.typeId);
    attackEntity.runCommand("/function magic/" + wandMagicObject.event);
    attackEntity.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + wandMagicObject.sendMsg + '"}]}');
  }
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    if (world12.gameRules.pvp) {
      if (player.isSneaking) {
        let stickEventMagicObject = StickRightEventMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        if (stickEventMagicObject) {
          player.runCommand("/function magic/" + stickEventMagicObject.event);
          player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + stickEventMagicObject.sendMsg + '"}]}');
        }
        let stickFuncMagicObject = StickRightFuncMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        if (stickFuncMagicObject) {
          player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + stickFuncMagicObject.sendMsg + '"}]}');
          stickFuncMagicObject.func(player);
        }
      } else {
        let stickShotMagicObject = StickShotMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        if (stickShotMagicObject) {
          let xran = parseFloat(getRandomInRange(-0.1, 0.5).toFixed(3));
          let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
          let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
          if (itemStack.typeId == "kurokumaft:atmosphere_stick") {
            let intervalNum = system18.runInterval(() => {
              xran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
              yran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
              zran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
              shooting(player, stickShotMagicObject.event, { x: xran, y: yran, z: zran }, stickShotMagicObject.addition, void 0);
            }, 4);
            system18.runTimeout(() => {
              system18.clearRun(intervalNum);
            }, 16);
          } else {
            shooting(player, stickShotMagicObject.event, { x: xran, y: yran, z: zran }, stickShotMagicObject.addition, void 0);
          }
          player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + stickShotMagicObject.sendMsg + '"}]}');
        }
        let stickRightOneMagicObject = StickRightOneMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        if (stickRightOneMagicObject) {
          player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + stickRightOneMagicObject.sendMsg + '"}]}');
          stickRightOneMagicObject.func(player);
        }
      }
    } else {
    }
    if (player.getGameMode() != GameMode4.creative) {
      ItemDurabilityDamage(player, itemStack, EquipmentSlot14.Mainhand);
    }
    let cool = itemStack.getComponent(ItemComponentTypes7.Cooldown);
    cool.startCooldown(player);
  }
  // ブロッククリック
  onUseOn(event) {
  }
};

// scripts/items/weapon/rod/RodWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot15, GameMode as GameMode5, ItemComponentTypes as ItemComponentTypes8, Player as Player27, world as world13 } from "@minecraft/server";

// scripts/items/weapon/rod/FlameMagic.ts
import { EntityDamageCause as EntityDamageCause7, system as system19 } from "@minecraft/server";
async function flarecircle(player) {
  player.addTag("flamecircle_self");
  let intervalNum = system19.runInterval(() => {
    let targets = player.dimension.getEntities({
      excludeTags: [
        "flamecircle_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar"
      ],
      excludeTypes: [
        "item"
      ],
      location: player.location,
      maxDistance: 20,
      closest: 3
    });
    targets.forEach((en) => {
      en.runCommand("/particle kurokumaft:firestome1_particle ~~~");
      en.applyDamage(5, {
        cause: EntityDamageCause7.fire
      });
    });
  }, 2);
  system19.runTimeout(() => {
    system19.clearRun(intervalNum);
    player.removeTag("flamecircle_self");
  }, 60);
}
async function burstflare(player) {
  player.addTag("burstflare_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "burstflare_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:burstflare_particle ~~~");
    en.dimension.spawnEntity("kurokumaft:burstflaremagic<minecraft:explode>", en.location);
    en.applyDamage(10, {
      cause: EntityDamageCause7.fire
    });
  });
  player.removeTag("burstflare_self");
}

// scripts/items/weapon/rod/WaterWaveMagic.ts
async function waterwave(player) {
  let { xapply, yapply, zapply, xlocation, ylocation, zlocation } = getAdjacentSphericalPoints(player.getRotation(), player.location);
  let wave = player.dimension.spawnEntity("kurokumaft:waterwavemagic", { x: xlocation, y: player.location.y, z: zlocation });
  wave.applyImpulse({ x: xapply, y: 0, z: zapply });
}
async function waterjail(player) {
  player.addTag("waterjail_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "waterjail_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 2
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:waterjail_particle ~~~");
    en.addEffect("slowness", 10, {
      amplifier: 50
    });
  });
  player.removeTag("waterjail_self");
}

// scripts/items/weapon/rod/StormMagic.ts
import { EntityDamageCause as EntityDamageCause8 } from "@minecraft/server";
async function storm(player) {
  player.addTag("storm_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "storm_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:storm1_particle ~~~");
    en.runCommand("/particle kurokumaft:storm2_particle ~~1~");
    en.runCommand("/particle kurokumaft:storm3_particle ~~2~");
    en.runCommand("/particle kurokumaft:storm4_particle ~~3~");
    en.addEffect("levitation", 1, {
      amplifier: 15
    });
    en.applyDamage(2, {
      cause: EntityDamageCause8.fall
    });
  });
  player.removeTag("storm_self");
}
async function aerobomb(player) {
  player.addTag("aero_bomb_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "aero_bomb_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:aero_bomb_particle ~~~");
    en.applyDamage(10, {
      cause: EntityDamageCause8.fall
    });
    let bust = en.dimension.spawnEntity("kurokumaft:burstflaremagic", en.location);
    bust.triggerEvent("minecraft:explode");
  });
  player.removeTag("aero_bomb_self");
}

// scripts/items/weapon/rod/RockMagic.ts
import { EntityDamageCause as EntityDamageCause9 } from "@minecraft/server";
async function rockbreak(player) {
  player.addTag("rock_break_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "rock_break_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  });
  targets.forEach((en) => {
    en.addEffect("nausea", 5, {
      amplifier: 10
    });
    let rock = en.dimension.spawnEntity("kurokumaft:burstflaremagic", { x: en.location.x, y: en.location.y + 10, z: en.location.z });
  });
  player.removeTag("rock_break_self");
}
async function greybomb(player) {
  player.addTag("grey_bomb_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "grey_bomb_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:grey_bomb_particle ~~~");
    en.applyDamage(10, {
      cause: EntityDamageCause9.fallingBlock
    });
    let bust = en.dimension.spawnEntity("kurokumaft:burstflaremagic", en.location);
    bust.triggerEvent("minecraft:explode");
  });
  player.removeTag("grey_bomb_self");
}

// scripts/items/weapon/rod/ThunderclapMagic.ts
import { EntityDamageCause as EntityDamageCause10 } from "@minecraft/server";
async function thunderclap(player) {
  player.addTag("thunderclap_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "thunderclap_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:lightningbolt_particle ~~~");
    en.dimension.spawnEntity("Lightning_Bolt", en.location);
    en.applyDamage(10, {
      cause: EntityDamageCause10.lightning
    });
  });
  player.removeTag("thunderclap_self");
}
async function thunderjail(player) {
  player.addTag("thunder_jail_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "thunder_jail_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 8
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:thunder_jail_particle ~~~");
    en.addEffect("slowness", 2, {
      amplifier: 30
    });
    en.applyDamage(4, {
      cause: EntityDamageCause10.lightning
    });
  });
  player.removeTag("thunder_jail_self");
}

// scripts/items/weapon/rod/FreezeMagic.ts
async function freezConclusion(player) {
  player.addTag("freez_conclusion_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "freez_conclusion_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 15,
    closest: 2
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:freezingconclusion_particle ~~~");
    en.runCommand("/fill ~-1 ~ ~-1 ~1 ~1 ~1 packed_ice");
    en.addEffect("weakness", 20, {
      amplifier: 3
    });
  });
  player.removeTag("freez_conclusion_self");
}

// scripts/items/weapon/rod/DarknessMagic.ts
import { EntityDamageCause as EntityDamageCause11 } from "@minecraft/server";
async function brushash(player) {
  player.addTag("brushash_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "brushash_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 10,
    closest: 3
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:dark_brushash_particle ~~~");
    en.applyDamage(6, {
      cause: EntityDamageCause11.wither
    });
  });
  player.removeTag("brushash_self");
}
async function summonSkeleton(player) {
  player.dimension.spawnEntity("kurokumaft:dark_skeleton", { x: player.location.x + 3, y: player.location.y, z: player.location.z }).nameTag = "\u30C0\u30FC\u30AF\u30B9\u30B1\u30EB\u30C8\u30F3";
  player.dimension.spawnEntity("kurokumaft:dark_skeleton", { x: player.location.x - 3, y: player.location.y, z: player.location.z }).nameTag = "\u30C0\u30FC\u30AF\u30B9\u30B1\u30EB\u30C8\u30F3";
  player.dimension.spawnEntity("kurokumaft:dark_skeleton", { x: player.location.x, y: player.location.y, z: player.location.z + 3 }).nameTag = "\u30C0\u30FC\u30AF\u30B9\u30B1\u30EB\u30C8\u30F3";
}

// scripts/items/weapon/rod/BrightnessMagic.ts
async function areaheel(player) {
  let targets = player.dimension.getEntities({
    excludeFamilies: [
      "inanimate",
      "magic"
    ],
    excludeTypes: [
      "item"
    ],
    families: [
      "player",
      "familiar",
      "undead"
    ],
    location: player.location,
    maxDistance: 10
  });
  player.runCommand("/particle kurokumaft:areaheel_particle ~~~");
  targets.forEach((en) => {
    en.addEffect("instant_health", 30, {
      amplifier: 5,
      showParticles: true
    });
  });
}
async function summonGolem(player) {
  let golem = player.dimension.spawnEntity("kurokumaft:brightness_golem", { x: player.location.x, y: player.location.y, z: player.location.z + 3 });
  golem.nameTag = "\u30D6\u30E9\u30A4\u30C8\u30B4\u30FC\u30EC\u30E0";
  golem.triggerEvent("minecraft:from_player");
}

// scripts/items/weapon/rod/RodWeaponMagic.ts
var RodHitObjects = Object.freeze([
  {
    itemName: "kurokumaft:flame_rod",
    event: "fire/bumrod",
    sendMsg: "\xA7c\u30D0\u30E0\u30ED\u30C3\u30C9"
  },
  {
    itemName: "kurokumaft:waterwave_rod",
    event: "water/watercutter",
    sendMsg: "\xA7b\u30A6\u30A9\u30FC\u30BF\u30AB\u30C3\u30BF\u30FC"
  },
  {
    itemName: "kurokumaft:storm_rod",
    event: "wind/storm_bread",
    sendMsg: "\xA7a\u30B9\u30C8\u30FC\u30E0\u30D6\u30EC\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:rock_rod",
    event: "stone/stone_bread",
    sendMsg: "\xA77\u30B9\u30C8\u30FC\u30F3\u30D6\u30EC\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:thunderclap_rod",
    event: "lightning/lightning_bread",
    sendMsg: "\xA76\u30E9\u30A4\u30C8\u30CB\u30F3\u30B0\u30D6\u30EC\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:freeze_rod",
    event: "ice/ice_bread",
    sendMsg: "\xA7f\u30A2\u30A4\u30B9\u30D6\u30EC\u30FC\u30C9"
  },
  {
    itemName: "kurokumaft:darkness_rod",
    event: "dark/dark_fang",
    sendMsg: "\xA78\u30C0\u30FC\u30AF\u30D5\u30A1\u30F3\u30B0"
  },
  {
    itemName: "kurokumaft:brightness_rod",
    event: "light/light_fang",
    sendMsg: "\xA7e\u30E9\u30A4\u30C8\u30D5\u30A1\u30F3\u30B0"
  }
]);
var RodShotMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:freeze_rod",
    event: "kurokumaft:ice_barrette_magic",
    sendMsg: "\xA7f\u30A2\u30A4\u30B9\u30D0\u30EC\u30C3\u30C8",
    addition: 4
  }
]);
var RodRightOneMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:flame_rod",
    func: flarecircle,
    sendMsg: "\xA7c\u30D5\u30EC\u30A4\u30E0\u30B5\u30FC\u30AF\u30EB"
  },
  {
    itemName: "kurokumaft:waterwave_rod",
    func: waterwave,
    sendMsg: "\xA7b\u30A6\u30A9\u30FC\u30BF\u30FC\u30A6\u30A7\u30FC\u30D6"
  },
  {
    itemName: "kurokumaft:storm_rod",
    func: storm,
    sendMsg: "\xA7a\u30B9\u30C8\u30FC\u30E0"
  },
  {
    itemName: "kurokumaft:rock_rod",
    func: rockbreak,
    sendMsg: "\xA77\u30ED\u30C3\u30AF\u30D6\u30EC\u30A4\u30AF"
  },
  {
    itemName: "kurokumaft:thunderclap_rod",
    func: thunderclap,
    sendMsg: "\xA76\u30B5\u30F3\u30C0\u30FC\u30AF\u30E9\u30C3\u30D7"
  },
  {
    itemName: "kurokumaft:darkness_rod",
    func: brushash,
    sendMsg: "\xA78\u30D6\u30E9\u30B9\u30C8\u30A2\u30C3\u30B7\u30E5"
  },
  {
    itemName: "kurokumaft:brightness_rod",
    func: areaheel,
    sendMsg: "\xA7e\u30A8\u30EA\u30A2\u30D2\u30FC\u30EB"
  }
]);
var RodRightFuncMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:flame_rod",
    func: burstflare,
    sendMsg: "\xA7c\u30D0\u30FC\u30B9\u30C8\u30D5\u30EC\u30A2"
  },
  {
    itemName: "kurokumaft:waterwave_rod",
    func: waterjail,
    sendMsg: "\xA7b\u30A6\u30A9\u30FC\u30BF\u30B8\u30A7\u30A4\u30EB"
  },
  {
    itemName: "kurokumaft:storm_rod",
    func: aerobomb,
    sendMsg: "\xA7a\u30A8\u30A2\u30ED\u30DC\u30E0"
  },
  {
    itemName: "kurokumaft:rock_rod",
    func: greybomb,
    sendMsg: "\xA77\u30B0\u30EC\u30A4\u30DC\u30E0"
  },
  {
    itemName: "kurokumaft:thunderclap_rod",
    func: thunderjail,
    sendMsg: "\xA76\u30B5\u30F3\u30C0\u30FC\u30B8\u30A7\u30A4\u30EB"
  },
  {
    itemName: "kurokumaft:freeze_rod",
    func: freezConclusion,
    sendMsg: "\xA7f\u30D5\u30EA\u30FC\u30BA\u30B3\u30D5\u30A3\u30F3"
  },
  {
    itemName: "kurokumaft:darkness_rod",
    func: summonSkeleton,
    sendMsg: "\xA78\u30C0\u30FC\u30AF\u30B9\u30B1\u30EB\u30C8\u30F3\u53EC\u559A"
  },
  {
    itemName: "kurokumaft:brightness_rod",
    func: summonGolem,
    sendMsg: "\xA7e\u30D6\u30E9\u30A4\u30C8\u30B4\u30FC\u30EC\u30E0\u53EC\u559A"
  }
]);
var RodWeaponMagic = class {
  // 通常攻撃
  onHitEntity(event) {
    let itemStack = event.itemStack;
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let effect = event.hadEffect;
    if (!itemStack || hitEntity instanceof Player27 && !world13.gameRules.pvp) {
      return;
    }
    let wandMagicObject = RodHitObjects.find((obj) => obj.itemName == itemStack.typeId);
    attackEntity.runCommand("/function magic/" + wandMagicObject.event);
    attackEntity.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + wandMagicObject.sendMsg + '"}]}');
  }
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    if (world13.gameRules.pvp) {
      if (player.isSneaking) {
        let rodFuncMagicObject = RodRightFuncMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        if (rodFuncMagicObject) {
          player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + rodFuncMagicObject.sendMsg + '"}]}');
          rodFuncMagicObject.func(player);
        }
      } else {
        let rodShotMagicObject = RodShotMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        if (rodShotMagicObject) {
          let xran = parseFloat(getRandomInRange(-0.1, 0.5).toFixed(3));
          let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
          let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
          shooting(player, rodShotMagicObject.event, { x: xran, y: yran, z: zran }, rodShotMagicObject.addition, void 0);
          player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + rodShotMagicObject.sendMsg + '"}]}');
        }
        let rodRightOneMagicObject = RodRightOneMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        if (rodRightOneMagicObject) {
          player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + rodRightOneMagicObject.sendMsg + '"}]}');
          rodRightOneMagicObject.func(player);
        }
      }
    } else {
    }
    if (player.getGameMode() != GameMode5.creative) {
      ItemDurabilityDamage(player, itemStack, EquipmentSlot15.Mainhand);
    }
    let cool = itemStack.getComponent(ItemComponentTypes8.Cooldown);
    cool.startCooldown(player);
  }
  // ブロッククリック
  onUseOn(event) {
  }
};

// scripts/items/weapon/staff/StaffWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot16, GameMode as GameMode6, ItemComponentTypes as ItemComponentTypes9, Player as Player31, world as world14 } from "@minecraft/server";

// scripts/items/weapon/staff/FirestormMagic.ts
import { EntityDamageCause as EntityDamageCause12, system as system25 } from "@minecraft/server";
async function bramFang(player) {
  let targets = player.dimension.getEntities({
    excludeTags: [
      "flamecircle_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 3
  });
  targets.forEach((en) => {
    en.dimension.spawnEntity("kurokumaft:bram_fang_magic", en.location);
  });
}

// scripts/items/weapon/staff/ExplosionMagic.ts
async function explosion(player) {
  let { xlocation, ylocation, zlocation } = getLookPoints(player.getRotation(), player.location, 25);
  let explosion2 = player.dimension.spawnEntity(
    "kurokumaft:explosionmagic",
    {
      x: xlocation,
      y: player.location.y + 25,
      z: zlocation
    }
  );
}

// scripts/items/weapon/staff/FlameSparkMagic.ts
import { EntityDamageCause as EntityDamageCause13, system as system26 } from "@minecraft/server";
async function flameSpark(player) {
  player.addTag("flamespark_self");
  let intervalNum = system26.runInterval(() => {
    let targets = player.dimension.getEntities({
      excludeTags: [
        "flamespark_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar",
        "magic"
      ],
      excludeTypes: [
        "item"
      ],
      location: player.location,
      maxDistance: 30,
      closest: 3
    });
    targets.forEach((en) => {
      en.runCommand("/particle kurokumaft:firewall_particle ~~~");
      en.applyDamage(3, {
        cause: EntityDamageCause13.fire
      });
      en.dimension.spawnEntity("minecraft:lightning_bolt", en.location);
      en.applyDamage(3, {
        cause: EntityDamageCause13.lightning
      });
    });
  }, 10);
  system26.runTimeout(() => {
    system26.clearRun(intervalNum);
    player.removeTag("flamespark_self");
  }, 100);
}

// scripts/items/weapon/staff/MailstromMagic.ts
import { EntityDamageCause as EntityDamageCause14, system as system27 } from "@minecraft/server";
async function mailstrom(player) {
  player.addTag("mailstrom_self");
  let { xlocation, ylocation, zlocation } = getLookPoints(player.getRotation(), player.location, 15);
  let mailstrom_en = player.dimension.spawnEntity(
    "kurokumaft:mailstrom",
    {
      x: xlocation,
      y: player.location.y + 0.5,
      z: zlocation
    }
  );
  let mailLo = mailstrom_en.location;
  let intervalNum = system27.runInterval(() => {
    mailstrom_en.runCommand("/particle kurokumaft:mailstrom1_particle ~~~");
    mailstrom_en.runCommand("/particle kurokumaft:mailstrom1_particle ~~0.5~");
    mailstrom_en.runCommand("/particle kurokumaft:mailstrom2_particle ~~1~");
    mailstrom_en.runCommand("/particle kurokumaft:mailstrom2_particle ~~1.5~");
    mailstrom_en.runCommand("/particle kurokumaft:mailstrom3_particle ~~2~");
    mailstrom_en.runCommand("/particle kurokumaft:mailstrom3_particle ~~2.5~");
    mailstrom_en.runCommand("/particle kurokumaft:mailstrom4_particle ~~3~");
    mailstrom_en.runCommand("/particle kurokumaft:mailstrom4_particle ~~3.5~");
    mailstrom_en.runCommand("/particle kurokumaft:mailstrom5_particle ~~4~");
    mailstrom_en.runCommand("/particle kurokumaft:mailstrom5_particle ~~4.5~");
    mailstrom_en.runCommand("/particle kurokumaft:mailstrom6_particle ~~5~");
    mailstrom_en.runCommand("/particle kurokumaft:mailstrom6_particle ~~5.5~");
    let targets = mailstrom_en.dimension.getEntities({
      excludeTags: [
        "mailstrom_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar"
      ],
      excludeTypes: [
        "item"
      ],
      location: mailLo,
      maxDistance: 10
    });
    targets.forEach((en) => {
      en.teleport(mailLo);
      en.applyDamage(5, {
        cause: EntityDamageCause14.drowning
      });
    });
  }, 10);
  system27.runTimeout(() => {
    system27.clearRun(intervalNum);
    player.removeTag("mailstrom_self");
    mailstrom_en.remove();
  }, 100);
}

// scripts/items/weapon/staff/StaffWeaponMagic.ts
var StaffHitObjects = Object.freeze([
  {
    itemName: "kurokumaft:explosion_staff",
    event: "fire/mega_brand",
    sendMsg: "\xA77\u30E1\u30AC\u30FB\u30D6\u30E9\u30F3\u30C9"
  },
  {
    itemName: "kurokumaft:firestorm_staff",
    func: bramFang,
    sendMsg: "\xA7a\u30D6\u30E9\u30E0\u30FB\u30D5\u30A1\u30F3\u30B0"
  },
  {
    itemName: "kurokumaft:flamespark_staff",
    event: "lightning/dig_vault",
    sendMsg: "\xA76\u30C7\u30A3\u30B0\u30FB\u30F4\u30A9\u30EB\u30C8"
  },
  {
    itemName: "kurokumaft:mailstrom_staff",
    event: "wind/sonic_slicer",
    sendMsg: "\xA7a\u30BD\u30CB\u30C3\u30AF\u30B9\u30E9\u30A4\u30B5\u30FC"
  }
]);
var StaffRightOneMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:firestorm_staff",
    func: flameSpark,
    sendMsg: "\xA7c\u30D5\u30A1\u30A4\u30A2\u30B9\u30C8\u30FC\u30E0"
  },
  {
    itemName: "kurokumaft:explosion_staff",
    func: explosion,
    sendMsg: "\xA7c\u30A8\u30AF\u30B9\u30D7\u30ED\u30FC\u30B8\u30E7\u30F3"
  },
  {
    itemName: "kurokumaft:flamespark_staff",
    func: flameSpark,
    sendMsg: "\xA76\u30D5\u30EC\u30A4\u30E0\u30B9\u30D1\u30FC\u30AF"
  },
  {
    itemName: "kurokumaft:mailstrom_staff",
    func: mailstrom,
    sendMsg: "\xA7b\u30E1\u30A4\u30EB\u30B7\u30E5\u30C8\u30ED\u30FC\u30E0"
  }
]);
var StaffWeaponMagic = class {
  // 通常攻撃
  onHitEntity(event) {
    let itemStack = event.itemStack;
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let effect = event.hadEffect;
    if (!itemStack || hitEntity instanceof Player31 && !world14.gameRules.pvp) {
      return;
    }
    let staffMagicObject = StaffHitObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (staffMagicObject.event) {
      attackEntity.runCommand("/function magic/" + staffMagicObject.event);
    } else {
      staffMagicObject.func(attackEntity);
    }
    attackEntity.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + staffMagicObject.sendMsg + '"}]}');
  }
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    if (world14.gameRules.pvp) {
      let staffRightOneMagicObject = StaffRightOneMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
      if (staffRightOneMagicObject) {
        player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + staffRightOneMagicObject.sendMsg + '"}]}');
        staffRightOneMagicObject.func(player);
      }
    } else {
    }
    if (player.getGameMode() != GameMode6.creative) {
      ItemDurabilityDamage(player, itemStack, EquipmentSlot16.Mainhand);
    }
    let cool = itemStack.getComponent(ItemComponentTypes9.Cooldown);
    cool.startCooldown(player);
  }
  // ブロッククリック
  onUseOn(event) {
  }
};

// scripts/items/weapon/bread/BreadWeaponMagic.ts
import { Player as Player38, GameMode as GameMode7, EquipmentSlot as EquipmentSlot17, ItemComponentTypes as ItemComponentTypes10 } from "@minecraft/server";

// scripts/items/weapon/bread/FireMagicBread.ts
import { EntityDamageCause as EntityDamageCause15 } from "@minecraft/server";
async function flamingDesires(player) {
  player.addTag("flaming_desires");
  let { xlocation, ylocation, zlocation } = getLookPoints(player.getRotation(), player.location, 2);
  let targets = player.dimension.getEntities({
    excludeTags: [
      "flaming_desires"
    ],
    excludeFamilies: [
      "inanimate",
      "magic",
      "player"
    ],
    excludeTypes: [
      "item"
    ],
    location: { x: xlocation, y: player.location.y + 0.5, z: zlocation },
    maxDistance: 3,
    closest: 1
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:flaming_desires_particle ~~~");
    en.applyDamage(5, {
      cause: EntityDamageCause15.fire
    });
  });
  player.removeTag("flaming_desires");
}
async function crimsonBread(player) {
  let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  shooting(player, "kurokumaft:crimson_bread", { x: xran, y: yran, z: zran }, 2, void 0);
}

// scripts/items/weapon/bread/WaterMagicBread.ts
import { EntityDamageCause as EntityDamageCause16 } from "@minecraft/server";
async function aquaDesires(player) {
  player.addTag("aqua_desires");
  let { xlocation, ylocation, zlocation } = getLookPoints(player.getRotation(), player.location, 2);
  let targets = player.dimension.getEntities({
    excludeTags: [
      "aqua_desires"
    ],
    excludeFamilies: [
      "inanimate",
      "magic",
      "player"
    ],
    excludeTypes: [
      "item"
    ],
    location: { x: xlocation, y: player.location.y + 0.5, z: zlocation },
    maxDistance: 3,
    closest: 2
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:aqua_desires_particle ^0.5^^");
    en.runCommand("/particle kurokumaft:aqua_desires_particle ^^^");
    en.runCommand("/particle kurokumaft:aqua_desires_particle ^-0.5^^");
    en.applyDamage(5, {
      cause: EntityDamageCause16.drowning
    });
  });
  player.removeTag("aqua_desires");
}
async function mercurySmash(player) {
  let xran = 0;
  let yran = 0;
  let zran = 0;
  shooting(player, "kurokumaft:mercury_smash", { x: xran, y: yran, z: zran }, 2, "kurokumaft:projectile_1");
  shooting(player, "kurokumaft:mercury_smash", { x: xran, y: yran, z: zran }, 2, "kurokumaft:projectile_2");
  shooting(player, "kurokumaft:mercury_smash", { x: xran, y: yran, z: zran }, 2, "kurokumaft:projectile_3");
}

// scripts/items/weapon/bread/WindMagicBread.ts
import { EntityDamageCause as EntityDamageCause17, system as system31 } from "@minecraft/server";
function windDesires(player) {
  player.addTag("wind_desires");
  let { xlocation, ylocation, zlocation } = getLookPoints(player.getRotation(), player.location, 2);
  let targets = player.dimension.getEntities({
    excludeTags: [
      "wind_desires"
    ],
    excludeFamilies: [
      "inanimate",
      "magic",
      "player"
    ],
    excludeTypes: [
      "item"
    ],
    location: { x: xlocation, y: player.location.y + 0.5, z: zlocation },
    maxDistance: 3,
    closest: 3
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:wind_desires_particle ^0.5^^");
    en.runCommand("/particle kurokumaft:wind_desires_particle ^^^");
    en.runCommand("/particle kurokumaft:wind_desires_particle ^-0.5^^");
    en.applyDamage(2, {
      cause: EntityDamageCause17.flyIntoWall
    });
    en.applyDamage(2, {
      cause: EntityDamageCause17.flyIntoWall
    });
    en.applyDamage(2, {
      cause: EntityDamageCause17.flyIntoWall
    });
  });
  player.removeTag("wind_desires");
}
function windBarkSlash(player) {
  let xran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
  let yran = parseFloat(getRandomInRange(-0.2, 0.5).toFixed(3));
  let zran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
  let intervalNum = system31.runInterval(() => {
    shooting(player, "kurokumaft:wind_bark_slash", { x: xran, y: yran, z: zran }, 5, "kurokumaft:projectile_1");
    shooting(player, "kurokumaft:wind_bark_slash", { x: xran, y: yran, z: zran }, 5, "kurokumaft:projectile_2");
    shooting(player, "kurokumaft:wind_bark_slash", { x: xran, y: yran, z: zran }, 5, "kurokumaft:projectile_3");
  }, 5);
  system31.runTimeout(() => {
    system31.clearRun(intervalNum);
  }, 60);
}

// scripts/items/weapon/bread/StoneMagicBread.ts
import { EntityDamageCause as EntityDamageCause18 } from "@minecraft/server";
async function stoneDesires(player) {
  player.addTag("stone_desires");
  let { xlocation, ylocation, zlocation } = getLookPoints(player.getRotation(), player.location, 2);
  let targets = player.dimension.getEntities({
    excludeTags: [
      "stone_desires"
    ],
    excludeFamilies: [
      "inanimate",
      "magic",
      "player"
    ],
    excludeTypes: [
      "item"
    ],
    location: { x: xlocation, y: player.location.y + 0.5, z: zlocation },
    maxDistance: 3,
    closest: 1
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:stone_desires_particle ~~~");
    en.applyDamage(5, {
      cause: EntityDamageCause18.piston
    });
  });
  player.removeTag("stone_desires");
}
async function breakRockSlash(player) {
  let xran = parseFloat(getRandomInRange(-0.2, 0.1).toFixed(3));
  let yran = parseFloat(getRandomInRange(-0.2, 0.2).toFixed(3));
  let zran = parseFloat(getRandomInRange(-0.2, 0.2).toFixed(3));
  shooting(player, "kurokumaft:break_rock_slash", { x: xran, y: yran, z: zran }, 3, void 0);
}

// scripts/items/weapon/bread/ThunderMagicBread.ts
import { EntityDamageCause as EntityDamageCause19 } from "@minecraft/server";
async function thunderDesires(player) {
  player.addTag("thunder_desires");
  let { xlocation, ylocation, zlocation } = getLookPoints(player.getRotation(), player.location, 2);
  let targets = player.dimension.getEntities({
    excludeTags: [
      "thunder_desires"
    ],
    excludeFamilies: [
      "inanimate",
      "magic",
      "player"
    ],
    excludeTypes: [
      "item"
    ],
    location: { x: xlocation, y: player.location.y + 0.5, z: zlocation },
    maxDistance: 3,
    closest: 2
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:thunder_desires_particle ~~~");
    en.applyDamage(10, {
      cause: EntityDamageCause19.lightning
    });
  });
  player.removeTag("thunder_desires");
}
async function raizinBread(player) {
  let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  shooting(player, "kurokumaft:raizin_bread", { x: xran, y: yran, z: zran }, 4, void 0);
}

// scripts/items/weapon/bread/IceMagicBread.ts
import { EntityDamageCause as EntityDamageCause20 } from "@minecraft/server";
async function iceDesires(player) {
  player.addTag("ice_desires");
  let { xlocation, ylocation, zlocation } = getLookPoints(player.getRotation(), player.location, 2);
  let targets = player.dimension.getEntities({
    excludeTags: [
      "ice_desires"
    ],
    excludeFamilies: [
      "inanimate",
      "magic",
      "player"
    ],
    excludeTypes: [
      "item"
    ],
    location: { x: xlocation, y: player.location.y + 0.5, z: zlocation },
    maxDistance: 3,
    closest: 1
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:ice_desires_particle ~~~");
    en.applyDamage(10, {
      cause: EntityDamageCause20.freezing
    });
  });
  player.removeTag("ice_desires");
}
async function syusetuBread(player) {
  let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  shooting(player, "kurokumaft:syusetu_bread", { x: xran, y: yran, z: zran }, 4, "kurokumaft:projectile_1");
}

// scripts/items/weapon/bread/BreadWeaponMagic.ts
var BreadHitObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_bread",
    func: flamingDesires,
    sendMsg: "\xA7c\u7114\u88C2\u304D(\u307B\u3080\u3089\u3056\u304D)"
  },
  {
    itemName: "kurokumaft:water_magic_bread",
    func: aquaDesires,
    sendMsg: "\xA7b\u84BC\u7834\u65AC(\u305D\u3046\u306F\u3056\u3093)"
  },
  {
    itemName: "kurokumaft:wind_magic_bread",
    func: windDesires,
    sendMsg: "\xA7a\u70C8\u98A8\u5203(\u308C\u3063\u3077\u3046\u3058\u3093)"
  },
  {
    itemName: "kurokumaft:stone_magic_bread",
    func: stoneDesires,
    sendMsg: "\xA77\u5CA9\u5272\u5203(\u304C\u3093\u304B\u3064\u3058\u3093)"
  },
  {
    itemName: "kurokumaft:thunder_magic_bread",
    func: thunderDesires,
    sendMsg: "\xA76\u96F7\u65AC(\u3089\u3044\u304D\u308A)"
  },
  {
    itemName: "kurokumaft:ice_magic_bread",
    func: iceDesires,
    sendMsg: "\xA7f\u65AC\u96EA(\u3056\u3093\u305B\u3064)"
  }
]);
var BreadShotObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_bread",
    func: crimsonBread,
    sendMsg: "\xA7c\u7D05\u84EE\u5263(\u3050\u308C\u3093\u3051\u3093)"
  },
  {
    itemName: "kurokumaft:water_magic_bread",
    func: mercurySmash,
    sendMsg: "\xA7b\u6C34\u661F\u7815\u304D(\u3059\u3044\u305B\u3044\u304F\u3060\u304D)"
  },
  {
    itemName: "kurokumaft:wind_magic_bread",
    func: windBarkSlash,
    sendMsg: "\xA7a\u98A8\u9CF4\u5207(\u304B\u306A\u304D\u308A)"
  },
  {
    itemName: "kurokumaft:stone_magic_bread",
    func: breakRockSlash,
    sendMsg: "\xA77\u7834\u5CA9\u885D(\u306F\u304C\u3093\u3057\u3087\u3046)"
  },
  {
    itemName: "kurokumaft:thunder_magic_bread",
    func: raizinBread,
    sendMsg: "\xA76\u96F7\u795E\u5263(\u3089\u3044\u3058\u3093\u3051\u3093)"
  },
  {
    itemName: "kurokumaft:ice_magic_bread",
    func: syusetuBread,
    sendMsg: "\xA7f\u7D42\u96EA\u6C37\u6676(\u3057\u3085\u3046\u305B\u3064\u3072\u3087\u3046\u3057\u3087\u3046)"
  }
]);
var BreadWeaponMagic = class {
  // 通常攻撃
  onHitEntity(event) {
    let itemStack = event.itemStack;
    let attackEntity = event.attackingEntity;
    let hitEntity = event.hitEntity;
    let effect = event.hadEffect;
    if (!itemStack) {
      return;
    }
    let breadMagicObject = BreadHitObjects.find((obj) => obj.itemName == itemStack.typeId);
    breadMagicObject.func(attackEntity);
    attackEntity.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + breadMagicObject.sendMsg + '"}]}');
    if (attackEntity instanceof Player38 && attackEntity.getGameMode() != GameMode7.creative) {
      ItemDurabilityDamage(attackEntity, itemStack, EquipmentSlot17.Mainhand);
    }
  }
  // チャージ完了
  onCompleteUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
  }
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    if (!itemStack) {
      return;
    }
    let breadShotObject = BreadShotObjects.find((obj) => obj.itemName == itemStack.typeId);
    breadShotObject.func(player);
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + breadShotObject.sendMsg + '"}]}');
    if (player.getGameMode() != GameMode7.creative) {
      ItemDurabilityDamage(player, itemStack, EquipmentSlot17.Mainhand);
    }
    let cool = itemStack.getComponent(ItemComponentTypes10.Cooldown);
    cool.startCooldown(player);
  }
  // ブロッククリック
  onUseOn(event) {
  }
};

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
var BazookaShotMagic = class {
  // チャージ完了
  onCompleteUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
  }
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    if (!itemStack) {
      return;
    }
  }
  // ブロッククリック
  onUseOn(event) {
  }
};

// scripts/items/weapon/gun/GunWeaponMagic.ts
import { GameMode as GameMode8, EquipmentSlot as EquipmentSlot18 } from "@minecraft/server";
var GunChargeObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_gun",
    event: "kurokumaft:fire_magic_bullet",
    sendMsg: "\xA7c\u30D2\u30FC\u30C8\u30CF\u30B6\u30FC\u30C9",
    property: "kurokumaft:gun_charge_fire"
  },
  {
    itemName: "kurokumaft:water_magic_gun",
    event: "kurokumaft:water_magic_bullet",
    sendMsg: "\xA7b\u30A6\u30A9\u30FC\u30BF\u30FC\u30D0\u30FC\u30B9\u30C8",
    property: "kurokumaft:gun_charge_water"
  },
  {
    itemName: "kurokumaft:wind_magic_gun",
    event: "kurokumaft:wind_magic_bullet",
    sendMsg: "\xA7a\u30C6\u30F3\u30DA\u30B9\u30C8\u30D5\u30A1\u30F3\u30B0",
    property: "kurokumaft:gun_charge_wind"
  },
  {
    itemName: "kurokumaft:stone_magic_gun",
    event: "kurokumaft:stone_magic_bullet",
    sendMsg: "\xA77\u30AF\u30E9\u30C3\u30AF\u30ED\u30A2\u30FC",
    property: "kurokumaft:gun_charge_stone"
  },
  {
    itemName: "kurokumaft:lightning_magic_gun",
    event: "kurokumaft:lightning_magic_bullet",
    sendMsg: "\xA76\u30A2\u30DE\u30E9\u30AC\u30F3",
    property: "kurokumaft:gun_charge_lightning"
  },
  {
    itemName: "kurokumaft:ice_magic_gun",
    event: "kurokumaft:ice_magic_bullet",
    sendMsg: "\xA7f\u30B0\u30EC\u30A4\u30B7\u30A2\u30D5\u30A1\u30F3\u30B0",
    property: "kurokumaft:gun_charge_ice"
  }
]);
var GunShotMagic = class {
  // チャージ完了
  onCompleteUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    if (!itemStack) {
      return;
    }
    let gunMagicObject = GunChargeObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (gunMagicObject) {
      player.setProperty(gunMagicObject.property, 1);
      player.setDynamicProperty("gunCharge", "full");
    }
  }
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    if (!itemStack) {
      return;
    }
    let gunMagicObject = GunChargeObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (gunMagicObject) {
      if (player.getProperty(gunMagicObject.property) == 1 && player.getDynamicProperty("gunCharge") == "release") {
        magicGunShot(player, itemStack, gunMagicObject);
      }
    }
  }
};
async function magicGunShot(player, itemStack, gunMagicObject) {
  if (gunMagicObject.itemName == "kurokumaft:water_magic_gun") {
    shooting(player, gunMagicObject.event, { x: 0, y: 0, z: 0 }, 3, "kurokumaft:projectile_1");
    shooting(player, gunMagicObject.event, { x: 4, y: 0, z: 0 }, 3, "kurokumaft:projectile_2");
    shooting(player, gunMagicObject.event, { x: -4, y: 0, z: 0 }, 3, "kurokumaft:projectile_3");
    shooting(player, gunMagicObject.event, { x: 0, y: 4, z: 0 }, 3, "kurokumaft:projectile_4");
    shooting(player, gunMagicObject.event, { x: 2, y: 2, z: 0 }, 3, "kurokumaft:projectile_5");
    shooting(player, gunMagicObject.event, { x: -2, y: 2, z: 0 }, 3, "kurokumaft:projectile_6");
    shooting(player, gunMagicObject.event, { x: 2, y: 0, z: 0 }, 3, "kurokumaft:projectile_7");
    shooting(player, gunMagicObject.event, { x: -2, y: 0, z: 0 }, 3, "kurokumaft:projectile_8");
  } else {
    shooting(player, gunMagicObject.event, { x: 0, y: 0, z: 0 }, 3, void 0);
  }
  if (player.getGameMode() != GameMode8.creative) {
    ItemDurabilityDamage(player, itemStack, EquipmentSlot18.Mainhand);
  }
  player.setDynamicProperty("gunCharge", void 0);
  player.setProperty(gunMagicObject.property, 0);
}

// scripts/items/weapon/grimoire/SummonGrimoireMagic.ts
import { EquipmentSlot as EquipmentSlot19, GameMode as GameMode9 } from "@minecraft/server";
var SummonGrimoireObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_grimoire",
    particle: "kurokumaft:fire_bread_particle",
    sendMsg: "\xA7c\u9B54\u708E\u9CE5"
  }
]);
var SummonGrimoireMagic = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    let summonMagicObject = SummonGrimoireObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (summonMagicObject) {
      grimoire_summon_use(player, itemStack, summonMagicObject);
    }
  }
};
async function grimoire_summon_use(player, item, summonMagicObject) {
  player.runCommand("particle " + summonMagicObject.particle + " ~~0.75~");
}
async function grimoire_summon_Release(player, itemStack, duration) {
  player.setDynamicProperty("summon_grimoire", void 0);
  if (-duration >= 25) {
    let summonMagicObject = SummonGrimoireObjects.find((obj) => obj.itemName == itemStack.typeId);
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + summonMagicObject.sendMsg + '"}]}');
    if (player.getGameMode() != GameMode9.creative) {
      SummonGrimoireDurabilityDamage(player, itemStack, EquipmentSlot19.Mainhand);
    }
  }
}

// scripts/custom/CustomComponentRegistry.ts
function initRegisterCustom(initEvent) {
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:wand_magic", new WandWeaponMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:rod_magic", new RodWeaponMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:stick_magic", new StickWeaponMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:staff_magic", new StaffWeaponMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:sword_magic", new SwordWeaponMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:sword_magic_monster", new SwordWeaponMagicMons());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:bread_magic", new BreadWeaponMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:shield_magic", new ShieldMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:bow_magic", new BowShotMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:gun_magic", new GunShotMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:bazooka_magic", new BazookaShotMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:summon_grimoire", new SummonGrimoireMagic());
}
function initStateChangeMonitor(initEvent) {
  checkPlayerEquTick();
}

// scripts/magic_script.ts
var guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];
world18.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initRegisterCustom(initEvent);
  initStateChangeMonitor(initEvent);
});
world18.afterEvents.entityHitEntity.subscribe((event) => {
  var dameger = event.damagingEntity;
  var hitEn = event.hitEntity;
  if (hitEn.typeId == "minecraft:player") {
    shieldGuard(hitEn, true);
    shieldCounter(hitEn, dameger);
    hitMagicAmor(hitEn, dameger, void 0, void 0);
  }
});
world18.afterEvents.projectileHitEntity.subscribe((event) => {
  var projectileEn = event.projectile;
  var hitEn = event.getEntityHit().entity;
  var dameger = event.source;
  var hitVector = event.hitVector;
  if (hitEn != void 0 && hitEn.typeId == "minecraft:player") {
    shieldGuard(hitEn, false);
    shieldCounter(hitEn, dameger);
    hitMagicAmor(hitEn, dameger, projectileEn, hitVector);
  }
  if (projectileEn) {
  }
});
world18.afterEvents.projectileHitBlock.subscribe((event) => {
  var projectileEn = event.projectile;
  if (projectileEn) {
  }
});
world18.afterEvents.entityHurt.subscribe((event) => {
  var damageSource = event.damageSource;
  var hitEn = event.hurtEntity;
  if (hitEn != void 0 && hitEn.typeId == "minecraft:player" && damageSource.cause != "void") {
    if (guards.indexOf(damageSource.cause) != -1) {
      shieldGuard(hitEn, false);
    }
  }
});
world18.afterEvents.itemCompleteUse.subscribe((event) => {
  var en = event.source;
  var item = event.itemStack;
  if (en != void 0 && en.typeId == "minecraft:player" && item != void 0) {
    if (item.typeId === "kurokumaft:repatriation_fruit") {
      home_tp(en, item);
    }
  }
});
world18.afterEvents.itemUse.subscribe((event) => {
  var player = event.source;
  var item = event.itemStack;
  if (item != void 0) {
    if (item.typeId == "kurokumaft:grimoire_mowing") {
      mowing_use(player, item);
    } else if (item.typeId == "kurokumaft:grimoire_music_sound") {
      music_sound_use(player, item);
    }
  }
});
world18.afterEvents.itemReleaseUse.subscribe((event) => {
  var player = event.source;
  var item = event.itemStack;
  var duration = event.useDuration;
  if (item != void 0) {
    world18.sendMessage("\u6B8B\u308A\u4F7F\u7528\u6642\u9593:" + duration);
    if (player.getDynamicProperty("summon_grimoire")) {
      grimoire_summon_Release(player, item, duration);
    }
    if (player.getDynamicProperty("BowShotMagicCharge")) {
      magicBowShot(player, item, duration);
    }
    if (player.getDynamicProperty("gunCharge") == "full") {
      player.setDynamicProperty("gunCharge", "release");
    }
  }
});
world18.afterEvents.itemUseOn.subscribe((event) => {
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
world18.beforeEvents.itemUseOn.subscribe((event) => {
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
world18.beforeEvents.playerBreakBlock.subscribe((event) => {
  var player = event.player;
  var block = event.block;
  if (player != void 0) {
    if (block.typeId == "kurokumaft:magic_lectern") {
      magic_lectern_break(player, block);
    }
  }
});
world18.afterEvents.entityLoad.subscribe((event) => {
  var entity = event.entity;
});
world18.afterEvents.entitySpawn.subscribe((event) => {
  var entity = event.entity;
  var cause = event.cause;
});

//# sourceMappingURL=../debug/magic_script.js.map
