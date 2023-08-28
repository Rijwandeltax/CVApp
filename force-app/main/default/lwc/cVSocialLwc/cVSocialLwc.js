/**
 * @description       : cVLwc.js
 * @author            : MohmmadZuber
 * @group             : 
 * @last modified on  : 07-27-2023
 * @last modified by  : MohmmadZuber@gmail.com
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   07-27-2023   MohmmadZuber@gmail.com            Initial Version
**/
import { LightningElement, api, wire, track } from 'lwc';
import getSocialHandle from '@salesforce/apex/CvInformeshon.getSocialHandle';
import socialHandelModPop from 'c/socialHandelModPop';
export default class CVSocialLwc extends LightningElement {

// assign varibles
    @api recordId;
    @track data;
    error;
    @track showSpinner = false;

      /**
     * @description wiredSocialHandle method to all recored get
     * @author  MohmmadZuber@gmail.com| 05-27-2023 | Story Number 
     * @param   recordId the Contact recordId 
     * @summary  use wire for all REcored show
     */
    @wire(getSocialHandle, { recordId: '$recordId' })
    wiredSocialHandle({ error, data }) {
        this.showSpinner = true;
        if (data) {
            this.data = data;
            this.error = undefined;
            this.showSpinner = false;
            console.log('socialhandle', this.data);
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
// modal Popup socialHandel
    async socialHandelModPopOpen() {
        console.log('modal1');
        const result = await socialHandelModPop.open({
            size: 'small', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            content: 'Social Handel Edit Recored',
            recordId: this.recordId,
        });
        console.log('modal2');
        console.log(result);
    }
}