import { world } from "@minecraft/server";

world.events.itemUseOn.subscribe(event => {
    if (hitEntity.typeId === "minecraft:armor_stand") {
        print(event.source, event.item.typeId);
    }
});

world.events.entityHit.subscribe(event => {
    if (!(event.hitEntity === undefined)) {
        let hitEntity = event.hitEntity;
        if (hitEntity.typeId === "minecraft:armor_stand") {
            let objs = world.scoreboard.getObjectives();
            let entity = event.entity;
            var comps = entity.getComponents();
            for (var i=0; i<comps.length; i++) {
                print(entity, comps[i].typeId);
            }
            var x = false; 
            var y = false; 
            var z = false; 
            for (var i=0; i<objs.length; i++) {
                print(entity, objs[i].id);
                if (objs[i].id === "home_x") {
                    var x = true; 
                }
                if (objs[i].id === "home_y") {
                    var y = true; 
                }
                if (objs[i].id === "home_z") {
                    var z = true; 
                }
            };
            var command = "";
            if (!x) {
                command = "scoreboard objectives add home_x dummy";
                entity.runCommand(command);
            }
            if (!y) {
                command = "scoreboard objectives add home_y dummy";
                entity.runCommand(command);
            }
            if (!z) {
                command = "scoreboard objectives add home_z dummy";
                entity.runCommand(command);
            }
            command = "scoreboard players add ";

        }
    } else if (!(event.hitBlock === undefined)) {
        let block = event.hitBlock;
        print(event.entity, block.typeId);
    }

});

// world.events.itemStopCharge.subscribe(event => {
//     let item = event.itemStack;
//     print(event.source, item.typeId);
//     home_tp(event.source);
// });

world.events.entityHurt.subscribe(event => {
    let entity = event.hurtEntity;
    print(entity, event.damage);

});

function shield_guard(entity) {
    let text = "replaceitem entity @s slot.weapon.offhand 0 destroy kuroumaft:fire_magic_shield 1 \"${query.max_durability - query.remaining_durability - 10}\""
    entity.runCommand(text);
}
// world.events.projectileHit.subscribe(event => {
//     var source = event.source;
//     print(source, source.id);
// });

// world.events.entityHurt.subscribe(event => {
//     let damage = event.damage;
//     print(event.hurtEntity, damage);
// });

// world.events.tick.subscribe(event => {
//     var players = world.getPlayers();
//     for(var player of players) {
//         var target = player.target;
//         print(player, target);
//         if (!(target === undefined)) {
//             print(player, target.id);
//         }
//     }
// });

function print(entity, value) {
    let text = "say \"" + value + "\""
    entity.runCommand(text);
};

function home_tp(entity) {
    let text = "tp @s " + home_base
    entity.runCommand(text);
};
