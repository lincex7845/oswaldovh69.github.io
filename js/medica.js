﻿bardata = [	
			{eps_name: "Cafam", indicador:75}, 
			{eps_name: "Compensar EPS", indicador:75}, 			
			{eps_name: "Salud Total EPS", indicador:70}, 		
			{eps_name: "Coomeva  EPS", indicador:64}, 
			{eps_name: "EPS Sura", indicador:64},
			{eps_name: "Sanitas EPS", indicador:63}, 
			{eps_name: "Famisanar EPS", indicador:60},
			{eps_name: "Cruz Blanca EPS", indicador:58}, 
			{eps_name: "Nueva EPS", indicador:58}, 
			{eps_name: "Cafesalud", indicador:54}, 
			{eps_name: "AlianSalud EPS", indicador:52}, 
			{eps_name: "Colsubsidio", indicador:19}];
			

var height = 300,
	width = 500,
	barWidth = 10,
	barOffset = 30,
	items = 12;
	
var colors = d3.scaleLinear()
		.domain([0, items])
		.range(['#31FF9F', '#C61C6F']);
	
var yScale = d3.scaleLinear()
		.domain([0, 100])
		.range([0, height]);		
		
var xBandScale = d3.scaleBand()
	.domain(d3.range(0, items))
	.range([0, height])
	.paddingInner(0);

var tooltip = 	d3.select('body').append('div')
					.style('position', 'absolute')
					.style('padding', '0 10 px')
					.style('background', 'white')
					.style('opacity', 0);
var	tempColor;

var myChar = d3.select('#chart_medica')
			  .append('svg')
				.attr('width', width)
				.attr('height', height)
				.style('background', '#C9D7D6')
				.selectAll('rect').data(bardata)
				.enter().append('rect')
					.style('fill', function(d,i) {
								return colors(i);
							})
					.attr('width', xBandScale.bandwidth())
					.attr('height', 0)
					.attr('x', function (d, i) {
							return i * (barWidth + barOffset);
						})
					.attr('y', height)			
					.on('mouseover', function (d, i) {
						tooltip.transition()
							.style('opacity', .9)
						
						tooltip.html(d.eps_name + " - " + d.indicador + " %")
							.style('left', (d3.event.pageX - 35) + 'px')
							.style('top', (d3.event.pageY - 30) + 'px')
						
						tempColor = this.style.fill;
						d3.select(this)
							.style('opacity', .5)
							.style('fill', 'yellow')
						})
					.on('mouseout', function (d, i) {
						d3.select(this)
							.style('opacity', 1)
							.style('fill', tempColor)
						});
						
myChar.transition()
	.attr('height', function (d) {
			return yScale(d.indicador);
		})
	.attr('y', function (d) {
			return height - yScale(d.indicador)
		})
	.delay(function (d, i) {
		return i * 20;
		})
	.duration(1000)
	.ease('elastic');