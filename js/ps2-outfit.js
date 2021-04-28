angular
.module('outfit', ['ps2Utils'])
.factory('outfit', ['$q', '$http', 'ps2Utils', function($q, $http, ps2Utils) {
    var OUTFIT_URL = "https://census.daybreakgames.com/s:mereth/get/ps2:v2/outfit/?";
    OUTFIT_URL += "c:join=character^on:leader_character_id^to:character_id^inject_at:leader";

    var MEMBERS_URL = "https://census.daybreakgames.com/s:mereth/get/ps2:v2/outfit_member/?";
    MEMBERS_URL += "c:join=character^on:character_id^inject_at:character";
    MEMBERS_URL += "&c:join=characters_online_status^on:character_id^inject_at:characters_online_status^show:online_status";

    var MEMBERS_STATS_URL = "https://census.daybreakgames.com/s:mereth/get/ps2:v2/outfit_member/?";
    MEMBERS_STATS_URL += "&c:join=characters_stat_history^on:character_id^inject_at:characters_stat_history^list:1";

    var MEMBERS_ONLINE_URL = "https://census.daybreakgames.com/s:mereth/get/ps2:v2/outfit_member/?";
    MEMBERS_ONLINE_URL += "c:resolve=online_status,character_name";

    var LIMIT = 2000;
    var LIMIT_STATS = 1000;

    var processMembersData = function(data) {
        // nothing to process?
        if(!data.returned) return;

        var members = [];
        
        data.outfit_member_list.forEach(function(member) {
            var character = member.character;

            if(!character) {
                if(console.log) console.log("character '" + member.character_id + "' not found.", member);
                return;
            }

            if(member.characters_online_status) {
                character.characters_online_status = member.characters_online_status.online_status;
            }
            else {
                character.characters_online_status = '0';
            }

            character.rank = member.character.battle_rank.value;
            character.member_since = member.member_since;
            character.outfitRank = member.rank;
            character.outfitRankOrdinal = member.rank_ordinal;

            members.push(character);
        });

        members.sort(function(left, right) {
            var diff = left.characters_online_status == right.characters_online_status ? 0 : (left.characters_online_status < right.characters_online_status ? 1 : -1)
            if(diff !== 0) return diff;
            return left.name.first_lower == right.name.first_lower ? 0 : (left.name.first_lower < right.name.first_lower ? -1 : 1)
        });
        
        return members;
    };

    var processMembersStatsData = function(members, data) {
        // nothing to process?
        if(!data.returned) return;

        data.outfit_member_list.forEach(function(memberData) {
            var character = members.find(function(o) { return o.character_id == memberData.character_id })

            if(!character) {
                if(console.log) console.log("character '" + memberData.character_id + "' not found.", memberData);
                return;
            }

            var characters_stat_history = memberData.characters_stat_history.reduce(function (obj, statsEntry) {
                obj[statsEntry.stat_name] = statsEntry;
                return obj;
            }, {});

            character.statistics = ps2Utils.computeStatistics(characters_stat_history);

            character.rank = ps2Utils.getComputedRank(characters_stat_history.score.all_time);

            character.last_update = characters_stat_history.score ? ps2Utils.fixTimestamp(characters_stat_history.score.last_save_date) : null;
        });
    };

    return {
        get: function(id) {
            var deferred = $q.defer();

            $http
            .get(OUTFIT_URL, { params: { outfit_id: id } })
            .then(function(response) {
                var data = response.data;
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
                
                var faction = ps2Utils.getFaction(outfit.leader.faction_id);
                model.factionTag = faction.factionTag;
                model.factionImage = faction.factionImage;

                deferred.resolve(model);
            })
            .catch(function(response) {
                deferred.reject(response.data || "Request failed");
            });

            return deferred.promise;
        }
        ,getMembers: function(id) {
            var deferred = $q.defer();
            
            $http
            .get(MEMBERS_URL, { params: { outfit_id: id, "c:limit": LIMIT } })
            .then(function(response) {
                var data = response.data;
                var members = processMembersData(data);
                deferred.resolve(members);
            })
            .catch(function(response) {
                deferred.reject(response.data || "Request failed");
            });
            
            return deferred.promise;
        }
        ,getOnlineMembers: function(id) {
            var deferred = $q.defer();
            
            $http
            .get(MEMBERS_ONLINE_URL, { params: { outfit_id: id, "c:limit": LIMIT } })
            .then(function(response) {
                var members = [];

                if (response.data && response.data.outfit_member_list) {
                    var outfit_member_list = response.data.outfit_member_list;

                    members = outfit_member_list
                        .filter(m => m.online_status !== "0")
                        .map(m => ({
                            character_id: m.character_id,
                            name: m.character.name.first,
                        }));
                }

                deferred.resolve(members);
            })
            .catch(function(response) {
                deferred.reject(response.data || "Request failed");
            });
            
            return deferred.promise;
        }
        ,fillMembersStats: function(id, members) {
            var deferred = $q.defer();
            
            $http
            .get(MEMBERS_STATS_URL, { params: { outfit_id: id, "c:limit": LIMIT_STATS } })
            .then(function(response) {
                var data = response.data;
                processMembersStatsData(members, data);
                deferred.resolve();
            })
            .catch(function(response) {
                deferred.reject(response.data || "Request failed");
            });
            
            return deferred.promise;
        }
    };
}]);
