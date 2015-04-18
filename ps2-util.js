(function() {
    
    var ranks = {"1":{"nc_image_path":"/files/ps2/images/static/4067.png","tr_image_path":"/files/ps2/images/static/4066.png","vs_image_path":"/files/ps2/images/static/4065.png","xp_max":0},"10":{"nc_image_path":"/files/ps2/images/static/4092.png","tr_image_path":"/files/ps2/images/static/4093.png","vs_image_path":"/files/ps2/images/static/4094.png","xp_max":40875},"100":{"nc_image_path":"/files/ps2/images/static/4364.png","tr_image_path":"/files/ps2/images/static/4362.png","vs_image_path":"/files/ps2/images/static/4363.png","xp_max":18868950},"11":{"nc_image_path":"/files/ps2/images/static/4096.png","tr_image_path":"/files/ps2/images/static/4097.png","vs_image_path":"/files/ps2/images/static/4095.png","xp_max":54375},"12":{"nc_image_path":"/files/ps2/images/static/4099.png","tr_image_path":"/files/ps2/images/static/4100.png","vs_image_path":"/files/ps2/images/static/4098.png","xp_max":69000},"13":{"nc_image_path":"/files/ps2/images/static/4102.png","tr_image_path":"/files/ps2/images/static/4103.png","vs_image_path":"/files/ps2/images/static/4101.png","xp_max":84750},"14":{"nc_image_path":"/files/ps2/images/static/4105.png","tr_image_path":"/files/ps2/images/static/4106.png","vs_image_path":"/files/ps2/images/static/4104.png","xp_max":101625},"15":{"nc_image_path":"/files/ps2/images/static/4108.png","tr_image_path":"/files/ps2/images/static/4109.png","vs_image_path":"/files/ps2/images/static/4107.png","xp_max":119625},"16":{"nc_image_path":"/files/ps2/images/static/4111.png","tr_image_path":"/files/ps2/images/static/4112.png","vs_image_path":"/files/ps2/images/static/4110.png","xp_max":142125},"17":{"nc_image_path":"/files/ps2/images/static/4113.png","tr_image_path":"/files/ps2/images/static/4115.png","vs_image_path":"/files/ps2/images/static/4114.png","xp_max":165750},"18":{"nc_image_path":"/files/ps2/images/static/4116.png","tr_image_path":"/files/ps2/images/static/4118.png","vs_image_path":"/files/ps2/images/static/4117.png","xp_max":190500},"19":{"nc_image_path":"/files/ps2/images/static/4119.png","tr_image_path":"/files/ps2/images/static/4121.png","vs_image_path":"/files/ps2/images/static/4120.png","xp_max":216375},"2":{"nc_image_path":"/files/ps2/images/static/4070.png","tr_image_path":"/files/ps2/images/static/4069.png","vs_image_path":"/files/ps2/images/static/4068.png","xp_max":375},"20":{"nc_image_path":"/files/ps2/images/static/4123.png","tr_image_path":"/files/ps2/images/static/4124.png","vs_image_path":"/files/ps2/images/static/4122.png","xp_max":243375},"21":{"nc_image_path":"/files/ps2/images/static/4126.png","tr_image_path":"/files/ps2/images/static/4127.png","vs_image_path":"/files/ps2/images/static/4125.png","xp_max":279375},"22":{"nc_image_path":"/files/ps2/images/static/4129.png","tr_image_path":"/files/ps2/images/static/4130.png","vs_image_path":"/files/ps2/images/static/4128.png","xp_max":316500},"23":{"nc_image_path":"/files/ps2/images/static/4132.png","tr_image_path":"/files/ps2/images/static/4131.png","vs_image_path":"/files/ps2/images/static/4133.png","xp_max":354750},"24":{"nc_image_path":"/files/ps2/images/static/4135.png","tr_image_path":"/files/ps2/images/static/4134.png","vs_image_path":"/files/ps2/images/static/4136.png","xp_max":394125},"25":{"nc_image_path":"/files/ps2/images/static/4138.png","tr_image_path":"/files/ps2/images/static/4137.png","vs_image_path":"/files/ps2/images/static/4139.png","xp_max":434625},"26":{"nc_image_path":"/files/ps2/images/static/4140.png","tr_image_path":"/files/ps2/images/static/4142.png","vs_image_path":"/files/ps2/images/static/4141.png","xp_max":488625},"27":{"nc_image_path":"/files/ps2/images/static/4143.png","tr_image_path":"/files/ps2/images/static/4145.png","vs_image_path":"/files/ps2/images/static/4144.png","xp_max":543750},"28":{"nc_image_path":"/files/ps2/images/static/4146.png","tr_image_path":"/files/ps2/images/static/4148.png","vs_image_path":"/files/ps2/images/static/4147.png","xp_max":600000},"29":{"nc_image_path":"/files/ps2/images/static/4150.png","tr_image_path":"/files/ps2/images/static/4151.png","vs_image_path":"/files/ps2/images/static/4149.png","xp_max":657375},"3":{"nc_image_path":"/files/ps2/images/static/4073.png","tr_image_path":"/files/ps2/images/static/4072.png","vs_image_path":"/files/ps2/images/static/4071.png","xp_max":1500},"30":{"nc_image_path":"/files/ps2/images/static/4153.png","tr_image_path":"/files/ps2/images/static/4154.png","vs_image_path":"/files/ps2/images/static/4152.png","xp_max":715875},"31":{"nc_image_path":"/files/ps2/images/static/4156.png","tr_image_path":"/files/ps2/images/static/4157.png","vs_image_path":"/files/ps2/images/static/4155.png","xp_max":787875},"32":{"nc_image_path":"/files/ps2/images/static/4158.png","tr_image_path":"/files/ps2/images/static/4160.png","vs_image_path":"/files/ps2/images/static/4159.png","xp_max":861000},"33":{"nc_image_path":"/files/ps2/images/static/4161.png","tr_image_path":"/files/ps2/images/static/4163.png","vs_image_path":"/files/ps2/images/static/4162.png","xp_max":935250},"34":{"nc_image_path":"/files/ps2/images/static/4164.png","tr_image_path":"/files/ps2/images/static/4166.png","vs_image_path":"/files/ps2/images/static/4165.png","xp_max":1010625},"35":{"nc_image_path":"/files/ps2/images/static/4167.png","tr_image_path":"/files/ps2/images/static/4168.png","vs_image_path":"/files/ps2/images/static/4169.png","xp_max":1087125},"36":{"nc_image_path":"/files/ps2/images/static/4170.png","tr_image_path":"/files/ps2/images/static/4171.png","vs_image_path":"/files/ps2/images/static/4172.png","xp_max":1177125},"37":{"nc_image_path":"/files/ps2/images/static/4173.png","tr_image_path":"/files/ps2/images/static/4174.png","vs_image_path":"/files/ps2/images/static/4175.png","xp_max":1268250},"38":{"nc_image_path":"/files/ps2/images/static/4178.png","tr_image_path":"/files/ps2/images/static/4177.png","vs_image_path":"/files/ps2/images/static/4176.png","xp_max":1360500},"39":{"nc_image_path":"/files/ps2/images/static/4181.png","tr_image_path":"/files/ps2/images/static/4180.png","vs_image_path":"/files/ps2/images/static/4179.png","xp_max":1453875},"4":{"nc_image_path":"/files/ps2/images/static/4075.png","tr_image_path":"/files/ps2/images/static/4076.png","vs_image_path":"/files/ps2/images/static/4074.png","xp_max":3750},"40":{"nc_image_path":"/files/ps2/images/static/4184.png","tr_image_path":"/files/ps2/images/static/4183.png","vs_image_path":"/files/ps2/images/static/4182.png","xp_max":1548375},"41":{"nc_image_path":"/files/ps2/images/static/4187.png","tr_image_path":"/files/ps2/images/static/4186.png","vs_image_path":"/files/ps2/images/static/4185.png","xp_max":1656375},"42":{"nc_image_path":"/files/ps2/images/static/4188.png","tr_image_path":"/files/ps2/images/static/4190.png","vs_image_path":"/files/ps2/images/static/4189.png","xp_max":1765500},"43":{"nc_image_path":"/files/ps2/images/static/4191.png","tr_image_path":"/files/ps2/images/static/4193.png","vs_image_path":"/files/ps2/images/static/4192.png","xp_max":1875750},"44":{"nc_image_path":"/files/ps2/images/static/4194.png","tr_image_path":"/files/ps2/images/static/4196.png","vs_image_path":"/files/ps2/images/static/4195.png","xp_max":1987125},"45":{"nc_image_path":"/files/ps2/images/static/4197.png","tr_image_path":"/files/ps2/images/static/4199.png","vs_image_path":"/files/ps2/images/static/4198.png","xp_max":2099625},"46":{"nc_image_path":"/files/ps2/images/static/4201.png","tr_image_path":"/files/ps2/images/static/4202.png","vs_image_path":"/files/ps2/images/static/4200.png","xp_max":2230125},"47":{"nc_image_path":"/files/ps2/images/static/4204.png","tr_image_path":"/files/ps2/images/static/4205.png","vs_image_path":"/files/ps2/images/static/4203.png","xp_max":2361750},"48":{"nc_image_path":"/files/ps2/images/static/4207.png","tr_image_path":"/files/ps2/images/static/4208.png","vs_image_path":"/files/ps2/images/static/4206.png","xp_max":2494500},"49":{"nc_image_path":"/files/ps2/images/static/4210.png","tr_image_path":"/files/ps2/images/static/4211.png","vs_image_path":"/files/ps2/images/static/4209.png","xp_max":2628375},"5":{"nc_image_path":"/files/ps2/images/static/4078.png","tr_image_path":"/files/ps2/images/static/4079.png","vs_image_path":"/files/ps2/images/static/4077.png","xp_max":7125},"50":{"nc_image_path":"/files/ps2/images/static/4213.png","tr_image_path":"/files/ps2/images/static/4214.png","vs_image_path":"/files/ps2/images/static/4212.png","xp_max":2763375},"51":{"nc_image_path":"/files/ps2/images/static/4215.png","tr_image_path":"/files/ps2/images/static/4216.png","vs_image_path":"/files/ps2/images/static/4217.png","xp_max":2916375},"52":{"nc_image_path":"/files/ps2/images/static/4218.png","tr_image_path":"/files/ps2/images/static/4219.png","vs_image_path":"/files/ps2/images/static/4220.png","xp_max":3070500},"53":{"nc_image_path":"/files/ps2/images/static/4221.png","tr_image_path":"/files/ps2/images/static/4222.png","vs_image_path":"/files/ps2/images/static/4223.png","xp_max":3225750},"54":{"nc_image_path":"/files/ps2/images/static/4224.png","tr_image_path":"/files/ps2/images/static/4225.png","vs_image_path":"/files/ps2/images/static/4226.png","xp_max":3382125},"55":{"nc_image_path":"/files/ps2/images/static/4227.png","tr_image_path":"/files/ps2/images/static/4228.png","vs_image_path":"/files/ps2/images/static/4229.png","xp_max":3539625},"56":{"nc_image_path":"/files/ps2/images/static/4230.png","tr_image_path":"/files/ps2/images/static/4231.png","vs_image_path":"/files/ps2/images/static/4232.png","xp_max":3715125},"57":{"nc_image_path":"/files/ps2/images/static/4233.png","tr_image_path":"/files/ps2/images/static/4234.png","vs_image_path":"/files/ps2/images/static/4235.png","xp_max":3891750},"58":{"nc_image_path":"/files/ps2/images/static/4236.png","tr_image_path":"/files/ps2/images/static/4237.png","vs_image_path":"/files/ps2/images/static/4238.png","xp_max":4069500},"59":{"nc_image_path":"/files/ps2/images/static/4239.png","tr_image_path":"/files/ps2/images/static/4240.png","vs_image_path":"/files/ps2/images/static/4241.png","xp_max":4248375},"6":{"nc_image_path":"/files/ps2/images/static/4082.png","tr_image_path":"/files/ps2/images/static/4081.png","vs_image_path":"/files/ps2/images/static/4080.png","xp_max":11625},"60":{"nc_image_path":"/files/ps2/images/static/4242.png","tr_image_path":"/files/ps2/images/static/4243.png","vs_image_path":"/files/ps2/images/static/4244.png","xp_max":4428375},"61":{"nc_image_path":"/files/ps2/images/static/4246.png","tr_image_path":"/files/ps2/images/static/4247.png","vs_image_path":"/files/ps2/images/static/4245.png","xp_max":4626375},"62":{"nc_image_path":"/files/ps2/images/static/4249.png","tr_image_path":"/files/ps2/images/static/4250.png","vs_image_path":"/files/ps2/images/static/4248.png","xp_max":4825500},"63":{"nc_image_path":"/files/ps2/images/static/4252.png","tr_image_path":"/files/ps2/images/static/4253.png","vs_image_path":"/files/ps2/images/static/4251.png","xp_max":5025750},"64":{"nc_image_path":"/files/ps2/images/static/4255.png","tr_image_path":"/files/ps2/images/static/4256.png","vs_image_path":"/files/ps2/images/static/4254.png","xp_max":5227125},"65":{"nc_image_path":"/files/ps2/images/static/4258.png","tr_image_path":"/files/ps2/images/static/4259.png","vs_image_path":"/files/ps2/images/static/4257.png","xp_max":5429625},"66":{"nc_image_path":"/files/ps2/images/static/4260.png","tr_image_path":"/files/ps2/images/static/4262.png","vs_image_path":"/files/ps2/images/static/4261.png","xp_max":5654625},"67":{"nc_image_path":"/files/ps2/images/static/4263.png","tr_image_path":"/files/ps2/images/static/4265.png","vs_image_path":"/files/ps2/images/static/4264.png","xp_max":5881875},"68":{"nc_image_path":"/files/ps2/images/static/4266.png","tr_image_path":"/files/ps2/images/static/4268.png","vs_image_path":"/files/ps2/images/static/4267.png","xp_max":6111375},"69":{"nc_image_path":"/files/ps2/images/static/4269.png","tr_image_path":"/files/ps2/images/static/4271.png","vs_image_path":"/files/ps2/images/static/4270.png","xp_max":6343125},"7":{"nc_image_path":"/files/ps2/images/static/4085.png","tr_image_path":"/files/ps2/images/static/4084.png","vs_image_path":"/files/ps2/images/static/4083.png","xp_max":17250},"70":{"nc_image_path":"/files/ps2/images/static/4272.png","tr_image_path":"/files/ps2/images/static/4274.png","vs_image_path":"/files/ps2/images/static/4273.png","xp_max":6577125},"71":{"nc_image_path":"/files/ps2/images/static/4277.png","tr_image_path":"/files/ps2/images/static/4275.png","vs_image_path":"/files/ps2/images/static/4276.png","xp_max":6833625},"72":{"nc_image_path":"/files/ps2/images/static/4280.png","tr_image_path":"/files/ps2/images/static/4278.png","vs_image_path":"/files/ps2/images/static/4279.png","xp_max":7092375},"73":{"nc_image_path":"/files/ps2/images/static/4283.png","tr_image_path":"/files/ps2/images/static/4281.png","vs_image_path":"/files/ps2/images/static/4282.png","xp_max":7353375},"74":{"nc_image_path":"/files/ps2/images/static/4286.png","tr_image_path":"/files/ps2/images/static/4284.png","vs_image_path":"/files/ps2/images/static/4285.png","xp_max":7616625},"75":{"nc_image_path":"/files/ps2/images/static/4289.png","tr_image_path":"/files/ps2/images/static/4287.png","vs_image_path":"/files/ps2/images/static/4288.png","xp_max":7882125},"76":{"nc_image_path":"/files/ps2/images/static/4290.png","tr_image_path":"/files/ps2/images/static/4291.png","vs_image_path":"/files/ps2/images/static/4292.png","xp_max":8174625},"77":{"nc_image_path":"/files/ps2/images/static/4293.png","tr_image_path":"/files/ps2/images/static/4294.png","vs_image_path":"/files/ps2/images/static/4295.png","xp_max":8471625},"78":{"nc_image_path":"/files/ps2/images/static/4296.png","tr_image_path":"/files/ps2/images/static/4297.png","vs_image_path":"/files/ps2/images/static/4298.png","xp_max":8773125},"79":{"nc_image_path":"/files/ps2/images/static/4299.png","tr_image_path":"/files/ps2/images/static/4300.png","vs_image_path":"/files/ps2/images/static/4301.png","xp_max":9079125},"8":{"nc_image_path":"/files/ps2/images/static/4086.png","tr_image_path":"/files/ps2/images/static/4087.png","vs_image_path":"/files/ps2/images/static/4088.png","xp_max":24000},"80":{"nc_image_path":"/files/ps2/images/static/4302.png","tr_image_path":"/files/ps2/images/static/4303.png","vs_image_path":"/files/ps2/images/static/4304.png","xp_max":9389625},"81":{"nc_image_path":"/files/ps2/images/static/4305.png","tr_image_path":"/files/ps2/images/static/4306.png","vs_image_path":"/files/ps2/images/static/4307.png","xp_max":9731625},"82":{"nc_image_path":"/files/ps2/images/static/4309.png","tr_image_path":"/files/ps2/images/static/4310.png","vs_image_path":"/files/ps2/images/static/4308.png","xp_max":10078125},"83":{"nc_image_path":"/files/ps2/images/static/4312.png","tr_image_path":"/files/ps2/images/static/4313.png","vs_image_path":"/files/ps2/images/static/4311.png","xp_max":10429125},"84":{"nc_image_path":"/files/ps2/images/static/4315.png","tr_image_path":"/files/ps2/images/static/4316.png","vs_image_path":"/files/ps2/images/static/4314.png","xp_max":10784625},"85":{"nc_image_path":"/files/ps2/images/static/4318.png","tr_image_path":"/files/ps2/images/static/4319.png","vs_image_path":"/files/ps2/images/static/4317.png","xp_max":11144625},"86":{"nc_image_path":"/files/ps2/images/static/4321.png","tr_image_path":"/files/ps2/images/static/4322.png","vs_image_path":"/files/ps2/images/static/4320.png","xp_max":11540625},"87":{"nc_image_path":"/files/ps2/images/static/4324.png","tr_image_path":"/files/ps2/images/static/4325.png","vs_image_path":"/files/ps2/images/static/4323.png","xp_max":11941125},"88":{"nc_image_path":"/files/ps2/images/static/4326.png","tr_image_path":"/files/ps2/images/static/4327.png","vs_image_path":"/files/ps2/images/static/4328.png","xp_max":12346125},"89":{"nc_image_path":"/files/ps2/images/static/4329.png","tr_image_path":"/files/ps2/images/static/4330.png","vs_image_path":"/files/ps2/images/static/4331.png","xp_max":12755625},"9":{"nc_image_path":"/files/ps2/images/static/4089.png","tr_image_path":"/files/ps2/images/static/4090.png","vs_image_path":"/files/ps2/images/static/4091.png","xp_max":31875},"90":{"nc_image_path":"/files/ps2/images/static/4332.png","tr_image_path":"/files/ps2/images/static/4333.png","vs_image_path":"/files/ps2/images/static/4334.png","xp_max":13169625},"91":{"nc_image_path":"/files/ps2/images/static/4335.png","tr_image_path":"/files/ps2/images/static/4336.png","vs_image_path":"/files/ps2/images/static/4337.png","xp_max":13624125},"92":{"nc_image_path":"/files/ps2/images/static/4338.png","tr_image_path":"/files/ps2/images/static/4339.png","vs_image_path":"/files/ps2/images/static/4340.png","xp_max":14083125},"93":{"nc_image_path":"/files/ps2/images/static/4341.png","tr_image_path":"/files/ps2/images/static/4342.png","vs_image_path":"/files/ps2/images/static/4343.png","xp_max":14546625},"94":{"nc_image_path":"/files/ps2/images/static/4344.png","tr_image_path":"/files/ps2/images/static/4345.png","vs_image_path":"/files/ps2/images/static/4346.png","xp_max":15014625},"95":{"nc_image_path":"/files/ps2/images/static/4347.png","tr_image_path":"/files/ps2/images/static/4348.png","vs_image_path":"/files/ps2/images/static/4349.png","xp_max":15487125},"96":{"nc_image_path":"/files/ps2/images/static/4350.png","tr_image_path":"/files/ps2/images/static/4351.png","vs_image_path":"/files/ps2/images/static/4352.png","xp_max":16020375},"97":{"nc_image_path":"/files/ps2/images/static/4353.png","tr_image_path":"/files/ps2/images/static/4354.png","vs_image_path":"/files/ps2/images/static/4355.png","xp_max":16558125},"98":{"nc_image_path":"/files/ps2/images/static/4356.png","tr_image_path":"/files/ps2/images/static/4357.png","vs_image_path":"/files/ps2/images/static/4358.png","xp_max":17100375},"99":{"nc_image_path":"/files/ps2/images/static/4359.png","tr_image_path":"/files/ps2/images/static/4360.png","vs_image_path":"/files/ps2/images/static/4361.png","xp_max":17647125}};
    
    var getRankImage = function(rank, faction) {
        return ranks[rank][faction + "_image_path"];
    };
    var getComputedRank = function(experience) {
        experience = experience * 1;
        for(var i=1; i<=100; ++i) {
            var rank = ranks[i];
            if(experience < rank.xp_max) {
               return i-1;
            }
        }
        
        return 99 + getComputedRank(experience - ranks[100].xp_max);
    };
    
    var convertTimezone = function(unixtime) {
        return (unixtime * 1) + 25200; // 28800 or 25200
    };
    
    var getLastUpdateString = function(unixtime) {
        return moment.unix(convertTimezone(unixtime)).format("MMM D, HH:mm:ss");
    };
    
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
    window.ps2.util = {
        computeStatistics: computeStatistics
      , getRankImage: getRankImage
      , getComputedRank: getComputedRank
      , convertTimezone: convertTimezone
      , getLastUpdateString: getLastUpdateString
    };

})();

moment.duration.fn.format = function() {
    var str = "";
    var count = 2;
    var days = Math.floor(this.asDays())
    if(days > 0) {
      str = str + days + "d ";
      count--;
    }
    if(this.hours() > 0) {
      str = str + Math.floor(this.hours()) + "h ";
      if(--count === 0) return str;
    }
    if(this.minutes() > 0) {
      str = str + Math.floor(this.minutes()) + "m ";
      if(--count === 0) return str;
    }
    if(this.seconds() > 0) {
      str = str + Math.floor(this.seconds()) + "s ";
      if(--count === 0) return str;
    }
    return str
};
