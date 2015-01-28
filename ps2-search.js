(function() {
    var term = $.url().param('term');
    
    var worldURL = "http://census.soe.com/get/ps2:v2/world/?c:limit=50&callback=?";
    var outfitURL = "http://census.soe.com/get/ps2:v2/outfit/?c:join=character^on:leader_character_id^to:character_id^inject_at:leader^show:faction_id'world(characters_world^inject_at:world)&callback=?";
    var characterURL = "http://census.soe.com/get/ps2:v2/character/?c:join=characters_world^inject_at:world&c:show=character_id,name,battle_rank,world,faction_id&callback=?";

    var viewModel = {
        search: ko.observable(term)
      , searching: ko.observable(false)
      , limit: ko.observable(20)
    
      , worlds: ko.observableArray()
      , characters: ko.observableArray()
      , outfits: ko.observableArray()
      
      , worldsMap: {}
      , getWorldLabel: function(id) {
            var world = viewModel.worldsMap[id];
            if(world)
                return world.name + ' (' + world.region + ')';
            else
                return "";
      }
    };
    
    var processResult = function(result) {
        var srcArray;
        var destArray;
        if(result.character_list) {
            srcArray = result.character_list;
            destArray = viewModel.characters;
        }
        else {
            srcArray = result.outfit_list;
            destArray = viewModel.outfits;
        }
        
        for(var i = 0; i < srcArray.length; ++i) {
            var src = srcArray[i];
            destArray.push(src);
        }
    };
    
    var processWorldList = function(result) {
        var array = result.world_list;
        for(var i = 0; i < array.length; ++i) {
            var world = array[i];
            
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
            
            var world2 = {
                id: world.world_id
              , name: world.name.en
              , region: region
            };
            
            viewModel.worlds.push(world2);
            viewModel.worldsMap[world2.id] = world2;
        }
    };
    
    viewModel.submit = function() {
        if(viewModel.searching()) return;
        
        var search = viewModel.search();
        search = search.toLowerCase();
        regexSearch = '^' + search;
        
        var limit = viewModel.limit() + 1;
        
        viewModel.characters.removeAll();
        viewModel.outfits.removeAll();
        
        viewModel.searching(true);
        
        var prmAll;
        
        // SOE API hard limit to 3 with regex
        if(search.length > 2) {
            var prmChars = $.getJSON(characterURL, { "name.first_lower": regexSearch, "c:limit": limit }, processResult);
            
            //TODO: fix duplicates and size limit
            var prmOutfits = $.getJSON(outfitURL, { "name_lower": regexSearch, "c:limit": limit }, processResult);
            var prmOutfits2 = $.getJSON(outfitURL, { "alias_lower": regexSearch, "c:limit": limit }, processResult);
            
            prmAll = $.when(prmChars, prmOutfits, prmOutfits2);
        }
        else {
            prmAll = $.getJSON(outfitURL, { "alias_lower": search, "c:limit": limit }, processResult);
        }
        
        prmAll.always(function() {
            viewModel.searching(false);
        });
    };
    
    var prmWorlds = $.getJSON(worldURL, processWorldList);
    
    $(function() {
        ko.applyBindings(viewModel);
        
        $("#search").on("keyup", "input", function(e) {
            if (e.which === 13) {
                $("#search button").trigger('click');
            }
        });
        
        if(viewModel.search()) {
            $("#search button").trigger('click');
        }
    });
})();