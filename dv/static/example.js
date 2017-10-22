
d3.select("body")
    .selectAll("p")
        .data(["hello", "hi", "yo", "hey", "hola", "what's up", "why"])
        .enter()
        .append("p")
            .text(function(d){ 
                return d + ", world";
            })
            
