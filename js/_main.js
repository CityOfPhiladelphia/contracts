// Group an array of objects by a common property and aggregate them
function groupData(data, groupBy, aggregateBy) {
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
        y: sum(_.pluck(val, aggregateBy)),
        children: val
      };
    })
    .sortBy('y')
    .value()
    .reverse();
}

function cleanCurrencies(data, properties) {
    var i, ii, parsed;
    for(i in data) {
        for(ii in properties) {
            parsed = (data[i][properties[ii]] !== undefined && data[i][properties[ii]] ? data[i][properties[ii]].replace(/[^0-9\.]+/g,'') : '');
            data[i][properties[ii]] = parsed ? parseFloat(parsed) : 0;
        }
    }
    return data;
}

// When document has finished loading, execute
$(document).ready(function() {

    // Detect any visualizations
    $('.visualization').each(function(index) {
        var self = $(this),
            source = self.data('source'),
            groupBy = self.data('groupby'),
            aggregate = self.data('aggregate'),
            limit = self.data('limit');
        console.log('Visualization', source, groupBy, aggregate);

        if(source) {
            Papa.parse(source, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: function(results) {

                    var data = cleanCurrencies(results.data, ['contract_amount']);
                    data = groupData(data, groupBy, aggregate);

                    // If specified, show only the top X rows
                    if(limit) data = data.slice(0, limit);

                    console.log(data);

                    // Create visualization
                    self.highcharts({
                        series: [{
                            name: 'Contracts',
                            type: 'pie',
                            data: data
                        }],
                        chart: {
                            backgroundColor: 'transparent'
                        },
                        title: {
                            text: null
                        }
                    });
                }
            });
        }
    });

    $('.datatable').each(function(index) {
        var self = $(this),
            source = self.data('source');
        console.log('Table', source);

        if(source) {
            Papa.parse(source, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: function(results) {
                    var data = cleanCurrencies(results.data, ['contract_amount', 'tot_payments']);

                    console.log(data);

                    // Create data table
                    self.dataTable({
                        data: data,
                        columns: [
                            {data: 'department_name', title: 'Department'},
                            {data: 'vendor', title: 'Vendor'},
                            {data: 'contract_structure_type', title: 'Type'},
                            {data: 'short_desc', title: 'Description'},
                            {data: 'contract_amount', title: 'Contract Amount'},
                            {data: 'tot_payments', title: 'Payments'}
                        ],
                        order: [[4, 'desc']]
                    });
                }
            });
        }
    });

});

$(document).foundation('alert', 'reflow');
