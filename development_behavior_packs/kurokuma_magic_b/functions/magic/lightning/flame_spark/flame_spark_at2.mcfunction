execute @e[tag=flamespark2] ~~~ particle kurokumaft:firewall_particle ~~~
execute @e[tag=flamespark2] ~~~ setblock ~~~ fire 0 keep
damage @e[tag=flamespark2] 2 fire
execute @e[tag=flamespark2] ~~~ summon minecraft:lightning_bolt
damage @e[tag=flamespark2] 2 lightning
