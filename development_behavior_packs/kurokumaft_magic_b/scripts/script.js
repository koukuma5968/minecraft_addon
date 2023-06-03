import { world } from "@minecraft/server";
import { ItemStack } from "@minecraft/server";

// world.events.itemUseOn.subscribe(event => {
//     var p = event.source;
//     var i = event.item;
//     var b = event.blockLocation;
//     print(p, "itemUseOn");
//     print(p, i.typeId);
//     if (i.typeId === "kurokumaft:home_gate") {
//         print(p, b.x);
//         print(p, b.y);
//         print(p, b.z);
//         setHomeScoreObj(p);
//         setHomeScorePlayer(p, b.x, b.y, b.z);
//     }
// });

world.events.entitySpawn.subscribe(event => {
    var en = event.entity;
    // home_gateのイベント
    if (en.typeId === "kurokumaft:home_gate") {
        var lo = en.location;
        setHomeScoreObj(en);
        setHomeScorePlayer(en, lo.x, lo.y, lo.z);

    }

});

function setHomeScoreObj(entity) {
    let objs = world.scoreboard.getObjectives();
    var x = false;
    var y = false;
    var z = false;
    for (var i=0; i<objs.length; i++) {
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
        command = "scoreboard objectives add home_x dummy home_base_x";
        entity.runCommandAsync(command);
    }
    if (!y) {
        command = "scoreboard objectives add home_y dummy home_base_y";
        entity.runCommandAsync(command);
    }
    if (!z) {
        command = "scoreboard objectives add home_z dummy home_base_z";
        entity.runCommandAsync(command);
    }
};
function setHomeScorePlayer(entity,x,y,z) {
    var command = "";
    command = "scoreboard players set @s home_x "+ Math.floor(x);
    entity.runCommandAsync(command);
    command = "scoreboard players set @s home_y "+ Math.floor(y);
    entity.runCommandAsync(command);
    command = "scoreboard players set @s home_z "+ Math.floor(z);
    entity.runCommandAsync(command);
};

world.events.itemStopCharge.subscribe(event => {
    var en = event.source;
    var item = event.itemStack;
    if (item.typeId === "kurokumaft:repatriation_fruit") {
        if (event.useDuration === 0) {
            let objs = world.scoreboard.getObjectives();
            var x_f = false;
            var y_f = false;
            var z_f = false;
            var x = 0;
            var y = 0;
            var z = 0;
       
            for (var i=0; i<objs.length; i++) {
                if (objs[i].id === "home_x") {
                    let score = objs[i].getScores();
                    for (var j=0; j<score.length; j++) {
                        x_f = true;
                        x = score[j].score;
                    }
                } else if (objs[i].id === "home_y") {
                    let score = objs[i].getScores();
                    for (var j=0; j<score.length; j++) {
                        y_f = true;
                        y = score[j].score;
                    }
                } else if (objs[i].id === "home_z") {
                    let score = objs[i].getScores();
                    for (var j=0; j<score.length; j++) {
                        z_f = true;
                        z = score[j].score;
                    }
                }
            }

            if (x_f && y_f && z_f)  {
                home_tp(en, x + " " + y + " " + z)
            }
        }
    }
});

// world.events.itemStopCharge.subscribe(event => {
//     let item = event.itemStack;
//     print(event.source, item.typeId);
//     home_tp(event.source);
// });

world.events.entityHit.subscribe(event => {
    var entity = event.hitEntity;
    shield_guard(entity);
});

world.events.projectileHit.subscribe(event => {
    var hit = event.entityHit;
    if (hit != undefined) {
        shield_guard(hit.entity);
    }
});

const overworld = world.getDimension("overworld");
function shield_guard(entity) {
    if (entity != undefined) {

        var players = world.getPlayers();

        for (var player of players) {

        }
        var tags = entity.getTags();
        for (var i=0; i<tags.length; i++) {
            if (entity.hasTag("main_shield_guard")) {
                if (tags[i].indexOf("shield_main") != -1) {
                    var shield = tags[i].slice(0, tags[i].length -5);
                    var itemStack = new ItemStack("kurokumaft:" + shield);
                    var durability = itemStack.getComponent("minecraft:durability");
                    var damage = durability.damage;
                    var maxDurability = durability.maxDurability;
                    let text = "replaceitem entity @s slot.weapon.mainhand 0 destroy kurokumaft:" + shield + " 1 " + maxDurability - damage + 5;
                    entity.runCommandAsync(text);
                }
            }
            if (entity.hasTag("off_shield_guard")) {
                if (tags[i].indexOf("shield_off") != -1) {
                    var shield = tags[i].slice(0, tags[i].length -4);
                    var itemStack = new ItemStack("kurokumaft:" + shield);
                    var durability = itemStack.getComponent("minecraft:durability");
                    var damage = durability.damage;
                    var maxDurability = durability.maxDurability;
                    let text = "replaceitem entity @s slot.weapon.offhand 0 destroy kurokumaft:" + shield + " 1 " + maxDurability - damage + 5;
                    entity.runCommandAsync(text);
                }
            }
        }



    }
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
    entity.runCommandAsync(text);
};

function home_tp(entity, point) {
    let text = "tp @p[r=5,family=!monster] " + point
    entity.runCommandAsync(text);
};
