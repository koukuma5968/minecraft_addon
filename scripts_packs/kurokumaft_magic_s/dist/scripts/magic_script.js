// scripts/magic_script.ts
import { world as world24 } from "@minecraft/server";

// scripts/items/weapon/shield/shieldEvent.ts
import {
  system as system2,
  EntityComponentTypes as EntityComponentTypes2,
  ItemComponentTypes as ItemComponentTypes2,
  EquipmentSlot as EquipmentSlot2
} from "@minecraft/server";

// scripts/common/commonUtil.ts
import { world, system, EntityComponentTypes, ItemComponentTypes, Direction } from "@minecraft/server";
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
    let yRotax = -rotation.y / piNum;
    let yRotaz = -(rotation.y - 90) / piNum;
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
    let yRotax = (rotation.y - 180) / piNum;
    let yRotaz = -(rotation.y - 90) / piNum;
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
  }
  return { xlocation, ylocation, zlocation };
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

// scripts/items/weapon/armor/magicAmorHitEvent.ts
import { system as system3, EntityComponentTypes as EntityComponentTypes3, EquipmentSlot as EquipmentSlot3 } from "@minecraft/server";
async function hitMagicAmor(player, damager, projectile, hitVector) {
  let equ = player.getComponent(EntityComponentTypes3.Equippable);
  if (!equ) {
    return;
  }
  let chest = equ.getEquipment(EquipmentSlot3.Chest);
  let legs = equ.getEquipment(EquipmentSlot3.Legs);
  let head = equ.getEquipment(EquipmentSlot3.Head);
  if (chest != void 0) {
    if (damager != void 0 && projectile == void 0) {
      if (chest.typeId == "kurokumaft:stone_magic_chestplate" || chest.typeId == "kurokumaft:nether_stone_magic_chestplate") {
        let view = player.getViewDirection();
        damager.applyDamage(5, { "cause": "entityExplosion" });
        damager.dimension.spawnParticle("minecraft:large_explosion", damager.location);
        damager.applyKnockback(Math.round(view.x) * 10, Math.round(view.z) * 10, 10, 1);
      }
      if (chest.typeId == "kurokumaft:lightning_magic_chestplate" || chest.typeId == "kurokumaft:nether_lightning_magic_chest") {
        damager.applyDamage(5, { "cause": "lightning" });
        damager.dimension.spawnParticle("kurokumaft:lightning_arrow_particle", damager.location);
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
        damager.teleport({ x: location.x + randomInRange1, y: location.y, z: location.z + randomInRange2 });
      }
    }
  }
  if (head != void 0) {
    if ((head.typeId == "kurokumaft:lightning_magic_helmet" || head.typeId == "kurokumaft:nether_lightning_magic_helmet") && projectile != void 0) {
      try {
        projectile.clearVelocity();
        projectile.dimension.spawnParticle("kurokumaft:lightning_arrow_particle", projectile.location);
        let intervalNum = system3.runInterval(() => {
          projectile.clearVelocity();
        }, 5);
        system3.runTimeout(() => {
          system3.clearRun(intervalNum);
        }, 30);
      } catch (error) {
      }
    }
    if ((head.typeId == "kurokumaft:wind_magic_helmet" || head.typeId == "kurokumaft:nether_wind_magic_helmet") && projectile != void 0) {
      try {
        projectile.clearVelocity();
        projectile.dimension.spawnParticle("kurokumaft:wind_arrow_particle", projectile.location);
        projectile.applyImpulse({ x: hitVector.x, y: hitVector.y, z: -hitVector.z });
      } catch (error) {
      }
    }
  }
}

// scripts/items/weapon/wand/WandWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot5, GameMode, ItemComponentTypes as ItemComponentTypes4, Player as Player7, world as world3 } from "@minecraft/server";

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
  return bulet;
}

// scripts/common/ItemDurabilityDamage.ts
import { ItemStack as ItemStack2, ItemComponentTypes as ItemComponentTypes3, EntityComponentTypes as EntityComponentTypes4 } from "@minecraft/server";
async function ItemDurabilityDamage(entity, item, slot) {
  let equ = entity.getComponent(EntityComponentTypes4.Equippable);
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
  let equ = entity.getComponent(EntityComponentTypes4.Equippable);
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
    let inventory = player.getComponent(EntityComponentTypes4.Inventory);
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

// scripts/items/weapon/wand/SnowWandMagic.ts
async function deepSnow(player) {
  player.addTag("deepSnow_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "deepSnow_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 10,
    closest: 1
  });
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

// scripts/items/weapon/wand/DarkWandMagic.ts
import { TicksPerSecond } from "@minecraft/server";

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
  MinecraftBlockTypes2["ChemistryTable"] = "minecraft:chemistry_table";
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
  MinecraftBlockTypes2["ColoredTorchBp"] = "minecraft:colored_torch_bp";
  MinecraftBlockTypes2["ColoredTorchRg"] = "minecraft:colored_torch_rg";
  MinecraftBlockTypes2["CommandBlock"] = "minecraft:command_block";
  MinecraftBlockTypes2["Composter"] = "minecraft:composter";
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
  MinecraftBlockTypes2["DetectorRail"] = "minecraft:detector_rail";
  MinecraftBlockTypes2["DiamondBlock"] = "minecraft:diamond_block";
  MinecraftBlockTypes2["DiamondOre"] = "minecraft:diamond_ore";
  MinecraftBlockTypes2["Diorite"] = "minecraft:diorite";
  MinecraftBlockTypes2["DioriteDoubleSlab"] = "minecraft:diorite_double_slab";
  MinecraftBlockTypes2["DioriteSlab"] = "minecraft:diorite_slab";
  MinecraftBlockTypes2["DioriteStairs"] = "minecraft:diorite_stairs";
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
  MinecraftBlockTypes2["MossyStoneBrickDoubleSlab"] = "minecraft:mossy_stone_brick_double_slab";
  MinecraftBlockTypes2["MossyStoneBrickSlab"] = "minecraft:mossy_stone_brick_slab";
  MinecraftBlockTypes2["MossyStoneBrickStairs"] = "minecraft:mossy_stone_brick_stairs";
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
  MinecraftBlockTypes2["RedSand"] = "minecraft:red_sand";
  MinecraftBlockTypes2["RedSandstone"] = "minecraft:red_sandstone";
  MinecraftBlockTypes2["RedSandstoneDoubleSlab"] = "minecraft:red_sandstone_double_slab";
  MinecraftBlockTypes2["RedSandstoneSlab"] = "minecraft:red_sandstone_slab";
  MinecraftBlockTypes2["RedSandstoneStairs"] = "minecraft:red_sandstone_stairs";
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
var MinecraftEntityTypes = ((MinecraftEntityTypes22) => {
  MinecraftEntityTypes22["Agent"] = "minecraft:agent";
  MinecraftEntityTypes22["Allay"] = "minecraft:allay";
  MinecraftEntityTypes22["AreaEffectCloud"] = "minecraft:area_effect_cloud";
  MinecraftEntityTypes22["Armadillo"] = "minecraft:armadillo";
  MinecraftEntityTypes22["ArmorStand"] = "minecraft:armor_stand";
  MinecraftEntityTypes22["Arrow"] = "minecraft:arrow";
  MinecraftEntityTypes22["Axolotl"] = "minecraft:axolotl";
  MinecraftEntityTypes22["Bat"] = "minecraft:bat";
  MinecraftEntityTypes22["Bee"] = "minecraft:bee";
  MinecraftEntityTypes22["Blaze"] = "minecraft:blaze";
  MinecraftEntityTypes22["Boat"] = "minecraft:boat";
  MinecraftEntityTypes22["Bogged"] = "minecraft:bogged";
  MinecraftEntityTypes22["Breeze"] = "minecraft:breeze";
  MinecraftEntityTypes22["BreezeWindChargeProjectile"] = "minecraft:breeze_wind_charge_projectile";
  MinecraftEntityTypes22["Camel"] = "minecraft:camel";
  MinecraftEntityTypes22["Cat"] = "minecraft:cat";
  MinecraftEntityTypes22["CaveSpider"] = "minecraft:cave_spider";
  MinecraftEntityTypes22["ChestBoat"] = "minecraft:chest_boat";
  MinecraftEntityTypes22["ChestMinecart"] = "minecraft:chest_minecart";
  MinecraftEntityTypes22["Chicken"] = "minecraft:chicken";
  MinecraftEntityTypes22["Cod"] = "minecraft:cod";
  MinecraftEntityTypes22["CommandBlockMinecart"] = "minecraft:command_block_minecart";
  MinecraftEntityTypes22["Cow"] = "minecraft:cow";
  MinecraftEntityTypes22["Creeper"] = "minecraft:creeper";
  MinecraftEntityTypes22["Dolphin"] = "minecraft:dolphin";
  MinecraftEntityTypes22["Donkey"] = "minecraft:donkey";
  MinecraftEntityTypes22["DragonFireball"] = "minecraft:dragon_fireball";
  MinecraftEntityTypes22["Drowned"] = "minecraft:drowned";
  MinecraftEntityTypes22["Egg"] = "minecraft:egg";
  MinecraftEntityTypes22["ElderGuardian"] = "minecraft:elder_guardian";
  MinecraftEntityTypes22["EnderCrystal"] = "minecraft:ender_crystal";
  MinecraftEntityTypes22["EnderDragon"] = "minecraft:ender_dragon";
  MinecraftEntityTypes22["EnderPearl"] = "minecraft:ender_pearl";
  MinecraftEntityTypes22["Enderman"] = "minecraft:enderman";
  MinecraftEntityTypes22["Endermite"] = "minecraft:endermite";
  MinecraftEntityTypes22["EvocationIllager"] = "minecraft:evocation_illager";
  MinecraftEntityTypes22["EyeOfEnderSignal"] = "minecraft:eye_of_ender_signal";
  MinecraftEntityTypes22["Fireball"] = "minecraft:fireball";
  MinecraftEntityTypes22["FireworksRocket"] = "minecraft:fireworks_rocket";
  MinecraftEntityTypes22["FishingHook"] = "minecraft:fishing_hook";
  MinecraftEntityTypes22["Fox"] = "minecraft:fox";
  MinecraftEntityTypes22["Frog"] = "minecraft:frog";
  MinecraftEntityTypes22["Ghast"] = "minecraft:ghast";
  MinecraftEntityTypes22["GlowSquid"] = "minecraft:glow_squid";
  MinecraftEntityTypes22["Goat"] = "minecraft:goat";
  MinecraftEntityTypes22["Guardian"] = "minecraft:guardian";
  MinecraftEntityTypes22["Hoglin"] = "minecraft:hoglin";
  MinecraftEntityTypes22["HopperMinecart"] = "minecraft:hopper_minecart";
  MinecraftEntityTypes22["Horse"] = "minecraft:horse";
  MinecraftEntityTypes22["Husk"] = "minecraft:husk";
  MinecraftEntityTypes22["IronGolem"] = "minecraft:iron_golem";
  MinecraftEntityTypes22["LightningBolt"] = "minecraft:lightning_bolt";
  MinecraftEntityTypes22["LingeringPotion"] = "minecraft:lingering_potion";
  MinecraftEntityTypes22["Llama"] = "minecraft:llama";
  MinecraftEntityTypes22["LlamaSpit"] = "minecraft:llama_spit";
  MinecraftEntityTypes22["MagmaCube"] = "minecraft:magma_cube";
  MinecraftEntityTypes22["Minecart"] = "minecraft:minecart";
  MinecraftEntityTypes22["Mooshroom"] = "minecraft:mooshroom";
  MinecraftEntityTypes22["Mule"] = "minecraft:mule";
  MinecraftEntityTypes22["Npc"] = "minecraft:npc";
  MinecraftEntityTypes22["Ocelot"] = "minecraft:ocelot";
  MinecraftEntityTypes22["OminousItemSpawner"] = "minecraft:ominous_item_spawner";
  MinecraftEntityTypes22["Panda"] = "minecraft:panda";
  MinecraftEntityTypes22["Parrot"] = "minecraft:parrot";
  MinecraftEntityTypes22["Phantom"] = "minecraft:phantom";
  MinecraftEntityTypes22["Pig"] = "minecraft:pig";
  MinecraftEntityTypes22["Piglin"] = "minecraft:piglin";
  MinecraftEntityTypes22["PiglinBrute"] = "minecraft:piglin_brute";
  MinecraftEntityTypes22["Pillager"] = "minecraft:pillager";
  MinecraftEntityTypes22["Player"] = "minecraft:player";
  MinecraftEntityTypes22["PolarBear"] = "minecraft:polar_bear";
  MinecraftEntityTypes22["Pufferfish"] = "minecraft:pufferfish";
  MinecraftEntityTypes22["Rabbit"] = "minecraft:rabbit";
  MinecraftEntityTypes22["Ravager"] = "minecraft:ravager";
  MinecraftEntityTypes22["Salmon"] = "minecraft:salmon";
  MinecraftEntityTypes22["Sheep"] = "minecraft:sheep";
  MinecraftEntityTypes22["Shulker"] = "minecraft:shulker";
  MinecraftEntityTypes22["ShulkerBullet"] = "minecraft:shulker_bullet";
  MinecraftEntityTypes22["Silverfish"] = "minecraft:silverfish";
  MinecraftEntityTypes22["Skeleton"] = "minecraft:skeleton";
  MinecraftEntityTypes22["SkeletonHorse"] = "minecraft:skeleton_horse";
  MinecraftEntityTypes22["Slime"] = "minecraft:slime";
  MinecraftEntityTypes22["SmallFireball"] = "minecraft:small_fireball";
  MinecraftEntityTypes22["Sniffer"] = "minecraft:sniffer";
  MinecraftEntityTypes22["SnowGolem"] = "minecraft:snow_golem";
  MinecraftEntityTypes22["Snowball"] = "minecraft:snowball";
  MinecraftEntityTypes22["Spider"] = "minecraft:spider";
  MinecraftEntityTypes22["SplashPotion"] = "minecraft:splash_potion";
  MinecraftEntityTypes22["Squid"] = "minecraft:squid";
  MinecraftEntityTypes22["Stray"] = "minecraft:stray";
  MinecraftEntityTypes22["Strider"] = "minecraft:strider";
  MinecraftEntityTypes22["Tadpole"] = "minecraft:tadpole";
  MinecraftEntityTypes22["ThrownTrident"] = "minecraft:thrown_trident";
  MinecraftEntityTypes22["Tnt"] = "minecraft:tnt";
  MinecraftEntityTypes22["TntMinecart"] = "minecraft:tnt_minecart";
  MinecraftEntityTypes22["TraderLlama"] = "minecraft:trader_llama";
  MinecraftEntityTypes22["TripodCamera"] = "minecraft:tripod_camera";
  MinecraftEntityTypes22["Tropicalfish"] = "minecraft:tropicalfish";
  MinecraftEntityTypes22["Turtle"] = "minecraft:turtle";
  MinecraftEntityTypes22["Vex"] = "minecraft:vex";
  MinecraftEntityTypes22["Villager"] = "minecraft:villager";
  MinecraftEntityTypes22["VillagerV2"] = "minecraft:villager_v2";
  MinecraftEntityTypes22["Vindicator"] = "minecraft:vindicator";
  MinecraftEntityTypes22["WanderingTrader"] = "minecraft:wandering_trader";
  MinecraftEntityTypes22["Warden"] = "minecraft:warden";
  MinecraftEntityTypes22["WindChargeProjectile"] = "minecraft:wind_charge_projectile";
  MinecraftEntityTypes22["Witch"] = "minecraft:witch";
  MinecraftEntityTypes22["Wither"] = "minecraft:wither";
  MinecraftEntityTypes22["WitherSkeleton"] = "minecraft:wither_skeleton";
  MinecraftEntityTypes22["WitherSkull"] = "minecraft:wither_skull";
  MinecraftEntityTypes22["WitherSkullDangerous"] = "minecraft:wither_skull_dangerous";
  MinecraftEntityTypes22["Wolf"] = "minecraft:wolf";
  MinecraftEntityTypes22["XpBottle"] = "minecraft:xp_bottle";
  MinecraftEntityTypes22["XpOrb"] = "minecraft:xp_orb";
  MinecraftEntityTypes22["Zoglin"] = "minecraft:zoglin";
  MinecraftEntityTypes22["Zombie"] = "minecraft:zombie";
  MinecraftEntityTypes22["ZombieHorse"] = "minecraft:zombie_horse";
  MinecraftEntityTypes22["ZombiePigman"] = "minecraft:zombie_pigman";
  MinecraftEntityTypes22["ZombieVillager"] = "minecraft:zombie_villager";
  MinecraftEntityTypes22["ZombieVillagerV2"] = "minecraft:zombie_villager_v2";
  return MinecraftEntityTypes22;
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
  MinecraftItemTypes2["MossyStoneBrickSlab"] = "minecraft:mossy_stone_brick_slab";
  MinecraftItemTypes2["MossyStoneBrickStairs"] = "minecraft:mossy_stone_brick_stairs";
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
  MinecraftItemTypes2["RedSand"] = "minecraft:red_sand";
  MinecraftItemTypes2["RedSandstone"] = "minecraft:red_sandstone";
  MinecraftItemTypes2["RedSandstoneSlab"] = "minecraft:red_sandstone_slab";
  MinecraftItemTypes2["RedSandstoneStairs"] = "minecraft:red_sandstone_stairs";
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

// scripts/items/weapon/wand/DarkWandMagic.ts
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
import { TicksPerSecond as TicksPerSecond2 } from "@minecraft/server";
async function healing(player) {
  player.addEffect(MinecraftEffectTypes.InstantHealth, 1 * TicksPerSecond2, {
    amplifier: 1
  });
}
async function recovery(player) {
  player.runCommand("/effect " + player.nameTag + " clear");
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
  },
  {
    itemName: "kurokumaft:snow_wand",
    event: "ice/icewall",
    sendMsg: "\xA7f\u30A2\u30A4\u30B9\u30A6\u30A9\u30FC\u30EB"
  }
]);
var OtherUpMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:snow_wand",
    func: deepSnow,
    sendMsg: "\xA7f\u30C7\u30A3\u30FC\u30D7\u30B9\u30CE\u30FC"
  },
  {
    itemName: "kurokumaft:dark_wand",
    func: absorption,
    sendMsg: "\xA78\u30A2\u30D6\u30BD\u30FC\u30D7\u30B7\u30E7\u30F3"
  },
  {
    itemName: "kurokumaft:light_wand",
    func: healing,
    sendMsg: "\xA7e\u30D2\u30FC\u30EA\u30F3\u30B0"
  }
]);
var OtherDownMagicObjects = Object.freeze([
  {
    itemName: "kurokumaft:dark_wand",
    func: invisibility,
    sendMsg: "\xA78\u30A4\u30F3\u30D3\u30B8\u30D6\u30EB"
  },
  {
    itemName: "kurokumaft:light_wand",
    func: recovery,
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
    if (!itemStack || hitEntity instanceof Player7 && !world3.gameRules.pvp) {
      return;
    }
    let wandMagic = WandHitObjects.find((obj) => obj.itemName == itemStack.typeId);
    attackEntity.runCommand("/function magic/" + wandMagic.event);
    attackEntity.runCommand("/titleraw @s actionbar " + JSON.stringify({
      rawtext: [{ text: wandMagic.sendMsg }]
    }));
  }
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    let xran = parseFloat(getRandomInRange(-0.1, 0.5).toFixed(3));
    let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let wandMagic;
    if (player.isSneaking) {
      wandMagic = WallMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
      if (wandMagic) {
        player.runCommand("/function magic/" + wandMagic.event);
      } else {
        wandMagic = OtherDownMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        wandMagic.func(player);
      }
    } else {
      wandMagic = BallMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
      if (wandMagic) {
        throwing(player, itemStack, wandMagic.event, { x: xran, y: yran, z: zran });
      } else {
        wandMagic = OtherUpMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        wandMagic.func(player);
      }
    }
    let rawMessage = {
      rawtext: [{ text: wandMagic.sendMsg }]
    };
    player.runCommand("/titleraw @s actionbar " + JSON.stringify(rawMessage));
    if (player.getGameMode() != GameMode.creative) {
      ItemDurabilityDamage(player, itemStack, EquipmentSlot5.Mainhand);
    }
    let cool = itemStack.getComponent(ItemComponentTypes4.Cooldown);
    cool.startCooldown(player);
  }
};
var WandProjectileObjects = Object.freeze([
  {
    itemName: "kurokumaft:fireballmagic",
    event: "fire/fireball"
  },
  {
    itemName: "kurokumaft:waterballmagic",
    event: "water/waterball"
  },
  {
    itemName: "kurokumaft:windcuttermagic",
    event: "wind/windcutter"
  },
  {
    itemName: "kurokumaft:stonebarrettemagic",
    event: "stone/stonebarrette"
  },
  {
    itemName: "kurokumaft:lightningboltmagic",
    event: "lightning/lightningbolt"
  }
]);
function checkWandProjectile(projectileName) {
  return WandProjectileObjects.some((obj) => obj.itemName == projectileName);
}
function hitProjectileEvent(projectile) {
  let proje = WandProjectileObjects.find((obj) => obj.itemName == projectile.typeId);
  try {
    projectile.runCommand("/function magic/" + proje.event);
    projectile.remove();
  } catch (error) {
  }
}

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
import { Player as Player8, GameMode as GameMode2, EquipmentSlot as EquipmentSlot6 } from "@minecraft/server";
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
      ItemDurabilityDamage(attackEntity, itemStack, EquipmentSlot6.Mainhand);
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
      ItemDurabilityDamage(player, itemStack, EquipmentSlot6.Mainhand);
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
    ItemDurabilityDamage(attackEntity, itemStack, EquipmentSlot6.Mainhand);
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
import { GameMode as GameMode3, EquipmentSlot as EquipmentSlot7 } from "@minecraft/server";

