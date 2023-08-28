import { LightningElement, api, wire, track } from 'lwc';
import getEducation from '@salesforce/apex/CvInformeshon.getEducation';
import educahsonModalPopup from 'c/educahsonModalPopup';

const columns = [
    {
        label: 'Name',
        fieldName: 'Name',
        type: 'text',
    }, {
        label: 'School Name',
        fieldName: 'School_Name__c',
        type: 'text',
    }, {
        label: 'Duration',
        fieldName: 'Duration__c',
        type: 'text',
    }, {
        label: 'GPA',
        fieldName: 'GPA__c',
        type: 'Number',
    }
];

export default class CVEducationLwc extends LightningElement {

    @api recordId;
    @track data;
    error;
    columns = columns;

    @wire(getEducation, { recordId: '$recordId' })
    wiredEducation({ error, data }) {
        if (data) {
            this.data = data;
            this.error = undefined;
            console.log('Education' + this.data);
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

     async openeducahsonModalPopup() {
        console.log('modal1');
        const result = await educahsonModalPopup.open({
            size: 'small', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            recordId: this.recordId,
        });
    }

}