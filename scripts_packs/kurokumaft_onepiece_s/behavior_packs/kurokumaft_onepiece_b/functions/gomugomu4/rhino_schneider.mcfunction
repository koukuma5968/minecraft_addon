tag @s add gomugomu_rhino_schneider
execute as @s positioned ^^^1 run damage @e[tag=!gomugomu_rhino_schneider,r=5] 20 entity_attack
execute as @s positioned ^^^1 run summon kurokumaft:bazooka_roar ~~~ kurokumaft:tank
execute as @s positioned ^^^3 run damage @e[tag=!gomugomu_rhino_schneider,r=5] 20 entity_attack
tag @s remove gomugomu_rhino_schneider
