public class AccountToContactUpdateHendler {
    public static void accountToContact(List<Account> accList){
        set<id> conId = new set<id>();
        for(Account acc : accList){
            conId.add(acc.id);
        }
        List<Contact> colist = [SELECT id,LastName, AccountId, Email from Contact WHERE AccountId in : conId];
        List<Contact> updatecontact = new List<Contact>();
        for(Account ac : accList){
            if(ac.Phone != null){
                for(Contact co : colist){
                    co.Phone = ac.Phone;
                    updatecontact.add(co);
                }
            }
        }
        update updatecontact;
    }
}