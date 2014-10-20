(function() {

    var computeStatistics = function(stats) {
        var stats2 = {
            time: { all_time: 0, monthly: 0, weekly: 0, daily: 0}
          , score: { all_time: 0, monthly: 0, weekly: 0, daily: 0}
          , kills: { all_time: 0, monthly: 0, weekly: 0, daily: 0}
          , deaths: { all_time: 0, monthly: 0, weekly: 0, daily: 0}
          , kdr: { all_time: 0, monthly: 0, weekly: 0, daily: 0}
          , spm: { all_time: 0, monthly: 0, weekly: 0, daily: 0}
          , kpm: { all_time: 0, monthly: 0, weekly: 0, daily: 0}
        }
        
        if(!stats.time) return stats2;
        
        stats2.time.all_time = stats.time.all_time*1;
        stats2.score.all_time = stats.score.all_time*1;
        stats2.kills.all_time = stats.kills.all_time*1;
        stats2.deaths.all_time = stats.deaths.all_time*1;
        
        var sum_time = 0;
        var sum_score = 0;
        var sum_kills = 0;
        var sum_deaths = 0;
        var start = 0;
        
        // gather daily, weekly & monthly metrics
        for(var i = 1; i<=31; ++i) {
            if(i < 10) {
                var str_i = 'd0' + i;
            }
            else {
                var str_i = 'd' + i;
            }
            
            sum_time += stats.time.day[str_i]*1;
            sum_score += stats.score.day[str_i]*1;
            sum_kills += stats.kills.day[str_i]*1;
            sum_deaths += stats.deaths.day[str_i]*1;
            
            var period = "";
            if(i === 1) {
                period = 'daily';
            }
            else if(i === 7) {
                period = 'weekly';
            }
            else if(i === 31) {
                period = 'monthly';
            }
            
            if(period) {
                stats2.time[period] = sum_time;
                stats2.score[period] = sum_score;
                stats2.kills[period] = sum_kills;
                stats2.deaths[period] = sum_deaths;
            }
        }
        
        // compute kdr, spm & kpm
        for(var period in stats2.time) {
            var time = stats2.time[period] / 60;
            var score = stats2.score[period];
            var kills = stats2.kills[period];
            var deaths = stats2.deaths[period];
            
            if (deaths == 0) deaths = 1;
            if (time == 0) time = 1;
            
            stats2.kdr[period] = (kills / deaths).toFixed(2);
            stats2.spm[period] = (score / time).toFixed(0);
            stats2.kpm[period] = (kills / time).toFixed(2);
        }
        
        return stats2;
    };

    if(!window.ps2) window.ps2 = {};
    window.ps2.stats = {
        compute: computeStatistics
    };

})();