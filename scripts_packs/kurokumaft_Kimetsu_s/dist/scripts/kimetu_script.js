// scripts/kimetu_script.ts
import {
  world as world11,
  system as system73,
  EquipmentSlot as EquipmentSlot8,
  Player as Player42,
  EntityComponentTypes as EntityComponentTypes20,
  ItemStack as ItemStack27,
  ScriptEventSource,
  EntityInitializationCause,
  EntityDamageCause as EntityDamageCause7
} from "@minecraft/server";

// scripts/item/weapon/nichirintou/NichirintouComponent.ts
import { EntityComponentTypes as EntityComponentTypes8, EquipmentSlot as EquipmentSlot4 } from "@minecraft/server";

// scripts/kokyu/kata/MizuNoKata.ts
import { MolangVariableMap, system, TicksPerSecond, Player as Player5, EntityComponentTypes as EntityComponentTypes5 } from "@minecraft/server";

// scripts/common/KimetuCommonUtil.ts
import { world, Direction, EntityComponentTypes } from "@minecraft/server";
function getRandomInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
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
function shooting(entity, throwItem, ranNum, seepd, event) {
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
        const dragon = shooting(entity, "kurokumaft:mizu_dragon", 0, 3, void 0);
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
      const dragon = shooting(entity, "kurokumaft:mizu_dragon", 0, 3, void 0);
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
        const dragon = shooting(entity, "kurokumaft:mizu_dragon", 0, 3, void 0);
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
import { MolangVariableMap as MolangVariableMap2, system as system2, TicksPerSecond as TicksPerSecond2, Player as Player7 } from "@minecraft/server";
var HanaNoKata = class extends KataComonClass {
  constructor() {
    super(...arguments);
    this.higanLists = weightChoice([
      { item: "minor", weight: 50 },
      { item: "serious", weight: 35 },
      { item: "blindness", weight: 15 }
    ]);
  }
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
    const dragon = shooting(entity, "kurokumaft:hono_tiger", 0, 3, void 0);
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
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kaze = new KazeNoKata();
    switch (kata) {
      case 1:
        kaze.ichiNoKata(player, itemStack);
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

// scripts/kokyu/player/character/KokyuTanjiroComponent.ts
import { TicksPerSecond as TicksPerSecond6 } from "@minecraft/server";

// scripts/kokyu/kata/HiNoKata.ts
import { MolangVariableMap as MolangVariableMap5, system as system7, TicksPerSecond as TicksPerSecond5, Player as Player12 } from "@minecraft/server";
var HiNoKata = class extends KataComonClass {
  constructor() {
    super(...arguments);
    this.gennitiIntervalId = 0;
  }
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
    const hi = new HiNoKata();
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
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const mizu = new MizuNoKata();
    const hi = new HiNoKata();
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
        const chage = duration / TicksPerSecond6;
        if (chage > 997) {
          hi.ichiNoKata(player, itemStack);
        } else {
          hi.ichiNoKataIssen(player, itemStack);
        }
        break;
      case 15:
        hi.goNoKata(player, itemStack);
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
    const dragon = shooting(entity, "kurokumaft:kaminari_dragon_small", 0, 3, event);
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
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kaminari = new KaminariNoKata();
    switch (kata) {
      case 1:
        const chage = duration / TicksPerSecond8;
        if (chage > 998.5) {
          kaminari.ichiNoKata(player, itemStack);
        } else if (chage > 996.5) {
          kaminari.ichiNoKataRoku(player, itemStack);
        } else if (chage > 995.5) {
          kaminari.ichiNoKataHati(player, itemStack);
        } else if (chage > 994) {
          kaminari.ichiNoKataShinsoku(player, itemStack);
        } else {
          kaminari.shitiNoKata(player, itemStack);
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
    const ono = shooting(entity, "kurokumaft:iwa_axe", 0, 3, void 0);
    const ball = shooting(entity, "kurokumaft:iwa_iron_ball", 0, 3, void 0);
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
      breaksBlocks: true,
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
  }
  releaseAttackKata(player, itemStack, duration) {
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const kasumi = new KasumiNoKata();
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
  /**
   * 伊之助 呼吸
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
    const kata = player.getProperty("kurokumaft:kokyu_kata");
    const oto = new OtoNoKata();
    switch (kata) {
      case 3:
        oto.sanNoKata(player, itemStack);
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
var KokyuMobClassRecord = {
  tanjiro: TanjiroComponent,
  zenitu: ZenituComponent,
  inosuke: InosukeComponent,
  kanawo: KanawoComponent,
  giyu: GiyuComponent,
  shinobu: ShinobuComponent,
  kyouzyuro: KyouzyuroComponent,
  tengen: TengenComponent,
  obanai: ObanaiComponent,
  sanemi: SanemiComponent,
  mituri: MituriComponent,
  muitiro: MuitiroComponent,
  gyoumei: GyoumeiComponent,
  mizu: MizuComponent,
  hi: HiComponent,
  kaminari: KaminariComponent,
  hono: HonoComponent,
  kemono: KedamonoComponent,
  mushi: MushiComponent,
  hana: HanaComponent,
  koi: KoiComponent,
  oto: OtoComponent,
  kaze: KazeComponent,
  iwa: IwaComponent,
  hebi: HebiComponent,
  kasumi: KasumiComponent,
  tuki: TukiComponent
};
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

// scripts/item/weapon/nichirintou/NichirintouComponent.ts
var NichirintouComponent = class {
  // 右クリック
  onUse(event) {
    const player = event.source;
    const itemStack = event.itemStack;
    if (player.isSneaking) {
      const nichirintou = player.getProperty("kurokumaft:nichirintou_type");
      const object = KokyuObjects.find((ob) => ob.type === nichirintou);
      const kokyuClass = kokyuClassRecord[object.className];
      const kokyuObject = new kokyuClass();
      kokyuObject.changeKata(player);
      return;
    } else {
      if (!player.getProperty("kurokumaft:kokyu_use")) {
        const equippable = player.getComponent(EntityComponentTypes8.Equippable);
        const mainHand = equippable.getEquipment(EquipmentSlot4.Mainhand);
        if (mainHand !== void 0) {
          const object = KokyuObjects.find((ob) => ob.itemName === itemStack.typeId);
          const kokyuClass = kokyuClassRecord[object.className];
          const kokyuObject = new kokyuClass();
          player.setProperty("kurokumaft:kokyu_use", true);
          player.setProperty("kurokumaft:kokyu_particle", true);
          kokyuObject.useAttackKata(player, itemStack);
        }
      }
    }
  }
};

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
  { item: "kurokumaft:nichirintou_kaigaku", msg: "item.kurokumaft:kokurai.name" }
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
import { EntityComponentTypes as EntityComponentTypes17, EquipmentSlot as EquipmentSlot6 } from "@minecraft/server";

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
      const ultrasonic = shooting(entity, "kurokumaft:urogi_ultrasonic", 0, 3, void 0);
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
            const ultrasonic = shooting(tokageL, "kurokumaft:urogi_ultrasonic", 0, 3, void 0);
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
    const bunretu = new Bunretu();
    try {
      switch (kata) {
        case 1:
          bunretu.shitotu(entity);
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
      const kushiki = shooting(entity, "kurokumaft:kushiki", 0, 3, void 0);
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
          const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
          const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
          entity.dimension.spawnParticle("kurokumaft:ryuseigunkou", getDistanceLocation(entity.location, distance));
          this.zyutuApplyDamage(entity, filter, 5);
          this.kokyuApplyKnockback(entity, filter, distance, 0.2);
          entity.applyKnockback({ x: distance.x, z: distance.z }, 0.3);
        } catch (error) {
          system46.clearRun(num);
        }
      }, 4);
      system46.waitTicks(40).then(() => {
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
      entity.dimension.spawnParticle("kurokumaft:rashin", entity.location, molang);
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
    const hakaisatu = new Hakaisatu();
    switch (kata) {
      case 1:
        hakaisatu.rashin(entity);
        break;
      case 2:
        hakaisatu.kushiki(entity);
        break;
      case 3:
        hakaisatu.ranshiki(entity);
        break;
      case 5:
        hakaisatu.kamurosakiwari(entity);
        break;
      case 6:
        hakaisatu.ryusengunkou(entity);
        break;
      case 7:
        hakaisatu.hiyuuseisenrin(entity);
        break;
      case 8:
        hakaisatu.manyousenyanagi(entity);
        break;
      case 9:
        hakaisatu.kishinyaenshin(entity);
        break;
      case 10:
        hakaisatu.aoginranzankou(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    const hakaisatu = new Hakaisatu();
    switch (kata) {
      case 4:
        hakaisatu.messhiki(entity);
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
      const obi = shooting(entity, "kurokumaft:obi", 0, 3, void 0);
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
    const obi = new Obi();
    switch (kata) {
      case 1:
        obi.yokonagi(entity);
        break;
      case 2:
        obi.barrage(entity);
        break;
      case 3:
        obi.shot(entity);
        break;
      case 4:
        obi.yaeobigiri(entity);
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
    const tigama = new Tigama();
    switch (kata) {
      case 1:
        tigama.tobiTigama(entity);
        break;
      case 2:
        tigama.bakkotyouryou(entity);
        break;
      case 3:
        tigama.enzansenkai(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/player/character/ZyutuKarakuComponent.ts
var ZyutuKarakuComponent = class {
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
    const bunretu = new Bunretu();
    switch (kata) {
      case 1:
        bunretu.toppu(entity);
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
    const bakketu = new Bakketu();
    switch (kata) {
      case 1:
        bakketu.bakketu(entity);
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
      const ito = shooting(entity, "kurokumaft:kokushirinten", 0, 3, void 0);
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
    const koushi = new Koushi();
    switch (kata) {
      case 1:
        koushi.kokushirou(entity);
        break;
      case 2:
        koushi.kokushirinten(entity);
        break;
      case 3:
        koushi.ayamekago(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/player/character/ZyutuSekidoComponent.ts
var ZyutuSekidoComponent = class {
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
    const bunretu = new Bunretu();
    switch (kata) {
      case 1:
        bunretu.ikazuti(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/player/character/ZyutuUrogiComponent.ts
var ZyutuUrogiComponent = class {
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
    const bunretu = new Bunretu();
    switch (kata) {
      case 1:
        bunretu.ultrasonic(entity);
        break;
    }
  }
  releaseAttackZyutu(entity) {
  }
};

// scripts/kekkizyutu/player/character/ZyutuZouhakutenComponent.ts
var ZyutuZouhakutenComponent = class {
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
    const bunretu = new Bunretu();
    switch (kata) {
      case 1:
        bunretu.tokage(entity);
        break;
      case 2:
        bunretu.kyoumeiraisatu(entity);
        break;
      case 3:
        bunretu.kyouatumeiha(entity);
        break;
      case 4:
        bunretu.mukengouzyu(entity);
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
    const tuki = new TukiNoKataZyutu();
    try {
      switch (kata) {
        case 2:
          tuki.niNoKata(entity);
          break;
        case 3:
          tuki.sanNoKata(entity);
          break;
        case 5:
          tuki.goNoKata(entity);
          break;
        case 6:
          tuki.rokuNoKata(entity);
          break;
        case 7:
          tuki.shitiNoKata(entity);
          break;
        case 8:
          tuki.hachiNoKata(entity);
          break;
        case 9:
          tuki.kuNoKata(entity);
          break;
        case 10:
          tuki.zyuNoKata(entity);
          break;
        case 14:
          tuki.zyushiNoKata(entity);
          break;
        case 16:
          tuki.zyurokuNoKata(entity);
          break;
      }
    } catch (error) {
    }
  }
  releaseAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    const tuki = new TukiNoKataZyutu();
    try {
      switch (kata) {
        case 1:
          tuki.ichiNoKata(entity);
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
    const dragon = shooting(entity, "kurokumaft:kuro_dragon_small", 0, 3, "kurokumaft:lage_damage");
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
        system63.clearRun(num);
      }
    }, 1);
    const filter = addOrgeFilter(1, entity.location, 15, entity.id);
    this.zyutuApplyDamage(entity, filter, 5);
    this.kokyuApplyEffect(entity, filter, 15 * TicksPerSecond24, 1, "minecraft:wither");
    system63.waitTicks(10).then(() => {
      entity.setProperty("kurokumaft:kokyu_use", false);
      entity.setProperty("kurokumaft:kokyu_particle", false);
    }).catch((error) => {
    }).finally(() => {
      system63.clearRun(num);
    });
  }
};

// scripts/kekkizyutu/player/character/ZyutuKaigakuComponent.ts
var ZyutuKaigakuComponent = class {
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
    const kokurai = new Kokurai();
    try {
      switch (kata) {
        case 2:
          kokurai.niNoKata(entity);
          break;
        case 3:
          kokurai.sanNoKata(entity);
          break;
        case 5:
          kokurai.goNoKata(entity);
          break;
        case 6:
          kokurai.rokuNoKata(entity);
          break;
      }
    } catch (error) {
    }
  }
  releaseAttackZyutu(entity) {
    const kata = entity.getProperty("kurokumaft:kekkizyutu_kata");
    const kokurai = new Kokurai();
    try {
      switch (kata) {
        case 4:
          kokurai.shiNoKata(entity);
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
    const koori = new Koori();
    try {
      switch (kata) {
        case 1:
          koori.hasuhagoori(entity);
          break;
        case 2:
          koori.karesonosizuri(entity);
          break;
        case 3:
          koori.itegumori(entity);
          break;
        case 4:
          koori.tururenge(entity);
          break;
        case 5:
          koori.kanretunosirahime(entity);
          break;
        case 6:
          koori.fuyuzareturara(entity);
          break;
        case 7:
          koori.tirirenge(entity);
          break;
        case 8:
          koori.kessyounomiko(entity);
          break;
        case 9:
          koori.muhyousuirenbosatu(entity);
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
    const tubo = new Tubo();
    try {
      switch (kata) {
        case 1:
          tubo.suigokubati(entity);
          break;
        case 2:
          tubo.senbonbarigyosatu(entity);
          break;
        case 3:
          tubo.takotubozigoku(entity);
          break;
        case 4:
          tubo.itimankakkuunengyo(entity);
          break;
        case 5:
          tubo.sakanasyoukan(entity);
          break;
        case 6:
          tubo.zinsatugyorin(entity);
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

// scripts/item/weapon/KekkizyutuTypes.ts
var KekkizyutuClassRecord = {
  nezuko: ZyutuNezukoComponent,
  rui: ZyutuRuiComponent,
  akaza: ZyutuAkazaComponent,
  daki: ZyutuDakiComponent,
  gyutaro: ZyutuGyutaroComponent,
  sekido: ZyutuSekidoComponent,
  karaku: ZyutuKarakuComponent,
  aizetu: ZyutuAizetuComponent,
  urogi: ZyutuUrogiComponent,
  zouhakuten: ZyutuZouhakutenComponent,
  douma: ZyutuDoumaComponent,
  kokushibou: ZyutuKokushibouComponent,
  kaigaku: ZyutuKaigakuComponent,
  gyokko: ZyutuGyokkoComponent
};
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
  }
]);
var KekkizyutuMobClassRecord = {
  tokage: TokageComponent,
  nezuko: NezukoComponent,
  daki: DakiComponent,
  gyutaro: GyutaroComponent,
  rui: RuiComponent,
  akaza: AkazaComponent,
  aizetu: AizetuComponent,
  karaku: KarakuComponent,
  sekido: SekidoComponent,
  urogi: UrogiComponent,
  zouhakuten: ZouhakutenComponent,
  kokushibou: KokushibouComponent,
  douma: DoumaComponent,
  kessyounomiko: KessyounomikoComponent,
  muhyousuirenbosatu: MuhyousuirenbosatuComponent,
  gyokko: GyokkoComponent
};
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
  }
]);

// scripts/item/weapon/kekkizyutu/KekkizyutuComponent.ts
var KekkizyutuComponent = class {
  // 右クリック
  onUse(event) {
    let player = event.source;
    let itemStack = event.itemStack;
    if (player.isSneaking) {
      const kekkizyutu = player.getProperty("kurokumaft:kekkizyutu_type");
      const object = KekkizyutuObjects.find((ob) => ob.type === kekkizyutu);
      const kekkizyutuClass = KekkizyutuClassRecord[object.className];
      const kekkizyutuObject = new kekkizyutuClass();
      kekkizyutuObject.changeZyutu(player);
      return;
    } else {
      if (!player.getProperty("kurokumaft:kokyu_use")) {
        const equ = player.getComponent(EntityComponentTypes17.Equippable);
        const mainHand = equ.getEquipment(EquipmentSlot6.Mainhand);
        if (mainHand !== void 0) {
          const object = KekkizyutuObjects.find((ob) => ob.itemName === mainHand.typeId);
          const kekkizyutuClass = KekkizyutuClassRecord[object.className];
          const kekkizyutuObject = new kekkizyutuClass();
          player.setProperty("kurokumaft:kokyu_use", true);
          player.setProperty("kurokumaft:kokyu_particle", true);
          kekkizyutuObject.useAttackZyutu(player);
        }
      }
    }
  }
};

// scripts/item/tool/MeatEating.ts
import { TicksPerSecond as TicksPerSecond31 } from "@minecraft/server";
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
      player.addEffect("minecraft:hunger", 15 * TicksPerSecond31, {
        amplifier: 5,
        showParticles: false
      });
      player.addEffect("minecraft:nausea", 10 * TicksPerSecond31, {
        amplifier: 1,
        showParticles: false
      });
    } else {
      new OgreEatCommon().upRankCheck(rank, player, becoming);
    }
  }
};

// scripts/item/tool/DemonizationReversal.ts
import { TicksPerSecond as TicksPerSecond32, system as system70, EntityComponentTypes as EntityComponentTypes18 } from "@minecraft/server";
var DemonizationReversal = class {
  onConsume(event) {
    const player = event.source;
    const rank = player.getProperty("kurokumaft:ogre_rank");
    if ("none" !== rank) {
      player.addEffect("minecraft:hunger", 60 * TicksPerSecond32, {
        amplifier: 5,
        showParticles: false
      });
      player.addEffect("minecraft:weakness", 60 * TicksPerSecond32, {
        amplifier: 5,
        showParticles: false
      });
      player.addEffect("minecraft:nausea", 30 * TicksPerSecond32, {
        amplifier: 1,
        showParticles: false
      });
      player.addEffect("minecraft:wither", 60 * TicksPerSecond32, {
        amplifier: 10,
        showParticles: false
      });
      system70.waitTicks(60 * TicksPerSecond32).then(() => {
        player.setProperty("kurokumaft:ogre_rank", "none");
        player.setProperty("kurokumaft:ogre_becoming", 0);
        player.removeEffect("minecraft:regeneration");
        system70.runTimeout(() => {
          player.triggerEvent("kurokumaft:ogre_rank_change");
          player.triggerEvent("kurokumaft:kaikyu_change");
        }, 2);
        const Inventory = player.getComponent(EntityComponentTypes18.Inventory);
        const container = Inventory.container;
        if (container !== void 0) {
          const itemstack = container.getItem(0);
          const kekkizyutu = kekkizyutuLists.find((items) => items.item === itemstack.typeId);
          if (kekkizyutu !== void 0) {
            container.setItem(0, void 0);
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
import { EntityComponentTypes as EntityComponentTypes19, EquipmentSlot as EquipmentSlot7, system as system71 } from "@minecraft/server";
var KimetuEquipmentTick = class {
  constructor(player) {
    this.player = player;
    this.num = 0;
  }
  startMonitoring() {
    this.num = system71.runInterval(() => {
      if (this.player.isValid) {
        this.checkPlayerKimetuEquTick();
        this.checkPlayerKaikyuTick();
      } else {
        system71.clearRun(this.num);
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
      const equ = this.player.getComponent(EntityComponentTypes19.Equippable);
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
import { system as system72 } from "@minecraft/server";
var Mutex = class {
  constructor() {
    this._lock = Promise.resolve();
  }
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
  constructor() {
    this.mutex = new Mutex();
  }
  async statusCheck(player, ogre) {
    const unlock = await this.mutex.lock();
    try {
      const kaikyu = player.getProperty("kurokumaft:kaikyu");
      const count = player.getProperty("kurokumaft:ogre_kill");
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
              system72.runTimeout(() => {
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
            system72.runTimeout(() => {
              player.triggerEvent("kurokumaft:kaikyu_change");
            }, 4);
          } else {
            player.setProperty("kurokumaft:ogre_kill", upPoint);
          }
          break;
        case 0:
          player.setProperty("kurokumaft:kaikyu", kaikyu + 1);
          player.setProperty("kurokumaft:ogre_kill", 0);
          system72.runTimeout(() => {
            player.triggerEvent("kurokumaft:kaikyu_change");
          }, 4);
          break;
      }
    } finally {
      system72.waitTicks(5).then(() => {
        unlock();
      });
    }
  }
};

// scripts/kimetu_script.ts
import { ActionFormData as ActionFormData2 } from "@minecraft/server-ui";
system73.beforeEvents.startup.subscribe((initEvent) => {
  initRegisterKimetuCustom(initEvent);
});
world11.beforeEvents.playerLeave.subscribe((leaveEvent) => {
  leaveEvent.player.clearDynamicProperties();
});
world11.afterEvents.playerSpawn.subscribe((event) => {
  if (event.initialSpawn) {
    event.player.setProperty("kurokumaft:kokyu_use", false);
    event.player.setProperty("kurokumaft:kokyu_particle", false);
    event.player.setProperty("kurokumaft:kokyu_attack", false);
    event.player.setProperty("kurokumaft:kokyu_chage", 0);
    event.player.setProperty("kurokumaft:kokyu_ran", 0);
    event.player.setDynamicProperty("kurokumaft:chage_type", void 0);
  }
  const familyTypes = event.player.getComponent(EntityComponentTypes20.TypeFamily);
  if (familyTypes !== void 0 && familyTypes.hasTypeFamily("ogre")) {
    event.player.triggerEvent("kurokumaft:player_spawned_ogre");
  } else if (familyTypes !== void 0 && familyTypes.hasTypeFamily("regimental_player")) {
    event.player.triggerEvent("kurokumaft:player_spawned_regimental");
  } else {
    event.player.triggerEvent("kurokumaft:player_spawned_init");
  }
  event.player.removeTag("hostility_player");
  const playerTick = new KimetuEquipmentTick(event.player);
  playerTick.startMonitoring();
});
world11.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
  const entity = event.entity;
  if (entity instanceof Player42) {
    if (event.eventId === "kurokumaft:attack_time") {
      entity.setDynamicProperty("kurokumaft:attack_time", true);
      entity.triggerEvent("kurokumaft:remove_damage_guard");
      system73.runTimeout(() => {
        entity.setDynamicProperty("kurokumaft:attack_time", false);
      }, 20);
      const equ = entity.getComponent(EntityComponentTypes20.Equippable);
      const mainHand = equ.getEquipment(EquipmentSlot8.Mainhand);
      if (mainHand !== void 0) {
        const object = KokyuObjects.find((ob) => ob.itemName === mainHand.typeId);
        if (object !== void 0 && object.type > 0 && !entity.getProperty("kurokumaft:kokyu_attack")) {
          entity.setProperty("kurokumaft:kokyu_attack", true);
          system73.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_attack", false);
          }, 3);
          const kokyuClass = kokyuClassRecord[object.className];
          const kokyuObject = new kokyuClass();
          kokyuObject.hitAttackKata(entity, mainHand);
        } else {
          if (mainHand.typeId === "kurokumaft:kyokokukamusari" || mainHand.typeId === "kurokumaft:nichirintou_kaigaku") {
            entity.setProperty("kurokumaft:kokyu_attack", true);
            system73.runTimeout(() => {
              entity.setProperty("kurokumaft:kokyu_attack", false);
            }, 3);
            const kekkizyutuObject = KekkizyutuObjects.find((ob) => ob.itemName === mainHand.typeId);
            const kekkizyutuClass = KekkizyutuClassRecord[kekkizyutuObject.className];
            const kekkizyutu = new kekkizyutuClass();
            kekkizyutu.hitAttackZyutu(entity);
          }
        }
      }
    } else if (event.eventId === "kurokumaft:damaged_by_player") {
      entity.applyDamage(0, {
        cause: EntityDamageCause7.entityAttack,
        damagingEntity: entity
      });
    } else if (event.eventId === "kurokumaft:damage_guard") {
      entity.playSound("damage_guard.nitirintou_blocking", {
        pitch: 1,
        volume: 1
      });
      const equ = entity.getComponent(EntityComponentTypes20.Equippable);
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
              const KokyuClass = KokyuMobClassRecord[katana.className];
              const KokyuObject30 = new KokyuClass();
              KokyuObject30.startMonitoring(entity);
            }
          }
        }
      } else {
        const taishi = KokyuMobObjects.find((ob) => ob.entityName === entity.typeId);
        if (taishi !== void 0) {
          const KokyuClass = KokyuMobClassRecord[taishi.className];
          const KokyuObject30 = new KokyuClass();
          KokyuObject30.startMonitoring(entity);
        }
      }
    } else if (event.eventId === "kurokumaft:kekkizyutu_start") {
      const ogre = KekkizyutuMobObjects.find((ob) => ob.entityName === entity.typeId);
      if (ogre !== void 0) {
        const kekkizyutuClass = KekkizyutuMobClassRecord[ogre.className];
        const kekkizyutuObject = new kekkizyutuClass(entity);
        kekkizyutuObject.startMonitoring(entity);
      }
    } else if (event.eventId === "kurokumaft:ibuki_start") {
      ibuki(entity);
    } else if (event.eventId === "kurokumaft:gyokko_move") {
      gyokkoMove(entity);
    } else if (event.eventId === "kurokumaft:attack_time") {
      entity.setProperty("kurokumaft:kokyu_attack", true);
      system73.runTimeout(() => {
        entity.setProperty("kurokumaft:kokyu_attack", false);
      }, 10);
      if (entity.typeId.indexOf("kurokumaft:regimental") !== -1) {
        const nichirintoutype = entity.getProperty("kurokumaft:nichirintou_type");
        if (nichirintoutype !== void 0) {
          const kokyuObject = KokyuObjects.find((ob) => ob.type === nichirintoutype);
          if (kokyuObject !== void 0) {
            const katana = KokyuMobObjects.find((ob) => ob.entityName === kokyuObject.itemName);
            if (katana !== void 0) {
              const KokyuClass = KokyuMobClassRecord[katana.className];
              const KokyuObject30 = new KokyuClass();
              KokyuObject30.hitAttackKata(entity);
            }
          }
        }
      } else {
        const taishi = KokyuMobObjects.find((ob) => ob.entityName === entity.typeId);
        if (taishi !== void 0) {
          const KokyuClass = KokyuMobClassRecord[taishi.className];
          const KokyuObject30 = new KokyuClass();
          KokyuObject30.hitAttackKata(entity);
        }
        const ogre = KekkizyutuMobObjects.find((ob) => ob.entityName === entity.typeId);
        if (ogre !== void 0) {
          const kekkizyutuClass = KekkizyutuMobClassRecord[ogre.className];
          const kekkizyutuObject = new kekkizyutuClass(entity);
          kekkizyutuObject.hitAttackZyutu(entity);
        }
      }
    }
  }
  if (event.eventId === "kurokumaft:sun_fire") {
    sunLightFire(entity);
  }
});
async function sunLightFire(entity) {
  entity.setOnFire(1, true);
}
world11.afterEvents.itemStopUse.subscribe((event) => {
  const source = event.source;
  const item = event.itemStack;
  if (source instanceof Player42 && item !== void 0) {
    const use = source.getProperty("kurokumaft:kokyu_use");
    const equippable = source.getComponent(EntityComponentTypes20.Equippable);
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
world11.afterEvents.itemReleaseUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;
  const duration = event.useDuration;
  const nichirintou = player.getProperty("kurokumaft:nichirintou_type");
  if (item !== void 0 && nichirintou !== void 0 && nichirintou !== 0) {
    if (player.getProperty("kurokumaft:kokyu_use")) {
      const object = KokyuObjects.find((ob) => ob.type === nichirintou);
      const kokyuClass = kokyuClassRecord[object.className];
      const kokyuObject = new kokyuClass();
      kokyuObject.releaseAttackKata(player, item, duration);
    }
  }
  const kekkizyutu = player.getProperty("kurokumaft:kekkizyutu_type");
  if (item !== void 0 && kekkizyutu !== void 0 && kekkizyutu !== 0) {
    if (player.getProperty("kurokumaft:kokyu_use")) {
      const object = KekkizyutuObjects.find((ob) => ob.type === kekkizyutu);
      const kekkizyutuClass = KekkizyutuClassRecord[object.className];
      const kekkizyutuObject = new kekkizyutuClass();
      kekkizyutuObject.releaseAttackZyutu(player);
    }
  }
});
var ogreRankLists = weightChoice([
  { item: "low", weight: 30 },
  { item: "unusual", weight: 20 },
  { item: "quarter", weight: 20 },
  { item: "crescent", weight: 20 }
]);
world11.afterEvents.entitySpawn.subscribe((event) => {
  const entity = event.entity;
  try {
    if (entity !== void 0) {
      const taishibject = TaishiKaikyu.find((taishi) => taishi.name === entity.typeId);
      if (taishibject !== void 0 && event.cause === EntityInitializationCause.Spawned) {
        const kaikyuRan = getRandomInRange(taishibject.min, taishibject.max);
        entity.setProperty("kurokumaft:kaikyu", kaikyuRan);
        system73.waitTicks(4).then(() => {
          entity.triggerEvent("kurokumaft:kaikyu_change");
          const health = entity.getComponent(EntityComponentTypes20.Health);
          health.resetToMaxValue();
        }).catch((error) => {
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
          system73.waitTicks(4).then(() => {
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
world11.afterEvents.entityDie.subscribe((event) => {
  const deadEntity = event.deadEntity;
  if (!deadEntity.isValid) {
    return;
  }
  const familyTypes = deadEntity.getComponent(EntityComponentTypes20.TypeFamily);
  if (familyTypes !== void 0 && familyTypes.hasTypeFamily("ogre")) {
    const damager = event.damageSource.damagingEntity;
    if (damager !== void 0) {
      const dfamilyTypes = damager.getComponent(EntityComponentTypes20.TypeFamily);
      if (dfamilyTypes !== void 0 && dfamilyTypes.hasTypeFamily("player") && !dfamilyTypes.hasTypeFamily("ogre")) {
        raishinStastsCheck.statusCheck(damager, deadEntity);
      }
    }
  } else if (familyTypes !== void 0 && familyTypes.hasTypeFamily("regimental_soldier")) {
    const tags = deadEntity.getTags();
    if (tags.indexOf("hostility") !== -1) {
      const equips = NitirintouEquips.find((soldier) => soldier.charaName === deadEntity.typeId);
      if (equips !== void 0) {
        deadEntity.dimension.spawnItem(new ItemStack27(equips.itemName, 1), deadEntity.location);
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
      if (damager !== void 0) {
        damager.removeTag("hostility");
      }
    }
  } else if (familyTypes !== void 0 && familyTypes.hasTypeFamily("villager")) {
    const damager = event.damageSource.damagingEntity;
    if (damager !== void 0) {
      const dfamilyTypes = damager.getComponent(EntityComponentTypes20.TypeFamily);
      if (dfamilyTypes !== void 0 && dfamilyTypes.hasTypeFamily("ogre")) {
        const dimension = deadEntity.dimension;
        dimension.spawnItem(new ItemStack27("kurokumaft:meat_chunk", getRandomInRange(1, 2)), deadEntity.location);
        const rare = getRandomInRange(0, 10);
        if (rare === 10) {
          dimension.spawnItem(new ItemStack27("kurokumaft:rare_blood", getRandomInRange(1, 2)), deadEntity.location);
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
world11.afterEvents.entityHitEntity.subscribe((event) => {
  const damagingEntity = event.damagingEntity;
  const hitEntity = event.hitEntity;
  if (!hitEntity.isValid) {
    return;
  }
  const damageFamilyTypes = damagingEntity.getComponent(EntityComponentTypes20.TypeFamily);
  const hitFamilyTypes = hitEntity.getComponent(EntityComponentTypes20.TypeFamily);
  if (hitFamilyTypes !== void 0 && hitFamilyTypes.hasTypeFamily("ogre")) {
    const type = damagingEntity.getProperty("kurokumaft:nichirintou_type");
    if (type === void 0 || type === 0) {
      const distance = getLookLocationDistance(damagingEntity.getRotation().y, 1.25, 0, 0.5);
      hitEntity.applyKnockback({ x: distance.x, z: distance.z }, 0.25);
    }
  }
});
world11.afterEvents.entityHurt.subscribe((event) => {
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
  const health = hurtEntity.getComponent(EntityComponentTypes20.Health);
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
world11.afterEvents.projectileHitEntity.subscribe((event) => {
  const projectile = event.projectile;
  const hitEntity = event.getEntityHit().entity;
  if ("kurokumaft:thrown_syringe_dagger" === projectile.typeId) {
    if (hitEntity !== void 0) {
      const familyTypes = hitEntity.getComponent(EntityComponentTypes20.TypeFamily);
      if (familyTypes.hasTypeFamily("ogre")) {
        const rank = hitEntity.getProperty("kurokumaft:ogre_rank");
        const daggerFull = new ItemStack27("kurokumaft:syringe_dagger_full", 1);
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
          system73.clearRun(num);
          projectile.remove();
        }
      }
    } catch (error) {
      system73.clearRun(projectile.getDynamicProperty("hormingNum"));
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
world11.afterEvents.projectileHitBlock.subscribe((event) => {
  const projectile = event.projectile;
  if ("kurokumaft:thrown_syringe_dagger" === projectile.typeId) {
    event.dimension.spawnItem(new ItemStack27("kurokumaft:syringe_dagger", 1), event.location);
  }
});
world11.afterEvents.playerInteractWithEntity.subscribe((event) => {
  const item = event.itemStack;
  const player = event.player;
  const target = event.target;
  if (item.typeId === "kurokumaft:match_wooden_tag") {
    const familyTypes = target.getComponent(EntityComponentTypes20.TypeFamily);
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
system73.afterEvents.scriptEventReceive.subscribe((event) => {
  const id = event.id;
  const message = event.message;
  const initiator = event.initiator;
  const sourceEntity = event.sourceEntity;
  const sourceType = event.sourceType;
  if (initiator !== void 0) {
  }
  if (id === "kk:kaikyuchange" && sourceType === ScriptEventSource.Entity && sourceEntity instanceof Player42) {
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
        system73.runTimeout(() => {
          sourceEntity.triggerEvent("kurokumaft:kaikyu_change");
        }, 2);
      } else if (num === 0) {
        sourceEntity.setProperty("kurokumaft:kaikyu", num);
        system73.runTimeout(() => {
          sourceEntity.triggerEvent("kurokumaft:kaikyu_change");
        }, 2);
      }
    }
  }
  if (id === "kk:ogrerankchange" && sourceType === ScriptEventSource.Entity && sourceEntity instanceof Player42) {
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
          system73.runTimeout(() => {
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
          system73.runTimeout(() => {
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
            const Inventory = sourceEntity.getComponent(EntityComponentTypes20.Inventory);
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
        system73.runTimeout(() => {
          sourceEntity.triggerEvent("kurokumaft:ogre_rank_change");
        }, 2);
      }
    }
  }
});

//# sourceMappingURL=../debug/kimetu_script.js.map
