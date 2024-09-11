// scripts/kimetu_script.ts
import { world as world3, EquipmentSlot as EquipmentSlot4 } from "@minecraft/server";

// scripts/item/weapon/nichirintou/Nichirintou.ts
import { ItemStack, world, EntityComponentTypes, EquipmentSlot, ItemComponentTypes } from "@minecraft/server";
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
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("nichirintou_change", true);
    world.sendMessage("change_start");
  }
};
async function probabilisticChoice(itemStack, player) {
  world.sendMessage("change");
  let nichirintou = nichirintouLists.pick();
  let enchant = itemStack.getComponent(ItemComponentTypes.Enchantable);
  let changeItem = new ItemStack(nichirintou);
  let newEnchant = changeItem.getComponent(ItemComponentTypes.Enchantable);
  newEnchant.addEnchantments(enchant.getEnchantments());
  let equ = player.getComponent(EntityComponentTypes.Equippable);
  equ.setEquipment(EquipmentSlot.Mainhand, changeItem);
  player.setDynamicProperty("nichirintou_change", false);
}

// scripts/item/weapon/nichirintou/NichirintouTanjiro.ts
var NichirintouTanjiro = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
  }
};

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
import { EntityComponentTypes as EntityComponentTypes3 } from "@minecraft/server";

// scripts/common/commonUtil.ts
import { world as world2, system, EntityComponentTypes as EntityComponentTypes2, ItemComponentTypes as ItemComponentTypes2, Direction } from "@minecraft/server";
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

// scripts/item/weapon/nichirintou/NichirintouHono.ts
var NichirintouHono = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
    let variant = player.getComponent(EntityComponentTypes3.Variant);
    if (variant && variant.value == 5) {
      let xran = parseFloat(getRandomInRange(-0.3, 0.3).toFixed(3));
      let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
      shooting(player, "kurokumaft:hono_tiger", { x: xran, y: yran, z: 0 }, 2, void 0);
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
import { EntityComponentTypes as EntityComponentTypes4 } from "@minecraft/server";
var NichirintouKyouzyuro = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    player.setDynamicProperty("kokyu", true);
    let variant = player.getComponent(EntityComponentTypes4.Variant);
    if (variant && variant.value == 5) {
      let xran = parseFloat(getRandomInRange(-0.3, 0.3).toFixed(3));
      let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
      shooting(player, "kurokumaft:hono_tiger", { x: xran, y: yran, z: 0 }, 2, void 0);
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
import { EntityComponentTypes as EntityComponentTypes5 } from "@minecraft/server";
var KekkizyutuHakaisatu = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    let variant = player.getComponent(EntityComponentTypes5.Variant);
    if (variant && variant.value == 2) {
      shooting(player, "kurokumaft:kushiki", { x: 0, y: 0, z: 0 }, 6, void 0);
    }
  }
};

// scripts/item/weapon/kekkizyutu/KekkizyutuKoushi.ts
import { EntityComponentTypes as EntityComponentTypes6 } from "@minecraft/server";
var KekkizyutuKoushi = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    let variant = player.getComponent(EntityComponentTypes6.Variant);
    if (variant && variant.value == 3) {
      shooting(player, "kurokumaft:kokushirinten", { x: 0, y: 0, z: 0 }, 6, void 0);
    }
  }
};

// scripts/item/weapon/kekkizyutu/KekkizyutuTigama.ts
import { EntityComponentTypes as EntityComponentTypes7 } from "@minecraft/server";
var KekkizyutuTigama = class {
  // 右クリック
  onUse(event) {
    let itemStack = event.itemStack;
    let player = event.source;
    let variant = player.getComponent(EntityComponentTypes7.Variant);
    if (variant && variant.value == 1) {
      shooting(player, "kurokumaft:tobi_tigama", { x: 0, y: 0, z: 0 }, 4, void 0);
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

// scripts/custom/CustomComponentRegistry.ts
function initRegisterCustom(initEvent) {
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

// scripts/common/ItemDurabilityDamage.ts
import { ItemComponentTypes as ItemComponentTypes3, EntityComponentTypes as EntityComponentTypes8 } from "@minecraft/server";
async function ItemDurabilityDamage(entity, item, slot) {
  let equ = entity.getComponent(EntityComponentTypes8.Equippable);
  let durability = item.getComponent(ItemComponentTypes3.Durability);
  let dChange = durability.getDamageChance(Math.ceil(getRandomInRange(0, 3)));
  if (durability.damage + dChange >= durability.maxDurability) {
    equ.setEquipment(slot, void 0);
  } else {
    durability.damage = durability.damage + dChange;
    equ.setEquipment(slot, item);
  }
}

// scripts/kimetu_script.ts
world3.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initRegisterCustom(initEvent);
});
world3.beforeEvents.playerLeave.subscribe((leaveEvent) => {
  leaveEvent.player.clearDynamicProperties();
});
world3.afterEvents.itemReleaseUse.subscribe((event) => {
  let player = event.source;
  let item = event.itemStack;
  let duration = event.useDuration;
  if (item != void 0) {
    if (player.getDynamicProperty("nichirintou_change")) {
      probabilisticChoice(item, player);
    }
    if (player.getDynamicProperty("kokyu")) {
      player.setDynamicProperty("kokyu", void 0);
      ItemDurabilityDamage(player, item, EquipmentSlot4.Mainhand);
    }
  }
});

//# sourceMappingURL=../debug/kimetu_script.js.map
