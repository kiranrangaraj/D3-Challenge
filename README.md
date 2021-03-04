# D3.js-based Interactive Graph of Health Risks Facing Particular US Demographics   

<p align="center">
  <a href="https://kiranrangaraj.github.io/Health-Risks-Facing-Particular-US-Demographics/">Visit Website</a>
</p>

---

## Summary ##

This project created an interactive visualization for the 2014 ACS 1-year estimates from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System. The visualization compares rates of obesity, smoking, and lack of healthcare in each state to poverty rates, median age, and median household income in a scatter plot. 

Users can click on which health risk and which demographic they want to compare in order to view any trends between the two factors. While the ticks on the axes allow for approximate values of each circle to be inferred, the true value of a specific circle's data is revealed when the user hovers their cursor over the element.

---

## Correlations Discovered Between Health Risks and Age, Income ##

When comparing the different population statistics, several positive correlations are observed. Obesity, smoking, and lack of healthcare rates correlate to both poverty rates and household incomes. Generally speaking, the higher the obesity, smoking, and lack of healthcare rates are, the higher the state's poverty rates are or the lower the median household income is.

The scatterplots visually indicate that these trends are not absolute as outliers are evident. For example, Texas has the highest percentage lacking healthcare (24.9%) yet a poverty rate of 17.2%, which is towards the median poverty rate. Conversely, Washington DC has nearly the same poverty rate as Texas at 17.7%, but only 8.3% of its population lacks healthcare and only 17.7% (the second lowest %) are obese.

Some states that clearly display the positive correlation include Mississippi, Louisianna, and Arkansas, which have some the highest poverty rates as well as obesity, smoking, lack of healthcare rates. These three states not surprisingly also have some of the lowest median household incomes.

Age however, does not appear to present a clear correlation to obesity, smoking, or healthcare percentages. This is visually evident by the fact that the scatter plot appears as a cluster for all 3 of these variables. Most of the states having median ages between 36 and 40 years old. A weak positive correlation appears for smoking and median age, where it seems states with higher age medians tend to have higher smoking rates. Again though, this connection appears loosely.

---

## Process ##

### Basic Scatter Plot Comparing Two Elements
* Created a scatter plot between two of the data variables.
* Represented each state with a circle element, coding this graphic in the `app.js` file.
* Pulled in the data from `data.csv` by using the `d3.csv` function.
* Included state abbreviations in the circles.
* Created and situated axes and labels to the left and bottom of the chart.
* Used `python -m http.server` to run the visualization locally at `localhost:8000` in the web browser.

<p align="center">
  <img src="Images/4-scatter.jpg" width="430">
</p>

### Dynamic Scatter Plot with Interactive Elements
* Placed additional labels on the scatter plot for the remaining two demographics and risk factors, a total of three elements per axis.
* Gave the axes labels click events so that users can decide which data to display.
* Animated the transitions for the circles locations as well as the range of the axes.
* Bound all of the CSV data to the circles.

<p align="center">
  <img src="Images/7-animated-scatter.gif" width="500">
</p>

### Incorporating D3-tip
* Added tooltips to the circles to display its data when the user clicks on the circles label.
* Referenced the `d3-tip.js` plugin developed by [Justin Palmer](https://github.com/Caged).
* Also referenced [David Gotz's](https://bl.ocks.org/davegotz/bd54b56723c154d25eedde6504d30ad7) example of how to implement tooltips with D3-tip.

<p align="center">
  <img src="Images/8-tooltip.gif" width="500">
</p>

---

## Sources ##
* [Data](https://github.com/kiranrangaraj/Health-Risks-Facing-Particular-US-Demographics/blob/main/assets/data/data.csv)
* [US Census](https://data.census.gov/cedsci/table?q=2014%20acs&tid=ACSDP1Y2014.DP05&hidePreview=false)
* [D3.js plugin](https://github.com/caged/d3-tip)
* [D3-tip](https://bl.ocks.org/davegotz/bd54b56723c154d25eedde6504d30ad7)

---

## Technologies Used ##
* HTML5
* CSS3
* JavaScript - D3.js

---

## Author ##
Kiran Rangaraj - LinkedIn: [@ Kiran Rangaraj](https://www.linkedin.com/in/kiranrangaraj/)
