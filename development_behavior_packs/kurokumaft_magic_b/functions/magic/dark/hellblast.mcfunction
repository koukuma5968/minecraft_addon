tag @e[family=monster,ry=-10,rym=10,r=5] add hellblast
execute as @e[tag=hellblast] at @s run effect @s weakness 10 1 false
execute as @e[tag=hellblast] at @s run effect @s slowness 10 1 false
damage @e[tag=hellblast] 2 wither
tag @e[tag=hellblast] remove hellblast