import { LightningElement, track, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class CreateRecordLWC extends NavigationMixin(LightningElement) {

    step = 1;
    currentStep = "1";
    @track showLoading = false;
    @track showContact = true;
    @track showcertficashon = false;
    @track ShowWorkExp = false;
    @track ShowCompetency = false;
    @track showEducation = false;
    @track showKeyExpertise = false;
    @track showReference = false;
    @track showSocial = false;
    @track TrailheadSuperbadge = false;
    @api Contactid;
    @track disableFieldBudget = false;

    handelskip() {
        this.showcertficashon = false;
        this.ShowWorkExp = true;
        this.nextPage();
    }

    handelskip1() {
        this.ShowWorkExp = false;
        this.ShowCompetency = true;
        this.nextPage();
    }

    handelskip2() {
        this.ShowCompetency = false;
        this.showEducation = true;
        this.nextPage();
    }

    handelskip3() {
        this.showEducation = false;
        this.showKeyExpertise = true;
        this.nextPage();
    }

    handelskip4() {
        this.showKeyExpertise = false;
        this.showReference = true;
        this.nextPage();
    }

    handelskip5() {
        this.showReference = false;
        this.showSocial = true;
        this.nextPage();
    }

    handelskip6() {
        this.showSocial = false;
        this.TrailheadSuperbadge = true;
        this.nextPage();
    }

    handleCreate() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = {'FirstName': this.template.querySelector("[data-field='FirstName']").value, 'LastName': this.template.querySelector("[data-field='LastName']").value, 'Email': this.template.querySelector("[data-field='Email']").value, 'Photo_URL__c': this.template.querySelector("[data-field='Photo_URL__c']").value, 'Profile__c': this.template.querySelector("[data-field='Profile__c']").value, 'Address__c': this.template.querySelector("[data-field='Address__c']").value, 'Phone': this.template.querySelector("[data-field='Phone']").value, 'Title': this.template.querySelector("[data-field='Title']").value };
            const recordInput = { 'apiName': 'Contact', fields };
            console.log(recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res', res);
                    this.Contactid = res.id;
                    this.showToast('Success!!', 'Contact created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.showContact = false;
                    this.showcertficashon = true;
                    this.nextPage();

                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }

    handleReset() {

        this.template.querySelectorAll('lightning-input').forEach(element => {
            if (element.type === 'checkbox' || element.type === 'checkbox-button') {
                element.checked = false;
            } else {
                element.value = null;
            }
        });

        this.template.querySelector('lightning-input[data-field="Contact__c"]').value = this.Contactid;
    }

    handleSaveNew1() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Release__c': this.template.querySelector("[data-field='Release__c']").value, 'Order__c': this.template.querySelector("[data-field='Order__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value };
            const recordInput = { 'apiName': 'Certification__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Certification created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.showcertficashon = true;
                    this.handleReset();
                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }


    handleCreate1() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Release__c': this.template.querySelector("[data-field='Release__c']").value, 'Order__c': this.template.querySelector("[data-field='Order__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value };
            const recordInput = { 'apiName': 'Certification__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Certification created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.showcertficashon = false;
                    this.ShowWorkExp = true;
                    this.nextPage();
                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }


    handleCreate2() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Company__c': this.template.querySelector("[data-field='Company__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value, 'Responsibilities__c': this.template.querySelector("[data-field='Responsibilities__c']").value, 'Duration__c': this.template.querySelector("[data-field='Duration__c']").value };
            const recordInput = { 'apiName': 'Work_Experience__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Work Experience created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.ShowWorkExp = false;
                    this.ShowCompetency = true;
                    this.nextPage();
                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }

    handleSaveNew2() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Company__c': this.template.querySelector("[data-field='Company__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value, 'Responsibilities__c': this.template.querySelector("[data-field='Responsibilities__c']").value, 'Duration__c': this.template.querySelector("[data-field='Duration__c']").value };
            const recordInput = { 'apiName': 'Work_Experience__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Work Experience created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.ShowWorkExp = true;
                    this.handleReset();
                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }

    handleCreate3() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Score1__c': this.template.querySelector("[data-field='Score1__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value };
            const recordInput = { 'apiName': 'Competency__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Competency created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.ShowCompetency = false;
                    this.showEducation = true;
                    this.nextPage();
                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }

    handleSaveNew3() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Score1__c': this.template.querySelector("[data-field='Score1__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value };
            const recordInput = { 'apiName': 'Competency__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Competency created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.ShowCompetency = true;
                    this.handleReset();
                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }

    handleCreate4() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Duration__c': this.template.querySelector("[data-field='Duration__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value, 'School_Name__c': this.template.querySelector("[data-field='School_Name__c']").value, 'GPA__c': this.template.querySelector("[data-field='GPA__c']").value };
            const recordInput = { 'apiName': 'Education__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Education created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.showEducation = false;
                    this.showKeyExpertise = true;
                    this.nextPage();
                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }

    handleSaveNew4() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Duration__c': this.template.querySelector("[data-field='Duration__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value, 'School_Name__c': this.template.querySelector("[data-field='School_Name__c']").value, 'GPA__c': this.template.querySelector("[data-field='GPA__c']").value };
            const recordInput = { 'apiName': 'Education__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Education created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.showEducation = true;
                    this.handleReset();
                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }

    handleCreate5() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Score_Out_of_100__c': this.template.querySelector("[data-field='Score_Out_of_100__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value };
            const recordInput = { 'apiName': 'Key_Expertise__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Key Expertise created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.showKeyExpertise = false;
                    this.showReference = true;
                    this.nextPage();
                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }

    handleSaveNew5() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Score_Out_of_100__c': this.template.querySelector("[data-field='Score_Out_of_100__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value };
            const recordInput = { 'apiName': 'Key_Expertise__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Key Expertise created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.showKeyExpertise = true;
                    this.handleReset();
                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }

    handleCreate6() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Company__c': this.template.querySelector("[data-field='Company__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value, 'Relationship__c': this.template.querySelector("[data-field='Relationship__c']").value, 'Link__c': this.template.querySelector("[data-field='Link__c']").value };
            const recordInput = { 'apiName': 'Reference__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Reference created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.showReference = false;
                    this.showSocial = true;
                    this.nextPage();

                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }

    handleSaveNew6() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Company__c': this.template.querySelector("[data-field='Company__c']").value, 'Photo_URL__c': this.template.querySelector("[data-field='Photo_URL__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value, 'Relationship__c': this.template.querySelector("[data-field='Relationship__c']").value, 'Link__c': this.template.querySelector("[data-field='Link__c']").value };
            const recordInput = { 'apiName': 'Reference__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Reference created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.showReference = true;
                    this.handleReset();

                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }

    handleCreate7() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Handle_Icon__c': this.template.querySelector("[data-field='Handle_Icon__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value, 'Handle_Link__c': this.template.querySelector("[data-field='Handle_Link__c']").value };
            const recordInput = { 'apiName': 'Social_Handle__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Social Handle created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.showSocial = false;
                    this.TrailheadSuperbadge = true;
                    this.nextPage();

                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }

    handleSaveNew7() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Handle_Icon__c': this.template.querySelector("[data-field='Handle_Icon__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value, 'Handle_Link__c': this.template.querySelector("[data-field='Handle_Link__c']").value };
            const recordInput = { 'apiName': 'Social_Handle__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Social Handle created successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.showSocial = true;
                    this.handleReset();

                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }

    handleCreate8() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            // Create the recordInput object
            var fields = { 'Contact__c': this.template.querySelector("[data-field='Contact__c']").value, 'Superbadge_Description__c': this.template.querySelector("[data-field='Superbadge_Description__c']").value, 'Name': this.template.querySelector("[data-field='Name']").value, 'Superbadge_Image__c': this.template.querySelector("[data-field='Superbadge_Image__c']").value, 'Superbadge_Link__c': this.template.querySelector("[data-field='Superbadge_Link__c']").value };
            const recordInput = { 'apiName': 'Trailhead_Superbadge__c', fields };
            console.log('zzz', recordInput);
            createRecord(recordInput)
                .then((res) => {
                    console.log('res2', res);
                    this.showToast('Success!!', 'Trailhead Superbadge & All Inforemeshon successfully created !!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    this.TrailheadSuperbadge = false;
                    this.handleLWCNavigate();
                    this.nextPage();

                })
                .catch(error => {
                    this.showLoading = false;
                    console.log(error);
                    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                });
        }
        else {
            // The form is not valid
            this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
        }
    }

    handleLWCNavigate() {
        console.log('nevigATTT1');
        this[NavigationMixin.Navigate]({
            type: "standard__navItemPage",
            attributes: {
                apiName: 'CVLwc'
            },
            state: {
                c__recordId: this.Contactid
            }
        });
        console.log('vvvvvv');
    }

    navigateToHomePage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'home'
            },
        });
    }

    nextPage(event) {
        if (this.step != 9) {
            this.step++;
        }

        this.handleSetUpSteps();
    }

    handleSetUpSteps() {
        console.log('progesing');
        this.showContact = this.step == 1;
        console.log('step', this.step);
        this.showcertficashon = this.step == 2;
        this.ShowWorkExp = this.step == 3;
        this.ShowCompetency = this.step == 4;
        this.showEducation = this.step == 5;
        this.showKeyExpertise = this.step == 6;
        this.showReference = this.step == 7;
        this.showSocial = this.step == 8;
        this.TrailheadSuperbadge = this.step == 9;
        this.currentStep = "" + this.step;
    }

    showToast(title, message, variant, mode) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    }
}