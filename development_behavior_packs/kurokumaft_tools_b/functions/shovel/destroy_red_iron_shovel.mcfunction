execute @s[tag=destroy_iron_shovel] ~~~ detect ^0 ^1 ^1 sand 0 setblock ^0 ^1 ^1 sand 0 destroy
execute @s[tag=destroy_iron_shovel] ~~~ detect ^0 ^1 ^2 sand 0 setblock ^0 ^1 ^2 sand 0 destroy
execute @s[tag=destroy_iron_shovel] ~~~ detect ^0 ^1 ^1 sand 1 setblock ^0 ^1 ^1 sand 1 destroy
execute @s[tag=destroy_iron_shovel] ~~~ detect ^0 ^1 ^2 sand 1 setblock ^0 ^1 ^2 sand 1 destroy
execute @s[tag=destroy_iron_shovel] ~~~ detect ^0 ^1 ^1 gravel 0 setblock ^0 ^1 ^1 gravel 0 destroy
execute @s[tag=destroy_iron_shovel] ~~~ detect ^0 ^1 ^2 gravel 0 setblock ^0 ^1 ^2 gravel 0 destroy
tag @s remove destroy_iron_shovel
