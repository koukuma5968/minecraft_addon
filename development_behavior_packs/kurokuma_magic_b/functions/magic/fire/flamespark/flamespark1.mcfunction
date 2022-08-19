execute @e[tag=flamespark1] ~~~ particle kurokumaft:firewall_particle ~~~
execute @e[tag=flamespark1] ~~~ setblock ~~~ fire 0 keep
damage @e[tag=flamespark1] 2 fire
execute @e[tag=flamespark1] ~~~ summon minecraft:lightning_bolt
damage @e[tag=flamespark1] 2 lightning
