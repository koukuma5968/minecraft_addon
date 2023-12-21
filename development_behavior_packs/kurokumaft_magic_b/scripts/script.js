import { world,ItemStack } from "@minecraft/server";

let black_hole_locate_x;
let black_hole_locate_y;
let black_hole_locate_z;

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

// world.afterEvents.entitySpawn.subscribe(event => {
//     var en = event.entity;
//     print(en, "entitySpawn");
//     // home_gateのイベント
//     if (en.typeId === "kurokumaft:black_hole") {
//         print(en, en.id);
//         var lo = en.location;
//         var blackHoleTp = new BlackHoleTp(en.id, lo);

//         var command = "tag @e[tag=black_hole_target] add black_hole_time" + en.id;
//         en.runCommandAsync(command);

//         var command = "scoreboard objectives add black_hole_time dummy black_hole_time";
//         en.runCommandAsync(command);
//         var command = "scoreboard players set @s black_hole_time 1";
//         en.runCommandAsync(command);

//         var command = "scoreboard objectives add black_hole_locate_x" + en.id + " dummy black_hole_locate_x";
//         en.runCommandAsync(command);
//         var command = "scoreboard players set @e[tag=black_hole_target] black_hole_locate_x" + en.id + " " + Math.ceil(lo.x);
//         en.runCommandAsync(command);

//         var command = "scoreboard objectives add black_hole_locate_y" + en.id + " dummy black_hole_locate_y";
//         en.runCommandAsync(command);
//         var command = "scoreboard players set @e[tag=black_hole_target] black_hole_locate_y" + en.id + " " + Math.ceil(lo.y);
//         en.runCommandAsync(command);

//         var command = "scoreboard objectives add black_hole_locate_z" + en.id + " dummy black_hole_locate_z";
//         en.runCommandAsync(command);
//         var command = "scoreboard players set @e[tag=black_hole_target] black_hole_locate_z" + en.id + " " + Math.ceil(lo.z);
//         en.runCommandAsync(command);
//     }
// });

// world.afterEvents.entityDie.subscribe(event => {
//     var en = event.deadEntity;
//     print(en, "entityDie");
//     if (en.typeId === "kurokumaft:black_hole") {
//         var command = "scoreboard players reset @s black_hole_time" + en.id;
//         en.runCommandAsync(command);
//         var command = "scoreboard players reset @e[tag=black_hole_target] black_hole_locate_x"
//         en.runCommandAsync(command);
//         var command = "scoreboard players reset @e[tag=black_hole_target] black_hole_locate_y";
//         en.runCommandAsync(command);
//         var command = "scoreboard players reset @e[tag=black_hole_target] black_hole_locate_z";
//         en.runCommandAsync(command);


//         var command = "scoreboard objectives remove black_hole_time" + en.id;
//         en.runCommandAsync(command);
//         var command = "scoreboard objectives remove black_hole_locate_x" + en.id;
//         en.runCommandAsync(command);
//         var command = "scoreboard objectives remove black_hole_locate_y" + en.id;
//         en.runCommandAsync(command);
//         var command = "scoreboard objectives remove black_hole_locate_z" + en.id;
//         en.runCommandAsync(command);

//         var command = "tag @e[tag=black_hole_target] remove black_hole_time" + en.id;
//         en.runCommandAsync(command);
//     }
// });

// world.afterEvents.entityHurt.subscribe(event => {
//     var en = event.hurtEntity;
//     var tags = en.getTags();
//     for (var i=0; i<tags.length; i++) {
//         print(en, tags[i]);
//         if (tags[i] == "black_hole_target") {
//             print(en, en.typeId);
//             var lo = en.location;
//             black_hole_tp(en, lo);
//         }
//     }
// });

