const connectToDb = require('../database/db');
const renderError = require('../utils/renderError')
const Incident = require('../models/Incident');

module.exports.handle = async (event, context, callback) => {
  connectToDb();
  
  const id = event.pathParameters.id;
  const params = JSON.parse(event.body);
  const incident = await Incident.findByIdAndUpdate(id, { resolved: params.resolved }, { new: true });

  if (incident) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(incident)
    };
  } else {
    return renderError(null, 'Failed to update');
  }
}
