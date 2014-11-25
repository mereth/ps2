(function() {
    var outfit_id = $.url().param('id')
    if(!outfit_id)
        return;

    var limit = 50;
    var page = 0;
    
    var outfitURL = "http://census.soe.com/get/ps2:v2/outfit/?";
    outfitURL += "c:join=character^on:leader_character_id^to:character_id^inject_at:leader(faction^inject_at:faction^show:image_path'code_tag)";
    outfitURL += "&callback=?";
    
    var membersURL = "http://census.soe.com/get/ps2:v2/outfit_member/?";
    membersURL += "c:join=character^on:character_id^inject_at:character";
    membersURL += "&c:join=characters_stat_history^on:character_id^inject_at:characters_stat_history^list:1";
    membersURL += "&c:join=characters_online_status^on:character_id^inject_at:characters_online_status^show:online_status";
    membersURL += "&callback=?";

    var viewModel = {
        name: ko.observable('')
      , alias: ko.observable('')
      , membersCount: ko.observable('')
      
      , factionTag: ko.observable('')
      , factionImage: ko.observable('')
      
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
        viewModel.membersCount(outfit.member_count);
        
        if(outfit.leader) {
          viewModel.factionTag(outfit.leader.faction.code_tag.toLowerCase());
          viewModel.factionImage('https://census.soe.com' + outfit.leader.faction.image_path);
        }
    };

    var processMembersData = function(data) {
        var members = [];
        
        // nothing to process?
        if(!data.returned) return;
        
        // more members ? prefire async call
        if(data.returned === limit) {
            page++;
            getOutfitMembers(outfit_id);
        }
        
        _.forEach(data.outfit_member_list, function(member) {
            var character = member.character;
            
            if(!character) {
                if(console.log) console.log("character '" + member.character_id + "' not found.");
                return;
            }
            
            var characters_stat_history = _.indexBy(member.characters_stat_history, "stat_name");
            
            character.statistics = ps2.util.computeStatistics(characters_stat_history);
            character.characters_online_status = member.characters_online_status;
            
            character.member_since = member.member_since;
            character.outfitRank = member.rank;
            character.outfitRankOrdinal = member.rank_ordinal;
            
            character.rank = ps2.util.getComputedRank(characters_stat_history.score.all_time);
            
            character.last_stats_update = characters_stat_history.score ? moment.unix(characters_stat_history.score.last_save*1 + 25200).format("MMM D, HH:mm:ss") : "";
            
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

    var getOutfitMembers = function(id) {
        $.getJSON(membersURL, { outfit_id: outfit_id, "c:start": page*limit, "c:limit": limit }, processMembersData);
    };
    
    var prmOutfit = $.getJSON(outfitURL, { outfit_id: outfit_id }, processOutfitData);
    //var prmMembers = $.getJSON(membersURL, { outfit_id: outfit_id, "c:limit": 50 }, processMembersData);
    getOutfitMembers(outfit_id);
    
    $(function() {
        ko.applyBindings(viewModel);
    });
    
})();