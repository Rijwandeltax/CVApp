import { LightningElement, wire, track, api } from 'lwc';
import LightningModal from 'lightning/modal';
import fetchCompetency from '@salesforce/apex/ChartModalCtrl.fetchCompetency';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';

// columns
const columns = [
    {
        label: 'Name',
        fieldName: 'Name',
        type: 'text',
        editable: true,
    }, {
        label: 'Score',
        fieldName: 'Score1__c',
        type: 'text',
        editable: true,
    }/*, {
        type: "button", label: 'Delete', initialWidth: 110, typeAttributes: {
            label: 'Delete',
            name: 'Delete',
            title: 'Delete',
            disabled: false,
            value: 'delete',
            iconPosition: 'left',
            iconName: 'utility:delete',
            variant: 'destructive'
        }
    }*/
];

export default class chartModalPopup extends LightningModal {

    columns = columns;
    @track contacts;
    saveDraftValues = [];
    @api recordId;
    @api recordId1;
    @api content;

    @wire(fetchCompetency, { recordId: '$recordId' })
    contactData(result) {
        this.contacts = result;
        console.log('cccc', this.contacts);
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

    callRowAction(event) {
        console.log('calldddd');
        this.recordId1 = event.detail.row.Id;
        const actionName = event.detail.action.name;
        if (actionName === 'Delete') {
            this.handleDeleteRow(this.recordId1);
            console.log('delete12');
        }
    }


    handleDeleteRow(recordIdToDelete) {
        deleteRecord(recordIdToDelete);
        this.refresh()
            .then(result => {
                this.showToast('Success!!', 'Record deleted successfully!!', 'success', 'dismissable');
                return this.refresh();
            }).catch(error => {
                this.error = error;
            });

    }

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