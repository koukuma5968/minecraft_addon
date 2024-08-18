tag @s add meramera_kyoukaen
execute positioned ^-5^^5 run particle kurokumaft:kyoukaen ~~~
execute positioned ^0^^5 run particle kurokumaft:kyoukaen ~~~
execute positioned ^5^^5 run particle kurokumaft:kyoukaen ~~~
execute positioned ^^^5 run damage @e[tag=!meramera_kyoukaen,r=8] 2 fire
execute as @s run fill ^-7^-1^5 ^7^5^7 fire keep
tag @s remove meramera_kyoukaen
