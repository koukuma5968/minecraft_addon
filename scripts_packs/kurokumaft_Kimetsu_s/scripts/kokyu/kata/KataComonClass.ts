import { BlockVolume, Dimension, EntityComponentTypes, EntityDamageCause, EntityEquippableComponent, EntityProjectileComponent, 
    EntityQueryOptions, EquipmentSlot, ListBlockVolume, Entity, Vector3, world, Player, EntityTypeFamilyComponent } from "@minecraft/server";
import { addProjectionFilter, getDistanceLocation, getLookLocationDistance } from "../../common/KimetuCommonUtil";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export const ogreRankPoint = Object.freeze([
    {
        rank: "low",
        point: 0.5,
        damage: 3
    },
    {
        rank: "unusual",
        point: 0.75,
        damage: 2.8
    },
    {
        rank: "quarter",
        point: 1,
        damage: 2.0
    },
    {
        rank: "crescent",
        point: 1.2,
        damage: 1.8
    },
    {
        rank: "king",
        point: 1.5,
        damage: 1.5
    },
]);


export class KataComonClass {

    gardCheck(en: Player): boolean {

        const equ = en.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const main = equ.getEquipment(EquipmentSlot.Mainhand);
        const off = equ.getEquipment(EquipmentSlot.Offhand);

        // 対象がスニークしている
        if (en.isSneaking) {
            // オフハンドに盾を持っている場合、ガード音と耐久値減少
            if (off !== undefined && off.typeId.indexOf("shield") !== -1) {
                en.playSound("item.shield.block", {
                    pitch: 1,
                    volume: 1
                });
                ItemDurabilityDamage(en, off);
                return true;
            // メインハンドに盾を持っている場合、ガード音と耐久値減少
            } else if (main !== undefined && main.typeId.indexOf("shield") !== -1) {
                en.playSound("item.shield.block", {
                    pitch: 1,
                    volume: 1
                });
                ItemDurabilityDamage(en, main);
                return true;
            // メインハンドに日輪刀を持っている場合、ガード音と耐久値減少
            } else if (main !== undefined && main.typeId.indexOf("nichirintou") !== -1 && !en.getDynamicProperty("kurokumaft:attack_time")) {
                en.playSound("damage_guard.nitirintou_blocking", {
                    pitch: 1,
                    volume: 1
                });
                ItemDurabilityDamage(en, main);
                return true;
            }
        }

        return false;
    }

