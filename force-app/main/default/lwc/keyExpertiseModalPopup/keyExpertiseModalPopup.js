/**
 * @description       : keyExpertiseModalPopup.js
 * @author            : MohmmadZuber
 * @group             : 
 * @last modified on  : 07-27-2023
 * @last modified by  : MohmmadZuber@gmail.com
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   07-27-2023   MohmmadZuber@gmail.com            Initial Version
**/
import { LightningElement, wire, track, api } from 'lwc';
import LightningModal from 'lightning/modal';
import getKeyExpertise from '@salesforce/apex/CvInformeshon.getKeyExpertise';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

// columns
const columns = [
    {
        label: 'Name',
        fieldName: 'Name',
        type: 'text',
        editable: true,
    }, {
        label: 'Score',
        fieldName: 'Score_Out_of_100__c',
        type: 'text',
        editable: true,
    }
];

export default class keyExpertiseModalPopup extends LightningModal {
    // assign varibles
    columns = columns;
    @track contacts;
    saveDraftValues = [];
    @api recordId;

    /**
       * @description contactData method to all recored get
       * @author  MohmmadZuber@gmail.com| 05-27-2023 | Story Number 
       * @param   recordId the Contact recordId 
       * @summary  use wire for all REcored show
       */
    @wire(getKeyExpertise, { recordId: '$recordId' })
    contactData(result) {
        this.contacts = result;
        if (result.error) {
            this.contacts = undefined;
        }
    };
    // save butten
    handleSave(event) {
        this.saveDraftValues = event.detail.draftValues;
        const recordInputs = this.saveDraftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });

        // Updateing the records using the UiRecordAPi
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(res => {
            this.ShowToast('Success', 'Records Updated Successfully!', 'success', 'dismissable');
            this.saveDraftValues = [];
            return this.refresh();
        }).catch(error => {
            this.ShowToast('Error', 'An Error Occured!!', 'error', 'dismissable');
        }).finally(() => {
            this.saveDraftValues = [];
        });
    }
    // Toast Masseg
    ShowToast(title, message, variant, mode) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    }

    // This function is used to refresh the table once data updated
    async refresh() {
        await refreshApex(this.contacts);
    }
}