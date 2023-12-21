tag @s add ice_block_self
tag @e[tag=!ice_block_self,family=!inanimate,family=!familiar,type=!item,c=4,r=30] add ice_block
execute at @e[tag=ice_block] run summon kurokumaft:ice_blockmagic ice_block ~~10~
effect @e[tag=ice_block] slowness 10 10 false
effect @e[tag=ice_block] weakness 10 10 false
tag @e[tag=ice_block] remove ice_block
tag @s remove ice_block_self
