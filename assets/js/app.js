// Setup chart parameters
// Set svg parameters
// Read csv data
// Create our scales
// Create our axes
// Do any appending, transform/translate
// Generate lines
// Append line paths

// D3 Animated Scatter Plot

//===========================
// Pre-Data Setup
//===========================

// Set up the width of the graph
var width = parseInt(d3.select("#scatter").style("width"));
// Set up the height of the graph
var height = width - width / 3.9;
// Set up the margin spacing for the graph
var margin = 20;
// Designate a space for placing words
var labelArea = 110;
// Specify padding for the text at the bottom axis
var tPadBot = 40;
// Specify padding for the text at the left axis
var tPadLeft = 40;
// Create the canvas attributes for the graph
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");
// Specify the radius for each dot that will appear in the graph
var circRadius;
function crGet() {
  if (width <= 530) {
    circRadius = 5;
  }
  else {
    circRadius = 10;
  }
}
crGet();

// Labels for the axes
//===========================

// A) Bottom axis

// Create a group element to nest bottom axes labels
svg.append("g").attr("class", "xText");
// Assign the variable 'xText' to select the group
var xText = d3.select(".xText");
// Transform and translate 'xText' to place it at the bottom of the chart
function xTextRefresh() {
  xText.attr(
    "transform",
    "translate(" +
      ((width - labelArea) / 2 + labelArea) +
      ", " +
      (height - margin - tPadBot) +
      ")"
  );
}
xTextRefresh();

// Append 3 SVG files using 'xText'; specify y coordinates for correct spacing
// 1. Poverty
xText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("In Poverty (%)");
// 2. Age
xText
  .append("text")
  .attr("y", 0)
  .attr("data-name", "age")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Age (Median)");
// 3. Income
xText
  .append("text")
  .attr("y", 26)
  .attr("data-name", "income")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Household Income (Median)");

// B) Left axis

// Assign variables to the transformation attributes
var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;
// Add a second label group for the axis left of the chart
svg.append("g").attr("class", "yText");
// Assign the variable 'yText' to select the group
var yText = d3.select(".yText");
// Transform and translate to place it to the left of the chart
function yTextRefresh() {
  yText.attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
  );
}
yTextRefresh();

// Append the text using 'yText'
// 1. Obesity
yText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "obesity")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Obese (%)");
// 2. Smokes
yText
  .append("text")
  .attr("x", 0)
  .attr("data-name", "smokes")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Smokes (%)");
// 3. Lacks Healthcare
yText
  .append("text")
  .attr("y", 26)
  .attr("data-name", "healthcare")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Lacks Healthcare (%)");

//===========================
// Import data.csv file
//===========================

// Import csv data using d3
d3.csv("assets/data/data.csv").then(function(data) {
  // Visualize the data
  visualize(data);
});

//===========================
// Create the visualization function
//===========================

