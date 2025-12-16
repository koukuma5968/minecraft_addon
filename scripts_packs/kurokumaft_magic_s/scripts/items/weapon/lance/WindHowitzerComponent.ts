import { Entity, EntityDamageCause, EntityQueryOptions, ItemStack, Player, system, world } from "@minecraft/server";
import { MagicWeaponUseComponent } from "../../../custom/MagicWeaponUseComponent";
import { addTeamsTagFilter, getLookRotaionPointsV2 } from "../../../common/MagicCommonUtil";

export class WindHowitzerComponent implements MagicWeaponUseComponent {

  async hitMagicAttack(itemStack: ItemStack, player: Player, target: Entity): Promise<void> {

    player.onScreenDisplay.setActionBar({rawtext:[{translate:"magic.kurokumaft:lance_wind_penetrate.translate"}]});

    player.addTag(player.id);
    const look = getLookRotaionPointsV2(player.getRotation(), 3, 0);
    const filterOption = {
      excludeTags: [
        player.id
      ],
      location: {
        x:player.location.x+look.x,
        y:player.location.y,
        z:player.location.z+look.z
      },
      volume: {
        x:look.x > 0 ? look.x + 2 : look.x - 2,
        y:1,
        z:look.z > 0 ? look.z + 2 : look.z - 2
      }
    } as EntityQueryOptions;
    addTeamsTagFilter(player, filterOption);
    const targets = player.dimension.getEntities(filterOption) as Entity[];

    targets.forEach(en => {
      if (en.isValid) {
        let damage = 4 as number;
        if (en instanceof Player) {
          damage = 2;
        }
        en.applyDamage(damage, {
          cause: EntityDamageCause.fall
        });

        en.dimension.spawnParticle("kurokumaft:wind_particle", en.location);

        const velocity = player.getVelocity();
        let xVel = velocity.x;
        let yVel = velocity.y;
        let zVel = velocity.z;
        if (xVel < 0) {
          xVel = -xVel
        }
        if (yVel < 0) {
          yVel = -yVel
        }
        if (zVel < 0) {
          zVel = -zVel
        }

        en.applyDamage(damage * (xVel + yVel + zVel));
        en.applyKnockback({
          x:velocity.x < 0 ? velocity.x - 1 : velocity.x + 1,
          z:velocity.z < 0 ? velocity.z - 1 : velocity.z + 1
        }, 0);
      }
    });

    player.removeTag(player.id);
  }

  async completeMagicAttack(itemStack: ItemStack, player: Player): Promise<void> {

    player.addTag(player.id);

    player.onScreenDisplay.setActionBar({rawtext:[{translate:"magic.kurokumaft:lance_wind_howitzer.translate"}]});
    const look = getLookRotaionPointsV2(player.getRotation(), 3, 0);
    player.dimension.spawnParticle("kurokumaft:wind_howitzer", 
      {
        x:player.location.x+look.x,
        y:player.location.y+0.5,
        z:player.location.z+look.z
      }
    );

    try {
      player.dimension.createExplosion(
        {
          x:player.location.x+look.x,
          y:player.location.y+0.5,
          z:player.location.z+look.z
        },
        3,
        {
          allowUnderwater: true,
          breaksBlocks: false,
          causesFire: false,
          source: player
        }
      );
    } catch (error: any) {

    }

    const filterOption = {
      excludeTags: [
        player.id
      ],
      location: {
        x:player.location.x+look.x,
        y:player.location.y,
        z:player.location.z+look.z
      },
      maxDistance: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);
    const targets = player.dimension.getEntities(filterOption) as Entity[];

    targets.forEach(en => {
      if (en.isValid) {
        let damage = 18 as number;
        if (en instanceof Player) {
          damage = 6;
        }
        en.applyDamage(damage, {
          cause: EntityDamageCause.fall
        });
      }
    });

    player.removeTag(player.id);
  }

}
