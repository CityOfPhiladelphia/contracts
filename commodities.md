---
layout: default
title: Procurement Commodities Contracts
permalink: /procurement/
---

{% include breadcrumbs.html %}

# PROCUREMENT COMMODITIES CONTRACTS

The contract information provided on this site represents contracts that are bid and awarded by the City’s Procurement Department.  These contracts are for supplies, equipment, non-professional services, and public works.  Examples of these types of contracts include but are not limited to:   office supplies, vehicles, landscaping services, various maintenance and construction.

Unlike Professional Services contracts, Procurement contracts are typically not negotiated but are subject to the lowest, responsive, responsible bidder requirements found in [Section 8-200](http://www.amlegal.com/nxt/gateway.dll/Pennsylvania/philadelphia_pa/philadelphiahomerulecharter/articleviiiprovisionsofgeneralapplicatio/chapter2contractsprocurementpropertyandr?f=templates$fn=default.htm$3.0$vid=amlegal:philadelphia_pa$anc=JD_Art.VIIICh.) of the Home Rule Charter.  As such, they must be awarded to the bidder offering the lowest price, whose bid meets the bid specifications (responsive) and who is also capable of the performance required under the contract (responsible).  These contracts are also known as “competitively bid contracts”.  Some specific points about Procurement contracts:


* The Procurement Department, not City operating departments, is the central agency responsible for managing the bid and contract execution process for the purchase of supplies, equipment, non-professional services, public works services, and concession agreements.  
* Procurement contracts for supplies, equipment, and non-professional services (referred to as “SS&amp;E” in the graphs and charts below) fall into two main categories:  departmental and city-wide (definitions of both terms can be found in the FAQ section).  These contracts are typically awarded for a term of one year with up to three one-year renewals. 
* The Procurement Department manages the bid and contract execution process for public works contracts (referred to as “PW” in the graphs and charts below).   Generally, only five departments manage the public works projects once the contracts are signed. Those departments are Streets, Water, Public Property, Licenses and Inspections and the Airport. These contracts generally have multi-year terms and are not renewed.
* Procurement contracts that are valued at less than $32,000 within a fiscal year are referred to as “Small Order Purchases” or “SOPs” and are issued by individual departments.  
* SOPs do not require a formal bid process but are still subject to the competitive bidding requirements and they cannot be renewed beyond the end of a fiscal year.

**PLEASE NOTE** - Contracts listed here are paid for by multiple sources, including but not limited to, state and federal funds, Water and Aviation funds and the City’s General Fund.  The amounts in the graphs below do not represent the amount paid to a particular vendor. See the last table for payment amounts for the 20 largest contracts by award amount for the reported quarter.

Review a list of frequently asked questions about Procurement Contracts [here](faqs/procurement-faq.html).

The charts and table below summarize professional services contract data for FY 2015, Q1. You can also download the entire data set in CSV format.

<div>
  <button class="btn link">
    <a href="https://github.com/CityOfPhiladelphia/phl-procurement-contracts">Download all data</a>
  </button>
</div>

<div class="row">
  <div class="alert alert-info alert-dismissable">
    Visit the [frequently asked questions](faqs/procurement-faq.html) section to learn more about why “SS&E” is listed as a department.
  </div>
  <div class="col-md-12">
    <h3 class="chart">Contracts by Vendor</h3>
    <div id="by_vendor"></div>
  </div>
</div>

<div class="row">
  <div class="col-md-12">
    <h3 class="chart">Contracts by Department</h3>
    <div id="by_department"></div>
  </div>
</div>

<div class="row">
  <div class="col-md-12">
    <h3 class="chart">Contracts by Contract Type</h3>
    <div id="by_type"></div>
  </div>
</div>

<div class="row">
  <div class="col-md-12">
    <h3>Top 20 Contracts by Contract Amount</h3>
    <div class="alert alert-info alert-dismissable">
      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
      Click on a column header to sort table by that column.
    </div>
    <table id="browse" class="table table-striped"></table>
  </div>
</div>

<script type="text/javascript">
sources = [
    {
        path: '{{ "/data/procurement/Combo2015Q1_010915.csv" | prepend: site.baseurl }}',
        cleanCurrency: ['contract_amount', 'tot_payments'],
        visualizations: [
            {
                container: '#by_vendor',
                type: 'pie',
                groupBy: 'vendor',
                aggregate: 'contract_amount',
                limit: 10
            },
            {
                container: '#by_department',
                type: 'pie',
                groupBy: 'department_name',
                aggregate: 'contract_amount',
                limit: 10
            },
	      {
		    container: '#by_type',
		    type: 'pie',
		    groupBy: 'contract_structure_type',
		    aggregate: 'contract_amount',
		    limit: 10
	      },
            {
                container: '#browse',
                type: 'table',
                columns: {
                    'department_name': 'Department',
                    'vendor': 'Vendor',
                    'contract_structure_type': 'Type',
                    'short_desc': 'Description',
                    'contract_amount': 'Contract Amount',
                    'tot_payments': 'Payments'
                },
                sort: [
                    [4, 'desc']
                ]
            }
        ]
    }
];
</script>