// Create a function that visually manipulates of all elements dependent on the data
function visualize(theData) {
  // Assign variables to specify what data is represented in each axis
  var curX = "poverty";
  var curY = "obesity";
  // Assign empty variables for the min and max values of x and y
  var xMin;
  var xMax;
  var yMin;
  var yMax;
  // Use the tooltip function to specify chart parameters
  var toolTip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([40, -60])
    .html(function(d) {
      // x key
      var theX;
      // Get the state name
      var theState = "<div>" + d.state + "</div>";
      // Get the y value's key and value
      var theY = "<div>" + curY + ": " + d[curY] + "%</div>";
      // If the x key is poverty
      if (curX === "poverty") {
        // Get the x key and a version of the value formatted to show percentage
        theX = "<div>" + curX + ": " + d[curX] + "%</div>";
      }
      else {
        // Get the x key and a version of the value formatted to include commas after every third digit
        theX = "<div>" + curX + ": " + parseFloat(d[curX]).toLocaleString("en") + "</div>";
      }
      // Return data captured
      return theState + theX + theY;
    });
  // Call the toolTip function
  svg.call(toolTip);
  // Change the min and max for x
  function xMinMax() {
    // Min will get the smallest data point from the selected column
    xMin = d3.min(theData, function(d) {
      return parseFloat(d[curX]) * 0.90;
    });
    // Max will get the largest data point from the selected column
    xMax = d3.max(theData, function(d) {
      return parseFloat(d[curX]) * 1.10;
    });
  }
  // Change the min and max for y
  function yMinMax() {
    // Min will get the smallest data point from the selected column
    yMin = d3.min(theData, function(d) {
      return parseFloat(d[curY]) * 0.90;
    });
    // Max will get the largest data point from the selected column
    yMax = d3.max(theData, function(d) {
      return parseFloat(d[curY]) * 1.10;
    });
  }

  // Change the label classes text when clicked
  function labelChange(axis, clickedText) {
    // Switch currently active to inactive
    d3
      .selectAll(".aText")
      .filter("." + axis)
      .filter(".active")
      .classed("active", false)
      .classed("inactive", true);
    // Switch text just clicked to active
    clickedText.classed("inactive", false).classed("active", true);
  }

  // Get the min and max values of x and y
  xMinMax();
  yMinMax();
  // Create scales
  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - labelArea, margin]);
  // Pass the scales into the axis methods to create the axes
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);
  // Determine x and y tick counts
  function tickCount() {
    if (width <= 500) {
      xAxis.ticks(5);
      yAxis.ticks(5);
    }
    else {
      xAxis.ticks(10);
      yAxis.ticks(10);
    }
  }
  tickCount();
  // Append the axes in group elements
  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + labelArea) + ", 0)");

  // Make grouping for dots and their labels
  var theCircles = svg.selectAll("g theCircles").data(theData).enter();
  // Append the circles for each row of data
  theCircles
    .append("circle")
    .attr("cx", function(d) {
      return xScale(d[curX]);
    })
    .attr("cy", function(d) {
      return yScale(d[curY]);
    })
    .attr("r", circRadius)
    .attr("class", function(d) {
      return "stateCircle " + d.abbr;
    })
    // Create hover rules for mouseover
    .on("mouseover", function(d) {
      // Show the tooltip
      toolTip.show(d, this);
      // Highlight the state circle's border
      d3.select(this).style("stroke", "#323232");
    })
    // Create hover rules for mouseout
    .on("mouseout", function(d) {
      // Remove the tooltip
      toolTip.hide(d);
      // Remove highlight
      d3.select(this).style("stroke", "#e3e3e3");
    });

  // Get the circle's matching state abbreviations from data
  theCircles
    .append("text")
    // Return the abbreviation to .text
    .text(function(d) {
      return d.abbr;
    })
    // Place the text using scale
    .attr("dx", function(d) {
      return xScale(d[curX]);
    })
    .attr("dy", function(d) {
      return yScale(d[curY]) + circRadius / 2.5;
    })
    .attr("font-size", circRadius)
    .attr("class", "stateText")
    // Create hover rules for mouseover
    .on("mouseover", function(d) {
      // Show the tooltip
      toolTip.show(d);
      // Highlight the state circle's border
      d3.select("." + d.abbr).style("stroke", "#323232");
    })
    // Create hover rules for mouseout
    .on("mouseout", function(d) {
      // Remove tooltip
      toolTip.hide(d);
      // Remove highlight
      d3.select("." + d.abbr).style("stroke", "#e3e3e3");
    });

  //===========================
  // Make the Graph Dynamic
  //===========================

  // Select all axis text and add a d3 event upon clicking
  d3.selectAll(".aText").on("click", function() {
    // Assign a variable to save the clicked text
      var self = d3.select(this);
      // Run event on inactive labels
      if (self.classed("inactive")) {
      // Get the name and axis saved in label
      var axis = self.attr("data-axis");
      var name = self.attr("data-name");
      // When x is the saved axis, execute this:
      if (axis === "x") {
        // Make curX the same as the data name
        curX = name;
        // Change the min and max of the x-axis
        xMinMax();
        // Update the domain of x
        xScale.domain([xMin, xMax]);
        // Use a transition to update the xAxis
        svg.select(".xAxis").transition().duration(300).call(xAxis);
        // Update the location of the state circles as the axis changes
        d3.selectAll("circle").each(function() {
          // Use d3 to create a circle motion from the initial position to the new one
          d3
            .select(this)
            .transition()
            .attr("cx", function(d) {
              return xScale(d[curX]);
            })
            .duration(300);
        });
        // Change the location of the state texts
        d3.selectAll(".stateText").each(function() {
          // Assign each state text the same motion as the matching circle
          d3
            .select(this)
            .transition()
            .attr("dx", function(d) {
              return xScale(d[curX]);
            })
            .duration(300);
        });
        // Change the classes of the last active label and the clicked label
        labelChange(axis, self);
      }
      // When y is the saved axis, execute this:
      else {
        // Make curY the same as the data name
        curY = name;
        // Change the min and max of the y-axis
        yMinMax();
        // Update the domain of y
        yScale.domain([yMin, yMax]);
        // Update the y-axis
        svg.select(".yAxis").transition().duration(300).call(yAxis);
        // Update the location of the state circles
        d3.selectAll("circle").each(function() {
          // Create a circle motion transition for its new attribute
          d3
            .select(this)
            .transition()
            .attr("cy", function(d) {
              return yScale(d[curY]);
            })
            .duration(300);
        });
        // Change the location of the state texts
        d3.selectAll(".stateText").each(function() {
          // Assign each state text the same motion as the matching circle
          d3
            .select(this)
            .transition()
            .attr("dy", function(d) {
              return yScale(d[curY]) + circRadius / 3;
            })
            .duration(300);
        });
        // Change the classes of the last active label and the clicked label
        labelChange(axis, self);
      }
    }
  });

//===========================
// Mobile Responsive
//===========================

  // Select window
  d3.select(window).on("resize", resize);
  // Call a function to specify parts of the chart that need size and position changes
  function resize() {
    // Redefine the width, height and leftTextY
    width = parseInt(d3.select("#scatter").style("width"));
    height = width - width / 3.9;
    leftTextY = (height + labelArea) / 2 - labelArea;
    // Apply the width and height to the svg chart area
    svg.attr("width", width).attr("height", height);
    // Change the xScale and yScale ranges
    xScale.range([margin + labelArea, width - margin]);
    yScale.range([height - margin - labelArea, margin]);
    // Change the x-axis because of the scale changes
    svg
      .select(".xAxis")
      .call(xAxis)
      .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
    // Change the y-axis
    svg.select(".yAxis").call(yAxis);
    // Update the ticks on each axis
    tickCount();
    // Update the labels
    xTextRefresh();
    yTextRefresh();
    // Update the radius of each dot
    crGet();
    // Update the location and radius of the state circles
    d3
      .selectAll("circle")
      .attr("cy", function(d) {
        return yScale(d[curY]);
      })
      .attr("cx", function(d) {
        return xScale(d[curX]);
      })
      .attr("r", function() {
        return circRadius;
      });
    // Change the location and size of the state texts
    d3
      .selectAll(".stateText")
      .attr("dy", function(d) {
        return yScale(d[curY]) + circRadius / 3;
      })
      .attr("dx", function(d) {
        return xScale(d[curX]);
      })
      .attr("r", circRadius / 3);
  }
}