    kokyuApplyDamage(entity:Entity, filter:EntityQueryOptions, kokyuDamage:number): void {

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        const damage = entity.getProperty("kurokumaft:attack_level") as number;

        targets.forEach(en => {
            if (en !== undefined && en.isValid) {
                // 対象がプレイヤー
                if (en instanceof Player) {
                    // 対象がガードしている場合は終わり
                    if (this.gardCheck(en)) {
                        return;
                    }
                    // 攻撃側がプレイヤー
                    if (entity instanceof Player) {
                        const tags = en.getTags();
                        const ptags = entity.getTags();
                        // pvpオン、かつ、プレイヤー同士が稽古タグをつけている場合
                        if (world.gameRules.pvp && tags.indexOf("hostility_player") !== -1 && ptags.indexOf("hostility_player") !== -1) {
                            en.applyDamage((damage + kokyuDamage) * 0.5, {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: entity
                            });
                        }
                    // 攻撃側がモブ
                    } else {
                        // 対象プレイヤーのファミリーを取得
                        const familyTypes = en.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
                        // ファミリーマーがある
                        if (familyTypes !== undefined) {
                            // 対象プレイヤーが鬼の場合
                            if (familyTypes.hasTypeFamily("ogre")) {
                                // 階位を取る
                                const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
                                // 階位ごとのランクポイント
                                const point = ogreRankPoint.find(rank => rank.rank === ogre_rank);
                                // ランクごとのダメージ率を加算（階位が高いほど下がる）
                                en.applyDamage(((damage + kokyuDamage) * (point !== undefined ? point.damage : 5)), {
                                    cause: EntityDamageCause.entityAttack,
                                    damagingEntity: entity
                                });
                            // 対象プレイヤーが隊士の場合
                            } else if (familyTypes.hasTypeFamily("regimental_player")) {
                                const targetTags = en.getTags();
                                const mobTags = entity.getTags();
                                // 攻撃モブとプレイヤーが稽古タグをつけている場合
                                if (mobTags.indexOf("hostility") !== -1 && targetTags.indexOf("hostility_player") !== -1) {
                                    // 0..5倍にする
                                    en.applyDamage((damage + kokyuDamage) * 0.5, {
                                        cause: EntityDamageCause.entityAttack,
                                        damagingEntity: entity
                                    });
                                }
                            }
                            // プレイヤーが鬼か隊士以外はダメージを受けない
                        }
                    }
                // 対象がモブ
                } else {
                    // 攻撃側のファミリーを取得
                    const damagerFamilyTypes = entity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
                    // ファミリーがある
                    if (damagerFamilyTypes !== undefined) {
                        // 攻撃側が鬼の場合
                        if(damagerFamilyTypes.hasTypeFamily("ogre")) {
                            const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
                            const point = ogreRankPoint.find(rank => rank.rank === ogre_rank);
                            // ランクごとのダメージ率を加算（階位が高いほど上がる）
                            en.applyDamage((damage + kokyuDamage) * (point !== undefined ? point.point : 0.2), {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: entity
                            });
                        // 攻撃側が鬼以外
                        } else {
                            // ターゲットのファミリーを取得
                            const familyTypes = en.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
                            if (familyTypes !== undefined) {
                                // ターゲットが鬼の場合
                                if (familyTypes.hasTypeFamily("ogre")) {
                                    const ogre_rank = en.getProperty("kurokumaft:ogre_rank");
                                    const point = ogreRankPoint.find(rank => rank.rank === ogre_rank);
                                    // ランクごとのダメージ率を加算（階位が高いほど下がる）
                                    en.applyDamage((damage + kokyuDamage) * (point !== undefined ? point.damage : 5), {
                                        cause: EntityDamageCause.entityAttack,
                                        damagingEntity: entity
                                    });
                                // ターゲットが隊士の場合
                                } else if (familyTypes.hasTypeFamily("regimental_soldier")) {
                                    // ターゲットのタグ
                                    const tags = en.getTags();
                                    // 攻撃側がプレイヤー
                                    if (entity instanceof Player) {
                                        const ptags = entity.getTags();
                                        // モブとプレイヤーが稽古中
                                        if (tags.indexOf("hostility") !== -1 && ptags.indexOf("hostility_player") !== -1) {
                                            en.applyDamage((damage + kokyuDamage) * 0.5, {
                                                cause: EntityDamageCause.entityAttack,
                                                damagingEntity: entity
                                            });
                                        }
                                    } else {
                                        const dtags = entity.getTags();
                                        // モブ同士が稽古中
                                        if (tags.indexOf("hostility") !== -1 && dtags.indexOf("hostility") !== -1) {
                                            en.applyDamage((damage + kokyuDamage), {
                                                cause: EntityDamageCause.entityAttack,
                                                damagingEntity: entity
                                            });
                                        }
                                    }
                                // それ以外のモブ
                                } else {
                                    en.applyDamage((damage + kokyuDamage), {
                                        cause: EntityDamageCause.entityAttack,
                                        damagingEntity: entity
                                    });
                                }
                            }
                        }
                    }
                }
            }
        });
        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        this.nitirintouFillBlock(
            entity.dimension,
            getDistanceLocation(entity.location, {x:distance.x-3,y:distance.y,z:distance.z-3}),
            getDistanceLocation(entity.location, {x:distance.x+3,y:distance.y+2,z:distance.z+3})
        );

        entity.removeTag(entity.id);

    }

