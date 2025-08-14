import { world,system, EquipmentSlot, Player, EntityComponentTypes, EntityEquippableComponent, ItemStack, EntityTypeFamilyComponent, ScriptEventSource, Entity, EntityInitializationCause, EntityHealthComponent, WorldLoadAfterEvent, EntityInventoryComponent, Container, ContainerSlot, EntityDamageCause } from "@minecraft/server";
import { initRegisterKimetuCustom } from "./custom/KimetuCustomComponentRegistry";
import { kokyuClassRecord, KokyuMobClassRecord, KokyuMobObject, KokyuMobObjects, KokyuObject, KokyuObjects } from "./item/weapon/NichirintouTypes";
import { KimetuEquipmentTick } from "./player/KimetuEquipmentTick";
import { RaisingStatusCheckClass } from "./player/RaisingStatusCheckClass";
import { KekkizyutuClassRecord, KekkizyutuMobClassRecord, KekkizyutuMobObject, KekkizyutuMobObjects, KekkizyutuObject, KekkizyutuObjects } from "./item/weapon/KekkizyutuTypes";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { getLookLocationDistance, getRandomInRange, isBelowThreshold, weightChoice } from "./common/KimetuCommonUtil";
import { ibuki } from "./kekkizyutu/zyutu/Koori";
import { OgreKaikyu, TaishiKaikyu } from "./common/KimetuConst";

// ワールド接続時
system.beforeEvents.startup.subscribe(initEvent => {
  initRegisterKimetuCustom(initEvent);
});
world.beforeEvents.playerLeave.subscribe(leaveEvent => {
  leaveEvent.player.clearDynamicProperties();
});
world.afterEvents.playerSpawn.subscribe(event => {
  if (event.initialSpawn) {
    event.player.setProperty("kurokumaft:kokyu_use", false);
    event.player.setProperty("kurokumaft:kokyu_particle", false);
    event.player.setProperty("kurokumaft:kokyu_attack", false);
    event.player.setProperty("kurokumaft:kokyu_chage", 0);
    event.player.setProperty("kurokumaft:kokyu_ran", 0);
    event.player.setDynamicProperty("kurokumaft:chage_type", undefined);
  }
  const familyTypes = event.player.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
  if (familyTypes !== undefined && familyTypes.hasTypeFamily("ogre")) {
    event.player.triggerEvent("kurokumaft:player_spawned_ogre");
  } else if (familyTypes !== undefined && familyTypes.hasTypeFamily("regimental_player")) {
    event.player.triggerEvent("kurokumaft:player_spawned_regimental");
  } else {
    event.player.triggerEvent("kurokumaft:player_spawned_init");
  }
  const playerTick = new KimetuEquipmentTick(event.player);
  playerTick.startMonitoring();

});

world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
  const entity = event.entity;
  if (entity instanceof Player) {
    if (event.eventId === "kurokumaft:attack_time") {
      // const nichirintou = entity.getProperty("kurokumaft:nichirintou_type") as number;
      // if (nichirintou > 1) {
      const equ = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
      const mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
      if (mainHand !== undefined) {
        const object = KokyuObjects.find(ob => ob.itemName === mainHand.typeId) as KokyuObject;
        if (object !== undefined && object.type > 1 && !entity.getProperty("kurokumaft:kokyu_attack")) {
          entity.setProperty("kurokumaft:kokyu_attack", true);
          system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_attack", false);
          },10);
          const kokyuClass = kokyuClassRecord[object.className];
          const kokyuObject = new kokyuClass();

          const equ = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
          const itemStack = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
          kokyuObject.hitAttackKata(entity, itemStack);

        }
      }
    } else if (event.eventId === "kurokumaft:damaged_by_player") {
      entity.applyDamage(0, {
          cause: EntityDamageCause.entityAttack,
          damagingEntity: entity
        });
      }
  } else {
    if (event.eventId === "kurokumaft:kokyu_start") {
      if (entity.typeId.indexOf("kurokumaft:regimental") !== -1) {
        const nichirintoutype = entity.getProperty("kurokumaft:nichirintou_type") as number;
        if (nichirintoutype !== undefined) {
          const kokyuObject = KokyuObjects.find(ob => ob.type === nichirintoutype) as KokyuObject;
          if (kokyuObject !== undefined) {
            const katana = KokyuMobObjects.find(ob => ob.entityName === kokyuObject.itemName) as KokyuMobObject;
            if (katana !== undefined) {
              const KokyuClass = KokyuMobClassRecord[katana.className];
              const KokyuObject = new KokyuClass();
              KokyuObject.startMonitoring(entity);
            }
          }
        }

      } else {
        const taishi = KokyuMobObjects.find(ob => ob.entityName === entity.typeId) as KokyuMobObject;
        if (taishi !== undefined) {
          const KokyuClass = KokyuMobClassRecord[taishi.className];
          const KokyuObject = new KokyuClass();
          KokyuObject.startMonitoring(entity);
        }
      }
    } else if (event.eventId === "kurokumaft:kekkizyutu_start") {
      const ogre = KekkizyutuMobObjects.find(ob => ob.entityName === entity.typeId) as KekkizyutuMobObject;
      if (ogre !== undefined) {
        const kekkizyutuClass = KekkizyutuMobClassRecord[ogre.className];
        const kekkizyutuObject = new kekkizyutuClass(entity);
        kekkizyutuObject.startMonitoring(entity);
      }
    } else if (event.eventId === "kurokumaft:ibuki_start") {
      ibuki(entity);
    }
  }

});

