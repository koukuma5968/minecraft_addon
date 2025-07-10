import { Entity, EntityComponentTypes, EntityDamageCause, EntityProjectileComponent, EntityQueryOptions, Player, system, TicksPerSecond, Vector3, world } from "@minecraft/server";
import { BossActionInterface, BossMoveMoverInterface } from "./mover/BossActionInterface";
import { getDistanceLocation, getLookLocationDistance, getRandomInRange } from "../../common/MagicCommonUtil";
import { BossEllipticalMover } from "./mover/BossEllipticalMover";

export class PhoenixActionCompornent implements BossActionInterface {

    entity: Entity;
    center: Vector3;
    mover: BossMoveMoverInterface;
    attackCount: number;
    moveCount: number;

    constructor(entity: Entity) {
        this.entity = entity;
        this.center = entity.location;
        this.mover = new BossEllipticalMover(this.center, 25, 35,  Math.PI / 3);
        this.entity.addTag(this.entity.id);
        this.attackCount = 0;
        this.moveCount = 0;
    }

    startMoniter(): void {
        world.sendMessage("移動");
        this.startMoveing();
    }

    startMoveing(): void {

        try {

            const hitBlock = this.entity.dimension.getBlockFromRay(this.entity.location, {x:0,y:-1,z:0});
            let brokHi = this.entity.location.y;
            if (hitBlock !== undefined) {
                brokHi = hitBlock.block.location.y + 10;
            }
            if (this.entity !== undefined && this.entity.isValid()) {
                if (this.moveCount === 60) {
                    this.moveCount = 0;
                    world.sendMessage("中心移動");
                    world.sendMessage(JSON.stringify(this.entity.location));
                    this.mover.setPotion(this.entity.location);

                    while (true) {
                        const center = this.mover.moveCenter(0.1);

                        this.entity.teleport(this.entity.location, {
                            checkForBlocks: true,
                            facingLocation: center
                        });
                        this.entity.teleport(center, {
                            checkForBlocks: true
                        });
                        if (this.mover.isComplete()) {
                            world.sendMessage("中心移動終わり");
                            break;
                        }
                    }

                    this.startMoveing();
                } else {
                    this.moveCount = this.moveCount + getRandomInRange(1, 5);
                    const pos = this.mover.updatePosition(0.1);
                    this.entity.teleport(this.entity.location, {
                        checkForBlocks: true,
                        facingLocation: pos
                    });
                    this.entity.teleport({x:pos.x, y:brokHi, z:pos.z}, {
                        checkForBlocks: true
                    });
                    if (this.attackCount === 30) {
                        this.attackSkiil();
                        this.attackCount = 0;
                    }
                    system.waitTicks(3).then(() => {
                        this.attackCount = this.attackCount + 1;
                        this.startMoveing();
                    });
                }
            }
        } catch (error) {
            throw error;
        } finally {
        }
    }

    attackSkiil(): void {

        switch (getRandomInRange(1, 3)) {
            case 1:
                this.flameStream();
                break;
            case 2:
                this.fireBlast();
                break;
            case 3:
                this.blazeWear();
                
                break;
        }
    }

    private flameStream() {

        try {
            world.sendMessage("火焔放射");
            const num = system.runInterval(() => {
                try {
                    const filterOption1 = {
                        location: this.entity.location,
                        maxDistance: 32,
                        excludeTags: [this.entity.id]
                    } as EntityQueryOptions;

                    const targets1 = this.entity.dimension.getEntities(filterOption1);
                    targets1.forEach(en => {
                        if (en instanceof Player) {
                            en.applyDamage(1, {
                                cause: EntityDamageCause.fire
                            });
                        } else {
                            en.applyDamage(3, {
                                cause: EntityDamageCause.fire
                            });
                        }
                        en.dimension.spawnParticle("kurokumaft:phoenix_wall_particle",en.location);
                    });

                } catch (error) {
                    system.clearRun(num);
                }
            }, 5);

            system.waitTicks(3*TicksPerSecond).then(() => {
                system.clearRun(num);
            });
        } catch (error) {
            throw error
        }

   }

    private fireBlast() {
        world.sendMessage("火球乱射");

        const num = system.runInterval(() => {

            try {
                const filterOption2 = {
                    location: this.entity.location,
                    maxDistance: 32,
                    excludeTags: [this.entity.id],
                    closest: 1
                } as EntityQueryOptions;

                const targets2 = this.entity.dimension.getEntities(filterOption2);
                targets2.forEach(en => {
                    this.entity.teleport(this.entity.location, {
                        checkForBlocks: true,
                        facingLocation: en.location
                    });

                    const bulet = this.entity.dimension.spawnEntity("kurokumaft:fireballmagic", this.entity.getHeadLocation());
                    const projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
                    projectile.owner = this.entity;
                    projectile.shoot({
                        x:this.entity.getViewDirection().x,
                        y:this.entity.getViewDirection().y,
                        z:this.entity.getViewDirection().z
                    },{
                        uncertainty: getRandomInRange(0, 2)
                    });
                
                });
            } catch (error) {
                system.clearRun(num);
                throw error
            }
    }, 5);

        system.waitTicks(3*TicksPerSecond).then(() => {
            system.clearRun(num);
        });

    }

    private blazeWear() {

        world.sendMessage("火焔纏");
        const filterOption3 = {
            location: this.entity.location,
            maxDistance: 32,
            excludeTags: [this.entity.id],
            closest: 1
        } as EntityQueryOptions;

        const targets3 = this.entity.dimension.getEntities(filterOption3);
        if (targets3.length < 1) {
            return;
        }

        const num = system.runInterval(() => {
            try {
                if (targets3[0] !== undefined && this.entity.isValid()) {
                    const loc = this.entity.location;
                    this.entity.teleport({x:loc.x,y:targets3[0].location.y,z:loc.z}, {
                        checkForBlocks: true,
                        facingLocation: targets3[0].location
                    });
                }
            } catch (error) {
                system.clearRun(num);
                throw error
            }
        }, 5);

        system.waitTicks(3*TicksPerSecond).then(() => {
            system.clearRun(num);
            try {
                const move = system.runInterval(() => {
                    const distance = getLookLocationDistance(this.entity.getRotation().y, 1, 0, 0);
                    this.entity.teleport(getDistanceLocation(this.entity.location, distance), {
                        checkForBlocks: true
                    });
                }, 5);
                system.runTimeout(() => {
                    system.clearRun(move);
                }, 15);
            } catch (error) {
                system.clearRun(num);
                throw error
            }
        });

    }
}