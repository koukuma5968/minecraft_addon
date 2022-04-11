tag @e[family=monster,ry=-25,rym=25,r=5,c=10] add flash
execute @e[tag=flash] ~~~ particle kurokumaft:light_particle ~~~
execute @e[tag=flash] ~~~ effect @s blindness 5 5 false
damage @e[tag=flash] 1 entity_attack
tag @e[tag=flash] remove flash