world.afterEvents.itemStopUse.subscribe(event => {
  const source = event.source as Entity;
  const item = event.itemStack as ItemStack;
  if (source instanceof Player && item !== undefined) {
    const use = source.getProperty("kurokumaft:kokyu_use");
    const equippable = source.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    const mainHand = equippable.getEquipment(EquipmentSlot.Mainhand);
    if ((mainHand === undefined || mainHand.typeId !== item.typeId) && use) {
      source.setProperty("kurokumaft:kokyu_use", false);
      source.setProperty("kurokumaft:kokyu_particle", false);
      source.setProperty("kurokumaft:kokyu_attack", false);
      source.setProperty("kurokumaft:kokyu_chage", 0);
      source.setProperty("kurokumaft:kokyu_ran", 0);
      source.setDynamicProperty("kurokumaft:chage_type", undefined);

    }
  }
});

// アイテム右クリックリリース後
world.afterEvents.itemReleaseUse.subscribe(event => {
  const player = event.source;
  const item = event.itemStack;
  const duration = event.useDuration;
  const nichirintou = player.getProperty("kurokumaft:nichirintou_type");
  if (item !== undefined && nichirintou !== undefined && nichirintou !== 0) {
    if (player.getProperty("kurokumaft:kokyu_use")) {
      const object = KokyuObjects.find(ob => ob.type === nichirintou) as KokyuObject;
      const kokyuClass = kokyuClassRecord[object.className];
      const kokyuObject = new kokyuClass();
      kokyuObject.releaseAttackKata(player, item, duration);
    }
  }
  const kekkizyutu = player.getProperty("kurokumaft:kekkizyutu_type");
  if (item !== undefined && kekkizyutu !== undefined && kekkizyutu !== 0) {
    if (player.getProperty("kurokumaft:kokyu_use")) {
      const object = KekkizyutuObjects.find(ob => ob.type === kekkizyutu) as KekkizyutuObject;
      const kekkizyutuClass = KekkizyutuClassRecord[object.className];
      const kekkizyutuObject = new kekkizyutuClass();
      kekkizyutuObject.releaseAttackZyutu(player);
    }
  }

});

// world.afterEvents.entityLoad.subscribe(event => {
// });
const ogreRankLists = weightChoice([
    { item: 'low' , weight: 30 },
    { item: 'unusual' , weight: 20 },
    { item: 'quarter' , weight: 20 },
    { item: 'crescent' , weight: 20 }
]);

