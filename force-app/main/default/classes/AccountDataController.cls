public class AccountDataController {
    
    
    
    
    
    @AuraEnabled (cacheable=true)
    public static List<Account> fetchAccounts(){
        List<Account> acc= [SELECT Id, Name, Type, Phone, Prospect__c
                            FROM Account];    
        system.debug(acc);
        return acc;
    }
}