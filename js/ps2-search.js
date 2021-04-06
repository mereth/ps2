angular
.module('search', ['ps2Utils'])
.factory('search', ['$q', '$http', 'ps2Utils', function($q, $http, ps2Utils) {
    var WORLD_URL = "http://census.daybreakgames.com/s:mereth/get/ps2:v2/world/?c:limit=50";
    var OUTFIT_URL = "http://census.daybreakgames.com/s:mereth/get/ps2:v2/outfit/?c:join=character^on:leader_character_id^to:character_id^inject_at:leader^show:faction_id'world(characters_world^inject_at:world)";
    var CHARACTER_URL = "http://census.daybreakgames.com/s:mereth/get/ps2:v2/character/?c:join=characters_world^inject_at:world&c:show=character_id,name,battle_rank,world,faction_id";

    var LIMIT = 20;

    var processResult = function(result) {
        var srcArray;
        var destArray = [];
        if(result.character_list) {
            srcArray = result.character_list;
        }
        else {
            srcArray = result.outfit_list;
        }

        for(var i = 0; i < srcArray.length; ++i) {
            var src = srcArray[i];
            destArray.push(src);
        }

        return destArray;
    };

    var processWorldList = function(result) {
        var worlds = [];

        _.forEach(result.world_list, function(world) {
            var region = "?";
            if(world.world_id === "10" || world.world_id === "13") {
                region = "EU";
            }
            else if(world.world_id === "1" || world.world_id === "17") {
                region = "US";
            }
            else if(world.world_id === "25") {
                region = "AU";
            }

            worlds[world.world_id] = {
                id: world.world_id
              , name: world.name.en
              , region: region
              , label: world.name.en + ' (' + region + ')'
            };
        });

        return worlds;
    };

    var filterTerm = function(term) {
        return term.trim().toLowerCase();
    };

    return {
        findCharacters: function(term) {
            var deferred = $q.defer();

            term = '*' + filterTerm(term);

            $http
            .get(CHARACTER_URL, { params: { "name.first_lower": term, "c:limit": LIMIT+1 } })
            .success(function(result, status) {
                if(result.error) {
                    deferred.reject(result.error);
                    return;
                }
                deferred.resolve(processResult(result));
            })
            .error(function(data, status) {
                deferred.reject(data || "Request failed");
            });

            return deferred.promise;
        }
      , findOutfits: function(term) {
            var deferred = $q.defer();

            var searchParams = {
                "c:limit": LIMIT+1
            };

            term = filterTerm(term);
            var nbchars = term.length;
            if(term.indexOf('[') == 0 && term.lastIndexOf(']') == nbchars-1) {
                // exact tag search
                searchParams.alias_lower = term.substr(1, nbchars-2);
            }
            else {
                // name search
                searchParams.name_lower = '*' + term;
            }

            $http
            .get(OUTFIT_URL, { params: searchParams })
            .success(function(result, status) {
                if(result.error) {
                    deferred.reject(result.error);
                    return;
                }
                deferred.resolve(processResult(result));
            })
            .error(function(data, status) {
                deferred.reject(data || "Request failed");
            });

            return deferred.promise;
        }
      , getWorlds: function() {
            var deferred = $q.defer();

            $http
            .get(WORLD_URL)
            .success(function(result, status) {
                if(result.error) {
                    deferred.reject(result.error);
                    return;
                }
                deferred.resolve(processWorldList(result));
            })
            .error(function(data, status) {
                deferred.reject(data || "Request failed");
            });

            return deferred.promise;
        }
      , getLimit: function() {
            return LIMIT;
      }
    }
}]);
