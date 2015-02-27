/* global _,Papa,accounting */

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
        return [key, sum(_.pluck(val, aggregate))];
    })
    .sortBy(function(row) { return row[1]; })
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

                // Loop through each record in the data
                for(var ii in results.data) {
                    row = results.data[ii];

                    // If cleanCurrency specified, clean those properties
                    if(sources[i].cleanCurrency) {
                        // For each currency property we want to clean, parse out the commas and such
                        for(var iii in sources[i].cleanCurrency) {
                            property = sources[i].cleanCurrency[iii];

                            numeric = (row[property] !== undefined && row[property] ? row[property].replace(/[^0-9\.]+/g,'') : '');
                            row[property] = numeric ? parseFloat(numeric) : 0;
                        }
                    }

                    // Nicer dates
                    ['Start_Date', 'End_Date'].forEach(function (prop) {
                        if (!row[prop]) return
                        row[prop] = row[prop].substr(0, 4) + '-' + row[prop].substr(4, 2) + '-' + row[prop].substr(6, 2)
                    })

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
                            var column, columns = [];
                            if(visualization.columns) {
                                for(var key in visualization.columns) {
                                    column = {
                                        data: key,
                                        title: visualization.columns[key]
                                    }
                                    if (sources[i].cleanCurrency && sources[i].cleanCurrency.indexOf(key) !== -1) {
                                        column.render = function (data, type) {
                                            if (type === 'display') {
                                                return accounting.formatMoney(data)
                                            }
                                            return data
                                        }
                                    }
                                    columns.push(column)
                                }
                            }

                            // Create dataTable
                            $(visualization.container).dataTable({
                                data: data,
                                columns: columns,
                                order: visualization.sort || []
                            });
                        }

                        // Create a filtered dataTable in the specified container for the "Expired Contracts" table view.
                        else if(visualization.type === 'table_expired') {
                            // Create dataTables columns object
                            var column, columns = [];
                            if(visualization.columns) {
                                for(var key in visualization.columns) {
                                    column = {
                                        data: key,
                                        title: visualization.columns[key]
                                    }
                                    if (sources[i].cleanCurrency && sources[i].cleanCurrency.indexOf(key) !== -1) {
                                        column.render = function (data, type) {
                                            if (type === 'display') {
                                                return accounting.formatMoney(data)
                                            }
                                            return data
                                        }
                                    }
                                    columns.push(column)
                                }
                            }

                            // Create dataTable
                            $(visualization.container).dataTable({
                                // Filter out any contracts with more than 12 months remaining
                                data: data.filter(function (row) {
                                    if (!row.Remaining_Contract_Months) return
                                    return parseInt(row.Remaining_Contract_Months, 10) <= 12
                                }),
                                columns: columns,
                                order: visualization.sort || []
                            });
                        }

                        // For any other visualization type, create a highcharts and use the type variable in the constructor
                        else {
                            var chartData = new google.visualization.DataTable();
                            chartData.addColumn('string', 'Total');
                            chartData.addColumn('number', 'Total');
                            chartData.addRows(data);

                            var formatter = new google.visualization.NumberFormat({
                                prefix: '$'
                            });
                            formatter.format(chartData, 1);

                            var chart = new google.visualization.PieChart($(visualization.container)[0]);
                            chart.draw(chartData, {
                                width: '100%',
                                height: 450,
                                backgroundColor: 'transparent',
                                pieHole: 0.3,
                                legend: {position: 'left'}
                            });
                        }
                    }
                }
            }
        });
    }
});
