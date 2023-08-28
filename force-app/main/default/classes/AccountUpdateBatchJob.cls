global class AccountUpdateBatchJob implements Database.Batchable<sObject>
{
    global Database.QueryLocator start(Database.BatchableContext BC)
    {
        String query = 'SELECT Id, Date__c, Name FROM Account where Date__c != null';
       
        return Database.getQueryLocator(query);
    }
    global void execute(Database.BatchableContext BC, List<Account> scope)
    {
        for(Account a : scope)
        {
            if(a.Date__c <= system.today().addDays(-30)){
                a.Date1__c = system.today();
            }
          // a.Name = 'zubder';
        }
        update scope;
    }
    global void finish(Database.BatchableContext BC) {
    }
}