// scripts/items/weapon/bow/FireArrowMagic.ts
import { EntityDamageCause as EntityDamageCause3, system as system6, TicksPerSecond as TicksPerSecond3 } from "@minecraft/server";
async function fireArrow(entity) {
  let intervalNum = system6.runInterval(() => {
    if (entity.isValid()) {
      entity.applyDamage(3, {
        cause: EntityDamageCause3.fireTick
      });
    }
  }, TicksPerSecond3);
  system6.runTimeout(() => {
    system6.clearRun(intervalNum);
  }, TicksPerSecond3 * 4);
}

// scripts/items/weapon/bow/WaterArrowMagic.ts
import { EntityDamageCause as EntityDamageCause4, system as system7, TicksPerSecond as TicksPerSecond4 } from "@minecraft/server";
async function waterArrowHoming(player, arrow, loca, speed) {
  let water2 = shooting(player, arrow, loca, 1.5, void 0);
  water2.addTag("waterarrow");
  let intervalNum = system7.runInterval(() => {
    if (water2 != void 0 && water2.isValid()) {
      let target = water2.dimension.getEntities({
        excludeTags: [
          "waterarrow"
        ],
        excludeFamilies: [
          "inanimate",
          "magic",
          "player",
          "arrow"
        ],
        excludeTypes: [
          "item"
        ],
        location: water2.location,
        maxDistance: 30,
        closest: 1
      });
      if (target != void 0 && target.length > 0) {
        let targetLoc = getDirectionVector(water2.location, target[0].location);
        let tpLoc = {
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
    } else {
      system7.clearRun(intervalNum);
    }
  }, 5);
  system7.runTimeout(() => {
    if (water2 != void 0 && water2.isValid()) {
      water2.removeTag("waterarrow");
      water2.remove();
    }
    system7.clearRun(intervalNum);
  }, 10 * TicksPerSecond4);
}
async function waterArrow(entity) {
  let intervalNum = system7.runInterval(() => {
    if (entity.isValid()) {
      entity.applyDamage(3, {
        cause: EntityDamageCause4.drowning
      });
    }
  }, TicksPerSecond4);
  system7.runTimeout(() => {
    system7.clearRun(intervalNum);
  }, TicksPerSecond4 * 4);
}

// scripts/items/weapon/bow/WindArrowMagic.ts
import { EntityDamageCause as EntityDamageCause5, system as system8, TicksPerSecond as TicksPerSecond5 } from "@minecraft/server";
async function windArrowShot(player, arrow, loca, speed) {
  let intervalNum = system8.runInterval(() => {
    shooting(player, arrow, loca, speed, void 0);
  }, 2);
  system8.runTimeout(() => {
    system8.clearRun(intervalNum);
  }, 10);
}
async function windArrow(entity) {
  let intervalNum = system8.runInterval(() => {
    if (entity.isValid()) {
      entity.applyDamage(3, {
        cause: EntityDamageCause5.fall
      });
    }
  }, TicksPerSecond5);
  system8.runTimeout(() => {
    system8.clearRun(intervalNum);
  }, TicksPerSecond5 * 4);
}

// scripts/items/weapon/bow/StoneArrowMagic.ts
import { EntityDamageCause as EntityDamageCause6, system as system9, TicksPerSecond as TicksPerSecond6 } from "@minecraft/server";
async function stoneArrow(entity) {
  entity.applyKnockback(1, 1, 1, 1);
  let intervalNum = system9.runInterval(() => {
    if (entity.isValid()) {
      entity.applyDamage(3, {
        cause: EntityDamageCause6.thorns
      });
    }
  }, TicksPerSecond6);
  system9.runTimeout(() => {
    system9.clearRun(intervalNum);
  }, TicksPerSecond6 * 4);
}

// scripts/items/weapon/bow/LightningArrowMagic.ts
import { EntityDamageCause as EntityDamageCause7, system as system10, TicksPerSecond as TicksPerSecond7 } from "@minecraft/server";
async function lightningArrow(entity) {
  let intervalNum = system10.runInterval(() => {
    if (entity.isValid()) {
      entity.dimension.spawnParticle("kurokumaft:thunder_desires_particle", entity.location);
      entity.applyDamage(3, {
        cause: EntityDamageCause7.lightning
      });
    }
  }, TicksPerSecond7);
  system10.runTimeout(() => {
    system10.clearRun(intervalNum);
  }, TicksPerSecond7 * 4);
}

// scripts/items/weapon/bow/IceArrowMagic.ts
import { EntityDamageCause as EntityDamageCause8, system as system11, TicksPerSecond as TicksPerSecond8 } from "@minecraft/server";
async function iceArrow(entity) {
  let intervalNum = system11.runInterval(() => {
    if (entity.isValid()) {
      entity.applyDamage(3, {
        cause: EntityDamageCause8.freezing
      });
    }
  }, TicksPerSecond8);
  system11.runTimeout(() => {
    system11.clearRun(intervalNum);
  }, TicksPerSecond8 * 4);
}

// scripts/items/weapon/bow/DarkArrowMagic.ts
import { EntityDamageCause as EntityDamageCause9, system as system12, TicksPerSecond as TicksPerSecond9 } from "@minecraft/server";
async function darkArrow(entity) {
  let intervalNum = system12.runInterval(() => {
    if (entity.isValid()) {
      entity.applyDamage(3, {
        cause: EntityDamageCause9.wither
      });
    }
  }, TicksPerSecond9);
  system12.runTimeout(() => {
    system12.clearRun(intervalNum);
  }, TicksPerSecond9 * 4);
}

// scripts/items/weapon/bow/HollyArrowMagic.ts
import { EntityDamageCause as EntityDamageCause10, system as system13, TicksPerSecond as TicksPerSecond10 } from "@minecraft/server";
async function hollyArrow(entity) {
  let intervalNum = system13.runInterval(() => {
    if (entity.isValid()) {
      entity.applyDamage(3, {
        cause: EntityDamageCause10.none
      });
    }
  }, TicksPerSecond10);
  system13.runTimeout(() => {
    system13.clearRun(intervalNum);
  }, TicksPerSecond10 * 4);
}

// scripts/items/weapon/bow/BowWeaponMagic.ts
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
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    if (!itemStack) {
      return;
    }
    player.setDynamicProperty("BowShotMagicCharge", true);
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
      windArrowShot(player, bowMagicObject.event, { x: xran, y: yran, z: zran }, speed);
    } else if (itemStack.typeId == "kurokumaft:water_magic_bow") {
      waterArrowHoming(player, bowMagicObject.event, { x: xran, y: yran, z: zran }, speed);
    } else {
      shooting(player, bowMagicObject.event, { x: xran, y: yran, z: zran }, speed, void 0);
    }
    if (player.getGameMode() != GameMode3.creative) {
      ItemDurabilityDamage(player, itemStack, EquipmentSlot7.Mainhand);
    }
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
  let proje = BowCProjectilehargeObjects.find((obj) => obj.itemName == projectile.typeId);
  try {
    proje.func(target);
  } catch (error) {
  }
}

// scripts/player/armorEquipment.ts
import { EntityComponentTypes as EntityComponentTypes9, EquipmentSlot as EquipmentSlot12, system as system19, world as world9 } from "@minecraft/server";

