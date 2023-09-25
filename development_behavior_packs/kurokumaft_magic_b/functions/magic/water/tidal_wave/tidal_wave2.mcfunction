execute as @e[tag=tidal_wave] at @s run particle kurokumaft:tidal_wave_particle ~~~
effect @e[tag=tidal_wave] slowness 1 10 false
effect @e[tag=tidal_wave_at] slowness 1 10 false
damage @e[tag=tidal_wave] 3 drowning
damage @e[tag=tidal_wave_at] 3 drowning
