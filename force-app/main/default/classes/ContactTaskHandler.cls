public class ContactTaskHandler {
    public static void taskcreate(List<Contact> conlist){
        
        List<Task> tasks = new List<task>();
        for(Contact co : [SELECT ID,LastName,Account.Name,OwnerId,Account.OwnerId from Contact where id in : conlist]){
            
            if(co.LastName == co.Account.Name){
                Task newTask1 = new Task();
                newTask1.subject = 'Automated Task 1 - Stage 1';
                newTask1.whoId = co.id;
                newTask1.ownerId = co.OwnerId;
                newTask1.status = 'In Progress';
                newTask1.Priority = 'Normal';
                tasks.add(newTask1);
            }
            
        }
        if (tasks.size() > 0) {
            insert tasks;
        }
    }
}