import { world,system, EquipmentSlot, Player, EntityComponentTypes, EntityEquippableComponent, ItemStack, EntityTypeFamilyComponent, ScriptEventSource, Entity, EntityInitializationCause } from "@minecraft/server";
import { initRegisterKimetuCustom } from "./custom/KimetuCustomComponentRegistry";
import { kokyuClassRecord, KokyuMobClassRecord, KokyuMobObject, KokyuMobObjects, KokyuObject, KokyuObjects } from "./item/weapon/NichirintouTypes";
import { KimetuEquipmentTick } from "./player/KimetuEquipmentTick";
import { RaisingStatusCheckClass } from "./player/RaisingStatusCheckClass";
import { KekkizyutuClassRecord, KekkizyutuMobClassRecord, KekkizyutuMobObject, KekkizyutuMobObjects, KekkizyutuObject, KekkizyutuObjects } from "./item/weapon/KekkizyutuTypes";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { getRandomInRange } from "./common/KimetuCommonUtil";

// ワールド接続時
//system.SystemBeforeEvents.subscribe(initEvent => {
world.beforeEvents.worldInitialize.subscribe(initEvent => {
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
  const playerTick = new KimetuEquipmentTick(event.player);
  playerTick.startMonitoring();

});

world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
  const entity = event.entity;
  if (entity instanceof Player) {
    if (event.eventId == "kurokumaft:attack_time") {
      const nichirintou = entity.getProperty("kurokumaft:nichirintou_type") as number;
      if (nichirintou > 1) {
        if (!entity.getProperty("kurokumaft:kokyu_attack")) {
          entity.setProperty("kurokumaft:kokyu_attack", true);
          system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_attack", false);
          },10);

          const object = KokyuObjects.find(ob => ob.type == nichirintou) as KokyuObject;
          const kokyuClass = kokyuClassRecord[object.className];
          const kokyuObject = new kokyuClass();

          const equ = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
          const itemStack = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
          kokyuObject.hitAttackKata(entity, itemStack);

        }
      }
    }
  } else {
    if (event.eventId == "kurokumaft:kokyu_start") {
      if (entity.typeId.indexOf("kurokumaft:regimental") != -1) {
        const nichirintoutype = entity.getProperty("kurokumaft:nichirintou_type") as number;
        if (nichirintoutype != undefined) {
          const kokyuObject = KokyuObjects.find(ob => ob.type == nichirintoutype) as KokyuObject;
          const katana = KokyuMobObjects.find(ob => ob.entityName == kokyuObject.itemName) as KokyuMobObject;
          if (katana != undefined) {
            const KokyuClass = KokyuMobClassRecord[katana.className];
            const KokyuObject = new KokyuClass();
            KokyuObject.startMonitoring(entity);
          }
        }

      } else {
        const taishi = KokyuMobObjects.find(ob => ob.entityName == entity.typeId) as KokyuMobObject;
        if (taishi != undefined) {
          const kokyu_kata = entity.getProperty("kurokumaft:kokyu_kata");
          const KokyuClass = KokyuMobClassRecord[taishi.className];
          const KokyuObject = new KokyuClass();
          KokyuObject.startMonitoring(entity);
        }
      }
    } else if (event.eventId == "kurokumaft:kekkizyutu_start") {
      const ogre = KekkizyutuMobObjects.find(ob => ob.entityName == entity.typeId) as KekkizyutuMobObject;
      if (ogre != undefined) {
        const kekkizyutuClass = KekkizyutuMobClassRecord[ogre.className];
        const kekkizyutuObject = new kekkizyutuClass(entity);
        kekkizyutuObject.startMonitoring();
      }
    }
  }
});

