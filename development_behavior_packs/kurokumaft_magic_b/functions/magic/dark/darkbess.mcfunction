tag @e[family=monster,ry=-25,rym=25,r=5,c=10] add darkbess
execute @e[tag=darkbess] ~~~ particle kurokumaft:dark_particle ~~~
execute @e[tag=darkbess] ~~~ effect @s weakness 5 5 false
damage @e[tag=darkbess] 1 wither
tag @e[tag=darkbess] remove darkbess