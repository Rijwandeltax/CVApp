public class AccountTaskHandler {
    public static void AcountMethad(List<Account> acclist){
        List <task> taskToInsert = new List <task> ();
        List <task> taskToInsert1 = new List <task> ();
        for(Account acc : acclist){
            if(acc.Date__c == system.today()){
                Task t = new Task();
                t.Subject = 'please call me';
                t.OwnerId = acc.OwnerId;
                t.WhatId = acc.id;
                t.Status = 'open';
                taskToInsert .add(t);
            }
            else if(acc.Date__c == system.today().toStartOfMonth().addMonths(+3)){
                Task t1 = new Task();
                t1.Subject = 'please call 1';
                t1.OwnerId = acc.OwnerId;
                t1.WhatId = acc.id;
                t1.Status = 'open';
                taskToInsert1 .add(t1);
                
                Task t2 = new Task();
                t2.Subject = 'please call 2';
                t2.OwnerId = acc.OwnerId;
                t2.WhatId = acc.id;
                t2.Status = 'open';
                taskToInsert1 .add(t2);
            }
        }
        insert taskToInsert1;
        insert taskToInsert;
    }
}