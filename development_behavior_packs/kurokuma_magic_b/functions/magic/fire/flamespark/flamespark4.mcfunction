execute @e[tag=flamespark4] ~~~ particle kurokumaft:firewall_particle ~~~
execute @e[tag=flamespark4] ~~~ setblock ~~~ fire 0 keep
execute @e[tag=flamespark4] ~~~ summon minecraft:lightning_bolt
damage @e[tag=flamespark4] 4 fire
damage @e[tag=flamespark4] 4 lightning