world.afterEvents.entitySpawn.subscribe(event => {
  const entity = event.entity as Entity;
  try {
    if (entity !== undefined) {
      const taishibject = TaishiKaikyu.find(taishi => taishi.name === entity.typeId);
      if (taishibject !== undefined && event.cause === EntityInitializationCause.Spawned) {
        const kaikyuRan = getRandomInRange(taishibject.min, taishibject.max);
        entity.setProperty("kurokumaft:kaikyu", kaikyuRan);
        system.waitTicks(4).then(() => {
          entity.triggerEvent("kurokumaft:kaikyu_change");
        }).catch((error: any) => {
        });
      }
      const ogre_rank = entity.getProperty("kurokumaft:ogre_rank") as string;
      if (event.cause === EntityInitializationCause.Spawned) {
        if (entity.typeId === "kurokumaft:nezuko") {
          const rankRan = ogreRankLists.pick();
          entity.setProperty("kurokumaft:ogre_rank", rankRan);
          if (ogre_rank === "quarter" || ogre_rank === "crescent") {
            entity.setProperty("kurokumaft:ogre_moon", getRandomInRange(1, 6));
          }
          system.waitTicks(4).then(() => {
            entity.triggerEvent("kurokumaft:ogre_rank_change");
          }).catch((error: any) => {
          });
        } else if (entity.typeId === "kurokumaft:ogre") {
          entity.setProperty("kurokumaft:ogre_rank", "low");
          entity.setProperty("kurokumaft:ogre_point", getRandomInRange(10, 60));
        } else {
          const ogreObject = OgreKaikyu.find(ogre => ogre.name === entity.typeId);
          if (ogreObject !== undefined) {
            entity.setProperty("kurokumaft:ogre_rank", ogreObject.rank);
          }
        }
      }
    }
  } catch (error: any) {
  }
});

// world.afterEvents.entityRemove.subscribe(event => {

//   const entityId = event.typeId;

//   const object = KekkizyutuMobObjects.find(ob => ob.entityName === entityId) as KekkizyutuMobObject;
//   if (object !== undefined) {
//     const kekkizyutuClass = KekkizyutuMobClassRecord[object.className];
//     const kekkizyutuObject = new kekkizyutuClass(entity);
//     kekkizyutuObject.startMonitoring();
//   }

// });

