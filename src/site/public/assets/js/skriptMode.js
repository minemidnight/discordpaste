/* eslint-disable max-len */
/* globals CodeMirror */
CodeMirror.defineSimpleMode("skript", {
	start: [
		{ regex: /#.+$/, token: "comment" },
		{ regex: /(?:[0-9]+|[0-9][0-2]?(?:a|p)m)/i, token: "number" },
		{ regex: /{@[a-zA-Z0-9]+}/, token: "variable-3" },
		{ regex: /%.+%/, token: "string-2" },
		{ regex: /{_.+?}/, token: "variable-2" },
		{ regex: /{.+?}/, token: "variable" },
		{ regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string" },
		{ regex: /(?:tick|(?:nano|milli)s(?:econds)?|second|minute|hour|day|week|month|year|now)(?:s)?/i, type: "keyword" },
		{ regex: /(?:trigger|(?:permission(?: message)?|description|usage|aliases|executable by): .+|command \/[a-zA-Z0-9._-]+|(?:s(?:k|c)ript )?options|aliases)/i, type: "keyword" },
		{ regex: /function /i, type: "keyword" },
		{ regex: /(?:(?:north |south )?(?:north|east|south|west)|(?:back|down)ward(?:s)?|top|upper|front|horizontal|behind|direction|towards|forward(?:s)?|above|over|up|down|below|under|beneath|vertical)/i, type: "keyword" },
		{ regex: /loop-(?:block|item|index|value|num(?:ber)?|player|entity|integer|attacker|victim|shooter|world|chunk|projectile|button)(?:'s|s)?/i, type: "keyword" },
		{ regex: /event-(?:string|block|item|index|value|num(?:ber)?|player|entity|integer|attacker|victim|shooter|world|chunk|projectile|button|note|instrument)(?:'s|s)?/i, type: "keyword" },
		{ regex: /(?:(?:fire |blast |projectile )?protection|feather falling|respiration|aqua affinity|thorns|depth strider|frost walker|sharpness|smite|bane of arthropods|knockback|fire aspect|looting|efficiency|silk touch|unbreaking|fortune|power|punch|flame|infinity|luck of the sea|lure|mending)/i, type: "keyword" },
		{ regex: /(?:nausea|night vision|invisibility|leaping|fire resistance|water breathing|harming|poison|regeneration|strength|(?:swift|weak|slow|blind)ness|(?:bad )?luck|jump boost|levitat(?:e|ion))/i, type: "keyword" },
		{ regex: /(?:(?:else )?if|else|loop|while|every|at)/i, type: "keyword" },
		{ regex: /(?:(?:play|attack|shoot|send|damag|serv)er|victim|(?:targeted |clicked )?entity|executor|console)(?:'s|s)?/i, type: "keyword" },
		{ regex: /(?:bat|cow|chicken|mooshroom|pig|squid|sheep|(?:cave )?spider|ender(?:man|mite)|blaze|creeper|(?:elder )?guardian|ghast|magma cube|zombie(?: pigman)?|silverfish|slime|(?:chicken|spider) jockey|witch|(?:wither )?skeleton|(?:zombie )?villager|donkey|mule|ocelot|wolf|(?:iron|snow) golem|ender(?: )?dragon|wither|shulker|giant|(?:killer )?rabbit|(?:zombie |skeleton )?horse)(?:'s|s)?/i, type: "keyword" },
		{ regex: /\\\\(?:x\\h{2}|[0-2][0-7]{,2}|3[0-6][0-7]|37[0-7]?|[4-7][0-7]?|.)/, type: "keyword" },
		{ regex: /(?:&|§)[0-9a-fl-o]|black/i, type: "meta" },
		{ regex: /on (?:cauldron(?: water)? level change|(?:elytra )?glide toggle|file download|(?:app|file) (?:run|execute)|file (?:creat|delet)(?:ion|e)|file (?:move|rename|wipe|reset|clear|zip|write|copy)|unzip)/, token: "atom" },
		{ regex: /on crop (?:trampl(?:e|ing)|break(?:ing)?|stomp(?:ing)?|step(?:ping)? on|destroy(?:ing)?|grow)/i, token: "atom" },
		{ regex: /on (?:map init|(?:mcmmo )?(?:skill )?level up)/i, token: "atom" },
		{ regex: /on (?:hack|cheat|violat(?:e|ion)|message (?:(?:receiv(?:e|ing)|get(?:ting)?))?)/i, token: "atom" },
		{ regex: /on lua script (?:dis|en)able/i, token: "atom" },
		{ regex: /on (?:border stabilize|award of achievement|(?:custom)? (?:event|evt)|packet event)/i, token: "atom" },
		{ regex: /on (?:(?:villager )?gui trade|item break|fishing state|item despawn(?:ing)?|(?:named )?sound (?:trigger|play)|player hear sound|statistics (?:increment|increase)|vehicle (?:steer|button press))/i, token: "atom" },
		{ regex: /on plot (?:enter|leave|rate)/i, token: "atom" },
		{ regex: /on (?:dragon travel (?:(?:dis|post |pre )mount))/i, token: "atom" },
		{ regex: /[uskyblock ]score chang[(?:e|ing|ed)][ event]|[askyblock ](?:challenge [level ]complete|island (?:enter[(?:ed|ing)]|exit[(?:ed|ing)]|join|leave|level|reset|create) [event])/, token: "atom" },
		{ regex: /on (?:block (?:fall(?:ing)?|piston push)|(?:mor.)?jump|mor(?:.| )inventory click|dragon(?:'s)? portal creat(?:e|ion))/i, token: "atom" },
		{ regex: /on faction (?:(?:create|disband)|(?:name|description) change)/i, token: "atom" },
		{ regex: /on (?:(?:(?:un)?store|chest (?:add|remove))|vote|hologram (?:touch|click|pickup)|(?:crackshot|weapon|gun) (?:damage|shoot)|(?:npc|Citizen) (?:right|left) click|crafting click)/i, token: "atom" },
		{ regex: /on skillapi (?:class change|exp(?:erience)? (?:gain|loss)|level up|skill (?:cast|unlock|heal|damage)|(?:gain|loss))/i, token: "atom" },
		{ regex: /On (?:(?:ender)?dragon phase change|authme (?:log(?:in|out)|teleport|inventory restore)|mythicmob (?:death|spawn)|light (?:create|remove)|job (?:join|leave|payment|levelup)|world change|extract|firework explode|anvil prepare|enderman teleport|(?:ucars )?car (?:respawn|crash)|(?:server|console) command|hopper pickup|exp(?:erience)? change|shear)/i, token: "atom" },
		{ regex: /on (?:achievement(?: get)?|brew|enchant prepare|health regen|inventory open|leash|note play|potion splash|sheep wool regrow|slime split|unleash)/i, token: "atom" },
		{ regex: /on (?:download|(?:player )?edit book|jump(?:ing)?|prepare item craft|(?:server )?(?:list )?ping)/i, token: "atom" },
		{ regex: /on (?:place|mine|break|(?:trip|(?:step(?:ping)?))|projectile hit|(?:quit(?:ting)?|disconnect(?:ing)?|log(?: )?out|logging out)|redstone(?: current)?(?: chang(?:e|ing))|region(?: leave| exit| enter)|(?:player )?respawn(?:ing)?|(?:script )?(?:load|init|enable|unload|disable)|(?:projectile )?shoot|sign(?: chang(?:e|ing)| edit)(?:ing)?|(?:player )?(?:chang(?:e)?|edit)(?:ing)?|(?:server|skript) (?:start|load|enable|stop|unload|disable)|(?:ore)? smelt(?:ing)?|(?:smelt|spawn)(?:ing )?|(?:world )?spawn change|spread(?:ing)?|(?:player )?toggl(?:e|ing) (?:sprint|sneak)|(?:player )?(?:sprint|sneak) toggl(?:e|ing)|(?:entity )?tam(?:e|ing)|(?:entity )?(?:un(?:-)?)?target|(?:player )?teleport(?:ing)?|throw(?:ing )?|(?:player )?egg throw|(?:player(?:''s)? )?(?:tool|item held|held item) chang(?:e|ing)|vehicle (?:create|damage|destory|enter|exit)|(?:creat(?:e|ing|ion)|damag(?:e|ing)|destr(?:oy(?:ing)?|uction)|(?:enter|exit)(?:ing)?) (?:a )?vehicle|weather change|world(?: (?:un)?load(?:ing)?| sav(?:e|ing)| init)|zombie break(?:ing)?|(?:block )?fad(?:e|ing)|first (?:join|login)|(?:player )?fish(?:ing)?|(?:block )?flow(?:ing)?|block mov(?:e|ing)|(?:block )?form(?:ing)?|fuel burn(?:ing)?|game(?: )?mode change|grow (?:of (?:oak|spruce|birch|jungle|dark oak|acacia))?|heal(?:ing)?|(?:food|hunger) (?:level|met(?:er|re)|bar) chang(?:e|ing)|(?:block )?ignit(?:e|ion)|(?:player )?tool break(?:ing)?|(?:player )?break(?:ing)? (?:(?:a|the) )?tool|item spawn(?:ing)?|(?:player )?(?:login|logging in|join(?:ing)?|kick|being kicked)|leaves decay(?:ing)?|(?:player )?level(?: change)?|lightning(?: strike)?|(?:step|walk)(?:ing)? (?:on|over)|(?:block )?physics|(?:player )?(?:pick(?: )?up|picking up)|pig(?: )?zap|piston(?: extend| retract)(?:ing)?|(?:block )?(?:plac(?:e|ing)|build(?:ing)?)|(?:player )?portal|portal (?:create|enter)|entering(?: a)? portal|bucket (?:empty|fill)(?:ing)?|(?:player )?(?:empty|fill)(?:ing)?(?: a)? bucket|bucket fill(?:ing)?|(?:block )?burn(?:ing)?|(?:block )?can build check|chat|chunk (?:generat|populat)(?:e|ing)|chunk (?:un)?load(?:ing)?|(?:(?:right|left)(?:(?: |-))?)?(?:mouse(?:(?: |-))?)?click(?:ing)?|combust(?:ing)?|(?:player )?connect(?:ing)?|(?:player )?(?:(?:eat|drink)(?:ing)?|consum(?:e|ing))|(?:player )?craft(?:ing)?|creeper power|damag(?:e|ing)|death|dispens(?:e|ing)|(?:player )?drop(?:ing)?|enderman (?:place|pickup)|sheep eat|(?:e)?xp(?:erience)? (?:orb)? spawn|spawn of (?:a(?:n)?)? (?:e)?xp(?:erience)? (?:orb)?|explo(?:d(?:e|ing)|sion)(?: prime)?|bed (?:enter(?:ing)?|leav(?:e|ing))|(?:player)? (?:enter(?:ing)?|leav(?:e|ing)) (?:a)? bed|block damage|command|(?:block)? (?:min(?:e|ing)))/i, token: "atom" },
		{ regex: /on (?:sheep dye|tab complet(?:er|ion)|vehicle (?:entity collide|collide with entity)|horse jump|inventory cl(?:ick|ose)|any move|block land|(?:book )?edit|enchant(?: item)?|(?:player )?toggl(?:e|ing) (?:flight|fly)|(?:player )?(?:flight|fly) toggl(?:e|ing))/i, token: "atom" },
		{ regex: /browser|browsertype|searchtype|gwebdriver|keytype|escape|f(?:1|2|3|4|5|6|7|8|9|1(?:0|1|2))|pause|tab|backspace|insert|home|page_up|end|page_down|enter|left_shift|shift|left_control|control|left_alt|alt|left|right/i, token: "type" },
		{ regex: /acc|spam|combatimpossible|angle|criticals|fastbow|fightspeed|forcefield|knockback|reach|regen|fastuse|killaura|badpackets|glide|normalmovements|speed|phase|fly|nofall|climb|jesus|headroll|fastbreak|fastplace|nuker|noswing|impossibleinteract|playerradar/i, token: "type" },
		{ regex: /statistic/i, token: "type" },
		{ regex: /luascript/, token: "type" },
		{ regex: /profession|config|bin(?:ary)?|ascii|octal|hex(?:a)?|decimal|symbolic|shortcut|exec(?:utable)?|unicode|hex|rgb|unix|base(?: )?64|morse(?: code)?|functions|triggers|statements|commands|cmds|s(?:k|c)ript(?:s)?|variables|addons|plugins|effects|expressions|events|conditions|aliases|utf-8|ISO-8859-1|(?:normal|farmer|librarian|priest|blacksmith|butcher|husk)|key|program|app(?:lication)?|zip|file|dir(?:ectory)?|font(?:s)?|bytes|accented chars|disk|whitelist|time(?: )?zone(?:s)?|country code|region code|country|region|city/i, token: "type" },
		{ regex: /worldtype|normal|flat|superflat|large(?:_| )biomes|amplified|version(?: 1.1|_1_1)|customized|normal|nether|(?:the_)?end|acquire_iron|bake_cake|bookcase|breed_cow|brew_potion|build_better_pickaxe|build_furnace|build_hoe|build_pickaxe|build_sword|build_workbench|cook_fish|diamonds_to_you|enchantments|end_portal|explore_all_biomes|fly_pig|full_beacon|get_blaze_rod|get_diamonds|ghast_return|kill_cow|kill_enemy|kill_wither|make_bread|mine_wood|nether_portal|on_a_rail|open_inventory|overkill|overpowered|snipe_skeleton|spawn_wither|the_end|(?:socket|host|achievement|creator|gen(?:erator)?|settings|worldname|dim(?:ension)?|rotation|timeout|env(?:ironment)?|struct(?:ures)?|peaceful|easy|normal|hard|throwable|stacktraceelement)(?:s|'s)?/i, token: "type" },
		{ regex: /(?:town|nation|resident|island)(?:s|'s)?/i, token: "type" },
		{ regex: /faction|party|rel|skill/i, token: "type" },
		{ regex: /effectlibparticle(?:s)?/i, token: "type" },
		{ regex: /mob|block_(?:break|place)|craft|special|exp_bottle|smelt|quest/i, token: "type" },
		{ regex: /difficulty|job(?:s)?|offhand/i, token: "type" },
		{ regex: /compound|editsession/i, token: "type" },
		{ regex: /client/i, token: "type" },
		{ regex: /(?:game)?rule|material|particle|cursor item(?:s)?|potion tier|distance|survival|adventure|creative|spectator|biome(?:s)?|block(?:s)?|boolean(?:s)?|chunk(?:s)?|colo(?:u)?r(?:s)?|(?:command(?:s)?)?(?: )?(?:sender|executor)(?:s)?|damage cause(?:s)?|date(?:s)?|direction(?:s)?|enchantment(?:s)?|enchant(?:ing|ment) type(?:s)?|(?:tile )?entit(?:y|ies)|entity(?: )?type(?:s)?|game(?: )?mode(?:s)?|inventor(?:y|ies)|item(?: material)?|item(?: )?type(?:s)?|items(?: materials)?|meter(?:s)?|living(?: )?entit(?:y|ies)|location(?:s)?|num(?:ber)?(?:s)?|integer(?:s)?|offline(?: )?player(?:s)?|potion(?:(?: )?effect)?(?:(?: )?type)?(?:s)?|projectile(?:s)?|(?:inventory )?slot(?:s)?|sound(?:s)?|(?:text|string)(?:s)?|(?:relative )?time(?:s)?|time(?: )?period(?:s)?|duration(?:s)?|time(?: )?span(?:s)?|tree(?:(?: )?type)?(?:s)?|type(?:s)?|(?:visual|particle) effect(?:s)?|weather(?: )?type(?:s)?|weather(?: condition)?(?:s)?|world(?:s)?/i, token: "type" },
		{ regex: /displayslot(?:s)?|fireworktype(?:s)?|lambda|markup|particletypes(?:s)?/i, token: "type" },
		{ regex: /(?:start|end)s with|whitelisted/i, token: "positive" },
		{ regex: /web status|(?:online|working|not offline|good|not bad|not 404|not down)/i, token: "positive" },
		{ regex: /(?:is|are)(?:n't| not) occupied|(?:has|(?:doesn't )?have) (?:fixed )?metadata(?: value)?|(?:has|have|doesn't have) (?:offers|trades)|(?:has|have|doesn't have) second item|(?:has|have|doesn't have) (?:offer|trade)(?: number)?|is(?: not)? in sleep(?:ing )?animation|is not on ground/i, token: "positive" },
		{ regex: /bypass(?:ed by|ing)|on ground|running/i, token: "positive" },
		{ regex: /motd equals/i, token: "positive" },
		{ regex: /password|logged|authorized|registered/i, token: "positive" },
		{ regex: /try/i, token: "positive" },
		{ regex: /(?:not )?using (?:party|admin)(?:chat| chat)/i, token: "positive" },
		{ regex: /npc|citizen|side(?: )?bar/i, token: "positive" },
		{ regex: /SkillAPI|skill(?:bar enabled)?|can profess|skillbar is setup/i, token: "positive" },
		{ regex: /(?:world(?: )?edit|we)? selection|does(?:n't| not) (?:contain|have)/i, token: "positive" },
		{ regex: /(?:see|visibly see|line of sight)(?: can see)?/i, token: "positive" },
		{ regex: /is a mythicmob|is in (?:a )?car|is leashed|is standing on/, token: "positive" },
		{ regex: /(?:teamspeak|ts) (?:(?:connection|ban|online) state)/i, token: "positive" },
		{ regex: /is(?:n't| not)? (?:enem|all)y with|is(?:n't| not)? neutral/i, token: "positive" },
		{ regex: /(?:file|folder)(?: in)?|(?:is not|isn't|is) tamed/i, token: "positive" },
		{ regex: /(?:is|are)(?:n't| not)? set|can(?:not )?build|can(?:no|')t hold|ha(?:s|ve) not|ha(?:s|ve)n't|do(?:es)?n't have|can hold|ha(?:s|ve) (?:enough )?space (?:for|to hold)|chance|(?:is|are)(?:n't| not)?|equal|same as|between|(?:greater|more|higher|bigger|larger|less|smaller)(?: than)?|above|below|(?:ha(?:s|ve)|do(?:es)?(?:n't| not) have)|(?:(?:the(?:ir)?|his|her|its) )?inventory|do(?:es)?(?:n't| not) contain|contain(?:s)?|damage (?:been )?(?:caused|done|made)|do(?:es)?(?:n't| not) exist|exist(?:s)?|(?:ha(?:s|ve)|(?:do(?:es)?n't|don't|do(?:es )?not) have)|permission(?:s)?|(?:(?:has not|hasn't|did not|didn't|has|did) )?(?:(?:already|yet) )?play(?:ed )?(?:on (?:this|the) server )?(?:before|already|yet)|alive|dead|(?:is|are)(?:n't| not) (?:(?:IP(?:-| ))?)?banned|blocking|defending|holding|burning|ignited|on fire|empty|enchanted|flying|of type(?:s)?|poisoned|riding|(?:sleeping|sneaking|sprinting)|wearing|(?:the )?owner(?:s)?|member(?:s)?|(?:is|are) flying|(?:ha(?:s|ve) not|do(?:es)?n't have)|(?:(?:is|are) o(?:n|ff)line|(?:is not|isn't|are not|aren't) o(?:ff|n)line)|(?:is pvp|pvp is)|(?:is|are) in (?:the )?region|region contains|(?:was|were)(?: more|(?:n't| not) (?:less|more)| less) than/i, token: "positive" },
		{ regex: /is(?: not)?(?: a)? block|is(?: not)? divisible by|is(?: not)? prime|is (?:not )?within/i, token: "positive" },
		{ regex: /(?:fake )?trial packet|generate(?: random)?|print (?:info|warning|error)|glide (?:state|ability|mode)|create|unzip|extract|move|restart|null|turn|copy|(?:force|make)|run c(?:m|omman)d|as op/i, token: "attribute" },
		{ regex: /play (?:the )?(?:sound)?|spawn (?:a(?:n)? )?(?:(?:unique|special))?|(?:styled|marked|with pattern(?:s)?)/i, token: "attribute" },
		{ regex: /render (?:resized )?image|set pixel|draw rectangle|lead|render|set background|spectate/i, token: "attribute" },
		{ regex: /(?:go to|open)(?: url)?|url|open new tab|click|send(?: key(?:s)?)?|save screenshot|submit to/i, token: "attribute" },
		{ regex: /reload permission(?:s|(?:s )?cache)|reload permission(?:s|(?:s )?cache) of aac|reload aac(?:'s)? permission(?:s|(?:s )?cache)|lag(?: spike)?|proxy send/i, token: "attribute" },
		{ regex: /(?:add|remove) (?:member|owner)|(?:crea|dele)te wg region|paste schematic|save/i, token: "attribute" },
		{ regex: /call function|(?:dis|en)able script|run lua/, token: "attribute" },
		{ regex: /(?:animation )?(?:on|to)show (?:stacking )?block break (?:animation )?stage|change (?:yaw|pitch)|(?:appear|look) (?:open|closed)|play chest (?:open|closed) animation (?:at|on)|change (?:sky|environment)|force respawn|force (?:the)?|to respawn|register furnace recipe with (?:result)?|source|reset (?:all )?recipes|sleep at|open (?:villager )?trade (?:gui )?named|wake up/i, token: "attribute" },
		{ regex: /(?:(?:border )?(?:size|center|damage (?:amount|buffer)|warning)|duplicate)|(?:within|beyond) border|(?:award|remove) achievement|write|(?:open|close) function|(?:handle response )?through function|unload|t(?:errain )?c(?:control)? spawn|scope|print stack trace|insert|call custom event/i, token: "attribute" },
		{ regex: /send bossbar|with percent|(?:un)?deny|open (?:a )?dispenser(?: named)?|group of|member|trusted/i, token: "attribute" },
		{ regex: /take|station|(?:random )?flight|(?:their |stat(?:ionary)? )?dragon(?:travel|staion)?|dismount from|riderless dragons|stop emote|emote (?:smile|grin|frown|rage|cheeky|sleepy|cool|cry|surprised|wink)|with delay|stopeffect(?: id)?|draw(?:atom|band|complex(?:circle|spiral)|nyancat|(?:simple)?halo|image|arc|dragonbreath|cylinder|planet|dot|itemfountain|(?:warp)?rings|sphere|wings(?:69)?)|particle[0-9]|(?:(?:offset)?xyz|rgb)|speed[0-9]|issingle|visiblerange|randomrotation|pixelstep(?:x|y|z)|itemtime|radius|density|dis(?:placement)?|yvelocity|r(?:ainbow)?m(?:ode)?|inner(?:pcount|radius)|outerpcount|orbitcount|start|rot(?:ation)?|(?:x|y|z)r(?:otation)?|solid|clockwise|scan|effectmod|scale|p(?:itch)?m(?:ultiplier)?|arc(?:pitch|count|density|steps|length)|style|issolid|sideratio|orbit(?:(?:al)?(?:radius|step)?)?|precision|bumpheight|pulsedelay|keepfor|animated|ring(?:count|density)?|flap(?:speed|range)|height|space/i, token: "attribute" },
		{ regex: /run garbage collector|reload|open brewing|send (?:resource|texture)(?: )?pack|save towny(?: data)?|open brewing|send (?:resource|texture)(?: )?pack|set fake max|end war(?:(?: )?event)?|backup towny(?: data)?|new|rename|rem(?:ove)?|set pvp state|set fire state|save towny(?: data)?|bonus blocks|board/i, token: "attribute" },
		{ regex: /set (?:mor.)?amount|play(?:noteblock)? music|(?:mor.)?send email (?:with )?subject|set mor.maxhp|stop (?:noteblock )?music/i, token: "attribute" },
		{ regex: /(?:un)?claim land|create a faction|with leader|disband|invite|(?:admin(?:chat| chat)?|party)/i, token: "attribute" },
		{ regex: /group score (?:with id)?|(?:spawn|create|apply) (?:a|the|an) (?:animated ball|atom|bleed|circle) (?:effect|formation) (?:at|on|for|to)|bind hologram|change citizen|skin|(?:invulnerable|vulnerable)|(?:set|make) citizen(?:s)?|max health|nametag (?:invisible|visible)|give npc|the look close trait|create (?:a )?citizen named|create bound holo object|(?:set|create) group id (?:based )?score|create hologram|display|show|create (?:client side )?holo object|create interactive (?:client side )?holo object|(?:delete|remove) score(?:s)? (?:with )?group id|(?:delete|remove) score (?:with )?id|delete holo object|delete score|(?:delete|stop) (?:effect|formation)|(?:edit|update) score (?:with)?|edit holo object|and set interactivity|(?:equip|give|m(?:ov|ak)e|despawn) citizen|(?:create|strike) (?:fake|ultra|no sound) fake lightning|(?:spawn|create|apply) (?:a|the|an) line (?:effect|formation)|(?:attack|fight)|(?:say|communicate)|set rf max(?:imum)? h(?:ealth|p)|(?:place|set|spawn) mine|play|tab name|set citizen|protect|(?:remove|destroy) citizen|respawn citizen|(?:sub)?title|fade (?:in|out)|action bar|(?:set|create) id (?:based )?score|set name of sidebar|set score|set tab header|set tab(?:list )?score|offset by x, y (?:and|,) z|(?:spawn|create|apply) (?:a|the|an) text (?:effect|formation) with text|(?:spawn|create|apply) (?:a|the|an) tornado (?:effect|formation)|(?:edit|update) score (?:with)?(?:in )?group (?:id)?|(?:spawn|create|apply) (?:a|the|an) wave (?:effect|formation)|with particle(?:s)?|(?:wipe|erase) below score(?:s)?|(?:wipe|erase|delete)|score from tab(?:list)?/i, token: "attribute" },
		{ regex: /skillapi(?:exp(?:erience)?|(?:sp|skillpoint(?:s)?|skill point(?:s)?)|refund|attribute points|clear|data|toggle|skillbar|toggle skillbar|regen(?:erate )?mana|attr(?:ibute )?menu|allowed exp(?:erience )?sources|cast skill|profess)|MythicMobs spawn level/i, token: "attribute" },
		{ regex: /skellett play sound|(?:set )?(?:toggle )? (?:ignored sleep|sprint(?:ing)?|sneak(?:ing)?)(?: state)?|(?:skellett )?(?:force )?respawn|(?:set )?collid(?:e|able)(?: state)?/i, token: "attribute" },
		{ regex: /(?:join|leave)(?: all)?|(?:create|delete) light|pex (?:remove|add(?: timed)?) (?:permission|group)|pex (?:(?:add|remove|delete) permission|create group)|open (?:brewer|hopper)|rank of (?:the )?group|rank(?: )?ladder if (?:the )?group/, token: "attribute" },
		{ regex: /(?:create|draw|make) (?:a)?(?:(?:no(?:n|t)(?:-| )hollow|filled)|hollow) line|thick(?:ness)?|(?:un|re)do(?:last)? (?:change|edit)(?:s)?/i, token: "attribute" },
		{ regex: /(?:teamspeak|ts) (?:server )?(?:privilege key by group id|(?:dis)?connect|send (?:channel|broadcast) message|send private|poke|tempban|(?:change|remove) description|delete all ban entries)|user|login|credentials|on query port| flood level/i, token: "attribute" },
		{ regex: /(?:create|make) (?:a )?(?:merchant )?trader|(?:remove|clear)(?: the)?(?: merchant)? trader|(?:open|show)(?: merchant)? trader|merchant(?:s)?|trader(?:s)?|output|input/i, token: "attribute" },
		{ regex: /as op|remove bossbar|bungeecord connect|create (?:file|folder)|d(?:elete|f) (?:file|folder)|download|open (?:virtual |fake )?(?:furnace|anvil) (?:to|for) (?:the)?|(?:set|change) slot|hand(?: bar)?|display hologram|change server icon to image from (?:file|url)|(?:prefix|suffix) as|enable metrics|set motd|(?:en|dis)able plugin|replace last|load script(?:s)? from(?: file| url|folder)?|(?:yaml|yml) (?:file)?|(?:set|edit) tag|g(?:enerate)? l(?:ine)?|w(?:rite )?f(?:ile)?/i, token: "attribute" },
		{ regex: /(?:un)?ban|(?:by reason|because|on account|due)|ip|IP(?:-| )ban|(?:IP(?:-| )unban|un(?:-)?IP(?:-)?ban)|broadcast|(?:un)?cancel(?: the)? event|add|give|increase|remove(?:all| every)?|subtract|reduce|delete|clear|(?:re)?set|(?:dye|colo(?:u)?r|paint)|(?:let|make)|execute|damage|heal|heart(?:s)?|repair|(?:wait|halt)|drop|(?:dis)?enchant|equip|make|wear|(?:exit|stop)(?: trigger| (?:section|loop|conditional)(?:s)?)?|(?:create |make )?(?:a(?:n)? )?(?:safe |fake )?explosion|(?:create |make )?(?:an )?explosion(?: )?effect|(?:ignite|set fire to)|light|on fire|extinguish|kick|kill|strike lightning(?: effect)?|log|(?:message|send(?: message)?)|(?:de(?:-)?)op|(?:open|show) (?:crafting (?:table)?|workbench)(?: view|window|inventory)?|op|close(?: the)? inventory(?: view)?|close|inventory|(?:view)?(?:play|show)|(?:poison|cure|unpoison)|apply(?: potion)?|push|thrust|(?:enable|disable) pvp|replace(?:all| every)?|(?:un(?:-)?)?shear|shoot|(?:make|let)|spawn|teleport|(?:close|turn off|de(?:-)?activate)|(?:toggle|switch) (?:the)? state|(?:open|turn on|activate)|(?:grow|create|generate) (?:oak|spruce|birch|jungle|dark oak|acacia) (?:tree)?|(?:make|let|force)|(?:ride|mount)|(?:dismount|(?:dismount|leave) (?:from|of))? (?:(?:any|the(?:ir)?|his|her))? vehicle(?:s)?|(?:(?:eject|dismount)(?: any| the))? passenger(?:s)?/i, token: "attribute" },
		{ regex: /branch|target|crafting recipes|row(?:s)?|see(?: lines)?|(?:$ )?(?:developer mode|access|init (?:.+)|use permissions|db (?:password|url|username) (?:.+))|do|draw buffered(?: )?image|draw|map|starting|normally|(?:erase|wipe)(?: map)?|escape|l(?:ine|evel)(?:s)?|evaluate|run|(?:un)?format slot|(?:be|act) unstealable|access|invoke|launch|deploy|timed|leash|(?:manage|share|over(?:rid|writ)e) map(?: id)?|pathfind|play midi|play raw sound|pop|register new shape(?:d|less) recipe|send map|permanently restore updates|restore all updates|move display|make score|(?:score)?board|display credits|(?:soft )?return|spawn(?: damaging(?: undroppable)?| undroppable(?: damaging)?)? falling block|update|shutdown|tame|send (?:resource|texture) pack|trail|reveal|hide/i, token: "attribute" },
		{ regex: /(?:skutil )?(?:free|total|max) (?:ram|memory)|ssl (?:verifier|issue|expire|algorithm|serial number|version)|(?:absolute|complete) path|convert|extension|(?:en|de)c(?:ode|rypt)|mirror(?:ed)?|flip(?:ped)?|reverse(?:d)?|formatted as|(?:current )?system|hash(?:ed)?|using|line count|(?:readable|writable|hidden) attribute|(?:last (?:modified|access)|creation) value|contents|(?:total|free|usable) space/i, token: "def" },
		{ regex: /(?:in)? rad(?:ian)?(?:s)?|(?:in)? deg(?:ree)?(?:s)?|midpoint|linear coord(?:inate)?(?:s)?|(?:linked|connected)(?: with)? density|polygon(?:s)?|(?:vertex|vertices|vertexes)(?:,| and) radius|cube(?:s)?|circle(?:s)?|heli(?:x|xes|ces)|height|(?:,| and) step (?:height|size)|cylinder coord(?:inate)?(?:s)?|spheric(?:al)? coord(?:inate)?(?:s)?|(?:with )?coordinates|(?:random )?sphere(?:s)?|and density|with angle|rotated around(?: (?:x|y|z)(?:-| )axis)?|mirrored|(?:scaled )?(?:with)? center|move|shift|center|(?:as|in) square around/i, token: "def" },
		{ regex: /active potion effect(?:s)?auto(?:matic)? despawn state|(?:wolf )?collar (?:color)?|(?:letters|characters)|(?:changed|converted)|(?:(?:upp|low)ercase|(?:un)?caps)|(?:shown|displayed) item|(?:event(?:-| ))?enchant(?:ed|ing) item (?:e)?xp(?:erience)? cost|(?:e)?xp(?:erience)? cost of enchant(?:ing|ment)|(?:restore(?:d)?|heal(?:ed)?|regenerat(?:ed)?) (?:amount|number|health)|(?:invulnerability (?:time)?|no damage (?:time)?)|(?:shown|displayed) rotation|pickup state|saturation (?:level)?|(?:number (?:of times)? (?:that)?|count of)(?: case(?:-| )sensitive)?/i, token: "def" },
		{ regex: /(?:last )?exter|command output|map id|(?:exter )?nametag(?:s)? (?:suffix|prefix)|last (?:exter )?(?:server command )?output|(?:new )?hastebin (?:key|identifier|url)|book (?:title|author)|pages|minigame (?:deplete )?(?:hunger|health|(?:always )?(?:day|night))/i, token: "def" },
		{ regex: /(?:gamebuster's )?(?:fixed )?(?:yaw|pitch)|all browsers|element found (?:by|using)|with parameter/i, token: "def" },
		{ regex: /tps|(?:hack|violation|cheat)(?:s)?(?: level)?|vl|(?:full|total)/i, token: "def" },
		{ regex: /pos(?:it(?:ion)?)?(?: )?(?:1|2)|wg region/i, token: "def" },
		{ regex: /age|enchantment level|(?:catch|caught entity)|(?:chat )?recipients|direction of|(?:monster|animal|water(?:-| )?animals|ambient) spawn limit(?:s)?|final damage|fishing state|(?:fishing )?(?:hook|lure)|(?:first|second|third) item|(?:item|items) (?:within|inside)|vector|max uses|(?:maximum )?damage delay|(?:fixed )?metadata(?: value)?|name visibility|(?:new )?vector|highest to lowest|lowest to highest|pick up delay|value of|slime size|(?:match(?:es|ing)|compared to)|case(?:-| )sensitive|(?:current )?system (?:millis|nanos)|time lived|unix time|version|viewers|observers/i, token: "def" },
		{ regex: /(?:border (?:size|center|damage (?:amount|buffer)|warning distance)?)|using name|modified|t(?:errain )?c(?:ontrol)? (?:spawn)?|highest(?: (?:solid|non-air))?|titled|written|page(?:s from|count)?|pg(?:s from)?|through|deleted|title|author|parent|difficulty|pass(?:word)? of function socket|enchants within|handler function|remaining until border stabilize|caught exception|throwable cause|details|stack trace|(?:class|file|method) name|containing|prob(?:ability)?|id of custom event|custom event's id|args of custom event|custom event's args|return type of function|last page|(?:max )?breath|note/i, token: "def" },
		{ regex: /prefix|suffix|group|plots|rated|server motd/i, token: "def" },
		{ regex: /(?:uskyblock )?island (?:level|rank)|(?:(?:get|askyblock) )?(?:spawn (?:location|range)|top ten)|(?:askyblock )?(?:island (?:level|world)|nether world|owner of island|team leader(?:'?s)?|team member(?:'?s)?)|(?:available(?: )?)?processors|border(?: warning| damage (?:buffer|amount))?|cpu(?:(?: )?byte)?|(?:os|operating system)|os arch(?:itecture)?|(?:os(?: )?)?username|(?:running(?: )?)?threads|allow (?:end|nether|flight)|cpu usage|default gamemode|idle timeout|(?:skeeland|bukit) version|loaded|online mode|ip|port|uptime|per (?:animal|monster) spawn(?:s)?|view distance|(?:(?:water )?(?:animal|ambient)|monster) spawn(?:s)? limit|(?:total|max|free) memory(?: in)? mb|claim|(?:fire|pvp|public) state|mayor|taxes|without a|war(?: )?time/i, token: "def" },
		{ regex: /window/i, token: "def" },
		{ regex: /description of|home|list of (?:all )?(?:factions|players|allies|enemies)|(?:all )?players list|(?:all )?faction (?:all|enem)ies list|factions list|all factions|list of (?:all )?truces|(?:all )?faction truces list|motd|power(?:level| level)|power(?:boost)?|faction's power(?:boost)?|relation(?:ship )?(?:status )?between (?:the faction)?|with the faction|role of|mcmmo/i, token: "def" },
		{ regex: /citizen id|owner of npc|(?:gun|crackshot weapon)|group score (?:value|number|name|title) (?:of|from) id|last created citizen(?: id)?|name of citizen|no nbt|shiny|score (?:value|number|name|title)/i, token: "def" },
		{ regex: /skillapi (?:max (?:mana|health|level)|main class|attribute points|class group|total experience|mana|required exp(?:erience)?|(?:mana|health) scale|(?:chat colo(?:u)?r|chatcolo(?:u)?r)|mana regen|(?:attacker|victim)|expsource|exp(?:erience )?(?:gained|Lost)|mana (?:gained|Lost)|skill casted|levels gained|class (?:group|base)?|unlocked skill)/i, token: "def" },
		{ regex: /(?:ignored sleep|sneak(?:ing)?|sprint(?:ing)?|collid(?:e|able)) (?:state)?|(?:digit(?:s)?|place(?:s)?)/i, token: "def" },
		{ regex: /glowing state/, token: "def" },
		{ regex: /(?:java|lua)(?: file)?/i, token: "def" },
		{ regex: /(?:no(?:(?: |-))?clip|fire(?: )?proof|vanish) (?:state|mode)|silently|quietly|(?:area of (?:schem(?:atic)?|(?:world(?: )?edit |we )?selection)|(?:(?:x|y|z)(?: |-)size|height) of schem(?:atic)?|(?:y(?: |-)size|height) of (?:world(?: )?edit |we )?selection|(?:(?:world(?: )?edit|we) )?selection (?:y(?: |-)size|height)|(?:custom )?nbt(?:(?: )?tag(?:s)?)?|(?:block )?limit(?: change)? of(?: edit(?: )?session)?|nbt(?:(?: )?tag(?:s)?)?|new edit(?: )?session|(?:max(?:imum)?)?(?: block)? limit(?: change)?|number of (?:all )?changed blocks (?:in|of)(?: edit(?: )?session)?|(?:world(?: )?edit |we )?po(?:s|int)|nbt (?:compound)?|volume of schem(?:atic)?|volume of (?:world(?: )?edit |we )?selection|(?:world(?: )?edit |we )?selection (?:volume|area)|(?:x(?: |-)size|width)(?:of schem(?:atic)?)?|(?:world(?: )?edit |we )? selection(?: x(?: |-)size| width)?)|(?:convert |capitalize )?(?:first|1st) (?:letter|char(?:acter)?) (?:of|in) (?:each word|(?:all)? words)|(?:(?:converted )?to (?:cap(?:ital)?s|upper(?: )?case))? (?:ignoring (?:other)? upper(?: )?case (?:(?:char(?:acter)?s|letters))?)?|(?:converted )?to(?: all)? (?:cap(?:ital)?s|(?:low|upp)er(?: )case)|(?:un(?:(?: |-))?)?capitalize(?: all)? (?:char(?:acter)?s (?:of|in))?/i, token: "def" },
		{ regex: /(?:teamspeak|ts) get client(?:s)? by (?:ip|address|description)|online clients/i, token: "def" },
		{ regex: /unbreakable/i, token: "def" },
		{ regex: /bossbar|ping|(?:configuration )?section(?:s)?|result of connect|content of file|(?:allow|access to) end|(?:all )?file(?:s)?|ip|max players|(?:allow|access to) nether|online mode|random (?:char|color)|server(?:'s)? (?:ip|name|port)|(?:clicked )?slot|(?:single )?value list|view distance|wildskript version|version of wildskript/i, token: "def" },
		{ regex: /(?:(?:craft)?bukkit|minecraft|skript)(?: |-)version|(?:un)?colo(?:u)?red|altitude(?:s)?|command|(?:doesn't have|has) permission|amount|number|size|arg(?:ument)?(?:s)?|(?:boot|shoe|leg(?:ging)?|chestplate|helm(?:et)?)(?:s)? (?:slot)?|bed(?:s)? (?:location(?:s)?)?|biome|(?:the )?(?:event-)?block|blocks (?:in radius|around)?|in radius|blocks|between|chunk(?:s)?|clicked|(?:non(?: |-)?|un(?: |-))??colo(?:u)?r(?:s|ed)?|(?:full|complete|whole) command|label|compass target|(?:(?:x|y|z)(?:-| ))?(?:coord(?:inate)?|pos(?:ition)?|loc(?:ation)?)(?:s)?|damage(?: cause| type)?|(?:(?:data|damage)(?:s)? (?:value(?:s)?)?|durabilit(?:y|ies))|difference(?: between)?|distance between|drops|random element(?: out)?|level|enchant(?:ment)?|ender(?: )?chest(?:s)?|(?:within|(?:(?:with)?in|with)? radius)|around|entities of type(?:s)?|(?:(?:spawned|dropped) )?(?:e)?xp(?:erience )?(?:orb(?:s)?)?|(?:horizontal )?facing|(?:food|hunger)(?:(?: )?(?:level|met(?:er|re)|bar) )?|(?:former|past|old|future|to-be|new) (?:state )?|before (?:the event)?|(?:ore|fuel|result)(?:s )?(?:slot(?:s)?)?|game(?: )?mode|md5(?: |-)hash(?:ed|(?:(?: |-))?code )?|(?:head|eye(?:s)?) (?:location(?:s)?)?|health|id(?:s)?|index|inventor(?:y|ies)|IP(?:s)?(?:(?: |-)address(?:es)?)?|concat(?:enate)?|join|(?:with|by|using|at) delimiter|split|(?:last(?:ly)? )?(?:spawned|shot)|length|level(?: progress)?|(?:(?:sky|sun|block)(?: )?)?light(?: )?level|(?:location|position)|line|(?:with )?lore|max(?:imum)? health|stack(?:(?: )?size )?|max(?:imum )?stack(?:(?: )?size)?|me my(?:self)?|(?:chat|join|log(?: )?(?:in|out)?|quit|leave|kick|death|)(?: |-)message|money|balance|account|(?:the )?(?:player|tab)(?: )?list name(?:s )?|(?:display|nick|chat)(?: )?name(?:s )?|name(?:s)?|(?:named|with name(?:s)?)|(?:integers) (?:between|from)|parsed as|(?:last )?(?:parse )?error|passenger(?:s)?|(?:prefix|suffix)|random|out|random (?:integer|number) (?:from|between)|owner(?:s )?|region(?:s )?|remaining air|(?:floor|round(?:ed)?)|ceil(?:ing)?|script(?:(?:'s )?name)?|line|skull|spawn(?:s )?(?:(?:point|location)(?:s)?)?|(?:walk(?:ing)?|fl(?:y(?:ing)?|ight))(?:(?: |-)?)speed|(?:part|sub(?: )?(?:text|string))|(?:between|from)|ind(?:ex|ices)|character(?:s)?|uuid|time|tool|held item|weapon|type|vehicle|yaw|pitch|force|speed|volume|strength|power|velocity/i, token: "def" },
		{ regex: /arabic num(?:ber|eral)|critical arrow (?:state|ability|mode)|(?:displayed )?art|(?:blast|explosion) (?:radius|size|yield)|book from|check(?:ed)?|(?:sin(?:e)?|cos(?:ine)?|tan(?:gent)?|arc (?:sin(?:e)?|cos(?:ine)?|tan(?:gent)?)|hyperbolic (?:sin(?:e)?cos(?:ine)?|tan(?:gent)?)|(?:(?:natural )?|base(?:-| )10 )log(?:arithm)?|signum|sq(?:rt|uare root))|factorial|enum values|(?:destroyed|exploded|boom boomed)|(?:max )?player count|(?:flickering (?:trailing )?|trailing (?:flickering )?)|firework (?:effect )?colored|fad(?:e|ing)|fl(?:y|ight) (?:state|ability|mode)|glowing|(?:new )?(?:guid|uuid)|scaled health(?: state| ability| mode)?|holo particle|(?:current|selected) hotbar slot(?: id)?|(?:buffered )?image stored|(?:buffered )?image from|(?:blast|explosion) fire (?:state|ability|mode)|serialized contents|global max stack size|json|then|(?:styled |colored )?tooltip|suggest|(?:char|long|length) string from(?: charset)?|land boat (?:state|mode|ability)|loaded chunks|(?:maximum )?minecart speed|message format|mod|(?:current )?moon phase|(?:motd|message of the day)|(?:nl|new(?: )?line)|(?:st|nd|rd|th) prime|null|(?:current|open) inventory|parameter(?:-)?|permissions|version|(?:primer|fuse lighting piece of shit)|value|pulled|radix|(?:regen|heal) (?:cause|reason)|matched (?:to|with|against)|roman num(?:ber|eral)|server icon|result of query|objects in column|(?:tab )?(?:completions|suggestions)|(?:tamer|(?:pet )?owner)|transient(?: object)?|villager (?:profession|job)|where|yaml (?:value|nodes|nodes with keys|list)/i, token: "def" }
	]
});
