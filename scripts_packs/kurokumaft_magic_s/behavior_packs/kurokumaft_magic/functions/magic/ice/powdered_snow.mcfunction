tag @s add powdered_snow_self
tag @e[tag=!powdered_snow_self,family=!inanimate,family=!familiar,type=!item,r=3] add powdered_snow
particle kurokumaft:snow_particle ^ ^1.8 ^2.4
damage @e[tag=powdered_snow,r=3] 2 freezing
tag @e[tag=powdered_snow] remove powdered_snow
tag @s remove powdered_snow_self
