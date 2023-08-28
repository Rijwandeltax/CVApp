@isTest
private class CvInformeshonTest {
    @testSetup static void dataSetup() {
        
        contact co = new contact();
        co.LastName = 'test';
        
        insert co;
        
        Certification__c cer = new Certification__c();
        cer.Name = 'test';
        cer.Contact__c = co.id;
        
        insert cer;
        
        Work_Experience__c work = new Work_Experience__c();
        work.Name = 'test';
        work.Contact__c = co.id;
        
        insert work;
        
        Social_Handle__c socail = new Social_Handle__c();
        socail.Name = 'test';
        socail.Contact__c = co.id;
        
        insert socail;
        
        Trailhead_Superbadge__c trail = new Trailhead_Superbadge__c();
        trail.Name = 'test';
        trail.Contact__c = co.id;
        
        insert trail;
        
        Education__c educa = new Education__c();
        educa.Name = 'test';
        educa.Contact__c = co.id;
        
        insert educa;
        
        Key_Expertise__c key = new Key_Expertise__c();
        key.Name = 'test';
        key.Contact__c = co.id;
        
        insert key;
        
        Reference__c ref = new Reference__c();
        ref.Name = 'test';
        ref.Contact__c = co.id;
        
        insert ref;
        
        Competency__c comp = new Competency__c();
        comp.Name = 'test';
        comp.Contact__c = co.id;
        
        insert comp;
        
        
    }  
    
    @isTest static void unitTest1() {
        Contact co = [SELECT id, LastName FROM COntact WHERE LastName = 'test' LIMIT 1];
        test.startTest();
        CvInformeshon.getContact(co.id);
        CvInformeshon.getCertification(co.id);
        CvInformeshon.getWorkExperience(co.id);
        CvInformeshon.getSocialHandle(co.id);
        CvInformeshon.getTrailheadSuperbadge(co.id);
        CvInformeshon.getEducation(co.id);
        CvInformeshon.getKeyExpertise(co.id);
        CvInformeshon.getReference(co.id);
        CvInformeshon.getAllAccountsByRating(co.id);
        test.stopTest();
        
    }
    
}