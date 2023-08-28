import { LightningElement, api, wire, track } from 'lwc';
import modalpop2 from 'c/modalpop2';
import getCertification from '@salesforce/apex/CvInformeshon.getCertification';
export default class CVCertificationsLwc extends LightningElement {

    @api recordId;
    @track data;
    error;

    @wire(getCertification, { recordId: '$recordId' })
    wiredCertification({ error, data }) {
        if (data) {
            console.log('zzz', data);
            //this.cerid = data[0].Id;
            this.data = data;
            this.error = undefined;
            console.log('cetificationData' + this.data);
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    async openCertification() {
        console.log('modal1');
        const result = await modalpop2.open({
            size: 'small', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            content: 'Certification Edit Recored',
            recordId: this.recordId,
        });
        console.log('modal2');
        console.log(result);
    }
}