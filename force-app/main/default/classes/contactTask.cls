public class contactTask implements Schedulable{
    public static void execute(SchedulableContext ctx) {
        List<Task> tskList = new List<Task>();

        List<Contact> conlist = [SELECT id, LastName, Accountid,OwnerId, Account.Name  from Contact where LastName = 'muskan' ];
        // List<Account> acclist =[SELECT ID,Name, (SELECT id,LastName, OwnerId FROM Contacts) FROM Account where id = '0015i00000qF697AAC'];
        
        for(contact co : conlist ){
            system.debug(co.LastName);
            if(co.Account.Name == co.LastName){
               Task tsk = new Task();
                tsk.Subject = 'Test Task';
                tsk.Status = 'Open';
                tsk.Priority = 'Normal';
                tsk.WhatId = co.ID;
                tsk.OwnerId = co.OwnerId;
                tskList.add(tsk);
                system.debug(co.Account.Name);
            }
        }
        
       insert tskList;
    }
}