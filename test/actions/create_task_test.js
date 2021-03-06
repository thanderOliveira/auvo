const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../lib/actions/Task');

const event = {
  meta: {
    baseURI: process.env.BASE_URI
  },
  auth: {
    accessToken: process.env.ACCESS_TOKEN
  },
  input: {
   "idUserFrom":120,
   "idUserTo":120,
   "orientation":"orientation",
   "taskDate":"2019-03-26T14:00:00",
   "sendSatisfactionSurvey":false,
   "priority":"1",
   "externalId":"7",
   "longitude":"85",
   "latitude":"85",
   "address":"rua rua 123",
   "checkinType":"1",
   "attachments":[
      {
        "name": "fileNamePluga.txt",
        "file": "dGVzdGUgcGx1Z2E="
      },
            {
        "name": "fileNamePluga2.txt",
        "file": "dGVzdGUgcGx1Z2EgMg=="
      }
   ],
   "keyWords":[
      "1792",
      "9254"
   ]
  }
};

  describe('Action: Create task', function () {
  it('should register a task', function (done) {
    plg.axios({
      method: 'get',
      url: `${event.meta.baseURI}/login`,
      params: { ApiKey: process.env.ApiKey, apiToken: process.env.apiToken }
    }).then((res) => {
      event.auth.accessToken = res.data.result.accessToken;

      action.handle(plg, event).then((task) => {

        console.log('task register result: ' +JSON.stringify(task));  
        expect(task.taskID).to.not.be.null;
        expect(task.orientation).to.eq(event.input.orientation);
       
        console.log('task registration SUCCESS');  
        console.log('task update');  
        
        delete event.input.externalId;
        event.input.id = task.taskID;
        event.input.orientation = "orientation update";

        return action.handle(plg, event).then((result) => {
        console.log('task update result: ' +JSON.stringify(result));  

        expect(result.taskID).to.eq(task.taskID);
        expect(result.orientation).to.eq("orientation update");
        expect(result.externalId).to.eq("7");
        
        console.log('task update SUCCESS');  

        done();
         }).catch(done);

      }).catch(done);
    });
  });
});