// アイテム右クリックリリース後
world.afterEvents.itemReleaseUse.subscribe(event => {
  const player = event.source;
  const item = event.itemStack;
  const duration = event.useDuration;
  const nichirintou = player.getProperty("kurokumaft:nichirintou_type");
  if (item != undefined && nichirintou != undefined && nichirintou != 0) {
    if (player.getProperty("kurokumaft:kokyu_use")) {
      const object = KokyuObjects.find(ob => ob.type == nichirintou) as KokyuObject;
      const kokyuClass = kokyuClassRecord[object.className];
      const kokyuObject = new kokyuClass();
      kokyuObject.releaseAttackKata(player, item, duration);
    }
  }
  const kekkizyutu = player.getProperty("kurokumaft:kekkizyutu_type");
  if (item != undefined && kekkizyutu != undefined && kekkizyutu != 0) {
    if (player.getProperty("kurokumaft:kokyu_use")) {
      const object = KekkizyutuObjects.find(ob => ob.type == kekkizyutu) as KekkizyutuObject;
      const kekkizyutuClass = KekkizyutuClassRecord[object.className];
      const kekkizyutuObject = new kekkizyutuClass();
      kekkizyutuObject.releaseAttackZyutu(player);
    }
  }

});

// world.afterEvents.entityLoad.subscribe(event => {
// });

world.afterEvents.entitySpawn.subscribe(event => {
  const entity = event.entity as Entity;
  const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
  if (kaikyuNum != undefined && kaikyuNum != 11 && event.cause == EntityInitializationCause.Spawned) {
    const kaikyuRan = getRandomInRange(1, 10);
    entity.setProperty("kurokumaft:kaikyu", kaikyuRan);
    system.runTimeout(() => {
      entity.triggerEvent("kurokumaft:kakyu_change");
    }, 4);
  }
});

// world.afterEvents.entityRemove.subscribe(event => {

//   const entityId = event.typeId;

//   const object = KekkizyutuMobObjects.find(ob => ob.entityName == entityId) as KekkizyutuMobObject;
//   if (object != undefined) {
//     const kekkizyutuClass = KekkizyutuMobClassRecord[object.className];
//     const kekkizyutuObject = new kekkizyutuClass(entity);
//     kekkizyutuObject.startMonitoring();
//   }

// });

world.afterEvents.entityDie.subscribe(event => {
  const deadEntity = event.deadEntity;
  const familyTypes = deadEntity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
  if (familyTypes != undefined && familyTypes.hasTypeFamily("ogre")) {
    const damager = event.damageSource.damagingEntity;
    if (damager != undefined) {
      const dfamilyTypes = damager.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
      if (dfamilyTypes.hasTypeFamily("player")) {
        new RaisingStatusCheckClass().statusCheck(damager as Player, deadEntity);
      }
    }
  }

});

