tag @s add gomugomu_kong_gun
execute as @s positioned ^^^1 run damage @e[tag=!gomugomu_kong_gun,r=5] 25 entity_attack
execute as @s positioned ^^^1 run summon kurokumaft:bazooka_roar ~~~ kurokumaft:tank
execute as @s positioned ^^^5 run damage @e[tag=!gomugomu_kong_gun,r=5] 25 entity_attack
tag @s remove gomugomu_kong_gun
