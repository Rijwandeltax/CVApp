/**
 * @description       : cVReferenceLwc.js
 * @author            : MohmmadZuber
 * @group             : 
 * @last modified on  : 07-27-2023
 * @last modified by  : MohmmadZuber@gmail.com
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   07-27-2023   MohmmadZuber@gmail.com            Initial Version
**/
import { LightningElement, api, wire, track } from 'lwc';
import refrencModalPopup from 'c/refrencModalPopup';
import getReference from '@salesforce/apex/CvInformeshon.getReference';
export default class CVReferenceLwc extends LightningElement {
// assign varibles
    @api recordId;
    @track data;
    error;
    @track wireResult;

      /**
     * @description wiredReference method to all recored get
     * @author  MohmmadZuber@gmail.com| 05-27-2023 | Story Number 
     * @param   recordId the Contact recordId 
     * @summary  use wire for all REcored show
     */

    @wire(getReference, { recordId: '$recordId' })
    wiredReference({ error, data }) {
        if (data) {
            this.data = data;
            this.error = undefined;
            console.log('keeee' + this.keye);
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
// modal Popup  Refrenc
    async RefrencOpen() {
        const result = await refrencModalPopup.open({
            size: 'small', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            recordId: this.recordId,
        });
    }

}