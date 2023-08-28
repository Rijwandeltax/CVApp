/**
 * @description       : cVSuperbadgeLwc.js
 * @author            : MohmmadZuber
 * @group             : 
 * @last modified on  : 07-27-2023
 * @last modified by  : MohmmadZuber@gmail.com
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   07-27-2023   MohmmadZuber@gmail.com            Initial Version
**/
import { LightningElement, api, wire, track } from 'lwc';
import superBadgModalpoop from 'c/superBadgModalpoop';
import { refreshApex } from '@salesforce/apex';
import getTrailheadSuperbadge from '@salesforce/apex/CvInformeshon.getTrailheadSuperbadge';
export default class CVSuperbadgeLwc extends LightningElement {
    // assign varibles
    @api recordId;
    @api superId;
    @track data;
    error;
    @track wireResult;
    @track showSpinner = false;

    /**
    * @description wiredTrailhead method to all recored get
    * @author  MohmmadZuber@gmail.com| 05-27-2023 | Story Number 
    * @param   recordId the Contact recordId 
    * @summary  use wire for all REcored show
    */
    @wire(getTrailheadSuperbadge, { recordId: '$recordId' })
    wiredTrailhead(result) {
        this.wireResult = result;
        if (result.data) {

            if (result.data.length > 0) {
                this.superId = result.data[0].Id;
                console.log('idddss', this.superId);
            }

            this.data = result.data;
            console.log(this.data);
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }
    // refresh all wire result  data
    async refreshData() {
        await refreshApex(this.wireResult);
    }
    // modal Popup SuperBadg
    async SuperBadgOpen() {
        const result = await superBadgModalpoop.open({
            size: 'medium', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            content: 'SuperBadg Edit Recored',
            recordId: this.superId,
        });
        this.refreshData();
    }

}