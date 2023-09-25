execute as @s[tag=destroy_iron_shovel] if block ^0 ^1 ^1 sand ["sand_type" = "normal"] run setblock ^0 ^1 ^1 sand ["sand_type" = "normal"] destroy
execute as @s[tag=destroy_iron_shovel] if block ^0 ^1 ^2 sand ["sand_type" = "normal"] run setblock ^0 ^1 ^2 sand ["sand_type" = "normal"] destroy
execute as @s[tag=destroy_iron_shovel] if block ^0 ^1 ^1 sand ["sand_type" = "red"] run setblock ^0 ^1 ^1 sand ["sand_type" = "red"] destroy
execute as @s[tag=destroy_iron_shovel] if block ^0 ^1 ^2 sand ["sand_type" = "red"] run setblock ^0 ^1 ^2 sand ["sand_type" = "red"] destroy
execute as @s[tag=destroy_iron_shovel] if block ^0 ^1 ^1 soul_sand run setblock ^0 ^1 ^1 soul_sand destroy
execute as @s[tag=destroy_iron_shovel] if block ^0 ^1 ^2 soul_sand run setblock ^0 ^1 ^2 soul_sand destroy
execute as @s[tag=destroy_iron_shovel] if block ^0 ^1 ^1 gravel run setblock ^0 ^1 ^1 gravel destroy
execute as @s[tag=destroy_iron_shovel] if block ^0 ^1 ^2 gravel run setblock ^0 ^1 ^2 gravel destroy
tag @s remove destroy_iron_shovel
