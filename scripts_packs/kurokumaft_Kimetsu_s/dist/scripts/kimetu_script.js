// scripts/kimetu_script.ts
import { world as world5, EquipmentSlot as EquipmentSlot5, Player as Player12 } from "@minecraft/server";

// scripts/item/weapon/nichirintou/Nichirintou.ts
import { ItemStack, EntityComponentTypes, EquipmentSlot, ItemComponentTypes } from "@minecraft/server";
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
var nichirintouLists = ProbabilisticChoice([
  { item: "kurokumaft:nichirintou_mizu", weight: 50 },
  { item: "kurokumaft:nichirintou_hono", weight: 30 },
  { item: "kurokumaft:nichirintou_kaze", weight: 20 },
  { item: "kurokumaft:nichirintou_hana", weight: 20 },
  { item: "kurokumaft:nichirintou_kaminari", weight: 15 },
  { item: "kurokumaft:nichirintou_koi", weight: 5 },
  { item: "kurokumaft:nichirintou_mushi", weight: 5 },
  { item: "kurokumaft:nichirintou_oto", weight: 5 },
  { item: "kurokumaft:nichirintou_hi", weight: 1 }
]);
var Nichirintou = class {
  // 右クリック
  onUse(event) {
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};
async function probabilisticChoice(itemStack, player) {
  let nichirintou = nichirintouLists.pick();
  let enchant = itemStack.getComponent(ItemComponentTypes.Enchantable);
  let changeItem = new ItemStack(nichirintou);
  let newEnchant = changeItem.getComponent(ItemComponentTypes.Enchantable);
  newEnchant.addEnchantments(enchant.getEnchantments());
  let equ = player.getComponent(EntityComponentTypes.Equippable);
  equ.setEquipment(EquipmentSlot.Mainhand, changeItem);
}

// scripts/item/weapon/nichirintou/NichirintouTanjiro.ts
import { world as world2 } from "@minecraft/server";

// scripts/item/weapon/NichirintouTypes.ts
var KokyuObjects = Object.freeze([
  {
    itemName: "kurokumaft:nichirintou",
    type: 1,
    change: void 0,
    func: probabilisticChoice
  },
  {
    itemName: "kurokumaft:nichirintou_tanjiro",
    type: 2,
    kata: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    kata_msg: "msg.kurokumaft:tanjiro_kata",
    change: changeTanjiro,
    func: kokyuTanjiro
  },
  {
    itemName: "kurokumaft:nichirintou_zenitu",
    type: 2,
    kata: [1, 2, 7],
    kata_msg: "msg.kurokumaft:tanjiro_kata",
    change: changeTanjiro,
    func: kokyuTanjiro
  }
]);

// scripts/item/weapon/nichirintou/NichirintouTanjiro.ts
var kokyu = Object.freeze([
  "msg.kurokumaft:mizu_kokyu1.name",
  "msg.kurokumaft:mizu_kokyu2.name",
  "msg.kurokumaft:mizu_kokyu3.name",
  "msg.kurokumaft:mizu_kokyu4.name",
  "msg.kurokumaft:mizu_kokyu5.name",
  "msg.kurokumaft:mizu_kokyu6.name",
  "msg.kurokumaft:mizu_kokyu7.name",
  "msg.kurokumaft:mizu_kokyu8.name",
  "msg.kurokumaft:mizu_kokyu9.name",
  "msg.kurokumaft:mizu_kokyu10.name",
  "msg.kurokumaft:hi_kokyu1.name",
  "msg.kurokumaft:hi_kokyu2.name",
  "msg.kurokumaft:hi_kokyu3.name",
  "msg.kurokumaft:hi_kokyu4.name",
  "msg.kurokumaft:hi_kokyu5.name",
  "msg.kurokumaft:hi_kokyu6.name",
  "msg.kurokumaft:hi_kokyu7.name",
  "msg.kurokumaft:hi_kokyu8.name",
  "msg.kurokumaft:hi_kokyu9.name",
  "msg.kurokumaft:hi_kokyu10.name",
  "msg.kurokumaft:hi_kokyu11.name",
  "msg.kurokumaft:hi_kokyu12.name"
]);
var NichirintouTanjiro = class {
  // 右クリック
  onUse(event) {
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
    player.setProperty("kurokumaft:kokyu_use", true);
  }
};
async function changeTanjiro(player) {
  let kata = player.getProperty("kurokumaft:kokyu_kata");
  let object = KokyuObjects[1];
  let index = object.kata.findIndex((num) => num == kata);
  if (index != -1) {
    if (index < object.kata.length - 1) {
      player.setProperty("kurokumaft:kokyu_kata", object.kata[index + 1]);
      player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:tanjiro_kata' + object.kata[index + 1] + '.name"}]}');
    } else {
      player.setProperty("kurokumaft:kokyu_kata", object.kata[0]);
      player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"msg.kurokumaft:tanjiro_kata1.name"}]}');
    }
  }
}
async function kokyuTanjiro(itemStack, player) {
  let kata = player.getProperty("kurokumaft:kokyu_kata");
  switch (kata) {
    case 1:
      break;
    case 2:
      break;
  }
  world2.sendMessage(kata + "");
  player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"' + kokyu[kata - 1] + '"}]}');
}

