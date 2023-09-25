execute as @e[tag=flamespark2] at @s run particle kurokumaft:firewall_particle ~~~
execute as @e[tag=flamespark2] at @s run setblock ~~~ fire keep
damage @e[tag=flamespark2] 2 fire
execute as @e[tag=flamespark2] at @s run summon minecraft:lightning_bolt ~~~
damage @e[tag=flamespark2] 2 lightning
