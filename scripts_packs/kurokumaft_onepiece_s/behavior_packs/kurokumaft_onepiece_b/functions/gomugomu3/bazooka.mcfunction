tag @s add gomugomu_bazooka
execute as @s positioned ^^^2 run damage @e[tag=!gomugomu_bazooka,r=4.5] 12 entity_attack
execute as @s positioned ^^^2 run summon kurokumaft:bazooka_roar ~~~ kurokumaft:bazooka2
tag @s remove gomugomu_bazooka