const raishinStastsCheck = new RaisingStatusCheckClass();
world.afterEvents.entityDie.subscribe(event => {
  const deadEntity = event.deadEntity;
  if (!deadEntity.isValid) {
    return;
  }
  const familyTypes = deadEntity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
  if (familyTypes !== undefined && familyTypes.hasTypeFamily("ogre")) {
    const damager = event.damageSource.damagingEntity;
    if (damager !== undefined) {
      const dfamilyTypes = damager.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
      if (dfamilyTypes !== undefined && dfamilyTypes.hasTypeFamily("player") && !dfamilyTypes.hasTypeFamily("ogre")) {
        raishinStastsCheck.statusCheck(damager as Player, deadEntity);
      }
    }
  } else if (familyTypes !== undefined && familyTypes.hasTypeFamily("player")) {
    deadEntity.removeTag("hostility_player");
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

world.afterEvents.entityHitEntity.subscribe(event => {
  const damagingEntity = event.damagingEntity;
  const hitEntity = event.hitEntity;
  if (!hitEntity.isValid) {
    return;
  }
  const damageFamilyTypes = damagingEntity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
  const hitFamilyTypes = hitEntity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
  if (hitFamilyTypes !== undefined && hitFamilyTypes.hasTypeFamily("regimental_soldier") && damageFamilyTypes.hasTypeFamily("player")) {
    hitEntity.addTag("hostility");
    damagingEntity.addTag("hostility_player");
  } else if (hitFamilyTypes !== undefined && hitFamilyTypes.hasTypeFamily("player") && damageFamilyTypes.hasTypeFamily("player")) {
    hitEntity.addTag("hostility_player");
    damagingEntity.addTag("hostility_player");
  }
  if (hitFamilyTypes !== undefined && hitFamilyTypes.hasTypeFamily("ogre")) {
    const type = damagingEntity.getProperty("kurokumaft:nichirintou_type");
    if (type === undefined || type === 0) {
      const distance = getLookLocationDistance(damagingEntity.getRotation().y, 1.25, 0, 0.5);
      hitEntity.applyKnockback({x:distance.x, z:distance.z}, 0.25);
    }
  }
});

world.afterEvents.entityHurt.subscribe(event => {
  const hurtEntity = event.hurtEntity;
  if (!hurtEntity.isValid) {
    return;
  }
  const health = hurtEntity.getComponent(EntityComponentTypes.Health) as EntityHealthComponent;
  if (hurtEntity.typeId === "kurokumaft:sekido") {
    if (hurtEntity.getTags().length === 1) {
      if (isBelowThreshold(health.currentValue, health.defaultValue, 0.7)) {
        hurtEntity.addTag("bunretu_1");
        const aizetu = hurtEntity.dimension.spawnEntity("kurokumaft:aizetu", hurtEntity.location);
        aizetu.addTag(hurtEntity.getTags()[0]);
        aizetu.addTag("bunretu_1");
      }
    }
  }
  if (hurtEntity.typeId === "kurokumaft:karaku") {
    if (hurtEntity.getTags().length === 1 && isBelowThreshold(health.currentValue, health.defaultValue, 0.7)) {
      hurtEntity.addTag("bunretu_1");
      const urogi = hurtEntity.dimension.spawnEntity("kurokumaft:urogi", hurtEntity.location);
      urogi.addTag(hurtEntity.getTags()[0]);
      urogi.addTag("bunretu_1");
    }
  }
  if (hurtEntity.typeId === "kurokumaft:sekido"
     || hurtEntity.typeId === "kurokumaft:karaku"
     || hurtEntity.typeId === "kurokumaft:aizetu"
     || hurtEntity.typeId === "kurokumaft:urogi"
  ) {
    if (hurtEntity.getTags().length === 2 && isBelowThreshold(health.currentValue, health.defaultValue, 0.3)) {
      const bunretutai = hurtEntity.dimension.getEntities({
        tags: [hurtEntity.getTags()[0]],
        maxDistance: 64,
        location: hurtEntity.location
      });
      hurtEntity.dimension.spawnEntity("kurokumaft:zouhakuten", hurtEntity.location);
      bunretutai.forEach(en => {
        if (en.typeId !== "kurokumaft:hantengu_obie") {
          en.remove();
        }
      });
    }
  }
});

world.afterEvents.projectileHitEntity.subscribe(event => {
  const projectile = event.projectile as Entity;
  const hitEntity = event.getEntityHit().entity;
  if ("kurokumaft:thrown_syringe_dagger" === projectile.typeId) {
    if (hitEntity !== undefined) {
      const familyTypes = hitEntity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
      if (familyTypes.hasTypeFamily("ogre")) {
        const rank = hitEntity.getProperty("kurokumaft:ogre_rank");
        const daggerFull = new ItemStack("kurokumaft:syringe_dagger_full", 1);
        switch (rank) {
          case "low" :
            daggerFull.setLore(["Lv 1"]);
          break;
          case "unusual" :
            daggerFull.setLore(["Lv 2"]);
          break;
          case "quarter" :
            daggerFull.setLore(["Lv 3"]);
          break;
          case "crescent" :
            daggerFull.setLore(["Lv 4"]);
          break;
          case "king" :
            daggerFull.setLore(["Lv 5"]);
          break;
        }
        event.dimension.spawnItem(daggerFull, event.location);
      }
    }
  } else if (projectile.isValid && "kurokumaft:obi" === projectile.typeId) {

    try {
      const hitCount = projectile.getDynamicProperty("hitCount") as number;

      if (hitEntity !== undefined && hitEntity.isValid && hitCount < 5) {
        projectile.setDynamicProperty("hitCount", hitCount + 1);
      } else {
        const num = projectile.getDynamicProperty("hormingNum") as number;
        if (num !== undefined) {
          system.clearRun(num);
          projectile.remove();
        }
      }
    } catch (error: any) {
      system.clearRun(projectile.getDynamicProperty("hormingNum") as number);
    }
  } else if (projectile.isValid && "kurokumaft:tobi_tigama" === projectile.typeId) {

    if (hitEntity !== undefined && hitEntity.isValid) {
      hitEntity.addEffect(MinecraftEffectTypes.Poison, 10, {
        showParticles: false,
        amplifier: 5
      });
    }
  }

});

world.afterEvents.projectileHitBlock.subscribe(event => {
  const projectile = event.projectile as Entity;
  if ("kurokumaft:thrown_syringe_dagger" === projectile.typeId) {
    event.dimension.spawnItem(new ItemStack("kurokumaft:syringe_dagger", 1), event.location);
  }
});

system.afterEvents.scriptEventReceive.subscribe(event => {
  const id = event.id;
  const message = event.message;
  const initiator = event.initiator;
  const sourceEntity = event.sourceEntity;
  const sourceType = event.sourceType;
  if (initiator !== undefined) {
  }
  if (id === "kk:kaikyuchange" && sourceType === ScriptEventSource.Entity && sourceEntity instanceof Player) {
    const params = message.split(" ");
    if (params[0] !== "set" && params[0] !== "add") {
      world.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_method"});
      return;
    }
    if (params[0] === "add") {
      if (params.length !== 3) {
        world.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_add_argument"});
        return;
      }
      if (params[1] !== "promotion" && params[1] !== "demotion") {
        world.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_add_type"});
        return;
      }
      if (!(typeof params[2] === "number" && Number.isFinite(params[2]))) {
        world.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_add_num"});
        return;
      }
    } else if (params[0] === "set") {
      if (params.length !== 2) {
        world.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_set_argument"});
        return;
      }
      const num = Number(params[1]);
      if (!(!isNaN(num) && Number.isFinite(num))) {
        world.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_set_num"});
        return;
      }
    }

    sourceEntity.setProperty("kurokumaft:ogre_rank", "none");
    sourceEntity.setProperty("kurokumaft:ogre_moon", 6);
    sourceEntity.setProperty("kurokumaft:ogre_becoming", 0);

    const kaikyu = sourceEntity.getProperty("kurokumaft:kaikyu") as number;
    const kill = sourceEntity.getProperty("kurokumaft:ogre_kill") as number;

    if (params[0] === "add") {
      const num = Number(params[2]);
      if (params[1] === "promotion") {
        let upPoint = kill+num;
        let killtarget=0;
        switch(kaikyu) {
          case 0:
            killtarget=1;
            break;
          case 10:
            killtarget=killtarget+150;
          case 9:
            killtarget=killtarget+90;
          case 8:
            killtarget=killtarget+80;
          case 7:
            killtarget=killtarget+70;
          case 6:
            killtarget=killtarget+60;
          case 5:
            killtarget=killtarget+50;
          case 4:
            killtarget=killtarget+40;
          case 3:
            killtarget=killtarget+30;
          case 2:
            killtarget=killtarget+20;
          case 1:
            killtarget=killtarget+10;
            if (upPoint >= killtarget) {
              sourceEntity.setProperty("kurokumaft:kaikyu", kaikyu+1);
              sourceEntity.setProperty("kurokumaft:ogre_kill", 0);
            } else {
              sourceEntity.setProperty("kurokumaft:ogre_kill", upPoint);
            }
        }
      } else if (params[1] === "demotion") {
        let upPoint = kill-num;
        let killtarget=0;
        switch(kaikyu) {
          case 0:
            break;
          case 10:
            killtarget=killtarget+150;
          case 9:
            killtarget=killtarget+90;
          case 8:
            killtarget=killtarget+80;
          case 7:
            killtarget=killtarget+70;
          case 6:
            killtarget=killtarget+60;
          case 5:
            killtarget=killtarget+50;
          case 4:
            killtarget=killtarget+40;
          case 3:
            killtarget=killtarget+30;
          case 2:
            killtarget=killtarget+20;
          case 1:
            killtarget=killtarget+10;
            if (upPoint < 0) {
              sourceEntity.setProperty("kurokumaft:kaikyu", kaikyu-1);
              sourceEntity.setProperty("kurokumaft:ogre_kill", killtarget);
              sourceEntity.triggerEvent("kurokumaft:kaikyu_change");
            } else {
              sourceEntity.setProperty("kurokumaft:ogre_kill", upPoint);
            }
            break;
          case 11:
            sourceEntity.setProperty("kurokumaft:kaikyu", kaikyu-1);
            sourceEntity.setProperty("kurokumaft:ogre_kill", 1);
            sourceEntity.triggerEvent("kurokumaft:kaikyu_change");
          }
      }
    } else if (params[0] === "set") {
      sourceEntity.setProperty("kurokumaft:ogre_kill", 0);
      const num = Number(params[1]);
      if (num > 0 && num <= 11) {
        sourceEntity.setProperty("kurokumaft:kaikyu", num);
        system.runTimeout(() => {
          sourceEntity.triggerEvent("kurokumaft:kaikyu_change");
        }, 2);
      } else if (num === 0) {
        sourceEntity.setProperty("kurokumaft:kaikyu", num);
        system.runTimeout(() => {
          sourceEntity.triggerEvent("kurokumaft:kaikyu_change");
        }, 2);
      }
    }
  }

  if (id === "kk:ogrerankchange" && sourceType === ScriptEventSource.Entity && sourceEntity instanceof Player) {
    const params = message.split(" ");
    if (params[0] !== "set" && params[0] !== "add") {
      world.sendMessage({ translate: "msg.kurokumaft:ogreRankChange.missing_method"});
      return;
    }
    if (params[0] === "add") {
      if (params.length !== 3) {
        world.sendMessage({ translate: "msg.kurokumaft:ogreRankChange.missing_add_argument"});
        return;
      }
      if (params[1] !== "promotion" && params[1] !== "demotion") {
        world.sendMessage({ translate: "msg.kurokumaft:ogreRankChange.missing_add_type"});
        return;
      }
      if (!(Number.isFinite(params[2]))) {
        world.sendMessage({ translate: "msg.kurokumaft:ogreRankChange.missing_add_num"});
        return;
      }
    } else if (params[0] === "set") {
      if (params.length !== 2) {
        world.sendMessage({ translate: "msg.kurokumaft:ogreRankChange.missing_set_argument"});
        return;
      }
      const num = Number(params[1]);
      if (!(!isNaN(num) && Number.isFinite(num))) {
        world.sendMessage({ translate: "msg.kurokumaft:ogreRankChange.missing_set_num"});
        return;
      }
    }

    sourceEntity.setProperty("kurokumaft:kaikyu", 0);
    sourceEntity.setProperty("kurokumaft:ogre_kill", 0);

    const rank = sourceEntity.getProperty("kurokumaft:ogre_rank");

    if (params[0] === "add") {
      let becoming = sourceEntity.getProperty("kurokumaft:ogre_becoming") as number;
      const num = Number(params[2]);
      if (params[1] === "promotion") {
        becoming = becoming+num;
        if (becoming >= 100) {
          switch (rank) {
            case "low" :
              sourceEntity.setProperty("kurokumaft:ogre_rank", "unusual");
            break;
            case "unusual" :
              sourceEntity.setProperty("kurokumaft:ogre_rank", "quarter");
            break;
            case "quarter" :
              const moon1 = sourceEntity.getProperty("kurokumaft:ogre_moon") as number;
              if (moon1 === 1) {
                sourceEntity.setProperty("kurokumaft:ogre_moon", 6);
                sourceEntity.setProperty("kurokumaft:ogre_rank", "crescent");
              } else {
                sourceEntity.setProperty("kurokumaft:ogre_moon", moon1-1);
              }
            break;
            case "crescent" :
              const moon2 = sourceEntity.getProperty("kurokumaft:ogre_moon") as number;
              if (moon2 === 1) {
                sourceEntity.setProperty("kurokumaft:ogre_rank", "king");
              } else {
                sourceEntity.setProperty("kurokumaft:ogre_moon", moon2-1);
              }
            break;
          }
          sourceEntity.setProperty("kurokumaft:ogre_becoming", 0);
          system.runTimeout(() => {
            sourceEntity.triggerEvent("kurokumaft:ogre_rank_change");
          }, 2);
        } else {
          sourceEntity.setProperty("kurokumaft:ogre_becoming", becoming);
        }
      } else if (params[1] === "demotion") {
        becoming = becoming-num;
        if (becoming > 0) {
          switch (rank) {
            case "low" :
              sourceEntity.setProperty("kurokumaft:ogre_rank", "none");
            break;
            case "unusual" :
              sourceEntity.setProperty("kurokumaft:ogre_rank", "low");
            break;
            case "quarter" :
              const moon1 = sourceEntity.getProperty("kurokumaft:ogre_moon") as number;
              if (moon1 === 6) {
                sourceEntity.setProperty("kurokumaft:ogre_rank", "unusual");
              } else {
                sourceEntity.setProperty("kurokumaft:ogre_moon", moon1+1);
              }
            break;
            case "crescent" :
              const moon2 = sourceEntity.getProperty("kurokumaft:ogre_moon") as number;
              if (moon2 === 6) {
                sourceEntity.setProperty("kurokumaft:ogre_rank", "quarter");
              } else {
                sourceEntity.setProperty("kurokumaft:ogre_moon", moon2+1);
              }
            break;
            case "king" :
              sourceEntity.setProperty("kurokumaft:ogre_rank", "crescent");
              sourceEntity.setProperty("kurokumaft:ogre_moon", 1);
              break;
          }
          sourceEntity.setProperty("kurokumaft:ogre_becoming", 0);
          system.runTimeout(() => {
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
        system.runTimeout(() => {
          sourceEntity.triggerEvent("kurokumaft:ogre_rank_change");
        }, 2);
      }
    }
  }
});
