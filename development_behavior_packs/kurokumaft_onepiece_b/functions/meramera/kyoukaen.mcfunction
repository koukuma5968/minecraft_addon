tag @s add meramera_kyoukaen
execute @s ^-5^^5 particle kurokumaft:kyoukaen ~~~
execute @s ^0^^5 particle kurokumaft:kyoukaen ~~~
execute @s ^5^^5 particle kurokumaft:kyoukaen ~~~
execute @s ^^^5 damage @e[tag=!meramera_kyoukaen,r=8] 5 fire
execute @s ~~~ fill ^-7^-1^5 ^7^5^7 fire 0 keep
tag @s remove meramera_kyoukaen
