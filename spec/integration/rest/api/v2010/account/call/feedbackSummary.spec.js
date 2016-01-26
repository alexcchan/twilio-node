'use strict';

var _ = require('lodash');
var moment = require('moment');
var Holodeck = require('../../../../../holodeck');
var Request = require('../../../../../../../lib/http/Request');
var Response = require('../../../../../../../lib/http/Response');
var Twilio = require('../../../../../../../lib');
var serialize = require('../../../../../../../lib/base/serialize');


var client;
var holodeck;

describe('FeedbackSummary', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', holodeck);
  });
  it('should generate valid create request', function() {
    holodeck.mock(new Response(500, ''));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .calls
                                  .feedbackSummaries.create(moment.utc('2008-01-2', 'YYYY-MM-DD'), moment.utc('2008-01-2', 'YYYY-MM-DD'));
    promise = promise.then(function() {
      throw new Error('failed');
    }, function(error) {
      expect(error.constructor).toBe(Error.prototype.constructor);
    });

    promise.done();

    var solution = {
      accountSid: 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    };
    var url = _.template(
      'https://api.twilio.com/2010-04-01/Accounts/<%= accountSid %>/Calls/FeedbackSummary.json'
    )(solution);

    var values = {
      StartDate: serialize.iso8601Date(moment.utc('2008-01-2', 'YYYY-MM-DD')),
      EndDate: serialize.iso8601Date(moment.utc('2008-01-2', 'YYYY-MM-DD')),
    };

    holodeck.assertHasRequest(new Request({
        method: 'POST',
        url: url,
        data: values
    }));
  });
  it('should generate valid create response', function() {
    var body = JSON.stringify({
        'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'call_count': 10200,
        'call_feedback_count': 729,
        'end_date': '2014-01-31',
        'include_subaccounts': false,
        'issues': [
            {
                'count': 45,
                'description': 'imperfect-audio',
                'percentage_of_total_calls': '0.04%'
            }
        ],
        'quality_score_average': 4.5,
        'quality_score_median': 4,
        'quality_score_standard_deviation': 1,
        'sid': 'FSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'start_date': '2014-01-01',
        'status': 'completed',
        'date_created': 'Tue, 31 Aug 2010 20:36:28 +0000',
        'date_updated': 'Tue, 31 Aug 2010 20:36:44 +0000'
    });
    holodeck.mock(new Response(200, body));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .calls
                                  .feedbackSummaries.create(moment.utc('2008-01-2', 'YYYY-MM-DD'), moment.utc('2008-01-2', 'YYYY-MM-DD'));
    promise = promise.then(function(response) {
      expect(response).toBeDefined();
    }, function() {
      throw new Error('failed');
    });

    promise.done();
  });
  it('should generate valid fetch request', function() {
    holodeck.mock(new Response(500, ''));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .calls
                                  .feedbackSummaries('FSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
    promise = promise.then(function() {
      throw new Error('failed');
    }, function(error) {
      expect(error.constructor).toBe(Error.prototype.constructor);
    });

    promise.done();

    var solution = {
      accountSid: 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      sid: 'FSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    };
    var url = _.template(
      'https://api.twilio.com/2010-04-01/Accounts/<%= accountSid %>/Calls/FeedbackSummary/<%= sid %>.json'
    )(solution);


    holodeck.assertHasRequest(new Request({
      method: 'GET',
      url: url
    }));
  });
  it('should generate valid fetch response', function() {
    var body = JSON.stringify({
        'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'call_count': 10200,
        'call_feedback_count': 729,
        'end_date': '2014-01-31',
        'include_subaccounts': false,
        'issues': [
            {
                'count': 45,
                'description': 'imperfect-audio',
                'percentage_of_total_calls': '0.04%'
            }
        ],
        'quality_score_average': 4.5,
        'quality_score_median': 4,
        'quality_score_standard_deviation': 1,
        'sid': 'FSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'start_date': '2014-01-01',
        'status': 'completed',
        'date_created': 'Tue, 31 Aug 2010 20:36:28 +0000',
        'date_updated': 'Tue, 31 Aug 2010 20:36:44 +0000'
    });
    holodeck.mock(new Response(200, body));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .calls
                                  .feedbackSummaries('FSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
    promise = promise.then(function(response) {
      expect(response).toBeDefined();
    }, function() {
      throw new Error('failed');
    });

    promise.done();
  });
  it('should generate valid remove request', function() {
    holodeck.mock(new Response(500, ''));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .calls
                                  .feedbackSummaries('FSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
    promise = promise.then(function() {
      throw new Error('failed');
    }, function(error) {
      expect(error.constructor).toBe(Error.prototype.constructor);
    });

    promise.done();

    var solution = {
      accountSid: 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      sid: 'FSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    };
    var url = _.template(
      'https://api.twilio.com/2010-04-01/Accounts/<%= accountSid %>/Calls/FeedbackSummary/<%= sid %>.json'
    )(solution);


    holodeck.assertHasRequest(new Request({
      method: 'DELETE',
      url: url
    }));
  });
  it('should generate valid delete response', function() {
    var body = JSON.stringify(null);
    holodeck.mock(new Response(204, body));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .calls
                                  .feedbackSummaries('FSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
    promise = promise.then(function(response) {
      expect(response).toBe(true);
    }, function() {
      throw new Error('failed');
    });

    promise.done();
  });
});
