tag @s add gomugomu_king_kong_gun
execute as @s positioned ^^^1 run damage @e[tag=!gomugomu_king_kong_gun,r=8] 30 entity_attack
execute as @s positioned ^^^1 run summon kurokumaft:bazooka_roar ~~~ kurokumaft:king_kong_gun
execute as @s positioned ^^^5 run damage @e[tag=!gomugomu_king_kong_gun,r=8] 20 entity_attack
execute as @s positioned ^^^5 run summon kurokumaft:bazooka_roar ~~~ kurokumaft:king_kong_gun
tag @s remove gomugomu_king_kong_gun
