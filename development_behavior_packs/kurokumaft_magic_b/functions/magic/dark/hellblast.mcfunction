tag @e[family=monster,ry=-10,rym=10,r=5] add hellblast
execute @e[tag=hellblast] ~~~ effect @s weakness 10 1 false
execute @e[tag=hellblast] ~~~ effect @s slowness 10 1 false
damage @e[tag=hellblast] 2 wither
tag @e[tag=hellblast] remove hellblast