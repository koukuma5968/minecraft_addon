tag @s add gomugomu_grizzly_magnum
execute as @s positioned ^^^4 run damage @e[tag=!gomugomu_grizzly_magnum,r=6.5] 12 entity_attack
execute as @s positioned ^^^4 run summon kurokumaft:bazooka_roar ~~~ kurokumaft:grizzly_magnum
tag @s remove gomugomu_grizzly_magnum
