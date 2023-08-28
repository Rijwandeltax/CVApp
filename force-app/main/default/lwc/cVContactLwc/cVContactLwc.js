/**
 * @description       : cVContactLwc.js
 * @author            : MohmmadZuber
 * @group             : 
 * @last modified on  : 07-27-2023
 * @last modified by  : MohmmadZuber@gmail.com
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   07-27-2023   MohmmadZuber@gmail.com            Initial Version
**/
import { LightningElement, api, wire, track } from 'lwc';
import modalPopup4Contact from 'c/modalPopup4Contact';
import { refreshApex } from '@salesforce/apex';
import getContact from '@salesforce/apex/CvInformeshon.getContact';
export default class CVLwc extends LightningElement {
// assign varibles
    @api recordId;
    @track data;
    error;
    @track wireResult;
    @track showSpinner = false;
    @api Phone;
    @api Email;

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
            this.Phone = result.data.Phone;
            this.Email = result.data.Email;
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
        this.childmethod();
    }
// modal Popup Contact
    async openModal() {
        console.log('modal1');
        const result = await modalPopup4Contact.open({
            size: 'small', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            content: 'Contact Edit Recored',
            recordId: this.recordId,
        });
        this.refreshData();
    }

    handleEmail(event) {
        this.Email = event.detail.value;
    }

    handlePhone(event) {
        this.Phone = event.detail.value;
    }
// value pass prent component 
    childmethod(event) {
        console.log('callParent22');
        let paramData = { Phone: this.Phone, Email: this.Email };
        let ev = new CustomEvent('childmethod',
            { detail: paramData }
        );
        this.dispatchEvent(ev);
    }
}