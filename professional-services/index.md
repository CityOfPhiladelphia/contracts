---
layout: default
title: Professional Services Contracts
permalink: /professional-services/
---

{% include breadcrumbs.html %}

# PROFESSIONAL SERVICES CONTRACTS

Examples of Professional Services include but are not limited to: social services, information technology consulting, legal services, general consulting services and marketing or communications.

Professional Services contracts are not subject to the lowest, responsible bidder requirements of Section 8-200 of the Home Rule Charter. As such, they do not have to be awarded to the applicant offering the lowest price to the City but can be awarded based upon a number of criteria, including price. Though sometimes referred to as “non-competitively bid” or “non-bid” contracts, Professional Services contracts must utilize some kind of competitive process as specified in [Chapter 17-1400 of the Philadelphia Code](http://phillycode.org/17/17-1400/). Some specific points about Professional Services contracts:

* Professional services contracts are issued by departments throughout the city, with oversight by the Finance Department.
* Such contracts are typically awarded for a term of one year with up to three one-year renewals.
* Professional Services contracts that are valued at less than $32,000 within a fiscal year are sometimes referred to as "Miscellaneous Purchase Orders" or "MPOs" and are issued by individual departments.
* MPOs do not require a formal Request for Proposals ("RFP") but are still subject to competitive requirements, and cannot be renewed beyond a one-year term.
* A "Unitary Contract" is a contractual arrangement with multiple entities all providing similar services for similar pricing. When the term Unitary is presented as a vendor name, this represents multiple vendors under this contract. For more information on Unitary contracts, see here.

**PLEASE NOTE** - Contracts listed here are paid for by multiple sources, including state and federal funds, not only the City’s General Fund. The amounts in the graphs below do not represent the amount paid. See the last table for payment amounts.

Review a list of frequently asked questions about Professional Services Contracts [here](faq/).

The charts and table below summarize professional services contract data for FY 2015, Q1. You can also download the entire data set in CSV format.

<div>
  <button class="btn link">
    <a href="https://github.com/CityOfPhiladelphia/contracts/tree/gh-pages/professional-services/data">Download all data</a>
  </button>
</div>

<div class="row">
    <div class="col-md-12">
        <h3 class="chart">Contract Dollars by Vendor - Top 10 (2015/Q1)</h3>
        <!--<div class="visualization" data-source="{{ "/data.csv" | prepend: site.baseurl }}" data-groupby="vendor" data-aggregate="contract_amount" data-limit="10"></div>-->
        <div id="by_vendor" class="visualization"></div>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <h3 class="chart">Contract Dollars by Department - Top 10 (2015/Q1)</h3>
        <!--<div class="visualization" data-source="{{ "/data.csv" | prepend: site.baseurl }}" data-groupby="department_name" data-aggregate="contract_amount" data-limit="10"></div>-->
        <div id="by_department" class="visualization"></div>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
	<h3 class="chart">Contract Dollars by Type - Top 10 (2015/Q1)</h3>
	<div id="by_type" class="visualization"></div>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <h3>Top Contracts by Amount</h3>
        <table id="browse" class="table table-striped"></table>
    </div>
</div>

<script type="text/javascript">
sources = [
    {
        path: '{{ "/professional-services/data/FY-2015-Q1.csv" | prepend: site.baseurl }}',
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
