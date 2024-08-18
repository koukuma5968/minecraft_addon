tag @s add gomugomu_leo_bazooka
execute as @s positioned ^^^1 run damage @e[tag=!gomugomu_leo_bazooka,r=6.5] 30 entity_attack
execute as @s positioned ^^^1 run summon kurokumaft:bazooka_roar ~~~ kurokumaft:leo_bazooka
tag @s remove gomugomu_leo_bazooka
