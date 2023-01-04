tag @s add guragura_kaishin
effect @e[tag=!guragura_kaishin,r=50] slowness 30 255 true
effect @e[tag=!guragura_kaishin,r=50] nausea 10 255 true
execute @s ^1^1.0^ particle kurokumaft:guragura ~~~
execute @s ^2^1.0^ particle kurokumaft:crack ~~~
execute @s ^-1^1.0^ particle kurokumaft:guragura ~~~
execute @s ^-2^1.0^ particle kurokumaft:crack ~~~
execute @s ~~~ damage @e[tag=!guragura_kaishin,r=5] 50 anvil
execute @s ~~~ fill ^-5^1^-4 ^-5^5^7 air 0 destroy
execute @s ~~~ fill ^5^1^-4 ^5^5^7 air 0 destroy
execute @s ~~~ fill ^-4^1^5 ^4^5^7 air 0 destroy
tag @s remove guragura_kaishin
