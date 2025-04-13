import { world,system, EquipmentSlot, Player, EntityComponentTypes, EntityEquippableComponent, ItemStack, EntityTypeFamilyComponent, ScriptEventSource, EntityHealthComponent } from "@minecraft/server";
import { initRegisterKimetuCustom } from "./custom/KimetuCustomComponentRegistry";
import { kokyuClassRecord, KokyuObject, KokyuObjects } from "./item/weapon/NichirintouTypes";
import { KimetuEquipmentTick } from "./player/KimetuEquipmentTick";
import { RaisingStatusCheckClass } from "./player/RaisingStatusCheckClass";

// ワールド接続時
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
  playerTick.checkPlayerKimetuEquTick();
  playerTick.checkPlayerKaikyuTick();
});

world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
  const entity = event.entity;
  if (entity instanceof Player) {
    const nichirintou = entity.getProperty("kurokumaft:nichirintou_type") as number;
    if (nichirintou > 1) {
      if (event.eventId == "kurokumaft:attack_time" && !entity.getProperty("kurokumaft:kokyu_attack")) {
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
});

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
      world.sendMessage(params[0]);
      if (params.length != 2) {
        world.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_set_argument"});
        return;
      }
      world.sendMessage(params[1]);
      const num = Number(params[1]);
      if (!(!isNaN(num) && Number.isFinite(num))) {
        world.sendMessage({ translate: "msg.kurokumaft:kaikyuChange.missing_set_num"});
        return;
      }
    }
    const kaikyu = sourceEntity.getProperty("kurokumaft:kaikyu") as number;
    const kill = sourceEntity.getProperty("kurokumaft:orge_kill") as number;
    const health = sourceEntity.getComponent(EntityComponentTypes.Health) as EntityHealthComponent;
    const healthValue = 10;

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
              sourceEntity.setProperty("kurokumaft:orge_kill", 0);
            } else {
              sourceEntity.setProperty("kurokumaft:orge_kill", upPoint);
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
            if (upPoint <= 0) {
              sourceEntity.setProperty("kurokumaft:kaikyu", kaikyu-1);
              sourceEntity.setProperty("kurokumaft:orge_kill", killtarget);
              health.setCurrentValue(20+healthValue*(kaikyu-1));
            } else {
              sourceEntity.setProperty("kurokumaft:orge_kill", upPoint);
            }
            break;
          case 11:
            sourceEntity.setProperty("kurokumaft:kaikyu", kaikyu-1);
            sourceEntity.setProperty("kurokumaft:orge_kill", 300);
            health.setCurrentValue(20+healthValue*(kaikyu-1));
          }
      }
    } else if (params[0] == "set") {
      const num = Number(params[1]);
      if (num > 0 && num < 12) {
        sourceEntity.setProperty("kurokumaft:kaikyu", num);
        health.setCurrentValue(20+healthValue*num);
      }
    }
  }
});
