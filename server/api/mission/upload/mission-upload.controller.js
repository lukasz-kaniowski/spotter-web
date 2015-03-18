var bucket = "the-eye",
  awsKey = process.env.AWS_ACCESS_KEY,
  secret = process.env.AWS_SECRET_KEY,
  crypto = require('crypto');


exports.uploadPolicy = function (req, res, next) {

  var misisonId = req.params.missionId;
  var taskId = req.params.taskId;

  var fileName = req.params.taskId,
    expiration = new Date(new Date().getTime() + 1000 * 60 * 5).toISOString(); // expire in 5 minutes

  var policy =
  {
    "expiration": expiration,
    "conditions": [
      {"bucket": bucket},
      {"key": fileName},
      {"acl": 'public-read'},
      ["starts-with", "$Content-Type", ""],
      ["content-length-range", 0, 524288000]
    ]
  };

  var policyBase64 = new Buffer(JSON.stringify(policy), 'utf8').toString('base64');
  var signature = crypto.createHmac('sha1', secret).update(policyBase64).digest('base64');
  res.json({
    bucket: bucket,
    awsKey: awsKey,
    policy: policyBase64,
    signature: signature,
    fileName: fileName,
    acl: 'public-read'
  });

};

