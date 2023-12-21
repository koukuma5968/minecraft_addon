tag @s add kedamono3
execute as @s positioned ^-1^^1 run damage @e[tag=!kedamono3,family=!inanimate,type=!item,r=1.5] 10 entity_attack
execute as @s positioned ^1^^1 run damage @e[tag=!kedamono3,family=!inanimate,type=!item,r=1.5] 10 entity_attack
tag @s remove kedamono3
