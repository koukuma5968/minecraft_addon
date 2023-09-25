tag @e[family=monster,ry=-25,rym=25,r=5,c=10] add darkbess
execute as @e[tag=darkbess] at @s run particle kurokumaft:dark_particle ~~~
execute as @e[tag=darkbess] at @s run effect @s weakness 5 5 false
damage @e[tag=darkbess] 1 wither
tag @e[tag=darkbess] remove darkbess