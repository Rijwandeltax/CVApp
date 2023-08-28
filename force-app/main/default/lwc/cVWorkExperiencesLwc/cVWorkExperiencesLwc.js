/**
 * @description       : cVWorkExperiencesLwc.js
 * @author            : MohmmadZuber
 * @group             : 
 * @last modified on  : 07-27-2023
 * @last modified by  : MohmmadZuber@gmail.com
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   07-27-2023   MohmmadZuber@gmail.com            Initial Version
**/
import { LightningElement, api, wire, track } from 'lwc';
import getWorkExperience from '@salesforce/apex/CvInformeshon.getWorkExperience';
import modalpop3 from 'c/modalpop3';
export default class CVWorkExperiencesLwc extends LightningElement {
    // assign varibles
    @api recordId;
    @track data;
    error;

    /**
    * @description wiredExperience method to all recored get
    * @author  MohmmadZuber@gmail.com| 05-27-2023 | Story Number 
    * @param   recordId the Contact recordId 
    * @summary  use wire for all REcored show
    */
    @wire(getWorkExperience, { recordId: '$recordId' })
    wiredExperience({ error, data }) {
        if (data) {
            this.data = data;
            this.error = undefined;
            console.log('worekExpdata', this.data);
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
    // modal Popup WorkExperience
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
}