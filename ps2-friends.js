(function() {
    var character_id = $.url().param('id');
    if(!character_id)
        return;
    
    var friendsURL = "http://census.soe.com/get/ps2:v2/characters_friend?"
    friendsURL += "c:join=character^on:friend_list.character_id^to:character_id^inject_at:character"
    friendsURL += "(";
    friendsURL += "characters_stat_history^on:character_id^inject_at:characters_stat_history^list:1"
    friendsURL += ",outfit_member^show:outfit_id^inject_at:outfit(outfit^show:name'alias^inject_at:details)"
    friendsURL += ")";
    friendsURL += "&callback=?";

    var viewModel = {
        friends: ko.observableArray()
      , period: ko.observable('weekly')
    };

    var processFriendsData = function(data) {
        var friends = [];
        
        // nothing to process?
        if(!data.returned) return;
        
        _.forEach(data.characters_friend_list[0].friend_list, function(friend) {
            var character = friend.character;
            
            if(!character) {
                if(console.log) console.log("character '" + friend.character_id + "' not found.");
                return;
            }
            
            var characters_stat_history = _.indexBy(character.characters_stat_history, "stat_name");
            
            character.statistics = ps2.util.computeStatistics(characters_stat_history);
            if(friend.online) {
              character.characters_online_status = friend.online;
            }
            else {
              character.characters_online_status = '0';
            }
            
            var outfit = character.outfit;
            if(outfit) {
                outfit.display_name = outfit.details.name;
                if(outfit.details.alias) {
                    outfit.display_name = "[" + outfit.details.alias + "] " + outfit.display_name;
                }
            }
            
            if(!characters_stat_history.score)
                return;
            
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
            
            viewModel.friends.push(character);
        });
        
        viewModel.friends.sort(function(left, right) {
            var diff = left.characters_online_status == right.characters_online_status ? 0 : (left.characters_online_status < right.characters_online_status ? 1 : -1)
            if(diff !== 0) return diff;
            return left.name.first_lower == right.name.first_lower ? 0 : (left.name.first_lower < right.name.first_lower ? -1 : 1)
        });
    };
    
    $.getJSON(friendsURL, { character_id: character_id }, processFriendsData);
    
    $(function() {
        ko.applyBindings(viewModel, document.getElementById('friends'));
    });
})();