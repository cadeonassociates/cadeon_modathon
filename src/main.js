/*
 * Copyright © 2020. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

//@ts-check - Get type warnings from the TypeScript language server. Remove if not wanted.

/**
 * Get access to the Spotfire Mod API by providing a callback to the initialize method.
 * @param {Spotfire.Mod} mod - mod api
 */
Spotfire.initialize(async (mod) => {
    /**
     * Create the read function.
     */
    const reader = mod.createReader(mod.visualization.data(),mod.visualization.axis("Y"), mod.windowSize(), mod.property("myProperty"));

    /**
     * Store the context.
     */
    const context = mod.getRenderContext();

    /**
     * Initiate the read loop
     */
    reader.subscribe(render);

    /**
     * @param {Spotfire.DataView} dataView
     * @param {Spotfire.Axis} axis
     * @param {Spotfire.Size} windowSize
     * @param {Spotfire.ModProperty<string>} prop
     */
    async function render(dataView, axis, windowSize, prop) {
        /**
         * Check the data view for errors
         */
        let errors = await dataView.getErrors();
        if (errors.length > 0) {
            // Showing an error overlay will hide the mod iframe.
            // Clear the mod content here to avoid flickering effect of
            // an old configuration when next valid data view is received.
            mod.controls.errorOverlay.show(errors);
            return;
        }
        mod.controls.errorOverlay.hide();

        /**
         * Get rows from dataView
         */

        const yAxisNames = await axis.parts;
        const xHierachy = await dataView.hierarchy("X");

        let numSeries = (await xHierachy.root()).leaves().length

        
        console.log((await xHierachy.root()).leaves()   )

        //console.log(yAxisNames[0].displayName);
        
         const rows = await dataView.allRows();
        console.log("rows")
         console.log(rows)
         if (rows == null) {
             // User interaction caused the data view to expire.
             // Don't clear the mod content here to avoid flickering.
             return;
         }

                google.charts.load("current", { packages: ["corechart"] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {

                    //console.log(rows);
                    let currentX = "";
                    let data = [];
                    let numCount = 0;
                    let chartColors = [];

                    for(let r in rows)
                    {
                        if(currentX != rows[r].categorical("X").formattedValue())
                        {  
                            currentX = rows[r].categorical("X").formattedValue();
                            numCount++;
                            if(numCount % 2 == 0){chartColors.push(rows[r].color().hexCode)};
                            data.push([]);
                        }
                            data[numCount-1].push(rows[r].continuous("Y").value());
                    };
            
            
                    var finalData = new google.visualization.DataTable();
                    finalData.addColumn('number', 'x');
                    finalData.addColumn('number', 'y');
            
                    var columns = [];
                    var count = 0;

                    for(var i=0;i<data.length;i+=2)
                    {
                        count++;
                        columns.push(count)
                        var tempData = new google.visualization.DataTable();
                        tempData.addColumn('number', 'x');
                        tempData.addColumn('number', yAxisNames[i+1].displayName);
                        
                        var tempArray = [];
                        //tempArray.push([]);
                        for(r in data[i])
                        {
                            tempArray.push([data[i][r],data[i+1][r]])
                            //tempArray[0].push([data[i][r],data[i+1][r]])
                        }
                            //console.log(tempArray);
                            tempData.addRows(tempArray);
                            finalData = google.visualization.data.join(finalData, tempData, 'full', [[0, 0]], columns, [1]); 
                        }
           
                    finalData.removeColumn(1);


           

                    var options = {
                        //title: "Density of Precious Metals, in g/cm^3",
                        height: windowSize.height,
                        legend: { position: "right" },
                        interpolateNulls:true,
                        colors: chartColors,
                        pointSize:6
                    };
                    var chart = new google.visualization.LineChart(document.getElementById("mod-container"));
                    chart.draw(finalData, options);
                }


        /**
         * Print out to document
         */
        const container = document.querySelector("#mod-container");
        container.textContent = `windowSize: ${windowSize.width}x${windowSize.height}\r\n`;
        container.textContent += `should render: ${rows.length} rows\r\n`;
        container.textContent += `${prop.name}: ${prop.value()}`;

        /**
         * Signal that the mod is ready for export.
         */
        context.signalRenderComplete();
    }
});
