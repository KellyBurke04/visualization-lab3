
async function charting(){
	let data1 = await d3.csv('cities.csv', d3.autoType);
	console.log(data1);
	const nonEurope = ['New Zealand', 'USA', 'Japan']
	let filtered1 = data1.filter(d => !nonEurope.includes(d.country));
	let dLength = filtered1.length;
	
	d3.select('.city-count').text("Number of Cities: "+dLength);

	const width = 700;
	const height = 550;
	const domain = d3.extent(filtered1, d=>d.population)
	const svg = d3.select('.population-plot')
		.append('svg')
    	.attr('width', width)
    	.attr('height', height)
		
	
	var circleSelection = svg.selectAll("circle")
        .data(filtered1)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return (d.x); } )
        .attr("cy", function (d) { return (d.y); } )
        .attr("r", 1.5)
        .style("fill", "#69b3a2")
		.attr("r", function(d){
			if (d.population <  1000000) {
				return 4
			} else {
				return 8
			}
		})
	
	var dataText = svg.selectAll("text")
		.data(filtered1)
		.enter()
		.append("text")
		.text(function(d){
			if (d.population > 1000000) {
				return d.city
			}
		})
		.attr("x", function(d){
			return (d.x);
		})
		.attr("y",function(d){
			return (d.y -12);
		})
		.attr("text-anchor", "middle")
		.attr("font-size", 11)
		



}

async function charting2(){
	let data = await d3.csv('buildings.csv', d3.autoType);
	console.log(data);
	let filtered = data;
	let dLength = filtered.length;

	filtered.sort((a, b) => b.height_px - a.height_px);
	console.log(filtered);
	
	
	const svg = d3.select('.bar-chart')
		.append('svg')
    	.attr('width', 500)
    	.attr('height', 500)

	var rectangle = svg.selectAll("rect")
        .data(filtered)
        .enter()
        .append("rect")
		.attr("x", 180)
		.attr("width", function(d) {
			return d.height_px;
		})
        .attr("y",function(d, i){
			return i * 50 + 5;
		} )
		.attr("height", 40)
		.attr("fill", "orange")
		.on("click", function(event, d) {
			d3.select(".image")
				.attr("src", "img/"+d.image)
			d3.select(".building-name")
				.text(d.building)
			d3.select(".height")
				.text(d.height_ft)
			d3.select(".city")
				.text(d.city)
			d3.select(".country")
				.text(d.country)
			d3.select(".floors")
				.text(d.floors)
			d3.select(".completed")
				.text(d.completed)
		  });
		

	var buildingNames = svg.selectAll(".buildingNames")
		.data(filtered)
		.enter()
		.append("text")
		.attr("class", "buildingNames")
		.text(function(d){
			return d.building;
		})
		.attr('x',0)
		.attr('y', function(d,i){ return i * 50 + 30})
		.attr("font-size", 12)

	let textHeights = svg.selectAll(".buildingLabel")
		.data(filtered)
		.enter()
		.append("text")
		.attr("class", "buildingLabel")
		.text(function(d){
			return d.height_ft
		})
		.attr('x', function(d){ return 180 + d.height_px - 5})
		.attr('y', function(d, i){ return i * 50 +30})
		//.attr("fill", "blue")
		.attr("text-anchor", "end")	
		.attr("fill", "white")
		.attr("font-size", 12)	
		
	
}


charting();
charting2();
