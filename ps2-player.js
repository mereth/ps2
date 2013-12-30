var player = new function player() {
	var self = this;
	
	var build = function build(census_result) {
		var character = census_result.character_list[0];
		
		document.title = character.name.first;
		
		self.$name.text(character.name.first);
		if(character.outfit_member) {
			var outfit = character.outfit_member.outfit
			var outfittext = outfit.name;
			if(outfit.alias !== "") {
				outfittext = "[" + outfit.alias + "] " + outfittext;
			}
			self.$outfit.text(outfittext);
		}
		else {
			self.$outfit.text('');
		}
		self.$br.text(character.battle_rank.value);
		
		var stats = character.characters_stat_history;
		
		var stats2 = [
			[stats.time.all_time*1, stats.score.all_time*1, stats.kills.all_time*1, stats.deaths.all_time*1, 0, 0, 0]
			,[0, 0, 0, 0, 0, 0, 0]
			,[0, 0, 0, 0, 0, 0, 0]
			,[0, 0, 0, 0, 0, 0, 0]
		]
		
		var sum_time = 0;
		var sum_score = 0;
		var sum_kills = 0;
		var sum_deaths = 0;
		var start = 0;
		
		for(var i = 1; i<=31; ++i) {
			if(i < 10) {
				var str_i = 'd0' + i;
			}
			else {
				var str_i = 'd' + i;
			}
			
			sum_time += stats.time.day[str_i]*1;
			sum_score += stats.score.day[str_i]*1;
			sum_kills += stats.kills.day[str_i]*1;
			sum_deaths += stats.deaths.day[str_i]*1;
			
			var stat2_i = 0;
			if(i === 1) {
				stat2_i = 3;
			}
			else if(i === 7) {
				stat2_i = 2;
			}
			else if(i === 31) {
				stat2_i = 1;
			}
			
			if(stat2_i) {
				stats2[stat2_i][0] = sum_time;
				stats2[stat2_i][1] = sum_score;
				stats2[stat2_i][2] = sum_kills;
				stats2[stat2_i][3] = sum_deaths;
			}
		}
		
		for(var i = 0; i<4; ++i) {
			var time = stats2[i][0] / 60;
			var score = stats2[i][1];
			var kills = stats2[i][2];
			var deaths = stats2[i][3];
			
			if (deaths == 0) deaths = 1;
			if (time == 0) time = 1;

			stats2[i][4] = (kills / deaths).toFixed(2);
			stats2[i][5] = (score / time).toFixed(0);
			stats2[i][6] = (kills / time).toFixed(2);
		}
		
		$.each(self.$container.find('#stats_overall').find('td'), function(idx, td) {
			var value = stats2[0][idx];
			if(idx === 0) {
				var duration = moment.duration(value, 's')
				$(td).text(duration.format());
			}
			else {
				$(td).text(value);
			}
		});
		
		$.each(self.$container.find('#stats_monthly').find('td'), function(idx, td) {
			var value = stats2[1][idx];
			if(idx === 0) {
				var duration = moment.duration(value, 's')
				$(td).text(duration.format());
			}
			else {
				$(td).text(value);
			}
		});
		
		$.each(self.$container.find('#stats_weekly').find('td'), function(idx, td) {
			var value = stats2[2][idx];
			if(idx === 0) {
				var duration = moment.duration(value, 's')
				$(td).text(duration.format());
			}
			else {
				$(td).text(value);
			}
		});
		
		$.each(self.$container.find('#stats_daily').find('td'), function(idx, td) {
			var value = stats2[3][idx];
			if(idx === 0) {
				var duration = moment.duration(value, 's')
				$(td).text(duration.format());
			}
			else {
				$(td).text(value);
			}
		});
		
		self.$lastupdate.text(moment.unix(stats.score.last_save*1 + 28800).format("MMM D, HH:mm:ss"));
	}
	
	return {
		init: function init($container) {
			self.$container = $container;
			self.$name = self.$container.find('#name').children('span')
			self.$br = self.$container.find('#br').children('span')
			self.$outfit = self.$container.find('#outfit').children('span')
			self.$lastupdate = self.$container.find('#lastupdate').children('span')
		}
		,update: function update(character_id) {
			var url = "http://census.soe.com/get/ps2:v2/character/?";
			url += "c:join=characters_stat_history^list:1^inject_at:characters_stat_history";
			url += "&c:tree=start:characters_stat_history^field:stat_name";
			url += "&c:join=outfit_member^on:character_id^inject_at:outfit_member(outfit^inject_at:outfit)";
			url += "&callback=?";

			$.getJSON(url, { character_id: character_id }, build);
		}
	};
}();