/**
 * @description       : cVLwc.js
 * @author            : MohmmadZuber
 * @group             : 
 * @last modified on  : 07-27-2023
 * @last modified by  : MohmmadZuber@gmail.com
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   07-27-2023   MohmmadZuber@gmail.com            Initial Version
**/
import { LightningElement, api, wire, track } from 'lwc';
import modalPopupLwc from 'c/modalPopupLwc';
import { refreshApex } from '@salesforce/apex';
import { CurrentPageReference } from 'lightning/navigation';
import getContact from '@salesforce/apex/CvInformeshon.getContact';
export default class CVLwc extends LightningElement {
    // assign varibles
    @api recordId;
    @track data;
    error;
    @track wireResult;
    @track showSpinner = false;
    @api FirstName;
    @api LastName;

    /**
        * @description getPageReferenceParameters get url id
        * @author  MohmmadZuber@gmail.com | 05-27-2023 | Story Number 
        * @param   CurrentPageReference the contact recordId 
        * @summary  use CurrentPageReference url id
        */

    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
        if (currentPageReference) {
            if (currentPageReference.state.c__recordId != null) {
                console.log('page', currentPageReference);
                this.recordId = currentPageReference.state.c__recordId;
                console.log('iddd', this.recordId);
                let attributes = currentPageReference.attributes;
                let states = currentPageReference.state;
                let type = currentPageReference.type;
            }
        }
    }

    /**
    * @description wiredContacts method to all recored get
    * @author  MohmmadZuber@gmail.com| 05-27-2023 | Story Number 
    * @param   recordId the Contact recordId 
    * @summary  use wire for all REcored show
    */

    @wire(getContact, { recordId: '$recordId' })
    wiredContacts(result) {
        this.wireResult = result;
        this.showSpinner = true;
        if (result.data) {
            this.data = result.data;
            console.log('FirstName', result.data.FirstName);
            console.log('LastName', result.data.LastName);
            this.FirstName = result.data.FirstName;
            this.LastName = result.data.LastName;
            this.showSpinner = false;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }
    // This function is used to refresh the table once data updated
    async refreshData() {
        await refreshApex(this.wireResult);
        this.childmethod();
    }
    // modal Popup Contact
    async openModal() {
        console.log('modal1');
        const result = await modalPopupLwc.open({
            //size: 'medium', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            content: 'Contact Edit Recored',
            recordId: this.recordId,
        });
        this.refreshData();
    }

    handleName(event) {
        this.FirstName = event.detail.value;
    }

    handleLastName(event) {
        this.LastName = event.detail.value;
    }
    // value pass prent component 
    childmethod(event) {
        console.log('callParent');
        console.log('callParentFirstName ', this.FirstName);
        let paramData = { FirstName: this.FirstName, LastName: this.LastName };
        let ev = new CustomEvent('childmethod',
            { detail: paramData }
        );
        this.dispatchEvent(ev);
    }
    // value get child component
    callFromChild(event) {
        console.log('callchild22');
        this.Phone = event.detail.Phone;
        this.Email = event.detail.Email;
        console.log(JSON.stringify(event.detail));
        console.log('callchild...1');
        this.refreshData();
    }
}