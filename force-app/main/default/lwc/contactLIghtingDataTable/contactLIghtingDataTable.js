/**
 * @description       : 
 * @author            : MohmmadZuber
 * @group             : 
 * @last modified on  : 07-27-2023
 * @last modified by  : MohmmadZuber@gmail.com
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   07-27-2023   MohmmadZuber@gmail.com            Initial Version
**/

import { LightningElement, wire, track, api } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getContacts from '@salesforce/apex/LWCInlineCtrl.getContacts';

// dataTable columns
const columns = [
    {
        label: 'FirstName',
        fieldName: 'FirstName',
        type: 'text',
    }, {
        label: 'LastName',
        fieldName: 'LastName',
        type: 'text',
    }, {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'Phone',
    }, {
        label: 'Email',
        fieldName: 'Email',
        type: 'Email',
    },
    {
        type: "button", label: 'Show CV', typeAttributes: {
            label: 'Show CV',
            name: 'Show CV',
            title: 'Show CV',
            disabled: false,
            value: 'view',
            iconPosition: 'left',
            variant: 'Brand'
        }
    }
];

export default class LWCInline extends LightningElement {
// assign varibles
    columns = columns;
    @track contacts;
    saveDraftValues = [];
    showcv = false;
    @api recordId

     /**
     * @description contactData method to get record
     * @author MohmmadZuber@gmail.com| 05-27-2023 | Story Number 
     * @param  
     * @summary  use the all recofred gedt contact 
     */

    @wire(getContacts)
    contactData(result) {
        this.contacts = result;
        if (result.error) {
            this.contacts = undefined;
        }
    };
// Row butten clike to show cv comp. 
    callRowAction(event) {
        console.log('zzzz');
        this.recordId = event.detail.row.Id;
        console.log('recIdddd', this.recordId);
        const actionName = event.detail.action.name;
        console.log('if');
        if (actionName === 'Show CV') {
            console.log('iftrue');
            this.showcv = true;

        }
    }
// Call child component get value 
    callFromChild(event) {
        console.log('callchild');
        this.FirstName = event.detail.Name;
        this.LastName = event.detail.LastName;
        console.log(JSON.stringify(event.detail));
        console.log('callchild...1');
        this.refreshData();
    }
// all data refresh 
    async refreshData() {
        await refreshApex(this.contacts);
        console.log('refreshcall');
    }
}