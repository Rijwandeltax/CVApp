/**
 * @description       : chartCvLwc.js
 * @author            : MohmmadZuber
 * @group             : 
 * @last modified on  : 07-27-2023
 * @last modified by  : MohmmadZuber@gmail.com
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   07-27-2023   MohmmadZuber@gmail.com            Initial Version
**/
import { LightningElement, wire, track, api } from 'lwc';
//importing the Chart library from Static resources
import chartjs from '@salesforce/resourceUrl/ChartJs';
import chartModalPopup from 'c/chartModalPopup';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
//importing the apex method.
import getAllAccountsByRating from '@salesforce/apex/CvInformeshon.getAllAccountsByRating';
export default class chartLwc extends LightningElement {

// assign varibles
    @api recordId;
    @track data;
    error;
    @track chart;
    chartjsInitialized = false;
    @track wireResult;
    datasetnull;

 /**
     * @description accounts method to all recored get
     * @author  MohmmadZuber@gmail.com| 05-27-2023 | Story Number 
     * @param   recordId the Contact recordId 
     * @summary  use wire for all REcored show
     */

    @wire(getAllAccountsByRating, { recordId: '$recordId' })
    accounts(result) {
        this.wireResult = result;
        if (result.data) {
            console.log('daaaa', result.data);
            console.log('hhhh');
            this.data = result.data;
            this.removeData();
            for (var key in this.data) {
                //this.removeData();
                console.log('keyy12', this.data);
                this.updateChart(this.data[key].count, this.data[key].label);
                console.log('keyy', this.data);
            }
            // console.log('zaa',this.updateChart().size());
        }
        if (result.error) {
            this.data = undefined;
        }
    }

    config = {
        type: 'doughnut',
        data: {
            datasets: [
                {
                    data: [
                    ],
                    backgroundColor: [
                        'rgb(169,17,47)',
                        'rgb(252,252,0)',
                        'rgb(255,202,77)',
                        'rgb(122,219,49)',
                        'rgb(219,49,122)',
                        'rgb(239,239,142)',
                    ],
                    label: 'Dataset 1'
                }
            ],
            labels: []
        },
        options: {
            responsive: true,
            legend: {
                position: 'right'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };
//renderedCallback
    renderedCallback() {
        if (this.chartjsInitialized) {
            console.log('return', this.chartjsInitialized);
            return;
        }
        console.log('fff');
        this.chartjsInitialized = true;
        Promise.all([
            loadScript(this, chartjs)
        ]).then(() => {
            const ctx = this.template.querySelector('canvas.donut')
                .getContext('2d');
            this.chart = new window.Chart(ctx, this.config);
        })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading ChartJS',
                        message: error.message,
                        variant: 'error',
                    }),
                );
            });
    }
    //Chart all value push update chart
    updateChart(count, label) {
        this.chart.data.labels.push(label);
        this.chart.data.datasets.forEach((dataset) => {
            dataset.data.push(count);
            console.log('datasettt', dataset.data);
        });
        // this.removeData();
        this.chart.update();

    }
//Chart all value pop update chart
    removeData() {
        let l = 0;
        while(l < this.chart.data.labels.length ){
           this.chart.data.labels.pop();

           this.l++;
        }
        this.chart.data.datasets.forEach((dataset) => {
            console.log('dataset.data.length', dataset.data.length);
            let j = 0;
            while (j < dataset.data.length) {
                dataset.data.pop();
                console.log('removchart', dataset.data);
                console.log('j', j);
                console.log('length:', dataset.data.length);

                this.j++;
            }

        });
        this.chart.update();
    }
//// modal Popup 
    async openchartModalPopup() {
        console.log('modal1');
        const result = await chartModalPopup.open({
            size: 'small', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            recordId: this.recordId,
        });
        this.refreshData();
    }
// refresh all wire result  data
    async refreshData() {
        console.log('refreshdataa');
        await refreshApex(this.wireResult);
    }
}