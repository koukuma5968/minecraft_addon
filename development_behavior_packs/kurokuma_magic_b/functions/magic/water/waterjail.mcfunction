tag @e[family=monster,c=2,r=20] add waterjail
execute @e[tag=waterjail] ~~~ effect @s slowness 10 50 false
execute @e[tag=waterjail] ~~~ particle kurokumaft:waterjail_particle ~~~
tag @e[tag=waterjail] remove waterjail
