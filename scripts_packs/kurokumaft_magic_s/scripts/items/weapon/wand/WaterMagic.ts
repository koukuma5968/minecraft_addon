import { Entity, EntityComponentTypes, EntityDamageCause, EntityProjectileComponent, EntityQueryOptions, EntityRideableComponent, EntityTameMountComponent, Player, system, TicksPerSecond } from "@minecraft/server";
import { addTeamsTagFilter, getLookRotaionPointsV2, getRandomInRange } from "../../../common/MagicCommonUtil";
import { MagicCircularFollower } from "../../../common/MagicCircularFollower";

/**
 * スプラッシュ
 */
export async function splash(player:Player, hitEntity:Entity) {

    player.addTag(player.id);

    hitEntity.dimension.spawnParticle("kurokumaft:water_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        let damage = 2 as number;
        if (en instanceof Player) {
            damage = 1;
        }
        en.applyDamage(damage, {
            cause: EntityDamageCause.drowning
        });
    });

    player.removeTag(player.id);
}

/**
 * ウォーターウォール
 */
export async function waterwall(player:Player) {

    const look = getLookRotaionPointsV2(player.getRotation(), 4, 0);
    player.dimension.setBlockType({x:player.location.x+look.x, y:player.location.y, z:player.location.z+look.z}, "kurokumaft:waterwall_block");
    player.dimension.setBlockType({x:player.location.x+look.x, y:player.location.y+1, z:player.location.z+look.z}, "kurokumaft:waterwall_block");

}

/**
 * ウォーターボール
 */
export function waterball(entity:Entity) {

    if (entity.location.y > -64) {
        entity.dimension.spawnParticle("kurokumaft:water_particle", entity.location);
    }

}

/**
 * リプルラッシュ
 */
export async function ripplerush(player:Player, hitEntity:Entity) {

    player.addTag(player.id);

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);

    for (let i=0; i <= 5; i++) {
        if (hitEntity.isValid) {
            hitEntity.dimension.spawnParticle("kurokumaft:water_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

            targets.forEach(en => {
                let damage = 2 as number;
                if (en instanceof Player) {
                    damage = 1;
                }
                en.applyDamage(damage, {
                    cause: EntityDamageCause.drowning
                });
            });
            await system.waitTicks(4);
        }
    }

    player.removeTag(player.id);
}

/**
 * ウォーターブラスト
 */
export async function waterburst(entity:Entity, projectileName:string) {

    if (entity.location.y > -64) {
        for (let i=0; i <= 10; i++) {
            const look = getLookRotaionPointsV2(entity.getRotation(), 0.5, getRandomInRange(-2, 2));
            const bulet = entity.dimension.spawnEntity(projectileName,
                {
                    x:entity.getHeadLocation().x+look.x,
                    y:entity.getHeadLocation().y+getRandomInRange(-0.5, 1),
                    z:entity.getHeadLocation().z+look.z
                }
            );

            const projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
            projectile.owner = entity;
            projectile.shoot(entity.getViewDirection());
            await system.waitTicks(2);
        }
    }

}

/**
 * ウォーターバリア
 */
export async function waterbarrier(player:Player) {

    const ride = player.getComponent(EntityComponentTypes.Rideable) as EntityRideableComponent;
    const riders = ride.getRiders();
    let taimeb = false;
    for (const index in riders) {
        if (riders[index].typeId === "kurokumaft:barrier") {
            taimeb = true;
        }
    }
    if (!taimeb) {
        const barrier = player.dimension.spawnEntity("kurokumaft:barrier", player.location);
        const tame = barrier.getComponent(EntityComponentTypes.TameMount) as EntityTameMountComponent;
        tame.tameToPlayer(true, player);
        ride.addRider(barrier);
        const now = system.currentTick;
        let last = system.currentTick;

        // follower インスタンス（キャラの周りを回るオブジェクト）
        const follower = new MagicCircularFollower(2, Math.PI/1, -1, 0); // 半径4、90deg/s、y+1

        do {
            const nowMs = system.currentTick;
            const deltaSec = (nowMs - last) / TicksPerSecond;
            last = nowMs;

            const pos = follower.update(barrier.location, deltaSec);

            barrier.dimension.spawnParticle("kurokumaft:water_barrier_particle", pos);
            barrier.dimension.getEntities({
                location: barrier.location,
                maxDistance: 5
            }).forEach(en => {
                const projectile = en.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent; 
                if (projectile !== undefined) {
                    en.dimension.spawnParticle("kurokumaft:barrier_water", en.location);
                    en.remove();
                }
            });
            await system.waitTicks(2);
            if (now + TicksPerSecond * 20 <= system.currentTick) {
                if (barrier.isValid) {
                    barrier.remove();
                }
            }
        } while(barrier.isValid);

    }

}
