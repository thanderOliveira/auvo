const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../../lib/actions/task/createTask');

const event = {
  meta: {
    baseURI: process.env.BASE_URI
  },
  auth: {
    accessToken: process.env.ACCESS_TOKEN
  },
  input: {
   "idUserFrom":12078,
   "idUserTo":12078,
   "orientation":"orientation",
   "taskDate":"2019-03-26T14:00:00",
   "sendSatisfactionSurvey":false,
   "priority":"1",
   "externalId":"5",
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
  it('returns success with valid task - teste -', function (done) {
    plg.axios({
      method: 'get',
      url: `${event.meta.baseURI}/login`,
      params: { ApiKey: process.env.ApiKey, apiToken: process.env.apiToken }
    }).then((res) => {
      event.auth.accessToken = res.data.result.accessToken;

      return action.handle(plg, event).then((task) => {

        console.log('task result: ' +JSON.stringify(task));  
        expect(task.id).to.not.be.null;
        expect(task.orientation).to.eq(event.input.orientation);
       
        done();
     });
    }).catch(done);
  });
});