// scripts/item/weapon/nichirintou/NichirintouGenya.ts
var NichirintouGenya = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouGiyu.ts
var NichirintouGiyu = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouGyoumei.ts
var NichirintouGyoumei = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouHana.ts
var NichirintouHana = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouHi.ts
var NichirintouHi = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouHono.ts
import { EntityComponentTypes as EntityComponentTypes4 } from "@minecraft/server";

// scripts/common/ShooterEvent.ts
import { EntityComponentTypes as EntityComponentTypes3 } from "@minecraft/server";
function shooting(player, throwItem, ranNum, seepd, event) {
  let bulet;
  if (event != void 0) {
    bulet = player.dimension.spawnEntity(throwItem + "<" + event + ">", player.getHeadLocation());
  } else {
    bulet = player.dimension.spawnEntity(throwItem, player.getHeadLocation());
  }
  let projectile = bulet.getComponent(EntityComponentTypes3.Projectile);
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

// scripts/item/weapon/nichirintou/NichirintouHono.ts
var NichirintouHono = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
    let variant = player.getComponent(EntityComponentTypes4.Variant);
    if (variant != void 0 && variant.value == 5) {
      shooting(player, "kurokumaft:hono_tiger", 0, 2, void 0);
    }
  }
};

// scripts/item/weapon/nichirintou/NichirintouInosuke.ts
var NichirintouInosuke = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouKaminari.ts
var NichirintouKaminari = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouKanawo.ts
var NichirintouKanawo = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouKaze.ts
var NichirintouKaze = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouKoi.ts
var NichirintouKoi = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouKyouzyuro.ts
import { EntityComponentTypes as EntityComponentTypes5 } from "@minecraft/server";
var NichirintouKyouzyuro = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
    let variant = player.getComponent(EntityComponentTypes5.Variant);
    if (variant && variant.value == 5) {
      shooting(player, "kurokumaft:hono_tiger", 0, 2, void 0);
    }
  }
};

// scripts/item/weapon/nichirintou/NichirintouMituri.ts
var NichirintouMituri = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouMizu.ts
var NichirintouMizu = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouMuitiro.ts
var NichirintouMuitiro = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouMushi.ts
var NichirintouMushi = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouObanai.ts
var NichirintouObanai = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouOto.ts
var NichirintouOto = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouSanemi.ts
var NichirintouSanemi = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouShinobu.ts
var NichirintouShinobu = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouTengen.ts
var NichirintouTengen = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/nichirintou/NichirintouZenitu.ts
var NichirintouZenitu = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

// scripts/item/weapon/kekkizyutu/KekkizyutuBakketu.ts
var KekkizyutuBakketu = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
  }
};

// scripts/item/weapon/kekkizyutu/KekkizyutuHakaisatu.ts
import { EntityComponentTypes as EntityComponentTypes6 } from "@minecraft/server";
var KekkizyutuHakaisatu = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    let variant = player.getComponent(EntityComponentTypes6.Variant);
    if (variant && variant.value == 2) {
      shooting(player, "kurokumaft:kushiki", 0, 6, void 0);
    }
  }
};

// scripts/item/weapon/kekkizyutu/KekkizyutuKoushi.ts
import { EntityComponentTypes as EntityComponentTypes7 } from "@minecraft/server";
var KekkizyutuKoushi = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    let variant = player.getComponent(EntityComponentTypes7.Variant);
    if (variant && variant.value == 3) {
      shooting(player, "kurokumaft:kokushirinten", 0, 6, void 0);
    }
  }
};

// scripts/item/weapon/kekkizyutu/KekkizyutuTigama.ts
import { EntityComponentTypes as EntityComponentTypes8 } from "@minecraft/server";
var KekkizyutuTigama = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    let variant = player.getComponent(EntityComponentTypes8.Variant);
    if (variant && variant.value == 1) {
      shooting(player, "kurokumaft:tobi_tigama", 0, 4, void 0);
    }
  }
};

// scripts/item/weapon/kekkizyutu/KekkizyutuUltrasonic.ts
var KekkizyutuUltrasonic = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
  }
};

