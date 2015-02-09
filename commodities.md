---
layout: default
title: Procurement Contracts
permalink: /procurement/
---

{% include breadcrumbs.html %}

# PROCUREMENT CONTRACTS


The contract information provided on this site represents contracts that are bid and awarded by the City’s Procurement Department.  These contracts are for supplies, equipment, non-professional services, and public works.  Examples of these types of contracts include but are not limited to:   office supplies, vehicles, landscaping services, various maintenance and construction.

Unlike Professional Services contracts, Procurement contracts are typically not negotiated but are subject to the lowest, responsive, responsible bidder requirements found in <a href="http://www.amlegal.com/nxt/gateway.dll/Pennsylvania/philadelphia_pa/philadelphiahomerulecharter/articleviiiprovisionsofgeneralapplicatio/chapter2contractsprocurementpropertyandr?f=templates$fn=default.htm$3.0$vid=amlegal:philadelphia_pa$anc=JD_Art.VIIICh.">Section 8-200</a> of the Home Rule Charter.  As such, they must be awarded to the bidder offering the lowest price, whose bid meets the bid specifications (responsive) and who is also capable of the performance required under the contract (responsible).  These contracts are also known as “competitively bid contracts”.  Some specific points about Procurement contracts:


* The Procurement Department, not City operating departments, is the central agency responsible for managing the bid and contract execution process for the purchase of supplies, equipment, non-professional services, public works services, and concession agreements.  
* Procurement contracts for supplies, equipment, and non-professional services (referred to as “SS&amp;E” in the graphs and charts below) fall into two main categories:  departmental and city-wide (definitions of both terms can be found in the FAQ section).  These contracts are typically awarded for a term of one year with up to three one-year renewals. 
* The Procurement Department manages the bid and contract execution process for public works contracts (referred to as “PW” in the graphs and charts below).   Generally, only five departments manage the public works projects once the contracts are signed. Those departments are Streets, Water, Public Property, Licenses and Inspections and the Airport. These contracts generally have multi-year terms and are not renewed.
* Procurement contracts that are valued at less than $32,000 within a fiscal year are referred to as “Small Order Purchases” or “SOPs” and are issued by individual departments.  
* SOPs do not require a formal bid process but are still subject to the competitive bidding requirements and they cannot be renewed beyond the end of a fiscal year.

**PLEASE NOTE** - Contracts listed here are paid for by multiple sources, including but not limited to, state and federal funds, Water and Aviation funds and the City’s General Fund.  The amounts in the graphs below do not represent the amount paid to a particular vendor. See the last table for payment amounts for the 20 largest contracts by award amount for the reported quarter.</p>

Review a list of [frequently asked questions about Procurement Contracts here](faqs.html).


      <p>
        The charts and table below summarize professional services contract data for FY 2015, Q1. You can also download the entire data set in CSV format.</p>

        <div>
          <button class="btn link">
            <a href="https://github.com/CityOfPhiladelphia/phl-procurement-contracts">Download all data</a>
          </button>
        </div>

      <h3>Contracts by Vendor</h3>
      <div id="donutchart1" class="chart"></div>
      
      <h3>Contracts by Department</h3>
      <div class="alert alert-info alert-dismissable">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        Visit the <a href="http://cityofphiladelphia.github.io/phl-procurement-contracts/faq.html"></a>frequently asked questions</a> section to learn more about why “SS&E” is listed as a department.
      </div>
      <div id="donutchart2" class="chart"></div>

      <h3>Contracts by Contract Type</h3>
      <div id="donutchart3" class="chart"></div>

      <h3>Top 20 contracts by contract amount</h3>
      <div class="alert alert-info alert-dismissable">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        Click on a column header to sort table by that column.
      </div>
      <div id="table_div"></div>
    </div> 

    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript" src="data.js"></script>
    <script type="text/javascript">

      google.load("visualization", "1", {packages:['corechart', 'table']});
      google.setOnLoadCallback(drawChart);

      function drawChart() {

        var formatter = new google.visualization.NumberFormat({prefix: '$'});

        // Draw the first pie chart.
        var data = google.visualization.arrayToDataTable(vendorData);
        formatter.format(data, 1); 
        var options = setOptions('Contract Dollars by Vendor - Top 10 (2015/Q1)');
        var chart = new google.visualization.PieChart(document.getElementById('donutchart1'));
        chart.draw(data, options);

        // Draw the second pie chart.
        var data = google.visualization.arrayToDataTable(departmentData);
        formatter.format(data, 1); 
        var options = setOptions('Contract Dollars by Department - Top 10 (2015/Q1)');
        var chart = new google.visualization.PieChart(document.getElementById('donutchart2'));
        chart.draw(data, options);

        // Draw the third pie chart.
        var data = google.visualization.arrayToDataTable(contractTypeData);
        formatter.format(data, 1); 
        var options = setOptions('Contract Dollars by Contract Type - Top 10 (2015/Q1)');
        var chart = new google.visualization.PieChart(document.getElementById('donutchart3'));
        chart.draw(data, options);

        // Draw the table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Department');
        data.addColumn('string', 'Vendor');
        data.addColumn('string', 'Type');
        data.addColumn('string', 'Description');
        data.addColumn('number', 'Amount');
        data.addColumn('number', 'Payments');

        for(var i=0; i<tableData.length; i++) {
          data.addRows([tableData[i]]);
        }

        var table = new google.visualization.Table(document.getElementById('table_div'));
        table.draw(data, {showRowNumber: false, sort: 'enable'});

      }

      function setOptions(title) {
        return {
          pieHole: 0.3,
          title: title,
          backgroundColor: {
            fill: '#eee',
            strokeWidth: 1
          },
          legend: {position: 'left'},
          slices: {  
            0: {offset: 0.1},
            1: {offset: 0.1},
            2: {offset: 0.1},
            3: {offset: 0.1},
            4: {offset: 0.1},
            5: {offset: 0.1},
            6: {offset: 0.1},
            7: {offset: 0.1},
            8: {offset: 0.1},
            9: {offset: 0.1},
            10: {offset: 0.1}
          }
        };
      }

    </script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    
      ga('create', 'UA-35850648-7', 'phila.gov');
      ga('create', 'UA-860026-1', {'name': 'b'});
      ga('send', 'pageview');
      ga('b.send', 'pageview');
    
    </script>
  </body>
</html>
