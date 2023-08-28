/**
 * @description       : cVPorfileLwc.js
 * @author            : MohmmadZuber
 * @group             : 
 * @last modified on  : 07-27-2023
 * @last modified by  : MohmmadZuber@gmail.com
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   07-27-2023   MohmmadZuber@gmail.com            Initial Version
**/
import { LightningElement, api, wire, track } from 'lwc';
import modalPopupLwc1 from 'c/modalPopupLwc1';
import { refreshApex } from '@salesforce/apex';
import getContact from '@salesforce/apex/CvInformeshon.getContact';
export default class CVLwc extends LightningElement {

// assign varibles
    @api recordId ;
    @track data;
    error;
    @track wireResult;
    @track showSpinner = false;

    /**
     * @description wiredContacts method to all recored get
     * @author  MohmmadZuber@gmail.com| 05-27-2023 | Story Number 
     * @param   recordId the Contact recordId 
     * @summary  use wire for all REcored show
     */

    @wire(getContact, { recordId: '$recordId' })
    wiredContacts(result) {
        this.wireResult = result;
        this.showSpinner = true;
        if (result.data) {
            this.data = result.data;
            console.log(this.data);
            this.showSpinner = false;
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
// modal Popup Contact
    async openModal1() {
        console.log('modal1');
        const result = await modalPopupLwc1.open({
            size: 'medium', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            content: 'Contact Edit Recored',
            recordId: this.recordId,
        });
        this.refreshData();
    }
}