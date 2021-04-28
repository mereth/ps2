var { DateTime, Duration } = require('luxon');
var { Grid } = require('ag-grid-community');

var formatDuration = function formatDuration(seconds) {
    if (seconds == null) {
        return;
    }
    
    var m = Duration.fromObject({ seconds: seconds })
        .shiftTo('days', 'hours', 'minutes', 'seconds', 'milliseconds');

    var str = "";
    var count = 2;
    var days = Math.floor(m.days);
    if(days > 0) {
        str = str + days + "d ";
        count--;
    }
    if(m.hours > 0) {
        str = str + Math.floor(m.hours) + "h ";
        if(--count === 0) return str;
    }
    if(m.minutes > 0) {
        str = str + Math.floor(m.minutes) + "m ";
        if(--count === 0) return str;
    }
    if(m.seconds > 0) {
        str = str + Math.floor(m.seconds) + "s ";
        if(--count === 0) return str;
    }

    return str;
};

var toRelative = function toRelative(timestamp) {
    return DateTime.fromSeconds(Number(timestamp)).toRelative();
}

angular
.module('ps2Controllers', ['search', 'outfit', 'character'])

.controller('mainController', ['$scope', '$routeParams', 'search', function($scope, $routeParams, search) {
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
}])

.controller('searchController', ['$scope', '$location', function($scope, $location) {
    $scope.term = '';
    $scope.submit = function() {
        $location.path('/').search({term: $scope.term});
    };
}])

.controller('outfitController', ['$scope', '$rootScope', '$routeParams', 'outfit', function($scope, $rootScope, $routeParams, outfit) {
    var id = $routeParams.id;

    $scope.period = 'weekly';

    const gridOptions = {
        domLayout: 'autoHeight',
        defaultColDef: {
            sortable: true
        },
        columnDefs: [
            {
                headerName: 'Name',
                field: 'name.first',
                filter: 'agTextColumnFilter',
                cellRenderer: function(params) {
                    return '<a href="#/character/' + params.data.character_id + '">'+ params.value + '</a>'
                }
            },
            {
                headerName: 'Online Status',
                field: 'characters_online_status',
                filter: 'agTextColumnFilter',
                cellRenderer: function(params) {
                    return params.value == "0" ?
                        '<span class="circle" style="background-color: #f00"></span> (' + params.value + ')' :
                        '<span class="circle" style="background-color: #0f0"></span> (' + params.value + ')'
                }
            },
            { headerName: 'Outfit Rank', field: 'outfitRank', filter: 'agTextColumnFilter' },
            { headerName: 'Rank', field: 'rank', type: 'rightAligned' },
            { colId: 'time', headerName: 'Played', field: 'statistics.time.weekly', type: 'rightAligned', valueFormatter: function(params) { return formatDuration(params.value); } },
            { colId: 'score', headerName: 'Score', field: 'statistics.score.weekly', type: 'rightAligned', valueFormatter: function(params) { return params.value != null ? params.value.toLocaleString() : null; } },
            { colId: 'kills', headerName: 'Kills', field: 'statistics.kills.weekly', type: 'rightAligned', valueFormatter: function(params) { return params.value != null ? params.value.toLocaleString() : null; } },
            { colId: 'deaths', headerName: 'Deaths', field: 'statistics.deaths.weekly', type: 'rightAligned', valueFormatter: function(params) { return params.value != null ? params.value.toLocaleString() : null; } },
            { colId: 'kdr', headerName: 'K/D', field: 'statistics.kdr.weekly', type: 'rightAligned', valueFormatter: function(params) { return params.value != null ? params.value.toFixed(2) : null; } },
            { colId: 'spm', headerName: 'SPM', field: 'statistics.spm.weekly', type: 'rightAligned' },
            { colId: 'kpm', headerName: 'KPM', field: 'statistics.kpm.weekly', type: 'rightAligned', valueFormatter: function(params) { return params.value != null ? params.value.toFixed(2) : null; } },
            { colId: 'last_update', headerName: 'LastUpdate', field: 'last_update', type: 'rightAligned', valueFormatter: function(params) { return toRelative(params.value); } },
        ]
    };

    var eGridDiv = document.querySelector('#myGrid');
    new Grid(eGridDiv, gridOptions);

    outfit.get(id).then(function(outfit) {
        $scope.outfit = outfit;
        $rootScope.title = outfit.name;
    });
    
    outfit.getMembers(id).then(function(members) {
        $scope.members = members;
        gridOptions.api.setRowData($scope.members);
        gridOptions.api.sizeColumnsToFit();
        return outfit.fillMembersStats(id, members);
    })
    .then(function() {
        gridOptions.api.setRowData($scope.members);
        gridOptions.api.sizeColumnsToFit();
    });

    $scope.$watch('period', function(newVal, oldVal) {
        if (newVal != oldVal) {
            var colDefs = gridOptions.api.getColumnDefs();
            colDefs.forEach(function (coldDef) {
                coldDef.field = coldDef.field.replace(oldVal, newVal);
            });
            gridOptions.api.setColumnDefs(colDefs);
            gridOptions.api.setRowData($scope.members);
        };
    });

    $scope.$on('$destroy', function() {
        if (gridOptions.api) {
            gridOptions.api.destroy();
        }
    });
}])

.controller('outfitOnlineController', ['$scope', '$rootScope', '$routeParams', 'outfit', function($scope, $rootScope, $routeParams, outfit) {
    $scope.outfit_id = $routeParams.id;
    $scope.members = [];
    $scope.loading = true;
    outfit.getOnlineMembers($scope.outfit_id).then(function(members) {
        $scope.members = members.sort(function (a, b) { return a.name.localeCompare(b.name) });
        $scope.lastRefresh = new Date();
        $scope.loading = false;
    })

    var intervalId = setInterval(function() {
        outfit.getOnlineMembers($scope.outfit_id).then(function(members) {
            $scope.members = members.sort(function (a, b) { return a.name.localeCompare(b.name) });
            $scope.lastRefresh = new Date();
        })
    }, 5 * 60 * 1000);

    $scope.$on('$destroy', function() {
        clearInterval(intervalId);
    });
}])

.controller('characterController', ['$scope', '$rootScope', '$routeParams', '$document', 'character', function($scope, $rootScope, $routeParams, $document, character) {
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
}])

.controller('friendsController', ['$scope', '$rootScope', '$routeParams', 'character', function($scope, $rootScope, $routeParams, character) {
    var id = $routeParams.id;

    $scope.period = 'weekly';

    character.get(id).then(function(character) {
        $scope.character = character;
        $rootScope.title = character.name;
    });

    character.getFriends(id).then(function(friends) {
        $scope.friends = friends;
    });
}])

.filter('formatDuration', function() {
    return formatDuration;
})

.filter('formatTimestamp', function() {
    var limit = DateTime.now().minus({ month: 1 });
    return function(timestamp) {
        var time = DateTime.fromSeconds(Number(timestamp));

        if(time > limit)
            return time.toFormat("LLL d, HH:mm:ss");
        else
            return time.toLocaleString(DateTime.DATE_MED);
    }
})

.filter('toRelative', function() {
    return toRelative;
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
