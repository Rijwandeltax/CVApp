import { LightningElement, api, wire, track } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { CurrentPageReference } from 'lightning/navigation';
import modalPopupLwc from 'c/modalPopupLwc';
import modalPopupLwc1 from 'c/modalPopupLwc1';
import modalpop2 from 'c/modalpop2';
import modalpop3 from 'c/modalpop3';
import educahsonModalPopup from 'c/educahsonModalPopup';
import refrencModalPopup from 'c/refrencModalPopup';
import keyExpertiseModalPopup from 'c/keyExpertiseModalPopup';
import socialHandelModPop from 'c/socialHandelModPop';
import superBadgModalpoop from 'c/superBadgModalpoop';
import modalPopup4Contact from 'c/modalPopup4Contact';
import getContact from '@salesforce/apex/CvInformeshon.getContact';
import getWorkExperience from '@salesforce/apex/CvInformeshon.getWorkExperience';
import getCertification from '@salesforce/apex/CvInformeshon.getCertification';
import getSocialHandle from '@salesforce/apex/CvInformeshon.getSocialHandle';
import getTrailheadSuperbadge from '@salesforce/apex/CvInformeshon.getTrailheadSuperbadge';
import getEducation from '@salesforce/apex/CvInformeshon.getEducation';
import getKeyExpertise from '@salesforce/apex/CvInformeshon.getKeyExpertise';
import getReference from '@salesforce/apex/CvInformeshon.getReference';

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

export default class CvInformeshonLwc extends LightningElement {

    @api recordId;
    @api superId;
    currentPageReference = null;
    urlStateParameters = null;
    columns = columns;
    @track data;
    @track Certification;
    @track worekExpdata;
    @track socialhandle;
    @track superbadge;
    @track Education;
    @track keye;
    @track Reference;
    error;
    error1;
    error2;
    error3;
    error4;
    error5;
    error6;
    error7;
    @track editMode = false;
    @track showSpinner = false;
    @track wireResult;
    Name;

        @wire(CurrentPageReference)
       getPageReferenceParameters(currentPageReference) {
          if (currentPageReference) {
           if(currentPageReference.state.c__recordId != null){
             console.log('page',currentPageReference);
             this.recordId = currentPageReference.state.c__recordId;
             console.log('iddd',this.recordId);
             let attributes = currentPageReference.attributes;
             let states = currentPageReference.state;
             let type = currentPageReference.type;
          }
       }
       }

    /*   @wire(getContact, { recordId: '$recordId' })
       wiredContacts({ error, data }) {
           console.log('contactdata1',this.recordId);
           this.showSpinner = true;
           if (data) {
               this.data = data;
               this.error = undefined;
               console.log('contactdata2', this.data);
               this.showSpinner = false;
           } else if (error) {
               this.error = error;
               this.data = undefined;
           }
       }*/

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

    async refreshData() {
        await refreshApex(this.wireResult);
    }

     async refreshData1() {
        await refreshApex(this.wireResult1);
    }

    @wire(getCertification, { recordId: '$recordId' })
    wiredCertification({ error, data }) {
        if (data) {
            console.log('zzz', data);
            //this.cerid = data[0].Id;
            this.Certification = data;
            this.error1 = undefined;
            console.log('cetificationData' + this.Certification);
        } else if (error) {
            this.error1 = error;
            this.Certification = undefined;
        }
    }

    @wire(getWorkExperience, { recordId: '$recordId' })
    wiredExperience({ error, data }) {
        if (data) {
            this.worekExpdata = data;
            this.error2 = undefined;
            console.log('worekExpdata', this.worekExpdata);
        } else if (error) {
            this.error2 = error;
            this.worekExpdata = undefined;
        }
    }

    @wire(getSocialHandle, { recordId: '$recordId' })
    wiredSocialHandle({ error, data }) {
        if (data) {
            this.socialhandle = data;
            this.error3 = undefined;
            console.log('socialhandle', this.socialhandle);
        } else if (error) {
            this.error3 = error;
            this.socialhandle = undefined;
        }
    }

  /*  @wire(getTrailheadSuperbadge, { recordId: '$recordId' })
    wiredTrailhead({ error, data }) {
        if (data) {
            console.log('dasdd', data);
            if(data.length > 0){
             this.superId = data[0].Id;
             console.log('idddss', this.superId);
            }
            this.superbadge = data;
            console.log('ssss', this.superbadge);
            this.error4 = undefined;
        } else if (error) {
            this.error4 = error;
            this.superbadge = undefined;
        }
    }*/

    @wire(getTrailheadSuperbadge, { recordId: '$recordId' })
    wiredTrailhead(result) {
        this.wireResult1 = result;
        if (result.data) {

            if(result.data.length > 0){
             this.superId = result.data[0].Id;
             console.log('idddss', this.superId);
            }

            this.superbadge = result.data;
            console.log(this.superbadge);
            this.error4 = undefined;
        } else if (result.error) {
            this.error4 = result.error;
            this.superbadge = undefined;
        }
    }

    @wire(getEducation, { recordId: '$recordId' })
    wiredEducation({ error, data }) {
        if (data) {
            this.Education = data;
            this.error5 = undefined;
            console.log('Education' + this.Education);
        } else if (error) {
            this.error5 = error;
            this.Education = undefined;
        }
    }

    @wire(getKeyExpertise, { recordId: '$recordId' })
    wiredKeyExpertise({ error, data }) {
        if (data) {
            this.keye = data;
            this.error6 = undefined;
            console.log('keeee' + this.keye);
        } else if (error) {
            this.error6 = error;
            this.keye = undefined;
        }
    }

    @wire(getReference, { recordId: '$recordId' })
    wiredReference({ error, data }) {
        if (data) {
            this.Reference = data;
            this.error7 = undefined;
            console.log('keeee' + this.keye);
        } else if (error) {
            this.error7 = error;
            this.Reference = undefined;
        }
    }

    async openModal() {
        console.log('modal1');
        const result = await modalPopupLwc.open({
            size: 'large', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            content: 'Contact Edit Recored',
            recordId: this.recordId,
        });
        this.refreshData();
    }

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

    async openeducahsonModalPopup() {
        console.log('modal1');
        const result = await educahsonModalPopup.open({
            size: 'small', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            recordId: this.recordId,
        });
    }

    async openWorek() {
        console.log('modal1');
        const result = await modalpop3.open({
            size: 'small', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            content: 'worekExp Edit Recored',
            recordId: this.recordId,
        });
        console.log('modal2');
        console.log(result);
    }

    async openContactModel4() {
        console.log('modal1');
        const result = await modalPopup4Contact.open({
            size: 'medium', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            content: 'Contact Edit Recored',
            recordId: this.recordId,
        });
        console.log('modal2');
        console.log(result);
        this.refreshData();
    }

    async socialHandelModPopOpen() {
        console.log('modal1');
        const result = await socialHandelModPop.open({
            size: 'small', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            content: 'Social Handel Edit Recored',
            recordId: this.recordId,
        });
        console.log('modal2');
        console.log(result);
    }

    async SuperBadgOpen() {
        const result = await superBadgModalpoop.open({
            size: 'medium', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            content: 'SuperBadg Edit Recored',
            recordId: this.superId,
        });
        this.refreshData1();
    }

    async keyExpertiseOpen() {
        const result = await keyExpertiseModalPopup.open({
            size: 'small', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            recordId: this.recordId,
        });
    }

    async RefrencOpen() {
        const result = await refrencModalPopup.open({
            size: 'small', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            recordId: this.recordId,
        });
    }

    handleLastName(event) {
        this.Name = event.detail.value;
    }
}