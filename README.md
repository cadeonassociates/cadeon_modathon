**Multi-Series Mod**

See the video in file Cadeon Multi-Series Mod Demo.mp4 for instructions on how to use the mod.

Cadeon&#39;s Multi-Series mod is designed visualize multiple series of data (x1, y1, x2, y2) on a line chart. New users of Spotfire are usually familiar with plotting data in Excel, where data sets are configured as series of x and y. The Multi-Series mod allows users to retain the same data structure to create line charts. Each series of (x,y) data can be placed side by side and brought into Spotfire as one table.

![alt text](https://github.com/cadeonassociates/cadeon_modathon/blob/main/Picture1.png?raw=true)

![alt text](https://github.com/cadeonassociates/cadeon_modathon/blob/main/Picture2.png?raw=true)

The Multi-Series mod can be applied to situations where data sets with different time intervals are being compared. In our example, the actual cumulative sales of two products are recorded daily and compared to the monthly cumulative forecasted sales. This type of comparison is common in many industries including Manufacturing, Sales, and Oil &amp; Gas, where there are volume targets to be met over time.

To plot series of (x,y) data in Spotfire&#39;s native line chart, users would have to apply unpivot transformations and full outer joins to merge each series into a single flat table, which can be a steep learning curve. Often these data sets come from separate source systems and would make sense to keep separate in Spotfire (like actual vs budgeted amounts). Other existing workarounds in Spotfire such as using column matches to plot from multiple tables prevents showing multiple x-axes (only data with matching x-values in both tables will appear). Using Lines &amp; Curves also removes much of the interactivity. The Multi-Series mod addresses these limitations and bridges the transition between Excel and Spotfire.

To build the mod:
All source code for the mod example can be found in the `src` folder.

## Prerequisites
These instructions assume that you have [Node.js](https://nodejs.org/en/) (which includes npm) installed.

## How to get started (with development server)
- Open a terminal at the location of this example.
- Run `npm install`. This will install necessary tools. Run this command only the first time you are building the mod and skip this step for any subsequent builds.
- Run `npm run server`. This will start a development server.
- Start editing, for example `src/main.js`.
- In Spotfire, follow the steps of creating a new mod and connecting to the development server.

## Working without a development server
- In Spotfire, follow the steps of creating a new mod and then browse for, and point to, the _manifest_ in the `src` folder.