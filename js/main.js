/* global _,Papa */

// Helper function to group an array of objects by a common property and aggregate them
function groupData(data, groupBy, aggregate) {
  var sum = function(numbers) {
      return _.reduce(numbers, function(memo, num) {
          return memo + num;
      }, 0);
  };

  return _.chain(data)
    .groupBy(groupBy)
    .map(function(val, key) {
      return {
        name: key,
        y: sum(_.pluck(val, aggregate)),
        children: val
      };
    })
    .sortBy('y')
    .value()
    .reverse();
}

// When document has finished loading, execute
$(document).ready(function() {
    var sources = window.sources || {};

    // Noop if no sources are specified
    if (!sources.length) return;

    // Fetch each source
    for(var i in sources) {

        // Fetch the CSV data from the source and convert it to JSON
        Papa.parse(sources[i].path, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results) { // TODO: Technically we're creating a function inside a loop and this is bad practice
                // CSV file has been fetched and converted to JSON in results.data
                var row, property, numeric;

                // If cleanCurrency specified, clean those properties
                if(sources[i].cleanCurrency) {
                    // Loop through each record in the data
                    for(var ii in results.data) {
                        row = results.data[ii];

                        // For each currency property we want to clean, parse out the commas and such
                        for(var iii in sources[i].cleanCurrency) {
                            property = sources[i].cleanCurrency[iii];

                            numeric = (row[property] !== undefined && row[property] ? row[property].replace(/[^0-9\.]+/g,'') : '');
                            row[property] = numeric ? parseFloat(numeric) : 0;
                        }
                    }
                }

                // If visualizations are specified for this source
                if(sources[i].visualizations.length) {
                    var visualization, data;

                    // Loop through the visualizations
                    for(var iiii in sources[i].visualizations) {
                        visualization = sources[i].visualizations[iiii];

                        // Copy the data to a new variable so we can reuse the source data
                        data = _.clone(results.data);

                        // If groupBy specified, group the data
                        if(visualization.groupBy && visualization.aggregate) {
                            data = groupData(data, visualization.groupBy, visualization.aggregate);
                        }

                        // If limit is specified, slice the data
                        if(visualization.limit) {
                            data = data.slice(0, visualization.limit);
                        }

                        // If the visualization type is a table, create a dataTable in the specified container
                        if(visualization.type === 'table') {
                            // Create dataTables columns object
                            var columns = [];
                            if(visualization.columns) {
                                for(var key in visualization.columns)
                                columns.push({
                                    data: key,
                                    title: visualization.columns[key]
                                });
                            }

                            // Create dataTable
                            $(visualization.container).dataTable({
                                data: data,
                                columns: columns,
                                order: visualization.sort || []
                            });
                        }
                        // For any other visualization type, create a highcharts and use the type variable in the constructor
                        else {
                            $(visualization.container).highcharts({
                                series: [{
                                    name: 'Total',
                                    type: visualization.type,
                                    data: data
                                }],
                                chart: {
                                    backgroundColor: 'transparent'
                                },
                                title: {
                                    text: null
                                },
                                tooltip: {
                                    pointFormat: '{series.name}: <b>${point.y:,.2f}</b>'
                                }
                            });
                        }
                    }
                }
            }
        });
    }
});