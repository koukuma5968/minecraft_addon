tag @s add gomugomu_cannon
execute at as @s positioned ^^^2 run damage @e[tag=!gomugomu_cannon,r=8.0] 15 entity_attack
execute at as @s positioned ^^^2 run summon kurokumaft:bazooka_roar ~~~ kurokumaft:bazooka
tag @s remove gomugomu_cannon
