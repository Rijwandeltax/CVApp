import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';
export default class modalPopupLwc extends LightningModal {

    @api recordId;
    @api objectApiName;
    @api content;
    @track showLoading = false;

    connectedCallback() {
        this.showLoading = true;
        setTimeout(() => {
            this.showLoading = false;
        }, 2000);
    }

    handleClose() {
        this.close('close popup');
    }

    handleSave(event) {
        this.showLoading = true;
        console.log('savefrest');
        event.preventDefault();
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        console.log('savesecan');
    }
    
    handleName(event) {
        this.FirstName = event.detail.value;
    }

    handleLastName(event) {
        this.LastName = event.detail.value;
    }

     handleTitle(event) {
        this.Title = event.detail.value;
    }


    handleSuccess(event) {
        this.showLoading = false;
        this.close('close popup');
    }

}