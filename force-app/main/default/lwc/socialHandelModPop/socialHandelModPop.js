import { LightningElement, wire, track,api } from 'lwc';
import LightningModal from 'lightning/modal';
import getSocialHandle from '@salesforce/apex/CvInformeshon.getSocialHandle';
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
        label: 'Handle Icon',
        fieldName: 'Handle_Icon__c',
        type: 'text',
        editable: true,
    }, {
        label: 'Handle Link',
        fieldName: 'Handle_Link__c',
        type: 'text',
        editable: true,
    }
];
 
export default class modalpop2 extends LightningModal {
    columns = columns;
    @track contacts;
    saveDraftValues = [];
    @api recordId;
 
    @wire(getSocialHandle, { recordId: '$recordId' })
    contactData(result) {
        this.contacts = result;
        if (result.error) {
            this.contacts = undefined;
        }
    };
 
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
 
    ShowToast(title, message, variant, mode){
        const evt = new ShowToastEvent({
                title: title,
                message:message,
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