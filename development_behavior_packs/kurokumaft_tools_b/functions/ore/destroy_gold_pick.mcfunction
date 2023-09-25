execute as @s[tag=destroy_gold_pick] if block ^0 ^1 ^1 gold_ore run setblock ^0 ^1 ^1 gold_ore destroy
execute as @s[tag=destroy_gold_pick] if block ^0 ^1 ^2 gold_ore run setblock ^0 ^1 ^2 gold_ore destroy
execute as @s[tag=destroy_gold_pick] if block ^0 ^1 ^1 deepslate_gold_ore run setblock ^0 ^1 ^1 deepslate_gold_ore destroy
execute as @s[tag=destroy_gold_pick] if block ^0 ^1 ^2 deepslate_gold_ore run setblock ^0 ^1 ^2 deepslate_gold_ore destroy
execute as @s[tag=destroy_gold_pick] if block ^0 ^1 ^1 raw_gold_block run setblock ^0 ^1 ^1 raw_gold_block destroy
execute as @s[tag=destroy_gold_pick] if block ^0 ^1 ^2 raw_gold_block run setblock ^0 ^1 ^2 raw_gold_block destroy
execute as @s[tag=destroy_gold_pick] if block ^0 ^1 ^1 gold_block run setblock ^0 ^1 ^1 gold_block destroy
execute as @s[tag=destroy_gold_pick] if block ^0 ^1 ^2 gold_block run setblock ^0 ^1 ^2 gold_block destroy
execute as @s[tag=destroy_gold_pick] if block ^0 ^1 ^1 quartz_ore run setblock ^0 ^1 ^1 quartz_ore destroy
execute as @s[tag=destroy_gold_pick] if block ^0 ^1 ^2 quartz_ore run setblock ^0 ^1 ^2 quartz_ore destroy
execute as @s[tag=destroy_gold_pick] if block ^0 ^1 ^1 blackstone run setblock ^0 ^1 ^1 blackstone destroy
execute as @s[tag=destroy_gold_pick] if block ^0 ^1 ^2 blackstone run setblock ^0 ^1 ^2 blackstone destroy
execute as @s[tag=destroy_gold_pick] if block ^0 ^1 ^1 ancient_debris run setblock ^0 ^1 ^1 ancient_debris destroy
execute as @s[tag=destroy_gold_pick] if block ^0 ^1 ^2 ancient_debris run setblock ^0 ^1 ^2 ancient_debris destroy
tag @s remove destroy_gold_pick
