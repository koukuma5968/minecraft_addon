import { world,system } from "@minecraft/server";

const ProbabilisticChoice = (list) => {
    const totalWeight = list.reduce((p, c) => {
      return { weight: p.weight + c.weight }
    }).weight
    
    return {
      pick () {
        const r = Math.random() * totalWeight;
        let s = 0.0;
        for (const l of list) {
          s += l.weight
          if (r < s) { return l.item }
        }
      }
    }
};

const nichirintouLists = ProbabilisticChoice([
    { item: 'kurokumaft:nichirintou_mizu' , weight: 50 },
    { item: 'kurokumaft:nichirintou_hono' , weight: 30 },
    { item: 'kurokumaft:nichirintou_kaze' , weight: 20 },
    { item: 'kurokumaft:nichirintou_hana' , weight: 20 },
    { item: 'kurokumaft:nichirintou_kaminari' , weight: 15 },
    { item: 'kurokumaft:nichirintou_koi' , weight: 5 },
    { item: 'kurokumaft:nichirintou_mushi' , weight: 5 },
    { item: 'kurokumaft:nichirintou_oto' , weight: 5 },
    { item: 'kurokumaft:nichirintou_hi' , weight: 1 },
   ]);

// チャージ完了
world.afterEvents.itemCompleteUse.subscribe(event => {
    var player = event.source;
    var item = event.itemStack;
    if (item != undefined) {
        // 日輪刀色変わり
        if (item.typeId == "kurokumaft:nichirintou") {
            let nichirintou = nichirintouLists.pick();
            let commandText =  "replaceitem entity @s slot.weapon.mainhand 0 " + nichirintou;
            player.runCommandAsync(commandText);
        }
    }
});
// デバッグ用
function print(text) {
    world.sendMessage(text);
};

