public class CvInformeshon {
    @AuraEnabled(cacheable=true)
    
    public static Contact getContact(String recordId){
        // system.debug('accId >> ' + recordId);
        Contact conlist =[SELECT Id, Name,Title,Photo_URL__c,Profile__c,Address__c, Email, Phone, Formatted_Address__c, LastName,FirstName FROM Contact where id =: recordId];
        //system.debug(conlist);
        return conlist;       
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Certification__c> getCertification(String recordId){
        // system.debug('accId >> ' + recordId);
        List<Certification__c> cerlist =[SELECT Id, Name, Contact__c, Release__c,Order__c FROM Certification__c WHERE Contact__c =: recordId];
        system.debug(cerlist);
        return cerlist;      
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Work_Experience__c> getWorkExperience(String recordId){
        // system.debug('accId >> ' + recordId);
        List<Work_Experience__c> workList =[SELECT Id, Name, Company__c, Contact__c, Duration__c,Responsibilities__c FROM Work_Experience__c WHERE Contact__c =: recordId];
        //system.debug(cerlist);
        return workList;     
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Social_Handle__c> getSocialHandle(String recordId){
        // system.debug('accId >> ' + recordId);
        List<Social_Handle__c> socilList =[SELECT Id, Name, Handle_Icon__c, Contact__c, Handle_Link__c FROM Social_Handle__c WHERE Contact__c =: recordId];
        //system.debug(cerlist);
        return socilList;       
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Trailhead_Superbadge__c> getTrailheadSuperbadge(String recordId){
        // system.debug('accId >> ' + recordId);
        List<Trailhead_Superbadge__c> trailheadList =[SELECT Id, Name, Favourite__c, Contact__c, Superbadge_Description__c,Superbadge_Image__c,Superbadge_Link__c FROM Trailhead_Superbadge__c WHERE Contact__c =: recordId];
        system.debug(trailheadList);
        return trailheadList;       
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Education__c> getEducation(String recordId){
        List<Education__c> EducaList =[SELECT Id, Name, GPA__c, Contact__c, School_Name__c, Duration__c FROM Education__c WHERE Contact__c =: recordId];
        
        return EducaList;       
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Key_Expertise__c> getKeyExpertise(String recordId){
        List<Key_Expertise__c> keyList =[SELECT Id, Name, Score_Out_of_100__c, Contact__c FROM Key_Expertise__c WHERE Contact__c =: recordId];
        
        return keyList;       
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Reference__c> getReference(String recordId){
        List<Reference__c> referList =[SELECT Id, Name,Link__c, Company__c,Photo_URL__c,Relationship__c,MailTo__c, Contact__c FROM Reference__c WHERE Contact__c =: recordId];
        
        return referList;       
    }
    
    @AuraEnabled(cacheable=true)
    public static List<DataSet> getAllAccountsByRating(String recordId){
        List<AggregateResult> result =  [Select Count(Id) cnt, Score1__c from Competency__c  WHERE Contact__c =: recordId  group by  Score1__c];
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