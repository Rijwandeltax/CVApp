public class ChartModalCtrl {
    @AuraEnabled (cacheable=true)
    public static List<Competency__c> fetchCompetency(String recordId){

        List<Competency__c> acc= [SELECT Id, Name, Score1__c, Contact__c FROM Competency__c  WHERE Contact__c =: recordId];    
        system.debug(acc);
        return acc;
    }
}