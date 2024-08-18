execute as @e[tag=flamespark4] at @s run particle kurokumaft:firewall_particle ~~~
execute as @e[tag=flamespark4] at @s run setblock ~~~ fire keep
execute as @e[tag=flamespark4] at @s run summon minecraft:lightning_bolt ~~~
damage @e[tag=flamespark4] 4 fire
damage @e[tag=flamespark4] 4 lightning
