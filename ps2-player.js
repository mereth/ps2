(function() {
    var self = this;
    var character_id = $.url().param('id')
    
    var url = "http://census.daybreakgames.com/get/ps2:v2/character/?";
    url += "c:join=characters_stat_history^list:1^inject_at:characters_stat_history";
    url += "&c:tree=start:characters_stat_history^field:stat_name";
    url += "&c:join=outfit_member^on:character_id^inject_at:outfit_member(outfit^inject_at:outfit)";
    url += "&c:join=characters_online_status^on:character_id^inject_at:characters_online_status^show:online_status"
    url += "&c:join=faction^inject_at:faction^show:image_path'code_tag"
    url += "&callback=?";
    
    var viewModel = {
        characterId: ko.observable()
      , name: ko.observable('')
      , rank: ko.observable('')
      , rankImage: ko.observable('')
      , online: ko.observable('')
      
      , factionTag: ko.observable('')
      , factionImage: ko.observable('')
      
      , outfitId: ko.observable()
      , outfitName: ko.observable('')
      , outfitAlias: ko.observable('')
      
      , statistics: ko.observable(null)
      , lastUpdate: ko.observable('')
    };
    
    viewModel.name.subscribe(function(value) {
        document.title = value;
    });
    
    var getCharacter = function() {
        $.getJSON(url, { character_id: viewModel.characterId() }, build);
    };
    
    var build = function build(census_result) {
        var character = census_result.character_list[0];
        
        viewModel.name(character.name.first);
        
        if(character.outfit_member) {
            var outfit = character.outfit_member.outfit
            viewModel.outfitId(outfit.outfit_id);
            viewModel.outfitName(outfit.name);
            viewModel.outfitAlias(outfit.alias);
        }
        
        if(character.characters_online_status) {
            viewModel.online(character.characters_online_status.online_status);
        }
        
        viewModel.factionTag(character.faction.code_tag.toLowerCase());
        viewModel.factionImage('https://census.daybreakgames.com' + character.faction.image_path);
        
        viewModel.statistics(null);
        viewModel.lastUpdate('');
        
        var characters_stat_history = character.characters_stat_history;
        if(characters_stat_history) {
            viewModel.statistics(ps2.util.computeStatistics(characters_stat_history));
            viewModel.lastUpdate(ps2.util.getLastUpdateString(characters_stat_history.score.last_save));
        }
        
        var rank = character.battle_rank.value;
        viewModel.rank(ps2.util.getComputedRank(characters_stat_history.score.all_time));
        viewModel.rankImage('https://census.daybreakgames.com' + ps2.util.getRankImage(rank, viewModel.factionTag()));
    }
    
    viewModel.outfit = ko.computed(function() {
        var outfit = viewModel.outfitName();
        var alias = viewModel.outfitAlias();
        if(alias) {
            outfit = "[" + alias + "] " + outfit;
        }
        return outfit;
    });
    
    if(!window.ps2) window.ps2 = {};
    window.ps2.player = {
        update: function(id) {
            viewModel.characterId(id);
            getCharacter();
        }
    };
    
    ps2.player.update(character_id);
    $(function() {
        ko.applyBindings(viewModel, document.getElementById('player'));
    });
})();
