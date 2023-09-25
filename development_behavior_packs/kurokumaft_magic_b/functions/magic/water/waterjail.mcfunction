tag @e[family=monster,c=2,r=20] add waterjail
execute as @e[tag=waterjail] at @s run effect @s slowness 10 50 false
execute as @e[tag=waterjail] at @s run particle kurokumaft:waterjail_particle ~~~
tag @e[tag=waterjail] remove waterjail
