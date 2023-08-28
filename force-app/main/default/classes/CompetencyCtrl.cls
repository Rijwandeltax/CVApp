public class CompetencyCtrl {
    @AuraEnabled(cacheable=true)
    public static List<DataSet> getAllAccountsByRating(){
        List<AggregateResult> result =  [Select Count(Id) cnt, Score1__c from Competency__c  group by Score1__c];
        List<DataSet> dataSet = new List<DataSet>();
        for(AggregateResult ar:result){
            String status =  (String)ar.get('Score1__c') ;
            Integer total =(Integer)ar.get('cnt');
            dataSet.add(new DataSet(status ,total));
        }
        System.debug('dataSet'+dataSet);
        return dataSet ;
    }
    public class DataSet{
        public DataSet(String label ,Integer count){
            this.label  = label ;
            this.count = count ;
        }
        @AuraEnabled
        public String label {get;set;}
        @AuraEnabled
        public Integer  count {get;set;}
    }
}