world.afterEvents.entityHitEntity.subscribe(event => {
    let entity = event.damagingEntity;
    if (entity.hasTag("home_gate")) {
        setHomeScoreObj(entity);
        setHomeScorePlayer(entity);
        print(entity, "拠点を設定");
        var command = "tag @s remove home_gate";
        entity.runCommandAsync(command);
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

function setHomeScorePlayer(entity) {
    var lo = entity.location;
    var command = "";
    command = "scoreboard players set @s home_x "+ Math.floor(lo.x);
    entity.runCommandAsync(command);
    command = "scoreboard players set @s home_y "+ Math.floor(lo.y);
    entity.runCommandAsync(command);
    command = "scoreboard players set @s home_z "+ Math.floor(lo.z);
    entity.runCommandAsync(command);
};

world.afterEvents.itemStopUse.subscribe(event => {
    var en = event.source;
    var item = event.itemStack;
    if (item != undefined && item.typeId === "kurokumaft:repatriation_fruit") {
        if (event.useDuration === 0) {
            let home_x = world.scoreboard.getObjective("home_x").getScore(en);
            let home_y = world.scoreboard.getObjective("home_y").getScore(en);
            let home_z = world.scoreboard.getObjective("home_z").getScore(en);
            home_tp(en, home_x + " " + home_y + " " + home_z)
        }
    }
});

// world.events.itemStopCharge.subscribe(event => {
//     let item = event.itemStack;
//     print(event.source, item.typeId);
//     home_tp(event.source);
// });

// world.afterEvents.projectileHitEntity.subscribe(event => {
//     var hit = event.entityHit;
//     if (hit != undefined) {
//         print(hit, hit.typeId);
//         shield_guard(hit.entity);
//     }
// });

// world.afterEvents.itemReleaseUse.subscribe(event => {
//     var en = event.source;
//     var itemStack = event.itemStack;
//     var tags = itemStack.getTags();
//     for (var i=0; i<tags.length; i++) {
//         print(en, tags[i]);
//         if (tags[i] == "fire_magic_bow") {
//             itemStack.triggerEvent("kurokumaft:fire_magic_arrow");
//         }
//     }
// });

function shield_guard(entity) {
    if (entity != undefined) {
        var tags = entity.getTags();
        for (var i=0; i<tags.length; i++) {
//            print(entity, tags[i]);
            if (tags[i] == "main_shield_guard") {
                print(entity, "メインガード");
                var shield = tags[i].slice(0, tags[i].length -5);
                var itemStack = new ItemStack("kurokumaft:" + shield);
                var durability = itemStack.getComponent("minecraft:durability");
                var damage = durability.damage;
                var maxDurability = durability.maxDurability;
                let text = "replaceitem entity @s slot.weapon.mainhand 0 destroy kurokumaft:" + shield + " 1 " + maxDurability - damage + 5;
                entity.runCommandAsync(text);
            }
            if (tags[i] == "off_shield_guard") {
                print(entity, "オフガード");
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
    let text = "tp @e[r=5,family=!monster,family=!home_gate] " + point
    entity.runCommandAsync(text);
};

function black_hole_tp(entity, lo) {
    var locate = lo.x + " " + lo.y + " " + lo.z;
    var x = lo.x;
    var y = lo.y;
    var z = lo.z;
    print(entity, locate);
    var count = 0;
    let text = "gamerule sendcommandfeedback false";
    entity.runCommandAsync(text);
    let objs = world.scoreboard.getObjectives();
    var tags = entity.getTags();
    let black_hole_locate_x = "";
    let black_hole_locate_y = "";
    let black_hole_locate_z = "";
    let oldtime = "";
    A:
    for (var i=0; i<tags.length; i++) {
        print(entity, tags[i]);
        for (var j=0; j<objs.length; j++) {
            print(entity, objs[j]);
            if (tags[i] == objs[j]) {
                let targetid = tags[i].replace("black_hole_time", "");
                oldtime = world.scoreboard.getObjective(tags[i]).getScore(targetid);
                black_hole_locate_x = world.scoreboard.getObjective("black_hole_locate_x"+targetid).getScore(entity);
                black_hole_locate_y = world.scoreboard.getObjective("black_hole_locate_y"+targetid).getScore(entity);
                black_hole_locate_z = world.scoreboard.getObjective("black_hole_locate_z"+targetid).getScore(entity);
                break A;
            }
        }
    }
    // var time = 1;
    // while (oldtime != 0) {
    //     if (oldtime != time) {
    //         oldVariant = variant;
    //         if (black_hole_locate_x != x) {
    //             x = x - 0.1
    //         }
    //         if (black_hole_locate_y != y) {
    //             y = y - 0.1
    //         }
    //         if (black_hole_locate_z != z) {
    //             z = z - 0.1
    //         }
    //         var point = x + " " + y + " " + z;
    //         text = "tp @s " + point
    //         //print(entity, text);
    //         //entity.runCommandAsync(text);
    //         time++;
    //     }
    // }
};
