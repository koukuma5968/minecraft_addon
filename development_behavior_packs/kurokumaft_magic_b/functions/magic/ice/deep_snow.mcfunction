tag @e[family=monster,ry=-15,rym=15,r=10,c=1] add deep_snow
execute as @e[tag=deep_snow] at @s run fill ~-1 ~-1 ~-1 ~1 ~-2 ~1 powder_snow
tag @e[tag=deep_snow] remove deep_snow
