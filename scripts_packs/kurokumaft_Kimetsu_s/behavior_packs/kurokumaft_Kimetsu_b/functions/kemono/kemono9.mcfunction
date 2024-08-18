tag @s add kedamono9
execute as @s positioned ^1^^2 run damage @e[tag=!kedamono9,family=!inanimate,family=!villager,family=!regimental_soldier,type=!item,r=2] 13 entity_attack
execute as @s positioned ^-1^^2 run damage @e[tag=!kedamono9,family=!inanimate,family=!villager,family=!regimental_soldier,type=!item,r=2] 13 entity_attack
tag @s remove kedamono9
