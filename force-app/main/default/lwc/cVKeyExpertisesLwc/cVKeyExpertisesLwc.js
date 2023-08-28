import { LightningElement, api, wire, track } from 'lwc';
import getKeyExpertise from '@salesforce/apex/CvInformeshon.getKeyExpertise';
import keyExpertiseModalPopup from 'c/keyExpertiseModalPopup';
export default class CVKeyExpertisesLwc extends LightningElement {

    @api recordId;
    @track data;
    error;

    @wire(getKeyExpertise, { recordId: '$recordId' })
    wiredKeyExpertise({ error, data }) {
        if (data) {
            this.data = data;
            this.error = undefined;
            console.log('keeee' + this.keye);
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    async keyExpertiseOpen() {
        const result = await keyExpertiseModalPopup.open({
            size: 'small', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            recordId: this.recordId,
        });
    }
}