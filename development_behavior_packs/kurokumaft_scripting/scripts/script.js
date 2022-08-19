import { world } from "mojang-minecraft";

world.events.entityHit.subscribe(event => {
    let entity = event.hitEntity;
    var players = world.getPlayers();
    for(var player of players) {
        if (!(entity === undefined) && player.nameTag == entity.nameTag) {
            var tags = player.getTags();
            for(var tag of tags) {
                if (tag == "shield_guard") {
                    print(entity, entity.nameTag);
                }
            }
        }
    }
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
