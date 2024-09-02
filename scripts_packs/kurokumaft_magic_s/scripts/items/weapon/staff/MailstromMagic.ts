import { EntityDamageCause, Player, system } from "@minecraft/server";
import { getLookPoints } from "../../../common/commonUtil";

/**
 * メイルシュトローム
 */
export async function mailstrom(player:Player) {
    player.addTag("mailstrom_self");

    let {xlocation, ylocation, zlocation} = getLookPoints(player.getRotation(), player.location, 15);
    let mailstrom_en = player.dimension.spawnEntity("kurokumaft:mailstrom", 
        {
            x:xlocation!,
            y:player.location.y + 0.5,
            z:zlocation!
        }
    );
    let mailLo = mailstrom_en.location;
    let intervalNum = system.runInterval(() => {
        mailstrom_en.runCommand("/particle kurokumaft:mailstrom1_particle ~~~");
        mailstrom_en.runCommand("/particle kurokumaft:mailstrom1_particle ~~0.5~");
        mailstrom_en.runCommand("/particle kurokumaft:mailstrom2_particle ~~1~");
        mailstrom_en.runCommand("/particle kurokumaft:mailstrom2_particle ~~1.5~");
        mailstrom_en.runCommand("/particle kurokumaft:mailstrom3_particle ~~2~");
        mailstrom_en.runCommand("/particle kurokumaft:mailstrom3_particle ~~2.5~");
        mailstrom_en.runCommand("/particle kurokumaft:mailstrom4_particle ~~3~");
        mailstrom_en.runCommand("/particle kurokumaft:mailstrom4_particle ~~3.5~");
        mailstrom_en.runCommand("/particle kurokumaft:mailstrom5_particle ~~4~");
        mailstrom_en.runCommand("/particle kurokumaft:mailstrom5_particle ~~4.5~");
        mailstrom_en.runCommand("/particle kurokumaft:mailstrom6_particle ~~5~");
        mailstrom_en.runCommand("/particle kurokumaft:mailstrom6_particle ~~5.5~");
        let targets = mailstrom_en.dimension.getEntities({
            excludeTags: [
                "mailstrom_self"
            ],
            excludeFamilies: [
                "inanimate", "player", "familiar"
            ],
            excludeTypes: [
                "item"
            ],
            location: mailLo,
            maxDistance: 10
        });
        targets.forEach(en => {
            en.teleport(mailLo);
            en.applyDamage(5, {
                cause: EntityDamageCause.drowning
            });
        })
    }, 10);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("mailstrom_self");
        mailstrom_en.remove();
    }, 100);
}