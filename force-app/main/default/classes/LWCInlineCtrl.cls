public class LWCInlineCtrl {
    @AuraEnabled(Cacheable = true) 
    public static List<Contact> getContacts() {
        return [SELECT Id, Name, FirstName, LastName, Phone,Address__c, Email  FROM Contact];
    }
}