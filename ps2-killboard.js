(function() {
	var self = this;
	
    var url = "http://census.daybreakgames.com/get/ps2:v2/characters_event/?type=KILL,DEATH";
    url += "&c:join=character^show:character_id'name.first'battle_rank.value'faction_id^inject_at:character";
    url += "(";
    url += "characters_stat_history^on:character_id^terms:stat_name=kills^show:all_time'week.w01'week.w02^inject_at:stat_kills";
    url += ",characters_stat_history^on:character_id^terms:stat_name=deaths^show:all_time'week.w01'week.w02^inject_at:stat_deaths";
    url += ",characters_stat_history^on:character_id^terms:stat_name=score^show:all_time'week.w01'week.w02^inject_at:stat_score";
    url += ",characters_stat_history^on:character_id^terms:stat_name=time^show:all_time'week.w01'week.w02^inject_at:stat_time";
    url += ",outfit_member^show:outfit_id^inject_at:outfit(outfit^show:name'alias^inject_at:details)";
    url += ")";
    url += "&c:join=character^on:attacker_character_id^to:character_id^show:character_id'name.first'battle_rank.value'faction_id^inject_at:attacker_character";
    url += "(";
    url += "characters_stat_history^on:character_id^terms:stat_name=kills^show:all_time'week.w01'week.w02^inject_at:stat_kills";
    url += ",characters_stat_history^on:character_id^terms:stat_name=deaths^show:all_time'week.w01'week.w02^inject_at:stat_deaths";
    url += ",characters_stat_history^on:character_id^terms:stat_name=score^show:all_time'week.w01'week.w02^inject_at:stat_score";
    url += ",characters_stat_history^on:character_id^terms:stat_name=time^show:all_time'week.w01'week.w02^inject_at:stat_time";
    url += ",outfit_member^show:outfit_id^inject_at:outfit(outfit^show:name'alias^inject_at:details)";
    url += ")";
    url += "&c:join=item^on:attacker_weapon_id^to:item_id^show:name.en'image_path^inject_at:attacker_weapon";
    url += "&c:join=vehicle^on:attacker_vehicle_id^to:vehicle_id^show:name.en'image_path^inject_at:attacker_vehicle";
    url += "&callback=?";
    
	var _page_index = 1;
	var _page_size = 100;
	
    var viewModel = {
        characterId: ko.observable()
        
      , events: ko.observableArray()
      
      , getMore: function() {
            _page_size += 100;
            getKillboard();
        }
    };
    
    var getKillboard = function() {
        $.getJSON(url, { character_id: viewModel.characterId(), 'c:start': _page_index, 'c:limit': _page_size }, buildKillboard);
    };
    
	var buildKillboard = function buildKillboard(killboard) {
        viewModel.events.removeAll();
		$.each(killboard.characters_event_list, buildKillboardEvent);
	};

	var buildKillboardEvent = function buildKillboardEvent(idx, event) {
        var model = {};
        
		model.type = event.table_type;
        
		var character = event.character;
		if(model.type === 'deaths') {
			character = event.attacker_character;
		}
		
		model.suicide = 0;
		// remove suicide kills event, keep only the death one and mark it as suicide
		if(event.character_id == event.attacker_character_id) {
			if(model.type == "kills") {
				return;
			}
			else {
				model.suicide = 1;
			}
		}
        
		model.headshot = 0;
		if(event.is_headshot === "1") {
			model.headshot = 1;
		}
		
        model.faction = "";
		if(character) {
			if(character.faction_id == 1) {
				model.faction = "vs";
			}
			else if(character.faction_id == 2) {
				model.faction = "nc";
			}
			else if(character.faction_id == 3) {
				model.faction = "tr";
			}
		}
		
		model.time = buildTimeInfo(event.timestamp);
		model.name = buildPlayerInfo(character);
		model.rank = buildBR(character);
		model.outfit = buildOutfitInfo(character);
		model.kd = buildKD(character);
		model.spm = buildSPM(character);
		model.kpm = buildKPM(character);
		model.method = buildMethodInfo(event.attacker_weapon, event.attacker_vehicle);
		
		model.getRowCss = function() {
			var css = model.faction;
			css += (model.type == 'deaths' ? ' active': '');
			css += (model.suicide ? ' suicide' : '');
			css += (model.headshot ? ' headshot' : '');
			return css;
		};
		
		viewModel.events.push(model);
	};

	var buildTimeInfo = function buildTimeInfo(timestamp) {
		return moment.unix(timestamp).format("MMM D, HH:mm:ss");
	};

	var buildPlayerInfo = function buildPlayerInfo(character) {
		if(!character)
			return "N/A"
		
		var info = "<a href='character.html?id=" + character.character_id + "'>" + character.name.first + "</a>"
		
		return info;
	};

	var buildOutfitInfo = function buildOutfitInfo(character) {
		if(!character)
			return ""
		
		var info = "";
		if(character.outfit) {
			if(character.outfit.details.alias != "") {
				info += "[" + character.outfit.details.alias + "] ";
			}
			info += character.outfit.details.name;
      
      info = "<a href='outfit.html?id=" + character.outfit.outfit_id + "'>" + info + "</a>"
		}
    
		return info;
	}

	var buildBR = function buildBR(character) {
		if(!character)
			return ""
		
		return ps2.util.getComputedRank(character.stat_score.all_time);
	}

	var buildKD = function buildKD(character) {
		if(!character)
			return ""
		
		var stat_kills = character.stat_kills;
		var stat_deaths = character.stat_deaths;
		
		var info = "";
		if(stat_kills && stat_deaths) {
			var kills = sumStat(stat_kills);
			var deaths = sumStat(stat_deaths);
			
			if (deaths == 0) deaths = 1;
			
			info = (kills/deaths).toFixed(2);
		}
		
		return info;
	}

	var buildSPM = function buildSPM(character) {
		if(!character)
			return ""
		
		var stat_time = character.stat_time;
		var stat_score = character.stat_score;
		
		var info = "";
		if(stat_score && stat_time) {
			var time = sumStat(stat_time) / 60;
			var score = sumStat(stat_score);
			
			if(time == 0) time = 1;
			
			info = (score/time).toFixed(0);
		}
		
		return info;
	}

	var buildKPM = function buildKPM(character) {
		if(!character)
			return ""
		
		var stat_time = character.stat_time;
		var stat_kills = character.stat_kills;
		
		var info = "";
		if(stat_kills && stat_time) {
			var kills = sumStat(stat_kills);
			var time = sumStat(stat_time) / 60;
			
			if(time == 0) time = 1;
			
			info = (kills/time).toFixed(2);
		}
		
		return info;
	}

	var buildMethodInfo = function buildMethodInfo(weapon, vehicle) {
		var info = "";
		if(weapon) {
			info += "<span class='weapon'>" + weapon.name.en + "</span>";
		}
		
		if(vehicle && (!weapon || weapon.name.en != vehicle.name.en)) {
			info += "<span class='vehicle'>" + vehicle.name.en + "</span>";
		}
		
		return info;
	};

	var sumStat = function sumStat(stat) {
		var sum = stat.week.w01 * 1;
		sum += stat.week.w02 * 1;
		
		//var sum = stat.all_time * 1;
		
		return sum;
	};
	
    if(!window.ps2) window.ps2 = {};
    window.ps2.killboard = {
        update: function(id) {
            viewModel.characterId(id);
            getKillboard();
        }
    };
    
	$(function() {
        ko.applyBindings(viewModel, document.getElementById('killboard'));
    });
})();