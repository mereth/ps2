angular
.module('ps2Controllers', ['search', 'outfit', 'character'])

.controller('mainController', function($scope, $routeParams, search) {
    $scope.term = $routeParams.term;
    $scope.limit = search.getLimit();

    search.getWorlds().then(function(worlds) {
        $scope.worlds = worlds;
    });

    $scope.submit = function() {
        search.findCharacters($scope.term).then(function(characters) {
            $scope.characters = characters;
        });
        search.findOutfits($scope.term).then(function(outfits) {
            $scope.outfits = outfits;
        });
    };

    if($scope.term) {
        $scope.submit();
    }
})

.controller('searchController', function($scope, $location) {
    $scope.term = '';
    $scope.submit = function() {
        $location.path('/').search({term: $scope.term});
    };
})

.controller('outfitController', function($scope, $rootScope, $routeParams, outfit) {
    var id = $routeParams.id;

    $scope.period = 'weekly';

    outfit.get(id).then(function(outfit) {
        $scope.outfit = outfit;
        $rootScope.title = outfit.name;
    });
    
    outfit.getMembers(id).then(function(members) {
        $scope.members = members;

        return outfit.fillMembersStats(id, members);
    });
})

.controller('characterController', function($scope, $rootScope, $routeParams, character) {
    var id = $routeParams.id;

    $scope.limit = 100;
    $scope.getMore = function() {
        $scope.limit += 100;
        character.getKillboard(id, $scope.limit).then(function(events) {
            $scope.events = events;
        });
    };

    character.get(id).then(function(character) {
        $scope.character = character;
        $rootScope.title = character.name;
    });

    character.getKillboard(id, $scope.limit).then(function(events) {
        $scope.events = events;
    });
})

.controller('friendsController', function($scope, $rootScope, $routeParams, character) {
    var id = $routeParams.id;

    $scope.period = 'weekly';

    character.get(id).then(function(character) {
        $scope.character = character;
        $rootScope.title = character.name;
    });

    character.getFriends(id).then(function(friends) {
        $scope.friends = friends;
    });
})

.filter('formatDuration', function() {
    return function(seconds) {
        var m = moment.duration(seconds, 's');

        var str = "";
        var count = 2;
        var days = Math.floor(m.asDays());
        if(days > 0) {
            str = str + days + "d ";
            count--;
        }
        if(m.hours() > 0) {
            str = str + Math.floor(m.hours()) + "h ";
            if(--count === 0) return str;
        }
        if(m.minutes() > 0) {
            str = str + Math.floor(m.minutes()) + "m ";
            if(--count === 0) return str;
        }
        if(m.seconds() > 0) {
            str = str + Math.floor(m.seconds()) + "s ";
            if(--count === 0) return str;
        }

        return str;
    };
})

.filter('formatTimestamp', function() {
    var limit = moment().subtract(1, 'months');
    return function(timestamp) {
        var m = moment.unix(timestamp);

        if(m.isAfter(limit))
            return moment.unix(timestamp).format("MMM D, HH:mm:ss");
        else
            return moment.unix(timestamp).format("YYYY MMM D");
    }
})

.filter('formatTimestamp2', function() {
    return function(timestamp) {
        return moment.unix(timestamp).fromNow();
    }
})

.filter('factionCode', function() {
    return function(factionId) {
        var code;
        switch(factionId) {
            case '1':
                code = 'vs';
                break;
            case '2':
                code = 'nc';
                break;
            case '3':
                code = 'tr';
                break;
            default:
                code = 'unkwown';
        }
        return code;
    };
})
;
