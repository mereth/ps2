(function() {
    var outfit_id = $.url().param('outfit_id')
    if(!outfit_id)
        return;

    var outfitURL = "http://census.soe.com/get/ps2:v2/outfit/?callback=?";

    var membersURL = "http://census.soe.com/get/ps2:v2/outfit_member/?";
    membersURL += "c:join=character^on:character_id^inject_at:character";
    membersURL += "&c:join=characters_stat_history^on:character_id^inject_at:characters_stat_history^list:1";
    membersURL += "&c:join=characters_online_status^on:character_id^inject_at:characters_online_status^show:online_status";
    membersURL += "&callback=?";

    var viewModel = {
        name: ko.observable('')
      , alias: ko.observable('')
      , members: ko.observableArray()
      , period: ko.observable('weekly')
    };

    viewModel.name.subscribe(function(value) {
        document.title = value;
    });

    var processOutfitData = function(data) {
        var outfit = data.outfit_list[0];
        
        viewModel.name(outfit.name);
        viewModel.alias(outfit.alias);
    };

    var processMembersData = function(data) {
        var members = [];
        
        _.forEach(data.outfit_member_list, function(member) {
            var character = member.character;
            
            var characters_stat_history = _.indexBy(member.characters_stat_history, "stat_name");
            
            character.statistics = computeStatistics(characters_stat_history);
            character.characters_online_status = member.characters_online_status;
            
            character.member_since = member.member_since;
            character.rank = member.rank;
            character.rank_ordinal = member.rank_ordinal;
            
            character.last_stats_update = moment.unix(characters_stat_history.score.last_save*1 + 25200).format("MMM D, HH:mm:ss");
            
            character.filteredStatistics = ko.computed(function() {
                var period = viewModel.period();
                var filtered = {};
                for(var type in character.statistics) {
                    filtered[type] = character.statistics[type][period];
                };
                return filtered;
            });
            
            viewModel.members.push(character);
        });
        
        viewModel.members.sort(function(left, right) {
            return left.name.first_lower == right.name.first_lower ? 0 : (left.name.first_lower < right.name.first_lower ? -1 : 1)
        });
    };

    var computeStatistics = function(stats) {
        var stats2 = {
            time: { all_time: stats.time.all_time*1, monthly: 0, weekly: 0, daily: 0}
          , score: { all_time: stats.score.all_time*1, monthly: 0, weekly: 0, daily: 0}
          , kills: { all_time: stats.kills.all_time*1, monthly: 0, weekly: 0, daily: 0}
          , deaths: { all_time: stats.deaths.all_time*1, monthly: 0, weekly: 0, daily: 0}
          , kdr: { all_time: 0, monthly: 0, weekly: 0, daily: 0}
          , spm: { all_time: 0, monthly: 0, weekly: 0, daily: 0}
          , kpm: { all_time: 0, monthly: 0, weekly: 0, daily: 0}
        }
        
        var sum_time = 0;
        var sum_score = 0;
        var sum_kills = 0;
        var sum_deaths = 0;
        var start = 0;
        
        // gather daily, weekly & monthly metrics
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
            
            var period = "";
            if(i === 1) {
                period = 'daily';
            }
            else if(i === 7) {
                period = 'weekly';
            }
            else if(i === 31) {
                period = 'monthly';
            }
            
            if(period) {
                stats2.time[period] = sum_time;
                stats2.score[period] = sum_score;
                stats2.kills[period] = sum_kills;
                stats2.deaths[period] = sum_deaths;
            }
        }
        
        // compute kdr, spm & kpm
        for(var period in stats2.time) {
            var time = stats2.time[period] / 60;
            var score = stats2.score[period];
            var kills = stats2.kills[period];
            var deaths = stats2.deaths[period];
            
            if (deaths == 0) deaths = 1;
            if (time == 0) time = 1;
            
            stats2.kdr[period] = (kills / deaths).toFixed(2);
            stats2.spm[period] = (score / time).toFixed(0);
            stats2.kpm[period] = (kills / time).toFixed(2);
        }
        
        return stats2;
    };
    
    var prmOutfit = $.getJSON(outfitURL, { outfit_id: outfit_id }, processOutfitData);
    var prmMembers = $.getJSON(membersURL, { outfit_id: outfit_id, "c:limit": 50 }, processMembersData);
    
    $(function() {
        ko.applyBindings(viewModel);
    });
    
})();