world.afterEvents.projectileHitEntity.subscribe(event => {
  const projectile = event.projectile as Entity;
  const hitEntity = event.getEntityHit().entity;
  if ("kurokumaft:thrown_syringe_dagger" == projectile.typeId) {
    if (hitEntity != undefined) {
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
  } else if (projectile.isValid() && "kurokumaft:obi" == projectile.typeId) {

    const hitCount = projectile.getDynamicProperty("hitCount") as number;

    if (hitEntity != undefined && hitEntity.isValid() && hitCount < 5) {
      projectile.setDynamicProperty("hitCount", hitCount + 1);
    } else {
      const num = projectile.getDynamicProperty("hormingNum") as number;
      if (num != undefined) {
        system.clearRun(num);
        projectile.remove();
      }
    }
  } else if (projectile.isValid() && "kurokumaft:tobi_tigama" == projectile.typeId) {

    if (hitEntity != undefined && hitEntity.isValid()) {
      hitEntity.addEffect(MinecraftEffectTypes.Poison, 10, {
          showParticles: false,
          amplifier: 5
      });
    }
  }

});

world.afterEvents.projectileHitBlock.subscribe(event => {
  const projectile = event.projectile as Entity;
  if ("kurokumaft:thrown_syringe_dagger" == projectile.typeId) {
    event.dimension.spawnItem(new ItemStack("kurokumaft:syringe_dagger", 1), event.location);
  }
});

system.afterEvents.scriptEventReceive.subscribe(event => {
  const id = event.id;
  const message = event.message;
  const initiator = event.initiator;
  const sourceEntity = event.sourceEntity;
  const sourceType = event.sourceType;
  if (initiator != undefined) {
  }
  if (id == "kk:kaikyuchange" && sourceType == ScriptEventSource.Entity && sourceEntity instanceof Player) {
    const params = message.split(" ");
    if (params[0] != "set" && params[0] != "add") {
      world.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_method"});
      return;
    }
    if (params[0] == "add") {
      if (params.length != 3) {
        world.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_add_argument"});
        return;
      }
      if (params[1] != "promotion" && params[1] != "demotion") {
        world.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_add_type"});
        return;
      }
      if (!(typeof params[2] === "number" && Number.isFinite(params[2]))) {
        world.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_add_num"});
        return;
      }
    } else if (params[0] == "set") {
      if (params.length != 2) {
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

    if (params[0] == "add") {
      const num = Number(params[2]);
      if (params[1] == "promotion") {
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
      } else if (params[1] == "demotion") {
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
              sourceEntity.triggerEvent("kurokumaft:kakyu_change");
            } else {
              sourceEntity.setProperty("kurokumaft:ogre_kill", upPoint);
            }
            break;
          case 11:
            sourceEntity.setProperty("kurokumaft:kaikyu", kaikyu-1);
            sourceEntity.setProperty("kurokumaft:ogre_kill", 300);
            sourceEntity.triggerEvent("kurokumaft:kakyu_change");
          }
      }
    } else if (params[0] == "set") {
      const num = Number(params[1]);
      if (num > 0 && num <= 11) {
        sourceEntity.setProperty("kurokumaft:kaikyu", num);
        system.runTimeout(() => {
          sourceEntity.triggerEvent("kurokumaft:kakyu_change");
        }, 2);
      } else if (num == 0) {
        sourceEntity.setProperty("kurokumaft:kaikyu", num);
        system.runTimeout(() => {
          sourceEntity.triggerEvent("kurokumaft:kakyu_change");
        }, 2);
      }
    }
  }

  if (id == "kk:ogrerankchange" && sourceType == ScriptEventSource.Entity && sourceEntity instanceof Player) {
    const params = message.split(" ");
    if (params[0] != "set" && params[0] != "add") {
      world.sendMessage({ translate: "msg.kurokumaft:ogreRankChange.missing_method"});
      return;
    }
    if (params[0] == "add") {
      if (params.length != 3) {
        world.sendMessage({ translate: "msg.kurokumaft:ogreRankChange.missing_add_argument"});
        return;
      }
      if (params[1] != "promotion" && params[1] != "demotion") {
        world.sendMessage({ translate: "msg.kurokumaft:ogreRankChange.missing_add_type"});
        return;
      }
      if (!(typeof params[2] === "number" && Number.isFinite(params[2]))) {
        world.sendMessage({ translate: "msg.kurokumaft:ogreRankChange.missing_add_num"});
        return;
      }
    } else if (params[0] == "set") {
      if (params.length != 2) {
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

    if (params[0] == "add") {
      let becoming = sourceEntity.getProperty("kurokumaft:ogre_becoming") as number;
      const num = Number(params[2]);
      if (params[1] == "promotion") {
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
              if (moon1 == 1) {
                sourceEntity.setProperty("kurokumaft:ogre_moon", 6);
                sourceEntity.setProperty("kurokumaft:ogre_rank", "crescent");
              } else {
                sourceEntity.setProperty("kurokumaft:ogre_moon", moon1-1);
              }
            break;
            case "crescent" :
              const moon2 = sourceEntity.getProperty("kurokumaft:ogre_moon") as number;
              if (moon2 == 1) {
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
      } else if (params[1] == "demotion") {
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
              if (moon1 == 6) {
                sourceEntity.setProperty("kurokumaft:ogre_rank", "unusual");
              } else {
                sourceEntity.setProperty("kurokumaft:ogre_moon", moon1+1);
              }
            break;
            case "crescent" :
              const moon2 = sourceEntity.getProperty("kurokumaft:ogre_moon") as number;
              if (moon2 == 6) {
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
    } else if (params[0] == "set") {
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
