/**
 * @description       : modalPopup4Contact.js
 * @author            : MohmmadZuber
 * @group             : 
 * @last modified on  : 07-27-2023
 * @last modified by  : MohmmadZuber@gmail.com
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   07-27-2023   MohmmadZuber@gmail.com            Initial Version
**/
import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';
export default class modalPopup4Contact extends LightningModal {

// assign varibles
    @api recordId;
    @api objectApiName;
    @api content;
    @track showLoading = false;

// connectedCallback setTimeout spiner
    connectedCallback() {
        this.showLoading = true;
        setTimeout(() => {
            this.showLoading = false;
        }, 2000);
    }
// close modal Popup butten
    handleClose() {
        this.close('close popup');
    }
// Save modal Popup
    handleSave(event) {
        this.showLoading = true;
        console.log('sasa');
        event.preventDefault();
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
// Success modal Popup
    handleSuccess(event) {
        this.showLoading = false;
        this.close('close popup');
    }

    handleEmail(event) {
        this.Email = event.detail.value;
    }

    handlePhone(event) {
        this.Phone = event.detail.value;
    }
}