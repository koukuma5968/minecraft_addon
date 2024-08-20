tag @s add mega_brand_self
particle kurokumaft:flare_bit_particle ^3.5 ^1.8 ^6.4
execute as @s run summon kurokumaft:flare_bit_magic ^3.5 ^ ^6.4 ~ ~ minecraft:explode
particle kurokumaft:sand_particle ^3.5 ^1.8 ^6.4
execute as @s positioned ^3.5 ^ ^6.4 run damage @e[tag=!mega_brand_self,family=!inanimate,family=!familiar,type=!item,r=3] 5 stalagmite

particle kurokumaft:flare_bit_particle ^ ^1.8 ^6.4
execute as @s run summon kurokumaft:flare_bit_magic ^ ^ ^6.4 ~ ~ minecraft:explode
particle kurokumaft:sand_particle ^ ^1.8 ^6.4
execute as @s positioned ^ ^ ^6.4 run damage @e[tag=!mega_brand_self,family=!inanimate,family=!familiar,type=!item,r=3] 5 stalagmite

particle kurokumaft:flare_bit_particle ^-3.5 ^1.8 ^6.4
execute as @s run summon kurokumaft:flare_bit_magic ^-3.5 ^ ^6.4 ~ ~ minecraft:explode
particle kurokumaft:sand_particle ^-3.5 ^1.8 ^6.4
execute as @s positioned ^-3.5 ^ ^6.4 run damage @e[tag=!mega_brand_self,family=!inanimate,family=!familiar,type=!item,r=3] 5 stalagmite

particle kurokumaft:flare_bit_particle ^3.5 ^1.8 ^-6.4
execute as @s run summon kurokumaft:flare_bit_magic ^3.5 ^ ^-6.4 ~ ~ minecraft:explode
particle kurokumaft:sand_particle ^3.5 ^1.8 ^-6.4
execute as @s positioned ^3.5 ^ ^-6.4 run damage @e[tag=!mega_brand_self,family=!inanimate,family=!familiar,type=!item,r=3] 5 stalagmite

particle kurokumaft:flare_bit_particle ^ ^1.8 ^-6.4
execute as @s run summon kurokumaft:flare_bit_magic ^ ^ ^-6.4 ~ ~ minecraft:explode
particle kurokumaft:sand_particle ^ ^1.8 ^-6.4
execute as @s positioned ^ ^ ^-6.4 run damage @e[tag=!mega_brand_self,family=!inanimate,family=!familiar,type=!item,r=3] 5 stalagmite

particle kurokumaft:flare_bit_particle ^-3.5 ^1.8 ^-6.4
execute as @s run summon kurokumaft:flare_bit_magic ^-3.5 ^ ^-6.4 ~ ~ minecraft:explode
particle kurokumaft:sand_particle ^-3.5 ^1.8 ^-6.4
execute as @s positioned ^-3.5 ^ ^-6.4 run damage @e[tag=!mega_brand_self,family=!inanimate,family=!familiar,type=!item,r=3] 5 stalagmite
tag @s remove mega_brand_self