// scripts/items/weapon/armor/MagicHelmetSurveillance.ts
import { EntityComponentTypes as EntityComponentTypes5, EquipmentSlot as EquipmentSlot8, system as system15, TicksPerSecond as TicksPerSecond11 } from "@minecraft/server";
var MagicHelmetObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_helmet",
    func: fireResistanceEffect,
    delay: TicksPerSecond11 * 10,
    removeFunc: fireResistanceEffectReset
  },
  {
    itemName: "kurokumaft:water_magic_helmet",
    func: waterBreathingEffect,
    delay: TicksPerSecond11 * 10,
    removeFunc: waterBreathingEffectReset
  },
  {
    itemName: "kurokumaft:stone_magic_helmet",
    func: resistanceEffect,
    delay: TicksPerSecond11 * 10,
    removeFunc: resistanceEffectReset
  },
  {
    itemName: "kurokumaft:ice_magic_helmet",
    func: nightVisionEffect,
    delay: TicksPerSecond11 * 10,
    removeFunc: nightVisionEffectReset
  },
  {
    itemName: "kurokumaft:nether_fire_magic_helmet",
    func: fireResistanceEffect,
    delay: TicksPerSecond11 * 10,
    removeFunc: fireResistanceEffectReset
  },
  {
    itemName: "kurokumaft:nether_water_magic_helmet",
    func: waterBreathingEffect,
    delay: TicksPerSecond11 * 10,
    removeFunc: waterBreathingEffectReset
  },
  {
    itemName: "kurokumaft:nether_stone_magic_helmet",
    func: resistanceEffect,
    delay: TicksPerSecond11 * 10,
    removeFunc: resistanceEffectReset
  },
  {
    itemName: "kurokumaft:nether_ice_magic_helmet",
    func: nightVisionEffect,
    delay: TicksPerSecond11 * 10,
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
    let equ = this.player.getComponent(EntityComponentTypes5.Equippable);
    let head = equ.getEquipment(EquipmentSlot8.Head);
    if (head != null && head.typeId == equItem.itemName) {
      this.player.setDynamicProperty("magic_helmet_equ", true);
      equItem.func(this.player);
      system15.runTimeout(() => {
        system15.run(this.checkJob.bind(this));
      }, equItem.delay);
    } else {
      equItem.removeFunc(this.player);
      this.player.setDynamicProperty("magic_helmet_equ", false);
    }
  }
};
async function fireResistanceEffect(player) {
  player.addEffect("fire_resistance", TicksPerSecond11 * 60, {
    amplifier: 5,
    showParticles: false
  });
}
async function waterBreathingEffect(player) {
  player.addEffect("water_breathing", TicksPerSecond11 * 60, {
    amplifier: 5,
    showParticles: false
  });
}
async function resistanceEffect(player) {
  player.addEffect("resistance", TicksPerSecond11 * 60, {
    amplifier: 3,
    showParticles: false
  });
}
async function nightVisionEffect(player) {
  player.addEffect("night_vision", TicksPerSecond11 * 60, {
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
import { EntityComponentTypes as EntityComponentTypes6, EquipmentSlot as EquipmentSlot9, system as system16, TicksPerSecond as TicksPerSecond12 } from "@minecraft/server";
var MagicChestObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_chestplate",
    func: fireAttackUp,
    delay: TicksPerSecond12,
    removeFunc: fireAttackReset
  },
  {
    itemName: "kurokumaft:water_magic_chestplate",
    func: waterHealthUp,
    delay: TicksPerSecond12 * 20,
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
    delay: TicksPerSecond12,
    removeFunc: fireAttackReset
  },
  {
    itemName: "kurokumaft:nether_water_magic_chestplate",
    func: waterHealthUp,
    delay: TicksPerSecond12 * 10,
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
    let equ = this.player.getComponent(EntityComponentTypes6.Equippable);
    let chest = equ.getEquipment(EquipmentSlot9.Chest);
    if (chest != null && chest.typeId == equItem.itemName) {
      this.player.setDynamicProperty("magic_chest_equ", true);
      equItem.func(this.player);
      system16.runTimeout(() => {
        system16.run(this.checkJob.bind(this));
      }, equItem.delay);
    } else {
      equItem.removeFunc(this.player);
      this.player.setDynamicProperty("magic_Chest_equ", false);
    }
  }
};
async function fireAttackUp(player) {
  player.triggerEvent("kurokumaft:attack20_up");
}
async function waterHealthUp(player) {
  player.addEffect(MinecraftPotionEffectTypes.Healing, 10 * TicksPerSecond12, {
    amplifier: 2,
    showParticles: true
  });
}
async function lavaFreeze(player) {
  for (let x = -2; x <= 2; x++) {
    for (let z = -2; x <= 2; x++) {
      for (let y = -2; y <= 2; y++) {
        let underBlock = player.dimension.getBlock({ x: player.location.x + x, y: player.location.y + y, z: player.location.z + z });
        if (underBlock.typeId == MinecraftBlockTypes.Lava || underBlock.typeId == MinecraftBlockTypes.Magma) {
          player.dimension.setBlockType({ x: player.location.x + x, y: player.location.y + y, z: player.location.z + z }, MinecraftBlockTypes.Ice);
        }
      }
    }
  }
}
async function fireAttackReset(player) {
  player.triggerEvent("kurokumaft:attack_down");
}
async function waterHealthReset(player) {
}
async function lavaFreezeReset(player) {
}

// scripts/items/weapon/armor/MagicLeggingsSurveillance.ts
import { EntityComponentTypes as EntityComponentTypes7, EquipmentSlot as EquipmentSlot10, system as system17, TicksPerSecond as TicksPerSecond13 } from "@minecraft/server";
var MagicLeggingsObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_magic_leggings",
    func: jumpBoostEffect,
    delay: TicksPerSecond13 * 10,
    removeFunc: jumpBoostEffectReset
  },
  {
    itemName: "kurokumaft:water_magic_leggings",
    func: waterRegenerationEffect,
    delay: TicksPerSecond13 * 10,
    removeFunc: waterRegenerationEffectReset
  },
  {
    itemName: "kurokumaft:ice_magic_leggings",
    func: iceResistanceEffect,
    delay: TicksPerSecond13 * 10,
    removeFunc: iceResistanceEffectReset
  },
  {
    itemName: "kurokumaft:nether_fire_magic_leggings",
    func: jumpBoostEffect,
    delay: TicksPerSecond13 * 10,
    removeFunc: jumpBoostEffectReset
  },
  {
    itemName: "kurokumaft:nether_water_magic_leggings",
    func: waterRegenerationEffect,
    delay: TicksPerSecond13 * 10,
    removeFunc: waterRegenerationEffectReset
  },
  {
    itemName: "kurokumaft:nether_ice_magic_leggings",
    func: iceResistanceEffect,
    delay: TicksPerSecond13 * 10,
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
    let equ = this.player.getComponent(EntityComponentTypes7.Equippable);
    let leg = equ.getEquipment(EquipmentSlot10.Legs);
    if (leg != null && leg.typeId == equItem.itemName) {
      this.player.setDynamicProperty("magic_leg_equ", true);
      equItem.func(this.player);
      system17.runTimeout(() => {
        system17.run(this.checkJob.bind(this));
      }, equItem.delay);
    } else {
      equItem.removeFunc(this.player);
      this.player.setDynamicProperty("magic_leg_equ", false);
    }
  }
};
async function jumpBoostEffect(player) {
  player.addEffect("jump_boost", TicksPerSecond13 * 60, {
    amplifier: 1,
    showParticles: false
  });
}
async function waterRegenerationEffect(player) {
  player.addEffect("regeneration", TicksPerSecond13 * 60, {
    amplifier: 2,
    showParticles: false
  });
}
async function iceResistanceEffect(player) {
  player.addEffect("fire_resistance", TicksPerSecond13 * 60, {
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
import { EntityComponentTypes as EntityComponentTypes8, EquipmentSlot as EquipmentSlot11, system as system18, TicksPerSecond as TicksPerSecond14 } from "@minecraft/server";
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
    delay: TicksPerSecond14 * 1,
    removeFunc: waterSpeedReset
  },
  {
    itemName: "kurokumaft:wind_magic_boots",
    func: windSpeedUp,
    delay: TicksPerSecond14 * 1,
    removeFunc: windSpeedReset
  },
  {
    itemName: "kurokumaft:lightning_magic_boots",
    func: lightningSpeedUp,
    delay: TicksPerSecond14 * 1,
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
    delay: TicksPerSecond14 * 1,
    removeFunc: waterSpeedReset
  },
  {
    itemName: "kurokumaft:nether_wind_magic_boots",
    func: windSpeedUp,
    delay: TicksPerSecond14 * 1,
    removeFunc: windSpeedReset
  },
  {
    itemName: "kurokumaft:nether_lightning_magic_boots",
    func: lightningSpeedUp,
    delay: TicksPerSecond14 * 1,
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
    let equ = this.player.getComponent(EntityComponentTypes8.Equippable);
    let boot = equ.getEquipment(EquipmentSlot11.Feet);
    if (boot != null && boot.typeId == equItem.itemName) {
      this.player.setDynamicProperty("magic_boot_equ", true);
      equItem.func(this.player);
      system18.runTimeout(() => {
        system18.run(this.checkJob.bind(this));
      }, equItem.delay);
    } else {
      equItem.removeFunc(this.player);
      this.player.setDynamicProperty("magic_boot_equ", false);
    }
  }
};
async function lavaWalker(player) {
  for (let x = -1; x <= 1; x++) {
    for (let z = -1; x <= 1; x++) {
      let underBlock = player.dimension.getBlock({ x: player.location.x + x, y: player.location.y - 1, z: player.location.z + z });
      if (underBlock.typeId == MinecraftBlockTypes.Lava || underBlock.typeId == MinecraftBlockTypes.FlowingLava) {
        player.dimension.setBlockType({ x: player.location.x + x, y: player.location.y - 1, z: player.location.z + z }, MinecraftBlockTypes.Magma);
      }
    }
  }
}
async function waterSpeedUp(player) {
  if (player.isInWater) {
    player.triggerEvent("kurokumaft:water_speed_walker_up");
  } else {
    player.triggerEvent("kurokumaft:water_speed_walker_down");
  }
}
async function windSpeedUp(player) {
  if (!player.isInWater) {
    player.triggerEvent("kurokumaft:speed_walker_up");
  } else {
    player.triggerEvent("kurokumaft:speed_walker_down");
  }
}
async function lightningSpeedUp(player) {
  player.triggerEvent("kurokumaft:speed_walker_up4");
}
async function iceWalker(player) {
  for (let x = -1; x <= 1; x++) {
    for (let z = -1; x <= 1; x++) {
      let underBlock = player.dimension.getBlock({ x: player.location.x + x, y: player.location.y - 1, z: player.location.z + z });
      if (underBlock.typeId == MinecraftBlockTypes.Water || underBlock.typeId == MinecraftBlockTypes.FlowingWater) {
        player.dimension.setBlockType({ x: player.location.x + x, y: player.location.y - 1, z: player.location.z + z }, MinecraftBlockTypes.PackedIce);
      }
    }
  }
}
async function lavaWalkerReset(player) {
}
async function waterSpeedReset(player) {
  player.triggerEvent("kurokumaft:water_speed_walker_down");
}
async function windSpeedReset(player) {
  player.triggerEvent("kurokumaft:speed_walker_down");
}
async function lightningSpeedReset(player) {
  player.triggerEvent("kurokumaft:speed_walker_down");
}
async function iceWalkerReset(player) {
}

// scripts/player/armorEquipment.ts
async function checkPlayerEquTick() {
  let players = world9.getPlayers();
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    let equ = player.getComponent(EntityComponentTypes9.Equippable);
    let offHand = equ.getEquipment(EquipmentSlot12.Offhand);
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
    let mainHand = equ.getEquipment(EquipmentSlot12.Mainhand);
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
    let head = equ.getEquipment(EquipmentSlot12.Head);
    if (head) {
      if (!player.getDynamicProperty("magic_helmet_equ")) {
        new MagicHelmetSurveillance(player, head).checkMagicHelmetTick();
      }
    } else {
      player.setDynamicProperty("magic_helmet_equ", false);
    }
    let chest = equ.getEquipment(EquipmentSlot12.Chest);
    if (chest) {
      if (!player.getDynamicProperty("magic_chest_equ")) {
        new MagicChestSurveillance(player, chest).checkMagicChestTick();
      }
    } else {
      player.setDynamicProperty("magic_chest_equ", false);
    }
    let legs = equ.getEquipment(EquipmentSlot12.Legs);
    if (legs) {
      if (!player.getDynamicProperty("magic_leg_equ")) {
        new MagicLeggingsSurveillance(player, legs).checkMagicLeggingsTick();
      }
    } else {
      player.setDynamicProperty("magic_leg_equ", false);
    }
    let feet = equ.getEquipment(EquipmentSlot12.Feet);
    if (feet) {
      if (!player.getDynamicProperty("magic_boot_equ")) {
        new MagicBootsSurveillance(player, feet).checkMagicBootsTick();
      }
    } else {
      player.setDynamicProperty("magic_boot_equ", false);
    }
  }
  system19.run(checkPlayerEquTick);
}

// scripts/items/weapon/stick/StickWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot13, GameMode as GameMode4, ItemComponentTypes as ItemComponentTypes6, Player as Player23, system as system26, world as world11 } from "@minecraft/server";

// scripts/items/weapon/stick/WaterCurrentMagic.ts
import { EntityDamageCause as EntityDamageCause11, system as system20, TicksPerSecond as TicksPerSecond15 } from "@minecraft/server";
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
      "familiar",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    closest: 4,
    maxDistance: 10
  });
  let intervalNum = system20.runInterval(() => {
    targets.forEach((en) => {
      en.runCommand("/particle kurokumaft:aqua_shot_particle ~~~");
      en.addEffect("slowness", 5, {
        amplifier: 5
      });
      en.applyDamage(2, {
        cause: EntityDamageCause11.drowning
      });
    });
  }, 4);
  system20.runTimeout(() => {
    system20.clearRun(intervalNum);
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
      "familiar",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 15
  });
  let intervalNum = system20.runInterval(() => {
    targets.forEach((en) => {
      en.dimension.spawnParticle("kurokumaft:tidal_wave_particle", en.location);
      en.addEffect(MinecraftEffectTypes.Slowness, 2 * TicksPerSecond15, {
        amplifier: 10
      });
      en.applyDamage(3, {
        cause: EntityDamageCause11.drowning
      });
    });
  }, 4);
  system20.runTimeout(() => {
    system20.clearRun(intervalNum);
  }, 100);
  player.removeTag("tidal_wave_self");
}