    kokyuApplyKnockback(entity:Entity, filter:EntityQueryOptions, distance:Vector3, vNum:number): void {

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        targets.forEach(en => {
            en.applyKnockback({x:distance.x,z:distance.z},vNum);
        });
        entity.removeTag(entity.id);

    }

    kokyuApplyEffect(entity:Entity, filter:EntityQueryOptions, duration:number, damage:number, effect:string): void {

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const damageNum = kaikyuNum === 0 ? 0.5 : kaikyuNum;
        targets.forEach(en => {
            if (en !== undefined && en.isValid) {
                if (en instanceof Player) {
                    if (entity instanceof Player) {
                        const tags = en.getTags();
                        if (world.gameRules.pvp && tags.indexOf("hostility_player") !== -1) {
                            if (this.gardCheck(en)) {
                                en.addEffect(effect, Math.round(duration*damageNum*0.25), {
                                    amplifier: Math.round(damage*damageNum*0.25),
                                    showParticles: true
                                });
                            }
                        }
                    } else {
                        const familyTypes = en.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
                        const tags = entity.getTags();
                        if (tags.indexOf("hostility") !== -1) {
                            en.addEffect(effect, Math.round(duration*damageNum*0.25), {
                                amplifier: Math.round(damage*damageNum*0.25),
                                showParticles: true
                            });
                        } else if (familyTypes !== undefined && familyTypes.hasTypeFamily("ogre")) {
                            en.addEffect(effect, Math.round(duration*damageNum*1.5), {
                                amplifier: Math.round(damage*damageNum*1.5),
                                showParticles: true
                            });
                        }
                    }
                } else {
                    const damagerFamilyTypes = entity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
                    if (damagerFamilyTypes !== undefined && damagerFamilyTypes.hasTypeFamily("ogre")) {
                        en.addEffect(effect, Math.round(duration*damageNum*1.25), {
                            amplifier: Math.round(damage*damageNum*1.25),
                            showParticles: true
                        });
                    } else {
                        const familyTypes = en.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
                        if (familyTypes !== undefined && familyTypes.hasTypeFamily("ogre")) {
                            en.addEffect(effect, Math.round(duration*damageNum*1.75), {
                                amplifier: Math.round(damage*damageNum*1.75),
                                showParticles: true
                            });
                        } else if (familyTypes !== undefined && familyTypes.hasTypeFamily("regimental_soldier")) {
                            const tags = en.getTags();
                            if (tags.indexOf("hostility") !== -1) {
                                en.addEffect(effect, Math.round(duration*damageNum*0.75), {
                                    amplifier: Math.round(damage*damageNum*0.75),
                                    showParticles: true
                                });
                            }
                        } else {
                            en.addEffect(effect, Math.round(duration*damageNum*0.75), {
                                amplifier: Math.round(damage*damageNum*0.75),
                                showParticles: true
                            });
                        }
                    }
                }
                if (en instanceof Player) {
                    if (this.gardCheck(en)) {
                    }
                } else {
                }
            }
        });
        entity.removeTag(entity.id);

    }

    projectRefrect(entity:Entity, volume:Vector3): boolean {

        let hit = false;
        const projfilter = addProjectionFilter(0, volume, 4.5);

        const projectiles = entity.dimension.getEntities(projfilter);
        projectiles.forEach(projectile => {
            projectile.clearVelocity();
            const projComp = projectile.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
            if (projComp !== undefined) {
                projComp.shoot(projectile.getViewDirection(), {
                    uncertainty: 0
                });
                hit = true;
            }
        });

        return hit;
    }

    nitirintouFillBlock(dimension:Dimension, from:Vector3, to:Vector3) {

        const volume = new BlockVolume(from, to);
        dimension.fillBlocks(volume, "minecraft:air", {
            ignoreChunkBoundErrors: true,
            blockFilter: {
                includeTags: ['minecraft:is_sword_item_destructible']
            }
        }) as ListBlockVolume;
    
    };

}
