// scripts/kimetu_script.ts
import {
  world as world13,
  system as system82,
  EquipmentSlot as EquipmentSlot8,
  Player as Player45,
  EntityComponentTypes as EntityComponentTypes22,
  ItemStack as ItemStack26,
  ScriptEventSource,
  EntityInitializationCause,
  EntityDamageCause as EntityDamageCause8
} from "@minecraft/server";

// scripts/item/weapon/nichirintou/NichirintouComponent.ts
import { world as world6, EntityComponentTypes as EntityComponentTypes8, EquipmentSlot as EquipmentSlot4 } from "@minecraft/server";

// scripts/kokyu/kata/MizuNoKata.ts
import { MolangVariableMap, system, TicksPerSecond, Player as Player5, EntityComponentTypes as EntityComponentTypes5 } from "@minecraft/server";

// scripts/common/KimetuCommonUtil.ts
import { world, Direction, EntityComponentTypes } from "@minecraft/server";
function getRandomInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function getRandomRange(min, max, round) {
  return Math.round((Math.random() * (max - min) + min) * round / round);
}
function getRandomExcludingZero(min, max, exclud, round) {
  let rand;
  do {
    rand = Math.random() * (max - min) + min;
    rand = Math.round(rand * round) / round;
  } while (rand >= -exclud && rand <= exclud);
  return rand;
}
function isBelowThreshold(current, max, percent) {
  return current <= max * percent;
}
function playsound(entity, sound) {
  entity.playSound(sound);
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
function addRegimentalFilter(closest, location, maxDis, entity) {
  let filterOption = {
    excludeFamilies: [
      "inanimate",
      "animal",
      "villager",
      "regimental_soldier",
      "villager_player",
      "regimental_player"
    ],
    excludeTypes: [
      "item"
    ],
    excludeTags: [
      entity.id
    ],
    location,
    maxDistance: maxDis
  };
  const familyTypes = entity.getComponent(EntityComponentTypes.TypeFamily);
  if (familyTypes !== void 0 && familyTypes.hasTypeFamily("ogre")) {
    filterOption.excludeFamilies = [
      "inanimate",
      "animal"
    ];
  } else if (familyTypes !== void 0 && familyTypes.hasTypeFamily("player")) {
    const tags = entity.getTags();
    if (tags.indexOf("hostility_player") !== -1) {
      filterOption.excludeFamilies = [
        "inanimate",
        "animal",
        "villager"
      ];
    }
  } else {
    const tags = entity.getTags();
    if (tags.indexOf("hostility") !== -1) {
      filterOption.excludeFamilies = [
        "inanimate",
        "animal",
        "villager"
      ];
    }
  }
  if (!world.gameRules.pvp) {
    filterOption.excludeFamilies?.push("player");
  }
  if (closest !== 0) {
    filterOption.closest = closest;
  }
  return filterOption;
}
function addOrgeFilter(closest, location, maxDis, exeTag) {
  const filterOption = {
    excludeFamilies: [
      "inanimate",
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
  if (closest !== 0) {
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
  if (closest !== 0) {
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
import {
  BlockVolume,
  EntityComponentTypes as EntityComponentTypes3,
  EntityDamageCause,
  EquipmentSlot as EquipmentSlot2,
  world as world2,
  Player as Player3
} from "@minecraft/server";

// scripts/common/KimetuItemDurabilityDamage.ts
import {
  ItemComponentTypes,
  EntityComponentTypes as EntityComponentTypes2,
  EquipmentSlot,
  GameMode,
  Player as Player2
} from "@minecraft/server";
async function ItemDurabilityDamage(entity, item) {
  if (entity instanceof Player2 && entity.getGameMode() !== GameMode.Creative) {
    const durability = item.getComponent(ItemComponentTypes.Durability);
    const dChangeRang = durability.getDamageChanceRange();
    let dChange = getRandomInRange(dChangeRang.min, dChangeRang.max);
    const enchantable = item.getComponent(ItemComponentTypes.Enchantable);
    const unbreaking = enchantable.getEnchantment("minecraft:unbreaking");
    if (unbreaking !== void 0) {
      dChange = durability.getDamageChance(unbreaking.level);
    }
    const equippable = entity.getComponent(EntityComponentTypes2.Equippable);
    const mainHand = equippable.getEquipment(EquipmentSlot.Mainhand);
    if (mainHand !== void 0) {
      if (mainHand.typeId === item.typeId) {
        if (durability.damage + dChange >= durability.maxDurability) {
          equippable.setEquipment(EquipmentSlot.Mainhand, void 0);
        } else {
          durability.damage = durability.damage + dChange;
          equippable.setEquipment(EquipmentSlot.Mainhand, item);
        }
      }
    }
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

// scripts/kokyu/kata/KataComonClass.ts
var ogreRankPoint = Object.freeze([
  {
    rank: "low",
    point: 0.5,
    damage: 3
  },
  {
    rank: "unusual",
    point: 0.75,
    damage: 2.8
  },
  {
    rank: "quarter",
    point: 1,
    damage: 2
  },
  {
    rank: "crescent",
    point: 1.2,
    damage: 1.8
  },
  {
    rank: "king",
    point: 1.5,
    damage: 1.5
  }
]);
var KataComonClass = class {
  gardCheck(en) {
    const equ = en.getComponent(EntityComponentTypes3.Equippable);
    const main = equ.getEquipment(EquipmentSlot2.Mainhand);
    const off = equ.getEquipment(EquipmentSlot2.Offhand);
    if (en.isSneaking) {
      if (off !== void 0 && off.typeId.indexOf("shield") !== -1) {
        en.playSound("item.shield.block", {
          pitch: 1,
          volume: 1
        });
        ItemDurabilityDamage(en, off);
        return true;
      } else if (main !== void 0 && main.typeId.indexOf("shield") !== -1) {
        en.playSound("item.shield.block", {
          pitch: 1,
          volume: 1
        });
        ItemDurabilityDamage(en, main);
        return true;
      } else if (main !== void 0 && main.typeId.indexOf("nichirintou") !== -1 && !en.getDynamicProperty("kurokumaft:attack_time")) {
        en.playSound("damage_guard.nitirintou_blocking", {
          pitch: 1,
          volume: 1
        });
        ItemDurabilityDamage(en, main);
        return true;
      }
    }
    return false;
  }
  kokyuApplyDamage(entity, filter, kokyuDamage) {
    entity.addTag(entity.id);
    const targets = entity.dimension.getEntities(filter);
    const damage = entity.getProperty("kurokumaft:attack_level");
    targets.forEach((en) => {
      if (en !== void 0 && en.isValid) {
        if (en instanceof Player3) {
          if (this.gardCheck(en)) {
            return;
          }
          if (entity instanceof Player3) {
            const tags = en.getTags();
            const ptags = entity.getTags();
            if (world2.gameRules.pvp && tags.indexOf("hostility_player") !== -1 && ptags.indexOf("hostility_player") !== -1) {
              en.applyDamage((damage + kokyuDamage) * 0.5, {
                cause: EntityDamageCause.entityAttack,
                damagingEntity: entity
              });
            }
          } else {
            const familyTypes = en.getComponent(EntityComponentTypes3.TypeFamily);
            if (familyTypes !== void 0) {
              if (familyTypes.hasTypeFamily("ogre")) {
                const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
                const point = ogreRankPoint.find((rank) => rank.rank === ogre_rank);
                en.applyDamage((damage + kokyuDamage) * (point !== void 0 ? point.damage : 5), {
                  cause: EntityDamageCause.entityAttack,
                  damagingEntity: entity
                });
              } else if (familyTypes.hasTypeFamily("regimental_player")) {
                const targetTags = en.getTags();
                const mobTags = entity.getTags();
                if (mobTags.indexOf("hostility") !== -1 && targetTags.indexOf("hostility_player") !== -1) {
                  en.applyDamage((damage + kokyuDamage) * 0.5, {
                    cause: EntityDamageCause.entityAttack,
                    damagingEntity: entity
                  });
                }
              }
            }
          }
        } else {
          const damagerFamilyTypes = entity.getComponent(EntityComponentTypes3.TypeFamily);
          if (damagerFamilyTypes !== void 0) {
            if (damagerFamilyTypes.hasTypeFamily("ogre")) {
              const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
              const point = ogreRankPoint.find((rank) => rank.rank === ogre_rank);
              en.applyDamage((damage + kokyuDamage) * (point !== void 0 ? point.point : 0.2), {
                cause: EntityDamageCause.entityAttack,
                damagingEntity: entity
              });
            } else {
              const familyTypes = en.getComponent(EntityComponentTypes3.TypeFamily);
              if (familyTypes !== void 0) {
                if (familyTypes.hasTypeFamily("ogre")) {
                  const ogre_rank = en.getProperty("kurokumaft:ogre_rank");
                  const point = ogreRankPoint.find((rank) => rank.rank === ogre_rank);
                  en.applyDamage((damage + kokyuDamage) * (point !== void 0 ? point.damage : 5), {
                    cause: EntityDamageCause.entityAttack,
                    damagingEntity: entity
                  });
                } else if (familyTypes.hasTypeFamily("regimental_soldier")) {
                  const tags = en.getTags();
                  if (entity instanceof Player3) {
                    const ptags = entity.getTags();
                    if (tags.indexOf("hostility") !== -1 && ptags.indexOf("hostility_player") !== -1) {
                      en.applyDamage((damage + kokyuDamage) * 0.5, {
                        cause: EntityDamageCause.entityAttack,
                        damagingEntity: entity
                      });
                    }
                  } else {
                    const dtags = entity.getTags();
                    if (tags.indexOf("hostility") !== -1 && dtags.indexOf("hostility") !== -1) {
                      en.applyDamage(damage + kokyuDamage, {
                        cause: EntityDamageCause.entityAttack,
                        damagingEntity: entity
                      });
                    }
                  }
                } else {
                  en.applyDamage(damage + kokyuDamage, {
                    cause: EntityDamageCause.entityAttack,
                    damagingEntity: entity
                  });
                }
              }
            }
          }
        }
      }
    });
    const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
    this.nitirintouFillBlock(
      entity.dimension,
      getDistanceLocation(entity.location, { x: distance.x - 3, y: distance.y, z: distance.z - 3 }),
      getDistanceLocation(entity.location, { x: distance.x + 3, y: distance.y + 2, z: distance.z + 3 })
    );
    entity.removeTag(entity.id);
  }
  kokyuApplyKnockback(entity, filter, distance, vNum) {
    entity.addTag(entity.id);
    const targets = entity.dimension.getEntities(filter);
    targets.forEach((en) => {
      en.applyKnockback({ x: distance.x, z: distance.z }, vNum);
    });
    entity.removeTag(entity.id);
  }
  kokyuApplyEffect(entity, filter, duration, damage, effect) {
    entity.addTag(entity.id);
    const targets = entity.dimension.getEntities(filter);
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const damageNum = kaikyuNum === 0 ? 0.5 : kaikyuNum;
    targets.forEach((en) => {
      if (en !== void 0 && en.isValid) {
        if (en instanceof Player3) {
          if (entity instanceof Player3) {
            const tags = en.getTags();
            if (world2.gameRules.pvp && tags.indexOf("hostility_player") !== -1) {
              if (this.gardCheck(en)) {
                en.addEffect(effect, Math.round(duration * damageNum * 0.25), {
                  amplifier: Math.round(damage * damageNum * 0.25),
                  showParticles: true
                });
              }
            }
          } else {
            const familyTypes = en.getComponent(EntityComponentTypes3.TypeFamily);
            const tags = entity.getTags();
            if (tags.indexOf("hostility") !== -1) {
              en.addEffect(effect, Math.round(duration * damageNum * 0.25), {
                amplifier: Math.round(damage * damageNum * 0.25),
                showParticles: true
              });
            } else if (familyTypes !== void 0 && familyTypes.hasTypeFamily("ogre")) {
              en.addEffect(effect, Math.round(duration * damageNum * 1.5), {
                amplifier: Math.round(damage * damageNum * 1.5),
                showParticles: true
              });
            }
          }
        } else {
          const damagerFamilyTypes = entity.getComponent(EntityComponentTypes3.TypeFamily);
          if (damagerFamilyTypes !== void 0 && damagerFamilyTypes.hasTypeFamily("ogre")) {
            en.addEffect(effect, Math.round(duration * damageNum * 1.25), {
              amplifier: Math.round(damage * damageNum * 1.25),
              showParticles: true
            });
          } else {
            const familyTypes = en.getComponent(EntityComponentTypes3.TypeFamily);
            if (familyTypes !== void 0 && familyTypes.hasTypeFamily("ogre")) {
              en.addEffect(effect, Math.round(duration * damageNum * 1.75), {
                amplifier: Math.round(damage * damageNum * 1.75),
                showParticles: true
              });
            } else if (familyTypes !== void 0 && familyTypes.hasTypeFamily("regimental_soldier")) {
              const tags = en.getTags();
              if (tags.indexOf("hostility") !== -1) {
                en.addEffect(effect, Math.round(duration * damageNum * 0.75), {
                  amplifier: Math.round(damage * damageNum * 0.75),
                  showParticles: true
                });
              }
            } else {
              en.addEffect(effect, Math.round(duration * damageNum * 0.75), {
                amplifier: Math.round(damage * damageNum * 0.75),
                showParticles: true
              });
            }
          }
        }
        if (en instanceof Player3) {
          if (this.gardCheck(en)) {
          }
        } else {
        }
      }
    });
    entity.removeTag(entity.id);
  }
  projectRefrect(entity, volume) {
    let hit = false;
    const projfilter = addProjectionFilter(0, volume, 4.5);
    const projectiles = entity.dimension.getEntities(projfilter);
    projectiles.forEach((projectile) => {
      projectile.clearVelocity();
      const projComp = projectile.getComponent(EntityComponentTypes3.Projectile);
      if (projComp !== void 0) {
        projComp.shoot(projectile.getViewDirection(), {
          uncertainty: 0
        });
        hit = true;
      }
    });
    return hit;
  }
  nitirintouFillBlock(dimension, from, to) {
    const volume = new BlockVolume(from, to);
    dimension.fillBlocks(volume, "minecraft:air", {
      ignoreChunkBoundErrors: true,
      blockFilter: {
        includeTags: ["minecraft:is_sword_item_destructible"]
      }
    });
  }
};

// scripts/common/ShooterEvent.ts
import { EntityComponentTypes as EntityComponentTypes4 } from "@minecraft/server";
function shooting(entity, throwItem, ranNum, seepd, event, uncertainty) {
  const distance = getLookLocationDistancePitch(entity.getRotation(), 1, ranNum);
  const bulet = entity.dimension.spawnEntity(throwItem, getDistanceLocation(
    {
      x: entity.location.x,
      y: entity.location.y + 0.5,
      z: entity.location.z
    },
    distance
  ));
  if (event !== void 0) {
    bulet.triggerEvent(event);
  }
  const projectile = bulet.getComponent(EntityComponentTypes4.Projectile);
  projectile.owner = entity;
  projectile.shoot(
    {
      x: distance.x * seepd,
      y: distance.y * seepd,
      z: distance.z * seepd
    },
    {
      uncertainty
    }
  );
  return bulet;
}

// scripts/kokyu/kata/MizuNoKata.ts
var MizuNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 水面切り
   */
  ichiNoKata(entity, itemStack) {
    entity.setProperty("kurokumaft:kokyu_use", false);
    if (entity instanceof Player5) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
    this.kokyuApplyDamage(entity, filter, 3);
    system.waitTicks(6).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 弐ノ型 水車
   */
  niNoKata(entity, itemStack) {
    if (entity instanceof Player5) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu2.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const fdistance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0);
    const ffilter = addRegimentalFilter(0, getDistanceLocation(entity.location, fdistance), 2.5, entity);
    this.kokyuApplyDamage(entity, ffilter, 2);
    const bdistance = getLookLocationDistance(entity.getRotation().y, -2.5, 0, 0);
    const bfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, bdistance), 2.5, entity);
    this.kokyuApplyDamage(entity, bfilter, 2);
    const udistance = getLookLocationDistance(entity.getRotation().y, 0, 0, 2.5);
    const ufilter = addRegimentalFilter(0, getDistanceLocation(entity.location, udistance), 2.5, entity);
    this.kokyuApplyDamage(entity, ufilter, 2);
    const ddistance = getLookLocationDistance(entity.getRotation().y, 0, 0, -2.5);
    const dfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, ddistance), 2.5, entity);
    this.kokyuApplyDamage(entity, dfilter, 2);
    system.waitTicks(5).then(() => {
      const point = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
      entity.applyKnockback({ x: point.x, z: point.z }, 0.5);
    }).catch((error) => {
    }).finally(() => {
    });
    system.waitTicks(TicksPerSecond).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 参ノ型 流流舞い
   */
  sanNoKata(entity, itemStack) {
    if (entity instanceof Player5) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu3.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const num = system.runInterval(() => {
      try {
        const distance = getLookLocationDistancePitch(entity.getRotation(), 1, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 4, entity);
        this.kokyuApplyDamage(entity, filter, 2);
        const point = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
        entity.applyKnockback({ x: point.x, z: point.z }, 0);
      } catch (error) {
        system.clearRun(num);
      }
    }, 6);
    system.waitTicks(30).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system.clearRun(num);
    });
  }
  /**
   * 肆ノ型 打ち潮
   */
  shiNoKata(entity, itemStack) {
    if (entity instanceof Player5) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu4.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    let side = -2;
    const num = system.runInterval(() => {
      try {
        const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, side);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity);
        entity.dimension.spawnParticle("kurokumaft:mizu2_particle", getDistanceLocation(entity.location, distance));
        this.kokyuApplyDamage(entity, filter, 3);
        side = -side;
        const point = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
        entity.applyKnockback({ x: point.x, z: point.z }, 0);
      } catch (error) {
        system.clearRun(num);
      }
    }, 8);
    system.waitTicks(30).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system.clearRun(num);
    });
  }
  /**
   * 伍ノ型 干天の慈雨
   */
  goNoKata(entity, itemStack) {
    if (entity instanceof Player5) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu5.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const goKataLists = weightChoice([
      { item: "small", weight: 55 },
      { item: "lage", weight: 40 },
      { item: "kill", weight: 5 }
    ]);
    entity.addTag(entity.id);
    const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
    const filter = addRegimentalFilter(1, getDistanceLocation(entity.location, distance), 3, entity);
    const targets = entity.dimension.getEntities(filter);
    targets.forEach((en) => {
      try {
        const choice = goKataLists.pick();
        switch (choice) {
          case "small":
            this.kokyuApplyDamage(entity, filter, 2);
            break;
          case "lage":
            this.kokyuApplyDamage(entity, filter, 6);
            break;
          case "kill":
            this.kokyuApplyDamage(entity, filter, 8);
            break;
        }
      } catch (error) {
      }
    });
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    entity.dimension.spawnParticle("kurokumaft:mizu5_particle", entity.location, molang);
    entity.dimension.spawnParticle("kurokumaft:mizu5_particle", entity.location, molang);
    entity.removeTag(entity.id);
    system.waitTicks(4).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 陸ノ型 ねじれ渦
   */
  rokuNoKata(entity, itemStack) {
    entity.setProperty("kurokumaft:kokyu_use", false);
    if (!entity.getDynamicProperty("kurokumaft:mizuroku")) {
      entity.setDynamicProperty("kurokumaft:mizuroku", true);
      if (entity instanceof Player5) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu6.value" }] });
        if (itemStack !== void 0) {
          ItemDurabilityDamage(entity, itemStack);
        }
      }
      if (entity.isInWater) {
        const filter = addRegimentalFilter(0, entity.location, 5, entity);
        this.kokyuApplyDamage(entity, filter, 6);
      } else {
        const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
        this.kokyuApplyDamage(entity, filter, 3);
      }
      if (entity.isOnGround) {
        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 1);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 1.2);
      }
      const num = system.runInterval(() => {
        try {
          if (entity.isInWater) {
            const filter = addRegimentalFilter(0, entity.location, 5, entity);
            this.kokyuApplyDamage(entity, filter, 6);
          } else {
            const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
            this.kokyuApplyDamage(entity, filter, 3);
          }
        } catch (error) {
          system.clearRun(num);
        }
      }, 4);
      system.waitTicks(30).then(() => {
        entity.addEffect("minecraft:slow_falling", 2 * TicksPerSecond, {
          amplifier: 1,
          showParticles: false
        });
      }).catch((error) => {
      });
      system.waitTicks(35).then(() => {
        entity.removeEffect("minecraft:slow_falling");
        entity.setProperty("kurokumaft:kokyu_particle", false);
        entity.setDynamicProperty("kurokumaft:mizuroku", false);
      }).catch((error) => {
      }).finally(() => {
        system.clearRun(num);
      });
    }
  }
  /**
   * 漆ノ型 雫波紋突き
   */
  shitiNoKata(entity, itemStack) {
    entity.setProperty("kurokumaft:kokyu_use", false);
    if (entity instanceof Player5) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu7.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistancePitch(entity.getRotation(), 3.5, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2.5, entity);
    this.kokyuApplyDamage(entity, filter, 8);
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    entity.dimension.spawnParticle("kurokumaft:mizu7_1_particle", getDistanceLocation(entity.location, distance), molang);
    entity.dimension.spawnParticle("kurokumaft:mizu7_2_particle", getDistanceLocation(entity.location, distance), molang);
    system.waitTicks(5).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 捌ノ型 滝壺
   */
  hachiNoKata(entity, itemStack) {
    entity.setProperty("kurokumaft:kokyu_use", false);
    if (!entity.getDynamicProperty("kurokumaft:mizuhati")) {
      if (entity instanceof Player5) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu8.value" }] });
        if (itemStack !== void 0) {
          ItemDurabilityDamage(entity, itemStack);
        }
      }
      entity.setDynamicProperty("kurokumaft:mizuhati", true);
      if (entity.isOnGround) {
        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 1.2);
      }
      let parnum = 0;
      system.waitTicks(20).then(() => {
        const filter = addRegimentalFilter(0, { x: entity.location.x, y: entity.location.y - 2, z: entity.location.z }, 8, entity);
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        parnum = system.runInterval(() => {
          try {
            entity.dimension.spawnParticle("kurokumaft:mizu8_particle", { x: entity.location.x, y: entity.location.y - 2, z: entity.location.z }, molang);
            entity.dimension.spawnParticle("kurokumaft:mizu_pillar_particle", { x: entity.location.x + 1, y: entity.location.y - 0.5, z: entity.location.z + 1 }, molang);
            entity.dimension.spawnParticle("kurokumaft:mizu_pillar_particle", { x: entity.location.x + 1, y: entity.location.y - 0.5, z: entity.location.z - 1 }, molang);
            entity.dimension.spawnParticle("kurokumaft:mizu_pillar_particle", { x: entity.location.x - 1, y: entity.location.y - 0.5, z: entity.location.z + 1 }, molang);
            entity.dimension.spawnParticle("kurokumaft:mizu_pillar_particle", { x: entity.location.x - 1, y: entity.location.y - 0.5, z: entity.location.z - 1 }, molang);
          } catch (error) {
            system.clearRun(parnum);
          }
        }, 3);
        this.kokyuApplyDamage(entity, filter, 8);
      }).catch((error) => {
      }).finally(() => {
      });
      system.waitTicks(30).then(() => {
        entity.addEffect("minecraft:slow_falling", 2 * TicksPerSecond, {
          amplifier: 1,
          showParticles: false
        });
      }).catch((error) => {
      }).finally(() => {
      });
      system.waitTicks(40).then(() => {
        entity.removeEffect("minecraft:slow_falling");
        entity.setProperty("kurokumaft:kokyu_particle", false);
        entity.setDynamicProperty("kurokumaft:mizuhati", false);
      }).catch((error) => {
      }).finally(() => {
        if (parnum !== 0) {
          system.clearRun(parnum);
        }
      });
    }
  }
  /**
   * 玖ノ型 水流飛沫・乱
   */
  kuNoKata(entity, itemStack) {
    if (entity.getDynamicProperty("kurokumaft:chage_type") === void 0) {
      if (entity instanceof Player5) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu9.value" }] });
        if (itemStack !== void 0) {
          ItemDurabilityDamage(entity, itemStack);
        }
      }
      entity.setDynamicProperty("kurokumaft:chage_type", true);
      entity.addEffect("minecraft:speed", 10 * TicksPerSecond, {
        amplifier: 5,
        showParticles: false
      });
      entity.addEffect("minecraft:jump_boost", 10 * TicksPerSecond, {
        amplifier: 3,
        showParticles: false
      });
      system.waitTicks(10 * TicksPerSecond).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
        entity.setDynamicProperty("kurokumaft:chage_type", void 0);
      }).catch((error) => {
      }).finally(() => {
      });
    }
  }
  /**
   * 拾ノ型 生生流転　発射
   */
  zyuNoKataShot(entity, itemStack) {
    const chage = entity.getProperty("kurokumaft:kokyu_chage");
    entity.setProperty("kurokumaft:kokyu_use", false);
    if (chage === 4) {
      if (entity instanceof Player5) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu10.value" }] });
        if (itemStack !== void 0) {
          ItemDurabilityDamage(entity, itemStack);
        }
      }
      entity.setProperty("kurokumaft:kokyu_chage", 10);
      system.waitTicks(10).then(() => {
        const dragon = shooting(entity, "kurokumaft:mizu_dragon", 0, 3, void 0, 0);
        entity.setProperty("kurokumaft:kokyu_chage", 0);
        entity.setProperty("kurokumaft:kokyu_particle", false);
        system.waitTicks(15).then(() => {
          if (dragon.isValid) {
            dragon.remove();
          }
        }).catch((error) => {
        }).finally(() => {
        });
      }).catch((error) => {
      }).finally(() => {
      });
    }
  }
  /**
   * 拾ノ型 生生流転
   */
  zyuNoKata(entity, itemStack) {
    if (entity instanceof Player5) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu10.value" }] });
      entity.startItemCooldown("kurokumaft:mizu", 3 * TicksPerSecond);
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    let side = 2;
    const num = system.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 6, entity);
        this.kokyuApplyDamage(entity, filter, 8);
        const distance = getLookLocationDistance(entity.getRotation().y, 1, side, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
        side = -side;
      } catch (error) {
        system.clearRun(num);
      }
    }, 4);
    system.waitTicks(2.5 * TicksPerSecond).then(() => {
      const dragon = shooting(entity, "kurokumaft:mizu_dragon", 0, 3, void 0, 0);
      system.waitTicks(15).then(() => {
        if (dragon.isValid) {
          dragon.remove();
        }
      }).catch((error) => {
      }).finally(() => {
      });
      entity.setProperty("kurokumaft:kokyu_particle", false);
      entity.setProperty("kurokumaft:kokyu_use", false);
    }).catch((error) => {
    }).finally(() => {
      system.clearRun(num);
    });
  }
  /**
  * 拾ノ型 生生流転
  */
  zyuNoKataMob(entity, itemStack) {
    entity.setProperty("kurokumaft:kokyu_particle", true);
    entity.setProperty("kurokumaft:kokyu_attack", true);
    const filter = addRegimentalFilter(0, entity.location, 4.5, entity);
    this.kokyuApplyDamage(entity, filter, 10);
    const num1 = system.runInterval(() => {
      try {
        const filter2 = addRegimentalFilter(0, entity.location, 4.5, entity);
        this.kokyuApplyDamage(entity, filter2, 10);
      } catch (error) {
        system.clearRun(num1);
      }
    }, 10);
    system.waitTicks(35).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_attack", false);
      entity.setProperty("kurokumaft:kokyu_chage", 10);
      system.waitTicks(10).then(() => {
        const dragon = shooting(entity, "kurokumaft:mizu_dragon", 0, 3, void 0, 0);
        entity.setProperty("kurokumaft:kokyu_chage", 0);
        entity.setProperty("kurokumaft:kokyu_particle", false);
        system.waitTicks(2 * TicksPerSecond).then(() => {
          if (dragon.isValid) {
            dragon.remove();
          }
        }).catch((error) => {
        }).finally(() => {
        });
      }).catch((error) => {
      }).finally(() => {
      });
    }).catch((error) => {
    }).finally(() => {
      system.clearRun(num1);
    });
  }
  /**
   * 拾壱ノ型 凪
   */
  zyuichiNoKata(entity, itemStack) {
    if (entity.getDynamicProperty("kurokumaft:chage_type") === void 0) {
      try {
        if (entity instanceof Player5) {
          entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kokyu11.value" }] });
          if (itemStack !== void 0) {
            ItemDurabilityDamage(entity, itemStack);
          }
        }
        entity.setDynamicProperty("kurokumaft:chage_type", true);
        this.nagiIntervalId = system.runInterval(() => {
          try {
            entity.setProperty("kurokumaft:kokyu_attack", false);
            this.checkNagiReflection(entity);
          } catch (error) {
            system.clearRun(this.nagiIntervalId);
          }
        }, 4);
        const parnum = system.runInterval(() => {
          try {
            const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
            const molang = new MolangVariableMap();
            molang.setFloat("variable.kaikyu", kaikyuNum);
            entity.dimension.spawnParticle("kurokumaft:mizu11_particle", entity.location, molang);
          } catch (error) {
            system.clearRun(parnum);
          }
        }, TicksPerSecond);
        system.waitTicks(3 * TicksPerSecond).then(() => {
          entity.setProperty("kurokumaft:kokyu_attack", false);
          entity.setProperty("kurokumaft:kokyu_use", false);
          entity.setProperty("kurokumaft:kokyu_particle", false);
          entity.setDynamicProperty("kurokumaft:chage_type", void 0);
          system.clearRun(this.nagiIntervalId);
          system.clearRun(parnum);
        }).catch((error) => {
        }).finally(() => {
        });
      } catch (error) {
        system.clearRun(this.nagiIntervalId);
      } finally {
      }
      ;
    }
  }
  nagiIntervalId = 0;
  checkNagiReflection(entity) {
    if (entity.isValid) {
      if (this.projectRefrect(entity, entity.location)) {
        entity.setProperty("kurokumaft:kokyu_attack", true);
      }
      const filter = addRegimentalFilter(0, entity.location, 4.5, entity);
      const targets = entity.dimension.getEntities(filter);
      targets.forEach((en) => {
        if (en !== void 0 && en.isValid) {
          const familyTypes = en.getComponent(EntityComponentTypes5.TypeFamily);
          if (familyTypes.hasTypeFamily("arrow")) {
            const view = en.getViewDirection();
            en.applyKnockback({ x: -Math.round(view.x) * 3, z: -Math.round(view.z) * 3 }, 3);
          } else {
            this.kokyuApplyDamage(entity, filter, 10);
          }
          entity.setProperty("kurokumaft:kokyu_attack", true);
        }
      });
    } else {
      system.clearRun(this.nagiIntervalId);
    }
  }
};

// scripts/kokyu/kata/NomalAttack.ts
import { Player as Player6 } from "@minecraft/server";
var NomalAttack = class extends KataComonClass {
  oneAttack(entity, itemStack) {
    if (entity instanceof Player6) {
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0.5);
    const disLocation = getDistanceLocation(entity.location, distance);
    const filter = addRegimentalFilter(0, disLocation, 3, entity);
    this.kokyuApplyDamage(entity, filter, 0);
  }
};

// scripts/kokyu/player/character/KokyuGiyuComponent.ts
var KokyuGiyuComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[5];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  attack = new NomalAttack();
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    this.attack.oneAttack(player, itemStack);
  }
  mizu = new MizuNoKata();
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 2:
        this.mizu.niNoKata(player, itemStack);
        break;
      case 3:
        this.mizu.sanNoKata(player, itemStack);
        break;
      case 4:
        this.mizu.shiNoKata(player, itemStack);
        break;
      case 9:
        this.mizu.kuNoKata(player, itemStack);
        break;
      case 10:
        this.mizu.zyuNoKata(player, itemStack);
        break;
      case 11:
        this.mizu.zyuichiNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 1:
        this.mizu.ichiNoKata(player, itemStack);
        break;
      case 5:
        this.mizu.goNoKata(player, itemStack);
        break;
      case 6:
        this.mizu.rokuNoKata(player, itemStack);
        break;
      case 7:
        this.mizu.shitiNoKata(player, itemStack);
        break;
      case 8:
        this.mizu.hachiNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/kata/HanaNoKata.ts
import { MolangVariableMap as MolangVariableMap2, system as system2, TicksPerSecond as TicksPerSecond2, Player as Player7 } from "@minecraft/server";
var HanaNoKata = class extends KataComonClass {
  /**
   * 弐ノ型 御影梅
   */
  niNoKata(entity, itemStack) {
    try {
      if (entity instanceof Player7) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hana_kokyu2.value" }] });
        if (itemStack !== void 0) {
          ItemDurabilityDamage(entity, itemStack);
        }
      }
      const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
      const molang = new MolangVariableMap2();
      molang.setFloat("variable.kaikyu", kaikyuNum);
      const num = system2.runInterval(() => {
        try {
          const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
          const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2.5, entity);
          entity.dimension.spawnParticle("kurokumaft:hana_ni_particle", getDistanceLocation(entity.location, distance), molang);
          this.kokyuApplyDamage(entity, filter, 5);
        } catch (error) {
          system2.clearRun(num);
        }
      }, 4);
      system2.waitTicks(TicksPerSecond2).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system2.clearRun(num);
      });
    } catch (error) {
    } finally {
    }
  }
  /**
   * 肆ノ型 紅花衣
   */
  shiNoKata(entity, itemStack) {
    if (entity instanceof Player7) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hana_kokyu4.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
    this.kokyuApplyDamage(entity, filter, 8);
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap2();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    entity.dimension.spawnParticle("kurokumaft:hana_shi_particle", getDistanceLocation(entity.location, distance), molang);
    system2.waitTicks(TicksPerSecond2).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 伍ノ型 徒の芍薬
   */
  goNoKata(entity, itemStack) {
    if (entity instanceof Player7) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hana_kokyu5.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap2();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    let count = 1;
    const num = system2.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2.5, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        if (count <= 9) {
          entity.dimension.spawnParticle("kurokumaft:hana_go_" + count + "_particle", getDistanceLocation(entity.location, distance), molang);
          count++;
        }
      } catch (error) {
        system2.clearRun(num);
      }
    }, 2);
    system2.waitTicks(TicksPerSecond2).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system2.clearRun(num);
    });
  }
  /**
   * 陸ノ型 渦桃
   */
  rokuNoKata(entity, itemStack) {
    if (entity instanceof Player7) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hana_kokyu6.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap2();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const distanceK = getLookLocationDistance(entity.getRotation().y, 3, 0, 1);
    entity.applyKnockback({ x: distanceK.x, z: distanceK.z }, 0.5);
    const num = system2.runInterval(() => {
      try {
        entity.applyKnockback({ x: distanceK.x, z: distanceK.z }, 0);
        const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 4);
        entity.dimension.spawnParticle("kurokumaft:hana_roku_particle", getDistanceLocation(entity.location, distance), molang);
      } catch (error) {
        system2.clearRun(num);
      }
    }, 3);
    system2.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system2.clearRun(num);
    });
  }
  higanLists = weightChoice([
    { item: "minor", weight: 50 },
    { item: "serious", weight: 35 },
    { item: "blindness", weight: 15 }
  ]);
  /**
   * 終ノ型 彼岸朱眼
   */
  shitiNoKata(entity, itemStack) {
    entity.setProperty("kurokumaft:kokyu_use", false);
    entity.setProperty("kurokumaft:kokyu_particle", false);
    if (entity.getDynamicProperty("kurokumaft:chage_type") === void 0) {
      if (entity instanceof Player7) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hana_kokyu7.value" }] });
        if (itemStack !== void 0) {
          ItemDurabilityDamage(entity, itemStack);
        }
      }
      entity.setDynamicProperty("kurokumaft:chage_type", true);
      entity.addEffect("minecraft:speed", 200 * TicksPerSecond2, {
        amplifier: 5,
        showParticles: false
      });
      entity.addEffect("minecraft:jump_boost", 200 * TicksPerSecond2, {
        amplifier: 3,
        showParticles: false
      });
      entity.addEffect("minecraft:night_vision", 200 * TicksPerSecond2, {
        amplifier: 10,
        showParticles: false
      });
      system2.waitTicks(180 * TicksPerSecond2).then(() => {
        entity.setDynamicProperty("kurokumaft:chage_type", void 0);
        entity.removeEffect("minecraft:speed");
        entity.removeEffect("minecraft:jump_boost");
        entity.removeEffect("minecraft:night_vision");
        const choice = this.higanLists.pick();
        switch (choice) {
          case "blindness":
            entity.addEffect("minecraft:blindness", 600 * TicksPerSecond2, {
              amplifier: 3,
              showParticles: false
            });
          case "serious":
            entity.addEffect("minecraft:weakness", 10 * TicksPerSecond2, {
              amplifier: 1,
              showParticles: false
            });
          case "minor":
            entity.addEffect("minecraft:slowness", 10 * TicksPerSecond2, {
              amplifier: 1,
              showParticles: false
            });
            break;
        }
      }).catch((error) => {
      }).finally(() => {
      });
    }
  }
};

// scripts/kokyu/player/character/KokyuKanawoComponent.ts
var KokyuKanawoComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[4];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hana_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hana_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  attack = new NomalAttack();
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    this.attack.oneAttack(player, itemStack);
  }
  hana = new HanaNoKata();
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 2:
        this.hana.niNoKata(player, itemStack);
        break;
      case 4:
        this.hana.shiNoKata(player, itemStack);
        break;
      case 5:
        this.hana.goNoKata(player, itemStack);
        break;
      case 6:
        this.hana.rokuNoKata(player, itemStack);
        break;
      case 7:
        this.hana.shitiNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/kata/KoiNoKata.ts
import { MolangVariableMap as MolangVariableMap3, system as system3, TicksPerSecond as TicksPerSecond3, Player as Player8 } from "@minecraft/server";
var KoiNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 初恋のわななき
   */
  ichiNoKata(entity, itemStack) {
    entity.setProperty("kurokumaft:kokyu_use", false);
    if (entity instanceof Player8) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:koi_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const num = system3.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
        const filter = addRegimentalFilter(0, entity.location, 8, entity);
        this.kokyuApplyDamage(entity, filter, 3);
      } catch (error) {
        system3.clearRun(num);
      }
    }, 2);
    system3.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system3.clearRun(num);
    });
  }
  /**
   * 弐ノ型 懊悩巡る恋
   */
  niNoKata(entity, itemStack) {
    if (entity instanceof Player8) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:koi_kokyu2.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    try {
      const filter = addRegimentalFilter(0, entity.location, 8, entity);
      this.kokyuApplyDamage(entity, filter, 5);
      const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
      entity.applyKnockback({ x: distance.x, z: distance.z }, 0.75);
    } catch (error) {
    }
    system3.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      entity.addEffect("minecraft:slow_falling", 1 * TicksPerSecond3, {
        amplifier: 1,
        showParticles: false
      });
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 参ノ型 恋猫しぐれ
   */
  sanNoKata(entity, itemStack) {
    if (entity instanceof Player8) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:koi_kokyu3.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 3, -5, 0);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 0.3);
    entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", entity.location);
    entity.setProperty("kurokumaft:kokyu_attack", true);
    let side = 5;
    const num = system3.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 8, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        const distance2 = getLookLocationDistance(entity.getRotation().y, 3, side, 0);
        entity.applyKnockback({ x: distance2.x, z: distance2.z }, 0.3);
        entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", entity.location);
        side = -side;
      } catch (error) {
        system3.clearRun(num);
      }
    }, 10);
    system3.waitTicks(60).then(() => {
      entity.setProperty("kurokumaft:kokyu_attack", false);
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system3.clearRun(num);
    });
  }
  /**
   * 伍ノ型 揺らめく恋情・乱れ爪
   */
  goNoKata(entity, itemStack) {
    if (entity instanceof Player8) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:koi_kokyu5.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 1);
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap3();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    system3.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      const distance2 = getLookLocationDistance(entity.getRotation().y, 0, 0, -1);
      const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance2), 8, entity);
      const parnum = system3.runInterval(() => {
        try {
          this.kokyuApplyDamage(entity, filter, 4);
        } catch (error) {
          system3.clearRun(parnum);
        }
      }, 1);
      entity.addEffect("minecraft:slow_falling", 1 * TicksPerSecond3, {
        amplifier: 1,
        showParticles: false
      });
      system3.waitTicks(10).then(() => {
        try {
          entity.setProperty("kurokumaft:kokyu_particle", false);
          entity.removeEffect("minecraft:slow_falling");
          system3.runTimeout(() => {
            entity.addEffect("minecraft:slow_falling", 1 * TicksPerSecond3, {
              amplifier: 1,
              showParticles: false
            });
          }, 5);
        } finally {
          system3.clearRun(parnum);
        }
      }).catch((error) => {
      }).finally(() => {
      });
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 陸ノ型 猫足恋風
   */
  rokuNoKata(entity, itemStack) {
    if (entity instanceof Player8) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:koi_kokyu6.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, -3, 0, 0);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 1);
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap3();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    system3.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      const distance2 = getLookLocationDistance(entity.getRotation().y, 1, 0, -1);
      const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance2), 8, entity);
      const parnum = system3.runInterval(() => {
        try {
          this.kokyuApplyDamage(entity, filter, 4);
        } catch (error) {
          system3.clearRun(parnum);
        }
      }, 1);
      system3.waitTicks(10).then(() => {
        entity.setProperty("kurokumaft:kokyu_particle", false);
        entity.addEffect("minecraft:slow_falling", 1 * TicksPerSecond3, {
          amplifier: 1,
          showParticles: false
        });
      }).catch((error) => {
      }).finally(() => {
        system3.clearRun(parnum);
      });
    }).catch((error) => {
    }).finally(() => {
    });
  }
};

// scripts/kokyu/player/character/KokyuMituriComponent.ts
var KokyuMituriComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[13];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:koi_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:koi_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  attack = new NomalAttack();
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    this.attack.oneAttack(player, itemStack);
  }
  koi = new KoiNoKata();
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 2:
        this.koi.niNoKata(player, itemStack);
        break;
      case 3:
        this.koi.sanNoKata(player, itemStack);
        break;
      case 5:
        this.koi.goNoKata(player, itemStack);
        break;
      case 6:
        this.koi.rokuNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 1:
        this.koi.ichiNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/kata/HonoNoKata.ts
import { system as system4, Player as Player9 } from "@minecraft/server";
var HonoNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 不知火
   */
  ichiNoKata(entity, itemStack) {
    if (entity instanceof Player9) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    entity.setProperty("kurokumaft:kokyu_use", false);
    const num = system4.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
        const distance = getLookLocationDistance(entity.getRotation().y, 3, 0, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
        this.kokyuApplyDamage(entity, filter, 5);
      } catch (error) {
        system4.clearRun(num);
      }
    }, 1);
    system4.waitTicks(12).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system4.clearRun(num);
    });
  }
  /**
   * 弐ノ型 昇り炎天
   */
  niNoKata(entity, itemStack) {
    if (entity instanceof Player9) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kokyu2.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
    this.kokyuApplyDamage(entity, filter, 5);
    system4.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 参ノ型 気炎万象
   */
  sanNoKata(entity, itemStack) {
    if (entity instanceof Player9) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kokyu3.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
    this.kokyuApplyDamage(entity, filter, 5);
    system4.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 肆ノ型 盛炎のうねり
   */
  shiNoKata(entity, itemStack) {
    if (entity instanceof Player9) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kokyu4.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    let z = 0;
    const num = system4.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, z, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        z++;
      } catch (error) {
        system4.clearRun(num);
      }
    }, 4);
    system4.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system4.clearRun(num);
    });
  }
  /**
   * 伍ノ型 炎虎
   */
  goNoKata(entity, itemStack) {
    if (entity instanceof Player9) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kokyu5.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const dragon = shooting(entity, "kurokumaft:hono_tiger", 0, 3, void 0, 0);
    system4.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
    system4.waitTicks(20).then(() => {
      if (dragon.isValid) {
        dragon.remove();
      }
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 玖ノ型 煉獄
   */
  kuNoKata(entity, itemStack) {
    if (entity instanceof Player9) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kokyu9.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    entity.setProperty("kurokumaft:kokyu_use", false);
    const num = system4.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
        const distance = getLookLocationDistance(entity.getRotation().y, 6, 0, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
        this.kokyuApplyDamage(entity, filter, 15);
      } catch (error) {
        system4.clearRun(num);
      }
    }, 1);
    system4.waitTicks(12).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system4.clearRun(num);
    });
  }
};

// scripts/kokyu/player/character/KokyuKyouzyuroComponent.ts
var KokyuKyouzyuroComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[7];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  attack = new NomalAttack();
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    this.attack.oneAttack(player, itemStack);
  }
  hono = new HonoNoKata();
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 2:
        this.hono.niNoKata(player, itemStack);
        break;
      case 3:
        this.hono.sanNoKata(player, itemStack);
        break;
      case 4:
        this.hono.shiNoKata(player, itemStack);
        break;
      case 5:
        this.hono.goNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 1:
        this.hono.ichiNoKata(player, itemStack);
        break;
      case 9:
        this.hono.kuNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/kata/KazeNoKata.ts
import { MolangVariableMap as MolangVariableMap4, system as system5, TicksPerSecond as TicksPerSecond4, Player as Player10 } from "@minecraft/server";
var KazeNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 塵旋風・削ぎ
   */
  ichiNoKata(entity, itemStack) {
    if (entity instanceof Player10) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    entity.setProperty("kurokumaft:kokyu_use", false);
    const num = system5.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
        const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
        this.kokyuApplyDamage(entity, filter, 5);
      } catch (error) {
        system5.clearRun(num);
      }
    }, 1);
    system5.waitTicks(12).then(() => {
      entity.setDynamicProperty("kurokumaft:chage_type", void 0);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system5.clearRun(num);
    });
  }
  /**
   * 弐ノ型 爪々・科戸風
   */
  niNoKata(entity, itemStack) {
    if (entity instanceof Player10) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu2.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    for (let i = -2; i <= 2; i = i + 2) {
      const distance = getLookLocationDistance(entity.getRotation().y, 4, i, 0.5);
      const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 4, entity);
      this.kokyuApplyDamage(entity, filter, 4);
      const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
      const molang = new MolangVariableMap4();
      molang.setFloat("variable.kaikyu", kaikyuNum);
      entity.dimension.spawnParticle("kurokumaft:kaze2_particle", getDistanceLocation(entity.location, distance), molang);
    }
    system5.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 参ノ型 晴嵐風樹
   */
  sanNoKata(entity, itemStack) {
    if (entity instanceof Player10) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu3.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap4();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system5.runInterval(() => {
      try {
        const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        entity.dimension.spawnParticle("kurokumaft:kaze3_particle", getDistanceLocation(entity.location, distance), molang);
      } catch (error) {
        system5.clearRun(num);
      }
    }, 2);
    system5.waitTicks(30).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system5.clearRun(num);
    });
  }
  /**
   * 肆ノ型 昇上砂塵嵐
   */
  shiNoKata(entity, itemStack) {
    if (entity instanceof Player10) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu4.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap4();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system5.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, 0, 0, 4);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 5, entity);
        this.kokyuApplyDamage(entity, filter, 4);
        entity.dimension.spawnParticle("kurokumaft:kaze4_particle", entity.location, molang);
        this.checkSazinReflection(entity);
      } catch (error) {
        system5.clearRun(num);
      }
    }, 2);
    system5.waitTicks(40).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system5.clearRun(num);
    });
  }
  checkSazinReflection(entity) {
    if (entity.isValid) {
      this.projectRefrect(entity, entity.location);
      entity.addTag(entity.id);
      const filter = addRegimentalFilter(0, entity.location, 5, entity);
      const targets = entity.dimension.getEntities(filter);
      targets.forEach((en) => {
        const view = en.getViewDirection();
        const distance = getLookLocationDistance(entity.getRotation().y, 1, 1, 0);
        en.applyKnockback({ x: -Math.round(distance.x - view.x), z: -Math.round(distance.z - view.z) }, 1.5);
      });
      entity.removeTag(entity.id);
    }
  }
  /**
   * 伍ノ型 木枯らし颪
   */
  goNoKata(entity, itemStack) {
    if (entity instanceof Player10) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu5.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 1);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 1);
    const num = system5.runInterval(() => {
      try {
        const distance2 = getLookLocationDistance(entity.getRotation().y, 2.5, 0, -1.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance2), 5, entity);
        this.kokyuApplyDamage(entity, filter, 4);
      } catch (error) {
        system5.clearRun(num);
      }
    }, 2);
    system5.waitTicks(10).then(() => {
      entity.addEffect("minecraft:slow_falling", 0.5 * TicksPerSecond4, {
        amplifier: 1,
        showParticles: false
      });
    }).catch((error) => {
    }).finally(() => {
    });
    system5.waitTicks(30).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      entity.addEffect("minecraft:slow_falling", 0.5 * TicksPerSecond4, {
        amplifier: 1,
        showParticles: false
      });
    }).catch((error) => {
    }).finally(() => {
      system5.clearRun(num);
    });
  }
  /**
   * 陸ノ型 黒風烟嵐
   */
  rokuNoKata(entity, itemStack) {
    if (entity instanceof Player10) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu6.value" }] });
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
    this.kokyuApplyDamage(entity, filter, 9);
    system5.waitTicks(8).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 漆ノ型 勁風・天狗風
   */
  shitiNoKata(entity, itemStack) {
    if (entity instanceof Player10) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu7.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap4();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    for (let i = 0; i <= 6; i++) {
      const side = getRandomInRange(-4, 4);
      const around = getRandomInRange(-4, 4);
      const distance = getLookLocationDistance(entity.getRotation().y, around, side, 0);
      entity.dimension.spawnParticle("kurokumaft:kaze7_particle", getDistanceLocation(entity.location, distance), molang);
    }
    const num = system5.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 4.5, entity);
        this.kokyuApplyDamage(entity, filter, 4);
      } catch (error) {
        system5.clearRun(num);
      }
    }, 4);
    system5.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system5.clearRun(num);
    });
  }
  /**
   * 捌ノ型 初烈風斬り
   */
  hachiNoKata(entity, itemStack) {
    if (entity instanceof Player10) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu8.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const num = system5.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 4, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
      } catch (error) {
        system5.clearRun(num);
      }
    }, 4);
    system5.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system5.clearRun(num);
    });
  }
  /**
   * 玖ノ型 韋駄天台風
   */
  kuNoKata(entity, itemStack) {
    if (entity instanceof Player10) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kokyu9.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 0, 0, 1);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 1);
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap4();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system5.runInterval(() => {
      try {
        const distance2 = getLookLocationDistance(entity.getRotation().y, 3, 0, -1);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance2), 5, entity);
        this.kokyuApplyDamage(entity, filter, 6);
        entity.dimension.spawnParticle("kurokumaft:kaze3_particle", getDistanceLocation(entity.location, distance2), molang);
      } catch (error) {
        system5.clearRun(num);
      }
    }, 2);
    entity.addEffect("minecraft:slow_falling", 2 * TicksPerSecond4, {
      amplifier: 1,
      showParticles: false
    });
    system5.waitTicks(40).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system5.clearRun(num);
    });
  }
};

// scripts/kokyu/player/character/KokyuSanemiComponent.ts
var KokyuSanemiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[8];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  attack = new NomalAttack();
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    this.attack.oneAttack(player, itemStack);
  }
  kaze = new KazeNoKata();
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 2:
        this.kaze.niNoKata(player, itemStack);
        break;
      case 3:
        this.kaze.sanNoKata(player, itemStack);
        break;
      case 4:
        this.kaze.shiNoKata(player, itemStack);
        break;
      case 5:
        this.kaze.goNoKata(player, itemStack);
        break;
      case 6:
        this.kaze.rokuNoKata(player, itemStack);
        break;
      case 7:
        this.kaze.shitiNoKata(player, itemStack);
        break;
      case 8:
        this.kaze.hachiNoKata(player, itemStack);
        break;
      case 9:
        this.kaze.kuNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 1:
        this.kaze.ichiNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/kata/MushiNoKata.ts
import { system as system6, Player as Player11 } from "@minecraft/server";
var MushiNoKata = class extends KataComonClass {
  /**
   * 蝶ノ舞 戯れ
   */
  ichiNoKata(entity, itemStack) {
    if (entity instanceof Player11) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mushi_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 5, 0, 0.5);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 0.5);
    const num = system6.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 3, entity);
        this.kokyuApplyDamage(entity, filter, 2);
        this.kokyuApplyEffect(entity, filter, 4, 2, "minecraft:poison");
      } catch (error) {
        system6.clearRun(num);
      }
    }, 2);
    entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", entity.location);
    system6.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
    }).catch((error) => {
    }).finally(() => {
      system6.clearRun(num);
    });
    system6.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 蜂牙ノ舞 真靡き
   */
  niNoKata(entity, itemStack) {
    if (entity instanceof Player11) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mushi_kokyu2.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const point = getLookLocationDistance(entity.getRotation().y, 10, 0, 0);
    entity.applyKnockback({ x: point.x, z: point.z }, 0);
    system6.waitTicks(2).then(() => {
      entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", entity.location);
      const filter = addRegimentalFilter(0, entity.location, 3, entity);
      this.kokyuApplyDamage(entity, filter, 3);
      this.kokyuApplyEffect(entity, filter, 4, 2, "minecraft:poison");
    }).catch((error) => {
    }).finally(() => {
    });
    system6.waitTicks(8).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 蜻蛉ノ舞 複眼六角
   */
  sanNoKata(entity, itemStack) {
    if (entity instanceof Player11) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mushi_kokyu3.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const num = system6.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity);
        this.kokyuApplyDamage(entity, filter, 2);
        this.kokyuApplyEffect(entity, filter, 6, 3, "minecraft:poison");
      } catch (error) {
        system6.clearRun(num);
      }
    }, 4);
    system6.waitTicks(16).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system6.clearRun(num);
    });
  }
  /**
   * 蜈蚣ノ舞 百蟲の呼吸
   */
  shiNoKata(entity, itemStack) {
    if (entity instanceof Player11) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mushi_kokyu4.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 8, -8, 0);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
    entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", entity.location);
    entity.setProperty("kurokumaft:kokyu_attack", true);
    let side = 8;
    const num = system6.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 4, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        this.kokyuApplyEffect(entity, filter, 2, 1, "minecraft:poison");
        const distance2 = getLookLocationDistance(entity.getRotation().y, 8, side, 0);
        entity.applyKnockback({ x: distance2.x, z: distance2.z }, 0);
        entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", entity.location);
        side = -side;
      } catch (error) {
        system6.clearRun(num);
      }
    }, 4);
    system6.waitTicks(40).then(() => {
      entity.setProperty("kurokumaft:kokyu_attack", false);
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system6.clearRun(num);
    });
  }
};

// scripts/kokyu/player/character/KokyuShinobuComponent.ts
var KokyuShinobuComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[6];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mushi_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mushi_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  attack = new NomalAttack();
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    this.attack.oneAttack(player, itemStack);
  }
  mushi = new MushiNoKata();
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 1:
        this.mushi.ichiNoKata(player, itemStack);
        break;
      case 2:
        this.mushi.niNoKata(player, itemStack);
        break;
      case 3:
        this.mushi.sanNoKata(player, itemStack);
        break;
      case 4:
        this.mushi.shiNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/player/character/KokyuTanjiroComponent.ts
import { TicksPerSecond as TicksPerSecond6 } from "@minecraft/server";

// scripts/kokyu/kata/HiNoKata.ts
import { MolangVariableMap as MolangVariableMap5, system as system7, TicksPerSecond as TicksPerSecond5, Player as Player12 } from "@minecraft/server";
var HiNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 円舞
   */
  ichiNoKata(entity, itemStack) {
    if (entity instanceof Player12) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0.5);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
    this.kokyuApplyDamage(entity, filter, 7);
    system7.waitTicks(2).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
    }).catch((error) => {
    }).finally(() => {
    });
    system7.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 壱ノ型 円舞一閃
   */
  ichiNoKataIssen(entity, itemStack) {
    if (entity instanceof Player12) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu1_issen.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const num = system7.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, 5, 0, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
        const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
        this.kokyuApplyDamage(entity, filter, 4);
      } catch (error) {
        system7.clearRun(num);
      }
    }, 1);
    system7.waitTicks(8).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      system7.waitTicks(4).then(() => {
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
      });
    }).catch((error) => {
    }).finally(() => {
      system7.clearRun(num);
    });
  }
  /**
   * 弐ノ型 碧羅の天
   */
  niNoKata(entity, itemStack) {
    if (entity instanceof Player12) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu2.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0.5);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
    this.kokyuApplyDamage(entity, filter, 7);
    system7.waitTicks(7).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 参ノ型 烈日紅鏡
   */
  sanNoKata(entity, itemStack) {
    if (entity instanceof Player12) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu3.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const ldistance = getLookLocationDistance(entity.getRotation().y, 1.5, -1.5, 1);
    const lfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, ldistance), 3, entity);
    this.kokyuApplyDamage(entity, lfilter, 4);
    system7.waitTicks(15).then(() => {
      const rdistance = getLookLocationDistance(entity.getRotation().y, 1.5, 1.5, 1);
      const rfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, rdistance), 3, entity);
      this.kokyuApplyDamage(entity, rfilter, 4);
    }).catch((error) => {
    }).finally(() => {
    });
    system7.waitTicks(25).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 肆ノ型 灼骨炎陽
   */
  shiNoKata(entity, itemStack) {
    if (entity instanceof Player12) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu4.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    let z = 0;
    const num = system7.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, z, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        z++;
      } catch (error) {
        system7.clearRun(num);
      }
    }, 4);
    system7.waitTicks(30).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system7.clearRun(num);
    });
  }
  /**
   * 伍ノ型 陽華突
   */
  goNoKata(entity, itemStack) {
    if (entity instanceof Player12) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu5.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    entity.setProperty("kurokumaft:kokyu_use", false);
    const distance = getLookLocationDistancePitch(entity.getRotation(), 3.5, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity);
    this.kokyuApplyDamage(entity, filter, 7);
    system7.waitTicks(5).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 陸ノ型 日暈の龍 頭舞い
   */
  rokuNoKata(entity, itemStack) {
    if (entity instanceof Player12) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu6.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    entity.setDynamicProperty("kurokumaft:chage_type", true);
    entity.setProperty("kurokumaft:kokyu_chage", 1);
    entity.setProperty("kurokumaft:kokyu_attack", true);
    let side = 5;
    const num = system7.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 4, entity);
        this.kokyuApplyDamage(entity, filter, 4);
        const distance = getLookLocationDistance(entity.getRotation().y, 3, side, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
        side = -side;
      } catch (error) {
        system7.clearRun(num);
      }
    }, 4);
    system7.waitTicks(1 * TicksPerSecond5).then(() => {
      entity.setProperty("kurokumaft:kokyu_attack", false);
      entity.setProperty("kurokumaft:kokyu_chage", 0);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setDynamicProperty("kurokumaft:chage_type", void 0);
    }).catch((error) => {
    }).finally(() => {
      system7.clearRun(num);
    });
  }
  /**
   * 漆ノ型 斜陽転身
   */
  shitiNoKata(entity, itemStack) {
    if (entity instanceof Player12) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu7.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, -2, 0, 0);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 0.5);
    const distance2 = getLookLocationDistance(entity.getRotation().y, 3, 0, -1);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance2), 4, entity);
    this.kokyuApplyDamage(entity, filter, 9);
    system7.waitTicks(15).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 捌ノ型 飛輪陽炎
   */
  hachiNoKata(entity, itemStack) {
    if (entity instanceof Player12) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu8.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 3.5, 0, 0.5);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 4, entity);
    this.kokyuApplyDamage(entity, filter, 6);
    system7.waitTicks(15).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 玖ノ型 輝輝恩光
   */
  kuNoKata(entity, itemStack) {
    if (entity instanceof Player12) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu9.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap5();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system7.runInterval(() => {
      try {
        entity.dimension.spawnParticle("kurokumaft:hi9_particle", entity.location, molang);
      } catch (error) {
        system7.clearRun(num);
      }
    }, 1);
    const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0.5);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2, entity);
    this.kokyuApplyDamage(entity, filter, 5);
    const udistance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 3);
    const ufilter = addRegimentalFilter(0, getDistanceLocation(entity.location, udistance), 3, entity);
    this.kokyuApplyDamage(entity, ufilter, 5);
    system7.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system7.clearRun(num);
    });
  }
  /**
   * 拾ノ型 火車
   */
  zyuNoKata(entity, itemStack) {
    if (entity instanceof Player12) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu10.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const fdistance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0);
    const ffilter = addRegimentalFilter(0, getDistanceLocation(entity.location, fdistance), 2.5, entity);
    this.kokyuApplyDamage(entity, ffilter, 4);
    const bdistance = getLookLocationDistance(entity.getRotation().y, -2.5, 0, 0);
    const bfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, bdistance), 2.5, entity);
    this.kokyuApplyDamage(entity, bfilter, 4);
    const udistance = getLookLocationDistance(entity.getRotation().y, 0, 0, 2.5);
    const ufilter = addRegimentalFilter(0, getDistanceLocation(entity.location, udistance), 2.5, entity);
    this.kokyuApplyDamage(entity, ufilter, 4);
    const ddistance = getLookLocationDistance(entity.getRotation().y, 0, 0, -2.5);
    const dfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, ddistance), 2.5, entity);
    this.kokyuApplyDamage(entity, dfilter, 4);
    system7.waitTicks(5).then(() => {
      const point = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
      entity.applyKnockback({ x: point.x, z: point.z }, 0.5);
    }).catch((error) => {
    }).finally(() => {
    });
    system7.waitTicks(15).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 拾壱ノ型 幻日虹
   */
  zyuichiNoKata(entity, itemStack) {
    if (entity.getDynamicProperty("kurokumaft:chage_type") === void 0) {
      if (entity instanceof Player12) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu11.value" }] });
        if (itemStack !== void 0) {
          ItemDurabilityDamage(entity, itemStack);
        }
      }
      entity.setDynamicProperty("kurokumaft:chage_type", true);
      entity.triggerEvent("kurokumaft:add_damage_clear");
      this.gennitiIntervalId = system7.runInterval(() => {
        try {
          this.checkGennitiMove(entity, itemStack);
        } catch (error) {
          system7.clearRun(this.gennitiIntervalId);
        }
      }, 2);
      const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
      const molang = new MolangVariableMap5();
      molang.setFloat("variable.kaikyu", kaikyuNum);
      const num = system7.runInterval(() => {
        try {
          entity.dimension.spawnParticle("kurokumaft:hi_heat_haze_particle", entity.location, molang);
        } catch (error) {
          system7.clearRun(num);
        }
      }, 1);
      system7.waitTicks(3 * TicksPerSecond5).then(() => {
        entity.setProperty("kurokumaft:kokyu_attack", false);
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
        entity.setDynamicProperty("kurokumaft:chage_type", void 0);
        entity.triggerEvent("kurokumaft:remove_damage_clear");
      }).catch((error) => {
      }).finally(() => {
        system7.clearRun(this.gennitiIntervalId);
        system7.clearRun(num);
      });
    }
  }
  gennitiIntervalId = 0;
  checkGennitiMove(entity, itemStack) {
    if (entity.isValid) {
      const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
      const molang = new MolangVariableMap5();
      molang.setFloat("variable.kaikyu", kaikyuNum);
      if (this.projectRefrect(entity, entity.location)) {
        entity.dimension.spawnParticle("kurokumaft:hi11_particle", entity.location, molang);
      }
      entity.addTag(entity.id);
      const filter = addRegimentalFilter(1, entity.location, 2.5, entity);
      const targets = entity.dimension.getEntities(filter);
      targets.forEach((en) => {
        entity.dimension.spawnParticle("kurokumaft:hi11_particle", entity.location, molang);
      });
      entity.removeTag(entity.id);
    } else {
      system7.clearRun(this.gennitiIntervalId);
    }
  }
  /**
   * 拾弐ノ型 炎舞
   */
  zyuniNoKata(entity, itemStack) {
    if (entity instanceof Player12) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kokyu12.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0.5);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
    this.kokyuApplyDamage(entity, filter, 5);
    system7.waitTicks(5).then(() => {
      this.kokyuApplyDamage(entity, filter, 5);
    }).catch((error) => {
    }).finally(() => {
    });
    system7.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
};

// scripts/kokyu/player/character/KokyuTanjiroComponent.ts
var KokyuTanjiroComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[1];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kata1.value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        if (kokyuObject.kata[index + 1] < 11) {
          player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kata" + (kata + 1) + ".value" }] });
        } else {
          player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hinokami_kata" + (kata + 1) + ".value" }] });
        }
    }
  }
  attack = new NomalAttack();
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    this.attack.oneAttack(player, itemStack);
  }
  mizu = new MizuNoKata();
  hi = new HiNoKata();
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 2:
        this.mizu.niNoKata(player, itemStack);
        break;
      case 3:
        this.mizu.sanNoKata(player, itemStack);
        break;
      case 4:
        this.mizu.shiNoKata(player, itemStack);
        break;
      case 9:
        this.mizu.kuNoKata(player, itemStack);
        break;
      case 10:
        this.mizu.zyuNoKata(player, itemStack);
        break;
      case 12:
        this.hi.niNoKata(player, itemStack);
        break;
      case 13:
        this.hi.sanNoKata(player, itemStack);
        break;
      case 14:
        this.hi.shiNoKata(player, itemStack);
        break;
      case 16:
        this.hi.rokuNoKata(player, itemStack);
        break;
      case 17:
        this.hi.shitiNoKata(player, itemStack);
        break;
      case 18:
        this.hi.hachiNoKata(player, itemStack);
        break;
      case 19:
        this.hi.kuNoKata(player, itemStack);
        break;
      case 20:
        this.hi.zyuNoKata(player, itemStack);
        break;
      case 21:
        this.hi.zyuichiNoKata(player, itemStack);
        break;
      case 22:
        this.hi.zyuniNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 1:
        this.mizu.ichiNoKata(player, itemStack);
        break;
      case 5:
        this.mizu.goNoKata(player, itemStack);
        break;
      case 6:
        this.mizu.rokuNoKata(player, itemStack);
        break;
      case 7:
        this.mizu.shitiNoKata(player, itemStack);
        break;
      case 8:
        this.mizu.hachiNoKata(player, itemStack);
        break;
      case 11:
        const chage = duration / TicksPerSecond6;
        if (chage > 997) {
          this.hi.ichiNoKata(player, itemStack);
        } else {
          this.hi.ichiNoKataIssen(player, itemStack);
        }
        break;
      case 15:
        this.hi.goNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/player/character/KokyuZenituComponent.ts
import { TicksPerSecond as TicksPerSecond8 } from "@minecraft/server";

// scripts/kokyu/kata/KaminariNoKata.ts
import { MolangVariableMap as MolangVariableMap6, system as system8, TicksPerSecond as TicksPerSecond7, Player as Player14 } from "@minecraft/server";
var KaminariNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 霹靂一閃
   */
  ichiNoKata(entity, itemStack) {
    if (entity instanceof Player14) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const num = system8.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 2.5, entity);
        this.kokyuApplyDamage(entity, filter, 5);
        const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
      } catch (error) {
        system8.clearRun(num);
      }
    }, 1);
    system8.waitTicks(6).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system8.clearRun(num);
    });
  }
  /**
   * 壱ノ型 霹靂一閃
   */
  ichiNoKataRen(entity, itemStack) {
    const num = system8.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 2.5, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
      } catch (error) {
        system8.clearRun(num);
      }
    }, 1);
    system8.waitTicks(6).then(() => {
      entity.teleport(entity.location, {
        keepVelocity: false,
        rotation: {
          x: 0,
          y: entity.getRotation().y + getRandomInRange(75, 115)
        }
      });
    }).catch((error) => {
    }).finally(() => {
      system8.clearRun(num);
    });
  }
  /**
   * 壱ノ型 霹靂一閃（六連）
   */
  ichiNoKataRoku(entity, itemStack) {
    if (entity instanceof Player14) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    entity.setProperty("kurokumaft:kokyu_use", false);
    this.ichiNoKataRen(entity, itemStack);
    const num = system8.runInterval(() => {
      try {
        this.ichiNoKataRen(entity, itemStack);
      } catch (error) {
        system8.clearRun(num);
      }
    }, 8);
    system8.waitTicks(49).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
      if (entity instanceof Player14) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu1_rengeki.value", with: ["6"] }] });
      }
    }).catch((error) => {
    }).finally(() => {
      system8.clearRun(num);
    });
  }
  /**
   * 壱ノ型 霹靂一閃（八連）
   */
  ichiNoKataHati(entity, itemStack) {
    if (entity instanceof Player14) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    entity.setProperty("kurokumaft:kokyu_use", false);
    this.ichiNoKataRen(entity, itemStack);
    const num = system8.runInterval(() => {
      try {
        this.ichiNoKataRen(entity, itemStack);
      } catch (error) {
        system8.clearRun(num);
      }
    }, 8);
    system8.waitTicks(65).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
      if (entity instanceof Player14) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu1_rengeki.value", with: ["8"] }] });
      }
    }).catch((error) => {
    }).finally(() => {
      system8.clearRun(num);
    });
  }
  /**
   * 壱ノ型 霹靂一閃 神速
   */
  ichiNoKataShinsoku(entity, itemStack) {
    if (entity instanceof Player14) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu1_shinsoku.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const molang = new MolangVariableMap6();
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system8.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, 6, 0, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
        entity.dimension.spawnParticle("kurokumaft:kaminari4_particle", entity.location, molang);
        const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
        this.kokyuApplyDamage(entity, filter, 8);
      } catch (error) {
        system8.clearRun(num);
      }
    }, 1);
    system8.waitTicks(6).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system8.clearRun(num);
    });
  }
  /**
   * 弐ノ型 稲魂
   */
  niNoKata(entity, itemStack) {
    if (entity instanceof Player14) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu2.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const num = system8.runInterval(() => {
      try {
        const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 3);
      } catch (error) {
        system8.clearRun(num);
      }
    }, 4);
    system8.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system8.clearRun(num);
    });
  }
  /**
   * 参ノ型 聚蚊成雷
   */
  sanNoKata(entity, itemStack) {
    if (entity instanceof Player14) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu3.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const num = system8.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 4, entity);
        this.kokyuApplyDamage(entity, filter, 3);
      } catch (error) {
        system8.clearRun(num);
      }
    }, 2);
    const distance = getLookLocationDistance(entity.getRotation().y, 4, -4, 0);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
    entity.teleport(entity.location, {
      keepVelocity: false,
      rotation: {
        x: 0,
        y: entity.getRotation().y + 90
      }
    });
    const num2 = system8.runInterval(() => {
      try {
        const distance2 = getLookLocationDistance(entity.getRotation().y, 4, -4, 0);
        entity.applyKnockback({ x: distance2.x, z: distance2.z }, 0);
        entity.teleport(entity.location, {
          keepVelocity: false,
          rotation: {
            x: 0,
            y: entity.getRotation().y - 90
          }
        });
      } catch (error) {
        system8.clearRun(num2);
      }
    }, 5);
    system8.waitTicks(30).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system8.clearRun(num);
      system8.clearRun(num2);
    });
  }
  /**
   * 肆ノ型 遠雷
   */
  shiNoKata(entity, itemStack) {
    if (entity instanceof Player14) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu4.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    entity.setProperty("kurokumaft:kokyu_use", false);
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap6();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system8.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, 8, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 8, entity);
        this.kokyuApplyDamage(entity, filter, 2);
        entity.dimension.spawnParticle("kurokumaft:kaminari4_particle", entity.location, molang);
      } catch (error) {
        system8.clearRun(num);
      }
    }, 4);
    system8.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system8.clearRun(num);
    });
  }
  /**
   * 伍ノ型 熱界雷
   */
  goNoKata(entity, itemStack) {
    if (entity instanceof Player14) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu5.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap6();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system8.runInterval(() => {
      try {
        entity.dimension.spawnParticle("kurokumaft:kaminari5_particle", entity.location, molang);
      } catch (error) {
        system8.clearRun(num);
      }
    }, 2);
    const filter = addRegimentalFilter(1, entity.location, 6, entity);
    this.kokyuApplyDamage(entity, filter, 3);
    system8.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system8.clearRun(num);
    });
    let event = "kurokumaft:small_damage";
    if (kaikyuNum > 8) {
      event = "kurokumaft:lage_damage";
    } else if (kaikyuNum > 4) {
      event = "kurokumaft:middle_damage";
    }
    const dragon = shooting(entity, "kurokumaft:kaminari_dragon_small", 0, 3, event, 0);
    system8.waitTicks(2 * TicksPerSecond7).then(() => {
      if (dragon.isValid) {
        dragon.remove();
      }
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 陸ノ型 電轟雷轟
   */
  rokuNoKata(entity, itemStack) {
    if (entity instanceof Player14) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu6.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 0.8);
    entity.addEffect("minecraft:slow_falling", 1 * TicksPerSecond7, {
      amplifier: 1,
      showParticles: false
    });
    const nowloc = entity.location;
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap6();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system8.runInterval(() => {
      try {
        entity.dimension.spawnParticle("kurokumaft:kaminari6_particle", nowloc, molang);
      } catch (error) {
        system8.clearRun(num);
      }
    }, 1);
    const filter = addRegimentalFilter(1, entity.location, 10, entity);
    this.kokyuApplyDamage(entity, filter, 5);
    system8.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system8.clearRun(num);
    });
  }
  /**
   * 漆ノ型 火雷神
   */
  shitiNoKata(entity, itemStack) {
    if (entity instanceof Player14) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu7.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    entity.setProperty("kurokumaft:kokyu_chage", 10);
    entity.setProperty("kurokumaft:kokyu_use", false);
    const filter = addRegimentalFilter(1, entity.location, 30, entity);
    entity.addTag(entity.id);
    const targets = entity.dimension.getEntities(filter);
    entity.removeTag(entity.id);
    if (targets.length > 0) {
      entity.teleport(targets[0].location, {
        facingLocation: targets[0].location
      });
    }
    const filter2 = addRegimentalFilter(0, entity.location, 8, entity);
    this.kokyuApplyDamage(entity, filter2, 15);
    system8.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_chage", 0);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
};

// scripts/kokyu/player/character/KokyuZenituComponent.ts
var KokyuZenituComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
  }
  attack = new NomalAttack();
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    this.attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
  }
  kaminari = new KaminariNoKata();
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 1:
        const chage = duration / TicksPerSecond8;
        if (chage > 998.5) {
          this.kaminari.ichiNoKata(player, itemStack);
        } else if (chage > 996.5) {
          this.kaminari.ichiNoKataRoku(player, itemStack);
        } else if (chage > 995.5) {
          this.kaminari.ichiNoKataHati(player, itemStack);
        } else if (chage > 994) {
          this.kaminari.ichiNoKataShinsoku(player, itemStack);
        } else {
          this.kaminari.shitiNoKata(player, itemStack);
        }
        break;
    }
  }
};

// scripts/kokyu/NichirintouChoiceComponent.ts
import { ItemStack as ItemStack14, ItemComponentTypes as ItemComponentTypes2, EntityComponentTypes as EntityComponentTypes6, EquipmentSlot as EquipmentSlot3 } from "@minecraft/server";
var nichirintouLists = weightChoice([
  { item: "kurokumaft:nichirintou_mizu", weight: 50 },
  { item: "kurokumaft:nichirintou_hono", weight: 30 },
  { item: "kurokumaft:nichirintou_kaze", weight: 20 },
  { item: "kurokumaft:nichirintou_iwa", weight: 20 },
  { item: "kurokumaft:nichirintou_kaminari", weight: 15 },
  { item: "kurokumaft:nichirintou_hana", weight: 10 },
  { item: "kurokumaft:nichirintou_kasumi", weight: 10 },
  { item: "kurokumaft:nichirintou_kemono", weight: 10 },
  { item: "kurokumaft:nichirintou_koi", weight: 5 },
  { item: "kurokumaft:nichirintou_hebi", weight: 5 },
  { item: "kurokumaft:nichirintou_mushi", weight: 5 },
  { item: "kurokumaft:nichirintou_oto", weight: 5 },
  { item: "kurokumaft:nichirintou_hi", weight: 1 },
  { item: "kurokumaft:nichirintou_tuki", weight: 1 }
]);
var NichirintouChoiceComponent = class {
  durabilityDamageNitiriontou(entity, itemStack, duration) {
  }
  changeKata(player) {
  }
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
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
    player.setProperty("kurokumaft:kokyu_particle", false);
    player.setProperty("kurokumaft:kokyu_use", false);
    const nichirintou = nichirintouLists.pick();
    const enchant = itemStack.getComponent(ItemComponentTypes2.Enchantable);
    const changeItem = new ItemStack14(nichirintou);
    const newEnchant = changeItem.getComponent(ItemComponentTypes2.Enchantable);
    newEnchant.addEnchantments(enchant.getEnchantments());
    const equ = player.getComponent(EntityComponentTypes6.Equippable);
    equ.setEquipment(EquipmentSlot3.Mainhand, changeItem);
  }
};

// scripts/kokyu/kata/HebiNoKata.ts
import { system as system10, Player as Player17 } from "@minecraft/server";
var HebiNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 委蛇斬り
   */
  ichiNoKata(entity, itemStack) {
    if (entity instanceof Player17) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hebi_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distancePitch = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distancePitch), 4, entity);
    this.kokyuApplyDamage(entity, filter, 5);
    const distance = getLookLocationDistance(entity.getRotation().y, 6, 0, 0);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
    system10.waitTicks(6).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 弐ノ型 狭頭の毒牙
   */
  niNoKata(entity, itemStack) {
    if (entity instanceof Player17) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hebi_kokyu2.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distancePitch = getLookLocationDistancePitch(entity.getRotation(), 0, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distancePitch), 3, entity);
    this.kokyuApplyDamage(entity, filter, 5);
    this.kokyuApplyEffect(entity, filter, 3, 2, "minecraft:poison");
    system10.waitTicks(6).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 参ノ型 塒締め
   */
  sanNoKata(entity, itemStack) {
    if (entity instanceof Player17) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hebi_kokyu3.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 3, 0, 0);
    const num = system10.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 6, entity);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
        this.kokyuApplyDamage(entity, filter, 4);
      } catch (error) {
        system10.clearRun(num);
      }
    }, 4);
    system10.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system10.clearRun(num);
    });
  }
  /**
   * 肆ノ型 頸蛇双生
   */
  shiNoKata(entity, itemStack) {
    if (entity instanceof Player17) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hebi_kokyu4.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const num = system10.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, 3, 0, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
        const filter = addRegimentalFilter(1, entity.location, 4, entity);
        this.kokyuApplyDamage(entity, filter, 3);
      } catch (error) {
        system10.clearRun(num);
      }
    }, 2);
    system10.waitTicks(40).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system10.clearRun(num);
    });
  }
  /**
   * 伍ノ型 蜿蜿長蛇
   */
  goNoKata(entity, itemStack) {
    if (entity instanceof Player17) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hebi_kokyu5.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    let side = 4;
    const num = system10.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 4, entity);
        this.kokyuApplyDamage(entity, filter, 5);
        const distance = getLookLocationDistance(entity.getRotation().y, 4, side, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
        side = -side;
      } catch (error) {
        system10.clearRun(num);
      }
    }, 2);
    system10.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system10.clearRun(num);
    });
  }
};

// scripts/kokyu/player/regimental/KokyuHebiComponent.ts
var KokyuHebiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[23];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hebi_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hebi_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const hebi = new HebiNoKata();
    try {
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
    } catch (error) {
    }
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/player/regimental/KokyuHiComponent.ts
var KokyuHiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[16];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hi_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const hi = new HiNoKata();
    try {
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
    } catch (error) {
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const hi = new HiNoKata();
    try {
      switch (kata) {
        case 5:
          hi.goNoKata(player, itemStack);
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/player/regimental/KokyuHonoComponent.ts
var KokyuHonoComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[17];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hono_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const hono = new HonoNoKata();
    try {
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
    } catch (error) {
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const hono = new HonoNoKata();
    try {
      switch (kata) {
        case 1:
          hono.ichiNoKata(player, itemStack);
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/kata/IwaNoKata.ts
import { MolangVariableMap as MolangVariableMap7, system as system11, TicksPerSecond as TicksPerSecond9, Player as Player18 } from "@minecraft/server";
var IwaNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 蛇紋岩・双極
   */
  ichiNoKata(entity, itemStack) {
    if (entity instanceof Player18) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:iwa_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const ono = shooting(entity, "kurokumaft:iwa_axe", 0, 3, void 0, 0);
    const ball = shooting(entity, "kurokumaft:iwa_iron_ball", 0, 3, void 0, 0);
    system11.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
    system11.waitTicks(15).then(() => {
      if (ono !== void 0) {
        ono.remove();
      }
      if (ball !== void 0) {
        ball.remove();
      }
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 弐ノ型 天面砕き
   */
  niNoKata(entity, itemStack) {
    if (entity instanceof Player18) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:iwa_kokyu2.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap7();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    system11.waitTicks(6).then(() => {
      const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
      const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 6, entity);
      this.kokyuApplyDamage(entity, filter, 8);
      entity.dimension.spawnParticle("kurokumaft:iwa2_particle", getDistanceLocation(entity.location, distance), molang);
    }).catch((error) => {
    }).finally(() => {
    });
    system11.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 参ノ型 岩軀の膚
   */
  sanNoKata(entity, itemStack) {
    if (entity instanceof Player18) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:iwa_kokyu3.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap7();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system11.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 6, entity);
        this.kokyuApplyDamage(entity, filter, 4);
        this.projectRefrect(entity, entity.location);
        entity.dimension.spawnParticle("kurokumaft:iwa3_particle", entity.location, molang);
      } catch (error) {
        system11.clearRun(num);
      }
    }, 2);
    system11.waitTicks(30).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system11.clearRun(num);
    });
  }
  /**
   * 肆ノ型 流紋岩・速征
   */
  shiNoKata(entity, itemStack) {
    if (entity instanceof Player18) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:iwa_kokyu4.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap7();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system11.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 4, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
        entity.dimension.spawnParticle("kurokumaft:iwa3_particle", entity.location, molang);
      } catch (error) {
        system11.clearRun(num);
      }
    }, 2);
    system11.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system11.clearRun(num);
    });
  }
  /**
   * 伍ノ型 瓦輪刑部
   */
  goNoKata(entity, itemStack) {
    if (entity instanceof Player18) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:iwa_kokyu5.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap7();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 1);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 1);
    const num = system11.runInterval(() => {
      try {
        const distance2 = getLookLocationDistance(entity.getRotation().y, 0, 0, -5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance2), 5, entity);
        this.kokyuApplyDamage(entity, filter, 6);
        const side = getRandomInRange(-5, 5);
        const around = getRandomInRange(-5, 5);
        const distance22 = getLookLocationDistance(entity.getRotation().y, around, side, 0.5);
        entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", getDistanceLocation(entity.location, distance22));
        entity.dimension.spawnParticle("kurokumaft:iwa3_particle", getDistanceLocation(entity.location, distance22), molang);
      } catch (error) {
        system11.clearRun(num);
      }
    }, 2);
    entity.addEffect("minecraft:slow_falling", 2 * TicksPerSecond9, {
      amplifier: 1,
      showParticles: false
    });
    system11.waitTicks(40).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system11.clearRun(num);
    });
  }
};

// scripts/kokyu/player/regimental/KokyuIwaComponent.ts
var KokyuIwaComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[20];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:iwa_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:iwa_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const iwa = new IwaNoKata();
    try {
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
    } catch (error) {
    }
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/player/regimental/KokyuKaminariComponent.ts
var KokyuKaminariComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[15];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kaminari = new KaminariNoKata();
    try {
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
    } catch (error) {
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kaminari = new KaminariNoKata();
    try {
      switch (kata) {
        case 1:
          kaminari.ichiNoKata(player, itemStack);
          break;
        case 4:
          kaminari.shiNoKata(player, itemStack);
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/kata/KasumiNoKata.ts
import { MolangVariableMap as MolangVariableMap8, system as system12, TicksPerSecond as TicksPerSecond10, Player as Player19 } from "@minecraft/server";
var KasumiNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 垂天遠霞
   */
  ichiNoKata(entity, itemStack) {
    if (entity instanceof Player19) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    entity.setProperty("kurokumaft:kokyu_use", false);
    const distance1 = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
    const filter1 = addRegimentalFilter(0, getDistanceLocation(entity.location, distance1), 3, entity);
    this.kokyuApplyDamage(entity, filter1, 3);
    const distance2 = getLookLocationDistancePitch(entity.getRotation(), 4.5, 0);
    const filter2 = addRegimentalFilter(0, getDistanceLocation(entity.location, distance2), 2, entity);
    this.kokyuApplyDamage(entity, filter2, 3);
    system12.waitTicks(5).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 弐ノ型 八重霞
   */
  niNoKata(entity, itemStack) {
    if (entity instanceof Player19) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kokyu2.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const num = system12.runInterval(() => {
      try {
        if (entity === void 0) {
          system12.clearRun(num);
          return;
        }
        const filter = addRegimentalFilter(0, entity.location, 4, entity);
        this.kokyuApplyDamage(entity, filter, 4);
      } catch (error) {
        system12.clearRun(num);
      }
    }, 2);
    system12.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system12.clearRun(num);
    });
  }
  /**
   * 参ノ型 霞散の飛沫
   */
  sanNoKata(entity, itemStack) {
    if (entity instanceof Player19) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kokyu3.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    entity.setProperty("kurokumaft:kokyu_use", false);
    const filter = addRegimentalFilter(0, entity.location, 6, entity);
    this.kokyuApplyDamage(entity, filter, 5);
    system12.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 肆ノ型 移流斬り
   */
  shiNoKata(entity, itemStack) {
    if (entity instanceof Player19) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kokyu4.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    entity.setProperty("kurokumaft:kokyu_use", false);
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap8();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const filter = addRegimentalFilter(0, entity.location, 2.5, entity);
    this.kokyuApplyDamage(entity, filter, 5);
    entity.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", entity.location, molang);
    const num = system12.runInterval(() => {
      try {
        if (entity === void 0) {
          system12.clearRun(num);
          return;
        }
        entity.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", entity.location, molang);
      } catch (error) {
        system12.clearRun(num);
      }
    }, 2);
    const distance = getLookLocationDistance(entity.getRotation().y, 10, 0, 0);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
    system12.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system12.clearRun(num);
    });
  }
  /**
   * 伍ノ型 霞雲の海
   */
  goNoKata(entity, itemStack) {
    if (entity instanceof Player19) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kokyu5.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap8();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 0.5);
    const num = system12.runInterval(() => {
      try {
        if (entity === void 0) {
          system12.clearRun(num);
          return;
        }
        const filter = addRegimentalFilter(0, entity.location, 3, entity);
        this.kokyuApplyDamage(entity, filter, 4);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
        const pdistance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
        entity.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", getDistanceLocation(entity.location, pdistance), molang);
      } catch (error) {
        system12.clearRun(num);
      }
    }, 2);
    system12.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system12.clearRun(num);
    });
  }
  /**
   * 陸ノ型 月の霞消
   */
  rokuNoKata(entity, itemStack) {
    if (entity instanceof Player19) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kokyu6.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap8();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system12.runInterval(() => {
      try {
        if (entity === void 0) {
          system12.clearRun(num);
          return;
        }
        const distance2 = getLookLocationDistance(entity.getRotation().y, 1.5, 0, -0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance2), 6, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        entity.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", getDistanceLocation(entity.location, distance2), molang);
      } catch (error) {
        system12.clearRun(num);
      }
    }, 4);
    const distance = getLookLocationDistance(entity.getRotation().y, 5, 0, 1);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 0.5);
    system12.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system12.clearRun(num);
    });
  }
  /**
   * 漆ノ型 朧
   */
  shitiNoKata(entity, itemStack) {
    if (entity.getDynamicProperty("kurokumaft:chage_type") === void 0) {
      if (entity instanceof Player19) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kokyu7.value" }] });
        if (itemStack !== void 0) {
          ItemDurabilityDamage(entity, itemStack);
        }
      }
      entity.setDynamicProperty("kurokumaft:chage_type", true);
      const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
      const molang = new MolangVariableMap8();
      molang.setFloat("variable.kaikyu", kaikyuNum);
      entity.addEffect("minecraft:speed", 10 * TicksPerSecond10, {
        amplifier: 3,
        showParticles: false
      });
      entity.setProperty("kurokumaft:kokyu_chage", 1);
      entity.dimension.spawnParticle("kurokumaft:kasumi_fog_lage_particle", entity.location, molang);
      entity.addEffect("minecraft:invisibility", 20, {
        amplifier: 10,
        showParticles: false
      });
      const num = system12.runInterval(() => {
        try {
          if (entity === void 0) {
            system12.clearRun(num);
            return;
          }
          entity.dimension.spawnParticle("kurokumaft:kasumi_fog_lage_particle", entity.location, molang);
          if (entity.getProperty("kurokumaft:kokyu_chage") === 1) {
            entity.setProperty("kurokumaft:kokyu_chage", 2);
            entity.removeEffect("minecraft:invisibility");
          } else {
            entity.setProperty("kurokumaft:kokyu_chage", 1);
            entity.addEffect("minecraft:invisibility", 20, {
              amplifier: 10,
              showParticles: false
            });
          }
        } catch (error) {
          system12.clearRun(num);
        }
      }, 20);
      system12.waitTicks(10 * TicksPerSecond10).then(() => {
        entity.setProperty("kurokumaft:kokyu_chage", 0);
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
        entity.setDynamicProperty("kurokumaft:chage_type", void 0);
      }).catch((error) => {
      }).finally(() => {
        system12.clearRun(num);
      });
    }
  }
};

// scripts/kokyu/player/regimental/KokyuKasumiComponent.ts
var KokyuKasumiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[21];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kasumi = new KasumiNoKata();
    try {
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
    } catch (error) {
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kasumi = new KasumiNoKata();
    try {
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
    } catch (error) {
    }
  }
};

// scripts/kokyu/player/regimental/KokyuKazeComponent.ts
var KokyuKazeComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[19];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaze_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kaze = new KazeNoKata();
    try {
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
    } catch (error) {
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kaze = new KazeNoKata();
    try {
      switch (kata) {
        case 1:
          kaze.ichiNoKata(player, itemStack);
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/player/regimental/KokyuMizuComponent.ts
var KokyuMizuComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[14];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mizu_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const mizu = new MizuNoKata();
    try {
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
          mizu.zyuNoKata(player, itemStack);
          break;
      }
    } catch (error) {
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const mizu = new MizuNoKata();
    try {
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
    } catch (error) {
    }
  }
};

// scripts/kokyu/player/regimental/KokyuMushiComponent.ts
var KokyuMushiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[25];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mushi_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:mushi_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const mushi = new MushiNoKata();
    try {
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
    } catch (error) {
    }
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/kata/OtoNoKata.ts
import { MolangVariableMap as MolangVariableMap9, system as system13, TicksPerSecond as TicksPerSecond11, Player as Player20 } from "@minecraft/server";
var OtoNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 轟
   */
  ichiNoKata(entity, itemStack) {
    if (entity instanceof Player20) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:oto_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0.5);
    const disLocation = getDistanceLocation(entity.location, distance);
    const filter = addRegimentalFilter(0, disLocation, 3, entity);
    this.kokyuApplyDamage(entity, filter, 5);
    const option = {
      allowUnderwater: true,
      breaksBlocks: entity instanceof Player20 ? true : false,
      causesFire: false,
      source: entity
    };
    entity.dimension.createExplosion(disLocation, 2, option);
    system13.waitTicks(5).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 弐ノ型 薙ぎ払い
   */
  niNoKata(entity, itemStack) {
    if (itemStack !== void 0) {
      ItemDurabilityDamage(entity, itemStack);
    }
    const option = {
      allowUnderwater: true,
      breaksBlocks: false,
      causesFire: false,
      source: entity
    };
    let side = -2;
    const num = system13.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, 2, side, 0.5);
        const disLocation = getDistanceLocation(entity.location, distance);
        const filter = addRegimentalFilter(0, disLocation, 4, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        entity.dimension.createExplosion(disLocation, 2, option);
        side = side + 2;
      } catch (error) {
        system13.clearRun(num);
      }
    }, 5);
    system13.waitTicks(16).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system13.clearRun(num);
    });
  }
  /**
   * 参ノ型 突進突き
   */
  sanNoKata(entity, itemStack) {
    entity.setProperty("kurokumaft:kokyu_use", false);
    if (itemStack !== void 0) {
      ItemDurabilityDamage(entity, itemStack);
    }
    const option = {
      allowUnderwater: true,
      breaksBlocks: false,
      causesFire: false,
      source: entity
    };
    const num = system13.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0.5);
        entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
        const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        const front = getForwardPosition(entity.location, entity.getRotation().y, 1);
        entity.dimension.createExplosion(front, 2, option);
      } catch (error) {
        system13.clearRun(num);
      }
    }, 2);
    system13.waitTicks(12).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system13.clearRun(num);
    });
  }
  /**
   * 肆ノ型 鳴弦奏々
   */
  shiNoKata(entity, itemStack) {
    if (entity instanceof Player20) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:oto_kokyu4.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap9();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const option = {
      allowUnderwater: true,
      breaksBlocks: false,
      causesFire: false,
      source: entity
    };
    const num = system13.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 5, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        this.checkSousouReflection(entity, option);
      } catch (error) {
        system13.clearRun(num);
      }
    }, 2);
    system13.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system13.clearRun(num);
    });
  }
  checkSousouReflection(entity, option) {
    if (entity.isValid) {
      this.projectRefrect(entity, entity.location);
      entity.addTag(entity.id);
      let distance = getLookLocationDistance(entity.getRotation().y, 2, 2, 0);
      let disLocation = getDistanceLocation(entity.location, distance);
      entity.dimension.createExplosion(disLocation, 2, option);
      distance = getLookLocationDistance(entity.getRotation().y, -2, 2, 0);
      disLocation = getDistanceLocation(entity.location, distance);
      entity.dimension.createExplosion(disLocation, 2, option);
      distance = getLookLocationDistance(entity.getRotation().y, 2, -2, 0);
      disLocation = getDistanceLocation(entity.location, distance);
      entity.dimension.createExplosion(disLocation, 2, option);
      distance = getLookLocationDistance(entity.getRotation().y, -2, -2, 0);
      disLocation = getDistanceLocation(entity.location, distance);
      entity.dimension.createExplosion(disLocation, 2, option);
      entity.removeTag(entity.id);
    }
  }
  /**
   * 伍ノ型 響斬無間
   */
  goNoKata(entity, itemStack) {
    if (entity.getDynamicProperty("kurokumaft:chage_type") === void 0) {
      if (entity instanceof Player20) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:oto_kokyu5.value" }] });
        if (itemStack !== void 0) {
          ItemDurabilityDamage(entity, itemStack);
        }
      }
      entity.setDynamicProperty("kurokumaft:chage_type", true);
      entity.addEffect("minecraft:speed", 3 * TicksPerSecond11, {
        amplifier: 5,
        showParticles: false
      });
      const option = {
        allowUnderwater: true,
        breaksBlocks: false,
        causesFire: false,
        source: entity
      };
      const num = system13.runInterval(() => {
        try {
          const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0.5);
          entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
          const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
          this.kokyuApplyDamage(entity, filter, 4);
          const right = getRightPosition(entity.location, entity.getRotation().y, 3);
          entity.dimension.createExplosion(right, 2.5, option);
          const left = getLeftPosition(entity.location, entity.getRotation().y, 3);
          entity.dimension.createExplosion(left, 2.5, option);
        } catch (error) {
          system13.clearRun(num);
        }
      }, 2);
      system13.waitTicks(3 * TicksPerSecond11).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
        entity.setDynamicProperty("kurokumaft:chage_type", void 0);
      }).catch((error) => {
      }).finally(() => {
        system13.clearRun(num);
      });
    }
  }
};

// scripts/kokyu/player/regimental/KokyuOtoComponent.ts
var KokyuOtoComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[22];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:oto_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:oto_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const oto = new OtoNoKata();
    try {
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
    } catch (error) {
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const oto = new OtoNoKata();
    try {
      switch (kata) {
        case 3:
          oto.sanNoKata(player, itemStack);
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/player/character/KokyuMuitiroComponent.ts
var KokyuMuitiroComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[10];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kasumi_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  attack = new NomalAttack();
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    this.attack.oneAttack(player, itemStack);
  }
  kasumi = new KasumiNoKata();
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 2:
        this.kasumi.niNoKata(player, itemStack);
        break;
      case 5:
        this.kasumi.goNoKata(player, itemStack);
        break;
      case 6:
        this.kasumi.rokuNoKata(player, itemStack);
        break;
      case 7:
        this.kasumi.shitiNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 1:
        this.kasumi.ichiNoKata(player, itemStack);
        break;
      case 3:
        this.kasumi.sanNoKata(player, itemStack);
        break;
      case 4:
        this.kasumi.shiNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/player/character/KokyuObanaiComponent.ts
var KokyuObanaiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[12];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hebi_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hebi_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  attack = new NomalAttack();
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    this.attack.oneAttack(player, itemStack);
  }
  hebi = new HebiNoKata();
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 1:
        this.hebi.ichiNoKata(player, itemStack);
        break;
      case 2:
        this.hebi.niNoKata(player, itemStack);
        break;
      case 3:
        this.hebi.sanNoKata(player, itemStack);
        break;
      case 4:
        this.hebi.shiNoKata(player, itemStack);
        break;
      case 5:
        this.hebi.goNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/player/regimental/KokyuKoiComponent.ts
var KokyuKoiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[24];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:koi_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:koi_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const koi = new KoiNoKata();
    try {
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
    } catch (error) {
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const koi = new KoiNoKata();
    try {
      switch (kata) {
        case 1:
          koi.ichiNoKata(player, itemStack);
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/kata/KedamonoNoKata.ts
import { system as system14, TicksPerSecond as TicksPerSecond12, Player as Player21 } from "@minecraft/server";
var KedamonoNoKata = class extends KataComonClass {
  /**
   * 壱ノ牙 穿ち抜き
   */
  ichiNoKata(entity, itemStack) {
    if (entity instanceof Player21) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
    this.kokyuApplyDamage(entity, filter, 5);
    system14.waitTicks(15).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 弐ノ牙 切り裂き
   */
  niNoKata(entity, itemStack) {
    if (entity instanceof Player21) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu2.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, -0.5);
    const lfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
    this.kokyuApplyDamage(entity, lfilter, 3);
    system14.waitTicks(10).then(() => {
      const distance2 = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0.5);
      const rfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance2), 3, entity);
      this.kokyuApplyDamage(entity, rfilter, 3);
    }).catch((error) => {
    }).finally(() => {
    });
    system14.waitTicks(15).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 参ノ牙 喰い裂き
   */
  sanNoKata(entity, itemStack) {
    if (entity instanceof Player21) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu3.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2.5, entity);
    this.kokyuApplyDamage(entity, filter, 5);
    system14.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 肆ノ牙 切細裂き
   */
  shiNoKata(entity, itemStack) {
    if (entity instanceof Player21) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu4.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const num = system14.runInterval(() => {
      try {
        const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 2);
      } catch (error) {
        system14.clearRun(num);
      }
    }, 4);
    system14.waitTicks(40).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system14.clearRun(num);
    });
  }
  /**
   * 伍ノ牙 狂い裂き
   */
  goNoKata(entity, itemStack) {
    if (entity instanceof Player21) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu5.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const num = system14.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, entity.location, 4, entity);
        this.kokyuApplyDamage(entity, filter, 3);
      } catch (error) {
        system14.clearRun(num);
      }
    }, 4);
    system14.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system14.clearRun(num);
    });
  }
  /**
   * 陸ノ牙 乱杭咬み
   */
  rokuNoKata(entity, itemStack) {
    if (entity instanceof Player21) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu6.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const num = system14.runInterval(() => {
      try {
        const distance = getLookLocationDistancePitch(entity.getRotation(), 1, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity);
        this.kokyuApplyDamage(entity, filter, 2);
      } catch (error) {
        system14.clearRun(num);
      }
    }, 4);
    system14.waitTicks(40).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system14.clearRun(num);
    });
  }
  /**
   * 漆ノ型 空間識覚
   */
  shitiNoKata(entity, itemStack) {
    if (entity.getDynamicProperty("kurokumaft:chage_type") === void 0) {
      if (entity instanceof Player21) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu7.value" }] });
        if (itemStack !== void 0) {
          ItemDurabilityDamage(entity, itemStack);
        }
      }
      entity.setProperty("kurokumaft:kokyu_chage", 10);
      entity.setDynamicProperty("kurokumaft:chage_type", true);
      entity.addEffect("minecraft:night_vision", 30 * TicksPerSecond12, {
        amplifier: 5,
        showParticles: false
      });
      const filter = addRegimentalFilter(0, entity.location, 16, entity);
      const targets = entity.dimension.getEntities(filter);
      const num = system14.runInterval(() => {
        try {
          targets.forEach((en) => {
            en.dimension.spawnParticle("kurokumaft:kedamono7_particle", en.location);
          });
        } catch (error) {
          system14.clearRun(num);
        }
      }, 2);
      system14.waitTicks(10).then(() => {
        entity.setDynamicProperty("kurokumaft:chage_type", void 0);
        entity.setProperty("kurokumaft:kokyu_chage", 0);
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system14.clearRun(num);
      });
      system14.waitTicks(10 * TicksPerSecond12).then(() => {
        system14.clearRun(num);
      }).catch((error) => {
      }).finally(() => {
      });
    }
  }
  /**
   * 捌ノ型 爆裂猛進
   */
  hachiNoKata(entity, itemStack) {
    if (entity.getDynamicProperty("kurokumaft:chage_type") === void 0) {
      if (entity instanceof Player21) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu8.value" }] });
        if (itemStack !== void 0) {
          ItemDurabilityDamage(entity, itemStack);
        }
      }
      entity.setDynamicProperty("kurokumaft:chage_type", true);
      entity.setProperty("kurokumaft:kokyu_chage", 10);
      entity.addEffect("minecraft:speed", 10 * TicksPerSecond12, {
        amplifier: 5,
        showParticles: false
      });
      system14.waitTicks(10 * TicksPerSecond12).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
        entity.setDynamicProperty("kurokumaft:chage_type", void 0);
        entity.setProperty("kurokumaft:kokyu_chage", 0);
      }).catch((error) => {
      }).finally(() => {
      });
    }
  }
  /**
   * 玖ノ牙 伸・うねり裂き
   */
  kuNoKata(entity, itemStack) {
    if (entity instanceof Player21) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu9.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistancePitch(entity.getRotation(), 3.5, 0);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 6, entity);
    this.kokyuApplyDamage(entity, filter, 5);
    system14.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 拾ノ牙 円転旋牙
   */
  zyuNoKata(entity, itemStack) {
    if (entity.getDynamicProperty("kurokumaft:chage_type") === void 0) {
      entity.setDynamicProperty("kurokumaft:chage_type", true);
      if (entity instanceof Player21) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kokyu10.value" }] });
        if (itemStack !== void 0) {
          ItemDurabilityDamage(entity, itemStack);
        }
      }
      const num = system14.runInterval(() => {
        try {
          const ldistance = getLookLocationDistancePitch(entity.getRotation(), 0.5, -1.5);
          const lfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, ldistance), 4, entity);
          this.kokyuApplyDamage(entity, lfilter, 5);
          const rdistance = getLookLocationDistancePitch(entity.getRotation(), 0.5, 1.5);
          const rfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, rdistance), 4, entity);
          this.kokyuApplyDamage(entity, rfilter, 5);
        } catch (error) {
          system14.clearRun(num);
        }
      }, 4);
      system14.waitTicks(3 * TicksPerSecond12).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
        entity.setDynamicProperty("kurokumaft:chage_type", void 0);
      }).catch((error) => {
      }).finally(() => {
        system14.clearRun(num);
      });
    }
  }
};

// scripts/kokyu/player/regimental/KokyuKedamonoComponent.ts
var KokyuKedamonoComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[18];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * 獣 呼吸
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kedamono = new KedamonoNoKata();
    try {
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
    } catch (error) {
    }
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/player/character/KokyuGyoumeiComponent.ts
var KokyuGyoumeiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[9];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:iwa_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:iwa_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  attack = new NomalAttack();
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    this.attack.oneAttack(player, itemStack);
  }
  iwa = new IwaNoKata();
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    player.addTag(player.id);
    switch (kata) {
      case 1:
        this.iwa.ichiNoKata(player, itemStack);
        break;
      case 2:
        this.iwa.niNoKata(player, itemStack);
        break;
      case 3:
        this.iwa.sanNoKata(player, itemStack);
        break;
      case 4:
        this.iwa.shiNoKata(player, itemStack);
        break;
      case 5:
        this.iwa.goNoKata(player, itemStack);
        break;
    }
    player.removeTag(player.id);
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/player/character/KokyuInosukeComponent.ts
var KokyuInosukeComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[3];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kedamono_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  attack = new NomalAttack();
  /**
   * 伊之助 呼吸
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    this.attack.oneAttack(player, itemStack);
  }
  kedamono = new KedamonoNoKata();
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 1:
        this.kedamono.ichiNoKata(player, itemStack);
        break;
      case 2:
        this.kedamono.niNoKata(player, itemStack);
        break;
      case 3:
        this.kedamono.sanNoKata(player, itemStack);
        break;
      case 4:
        this.kedamono.shiNoKata(player, itemStack);
        break;
      case 5:
        this.kedamono.goNoKata(player, itemStack);
        break;
      case 6:
        this.kedamono.rokuNoKata(player, itemStack);
        break;
      case 7:
        this.kedamono.shitiNoKata(player, itemStack);
        break;
      case 8:
        this.kedamono.hachiNoKata(player, itemStack);
        break;
      case 9:
        this.kedamono.kuNoKata(player, itemStack);
        break;
      case 10:
        this.kedamono.zyuNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/player/character/KokyuTengenComponent.ts
var KokyuTengenComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[11];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:oto_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:oto_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  attack = new NomalAttack();
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    this.attack.oneAttack(player, itemStack);
  }
  oto = new OtoNoKata();
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 1:
        this.oto.ichiNoKata(player, itemStack);
        break;
      case 2:
        this.oto.niNoKata(player, itemStack);
        break;
      case 4:
        this.oto.shiNoKata(player, itemStack);
        break;
      case 5:
        this.oto.goNoKata(player, itemStack);
        break;
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    switch (kata) {
      case 3:
        this.oto.sanNoKata(player, itemStack);
        break;
    }
  }
};

// scripts/kokyu/player/regimental/KokyuHanaComponent.ts
var KokyuHanaComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[26];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hana_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:hana_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const hana = new HanaNoKata();
    try {
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
    } catch (error) {
    }
  }
  releaseAttackKata(player, itemStack, duration) {
  }
};

// scripts/kokyu/kata/TukiNoKata.ts
import { EntityComponentTypes as EntityComponentTypes7, MolangVariableMap as MolangVariableMap10, system as system15, Player as Player22 } from "@minecraft/server";
var TukiNoKata = class extends KataComonClass {
  /**
   * 壱ノ型 闇月・宵の宮
   */
  ichiNoKata(entity, itemStack) {
    entity.setProperty("kurokumaft:kokyu_use", false);
    if (entity instanceof Player22) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu1.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0.5);
    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
    this.kokyuApplyDamage(entity, filter, 5);
    const molang = new MolangVariableMap10();
    molang.setFloat("variable.tuki_rotaion", -entity.getRotation().y);
    molang.setFloat("variable.tuki_size_x", 5);
    molang.setFloat("variable.tuki_size_y", 2.5);
    entity.dimension.spawnParticle("kurokumaft:tuki5_particle", getDistanceLocation(entity.location, distance), molang);
    system15.waitTicks(5).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 弐ノ型 珠華ノ弄月
   */
  niNoKata(entity, itemStack) {
    if (entity instanceof Player22) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu2.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const molang = new MolangVariableMap10();
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    let side = -3;
    let tuki_rotaion = 90;
    const num = system15.runInterval(() => {
      try {
        molang.setFloat("variable.tuki_rotaion", tuki_rotaion);
        const distance = getLookLocationDistance(entity.getRotation().y, 3, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        const pdistance = getLookLocationDistance(entity.getRotation().y, 2.5, side, 1);
        entity.dimension.spawnParticle("kurokumaft:tuki_sweep_particle", getDistanceLocation(entity.location, pdistance), molang);
        side = side + 3;
        tuki_rotaion = tuki_rotaion - 90;
      } catch (error) {
        system15.clearRun(num);
      }
    }, 5);
    system15.waitTicks(15).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system15.clearRun(num);
    });
  }
  /**
   * 参ノ型 厭忌月・銷り
   */
  sanNoKata(entity, itemStack) {
    if (entity instanceof Player22) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu3.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const molang = new MolangVariableMap10();
    molang.setFloat("variable.tuki_size_x", 5);
    molang.setFloat("variable.tuki_size_y", 2.5);
    const distance = getLookLocationDistance(entity.getRotation().y, 2.5, -1.5, 1);
    const lfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity);
    this.kokyuApplyDamage(entity, lfilter, 3);
    molang.setFloat("variable.tuki_rotaion", 0);
    entity.dimension.spawnParticle("kurokumaft:tuki_sweep_particle", getDistanceLocation(entity.location, distance), molang);
    system15.waitTicks(5).then(() => {
      const distance2 = getLookLocationDistance(entity.getRotation().y, 2.5, 1.5, 1);
      const rfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance2), 3.5, entity);
      this.kokyuApplyDamage(entity, rfilter, 3);
      molang.setFloat("variable.tuki_rotaion", 180);
      entity.dimension.spawnParticle("kurokumaft:tuki_sweep_particle", getDistanceLocation(entity.location, distance2), molang);
    }).catch((error) => {
    }).finally(() => {
    });
    system15.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 伍ノ型 月魄災渦
   */
  goNoKata(entity, itemStack) {
    if (entity instanceof Player22) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu5.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const molang = new MolangVariableMap10();
    const num = system15.runInterval(() => {
      try {
        const y = getRandomInRange(0.1, 2.5);
        const distance = getLookLocationDistance(entity.getRotation().y, 3.5, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 4, entity);
        this.kokyuApplyDamage(entity, filter, 3);
        const pdistance = getLookLocationDistance(entity.getRotation().y, 6.5, 0, y);
        molang.setFloat("variable.tuki_rotaion", -entity.getRotation().y);
        molang.setFloat("variable.tuki_size_x", getRandomInRange(8, 12));
        molang.setFloat("variable.tuki_size_y", getRandomInRange(4, 8));
        entity.dimension.spawnParticle("kurokumaft:tuki5_particle", getDistanceLocation(entity.location, pdistance), molang);
      } catch (error) {
        system15.clearRun(num);
      }
    }, 2);
    system15.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system15.clearRun(num);
    });
  }
  /**
   * 陸ノ型 常夜孤月・無間
   */
  rokuNoKata(entity, itemStack) {
    if (entity instanceof Player22) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu6.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap10();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    const parlo = getForwardPosition(entity.location, entity.getRotation().y, 4);
    entity.dimension.spawnParticle("kurokumaft:tuki_box_particle", parlo, molang);
    const num = system15.runInterval(() => {
      try {
        const side = getRandomInRange(-5, 5);
        const tuki_rotaion = getRandomInRange(-90, 90);
        molang.setFloat("variable.tuki_rotaion", tuki_rotaion);
        const distance = getLookLocationDistance(entity.getRotation().y, 6, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 8, entity);
        this.kokyuApplyDamage(entity, filter, 2);
        const pdistance = getLookLocationDistance(entity.getRotation().y, 6, side, 1);
        entity.dimension.spawnParticle("kurokumaft:tuki_sweep_particle", getDistanceLocation(entity.location, pdistance), molang);
      } catch (error) {
        system15.clearRun(num);
      }
    }, 2);
    system15.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system15.clearRun(num);
    });
  }
  /**
   * 漆ノ型 厄鏡・月映え
   */
  shitiNoKata(entity, itemStack) {
    if (entity instanceof Player22) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu7.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const front = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
    this.tukibae(entity, entity.location, front);
    const right1 = getLookLocationDistance(entity.getRotation().y, 1, 0.5, 0);
    this.tukibae(entity, entity.location, right1);
    const right2 = getLookLocationDistance(entity.getRotation().y, 1, 1, 0);
    this.tukibae(entity, entity.location, right2);
    const left1 = getLookLocationDistance(entity.getRotation().y, 1, -0.5, 0);
    this.tukibae(entity, entity.location, left1);
    const left2 = getLookLocationDistance(entity.getRotation().y, 1, -1, 0);
    this.tukibae(entity, entity.location, left2);
    const num = system15.runInterval(() => {
      try {
        const distance = getLookLocationDistancePitch(entity.getRotation(), 6, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 8, entity);
        this.kokyuApplyDamage(entity, filter, 4);
      } catch (error) {
        system15.clearRun(num);
      }
    }, 2);
    system15.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system15.clearRun(num);
    });
  }
  /**
   * 月映え
   */
  async tukibae(entity, location, distance) {
    const tuki = entity.dimension.spawnEntity("kurokumaft:tuki_blead", {
      x: location.x + distance.x,
      y: location.y,
      z: location.z + distance.z
    });
    const projectile = tuki.getComponent(EntityComponentTypes7.Projectile);
    projectile.owner = entity;
    projectile.shoot({
      x: distance.x * 3,
      y: 0,
      z: distance.z * 3
    });
    const num = system15.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, location, 2, entity);
        const exes = filter.excludeFamilies;
        if (exes !== void 0) {
          exes.push("tuki_blead");
        }
        this.kokyuApplyDamage(entity, filter, 2);
      } catch (error) {
        system15.clearRun(num);
      }
    }, 2);
    system15.waitTicks(20).then(() => {
      if (tuki.isValid) {
        tuki.remove();
      }
    }).catch((error) => {
    }).finally(() => {
      system15.clearRun(num);
    });
  }
  /**
   * 捌ノ型 月龍輪尾
   */
  hachiNoKata(entity, itemStack) {
    if (entity instanceof Player22) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu8.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const molang = new MolangVariableMap10();
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    const distance = getLookLocationDistance(entity.getRotation().y, 6.5, 0, 0);
    const disLotation = getDistanceLocation(entity.location, distance);
    molang.setFloat("variable.tuki_rotaion", -entity.getRotation().y);
    molang.setFloat("variable.tuki_size_x", getRandomInRange(8, 12));
    molang.setFloat("variable.tuki_size_y", getRandomInRange(4, 8));
    entity.dimension.spawnParticle("kurokumaft:tuki8_particle", disLotation, molang);
    const filter = addRegimentalFilter(0, disLotation, 4, entity);
    this.kokyuApplyDamage(entity, filter, 7);
    system15.waitTicks(15).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 玖ノ型 降り月・連面
   */
  kuNoKata(entity, itemStack) {
    if (entity instanceof Player22) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu9.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap10();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    let tuki_rotaion = 75;
    const num = system15.runInterval(() => {
      try {
        const side = getRandomInRange(-5, 5);
        molang.setFloat("variable.tuki_rotaion", tuki_rotaion);
        const distance = getLookLocationDistance(entity.getRotation().y, 6, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 8, entity);
        this.kokyuApplyDamage(entity, filter, 4);
        const pdistance = getLookLocationDistance(entity.getRotation().y, 6, side, 1);
        entity.dimension.spawnParticle("kurokumaft:tuki_sweep_particle", getDistanceLocation(entity.location, pdistance), molang);
        tuki_rotaion = -tuki_rotaion;
      } catch (error) {
        system15.clearRun(num);
      }
    }, 2);
    system15.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system15.clearRun(num);
    });
  }
  /**
   * 拾ノ型 穿面斬・蘿月
   */
  zyuNoKata(entity, itemStack) {
    if (entity instanceof Player22) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu10.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const ldistance = getLookLocationDistance(entity.getRotation().y, 1, -1.5, 0);
    this.ragetu(entity, entity.location, ldistance);
    const rdistance = getLookLocationDistance(entity.getRotation().y, 1, 1.5, 0);
    this.ragetu(entity, entity.location, rdistance);
    system15.waitTicks(15).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 蘿月
   */
  async ragetu(entity, location, distance) {
    const tuki = entity.dimension.spawnEntity("kurokumaft:tuki_ragetu", {
      x: location.x + distance.x,
      y: location.y,
      z: location.z + distance.z
    });
    const front = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
    const projectile = tuki.getComponent(EntityComponentTypes7.Projectile);
    projectile.owner = entity;
    projectile.shoot({
      x: front.x * 3,
      y: 0,
      z: front.z * 3
    });
    const num = system15.runInterval(() => {
      try {
        const filter = addRegimentalFilter(0, location, 2, entity);
        const exes = filter.excludeFamilies;
        if (exes !== void 0) {
          exes.push("tuki_blead");
        }
        this.kokyuApplyDamage(entity, filter, 4);
      } catch (error) {
        system15.clearRun(num);
      }
    }, 2);
    system15.waitTicks(20).then(() => {
      if (tuki.isValid) {
        tuki.remove();
      }
    }).catch((error) => {
    }).finally(() => {
      system15.clearRun(num);
    });
  }
  /**
   * 拾肆ノ型 兇変・天満繊月
   */
  zyushiNoKata(entity, itemStack) {
    if (entity instanceof Player22) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu14.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const molang = new MolangVariableMap10();
    const num = system15.runInterval(() => {
      try {
        const y = getRandomInRange(0.1, 2.5);
        const distance = getLookLocationDistance(entity.getRotation().y, 5, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 6, entity);
        this.kokyuApplyDamage(entity, filter, 6);
        const pdistance = getLookLocationDistance(entity.getRotation().y, 8, 0, y);
        molang.setFloat("variable.tuki_rotaion", -entity.getRotation().y);
        molang.setFloat("variable.tuki_size_x", getRandomInRange(12, 16));
        molang.setFloat("variable.tuki_size_y", getRandomInRange(8, 12));
        entity.dimension.spawnParticle("kurokumaft:tuki5_particle", getDistanceLocation(entity.location, pdistance), molang);
      } catch (error) {
        system15.clearRun(num);
      }
    }, 2);
    system15.waitTicks(40).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system15.clearRun(num);
    });
  }
  /**
   * 拾陸ノ型 月虹・片割れ月
   */
  zyurokuNoKata(entity, itemStack) {
    if (entity instanceof Player22) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu16.value" }] });
      if (itemStack !== void 0) {
        ItemDurabilityDamage(entity, itemStack);
      }
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap10();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    let tuki_rotaion = 90;
    const num = system15.runInterval(() => {
      try {
        const side = getRandomInRange(-5, 5);
        molang.setFloat("variable.tuki_rotaion", tuki_rotaion);
        const distance = getLookLocationDistance(entity.getRotation().y, 8, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 8, entity);
        this.kokyuApplyDamage(entity, filter, 6);
        const pdistance = getLookLocationDistance(entity.getRotation().y, 8, side, 1);
        entity.dimension.spawnParticle("kurokumaft:tuki_sweep_particle", getDistanceLocation(entity.location, pdistance), molang);
        tuki_rotaion = -tuki_rotaion;
      } catch (error) {
        system15.clearRun(num);
      }
    }, 2);
    system15.waitTicks(40).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system15.clearRun(num);
    });
  }
};

// scripts/kokyu/player/regimental/KokyuTukiComponent.ts
var KokyuTukiComponent = class {
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeKata(player) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kokyuObject = KokyuObjects[27];
    switch (kata) {
      case kokyuObject.kata[kokyuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kata" + kokyuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kokyuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kata" + kokyuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackKata(player, itemStack) {
    const attack = new NomalAttack();
    attack.oneAttack(player, itemStack);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Player} player
   */
  useAttackKata(player, itemStack) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const tuki = new TukiNoKata();
    try {
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
    } catch (error) {
    }
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const tuki = new TukiNoKata();
    try {
      switch (kata) {
        case 1:
          tuki.ichiNoKata(player, itemStack);
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/character/TanjiroComponent.ts
import { system as system16, TicksPerSecond as TicksPerSecond13 } from "@minecraft/server";
var tanjiroKokyuLowLists = weightChoice([
  { item: 1, weight: 50 },
  { item: 2, weight: 50 },
  { item: 3, weight: 50 },
  { item: 4, weight: 40 },
  { item: 5, weight: 15 },
  { item: 6, weight: 30 },
  { item: 7, weight: 20 },
  { item: 8, weight: 20 },
  { item: 9, weight: 10 },
  { item: 10, weight: 10 }
]);
var tanjiroKokyuLists = weightChoice([
  { item: 1, weight: 50 },
  { item: 2, weight: 50 },
  { item: 3, weight: 50 },
  { item: 4, weight: 40 },
  { item: 5, weight: 15 },
  { item: 6, weight: 30 },
  { item: 7, weight: 20 },
  { item: 8, weight: 20 },
  { item: 9, weight: 10 },
  { item: 10, weight: 10 },
  { item: 11, weight: 30 },
  { item: 12, weight: 30 },
  { item: 13, weight: 30 },
  { item: 14, weight: 20 },
  { item: 15, weight: 10 },
  { item: 16, weight: 20 },
  { item: 17, weight: 20 },
  { item: 18, weight: 20 },
  { item: 19, weight: 10 },
  { item: 20, weight: 20 },
  { item: 21, weight: 10 },
  { item: 22, weight: 20 }
]);
var tanjiroKokyuHiLists = weightChoice([
  { item: 11, weight: 30 },
  { item: 12, weight: 30 },
  { item: 13, weight: 30 },
  { item: 14, weight: 20 },
  { item: 15, weight: 10 },
  { item: 16, weight: 20 },
  { item: 17, weight: 20 },
  { item: 18, weight: 20 },
  { item: 19, weight: 10 },
  { item: 20, weight: 20 },
  { item: 21, weight: 10 },
  { item: 22, weight: 20 }
]);
var TanjiroComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system16.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    if (kaikyuNum > 7) {
      const num = tanjiroKokyuHiLists.pick();
      entity.setProperty("kurokumaft:kokyu_kata", num);
      this.kokyuUse(entity, num);
    } else if (kaikyuNum > 4) {
      const num = tanjiroKokyuLists.pick();
      entity.setProperty("kurokumaft:kokyu_kata", num);
      this.kokyuUse(entity, num);
    } else {
      const num = tanjiroKokyuLowLists.pick();
      entity.setProperty("kurokumaft:kokyu_kata", num);
      this.kokyuUse(entity, num);
    }
  }
  kokyuUse(entity, kata) {
    const mizu = new MizuNoKata();
    const hi = new HiNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          system16.waitTicks(10).then(() => {
            mizu.ichiNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          mizu.niNoKata(entity, void 0);
          system16.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          mizu.sanNoKata(entity, void 0);
          system16.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          mizu.shiNoKata(entity, void 0);
          system16.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          system16.waitTicks(20).then(() => {
            mizu.goNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          system16.waitTicks(20).then(() => {
            mizu.rokuNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          system16.waitTicks(20).then(() => {
            mizu.shitiNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 8:
          entity.triggerEvent("kurokumaft:attack_stop");
          system16.waitTicks(5).then(() => {
            mizu.hachiNoKata(entity, void 0);
          }).catch((error) => {
          });
          system16.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 9:
          mizu.kuNoKata(entity, void 0);
          system16.waitTicks(15 * TicksPerSecond13).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
          }).catch((error) => {
          });
          break;
        case 10:
          entity.triggerEvent("kurokumaft:attack_stop");
          mizu.zyuNoKata(entity, void 0);
          system16.waitTicks(40).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 11:
          entity.triggerEvent("kurokumaft:attack_stop");
          const ichi = getRandomInRange(1, 2);
          if (ichi === 1) {
            hi.ichiNoKata(entity, void 0);
            system16.waitTicks(20).then(() => {
              entity.setProperty("kurokumaft:kokyu_kata", 0);
              entity.triggerEvent("kurokumaft:kokyu_end");
            }).catch((error) => {
            });
          } else {
            system16.waitTicks(20).then(() => {
              hi.ichiNoKataIssen(entity, void 0);
              entity.setProperty("kurokumaft:kokyu_kata", 0);
              entity.triggerEvent("kurokumaft:kokyu_end");
            }).catch((error) => {
            });
          }
          break;
        case 12:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.niNoKata(entity, void 0);
          system16.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 13:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.sanNoKata(entity, void 0);
          system16.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 14:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.shiNoKata(entity, void 0);
          system16.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 15:
          entity.triggerEvent("kurokumaft:attack_stop");
          system16.waitTicks(20).then(() => {
            hi.goNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 16:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.rokuNoKata(entity, void 0);
          system16.waitTicks(90).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 17:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.shitiNoKata(entity, void 0);
          system16.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 18:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.hachiNoKata(entity, void 0);
          system16.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 19:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.kuNoKata(entity, void 0);
          system16.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 20:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.zyuNoKata(entity, void 0);
          system16.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 21:
          hi.zyuichiNoKata(entity, void 0);
          system16.waitTicks(10 * TicksPerSecond13).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
          }).catch((error) => {
          });
          break;
        case 22:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.zyuniNoKata(entity, void 0);
          system16.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/character/GiyuComponent.ts
import { system as system17, TicksPerSecond as TicksPerSecond14 } from "@minecraft/server";
var giyuKokyuLists = weightChoice([
  { item: 1, weight: 50 },
  { item: 2, weight: 50 },
  { item: 3, weight: 50 },
  { item: 4, weight: 50 },
  { item: 5, weight: 15 },
  { item: 6, weight: 20 },
  { item: 7, weight: 20 },
  { item: 8, weight: 10 },
  { item: 9, weight: 10 },
  { item: 10, weight: 10 },
  { item: 11, weight: 10 }
]);
var GiyuComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system17.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = giyuKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const mizu = new MizuNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          system17.waitTicks(15).then(() => {
            mizu.ichiNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          mizu.niNoKata(entity, void 0);
          system17.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          mizu.sanNoKata(entity, void 0);
          system17.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          mizu.shiNoKata(entity, void 0);
          system17.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          system17.waitTicks(20).then(() => {
            mizu.goNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          system17.waitTicks(20).then(() => {
            mizu.rokuNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          system17.waitTicks(20).then(() => {
            mizu.shitiNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 8:
          entity.triggerEvent("kurokumaft:attack_stop");
          system17.waitTicks(5).then(() => {
            mizu.hachiNoKata(entity, void 0);
          }).catch((error) => {
          });
          system17.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 9:
          mizu.kuNoKata(entity, void 0);
          system17.waitTicks(15 * TicksPerSecond14).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
          }).catch((error) => {
          });
          break;
        case 10:
          entity.triggerEvent("kurokumaft:attack_stop");
          mizu.zyuNoKata(entity, void 0);
          system17.waitTicks(40).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 11:
          mizu.zyuichiNoKata(entity, void 0);
          system17.waitTicks(15 * TicksPerSecond14).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/character/ZenituComponent.ts
import { system as system18 } from "@minecraft/server";
var zenituKokyuLists = weightChoice([
  { item: 1, weight: 80 },
  { item: 2, weight: 15 },
  { item: 3, weight: 5 }
]);
var ZenituComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system18.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = zenituKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const kaminari = new KaminariNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          system18.waitTicks(40).then(() => {
            kaminari.ichiNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          system18.waitTicks(80).then(() => {
            kaminari.ichiNoKataShinsoku(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          system18.waitTicks(120).then(() => {
            kaminari.shitiNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/character/InosukeComponent.ts
import { system as system19, TicksPerSecond as TicksPerSecond15 } from "@minecraft/server";
var inosukeKokyuLists = weightChoice([
  { item: 1, weight: 50 },
  { item: 2, weight: 50 },
  { item: 3, weight: 50 },
  { item: 4, weight: 50 },
  { item: 5, weight: 15 },
  { item: 6, weight: 20 },
  { item: 7, weight: 20 },
  { item: 8, weight: 10 },
  { item: 9, weight: 10 },
  { item: 10, weight: 10 }
]);
var InosukeComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system19.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = inosukeKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const kedamono = new KedamonoNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.ichiNoKata(entity, void 0);
          system19.waitTicks(15).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.niNoKata(entity, void 0);
          system19.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.sanNoKata(entity, void 0);
          system19.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.shiNoKata(entity, void 0);
          system19.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.goNoKata(entity, void 0);
          system19.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.rokuNoKata(entity, void 0);
          system19.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.shitiNoKata(entity, void 0);
          system19.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 8:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.hachiNoKata(entity, void 0);
          system19.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 9:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.kuNoKata(entity, void 0);
          system19.waitTicks(15 * TicksPerSecond15).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 10:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.zyuNoKata(entity, void 0);
          system19.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/character/KanawoComponent.ts
import { system as system20 } from "@minecraft/server";
var kanawoKokyuLists = weightChoice([
  { item: 2, weight: 20 },
  { item: 4, weight: 20 },
  { item: 5, weight: 15 },
  { item: 6, weight: 15 },
  { item: 7, weight: 5 }
]);
var KanawoComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system20.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = kanawoKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const hana = new HanaNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          hana.niNoKata(entity, void 0);
          system20.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          hana.shiNoKata(entity, void 0);
          system20.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          hana.goNoKata(entity, void 0);
          system20.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          hana.rokuNoKata(entity, void 0);
          system20.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          hana.shitiNoKata(entity, void 0);
          system20.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/character/ShinobuComponent.ts
import { system as system21 } from "@minecraft/server";
var shinobuKokyuLists = weightChoice([
  { item: 1, weight: 30 },
  { item: 2, weight: 30 },
  { item: 3, weight: 30 },
  { item: 4, weight: 30 }
]);
var ShinobuComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system21.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = shinobuKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const mushi = new MushiNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          mushi.ichiNoKata(entity, void 0);
          system21.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          mushi.niNoKata(entity, void 0);
          system21.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          mushi.sanNoKata(entity, void 0);
          system21.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          mushi.shiNoKata(entity, void 0);
          system21.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/character/KyouzyuroComponent.ts
import { system as system22 } from "@minecraft/server";
var kyouzyuroKokyuLists = weightChoice([
  { item: 1, weight: 35 },
  { item: 2, weight: 30 },
  { item: 3, weight: 30 },
  { item: 4, weight: 30 },
  { item: 5, weight: 20 },
  { item: 9, weight: 15 }
]);
var KyouzyuroComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system22.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = kyouzyuroKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const hono = new HonoNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          system22.waitTicks(30).then(() => {
            hono.ichiNoKata(entity, void 0);
          }).catch((error) => {
          });
          system22.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          hono.niNoKata(entity, void 0);
          system22.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          hono.sanNoKata(entity, void 0);
          system22.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          hono.shiNoKata(entity, void 0);
          system22.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          hono.goNoKata(entity, void 0);
          system22.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 9:
          entity.triggerEvent("kurokumaft:attack_stop");
          system22.waitTicks(40).then(() => {
            hono.kuNoKata(entity, void 0);
          }).catch((error) => {
          });
          system22.waitTicks(80).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/character/TengenComponent.ts
import { system as system23 } from "@minecraft/server";
var tengenKokyuLists = weightChoice([
  { item: 1, weight: 30 },
  { item: 2, weight: 30 },
  { item: 3, weight: 30 },
  { item: 4, weight: 20 },
  { item: 5, weight: 10 }
]);
var TengenComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system23.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = tengenKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const oto = new OtoNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          oto.ichiNoKata(entity, void 0);
          system23.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          oto.niNoKata(entity, void 0);
          system23.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          oto.sanNoKata(entity, void 0);
          system23.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          oto.shiNoKata(entity, void 0);
          system23.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          oto.goNoKata(entity, void 0);
          system23.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/character/ObanaiComponent.ts
import { system as system24 } from "@minecraft/server";
var obanaiKokyuLists = weightChoice([
  { item: 1, weight: 30 },
  { item: 2, weight: 30 },
  { item: 3, weight: 30 },
  { item: 4, weight: 30 },
  { item: 5, weight: 30 }
]);
var ObanaiComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system24.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = obanaiKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const hebi = new HebiNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          hebi.ichiNoKata(entity, void 0);
          system24.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          hebi.niNoKata(entity, void 0);
          system24.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          hebi.sanNoKata(entity, void 0);
          system24.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          hebi.shiNoKata(entity, void 0);
          system24.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          hebi.goNoKata(entity, void 0);
          system24.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/character/SanemiComponent.ts
import { system as system25 } from "@minecraft/server";
var sanemiKokyuLists = weightChoice([
  { item: 1, weight: 50 },
  { item: 2, weight: 50 },
  { item: 3, weight: 50 },
  { item: 4, weight: 50 },
  { item: 5, weight: 15 },
  { item: 6, weight: 20 },
  { item: 7, weight: 20 },
  { item: 8, weight: 10 },
  { item: 9, weight: 10 }
]);
var SanemiComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system25.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = sanemiKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const kaze = new KazeNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          system25.waitTicks(20).then(() => {
            kaze.ichiNoKata(entity, void 0);
          }).catch((error) => {
          });
          system25.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.niNoKata(entity, void 0);
          system25.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.sanNoKata(entity, void 0);
          system25.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.shiNoKata(entity, void 0);
          system25.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.goNoKata(entity, void 0);
          system25.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.rokuNoKata(entity, void 0);
          system25.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.shitiNoKata(entity, void 0);
          system25.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 8:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.hachiNoKata(entity, void 0);
          system25.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 9:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.kuNoKata(entity, void 0);
          system25.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/character/MituriComponent.ts
import { system as system26 } from "@minecraft/server";
var mituriKokyuLists = weightChoice([
  { item: 1, weight: 30 },
  { item: 2, weight: 30 },
  { item: 3, weight: 20 },
  { item: 5, weight: 20 },
  { item: 6, weight: 20 }
]);
var MituriComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system26.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = mituriKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const koi = new KoiNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          koi.ichiNoKata(entity, void 0);
          system26.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          koi.niNoKata(entity, void 0);
          system26.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          koi.sanNoKata(entity, void 0);
          system26.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          koi.goNoKata(entity, void 0);
          system26.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          koi.rokuNoKata(entity, void 0);
          system26.waitTicks(40).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/character/MuitiroComponent.ts
import { system as system27 } from "@minecraft/server";
var muitiroKokyuLists = weightChoice([
  { item: 1, weight: 50 },
  { item: 2, weight: 50 },
  { item: 3, weight: 50 },
  { item: 4, weight: 50 },
  { item: 5, weight: 15 },
  { item: 6, weight: 20 },
  { item: 7, weight: 20 }
]);
var MuitiroComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system27.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = muitiroKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const kasumi = new KasumiNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          system27.waitTicks(20).then(() => {
            kasumi.ichiNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          kasumi.niNoKata(entity, void 0);
          system27.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          kasumi.sanNoKata(entity, void 0);
          system27.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          system27.waitTicks(20).then(() => {
            kasumi.shiNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          kasumi.goNoKata(entity, void 0);
          system27.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          kasumi.rokuNoKata(entity, void 0);
          system27.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          kasumi.shitiNoKata(entity, void 0);
          system27.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/character/GyoumeiComponent.ts
import { system as system28 } from "@minecraft/server";
var gyoumeiKokyuLists = weightChoice([
  { item: 1, weight: 30 },
  { item: 2, weight: 30 },
  { item: 3, weight: 30 },
  { item: 4, weight: 20 },
  { item: 5, weight: 10 }
]);
var GyoumeiComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system28.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = gyoumeiKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const iwa = new IwaNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          iwa.ichiNoKata(entity, void 0);
          system28.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          system28.waitTicks(30).then(() => {
            iwa.niNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          iwa.sanNoKata(entity, void 0);
          system28.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          iwa.shiNoKata(entity, void 0);
          system28.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          iwa.goNoKata(entity, void 0);
          system28.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/regimental/MizuComponent.ts
import { system as system29, TicksPerSecond as TicksPerSecond16 } from "@minecraft/server";
var mizuKokyuLists = weightChoice([
  { item: 1, weight: 50 },
  { item: 2, weight: 50 },
  { item: 3, weight: 50 },
  { item: 4, weight: 50 },
  { item: 5, weight: 15 },
  { item: 6, weight: 20 },
  { item: 7, weight: 20 },
  { item: 8, weight: 10 },
  { item: 9, weight: 10 },
  { item: 10, weight: 10 }
]);
var MizuComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system29.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = mizuKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const mizu = new MizuNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          system29.waitTicks(15).then(() => {
            mizu.ichiNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          mizu.niNoKata(entity, void 0);
          system29.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          mizu.sanNoKata(entity, void 0);
          system29.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          mizu.shiNoKata(entity, void 0);
          system29.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          system29.waitTicks(20).then(() => {
            mizu.goNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          system29.waitTicks(20).then(() => {
            mizu.rokuNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          system29.waitTicks(20).then(() => {
            mizu.shitiNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 8:
          entity.triggerEvent("kurokumaft:attack_stop");
          system29.waitTicks(5).then(() => {
            mizu.hachiNoKata(entity, void 0);
          }).catch((error) => {
          });
          system29.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 9:
          mizu.kuNoKata(entity, void 0);
          system29.waitTicks(15 * TicksPerSecond16).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
          }).catch((error) => {
          });
          break;
        case 10:
          entity.triggerEvent("kurokumaft:attack_stop");
          mizu.zyuNoKata(entity, void 0);
          system29.waitTicks(40).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/regimental/HiComponent.ts
import { system as system30, TicksPerSecond as TicksPerSecond17 } from "@minecraft/server";
var hiKokyuLists = weightChoice([
  { item: 1, weight: 30 },
  { item: 2, weight: 30 },
  { item: 3, weight: 30 },
  { item: 4, weight: 20 },
  { item: 5, weight: 10 },
  { item: 6, weight: 20 },
  { item: 7, weight: 20 },
  { item: 8, weight: 20 },
  { item: 9, weight: 10 },
  { item: 10, weight: 20 },
  { item: 11, weight: 10 },
  { item: 12, weight: 20 }
]);
var HiComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system30.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  async attackWait(entity, attack) {
    attack.oneAttack(entity, void 0);
    await system30.waitTicks(2.5).then(() => {
    });
  }
  useAttackKokyu(entity) {
    const num = hiKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const hi = new HiNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.ichiNoKata(entity, void 0);
          system30.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.niNoKata(entity, void 0);
          system30.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.sanNoKata(entity, void 0);
          system30.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.shiNoKata(entity, void 0);
          system30.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          system30.waitTicks(20).then(() => {
            hi.goNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.rokuNoKata(entity, void 0);
          system30.waitTicks(90).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.shitiNoKata(entity, void 0);
          system30.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 8:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.hachiNoKata(entity, void 0);
          system30.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 9:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.kuNoKata(entity, void 0);
          system30.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 10:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.zyuNoKata(entity, void 0);
          system30.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 11:
          hi.zyuichiNoKata(entity, void 0);
          system30.waitTicks(10 * TicksPerSecond17).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
          }).catch((error) => {
          });
          break;
        case 12:
          entity.triggerEvent("kurokumaft:attack_stop");
          hi.zyuniNoKata(entity, void 0);
          system30.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/regimental/KaminariComponent.ts
import { system as system31 } from "@minecraft/server";
var kaminariKokyuLists = weightChoice([
  { item: 1, weight: 10 },
  { item: 2, weight: 20 },
  { item: 3, weight: 20 },
  { item: 4, weight: 20 },
  { item: 5, weight: 20 },
  { item: 6, weight: 20 }
]);
var KaminariComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system31.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = kaminariKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const kaminari = new KaminariNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          system31.waitTicks(40).then(() => {
            kaminari.ichiNoKata(entity, void 0);
          }).catch((error) => {
          });
          system31.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaminari.niNoKata(entity, void 0);
          system31.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaminari.sanNoKata(entity, void 0);
          system31.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaminari.shiNoKata(entity, void 0);
          system31.waitTicks(40).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaminari.goNoKata(entity, void 0);
          system31.waitTicks(40).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaminari.rokuNoKata(entity, void 0);
          system31.waitTicks(40).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/regimental/HanaComponent.ts
import { system as system32 } from "@minecraft/server";
var hanaKokyuLists = weightChoice([
  { item: 2, weight: 20 },
  { item: 4, weight: 20 },
  { item: 5, weight: 15 },
  { item: 6, weight: 15 }
]);
var HanaComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system32.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = hanaKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const hana = new HanaNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          hana.niNoKata(entity, void 0);
          system32.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          hana.shiNoKata(entity, void 0);
          system32.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          hana.goNoKata(entity, void 0);
          system32.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          hana.rokuNoKata(entity, void 0);
          system32.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/regimental/HebiComponent.ts
import { system as system33 } from "@minecraft/server";
var hebiKokyuLists = weightChoice([
  { item: 1, weight: 30 },
  { item: 2, weight: 30 },
  { item: 3, weight: 30 },
  { item: 4, weight: 30 },
  { item: 5, weight: 30 }
]);
var HebiComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system33.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = hebiKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const hebi = new HebiNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          hebi.ichiNoKata(entity, void 0);
          system33.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          hebi.niNoKata(entity, void 0);
          system33.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          hebi.sanNoKata(entity, void 0);
          system33.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          hebi.shiNoKata(entity, void 0);
          system33.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          hebi.goNoKata(entity, void 0);
          system33.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/regimental/HonoComponent.ts
import { system as system34 } from "@minecraft/server";
var honoKokyuLists = weightChoice([
  { item: 1, weight: 40 },
  { item: 2, weight: 30 },
  { item: 3, weight: 30 },
  { item: 4, weight: 30 },
  { item: 5, weight: 20 }
]);
var HonoComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system34.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = honoKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const hono = new HonoNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          system34.waitTicks(30).then(() => {
            hono.ichiNoKata(entity, void 0);
          }).catch((error) => {
          });
          system34.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          hono.niNoKata(entity, void 0);
          system34.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          hono.sanNoKata(entity, void 0);
          system34.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          hono.shiNoKata(entity, void 0);
          system34.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          hono.goNoKata(entity, void 0);
          system34.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/regimental/IwaComponent.ts
import { system as system35 } from "@minecraft/server";
var iwaKokyuLists = weightChoice([
  { item: 1, weight: 30 },
  { item: 2, weight: 30 },
  { item: 3, weight: 30 },
  { item: 4, weight: 20 },
  { item: 5, weight: 10 }
]);
var IwaComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system35.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = iwaKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const iwa = new IwaNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          iwa.ichiNoKata(entity, void 0);
          system35.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          system35.waitTicks(30).then(() => {
            iwa.niNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          iwa.sanNoKata(entity, void 0);
          system35.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          iwa.shiNoKata(entity, void 0);
          system35.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          iwa.goNoKata(entity, void 0);
          system35.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/regimental/KasumiComponent.ts
import { system as system36 } from "@minecraft/server";
var kasumiKokyuLists = weightChoice([
  { item: 1, weight: 50 },
  { item: 2, weight: 50 },
  { item: 3, weight: 50 },
  { item: 4, weight: 50 },
  { item: 5, weight: 15 },
  { item: 6, weight: 20 },
  { item: 7, weight: 20 }
]);
var KasumiComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system36.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = kasumiKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const kasumi = new KasumiNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          system36.waitTicks(20).then(() => {
            kasumi.ichiNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          kasumi.niNoKata(entity, void 0);
          system36.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          kasumi.sanNoKata(entity, void 0);
          system36.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          system36.waitTicks(20).then(() => {
            kasumi.shiNoKata(entity, void 0);
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          kasumi.goNoKata(entity, void 0);
          system36.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          kasumi.rokuNoKata(entity, void 0);
          system36.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          kasumi.shitiNoKata(entity, void 0);
          system36.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/regimental/KazeComponent.ts
import { system as system37 } from "@minecraft/server";
var kazeKokyuLists = weightChoice([
  { item: 1, weight: 50 },
  { item: 2, weight: 50 },
  { item: 3, weight: 50 },
  { item: 4, weight: 50 },
  { item: 5, weight: 15 },
  { item: 6, weight: 20 },
  { item: 7, weight: 20 },
  { item: 8, weight: 10 },
  { item: 9, weight: 10 }
]);
var KazeComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system37.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = kazeKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const kaze = new KazeNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          system37.waitTicks(20).then(() => {
            kaze.ichiNoKata(entity, void 0);
          }).catch((error) => {
          });
          system37.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.niNoKata(entity, void 0);
          system37.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.sanNoKata(entity, void 0);
          system37.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.shiNoKata(entity, void 0);
          system37.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.goNoKata(entity, void 0);
          system37.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.rokuNoKata(entity, void 0);
          system37.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.shitiNoKata(entity, void 0);
          system37.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 8:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.hachiNoKata(entity, void 0);
          system37.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 9:
          entity.triggerEvent("kurokumaft:attack_stop");
          kaze.kuNoKata(entity, void 0);
          system37.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/regimental/KoiComponent.ts
import { system as system38 } from "@minecraft/server";
var koiKokyuLists = weightChoice([
  { item: 1, weight: 30 },
  { item: 2, weight: 30 },
  { item: 3, weight: 20 },
  { item: 5, weight: 20 },
  { item: 6, weight: 20 }
]);
var KoiComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system38.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = koiKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const koi = new KoiNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          koi.ichiNoKata(entity, void 0);
          system38.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          koi.niNoKata(entity, void 0);
          system38.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          koi.sanNoKata(entity, void 0);
          system38.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          koi.goNoKata(entity, void 0);
          system38.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          koi.rokuNoKata(entity, void 0);
          system38.waitTicks(40).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/regimental/MushiComponent.ts
import { system as system39 } from "@minecraft/server";
var mushiKokyuLists = weightChoice([
  { item: 1, weight: 30 },
  { item: 2, weight: 30 },
  { item: 3, weight: 30 },
  { item: 4, weight: 30 }
]);
var MushiComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system39.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = mushiKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const mushi = new MushiNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          mushi.ichiNoKata(entity, void 0);
          system39.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          mushi.niNoKata(entity, void 0);
          system39.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          mushi.sanNoKata(entity, void 0);
          system39.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          mushi.shiNoKata(entity, void 0);
          system39.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/regimental/OtoComponent.ts
import { system as system40 } from "@minecraft/server";
var otoKokyuLists = weightChoice([
  { item: 1, weight: 30 },
  { item: 2, weight: 30 },
  { item: 3, weight: 30 },
  { item: 4, weight: 20 },
  { item: 5, weight: 10 }
]);
var OtoComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system40.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = otoKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const oto = new OtoNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          oto.ichiNoKata(entity, void 0);
          system40.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          oto.niNoKata(entity, void 0);
          system40.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          oto.sanNoKata(entity, void 0);
          system40.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          oto.shiNoKata(entity, void 0);
          system40.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          oto.goNoKata(entity, void 0);
          system40.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/regimental/TukiComponent.ts
import { system as system41 } from "@minecraft/server";
var tukiKokyuLists = weightChoice([
  { item: 1, weight: 30 },
  { item: 2, weight: 30 },
  { item: 3, weight: 30 },
  { item: 5, weight: 30 },
  { item: 6, weight: 20 },
  { item: 7, weight: 20 },
  { item: 8, weight: 20 },
  { item: 9, weight: 20 },
  { item: 10, weight: 20 },
  { item: 14, weight: 10 },
  { item: 16, weight: 10 }
]);
var TukiComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system41.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = tukiKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const tuki = new TukiNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          system41.waitTicks(30).then(() => {
            tuki.ichiNoKata(entity, void 0);
          }).catch((error) => {
          });
          system41.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.niNoKata(entity, void 0);
          system41.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.sanNoKata(entity, void 0);
          system41.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.goNoKata(entity, void 0);
          system41.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.rokuNoKata(entity, void 0);
          system41.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.shitiNoKata(entity, void 0);
          system41.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 8:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.hachiNoKata(entity, void 0);
          system41.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 9:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.kuNoKata(entity, void 0);
          system41.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 10:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.zyuNoKata(entity, void 0);
          system41.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 14:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.zyushiNoKata(entity, void 0);
          system41.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 16:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.zyurokuNoKata(entity, void 0);
          system41.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kokyu/mob/regimental/KedamonoComponent.ts
import { system as system42, TicksPerSecond as TicksPerSecond18 } from "@minecraft/server";
var kedamonoKokyuLists = weightChoice([
  { item: 1, weight: 50 },
  { item: 2, weight: 50 },
  { item: 3, weight: 50 },
  { item: 4, weight: 50 },
  { item: 5, weight: 15 },
  { item: 6, weight: 20 },
  { item: 7, weight: 20 },
  { item: 8, weight: 10 },
  { item: 9, weight: 10 },
  { item: 10, weight: 10 }
]);
var KedamonoComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
      if (nitirintou_equip) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackKokyu(entity);
      }
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackKata(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system42.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackKokyu(entity) {
    const num = kedamonoKokyuLists.pick();
    entity.setProperty("kurokumaft:kokyu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const kedamono = new KedamonoNoKata();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.ichiNoKata(entity, void 0);
          system42.waitTicks(15).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.niNoKata(entity, void 0);
          system42.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.sanNoKata(entity, void 0);
          system42.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.shiNoKata(entity, void 0);
          system42.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.goNoKata(entity, void 0);
          system42.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.rokuNoKata(entity, void 0);
          system42.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.shitiNoKata(entity, void 0);
          system42.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 8:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.hachiNoKata(entity, void 0);
          system42.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
        case 9:
          kedamono.kuNoKata(entity, void 0);
          system42.waitTicks(15 * TicksPerSecond18).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
          }).catch((error) => {
          });
          break;
        case 10:
          entity.triggerEvent("kurokumaft:attack_stop");
          kedamono.zyuNoKata(entity, void 0);
          system42.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kokyu_kata", 0);
            entity.triggerEvent("kurokumaft:kokyu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/item/weapon/NichirintouTypes.ts
var kokyuClassRecord = /* @__PURE__ */ new Map();
kokyuClassRecord.set("nichirintou", new NichirintouChoiceComponent());
kokyuClassRecord.set("tanjiro", new KokyuTanjiroComponent());
kokyuClassRecord.set("zenitu", new KokyuZenituComponent());
kokyuClassRecord.set("inosuke", new KokyuInosukeComponent());
kokyuClassRecord.set("kanawo", new KokyuKanawoComponent());
kokyuClassRecord.set("giyu", new KokyuGiyuComponent());
kokyuClassRecord.set("shinobu", new KokyuShinobuComponent());
kokyuClassRecord.set("kyouzyuro", new KokyuKyouzyuroComponent());
kokyuClassRecord.set("sanemi", new KokyuSanemiComponent());
kokyuClassRecord.set("gyoumei", new KokyuGyoumeiComponent());
kokyuClassRecord.set("muitiro", new KokyuMuitiroComponent());
kokyuClassRecord.set("tengen", new KokyuTengenComponent());
kokyuClassRecord.set("obanai", new KokyuObanaiComponent());
kokyuClassRecord.set("mituri", new KokyuMituriComponent());
kokyuClassRecord.set("mizu", new KokyuMizuComponent());
kokyuClassRecord.set("kaminari", new KokyuKaminariComponent());
kokyuClassRecord.set("hi", new KokyuHiComponent());
kokyuClassRecord.set("kedamono", new KokyuKedamonoComponent());
kokyuClassRecord.set("hono", new KokyuHonoComponent());
kokyuClassRecord.set("kaze", new KokyuKazeComponent());
kokyuClassRecord.set("iwa", new KokyuIwaComponent());
kokyuClassRecord.set("kasumi", new KokyuKasumiComponent());
kokyuClassRecord.set("oto", new KokyuOtoComponent());
kokyuClassRecord.set("hebi", new KokyuHebiComponent());
kokyuClassRecord.set("koi", new KokyuKoiComponent());
kokyuClassRecord.set("mushi", new KokyuMushiComponent());
kokyuClassRecord.set("hana", new KokyuHanaComponent());
kokyuClassRecord.set("tuki", new KokyuTukiComponent());
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
var KokyuMobClassRecord = /* @__PURE__ */ new Map();
KokyuMobClassRecord.set("tanjiro", new TanjiroComponent());
KokyuMobClassRecord.set("zenitu", new ZenituComponent());
KokyuMobClassRecord.set("inosuke", new InosukeComponent());
KokyuMobClassRecord.set("kanawo", new KanawoComponent());
KokyuMobClassRecord.set("giyu", new GiyuComponent());
KokyuMobClassRecord.set("shinobu", new ShinobuComponent());
KokyuMobClassRecord.set("kyouzyuro", new KyouzyuroComponent());
KokyuMobClassRecord.set("tengen", new TengenComponent());
KokyuMobClassRecord.set("obanai", new ObanaiComponent());
KokyuMobClassRecord.set("sanemi", new SanemiComponent());
KokyuMobClassRecord.set("mituri", new MituriComponent());
KokyuMobClassRecord.set("muitiro", new MuitiroComponent());
KokyuMobClassRecord.set("gyoumei", new GyoumeiComponent());
KokyuMobClassRecord.set("mizu", new MizuComponent());
KokyuMobClassRecord.set("hi", new HiComponent());
KokyuMobClassRecord.set("kaminari", new KaminariComponent());
KokyuMobClassRecord.set("hono", new HonoComponent());
KokyuMobClassRecord.set("kemono", new KedamonoComponent());
KokyuMobClassRecord.set("mushi", new MushiComponent());
KokyuMobClassRecord.set("hana", new HanaComponent());
KokyuMobClassRecord.set("koi", new KoiComponent());
KokyuMobClassRecord.set("oto", new OtoComponent());
KokyuMobClassRecord.set("kaze", new KazeComponent());
KokyuMobClassRecord.set("iwa", new IwaComponent());
KokyuMobClassRecord.set("hebi", new HebiComponent());
KokyuMobClassRecord.set("kasumi", new KasumiComponent());
KokyuMobClassRecord.set("tuki", new TukiComponent());
var KokyuMobObjects = Object.freeze([
  {
    entityName: "kurokumaft:tanjiro",
    className: "tanjiro"
  },
  {
    entityName: "kurokumaft:zenitu",
    className: "zenitu"
  },
  {
    entityName: "kurokumaft:inosuke",
    className: "inosuke"
  },
  {
    entityName: "kurokumaft:kanawo",
    className: "kanawo"
  },
  {
    entityName: "kurokumaft:giyu",
    className: "giyu"
  },
  {
    entityName: "kurokumaft:shinobu",
    className: "shinobu"
  },
  {
    entityName: "kurokumaft:kyouzyuro",
    className: "kyouzyuro"
  },
  {
    entityName: "kurokumaft:tengen",
    className: "tengen"
  },
  {
    entityName: "kurokumaft:obanai",
    className: "obanai"
  },
  {
    entityName: "kurokumaft:sanemi",
    className: "sanemi"
  },
  {
    entityName: "kurokumaft:mituri",
    className: "mituri"
  },
  {
    entityName: "kurokumaft:muitiro",
    className: "muitiro"
  },
  {
    entityName: "kurokumaft:gyoumei",
    className: "gyoumei"
  },
  {
    entityName: "kurokumaft:nichirintou_mizu",
    className: "mizu"
  },
  {
    entityName: "kurokumaft:nichirintou_hi",
    className: "hi"
  },
  {
    entityName: "kurokumaft:nichirintou_kaminari",
    className: "kaminari"
  },
  {
    entityName: "kurokumaft:nichirintou_hono",
    className: "hono"
  },
  {
    entityName: "kurokumaft:nichirintou_kemono",
    className: "kemono"
  },
  {
    entityName: "kurokumaft:nichirintou_mushi",
    className: "mushi"
  },
  {
    entityName: "kurokumaft:nichirintou_hana",
    className: "hana"
  },
  {
    entityName: "kurokumaft:nichirintou_koi",
    className: "koi"
  },
  {
    entityName: "kurokumaft:nichirintou_oto",
    className: "oto"
  },
  {
    entityName: "kurokumaft:nichirintou_kaze",
    className: "kaze"
  },
  {
    entityName: "kurokumaft:nichirintou_iwa",
    className: "iwa"
  },
  {
    entityName: "kurokumaft:nichirintou_hebi",
    className: "hebi"
  },
  {
    entityName: "kurokumaft:nichirintou_kasumi",
    className: "kasumi"
  },
  {
    entityName: "kurokumaft:nichirintou_tuki",
    className: "tuki"
  }
]);
async function startKokyuMonitoringMob(entity, className) {
  const KokyuClass = KokyuMobClassRecord.get(className);
  if (KokyuClass !== void 0) {
    KokyuClass.startMonitoring(entity);
  }
}
async function hitKokyuAttackKataMob(entity, className) {
  const KokyuClass = KokyuMobClassRecord.get(className);
  if (KokyuClass !== void 0) {
    KokyuClass.hitAttackKata(entity);
  }
}
async function changeKokyuKata(player, className) {
  const kokyuClass = kokyuClassRecord.get(className);
  if (kokyuClass !== void 0) {
    kokyuClass.changeKata(player);
  }
}
async function useAttackKokyuKata(player, itemStack, className) {
  const kokyuClass = kokyuClassRecord.get(className);
  if (kokyuClass !== void 0) {
    player.setProperty("kurokumaft:kokyu_use", true);
    player.setProperty("kurokumaft:kokyu_particle", true);
    kokyuClass.useAttackKata(player, itemStack);
  }
}
async function releaseAttackKata(player, item, duration, className) {
  const kokyuClass = kokyuClassRecord.get(className);
  if (kokyuClass !== void 0) {
    kokyuClass.releaseAttackKata(player, item, duration);
  }
}

// scripts/item/weapon/nichirintou/NichirintouComponent.ts
var NichirintouComponent = class {
  // 右クリック
  onUse(event) {
    const player = event.source;
    const itemStack = event.itemStack;
    if (player.isSneaking) {
      const nichirintou = player.getProperty("kurokumaft:nichirintou_type");
      const object = KokyuObjects.find((ob) => ob.type === nichirintou);
      changeKokyuKata(player, object.className);
      return;
    } else {
      if (!player.getProperty("kurokumaft:kokyu_use")) {
        const equippable = player.getComponent(EntityComponentTypes8.Equippable);
        const mainHand = equippable.getEquipment(EquipmentSlot4.Mainhand);
        if (mainHand !== void 0) {
          const object = KokyuObjects.find((ob) => ob.itemName === itemStack.typeId);
          useAttackKokyuKata(player, itemStack, object.className);
        }
      }
    }
  }
};
world6.afterEvents.itemReleaseUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;
  const duration = event.useDuration;
  const nichirintou = player.getProperty("kurokumaft:nichirintou_type");
  if (item !== void 0 && nichirintou !== void 0 && nichirintou !== 0) {
    if (player.getProperty("kurokumaft:kokyu_use")) {
      const object = KokyuObjects.find((ob) => ob.type === nichirintou);
      releaseAttackKata(player, item, duration, object.className);
    }
  }
});

// scripts/item/tool/BloodDrinking.ts
import { system as system44, TicksPerSecond as TicksPerSecond19 } from "@minecraft/server";

// scripts/item/tool/OgreEatCommon.ts
import { ItemStack as ItemStack22, system as system43, EntityComponentTypes as EntityComponentTypes9, ItemLockMode, EquipmentSlot as EquipmentSlot5 } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

// scripts/common/KimetuConst.ts
var OgreKaikyu = Object.freeze([
  { name: "kurokumaft:aizetu", rank: "crescent", num: 4 },
  { name: "kurokumaft:akaza", rank: "crescent", num: 3 },
  { name: "kurokumaft:douma", rank: "crescent", num: 2 },
  { name: "kurokumaft:gyutaro", rank: "crescent", num: 6 },
  { name: "kurokumaft:hantengu_obie", rank: "crescent", num: 4 },
  { name: "kurokumaft:hantengu", rank: "crescent", num: 4 },
  { name: "kurokumaft:karaku", rank: "crescent", num: 4 },
  { name: "kurokumaft:rui", rank: "quarter", num: 5 },
  { name: "kurokumaft:sekido", rank: "crescent", num: 4 },
  { name: "kurokumaft:urogi", rank: "crescent", num: 4 },
  { name: "kurokumaft:zouhakuten", rank: "crescent", num: 4 }
]);
var TaishiKaikyu = Object.freeze([
  { name: "kurokumaft:genya", min: 1, max: 7 },
  { name: "kurokumaft:kanawo", min: 4, max: 10 },
  { name: "kurokumaft:tanjiro", min: 1, max: 10 },
  { name: "kurokumaft:zenitu", min: 1, max: 10 },
  { name: "kurokumaft:inosuke", min: 1, max: 10 },
  { name: "kurokumaft:regimental_girl", min: 1, max: 7 },
  { name: "kurokumaft:regimental_guy", min: 1, max: 7 }
]);
var kaikyuPointList = [
  "0",
  "100",
  "300",
  "600",
  "1000",
  "1500",
  "2100",
  "2800",
  "3600",
  "4500",
  "10",
  "-"
];
var ogrePointList = [
  { name: "none", value: "100", regene: 0, regeneTime: 0 },
  { name: "low", value: "150", regene: 1, regeneTime: 240 },
  { name: "unusual", value: "200", regene: 2, regeneTime: 480 },
  { name: "quarter", value: "400", regene: 3, regeneTime: 720 },
  { name: "crescent", value: "500", regene: 4, regeneTime: 1200 },
  { name: "king", value: "-", regene: 5, regeneTime: 3600 }
];
var kekkizyutuPickLists = weightChoice([
  { item: "kurokumaft:bakketu", weight: 20 },
  { item: "kurokumaft:koushi", weight: 20 },
  { item: "kurokumaft:obi_item", weight: 15 },
  { item: "kurokumaft:nichirintou_kaigaku", weight: 10 },
  { item: "kurokumaft:gyutaro_kama", weight: 10 },
  { item: "kurokumaft:zouhakuten_bati", weight: 5 },
  { item: "kurokumaft:gyokko_tubo", weight: 5 },
  { item: "kurokumaft:hakaisatu_item", weight: 5 },
  { item: "kurokumaft:douma_sensu", weight: 5 },
  { item: "kurokumaft:kyokokukamusari", weight: 5 }
]);
var kekkizyutuLists = Object.freeze([
  { item: "kurokumaft:bakketu", msg: "item.kurokumaft:bakketu.name" },
  { item: "kurokumaft:koushi", msg: "item.kurokumaft:koushi.name" },
  { item: "kurokumaft:obi_item", msg: "item.kurokumaft:obi.name" },
  { item: "kurokumaft:gyutaro_kama", msg: "item.kurokumaft:tigama.name" },
  { item: "kurokumaft:zouhakuten_bati", msg: "item.kurokumaft:mogura.name" },
  { item: "kurokumaft:gyokko_tubo", msg: "item.kurokumaft:suisei.name" },
  { item: "kurokumaft:hakaisatu_item", msg: "item.kurokumaft:hakaisatu.name" },
  { item: "kurokumaft:douma_sensu", msg: "item.kurokumaft:koori.name" },
  { item: "kurokumaft:kyokokukamusari", msg: "item.kurokumaft:mikatuki.name" },
  { item: "kurokumaft:nichirintou_kaigaku", msg: "item.kurokumaft:kokurai.name" },
  { item: "kurokumaft:nakime_biwa", msg: "item.kurokumaft:kuukan.name" },
  { item: "kurokumaft:susamaru_mari", msg: "item.kurokumaft:susamaru_mari.name" },
  { item: "kurokumaft:kouketunoya", msg: "item.kurokumaft:kouketunoya.name" },
  { item: "kurokumaft:wakuti", msg: "item.kurokumaft:wakuti.name" }
]);
var NitirintouEquips = Object.freeze([
  {
    itemName: "kurokumaft:nichirintou_tanjiro",
    charaName: "kurokumaft:tanjiro"
  },
  {
    itemName: "kurokumaft:nichirintou_zenitu",
    charaName: "kurokumaft:zenitu"
  },
  {
    itemName: "kurokumaft:nichirintou_inosuke",
    charaName: "kurokumaft:inosuke"
  },
  {
    itemName: "kurokumaft:nichirintou_kanawo",
    charaName: "kurokumaft:kanawo"
  },
  {
    itemName: "kurokumaft:nichirintou_giyu",
    charaName: "kurokumaft:giyu"
  },
  {
    itemName: "kurokumaft:nichirintou_shinobu",
    charaName: "kurokumaft:shinobu"
  },
  {
    itemName: "kurokumaft:nichirintou_kyouzyuro",
    charaName: "kurokumaft:kyouzyuro"
  },
  {
    itemName: "kurokumaft:nichirintou_sanemi",
    charaName: "kurokumaft:sanemi"
  },
  {
    itemName: "kurokumaft:nichirintou_gyoumei",
    charaName: "kurokumaft:gyoumei"
  },
  {
    itemName: "kurokumaft:nichirintou_muitiro",
    charaName: "kurokumaft:muitiro"
  },
  {
    itemName: "kurokumaft:nichirintou_tengen",
    charaName: "kurokumaft:tengen"
  },
  {
    itemName: "kurokumaft:nichirintou_obanai",
    charaName: "kurokumaft:obanai"
  },
  {
    itemName: "kurokumaft:nichirintou_mituri",
    charaName: "kurokumaft:mituri"
  }
]);
var attackTypesLists = Object.freeze([
  { tag: "attack_one", count: 4 },
  { tag: "attack_two", count: 5 },
  { tag: "attack_horizontality", count: 3 }
]);

// scripts/item/tool/OgreEatCommon.ts
var OgreEatCommon = class {
  rankUpPoint(rank) {
    let rankPoint = 0;
    switch (rank) {
      case "low":
        rankPoint = 150;
        break;
      case "unusual":
        rankPoint = 200;
        break;
      case "quarter":
        rankPoint = 400;
        break;
      case "crescent":
        rankPoint = 500;
        break;
    }
    return rankPoint;
  }
  upRankCheck(rank, player, becoming) {
    const rankPoint = this.rankUpPoint(rank);
    if (becoming >= rankPoint) {
      switch (rank) {
        case "low":
          player.setProperty("kurokumaft:ogre_rank", "unusual");
          const Inventory = player.getComponent(EntityComponentTypes9.Inventory);
          const container = Inventory.container;
          if (container !== void 0) {
            const itemstack = container.transferItem(0, container);
            if (itemstack !== void 0) {
              player.dimension.spawnItem(itemstack, player.location);
            }
            const modalForm = new ActionFormData().title({ translate: "msg.kurokumaft:kekkizyutu.title" });
            kekkizyutuLists.forEach((zyutu) => {
              modalForm.button(
                { translate: zyutu.msg }
              );
            });
            modalForm.show(player).then((result) => {
              let kekkizyutu;
              if (result.canceled) {
                kekkizyutu = kekkizyutuPickLists.pick();
              } else {
                const index = result.selection;
                kekkizyutu = kekkizyutuLists[index].item;
              }
              if (kekkizyutu === "kurokumaft:obi_item") {
                const equ = player.getComponent(EntityComponentTypes9.Equippable);
                const chest = equ.getEquipment(EquipmentSlot5.Chest);
                if (chest !== void 0) {
                  player.dimension.spawnItem(chest, player.location);
                }
                equ.setEquipment(EquipmentSlot5.Chest, new ItemStack22("kurokumaft:daki_obi", 1));
              }
              const zyutu = new ItemStack22(kekkizyutu, 1);
              zyutu.lockMode = ItemLockMode.slot;
              container.setItem(0, zyutu);
            }).catch((error) => {
              console.log(error.stack);
              return -1;
            });
          }
          break;
        case "unusual":
          player.setProperty("kurokumaft:ogre_rank", "quarter");
          break;
        case "quarter":
          const moon1 = player.getProperty("kurokumaft:ogre_moon");
          if (moon1 === 1) {
            player.setProperty("kurokumaft:ogre_moon", 6);
            player.setProperty("kurokumaft:ogre_rank", "crescent");
          } else {
            player.setProperty("kurokumaft:ogre_moon", moon1 - 1);
          }
          break;
        case "crescent":
          const moon2 = player.getProperty("kurokumaft:ogre_moon");
          if (moon2 === 1) {
            player.setProperty("kurokumaft:ogre_rank", "king");
          } else {
            player.setProperty("kurokumaft:ogre_moon", moon2 - 1);
          }
          break;
      }
      player.setProperty("kurokumaft:ogre_becoming", 0);
      system43.runTimeout(() => {
        player.triggerEvent("kurokumaft:ogre_rank_change");
      }, 4);
    } else {
      player.setProperty("kurokumaft:ogre_becoming", becoming);
    }
  }
};

// scripts/item/tool/BloodDrinking.ts
var BloodDrinking = class {
  onConsume(event) {
    const item = event.itemStack;
    const player = event.source;
    const lores = item.getLore();
    const rank = player.getProperty("kurokumaft:ogre_rank");
    let becoming = player.getProperty("kurokumaft:ogre_becoming");
    if (lores !== void 0 && lores.length > 0) {
      switch (lores[0]) {
        case "Lv 5":
          becoming = becoming + 30;
          break;
        case "Lv 4":
          becoming = becoming + 25;
          break;
        case "Lv 3":
          becoming = becoming + 20;
          break;
        case "Lv 2":
          becoming = becoming + 15;
          break;
        case "Lv 1":
          becoming = becoming + 10;
          break;
          break;
      }
    } else {
      becoming = becoming + 10;
    }
    if ("none" === rank) {
      if (becoming >= 100) {
        player.setProperty("kurokumaft:ogre_rank", "low");
        player.setProperty("kurokumaft:ogre_becoming", 0);
        system44.runTimeout(() => {
          player.triggerEvent("kurokumaft:ogre_rank_change");
        }, 4);
      } else {
        player.setProperty("kurokumaft:ogre_becoming", becoming);
        player.addEffect("minecraft:hunger", 10 * TicksPerSecond19, {
          amplifier: 5,
          showParticles: false
        });
        player.addEffect("minecraft:wither", 10 * TicksPerSecond19, {
          amplifier: 5,
          showParticles: false
        });
      }
    } else {
      new OgreEatCommon().upRankCheck(rank, player, becoming);
    }
  }
};

// scripts/item/weapon/kekkizyutu/KekkizyutuComponent.ts
import { EntityComponentTypes as EntityComponentTypes19, EquipmentSlot as EquipmentSlot6, world as world11 } from "@minecraft/server";

// scripts/kekkizyutu/zyutu/Bunretu.ts
import { system as system45, Player as Player27, EntityComponentTypes as EntityComponentTypes11 } from "@minecraft/server";

// scripts/kekkizyutu/zyutu/ZytuComonClass.ts
import { EntityDamageCause as EntityDamageCause2, Player as Player26, EntityComponentTypes as EntityComponentTypes10 } from "@minecraft/server";
var ZytuComonClass = class extends KataComonClass {
  zyutuApplyDamage(entity, filter, zyutuDamage) {
    entity.addTag(entity.id);
    const targets = entity.dimension.getEntities(filter);
    const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
    const point = ogreRankPoint.find((rank) => rank.rank === ogre_rank);
    const damage = entity.getProperty("kurokumaft:attack_level");
    targets.forEach((en) => {
      if (en !== void 0 && en.isValid) {
        if (en instanceof Player26) {
          if (!this.gardCheck(en)) {
            en.applyDamage((damage + zyutuDamage) * (point !== void 0 ? point.point : 1) * 0.5, {
              cause: EntityDamageCause2.entityAttack,
              damagingEntity: entity
            });
            const familyTypes = en.getComponent(EntityComponentTypes10.TypeFamily);
            if (familyTypes.hasTypeFamily("ogre")) {
              const distance = getLookLocationDistance(en.getRotation().y, -1.25, 0, 0.5);
              en.applyKnockback({ x: distance.x, z: distance.z }, 0.25);
            }
          }
        } else {
          en.applyDamage((damage + zyutuDamage) * (point !== void 0 ? point.point : 1), {
            cause: EntityDamageCause2.entityAttack,
            damagingEntity: entity
          });
          const familyTypes = en.getComponent(EntityComponentTypes10.TypeFamily);
          if (familyTypes.hasTypeFamily("ogre")) {
            const distance = getLookLocationDistance(en.getRotation().y, -1.25, 0, 0.5);
            en.applyKnockback({ x: distance.x, z: distance.z }, 0.25);
          }
        }
      }
    });
    entity.removeTag(entity.id);
  }
  kokyuApplyEffect(entity, filter, duration, damage, effect) {
    entity.addTag(entity.id);
    const targets = entity.dimension.getEntities(filter);
    const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
    const point = ogreRankPoint.find((rank) => rank.rank === ogre_rank);
    const damageNum = point !== void 0 ? point.point : 1;
    targets.forEach((en) => {
      if (en !== void 0 && en.isValid) {
        if (en instanceof Player26) {
          if (this.gardCheck(en)) {
            en.addEffect(effect, Math.round(duration * damageNum * 0.25), {
              amplifier: Math.round(damage * damageNum * 0.25),
              showParticles: true
            });
          }
        } else {
          en.addEffect(effect, Math.round(duration * damageNum * 0.75), {
            amplifier: Math.round(damage * damageNum),
            showParticles: true
          });
        }
      }
    });
    entity.removeTag(entity.id);
  }
};

// scripts/kekkizyutu/zyutu/Bunretu.ts
var Bunretu = class extends ZytuComonClass {
  /**
   * 超音波
   */
  ultrasonic(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      if (entity instanceof Player27) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_kyoumei1.value" }] });
      }
      const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
      const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);
      this.kokyuApplyEffect(entity, filter, 10, 5, "minecraft:nausea");
      const ultrasonic = shooting(entity, "kurokumaft:urogi_ultrasonic", 0, 3, void 0, 0);
      system45.waitTicks(10).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
        if (ultrasonic !== void 0 && ultrasonic.id !== void 0) {
          ultrasonic.remove();
        }
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 雷
   */
  ikazuti(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      if (entity instanceof Player27) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_ikazuti1.value" }] });
      }
      const num = system45.runInterval(() => {
        try {
          const filter = addOrgeFilter(0, entity.location, 10, entity.id);
          this.zyutuApplyDamage(entity, filter, 5);
          const distance = getLookLocationDistance(entity.getRotation().y, 0, getRandomInRange(-3, 3), 0);
          entity.dimension.spawnParticle("kurokumaft:ikazuti_particle", getDistanceLocation(entity.location, distance));
        } catch (error) {
          system45.clearRun(num);
        }
      }, 2);
      system45.waitTicks(40).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system45.clearRun(num);
      });
    } catch (error) {
    }
  }
  /**
   * 激涙刺突
   */
  shitotu(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      if (entity instanceof Player27) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_shitotu1.value" }] });
      }
      const num = system45.runInterval(() => {
        try {
          const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
          const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);
          this.zyutuApplyDamage(entity, filter, 5);
        } catch (error) {
          system45.clearRun(num);
        }
      }, 2);
      system45.waitTicks(10).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system45.clearRun(num);
      });
    } catch (error) {
    }
  }
  /**
   * 突風
   */
  toppu(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      if (entity instanceof Player27) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_toppu1.value" }] });
      }
      entity.addTag(entity.id);
      const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
      const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 5, entity.id);
      entity.dimension.spawnParticle("minecraft:breeze_wind_explosion_emitter", getDistanceLocation(entity.location, distance));
      const targets = entity.dimension.getEntities(filter);
      const knockback = getLookLocationDistance(entity.getRotation().y, 15, 0, 0);
      targets.forEach((en) => {
        en.applyKnockback({ x: knockback.x, z: knockback.z }, 1.5);
      });
      entity.removeTag(entity.id);
      system45.waitTicks(6).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 石竜子
   */
  tokage(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      if (entity instanceof Player27) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_zouhakuten1.value" }] });
      }
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      const targets = entity.dimension.getEntities({
        families: [
          "tokage"
        ],
        location: entity.location,
        maxDistance: 64
      });
      if (targets.length < 3) {
        const tokage = entity.dimension.spawnEntity("kurokumaft:tuti_dragon", entity.location);
        tokage.triggerEvent("kurokumaft:tokage");
        const tameable = tokage.getComponent(EntityComponentTypes11.Tameable);
        if (!tameable.isTamed) {
          if (entity instanceof Player27) {
            tameable.tame(entity);
          }
        }
      } else {
        if (entity instanceof Player27) {
          entity.onScreenDisplay.setActionBar({ text: "\u53EC\u559A\u6570\u4E0A\u9650\u8D85\u904E" });
        }
      }
    } catch (error) {
    }
  }
  /**
   * 狂鳴雷殺
   */
  kyoumeiraisatu(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      if (entity instanceof Player27) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_zouhakuten2.value" }] });
      }
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      const distanceL = getLookLocationDistance(entity.getRotation().y, 4, -5, 0);
      const tokageL = entity.dimension.spawnEntity("kurokumaft:tuti_dragon", getDistanceLocation(entity.location, distanceL));
      tokageL.triggerEvent("kurokumaft:kyoumeiraisatu");
      const tameableL = tokageL.getComponent(EntityComponentTypes11.Tameable);
      if (!tameableL.isTamed) {
        if (entity instanceof Player27) {
          tameableL.tame(entity);
        }
      }
      const distanceR = getLookLocationDistance(entity.getRotation().y, 4, 5, 0);
      const tokageR = entity.dimension.spawnEntity("kurokumaft:tuti_dragon", getDistanceLocation(entity.location, distanceR));
      tokageR.triggerEvent("kurokumaft:kyoumeiraisatu");
      const tameableR = tokageR.getComponent(EntityComponentTypes11.Tameable);
      if (!tameableR.isTamed) {
        if (entity instanceof Player27) {
          tameableR.tame(entity);
        }
      }
      const num = system45.runInterval(() => {
        try {
          if (tokageR !== void 0 && tokageR.isValid) {
            const filterR = addOrgeFilter(0, tokageR.location, 10, entity.id);
            filterR.excludeFamilies?.push("tokage");
            this.zyutuApplyDamage(entity, filterR, 7);
            const distanceR2 = getLookLocationDistance(tokageR.getRotation().y, 0, getRandomInRange(-3, 3), 0);
            entity.dimension.spawnParticle("kurokumaft:ikazuti_particle", getDistanceLocation(tokageR.location, distanceR2));
          }
          if (tokageL !== void 0 && tokageL.isValid) {
            const distanceL2 = getLookLocationDistancePitch(tokageL.getRotation(), 3, 0);
            const filterL = addOrgeFilter(0, getDistanceLocation(tokageL.location, distanceL2), 4, entity.id);
            filterL.excludeFamilies?.push("tokage");
            this.kokyuApplyEffect(entity, filterL, 10, 5, "minecraft:nausea");
            const ultrasonic = shooting(tokageL, "kurokumaft:urogi_ultrasonic", 0, 3, void 0, 0);
            system45.runTimeout(() => {
              if (ultrasonic !== void 0 && ultrasonic.id !== void 0) {
                ultrasonic.remove();
              }
            }, 15);
          }
        } catch (error) {
          system45.clearRun(num);
        }
      }, 5);
      system45.waitTicks(60).then(() => {
        if (tokageR !== void 0) {
          tokageR.remove();
        }
        if (tokageL !== void 0) {
          tokageL.remove();
        }
      }).catch((error) => {
      }).finally(() => {
        system45.clearRun(num);
      });
    } catch (error) {
    }
  }
  /**
   * 狂圧鳴波
   */
  kyouatumeiha(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      if (entity instanceof Player27) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_zouhakuten3.value" }] });
      }
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
      const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);
      const num = system45.runInterval(() => {
        try {
          this.zyutuApplyDamage(entity, filter, 9);
          this.kokyuApplyEffect(entity, filter, 10, 5, "minecraft:nausea");
        } catch (error) {
          system45.clearRun(num);
        }
      }, 4);
      for (let i = -1; i <= 1; i++) {
        const ultrasonic = this.sonic(entity, i);
        system45.runTimeout(() => {
          if (ultrasonic !== void 0 && ultrasonic.id !== void 0) {
            ultrasonic.remove();
          }
        }, 10);
      }
      system45.waitTicks(20).then(() => {
      }).catch((error) => {
      }).finally(() => {
        system45.clearRun(num);
      });
    } catch (error) {
    }
  }
  sonic(entity, side) {
    const distance = getLookLocationDistance(entity.getRotation().y, 1, side, 0.5);
    const bulet = entity.dimension.spawnEntity("kurokumaft:urogi_ultrasonic", getDistanceLocation(entity.location, distance));
    const projectile = bulet.getComponent(EntityComponentTypes11.Projectile);
    projectile.owner = entity;
    projectile.shoot({
      x: distance.x * 2,
      y: distance.y * 0.5,
      z: distance.z * 2
    });
    return bulet;
  }
  /**
   * 無間業樹
   */
  mukengouzyu(entity) {
    try {
      if (entity instanceof Player27) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_zouhakuten4.value" }] });
      }
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      this.gouzyu(entity);
    } catch (error) {
    }
  }
  gouzyu(entity) {
    try {
      const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
      const tokage = entity.dimension.spawnEntity("kurokumaft:tuti_dragon", getDistanceLocation(entity.location, distance));
      tokage.triggerEvent("kurokumaft:mukengouzyu");
      tokage.teleport(tokage.location, {
        keepVelocity: false,
        rotation: {
          x: 0,
          y: entity.getRotation().y
        }
      });
      const num = system45.runInterval(() => {
        try {
          if (tokage !== void 0 && tokage.isValid) {
            const distance2 = getLookLocationDistance(tokage.getRotation().y, 6, 0, 0);
            tokage.applyKnockback({ x: distance2.x, z: distance2.z }, 0);
            const filter = addOrgeFilter(0, tokage.location, 5, entity.id);
            filter.excludeFamilies?.push("tokage");
            this.zyutuApplyDamage(entity, filter, 8);
          } else {
            system45.clearRun(num);
          }
        } catch (error) {
          system45.clearRun(num);
        }
      }, 2);
      system45.waitTicks(60).then(() => {
        if (tokage !== void 0 && tokage.isValid) {
          tokage.remove();
        }
      }).catch((error) => {
      }).finally(() => {
        system45.clearRun(num);
      });
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/player/character/ZyutuAizetuComponent.ts
var ZyutuAizetuComponent = class {
  bunretu = new Bunretu();
  /**
   * 変更
   * @param {Player} player
   */
  changeZyutu(player) {
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    try {
      switch (kata) {
        case 1:
          this.bunretu.shitotu(entity);
          break;
      }
    } catch (error) {
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/zyutu/Hakaisatu.ts
import { EntityComponentTypes as EntityComponentTypes12, MolangVariableMap as MolangVariableMap11, system as system46, TicksPerSecond as TicksPerSecond20, Player as Player28 } from "@minecraft/server";
var Hakaisatu = class extends ZytuComonClass {
  /**
   * 破壊殺・羅針
   */
  rashin(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      if (entity instanceof Player28) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_hakai1.value" }] });
      }
      const move = entity.getComponent(EntityComponentTypes12.Movement);
      move.setCurrentValue(0.2);
      const molang = new MolangVariableMap11();
      molang.setFloat("variable.rotaion", -entity.getRotation().y);
      entity.dimension.spawnParticle("kurokumaft:rashin", entity.location, molang);
      system46.waitTicks(30).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
        move.resetToDefaultValue();
        entity.addEffect("minecraft:speed", 10 * TicksPerSecond20, {
          amplifier: 5,
          showParticles: false
        });
        entity.addEffect("minecraft:strength", 10 * TicksPerSecond20, {
          amplifier: 1,
          showParticles: false
        });
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 破壊殺・空式
   */
  kushiki(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      if (entity instanceof Player28) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_hakai2.value" }] });
      }
      const kushiki = shooting(entity, "kurokumaft:kushiki", 0, 3, void 0, 0);
      system46.runTimeout(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }, 5);
      system46.waitTicks(1 * TicksPerSecond20).then(() => {
        if (kushiki.isValid) {
          kushiki.remove();
        }
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 破壊殺・乱式
   */
  ranshiki(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      if (entity instanceof Player28) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_hakai3.value" }] });
      }
      const num = system46.runInterval(() => {
        try {
          const distance = getLookLocationDistancePitch(entity.getRotation(), 5, 0);
          const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 5, entity.id);
          this.zyutuApplyDamage(entity, filter, 5);
          const side = getRandomInRange(-4, 4);
          const top = getRandomInRange(0, 3);
          const distance2 = getLookLocationDistance(entity.getRotation().y, 5, side, top);
          entity.dimension.spawnParticle("kurokumaft:ranshiki", getDistanceLocation(entity.location, distance2));
          this.ran(entity, side, top);
        } catch (error) {
          console.info(error);
          system46.clearRun(num);
        }
      }, 2);
      system46.waitTicks(40).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system46.clearRun(num);
      });
    } catch (error) {
    }
  }
  /**
   * 乱式
   * @param {Entity} entity
   */
  ran(entity, side, top) {
    const distance = getLookLocationDistance(entity.getRotation().y, 1, side, top);
    const bulet = entity.dimension.spawnEntity("kurokumaft:hakaisatu_small_bullet", getDistanceLocation(
      {
        x: entity.location.x,
        y: entity.location.y + 0.5,
        z: entity.location.z
      },
      distance
    ));
    const projectile = bulet.getComponent(EntityComponentTypes12.Projectile);
    projectile.owner = entity;
    const shotdistance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
    projectile.shoot({
      x: shotdistance.x,
      y: 0,
      z: shotdistance.z
    });
    system46.waitTicks(10).then(() => {
      bulet.remove();
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 破壊殺・滅式
   */
  messhiki(entity) {
    try {
      if (entity instanceof Player28) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_hakai4.value" }] });
      }
      entity.setProperty("kurokumaft:kokyu_particle", false);
      entity.setProperty("kurokumaft:kokyu_use", false);
      const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 1);
      const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
      entity.dimension.spawnParticle("kurokumaft:meshiki", getDistanceLocation(entity.location, distance));
      this.zyutuApplyDamage(entity, filter, 15);
    } catch (error) {
    }
  }
  /**
   * 破壊殺・脚式 冠先割
   */
  kamurosakiwari(entity) {
    try {
      if (entity instanceof Player28) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_hakai5.value" }] });
      }
      const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 2);
      const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 2.5, entity.id);
      entity.dimension.spawnParticle("kurokumaft:ranshiki", getDistanceLocation(entity.location, distance));
      this.zyutuApplyDamage(entity, filter, 10);
      this.kokyuApplyKnockback(entity, filter, distance, 1.5);
      system46.waitTicks(5).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 破壊殺・脚式 流閃群光
   */
  ryusengunkou(entity) {
    try {
      if (entity instanceof Player28) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_hakai6.value" }] });
      }
      const num = system46.runInterval(() => {
        try {
          const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
          const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
          this.zyutuApplyDamage(entity, filter, 5);
          this.kokyuApplyKnockback(entity, filter, distance, 0);
          const distance2 = getLookLocationDistance(entity.getRotation().y, 5, getRandomInRange(-3, 3), getRandomInRange(0, 2));
          entity.dimension.spawnParticle("kurokumaft:ryuseigunkou", getDistanceLocation(entity.location, distance2));
        } catch (error) {
          system46.clearRun(num);
        }
      }, 4);
      system46.waitTicks(40).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system46.clearRun(num);
      });
    } catch (error) {
    }
  }
  /**
   * 破壊殺・脚式 飛遊星千輪
   */
  hiyuuseisenrin(entity) {
    try {
      if (entity instanceof Player28) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_hakai7.value" }] });
      }
      const num = system46.runInterval(() => {
        try {
          const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
          const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
          entity.dimension.spawnParticle("kurokumaft:ryuseigunkou", getDistanceLocation(entity.location, distance));
          this.zyutuApplyDamage(entity, filter, 5);
          this.kokyuApplyKnockback(entity, filter, distance, 0.3);
          entity.applyKnockback({ x: distance.x, z: distance.z }, 0.3);
        } catch (error) {
          system46.clearRun(num);
        }
      }, 4);
      system46.waitTicks(20).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
        system46.waitTicks(5).then(() => {
          entity.addEffect("minecraft:slow_falling", 1 * TicksPerSecond20, {
            amplifier: 1,
            showParticles: false
          });
        }).catch((error) => {
        }).finally(() => {
        });
      }).catch((error) => {
      }).finally(() => {
        system46.clearRun(num);
      });
    } catch (error) {
    }
  }
  /**
   * 破壊殺・砕式 万葉閃柳
   */
  manyousenyanagi(entity) {
    try {
      if (entity instanceof Player28) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_hakai8.value" }] });
      }
      const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
      entity.applyKnockback({ x: distance.x, z: distance.z }, 1);
      system46.waitTicks(20).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
        const distance2 = getLookLocationDistance(entity.getRotation().y, 0, 0, -1);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance2), 5, entity.id);
        this.zyutuApplyDamage(entity, filter, 10);
        entity.dimension.spawnParticle("kurokumaft:manyousenyanagi", getDistanceLocation(entity.location, distance2));
        entity.dimension.createExplosion(entity.location, 3, {
          source: entity,
          breaksBlocks: true,
          causesFire: false,
          allowUnderwater: true
        });
        entity.addEffect("minecraft:slow_falling", 1 * TicksPerSecond20, {
          amplifier: 1,
          showParticles: false
        });
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 破壊殺・鬼芯八重芯
   */
  kishinyaenshin(entity) {
    try {
      if (entity instanceof Player28) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_hakai9.value" }] });
      }
      const num = system46.runInterval(() => {
        try {
          const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
          const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
          this.zyutuApplyDamage(entity, filter, 15);
          const side = getRandomInRange(-6, 6);
          const top = getRandomInRange(0, 3);
          const distance2 = getLookLocationDistance(entity.getRotation().y, 3, side, top);
          entity.dimension.spawnParticle("kurokumaft:ryuseigunkou", getDistanceLocation(entity.location, distance2));
          this.kishin(entity, side, top);
        } catch (error) {
          system46.clearRun(num);
        }
      }, 2);
      system46.waitTicks(16).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system46.clearRun(num);
      });
    } catch (error) {
    }
  }
  /**
   * 鬼神
   * @param {Entity} entity
   */
  kishin(entity, side, top) {
    const distance = getLookLocationDistance(entity.getRotation().y, 1, side, top);
    const bulet = entity.dimension.spawnEntity("kurokumaft:hakaisatu_lage_bullet", getDistanceLocation(
      {
        x: entity.location.x,
        y: entity.location.y + 0.5,
        z: entity.location.z
      },
      distance
    ));
    const projectile = bulet.getComponent(EntityComponentTypes12.Projectile);
    projectile.owner = entity;
    const shotdistance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
    projectile.shoot({
      x: shotdistance.x,
      y: 0,
      z: shotdistance.z
    });
    system46.waitTicks(10).then(() => {
      bulet.remove();
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 終式・青銀乱残光
   */
  aoginranzankou(entity) {
    try {
      if (entity instanceof Player28) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_hakai10.value" }] });
      }
      const molang = new MolangVariableMap11();
      molang.setFloat("variable.rotaion", -entity.getRotation().y);
      entity.dimension.spawnParticle("kurokumaft:rashin_aogin", entity.location, molang);
      const num = system46.runInterval(() => {
        try {
          const distance = getLookLocationDistancePitch(entity.getRotation(), 0, 0);
          const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 10, entity.id);
          entity.dimension.spawnParticle("kurokumaft:aoginranzankou", getDistanceLocation(entity.location, distance));
          this.zyutuApplyDamage(entity, filter, 15);
          for (let i = 0; i < 10; i++) {
            this.aogin(entity);
          }
        } catch (error) {
          system46.clearRun(num);
        }
      }, 5);
      system46.waitTicks(80).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system46.clearRun(num);
      });
    } catch (error) {
    }
  }
  /**
   * 青銀
   * @param {Entity} entity
   */
  aogin(entity) {
    const distance = getLookLocationDistance(entity.getRotation().y, getRandomExcludingZero(-1, 1, 0.2, 10), getRandomExcludingZero(-1, 1, 0.2, 10), getRandomExcludingZero(0, 0.85, 0, 10));
    const bulet = entity.dimension.spawnEntity("kurokumaft:hakaisatu_small_bullet", getDistanceLocation(
      {
        x: entity.location.x,
        y: entity.location.y + 0.5,
        z: entity.location.z
      },
      distance
    ));
    const projectile = bulet.getComponent(EntityComponentTypes12.Projectile);
    projectile.owner = entity;
    projectile.shoot({
      x: Math.round(distance.x * 10) / 10,
      y: Math.round(distance.y * 10) / 10,
      z: Math.round(distance.z * 10) / 10
    });
    system46.waitTicks(10).then(() => {
      bulet.remove();
    }).catch((error) => {
    }).finally(() => {
    });
  }
};

// scripts/kekkizyutu/player/character/ZyutuAkazaComponent.ts
var ZyutuAkazaComponent = class {
  hakaisatu = new Hakaisatu();
  /**
   * 変更
   * @param {Player} player
   */
  changeZyutu(player) {
    let kata = player.getProperty("kurokumaft:kekkizyutu_kata");
    const kekkizyutuObject = KekkizyutuObjects[2];
    switch (kata) {
      case kekkizyutuObject.kata[kekkizyutuObject.kata.length - 1]:
        kata = kekkizyutuObject.kata[0];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
        break;
      default:
        const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
        kata = kekkizyutuObject.kata[index + 1];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
    }
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_hakai" + kata + ".value" }] });
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    switch (kata) {
      case 1:
        this.hakaisatu.rashin(entity);
        break;
      case 2:
        this.hakaisatu.kushiki(entity);
        break;
      case 3:
        this.hakaisatu.ranshiki(entity);
        break;
      case 5:
        this.hakaisatu.kamurosakiwari(entity);
        break;
      case 6:
        this.hakaisatu.ryusengunkou(entity);
        break;
      case 7:
        this.hakaisatu.hiyuuseisenrin(entity);
        break;
      case 8:
        this.hakaisatu.manyousenyanagi(entity);
        break;
      case 9:
        this.hakaisatu.kishinyaenshin(entity);
        break;
      case 10:
        this.hakaisatu.aoginranzankou(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    switch (kata) {
      case 4:
        this.hakaisatu.messhiki(entity);
        break;
    }
  }
};

// scripts/kekkizyutu/zyutu/Obi.ts
import { Player as Player29, system as system47 } from "@minecraft/server";
var Obi = class extends ZytuComonClass {
  /**
   * 薙ぎ払い
   */
  yokonagi(entity) {
    try {
      const distance = getLookLocationDistancePitch(entity.getRotation(), 5, 0);
      const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
      this.zyutuApplyDamage(entity, filter, 5);
      system47.waitTicks(6).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 連撃
   */
  barrage(entity) {
    try {
      const num = system47.runInterval(() => {
        try {
          const distance = getLookLocationDistancePitch(entity.getRotation(), 5, 0);
          const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 5, entity.id);
          this.zyutuApplyDamage(entity, filter, 3);
        } catch (error) {
          system47.clearRun(num);
        }
      }, 2);
      system47.waitTicks(40).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system47.clearRun(num);
      });
    } catch (error) {
    }
  }
  /**
   * 帯飛ばし
   */
  shot(entity) {
    try {
      const obi = shooting(entity, "kurokumaft:obi", 0, 3, void 0, 0);
      let targethoming = false;
      const serchNum = system47.runInterval(() => {
        try {
          if (entity === void 0) {
            return;
          }
          if (obi !== void 0 && !targethoming) {
            obi.addTag(obi.id);
            entity.addTag(entity.id);
            const targets = entity.dimension.getEntities({
              excludeFamilies: [
                "inanimate",
                "animal",
                "obi"
              ],
              excludeTypes: [
                "item"
              ],
              excludeTags: [
                entity.id,
                obi.id
              ],
              location: obi.location,
              closest: 1,
              maxDistance: 32
            });
            entity.removeTag(entity.id);
            if (targets.length > 0) {
              targethoming = true;
              targets[0].addTag("hitObiTarget:" + obi.id);
              const num = system47.runInterval(() => {
                try {
                  if (entity !== void 0) {
                    const hittargets = entity.dimension.getEntities({
                      excludeFamilies: [
                        "inanimate",
                        "animal",
                        "obi"
                      ],
                      excludeTypes: [
                        "item"
                      ],
                      tags: [
                        "hitObiTarget:" + obi.id
                      ],
                      location: obi.location,
                      closest: 1
                    });
                    if (hittargets.length > 0) {
                      const target = hittargets[0];
                      const targetLoc = getDirectionVector(obi.location, target.location);
                      const tpLoc = {
                        x: obi.location.x + targetLoc.x,
                        y: obi.location.y + targetLoc.y + 1,
                        z: obi.location.z + targetLoc.z
                      };
                      obi.teleport(tpLoc, {
                        checkForBlocks: false,
                        keepVelocity: true
                      });
                      obi.applyImpulse(targetLoc);
                    } else {
                      if (obi.isValid) {
                        system47.clearRun(num);
                        obi.setDynamicProperty("hormingNum");
                        obi.remove();
                      }
                    }
                  }
                } catch (error) {
                  system47.clearRun(num);
                }
              }, 2);
              obi.setDynamicProperty("hormingNum", num);
              obi.setDynamicProperty("hitCount", 0);
            }
          }
        } catch (error) {
          system47.clearRun(serchNum);
        }
      }, 4);
      system47.waitTicks(5).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
      });
      system47.waitTicks(100).then(() => {
        if (obi.isValid) {
          system47.clearRun(serchNum);
          obi.remove();
        }
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 八重帯斬り
   */
  yaeobigiri(entity) {
    try {
      if (entity instanceof Player29) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_obi4.value" }] });
      }
      const distance = getLookLocationDistance(entity.getRotation().y, 8, 0, 2);
      const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 10, entity.id);
      this.zyutuApplyDamage(entity, filter, 10);
      system47.waitTicks(6).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/player/character/ZyutuDakiComponent.ts
var ZyutuDakiComponent = class {
  obi = new Obi();
  /**
   * 変更
   * @param {Player} player
   */
  changeZyutu(player) {
    let kata = player.getProperty("kurokumaft:kekkizyutu_kata");
    const kekkizyutuObject = KekkizyutuObjects[3];
    switch (kata) {
      case kekkizyutuObject.kata[kekkizyutuObject.kata.length - 1]:
        kata = kekkizyutuObject.kata[0];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
        break;
      default:
        const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
        kata = kekkizyutuObject.kata[index + 1];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
    }
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_obi" + kata + ".value" }] });
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    switch (kata) {
      case 1:
        this.obi.yokonagi(entity);
        break;
      case 2:
        this.obi.barrage(entity);
        break;
      case 3:
        this.obi.shot(entity);
        break;
      case 4:
        this.obi.yaeobigiri(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/zyutu/Tigama.ts
import { EntityComponentTypes as EntityComponentTypes13, EntityDamageCause as EntityDamageCause3, system as system48, TicksPerSecond as TicksPerSecond21, Player as Player30 } from "@minecraft/server";
var Tigama = class extends ZytuComonClass {
  /**
   * 飛び血鎌
   */
  tobiTigama(entity) {
    if (entity == void 0) {
      return;
    }
    try {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      if (entity.getProperty("kurokumaft:kokyu_chage") === 0) {
        if (entity instanceof Player30) {
          entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_tigama1.value" }] });
        }
        entity.setProperty("kurokumaft:kokyu_chage", 1);
        for (let i = 0; i < 5; i++) {
          this.tigamaHorming(entity, i);
        }
        system48.waitTicks(60).then(() => {
          entity.setProperty("kurokumaft:kokyu_chage", 0);
        }).catch((error) => {
        }).finally(() => {
        });
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  async tigamaHorming(entity, i) {
    if (entity == void 0) {
      return;
    }
    try {
      const kama = this.tigamaShooting(entity);
      let targethoming = false;
      const serchNum = system48.runInterval(() => {
        try {
          if (!targethoming) {
            kama.addTag(kama.id + i);
            const kamaKoc = kama.location;
            entity.addTag(entity.id);
            const targets = entity.dimension.getEntities({
              excludeFamilies: [
                "inanimate",
                "animal",
                "tigama"
              ],
              excludeTypes: [
                "item"
              ],
              excludeTags: [
                entity.id,
                kama.id + i
              ],
              location: kamaKoc,
              closest: 1,
              maxDistance: 32
            });
            entity.removeTag(entity.id);
            if (targets.length > 0) {
              targethoming = true;
              targets[0].addTag("hitObiTarget:" + kama.id + i);
              const num = system48.runInterval(() => {
                try {
                  if (!kama.isValid) {
                    system48.clearRun(serchNum);
                    system48.clearRun(num);
                    return;
                  }
                  const kamaKoc2 = kama.location;
                  const hittargets = entity.dimension.getEntities({
                    excludeFamilies: [
                      "inanimate",
                      "animal",
                      "tigama"
                    ],
                    excludeTypes: [
                      "item"
                    ],
                    tags: [
                      "hitObiTarget:" + kama.id + i
                    ],
                    location: kamaKoc2,
                    closest: 1
                  });
                  if (hittargets.length > 0) {
                    const target = hittargets[0];
                    const targetLoc = getDirectionVector(kamaKoc2, target.location);
                    const tpLoc = {
                      x: kamaKoc2.x + targetLoc.x,
                      y: kamaKoc2.y + targetLoc.y + 1,
                      z: kamaKoc2.z + targetLoc.z
                    };
                    kama.teleport(tpLoc, {
                      checkForBlocks: false,
                      keepVelocity: true
                    });
                    kama.applyImpulse(targetLoc);
                  } else {
                    if (kama.isValid) {
                      system48.clearRun(num);
                      kama.remove();
                    }
                  }
                } catch (error) {
                  system48.clearRun(num);
                }
              }, 3);
            }
          }
        } catch (error) {
          system48.clearRun(serchNum);
        }
      }, 4);
      system48.waitTicks(100).then(() => {
        if (kama.isValid) {
          system48.clearRun(serchNum);
          kama.remove();
        }
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  tigamaShooting(entity) {
    const distance = getLookLocationDistance(entity.getRotation().y, 1, getRandomInRange(-5, 5), getRandomInRange(0, 2));
    const bulet = entity.dimension.spawnEntity("kurokumaft:tobi_tigama", getDistanceLocation(
      {
        x: entity.location.x,
        y: entity.location.y,
        z: entity.location.z
      },
      distance
    ));
    const projectile = bulet.getComponent(EntityComponentTypes13.Projectile);
    projectile.owner = entity;
    const distance2 = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
    projectile.shoot({
      x: distance2.x * 1,
      y: distance2.y * 1,
      z: distance2.z * 1
    });
    return bulet;
  }
  /**
   * 跋扈跳梁
   */
  bakkotyouryou(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      if (entity instanceof Player30) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_tigama2.value" }] });
        entity.startItemCooldown("kurokumaft:tigama", 5 * TicksPerSecond21);
      }
      entity.addTag(entity.id);
      const parnum = system48.runInterval(() => {
        try {
          const filter = addOrgeFilter(0, entity.location, 6, entity.id);
          const targets = entity.dimension.getEntities(filter);
          targets.forEach((en) => {
            if (en !== void 0 && en.isValid) {
              if (en instanceof Player30) {
                if (this.gardCheck(en)) {
                  en.applyDamage(2, {
                    cause: EntityDamageCause3.entityAttack,
                    damagingEntity: entity
                  });
                }
                en.addEffect("minecraft:poison", 5, {
                  showParticles: false,
                  amplifier: 2
                });
              } else {
                en.applyDamage(3, {
                  cause: EntityDamageCause3.entityAttack,
                  damagingEntity: entity
                });
                en.addEffect("minecraft:poison", 10, {
                  showParticles: false,
                  amplifier: 5
                });
              }
            }
          });
        } catch (error) {
          system48.clearRun(parnum);
        }
      }, 2);
      system48.waitTicks(3 * TicksPerSecond21).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system48.clearRun(parnum);
        entity.removeTag(entity.id);
      });
    } catch (error) {
    }
  }
  /**
   * 円斬旋回・飛び血鎌
   */
  enzansenkai(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      if (entity.getProperty("kurokumaft:kokyu_chage") === 0) {
        if (entity instanceof Player30) {
          entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_tigama3.value" }] });
          entity.startItemCooldown("kurokumaft:tigama", 5 * TicksPerSecond21);
        }
        entity.setProperty("kurokumaft:kokyu_chage", 1);
        entity.addTag(entity.id);
        const parnum = system48.runInterval(() => {
          try {
            if (entity === void 0) {
              return;
            }
            const filter = addOrgeFilter(0, entity.location, 10, entity.id);
            const targets = entity.dimension.getEntities(filter);
            targets.forEach((en) => {
              if (en !== void 0 && en.isValid) {
                if (en instanceof Player30) {
                  if (this.gardCheck(en)) {
                    en.applyDamage(2, {
                      cause: EntityDamageCause3.entityAttack,
                      damagingEntity: entity
                    });
                  }
                } else {
                  en.applyDamage(3, {
                    cause: EntityDamageCause3.entityAttack,
                    damagingEntity: entity
                  });
                }
              }
            });
          } catch (error) {
            system48.clearRun(parnum);
            entity.removeTag(entity.id);
          }
        }, 2);
        system48.waitTicks(2 * TicksPerSecond21).then(() => {
          entity.setProperty("kurokumaft:kokyu_use", false);
          entity.setProperty("kurokumaft:kokyu_particle", false);
          this.enzanTigama(entity, -5);
          this.enzanTigama(entity, 0);
          this.enzanTigama(entity, 5);
          entity.setProperty("kurokumaft:kokyu_chage", 0);
        }).catch((error) => {
        }).finally(() => {
          system48.clearRun(parnum);
          entity.removeTag(entity.id);
        });
      }
    } catch (error) {
    }
  }
  enzanTigama(entity, side) {
    try {
      const distance = getLookLocationDistance(entity.getRotation().y, 1, side, getRandomInRange(0, 3));
      const bulet = entity.dimension.spawnEntity("kurokumaft:enzansenkai", getDistanceLocation(
        {
          x: entity.location.x,
          y: entity.location.y,
          z: entity.location.z
        },
        distance
      ));
      const projectile = bulet.getComponent(EntityComponentTypes13.Projectile);
      projectile.owner = entity;
      const distance2 = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
      projectile.shoot({
        x: distance2.x * 1,
        y: distance2.y * 1,
        z: distance2.z * 1
      });
      const num = system48.runInterval(() => {
        try {
          entity.addTag(entity.id);
          const targets = entity.dimension.getEntities({
            excludeFamilies: [
              "inanimate",
              "animal",
              "tigama"
            ],
            excludeTypes: [
              "item"
            ],
            excludeTags: [
              entity.id,
              bulet.id + side
            ],
            location: bulet.location,
            maxDistance: 4
          });
          targets.forEach((en) => {
            if (en != void 0) {
              en.applyDamage(1, {
                cause: EntityDamageCause3.entityAttack,
                damagingEntity: entity
              });
              en.addEffect("minecraft:poison", 10, {
                showParticles: false,
                amplifier: 5
              });
            }
          });
          entity.removeTag(entity.id);
        } catch (error) {
          system48.clearRun(num);
        }
      }, 2);
      system48.waitTicks(30).then(() => {
        if (bulet.isValid) {
          bulet.remove();
        }
      }).catch((error) => {
      }).finally(() => {
        system48.clearRun(num);
      });
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/player/character/ZyutuGyutaroComponent.ts
var ZyutuGyutaroComponent = class {
  tigama = new Tigama();
  /**
   * 変更
   * @param {Player} player
   */
  changeZyutu(player) {
    let kata = player.getProperty("kurokumaft:kekkizyutu_kata");
    const kekkizyutuObject = KekkizyutuObjects[4];
    switch (kata) {
      case kekkizyutuObject.kata[kekkizyutuObject.kata.length - 1]:
        kata = kekkizyutuObject.kata[0];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
        break;
      default:
        const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
        kata = kekkizyutuObject.kata[index + 1];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
    }
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_tigama" + kata + ".value" }] });
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    switch (kata) {
      case 1:
        this.tigama.tobiTigama(entity);
        break;
      case 2:
        this.tigama.bakkotyouryou(entity);
        break;
      case 3:
        this.tigama.enzansenkai(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/player/character/ZyutuKarakuComponent.ts
var ZyutuKarakuComponent = class {
  bunretu = new Bunretu();
  /**
   * 変更
   * @param {Player} player
   */
  changeZyutu(player) {
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    switch (kata) {
      case 1:
        this.bunretu.toppu(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/zyutu/Bakketu.ts
import { EntityDamageCause as EntityDamageCause4, MolangVariableMap as MolangVariableMap12, system as system49, Player as Player31 } from "@minecraft/server";
var Bakketu = class extends ZytuComonClass {
  /**
   * 爆血
   */
  bakketu(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      if (entity instanceof Player31) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_bakketu1.value" }] });
      }
      const damage = entity.getProperty("kurokumaft:attack_level");
      const dimension = entity.dimension;
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
      const point = ogreRankPoint.find((rank) => rank.rank === ogre_rank);
      const molang = new MolangVariableMap12();
      molang.setFloat("variable.kaikyu", point !== void 0 ? point.point : 1);
      entity.addTag(entity.id);
      const healthFilterOption = {
        excludeFamilies: [
          "inanimate",
          "ogre",
          "monster"
        ],
        excludeTypes: [
          "item"
        ],
        excludeTags: [
          entity.id
        ],
        location: entity.location,
        maxDistance: 10
      };
      const targets1 = dimension.getEntities(healthFilterOption);
      const fireFilterOption = {
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
          entity.id
        ],
        location: entity.location,
        maxDistance: 10
      };
      const targets2 = dimension.getEntities(fireFilterOption);
      const num = system49.runInterval(() => {
        try {
          targets1.forEach((en) => {
            if (en !== void 0 && en.isValid) {
              dimension.spawnParticle("kurokumaft:bakketu", en.location, molang);
            }
          });
          targets2.forEach((en) => {
            if (en !== void 0 && en.isValid) {
              dimension.spawnParticle("kurokumaft:bakketu", en.location, molang);
            }
          });
        } catch (error) {
          system49.clearRun(num);
        }
      }, 4);
      system49.waitTicks(30).then(() => {
        const num2 = system49.runInterval(() => {
          try {
            targets1.forEach((en) => {
              if (en !== void 0 && en.isValid) {
                dimension.spawnParticle("kurokumaft:bakketu_fire", en.location, molang);
                en.addEffect("minecraft:instant_health", damage / 2, {
                  amplifier: 2,
                  showParticles: true
                });
              }
            });
            targets2.forEach((en) => {
              if (en !== void 0 && en.isValid && entity.isValid) {
                dimension.spawnParticle("kurokumaft:bakketu_fire", en.location, molang);
                if (en instanceof Player31) {
                  if (!this.gardCheck(en)) {
                    en.applyDamage(damage, {
                      cause: EntityDamageCause4.fire,
                      damagingEntity: entity
                    });
                  }
                } else {
                  en.applyDamage(3, {
                    cause: EntityDamageCause4.fire,
                    damagingEntity: entity
                  });
                }
              }
            });
          } catch (error) {
            system49.clearRun(num2);
          }
        }, 4);
        system49.waitTicks(40).then(() => {
        }).catch((error) => {
        }).finally(() => {
          system49.clearRun(num2);
        });
      }).catch((error) => {
      }).finally(() => {
        system49.clearRun(num);
      });
      entity.removeTag(entity.id);
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/player/character/ZyutuNezukoComponent.ts
var ZyutuNezukoComponent = class {
  bakketu = new Bakketu();
  /**
   * 変更
   * @param {Player} player
   */
  changeZyutu(player) {
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    switch (kata) {
      case 1:
        this.bakketu.bakketu(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/zyutu/Koushi.ts
import { BlockVolume as BlockVolume2, system as system50, TicksPerSecond as TicksPerSecond22, Player as Player32 } from "@minecraft/server";
var Koushi = class extends ZytuComonClass {
  /**
   * 刻糸牢
   */
  kokushirou(entity) {
    try {
      if (entity instanceof Player32) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_ito1.value" }] });
      }
      entity.setProperty("kurokumaft:kokyu_use", false);
      const filter = addOrgeFilter(0, entity.location, 8, entity.id);
      entity.addTag(entity.id);
      const targets = entity.dimension.getEntities(filter);
      entity.removeTag(entity.id);
      targets.forEach((en) => {
        const volume = new BlockVolume2({ x: en.location.x - 1, y: en.location.y, z: en.location.z - 1 }, { x: en.location.x + 1, y: en.location.y + 1, z: en.location.z + 1 });
        en.dimension.fillBlocks(volume, "minecraft:web");
      });
      this.zyutuApplyDamage(entity, filter, 5);
      system50.waitTicks(20).then(() => {
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 刻糸輪転
   */
  kokushirinten(entity) {
    try {
      if (entity instanceof Player32) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_ito2.value" }] });
      }
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      const ito = shooting(entity, "kurokumaft:kokushirinten", 0, 3, void 0, 0);
      system50.waitTicks(2 * TicksPerSecond22).then(() => {
        if (ito.isValid) {
          ito.remove();
        }
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 殺目篭
   */
  ayamekago(entity) {
    try {
      if (entity instanceof Player32) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_ito3.value" }] });
      }
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      const filter = addOrgeFilter(1, entity.location, 10, entity.id);
      entity.addTag(entity.id);
      const targets = entity.dimension.getEntities(filter);
      entity.removeTag(entity.id);
      if (targets.length > 0) {
        const ayamekago = targets[0].dimension.spawnEntity("kurokumaft:ayamekago", targets[0].location);
        const num = system50.runInterval(() => {
          try {
            if (ayamekago !== void 0 && ayamekago.isValid) {
              if (targets[0] !== void 0 && targets[0].isValid) {
                targets[0].teleport(ayamekago.location);
                if (entity !== void 0) {
                  this.zyutuApplyDamage(entity, filter, 5);
                }
              } else {
                system50.clearRun(num);
                ayamekago.remove();
              }
            }
          } catch (error) {
            system50.clearRun(num);
          }
        }, 2);
        system50.waitTicks(40).then(() => {
          if (ayamekago !== void 0 && ayamekago.isValid) {
            ayamekago.remove();
          }
        }).catch((error) => {
        }).finally(() => {
          system50.clearRun(num);
        });
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/player/character/ZyutuRuiComponent.ts
var ZyutuRuiComponent = class {
  koushi = new Koushi();
  /**
   * 変更
   * @param {Player} player
   */
  changeZyutu(player) {
    let kata = player.getProperty("kurokumaft:kekkizyutu_kata");
    const kekkizyutuObject = KekkizyutuObjects[1];
    switch (kata) {
      case kekkizyutuObject.kata[kekkizyutuObject.kata.length - 1]:
        kata = kekkizyutuObject.kata[0];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
        break;
      default:
        const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
        kata = kekkizyutuObject.kata[index + 1];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
    }
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_ito" + kata + ".value" }] });
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    switch (kata) {
      case 1:
        this.koushi.kokushirou(entity);
        break;
      case 2:
        this.koushi.kokushirinten(entity);
        break;
      case 3:
        this.koushi.ayamekago(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/player/character/ZyutuSekidoComponent.ts
var ZyutuSekidoComponent = class {
  bunretu = new Bunretu();
  /**
   * 変更
   * @param {Player} player
   */
  changeZyutu(player) {
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    switch (kata) {
      case 1:
        this.bunretu.ikazuti(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/player/character/ZyutuUrogiComponent.ts
var ZyutuUrogiComponent = class {
  bunretu = new Bunretu();
  /**
   * 変更
   * @param {Player} player
   */
  changeZyutu(player) {
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    switch (kata) {
      case 1:
        this.bunretu.ultrasonic(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/player/character/ZyutuZouhakutenComponent.ts
var ZyutuZouhakutenComponent = class {
  bunretu = new Bunretu();
  /**
   * 変更
   * @param {Player} player
   */
  changeZyutu(player) {
    let kata = player.getProperty("kurokumaft:kekkizyutu_kata");
    const kekkizyutuObject = KekkizyutuObjects[9];
    switch (kata) {
      case kekkizyutuObject.kata[kekkizyutuObject.kata.length - 1]:
        kata = kekkizyutuObject.kata[0];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
        break;
      default:
        const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
        kata = kekkizyutuObject.kata[index + 1];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
    }
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_zouhakuten" + kata + ".value" }] });
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    switch (kata) {
      case 1:
        this.bunretu.tokage(entity);
        break;
      case 2:
        this.bunretu.kyoumeiraisatu(entity);
        break;
      case 3:
        this.bunretu.kyouatumeiha(entity);
        break;
      case 4:
        this.bunretu.mukengouzyu(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/mob/TokageComponent.ts
var TokageComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip");
        if (nitirintou_equip) {
          entity.setProperty("kurokumaft:kokyu_use", true);
          entity.setProperty("kurokumaft:kokyu_particle", true);
          this.useAttackZyutu(entity);
        }
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  async useAttackZyutu(entity) {
    try {
      const bunretu = new Bunretu();
      bunretu.ultrasonic(entity);
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/mob/DakiComponent.ts
import { system as system51 } from "@minecraft/server";
var dakiKekkizyutuLists = weightChoice([
  { item: 1, weight: 30 },
  { item: 2, weight: 20 },
  { item: 3, weight: 40 },
  { item: 4, weight: 10 }
]);
var DakiComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = dakiKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const obi = new Obi();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          obi.yokonagi(entity);
          system51.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          obi.barrage(entity);
          system51.waitTicks(80).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          obi.yaeobigiri(entity);
          system51.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          obi.yaeobigiri(entity);
          system51.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/mob/GyutaroComponent.ts
import { system as system52, TicksPerSecond as TicksPerSecond23 } from "@minecraft/server";
var gyutaroKekkizyutuLists = weightChoice([
  { item: 1, weight: 50 },
  { item: 2, weight: 40 },
  { item: 3, weight: 10 }
]);
var GyutaroComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = gyutaroKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const kama = new Tigama();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          kama.tobiTigama(entity);
          system52.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          kama.bakkotyouryou(entity);
          system52.waitTicks(3 * TicksPerSecond23).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          system52.runTimeout(() => {
            kama.enzansenkai(entity);
          }, 30);
          system52.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/mob/RuiComponent.ts
import { system as system53 } from "@minecraft/server";
var ruiKekkizyutuLists = weightChoice([
  { item: 1, weight: 50 },
  { item: 2, weight: 40 },
  { item: 3, weight: 10 }
]);
var RuiComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = ruiKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const koushi = new Koushi();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          koushi.kokushirou(entity);
          system53.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          koushi.kokushirinten(entity);
          system53.waitTicks(80).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          koushi.ayamekago(entity);
          system53.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/mob/NezukoComponent.ts
import { system as system54 } from "@minecraft/server";
var nezukoKekkizyutuLists = weightChoice([
  { item: 1, weight: 100 }
]);
var NezukoComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = nezukoKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const bakketu = new Bakketu();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          bakketu.bakketu(entity);
          system54.waitTicks(80).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/mob/AkazaComponent.ts
import { system as system55 } from "@minecraft/server";
var akazaKekkizyutuLists = weightChoice([
  { item: 2, weight: 5 },
  { item: 3, weight: 15 },
  { item: 4, weight: 10 },
  { item: 5, weight: 10 },
  { item: 6, weight: 15 },
  { item: 7, weight: 15 },
  { item: 8, weight: 10 },
  { item: 9, weight: 5 },
  { item: 10, weight: 5 }
]);
var AkazaComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      if (entity.getProperty("kurokumaft:rashin")) {
        const num = akazaKekkizyutuLists.pick();
        entity.setProperty("kurokumaft:kekkizyutu_kata", num);
        this.kokyuUse(entity, num);
      } else {
        entity.setProperty("kurokumaft:kekkizyutu_kata", 1);
        this.kokyuUse(entity, 1);
      }
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const hakaisatu = new Hakaisatu();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          hakaisatu.rashin(entity);
          entity.setProperty("kurokumaft:rashin", true);
          system55.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          hakaisatu.kushiki(entity);
          system55.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          hakaisatu.ranshiki(entity);
          system55.waitTicks(80).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          hakaisatu.kamurosakiwari(entity);
          system55.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          hakaisatu.ryusengunkou(entity);
          system55.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          hakaisatu.hiyuuseisenrin(entity);
          system55.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          hakaisatu.manyousenyanagi(entity);
          system55.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 8:
          entity.triggerEvent("kurokumaft:attack_stop");
          hakaisatu.kishinyaenshin(entity);
          system55.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 9:
          entity.triggerEvent("kurokumaft:attack_stop");
          system55.runTimeout(() => {
            hakaisatu.messhiki(entity);
          }, 20);
          system55.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 10:
          entity.triggerEvent("kurokumaft:attack_stop");
          hakaisatu.aoginranzankou(entity);
          system55.waitTicks(80).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/mob/AizetuComponent.ts
import { system as system56 } from "@minecraft/server";
var aizetuKekkizyutuLists = weightChoice([
  { item: 1, weight: 100 }
]);
var AizetuComponent = class {
  startMonitoring(entity) {
    if (entity !== void 0 && entity.isValid) {
      entity.setProperty("kurokumaft:kokyu_use", true);
      entity.setProperty("kurokumaft:kokyu_particle", true);
      this.useAttackZyutu(entity);
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    const num = aizetuKekkizyutuLists.pick();
    entity.setProperty("kurokumaft:kekkizyutu_kata", num);
    this.kokyuUse(entity, num);
  }
  kokyuUse(entity, kata) {
    const bunretu = new Bunretu();
    try {
      if (entity.isValid) {
        switch (kata) {
          case 1:
            entity.triggerEvent("kurokumaft:attack_stop");
            bunretu.shitotu(entity);
            system56.waitTicks(80).then(() => {
              entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
              entity.triggerEvent("kurokumaft:kekkizyutu_end");
            }).catch((error) => {
            });
            break;
        }
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/mob/KarakuComponent.ts
import { system as system57 } from "@minecraft/server";
var karakuKekkizyutuLists = weightChoice([
  { item: 1, weight: 100 }
]);
var KarakuComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = karakuKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const bunretu = new Bunretu();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          bunretu.toppu(entity);
          system57.waitTicks(80).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/mob/SekidoComponent.ts
import { system as system58 } from "@minecraft/server";
var sekidoKekkizyutuLists = weightChoice([
  { item: 1, weight: 100 }
]);
var SekidoComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = sekidoKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const bunretu = new Bunretu();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          bunretu.ikazuti(entity);
          system58.waitTicks(80).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/mob/UrogiComponent.ts
import { system as system59 } from "@minecraft/server";
var urogiKekkizyutuLists = weightChoice([
  { item: 1, weight: 100 }
]);
var UrogiComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = urogiKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const bunretu = new Bunretu();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          bunretu.ultrasonic(entity);
          system59.waitTicks(80).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/mob/ZouhakutenComponent.ts
import { system as system60 } from "@minecraft/server";
var zouhakutenKekkizyutuLists = weightChoice([
  { item: 1, weight: 50 },
  { item: 2, weight: 20 },
  { item: 3, weight: 20 },
  { item: 4, weight: 10 }
]);
var ZouhakutenComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = zouhakutenKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const bunretu = new Bunretu();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          bunretu.tokage(entity);
          system60.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          bunretu.kyouatumeiha(entity);
          system60.waitTicks(40).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          bunretu.kyoumeiraisatu(entity);
          system60.waitTicks(40).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          bunretu.mukengouzyu(entity);
          system60.waitTicks(80).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/mob/KokushibouComponent.ts
import { system as system62 } from "@minecraft/server";

// scripts/kekkizyutu/zyutu/TukiNoKataZyutu.ts
import { EntityComponentTypes as EntityComponentTypes14, MolangVariableMap as MolangVariableMap13, system as system61, Player as Player33 } from "@minecraft/server";
var TukiNoKataZyutu = class extends ZytuComonClass {
  /**
   * 壱ノ型 闇月・宵の宮
   */
  ichiNoKata(entity) {
    entity.setProperty("kurokumaft:kokyu_use", false);
    if (entity instanceof Player33) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu1.value" }] });
    }
    const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0.5);
    const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
    this.zyutuApplyDamage(entity, filter, 5);
    const molang = new MolangVariableMap13();
    molang.setFloat("variable.tuki_rotaion", -entity.getRotation().y);
    molang.setFloat("variable.tuki_size_x", 5);
    molang.setFloat("variable.tuki_size_y", 2.5);
    entity.dimension.spawnParticle("kurokumaft:mikazuki5_particle", getDistanceLocation(entity.location, distance), molang);
    system61.waitTicks(5).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 弐ノ型 珠華ノ弄月
   */
  niNoKata(entity) {
    if (entity instanceof Player33) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu2.value" }] });
    }
    const molang = new MolangVariableMap13();
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    let side = -3;
    let tuki_rotaion = 90;
    const num = system61.runInterval(() => {
      try {
        molang.setFloat("variable.tuki_rotaion", tuki_rotaion);
        const distance = getLookLocationDistance(entity.getRotation().y, 3, 0, 0.5);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
        this.zyutuApplyDamage(entity, filter, 5);
        const pdistance = getLookLocationDistance(entity.getRotation().y, 2.5, side, 1);
        entity.dimension.spawnParticle("kurokumaft:mikazuki_sweep_particle", getDistanceLocation(entity.location, pdistance), molang);
        side = side + 3;
        tuki_rotaion = tuki_rotaion - 90;
      } catch (error) {
        system61.clearRun(num);
      }
    }, 5);
    system61.waitTicks(15).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system61.clearRun(num);
    });
  }
  /**
   * 参ノ型 厭忌月・銷り
   */
  sanNoKata(entity) {
    if (entity instanceof Player33) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu3.value" }] });
    }
    const molang = new MolangVariableMap13();
    molang.setFloat("variable.tuki_size_x", 5);
    molang.setFloat("variable.tuki_size_y", 2.5);
    const distance = getLookLocationDistance(entity.getRotation().y, 2.5, -1.5, 1);
    const lfilter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity.id);
    this.zyutuApplyDamage(entity, lfilter, 5);
    molang.setFloat("variable.tuki_rotaion", 0);
    entity.dimension.spawnParticle("kurokumaft:mikazuki_sweep_particle", getDistanceLocation(entity.location, distance), molang);
    system61.waitTicks(5).then(() => {
      const distance2 = getLookLocationDistance(entity.getRotation().y, 2.5, 1.5, 1);
      const rfilter = addOrgeFilter(0, getDistanceLocation(entity.location, distance2), 3.5, entity.id);
      this.zyutuApplyDamage(entity, rfilter, 5);
      molang.setFloat("variable.tuki_rotaion", 180);
      entity.dimension.spawnParticle("kurokumaft:mikazuki_sweep_particle", getDistanceLocation(entity.location, distance2), molang);
    }).catch((error) => {
    }).finally(() => {
    });
    system61.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 伍ノ型 月魄災渦
   */
  goNoKata(entity) {
    if (entity instanceof Player33) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu5.value" }] });
    }
    const molang = new MolangVariableMap13();
    const num = system61.runInterval(() => {
      try {
        const y = getRandomInRange(0.1, 2.5);
        const distance = getLookLocationDistance(entity.getRotation().y, 3.5, 0, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);
        this.zyutuApplyDamage(entity, filter, 5);
        const pdistance = getLookLocationDistance(entity.getRotation().y, 6.5, 0, y);
        molang.setFloat("variable.tuki_rotaion", -entity.getRotation().y);
        molang.setFloat("variable.tuki_size_x", getRandomInRange(8, 12));
        molang.setFloat("variable.tuki_size_y", getRandomInRange(4, 8));
        entity.dimension.spawnParticle("kurokumaft:mikazuki5_particle", getDistanceLocation(entity.location, pdistance), molang);
      } catch (error) {
        system61.clearRun(num);
      }
    }, 2);
    system61.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system61.clearRun(num);
    });
  }
  /**
   * 陸ノ型 常夜孤月・無間
   */
  rokuNoKata(entity) {
    if (entity instanceof Player33) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu6.value" }] });
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap13();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    const parlo = getForwardPosition(entity.location, entity.getRotation().y, 4);
    entity.dimension.spawnParticle("kurokumaft:mikazuki_box_particle", parlo, molang);
    const num = system61.runInterval(() => {
      try {
        const side = getRandomInRange(-5, 5);
        const tuki_rotaion = getRandomInRange(-90, 90);
        molang.setFloat("variable.tuki_rotaion", tuki_rotaion);
        const distance = getLookLocationDistance(entity.getRotation().y, 6, 0, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
        this.zyutuApplyDamage(entity, filter, 5);
        const pdistance = getLookLocationDistance(entity.getRotation().y, 6, side, 1);
        entity.dimension.spawnParticle("kurokumaft:mikazuki_sweep_particle", getDistanceLocation(entity.location, pdistance), molang);
      } catch (error) {
        system61.clearRun(num);
      }
    }, 2);
    system61.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system61.clearRun(num);
    });
  }
  /**
   * 漆ノ型 厄鏡・月映え
   */
  shitiNoKata(entity) {
    if (entity instanceof Player33) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu7.value" }] });
    }
    const front = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
    this.tukibae(entity, entity.location, front);
    const right1 = getLookLocationDistance(entity.getRotation().y, 1, 0.5, 0);
    this.tukibae(entity, entity.location, right1);
    const right2 = getLookLocationDistance(entity.getRotation().y, 1, 1, 0);
    this.tukibae(entity, entity.location, right2);
    const left1 = getLookLocationDistance(entity.getRotation().y, 1, -0.5, 0);
    this.tukibae(entity, entity.location, left1);
    const left2 = getLookLocationDistance(entity.getRotation().y, 1, -1, 0);
    this.tukibae(entity, entity.location, left2);
    const num = system61.runInterval(() => {
      try {
        const distance = getLookLocationDistancePitch(entity.getRotation(), 6, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
        this.zyutuApplyDamage(entity, filter, 5);
      } catch (error) {
        system61.clearRun(num);
      }
    }, 2);
    system61.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system61.clearRun(num);
    });
  }
  /**
   * 月映え
   */
  async tukibae(entity, location, distance) {
    const tuki = entity.dimension.spawnEntity("kurokumaft:mikazuki_blead", {
      x: location.x + distance.x,
      y: location.y,
      z: location.z + distance.z
    });
    const projectile = tuki.getComponent(EntityComponentTypes14.Projectile);
    projectile.owner = entity;
    projectile.shoot({
      x: distance.x * 3,
      y: 0,
      z: distance.z * 3
    });
    const num = system61.runInterval(() => {
      try {
        const filter = addOrgeFilter(0, location, 2, entity.id);
        const exes = filter.excludeFamilies;
        if (exes !== void 0) {
          exes.push("tuki_blead");
        }
        this.zyutuApplyDamage(entity, filter, 5);
      } catch (error) {
        system61.clearRun(num);
      }
    }, 2);
    system61.waitTicks(20).then(() => {
      if (tuki.isValid) {
        tuki.remove();
      }
    }).catch((error) => {
    }).finally(() => {
      system61.clearRun(num);
    });
  }
  /**
   * 捌ノ型 月龍輪尾
   */
  hachiNoKata(entity) {
    if (entity instanceof Player33) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu8.value" }] });
    }
    const molang = new MolangVariableMap13();
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    const distance = getLookLocationDistance(entity.getRotation().y, 6.5, 0, 0);
    const disLotation = getDistanceLocation(entity.location, distance);
    molang.setFloat("variable.tuki_rotaion", -entity.getRotation().y);
    molang.setFloat("variable.tuki_size_x", getRandomInRange(8, 12));
    molang.setFloat("variable.tuki_size_y", getRandomInRange(4, 8));
    entity.dimension.spawnParticle("kurokumaft:mikazuki8_particle", disLotation, molang);
    const filter = addOrgeFilter(0, disLotation, 4, entity.id);
    this.zyutuApplyDamage(entity, filter, 10);
    system61.waitTicks(15).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 玖ノ型 降り月・連面
   */
  kuNoKata(entity) {
    if (entity instanceof Player33) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu9.value" }] });
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap13();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    let tuki_rotaion = 75;
    const num = system61.runInterval(() => {
      try {
        const side = getRandomInRange(-5, 5);
        molang.setFloat("variable.tuki_rotaion", tuki_rotaion);
        const distance = getLookLocationDistance(entity.getRotation().y, 6, 0, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
        this.zyutuApplyDamage(entity, filter, 6);
        const pdistance = getLookLocationDistance(entity.getRotation().y, 6, side, 1);
        entity.dimension.spawnParticle("kurokumaft:mikazuki_sweep_particle", getDistanceLocation(entity.location, pdistance), molang);
        tuki_rotaion = -tuki_rotaion;
      } catch (error) {
        system61.clearRun(num);
      }
    }, 2);
    system61.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system61.clearRun(num);
    });
  }
  /**
   * 拾ノ型 穿面斬・蘿月
   */
  zyuNoKata(entity) {
    if (entity instanceof Player33) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu10.value" }] });
    }
    const ldistance = getLookLocationDistance(entity.getRotation().y, 1, -1.5, 0);
    this.ragetu(entity, entity.location, ldistance);
    const rdistance = getLookLocationDistance(entity.getRotation().y, 1, 1.5, 0);
    this.ragetu(entity, entity.location, rdistance);
    system61.waitTicks(15).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 蘿月
   */
  async ragetu(entity, location, distance) {
    const tuki = entity.dimension.spawnEntity("kurokumaft:mikazuki_ragetu", {
      x: location.x + distance.x,
      y: location.y,
      z: location.z + distance.z
    });
    const front = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
    const projectile = tuki.getComponent(EntityComponentTypes14.Projectile);
    projectile.owner = entity;
    projectile.shoot({
      x: front.x * 3,
      y: 0,
      z: front.z * 3
    });
    const num = system61.runInterval(() => {
      try {
        const filter = addOrgeFilter(0, location, 2, entity.id);
        const exes = filter.excludeFamilies;
        if (exes !== void 0) {
          exes.push("tuki_blead");
        }
        this.zyutuApplyDamage(entity, filter, 5);
      } catch (error) {
        system61.clearRun(num);
      }
    }, 2);
    system61.waitTicks(20).then(() => {
      if (tuki.isValid) {
        tuki.remove();
      }
    }).catch((error) => {
    }).finally(() => {
      system61.clearRun(num);
    });
  }
  /**
   * 拾肆ノ型 兇変・天満繊月
   */
  zyushiNoKata(entity) {
    if (entity instanceof Player33) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu14.value" }] });
    }
    const molang = new MolangVariableMap13();
    const num = system61.runInterval(() => {
      try {
        const y = getRandomInRange(0.1, 2.5);
        const distance = getLookLocationDistance(entity.getRotation().y, 5, 0, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
        this.zyutuApplyDamage(entity, filter, 8);
        const pdistance = getLookLocationDistance(entity.getRotation().y, 8, 0, y);
        molang.setFloat("variable.tuki_rotaion", -entity.getRotation().y);
        molang.setFloat("variable.tuki_size_x", getRandomInRange(12, 16));
        molang.setFloat("variable.tuki_size_y", getRandomInRange(8, 12));
        entity.dimension.spawnParticle("kurokumaft:mikazuki5_particle", getDistanceLocation(entity.location, pdistance), molang);
      } catch (error) {
        system61.clearRun(num);
      }
    }, 2);
    system61.waitTicks(40).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system61.clearRun(num);
    });
  }
  /**
   * 拾陸ノ型 月虹・片割れ月
   */
  zyurokuNoKata(entity) {
    if (entity instanceof Player33) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kokyu16.value" }] });
    }
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap13();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    molang.setFloat("variable.tuki_size_x", 8);
    molang.setFloat("variable.tuki_size_y", 4);
    let tuki_rotaion = 90;
    const num = system61.runInterval(() => {
      try {
        const side = getRandomInRange(-5, 5);
        molang.setFloat("variable.tuki_rotaion", tuki_rotaion);
        const distance = getLookLocationDistance(entity.getRotation().y, 8, 0, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
        this.zyutuApplyDamage(entity, filter, 8);
        const pdistance = getLookLocationDistance(entity.getRotation().y, 8, side, 1);
        entity.dimension.spawnParticle("kurokumaft:mikazuki_sweep_particle", getDistanceLocation(entity.location, pdistance), molang);
        tuki_rotaion = -tuki_rotaion;
      } catch (error) {
        system61.clearRun(num);
      }
    }, 2);
    system61.waitTicks(40).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system61.clearRun(num);
    });
  }
};

// scripts/kekkizyutu/mob/KokushibouComponent.ts
var kokushibouKekkizyutuLists = weightChoice([
  { item: 1, weight: 20 },
  { item: 2, weight: 15 },
  { item: 3, weight: 15 },
  { item: 5, weight: 10 },
  { item: 6, weight: 10 },
  { item: 7, weight: 5 },
  { item: 8, weight: 5 },
  { item: 9, weight: 5 },
  { item: 10, weight: 5 },
  { item: 14, weight: 5 },
  { item: 16, weight: 5 }
]);
var KokushibouComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  async hitAttackZyutu(entity) {
    const attack = new NomalAttack();
    for (let i = 0; i < 4; i++) {
      attack.oneAttack(entity, void 0);
      await system62.waitTicks(2.5);
    }
    entity.setProperty("kurokumaft:kokyu_attack", false);
  }
  useAttackZyutu(entity) {
    try {
      const num = kokushibouKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const tuki = new TukiNoKataZyutu();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.ichiNoKata(entity);
          system62.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.niNoKata(entity);
          system62.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.sanNoKata(entity);
          system62.waitTicks(15).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.goNoKata(entity);
          system62.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.rokuNoKata(entity);
          system62.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.shitiNoKata(entity);
          system62.waitTicks(15).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 8:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.hachiNoKata(entity);
          system62.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 9:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.kuNoKata(entity);
          system62.waitTicks(25).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 10:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.zyuNoKata(entity);
          system62.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 14:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.zyushiNoKata(entity);
          system62.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 16:
          entity.triggerEvent("kurokumaft:attack_stop");
          tuki.zyurokuNoKata(entity);
          system62.waitTicks(50).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/player/character/ZyutuKokushibouComponent.ts
var ZyutuKokushibouComponent = class {
  tuki = new TukiNoKataZyutu();
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeZyutu(player) {
    const kata = player.getProperty("kurokumaft:kekkizyutu_kata");
    const kekkizyutuObject = KekkizyutuObjects[11];
    switch (kata) {
      case kekkizyutuObject.kata[kekkizyutuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kata" + kekkizyutuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:tuki_kata" + kekkizyutuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackZyutu(player) {
    const attack = new NomalAttack();
    attack.oneAttack(player, void 0);
  }
  /**
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    try {
      switch (kata) {
        case 2:
          this.tuki.niNoKata(entity);
          break;
        case 3:
          this.tuki.sanNoKata(entity);
          break;
        case 5:
          this.tuki.goNoKata(entity);
          break;
        case 6:
          this.tuki.rokuNoKata(entity);
          break;
        case 7:
          this.tuki.shitiNoKata(entity);
          break;
        case 8:
          this.tuki.hachiNoKata(entity);
          break;
        case 9:
          this.tuki.kuNoKata(entity);
          break;
        case 10:
          this.tuki.zyuNoKata(entity);
          break;
        case 14:
          this.tuki.zyushiNoKata(entity);
          break;
        case 16:
          this.tuki.zyurokuNoKata(entity);
          break;
      }
    } catch (error) {
    }
  }
  releaseAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    try {
      switch (kata) {
        case 1:
          this.tuki.ichiNoKata(entity);
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/zyutu/Kokurai.ts
import { MolangVariableMap as MolangVariableMap14, system as system63, TicksPerSecond as TicksPerSecond24, Player as Player34 } from "@minecraft/server";
var Kokurai = class extends ZytuComonClass {
  /**
   * 弐ノ型 稲魂
   */
  niNoKata(entity) {
    if (entity instanceof Player34) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu2.value" }] });
    }
    const num = system63.runInterval(() => {
      try {
        const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
        this.zyutuApplyDamage(entity, filter, 5);
        this.kokyuApplyEffect(entity, filter, 15 * TicksPerSecond24, 1, "minecraft:wither");
      } catch (error) {
        system63.clearRun(num);
      }
    }, 4);
    system63.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system63.clearRun(num);
    });
  }
  /**
   * 参ノ型 聚蚊成雷
   */
  sanNoKata(entity) {
    if (entity instanceof Player34) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu3.value" }] });
    }
    const num = system63.runInterval(() => {
      try {
        const filter = addOrgeFilter(0, entity.location, 4, entity.id);
        this.zyutuApplyDamage(entity, filter, 5);
        this.kokyuApplyEffect(entity, filter, 15 * TicksPerSecond24, 1, "minecraft:wither");
      } catch (error) {
        system63.clearRun(num);
      }
    }, 2);
    const distance = getLookLocationDistance(entity.getRotation().y, 4, -4, 0);
    entity.applyKnockback({ x: distance.x, z: distance.z }, 0);
    entity.teleport(entity.location, {
      keepVelocity: false,
      rotation: {
        x: 0,
        y: entity.getRotation().y + 90
      }
    });
    const num2 = system63.runInterval(() => {
      try {
        const distance2 = getLookLocationDistance(entity.getRotation().y, 4, -4, 0);
        entity.applyKnockback({ x: distance2.x, z: distance2.z }, 0);
        entity.teleport(entity.location, {
          keepVelocity: false,
          rotation: {
            x: 0,
            y: entity.getRotation().y - 90
          }
        });
      } catch (error) {
        system63.clearRun(num2);
      }
    }, 5);
    system63.waitTicks(30).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system63.clearRun(num);
      system63.clearRun(num2);
    });
  }
  /**
   * 肆ノ型 遠雷
   */
  shiNoKata(entity) {
    if (entity instanceof Player34) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu4.value" }] });
      entity.startItemCooldown("kurokumaft:kaminari", 2 * TicksPerSecond24);
    }
    entity.setProperty("kurokumaft:kokyu_use", false);
    const kaikyuNum = entity.getProperty("kurokumaft:kaikyu");
    const molang = new MolangVariableMap14();
    molang.setFloat("variable.kaikyu", kaikyuNum);
    const num = system63.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, 8, 0, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
        this.zyutuApplyDamage(entity, filter, 5);
        this.kokyuApplyEffect(entity, filter, 15 * TicksPerSecond24, 1, "minecraft:wither");
        entity.dimension.spawnParticle("kurokumaft:kokurai4_particle", entity.location, molang);
      } catch (error) {
        system63.clearRun(num);
      }
    }, 4);
    system63.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system63.clearRun(num);
    });
  }
  /**
   * 伍ノ型 熱界雷
   */
  goNoKata(entity) {
    if (entity instanceof Player34) {
      entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu5.value" }] });
      entity.startItemCooldown("kurokumaft:kaminari", 2 * TicksPerSecond24);
    }
    const num = system63.runInterval(() => {
      try {
        entity.dimension.spawnParticle("kurokumaft:kokurai5_particle", entity.location);
      } catch (error) {
        system63.clearRun(num);
      }
    }, 2);
    const filter = addOrgeFilter(1, entity.location, 6, entity.id);
    this.zyutuApplyDamage(entity, filter, 5);
    this.kokyuApplyEffect(entity, filter, 15 * TicksPerSecond24, 1, "minecraft:wither");
    system63.waitTicks(20).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system63.clearRun(num);
    });
    const dragon = shooting(entity, "kurokumaft:kuro_dragon_small", 0, 3, "kurokumaft:lage_damage", 0);
    system63.waitTicks(2 * TicksPerSecond24).then(() => {
      if (dragon.isValid) {
        dragon.remove();
      }
    }).catch((error) => {
    }).finally(() => {
    });
  }
  /**
   * 陸ノ型 電轟雷轟
   */
  rokuNoKata(entity) {
    try {
      if (entity instanceof Player34) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kokyu6.value" }] });
        entity.startItemCooldown("kurokumaft:kaminari", 2 * TicksPerSecond24);
      }
      const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
      entity.applyKnockback({ x: distance.x, z: distance.z }, 0.8);
      entity.addEffect("minecraft:slow_falling", 1 * TicksPerSecond24, {
        amplifier: 1,
        showParticles: false
      });
      const nowloc = entity.location;
      const num = system63.runInterval(() => {
        try {
          entity.dimension.spawnParticle("kurokumaft:kokurai6_particle", nowloc);
        } catch (error) {
          console.error(error);
          system63.clearRun(num);
        }
      }, 1);
      const filter = addOrgeFilter(1, entity.location, 15, entity.id);
      this.zyutuApplyDamage(entity, filter, 5);
      this.kokyuApplyEffect(entity, filter, 15 * TicksPerSecond24, 1, "minecraft:wither");
      system63.waitTicks(10).then(() => {
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        system63.clearRun(num);
      });
    } catch (error) {
      console.error(error);
    } finally {
      system63.waitTicks(30).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
      }).catch((error) => {
        console.error(error);
      });
    }
  }
};

// scripts/kekkizyutu/player/character/ZyutuKaigakuComponent.ts
var ZyutuKaigakuComponent = class {
  kokurai = new Kokurai();
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeZyutu(player) {
    const kata = player.getProperty("kurokumaft:kekkizyutu_kata");
    const kekkizyutuObject = KekkizyutuObjects[12];
    switch (kata) {
      case kekkizyutuObject.kata[kekkizyutuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kata" + kekkizyutuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kaminari_kata" + kekkizyutuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Player} player
   */
  hitAttackZyutu(player) {
    const attack = new NomalAttack();
    attack.oneAttack(player, void 0);
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    try {
      switch (kata) {
        case 2:
          this.kokurai.niNoKata(entity);
          break;
        case 3:
          this.kokurai.sanNoKata(entity);
          break;
        case 5:
          this.kokurai.goNoKata(entity);
          break;
        case 6:
          this.kokurai.rokuNoKata(entity);
          break;
      }
    } catch (error) {
    }
  }
  releaseAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    try {
      switch (kata) {
        case 4:
          this.kokurai.shiNoKata(entity);
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/zyutu/Koori.ts
import { system as system64, TicksPerSecond as TicksPerSecond25, Player as Player35, world as world9, EntityComponentTypes as EntityComponentTypes15, EntityDamageCause as EntityDamageCause5 } from "@minecraft/server";
var Koori = class extends ZytuComonClass {
  /**
   * 蓮葉氷
   */
  hasuhagoori(entity) {
    try {
      if (entity instanceof Player35) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_koori1.value" }] });
      }
      const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
      const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
      this.zyutuApplyDamage(entity, filter, 5);
      for (let i = -3; i <= 3; i = i + 3) {
        const distance2 = getLookLocationDistance(entity.getRotation().y, 4, i, 0);
        entity.dimension.setBlockType(getDistanceLocation(entity.location, distance2), "kurokumaft:hasuhagoori_block");
      }
      system64.waitTicks(12).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 枯園垂り
   */
  karesonosizuri(entity) {
    try {
      if (entity instanceof Player35) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_koori2.value" }] });
      }
      const num = system64.runInterval(() => {
        try {
          const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
          const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);
          this.zyutuApplyDamage(entity, filter, 5);
        } catch (error) {
          system64.clearRun(num);
        }
      }, 2);
      system64.waitTicks(2 * TicksPerSecond25).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system64.clearRun(num);
      });
    } catch (error) {
    }
  }
  /**
   * 凍て曇
   */
  itegumori(entity) {
    try {
      if (entity instanceof Player35) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_koori3.value" }] });
      }
      const num = system64.runInterval(() => {
        try {
          const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
          const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
          this.zyutuApplyDamage(entity, filter, 5);
          this.kokyuApplyEffect(entity, filter, 20, 2, "minecraft:weakness");
        } catch (error) {
          system64.clearRun(num);
        }
      }, 2);
      entity.dimension.spawnParticle("kurokumaft:itegumori_particle", entity.location);
      system64.waitTicks(1 * TicksPerSecond25).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system64.clearRun(num);
      });
    } catch (error) {
    }
  }
  /**
   * 蔓蓮華
   */
  tururenge(entity) {
    try {
      if (entity instanceof Player35) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_koori4.value" }] });
      }
      let owner = void 0;
      const tameable = entity.getComponent(EntityComponentTypes15.Tameable);
      if (tameable !== void 0 && tameable.isTamed) {
        owner = tameable.tamedToPlayer;
      }
      const left = getLookLocationDistance(entity.getRotation().y, 2, 2, 0);
      const hasu1 = entity.dimension.spawnEntity("kurokumaft:hasuhagoori", getDistanceLocation(entity.location, left));
      const renge1 = new hasuRenge(hasu1, entity, owner);
      renge1.startMonitoring();
      const center = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
      const hasu2 = entity.dimension.spawnEntity("kurokumaft:hasuhagoori", getDistanceLocation(entity.location, center));
      const renge2 = new hasuRenge(hasu2, entity, owner);
      renge2.startMonitoring();
      const right = getLookLocationDistance(entity.getRotation().y, 2, -2, 0);
      const hasu3 = entity.dimension.spawnEntity("kurokumaft:hasuhagoori", getDistanceLocation(entity.location, right));
      const renge3 = new hasuRenge(hasu3, entity, owner);
      renge3.startMonitoring();
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    } catch (error) {
    }
  }
  /**
   * 寒烈の白姫
   */
  kanretunosirahime(entity) {
    try {
      if (entity instanceof Player35) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_koori5.value" }] });
      }
      const left = getLookLocationDistance(entity.getRotation().y, 2, 2, 0);
      const shirahime1 = entity.dimension.spawnEntity("kurokumaft:kanretunosirahime", getDistanceLocation(entity.location, left));
      const tameable = shirahime1.getComponent(EntityComponentTypes15.Tameable);
      if (!tameable.isTamed) {
        if (entity instanceof Player35) {
          tameable.tame(entity);
        }
      }
      const right = getLookLocationDistance(entity.getRotation().y, 2, -2, 0);
      const shirahime2 = entity.dimension.spawnEntity("kurokumaft:kanretunosirahime", getDistanceLocation(entity.location, right));
      const tameable2 = shirahime2.getComponent(EntityComponentTypes15.Tameable);
      if (!tameable2.isTamed) {
        if (entity instanceof Player35) {
          tameable2.tame(entity);
        }
      }
      system64.waitTicks(6).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 冬ざれ氷柱
   */
  fuyuzareturara(entity) {
    try {
      if (entity instanceof Player35) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_koori6.value" }] });
      }
      const num = system64.runInterval(() => {
        try {
          const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
          const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
          this.zyutuApplyDamage(entity, filter, 6);
        } catch (error) {
          system64.clearRun(num);
        }
      }, 2);
      entity.dimension.spawnParticle("kurokumaft:koori_turara_particle", entity.location);
      system64.waitTicks(2 * TicksPerSecond25).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system64.clearRun(num);
      });
    } catch (error) {
    }
  }
  /**
   * 散り蓮華
   */
  tirirenge(entity) {
    try {
      if (entity instanceof Player35) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_koori7.value" }] });
      }
      const num = system64.runInterval(() => {
        try {
          const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
          const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
          this.zyutuApplyDamage(entity, filter, 5);
        } catch (error) {
          system64.clearRun(num);
        }
      }, 2);
      entity.dimension.spawnParticle("kurokumaft:tirirenge_particle", entity.location);
      system64.waitTicks(1 * TicksPerSecond25).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system64.clearRun(num);
      });
    } catch (error) {
    }
  }
  /**
   * 結晶ノ御子
   */
  kessyounomiko(entity) {
    try {
      if (entity instanceof Player35) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_koori8.value" }] });
      }
      const center = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
      const miko = entity.dimension.spawnEntity("kurokumaft:kessyounomiko", getDistanceLocation(entity.location, center));
      const tameable = miko.getComponent(EntityComponentTypes15.Tameable);
      if (!tameable.isTamed) {
        if (entity instanceof Player35) {
          tameable.tame(entity);
        }
      }
      system64.waitTicks(6).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 霧氷・睡蓮菩薩
   */
  muhyousuirenbosatu(entity) {
    try {
      if (entity instanceof Player35) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_koori9.value" }] });
      }
      const center = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
      const bosatu = entity.dimension.spawnEntity("kurokumaft:muhyousuirenbosatu", getDistanceLocation(entity.location, center));
      const tameable = bosatu.getComponent(EntityComponentTypes15.Tameable);
      if (!tameable.isTamed) {
        if (entity instanceof Player35) {
          tameable.tame(entity);
        }
      }
      system64.waitTicks(6).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 菩薩範囲攻撃
   */
  bosatuattack(entity) {
    try {
      const num = system64.runInterval(() => {
        try {
          const distance = getLookLocationDistance(entity.getRotation().y, 0, 0, 0);
          const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
          this.zyutuApplyDamage(entity, filter, 5);
        } catch (error) {
          system64.clearRun(num);
        }
      }, 2);
      system64.waitTicks(2 * TicksPerSecond25).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system64.clearRun(num);
      });
    } catch (error) {
    }
  }
};
var hasuRenge = class extends ZytuComonClass {
  entity;
  num;
  ownerEntity;
  player;
  constructor(entity, ownerEntity, player) {
    super();
    this.entity = entity;
    this.num = 0;
    this.ownerEntity = ownerEntity;
    this.ownerEntity.addTag(this.entity.id);
    if (player !== void 0) {
      this.player = player;
      this.player.addTag(this.entity.id);
    }
  }
  startMonitoring() {
    this.num = system64.runInterval(() => {
      if (this.entity.isValid) {
        this.entity.setProperty("kurokumaft:attack_ran", 0);
        this.attackTick();
      } else {
        system64.clearRun(this.num);
        if (this.ownerEntity.isValid) {
          this.ownerEntity.removeTag(this.entity.id);
        }
        if (this.player !== void 0) {
          this.player.removeTag(this.entity.id);
        }
      }
    }, 10);
  }
  async attackTick() {
    const filter = {
      excludeFamilies: [
        "inanimate",
        "animal",
        "hasuhagoori",
        "koori"
      ],
      excludeTypes: [
        "item"
      ],
      excludeTags: [
        this.entity.id
      ],
      closest: 1,
      location: this.entity.location,
      maxDistance: 4
    };
    if (!world9.gameRules.pvp) {
      filter.excludeFamilies?.push("player");
    }
    const targets = this.entity.dimension.getEntities(filter);
    if (targets.length > 0) {
      this.entity.teleport(this.entity.location, {
        facingLocation: targets[0].location
      });
      const ran = getRandomInRange(1, 4);
      this.entity.setProperty("kurokumaft:attack_ran", ran);
      this.zyutuApplyDamage(this.entity, filter, 2);
    }
  }
};
function ibuki(entity) {
  try {
    const num = system64.runInterval(() => {
      try {
        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
        filter.excludeFamilies?.push("koori");
        const targets = entity.dimension.getEntities(filter);
        targets.forEach((en) => {
          if (en !== void 0 && en.isValid) {
            if (en instanceof Player35) {
              en.applyDamage(2, {
                cause: EntityDamageCause5.entityAttack,
                damagingEntity: entity
              });
              en.addEffect("minecraft:weakness", 20, {
                amplifier: 2,
                showParticles: true
              });
            } else {
              en.applyDamage(4, {
                cause: EntityDamageCause5.entityAttack,
                damagingEntity: entity
              });
              en.addEffect("minecraft:weakness", 20, {
                amplifier: 4,
                showParticles: true
              });
            }
          }
        });
      } catch (error) {
        system64.clearRun(num);
      }
    }, 2);
    entity.dimension.spawnParticle("kurokumaft:itegumori_particle", entity.location);
    system64.waitTicks(1 * TicksPerSecond25).then(() => {
    }).catch((error) => {
    }).finally(() => {
      system64.clearRun(num);
    });
  } catch (error) {
  }
}

// scripts/kekkizyutu/player/character/ZyutuDoumaComponent.ts
var ZyutuDoumaComponent = class {
  koori = new Koori();
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeZyutu(player) {
    const kata = player.getProperty("kurokumaft:kekkizyutu_kata");
    const kekkizyutuObject = KekkizyutuObjects[10];
    switch (kata) {
      case kekkizyutuObject.kata[kekkizyutuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_koori" + kekkizyutuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_koori" + kekkizyutuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    try {
      switch (kata) {
        case 1:
          this.koori.hasuhagoori(entity);
          break;
        case 2:
          this.koori.karesonosizuri(entity);
          break;
        case 3:
          this.koori.itegumori(entity);
          break;
        case 4:
          this.koori.tururenge(entity);
          break;
        case 5:
          this.koori.kanretunosirahime(entity);
          break;
        case 6:
          this.koori.fuyuzareturara(entity);
          break;
        case 7:
          this.koori.tirirenge(entity);
          break;
        case 8:
          this.koori.kessyounomiko(entity);
          break;
        case 9:
          this.koori.muhyousuirenbosatu(entity);
          break;
      }
    } catch (error) {
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/mob/DoumaComponent.ts
import { system as system65, TicksPerSecond as TicksPerSecond26 } from "@minecraft/server";
var doumaKekkizyutuLists = weightChoice([
  { item: 1, weight: 20 },
  { item: 2, weight: 20 },
  { item: 3, weight: 10 },
  { item: 4, weight: 5 },
  { item: 5, weight: 5 },
  { item: 6, weight: 15 },
  { item: 7, weight: 15 },
  { item: 8, weight: 5 },
  { item: 9, weight: 5 }
]);
var DoumaComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = doumaKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const koori = new Koori();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.hasuhagoori(entity);
          system65.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.karesonosizuri(entity);
          system65.waitTicks(2 * TicksPerSecond26).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.itegumori(entity);
          system65.waitTicks(1 * TicksPerSecond26).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.tururenge(entity);
          system65.waitTicks(5).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.kanretunosirahime(entity);
          system65.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.fuyuzareturara(entity);
          system65.waitTicks(2 * TicksPerSecond26).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.tirirenge(entity);
          system65.waitTicks(1 * TicksPerSecond26).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 8:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.kessyounomiko(entity);
          system65.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 9:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.muhyousuirenbosatu(entity);
          system65.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/mob/KessyounomikoComponent.ts
import { system as system66, TicksPerSecond as TicksPerSecond27 } from "@minecraft/server";
var kessyounomikoKekkizyutuLists = weightChoice([
  { item: 1, weight: 30 },
  { item: 2, weight: 20 },
  { item: 3, weight: 10 },
  { item: 4, weight: 10 },
  { item: 6, weight: 15 },
  { item: 7, weight: 15 }
]);
var KessyounomikoComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = kessyounomikoKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const koori = new Koori();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.hasuhagoori(entity);
          system66.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.karesonosizuri(entity);
          system66.waitTicks(2 * TicksPerSecond27).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.itegumori(entity);
          system66.waitTicks(1 * TicksPerSecond27).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.tururenge(entity);
          system66.waitTicks(5).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.fuyuzareturara(entity);
          system66.waitTicks(2 * TicksPerSecond27).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.tirirenge(entity);
          system66.waitTicks(1 * TicksPerSecond27).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/mob/MuhyousuirenbosatuComponent.ts
import { system as system67, TicksPerSecond as TicksPerSecond28 } from "@minecraft/server";
var muhyousuirenbosatuKekkizyutuLists = weightChoice([
  { item: 1, weight: 70 },
  { item: 3, weight: 15 },
  { item: 7, weight: 15 }
]);
var MuhyousuirenbosatuComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = muhyousuirenbosatuKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const koori = new Koori();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.bosatuattack(entity);
          system67.waitTicks(2 * TicksPerSecond28).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.itegumori(entity);
          system67.waitTicks(1 * TicksPerSecond28).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 7:
          entity.triggerEvent("kurokumaft:attack_stop");
          koori.tirirenge(entity);
          system67.waitTicks(1 * TicksPerSecond28).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/zyutu/Tubo.ts
import { system as system68, TicksPerSecond as TicksPerSecond29, Player as Player36, EntityComponentTypes as EntityComponentTypes16, EntityDamageCause as EntityDamageCause6 } from "@minecraft/server";
var Tubo = class extends ZytuComonClass {
  /**
   * 水獄鉢
   */
  suigokubati(entity) {
    try {
      if (entity instanceof Player36) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_tubo1.value" }] });
        entity.startItemCooldown("kurokumaft:tubo", 10 * TicksPerSecond29);
      }
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      const filter = addOrgeFilter(3, entity.location, 10, entity.id);
      filter.excludeFamilies?.push("sakana");
      entity.addTag(entity.id);
      const targets = entity.dimension.getEntities(filter);
      targets.forEach((en) => {
        const suigokubati = en.dimension.spawnEntity("kurokumaft:suigokubati", en.location);
        this.suigokubatiHold(suigokubati, en);
      });
      entity.removeTag(entity.id);
    } catch (error) {
    }
  }
  async suigokubatiHold(suigokubati, target) {
    const num = system68.runInterval(() => {
      try {
        if (suigokubati.isValid && target.isValid) {
          target.teleport({ x: suigokubati.location.x, y: suigokubati.location.y + 0.2, z: suigokubati.location.z });
          target.applyDamage(1, {
            cause: EntityDamageCause6.drowning,
            damagingEntity: suigokubati
          });
        } else {
          if (suigokubati.isValid) {
            suigokubati.remove();
          }
          system68.clearRun(num);
        }
      } catch (error) {
        system68.clearRun(num);
      }
    }, 2);
  }
  /**
   * 千本針魚殺
   */
  senbonbarigyosatu(entity) {
    try {
      if (entity instanceof Player36) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_tubo2.value" }] });
      }
      const left = getLookLocationDistance(entity.getRotation().y, 2, 2, 1);
      const gyosatu1 = entity.dimension.spawnEntity("kurokumaft:gyosatu", getDistanceLocation(entity.location, left));
      const tameable = gyosatu1.getComponent(EntityComponentTypes16.Tameable);
      if (!tameable.isTamed) {
        if (entity instanceof Player36) {
          tameable.tame(entity);
        }
      }
      const right = getLookLocationDistance(entity.getRotation().y, 2, -2, 1);
      const gyosatu2 = entity.dimension.spawnEntity("kurokumaft:gyosatu", getDistanceLocation(entity.location, right));
      const tameable2 = gyosatu2.getComponent(EntityComponentTypes16.Tameable);
      if (!tameable2.isTamed) {
        if (entity instanceof Player36) {
          tameable2.tame(entity);
        }
      }
      system68.waitTicks(6).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 蛸壺地獄
   */
  takotubozigoku(entity) {
    try {
      if (entity instanceof Player36) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_tubo3.value" }] });
      }
      const num = system68.runInterval(() => {
        try {
          const distance = getLookLocationDistance(entity.getRotation().y, 5, 0, 0);
          const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
          filter.excludeFamilies?.push("sakana");
          this.zyutuApplyDamage(entity, filter, 5);
        } catch (error) {
          system68.clearRun(num);
        }
      }, 2);
      system68.waitTicks(2 * TicksPerSecond29).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system68.clearRun(num);
      });
    } catch (error) {
    }
  }
  /**
   * 一万滑空粘魚
   */
  itimankakkuunengyo(entity) {
    try {
      if (entity instanceof Player36) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_tubo4.value" }] });
      }
      const distance = getLookLocationDistance(entity.getRotation().y, 5, 0, 0);
      const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 5, entity.id);
      filter.excludeFamilies?.push("sakana");
      const num = system68.runInterval(() => {
        this.nengyo(entity, getRandomInRange(-3, 3), getRandomInRange(-2, 2));
        this.zyutuApplyDamage(entity, filter, 5);
      }, 2);
      system68.waitTicks(30).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system68.clearRun(num);
      });
    } catch (error) {
    }
  }
  async nengyo(entity, side, top) {
    const distance = getLookLocationDistance(entity.getRotation().y, 1, side, top);
    const bulet = entity.dimension.spawnEntity("kurokumaft:nengyo", getDistanceLocation(
      {
        x: entity.location.x,
        y: entity.location.y + 0.5,
        z: entity.location.z
      },
      distance
    ));
    const distance2 = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
    const projectile = bulet.getComponent(EntityComponentTypes16.Projectile);
    projectile.owner = entity;
    projectile.shoot({
      x: distance2.x,
      y: 0,
      z: distance2.z
    });
    system68.waitTicks(10).then(() => {
      if (bulet.isValid) {
        bulet.remove();
      }
    });
  }
  /**
   * 魚召喚
   */
  sakanasyoukan(entity) {
    try {
      if (entity instanceof Player36) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_tubo5.value" }] });
      }
      const left = getLookLocationDistance(entity.getRotation().y, 2, 2, 0);
      const sakana1 = entity.dimension.spawnEntity("kurokumaft:kyodaigyo_kiba", getDistanceLocation(entity.location, left));
      const tameable = sakana1.getComponent(EntityComponentTypes16.Tameable);
      if (!tameable.isTamed) {
        if (entity instanceof Player36) {
          tameable.tame(entity);
        }
      }
      const right = getLookLocationDistance(entity.getRotation().y, 2, -2, 0);
      const sakana2 = entity.dimension.spawnEntity("kurokumaft:kyodaigyo_kiba", getDistanceLocation(entity.location, right));
      const tameable2 = sakana2.getComponent(EntityComponentTypes16.Tameable);
      if (!tameable2.isTamed) {
        if (entity instanceof Player36) {
          tameable2.tame(entity);
        }
      }
      system68.waitTicks(6).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 陣殺魚鱗
   */
  zinsatugyorin(entity) {
    try {
      if (entity instanceof Player36) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_tubo6.value" }] });
      }
      const num = system68.runInterval(() => {
        try {
          const filter = addOrgeFilter(0, entity.location, 2.5, entity.id);
          filter.excludeFamilies?.push("sakana");
          this.zyutuApplyDamage(entity, filter, 10);
          const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
          entity.applyKnockback({ x: distance.x, z: distance.z }, 0.15);
        } catch (error) {
          system68.clearRun(num);
        }
        system68.waitTicks(4).then(() => {
          entity.teleport(entity.location, {
            keepVelocity: false,
            rotation: {
              x: 0,
              y: entity.getRotation().y + getRandomInRange(75, 115)
            }
          });
        }).catch((error) => {
        }).finally(() => {
        });
      }, 5);
      system68.waitTicks(2 * TicksPerSecond29).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
      }).finally(() => {
        system68.clearRun(num);
      });
    } catch (error) {
    }
  }
};
async function gyokkoMove(entity) {
  const distance = getLookLocationDistance(entity.getRotation().y, getRandomInRange(-10, 10), getRandomInRange(-10, 10), 0);
  entity.teleport(getDistanceLocation(entity.location, distance), {
    checkForBlocks: true
  });
}

// scripts/kekkizyutu/player/character/ZyutuGyokkoComponent.ts
var ZyutuGyokkoComponent = class {
  tubo = new Tubo();
  /**
   * 呼吸型変更
   * @param {Player} player
   */
  changeZyutu(player) {
    const kata = player.getProperty("kurokumaft:kekkizyutu_kata");
    const kekkizyutuObject = KekkizyutuObjects[13];
    switch (kata) {
      case kekkizyutuObject.kata[kekkizyutuObject.kata.length - 1]:
        player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[0]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_tubo" + kekkizyutuObject.kata[0] + ".value" }] });
        break;
      default:
        const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
        player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[index + 1]);
        player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_tubo" + kekkizyutuObject.kata[index + 1] + ".value" }] });
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    try {
      switch (kata) {
        case 1:
          this.tubo.suigokubati(entity);
          break;
        case 2:
          this.tubo.senbonbarigyosatu(entity);
          break;
        case 3:
          this.tubo.takotubozigoku(entity);
          break;
        case 4:
          this.tubo.itimankakkuunengyo(entity);
          break;
        case 5:
          this.tubo.sakanasyoukan(entity);
          break;
        case 6:
          this.tubo.zinsatugyorin(entity);
          break;
      }
    } catch (error) {
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/mob/GyokkoComponent.ts
import { system as system69, TicksPerSecond as TicksPerSecond30 } from "@minecraft/server";
var doumaKekkizyutuLists2 = weightChoice([
  { item: 1, weight: 5 },
  { item: 2, weight: 30 },
  { item: 3, weight: 20 },
  { item: 4, weight: 20 },
  { item: 5, weight: 15 },
  { item: 6, weight: 10 }
]);
var GyokkoComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = doumaKekkizyutuLists2.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const tubo = new Tubo();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          tubo.suigokubati(entity);
          system69.waitTicks(5).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          tubo.senbonbarigyosatu(entity);
          system69.waitTicks(5).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          tubo.takotubozigoku(entity);
          system69.waitTicks(2.5 * TicksPerSecond30).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          tubo.itimankakkuunengyo(entity);
          system69.waitTicks(2 * TicksPerSecond30).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          tubo.sakanasyoukan(entity);
          system69.waitTicks(5).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          tubo.zinsatugyorin(entity);
          system69.waitTicks(2 * TicksPerSecond30).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/zyutu/Mari.ts
import { EntityComponentTypes as EntityComponentTypes17, system as system70, TicksPerSecond as TicksPerSecond31 } from "@minecraft/server";
var Mari = class extends ZytuComonClass {
  /**
   * 毬
   */
  mari(entity) {
    try {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      const mari = shooting(entity, "kurokumaft:throw_susamaru_mari", 0, 3, void 0, 0);
      system70.waitTicks(2 * TicksPerSecond31).then(() => {
        if (mari.isValid) {
          mari.remove();
        }
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
    }
  }
  /**
   * 連投
   */
  mariRen(entity) {
    try {
      const num = system70.runInterval(() => {
        try {
          this.rentou(entity, getRandomRange(-1, 1, 2), getRandomRange(0, 1, 2));
        } catch (error) {
          console.error(error);
          system70.clearRun(num);
        }
      }, 5);
      system70.waitTicks(60).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        system70.clearRun(num);
      });
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * 連打
   * @param {Entity} entity
   */
  rentou(entity, side, top) {
    const distance = getLookLocationDistance(entity.getRotation().y, 1, side, top);
    const bulet = entity.dimension.spawnEntity("kurokumaft:throw_susamaru_mari", getDistanceLocation(
      {
        x: entity.location.x,
        y: entity.location.y + 0.5,
        z: entity.location.z
      },
      distance
    ));
    const projectile = bulet.getComponent(EntityComponentTypes17.Projectile);
    projectile.owner = entity;
    const shotdistance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
    projectile.shoot({
      x: shotdistance.x,
      y: 0,
      z: shotdistance.z
    });
    system70.waitTicks(20).then(() => {
      bulet.remove();
    }).catch((error) => {
    }).finally(() => {
    });
  }
};

// scripts/kekkizyutu/player/character/ZyutuSusamaruComponent.ts
var ZyutuSusamaruComponent = class {
  mari = new Mari();
  /**
   * 変更
   * @param {Player} player
   */
  changeZyutu(player) {
    let kata = player.getProperty("kurokumaft:kekkizyutu_kata");
    const kekkizyutuObject = KekkizyutuObjects[15];
    switch (kata) {
      case kekkizyutuObject.kata[kekkizyutuObject.kata.length - 1]:
        kata = kekkizyutuObject.kata[0];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
        break;
      default:
        const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
        kata = kekkizyutuObject.kata[index + 1];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
    }
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_mari" + kata + ".value" }] });
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {ItemStack} itemStack
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    switch (kata) {
      case 1:
        this.mari.mari(entity);
        break;
      case 2:
        this.mari.mariRen(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/mob/SusamaruComponent.ts
import { system as system71 } from "@minecraft/server";
var susamarukkizyutuLists = weightChoice([
  { item: 1, weight: 80 },
  { item: 2, weight: 20 }
]);
var SusamaruComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = susamarukkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const mari = new Mari();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          mari.mari(entity);
          system71.waitTicks(80).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          mari.mari(entity);
          system71.waitTicks(80).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/zyutu/Kouketunoya.ts
import { system as system72, TicksPerSecond as TicksPerSecond32, Player as Player37, world as world10, EntityComponentTypes as EntityComponentTypes18 } from "@minecraft/server";
var Kouketunoya = class extends ZytuComonClass {
  /**
   * 飛
   */
  hi(entity) {
    try {
      if (entity instanceof Player37) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_kouketunoya1.value" }] });
      }
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      const hi = shooting(entity, "kurokumaft:throw_kouketunoya_hi", 0, 3, void 0, 0);
      system72.waitTicks(2 * TicksPerSecond32).then(() => {
        if (hi.isValid) {
          hi.remove();
        }
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
      console.debug(error);
    }
  }
  /**
   * 衝
   */
  show(entity) {
    try {
      if (entity instanceof Player37) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_kouketunoya2.value" }] });
      }
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      const ya = shooting(entity, "kurokumaft:throw_kouketunoya_show", 0, 3, void 0, 0);
      system72.waitTicks(2 * TicksPerSecond32).then(() => {
        if (ya.isValid) {
          ya.remove();
        }
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
      console.debug(error);
    }
  }
  /**
   * 落
   */
  raku(entity) {
    try {
      if (entity instanceof Player37) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_kouketunoya3.value" }] });
      }
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      const ya = shooting(entity, "kurokumaft:throw_kouketunoya_raku", 0, 3, void 0, 0);
      system72.waitTicks(2 * TicksPerSecond32).then(() => {
        if (ya.isValid) {
          ya.remove();
        }
      }).catch((error) => {
      }).finally(() => {
      });
    } catch (error) {
      console.debug(error);
    }
  }
  /**
   * 撃
   */
  geki(entity) {
    try {
      if (entity instanceof Player37) {
        entity.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_kouketunoya4.value" }] });
      }
      let front = 8;
      let side = -3;
      const num = system72.runInterval(() => {
        try {
          const distance = getLookLocationDistance(entity.getRotation().y, front, side, 5);
          const geki = entity.dimension.spawnEntity("kurokumaft:throw_kouketunoya_geki", getDistanceLocation(entity.location, distance));
          const projectile = geki.getComponent(EntityComponentTypes18.Projectile);
          projectile.shoot({
            x: 0,
            y: -2,
            z: 0
          });
          front = -(front + 2);
          side = -(side + 2);
        } catch (error) {
          console.error(error);
          system72.clearRun(num);
        }
      }, 5);
      system72.waitTicks(60).then(() => {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        system72.clearRun(num);
      });
    } catch (error) {
      console.error(error);
    }
  }
};
world10.afterEvents.projectileHitEntity.subscribe((event) => {
  const proj = event.projectile;
  if (proj.isValid) {
    const hitEntity = event.getEntityHit().entity;
    if (hitEntity !== void 0 && hitEntity.isValid) {
      if (proj.typeId === "kurokumaft:throw_kouketunoya_show") {
        const rideable = proj.getComponent(EntityComponentTypes18.Rideable);
        rideable.addRider(hitEntity);
      } else if (proj.typeId === "kurokumaft:throw_kouketunoya_raku" && !proj.getProperty("kurokumaft:hit")) {
        const up = proj.dimension.spawnEntity("kurokumaft:throw_kouketunoya_raku", proj.location);
        up.setProperty("kurokumaft:hit", true);
        proj.remove();
        const rideable = up.getComponent(EntityComponentTypes18.Rideable);
        rideable.addRider(hitEntity);
        const projectile = up.getComponent(EntityComponentTypes18.Projectile);
        projectile.shoot({
          x: 0,
          y: 2,
          z: 0
        });
        system72.waitTicks(0.5 * TicksPerSecond32).then(() => {
          rideable.getRiders().forEach((en) => {
            en.applyKnockback({ x: 0, z: 0 }, -5);
          });
          if (up.isValid) {
            up.remove();
          }
        }).catch((error) => {
        }).finally(() => {
        });
      } else if (proj.typeId === "kurokumaft:throw_kouketunoya_geki") {
        const option = {
          allowUnderwater: true,
          breaksBlocks: false,
          causesFire: false,
          source: proj
        };
        proj.dimension.createExplosion(proj.location, 2, option);
        proj.remove();
      }
    }
  }
});
world10.afterEvents.projectileHitBlock.subscribe((event) => {
  const proj = event.projectile;
  if (proj.isValid && proj.typeId.startsWith("kurokumaft:throw_kouketunoya")) {
    if (proj.typeId === "kurokumaft:throw_kouketunoya_geki") {
      const option = {
        allowUnderwater: true,
        breaksBlocks: false,
        causesFire: false,
        source: proj
      };
      proj.dimension.createExplosion(proj.location, 2, option);
    }
    proj.remove();
  }
});

// scripts/kekkizyutu/player/character/ZyutuYahabaComponent.ts
var ZyutuYahabaComponent = class {
  ya = new Kouketunoya();
  /**
   * 変更
   * @param {Player} player
   */
  changeZyutu(player) {
    let kata = player.getProperty("kurokumaft:kekkizyutu_kata");
    const kekkizyutuObject = KekkizyutuObjects[15];
    switch (kata) {
      case kekkizyutuObject.kata[kekkizyutuObject.kata.length - 1]:
        kata = kekkizyutuObject.kata[0];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
        break;
      default:
        const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
        kata = kekkizyutuObject.kata[index + 1];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
    }
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_kouketunoya" + kata + ".value" }] });
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    switch (kata) {
      case 1:
        this.ya.hi(entity);
        break;
      case 2:
        this.ya.show(entity);
        break;
      case 3:
        this.ya.raku(entity);
        break;
      case 4:
        this.ya.geki(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/mob/YahabaComponent.ts
import { system as system73 } from "@minecraft/server";
var yahabakkizyutuLists = weightChoice([
  { item: 1, weight: 40 },
  { item: 2, weight: 40 },
  { item: 3, weight: 10 },
  { item: 4, weight: 10 }
]);
var YahabaComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = yahabakkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const ya = new Kouketunoya();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          ya.hi(entity);
          system73.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          ya.show(entity);
          system73.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          ya.raku(entity);
          system73.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          ya.geki(entity);
          system73.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/mob/KaigakuComponent.ts
import { system as system74, TicksPerSecond as TicksPerSecond33 } from "@minecraft/server";
var kaigakuKekkizyutuLists = weightChoice([
  { item: 2, weight: 25 },
  { item: 3, weight: 25 },
  { item: 4, weight: 20 },
  { item: 5, weight: 20 },
  { item: 6, weight: 10 }
]);
var KaigakuComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = kaigakuKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const kokurai = new Kokurai();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          kokurai.niNoKata(entity);
          system74.waitTicks(2 * TicksPerSecond33).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          kokurai.sanNoKata(entity);
          system74.waitTicks(1 * TicksPerSecond33).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          kokurai.shiNoKata(entity);
          system74.waitTicks(5).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          kokurai.goNoKata(entity);
          system74.waitTicks(2 * TicksPerSecond33).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 6:
          entity.triggerEvent("kurokumaft:attack_stop");
          kokurai.rokuNoKata(entity);
          system74.waitTicks(1 * TicksPerSecond33).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/zyutu/Biwa.ts
import { GameMode as GameMode2, Player as Player38, system as system75, TicksPerSecond as TicksPerSecond34 } from "@minecraft/server";
var Biwa = class extends ZytuComonClass {
  /**
   * 防
   */
  guard(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      entity.addTag(entity.id + "biwa_guard");
      const entities = entity.dimension.getEntities({
        excludeTags: [entity.id + "biwa_guard"],
        excludeFamilies: ["nakime_fusuma", "inanimate"],
        excludeTypes: ["item"],
        location: entity.location,
        maxDistance: 12
      });
      entities.forEach((en) => {
        if (en instanceof Player38) {
          if (en.getGameMode() !== GameMode2.Spectator && en.getGameMode() !== GameMode2.Creative) {
            const rotation = en.getRotation();
            const distance = getLookLocationDistance(rotation.y, 1, 0, 0);
            const fusuma = en.dimension.spawnEntity(
              "kurokumaft:nakime_fusuma",
              { x: en.location.x + distance.x, y: en.location.y, z: en.location.z + distance.z },
              { initialRotation: rotation.y - 180 }
            );
            system75.runTimeout(() => {
              fusuma.kill();
            }, TicksPerSecond34 * 1);
            en.applyKnockback({
              x: -en.getViewDirection().x * 5,
              z: -en.getViewDirection().z * 5
            }, 0.65);
            playsound(en, "kekkizyutu.biwa");
          }
        } else {
          const rotation = en.getRotation();
          const distance = getLookLocationDistance(rotation.y, 1, 0, 0);
          const fusuma = en.dimension.spawnEntity(
            "kurokumaft:nakime_fusuma",
            { x: en.location.x + distance.x, y: en.location.y, z: en.location.z + distance.z },
            { initialRotation: rotation.y - 180 }
          );
          system75.runTimeout(() => {
            fusuma.kill();
          }, TicksPerSecond34 * 1);
          en.applyKnockback({
            x: -en.getViewDirection().x * 5,
            z: -en.getViewDirection().z * 5
          }, 0.65);
        }
      });
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      entity.removeTag(entity.id + "biwa_guard");
      if (entity instanceof Player38) {
        playsound(entity, "kekkizyutu.biwa");
      }
    } catch (error) {
    }
  }
  /**
   * 転
   */
  gate(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      entity.addTag(entity.id + "biwa_gate");
      const entities = entity.dimension.getEntities({
        excludeTags: [entity.id + "biwa_gate"],
        excludeFamilies: ["nakime_fusuma", "inanimate"],
        excludeTypes: ["item"],
        location: entity.location,
        maxDistance: 12
      });
      entities.forEach((en) => {
        const tpX = getRandomExcludingZero(-36, 36, 12, 100);
        const tpY = getRandomInRange(0, 36);
        const tpZ = getRandomExcludingZero(-36, 36, 12, 100);
        if (en instanceof Player38) {
          const fusuma = en.dimension.spawnEntity("kurokumaft:nakime_fusuma", en.location);
          fusuma.setProperty("kurokumaft:mode", "gate");
          system75.runTimeout(() => {
            fusuma.kill();
          }, TicksPerSecond34 * 1);
          if (en.getGameMode() !== GameMode2.Spectator && en.getGameMode() !== GameMode2.Creative) {
            en.teleport({ x: en.location.x + tpX, y: en.location.y + tpY, z: en.location.z + tpZ });
            playsound(en, "kekkizyutu.biwa");
          }
        } else {
          const fusuma = en.dimension.spawnEntity("kurokumaft:nakime_fusuma", en.location);
          system75.runTimeout(() => {
            fusuma.kill();
          }, TicksPerSecond34 * 1);
          fusuma.setProperty("kurokumaft:mode", "gate");
          en.teleport({ x: en.location.x + tpX, y: en.location.y + tpY, z: en.location.z + tpZ });
        }
      });
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      entity.removeTag(entity.id + "biwa_gate");
      if (entity instanceof Player38) {
        playsound(entity, "kekkizyutu.biwa");
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/player/character/ZyutuNakimeComponent.ts
var ZyutuNakimeComponent = class {
  biwa = new Biwa();
  /**
   * 変更
   * @param {Player} player
   */
  changeZyutu(player) {
    let kata = player.getProperty("kurokumaft:kekkizyutu_kata");
    const kekkizyutuObject = KekkizyutuObjects[16];
    switch (kata) {
      case kekkizyutuObject.kata[kekkizyutuObject.kata.length - 1]:
        kata = kekkizyutuObject.kata[0];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
        break;
      default:
        const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
        kata = kekkizyutuObject.kata[index + 1];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
    }
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_biwa" + kata + ".value" }] });
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    switch (kata) {
      case 1:
        this.biwa.guard(entity);
        break;
      case 2:
        this.biwa.gate(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/mob/NakimeComponent.ts
import { system as system76 } from "@minecraft/server";
var nakimeKekkizyutuLists = weightChoice([
  { item: 1, weight: 50 },
  { item: 2, weight: 50 }
]);
var NakimeComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = nakimeKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const biwa = new Biwa();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          biwa.guard(entity);
          system76.waitTicks(2).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          biwa.gate(entity);
          system76.waitTicks(2).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/zyutu/Wakuti.ts
import { EntityDamageCause as EntityDamageCause7, GameMode as GameMode3, Player as Player39, system as system77, TicksPerSecond as TicksPerSecond35 } from "@minecraft/server";

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
  MinecraftBlockTypes2["AcaciaShelf"] = "minecraft:acacia_shelf";
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
  MinecraftBlockTypes2["BambooShelf"] = "minecraft:bamboo_shelf";
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
  MinecraftBlockTypes2["BirchShelf"] = "minecraft:birch_shelf";
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
  MinecraftBlockTypes2["CherryShelf"] = "minecraft:cherry_shelf";
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
  MinecraftBlockTypes2["CopperBars"] = "minecraft:copper_bars";
  MinecraftBlockTypes2["CopperBlock"] = "minecraft:copper_block";
  MinecraftBlockTypes2["CopperBulb"] = "minecraft:copper_bulb";
  MinecraftBlockTypes2["CopperChain"] = "minecraft:copper_chain";
  MinecraftBlockTypes2["CopperChest"] = "minecraft:copper_chest";
  MinecraftBlockTypes2["CopperDoor"] = "minecraft:copper_door";
  MinecraftBlockTypes2["CopperGolemStatue"] = "minecraft:copper_golem_statue";
  MinecraftBlockTypes2["CopperGrate"] = "minecraft:copper_grate";
  MinecraftBlockTypes2["CopperLantern"] = "minecraft:copper_lantern";
  MinecraftBlockTypes2["CopperOre"] = "minecraft:copper_ore";
  MinecraftBlockTypes2["CopperTorch"] = "minecraft:copper_torch";
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
  MinecraftBlockTypes2["CrimsonShelf"] = "minecraft:crimson_shelf";
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
  MinecraftBlockTypes2["DarkOakShelf"] = "minecraft:dark_oak_shelf";
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
  MinecraftBlockTypes2["ExposedCopperBars"] = "minecraft:exposed_copper_bars";
  MinecraftBlockTypes2["ExposedCopperBulb"] = "minecraft:exposed_copper_bulb";
  MinecraftBlockTypes2["ExposedCopperChain"] = "minecraft:exposed_copper_chain";
  MinecraftBlockTypes2["ExposedCopperChest"] = "minecraft:exposed_copper_chest";
  MinecraftBlockTypes2["ExposedCopperDoor"] = "minecraft:exposed_copper_door";
  MinecraftBlockTypes2["ExposedCopperGolemStatue"] = "minecraft:exposed_copper_golem_statue";
  MinecraftBlockTypes2["ExposedCopperGrate"] = "minecraft:exposed_copper_grate";
  MinecraftBlockTypes2["ExposedCopperLantern"] = "minecraft:exposed_copper_lantern";
  MinecraftBlockTypes2["ExposedCopperTrapdoor"] = "minecraft:exposed_copper_trapdoor";
  MinecraftBlockTypes2["ExposedCutCopper"] = "minecraft:exposed_cut_copper";
  MinecraftBlockTypes2["ExposedCutCopperSlab"] = "minecraft:exposed_cut_copper_slab";
  MinecraftBlockTypes2["ExposedCutCopperStairs"] = "minecraft:exposed_cut_copper_stairs";
  MinecraftBlockTypes2["ExposedDoubleCutCopperSlab"] = "minecraft:exposed_double_cut_copper_slab";
  MinecraftBlockTypes2["ExposedLightningRod"] = "minecraft:exposed_lightning_rod";
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
  MinecraftBlockTypes2["IronChain"] = "minecraft:iron_chain";
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
  MinecraftBlockTypes2["JungleShelf"] = "minecraft:jungle_shelf";
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
  MinecraftBlockTypes2["MangroveShelf"] = "minecraft:mangrove_shelf";
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
  MinecraftBlockTypes2["OakShelf"] = "minecraft:oak_shelf";
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
  MinecraftBlockTypes2["OxidizedCopperBars"] = "minecraft:oxidized_copper_bars";
  MinecraftBlockTypes2["OxidizedCopperBulb"] = "minecraft:oxidized_copper_bulb";
  MinecraftBlockTypes2["OxidizedCopperChain"] = "minecraft:oxidized_copper_chain";
  MinecraftBlockTypes2["OxidizedCopperChest"] = "minecraft:oxidized_copper_chest";
  MinecraftBlockTypes2["OxidizedCopperDoor"] = "minecraft:oxidized_copper_door";
  MinecraftBlockTypes2["OxidizedCopperGolemStatue"] = "minecraft:oxidized_copper_golem_statue";
  MinecraftBlockTypes2["OxidizedCopperGrate"] = "minecraft:oxidized_copper_grate";
  MinecraftBlockTypes2["OxidizedCopperLantern"] = "minecraft:oxidized_copper_lantern";
  MinecraftBlockTypes2["OxidizedCopperTrapdoor"] = "minecraft:oxidized_copper_trapdoor";
  MinecraftBlockTypes2["OxidizedCutCopper"] = "minecraft:oxidized_cut_copper";
  MinecraftBlockTypes2["OxidizedCutCopperSlab"] = "minecraft:oxidized_cut_copper_slab";
  MinecraftBlockTypes2["OxidizedCutCopperStairs"] = "minecraft:oxidized_cut_copper_stairs";
  MinecraftBlockTypes2["OxidizedDoubleCutCopperSlab"] = "minecraft:oxidized_double_cut_copper_slab";
  MinecraftBlockTypes2["OxidizedLightningRod"] = "minecraft:oxidized_lightning_rod";
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
  MinecraftBlockTypes2["PaleOakShelf"] = "minecraft:pale_oak_shelf";
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
  MinecraftBlockTypes2["SpruceShelf"] = "minecraft:spruce_shelf";
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
  MinecraftBlockTypes2["WarpedShelf"] = "minecraft:warped_shelf";
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
  MinecraftBlockTypes2["WaxedCopperBars"] = "minecraft:waxed_copper_bars";
  MinecraftBlockTypes2["WaxedCopperBulb"] = "minecraft:waxed_copper_bulb";
  MinecraftBlockTypes2["WaxedCopperChain"] = "minecraft:waxed_copper_chain";
  MinecraftBlockTypes2["WaxedCopperChest"] = "minecraft:waxed_copper_chest";
  MinecraftBlockTypes2["WaxedCopperDoor"] = "minecraft:waxed_copper_door";
  MinecraftBlockTypes2["WaxedCopperGolemStatue"] = "minecraft:waxed_copper_golem_statue";
  MinecraftBlockTypes2["WaxedCopperGrate"] = "minecraft:waxed_copper_grate";
  MinecraftBlockTypes2["WaxedCopperLantern"] = "minecraft:waxed_copper_lantern";
  MinecraftBlockTypes2["WaxedCopperTrapdoor"] = "minecraft:waxed_copper_trapdoor";
  MinecraftBlockTypes2["WaxedCutCopper"] = "minecraft:waxed_cut_copper";
  MinecraftBlockTypes2["WaxedCutCopperSlab"] = "minecraft:waxed_cut_copper_slab";
  MinecraftBlockTypes2["WaxedCutCopperStairs"] = "minecraft:waxed_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedDoubleCutCopperSlab"] = "minecraft:waxed_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedExposedChiseledCopper"] = "minecraft:waxed_exposed_chiseled_copper";
  MinecraftBlockTypes2["WaxedExposedCopper"] = "minecraft:waxed_exposed_copper";
  MinecraftBlockTypes2["WaxedExposedCopperBars"] = "minecraft:waxed_exposed_copper_bars";
  MinecraftBlockTypes2["WaxedExposedCopperBulb"] = "minecraft:waxed_exposed_copper_bulb";
  MinecraftBlockTypes2["WaxedExposedCopperChain"] = "minecraft:waxed_exposed_copper_chain";
  MinecraftBlockTypes2["WaxedExposedCopperChest"] = "minecraft:waxed_exposed_copper_chest";
  MinecraftBlockTypes2["WaxedExposedCopperDoor"] = "minecraft:waxed_exposed_copper_door";
  MinecraftBlockTypes2["WaxedExposedCopperGolemStatue"] = "minecraft:waxed_exposed_copper_golem_statue";
  MinecraftBlockTypes2["WaxedExposedCopperGrate"] = "minecraft:waxed_exposed_copper_grate";
  MinecraftBlockTypes2["WaxedExposedCopperLantern"] = "minecraft:waxed_exposed_copper_lantern";
  MinecraftBlockTypes2["WaxedExposedCopperTrapdoor"] = "minecraft:waxed_exposed_copper_trapdoor";
  MinecraftBlockTypes2["WaxedExposedCutCopper"] = "minecraft:waxed_exposed_cut_copper";
  MinecraftBlockTypes2["WaxedExposedCutCopperSlab"] = "minecraft:waxed_exposed_cut_copper_slab";
  MinecraftBlockTypes2["WaxedExposedCutCopperStairs"] = "minecraft:waxed_exposed_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedExposedDoubleCutCopperSlab"] = "minecraft:waxed_exposed_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedExposedLightningRod"] = "minecraft:waxed_exposed_lightning_rod";
  MinecraftBlockTypes2["WaxedLightningRod"] = "minecraft:waxed_lightning_rod";
  MinecraftBlockTypes2["WaxedOxidizedChiseledCopper"] = "minecraft:waxed_oxidized_chiseled_copper";
  MinecraftBlockTypes2["WaxedOxidizedCopper"] = "minecraft:waxed_oxidized_copper";
  MinecraftBlockTypes2["WaxedOxidizedCopperBars"] = "minecraft:waxed_oxidized_copper_bars";
  MinecraftBlockTypes2["WaxedOxidizedCopperBulb"] = "minecraft:waxed_oxidized_copper_bulb";
  MinecraftBlockTypes2["WaxedOxidizedCopperChain"] = "minecraft:waxed_oxidized_copper_chain";
  MinecraftBlockTypes2["WaxedOxidizedCopperChest"] = "minecraft:waxed_oxidized_copper_chest";
  MinecraftBlockTypes2["WaxedOxidizedCopperDoor"] = "minecraft:waxed_oxidized_copper_door";
  MinecraftBlockTypes2["WaxedOxidizedCopperGolemStatue"] = "minecraft:waxed_oxidized_copper_golem_statue";
  MinecraftBlockTypes2["WaxedOxidizedCopperGrate"] = "minecraft:waxed_oxidized_copper_grate";
  MinecraftBlockTypes2["WaxedOxidizedCopperLantern"] = "minecraft:waxed_oxidized_copper_lantern";
  MinecraftBlockTypes2["WaxedOxidizedCopperTrapdoor"] = "minecraft:waxed_oxidized_copper_trapdoor";
  MinecraftBlockTypes2["WaxedOxidizedCutCopper"] = "minecraft:waxed_oxidized_cut_copper";
  MinecraftBlockTypes2["WaxedOxidizedCutCopperSlab"] = "minecraft:waxed_oxidized_cut_copper_slab";
  MinecraftBlockTypes2["WaxedOxidizedCutCopperStairs"] = "minecraft:waxed_oxidized_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedOxidizedDoubleCutCopperSlab"] = "minecraft:waxed_oxidized_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedOxidizedLightningRod"] = "minecraft:waxed_oxidized_lightning_rod";
  MinecraftBlockTypes2["WaxedWeatheredChiseledCopper"] = "minecraft:waxed_weathered_chiseled_copper";
  MinecraftBlockTypes2["WaxedWeatheredCopper"] = "minecraft:waxed_weathered_copper";
  MinecraftBlockTypes2["WaxedWeatheredCopperBars"] = "minecraft:waxed_weathered_copper_bars";
  MinecraftBlockTypes2["WaxedWeatheredCopperBulb"] = "minecraft:waxed_weathered_copper_bulb";
  MinecraftBlockTypes2["WaxedWeatheredCopperChain"] = "minecraft:waxed_weathered_copper_chain";
  MinecraftBlockTypes2["WaxedWeatheredCopperChest"] = "minecraft:waxed_weathered_copper_chest";
  MinecraftBlockTypes2["WaxedWeatheredCopperDoor"] = "minecraft:waxed_weathered_copper_door";
  MinecraftBlockTypes2["WaxedWeatheredCopperGolemStatue"] = "minecraft:waxed_weathered_copper_golem_statue";
  MinecraftBlockTypes2["WaxedWeatheredCopperGrate"] = "minecraft:waxed_weathered_copper_grate";
  MinecraftBlockTypes2["WaxedWeatheredCopperLantern"] = "minecraft:waxed_weathered_copper_lantern";
  MinecraftBlockTypes2["WaxedWeatheredCopperTrapdoor"] = "minecraft:waxed_weathered_copper_trapdoor";
  MinecraftBlockTypes2["WaxedWeatheredCutCopper"] = "minecraft:waxed_weathered_cut_copper";
  MinecraftBlockTypes2["WaxedWeatheredCutCopperSlab"] = "minecraft:waxed_weathered_cut_copper_slab";
  MinecraftBlockTypes2["WaxedWeatheredCutCopperStairs"] = "minecraft:waxed_weathered_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedWeatheredDoubleCutCopperSlab"] = "minecraft:waxed_weathered_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedWeatheredLightningRod"] = "minecraft:waxed_weathered_lightning_rod";
  MinecraftBlockTypes2["WeatheredChiseledCopper"] = "minecraft:weathered_chiseled_copper";
  MinecraftBlockTypes2["WeatheredCopper"] = "minecraft:weathered_copper";
  MinecraftBlockTypes2["WeatheredCopperBars"] = "minecraft:weathered_copper_bars";
  MinecraftBlockTypes2["WeatheredCopperBulb"] = "minecraft:weathered_copper_bulb";
  MinecraftBlockTypes2["WeatheredCopperChain"] = "minecraft:weathered_copper_chain";
  MinecraftBlockTypes2["WeatheredCopperChest"] = "minecraft:weathered_copper_chest";
  MinecraftBlockTypes2["WeatheredCopperDoor"] = "minecraft:weathered_copper_door";
  MinecraftBlockTypes2["WeatheredCopperGolemStatue"] = "minecraft:weathered_copper_golem_statue";
  MinecraftBlockTypes2["WeatheredCopperGrate"] = "minecraft:weathered_copper_grate";
  MinecraftBlockTypes2["WeatheredCopperLantern"] = "minecraft:weathered_copper_lantern";
  MinecraftBlockTypes2["WeatheredCopperTrapdoor"] = "minecraft:weathered_copper_trapdoor";
  MinecraftBlockTypes2["WeatheredCutCopper"] = "minecraft:weathered_cut_copper";
  MinecraftBlockTypes2["WeatheredCutCopperSlab"] = "minecraft:weathered_cut_copper_slab";
  MinecraftBlockTypes2["WeatheredCutCopperStairs"] = "minecraft:weathered_cut_copper_stairs";
  MinecraftBlockTypes2["WeatheredDoubleCutCopperSlab"] = "minecraft:weathered_double_cut_copper_slab";
  MinecraftBlockTypes2["WeatheredLightningRod"] = "minecraft:weathered_lightning_rod";
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
  MinecraftCooldownCategoryTypes2["Spear"] = "minecraft:spear";
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
  MinecraftEffectTypes2["BreathOfTheNautilus"] = "minecraft:breath_of_the_nautilus";
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
  MinecraftEnchantmentTypes2["Lunge"] = "minecraft:lunge";
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
  MinecraftEntityTypes2["CamelHusk"] = "minecraft:camel_husk";
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
  MinecraftEntityTypes2["Nautilus"] = "minecraft:nautilus";
  MinecraftEntityTypes2["Npc"] = "minecraft:npc";
  MinecraftEntityTypes2["Ocelot"] = "minecraft:ocelot";
  MinecraftEntityTypes2["OminousItemSpawner"] = "minecraft:ominous_item_spawner";
  MinecraftEntityTypes2["Panda"] = "minecraft:panda";
  MinecraftEntityTypes2["Parched"] = "minecraft:parched";
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
  MinecraftEntityTypes2["ZombieNautilus"] = "minecraft:zombie_nautilus";
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
  MinecraftItemTypes2["AcaciaShelf"] = "minecraft:acacia_shelf";
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
  MinecraftItemTypes2["BambooShelf"] = "minecraft:bamboo_shelf";
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
  MinecraftItemTypes2["BirchShelf"] = "minecraft:birch_shelf";
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
  MinecraftItemTypes2["CamelHuskSpawnEgg"] = "minecraft:camel_husk_spawn_egg";
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
  MinecraftItemTypes2["CherryShelf"] = "minecraft:cherry_shelf";
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
  MinecraftItemTypes2["CopperBars"] = "minecraft:copper_bars";
  MinecraftItemTypes2["CopperBlock"] = "minecraft:copper_block";
  MinecraftItemTypes2["CopperBoots"] = "minecraft:copper_boots";
  MinecraftItemTypes2["CopperBulb"] = "minecraft:copper_bulb";
  MinecraftItemTypes2["CopperChain"] = "minecraft:copper_chain";
  MinecraftItemTypes2["CopperChest"] = "minecraft:copper_chest";
  MinecraftItemTypes2["CopperChestplate"] = "minecraft:copper_chestplate";
  MinecraftItemTypes2["CopperDoor"] = "minecraft:copper_door";
  MinecraftItemTypes2["CopperGolemSpawnEgg"] = "minecraft:copper_golem_spawn_egg";
  MinecraftItemTypes2["CopperGolemStatue"] = "minecraft:copper_golem_statue";
  MinecraftItemTypes2["CopperGrate"] = "minecraft:copper_grate";
  MinecraftItemTypes2["CopperHelmet"] = "minecraft:copper_helmet";
  MinecraftItemTypes2["CopperHoe"] = "minecraft:copper_hoe";
  MinecraftItemTypes2["CopperHorseArmor"] = "minecraft:copper_horse_armor";
  MinecraftItemTypes2["CopperIngot"] = "minecraft:copper_ingot";
  MinecraftItemTypes2["CopperLantern"] = "minecraft:copper_lantern";
  MinecraftItemTypes2["CopperLeggings"] = "minecraft:copper_leggings";
  MinecraftItemTypes2["CopperNautilusArmor"] = "minecraft:copper_nautilus_armor";
  MinecraftItemTypes2["CopperNugget"] = "minecraft:copper_nugget";
  MinecraftItemTypes2["CopperOre"] = "minecraft:copper_ore";
  MinecraftItemTypes2["CopperPickaxe"] = "minecraft:copper_pickaxe";
  MinecraftItemTypes2["CopperShovel"] = "minecraft:copper_shovel";
  MinecraftItemTypes2["CopperSpear"] = "minecraft:copper_spear";
  MinecraftItemTypes2["CopperSword"] = "minecraft:copper_sword";
  MinecraftItemTypes2["CopperTorch"] = "minecraft:copper_torch";
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
  MinecraftItemTypes2["CrimsonShelf"] = "minecraft:crimson_shelf";
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
  MinecraftItemTypes2["DarkOakShelf"] = "minecraft:dark_oak_shelf";
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
  MinecraftItemTypes2["DiamondNautilusArmor"] = "minecraft:diamond_nautilus_armor";
  MinecraftItemTypes2["DiamondOre"] = "minecraft:diamond_ore";
  MinecraftItemTypes2["DiamondPickaxe"] = "minecraft:diamond_pickaxe";
  MinecraftItemTypes2["DiamondShovel"] = "minecraft:diamond_shovel";
  MinecraftItemTypes2["DiamondSpear"] = "minecraft:diamond_spear";
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
  MinecraftItemTypes2["ExposedCopperBars"] = "minecraft:exposed_copper_bars";
  MinecraftItemTypes2["ExposedCopperBulb"] = "minecraft:exposed_copper_bulb";
  MinecraftItemTypes2["ExposedCopperChain"] = "minecraft:exposed_copper_chain";
  MinecraftItemTypes2["ExposedCopperChest"] = "minecraft:exposed_copper_chest";
  MinecraftItemTypes2["ExposedCopperDoor"] = "minecraft:exposed_copper_door";
  MinecraftItemTypes2["ExposedCopperGolemStatue"] = "minecraft:exposed_copper_golem_statue";
  MinecraftItemTypes2["ExposedCopperGrate"] = "minecraft:exposed_copper_grate";
  MinecraftItemTypes2["ExposedCopperLantern"] = "minecraft:exposed_copper_lantern";
  MinecraftItemTypes2["ExposedCopperTrapdoor"] = "minecraft:exposed_copper_trapdoor";
  MinecraftItemTypes2["ExposedCutCopper"] = "minecraft:exposed_cut_copper";
  MinecraftItemTypes2["ExposedCutCopperSlab"] = "minecraft:exposed_cut_copper_slab";
  MinecraftItemTypes2["ExposedCutCopperStairs"] = "minecraft:exposed_cut_copper_stairs";
  MinecraftItemTypes2["ExposedLightningRod"] = "minecraft:exposed_lightning_rod";
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
  MinecraftItemTypes2["GoldenNautilusArmor"] = "minecraft:golden_nautilus_armor";
  MinecraftItemTypes2["GoldenPickaxe"] = "minecraft:golden_pickaxe";
  MinecraftItemTypes2["GoldenRail"] = "minecraft:golden_rail";
  MinecraftItemTypes2["GoldenShovel"] = "minecraft:golden_shovel";
  MinecraftItemTypes2["GoldenSpear"] = "minecraft:golden_spear";
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
  MinecraftItemTypes2["IronChain"] = "minecraft:iron_chain";
  MinecraftItemTypes2["IronChestplate"] = "minecraft:iron_chestplate";
  MinecraftItemTypes2["IronDoor"] = "minecraft:iron_door";
  MinecraftItemTypes2["IronGolemSpawnEgg"] = "minecraft:iron_golem_spawn_egg";
  MinecraftItemTypes2["IronHelmet"] = "minecraft:iron_helmet";
  MinecraftItemTypes2["IronHoe"] = "minecraft:iron_hoe";
  MinecraftItemTypes2["IronHorseArmor"] = "minecraft:iron_horse_armor";
  MinecraftItemTypes2["IronIngot"] = "minecraft:iron_ingot";
  MinecraftItemTypes2["IronLeggings"] = "minecraft:iron_leggings";
  MinecraftItemTypes2["IronNautilusArmor"] = "minecraft:iron_nautilus_armor";
  MinecraftItemTypes2["IronNugget"] = "minecraft:iron_nugget";
  MinecraftItemTypes2["IronOre"] = "minecraft:iron_ore";
  MinecraftItemTypes2["IronPickaxe"] = "minecraft:iron_pickaxe";
  MinecraftItemTypes2["IronShovel"] = "minecraft:iron_shovel";
  MinecraftItemTypes2["IronSpear"] = "minecraft:iron_spear";
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
  MinecraftItemTypes2["JungleShelf"] = "minecraft:jungle_shelf";
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
  MinecraftItemTypes2["MangroveShelf"] = "minecraft:mangrove_shelf";
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
  MinecraftItemTypes2["NautilusSpawnEgg"] = "minecraft:nautilus_spawn_egg";
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
  MinecraftItemTypes2["NetheriteHorseArmor"] = "minecraft:netherite_horse_armor";
  MinecraftItemTypes2["NetheriteIngot"] = "minecraft:netherite_ingot";
  MinecraftItemTypes2["NetheriteLeggings"] = "minecraft:netherite_leggings";
  MinecraftItemTypes2["NetheriteNautilusArmor"] = "minecraft:netherite_nautilus_armor";
  MinecraftItemTypes2["NetheritePickaxe"] = "minecraft:netherite_pickaxe";
  MinecraftItemTypes2["NetheriteScrap"] = "minecraft:netherite_scrap";
  MinecraftItemTypes2["NetheriteShovel"] = "minecraft:netherite_shovel";
  MinecraftItemTypes2["NetheriteSpear"] = "minecraft:netherite_spear";
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
  MinecraftItemTypes2["OakShelf"] = "minecraft:oak_shelf";
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
  MinecraftItemTypes2["OxidizedCopperBars"] = "minecraft:oxidized_copper_bars";
  MinecraftItemTypes2["OxidizedCopperBulb"] = "minecraft:oxidized_copper_bulb";
  MinecraftItemTypes2["OxidizedCopperChain"] = "minecraft:oxidized_copper_chain";
  MinecraftItemTypes2["OxidizedCopperChest"] = "minecraft:oxidized_copper_chest";
  MinecraftItemTypes2["OxidizedCopperDoor"] = "minecraft:oxidized_copper_door";
  MinecraftItemTypes2["OxidizedCopperGolemStatue"] = "minecraft:oxidized_copper_golem_statue";
  MinecraftItemTypes2["OxidizedCopperGrate"] = "minecraft:oxidized_copper_grate";
  MinecraftItemTypes2["OxidizedCopperLantern"] = "minecraft:oxidized_copper_lantern";
  MinecraftItemTypes2["OxidizedCopperTrapdoor"] = "minecraft:oxidized_copper_trapdoor";
  MinecraftItemTypes2["OxidizedCutCopper"] = "minecraft:oxidized_cut_copper";
  MinecraftItemTypes2["OxidizedCutCopperSlab"] = "minecraft:oxidized_cut_copper_slab";
  MinecraftItemTypes2["OxidizedCutCopperStairs"] = "minecraft:oxidized_cut_copper_stairs";
  MinecraftItemTypes2["OxidizedLightningRod"] = "minecraft:oxidized_lightning_rod";
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
  MinecraftItemTypes2["PaleOakShelf"] = "minecraft:pale_oak_shelf";
  MinecraftItemTypes2["PaleOakSign"] = "minecraft:pale_oak_sign";
  MinecraftItemTypes2["PaleOakSlab"] = "minecraft:pale_oak_slab";
  MinecraftItemTypes2["PaleOakStairs"] = "minecraft:pale_oak_stairs";
  MinecraftItemTypes2["PaleOakTrapdoor"] = "minecraft:pale_oak_trapdoor";
  MinecraftItemTypes2["PaleOakWood"] = "minecraft:pale_oak_wood";
  MinecraftItemTypes2["PandaSpawnEgg"] = "minecraft:panda_spawn_egg";
  MinecraftItemTypes2["Paper"] = "minecraft:paper";
  MinecraftItemTypes2["ParchedSpawnEgg"] = "minecraft:parched_spawn_egg";
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
  MinecraftItemTypes2["SpruceShelf"] = "minecraft:spruce_shelf";
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
  MinecraftItemTypes2["StoneSpear"] = "minecraft:stone_spear";
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
  MinecraftItemTypes2["WarpedShelf"] = "minecraft:warped_shelf";
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
  MinecraftItemTypes2["WaxedCopperBars"] = "minecraft:waxed_copper_bars";
  MinecraftItemTypes2["WaxedCopperBulb"] = "minecraft:waxed_copper_bulb";
  MinecraftItemTypes2["WaxedCopperChain"] = "minecraft:waxed_copper_chain";
  MinecraftItemTypes2["WaxedCopperChest"] = "minecraft:waxed_copper_chest";
  MinecraftItemTypes2["WaxedCopperDoor"] = "minecraft:waxed_copper_door";
  MinecraftItemTypes2["WaxedCopperGolemStatue"] = "minecraft:waxed_copper_golem_statue";
  MinecraftItemTypes2["WaxedCopperGrate"] = "minecraft:waxed_copper_grate";
  MinecraftItemTypes2["WaxedCopperLantern"] = "minecraft:waxed_copper_lantern";
  MinecraftItemTypes2["WaxedCopperTrapdoor"] = "minecraft:waxed_copper_trapdoor";
  MinecraftItemTypes2["WaxedCutCopper"] = "minecraft:waxed_cut_copper";
  MinecraftItemTypes2["WaxedCutCopperSlab"] = "minecraft:waxed_cut_copper_slab";
  MinecraftItemTypes2["WaxedCutCopperStairs"] = "minecraft:waxed_cut_copper_stairs";
  MinecraftItemTypes2["WaxedExposedChiseledCopper"] = "minecraft:waxed_exposed_chiseled_copper";
  MinecraftItemTypes2["WaxedExposedCopper"] = "minecraft:waxed_exposed_copper";
  MinecraftItemTypes2["WaxedExposedCopperBars"] = "minecraft:waxed_exposed_copper_bars";
  MinecraftItemTypes2["WaxedExposedCopperBulb"] = "minecraft:waxed_exposed_copper_bulb";
  MinecraftItemTypes2["WaxedExposedCopperChain"] = "minecraft:waxed_exposed_copper_chain";
  MinecraftItemTypes2["WaxedExposedCopperChest"] = "minecraft:waxed_exposed_copper_chest";
  MinecraftItemTypes2["WaxedExposedCopperDoor"] = "minecraft:waxed_exposed_copper_door";
  MinecraftItemTypes2["WaxedExposedCopperGolemStatue"] = "minecraft:waxed_exposed_copper_golem_statue";
  MinecraftItemTypes2["WaxedExposedCopperGrate"] = "minecraft:waxed_exposed_copper_grate";
  MinecraftItemTypes2["WaxedExposedCopperLantern"] = "minecraft:waxed_exposed_copper_lantern";
  MinecraftItemTypes2["WaxedExposedCopperTrapdoor"] = "minecraft:waxed_exposed_copper_trapdoor";
  MinecraftItemTypes2["WaxedExposedCutCopper"] = "minecraft:waxed_exposed_cut_copper";
  MinecraftItemTypes2["WaxedExposedCutCopperSlab"] = "minecraft:waxed_exposed_cut_copper_slab";
  MinecraftItemTypes2["WaxedExposedCutCopperStairs"] = "minecraft:waxed_exposed_cut_copper_stairs";
  MinecraftItemTypes2["WaxedExposedLightningRod"] = "minecraft:waxed_exposed_lightning_rod";
  MinecraftItemTypes2["WaxedLightningRod"] = "minecraft:waxed_lightning_rod";
  MinecraftItemTypes2["WaxedOxidizedChiseledCopper"] = "minecraft:waxed_oxidized_chiseled_copper";
  MinecraftItemTypes2["WaxedOxidizedCopper"] = "minecraft:waxed_oxidized_copper";
  MinecraftItemTypes2["WaxedOxidizedCopperBars"] = "minecraft:waxed_oxidized_copper_bars";
  MinecraftItemTypes2["WaxedOxidizedCopperBulb"] = "minecraft:waxed_oxidized_copper_bulb";
  MinecraftItemTypes2["WaxedOxidizedCopperChain"] = "minecraft:waxed_oxidized_copper_chain";
  MinecraftItemTypes2["WaxedOxidizedCopperChest"] = "minecraft:waxed_oxidized_copper_chest";
  MinecraftItemTypes2["WaxedOxidizedCopperDoor"] = "minecraft:waxed_oxidized_copper_door";
  MinecraftItemTypes2["WaxedOxidizedCopperGolemStatue"] = "minecraft:waxed_oxidized_copper_golem_statue";
  MinecraftItemTypes2["WaxedOxidizedCopperGrate"] = "minecraft:waxed_oxidized_copper_grate";
  MinecraftItemTypes2["WaxedOxidizedCopperLantern"] = "minecraft:waxed_oxidized_copper_lantern";
  MinecraftItemTypes2["WaxedOxidizedCopperTrapdoor"] = "minecraft:waxed_oxidized_copper_trapdoor";
  MinecraftItemTypes2["WaxedOxidizedCutCopper"] = "minecraft:waxed_oxidized_cut_copper";
  MinecraftItemTypes2["WaxedOxidizedCutCopperSlab"] = "minecraft:waxed_oxidized_cut_copper_slab";
  MinecraftItemTypes2["WaxedOxidizedCutCopperStairs"] = "minecraft:waxed_oxidized_cut_copper_stairs";
  MinecraftItemTypes2["WaxedOxidizedLightningRod"] = "minecraft:waxed_oxidized_lightning_rod";
  MinecraftItemTypes2["WaxedWeatheredChiseledCopper"] = "minecraft:waxed_weathered_chiseled_copper";
  MinecraftItemTypes2["WaxedWeatheredCopper"] = "minecraft:waxed_weathered_copper";
  MinecraftItemTypes2["WaxedWeatheredCopperBars"] = "minecraft:waxed_weathered_copper_bars";
  MinecraftItemTypes2["WaxedWeatheredCopperBulb"] = "minecraft:waxed_weathered_copper_bulb";
  MinecraftItemTypes2["WaxedWeatheredCopperChain"] = "minecraft:waxed_weathered_copper_chain";
  MinecraftItemTypes2["WaxedWeatheredCopperChest"] = "minecraft:waxed_weathered_copper_chest";
  MinecraftItemTypes2["WaxedWeatheredCopperDoor"] = "minecraft:waxed_weathered_copper_door";
  MinecraftItemTypes2["WaxedWeatheredCopperGolemStatue"] = "minecraft:waxed_weathered_copper_golem_statue";
  MinecraftItemTypes2["WaxedWeatheredCopperGrate"] = "minecraft:waxed_weathered_copper_grate";
  MinecraftItemTypes2["WaxedWeatheredCopperLantern"] = "minecraft:waxed_weathered_copper_lantern";
  MinecraftItemTypes2["WaxedWeatheredCopperTrapdoor"] = "minecraft:waxed_weathered_copper_trapdoor";
  MinecraftItemTypes2["WaxedWeatheredCutCopper"] = "minecraft:waxed_weathered_cut_copper";
  MinecraftItemTypes2["WaxedWeatheredCutCopperSlab"] = "minecraft:waxed_weathered_cut_copper_slab";
  MinecraftItemTypes2["WaxedWeatheredCutCopperStairs"] = "minecraft:waxed_weathered_cut_copper_stairs";
  MinecraftItemTypes2["WaxedWeatheredLightningRod"] = "minecraft:waxed_weathered_lightning_rod";
  MinecraftItemTypes2["WayfinderArmorTrimSmithingTemplate"] = "minecraft:wayfinder_armor_trim_smithing_template";
  MinecraftItemTypes2["WeatheredChiseledCopper"] = "minecraft:weathered_chiseled_copper";
  MinecraftItemTypes2["WeatheredCopper"] = "minecraft:weathered_copper";
  MinecraftItemTypes2["WeatheredCopperBars"] = "minecraft:weathered_copper_bars";
  MinecraftItemTypes2["WeatheredCopperBulb"] = "minecraft:weathered_copper_bulb";
  MinecraftItemTypes2["WeatheredCopperChain"] = "minecraft:weathered_copper_chain";
  MinecraftItemTypes2["WeatheredCopperChest"] = "minecraft:weathered_copper_chest";
  MinecraftItemTypes2["WeatheredCopperDoor"] = "minecraft:weathered_copper_door";
  MinecraftItemTypes2["WeatheredCopperGolemStatue"] = "minecraft:weathered_copper_golem_statue";
  MinecraftItemTypes2["WeatheredCopperGrate"] = "minecraft:weathered_copper_grate";
  MinecraftItemTypes2["WeatheredCopperLantern"] = "minecraft:weathered_copper_lantern";
  MinecraftItemTypes2["WeatheredCopperTrapdoor"] = "minecraft:weathered_copper_trapdoor";
  MinecraftItemTypes2["WeatheredCutCopper"] = "minecraft:weathered_cut_copper";
  MinecraftItemTypes2["WeatheredCutCopperSlab"] = "minecraft:weathered_cut_copper_slab";
  MinecraftItemTypes2["WeatheredCutCopperStairs"] = "minecraft:weathered_cut_copper_stairs";
  MinecraftItemTypes2["WeatheredLightningRod"] = "minecraft:weathered_lightning_rod";
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
  MinecraftItemTypes2["WoodenSpear"] = "minecraft:wooden_spear";
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
  MinecraftItemTypes2["ZombieNautilusSpawnEgg"] = "minecraft:zombie_nautilus_spawn_egg";
  MinecraftItemTypes2["ZombiePigmanSpawnEgg"] = "minecraft:zombie_pigman_spawn_egg";
  MinecraftItemTypes2["ZombieSpawnEgg"] = "minecraft:zombie_spawn_egg";
  MinecraftItemTypes2["ZombieVillagerSpawnEgg"] = "minecraft:zombie_villager_spawn_egg";
  return MinecraftItemTypes2;
})(MinecraftItemTypes || {});
var MinecraftPotionDeliveryTypes = ((MinecraftPotionDeliveryTypes2) => {
  MinecraftPotionDeliveryTypes2["Consume"] = "Consume";
  MinecraftPotionDeliveryTypes2["ThrownLingering"] = "ThrownLingering";
  MinecraftPotionDeliveryTypes2["ThrownSplash"] = "ThrownSplash";
  return MinecraftPotionDeliveryTypes2;
})(MinecraftPotionDeliveryTypes || {});
var MinecraftPotionEffectTypes = ((MinecraftPotionEffectTypes2) => {
  MinecraftPotionEffectTypes2["Awkward"] = "minecraft:awkward";
  MinecraftPotionEffectTypes2["FireResistance"] = "minecraft:fire_resistance";
  MinecraftPotionEffectTypes2["Harming"] = "minecraft:harming";
  MinecraftPotionEffectTypes2["Healing"] = "minecraft:healing";
  MinecraftPotionEffectTypes2["Infested"] = "minecraft:infested";
  MinecraftPotionEffectTypes2["Invisibility"] = "minecraft:invisibility";
  MinecraftPotionEffectTypes2["Leaping"] = "minecraft:leaping";
  MinecraftPotionEffectTypes2["LongFireResistance"] = "minecraft:long_fire_resistance";
  MinecraftPotionEffectTypes2["LongInvisibility"] = "minecraft:long_invisibility";
  MinecraftPotionEffectTypes2["LongLeaping"] = "minecraft:long_leaping";
  MinecraftPotionEffectTypes2["LongMundane"] = "minecraft:long_mundane";
  MinecraftPotionEffectTypes2["LongNightvision"] = "minecraft:long_nightvision";
  MinecraftPotionEffectTypes2["LongPoison"] = "minecraft:long_poison";
  MinecraftPotionEffectTypes2["LongRegeneration"] = "minecraft:long_regeneration";
  MinecraftPotionEffectTypes2["LongSlowFalling"] = "minecraft:long_slow_falling";
  MinecraftPotionEffectTypes2["LongSlowness"] = "minecraft:long_slowness";
  MinecraftPotionEffectTypes2["LongStrength"] = "minecraft:long_strength";
  MinecraftPotionEffectTypes2["LongSwiftness"] = "minecraft:long_swiftness";
  MinecraftPotionEffectTypes2["LongTurtleMaster"] = "minecraft:long_turtle_master";
  MinecraftPotionEffectTypes2["LongWaterBreathing"] = "minecraft:long_water_breathing";
  MinecraftPotionEffectTypes2["LongWeakness"] = "minecraft:long_weakness";
  MinecraftPotionEffectTypes2["Mundane"] = "minecraft:mundane";
  MinecraftPotionEffectTypes2["Nightvision"] = "minecraft:nightvision";
  MinecraftPotionEffectTypes2["Oozing"] = "minecraft:oozing";
  MinecraftPotionEffectTypes2["Poison"] = "minecraft:poison";
  MinecraftPotionEffectTypes2["Regeneration"] = "minecraft:regeneration";
  MinecraftPotionEffectTypes2["SlowFalling"] = "minecraft:slow_falling";
  MinecraftPotionEffectTypes2["Slowness"] = "minecraft:slowness";
  MinecraftPotionEffectTypes2["Strength"] = "minecraft:strength";
  MinecraftPotionEffectTypes2["StrongHarming"] = "minecraft:strong_harming";
  MinecraftPotionEffectTypes2["StrongHealing"] = "minecraft:strong_healing";
  MinecraftPotionEffectTypes2["StrongLeaping"] = "minecraft:strong_leaping";
  MinecraftPotionEffectTypes2["StrongPoison"] = "minecraft:strong_poison";
  MinecraftPotionEffectTypes2["StrongRegeneration"] = "minecraft:strong_regeneration";
  MinecraftPotionEffectTypes2["StrongSlowness"] = "minecraft:strong_slowness";
  MinecraftPotionEffectTypes2["StrongStrength"] = "minecraft:strong_strength";
  MinecraftPotionEffectTypes2["StrongSwiftness"] = "minecraft:strong_swiftness";
  MinecraftPotionEffectTypes2["StrongTurtleMaster"] = "minecraft:strong_turtle_master";
  MinecraftPotionEffectTypes2["Swiftness"] = "minecraft:swiftness";
  MinecraftPotionEffectTypes2["Thick"] = "minecraft:thick";
  MinecraftPotionEffectTypes2["TurtleMaster"] = "minecraft:turtle_master";
  MinecraftPotionEffectTypes2["Water"] = "minecraft:water";
  MinecraftPotionEffectTypes2["WaterBreathing"] = "minecraft:water_breathing";
  MinecraftPotionEffectTypes2["Weakness"] = "minecraft:weakness";
  MinecraftPotionEffectTypes2["Weaving"] = "minecraft:weaving";
  MinecraftPotionEffectTypes2["WindCharged"] = "minecraft:wind_charged";
  MinecraftPotionEffectTypes2["Wither"] = "minecraft:wither";
  return MinecraftPotionEffectTypes2;
})(MinecraftPotionEffectTypes || {});

// scripts/kekkizyutu/zyutu/Wakuti.ts
var Wakuti = class extends ZytuComonClass {
  /**
   * 視覚夢幻の香
   */
  shikakumugennokou(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      entity.addTag(entity.id + "wakuti_kou");
      const entities = entity.dimension.getEntities({
        excludeTags: [entity.id + "wakuti_kou"],
        excludeFamilies: ["inanimate"],
        excludeTypes: ["item"],
        location: entity.location,
        maxDistance: 12
      });
      entity.dimension.spawnParticle("kurokumaft:wakuti_fog", entity.location);
      entities.forEach((en) => {
        if (en instanceof Player39) {
          if (en.getGameMode() !== GameMode3.Spectator && en.getGameMode() !== GameMode3.Creative) {
            en.addEffect(MinecraftEffectTypes.Blindness, 120 * TicksPerSecond35, { amplifier: 5 });
          }
        } else {
          en.addEffect(MinecraftEffectTypes.Blindness, 120 * TicksPerSecond35, { amplifier: 5 });
        }
      });
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      entity.removeTag(entity.id + "wakuti_kou");
    } catch (error) {
    }
  }
  /**
   * 芳霞呪縛の香
   */
  houkazyubakunokou(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      entity.addTag(entity.id + "wakuti_kou");
      const entities = entity.dimension.getEntities({
        excludeTags: [entity.id + "wakuti_kou"],
        excludeFamilies: ["inanimate"],
        excludeTypes: ["item"],
        location: entity.location,
        maxDistance: 12
      });
      entity.dimension.spawnParticle("kurokumaft:wakuti_fog", entity.location);
      entities.forEach((en) => {
        if (en instanceof Player39) {
          if (en.getGameMode() !== GameMode3.Spectator && en.getGameMode() !== GameMode3.Creative) {
            en.addEffect(MinecraftEffectTypes.Slowness, 120 * TicksPerSecond35, { amplifier: 2 });
            en.addEffect(MinecraftEffectTypes.Weakness, 120 * TicksPerSecond35, { amplifier: 5 });
          }
        } else {
          en.addEffect(MinecraftEffectTypes.Slowness, 120 * TicksPerSecond35, { amplifier: 2 });
          en.addEffect(MinecraftEffectTypes.Weakness, 120 * TicksPerSecond35, { amplifier: 5 });
        }
      });
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      entity.removeTag(entity.id + "wakuti_kou");
    } catch (error) {
    }
  }
  /**
   * 白夢幻惑の香
   */
  hakumugenwakunokou(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      entity.addTag(entity.id + "wakuti_kou");
      const entities = entity.dimension.getEntities({
        excludeTags: [entity.id + "wakuti_kou"],
        excludeFamilies: ["inanimate"],
        excludeTypes: ["item"],
        location: entity.location,
        maxDistance: 12
      });
      entity.addTag("exclusion_target");
      entity.dimension.spawnParticle("kurokumaft:wakuti_fog", entity.location);
      entities.forEach((en) => {
        if (en instanceof Player39) {
          if (en.getGameMode() !== GameMode3.Spectator && en.getGameMode() !== GameMode3.Creative) {
            en.addEffect(MinecraftEffectTypes.Nausea, 100 * TicksPerSecond35, { amplifier: 2 });
          }
        } else {
          en.addTag("confusion_target");
        }
      });
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      entity.removeTag(entity.id + "wakuti_kou");
      system77.waitTicks(10 * TicksPerSecond35).then(() => {
        entity.removeTag("exclusion_target");
      }).catch((error) => {
      });
    } catch (error) {
    }
  }
  /**
   * 飢餓蝕命の香
   */
  kigasyokumeinokou(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      entity.addTag(entity.id + "wakuti_kou");
      const entities = entity.dimension.getEntities({
        excludeTags: [entity.id + "wakuti_kou"],
        excludeFamilies: ["inanimate"],
        excludeTypes: ["item"],
        location: entity.location,
        maxDistance: 12
      });
      entity.dimension.spawnParticle("kurokumaft:wakuti_fog", entity.location);
      entities.forEach((en) => {
        if (en instanceof Player39) {
          if (en.getGameMode() !== GameMode3.Spectator && en.getGameMode() !== GameMode3.Creative) {
            en.addEffect(MinecraftEffectTypes.Hunger, 120 * TicksPerSecond35, { amplifier: 15 });
            en.addEffect(MinecraftEffectTypes.MiningFatigue, 120 * TicksPerSecond35, { amplifier: 15 });
          }
        } else {
          const endTick = system77.currentTick * TicksPerSecond35 * 6;
          const num = system77.runInterval(() => {
            if (!en.isValid) {
              system77.clearRun(num);
              return;
            }
            if (endTick <= system77.currentTick) {
              system77.clearRun(num);
              return;
            }
            en.applyDamage(10, {
              cause: EntityDamageCause7.starve
            });
          }, 4);
          en.addEffect(MinecraftEffectTypes.MiningFatigue, 120 * TicksPerSecond35, { amplifier: 15 });
        }
      });
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      entity.removeTag(entity.id + "wakuti_kou");
    } catch (error) {
    }
  }
  /**
   * 紫樹腐毒の香
   */
  shizyufudokunokou(entity) {
    if (entity === void 0) {
      return;
    }
    try {
      entity.addTag(entity.id + "wakuti_kou");
      const entities = entity.dimension.getEntities({
        excludeTags: [entity.id + "wakuti_kou"],
        excludeFamilies: ["inanimate"],
        excludeTypes: ["item"],
        location: entity.location,
        maxDistance: 12
      });
      entity.dimension.spawnParticle("kurokumaft:wakuti_fog", entity.location);
      entities.forEach((en) => {
        if (en instanceof Player39) {
          if (en.getGameMode() !== GameMode3.Spectator && en.getGameMode() !== GameMode3.Creative) {
            en.addEffect(MinecraftEffectTypes.FatalPoison, 120 * TicksPerSecond35, { amplifier: 10 });
          }
        } else {
          en.addTag("fuzi_poison");
        }
      });
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
      entity.removeTag(entity.id + "wakuti_kou");
    } catch (error) {
    }
  }
};

// scripts/kekkizyutu/player/character/ZyutuTamayoComponent.ts
var ZyutuTamayoComponent = class {
  wakuti = new Wakuti();
  /**
   * 変更
   * @param {Player} player
   */
  changeZyutu(player) {
    let kata = player.getProperty("kurokumaft:kekkizyutu_kata");
    const kekkizyutuObject = KekkizyutuObjects[17];
    switch (kata) {
      case kekkizyutuObject.kata[kekkizyutuObject.kata.length - 1]:
        kata = kekkizyutuObject.kata[0];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
        break;
      default:
        const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
        kata = kekkizyutuObject.kata[index + 1];
        player.setProperty("kurokumaft:kekkizyutu_kata", kata);
    }
    player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:kekkizyutu_wakuti" + kata + ".value" }] });
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  /**
   * @param {Entity} entity
   */
  useAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    switch (kata) {
      case 1:
        this.wakuti.shikakumugennokou(entity);
        break;
      case 2:
        this.wakuti.houkazyubakunokou(entity);
        break;
      case 3:
        this.wakuti.hakumugenwakunokou(entity);
        break;
      case 4:
        this.wakuti.kigasyokumeinokou(entity);
        break;
      case 5:
        this.wakuti.shizyufudokunokou(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/mob/TamayoComponent.ts
import { system as system78 } from "@minecraft/server";
var tamayoKekkizyutuLists = weightChoice([
  { item: 1, weight: 20 },
  { item: 2, weight: 20 },
  { item: 3, weight: 20 },
  { item: 4, weight: 20 },
  { item: 5, weight: 20 }
]);
var TamayoComponent = class {
  startMonitoring(entity) {
    try {
      if (entity !== void 0 && entity.isValid) {
        entity.setProperty("kurokumaft:kokyu_use", true);
        entity.setProperty("kurokumaft:kokyu_particle", true);
        this.useAttackZyutu(entity);
      }
    } catch (error) {
    }
  }
  /**
   * @param {Entity} entity
   */
  hitAttackZyutu(entity) {
  }
  useAttackZyutu(entity) {
    try {
      const num = tamayoKekkizyutuLists.pick();
      entity.setProperty("kurokumaft:kekkizyutu_kata", num);
      this.kokyuUse(entity, num);
    } catch (error) {
    }
  }
  kokyuUse(entity, kata) {
    const wakuti = new Wakuti();
    try {
      if (!entity.isValid) {
        return;
      }
      switch (kata) {
        case 1:
          entity.triggerEvent("kurokumaft:attack_stop");
          wakuti.shikakumugennokou(entity);
          system78.waitTicks(2).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 2:
          entity.triggerEvent("kurokumaft:attack_stop");
          wakuti.houkazyubakunokou(entity);
          system78.waitTicks(2).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 3:
          entity.triggerEvent("kurokumaft:attack_stop");
          wakuti.hakumugenwakunokou(entity);
          system78.waitTicks(2).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 4:
          entity.triggerEvent("kurokumaft:attack_stop");
          wakuti.kigasyokumeinokou(entity);
          system78.waitTicks(2).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
        case 5:
          entity.triggerEvent("kurokumaft:attack_stop");
          wakuti.shizyufudokunokou(entity);
          system78.waitTicks(2).then(() => {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
            entity.triggerEvent("kurokumaft:kekkizyutu_end");
          }).catch((error) => {
          });
          break;
      }
    } catch (error) {
    }
  }
};

// scripts/item/weapon/KekkizyutuTypes.ts
var KekkizyutuClassRecord = /* @__PURE__ */ new Map();
KekkizyutuClassRecord.set("nezuko", new ZyutuNezukoComponent());
KekkizyutuClassRecord.set("rui", new ZyutuRuiComponent());
KekkizyutuClassRecord.set("akaza", new ZyutuAkazaComponent());
KekkizyutuClassRecord.set("daki", new ZyutuDakiComponent());
KekkizyutuClassRecord.set("gyutaro", new ZyutuGyutaroComponent());
KekkizyutuClassRecord.set("sekido", new ZyutuSekidoComponent());
KekkizyutuClassRecord.set("karaku", new ZyutuKarakuComponent());
KekkizyutuClassRecord.set("aizetu", new ZyutuAizetuComponent());
KekkizyutuClassRecord.set("urogi", new ZyutuUrogiComponent());
KekkizyutuClassRecord.set("zouhakuten", new ZyutuZouhakutenComponent());
KekkizyutuClassRecord.set("douma", new ZyutuDoumaComponent());
KekkizyutuClassRecord.set("kokushibou", new ZyutuKokushibouComponent());
KekkizyutuClassRecord.set("kaigaku", new ZyutuKaigakuComponent());
KekkizyutuClassRecord.set("gyokko", new ZyutuGyokkoComponent());
KekkizyutuClassRecord.set("susamaru", new ZyutuSusamaruComponent());
KekkizyutuClassRecord.set("yahaba", new ZyutuYahabaComponent());
KekkizyutuClassRecord.set("nakime", new ZyutuNakimeComponent());
KekkizyutuClassRecord.set("tamayo", new ZyutuTamayoComponent());
var KekkizyutuObjects = Object.freeze([
  {
    itemName: "kurokumaft:bakketu",
    type: 1,
    kata: [1],
    kata_msg: "kekkizyutu_bakketu",
    className: "nezuko"
  },
  {
    itemName: "kurokumaft:koushi",
    type: 2,
    kata: [1, 2, 3],
    kata_msg: "kekkizyutu_ito",
    className: "rui"
  },
  {
    itemName: "kurokumaft:hakaisatu_item",
    type: 3,
    kata: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    kata_msg: "kekkizyutu_hakai",
    className: "akaza"
  },
  {
    itemName: "kurokumaft:obi_item",
    type: 4,
    kata: [1, 2, 3, 4],
    kata_msg: "kekkizyutu_obi",
    className: "daki"
  },
  {
    itemName: "kurokumaft:gyutaro_kama",
    type: 5,
    kata: [1, 2, 3],
    kata_msg: "kekkizyutu_tigama",
    className: "gyutaro"
  },
  {
    itemName: "kurokumaft:sekido_syakuzyou",
    type: 6,
    kata: [1],
    kata_msg: "kekkizyutu_ikazuti",
    className: "sekido"
  },
  {
    itemName: "kurokumaft:karaku_ougi",
    type: 7,
    kata: [1],
    kata_msg: "kekkizyutu_toppu",
    className: "karaku"
  },
  {
    itemName: "kurokumaft:aizetu_spear",
    type: 8,
    kata: [1],
    kata_msg: "kekkizyutu_shitotu",
    className: "aizetu"
  },
  {
    itemName: "kurokumaft:urogi_ultrasonic_item",
    type: 9,
    kata: [1],
    kata_msg: "kekkizyutu_kyoumei",
    className: "urogi"
  },
  {
    itemName: "kurokumaft:zouhakuten_bati",
    type: 10,
    kata: [1, 2, 3, 4],
    kata_msg: "kekkizyutu_zouhakuten",
    className: "zouhakuten"
  },
  {
    itemName: "kurokumaft:douma_sensu",
    type: 11,
    kata: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    kata_msg: "kekkizyutu_koori",
    className: "douma"
  },
  {
    itemName: "kurokumaft:kyokokukamusari",
    type: 12,
    kata: [1, 2, 3, 5, 6, 7, 8, 9, 10, 14, 16],
    kata_msg: "tuki_kata",
    className: "kokushibou"
  },
  {
    itemName: "kurokumaft:nichirintou_kaigaku",
    type: 13,
    kata: [2, 3, 4, 5, 6],
    kata_msg: "kaminari_kata",
    className: "kaigaku"
  },
  {
    itemName: "kurokumaft:gyokko_tubo",
    type: 14,
    kata: [1, 2, 3, 4, 5, 6],
    kata_msg: "kekkizyutu_tubo",
    className: "gyokko"
  },
  {
    itemName: "kurokumaft:susamaru_mari",
    type: 15,
    kata: [1, 2],
    kata_msg: "kekkizyutu_mari",
    className: "susamaru"
  },
  {
    itemName: "kurokumaft:kouketunoya",
    type: 16,
    kata: [1, 2, 3, 4],
    kata_msg: "kekkizyutu_kouketunoya",
    className: "yahaba"
  },
  {
    itemName: "kurokumaft:nakime_biwa",
    type: 17,
    kata: [1, 2],
    kata_msg: "kekkizyutu_biwa",
    className: "nakime"
  },
  {
    itemName: "kurokumaft:wakuti",
    type: 18,
    kata: [1, 2, 3, 4, 5],
    kata_msg: "kekkizyutu_wakuti",
    className: "tamayo"
  }
]);
var KekkizyutuMobClassRecord = /* @__PURE__ */ new Map();
KekkizyutuMobClassRecord.set("tokage", new TokageComponent());
KekkizyutuMobClassRecord.set("nezuko", new NezukoComponent());
KekkizyutuMobClassRecord.set("daki", new DakiComponent());
KekkizyutuMobClassRecord.set("gyutaro", new GyutaroComponent());
KekkizyutuMobClassRecord.set("rui", new RuiComponent());
KekkizyutuMobClassRecord.set("akaza", new AkazaComponent());
KekkizyutuMobClassRecord.set("aizetu", new AizetuComponent());
KekkizyutuMobClassRecord.set("karaku", new KarakuComponent());
KekkizyutuMobClassRecord.set("sekido", new SekidoComponent());
KekkizyutuMobClassRecord.set("urogi", new UrogiComponent());
KekkizyutuMobClassRecord.set("zouhakuten", new ZouhakutenComponent());
KekkizyutuMobClassRecord.set("kokushibou", new KokushibouComponent());
KekkizyutuMobClassRecord.set("kaigaku", new KaigakuComponent());
KekkizyutuMobClassRecord.set("douma", new DoumaComponent());
KekkizyutuMobClassRecord.set("kessyounomiko", new KessyounomikoComponent());
KekkizyutuMobClassRecord.set("muhyousuirenbosatu", new MuhyousuirenbosatuComponent());
KekkizyutuMobClassRecord.set("gyokko", new GyokkoComponent());
KekkizyutuMobClassRecord.set("susamaru", new SusamaruComponent());
KekkizyutuMobClassRecord.set("yahaba", new YahabaComponent());
KekkizyutuMobClassRecord.set("nakime", new NakimeComponent());
KekkizyutuMobClassRecord.set("tamayo", new TamayoComponent());
var KekkizyutuMobObjects = Object.freeze([
  {
    entityName: "kurokumaft:tokage",
    className: "tokage"
  },
  {
    entityName: "kurokumaft:nezuko",
    className: "nezuko"
  },
  {
    entityName: "kurokumaft:daki",
    className: "daki"
  },
  {
    entityName: "kurokumaft:gyutaro",
    className: "gyutaro"
  },
  {
    entityName: "kurokumaft:rui",
    className: "rui"
  },
  {
    entityName: "kurokumaft:akaza",
    className: "akaza"
  },
  {
    entityName: "kurokumaft:aizetu",
    className: "aizetu"
  },
  {
    entityName: "kurokumaft:karaku",
    className: "karaku"
  },
  {
    entityName: "kurokumaft:sekido",
    className: "sekido"
  },
  {
    entityName: "kurokumaft:urogi",
    className: "urogi"
  },
  {
    entityName: "kurokumaft:zouhakuten",
    className: "zouhakuten"
  },
  {
    entityName: "kurokumaft:kokushibou",
    className: "kokushibou"
  },
  {
    entityName: "kurokumaft:kaigaku",
    className: "kaigaku"
  },
  {
    entityName: "kurokumaft:douma",
    className: "douma"
  },
  {
    entityName: "kurokumaft:kessyounomiko",
    className: "kessyounomiko"
  },
  {
    entityName: "kurokumaft:muhyousuirenbosatu",
    className: "muhyousuirenbosatu"
  },
  {
    entityName: "kurokumaft:gyokko",
    className: "gyokko"
  },
  {
    entityName: "kurokumaft:susamaru",
    className: "susamaru"
  },
  {
    entityName: "kurokumaft:yahaba",
    className: "yahaba"
  },
  {
    entityName: "kurokumaft:nakime",
    className: "nakime"
  },
  {
    entityName: "kurokumaft:tamayo",
    className: "tamayo"
  }
]);
async function startKekkizyutuMonitoringMob(entity, className) {
  const kekkizyutuClass = KekkizyutuMobClassRecord.get(className);
  if (kekkizyutuClass !== void 0) {
    kekkizyutuClass.startMonitoring(entity);
  }
}
async function hitKekkizyutuAttackKataMob(entity, className) {
  const kekkizyutuClass = KekkizyutuMobClassRecord.get(className);
  if (kekkizyutuClass !== void 0) {
    kekkizyutuClass.hitAttackZyutu(entity);
  }
}
async function hitKekkizyutuAttackKata(entity, className) {
  const kekkizyutuClass = KekkizyutuClassRecord.get(className);
  if (kekkizyutuClass !== void 0) {
    kekkizyutuClass.hitAttackZyutu(entity);
  }
}

// scripts/item/weapon/kekkizyutu/KekkizyutuComponent.ts
var KekkizyutuComponent = class {
  // 右クリック
  onUse(event) {
    const player = event.source;
    if (player.isSneaking) {
      const kekkizyutu = player.getProperty("kurokumaft:kekkizyutu_type");
      const object = KekkizyutuObjects.find((ob) => ob.type === kekkizyutu);
      const kekkizyutuClass = KekkizyutuClassRecord.get(object.className);
      if (kekkizyutuClass !== void 0) {
        kekkizyutuClass.changeZyutu(player);
      }
      return;
    } else {
      if (!player.getProperty("kurokumaft:kokyu_use")) {
        const equ = player.getComponent(EntityComponentTypes19.Equippable);
        const mainHand = equ.getEquipment(EquipmentSlot6.Mainhand);
        if (mainHand !== void 0) {
          const object = KekkizyutuObjects.find((ob) => ob.itemName === mainHand.typeId);
          const kekkizyutuClass = KekkizyutuClassRecord.get(object.className);
          if (kekkizyutuClass !== void 0) {
            player.setProperty("kurokumaft:kokyu_use", true);
            player.setProperty("kurokumaft:kokyu_particle", true);
            kekkizyutuClass.useAttackZyutu(player);
          }
        }
      }
    }
  }
};
world11.afterEvents.itemReleaseUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;
  const duration = event.useDuration;
  const kekkizyutu = player.getProperty("kurokumaft:kekkizyutu_type");
  if (item !== void 0 && kekkizyutu !== void 0 && kekkizyutu !== 0) {
    if (player.getProperty("kurokumaft:kokyu_use")) {
      const object = KekkizyutuObjects.find((ob) => ob.type === kekkizyutu);
      const kekkizyutuClass = KekkizyutuClassRecord.get(object.className);
      if (kekkizyutuClass !== void 0) {
        kekkizyutuClass.releaseAttackZyutu(player);
      }
    }
  }
});

// scripts/item/tool/MeatEating.ts
import { TicksPerSecond as TicksPerSecond36 } from "@minecraft/server";
var MeatEating = class {
  onConsume(event) {
    const item = event.itemStack;
    const player = event.source;
    const rank = player.getProperty("kurokumaft:ogre_rank");
    let becoming = player.getProperty("kurokumaft:ogre_becoming");
    if (item.typeId === "kurokumaft:meat_chunk") {
      becoming = becoming + 10;
    } else if (item.typeId === "kurokumaft:rare_blood") {
      becoming = becoming + 100;
    }
    if ("none" === rank) {
      player.addEffect("minecraft:hunger", 15 * TicksPerSecond36, {
        amplifier: 5,
        showParticles: false
      });
      player.addEffect("minecraft:nausea", 10 * TicksPerSecond36, {
        amplifier: 1,
        showParticles: false
      });
    } else {
      new OgreEatCommon().upRankCheck(rank, player, becoming);
    }
  }
};

// scripts/item/tool/DemonizationReversal.ts
import { TicksPerSecond as TicksPerSecond37, ItemStack as ItemStack25, system as system79, EntityComponentTypes as EntityComponentTypes20 } from "@minecraft/server";
var DemonizationReversal = class {
  onConsume(event) {
    const player = event.source;
    const rank = player.getProperty("kurokumaft:ogre_rank");
    if ("none" !== rank) {
      player.addEffect("minecraft:hunger", 60 * TicksPerSecond37, {
        amplifier: 5,
        showParticles: false
      });
      player.addEffect("minecraft:weakness", 60 * TicksPerSecond37, {
        amplifier: 5,
        showParticles: false
      });
      player.addEffect("minecraft:nausea", 30 * TicksPerSecond37, {
        amplifier: 1,
        showParticles: false
      });
      player.addEffect("minecraft:wither", 60 * TicksPerSecond37, {
        amplifier: 10,
        showParticles: false
      });
      system79.waitTicks(60 * TicksPerSecond37).then(() => {
        player.setProperty("kurokumaft:ogre_rank", "none");
        player.setProperty("kurokumaft:ogre_becoming", 0);
        player.removeEffect("minecraft:regeneration");
        system79.runTimeout(() => {
          player.triggerEvent("kurokumaft:ogre_rank_change");
          player.triggerEvent("kurokumaft:kaikyu_change");
        }, 2);
        const Inventory = player.getComponent(EntityComponentTypes20.Inventory);
        const container = Inventory.container;
        if (container !== void 0) {
          const itemstack = container.getItem(0);
          if (itemstack !== void 0) {
            const kekkizyutu = kekkizyutuLists.find((items) => items.item === itemstack.typeId);
            if (kekkizyutu !== void 0) {
              container.setItem(0, new ItemStack25(kekkizyutu.item));
            }
          }
        }
      });
    }
  }
};

// scripts/custom/KimetuCustomComponentRegistry.ts
function initRegisterKimetuCustom(initEvent) {
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_component", new NichirintouComponent());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:blood_drinking", new BloodDrinking());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:meat_eating", new MeatEating());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:demonization_reversal_potion", new DemonizationReversal());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:kekkizyutu_component", new KekkizyutuComponent());
}

// scripts/player/KimetuEquipmentTick.ts
import { EntityComponentTypes as EntityComponentTypes21, EquipmentSlot as EquipmentSlot7, system as system80 } from "@minecraft/server";
var KimetuEquipmentTick = class {
  player;
  num;
  constructor(player) {
    this.player = player;
    this.num = 0;
  }
  startMonitoring() {
    this.num = system80.runInterval(() => {
      if (this.player.isValid) {
        this.checkPlayerKimetuEquTick();
        this.checkPlayerKaikyuTick();
      } else {
        system80.clearRun(this.num);
      }
    }, 5);
  }
  async checkPlayerKaikyuTick() {
    if (this.player.isValid) {
      let kataMess = "";
      let kaikyu = "";
      let rankuPoint = "";
      try {
        const ogreRank = this.player.getProperty("kurokumaft:ogre_rank");
        const kaikyuNum = this.player.getProperty("kurokumaft:kaikyu");
        if (ogreRank !== "none") {
          const ogreMoon = this.player.getProperty("kurokumaft:ogre_moon");
          kaikyu = "msg.kurokumaft:ogrerank_" + ogreRank + ("quarter" === ogreRank || "crescent" === ogreRank ? ogreMoon : "") + ".value";
          const becoming = this.player.getProperty("kurokumaft:ogre_becoming");
          const rank = ogrePointList.find((rank2) => rank2.name === ogreRank);
          rankuPoint = becoming + "/" + rank?.value;
        } else if (kaikyuNum > 0) {
          kaikyu = "msg.kurokumaft:kaikyu" + kaikyuNum + ".value";
          const point = this.player.getProperty("kurokumaft:ogre_kill");
          rankuPoint = point + "/" + kaikyuPointList[kaikyuNum];
        }
        const nichirintou_type = this.player.getProperty("kurokumaft:nichirintou_type");
        const kokyuObject = KokyuObjects.find((ob) => ob.type === nichirintou_type);
        if (kokyuObject !== void 0) {
          if (this.player.isSneaking && !this.player.getDynamicProperty("kurokumaft:attack_time")) {
            this.player.triggerEvent("kurokumaft:add_damage_guard");
          } else {
            this.player.triggerEvent("kurokumaft:remove_damage_guard");
          }
          if (kokyuObject.type > 1) {
            const kataNum = this.player.getProperty("kurokumaft:kokyu_kata");
            const index = kokyuObject.kata.findIndex((el) => el === kataNum);
            if (kokyuObject.type === 2) {
              if (index > 9) {
                if (kokyuObject.kata[index] !== void 0) {
                  kataMess = "msg.kurokumaft:hinokami_kata" + kokyuObject.kata[index] + ".value";
                }
              } else {
                kataMess = "msg.kurokumaft:" + kokyuObject.kata_msg + kokyuObject.kata[index] + ".value";
              }
            } else {
              if (kokyuObject.kata[index] !== void 0) {
                kataMess = "msg.kurokumaft:" + kokyuObject.kata_msg + kokyuObject.kata[index] + ".value";
              }
            }
          }
        } else {
          this.player.triggerEvent("kurokumaft:remove_damage_guard");
        }
        const kekkizyutu_type = this.player.getProperty("kurokumaft:kekkizyutu_type");
        const kekkizyutuObject = KekkizyutuObjects.find((ob) => ob.type === kekkizyutu_type);
        if (kekkizyutuObject !== void 0) {
          const kataNum = this.player.getProperty("kurokumaft:kekkizyutu_kata");
          const index = kekkizyutuObject.kata.findIndex((el) => el === kataNum);
          if (kekkizyutuObject.kata[index] !== void 0) {
            kataMess = "msg.kurokumaft:" + kekkizyutuObject.kata_msg + kekkizyutuObject.kata[index] + ".value";
          }
        }
      } catch (error) {
      } finally {
        this.player.onScreenDisplay.setTitle(
          {
            rawtext: [
              { text: "\u968E\u7D1A\uFF1A" },
              { translate: kaikyu },
              { text: "\n" },
              { text: "\u6B8B\u308A\uFF1A" },
              { translate: rankuPoint },
              { text: "\n" },
              { translate: kataMess }
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
    }
  }
  async checkPlayerKimetuEquTick() {
    if (this.player.isValid) {
      const equ = this.player.getComponent(EntityComponentTypes21.Equippable);
      const mainHand = equ.getEquipment(EquipmentSlot7.Mainhand);
      if (mainHand !== void 0) {
        const kokyuObject = KokyuObjects.find((ob) => ob.itemName === mainHand.typeId);
        if (kokyuObject !== void 0) {
          this.player.setProperty("kurokumaft:kekkizyutu_type", 0);
          if (this.player.getProperty("kurokumaft:nichirintou_type") !== kokyuObject.type) {
            this.player.setProperty("kurokumaft:nichirintou_type", kokyuObject.type);
            if (kokyuObject.type > 1) {
              this.player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
              this.player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:" + kokyuObject.kata_msg + kokyuObject.kata[0] + ".value" }] });
            }
            this.player.setProperty("kurokumaft:kokyu_use", false);
            this.player.setProperty("kurokumaft:kokyu_particle", false);
            this.player.setProperty("kurokumaft:kokyu_attack", false);
            this.player.setProperty("kurokumaft:kokyu_chage", 0);
            this.player.setProperty("kurokumaft:kokyu_ran", 0);
            this.player.setDynamicProperty("kurokumaft:chage_type", void 0);
            this.player.setProperty("kurokumaft:kekkizyutu_type", 0);
            this.player.setProperty("kurokumaft:kekkizyutu_kata", 0);
          }
        } else {
          this.player.setProperty("kurokumaft:nichirintou_type", 0);
          this.player.setProperty("kurokumaft:kokyu_kata", 0);
          const kekkizyutuObject = KekkizyutuObjects.find((ob) => ob.itemName === mainHand.typeId);
          if (kekkizyutuObject !== void 0) {
            if (this.player.getProperty("kurokumaft:kekkizyutu_type") !== kekkizyutuObject.type) {
              this.player.setProperty("kurokumaft:kekkizyutu_type", kekkizyutuObject.type);
              this.player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[0]);
              this.player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "msg.kurokumaft:" + kekkizyutuObject.kata_msg + kekkizyutuObject.kata[0] + ".value" }] });
            }
          } else {
            this.player.setProperty("kurokumaft:kokyu_use", false);
            this.player.setProperty("kurokumaft:kokyu_particle", false);
            this.player.setProperty("kurokumaft:kokyu_attack", false);
            this.player.setProperty("kurokumaft:kokyu_chage", 0);
            this.player.setProperty("kurokumaft:kokyu_ran", 0);
            this.player.setDynamicProperty("kurokumaft:chage_type", void 0);
            this.player.setProperty("kurokumaft:kekkizyutu_type", 0);
            this.player.setProperty("kurokumaft:kekkizyutu_kata", 0);
          }
        }
      } else {
        if (this.player.getProperty("kurokumaft:nichirintou_type") !== 0) {
          this.player.setProperty("kurokumaft:nichirintou_type", 0);
          this.player.setProperty("kurokumaft:kokyu_kata", 0);
        }
        if (this.player.getProperty("kurokumaft:kekkizyutu_type") !== 0) {
          this.player.setProperty("kurokumaft:kekkizyutu_type", 0);
          this.player.setProperty("kurokumaft:kekkizyutu_kata", 0);
        }
        this.player.setProperty("kurokumaft:kokyu_use", false);
        this.player.setProperty("kurokumaft:kokyu_particle", false);
        this.player.setProperty("kurokumaft:kokyu_attack", false);
        this.player.setProperty("kurokumaft:kokyu_chage", 0);
        this.player.setProperty("kurokumaft:kokyu_ran", 0);
        this.player.setDynamicProperty("kurokumaft:chage_type", void 0);
      }
    }
  }
};

// scripts/player/RaisingStatusCheckClass.ts
import { system as system81 } from "@minecraft/server";
var Mutex = class {
  _lock = Promise.resolve();
  async lock() {
    let unlockNext;
    const willLock = new Promise((resolve) => {
      unlockNext = resolve;
    });
    const unlock = () => unlockNext();
    const previousLock = this._lock;
    this._lock = this._lock.then(() => willLock);
    await previousLock;
    return unlock;
  }
};
var RaisingStatusCheckClass = class {
  mutex = new Mutex();
  async statusCheck(player, ogre) {
    const unlock = await this.mutex.lock();
    try {
      const kaikyu = player.getProperty("kurokumaft:kaikyu");
      const count = player.getProperty("kurokumaft:ogre_kill");
      if (ogre === void 0 || !ogre.isValid) {
        return;
      }
      const point = ogre.getProperty("kurokumaft:ogre_point");
      let upPoint = count + point;
      let killtarget = 0;
      switch (kaikyu) {
        case 10:
          const rank = ogre.getProperty("kurokumaft:ogre_rank");
          if (rank === "crescent") {
            if (10 <= count + 1) {
              player.setProperty("kurokumaft:kaikyu", kaikyu + 1);
              player.setProperty("kurokumaft:ogre_kill", 0);
              system81.runTimeout(() => {
                player.triggerEvent("kurokumaft:kaikyu_change");
              }, 4);
            } else {
              player.setProperty("kurokumaft:ogre_kill", count + 1);
            }
          }
          break;
        case 9:
          killtarget = killtarget + 900;
        case 8:
          killtarget = killtarget + 800;
        case 7:
          killtarget = killtarget + 700;
        case 6:
          killtarget = killtarget + 600;
        case 5:
          killtarget = killtarget + 500;
        case 4:
          killtarget = killtarget + 400;
        case 3:
          killtarget = killtarget + 300;
        case 2:
          killtarget = killtarget + 200;
        case 1:
          killtarget = killtarget + 100;
          if (upPoint >= killtarget) {
            player.setProperty("kurokumaft:kaikyu", kaikyu + 1);
            player.setProperty("kurokumaft:ogre_kill", 0);
            system81.runTimeout(() => {
              player.triggerEvent("kurokumaft:kaikyu_change");
            }, 4);
          } else {
            player.setProperty("kurokumaft:ogre_kill", upPoint);
          }
          break;
        case 0:
          player.setProperty("kurokumaft:kaikyu", kaikyu + 1);
          player.setProperty("kurokumaft:ogre_kill", 0);
          system81.runTimeout(() => {
            player.triggerEvent("kurokumaft:kaikyu_change");
          }, 4);
          break;
      }
    } finally {
      system81.waitTicks(5).then(() => {
        unlock();
      });
    }
  }
};

// scripts/kimetu_script.ts
import { ActionFormData as ActionFormData2 } from "@minecraft/server-ui";
system82.beforeEvents.startup.subscribe((initEvent) => {
  initRegisterKimetuCustom(initEvent);
});
world13.beforeEvents.playerLeave.subscribe((leaveEvent) => {
  leaveEvent.player.clearDynamicProperties();
});
world13.afterEvents.playerSpawn.subscribe((event) => {
  if (event.initialSpawn) {
    event.player.setProperty("kurokumaft:kokyu_use", false);
    event.player.setProperty("kurokumaft:kokyu_particle", false);
    event.player.setProperty("kurokumaft:kokyu_attack", false);
    event.player.setProperty("kurokumaft:kokyu_chage", 0);
    event.player.setProperty("kurokumaft:kokyu_ran", 0);
    event.player.setDynamicProperty("kurokumaft:chage_type", void 0);
  }
  const familyTypes = event.player.getComponent(EntityComponentTypes22.TypeFamily);
  if (familyTypes !== void 0 && familyTypes.hasTypeFamily("ogre")) {
    event.player.triggerEvent("kurokumaft:player_spawned_ogre");
  } else if (familyTypes !== void 0 && familyTypes.hasTypeFamily("regimental_player")) {
    event.player.triggerEvent("kurokumaft:player_spawned_regimental");
  } else if (familyTypes !== void 0 && familyTypes.hasTypeFamily("regimental_soldier")) {
    event.player.triggerEvent("kurokumaft:kaikyu_change");
  } else {
    event.player.triggerEvent("kurokumaft:player_spawned_init");
  }
  event.player.removeTag("hostility_player");
  const playerTick = new KimetuEquipmentTick(event.player);
  playerTick.startMonitoring();
});
world13.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
  const entity = event.entity;
  if (entity instanceof Player45) {
    if (event.eventId === "kurokumaft:attack_time") {
      entity.setDynamicProperty("kurokumaft:attack_time", true);
      entity.triggerEvent("kurokumaft:remove_damage_guard");
      system82.runTimeout(() => {
        entity.setDynamicProperty("kurokumaft:attack_time", false);
      }, 20);
      const equ = entity.getComponent(EntityComponentTypes22.Equippable);
      const mainHand = equ.getEquipment(EquipmentSlot8.Mainhand);
      if (mainHand !== void 0) {
        const object = KokyuObjects.find((ob) => ob.itemName === mainHand.typeId);
        if (object !== void 0 && object.type > 0 && !entity.getProperty("kurokumaft:kokyu_attack")) {
          entity.setProperty("kurokumaft:kokyu_attack", true);
          system82.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_attack", false);
          }, 3);
          hitKokyuAttackKataMob(entity, object.className);
        } else {
          if (mainHand.typeId === "kurokumaft:kyokokukamusari" || mainHand.typeId === "kurokumaft:nichirintou_kaigaku") {
            entity.setProperty("kurokumaft:kokyu_attack", true);
            system82.runTimeout(() => {
              entity.setProperty("kurokumaft:kokyu_attack", false);
            }, 3);
            const kekkizyutuObject = KekkizyutuObjects.find((ob) => ob.itemName === mainHand.typeId);
            hitKekkizyutuAttackKata(entity, kekkizyutuObject.className);
          }
        }
      }
    } else if (event.eventId === "kurokumaft:damaged_by_player") {
      entity.applyDamage(0, {
        cause: EntityDamageCause8.entityAttack,
        damagingEntity: entity
      });
    } else if (event.eventId === "kurokumaft:damage_guard") {
      entity.playSound("damage_guard.nitirintou_blocking", {
        pitch: 1,
        volume: 1
      });
      const equ = entity.getComponent(EntityComponentTypes22.Equippable);
      const mainHand = equ.getEquipment(EquipmentSlot8.Mainhand);
      if (mainHand !== void 0) {
        ItemDurabilityDamage(entity, mainHand);
      }
    }
  } else {
    if (event.eventId === "kurokumaft:kokyu_start") {
      if (entity.typeId.indexOf("kurokumaft:regimental") !== -1) {
        const nichirintoutype = entity.getProperty("kurokumaft:nichirintou_type");
        if (nichirintoutype !== void 0) {
          const kokyuObject = KokyuObjects.find((ob) => ob.type === nichirintoutype);
          if (kokyuObject !== void 0) {
            const katana = KokyuMobObjects.find((ob) => ob.entityName === kokyuObject.itemName);
            if (katana !== void 0) {
              startKokyuMonitoringMob(entity, katana.className);
            }
          }
        }
      } else {
        const taishi = KokyuMobObjects.find((ob) => ob.entityName === entity.typeId);
        if (taishi !== void 0) {
          startKokyuMonitoringMob(entity, taishi.className);
        }
      }
    } else if (event.eventId === "kurokumaft:kekkizyutu_start") {
      const ogre = KekkizyutuMobObjects.find((ob) => ob.entityName === entity.typeId);
      if (ogre !== void 0) {
        startKekkizyutuMonitoringMob(entity, ogre.className);
      }
    } else if (event.eventId === "kurokumaft:ibuki_start") {
      ibuki(entity);
    } else if (event.eventId === "kurokumaft:gyokko_move") {
      gyokkoMove(entity);
    } else if (event.eventId === "kurokumaft:attack_time") {
      entity.setProperty("kurokumaft:kokyu_attack", true);
      system82.runTimeout(() => {
        entity.setProperty("kurokumaft:kokyu_attack", false);
      }, 10);
      if (entity.typeId.indexOf("kurokumaft:regimental") !== -1) {
        const nichirintoutype = entity.getProperty("kurokumaft:nichirintou_type");
        if (nichirintoutype !== void 0) {
          const kokyuObject = KokyuObjects.find((ob) => ob.type === nichirintoutype);
          if (kokyuObject !== void 0) {
            const katana = KokyuMobObjects.find((ob) => ob.entityName === kokyuObject.itemName);
            if (katana !== void 0) {
              hitKokyuAttackKataMob(entity, katana.className);
            }
          }
        }
      } else {
        const taishi = KokyuMobObjects.find((ob) => ob.entityName === entity.typeId);
        if (taishi !== void 0) {
          hitKokyuAttackKataMob(entity, taishi.className);
        }
        const ogre = KekkizyutuMobObjects.find((ob) => ob.entityName === entity.typeId);
        if (ogre !== void 0) {
          hitKekkizyutuAttackKataMob(entity, ogre.className);
        }
      }
    }
  }
  if (event.eventId === "kurokumaft:sun_fire") {
    sunLightFire(entity);
  }
});
async function sunLightFire(entity) {
  if (entity !== void 0 && entity.isValid) {
    entity.setOnFire(1, true);
  }
}
world13.afterEvents.itemStopUse.subscribe((event) => {
  const source = event.source;
  const item = event.itemStack;
  if (source instanceof Player45 && item !== void 0) {
    const use = source.getProperty("kurokumaft:kokyu_use");
    const equippable = source.getComponent(EntityComponentTypes22.Equippable);
    const mainHand = equippable.getEquipment(EquipmentSlot8.Mainhand);
    if ((mainHand === void 0 || mainHand.typeId !== item.typeId) && use) {
      source.setProperty("kurokumaft:kokyu_use", false);
      source.setProperty("kurokumaft:kokyu_particle", false);
      source.setProperty("kurokumaft:kokyu_attack", false);
      source.setProperty("kurokumaft:kokyu_chage", 0);
      source.setProperty("kurokumaft:kokyu_ran", 0);
      source.setDynamicProperty("kurokumaft:chage_type", void 0);
    }
  }
});
var ogreRankLists = weightChoice([
  { item: "low", weight: 30 },
  { item: "unusual", weight: 20 },
  { item: "quarter", weight: 20 },
  { item: "crescent", weight: 20 }
]);
world13.afterEvents.entitySpawn.subscribe((event) => {
  const entity = event.entity;
  try {
    if (entity !== void 0 && entity.isValid) {
      const taishibject = TaishiKaikyu.find((taishi) => taishi.name === entity.typeId);
      if (taishibject !== void 0 && event.cause === EntityInitializationCause.Spawned) {
        const kaikyuRan = getRandomInRange(taishibject.min, taishibject.max);
        entity.setProperty("kurokumaft:kaikyu", kaikyuRan);
        system82.waitTicks(4).then(() => {
          entity.triggerEvent("kurokumaft:kaikyu_change");
          system82.waitTicks(4).then(() => {
            const health = entity.getComponent(EntityComponentTypes22.Health);
            health.resetToMaxValue();
          }).catch((error) => {
            console.error(error);
          });
        }).catch((error) => {
          console.error(error);
        });
      }
      const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
      if (event.cause === EntityInitializationCause.Spawned) {
        if (entity.typeId === "kurokumaft:nezuko") {
          const rankRan = ogreRankLists.pick();
          entity.setProperty("kurokumaft:ogre_rank", rankRan);
          if (ogre_rank === "quarter" || ogre_rank === "crescent") {
            entity.setProperty("kurokumaft:ogre_moon", getRandomInRange(1, 6));
          }
          system82.waitTicks(4).then(() => {
            entity.triggerEvent("kurokumaft:ogre_rank_change");
          }).catch((error) => {
          });
        } else if (entity.typeId === "kurokumaft:ogre") {
          entity.setProperty("kurokumaft:ogre_rank", "low");
          entity.setProperty("kurokumaft:ogre_point", getRandomInRange(10, 60));
        } else {
          const ogreObject = OgreKaikyu.find((ogre) => ogre.name === entity.typeId);
          if (ogreObject !== void 0) {
            entity.setProperty("kurokumaft:ogre_rank", ogreObject.rank);
          }
        }
      }
    }
  } catch (error) {
  }
});
var raishinStastsCheck = new RaisingStatusCheckClass();
world13.afterEvents.entityDie.subscribe((event) => {
  const deadEntity = event.deadEntity;
  if (!deadEntity.isValid) {
    return;
  }
  const familyTypes = deadEntity.getComponent(EntityComponentTypes22.TypeFamily);
  if (familyTypes !== void 0 && familyTypes.hasTypeFamily("ogre")) {
    const damager = event.damageSource.damagingEntity;
    if (damager !== void 0 && damager.isValid) {
      const dfamilyTypes = damager.getComponent(EntityComponentTypes22.TypeFamily);
      if (dfamilyTypes !== void 0 && dfamilyTypes.hasTypeFamily("player") && !dfamilyTypes.hasTypeFamily("ogre")) {
        raishinStastsCheck.statusCheck(damager, deadEntity);
      }
    }
  } else if (familyTypes !== void 0 && familyTypes.hasTypeFamily("regimental_soldier")) {
    const tags = deadEntity.getTags();
    if (tags.indexOf("hostility") !== -1) {
      const equips = NitirintouEquips.find((soldier) => soldier.charaName === deadEntity.typeId);
      if (equips !== void 0) {
        deadEntity.dimension.spawnItem(new ItemStack26(equips.itemName, 1), deadEntity.location);
      }
      const damager = event.damageSource.damagingEntity;
      if (damager?.isValid) {
        damager.removeTag("hostility_player");
      }
    }
  } else if (familyTypes !== void 0 && familyTypes.hasTypeFamily("player")) {
    const tags = deadEntity.getTags();
    if (tags.indexOf("hostility_player") !== -1) {
      const damager = event.damageSource.damagingEntity;
      if (damager !== void 0 && damager.isValid) {
        damager.removeTag("hostility");
      }
    }
  } else if (familyTypes !== void 0 && familyTypes.hasTypeFamily("villager")) {
    const damager = event.damageSource.damagingEntity;
    if (damager !== void 0 && damager.isValid) {
      const dfamilyTypes = damager.getComponent(EntityComponentTypes22.TypeFamily);
      if (dfamilyTypes !== void 0 && dfamilyTypes.hasTypeFamily("ogre")) {
        const dimension = deadEntity.dimension;
        dimension.spawnItem(new ItemStack26("kurokumaft:meat_chunk", getRandomInRange(1, 2)), deadEntity.location);
        const rare = getRandomInRange(0, 10);
        if (rare === 10) {
          dimension.spawnItem(new ItemStack26("kurokumaft:rare_blood", getRandomInRange(1, 2)), deadEntity.location);
        }
      }
    }
  }
  if (deadEntity.typeId === "kurokumaft:hantengu") {
    const dimension = deadEntity.dimension;
    const obie = dimension.spawnEntity("kurokumaft:hantengu_obie", deadEntity.location);
    obie.addTag(deadEntity.id);
    const sekido = dimension.spawnEntity("kurokumaft:sekido", deadEntity.location);
    sekido.addTag(deadEntity.id);
    const karaku = dimension.spawnEntity("kurokumaft:karaku", deadEntity.location);
    karaku.addTag(deadEntity.id);
  }
});
world13.afterEvents.entityHitEntity.subscribe((event) => {
  const damagingEntity = event.damagingEntity;
  const hitEntity = event.hitEntity;
  if (!hitEntity.isValid) {
    return;
  }
  const hitFamilyTypes = hitEntity.getComponent(EntityComponentTypes22.TypeFamily);
  if (hitFamilyTypes !== void 0 && hitFamilyTypes.hasTypeFamily("ogre")) {
    const type = damagingEntity.getProperty("kurokumaft:nichirintou_type");
    if (type === void 0 || type === 0) {
      const distance = getLookLocationDistance(damagingEntity.getRotation().y, 1.25, 0, 0.5);
      hitEntity.applyKnockback({ x: distance.x, z: distance.z }, 0.25);
    }
  }
});
world13.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  if (!hurtEntity.isValid) {
    return;
  }
  const ogre_rank = hurtEntity.getProperty("kurokumaft:ogre_rank");
  if (ogre_rank !== void 0 && ogre_rank !== "none") {
    const sun_hurt = hurtEntity.getProperty("kurokumaft:sun_hurt");
    if (!sun_hurt) {
      const rank = ogrePointList.find((list) => list.name === ogre_rank);
      event.hurtEntity.addEffect("minecraft:regeneration", rank?.regeneTime, {
        amplifier: rank?.regene,
        showParticles: false
      });
    } else {
      event.hurtEntity.removeEffect("minecraft:regeneration");
    }
  }
  const health = hurtEntity.getComponent(EntityComponentTypes22.Health);
  if (!hurtEntity.getProperty("kurokumaft:bunretu_flg")) {
    if (isBelowThreshold(health.currentValue, health.defaultValue, 0.7)) {
      if (hurtEntity.typeId === "kurokumaft:sekido") {
        hurtEntity.addTag("bunretu_1");
        hurtEntity.setProperty("kurokumaft:bunretu_flg", true);
        const aizetu = hurtEntity.dimension.spawnEntity("kurokumaft:aizetu", hurtEntity.location);
        aizetu.addTag(hurtEntity.getTags()[0]);
        aizetu.addTag("bunretu_1");
        aizetu.setProperty("kurokumaft:bunretu_flg", true);
      } else if (hurtEntity.typeId === "kurokumaft:karaku") {
        hurtEntity.addTag("bunretu_1");
        hurtEntity.setProperty("kurokumaft:bunretu_flg", true);
        const urogi = hurtEntity.dimension.spawnEntity("kurokumaft:urogi", hurtEntity.location);
        urogi.addTag(hurtEntity.getTags()[0]);
        urogi.addTag("bunretu_1");
        urogi.setProperty("kurokumaft:bunretu_flg", true);
      }
    }
  }
  if (hurtEntity.typeId === "kurokumaft:sekido" || hurtEntity.typeId === "kurokumaft:karaku" || hurtEntity.typeId === "kurokumaft:aizetu" || hurtEntity.typeId === "kurokumaft:urogi") {
    if (hurtEntity.getProperty("kurokumaft:bunretu_flg") && isBelowThreshold(health.currentValue, health.defaultValue, 0.3)) {
      const bunretutai = hurtEntity.dimension.getEntities({
        tags: [hurtEntity.getTags()[0]],
        maxDistance: 64,
        location: hurtEntity.location
      });
      hurtEntity.dimension.spawnEntity("kurokumaft:zouhakuten", hurtEntity.location);
      bunretutai.forEach((en) => {
        if (en.typeId !== "kurokumaft:hantengu_obie") {
          en.remove();
        }
      });
    }
  }
});
world13.afterEvents.projectileHitEntity.subscribe((event) => {
  const projectile = event.projectile;
  const hitEntity = event.getEntityHit().entity;
  if ("kurokumaft:thrown_syringe_dagger" === projectile.typeId) {
    if (hitEntity !== void 0 && hitEntity.isValid) {
      const familyTypes = hitEntity.getComponent(EntityComponentTypes22.TypeFamily);
      if (familyTypes.hasTypeFamily("ogre")) {
        const rank = hitEntity.getProperty("kurokumaft:ogre_rank");
        const daggerFull = new ItemStack26("kurokumaft:syringe_dagger_full", 1);
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
  } else if (projectile.isValid && "kurokumaft:obi" === projectile.typeId) {
    try {
      const hitCount = projectile.getDynamicProperty("hitCount");
      if (hitEntity !== void 0 && hitEntity.isValid && hitCount < 5) {
        projectile.setDynamicProperty("hitCount", hitCount + 1);
      } else {
        const num = projectile.getDynamicProperty("hormingNum");
        if (num !== void 0) {
          system82.clearRun(num);
          projectile.remove();
        }
      }
    } catch (error) {
      system82.clearRun(projectile.getDynamicProperty("hormingNum"));
    }
  } else if (projectile.isValid && "kurokumaft:tobi_tigama" === projectile.typeId) {
    if (hitEntity !== void 0 && hitEntity.isValid) {
      hitEntity.addEffect("minecraft:poison", 10, {
        showParticles: false,
        amplifier: 5
      });
    }
  }
});
world13.afterEvents.projectileHitBlock.subscribe((event) => {
  const projectile = event.projectile;
  if ("kurokumaft:thrown_syringe_dagger" === projectile.typeId) {
    event.dimension.spawnItem(new ItemStack26("kurokumaft:syringe_dagger", 1), event.location);
  }
});
world13.afterEvents.playerInteractWithEntity.subscribe((event) => {
  const item = event.itemStack;
  const player = event.player;
  const target = event.target;
  if (item.typeId === "kurokumaft:match_wooden_tag") {
    if (target === void 0 || !target.isValid) {
      return;
    }
    const familyTypes = target.getComponent(EntityComponentTypes22.TypeFamily);
    if (familyTypes !== void 0 && familyTypes.hasTypeFamily("regimental_soldier")) {
      const form = new ActionFormData2().title({ translate: "msg.kurokumaft:soldier.keiko.title" }).body({ translate: "msg.kurokumaft:soldier.keiko.body" }).button({ translate: "msg.kurokumaft:soldier.keiko.yes" }).button({ translate: "msg.kurokumaft:soldier.keiko.no" });
      form.show(player).then((result) => {
        if (result.canceled) {
          return -1;
        } else {
          if (result.selection === 0) {
            subtractionItem(player, item, EquipmentSlot8.Mainhand, 1);
            target.addTag("hostility");
            player.addTag("hostility_player");
          }
        }
      });
    }
  }
});
system82.afterEvents.scriptEventReceive.subscribe((event) => {
  const id = event.id;
  const message = event.message;
  const initiator = event.initiator;
  const sourceEntity = event.sourceEntity;
  const sourceType = event.sourceType;
  if (initiator !== void 0) {
  }
  if (id === "kk:kaikyuchange" && sourceType === ScriptEventSource.Entity && sourceEntity instanceof Player45) {
    const params = message.split(" ");
    if (params[0] !== "set" && params[0] !== "add") {
      sourceEntity.sendMessage({ translate: "msg.kurokumaft:kaikyu_change.missing_method" });
      return;
    }
    if (params[0] === "add") {
      if (params.length !== 3) {
        sourceEntity.sendMessage({ translate: "msg.kurokumaft:kaikyu_change.missing_add_argument" });
        return;
      }
      if (params[1] !== "promotion" && params[1] !== "demotion") {
        sourceEntity.sendMessage({ translate: "msg.kurokumaft:kaikyu_change.missing_add_type" });
        return;
      }
      const num = Number(params[2]);
      if (!(!isNaN(num) && Number.isFinite(num))) {
        sourceEntity.sendMessage({ translate: "msg.kurokumaft:kaikyu_change.missing_add_num" });
        return;
      }
    } else if (params[0] === "set") {
      if (params.length !== 2) {
        sourceEntity.sendMessage({ translate: "msg.kurokumaft:kaikyu_change.missing_set_argument" });
        return;
      }
      const num = Number(params[1]);
      if (!(!isNaN(num) && Number.isFinite(num))) {
        sourceEntity.sendMessage({ translate: "msg.kurokumaft:kaikyu_change.missing_set_num" });
        return;
      }
    }
    sourceEntity.setProperty("kurokumaft:ogre_rank", "none");
    sourceEntity.setProperty("kurokumaft:ogre_moon", 6);
    sourceEntity.setProperty("kurokumaft:ogre_becoming", 0);
    const kaikyu = sourceEntity.getProperty("kurokumaft:kaikyu");
    const kill = sourceEntity.getProperty("kurokumaft:ogre_kill");
    if (params[0] === "add") {
      const num = Number(params[2]);
      if (params[1] === "promotion") {
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
              sourceEntity.setProperty("kurokumaft:ogre_kill", 0);
            } else {
              sourceEntity.setProperty("kurokumaft:ogre_kill", upPoint);
            }
        }
      } else if (params[1] === "demotion") {
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
              sourceEntity.setProperty("kurokumaft:ogre_kill", 0);
              sourceEntity.triggerEvent("kurokumaft:kaikyu_change");
            } else {
              sourceEntity.setProperty("kurokumaft:ogre_kill", upPoint);
            }
            break;
          case 11:
            sourceEntity.setProperty("kurokumaft:kaikyu", kaikyu - 1);
            sourceEntity.setProperty("kurokumaft:ogre_kill", 1);
            sourceEntity.triggerEvent("kurokumaft:kaikyu_change");
        }
      }
    } else if (params[0] === "set") {
      sourceEntity.setProperty("kurokumaft:ogre_kill", 0);
      const num = Number(params[1]);
      if (num > 0 && num <= 11) {
        sourceEntity.setProperty("kurokumaft:kaikyu", num);
        system82.runTimeout(() => {
          sourceEntity.triggerEvent("kurokumaft:kaikyu_change");
        }, 2);
      } else if (num === 0) {
        sourceEntity.setProperty("kurokumaft:kaikyu", num);
        system82.runTimeout(() => {
          sourceEntity.triggerEvent("kurokumaft:kaikyu_change");
        }, 2);
      }
    }
  }
  if (id === "kk:ogrerankchange" && sourceType === ScriptEventSource.Entity && sourceEntity instanceof Player45) {
    const params = message.split(" ");
    if (params[0] !== "set" && params[0] !== "add") {
      sourceEntity.sendMessage({ translate: "msg.kurokumaft:ogre_rank_change.missing_method" });
      return;
    }
    if (params[0] === "add") {
      if (params.length !== 3) {
        sourceEntity.sendMessage({ translate: "msg.kurokumaft:ogre_rank_change.missing_add_argument" });
        return;
      }
      if (params[1] !== "promotion" && params[1] !== "demotion") {
        sourceEntity.sendMessage({ translate: "msg.kurokumaft:ogre_rank_change.missing_add_type" });
        return;
      }
      const num = Number(params[2]);
      if (!(!isNaN(num) && Number.isFinite(num))) {
        sourceEntity.sendMessage({ translate: "msg.kurokumaft:ogre_rank_change.missing_add_num" });
        return;
      }
    } else if (params[0] === "set") {
      if (params.length !== 2) {
        sourceEntity.sendMessage({ translate: "msg.kurokumaft:ogre_rank_change.missing_set_argument" });
        return;
      }
      const num = Number(params[1]);
      if (!(!isNaN(num) && Number.isFinite(num))) {
        sourceEntity.sendMessage({ translate: "msg.kurokumaft:ogre_rank_change.missing_set_num" });
        return;
      }
    }
    sourceEntity.setProperty("kurokumaft:ogre_kill", 0);
    const rank = sourceEntity.getProperty("kurokumaft:ogre_rank");
    if (params[0] === "add") {
      let becoming = sourceEntity.getProperty("kurokumaft:ogre_becoming");
      const num = Number(params[2]);
      if (params[1] === "promotion") {
        becoming = becoming + num;
        if (becoming >= 100) {
          switch (rank) {
            case "none":
              sourceEntity.setProperty("kurokumaft:ogre_rank", "low");
              break;
            case "low":
              sourceEntity.setProperty("kurokumaft:ogre_rank", "unusual");
              break;
            case "unusual":
              sourceEntity.setProperty("kurokumaft:ogre_rank", "quarter");
              break;
            case "quarter":
              const moon1 = sourceEntity.getProperty("kurokumaft:ogre_moon");
              if (moon1 === 1) {
                sourceEntity.setProperty("kurokumaft:ogre_moon", 6);
                sourceEntity.setProperty("kurokumaft:ogre_rank", "crescent");
              } else {
                sourceEntity.setProperty("kurokumaft:ogre_moon", moon1 - 1);
              }
              break;
            case "crescent":
              const moon2 = sourceEntity.getProperty("kurokumaft:ogre_moon");
              if (moon2 === 1) {
                sourceEntity.setProperty("kurokumaft:ogre_rank", "king");
              } else {
                sourceEntity.setProperty("kurokumaft:ogre_moon", moon2 - 1);
              }
              break;
          }
          sourceEntity.setProperty("kurokumaft:ogre_becoming", 0);
          system82.runTimeout(() => {
            sourceEntity.triggerEvent("kurokumaft:ogre_rank_change");
          }, 2);
        } else {
          sourceEntity.setProperty("kurokumaft:ogre_becoming", becoming);
        }
      } else if (params[1] === "demotion") {
        becoming = becoming - num;
        if (becoming > 0) {
          switch (rank) {
            case "low":
              sourceEntity.setProperty("kurokumaft:ogre_rank", "none");
              break;
            case "unusual":
              sourceEntity.setProperty("kurokumaft:ogre_rank", "low");
              break;
            case "quarter":
              const moon1 = sourceEntity.getProperty("kurokumaft:ogre_moon");
              if (moon1 === 6) {
                sourceEntity.setProperty("kurokumaft:ogre_rank", "unusual");
              } else {
                sourceEntity.setProperty("kurokumaft:ogre_moon", moon1 + 1);
              }
              break;
            case "crescent":
              const moon2 = sourceEntity.getProperty("kurokumaft:ogre_moon");
              if (moon2 === 6) {
                sourceEntity.setProperty("kurokumaft:ogre_rank", "quarter");
              } else {
                sourceEntity.setProperty("kurokumaft:ogre_moon", moon2 + 1);
              }
              break;
            case "king":
              sourceEntity.setProperty("kurokumaft:ogre_rank", "crescent");
              sourceEntity.setProperty("kurokumaft:ogre_moon", 1);
              break;
          }
          sourceEntity.setProperty("kurokumaft:ogre_becoming", 0);
          system82.runTimeout(() => {
            sourceEntity.triggerEvent("kurokumaft:ogre_rank_change");
          }, 2);
        } else {
          sourceEntity.setProperty("kurokumaft:ogre_becoming", becoming);
        }
      }
    } else if (params[0] === "set") {
      const num = Number(params[1]);
      if (num >= 0 && num <= 15) {
        switch (num) {
          case 0:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "none");
            const Inventory = sourceEntity.getComponent(EntityComponentTypes22.Inventory);
            const container = Inventory.container;
            if (container !== void 0) {
              const itemstack = container.getItem(0);
              const kekkizyutu = kekkizyutuLists.find((items) => items.item === itemstack.typeId);
              if (kekkizyutu !== void 0) {
                container.setItem(0, void 0);
              }
            }
            break;
          case 1:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "low");
            break;
          case 2:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "unusual");
            break;
          case 3:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "quarter");
            sourceEntity.setProperty("kurokumaft:ogre_moon", 6);
            break;
          case 4:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "quarter");
            sourceEntity.setProperty("kurokumaft:ogre_moon", 5);
            break;
          case 5:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "quarter");
            sourceEntity.setProperty("kurokumaft:ogre_moon", 4);
            break;
          case 6:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "quarter");
            sourceEntity.setProperty("kurokumaft:ogre_moon", 3);
            break;
          case 7:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "quarter");
            sourceEntity.setProperty("kurokumaft:ogre_moon", 2);
            break;
          case 8:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "quarter");
            sourceEntity.setProperty("kurokumaft:ogre_moon", 1);
            break;
          case 9:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "crescent");
            sourceEntity.setProperty("kurokumaft:ogre_moon", 6);
            break;
          case 10:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "crescent");
            sourceEntity.setProperty("kurokumaft:ogre_moon", 5);
            break;
          case 11:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "crescent");
            sourceEntity.setProperty("kurokumaft:ogre_moon", 4);
            break;
          case 12:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "crescent");
            sourceEntity.setProperty("kurokumaft:ogre_moon", 3);
            break;
          case 13:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "crescent");
            sourceEntity.setProperty("kurokumaft:ogre_moon", 2);
            break;
          case 14:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "crescent");
            sourceEntity.setProperty("kurokumaft:ogre_moon", 1);
            break;
          case 15:
            sourceEntity.setProperty("kurokumaft:ogre_rank", "king");
            break;
        }
        system82.runTimeout(() => {
          sourceEntity.triggerEvent("kurokumaft:ogre_rank_change");
        }, 2);
      }
    }
  }
});

//# sourceMappingURL=../debug/kimetu_script.js.map
