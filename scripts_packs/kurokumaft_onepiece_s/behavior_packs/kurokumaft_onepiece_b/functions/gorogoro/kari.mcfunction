tag @s add gorogoro_kari
damage @e[tag=!gorogoro_kari,r=20]  1 lightning
effect @e[tag=!gorogoro_kari,r=20] blindness 3 10 true
execute as @e[tag=gorogoro_kari] run particle kurokumaft:kari_particle ~~~
tag @s remove gorogoro_kari
