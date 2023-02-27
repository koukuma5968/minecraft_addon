tag @s add gomugomu_bazooka
execute as @s positioned ^^^2 run damage @e[tag=!gomugomu_bazooka,r=2.5] 8 entity_attack
execute as @s positioned ^^^2 run summon kurokumaft:bazooka_roar ~~~ kurokumaft:bazooka
tag @s remove gomugomu_bazooka