// scripts/player/KimetuEquipmentTick.ts
import { EntityComponentTypes as EntityComponentTypes9, EquipmentSlot as EquipmentSlot3, system, world as world3 } from "@minecraft/server";
async function checkPlayerKimetuEquTick() {
  let players = world3.getPlayers();
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    if (!player.isValid()) {
      continue;
    }
    let equ = player.getComponent(EntityComponentTypes9.Equippable);
    let mainHand = equ.getEquipment(EquipmentSlot3.Mainhand);
    if (mainHand != void 0) {
      let object = KokyuObjects.find((ob) => ob.itemName == mainHand.typeId);
      if (object != void 0) {
        if (player.getDynamicProperty("kurokumaft:nichirintou_type") != object.type) {
          player.setDynamicProperty("kurokumaft:nichirintou_type", object.type);
          if (object.kata != void 0) {
            player.setDynamicProperty("kurokumaft:kokyu_kata", object.kata[0]);
            player.runCommand('/titleraw @s actionbar {"rawtext":[{"translate":"' + object.kata_msg + '1.name"}]}');
          }
        }
      } else {
        player.setDynamicProperty("kurokumaft:nichirintou_type", 0);
        player.setDynamicProperty("kurokumaft:kokyu_kata", 0);
      }
    } else {
      if (player.getDynamicProperty("kurokumaft:nichirintou_type") != 0) {
        player.setDynamicProperty("kurokumaft:nichirintou_type", 0);
        player.setDynamicProperty("kurokumaft:kokyu_kata", 0);
      }
    }
  }
  system.run(checkPlayerKimetuEquTick);
}

// scripts/custom/KimetuCustomComponentRegistry.ts
function initRegisterKimetuCustom(initEvent) {
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou", new Nichirintou());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_tanjiro", new NichirintouTanjiro());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_zenitu", new NichirintouZenitu());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_inosuke", new NichirintouInosuke());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_kanawo", new NichirintouKanawo());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_genya", new NichirintouGenya());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_giyu", new NichirintouGiyu());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_shinobu", new NichirintouShinobu());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_kyouzyuro", new NichirintouKyouzyuro());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_tengen", new NichirintouTengen());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_obanai", new NichirintouObanai());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_sanemi", new NichirintouSanemi());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_mituri", new NichirintouMituri());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_muitiro", new NichirintouMuitiro());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_gyoumei", new NichirintouGyoumei());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_mizu", new NichirintouMizu());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_hi", new NichirintouHi());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_kaminari", new NichirintouKaminari());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_hono", new NichirintouHono());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_mushi", new NichirintouMushi());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_hana", new NichirintouHana());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_koi", new NichirintouKoi());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_oto", new NichirintouOto());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:nichirintou_kaze", new NichirintouKaze());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:kekkizyutu_bakketu", new KekkizyutuBakketu());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:kekkizyutu_tigama", new KekkizyutuTigama());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:kekkizyutu_hakaisatu", new KekkizyutuHakaisatu());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:kekkizyutu_koushi", new KekkizyutuKoushi());
  initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:kekkizyutu_ultrasonic", new KekkizyutuUltrasonic());
}
function initStateChangeKimetuMonitor(initEvent) {
  checkPlayerKimetuEquTick();
}

// scripts/common/ItemDurabilityDamage.ts
import { ItemComponentTypes as ItemComponentTypes2, EntityComponentTypes as EntityComponentTypes10 } from "@minecraft/server";

// scripts/common/CommonUtil.ts
import { world as world4, Direction } from "@minecraft/server";
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
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

// scripts/common/ItemDurabilityDamage.ts
async function ItemDurabilityDamage(entity, item, slot) {
  let equ = entity.getComponent(EntityComponentTypes10.Equippable);
  let durability = item.getComponent(ItemComponentTypes2.Durability);
  let dChange = durability.getDamageChance(Math.ceil(getRandomInRange(0, 3)));
  if (durability.damage + dChange >= durability.maxDurability) {
    equ.setEquipment(slot, void 0);
  } else {
    durability.damage = durability.damage + dChange;
    equ.setEquipment(slot, item);
  }
}

// scripts/kimetu_script.ts
world5.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initRegisterKimetuCustom(initEvent);
  initStateChangeKimetuMonitor(initEvent);
});
world5.beforeEvents.playerLeave.subscribe((leaveEvent) => {
  leaveEvent.player.clearDynamicProperties();
});
world5.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
  let entity = event.entity;
  if (entity instanceof Player12) {
    if (event.eventId == "kurokumaft:kokyu_change") {
      let nichirintou = entity.getProperty("kurokumaft:nichirintou_type");
      if (nichirintou != 0) {
        let object = KokyuObjects.find((ob) => ob.type == nichirintou);
        object.change(entity);
      }
    }
  }
});
world5.afterEvents.itemReleaseUse.subscribe((event) => {
  let player = event.source;
  let item = event.itemStack;
  let duration = event.useDuration;
  if (item != void 0) {
    world5.sendMessage("itemReleaseUse");
    if (player.getDynamicProperty("kokyu")) {
      player.setDynamicProperty("kokyu", void 0);
      let nichirintou = player.getProperty("kurokumaft:nichirintou_type");
      if (nichirintou != 0) {
        let object = KokyuObjects.find((ob) => ob.type == nichirintou);
        object.func(item, player);
      }
      player.setProperty("kurokumaft:kokyu_use", false);
      ItemDurabilityDamage(player, item, EquipmentSlot5.Mainhand);
    }
  }
});

//# sourceMappingURL=../debug/kimetu_script.js.map
