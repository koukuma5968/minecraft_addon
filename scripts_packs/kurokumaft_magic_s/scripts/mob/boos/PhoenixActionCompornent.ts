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
        this.entity.setProperty("kurokumaft:boss_pattern", 0);
        world.sendMessage("移動");
        this.startMoveing();
    }

    startMoveing(): void {

        try {

            if (this.entity !== undefined && this.entity.isValid()) {
                const hitBlock = this.entity.dimension.getBlockFromRay(this.entity.location, {x:0,y:-1,z:0});
                let brokHi = this.entity.location.y;
                if (hitBlock !== undefined) {
                    brokHi = hitBlock.block.location.y + 10;
                }
                if (this.moveCount >= 300) {
                    this.moveCount = 0;
                    world.sendMessage("中心移動");
                    this.mover.setPotion(this.entity.location);
                    this.mover.setCenterY(brokHi - 9);
                    this.entity.setProperty("kurokumaft:boss_pattern", 1);
                    this.centerMoveing();
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
                    if (this.attackCount >= 60) {
                        if (getRandomInRange(1, 2) === 1) {
                            this.fireBlast(0);
                            system.waitTicks(3).then(() => {
                                this.attackCount = this.attackCount + getRandomInRange(1, 3);
                                this.startMoveing();
                            });
                        } else {
                            this.entity.setProperty("kurokumaft:boss_pattern", 1);
                            this.mover.setPotion(this.entity.location);
                            this.blazeWear(0, brokHi);
                        }
                        this.attackCount = 0;
                    } else {
                        system.waitTicks(3).then(() => {
                            this.attackCount = this.attackCount + getRandomInRange(1, 3);
                            this.startMoveing();
                        });
                    }
                }
            }
        } catch (error: any) {
        } finally {
        }
    }

    centerMoveing(): void {

        try {
            if (this.entity !== undefined && this.entity.isValid()) {
                const center = this.mover.moveCenter(1.5);

                this.entity.teleport(this.entity.location, {
                    checkForBlocks: true,
                    facingLocation: center
                });
                this.entity.teleport(center, {
                    checkForBlocks: true
                });
                if (this.mover.isComplete()) {
                    world.sendMessage("中心移動終わり");
                    system.waitTicks(getRandomInRange(3, 8)*TicksPerSecond).then(() => {
                        this.entity.setProperty("kurokumaft:boss_pattern", 0);
                        this.flameStream(0);
                    });
                } else {
                    system.waitTicks(5).then(() => {
                        this.centerMoveing();
                    });
                }
            }
        } catch (error: any) {
        } finally {
        }

    }

    originMoveing(deltaTime: number): void {

        try {
            if (this.entity !== undefined && this.entity.isValid()) {
                const origin = this.mover.moveOrigin(deltaTime);

                this.entity.teleport(this.entity.location, {
                    checkForBlocks: true,
                    facingLocation: origin
                });
                this.entity.teleport(origin, {
                    checkForBlocks: true
                });
                if (this.mover.isCompleteOrigin()) {
                    world.sendMessage("オリジン移動終わり");
                    this.entity.setProperty("kurokumaft:boss_pattern", 0);
                    this.startMoveing();
                } else {
                    system.waitTicks(5).then(() => {
                        this.originMoveing(deltaTime);
                    });
                }
            }
        } catch (error: any) {
        } finally {
        }

    }

    private flameStream(count: number) {

        try {
            world.sendMessage("火焔放射");
            if (this.entity !== undefined && this.entity.isValid()) {
                const filterOption1 = {
                    location: this.entity.location,
                    maxDistance: 32,
                    excludeTags: [this.entity.id]
                } as EntityQueryOptions;

                const targets1 = this.entity.dimension.getEntities(filterOption1);
                this.entity.dimension.spawnParticle("kurokumaft:phoenix_stream_particle",this.entity.location);
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
                });

                system.waitTicks(3).then(() => {
                    if (count !== 10) {
                        this.flameStream(count + 1);
                    } else {
                        system.waitTicks(TicksPerSecond).then(() => {
                            world.sendMessage("もとに位置に戻る");
                            this.originMoveing(1.5);
                        });
                    }
                });
            }

        } catch (error: any) {
            throw error
        }

   }

    private async fireBlast(count: number) {
        world.sendMessage("火球乱射");

        try {
            const bulet = this.entity.dimension.spawnEntity("kurokumaft:fireballmagic", this.entity.location);
            const projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
            projectile.owner = this.entity;
            projectile.shoot({
                x:this.entity.getViewDirection().x,
                y:this.entity.getViewDirection().y - 3,
                z:this.entity.getViewDirection().z
            }, {
                uncertainty: 3
            });
            system.waitTicks(5).then(() => {
                if (count !== 5) {
                    this.fireBlast(count + 1);
                }
            });

        } catch (error: any) {
            throw error
        }

    }

    private blazeWear(count: number, hight: number) {

        world.sendMessage("火焔纏");
 
        try {
            system.waitTicks(5).then(() => {
                const loc = this.entity.location;
                this.entity.teleport({x:loc.x,y:hight,z:loc.z}, {
                    checkForBlocks: true,
                    facingLocation: this.mover.getCenter()
                });

                if (count === 8) {
                    this.entity.setProperty("kurokumaft:boss_pattern", 0);
                    this.blazeWearAttack(0);
                } else {
                    this.blazeWear(count + 1, hight - 1);
                }
            });
        } catch (error: any) {
        }

    }

    private blazeWearAttack(count: number) {

        world.sendMessage("火焔纏アタック");
        try {
            system.waitTicks(1).then(() => {
                const distance = getLookLocationDistance(this.entity.getRotation().y, 1, 0, 0);
                this.entity.teleport(getDistanceLocation(this.entity.location, distance), {
                    checkForBlocks: true
                });
                if (count === 30) {
                    this.originMoveing(3);
                } else {
                    this.blazeWearAttack(count + 1);
                }
            });
        } catch (error: any) {
        }

    }

}