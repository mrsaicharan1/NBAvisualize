d3.csv("static/2013-14_shots.csv", function(data){

    // filter out shots that aren't assisted
    data = data.filter(function(d){
        return d.assist != "";
    })

    // compute assists
    var assists = d3.nest()
        .key(function(d){ return d.assist; })
        .key(function(d){ return d.player; })
        .rollup(function(v){ return v.length; })
        .entries(data)

    // choose a player
    var player = "Carmelo Anthony"
    var player_data;

    for (var i = 0; i < assists.length; i++) {
        if (assists[i].key == player) {
            player_data = assists[i].values;
            break;
        }
    }

    var total = 0;
    player_data.forEach(function(d) { total = total + d.value; })

    var canvas = d3.select("svg")
        .append("g")
            .attr("transform", "translate(400,400)")

    var scale = d3.scalePow()
        .exponent(0.5)
        .domain([0, total])
        .range([0, 80])

    var colorScale = d3.scalePow()
        .exponent(0.5)
        .domain([0, total])
        .range(["gray", "red"])

    var g = canvas.selectAll("g")
        .data(player_data)
        .enter()
            .append("g")
                .attr("transform", function(d, i){
                    return "rotate(" +  (i * 360 / player_data.length) + ")";
                })

    var circles = g.append("circle")
        .attr("cx", 200)
        .attr("r", function(d){ return scale(d.value);})
        .attr("fill", function(d){ return colorScale(d.value);})

    g.append("circle")
        .attr("r", scale(total))
        .attr("fill", "green")

    var players = assists.map(function(d){ return d.key; }, assists);

     var player = "Carmelo Anthony"

     d3.select("svg")
         .selectAll("circle")
         .data(assists["Carmelo Anthony"])
         .enter()

     var assist_matrix = players.map(function(d){ return players.map(function(e) { return 0; }); });

     assists.forEach(
         function(row){
         var i = players.indexOf(row.key);
             row.values.forEach(function(entry) {
                 var j = players.indexOf(entry.key);
                 assist_matrix[i][j] = entry.value;
             });
         }
     );

     d3.select("svg")
         .append("g")
         .data(d3.chord(matrix));

})