// scripts/items/weapon/stick/AtmosphereMagic.ts
import { EntityDamageCause as EntityDamageCause12, system as system21, TicksPerSecond as TicksPerSecond16 } from "@minecraft/server";
async function atmosphere(player) {
  player.addTag("atmosphere_self");
  let dimen = player.dimension;
  let intervalNum = system21.runInterval(() => {
    let ploca = player.location;
    dimen.spawnParticle("kurokumaft:atmosphere_particle", ploca);
    let targets = dimen.getEntities({
      excludeTags: [
        "atmosphere_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar",
        "magic",
        "arrow"
      ],
      excludeTypes: [
        "item"
      ],
      location: player.location,
      maxDistance: 10
    });
    targets.forEach((en) => {
      let enloca = en.location;
      dimen.spawnParticle("kurokumaft:wind_particle", { x: enloca.x, y: enloca.y, z: enloca.z });
      dimen.spawnParticle("kurokumaft:storm1_particle", { x: enloca.x, y: enloca.y + 1, z: enloca.z });
      dimen.spawnParticle("kurokumaft:storm2_particle", { x: enloca.x, y: enloca.y, z: enloca.z });
      dimen.spawnParticle("kurokumaft:storm3_particle", { x: enloca.x, y: enloca.y + 1.5, z: enloca.z });
      dimen.spawnParticle("kurokumaft:storm4_particle", { x: enloca.x, y: enloca.y + 0.5, z: enloca.z });
      en.addEffect(MinecraftEffectTypes.Levitation, 1 * TicksPerSecond16, {
        amplifier: 10
      });
      en.applyDamage(3, {
        cause: EntityDamageCause12.fallingBlock
      });
    });
  }, 4);
  system21.runTimeout(() => {
    system21.clearRun(intervalNum);
    player.removeTag("atmosphere_self");
  }, 100);
}

// scripts/items/weapon/stick/EarthMagic.ts
import { EntityDamageCause as EntityDamageCause13, system as system22, TicksPerSecond as TicksPerSecond17 } from "@minecraft/server";
async function gravityField(player) {
  player.addTag("gravity_field_self");
  let intervalNum = system22.runInterval(() => {
    player.dimension.spawnParticle("kurokumaft:gravity_field_particle", player.location);
    let targets = player.dimension.getEntities({
      excludeTags: [
        "atmosphere_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar",
        "magic",
        "arrow"
      ],
      excludeTypes: [
        "item"
      ],
      location: player.location,
      maxDistance: 15
    });
    targets.forEach((en) => {
      en.dimension.spawnParticle("kurokumaft:gravity_particle", en.location);
      en.addEffect(MinecraftEffectTypes.Slowness, 2 * TicksPerSecond17, {
        amplifier: 5
      });
      en.applyDamage(3, {
        cause: EntityDamageCause13.fallingBlock
      });
    });
  }, 4);
  system22.runTimeout(() => {
    system22.clearRun(intervalNum);
    player.removeTag("gravity_field_self");
  }, 100);
}

// scripts/items/weapon/stick/LightningStrikeMagic.ts
import { EntityDamageCause as EntityDamageCause14, system as system23, TicksPerSecond as TicksPerSecond18 } from "@minecraft/server";
async function lightningStrike(player) {
  player.addTag("lightningstrike_self");
  let intervalNum = system23.runInterval(() => {
    player.dimension.spawnParticle("kurokumaft:thunder_sword_particle", player.location);
    let targets = player.dimension.getEntities({
      excludeTags: [
        "lightningstrike_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar",
        "magic",
        "arrow"
      ],
      excludeTypes: [
        "item"
      ],
      location: player.location,
      maxDistance: 10
    });
    targets.forEach((en) => {
      en.dimension.spawnParticle("kurokumaft:spark_particle", en.location);
      en.addEffect(MinecraftEffectTypes.Slowness, 2 * TicksPerSecond18, {
        amplifier: 3
      });
      en.applyDamage(6, {
        cause: EntityDamageCause14.lightning
      });
    });
  }, 4);
  system23.runTimeout(() => {
    system23.clearRun(intervalNum);
    player.removeTag("lightningstrike_self");
  }, 100);
}

// scripts/items/weapon/stick/JetBlackMagic.ts
import { EntityDamageCause as EntityDamageCause15, system as system24 } from "@minecraft/server";
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
  let dim = black_hole.dimension;
  let intervalNum = system24.runInterval(() => {
    black_hole.teleport({ x: holeLo.x, y: holeLo.y + 0.1, z: holeLo.z });
    dim.spawnParticle("kurokumaft:black_hole_particle", black_hole.location);
    dim.spawnParticle("kurokumaft:black_hole_outer_particle", black_hole.location);
    let targets = player.dimension.getEntities({
      excludeTags: [
        "black_hole_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar",
        "magic",
        "arrow"
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
        cause: EntityDamageCause15.wither
      });
    });
  }, 10);
  system24.runTimeout(() => {
    system24.clearRun(intervalNum);
    player.removeTag("black_hole_self");
    black_hole.remove();
  }, 100);
}

// scripts/items/weapon/stick/SparkleMagic.ts
import { system as system25, TicksPerSecond as TicksPerSecond19 } from "@minecraft/server";
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
  let intervalNum = system25.runInterval(() => {
    holly_field.dimension.spawnParticle("kurokumaft:holly_field_particle", holly_field.location);
    holly_field.dimension.spawnParticle("kurokumaft:holly_field_outer_particle", holly_field.location);
    let targets = player.dimension.getEntities({
      excludeFamilies: [
        "inanimate",
        "magic",
        "arrow"
      ],
      excludeTypes: [
        "item"
      ],
      location: holeLo,
      maxDistance: 15
    });
    targets.forEach((en) => {
      en.addEffect(MinecraftEffectTypes.InstantHealth, 2 * TicksPerSecond19, {
        amplifier: 10
      });
    });
  }, 10);
  system25.runTimeout(() => {
    system25.clearRun(intervalNum);
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
    if (!itemStack || hitEntity instanceof Player23 && !world11.gameRules.pvp) {
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
          let intervalNum = system26.runInterval(() => {
            xran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
            yran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
            zran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
            shooting(player, stickShotMagicObject.event, { x: xran, y: yran, z: zran }, stickShotMagicObject.addition, void 0);
          }, 4);
          system26.runTimeout(() => {
            system26.clearRun(intervalNum);
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
    if (player.getGameMode() != GameMode4.creative) {
      ItemDurabilityDamage(player, itemStack, EquipmentSlot13.Mainhand);
    }
    let cool = itemStack.getComponent(ItemComponentTypes6.Cooldown);
    cool.startCooldown(player);
  }
};

// scripts/items/weapon/rod/RodWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot14, GameMode as GameMode5, ItemComponentTypes as ItemComponentTypes7, Player as Player32, world as world12 } from "@minecraft/server";

// scripts/items/weapon/rod/FlameMagic.ts
import { EntityDamageCause as EntityDamageCause17, system as system27 } from "@minecraft/server";
async function flarecircle(player) {
  player.addTag("flamecircle_self");
  let intervalNum = system27.runInterval(() => {
    let targets = player.dimension.getEntities({
      excludeTags: [
        "flamecircle_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar",
        "magic",
        "arrow"
      ],
      excludeTypes: [
        "item"
      ],
      location: player.location,
      maxDistance: 20,
      closest: 3
    });
    targets.forEach((en) => {
      en.dimension.spawnParticle("kurokumaft:explosion_wave_particle", en.location);
      en.applyDamage(5, {
        cause: EntityDamageCause17.fire
      });
    });
  }, 2);
  system27.runTimeout(() => {
    system27.clearRun(intervalNum);
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
      "familiar",
      "magic",
      "arrow"
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
      cause: EntityDamageCause17.fire
    });
  });
  player.removeTag("burstflare_self");
}

// scripts/items/weapon/rod/WaterWaveMagic.ts
import { system as system28, TicksPerSecond as TicksPerSecond20 } from "@minecraft/server";
async function waterwave(player) {
  let { xapply, yapply, zapply, xlocation, ylocation, zlocation } = getAdjacentSphericalPoints(player.getRotation(), player.location);
  let wave = player.dimension.spawnEntity("kurokumaft:waterwavemagic", { x: xlocation, y: player.location.y, z: zlocation });
  let intervalNum = system28.runInterval(() => {
    wave.applyImpulse({ x: xapply, y: 0, z: zapply });
    wave.setRotation({ x: xlocation, y: zlocation });
  }, 2);
  system28.runTimeout(() => {
    system28.clearRun(intervalNum);
    wave.remove();
  }, 60);
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
    en.addEffect(MinecraftEffectTypes.Slowness, 10 * TicksPerSecond20, {
      amplifier: 50
    });
  });
  player.removeTag("waterjail_self");
}

// scripts/items/weapon/rod/StormMagic.ts
import { EntityDamageCause as EntityDamageCause18, TicksPerSecond as TicksPerSecond21 } from "@minecraft/server";
async function storm(player) {
  player.addTag("storm_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "storm_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar",
      "magic",
      "arrow"
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
    en.addEffect(MinecraftEffectTypes.Levitation, 1 * TicksPerSecond21, {
      amplifier: 15
    });
    en.applyDamage(2, {
      cause: EntityDamageCause18.fall
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
      "familiar",
      "magic",
      "arrow"
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
      cause: EntityDamageCause18.fall
    });
    let bust = en.dimension.spawnEntity("kurokumaft:burstflaremagic", en.location);
    bust.triggerEvent("minecraft:explode");
  });
  player.removeTag("aero_bomb_self");
}

// scripts/items/weapon/rod/RockMagic.ts
import { EntityDamageCause as EntityDamageCause19, TicksPerSecond as TicksPerSecond22 } from "@minecraft/server";
async function rockbreak(player) {
  player.addTag("rock_break_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "rock_break_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  });
  targets.forEach((en) => {
    en.addEffect(MinecraftEffectTypes.Nausea, 5 * TicksPerSecond22, {
      amplifier: 10
    });
    let rock = en.dimension.spawnEntity("kurokumaft:rockbreakmagic", { x: en.location.x, y: en.location.y + 10, z: en.location.z });
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
      "familiar",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  });
  targets.forEach((en) => {
    en.dimension.spawnParticle("kurokumaft:grey_bomb_particle", en.location);
    en.applyDamage(10, {
      cause: EntityDamageCause19.fallingBlock
    });
    let bust = en.dimension.spawnEntity("kurokumaft:burstflaremagic", en.location);
    bust.triggerEvent("minecraft:explode");
  });
  player.removeTag("grey_bomb_self");
}

// scripts/items/weapon/rod/ThunderclapMagic.ts
import { EntityDamageCause as EntityDamageCause20, TicksPerSecond as TicksPerSecond23 } from "@minecraft/server";
async function thunderclap(player) {
  player.addTag("thunderclap_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "thunderclap_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 20,
    closest: 3
  });
  targets.forEach((en) => {
    en.dimension.spawnParticle("kurokumaft:lightningbolt_particle", en.location);
    en.dimension.spawnEntity(MinecraftEntityTypes.LightningBolt, en.location);
    en.applyDamage(10, {
      cause: EntityDamageCause20.lightning
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
      "familiar",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 8
  });
  targets.forEach((en) => {
    en.runCommand("/particle kurokumaft:thunder_jail_particle ~~~");
    en.addEffect("slowness", 10 * TicksPerSecond23, {
      amplifier: 30
    });
    en.applyDamage(4, {
      cause: EntityDamageCause20.lightning
    });
  });
  player.removeTag("thunder_jail_self");
}

// scripts/items/weapon/rod/FreezeMagic.ts
import { TicksPerSecond as TicksPerSecond24 } from "@minecraft/server";
async function freezConclusion(player) {
  player.addTag("freez_conclusion_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "freez_conclusion_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 15,
    closest: 2
  });
  targets.forEach((en) => {
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
    en.addEffect(MinecraftEffectTypes.Weakness, 20 * TicksPerSecond24, {
      amplifier: 3
    });
  });
  player.removeTag("freez_conclusion_self");
}

