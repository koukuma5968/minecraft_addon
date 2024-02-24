import { world } from "@minecraft/server";
//import { ActionFormData,ModalFormData } from "@minecraft/server-ui";

const logs = ["minecraft:acacia_log","minecraft:birch_log","minecraft:cherry_log","minecraft:dark_oak_log","minecraft:jungle_log","minecraft:mangrove_log","minecraft:oak_log","minecraft:spruce_log","minecraft:stripped_acacia_log","minecraft:stripped_birch_log","minecraft:stripped_cherry_log","minecraft:stripped_dark_oak_log","minecraft:stripped_jungle_log","minecraft:stripped_mangrove_log","minecraft:stripped_oak_log","minecraft:stripped_spruce_log"];
const woods = ["minecraft:cherry_wood","minecraft:double_wooden_slab","minecraft:mangrove_wood","minecraft:stripped_cherry_wood","minecraft:stripped_mangrove_wood","minecraft:wood"];
const silkType = ["kurokumaft:charcoal_block","kurokumaft:small_mithril_bud","kurokumaft:medium_mithril_bud","kurokumaft:large_mithril_bud"
                , "kurokumaft:mithril_cluster","kurokumaft:budding_mithril","kurokumaft:medicinal_plants", "kurokumaft:onions","kurokumaft:soybeans"]
// var players = new Array();

// world.afterEvents.entityDie.subscribe(event => {
//     let entity = event.deadEntity;
//     print(entity, entity.typeId);
    // if (entity.typeId == "minecraft:player") {
    //     modalForm.show(entity).then((formData) => {
    //         players[0].sendMessage(`Modal form results: ${JSON.stringify(formData.formValues, undefined, 2)}`);
    //     });
        
    //     form.show(entity).then((response) => {
    //         if (response.selection === 3) {
    //             dimension.runCommand("say I like April too!");
    //         }
    //     });
    // }
// });

// const modalForm = new ModalFormData().title("Example Modal Controls for §o§7ModalFormData§r");

// modalForm.toggle("Toggle w/o default");
// modalForm.toggle("Toggle w/ default", true);

// modalForm.slider("Slider w/o default", 0, 50, 5);
// modalForm.slider("Slider w/ default", 0, 50, 5, 30);

// modalForm.dropdown("Dropdown w/o default", ["option 1", "option 2", "option 3"]);
// modalForm.dropdown("Dropdown w/ default", ["option 1", "option 2", "option 3"], 2);

// modalForm.textField("Input w/o default", "type text here");
// modalForm.textField("Input w/ default", "type text here", "this is default");

// world.afterEvents.entitySpawn.subscribe(event => {
//     let entity = event.entity;
//     print(entity, entity.typeId);
// });

world.beforeEvents.playerBreakBlock.subscribe(event => {
    var player = event.player;
    var item = event.itemStack;
    var block = event.block;
    // print(player, player.name);
    // print(player, item.typeId);
    // print(player, block.typeId);
    if (item != undefined) {
        if (item.typeId == "kurokumaft:fire_brand") {
            if (logs.indexOf(block.typeId) != -1 || woods.indexOf(block.typeId) != -1) {
                event.cancel = true;
                let commandText =  "particle kurokumaft:mobflame_firing " + block.x + " " + (block.y + 0.5) + " " + block.z;
                player.runCommandAsync(commandText);
                commandText =  "execute as @s run setblock " + block.x + " " + block.y + " " + block.z + " kurokumaft:charcoal_block replace";
                player.runCommandAsync(commandText);
            }
        }
    }
    // var enc = item.getComponent("minecraft:enchantable");
    // print(player, JSON.stringify(enc));
    // var comps = item.getComponents();
    // for (var i=0;i<comps.length;i++) {
    //     print(player, comps[i]);
    //     print(player, JSON.stringify(comps[i]));
    // }
    if (silkType.indexOf(block.typeId) != -1) {
        event.cancel = true;
        let commandText =  "execute as @s run setblock " + block.x + " " + block.y + " " + block.z + " air destroy";
        player.runCommandAsync(commandText);
    }
});

function print(entity, value) {
    let text = "say \"" + value + "\""
    entity.runCommandAsync(text);
};

// world.afterEvents.itemDefinitionEvent.subscribe(event => {
//     var player = event.source;
//     var item = event.itemStack;
//     print(player,item.typeId);
// });


// const form = new ActionFormData()
// .title("Months")
// .body("Choose your favorite month!")
// .button("January")
// .button("February")
// .button("March")
// .button("April")
// .button("May");

