angular
.module('character', ['ps2Utils'])
.factory('character',  function($q, $http, ps2Utils) {
    var CHARACTER_URL = "http://census.daybreakgames.com/get/ps2:v2/character/?";
    CHARACTER_URL += "c:join=characters_stat_history^list:1^inject_at:characters_stat_history";
    CHARACTER_URL += "&c:tree=start:characters_stat_history^field:stat_name";
    CHARACTER_URL += "&c:join=outfit_member^on:character_id^inject_at:outfit_member(outfit^inject_at:outfit)";
    CHARACTER_URL += "&c:join=characters_online_status^on:character_id^inject_at:characters_online_status^show:online_status";
    CHARACTER_URL += "&c:join=faction^inject_at:faction^show:image_path'code_tag";
    CHARACTER_URL += "&callback=JSON_CALLBACK";

    var KILLBOARD_URL = "http://census.daybreakgames.com/get/ps2:v2/characters_event/?type=KILL,DEATH";
    KILLBOARD_URL += "&c:join=character^show:character_id'name.first'battle_rank.value'faction_id^inject_at:character";
    KILLBOARD_URL += "(";
    KILLBOARD_URL += "characters_stat_history^on:character_id^terms:stat_name=kills^show:all_time'week.w01'week.w02^inject_at:stat_kills";
    KILLBOARD_URL += ",characters_stat_history^on:character_id^terms:stat_name=deaths^show:all_time'week.w01'week.w02^inject_at:stat_deaths";
    KILLBOARD_URL += ",characters_stat_history^on:character_id^terms:stat_name=score^show:all_time'week.w01'week.w02^inject_at:stat_score";
    KILLBOARD_URL += ",characters_stat_history^on:character_id^terms:stat_name=time^show:all_time'week.w01'week.w02^inject_at:stat_time";
    KILLBOARD_URL += ",outfit_member^show:outfit_id^inject_at:outfit(outfit^show:name'alias^inject_at:details)";
    KILLBOARD_URL += ")";
    KILLBOARD_URL += "&c:join=character^on:attacker_character_id^to:character_id^show:character_id'name.first'battle_rank.value'faction_id^inject_at:attacker_character";
    KILLBOARD_URL += "(";
    KILLBOARD_URL += "characters_stat_history^on:character_id^terms:stat_name=kills^show:all_time'week.w01'week.w02^inject_at:stat_kills";
    KILLBOARD_URL += ",characters_stat_history^on:character_id^terms:stat_name=deaths^show:all_time'week.w01'week.w02^inject_at:stat_deaths";
    KILLBOARD_URL += ",characters_stat_history^on:character_id^terms:stat_name=score^show:all_time'week.w01'week.w02^inject_at:stat_score";
    KILLBOARD_URL += ",characters_stat_history^on:character_id^terms:stat_name=time^show:all_time'week.w01'week.w02^inject_at:stat_time";
    KILLBOARD_URL += ",outfit_member^show:outfit_id^inject_at:outfit(outfit^show:name'alias^inject_at:details)";
    KILLBOARD_URL += ")";
    KILLBOARD_URL += "&c:join=item^on:attacker_weapon_id^to:item_id^show:name.en'image_path^inject_at:attacker_weapon";
    KILLBOARD_URL += "&c:join=vehicle^on:attacker_vehicle_id^to:vehicle_id^show:name.en'image_path^inject_at:attacker_vehicle";
    KILLBOARD_URL += "&callback=JSON_CALLBACK";

    var FRIENDS_URL = "http://census.daybreakgames.com/get/ps2:v2/characters_friend?"
    FRIENDS_URL += "c:join=character^on:friend_list.character_id^to:character_id^inject_at:character"
    FRIENDS_URL += "(";
    FRIENDS_URL += "faction^inject_at:faction^show:image_path'code_tag";
    FRIENDS_URL += ",characters_stat_history^on:character_id^inject_at:characters_stat_history^list:1"
    FRIENDS_URL += ",outfit_member^show:outfit_id^inject_at:outfit(outfit^show:name'alias^inject_at:details)"
    FRIENDS_URL += ")";
    FRIENDS_URL += "&callback=JSON_CALLBACK";

    var transform = function transform(census_result) {
        var raw = census_result.character_list[0];

        var character = {
            character_id: raw.character_id
          , name: raw.name.first
        };

        if(raw.outfit_member) {
            character.outfit = raw.outfit_member.outfit;
            if(character.outfit.alias) {
                character.outfit.label = "[" + character.outfit.alias + "] " + character.outfit.name;
            }
            else {
                character.outfit.label = character.outfit.name;
            }
        }

        if(raw.characters_online_status) {
            character.online = raw.characters_online_status.online_status;
        }

        character.faction_tag = raw.faction.code_tag.toLowerCase();
        character.faction_image = 'https://census.daybreakgames.com' + raw.faction.image_path;

        character.statistics = null;
        character.last_update = '';

        var characters_stat_history = raw.characters_stat_history;
        if(characters_stat_history) {
            character.statistics = ps2Utils.computeStatistics(characters_stat_history);
            character.last_update = characters_stat_history.score.last_save;
        }

        var rank = raw.battle_rank.value;
        character.rank = ps2Utils.getComputedRank(characters_stat_history.score.all_time);
        character.rank_image = 'https://census.daybreakgames.com' + ps2Utils.getRankImage(rank, character.faction_tag);

        return character;
    };

    var processKillboard = function processKillboard(census_result) {
        var events = [];
        _.forEach(census_result.characters_event_list, function(event) {
            var model = {};

            model.type = event.table_type;

            var character = event.character;
            if(model.type === 'deaths') {
                character = event.attacker_character;
            }

            model.suicide = 0;
            // remove suicide kills event, keep only the death one and mark it as suicide
            if(event.character_id === event.attacker_character_id) {
                if(model.type === "kills") {
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

            model.timestamp = event.timestamp;

            model.faction = "";
            if(character) {
                if(character.faction_id === "1") {
                    model.faction = "vs";
                }
                else if(character.faction_id === "2") {
                    model.faction = "nc";
                }
                else if(character.faction_id === "3") {
                    model.faction = "tr";
                }

                model.character_id = character.character_id;
                model.name = character.name.first;
                model.rank = ps2Utils.getComputedRank(character.stat_score.all_time);

                if(character.outfit) {
                  model.outfit = {
                    outfit_id: character.outfit.outfit_id
                    ,name: character.outfit.details.name
                    ,alias: character.outfit.details.alias
                  };

                  if(model.outfit.alias) {
                    model.outfit.label = "[" + model.outfit.alias + "] " + model.outfit.name;
                        }
                  else {
                    model.outfit.label = model.outfit.name;
                  }
                }

                model.kd = ratio(character.stat_kills, character.stat_deaths).toFixed(2);
                model.spm = (ratio(character.stat_score, character.stat_time) * 60).toFixed(0);
                model.kpm = (ratio(character.stat_kills, character.stat_time) * 60).toFixed(2);
            }

            if(event.attacker_weapon) {
                model.weapon = event.attacker_weapon.name.en;
            }

            if(event.attacker_vehicle) {
                model.vehicle = event.attacker_vehicle.name.en;
                if(model.weapon === model.vehicle) {
                    delete model.vehicle;
                }
            }

            model.css = model.faction;
            model.css += (model.type === 'deaths' ? ' active': '');
            model.css += (model.suicide ? ' suicide' : '');
            model.css += (model.headshot ? ' headshot' : '');

            events.push(model);
        });

        return events;
    };

    var processFriends = function processFriends(data) {
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

            character.statistics = ps2Utils.computeStatistics(characters_stat_history);
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

            character.rank = ps2Utils.getComputedRank(characters_stat_history.score.all_time);

            character.last_update = characters_stat_history.score ? characters_stat_history.score.last_save : "";

            friends.push(character);
        });

        friends.sort(function(left, right) {
            var diff = left.characters_online_status == right.characters_online_status ? 0 : (left.characters_online_status < right.characters_online_status ? 1 : -1)
            if(diff !== 0) return diff;
            return left.name.first_lower == right.name.first_lower ? 0 : (left.name.first_lower < right.name.first_lower ? -1 : 1)
        });

        return friends;
    }

    var ratio = function ratio(stat1, stat2) {
        var ratio = 0;
        if(stat1 && stat2) {
            var sumstat1 = parseInt(stat1.week.w01) + parseInt(stat1.week.w02);
            var sumstat2 = parseInt(stat2.week.w01) + parseInt(stat2.week.w02);

            if(sumstat2 == 0) sumstat2 = 1;
            
            ratio = sumstat1 / sumstat2;
        }
        return ratio;
    };

    return {
        get: function(id) {
            var deferred = $q.defer();

            $http
            .jsonp(CHARACTER_URL, { params: { character_id: id } })
            .success(function(result, status) {
                if(result.error) return deferred.reject(result.error);
                deferred.resolve(transform(result));
            })
            .error(function(data, status) {
                deferred.reject(data || "Request failed");
            });

            return deferred.promise;
        }
        ,getKillboard: function(id, limit) {
            var deferred = $q.defer();

            $http
            .jsonp(KILLBOARD_URL, { params: { character_id: id, 'c:limit': limit } })
            .success(function(result, status) {
                if(result.error) return deferred.reject(result.error);
                deferred.resolve(processKillboard(result));
            })
            .error(function(data, status) {
                deferred.reject(data || "Request failed");
            });

            return deferred.promise;
        }
        ,getFriends: function(id) {
            var deferred = $q.defer();

            $http
            .jsonp(FRIENDS_URL, { params: { character_id: id } })
            .success(function(result, status) {
                if(result.error) return deferred.reject(result.error);
                deferred.resolve(processFriends(result));
            })
            .error(function(data, status) {
                deferred.reject(data || "Request failed");
            });

            return deferred.promise;
        }
  }
});