// scripts/items/weapon/rod/DarknessMagic.ts
import { EntityDamageCause as EntityDamageCause22 } from "@minecraft/server";
async function brushash(player) {
  player.addTag("brushash_self");
  let targets = player.dimension.getEntities({
    excludeTags: [
      "brushash_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar",
      "magic",
      "arrow"
    ],
    excludeTypes: [
      "item"
    ],
    location: player.location,
    maxDistance: 10,
    closest: 3
  });
  targets.forEach((en) => {
    en.dimension.spawnParticle("kurokumaft:dark_brushash_particle", en.location);
    en.applyDamage(6, {
      cause: EntityDamageCause22.wither
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
import { TicksPerSecond as TicksPerSecond25 } from "@minecraft/server";
async function areaheel(player) {
  player.dimension.spawnParticle("kurokumaft:areaheel_particle", player.location);
  let p = player.dimension.getEntities({
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
  let f = player.dimension.getEntities({
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
  let u = player.dimension.getEntities({
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
    en.addEffect(MinecraftEffectTypes.InstantHealth, 5 * TicksPerSecond25, {
      amplifier: 5,
      showParticles: true
    });
  });
  f.forEach((en) => {
    en.addEffect(MinecraftEffectTypes.InstantHealth, 5 * TicksPerSecond25, {
      amplifier: 5,
      showParticles: true
    });
  });
  u.forEach((en) => {
    en.addEffect(MinecraftEffectTypes.InstantHealth, 5 * TicksPerSecond25, {
      amplifier: 5,
      showParticles: true
    });
  });
}
async function summonGolem(player) {
  let golem = player.dimension.spawnEntity("kurokumaft:brightness_golem<minecraft:from_player>", { x: player.location.x, y: player.location.y, z: player.location.z + 3 });
  golem.nameTag = "\u30D6\u30E9\u30A4\u30C8\u30B4\u30FC\u30EC\u30E0";
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
    if (!itemStack || hitEntity instanceof Player32 && !world12.gameRules.pvp) {
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
    if (world12.gameRules.pvp) {
      if (player.isSneaking) {
        let rodFuncMagicObject = RodRightFuncMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        if (rodFuncMagicObject) {
          player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + rodFuncMagicObject.sendMsg + '"}]}');
          rodFuncMagicObject.func(player);
        }
      } else {
        let rodShotMagicObject = RodShotMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        if (rodShotMagicObject) {
          let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
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
      if (player.isSneaking) {
        let rodFuncMagicObject = RodRightFuncMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        if (rodFuncMagicObject) {
          player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + rodFuncMagicObject.sendMsg + '"}]}');
          rodFuncMagicObject.func(player);
        }
      } else {
        let rodShotMagicObject = RodShotMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
        if (rodShotMagicObject) {
          let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
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
    }
    if (player.getGameMode() != GameMode5.creative) {
      ItemDurabilityDamage(player, itemStack, EquipmentSlot14.Mainhand);
    }
    let cool = itemStack.getComponent(ItemComponentTypes7.Cooldown);
    cool.startCooldown(player);
  }
};

// scripts/items/weapon/staff/StaffWeaponMagic.ts
import { EquipmentSlot as EquipmentSlot15, GameMode as GameMode6, ItemComponentTypes as ItemComponentTypes8, Player as Player36, world as world13 } from "@minecraft/server";

// scripts/items/weapon/staff/FirestormMagic.ts
import { EntityDamageCause as EntityDamageCause24, system as system36 } from "@minecraft/server";
async function bramFang(player) {
  let targets = player.dimension.getEntities({
    excludeTags: [
      "flamecircle_self"
    ],
    excludeFamilies: [
      "inanimate",
      "player",
      "familiar",
      "arrow"
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
async function fireStorm(player) {
  player.addTag("firestormmagic_self");
  let { xlocation, ylocation, zlocation } = getLookPoints(player.getRotation(), player.location, 15);
  let dim = player.dimension;
  let ploc = player.location;
  let intervalNum = system36.runInterval(() => {
    dim.spawnParticle("kurokumaft:firestome5_particle", { x: xlocation, y: ploc.y, z: zlocation });
    let targets = dim.getEntities({
      excludeTags: [
        "firestormmagic_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar",
        "magic",
        "arrow"
      ],
      excludeTypes: [
        "item"
      ],
      location: { x: xlocation, y: player.location.y, z: zlocation },
      maxDistance: 10
    });
    targets.forEach((en) => {
      en.applyDamage(5, {
        cause: EntityDamageCause24.fire
      });
    });
  }, 1);
  system36.runTimeout(() => {
    system36.clearRun(intervalNum);
    player.removeTag("firestormmagic_self");
  }, 60);
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
import { EntityDamageCause as EntityDamageCause25, system as system37 } from "@minecraft/server";
async function flameSpark(player) {
  player.addTag("flamespark_self");
  let intervalNum = system37.runInterval(() => {
    let targets = player.dimension.getEntities({
      excludeTags: [
        "flamespark_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar",
        "magic",
        "arrow"
      ],
      excludeTypes: [
        "item"
      ],
      location: player.location,
      maxDistance: 30,
      closest: 3
    });
    targets.forEach((en) => {
      en.dimension.spawnParticle("kurokumaft:firewall_particle", en.location);
      en.applyDamage(3, {
        cause: EntityDamageCause25.fire
      });
      en.dimension.spawnEntity(MinecraftEntityTypes.LightningBolt, en.location);
      en.applyDamage(3, {
        cause: EntityDamageCause25.lightning
      });
    });
  }, 10);
  system37.runTimeout(() => {
    system37.clearRun(intervalNum);
    player.removeTag("flamespark_self");
  }, 100);
}

// scripts/items/weapon/staff/MailstromMagic.ts
import { EntityDamageCause as EntityDamageCause26, system as system38 } from "@minecraft/server";
async function mailstrom(player) {
  player.addTag("mailstrom_self");
  let { xlocation, ylocation, zlocation } = getLookPoints(player.getRotation(), player.location, 15);
  let mailLo = { x: xlocation, y: player.location.y, z: zlocation };
  let dim = player.dimension;
  let intervalNum = system38.runInterval(() => {
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
    let targets = dim.getEntities({
      excludeTags: [
        "mailstrom_self"
      ],
      excludeFamilies: [
        "inanimate",
        "player",
        "familiar",
        "magic",
        "arrow"
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
        cause: EntityDamageCause26.drowning
      });
    });
  }, 5);
  system38.runTimeout(() => {
    system38.clearRun(intervalNum);
    player.removeTag("mailstrom_self");
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
    func: fireStorm,
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
    if (!itemStack || hitEntity instanceof Player36 && !world13.gameRules.pvp) {
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
    if (world13.gameRules.pvp) {
      let staffRightOneMagicObject = StaffRightOneMagicObjects.find((obj) => obj.itemName == itemStack.typeId);
      if (staffRightOneMagicObject) {
        player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + staffRightOneMagicObject.sendMsg + '"}]}');
        staffRightOneMagicObject.func(player);
      }
    } else {
    }
    if (player.getGameMode() != GameMode6.creative) {
      ItemDurabilityDamage(player, itemStack, EquipmentSlot15.Mainhand);
    }
    let cool = itemStack.getComponent(ItemComponentTypes8.Cooldown);
    cool.startCooldown(player);
  }
  // ブロッククリック
  onUseOn(event) {
  }
};

// scripts/items/weapon/bread/BreadWeaponMagic.ts
import { Player as Player43, GameMode as GameMode7, EquipmentSlot as EquipmentSlot16, ItemComponentTypes as ItemComponentTypes9 } from "@minecraft/server";

// scripts/items/weapon/bread/FireMagicBread.ts
import { EntityDamageCause as EntityDamageCause27 } from "@minecraft/server";
async function flamingDesires(entity) {
  if (entity != void 0 && entity.isValid()) {
    entity.dimension.spawnParticle("kurokumaft:flaming_desires_particle", entity.location);
    entity.applyDamage(5, {
      cause: EntityDamageCause27.fire
    });
  }
}
async function crimsonBread(player) {
  let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  shooting(player, "kurokumaft:crimson_bread", { x: xran, y: yran, z: zran }, 2, void 0);
}

// scripts/items/weapon/bread/WaterMagicBread.ts
import { EntityDamageCause as EntityDamageCause28 } from "@minecraft/server";
async function aquaDesires(entity) {
  if (entity != void 0 && entity.isValid()) {
    entity.dimension.spawnParticle("kurokumaft:aqua_desires_particle", { x: entity.location.x + 0.5, y: entity.location.y, z: entity.location.z });
    entity.dimension.spawnParticle("kurokumaft:aqua_desires_particle", { x: entity.location.x, y: entity.location.y, z: entity.location.z });
    entity.dimension.spawnParticle("kurokumaft:aqua_desires_particle", { x: entity.location.x - 0.5, y: entity.location.y, z: entity.location.z });
    entity.applyDamage(5, {
      cause: EntityDamageCause28.drowning
    });
  }
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
import { EntityDamageCause as EntityDamageCause29, system as system40 } from "@minecraft/server";
function windDesires(entity) {
  if (entity != void 0 && entity.isValid()) {
    entity.dimension.spawnParticle("kurokumaft:wind_desires_particle", { x: entity.location.x + 0.5, y: entity.location.y, z: entity.location.z });
    entity.dimension.spawnParticle("kurokumaft:wind_desires_particle", { x: entity.location.x, y: entity.location.y, z: entity.location.z });
    entity.dimension.spawnParticle("kurokumaft:wind_desires_particle", { x: entity.location.x - 0.5, y: entity.location.y, z: entity.location.z });
    entity.applyDamage(2, {
      cause: EntityDamageCause29.flyIntoWall
    });
    entity.applyDamage(2, {
      cause: EntityDamageCause29.flyIntoWall
    });
    entity.applyDamage(2, {
      cause: EntityDamageCause29.flyIntoWall
    });
  }
}
function windBarkSlash(player) {
  let xran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
  let yran = parseFloat(getRandomInRange(-0.2, 0.5).toFixed(3));
  let zran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
  let intervalNum = system40.runInterval(() => {
    shooting(player, "kurokumaft:wind_bark_slash", { x: xran, y: yran, z: zran }, 5, "kurokumaft:projectile_1");
    shooting(player, "kurokumaft:wind_bark_slash", { x: xran, y: yran, z: zran }, 5, "kurokumaft:projectile_2");
    shooting(player, "kurokumaft:wind_bark_slash", { x: xran, y: yran, z: zran }, 5, "kurokumaft:projectile_3");
  }, 5);
  system40.runTimeout(() => {
    system40.clearRun(intervalNum);
  }, 60);
}

// scripts/items/weapon/bread/StoneMagicBread.ts
import { EntityDamageCause as EntityDamageCause30 } from "@minecraft/server";
async function stoneDesires(entity) {
  if (entity != void 0 && entity.isValid()) {
    entity.dimension.spawnParticle("kurokumaft:stone_desires_particle", entity.location);
    entity.applyDamage(5, {
      cause: EntityDamageCause30.thorns
    });
  }
}
async function breakRockSlash(player) {
  let xran = parseFloat(getRandomInRange(-0.2, 0.1).toFixed(3));
  let yran = parseFloat(getRandomInRange(-0.2, 0.2).toFixed(3));
  let zran = parseFloat(getRandomInRange(-0.2, 0.2).toFixed(3));
  shooting(player, "kurokumaft:break_rock_slash", { x: xran, y: yran, z: zran }, 3, void 0);
}

// scripts/items/weapon/bread/ThunderMagicBread.ts
import { EntityDamageCause as EntityDamageCause31 } from "@minecraft/server";
async function thunderDesires(entity) {
  if (entity != void 0 && entity.isValid()) {
    entity.dimension.spawnParticle("kurokumaft:thunder_desires_particle", entity.location);
    entity.applyDamage(5, {
      cause: EntityDamageCause31.lightning
    });
  }
}
async function raizinBread(player) {
  let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
  shooting(player, "kurokumaft:raizin_bread", { x: xran, y: yran, z: zran }, 4, void 0);
}

// scripts/items/weapon/bread/IceMagicBread.ts
import { EntityDamageCause as EntityDamageCause32 } from "@minecraft/server";
async function iceDesires(entity) {
  if (entity != void 0 && entity.isValid()) {
    entity.dimension.spawnParticle("kurokumaft:ice_desires_particle", entity.location);
    entity.applyDamage(5, {
      cause: EntityDamageCause32.freezing
    });
  }
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
    breadMagicObject.func(hitEntity);
    attackEntity.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + breadMagicObject.sendMsg + '"}]}');
    if (attackEntity instanceof Player43 && attackEntity.getGameMode() != GameMode7.creative) {
      ItemDurabilityDamage(attackEntity, itemStack, EquipmentSlot16.Mainhand);
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
      ItemDurabilityDamage(player, itemStack, EquipmentSlot16.Mainhand);
    }
    let cool = itemStack.getComponent(ItemComponentTypes9.Cooldown);
    cool.startCooldown(player);
  }
  // ブロッククリック
  onUseOn(event) {
  }
};

// scripts/items/weapon/bazooka/FireShellMagic.ts
import { EntityDamageCause as EntityDamageCause33, system as system41 } from "@minecraft/server";
async function fireShell(entity) {
  let dim = entity.dimension;
  let enLoc = entity.location;
  try {
    let intervalNum = system41.runInterval(() => {
      dim.spawnParticle("kurokumaft:fire_shell", enLoc);
      let targets = dim.getEntities({
        excludeFamilies: [
          "inanimate",
          "player",
          "familiar",
          "magic",
          "arrow"
        ],
        excludeTypes: [
          "item"
        ],
        location: enLoc,
        maxDistance: 6
      });
      targets.forEach((en) => {
        en.applyDamage(3, {
          cause: EntityDamageCause33.fire
        });
      });
    }, 5);
    system41.runTimeout(() => {
      system41.clearRun(intervalNum);
    }, 60);
  } catch (error) {
  }
  entity.remove();
}

// scripts/items/weapon/bazooka/IceShellMagic.ts
import { EntityDamageCause as EntityDamageCause34, system as system42 } from "@minecraft/server";
async function iceShell(entity) {
  let dim = entity.dimension;
  let enLoc = entity.location;
  try {
    let intervalNum = system42.runInterval(() => {
      dim.spawnParticle("kurokumaft:ice_shell", enLoc);
      let targets = dim.getEntities({
        excludeFamilies: [
          "inanimate",
          "player",
          "familiar",
          "magic",
          "arrow"
        ],
        excludeTypes: [
          "item"
        ],
        location: enLoc,
        maxDistance: 6
      });
      targets.forEach((en) => {
        en.applyDamage(3, {
          cause: EntityDamageCause34.freezing
        });
      });
    }, 5);
    system42.runTimeout(() => {
      system42.clearRun(intervalNum);
    }, 60);
  } catch (error) {
  }
  entity.remove();
}

// scripts/items/weapon/bazooka/LightningShellMagic.ts
import { EntityDamageCause as EntityDamageCause35, system as system43 } from "@minecraft/server";
async function lightningShell(entity) {
  let dim = entity.dimension;
  let enLoc = entity.location;
  try {
    let intervalNum = system43.runInterval(() => {
      dim.spawnParticle("kurokumaft:lightning_shell", enLoc);
      let targets = dim.getEntities({
        excludeFamilies: [
          "inanimate",
          "player",
          "familiar",
          "magic",
          "arrow"
        ],
        excludeTypes: [
          "item"
        ],
        location: enLoc,
        maxDistance: 6
      });
      targets.forEach((en) => {
        en.applyDamage(3, {
          cause: EntityDamageCause35.lightning
        });
      });
    }, 5);
    system43.runTimeout(() => {
      system43.clearRun(intervalNum);
    }, 60);
  } catch (error) {
  }
  entity.remove();
}

// scripts/items/weapon/bazooka/StoneShellMagic.ts
import { EntityDamageCause as EntityDamageCause36, system as system44 } from "@minecraft/server";
async function stoneShell(entity) {
  let dim = entity.dimension;
  let enLoc = entity.location;
  try {
    let intervalNum = system44.runInterval(() => {
      dim.spawnParticle("kurokumaft:stone_shell", enLoc);
      let targets = dim.getEntities({
        excludeFamilies: [
          "inanimate",
          "player",
          "familiar",
          "magic",
          "arrow"
        ],
        excludeTypes: [
          "item"
        ],
        location: enLoc,
        maxDistance: 6
      });
      targets.forEach((en) => {
        en.applyDamage(3, {
          cause: EntityDamageCause36.stalagmite
        });
      });
    }, 5);
    system44.runTimeout(() => {
      system44.clearRun(intervalNum);
    }, 60);
  } catch (error) {
  }
  entity.remove();
}

// scripts/items/weapon/bazooka/WaterShellMagic.ts
import { EntityDamageCause as EntityDamageCause37, system as system45 } from "@minecraft/server";
async function waterShell(entity) {
  let dim = entity.dimension;
  let enLoc = entity.location;
  try {
    let intervalNum = system45.runInterval(() => {
      dim.spawnParticle("kurokumaft:water_shell", enLoc);
      let targets = dim.getEntities({
        excludeFamilies: [
          "inanimate",
          "player",
          "familiar",
          "magic",
          "arrow"
        ],
        excludeTypes: [
          "item"
        ],
        location: enLoc,
        maxDistance: 6
      });
      targets.forEach((en) => {
        en.applyDamage(3, {
          cause: EntityDamageCause37.drowning
        });
      });
    }, 5);
    system45.runTimeout(() => {
      system45.clearRun(intervalNum);
    }, 60);
  } catch (error) {
  }
  entity.remove();
}

// scripts/items/weapon/bazooka/WindShellMagic.ts
import { EntityDamageCause as EntityDamageCause38, system as system46 } from "@minecraft/server";
async function windShell(entity) {
  let dim = entity.dimension;
  let enLoc = entity.location;
  try {
    let intervalNum = system46.runInterval(() => {
      dim.spawnParticle("kurokumaft:wind_shell", enLoc);
      let targets = dim.getEntities({
        excludeFamilies: [
          "inanimate",
          "player",
          "familiar",
          "magic",
          "arrow"
        ],
        excludeTypes: [
          "item"
        ],
        location: enLoc,
        maxDistance: 6
      });
      targets.forEach((en) => {
        en.applyDamage(3, {
          cause: EntityDamageCause38.fall
        });
      });
    }, 5);
    system46.runTimeout(() => {
      system46.clearRun(intervalNum);
    }, 60);
  } catch (error) {
  }
  entity.remove();
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
function checkShellProjectile(projectileName) {
  return ShellBomObjects.some((obj) => obj.itemName == projectileName);
}
function hitShellEvent(projectile) {
  let proje = ShellBomObjects.find((obj) => obj.itemName == projectile.typeId);
  try {
    proje.func(projectile);
  } catch (error) {
  }
}

// scripts/items/weapon/gun/GunWeaponMagic.ts
import { GameMode as GameMode8, EquipmentSlot as EquipmentSlot17 } from "@minecraft/server";
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
    ItemDurabilityDamage(player, itemStack, EquipmentSlot17.Mainhand);
  }
  player.setDynamicProperty("gunCharge", void 0);
  player.setProperty(gunMagicObject.property, 0);
}

// scripts/items/weapon/grimoire/SummonGrimoireMagic.ts
import { EquipmentSlot as EquipmentSlot18, GameMode as GameMode9 } from "@minecraft/server";
var SummonGrimoireObjects = Object.freeze([
  {
    itemName: "kurokumaft:fire_grimoire",
    particle: "kurokumaft:fire_bread_particle",
    entity: "kurokumaft:phoenix_spear",
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
  player.setDynamicProperty("summon_grimoire", true);
  player.dimension.spawnParticle(summonMagicObject.particle, { x: player.location.x, y: player.location.y + 0.75, z: player.location.z });
}
async function grimoire_summon_Release(player, itemStack, duration) {
  player.setDynamicProperty("summon_grimoire", void 0);
  if (-duration >= 25) {
    let summonMagicObject = SummonGrimoireObjects.find((obj) => obj.itemName == itemStack.typeId);
    player.runCommand('/titleraw @s actionbar {"rawtext":[{"text":"' + summonMagicObject.sendMsg + '"}]}');
    throwing(player, itemStack, summonMagicObject.entity, { x: 0, y: 0, z: 0 });
    if (player.getGameMode() != GameMode9.creative) {
      SummonGrimoireDurabilityDamage(player, itemStack, EquipmentSlot18.Mainhand);
    }
  }
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
  let block = blockEvent.block;
  let dimension = blockEvent.dimension;
  dimension.spawnParticle("kurokumaft:torchlight_fire", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
}

// scripts/items/weapon/grimoire/FireGrimoireMagic.ts
import { BlockPermutation as BlockPermutation2, Player as Player46, GameMode as GameMode10 } from "@minecraft/server";
async function torchlight(event) {
  let entity = event.source;
  let blockPerm = event.usedOnBlockPermutation;
  let itemStack = event.itemStack;
  let block = event.block;
  let blockFace = event.blockFace;
  let faceLocation = event.faceLocation;
  if (entity instanceof Player46 && entity.getGameMode() != GameMode10.creative) {
    if (block.typeId.indexOf("chest") == -1 && block.typeId.indexOf("boat") == -1 && CraftBlocks.indexOf(block.typeId) == -1) {
      decrimentGrimoireCount(entity, itemStack);
    }
  }
}
async function ignited(event) {
  let entity = event.source;
  let blockPerm = event.usedOnBlockPermutation;
  let itemStack = event.itemStack;
  let block = event.block;
  let blockFace = event.blockFace;
  let faceLocation = event.faceLocation;
  let blockPer = block.permutation;
  let extinguished = blockPer.getState("extinguished");
  let lit = blockPer.getState("lit");
  let setFireF = false;
  if (CraftBlocks.indexOf(block.typeId) != -1) {
    return;
  }
  if (extinguished) {
    block.setPermutation(blockPer.withState("extinguished", false));
    setFireF = true;
  } else if (lit != void 0 && !lit) {
    block.setPermutation(blockPer.withState("lit", true));
    setFireF = true;
  } else if (block.typeId == "minecraft:tnt") {
    let blockDim = block.dimension;
    blockDim.setBlockType(block.location, MinecraftBlockTypes.Air);
    let tnt = blockDim.spawnEntity(MinecraftEntityTypes.Tnt, block.location);
    setFireF = true;
  } else {
    BlockLocationList.forEach((obj) => {
      if (obj.direction == blockFace) {
        let bx = block.location.x;
        let by = block.location.y;
        let bz = block.location.z;
        let vec = { "x": bx + obj.location.x, "y": by + obj.location.y, "z": bz + obj.location.z };
        let blockDim = block.dimension;
        let dimeBlock = blockDim.getBlock(vec);
        if (dimeBlock.isAir) {
          let setLocation = { x: bx + obj.location.x, y: by + obj.location.y, z: bz + obj.location.z };
          blockDim.setBlockPermutation(setLocation, BlockPermutation2.resolve(MinecraftBlockTypes.Fire, { age: 0 }));
          setFireF = true;
        }
      }
    });
  }
  if (entity instanceof Player46 && entity.getGameMode() != GameMode10.creative) {
    if (setFireF) {
      decrimentGrimoireCount(entity, itemStack);
    }
  }
}

// scripts/items/weapon/grimoire/WaterGrimoireMagic.ts
import { BlockPermutation as BlockPermutation3, Player as Player47, GameMode as GameMode11 } from "@minecraft/server";
async function water(event) {
  let entity = event.source;
  let itemStack = event.itemStack;
  let block = event.block;
  let blockFace = event.blockFace;
  let setFireF = false;
  if (CraftBlocks.indexOf(block.typeId) != -1) {
    return;
  }
  BlockLocationList.forEach((obj) => {
    if (obj.direction == blockFace) {
      let blockDim = block.dimension;
      let bx = block.location.x;
      let by = block.location.y;
      let bz = block.location.z;
      let vec = { "x": bx + obj.location.x, "y": by + obj.location.y, "z": bz + obj.location.z };
      let dimeBlock = blockDim.getBlock(vec);
      if (dimeBlock.isAir) {
        let setLocation = { x: bx + obj.location.x, y: by + obj.location.y, z: bz + obj.location.z };
        blockDim.setBlockPermutation(setLocation, BlockPermutation3.resolve(MinecraftBlockTypes.FlowingWater, { liquid_depth: 0 }));
        setFireF = true;
      }
    }
  });
  if (entity instanceof Player47 && entity.getGameMode() != GameMode11.creative) {
    if (setFireF) {
      decrimentGrimoireCount(entity, itemStack);
    }
  }
}
async function waterCauldron(event) {
  let entity = event.source;
  let itemStack = event.itemStack;
  let block = event.block;
  let blockPer = block.permutation;
  let cauldron = blockPer.getState("cauldron_liquid");
  let setFireF = false;
  if (cauldron) {
    block.setPermutation(blockPer.withState("cauldron_liquid", "water"));
    block.setPermutation(blockPer.withState("fill_level", 6));
    setFireF = true;
  }
  if (entity instanceof Player47 && entity.getGameMode() != GameMode11.creative) {
    if (setFireF) {
      decrimentGrimoireCount(entity, itemStack);
    }
  }
}

// scripts/items/weapon/grimoire/WindGrimoireMagic.ts
import { system as system51, Player as Player48, GameMode as GameMode12, world as world17 } from "@minecraft/server";
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
  let entity = event.source;
  let itemStack = event.itemStack;
  let playerDim = entity.dimension;
  let bx = entity.location.x;
  let by = entity.location.y;
  let bz = entity.location.z;
  let setFireF = false;
  let xpcount1 = 0;
  let intervalNumXP = system51.runInterval(() => {
    for (let z = 0; z < 10; z++) {
      for (let y = 0; y < 10; y++) {
        let vec = { "x": bx + xpcount1, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.getBlockFromRay;
          playerDim.runCommand("setblock " + (bx + xpcount1) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
      for (let y = -1; y > -3; y--) {
        let vec = { "x": bx + xpcount1, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xpcount1) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
    }
    xpcount1++;
  }, 1);
  let xmcount1 = 0;
  let intervalNumXM = system51.runInterval(() => {
    for (let z = 0; z < 10; z++) {
      for (let y = 0; y < 10; y++) {
        let vec = { "x": bx + xmcount1, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xmcount1) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
      for (let y = -1; y > -3; y--) {
        let vec = { "x": bx + xmcount1, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xmcount1) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
    }
    xmcount1--;
  }, 1);
  let xpcount2 = 0;
  let intervalNumZP = system51.runInterval(() => {
    for (let z = -1; z > -10; z--) {
      for (let y = 0; y < 10; y++) {
        let vec = { "x": bx + xpcount2, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xpcount2) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
      for (let y = -1; y > -3; y--) {
        let vec = { "x": bx + xpcount2, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xpcount2) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
    }
    xpcount2++;
  }, 1);
  let xmcount2 = 0;
  let intervalNumZM = system51.runInterval(() => {
    for (let z = -1; z > -10; z--) {
      for (let y = 0; y < 10; y++) {
        let vec = { "x": bx + xmcount2, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xmcount2) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
      for (let y = -1; y > -3; y--) {
        let vec = { "x": bx + xmcount2, "y": by + y, "z": bz + z };
        let dimBlock = playerDim.getBlock(vec);
        if (!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
          playerDim.runCommand("setblock " + (bx + xmcount2) + " " + (by + y) + " " + (bz + z) + " air destroy");
          setFireF = true;
        }
      }
    }
    xmcount2--;
  }, 1);
  playerDim.spawnParticle("kurokumaft:mowing_particle", entity.location);
  system51.runTimeout(() => {
    system51.clearRun(intervalNumXP);
    system51.clearRun(intervalNumZP);
    system51.clearRun(intervalNumXM);
    system51.clearRun(intervalNumZM);
    if (entity instanceof Player48 && entity.getGameMode() != GameMode12.creative) {
      if (setFireF) {
        decrimentGrimoireCount(entity, itemStack);
      }
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
  let entity = event.source;
  let itemStack = event.itemStack;
  world17.stopMusic();
  const form = new ActionFormData().title({ translate: "mess.kurokumaft:musicSound.title" }).body({ translate: "mess.kurokumaft:musicSound.body" });
  let viewList = new Array();
  if (entity instanceof Player48 && itemStack.getDynamicPropertyIds().length > 0) {
    itemStack.getDynamicPropertyIds().forEach((sound, index) => {
      let music = itemStack.getDynamicProperty(sound);
      let music_rec = MusicRecodes.find((obj) => obj.itemName == music);
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
      let music_rec = MusicRecodes.find((obj) => obj.itemName == viewList[response.selection]);
      world17.playMusic(music_rec.eventName, {
        volume: 1,
        fade: 5
      });
    }
  });
}

// scripts/items/weapon/grimoire/StoneGrimoireMagic.ts
import { system as system52, GameMode as GameMode13, ItemComponentTypes as ItemComponentTypes11, BlockPermutation as BlockPermutation4, Direction as Direction4 } from "@minecraft/server";
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
  let entity = event.source;
  let blockPerm = event.usedOnBlockPermutation;
  let itemStack = event.itemStack;
  let block = event.block;
  let blockFace = event.blockFace;
  let faceLocation = event.faceLocation;
  let blockDim = block.dimension;
  let bx = block.location.x;
  let by = block.location.y;
  let bz = block.location.z;
  let itemCool = itemStack.getComponent(ItemComponentTypes11.Cooldown);
  let setFireF = false;
  if (itemCool.getCooldownTicksRemaining(entity) != 0) {
    return;
  }
  if (CraftBlocks.indexOf(block.typeId) != -1) {
    return;
  }
  if (blockFace == Direction4.Up) {
    blockDim.spawnParticle("kurokumaft:flower_garden_growth_emitter", block.location);
    itemCool.startCooldown(entity);
    let xpcount1 = 0;
    let intervalNumXP = system52.runInterval(() => {
      for (let z = 0; z < 8; z++) {
        let vec = { "x": bx + xpcount1, "y": by, "z": bz + z };
        let upvec = { "x": bx + xpcount1, "y": by + 1, "z": bz + z };
        let dupvec = { "x": bx + xpcount1, "y": by + 2, "z": bz + z };
        let dimeBlock = blockDim.getBlock(vec);
        let updimeBlock = blockDim.getBlock(upvec);
        if (dimeBlock.typeId == MinecraftBlockTypes.GrassBlock || dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
          if (dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
            blockDim.setBlockType(vec, MinecraftBlockTypes.GrassBlock);
          }
          if (updimeBlock.isAir) {
            let randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            if (randomBlock == "") {
              continue;
            }
            let dupdimeBlock = blockDim.getBlock(dupvec);
            if (randomBlock == "double") {
              if (dupdimeBlock.isAir) {
                let state = DoubleFlowerBlockS[Math.floor(Math.random() * DoubleFlowerBlockS.length)];
                blockDim.setBlockPermutation(upvec, BlockPermutation4.resolve("minecraft:double_plant", state));
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
    let intervalNumXM = system52.runInterval(() => {
      for (let z = 0; z < 8; z++) {
        let vec = { "x": bx + xmcount1, "y": by, "z": bz + z };
        let upvec = { "x": bx + xmcount1, "y": by + 1, "z": bz + z };
        let dupvec = { "x": bx + xmcount1, "y": by + 2, "z": bz + z };
        let dimeBlock = blockDim.getBlock(vec);
        let updimeBlock = blockDim.getBlock(upvec);
        if (dimeBlock.typeId == MinecraftBlockTypes.GrassBlock || dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
          if (dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
            blockDim.setBlockType(vec, MinecraftBlockTypes.GrassBlock);
          }
          if (updimeBlock.isAir) {
            let randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            if (randomBlock == "") {
              continue;
            }
            let dupdimeBlock = blockDim.getBlock(dupvec);
            if (randomBlock == "double") {
              if (dupdimeBlock.isAir) {
                let state = DoubleFlowerBlockS[Math.floor(Math.random() * DoubleFlowerBlockS.length)];
                blockDim.setBlockPermutation(upvec, BlockPermutation4.resolve("minecraft:double_plant", state));
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
    let intervalNumZP = system52.runInterval(() => {
      for (let z = -1; z > -8; z--) {
        let vec = { "x": bx + xpcount2, "y": by, "z": bz + z };
        let upvec = { "x": bx + xpcount2, "y": by + 1, "z": bz + z };
        let dupvec = { "x": bx + xpcount2, "y": by + 2, "z": bz + z };
        let dimeBlock = blockDim.getBlock(vec);
        let updimeBlock = blockDim.getBlock(upvec);
        if (dimeBlock.typeId == MinecraftBlockTypes.GrassBlock || dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
          if (dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
            blockDim.setBlockType(vec, MinecraftBlockTypes.GrassBlock);
          }
          if (updimeBlock.isAir) {
            let randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            if (randomBlock == "") {
              continue;
            }
            let dupdimeBlock = blockDim.getBlock(dupvec);
            if (randomBlock == "double") {
              if (dupdimeBlock.isAir) {
                let state = DoubleFlowerBlockS[Math.floor(Math.random() * DoubleFlowerBlockS.length)];
                blockDim.setBlockPermutation(upvec, BlockPermutation4.resolve("minecraft:double_plant", state));
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
    let intervalNumZM = system52.runInterval(() => {
      for (let z = -1; z > -8; z--) {
        let vec = { "x": bx + xmcount2, "y": by, "z": bz + z };
        let upvec = { "x": bx + xmcount2, "y": by + 1, "z": bz + z };
        let dupvec = { "x": bx + xmcount2, "y": by + 2, "z": bz + z };
        let dimeBlock = blockDim.getBlock(vec);
        let updimeBlock = blockDim.getBlock(upvec);
        if (dimeBlock.typeId == MinecraftBlockTypes.GrassBlock || dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
          if (dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
            blockDim.setBlockType(vec, MinecraftBlockTypes.GrassBlock);
          }
          if (updimeBlock.isAir) {
            let randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
            if (randomBlock == "") {
              continue;
            }
            let dupdimeBlock = blockDim.getBlock(dupvec);
            if (randomBlock == "double") {
              if (dupdimeBlock.isAir) {
                let state = DoubleFlowerBlockS[Math.floor(Math.random() * DoubleFlowerBlockS.length)];
                blockDim.setBlockPermutation(upvec, BlockPermutation4.resolve("minecraft:double_plant", state));
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
    system52.runTimeout(() => {
      system52.clearRun(intervalNumXP);
      system52.clearRun(intervalNumZP);
      system52.clearRun(intervalNumXM);
      system52.clearRun(intervalNumZM);
      if (entity.getGameMode() != GameMode13.creative) {
        if (setFireF) {
          decrimentGrimoireCount(entity, itemStack);
        }
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
  let player = event.source;
  let blockPerm = event.usedOnBlockPermutation;
  let itemStack = event.itemStack;
  let block = event.block;
  let blockFace = event.blockFace;
  let faceLocation = event.faceLocation;
  let blockPer = block.permutation;
  let blockDim = block.dimension;
  let bx = block.location.x;
  let by = block.location.y;
  let bz = block.location.z;
  let setFireF = false;
  if (CraftBlocks.indexOf(block.typeId) != -1) {
    return;
  } else if (block.typeId == MinecraftBlockTypes.Bamboo || block.typeId == MinecraftBlockTypes.BambooSapling) {
    if (block.typeId == MinecraftBlockTypes.BambooSapling) {
      blockDim.setBlockType(block.location, MinecraftBlockTypes.Bamboo);
    }
    let count = 1;
    let demBlock = blockDim.getBlock({ "x": bx, "y": by + count, "z": bz });
    while (count <= 15 && demBlock.isAir) {
      let blockCom = BlockPermutation4.resolve(MinecraftBlockTypes.Bamboo, {
        bamboo_leaf_size: "no_leaves",
        bamboo_stalk_thickness: "thick"
      });
      if (count > 10) {
        blockCom = BlockPermutation4.resolve(MinecraftBlockTypes.Bamboo, {
          bamboo_leaf_size: "large_leaves",
          bamboo_stalk_thickness: "thick"
        });
      } else if (count > 5) {
        blockCom = BlockPermutation4.resolve(MinecraftBlockTypes.Bamboo, {
          bamboo_leaf_size: "small_leaves",
          bamboo_stalk_thickness: "thick"
        });
      }
      blockDim.setBlockPermutation({ "x": bx, "y": by + count, "z": bz }, blockCom);
      count++;
      demBlock = blockDim.getBlock({ "x": bx, "y": by + count, "z": bz });
    }
    blockDim.spawnParticle("minecraft:crop_growth_emitter", block.location);
  } else if (block.typeId == MinecraftBlockTypes.TwistingVines) {
    let air_count = 1;
    let airBlock = blockDim.getBlock({ "x": bx, "y": by + air_count, "z": bz });
    while (air_count <= 15 && airBlock.isAir) {
      blockDim.setBlockType({ "x": bx, "y": by + air_count, "z": bz }, MinecraftBlockTypes.TwistingVines);
      air_count++;
      airBlock = blockDim.getBlock({ "x": bx, "y": by + air_count, "z": bz });
    }
    blockDim.spawnParticle("minecraft:crop_growth_emitter", block.location);
  } else if (block.typeId == MinecraftBlockTypes.Reeds) {
    let air_count = 1;
    let airBlock = blockDim.getBlock({ "x": bx, "y": by + air_count, "z": bz });
    while (air_count <= 15 && airBlock.isAir) {
      blockDim.setBlockType({ "x": bx, "y": by + air_count, "z": bz }, MinecraftBlockTypes.Reeds);
      air_count++;
      airBlock = blockDim.getBlock({ "x": bx, "y": by + air_count, "z": bz });
    }
    blockDim.spawnParticle("minecraft:crop_growth_emitter", block.location);
  } else if (wood_sapling.indexOf(block.typeId) != -1) {
    let age_bit = blockPer.getState("age_bit");
    if (age_bit) {
    }
  }
  if (player.getGameMode() != GameMode13.creative) {
    if (setFireF) {
      decrimentGrimoireCount(player, itemStack);
    }
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
    let itemStack = event.itemStack;
    let magicObject = LifeGrimoireUseOnObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (magicObject) {
      magicObject.func(event);
    }
  }
};
var LifeGrimoireUseMagic = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let magicObject = LifeGrimoireUseObjects.find((obj) => obj.itemName == itemStack.typeId);
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
    let block = event.block;
    let itemStack = event.itemStack;
    let magicObject = SummonStoneObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (magicObject) {
      let loc = block.location;
      block.dimension.spawnEntity(magicObject.event, { x: loc.x, y: loc.y + 1, z: loc.z });
    }
  }
};

// scripts/block/MagicLecternBlock.ts
import { ItemStack as ItemStack20, EquipmentSlot as EquipmentSlot19, EntityComponentTypes as EntityComponentTypes11, world as world19 } from "@minecraft/server";
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
  let grimoireKeys = Object.keys(GrimoireBookOjects);
  return grimoireKeys.find((obj) => GrimoireBookOjects[obj].typeId == bookId);
}
function isGrimoireItemsObject(grimoireItemType, itemName) {
  let grimoireKeys = Object.keys(GrimoireBookOjects);
  let type = grimoireKeys.find((obj) => obj == grimoireItemType);
  if (type) {
    return GrimoireBookOjects[type].items.find((item) => item.name == itemName) != void 0;
  }
  return false;
}
function isGrimoireAllItemsObject(itemName) {
  let items = Object.values(GrimoireBookOjects).find((obj) => {
    return obj.items.find((itemObj) => {
      return itemObj.name == itemName;
    });
  });
  return items != void 0;
}
function getGrimoireItemsMultiValue(grimoireItemType, itemName) {
  let grimoireKeys = Object.keys(GrimoireBookOjects);
  let type = grimoireKeys.find((obj) => obj == grimoireItemType);
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
  let obj = Object.values(GrimoireBookOjects).find((obj2) => {
    let filObj = obj2.items.find((itemObj) => {
      return itemObj.name == itemName;
    });
    return filObj;
  });
  return obj.typeId;
}
function getGrimoireAllItemsEvent(typeId) {
  let obj = Object.values(GrimoireBookOjects).find((obj2) => {
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
  onPlace(blockEvent) {
    let block = blockEvent.block;
    let dimension = blockEvent.dimension;
  }
  onPlayerDestroy(blockEvent) {
    let block = blockEvent.block;
    let dimension = blockEvent.dimension;
    magic_lectern_break(block, dimension);
  }
  onPlayerInteract(blockEvent) {
    let player = blockEvent.player;
    let equ = player?.getComponent(EntityComponentTypes11.Equippable);
    let item = equ.getEquipment(EquipmentSlot19.Mainhand);
    let block = blockEvent.block;
    let dimension = blockEvent.dimension;
    world19.sendMessage("onPlayerInteract");
    magic_lectern(player, item, block);
  }
};
function magic_lectern(player, item, block) {
  let blockPer = block.permutation;
  if (item != void 0) {
    if (isGrimoireAllItemsId(item.typeId)) {
      if (block.matches(block.typeId, { "kurokumaft:book_set": 0 })) {
        block.setPermutation(blockPer.withState("kurokumaft:book_set", 1));
        let grimoire_book_entity = block.dimension.spawnEntity("kurokumaft:grimoire_book_entity", { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
        let bookObj = getGrimoireAllObjectsId(item.typeId);
        grimoire_book_entity.triggerEvent(bookObj.event);
        let invent = grimoire_book_entity.getComponent(EntityComponentTypes11.Inventory);
        let container = invent.container;
        let grimoire_empty = item.clone();
        grimoire_empty.amount = 1;
        container.addItem(grimoire_empty);
        let direction = blockPer.getState("minecraft:cardinal_direction");
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
      let magic_stone_entitys = block.dimension.getEntitiesAtBlockLocation({ x: block.location.x, y: block.location.y + 1, z: block.location.z });
      for (let i = 0; i < magic_stone_entitys.length; i++) {
        if (magic_stone_entitys[i].typeId == "kurokumaft:magic_stone_entity") {
          magic_stone_entitys[i].remove();
        }
      }
      let magic_stone_entity = block.dimension.spawnEntity("kurokumaft:magic_stone_entity", { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
      magic_stone_entity.setDynamicProperty("stone_life_count", 10);
      let stoneComp = getMagicStoneOjectByName(item.typeId);
      block.setPermutation(blockPer.withState("kurokumaft:stone_set", stoneComp.state));
      magic_stone_entity.triggerEvent(stoneComp.event);
      let direction = blockPer.getState("minecraft:cardinal_direction");
      if (direction == "north") {
        magic_stone_entity.triggerEvent("kurokumaft:north");
      } else if (direction == "south") {
        magic_stone_entity.triggerEvent("kurokumaft:south");
      } else if (direction == "east") {
        magic_stone_entity.triggerEvent("kurokumaft:east");
      } else {
        magic_stone_entity.triggerEvent("kurokumaft:west");
      }
      let invent = magic_stone_entity.getComponent(EntityComponentTypes11.Inventory);
      let container = invent.container;
      let magic_stone = item.clone();
      magic_stone.amount = 1;
      container.addItem(magic_stone);
    } else {
      if (!block.matches(block.typeId, { "kurokumaft:book_set": 0 })) {
        let grimoire_entity;
        let block_entitys = block.dimension.getEntitiesAtBlockLocation({ x: block.location.x, y: block.location.y + 1, z: block.location.z });
        for (let i = 0; i < block_entitys.length; i++) {
          if (block_entitys[i].typeId == "kurokumaft:grimoire_book_entity") {
            grimoire_entity = block_entitys[i];
            break;
          }
        }
        if (grimoire_entity == void 0) {
          return;
        }
        let invent = grimoire_entity.getComponent(EntityComponentTypes11.Inventory);
        let container = invent.container;
        let grimoire_book = container.getItem(0);
        if (grimoire_book == void 0) {
          return;
        }
        let new_grimoire_book;
        let lore = grimoire_book.getLore();
        let remainingNum = 0;
        if (lore.length > 0) {
          remainingNum = Number(lore[0].substring(3));
        }
        if (!block.matches(block.typeId, { "kurokumaft:stone_set": 0 })) {
          let grimoireItemType = getGrimoireObjectId(grimoire_book.typeId);
          if (grimoireItemType != "empty") {
            if (!isGrimoireItemsObject(grimoireItemType, item.typeId)) {
              noBookItem();
              return;
            }
            let mulVal = getGrimoireItemsMultiValue(grimoireItemType, item.typeId);
            new_grimoire_book = grimoire_book;
            if (new_grimoire_book.typeId == "kurokumaft:grimoire_music_sound") {
              new_grimoire_book.setDynamicProperty(item.typeId, item.typeId);
            }
            remainingNum = remainingNum + item.amount * mulVal;
          } else {
            if (!isGrimoireAllItemsObject(item.typeId)) {
              noBookItem();
              return;
            }
            let mulVal = getGrimoireAllItemsMultiValue(item.typeId);
            remainingNum = remainingNum + item.amount * mulVal;
            let bookId = getGrimoireAllItemsId(item.typeId);
            new_grimoire_book = new ItemStack20(bookId, 1);
            if (bookId == "kurokumaft:grimoire_music_sound") {
              new_grimoire_book.setDynamicProperty(item.typeId, item.typeId);
            }
            let event = getGrimoireAllItemsEvent(bookId);
            grimoire_entity.triggerEvent(event);
          }
          if (new_grimoire_book.typeId == "kurokumaft:grimoire_music_sound") {
            new_grimoire_book.setLore(["\u6B8B\u6570\uFF1A" + remainingNum]);
          }
          container.setItem(0, new_grimoire_book);
          let equ = player.getComponent(EntityComponentTypes11.Equippable);
          equ.setEquipment(EquipmentSlot19.Mainhand);
          let magic_stone_entitys = block.dimension.getEntitiesAtBlockLocation({ x: block.location.x, y: block.location.y + 1, z: block.location.z });
          for (let i = 0; i < magic_stone_entitys.length; i++) {
            if (magic_stone_entitys[i].typeId == "kurokumaft:magic_stone_entity") {
              let magic_stone_en = magic_stone_entitys[i];
              let life = magic_stone_en.getDynamicProperty("stone_life_count");
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
    if (blockPer.getState("kurokumaft:book_set") == 1) {
      let grimoire_book_entity = block.dimension.getEntitiesAtBlockLocation({ x: block.location.x, y: block.location.y + 1, z: block.location.z });
      for (let i = 0; i < grimoire_book_entity.length; i++) {
        if (grimoire_book_entity[i].typeId == "kurokumaft:grimoire_book_entity") {
          block.setPermutation(blockPer.withState("kurokumaft:book_set", 0));
          let pinvent = player.getComponent(EntityComponentTypes11.Inventory);
          let pcontainer = pinvent.container;
          let invent = grimoire_book_entity[i].getComponent(EntityComponentTypes11.Inventory);
          let gcontainer = invent.container;
          if (pcontainer.emptySlotsCount != 0) {
            pcontainer.setItem(player.selectedSlotIndex, gcontainer.getItem(0));
          } else {
            grimoire_book_entity[i].dimension.spawnItem(gcontainer.getItem(0), grimoire_book_entity[i].location);
          }
          gcontainer.clearAll();
          grimoire_book_entity[i].remove();
          break;
        }
      }
    } else {
      let actionForm = new ActionFormData2().title({ translate: "tile.kurokumaft:magic_lectern.name" }).body({ rawtext: [
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
  let entitys = dimension.getEntitiesAtBlockLocation({ x: block.location.x, y: block.location.y + 1, z: block.location.z });
  entitys.forEach((en) => {
    let invent = en.getComponent(EntityComponentTypes11.Inventory);
    let item = invent.container?.getItem(0);
    if (item) {
      dimension.spawnItem(item, en.location);
    }
    en.remove();
  });
}
function noBookItem() {
  world19.sendMessage("\u3053\u306E\u30A2\u30A4\u30C6\u30E0\u306F\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u305B\u3093");
}

// scripts/block/WallBlock.ts
import { EntityDamageCause as EntityDamageCause41 } from "@minecraft/server";
var WallMagicObjects2 = Object.freeze([
  {
    itemName: "kurokumaft:lightningwall_block",
    func: lightningwall
  },
  {
    itemName: "kurokumaft:waterwall_block",
    func: waterwall
  },
  {
    itemName: "kurokumaft:windwall_block",
    func: windwall
  }
]);
var WallBlock = class {
  onStepOn(blockEvent) {
    WallMagicObjects2.find((obj) => obj.itemName == blockEvent.block.typeId)?.func(blockEvent);
  }
};
async function lightningwall(blockEvent) {
  let block = blockEvent.block;
  let dimension = blockEvent.dimension;
  let entity = blockEvent.entity;
  entity.applyDamage(1, {
    cause: EntityDamageCause41.lightning
  });
}
async function waterwall(blockEvent) {
  let block = blockEvent.block;
  let dimension = blockEvent.dimension;
  let entity = blockEvent.entity;
  entity.applyDamage(1, {
    cause: EntityDamageCause41.drowning
  });
}
async function windwall(blockEvent) {
  let block = blockEvent.block;
  let dimension = blockEvent.dimension;
  let entity = blockEvent.entity;
  entity.addEffect(MinecraftEffectTypes.Levitation, 2, {
    amplifier: 2
  });
}

// scripts/items/FlagStoneMagic.ts
import { EquipmentSlot as EquipmentSlot20, GameMode as GameMode14, world as world20 } from "@minecraft/server";
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
    let itemStack = event.itemStack;
    let player = event.source;
    let magicObject = FlagStoneObjects.find((obj) => obj.itemName == itemStack.typeId);
    if (magicObject) {
      setPortalStand(magicObject, event);
      if (player.getGameMode() != GameMode14.creative) {
        ItemDurabilityDamage(player, itemStack, EquipmentSlot20.Mainhand);
      }
    }
  }
};
async function setPortalStand(magicObject, event) {
  let block = event.block;
  let face = event.blockFace;
  if (magicObject.blockName == block.typeId && face == "Up") {
    let dimension = block.dimension;
    let location = block.location;
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
      world20.setDynamicProperty(magicObject.portalState, 0);
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
      world20.setDynamicProperty(magicObject.portalState, 0);
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
    let sumOb = BossSummonObjects.find((obj) => obj.itemName == blockEvent.block.typeId);
    sumOb.func(sumOb, blockEvent);
  }
};
async function phoenixSummon(sumOb, blockEvent) {
  let block = blockEvent.block;
  let state = block.permutation.getState("summon_check");
  if (state) {
    let dimension = blockEvent.dimension;
    dimension.spawnEntity(sumOb.entityName, { x: block.location.x + 0.5, y: block.location.y + 6, z: block.location.z + 0.5 });
    block.setPermutation(block.permutation.withState("summon_check", 1));
  }
}
async function fenrirSummon(sumOb, blockEvent) {
  let block = blockEvent.block;
  let state = block.permutation.getState("summon_check");
  if (state) {
    let dimension = blockEvent.dimension;
    dimension.spawnEntity(sumOb.entityName, { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
    block.setPermutation(block.permutation.withState("summon_check", 1));
  }
}

// scripts/block/PortalGateBlock.ts
import { world as world21 } from "@minecraft/server";
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
  let entity = blockEvent.entity;
  let block = blockEvent.block;
  let location = block.location;
  let dimension = blockEvent.dimension;
  let portal = dimension.getBlock({ x: location.x, y: location.y + 1, z: location.z });
  if (portal && (portal.typeId == gateObj.gate.x || portal.typeId == gateObj.gate.z)) {
    if (dimension.id == MinecraftDimensionTypes.Overworld) {
      let portal2 = dimension.getBlock({ x: location.x, y: location.y + 1, z: location.z });
      if (portal2 && (portal2.typeId == gateObj.gate.x || portal2.typeId == gateObj.gate.z)) {
        if (world21.getDynamicProperty(gateObj.portalState) == 0) {
          world21.setDynamicProperty(gateObj.portalState, 1);
          let zloca = gateObj.hellLocate.z;
          for (let x = 1; x <= 8; x++) {
            let xloca = gateObj.hellLocate.x;
            for (let z = 1; z <= 8; z++) {
              world21.structureManager.place(
                gateObj.endName + "_" + x + "_" + z,
                world21.getDimension(MinecraftDimensionTypes.TheEnd),
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
          dimension: world21.getDimension(MinecraftDimensionTypes.TheEnd)
        });
      }
    } else {
      let overLoc = entity?.getDynamicProperty("hell_tp_point");
      if (overLoc) {
        entity?.teleport(overLoc, {
          dimension: world21.getDimension(MinecraftDimensionTypes.Overworld)
        });
      } else {
        let player = entity;
        player?.teleport({ x: player.getSpawnPoint().x, y: player.getSpawnPoint().y, z: player.getSpawnPoint().z }, {
          dimension: world21.getDimension(MinecraftDimensionTypes.Overworld)
        });
      }
    }
  }
}

// scripts/block/PortalBlock.ts
import { world as world22 } from "@minecraft/server";
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
  onPlayerDestroy(blockEvent) {
    let blockPermutation = blockEvent.destroyedBlockPermutation;
    let block = blockEvent.block;
    portalGateBreak(block, blockPermutation);
  }
};
async function portalGateBreak(block, blockPermutation) {
  let portalObj = PortalObjects.find((obj) => obj.itemName == blockPermutation.type.id);
  if (portalObj) {
    world22.setDynamicProperty(portalObj.portalState, 0);
    for (let x = -2; x <= 2; x++) {
      for (let y = -2; y <= 2; y++) {
        let portal = block.dimension.getBlock({ x: block.location.x + x, y: block.location.y + y, z: block.location.z });
        if (portal && portal.typeId == portalObj.itemName) {
          block.dimension.setBlockType({ x: block.location.x + x, y: block.location.y + y, z: block.location.z }, MinecraftBlockTypes.Air);
        }
      }
    }
    for (let z = -2; z <= 2; z++) {
      for (let y = -2; y <= 2; y++) {
        let portal = block.dimension.getBlock({ x: block.location.x, y: block.location.y + y, z: block.location.z + z });
        if (portal && portal.typeId == portalObj.itemName) {
          block.dimension.setBlockType({ x: block.location.x, y: block.location.y + y, z: block.location.z + z }, MinecraftBlockTypes.Air);
        }
      }
    }
  }
}

// scripts/items/food/RepatriationFruitMagic.ts
import { EntityComponentTypes as EntityComponentTypes12, world as world23 } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
var RepatriationFruitMagic = class {
  onConsume(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    home_tp(player, itemStack);
  }
  onUseOn(event) {
    let player = event.source;
    let itemStack = event.itemStack;
    let block = event.block;
    if (block.typeId == "kurokumaft:home_gate") {
      homeSetDialog(player, itemStack, block);
    }
  }
};
function homeSetDialog(player, item, block) {
  let modalForm = new ModalFormData().title({ translate: "mess.kurokumaft:homegate.title" });
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
    let inventory = player.getComponent(EntityComponentTypes12.Inventory);
    if (inventory && inventory.container) {
      inventory.container.setItem(player.selectedSlotIndex, item);
      player.sendMessage({ translate: "mess.kurokumaft:homegate.commit" });
    }
  }).catch((error) => {
    return -1;
  });
}
async function home_tp(player, item) {
  let lores = item.getLore();
  if (lores.length > 0 && lores[0].length > 0) {
    let blockx = lores[1].substring(2);
    let blocky = lores[2].substring(2);
    let blockz = lores[3].substring(2);
    let homeDim;
    try {
      homeDim = world23.getDimension(lores[4]);
    } catch (error) {
      homeDim = player.dimension;
    }
    player.teleport({ x: Number(blockx), y: Number(blocky) + 1, z: Number(blockz) }, {
      dimension: homeDim
    });
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
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:magic_flagstone", new FlagStoneMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:summon_grimoire", new SummonGrimoireMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:life_grimoire_block", new LifeGrimoireBlockMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:life_grimoire_item", new LifeGrimoireUseMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:repatriation_fruit", new RepatriationFruitMagic());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:summon_stone", new SummonStoneMagic());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:torchlight_block", new TorchlightBlock());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:magic_lectern", new MagicLecternBlock());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:wall_block", new WallBlock());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:boss_summon_block", new BossSummonBlock());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:portal_gate", new PortalGateBlock());
  initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:portal", new PortalBlock());
}
function initStateChangeMonitor(initEvent) {
  checkPlayerEquTick();
}

// scripts/magic_script.ts
var guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];
world24.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initRegisterCustom(initEvent);
  initStateChangeMonitor(initEvent);
});
world24.beforeEvents.playerLeave.subscribe((leaveEvent) => {
  leaveEvent.player.clearDynamicProperties();
});
world24.afterEvents.entityHitEntity.subscribe((event) => {
  let dameger = event.damagingEntity;
  let hitEn = event.hitEntity;
  if (hitEn.typeId == "minecraft:player") {
    shieldGuard(hitEn, true);
    shieldCounter(hitEn, dameger);
    hitMagicAmor(hitEn, dameger, void 0, void 0);
  }
});
world24.afterEvents.projectileHitEntity.subscribe((event) => {
  let projectileEn = event.projectile;
  let hitEn = event.getEntityHit().entity;
  let dameger = event.source;
  let hitVector = event.hitVector;
  if (hitEn != void 0 && hitEn.typeId == "minecraft:player") {
    shieldGuard(hitEn, false);
    shieldCounter(hitEn, dameger);
    hitMagicAmor(hitEn, dameger, projectileEn, hitVector);
  }
  if (projectileEn) {
    if (checkWandProjectile(projectileEn.typeId)) {
      hitProjectileEvent(projectileEn);
    }
    if (checkArrowProjectile(projectileEn.typeId)) {
      hitArrowEvent(projectileEn, hitEn);
    }
    if (checkShellProjectile(projectileEn.typeId)) {
      hitShellEvent(projectileEn);
    }
  }
});
world24.afterEvents.projectileHitBlock.subscribe((event) => {
  let projectileEn = event.projectile;
  if (projectileEn) {
    if (checkWandProjectile(projectileEn.typeId)) {
      hitProjectileEvent(projectileEn);
    }
    if (checkShellProjectile(projectileEn.typeId)) {
      hitShellEvent(projectileEn);
    }
  }
});
world24.afterEvents.entityHurt.subscribe((event) => {
  let damageSource = event.damageSource;
  let hitEn = event.hurtEntity;
  if (hitEn != void 0 && hitEn.typeId == "minecraft:player" && damageSource.cause != "void") {
    if (guards.indexOf(damageSource.cause) != -1) {
      shieldGuard(hitEn, false);
    }
  }
});
world24.afterEvents.itemReleaseUse.subscribe((event) => {
  let player = event.source;
  let item = event.itemStack;
  let duration = event.useDuration;
  if (item != void 0) {
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
world24.afterEvents.itemUseOn.subscribe((event) => {
  let player = event.source;
  let item = event.itemStack;
  let block = event.block;
  let blockFace = event.blockFace;
  if (item != void 0 && item.typeId == "kurokumaft:grimoire_water") {
    waterCauldron(event);
  }
});
world24.beforeEvents.itemUseOn.subscribe((event) => {
  let player = event.source;
  let item = event.itemStack;
  let block = event.block;
  let blockFace = event.blockFace;
});
world24.afterEvents.blockExplode.subscribe((event) => {
  let block = event.block;
  if (block.typeId == "kurokumaft:magic_lectern") {
    magic_lectern_break(block, block.dimension);
  }
  if (block.typeId == "kurokumaft:magma_portal_x" || block.typeId == "kurokumaft:magma_portal_z") {
    portalGateBreak(block, event.explodedBlockPermutation);
  }
});
world24.beforeEvents.playerBreakBlock.subscribe((event) => {
  let player = event.player;
  let block = event.block;
  if (player != void 0) {
  }
});
world24.afterEvents.entityLoad.subscribe((event) => {
  let entity = event.entity;
});
world24.afterEvents.entitySpawn.subscribe((event) => {
  let entity = event.entity;
  let cause = event.cause;
});

//# sourceMappingURL=../debug/magic_script.js.map
