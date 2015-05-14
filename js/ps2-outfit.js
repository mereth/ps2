angular
.module('outfit', ['ps2Utils'])
.factory('outfit', function($q, $http, ps2Utils) {
    var OUTFIT_URL = "http://census.daybreakgames.com/get/ps2:v2/outfit/?";
    OUTFIT_URL += "c:join=character^on:leader_character_id^to:character_id^inject_at:leader(faction^inject_at:faction^show:image_path'code_tag)";
    OUTFIT_URL += "&callback=JSON_CALLBACK";

    var MEMBERS_URL = "http://census.daybreakgames.com/get/ps2:v2/outfit_member/?";
    MEMBERS_URL += "c:join=character^on:character_id^inject_at:character";
    MEMBERS_URL += "&c:join=characters_stat_history^on:character_id^inject_at:characters_stat_history^list:1";
    MEMBERS_URL += "&c:join=characters_online_status^on:character_id^inject_at:characters_online_status^show:online_status";
    MEMBERS_URL += "&callback=JSON_CALLBACK";

    var LIMIT = 200;

    var processMembersData = function(data) {
        // nothing to process?
        if(!data.returned) return;

        var members = [];
        
        _.forEach(data.outfit_member_list, function(member) {
            var character = member.character;

            if(!character) {
                if(console.log) console.log("character '" + member.character_id + "' not found.");
                return;
            }

            var characters_stat_history = _.indexBy(member.characters_stat_history, "stat_name");

            character.statistics = ps2Utils.computeStatistics(characters_stat_history);
            if(member.characters_online_status) {
                character.characters_online_status = member.characters_online_status.online_status;
            }
            else {
                character.characters_online_status = '0';
            }

            character.member_since = member.member_since;
            character.outfitRank = member.rank;
            character.outfitRankOrdinal = member.rank_ordinal;

            character.rank = ps2Utils.getComputedRank(characters_stat_history.score.all_time);

            character.last_update = characters_stat_history.score ? ps2Utils.convertTimezone(characters_stat_history.score.last_save) : "";

            members.push(character);
        });

        members.sort(function(left, right) {
            var diff = left.characters_online_status == right.characters_online_status ? 0 : (left.characters_online_status < right.characters_online_status ? 1 : -1)
            if(diff !== 0) return diff;
            return left.name.first_lower == right.name.first_lower ? 0 : (left.name.first_lower < right.name.first_lower ? -1 : 1)
        });
        
        return members;
    };

    return {
        get: function(id) {
            var deferred = $q.defer();

            $http
            .jsonp(OUTFIT_URL, { params: { outfit_id: id } })
            .success(function(data, status) {
                if(data.returned != 1 || !data.outfit_list) {
                    deferred.reject("Outfit not found");
                    return;
                }

                var outfit = data.outfit_list[0];

                var model = {
                    outfit_id: id
                };

                model.name = outfit.name;
                model.alias = outfit.alias;
                model.membersCount = outfit.member_count;
                model.factionTag = outfit.leader.faction.code_tag.toLowerCase();
                model.factionImage = 'https://census.daybreakgames.com' + outfit.leader.faction.image_path;

                deferred.resolve(model);
            })
            .error(function(data, status) {
                deferred.reject(data || "Request failed");
            });

            return deferred.promise;
        }
        ,getMembers: function(id) {
            var deferred = $q.defer();
            
            $http
            .jsonp(MEMBERS_URL, { params: { outfit_id: id, "c:limit": LIMIT } })
            .success(function(data, status) {
                var members = processMembersData(data);
                deferred.resolve(members);
            })
            .error(function(data, status) {
                deferred.reject(data || "Request failed");
            });
            
            return deferred.promise;
        }
    };
});